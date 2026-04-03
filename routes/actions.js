import express from "express";
const router = express.Router();

import fetch from "node-fetch";
import config from "config";
import authMiddleware from "../middleware/auth.js";

// Models
import Tags from "../models/tags.js";
import Person from "../models/person.js";
import Movie from "../models/movie.js";
import MovieCertification from "../models/movie_certification.js";
import TvCertification from "../models/tv_certification.js";
import DatabaseStats from "../models/database_stats.js";
import Tv from "../models/tv.js";
import MovieGenre from "../models/movie_genre.js";
import TvGenre from "../models/tv_genre.js";
import SyncStatus from "../models/sync_status.js";

import { promises as fsPromises } from "fs";
import path from "path";
import delay from "../services/delay_service.js";
import fileExists from "../services/file_service.js";

// Rate Limiter for TMDB (Target: 32 requests per second = 80% of 40 req/sec limit)
class TMDBLimiter {
  constructor(limitPerSecond) {
    this.limit = limitPerSecond;
    this.tokens = limitPerSecond;
    this.lastRefill = Date.now();
    this.queue = [];
    this.isCoolingDown = false;
    this.coolDownUntil = 0;
    
    // Refill tokens periodically
    setInterval(() => this.refill(), 50);
  }

  refill() {
    const now = Date.now();
    if (this.isCoolingDown && now < this.coolDownUntil) return;
    if (this.isCoolingDown && now >= this.coolDownUntil) {
      this.isCoolingDown = false;
      console.log("TMDB Limiter: Cooldown finished.");
    }

    const elapsed = now - this.lastRefill;
    const refillAmount = (elapsed / 1000) * this.limit;
    this.tokens = Math.min(this.limit, this.tokens + refillAmount);
    this.lastRefill = now;
    this.processQueue();
  }

  async wait() {
    if (this.tokens >= 1 && (!this.isCoolingDown || Date.now() >= this.coolDownUntil)) {
      this.tokens -= 1;
      return Promise.resolve();
    }
    return new Promise(resolve => this.queue.push(resolve));
  }

  processQueue() {
    while (this.queue.length > 0 && this.tokens >= 1 && !this.isCoolingDown) {
      this.tokens -= 1;
      const resolve = this.queue.shift();
      resolve();
    }
  }

  triggerCooldown(seconds) {
    this.isCoolingDown = true;
    this.coolDownUntil = Date.now() + (seconds * 1000);
    console.warn(`TMDB Limiter: 429 Received. Cooling down for ${seconds} seconds.`);
  }
}

const limiter = new TMDBLimiter(32);

async function fetchWithRateLimit(url, options, retries = 3) {
  await limiter.wait();
  
  try {
    const response = await fetch(url, options);
    
    if (response.status === 429) {
      const retryAfter = parseInt(response.headers.get("Retry-After")) || 5;
      limiter.triggerCooldown(retryAfter);
      
      if (retries > 0) {
        console.log(`Retrying request for ${url} after ${retryAfter}s...`);
        await delay(retryAfter * 1000 + 100);
        return fetchWithRateLimit(url, options, retries - 1);
      }
      throw new Error("TMDB Rate Limit exceeded and retries exhausted.");
    }
    
    return response;
  } catch (err) {
    if (retries > 0 && (err.message.includes("Rate Limit") || err.message.includes("429"))) {
      await delay(2000); // Backoff before retry
      return fetchWithRateLimit(url, options, retries - 1);
    }
    throw err;
  }
}

