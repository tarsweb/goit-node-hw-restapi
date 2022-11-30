// import { listContacts }   from '../../models/contacts.js'
const { listContacts } = require("../../models/contacts")

const getAll = async (req, res, next) => {
    const contacts = await listContacts()
    res.json({status : "success", data: contacts})
}

module.exports = getAll