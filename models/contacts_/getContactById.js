const listContacts = require('./listContacts');

const getContactById = async (contactId) => {
  try {
    const allContacts = await listContacts();
    // if id is unic can use find
    const contact = allContacts.find(({ id }) => id === contactId);
    if (!contact) return null;
    else {
      return contact;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

module.exports = getContactById