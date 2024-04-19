import clientPromise from "@/lib/mongodb";
import { useValueWithTimezone } from "@mui/x-date-pickers/internals/hooks/useValueWithTimezone";
import { validateHeaderValue } from "http";
import { Document, ObjectId, PullOperator, PushOperator } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
export const dynamic = "force-dynamic";

interface routeParams {
  params: {
    userid: string;
  };
}

export async function GET(req: NextRequest, context: routeParams) {
  const userid = context.params.userid;
  const pid = req.nextUrl.searchParams.get("pid");

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
    let projects;
    if (!pid) {
      projects = await projectCollection
        .find({ userId: userid })
        .toArray();
    } else {
      projects = await projectCollection
        .find({ userId: userid, projectid : pid})
        .toArray();
    }
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

    const updatedData: Array<Document> = await req.json();

    if (updatedData.length === 0) {
      return NextResponse.json(
        { message: "No Data to Update" },
        { status: 201 }
      );
    }

    const bulkOps = updatedData.map(
      ({ projectid, userId, _id, ...restOfData }) => ({
        updateOne: {
          filter: { projectid: projectid, userId: userid },
          update: { $set: restOfData },
        },
      })
    );

    const res = await projectCollection.bulkWrite(bulkOps, { ordered: true });
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

    const dataWithUserId = data.map((value) => ({
      ...value,
      projectid: uuidv4(),
      userId: userid,
    }));

    const res = await projectCollection.insertMany(dataWithUserId);

    return NextResponse.json(
      {
        message: "Inserted data Successfully",
        json: { serverResponse: res, data: dataWithUserId },
      },
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

    const taskCollection =
      db.collection("userTasks") ?? (await db.createCollection("userTasks"));

    const user = await userCollection.findOne({ userId: new ObjectId(userid) });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }

    const proj_res = await projectCollection.deleteOne({
      userId: userid,
      projectid: projectid,
    });

    const task_res = await taskCollection.deleteMany({
      userId: userid,
      projectid: projectid,
    });

    if (proj_res.deletedCount) {
      return NextResponse.json(
        {
          message: "No such data to delete",
          proj_res: proj_res,
          task_res: task_res,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Deleted data Successfully",
          proj_res: proj_res,
          task_res: task_res,
        },
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
