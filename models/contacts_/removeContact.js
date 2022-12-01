const listContacts = require('./listContacts');
const getContactById = require('./getContactById');
const writeData = require('./writeData');

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

module.exports = removeContact