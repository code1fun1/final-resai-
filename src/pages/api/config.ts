import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { serverRuntimeConfig } = getConfig() || {};

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  return res.status(200).json({
    websiteUrl: serverRuntimeConfig?.WebsiteUrl || ''
  });
}
