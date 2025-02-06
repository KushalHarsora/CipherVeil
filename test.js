import fs from 'fs';
import { cipherVeil } from './main.js';

const secret_message = "This is a secret message";
const secret_key = "supersecretkey";
const cover_image_path = "./test.jpg";

// Read the image file as a buffer
const cover_imageBuffer = fs.readFileSync(cover_image_path);

// Call cipherVeil to encode the message and return the image buffer
cipherVeil(secret_message, secret_key, cover_imageBuffer)
  .then((stego_imageBuffer) => {
    // Save the stego image buffer to disk
    fs.writeFile("stego_image.png", stego_imageBuffer, (err) => {
      if (err) {
        console.error("Error saving stego image:", err);
      } else {
        console.log("Stego image saved as stego_image.png");
      }
    });
  })
  .catch((err) => {
    console.error("Error during steganography:", err);
  });
