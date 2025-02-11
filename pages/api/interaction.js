import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id, history, isliked } = req.body;

    // Input validation
    if (!id || !history) {
      return res.status(400).json({ message: 'id and history are required.' });
    }

    try {
      // Check if a user with the same email already exists using queryRaw
      await prisma.$queryRaw`
      exec sp_userhistory ${id},${history},${isliked}
      `;


      // Return success message
      return res.status(200).json({
        message: 'history recorded!',
        
      });
    } catch (error) {
      console.error('Error registering user:', error);
      return res.status(500).json({
        message: 'Internal Server Error',
        error: error.message,
      });
    }
  } else {
    // Allow only POST method
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}
