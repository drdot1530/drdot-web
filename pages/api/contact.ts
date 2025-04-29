import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { fullname, email, phone, message } = req.body;

  if (!fullname || !email || !message) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Here you would implement your email sending logic or other processing
  // For demonstration, we just return success

  return res.status(200).json({ message: 'Message received successfully' });
}
