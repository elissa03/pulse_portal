const { initializeApp } = require("firebase/app");
const {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} = require("firebase/storage");
const config = require("../database/firebase.config");

// Initialize a firebase application
initializeApp(config.firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage();

const uploadFileToStorage = async (file) => {
  try {

    const storageRef = ref(
      storage,
      `gifs/${file.originalname}`
    );

    // Create file metadata including the content type
    const metadata = {
      contentType: file.mimetype,
    };

    // Upload the file in the bucket storage
    const snapshot = await uploadBytesResumable(
      storageRef,
      file.buffer,
      metadata
    );

    // Grab the public URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log("File successfully uploaded.");
    return {
      message: "File uploaded to Firebase Storage",
      name: file.originalname,
      type: file.mimetype,
      downloadURL: downloadURL,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const getFileDownloadURL = async (filename) => {
  try {
    const storageRef = ref(storage, filename);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { uploadFileToStorage, getFileDownloadURL };
