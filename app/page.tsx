import Test from "./Test";
import Hero from "@/app/ui/landingpage/hero";
import Appbar from "@/app/ui/landingpage/navbar";
import '@/app/globals.css'
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
