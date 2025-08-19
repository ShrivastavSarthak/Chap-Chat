import { media } from "@/public";
import Image from "next/image";
import { css_constants } from "../../utils/constants/css.constants";
import AuthPage from "@/src/components/auth/auth";

export default function Home() {
  return (
    <div className=" h-[100vh] lg:py-5 p-0 bg-[#F7FAFD]">
      <div className="grid grid-cols-12  h-full ">
        <div className="col-span-12 lg:col-span-5">
          <div className="  h-full w-full lg:p-[32px] p-0">
            <div className="w-full h-full lg:rounded-2xl rounded-none overflow-hidden relative">
              <video
                autoPlay
                loop
                muted
                playsInline
                disablePictureInPicture
                controls={false}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              >
                <source src={media.MainBanner} type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 flex flex-col justify-end items-center">
                <Image src={media.Logo} alt="Logo" width={300} height={100} />
                <p
                  className={`${css_constants.p2} text-white lg:mb-[66px] mb-[43px]`}
                >
                  Let’s empower your business growth through AI
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7 flex justify-center items-center">
          <div className="flex flex-col justify-start items-stretch px-[20px]">
            <h2
              className={`${css_constants.h2} mb-[24px] text-center lg:text-left `}
            >
              Login{" "}
            </h2>
            <div className="flex flex-col items-start rounded-[32px] border border-[#D4D3D3] bg-white gap-6 p-[20px] px-4  md:gap-6 md:p-[20px] md:px-4 lg:w-[580px] lg:p-8 lg:gap-8 ">
              <AuthPage />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
