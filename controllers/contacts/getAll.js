// import { listContacts }   from '../../models/contacts.js'
import { listContacts } from "../../models/contacts/index.js"

const getAll = async (req, res, next) => {
    const contacts = await listContacts()
    res.json({status : "success", data: contacts})
}

export { getAll } 