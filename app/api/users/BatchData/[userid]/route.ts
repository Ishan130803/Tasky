// pages/api/BatchData.js
import clientPromise from '@/lib/mongodb';
import { UserModel } from '@/models/user'; // Import UserModel from your models file

export async function POST(req , res, params:{userid:string} ) {
  const userid = params.userid
  try {

    const client = await clientPromise; // Wait for the database connection

    const db = client.db('Tasky');

    if (!userid) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    const { added, changed, deleted } = req.body;

    if (added && added.length > 0) {
      for (const item of added) {
        const { ...taskData } = item; // Extract userid from item
        await UserModel.findOneAndUpdate(
          { userid },
          { $push: { tasks: taskData } } // Add taskData to tasks array
        );
        console.log('Data inserted');
      }
    }

    if (changed && changed.length > 0) {
      for (const item of changed) {
        const { TaskID, ...updatedData } = item; // Extract userid and TaskID from item
        await UserModel.findOneAndUpdate(
          { userid, 'tasks.task_id': TaskID }, // Find user with matching userid and task_id
          { $set: { 'tasks.$': updatedData } } // Update the matching task
        );
        console.log('Data updated');
      }
    }

    if (deleted && deleted.length > 0) {
      for (const item of deleted) {
        const { userid, TaskID } = item; // Extract userid and TaskID from item
        await UserModel.findOneAndUpdate(
          { userid },
          { $pull: { tasks: { task_id: TaskID } } } // Remove task with matching task_id
        );
        console.log('Data deleted');
      }
    }

    res.status(200).json(req.body);
  } catch (error) {
    console.error('Error performing batch operation:', error);
    res.status(500).json({ error: 'Error performing batch operation' });
  }
}
