import clientPromise from "@/lib/mongodb";
import { UserModel } from "@/models/user";
import { AreaChart } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { PushOperator } from "mongodb";
export const dynamic = 'force-dynamic'

type Params = {
  userid: string;
};
async function getUserId() {
  const session = await getServerSession();
  const userid = session?.user.id
  return userid
}


export async function GET(
  req: Request,
  context: { params: { userid: Array<string> } }
) {
  const userid = context.params.userid[0];

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("Tasky");
    const userCollection = db.collection("users");

    if (!userid) {
      return new Response("user Id must be present", { status: 404 });
    }
    const user = await userCollection.findOne({ userid });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }

    return Response.json({ result: [...user.tasks], count: user.tasks.length });
  } catch (error) {
    return new Response("Fatal Error occured while getting user data", {
      status: 500,
    });
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: { userid: Array<string> } }
) {
  const userid = context.params.userid[0];
  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("Tasky");
    const userCollection = db.collection("users");

    if (!userid) {
      return new Response("user Id must be present", { status: 404 });
    }
    const data = await req.json();

    for (const item of data) {
      const { task_id, ...updatedData } = item; // Extract userid and TaskID from item
      await userCollection.findOneAndUpdate(
        { userid, "tasks.task_id": task_id }, // Find user with matching userid and task_id
        { $set: { "tasks.$": item } } // Update the matching task
      );
    }

    return new Response("Updated Data", { status: 200 });
  } catch (error) {
    return new Response("Fatal Error occured while getting user data", {
      status: 500,
    });
  }
}

export async function POST(
  req: NextRequest,
  context: { params: { userid: Array<string> } }
) {
  const userid = context.params.userid[0];
  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("Tasky");
    const userCollection = db.collection("users");

    if (!userid) {
      return new Response("user Id must be present", { status: 404 });
    }
    const data = await req.json();
    const userPresent = await userCollection.findOne({userid:userid});
    if(userPresent){

      await userCollection.updateOne(
        { userid: userid },
        { $push: { tasks: { $each: data } } as unknown as PushOperator<Document>, } // Add taskData to tasks array
      ).then(()=>{
        new Response("Inserted Data Successfully", { status: 200 })
      })
      .catch((err)=>{
        new Response("Couldn't insert the data ",err);
      });
    }
    else{
      await userCollection.insertOne(
        {
          userid:userid,
          tasks:data,
        }
      ).then(()=>{
        new Response("Inserted Data Successfully", { status: 200 })
      }).catch((err)=>{
        new Response("Couldn't insert the data ",err);
      })
    }

    return new Response("Inserted Data Successfully", { status: 200 });
  } catch (error) {
    return new Response("Fatal Error occured while getting user data", {
      status: 500,
    });
    // res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: { userid: Array<string> } }
) {
  const userid = context.params.userid[0];
  const task_id = context.params.userid[1];
  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("Tasky");
    const userCollection = db.collection("users");

    if (!userid) {
      return new Response("user Id must be present", { status: 404 });
    }
    await userCollection.updateOne(
      { userid: userid },
      { $pull: { tasks: { task_id: task_id } } } // Add taskData to tasks array
    );
    return new Response("Deleted Data Successfully", { status: 200 });
  } catch (error) {
    return new Response("Fatal Error occured while getting user data", {
      status: 500,
    });
    // res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
}
