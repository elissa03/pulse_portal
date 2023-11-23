const {uploadFileToStorage, getFileDownloadURL} = require("../services/firebase.service");

const uploadFile = async (req, res) => {
  console.log(req.file);
  try {
    const result = await uploadFileToStorage(req.file);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getFile = async (req, res) => {
  const { type, filename } = req.params;
  try {
    const directory = type === "gifs" ? "gifs" : null;
    const downloadURL = await getFileDownloadURL(`${directory}/${filename}`);
    res.status(200).json({ downloadURL });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

module.exports = {
    uploadFile,
    getFile
}