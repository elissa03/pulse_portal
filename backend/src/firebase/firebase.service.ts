import { Injectable } from '@nestjs/common';
import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage';
import { ConfigService } from '@nestjs/config';


/**
 * Service to handle operations with Firebase Storage.
 */
@Injectable()
export class FirebaseService {
  private storage: any;

  constructor(private configService: ConfigService) {
    // Initialize the Firebase application using config from .env
    const firebaseConfig = {
      apiKey: this.configService.get<string>('API_KEY'),
      authDomain: this.configService.get<string>('AUTH_DOMAIN'),
      projectId: this.configService.get<string>('PROJECT_ID'),
      storageBucket: this.configService.get<string>('STORAGE_BUCKET'),
      messagingSenderId: this.configService.get<string>('MESSAGING_SENDER_ID'),
      appId: this.configService.get<string>('APP_ID'),
      measurementId: this.configService.get<string>('MEASUREMENT_ID'),
    };

    initializeApp(firebaseConfig);

    // Initialize Cloud Storage and get a reference to the service
    this.storage = getStorage();
  }

  /**
   * Uploads a file to Firebase Storage.
   *
   * @param {any} file - The file to be uploaded. Expected to have 'originalname' and 'mimetype' properties.
   * @returns {Promise<any>} A promise that resolves to an object containing upload details.
   * @throws Will throw an error if the file upload fails.
   */
  async uploadFileToStorage(file: any): Promise<any> {
    try {
      const storageRef = ref(this.storage, `gifs/${file.originalname}`);

      const metadata = {
        contentType: file.mimetype,
      };

      const snapshot = await uploadBytesResumable(
        storageRef,
        file.buffer,
        metadata,
      );
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log('File successfully uploaded.');
      return {
        message: 'File uploaded to Firebase Storage',
        name: file.originalname,
        type: file.mimetype,
        downloadURL: downloadURL,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  /**
   * Retrieves the download URL for a file stored in Firebase Storage.
   *
   * @param {string} filename - The name of the file in Firebase Storage.
   * @returns {Promise<string>} A promise that resolves to the file's download URL.
   * @throws Will throw an error if retrieving the URL fails.
   */
  async getFileDownloadURL(filename: any): Promise<string> {
    try {
      const storageRef = ref(this.storage, filename);
      return await getDownloadURL(storageRef);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
