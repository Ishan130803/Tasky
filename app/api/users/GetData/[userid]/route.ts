import clientPromise from "@/lib/mongodb";
import { useValueWithTimezone } from "@mui/x-date-pickers/internals/hooks/useValueWithTimezone";
import { validateHeaderValue } from "http";
import { Document, ObjectId, PullOperator, PushOperator } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

interface routeParams {
  params: {
    userid: string;
  };
}

export async function GET(req: NextRequest, context: routeParams) {
  const userid = context.params.userid;

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("Tasky");
    const userCollection = db.collection("userAccounts");
    const projectCollection =
      db.collection("userProjects") ??
      (await db.createCollection("userProjects"));

    const user = await userCollection.findOne({ userId: new ObjectId(userid) });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }

    const projects = await projectCollection.find({ userId: userid }).toArray();

    console.log(projects);

    return Response.json([...projects]);
  } catch (error) {
    console.error(error);
    return new Response("Fatal Error occured while getting user projects", {
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, context: routeParams) {
  const userid = context.params.userid;

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("Tasky");
    const userCollection = db.collection("userAccounts");
    const projectCollection =
      db.collection("userProjects") ??
      (await db.createCollection("userProjects"));

    const user = await userCollection.findOne({ userId: new ObjectId(userid) });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }

    const updatedData:Array<Document> = await req.json();

    const bulkOps = updatedData.map(({ projectid, userId, ...restOfData }) => ({
      updateOne: {
        filter: { projectid: projectid, userId: userid},
        update: { $set: restOfData },
      },
    }));
    
    const res = await projectCollection.bulkWrite(bulkOps, { ordered: true },);
    return NextResponse.json(
      { message: "Updated Projects Successfully", json: res },
      { status: 200 }
    );

  } catch (error) {
    return new Response("Fatal Error occured while updating user Projects", {
      status: 500,
    });
  }
}

export async function POST(req: NextRequest, context: routeParams) {
  const userid = context.params.userid;

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("Tasky");
    const userCollection = db.collection("userAccounts");
    const projectCollection =
      db.collection("userProjects") ??
      (await db.createCollection("userProjects"));

    const user = await userCollection.findOne({ userId: new ObjectId(userid) });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }

    const data: Array<Document> = await req.json();

    const dataWithUserId = data.map((value) => ({ ...value, userId: userid }));

    const res = await projectCollection.insertMany(dataWithUserId);

    return NextResponse.json(
      { message: "Inserted data Successfully", json: res },
      { status: 200 }
    );
  } catch (error) {
    return new Response("Fatal Error occured while inserting user projects", {
      status: 500,
    });
    // res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
}

export async function DELETE(req: NextRequest, context: routeParams) {
  const userid = context.params.userid;
  const projectid = req.nextUrl.searchParams.get("pid");

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("Tasky");
    const userCollection = db.collection("userAccounts");
    const projectCollection =
      db.collection("userProjects") ??
      (await db.createCollection("userProjects"));

    const user = await userCollection.findOne({ userId: new ObjectId(userid) });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }

    const res = await projectCollection.deleteOne({
      userId: userid,
      projectid: projectid,
    });

    if (res.deletedCount) {
      return NextResponse.json(
        { message: "No such data to delete", json: res },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Deleted data Successfully", json: res },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
    return new Response("Fatal Error occured while deleting user projects", {
      status: 500,
    });
    // res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
}
