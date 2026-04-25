import { NextApiRequest, NextApiResponse } from 'next';
import { S3, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb'
    }
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { file, fileName, fileType } = req.body;
    const S3_ACCESS_KEY_ID = process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID ?? '';
    const S3_SECRET_KEY = process.env.NEXT_PUBLIC_S3_SECRET_KEY ?? '';
    const S3_BUCKET_NAME = process.env.NEXT_PUBLIC_S3_BUCKET_NAME ?? '';
    const S3_REGION = process.env.NEXT_PUBLIC_S3_REGION ?? '';

    const fileSize = Buffer.from(file, 'base64').length;
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes

    if (fileSize > maxSize) {
      // console.log(`File size ${fileSize} exceeds limit ${maxSize}`);
      return res.status(413).json({
        status: 'failed',
        message: `File size exceeds the 10MB limit. Current size: ${(fileSize / (1024 * 1024)).toFixed(2)}MB`
      });
    }

    const S3Client = new S3({
      region: S3_REGION,
      credentials: {
        accessKeyId: S3_ACCESS_KEY_ID,
        secretAccessKey: S3_SECRET_KEY
      }
    });

    const params = {
      Bucket: S3_BUCKET_NAME,
      Key: fileName,
      Body: Buffer.from(file, 'base64'),
      ContentType: fileType
    };

    await S3Client.send(new PutObjectCommand(params));
    const command = new GetObjectCommand(params);
    const uploadUrl = await getSignedUrl(S3Client, command);
    // console.log('res',res)
    return res.status(200).json({ status: 'success', data: uploadUrl });
  } catch (error) {
    // console.error('S3 upload error:', error);
    return res.status(500).json({
      status: 'failed',
      message: error instanceof Error ? error.message : 'Upload failed'
    });
  }
}
