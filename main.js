import crypto from "crypto";

function encrypt_message(secret_message, secret_key) {
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
}

export function cipherVeil(secret_message, secret_key, cover_image) {
    const { cipher_text, iv, authTag } = encrypt_message(secret_message, secret_key);
    console.log("Cipher Text:", cipher_text);
    console.log("IV:", iv);
    console.log("Auth Tag:", authTag);
}