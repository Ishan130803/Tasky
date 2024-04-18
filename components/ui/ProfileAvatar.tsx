"use client";
import { Avatar, Button, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { signOut, useSession } from "next-auth/react";
import { FC, HTMLAttributes, useState } from "react";

export const ProfileAvatar: FC<HTMLAttributes<HTMLDivElement>> = (props) => {
  const session = useSession();
  const imageURL = session.data?.user?.image as string;
  const [open, setopen] = useState<boolean>(false);
  return (
    <div {...props}>
      <Dropdown open={open}>
        <MenuButton
          onClick={() => setopen(true != open)}
          className="hover:cursor-pointer  border-1 size-fit"
        >
          <Avatar src={imageURL}></Avatar>
        </MenuButton>
        <Menu>
          <MenuItem onClick={()=>signOut()}>SignOut</MenuItem>
        </Menu>
      </Dropdown>
    </div>
  );
};
