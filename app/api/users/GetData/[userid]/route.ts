import clientPromise from '@/lib/mongodb';
import { UserModel } from '@/models/user';

export async function POST(req, res, params:{userid:string}) {
  const userid = params.userid
  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db('Tasky');

    if (!userid) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const user = await UserModel.findOne({ userid });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user.tasks); // Return user's tasks

  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
}