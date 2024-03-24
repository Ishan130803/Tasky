import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
  const data = await request.json()
  console.log('route',data);
  const userid = data.userid
  if (!userid) {
    return new Response("Invalid User Id Received while creating User", {
      status: 422,
    });
  }
  try {
    const client = await clientPromise;
    const db = client.db("Tasky");
    const userCollection = db.collection("users");
    const isDbUser = await userCollection.findOne({userid : userid})

    if (isDbUser) {
      return new Response("User Already Exists warning",{status : 200})
    }

    await userCollection.insertOne({
      userid: userid,
      tasks: [],
    });
  } catch (error) {
    return new Response("Unable to fetch the data from database",{status : 500} )
  }
  return Response.json({ message: "User Registered" }, { status: 201 });
}

export async function GET(req : Request) {
  return new Response("Forbidden",{status : 403})
}
