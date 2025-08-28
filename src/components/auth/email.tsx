"use client";

import { saveEmail } from "@/src/app/(main)/(login)/action";
import { Button } from "@/src/lib/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/src/lib/components/ui/form";
import { Input } from "@/src/lib/components/ui/input";
import { css_constants } from "@/src/utils/constants/css.constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineMail } from "react-icons/hi";
import { toast } from "sonner";
import z from "zod";

const schema = z.object({
  email: z
    .string()
    .regex(
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please enter a valid email address"
    ),
});

export default function Email() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
    mode: "onChange",
  });
  const navigate = useRouter();
  const onSubmit = async (values: z.infer<typeof schema>) => {
    try {
      setIsLoading(true);
      const result = await saveEmail(values.email);

      if (result.status === 200) {
        toast.success(
          result.data?.message ||
            "An email is sent to your email address. Please check your inbox for the OTP."
        );
        navigate.push("/otp");
        form.reset();
      } else {
        // 👇 show backend error from normalized response
        toast.error(result.message || "Failed to send OTP");
      }
    } catch (error) {
      // 👇 only fires if something *really unexpected* happens
      toast.error("Something went wrong, Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="relative w-full border-[2px] rounded-[12px] border-[#939393] bg-[#fff] flex md:p-[10px] p-[8px] justify-start items-center gap-1.5 mb-4">
                <div className="absolute top-[-15px] px-2 bg-[#fff]">
                  <p className={`${css_constants.p3} text-[#585858] `}>Email</p>
                </div>
                <HiOutlineMail size={45} className="text-[#585858]" />
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your email ID"
                    disabled={isLoading}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />

        <Button
          size="lg"
          type="submit"
          disabled={isLoading || !form.formState.isValid}
          className={`
              w-full 
              flex justify-center items-center gap-[9.156px]
              self-stretch
              h-[54px] px-[24px] py-[14px]
              rounded-[12px] 
              bg-gradient-to-b from-[#0F295C] to-[#19A9F9]
              disabled:from-[rgba(25,169,249,0.25)] disabled:to-[rgba(15,41,92,0.25)]
            `}
        >
          <p className={`${css_constants.p2} text-[#fff]`}>Next</p>
        </Button>
      </form>
    </Form>
  );
}
