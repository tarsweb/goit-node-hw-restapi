import { readFile, writeFile } from 'fs/promises';
import path  from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(__dirname,'contacts.json');

async function writeData (data) {
  try {
    await writeFile(contactsPath, JSON.stringify(data), "utf-8");
    return true
  } catch (error) {
    console.error(error);
    return false
  }
}

const listContacts = async () => {
  try {
    const data = await readFile(contactsPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return []
  }
}

const getContactById = async (contactId) => {
  console.log("contactId", contactId);
  try {
    const allContacts = await listContacts();
    // if id is unic can use find
    const contact = allContacts.find(({id}) => id === contactId)
    if (!contact ) return null
    else {
      const {id, ...allDataContact} = contact;
      return {...allDataContact}
    }
  } catch (error) {
    console.error(error);
    return null
  }
}

const removeContact = async (contactId) => {
  try {
    // const allContacts = await listContacts();
    const contact  = await getContactById(contactId)
    if (!contact) return false
    const allContacts = await listContacts();
    const updateContacts =  allContacts.filter(({id}) => id !== contactId);
    // write data
    return await writeData(updateContacts)
  } catch (error) {
    console.error(error);
    return false
  }
}

const addContact = async (body) => {
  try {
    // validate
    const allContacts = await listContacts();
    const id = String(Math.max(...allContacts.map(obj => obj.id)) + 1);
    const newContact = {id , ...body}
    allContacts.push(newContact)
    // write data
    return await writeData(allContacts) ? newContact : null
  } catch (error) {
    console.log(error);
    return null
  }
}

const updateContact = async (contactId, body) => {
  try {
    // validate

    // old
    // let contactToUpdate  = await getContactById(contactId);
    // if (!contactToUpdate) return false

    // const allContacts = await listContacts();
    // contactToUpdate = {...contactToUpdate, ...body}
    // const updateConacts = allContacts.map(obj => obj.id === contactId ? contactToUpdate : obj)
    // // write data
    // return await writeData(updateConacts) ? contactToUpdate : null

    //new
    const allContacts = await listContacts();
    // if id is unic can use find
    const contactToUpdate = allContacts.find(({id}) => id === contactId)
    if (!contactToUpdate) return false
    Object.assign(contactToUpdate, body)
    // write data
    return await writeData(allContacts) ? contactToUpdate : null
  } catch (error) {
    console.log(error);
    return false
  }
}

export {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
