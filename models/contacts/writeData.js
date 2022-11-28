import {writeFile } from 'fs/promises';
import path  from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const contactsPath = path.(__dirname,'contacts.json');

const contactsPath = path.resolve(process.env.DATA_LOCAL_FILE);

async function writeData(data) {
  try {
    await writeFile(contactsPath, JSON.stringify(data), "utf-8");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export { writeData }
