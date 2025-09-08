import { Button } from "@/src/lib/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/lib/components/ui/dialog";
import { text_size } from "@/src/utils/constants/css.constants";
import { HiOutlineLogout } from "react-icons/hi";

export default function SignoutDialog() {
  const handleSignout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/login";
  };
  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <p className={` w-full flex justify-start gap-1 items-center`}>
          <HiOutlineLogout
            width={20}
            height={20}
            className={`w-6 h-6 text-[#FF0E0E]`}
          />
          <span className={`${text_size.p3} text-[#FF0E0E]`}>Sign out</span>
        </p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sign out</DialogTitle>
        </DialogHeader>
        <h3 className={`${text_size.p1}`}>Are you sure to signout</h3>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSignout} type="button" variant="destructive">
            Sign out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
