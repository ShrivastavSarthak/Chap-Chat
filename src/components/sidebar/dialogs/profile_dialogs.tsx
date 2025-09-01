import { Avatar } from "@/src/lib/components/ui/avatar";
import { Button } from "@/src/lib/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/lib/components/ui/dialog";
import { button_color, text_size } from "@/src/utils/constants/css.constants";
import { useAppSelector } from "@/src/utils/services/store/hook";
import moment from "moment";
import { ReactElement, useEffect, useState } from "react";
import { FaNetworkWired, FaPhoneAlt } from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { MdCardTravel, MdOutlineMail } from "react-icons/md";
import { TbGenderMale } from "react-icons/tb";

export interface userDetailsInterface {
  logo: ReactElement;
  field: string;
  value: string | null;
}

function UserDetailsCard({ data }: { data: userDetailsInterface[] }) {
  return (
    <div className=" w-full rounded-2xl shadow-lg px-3 py-4 flex flex-col items-stretch justify-start">
      {data.map((item, i) => (
        <div key={i} className="w-full h-full">
          <div className=" w-full flex justify-between items-center">
            <div className="flex justify-start items-center gap-1">
              <Avatar className="flex justify-center items-center">
                <div className="w-[40px] h-[40px] flex items-center justify-center">
                  {item.logo}
                </div>
              </Avatar>
              <p className={`${text_size.p3}`}>{item.field}</p>
            </div>
            <div className="">
              <p className={`${text_size.p3} text-right`}>
                {item.value ? item.value : "N/a"}
              </p>
            </div>
          </div>
          {i !== 5 && <hr className="h-[1px] bg-[#D4D3D3] w-full my-4" />}
        </div>
      ))}
    </div>
  );
}

export function ProfileDialog() {
  const [userDetails, setUserDetails] = useState<userDetailsInterface[]>([
    {
      logo: <MdOutlineMail />,
      field: "Email ID",
      value: "",
    },
    {
      logo: <FaPhoneAlt />,
      field: "Phone No.",
      value: "",
    },
    {
      logo: <FaNetworkWired />,
      field: "Department",
      value: "",
    },
    {
      logo: <MdCardTravel />,
      field: "Designation",
      value: "",
    },
    {
      logo: <TbGenderMale />,
      field: "Gender",
      value: "",
    },
    {
      logo: <LiaBirthdayCakeSolid />,
      field: "Date of birth",
      value: "",
    },
  ]);

  const user = useAppSelector((state) => state.user);

  useEffect(() => {
    setUserDetails([
      {
        logo: <MdOutlineMail />,
        field: "Email ID",
        value: user.email,
      },
      {
        logo: <FaPhoneAlt />,
        field: "Phone No.",
        value: user.mobile.countryCode + " " + user.mobile.number,
      },
      {
        logo: <FaNetworkWired />,
        field: "Department",
        value: user.departmentName,
      },
      {
        logo: <MdCardTravel />,
        field: "Designation",
        value: user.designationName,
      },
      {
        logo: <TbGenderMale />,
        field: "Gender",
        value: user.gender,
      },
      {
        logo: <LiaBirthdayCakeSolid />,
        field: "Date of birth",
        value: moment(user.dateOfBirth).format("DD/MM/YYYY"),
      },
    ]);
  }, [user]);

  return (
    <Dialog>
      <DialogTrigger asChild className="w-full">
        <p className={`${text_size.p3} w-full`}>Profile</p>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile</DialogTitle>
        </DialogHeader>
        <div className=" w-full h-full flex flex-col gap-4 ">
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-3 justify-start items-center">
              <Avatar />
              <p className={`${text_size.p2} font-semibold`}>Name</p>
            </div>
            <Button className={`${button_color.linerGradientEnable}`}>
              Edit profile
            </Button>
          </div>
          <UserDetailsCard data={userDetails} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
