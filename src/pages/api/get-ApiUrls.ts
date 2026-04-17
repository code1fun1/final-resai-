import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { serverRuntimeConfig } = getConfig();
  const { apiUrl } = serverRuntimeConfig;

  res.status(200).json({ apiUrl });
}
