import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: Request) {
  const { id } = await request.json();
  console.log(id)
  const client = await clientPromise;
  const database = client.db("Tasky");
  const isDbUser = await database.collection("users").findOne({[id] : {$exists : true}})
  if (isDbUser) {
    console.log("user already Registered")
    return NextResponse.json({message : "User already Registered"},{status : 200})
  }
  await database.collection('users').insertOne({
    [id] : {
      tasks : [],
      groups : [],
      owns : [],
      partOf : [],
    }
  })
  return NextResponse.json({message : "User Registered"},{status : 201})
}
