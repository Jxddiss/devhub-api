import { Vimeo } from '@vimeo/vimeo';
import { UploadedFile } from 'express-fileupload';
import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

const vimeoClient = new Vimeo(
  process.env.VIMEO_CLIENT_ID || '',
  process.env.VIMEO_CLIENT_SECRET || '',
  process.env.VIMEO_CLIENT_ACCESS_TOKEN || '',
);

export const uploadVideoToVimeo = async (file: UploadedFile, videoName : string, videoDescription : string): Promise<string> => {
  const tempPath = path.join(os.tmpdir(), file.name);

  await fs.promises.writeFile(tempPath, file.data);

  return new Promise((resolve, reject) => {
    vimeoClient.upload(
      tempPath,
      {
        name: videoName,
        description: videoDescription,
      },
      (uri: string) => {
        fs.promises.unlink(tempPath).catch(err => 
          console.error('Failed to delete temp file:', err),
        );
        console.log('Your video URI is: ' + uri);

        const videoId = uri.split('/').pop();
        const publicUrl = `https://vimeo.com/${videoId}`;
        console.log('Public URL:', publicUrl);
        resolve(publicUrl);
      },
      (bytesUploaded: number, bytesTotal: number) => {
        const percentage = (bytesUploaded / bytesTotal) * 100;
        console.log(`Uploaded ${percentage.toFixed(2)}%`);
      },
      (error: string) => {
        console.error('Failed to upload the file:', error);
        reject(new Error(`Failed to upload the file: ${error}`));
      },
    );
  });
};
