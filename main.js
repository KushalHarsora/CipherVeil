import crypto from "crypto";
import { Jimp, JimpMime } from "jimp";

const encrypt_message = (secret_message, secret_key) => {
    const hash = crypto.createHash("sha256").update(secret_key).digest();
    const iv = crypto.randomBytes(12);

    const cipher = crypto.createCipheriv("aes-256-ccm", hash, iv, {
        authTagLength: 16,
    });

    const cipher_text = Buffer.concat([
        cipher.update(secret_message, "utf8"),
        cipher.final(),
    ]);

    const authTag = cipher.getAuthTag();

    return {
        cipher_text: cipher_text.toString("hex"),
        iv: iv.toString("hex"),
        authTag: authTag.toString("hex"),
    };
};

const hexToBinary = (hex) => {
    let binary = '';
    for (let i = 0; i < hex.length; i++) {
        const bin = parseInt(hex[i], 16).toString(2).padStart(4, '0');
        binary += bin;
    }
    return binary;
};

const abstract_data = async (cipher_text, cover_imageBuffer) => {
    const binary_data = hexToBinary(cipher_text);

    try {
        // Use the image buffer instead of a file path
        const image = await Jimp.read(cover_imageBuffer);
        let dataIndex = 0;

        // Iterate over the image pixels to encode the binary data
        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            if (dataIndex < binary_data.length) {
                this.bitmap.data[idx] = (this.bitmap.data[idx] & 0b11111110) | parseInt(binary_data[dataIndex], 2);
                dataIndex++;
            }
        });

        const stego_imageBuffer = await image.getBuffer(JimpMime.png);
        return stego_imageBuffer;

    } catch (err) {
        console.error("Error during steganography:", err);
    }
};

export async function cipherVeil(secret_message, secret_key, cover_image) {
    const { cipher_text } = encrypt_message(secret_message, secret_key);
    const stego_imageBuffer = await abstract_data(cipher_text, cover_image);
    return stego_imageBuffer;
}
