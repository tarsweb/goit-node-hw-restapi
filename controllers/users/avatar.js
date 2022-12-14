const { User } = require("../../models").user;

const path = require('path');
const fs = require('fs/promises')

const Jimp = require('jimp');

const arrayPath = ["public", "avatars"]

const avatarDir = path.join(__dirname, "../../", ...arrayPath);

const updateAvatar = async (req, res, next) => {
  const {path: tempUpload, originalname} = req.file;
  const {_id: id} = req.user;
  
  console.log("tempUpload", tempUpload, "originalname",originalname);
  await Jimp.read(tempUpload)
    .then(image => { return image.resize(Jimp.AUTO, 250).quality(60).write(tempUpload);})
    .catch(error => next(error))

  const [extention] = originalname.split(".").reverse();
  const avatarImageName =  `${id}.${extention}`;
  try {
    const resultUpload = path.join(avatarDir, avatarImageName);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join(...arrayPath, avatarImageName);
    await User.findByIdAndUpdate(id, {avatarURL});
    res.json({avatarURL});
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
}

module.exports = updateAvatar