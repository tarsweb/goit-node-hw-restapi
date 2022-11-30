const { writeFile } = require('fs/promises');
const path  = require('path');

const contactsPath = path.resolve(process.env.DATA_LOCAL_FILE);
console.log(contactsPath);

async function writeData(data) {
  try {
    await writeFile(contactsPath, JSON.stringify(data), "utf-8");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

module.exports = writeData