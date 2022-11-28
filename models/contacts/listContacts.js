import { readFile } from 'fs/promises';
import path  from 'path';

import * as dotenv from 'dotenv'
dotenv.config()

const contactsPath = path.resolve(process.env.DATA_LOCAL_FILE);

const listContacts = async () => {
  try {
    const data = await readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

export { listContacts }
