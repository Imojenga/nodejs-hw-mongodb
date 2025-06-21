import cloudinary from 'cloudinary';
import { getEnvVar } from './getEnvVar.js';
import fs from 'node:fs/promises';

cloudinary.v2.config({
  secure: true,
  cloud_name: getEnvVar('CLOUD_NAME'),
  api_key: getEnvVar('API_KEY'),
  api_secret: getEnvVar('API_SECRET'),
});

export const uploadToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response.secure_url;
};
