"use client";
import { useActiveProject } from "@/context/ActiveProjectContextProvider";
import { Tooltip } from "@mui/joy";
import { validateHeaderValue } from "http";
import { Trash, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const activeProject = useActiveProject();
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
        if (activeProject.project.projectid === projectData.projectid) {
          router.replace(`${baseUrl}/dashboard`);
          activeProject.setProject({});
        }
        props.setProjectList((prev) =>
          prev.filter((val) => val.projectid != projectData.projectid)
        );
      }
    };
    deleteFronDb();
  };

  const isActiveProject: boolean =
    activeProject.project.projectid == projectData.projectid;
  return (
    <Tooltip title={projectData.projectName ?? ""} variant="solid">
      <li className="flex justify-between content-center ml-12 mr-2 my-1 cursor-pointer" onClick={()=>router.push(`/dashboard/projects/${projectData.projectid}`)}>
        <span
          className={`flex justify-between hover:bg-gray-600/50 w-full p-2 rounded-xl ${
            isActiveProject ? "bg-white text-slate-700 hover:bg-slate-200" : ""
          }`}
        >
            <span className="line-clamp-1 text-ellipsis">{props.children}</span>
          <Trash2
            onClick={(e) => {
              e.stopPropagation();
              deleteProjectHandler();
            }}
            className="flex-shrink-0 hover:bg-slate-300 rounded-lg p-1 text-xl"
          ></Trash2>
        </span>
      </li>
    </Tooltip>
  );
};

export default SidenavProjectListButtons;
