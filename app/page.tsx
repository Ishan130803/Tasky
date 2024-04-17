import Appbar from "@/components/ui/landingpage/navbar";
import Test from "./Test";

import '@/app/globals.css'
import Hero from "@/components/ui/landingpage/hero";
export default function Home() {
  return (
    <>
      <div
        className="min-w-[340px]"
        style={{
          background:
            "linear-gradient(180deg, rgba(59,130,246,1) 0%, rgba(255,255,255,1) 51%)",
        }}
      >
        <Appbar />
        <Hero />
      </div>
    </>
  );
}
