import mongoose from "mongoose";

const syncStatusSchema = new mongoose.Schema({
    syncName: { type: String, required: true, unique: true },
    isRunning: { type: Boolean, default: false },
    stopRequested: { type: Boolean, default: false },
    updatedMovies: { type: Number, default: 0 },
    updatedPersons: { type: Number, default: 0 },
    duplicatePersons: { type: Number, default: 0 },
    currentMovie: { type: String, default: "" },
    totalMovies: { type: Number, default: 0 },
    lastUpdateTime: { type: Date, default: Date.now }
});

const SyncStatus = mongoose.model("SyncStatus", syncStatusSchema);

export default SyncStatus;
