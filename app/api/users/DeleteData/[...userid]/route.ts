import clientPromise from "@/lib/mongodb";
import { UserModel } from "@/models/user";
import { AreaChart } from "lucide-react";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";


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
    return new Response(`user_id:${userid} task_id:${task_id}`, {status:200}) // test respnse

    for (const item of data){
    await userCollection.updateOne(
      { userid: userid },
      { $pull: { tasks: { task_id : item.task_id }}} // Add taskData to tasks array
    );}
    console.log("Data deleted");
    return new Response("Deleted Data Successfully", { status: 200 });
  } catch (error) {
    console.error("Error fetching data from MongoDB:", error);
    return new Response("Fatal Error occured while getting user data", {
      status: 500,
    });
    // res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
}