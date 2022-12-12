const { Contact } = require("../../models/contact");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite = "" } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner, favorite }, "-createdAt -updatedAt -owner", {
    skip,
    limit: Number(limit),
  });
  res.json({ status: "success", data: result });
};

module.exports = getAll;
