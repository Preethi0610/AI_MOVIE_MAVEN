import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        try {
           
            const user = await prisma.$queryRaw`
                SELECT * FROM users WHERE email = ${email};
            `;

            if (user.length === 0) {
                return res.status(404).json({ message: 'User not found. Please register first.' });
            }

            const userData = user[0]; 
            
            const pass = user[0].password;
            if (password !== pass) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            return res.status(200).json({
                
               
                    id: userData.id,
                    email: userData.email,
                    name: userData.name,
                
            });

        } catch (error) {
            console.error('Error logging in:', error);
            return res.status(500).json({ message: 'Internal server error.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
    }
}
