"use client";
import {
  Avatar,
  Button,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Tooltip,
} from "@mui/joy";
import { LogOutIcon, Settings } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { FC, HTMLAttributes, useState } from "react";

export const ProfileAvatar: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const session = useSession();
  const imageURL = session.data?.user?.image as string;
  const [open, setopen] = useState<boolean>(false);
  return (
    <Tooltip
      title={
        <ul className="font-mono">
          <li>{`Name  : ${session.data?.user?.name} `}</li>
          <li>{`Email : ${session.data?.user?.email}`}</li>
        </ul>
      }
      variant="solid"
      disableHoverListener={open}
      disableInteractive={open}
    >
      <div {...props}>
        <Dropdown open={open}>
          <MenuButton
            onClick={() => setopen(true != open)}
            className="hover:cursor-pointer  border-1 size-fit"
          >
            <Avatar src={imageURL} className="w-9 h-9"></Avatar>
          </MenuButton>
          <Menu>
            <div className="p-4 flex flex-col gap-2">
              <div className="flex gap-4 p-2 hover:bg-slate-200 rounded-xl">
                <img
                  src={imageURL}
                  className="size-12 rounded-full ring-blue-700 ring-2"
                  alt=""
                />
                <div className="flex items-center">
                  <ul>
                    <li className="font-bold">{session.data?.user?.name}</li>
                    <li>{session.data?.user?.email}</li>
                  </ul>
                </div>
              </div>
              <div className="flex gap-4">
                <Button
                  className="text-black hover:text-white w-full"
                  onClick={() => signOut()}
                >
                  <span className="flex gap-2 items-center ">
                    <LogOutIcon size={16}></LogOutIcon>
                    <span className="text-[16px]">Sign Out</span>
                  </span>
                </Button>
                <Button
                  className="text-black hover:text-white w-full"
                >
                  <span className="flex gap-2 items-center ">
                    <Settings size={16}></Settings>
                    <span className="text-[16px]">Settings</span>
                  </span>
                </Button>
              </div>
            </div>
          </Menu>
        </Dropdown>
      </div>
    </Tooltip>
  );
};
