// pages/api/BatchData.js
// import clientPromise from '@/lib/mongodb';
import { UserModel } from '@/models/user'; // Import UserModel from your models file
import mongoose from 'mongoose';

export async function POST(req : Request,  context: { params: {userid : string }}) {
  const userid = context.params.userid
  try {
    const uri = process.env.MONGODB_URI as string
    const clientPromise = mongoose.connect(uri + "Tasky")
    const client = await clientPromise; // Wait for the database connection


    if (!userid) {
      return new Response("user Id must be present", {status : 404})
    }
    console.log(req)
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
    return new Response("Upadation Successful", {status : 200})
  } catch (error) {
    console.error('Error performing batch operation:', error);
    return new Response("Fatal Error occured while getting user data", {status : 500})
  }
}


