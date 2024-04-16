import "@/app/globals.css";
import { FC, useState } from "react";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function Login() {
  const [loading, setloading] = useState<boolean>(false);
  const handleClick = async () => {
    setloading(true);
    try {
      await signIn("google");
    } catch (err) {
      alert("Some Error Occurred");
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      <div className="bg-white mx-auto md:w-1/2 text-center rounded-xl min-w-max">
        <h1 className="login-header font-semibold text-4xl my-14">Log In</h1>
        <form>
          <input
            type="text"
            className="w-1/2 md:w-[55%] px-4 py-3 my-4 border block mx-auto bg-transparent"
            name="email"
            placeholder="Email"
          />
          <input
            type="text"
            className="w-1/2 md:w-[55%] px-4 py-3 my-4 border block mx-auto bg-transparent"
            name="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-1/2 md:w-[55%] p-3 text-white bg-blue-600 rounded-3xl min-w-min block mx-auto"
          >
            Sign In
          </button>
          <div className="my-4">
            <span>or</span>
          </div>
          <div className="">
            {loading ? (
              <Loader2 className="animate-spin mx-auto"></Loader2>
            ) : (
              <button className="min-w-min  md:w-[55%] p-3 text-black md:border md:border-gray-400  rounded-full sm:rounded-3xl min-w-min block mx-auto" onClick={handleClick}>
                <div className="google-icon flex justify-center gap-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={'24px'}
                    height={'24px'}
                    viewBox="0 0 326667 333333"
                    shape-rendering="geometricPrecision"
                    text-rendering="geometricPrecision"
                    image-rendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path
                      d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z"
                      fill="#4285f4"
                    />
                    <path
                      d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z"
                      fill="#34a853"
                    />
                    <path
                      d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z"
                      fill="#fbbc04"
                    />
                    <path
                      d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z"
                      fill="#ea4335"
                    />
                  </svg>
                  <span className="hidden md:block">Sign in with Google</span>
                </div>
                
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
