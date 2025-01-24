import crypto from "crypto";

function encrypt_message(secret_message, secret_key) {
    const hash = crypto.createHash("sha256").update(secret_key).digest("hex").slice(0, 32);
    return hash;
}

export function cipherVeil(secret_message, secret_key, cover_image) {
    const hash = encrypt_message(secret_message, secret_key);
    console.log(hash);
}