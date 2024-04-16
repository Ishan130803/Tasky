import { Button } from "@mui/material";
import React from "react";
export default function Hero() {
  return (
    <>
      <div className="">
        <div className="w-2/4 mx-auto my-28 p-4">
          <h1 className=" text-center text-4xl md:text-6xl font-semibold">
            Manage Your{" "}
            <span className="text-blue-800 inline-block my-2">Task</span>.
          </h1>
          <div className="text-gray-600 text-xl flex-col content-center ">
            <p className="text-center my-10 ">
              Encan boards, lists, and cards enable you to organize and
              prioritize your projects in a fun, flexible, and rewarding way.
            </p>
            <div className="max-w-min min-w-max mx-auto">
              <Button
                variant="contained"
                className="bg-blue-800 h-14 min-w-max max-w-max block "
                sx={{ backgroundColor: "rgb(30,64,175)", marginX: "auto" }}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
        <div
          className="sample my-10 w-1/2 sm:w-4/5 h-[250px] md:w-3/5 sm:h-[300px] md:h-[500px] mx-auto rounded-xl shadow-lg shadow-blue-300 border border-gray-200"
          style={{
            backgroundImage: `url('/sample.png')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></div>
        <div className="key_features w-4/5 mx-auto my-28 p-5" id="key-features">
          <h1 className="text-3xl font-semibold  text-gray-800 p-4">
            Key features for resource mangaement:
          </h1>
          <h2 className=" px-4 text-lg">
            The top used fatures for task management.
          </h2>
          <div className="grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 gap-4 p-4">
            <div className="bg-gray-200 p-4">
              <div className="flex-col items-center gap-4">
                <svg
                  viewBox="-0.5 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#263ba6"
                  className="w-8 "
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M8.96991 12.89C10.6599 12.89 12.0299 11.5558 12.0299 9.91C12.0299 8.2642 10.6599 6.93 8.96991 6.93C7.27992 6.93 5.90991 8.2642 5.90991 9.91C5.90991 11.5558 7.27992 12.89 8.96991 12.89Z"
                      stroke="#1e3cb3"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M12.93 13.1C14.37 14.18 15.32 15.84 15.42 17.72C15.43 17.91 15.27 18.07 15.08 18.07H2.84996C2.64996 18.07 2.48996 17.91 2.49996 17.72C2.60996 15.84 3.55997 14.18 5.00997 13.1"
                      stroke="#1e3cb3"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M11.03 12.11H11.02"
                      stroke="#1e3cb3"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M17.1299 14.56C18.2787 14.56 19.2099 13.6556 19.2099 12.54C19.2099 11.4244 18.2787 10.52 17.1299 10.52C15.9812 10.52 15.0499 11.4244 15.0499 12.54C15.0499 13.6556 15.9812 14.56 17.1299 14.56Z"
                      stroke="#1e3cb3"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M20.3 15.13C20.99 15.84 21.44 16.79 21.5 17.83C21.51 17.97 21.4 18.07 21.26 18.07H17.38"
                      stroke="#1e3cb3"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                  </g>
                </svg>
                <div>
                  <h2 className="text-lg font-semibold">Resource Management</h2>
                  <p className="text-sm">
                    Resource scheduling, capacity & project planning
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 p-4">
              <div className="flex-col items-center gap-4">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#282ca4"
                  className="w-6 mb-2"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M12 8V12L14.5 14.5"
                      stroke="#1e3da4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>{" "}
                    <path
                      d="M7 3.33782C8.47087 2.48697 10.1786 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 10.1786 2.48697 8.47087 3.33782 7"
                      stroke="#1e3da4"
                      strokeWidth="2"
                      strokeLinecap="round"
                    ></path>{" "}
                  </g>
                </svg>

                <div>
                  <h2 className="text-lg font-semibold">Timesheets</h2>
                  <p className="text-sm">
                    Measure the actuals in Hub Planner and compare metrics.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 p-4">
              <div className="flex-col items-center gap-4">
                <svg
                  fill="#2044b1"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#2044b1"
                  className="w-6"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title>report</title>{" "}
                    <path d="M6 11h4v17h-4v-17zM22 16v12h4v-12h-4zM14 28h4v-24h-4v24z"></path>{" "}
                  </g>
                </svg>

                <div>
                  <h2 className="text-lg font-semibold">Dashboards & Reports</h2>
                  <p className="text-sm">
                    Generate data centric reports from your forecasts
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-200 p-4">
              <div className="flex-col items-center">
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#233ea9"
                  className="w-6"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="1.5"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path d="M10 17.745v1.092l-.323.142a1.702 1.702 0 0 1-1.352 0L1 15.774v-9.94a2.455 2.455 0 0 1 1.472-2.251l5.85-2.562a1.7 1.7 0 0 1 1.353 0L17 4.226V11h-1V4.88L9.276 1.939a.709.709 0 0 0-.554 0L2.873 4.5A1.456 1.456 0 0 0 2 5.834v9.285l6.724 2.944a.709.709 0 0 0 .554-.001zM19 18a2 2 0 1 1-2-2 2 2 0 0 1 2 2zm-1 0a1 1 0 1 0-1 1 1 1 0 0 0 1-1zm3.34-1.484l1.66.636v1.65l-1.586.59-.296.628.724 1.624-1.162 1.17-1.543-.71-.653.236-.636 1.66h-1.65l-.59-1.586-.628-.295-1.627.727-1.167-1.166.71-1.543-.236-.653-1.66-.636v-1.65l1.586-.59.295-.628-.727-1.627 1.166-1.167 1.543.71.653-.236.636-1.66h1.65l.59 1.586.628.296 1.624-.724 1.166 1.167-.705 1.538zm.66 1.169l-1.427-.548-.434-1.204.585-1.28-.412-.412-1.397.622-1.158-.544-.49-1.319h-.582l-.548 1.427-1.206.434-1.283-.59-.41.411.626 1.4-.545 1.161-1.319.49v.582l1.427.548.434 1.206-.59 1.283.411.41 1.4-.626 1.161.545.49 1.319h.582l.548-1.427 1.206-.434 1.28.588.411-.413-.623-1.399.544-1.158 1.319-.49z"></path>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                  </g>
                </svg>
                <div>
                  <h2 className="text-lg font-semibold">Project Management</h2>
                  <p className="text-sm">
                    Manage project milestones, phases and financial spend.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
