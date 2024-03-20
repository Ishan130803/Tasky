import { taskObj } from "@/types/taskClass";
import { PageWrapper } from "./PageWrapper";

import fs from "fs/promises";

const fetchData = async () => {
  const filePath = "public/tasks.json";
  const contents = await fs.readFile(filePath, "utf8");
  const jsonData = await JSON.parse(contents);
  return jsonData;
};

export default async function page() {
  const taskTree: taskObj[] = await fetchData().then(data => data);
  console.log(taskTree)
  return <PageWrapper taskList={taskTree}></PageWrapper>;
}
