import { listContacts } from "./listContacts.js";
import { getContactById } from "./getContactById.js";
import { writeData } from "./writeData.js";

const removeContact = async (contactId) => {
  try {
    const contact = await getContactById(contactId);
    if (!contact) return null;
    const allContacts = await listContacts();
    const updateContacts = allContacts.filter(({ id }) => id !== contactId);
    // write data
    return (await writeData(updateContacts)) ? contact : null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export { removeContact }