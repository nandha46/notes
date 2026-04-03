import {promises as fsPromises} from 'fs';

async function fileExists(filePath) {
    try {
        await fsPromises.access(filePath, fsPromises.constants.F_OK);
        return true; 
    } catch (err) {
        return false; 
    }
  }

export default fileExists;