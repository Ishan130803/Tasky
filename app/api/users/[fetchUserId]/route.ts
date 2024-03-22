import { authOptions } from @/lib/auth";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET(req : Request,res : Response,{params} : {params:{fetchUserId:string}}) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({message : "Unauthorized"}, {status : 401})
  }
  const client = await clientPromise
  const database = client.db("Tasky")
  const isDbUser = await database.collection("users").findOne({[params.fetchUserId] : {$exists : true}})
  if (!isDbUser) {
    return NextResponse.json({message : "Not a registered User"},{status : 401})
  }
  const data = isDbUser.toArray()
  res.json = data


  console.log(isDbUser)
  return NextResponse.json({})

}