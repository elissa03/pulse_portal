import axios from "axios";
import localStorageUtils from "../utils/localStorageUtils";

const fetchGifUrl = async (filename) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/firebase/gifs/${filename}`,
      {
        headers: {
          Authorization: `Bearer ${localStorageUtils.getToken()}`, 
        },
      }
    );
    //console.log("hereee", response)
    return response.data.downloadURL;
  } catch (error) {
    console.error("Error fetching GIF URL:", error);
    return "";
  }
};

const uploadGifUrl = async (file) => {
  const formData = new FormData();
  formData.append("filename", file);
  console.log(file);
  try {
    const response = await axios.post(
      `http://localhost:3001/firebase/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorageUtils.getToken()}`, 
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading GIF:", error);
    throw error;
  }
};

export default { fetchGifUrl, uploadGifUrl };
