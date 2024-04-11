// components/SideNav.js
"use client";

import { Project } from "@/types/projects";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PushPinIcon from "@mui/icons-material/PushPin";
import ExploreIcon from "@mui/icons-material/Explore";
import FolderIcon from "@mui/icons-material/Folder";
import taskyIcon from "/taskyIcon.png";
import Link from "next/link";
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Button } from "@mui/material";


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));


interface SideNavProps {
  projects: Project[];
  openForm: React.EventHandler<React.MouseEvent<HTMLElement>>;
}

const SideNav: React.FC<SideNavProps> = ({ projects,openForm }) => {
  const navlinks = ["My actions", "Project Navigator", "Pinned"];
  const navIcons = [<HomeIcon />, <ExploreIcon />, <PushPinIcon />];
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleClick = ()=>{
    if(open){
      setOpen(false);
    }
    else{
      setOpen(true);
    }
  }
  return (
    <>
      <Drawer variant="permanent" className="z-10" open={open}>
        <DrawerHeader>
          <div>
            <button onClick={handleClick}>
              {!open ? (
                <MenuIcon />
              ) : theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </button>
          </div>
        </DrawerHeader>
        <Divider />
        <ul>

          {navlinks.map((link, index) => (
            <li key={link} className="px-4 py-3 hover:bg-gray-100">
                <Link href={"#"} >
                  <div className="flex gap-5 ">
                    {navIcons[index]}
                    <span
                     className={!open?("opacity-0"):("opacity-90")}
                    >{link}</span>
                  </div>
                </Link>
            </li>
          ))}
        </ul>
        <Divider />

        <ul >
          <li key={'project'}  className="px-4 py-3 opacity-9  cursor-pointer hover:bg-gray-100 flex gap-5" onClick={()=>{setOpen(true)}}>
            
            <FolderIcon ></FolderIcon>
            <div 
            className={open?("flex justify-between content-center w-full"):"opacity-0"}
            >
              <span >Projects</span>
              <button onClick={openForm}>
                <AddBoxIcon/>
              </button>
            </div>
          </li>
          <ul className={open?("opacity-100"):("opacity-0")}>
            {projects.map((project, index) => (
              <>
                <li key = {project.name} className="px-16 py-2 cursor-pointer hover:bg-gray-100 ">
                  <Link href={"#"}>
                    {project.name}
                  </Link>
                </li>
              </>
            ))}
          </ul>
        </ul>
      </Drawer>
    </>
  );
};

export default SideNav;
