const { readFile } = require('fs/promises');
const path = require('path');

require("dotenv").config();

const contactsPath = path.resolve(process.env.DATA_LOCAL_FILE);
console.log(contactsPath);

const listContacts = async () => {
  try {
    const data = await readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return [];
  }
};

module.exports = listContacts;