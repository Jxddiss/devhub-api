import { randomUUID } from 'crypto';
import { UploadedFile } from 'express-fileupload';
import { Client  } from 'minio';

const baseUrl = process.env.MINIO_BASE_URL || 'http://localhost:9000';

const minioClient = new Client({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: process.env.MINIO_PORT ? parseInt(process.env.MINIO_PORT) : 9000,
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

const bucketName = process.env.MINIO_BUCKET || 'default-bucket';

const videoContentTypes = [
  'video/mp4',
  'video/webm',
  'video/ogg',
  'video/avi',
  'video/mpeg',
  'video/quicktime',
  'video/x-ms-wmv',
  'video/x-flv',
  'video/3gpp',
  'video/3gpp2',
];

export const uploadFile = async (file: UploadedFile, fileName?: string): Promise<string> => {
  const exists = await minioClient.bucketExists(bucketName);
  if (!exists) {
    throw new Error(`Bucket ${bucketName} does not exist`);
  }
  const metaData = {
    'Content-Type': file.mimetype,
  };

  if (!fileName) {
    fileName = `${randomUUID()}-${file.name}`;
  }

  try {
    await minioClient.putObject(bucketName, fileName, file.data, file.size, metaData);
    return `${baseUrl}/${bucketName}/${fileName}`;
  } catch (error : any) {
    throw new Error(`File upload failed: ${error.message}`);
  }
};

export const uploadVideo = async ( file: UploadedFile, videoName: string ): Promise<string> => {
  if (!videoContentTypes.includes(file.mimetype)) {
    throw new Error(`Unsupported video format: ${file.mimetype}`);
  }

  const fileName = `${videoName.replace(/\s+/g, '_')}-${Date.now()}`;

  try {
    const publicUrl = await uploadFile(file, fileName);
    return publicUrl;
  } catch (error: any) {
    console.error('Failed to upload video:', error.message);
    throw new Error(`Failed to upload video: ${error.message}`);
  }
};

export const deleteFile = async (fileName: string): Promise<void> => {
  try {
    await minioClient.removeObject(bucketName, fileName);
  } catch (error : any) {
    throw new Error(`File deletion failed: ${error.message}`);
  }
};
