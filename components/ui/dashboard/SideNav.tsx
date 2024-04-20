// components/SideNav.js
"use client";

import React, { useEffect, useState, createContext } from "react";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PushPinIcon from "@mui/icons-material/PushPin";
import ExploreIcon from "@mui/icons-material/Explore";
import FolderIcon from "@mui/icons-material/Folder";
import Link from "next/link";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSession } from "next-auth/react";
import { LoaderIcon } from "lucide-react";
import ProjectForm from "@/app/dashboard/form/projectform";
import { Project } from "@/types/projects";
import { useProjectList } from "@/context/ProjectListContext";
import SidenavProjectListButtons from "./SideNavProjectListButtons";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  backgroundColor: "rgb(13, 27, 62)",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  backgroundColor: "rgb(13, 27, 62)",
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

interface SideNavProps {}

const SideNav: React.FC<SideNavProps> = ({}) => {
  const projectList = useProjectList()
  const [isLoading, setIsloading] = useState<boolean>(true);
  const [open, setOpen] = React.useState(false);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const handleForm = () => {
    if (formOpen) {
      setFormOpen(false);
    } else {
      setFormOpen(true);
    }
  };

  const handleProjects = (data: Project) => {
    projectList.setProjects([...projectList.projects, data]);
  };

  const navlinks = [
    { name: "My Actions", route: "/dashboard/" },
    { name: "Project Navigator", route: "dashboard/projectNavigator" },
    { name: "Pinned", route: "/dashboard/pinned" },
  ];
  const navIcons = [
    <HomeIcon key={navlinks[0].name} />,
    <ExploreIcon key={navlinks[1].name} />,
    <PushPinIcon key={navlinks[2].name} />,
  ];
  const theme = useTheme();
  const handleClick = () => {
    if (open) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  let session = useSession();
  const userid = session.data?.user?.id;
  const baseUrl = global.window?.location?.origin;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userid) {
          // If userid is undefined, retry fetching after a delay
          setTimeout(fetchData, 1000); // Retry after 1 second
          return;
        }

        const response = await fetch(`${baseUrl}/api/users/GetData/${userid}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        projectList.setProjects(result);
        setIsloading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [userid]);

  return (
    <>
      <Drawer variant="permanent" className="z-10 " open={open}>
        <DrawerHeader className="">
          <div
            className={
              open ? "w-full flex justify-end" : "w-full flex justify-center"
            }
          >
            <button onClick={handleClick} className="text-white">
              {!open ? (
                <MenuIcon />
              ) : theme.direction === "rtl" ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </button>
          </div>
        </DrawerHeader>
        <hr className="border-slate-700" />
        <ul>
          {navlinks.map((navlink, index) => (
            <li key={navlink.name} className="px-4 py-3 hover:bg-gray-600/50 ">
              <Link href={navlink.route}>
                <div className="flex gap-5  text-white">
                  <div>{navIcons[index]}</div>
                  <span className={!open ? "opacity-0" : "opacity-90"}>
                    {navlink.name}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <hr className="border-slate-700" />
        <ul className="text-white">
          <li
            key={"project"}
            className="px-4 py-3 opacity-9  cursor-pointer hover:bg-gray-600/50 flex gap-5"
            onClick={() => {
              setOpen(true);
            }}
          >
            <FolderIcon></FolderIcon>
            <div
              className={
                open
                  ? "flex justify-between content-center w-full"
                  : "opacity-0"
              }
            >
              <span>Projects</span>
              <button onClick={handleForm}>
                <AddBoxIcon />
              </button>
            </div>
          </li>
          <ul className={open ? "opacity-100" : "opacity-0"}>
            {isLoading ? (
              <li className="px-16 py-2 rotate-180">
                <LoaderIcon></LoaderIcon>
              </li>
            ) : (
              projectList.projects.map((project, index) => {
                return (
                  <SidenavProjectListButtons
                    key={index}
                    setProjectList={projectList.setProjects}
                    className="pl-16 py-2 pr-2 cursor-pointer hover:bg-gray-600/50 "
                    projectData={project}
                    userid = {userid!}
                  >
                    {`${index+1}. ${project.projectName}`}
                  </SidenavProjectListButtons>
                );
              })
            )}
          </ul>
        </ul>
      </Drawer>
      {formOpen && (
        <div className="fixed top-0 left-0  w-full h-full bg-black/10 flex justify-center items-center  content-center z-20">
          <ProjectForm
            openForm={handleForm}
            createProjects={handleProjects}
          ></ProjectForm>
        </div>
      )}
    </>
  );
};

export default SideNav;
