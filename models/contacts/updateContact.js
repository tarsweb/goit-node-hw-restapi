import { listContacts } from "./listContacts.js";
import { writeData } from "./writeData.js";

const updateContact = async (contactId, body) => {
  try {
    const allContacts = await listContacts();
    // if id is unic can use find
    const contactToUpdate = allContacts.find(({ id }) => id === contactId);
    if (!contactToUpdate) return false;
    Object.assign(contactToUpdate, body);
    // write data
    return (await writeData(allContacts)) ? contactToUpdate : null;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export { updateContact }
