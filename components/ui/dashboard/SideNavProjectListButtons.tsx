"use client";
import { Tooltip } from "@mui/joy";
import { Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import * as React from "react";

interface ISidenavProjectListButtonsProps
  extends React.HTMLAttributes<HTMLLIElement> {
  projectData: any;
  userid: string;
}
// specially crafted to display the project list
const SidenavProjectListButtons: React.FunctionComponent<
  ISidenavProjectListButtonsProps
> = ({ projectData, userid, ...props }) => {
  const deleteProjectHandler = () => {
    const baseUrl = global.window?.location?.origin;
    fetch(
      `${baseUrl}/api/users/GetData/${userid}?pid=${projectData.projectid}`,
      {
        method: "DELETE",
      }
    );
  };
  return (
    <Tooltip title={projectData.projectName ?? ""} variant="solid">
      <Link href={`/dashboard/projects/${projectData.projectid}`}>
        <li {...props}>
          <span className="flex justify-between content-center w-full">
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
