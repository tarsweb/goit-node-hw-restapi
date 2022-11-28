import { listContacts } from "./listContacts.js";
import { writeData } from "./writeData.js";

const addContact = async (body) => {
  try {
    // validate
    const allContacts = await listContacts();
    const id = String(Math.max(...allContacts.map((obj) => obj.id)) + 1);
    const newContact = { id, ...body };
    allContacts.push(newContact);
    // write data
    return (await writeData(allContacts)) ? newContact : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export { addContact }