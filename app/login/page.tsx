"use client";
import { FC, useState } from "react";
import { Button } from "@mui/material";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
interface IPageProps {}

const Page: FC<IPageProps> = (props) => {
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
      {loading ? <Loader2></Loader2> : null }
      <Button onClick={handleClick}>Sign In Using Google</Button>
    </>
  );
};

export default Page
