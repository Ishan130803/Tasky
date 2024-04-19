import clientPromise from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { Document, ObjectId } from "mongodb";
import { v4 as uuid } from "uuid";

export const dynamic = "force-dynamic";

type Params = {
  userid: string;
};
async function getUserId() {
  const session = await getServerSession();
  const userid = session?.user.id;
  return userid;
}

interface routeParams {
  params: {
    userid: string;
    projectid: Array<string>;
  };
}

export async function GET(req: NextRequest, context: routeParams) {
  const userid = context.params.userid;
  const projectid = context.params.projectid[0];

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("Tasky");
    const userCollection = db.collection("userAccounts");
    const projectCollection =
      db.collection("userProjects") ??
      (await db.createCollection("userProjects"));
    const taskCollection =
      db.collection("userTasks") ?? (await db.createCollection("userTasks"));

    const user = await userCollection.findOne({ userId: new ObjectId(userid) });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }
    const project = await projectCollection.findOne({
      userId: userid,
      projectid: projectid,
    });

    if (!project) {
      return new Response("No Such Project", { status: 404 });
    }

    const tasks = await taskCollection
      .find({ userId: userid, projectid: projectid })
      .toArray();

    return Response.json({ result: [...tasks], count: tasks.length });
  } catch (error) {
    console.error(error);
    return new Response("Fatal Error occured while getting user projects", {
      status: 500,
    });
  }
}

export async function PUT(req: NextRequest, context: routeParams) {
  const uid = context.params.userid;
  const pid = context.params.projectid[0];

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("Tasky");
    const userCollection = db.collection("userAccounts");
    const projectCollection =
      db.collection("userProjects") ??
      (await db.createCollection("userProjects"));
    const taskCollection =
      db.collection("userTasks") ?? (await db.createCollection("userTasks"));

    const user = await userCollection.findOne({ userId: new ObjectId(uid) });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }
    const project = await projectCollection.findOne({
      userId: uid,
      projectid: pid,
    });

    if (!project) {
      return new Response("No Such Project", { status: 404 });
    }
    const updatedData: Array<Document> = await req.json();

    if (updatedData.length === 0) {
      return NextResponse.json(
        { message: "No Data to Update" },
        { status: 201 }
      )
    }

    const bulkOps = updatedData.map(
      //@ts-ignore
      ({ projectid, userId, task_id, _id, ...restOfData }) => ({
        updateOne: {
          filter: { projectid: pid, userId: uid, task_id: task_id },
          update: { $set: restOfData },
        },
      })
    );


    const res = await taskCollection.bulkWrite(bulkOps, { ordered: true });
    return NextResponse.json(
      { message: "Updated Projects Successfully", json: res },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return new Response(
      `Fatal Error occured while updating user tasks ${error.message}`,
      {
        status: 500,
      }
    );
  }
}

export async function POST(req: NextRequest, context: routeParams) {
  const userid = context.params.userid;
  const projectid = context.params.projectid[0];

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("Tasky");
    const userCollection = db.collection("userAccounts");
    const projectCollection =
      db.collection("userProjects") ??
      (await db.createCollection("userProjects"));
    const taskCollection =
      db.collection("userTasks") ?? (await db.createCollection("userTasks"));

    const user = await userCollection.findOne({ userId: new ObjectId(userid) });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }
    const project = await projectCollection.findOne({
      userId: userid,
      projectid: projectid,
    });

    if (!project) {
      return new Response("No Such Project", { status: 404 });
    }
    const data: Array<Document> = await req.json();

    const dataWithUserIdProjectId = data.map((value) => ({
      ...value,
      userId: userid,
      projectid: projectid,
    }));


    const res = await taskCollection.insertMany(dataWithUserIdProjectId);

    return NextResponse.json(
      { message: "Inserted tasks Successfully", json: res },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response("Fatal Error occured while inserting user tasks", {
      status: 500,
    });
    // res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
}

export async function DELETE(req: Request, context: routeParams) {
  const userid = context.params.userid;
  const projectid = context.params.projectid[0];
  const task_id = context.params.projectid[1];

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("Tasky");
    const userCollection = db.collection("userAccounts");
    const projectCollection =
      db.collection("userProjects") ??
      (await db.createCollection("userProjects"));
    const taskCollection =
      db.collection("userTasks") ?? (await db.createCollection("userTasks"));

    const user = await userCollection.findOne({ userId: new ObjectId(userid) });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }
    const project = await projectCollection.findOne({
      userId: userid,
      projectid: projectid,
    });

    if (!project) {
      return new Response("No Such Project", { status: 404 });
    }

    const res = await taskCollection.deleteOne({
      userId: userid,
      projectid: projectid,
      task_id: task_id,
    });

    return NextResponse.json(
      { message: "Inserted tasks Successfully", json: res },
      { status: 200 }
    );
  } catch (error) {
    return new Response("Fatal Error occured while deleting user data", {
      status: 500,
    });
    // res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
}
