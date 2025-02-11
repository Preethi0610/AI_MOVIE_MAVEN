import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, password } = req.body;

    // Input validation
    if (!email || !password || !name) {
      return res.status(400).json({ message: 'Name, email, and password are required.' });
    }

    try {
      // Check if a user with the same email already exists using queryRaw
      const existingUser = await prisma.$queryRaw`
        SELECT TOP 1 * FROM users WHERE email = ${email} ;
      `;

      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'User already exists with this email.' });
      }

      // Store the user's password directly (plaintext)
      const newUser = await prisma.$queryRaw`
        INSERT INTO users (name, email, password)
        VALUES (${name}, ${email}, ${password})
       
      `;

      // Return success message
      return res.status(201).json({
        message: 'User registered successfully!',
        user: newUser[0], // Retrieve first row of the returned data
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
