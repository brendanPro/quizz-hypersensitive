import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // 96-bit nonce recommended for GCM
const AUTH_TAG_LENGTH = 16;

function loadKey(): Buffer {
  const raw = process.env.ENCRYPTION_KEY || process.env.SECRET_ENCRYPTION_KEY || '';
  if (!raw) throw new Error('ENCRYPTION_KEY is not set');

  // Try hex (64 chars for 32 bytes)
  if (/^[A-Fa-f0-9]{64}$/.test(raw)) {
    return Buffer.from(raw, 'hex');
  }

  // Try base64/base64url
  try {
    const b64 = raw.replace(/-/g, '+').replace(/_/g, '/');
    const buf = Buffer.from(b64, 'base64');
    if (buf.length === 32) return buf;
  } catch {}

  // Fallback treat as utf8 passphrase (must be 32 bytes)
  const utf8 = Buffer.from(raw, 'utf8');
  if (utf8.length !== 32) {
    throw new Error('ENCRYPTION_KEY must decode to exactly 32 bytes for AES-256-GCM');
  }
  return utf8;
}

// Returns base64url string packing iv|tag|ciphertext
export function encrypt(plain: string): string {
  const key = loadKey();
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv(ALGORITHM, key, iv);
  const ciphertext = Buffer.concat([cipher.update(plain, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  const packed = Buffer.concat([iv, tag, ciphertext]);
  return packed.toString('base64url');
}

export function decrypt(payload: string): string {
  const key = loadKey();
  const buf = Buffer.from(payload, 'base64url');
  if (buf.length < IV_LENGTH + AUTH_TAG_LENGTH + 1) {
    throw new Error('Invalid payload');
  }
  const iv = buf.subarray(0, IV_LENGTH);
  const tag = buf.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
  const ciphertext = buf.subarray(IV_LENGTH + AUTH_TAG_LENGTH);
  const decipher = createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  const plain = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return plain.toString('utf8');
}
