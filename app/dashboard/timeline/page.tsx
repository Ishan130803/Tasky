import { taskObj } from "@/types/taskClass";
import { PageWrapper } from "./PageWrapper";

import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { GanttChart } from "@/components/Charts/GanttChart";

// const fetchData = async () => {
//   // const filePath = "public/tasks.json";
//   // const contents = await fs.readFile(filePath, "utf8");
//   // const jsonData = await JSON.parse(contents);

//   return jsonData;
// };

const fetchData = async () => {
 
  console.log("Registered")

  const session = await getServerSession(authOptions);
  if (!session) {
    return [];
  }
  const {
    user: { id },
  } = session;
  const client = await clientPromise;
  const database = client.db("Tasky");
  const isDbUser = await database
    .collection("users")
    .findOne({ [id]: { $exists: true } });
  if (isDbUser) {
    const data = isDbUser;
    console.log(data[id]);
    console.log(data[id].tasks);
    return data[id].tasks;
  }
};

export default async function page() {
  // const taskTree: taskObj[] = await fetchData().then((data) => data);
  // console.log(taskTree)
  return (
    <>
      <GanttChart />
    </>
  );
}
