import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { serverRuntimeConfig } = getConfig();
  const { WEB_RAZORPAYKEY } = serverRuntimeConfig;

  res.status(200).json({ key: WEB_RAZORPAYKEY });
}
