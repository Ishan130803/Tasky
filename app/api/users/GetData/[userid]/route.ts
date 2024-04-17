import clientPromise from "@/lib/mongodb";
import { Document, ObjectId, PullOperator, PushOperator } from "mongodb";
export const dynamic = "force-dynamic";

interface routeParams {
  params: {
    userid: string;
  };
}

export async function GET(req: Request, context: routeParams) {
  const userid = context.params.userid;

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("Tasky");
    const userCollection = db.collection("userAccounts");

    if (!userid) {
      return new Response("user Id must be present", { status: 404 });
    }
    const user = await userCollection.findOne({ userId: new ObjectId(userid) });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }
    console.log(user?.projects, !user?.projects);
    if (!user?.projects) {
      console.log("Empty");
      const newuser = await userCollection.findOneAndUpdate(
        { userId: new ObjectId(userid) },
        { $set: { projects: [] } },
        { returnDocument: "after" }
      );
      return Response.json({ ...newuser });
    }
    return Response.json({ ...user });
  } catch (error) {
    return new Response("Fatal Error occured while getting user projects", {
      status: 500,
    });
  }
}

export async function PUT(req: Request, context: routeParams) {
  const userid = context.params.userid;

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("Tasky");
    const userCollection = db.collection("userAccounts");

    if (!userid) {
      return new Response("user Id must be present", { status: 404 });
    }
    const user = await userCollection.findOne({ userId: new ObjectId(userid) });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }
    console.log(user?.projects, !user?.projects);
    if (!user?.projects) {
      console.log("Empty");
      const newuser = await userCollection.findOneAndUpdate(
        { userId: new ObjectId(userid) },
        { $set: { projects: [] } },
        { returnDocument: "after" }
      );
      return Response.json({ ...newuser });
    }

    const data = await req.json();

    for (const item of data) {
      const { projectid } = item; // Extract userid and TaskID from item
      await userCollection.findOneAndUpdate(
        { userId: new ObjectId(userid) }, // Find user with matching userid and task_id
        { $set: { "projects.$[project]": item } }, // Update the matching task
        { arrayFilters: [{ "project.projectid": projectid }] }
      );
    }
    return new Response("Updated User Projects", { status: 200 });
  } catch (error) {
    return new Response("Fatal Error occured while updating user Projects", {
      status: 500,
    });
  }
}

export async function POST(req: Request, context: routeParams) {
  const userid = context.params.userid;

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("Tasky");
    const userCollection = db.collection("userAccounts");

    if (!userid) {
      return new Response("user Id must be present", { status: 404 });
    }
    let user = await userCollection.findOne({ userId: new ObjectId(userid) });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }
    console.log(user?.projects, !user?.projects);
    if (!user?.projects) {
      console.log("Empty");
      const newuser = await userCollection.findOneAndUpdate(
        { userId: new ObjectId(userid) },
        { $set: { projects: [] } },
        { returnDocument: "after" }
      );
      return Response.json({ ...newuser });
    }

    const data : Array<Document> = await req.json();
    //@ts-ignore
    const pushObj : PushOperator<Document> = { projects: { $each: data } }
    user = await userCollection.findOneAndUpdate(
      { userId: new ObjectId(userid) },
      { $push: pushObj }, // Add taskData to tasks array
      { returnDocument: "after" }
    );

    return new Response("Inserted Projects Successfully", { status: 200 });
  } catch (error) {
    return new Response("Fatal Error occured while inserting user projects", {
      status: 500,
    });
    // res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
}

export async function DELETE(req: Request, context: routeParams) {
  const userid = context.params.userid;
  const pid = (await req.text()).toString();

  try {
    const client = await clientPromise; // Wait for the database connection
    const db = client.db("Tasky");
    const userCollection = db.collection("userAccounts");

    if (!userid) {
      return new Response("user Id must be present", { status: 404 });
    }
    const user = await userCollection.findOne({ userId: new ObjectId(userid) });
    if (!user) {
      return new Response("No Such User", { status: 404 });
    }
    console.log(user?.projects, !user?.projects);
    if (!user?.projects) {
      console.log("Empty");
      const newuser = await userCollection.findOneAndUpdate(
        { userId: new ObjectId(userid) },
        { $set: { projects: [] } },
        { returnDocument: "after" }
      );
      return Response.json({ ...newuser });
    }
    console.log(pid,typeof pid);
    //@ts-ignore
    const pullObj : PullOperator<Document> =  { projects: { projectid: "1238" } }
    const newuser = await userCollection.updateOne(
      { userId: new ObjectId(userid) },
      { $pull: pullObj }, // Update the matching task
      // { returnDocument: "after" }
    );
    console.log(newuser);
    return new Response("Deleted Projects Successfully", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Fatal Error occured while deleting user projects", {
      status: 500,
    });
    // res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
}
