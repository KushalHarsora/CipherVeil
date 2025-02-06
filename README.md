# CipherVeil

A hybrid cryptographic system combining encryption and steganography.

## Installation

To install **Cipher Veil**, run the following command:

```bash
  npm install cipher-veil
```

## Usage

To use the package in your code you can refer to this Example.

#### Example Usage
```javascript
import fs from 'fs';
import { cipherVeil } from 'cipher-veil';

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
```

For more detailed explaination refer to ```test.js```
    
## Features

- Light-weight Encryption Framework
- Hybrid security model using steganography and cryptography

## Documentation

[Documentation](https://github.com/KushalHarsora/CipherVeil)

## Authors

- [@KushalHarsora](https://github.com/KushalHarsora)
- [@YashkumarDubey](https://github.com/YashAPro1)
- [@MohdUmairAnsari](https://github.com/uumair327)