router.get("/", authMiddleware, async (req, res) => {
  const [
    totalPersons,
    malePersons,
    femalePersons,
    nonBPersons,
    totalPosters,
    movFolder,
    totalMovies,
    totalTv,
    totalTvPosters,
    tvFolder,
    totalPersonPosters,
    personFolder,
    totalMovCerts,
    totalTvCerts,
    movGenres,
    tvGenres
  ] = await Promise.all([
    Person.countDocuments(),
    Person.countDocuments({ gender: 2 }),
    Person.countDocuments({ gender: 1 }),
    Person.countDocuments({ gender: 0 }),
    Movie.countDocuments({ poster_path: { $exists: true } }),
    fsPromises.readdir("./public/tmdb/movie_posters/").catch(() => []),
    Movie.countDocuments(),
    Tv.countDocuments(),
    Tv.countDocuments({ poster_path: { $exists: true } }),
    fsPromises.readdir("./public/tmdb/tv_posters/").catch(() => []),
    Person.countDocuments({ profile_path: { $exists: true } }),
    fsPromises.readdir("./public/tmdb/person_posters/").catch(() => []),
    MovieCertification.countDocuments(),
    TvCertification.countDocuments(),
    MovieGenre.countDocuments(),
    TvGenre.countDocuments()
  ]);

  const downloadedPosters = movFolder.length;
  const downloadedTvPosters = tvFolder.length;
  const downloadedPersonPosters = personFolder.length;

  const respData = {
    title: "Server Actions",
    totalPersons,
    malePersons,
    femalePersons,
    nonBPersons,
    totalMovies,
    totalPosters,
    downloadedPosters,
    yettodownPosters: totalPosters - downloadedPosters,
    totalTv,
    totalTvPosters,
    downloadedTvPosters,
    yettodownTvPosters: totalTvPosters - downloadedTvPosters,
    totalPersonPosters,
    downloadedPersonPosters,
    yettodownPersonPosters: totalPersonPosters - downloadedPersonPosters,
    totalMovCerts,
    totalTvCerts,
    movGenres,
    tvGenres
  };

  res.status(200).render("dashboard/actions", respData);
});

// Helper function for certifications
async function loadCertificationsFromJson(filePath, Model, typeLabel) {
  if (!await fileExists(filePath)) {
    console.warn(`${typeLabel} certification file not found: ${filePath}`);
    return;
  }
  try {
    const fileDataBuffer = await fsPromises.readFile(filePath);
    const certData = JSON.parse(fileDataBuffer.toString());
    for (let country in certData) {
      const certArr = certData[country];
      for (let data of certArr) {
        try {
          const cert = new Model({
            country,
            certification: data.certification,
            meaning: data.meaning,
            order: data.order,
          });
          await cert.save();
          console.log(`${typeLabel} Cert Saved: ${country} - ${data.certification}`);
        } catch (err) {
          if (err.code !== 11000) console.error(`Error saving ${typeLabel} cert:`, err);
        }
      }
    }
  } catch (err) {
    console.error(`Error loading ${typeLabel} certifications:`, err);
  }
}

router.get("/load-certifications", authMiddleware, async (req, res) => {
  await Promise.all([
    loadCertificationsFromJson(path.resolve("data/movie_cert.json"), MovieCertification, "Movie"),
    loadCertificationsFromJson(path.resolve("data/tv_cert.json"), TvCertification, "TV")
  ]);
  res.send("Certifications loading process completed.");
});

router.get("/load-tags", authMiddleware, async (req, res) => {
  const tagsFile = path.resolve("data/tags.json");
  if (!await fileExists(tagsFile)) {
    return res.status(404).send("Tags file not found");
  }

  try {
    const fileDataBuffer = await fsPromises.readFile(tagsFile);
    const tagsData = JSON.parse(fileDataBuffer.toString());
    const tags = tagsData.tags;
    
    let insertedCount = 0;
    for (const tagName of tags) {
      const exists = await Tags.exists({ name: tagName });
      if (!exists) {
        await Tags.create({ name: tagName });
        insertedCount++;
      }
    }
    res.send(`Completed. Inserted ${insertedCount} new tags.`);
  } catch (err) {
    console.error("Error in load-tags:", err);
    res.status(500).send(err);
  }
});


router.get("/sync-status", authMiddleware, async (req, res) => {
  const status = await SyncStatus.findOne({ syncName: "persons_sync" });
  res.json(status || { isRunning: false });
});

router.post("/stop-sync", authMiddleware, async (req, res) => {
  await SyncStatus.findOneAndUpdate(
    { syncName: "persons_sync" },
    { stopRequested: true }
  );
  res.json({ message: "Stop request sent" });
});

