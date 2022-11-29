// import { updateContact } from "../../models/contacts.js";
import { updateContact } from "../../models/contacts/index.js";

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  // if (! Object.keys(req.body).length) return res.status(400).json({message : "missing fields"})
  const contact = await updateContact(contactId, req.body);
  if (contact) return res.json({ status: "success", data: contact });
  next();
};

export { updateById }