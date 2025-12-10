"use client";
import { Button } from "@/src/lib/components/ui/button";
import { signIn } from "next-auth/react";
import { text_size } from "@/src/utils/constants/css.constants";
import { FcGoogle } from "react-icons/fc";
import { useSession } from "next-auth/react";
export default function Email() {
  const { data: session } = useSession();

  return (
    <>
      <form
        className="w-full"
        action={() => {
          signIn("google");
        }}
      >
        <Button
          variant="default"
          type="submit"
          className={`${text_size.p1} w-full cursor-pointer h-12 font-semibold bg-[#222222] text-[#FF6D1F]`}
        >
          <FcGoogle className="scale-125" /> Signin with Google
        </Button>
      </form>
    </>
  );
}
