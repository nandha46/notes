import {promises as fsPromises} from 'fs';

async function fileExists(filePath) {
    try {
        await fsPromises.access(filePath, fsPromises.constants.F_OK);
        return true; // File exists
    } catch (err) {
        return false; // File does not exist
    }
  }

export default fileExists;