router.get("/load-persons-from-cast", authMiddleware, async (req, res) => {
  let status = await SyncStatus.findOne({ syncName: "persons_sync" });
  if (status && status.isRunning) {
    return res.status(400).json({ status: "already_running" });
  }

  const moviesCount = await Movie.countDocuments({ credits: { $exists: false } });
  
  status = await SyncStatus.findOneAndUpdate(
    { syncName: "persons_sync" },
    {
      isRunning: true,
      stopRequested: false,
      updatedMovies: 0,
      updatedPersons: 0,
      duplicatePersons: 0,
      currentMovie: "Initializing...",
      totalMovies: Math.min(moviesCount, 500),
      lastUpdateTime: new Date()
    },
    { upsert: true, new: true }
  );

  // Start process in background
  runBackgroundSync(status);

  res.status(200).json({ status: "started" });
});

async function runBackgroundSync(initialStatus) {
  const stats = {
    updatedPersons: 0,
    duplicatePersons: 0,
    updatedMovies: 0
  };

  try {
    const movies = await Movie.find({ credits: { $exists: false } }).limit(500);

    for (const movie of movies) {
      // Check for stop request
      const currentStatus = await SyncStatus.findOne({ syncName: "persons_sync" });
      if (currentStatus && currentStatus.stopRequested) {
        console.log("Sync stopped by user request.");
        break;
      }

      const url = `https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US`;
      
      await SyncStatus.findOneAndUpdate(
        { syncName: "persons_sync" },
        { currentMovie: movie.title, lastUpdateTime: new Date() }
      );

      await delay(100);
      try {
        await getAndUpdateMovies(url, movie, stats);
        
        // Persist stats to DB
        await SyncStatus.findOneAndUpdate(
          { syncName: "persons_sync" },
          {
            updatedMovies: stats.updatedMovies,
            updatedPersons: stats.updatedPersons,
            duplicatePersons: stats.duplicatePersons,
            lastUpdateTime: new Date()
          }
        );
      } catch (err) {
        console.error(`Failed to process movie ${movie.id}: ${err.message}`);
      }
    }
  } catch (err) {
    console.error("Background sync failed:", err);
  } finally {
    await SyncStatus.findOneAndUpdate(
      { syncName: "persons_sync" },
      { isRunning: false, currentMovie: "Completed", lastUpdateTime: new Date() }
    );
    
    // Update general database stats
    const countPersons = await Person.countDocuments();
    await DatabaseStats.findOneAndUpdate(
      { collection_name: "persons" },
      { records: countPersons, last_updated: new Date() },
      { upsert: true }
    );
  }
}

async function getAndUpdateMovies(url, movie, stats) {
  const bearer_token = config.get("tmdb_bearer_token");
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "User-Agent": "My Movie Gallery / 0.0.1 personal (Node.js/16.20.2)",
      'Accept-Encoding': 'gzip,deflate',
      Authorization: `Bearer ${bearer_token}`,
    },
  };

  try {
    const response = await fetchWithRateLimit(url, options);
    if (response.status !== 200) {
      throw new Error(`Error from TMDB Server. Status code: ${response.status}`);
    }
    const data = await response.json();
    movie.credits = { cast: data.cast };
    await movie.save();
    console.log(`Movie updated: ${movie.title} (${++stats.updatedMovies})`);

    // Process cast in parallel
    const personPromises = movie.credits.cast.map(async (castMember) => {
      const isExist = await Person.exists({ id: castMember.id });
      if (isExist) {
        stats.duplicatePersons++;
        return;
      }
      return loadPersonDetails(castMember.id, options, stats);
    });

    await Promise.all(personPromises);
  } catch (err) {
    console.error(`Error in getAndUpdateMovies for movie ${movie.id}:`, err);
    throw err;
  }
}

async function loadPersonDetails(personId, options, stats) {
  const url = `https://api.themoviedb.org/3/person/${personId}?append_to_response=external_ids%2Cmovie_credits%2Ctv_credits&language=en-US`;

  try {
    const response = await fetchWithRateLimit(url, options);
    if (response.status !== 200) {
      console.error(`TMDB error fetching person ${personId}: ${response.status}`);
      return;
    }
    const data = await response.json();
    const person = new Person(data);
    await person.save();
    console.log(`Person saved: ${data.name} (${++stats.updatedPersons})`);
  } catch (err) {
    if (err.code === 11000) {
      stats.duplicatePersons++;
    } else {
      console.error(`Error saving person ${personId}:`, err);
    }
  }
}

export default router;
