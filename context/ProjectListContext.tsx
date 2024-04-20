"use client"
import { useSession } from "next-auth/react";
import * as React from "react";
import { Context, createContext, useContext } from "react";

interface ProjectListContextInterface {
  projects: any[];
  setProjects: React.Dispatch<React.SetStateAction<any[]>>;
  loading: boolean;
}

/**
 * ## ProjectListContext
 */
export const ProjectListContext: Context<ProjectListContextInterface> =
  createContext<ProjectListContextInterface>(null as any);

ProjectListContext.displayName = "ProjectListContext";

export const useProjectList = (): ProjectListContextInterface =>
  useContext(ProjectListContext);








interface IProjectListContextProviderWrapperProps {
  children: React.ReactNode;
}

const ProjectListContextProviderWrapper: React.FunctionComponent<
  IProjectListContextProviderWrapperProps
> = (props) => {
  let session = useSession();
  const userid = session.data?.user?.id;
  const baseUrl = global.window?.location?.origin;
  const [projects, setProjects] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (!userid) {
          // If userid is undefined, retry fetching after a delay
          setTimeout(fetchData, 500); // Retry after 1 second
          return;
        }

        const response = await fetch(`${baseUrl}/api/users/GetData/${userid}`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setProjects(result);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [userid]);

  return (
    <ProjectListContext.Provider
      value={{
        loading: isLoading,
        projects: projects,
        setProjects: setProjects,
      }}
    >
      {props.children}
    </ProjectListContext.Provider>
  );
};

export default ProjectListContextProviderWrapper;
