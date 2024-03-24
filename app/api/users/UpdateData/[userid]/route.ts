import { UserModel } from '@/models/user';
import { AreaChart } from 'lucide-react';
import { NextResponse } from 'next/server';
import mongoose from 'mongoose';

type Params = {
  userid: string
}

export async function PUT(req : Request, context: { params: {userid : string }}) {
  const userid = context.params.userid
  try {
    const uri = process.env.MONGODB_URI as string
    const clientPromise = mongoose.connect(uri + "Tasky")
    const client = await clientPromise; 

    if (!userid) {
      return new Response("user Id must be present", {status : 404})
    }

    


    // for (const item of changed) {
    //   const { TaskID, ...updatedData } = item; // Extract userid and TaskID from item
    //   await UserModel.findOneAndUpdate(
    //     { userid, 'tasks.task_id': TaskID }, // Find user with matching userid and task_id
    //     { $set: { 'tasks.$': updatedData } } // Update the matching task
    //   );
    //   console.log('Data updated');
    // }
    
    
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error);
    return new Response("Fatal Error occured while getting user data", {status : 500})
    // res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
}
