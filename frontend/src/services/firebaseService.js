import axios from "axios";

const fetchGifUrl = async (filename) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/firebase/gifs/${filename}`
    );
    return response.data.downloadURL;
  } catch (error) {
    console.error("Error fetching GIF URL:", error);
    return ""; // Return a default or error image URL if necessary
  }
};

const uploadGifUrl = async (file) => {
  const formData = new FormData();
  formData.append("filename", file);
  console.log(file);
  try {
    const response = await axios.post(
      `http://localhost:3001/firebase/upload`,
      formData
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading GIF:", error);
    throw error;
  }
};

export default { fetchGifUrl, uploadGifUrl };
