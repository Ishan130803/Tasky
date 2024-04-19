"use client";
import { useActiveProject } from "@/context/ActiveProjectContextProvider";
import { useRouter } from "next/navigation";
import { Tooltip } from "@mui/joy";
import { validateHeaderValue } from "http";
import { Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import * as React from "react";

interface ISidenavProjectListButtonsProps
  extends React.HTMLAttributes<HTMLLIElement> {
  projectData: any;
  userid: string;
  setProjectList: React.Dispatch<React.SetStateAction<any[]>>;
}
// specially crafted to display the project list
const SidenavProjectListButtons: React.FunctionComponent<
  ISidenavProjectListButtonsProps
> = ({ projectData, userid, className, ...props }) => {
  const activeProject = useActiveProject();
  const isActiveProject: boolean =
    activeProject.project.projectid == projectData.projectid;
  const router = useRouter();
  const deleteProjectHandler = () => {
    const baseUrl = global.window?.location?.origin;
    const deleteFronDb = async () => {
      const res = await fetch(
        `${baseUrl}/api/users/GetData/${userid}?pid=${projectData.projectid}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        router.replace(`${baseUrl}/dashboard`);
        props.setProjectList((prev) =>
          prev.filter((val) => val.projectid != projectData.projectid)
        );
      }
    };
    deleteFronDb();
  };
  return (
    <Tooltip title={projectData.projectName ?? ""} variant="solid">
      <Link href={`/dashboard/projects/${projectData.projectid}`}>
        <li className="flex justify-between content-center ml-12 mr-2 my-1 cursor-pointer">
          <span
            className={`flex justify-between hover:bg-gray-600/50 w-full p-2 rounded-xl ${
              isActiveProject
                ? "bg-white text-slate-700 hover:bg-slate-200"
                : ""
            }`}
          >
            <span className="line-clamp-1 text-ellipsis">{props.children}</span>
            <Trash2
              onClick={deleteProjectHandler}
              className="flex-shrink-0 hover:bg-slate-300 rounded-lg p-1 text-xl"
            ></Trash2>
          </span>
        </li>
      </Link>
    </Tooltip>
  );
};

export default SidenavProjectListButtons;
