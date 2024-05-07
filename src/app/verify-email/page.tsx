"use client";
import React, { useEffect, useState } from "react";
import VerifyEmail from "@/components/VerifyEmail";
import Image from "next/image";

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const VerifyEmailPage = ({ searchParams }: PageProps) => {
  const token = searchParams.token;
  const toEmail = searchParams.to;
  const nationalId = searchParams.nationalId;
  const [emailVerified, setEmailVerified] = useState<boolean>(false);
  useEffect(() => {}, [token]);
  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        {token && typeof token === "string" ? (
          <div>
            <VerifyEmail
              token={token}
              setEmailVerified={setEmailVerified}
              emailVerified={emailVerified}
            />
          </div>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div className="relative mb-4 h-96 w-96 text-muted-foreground">
              <Image
                src="/mainImages/logo.png"
                fill
                alt="hippo email sent image"
              />
            </div>

            <h3 className="font-semibold text-2xl text-customColor">
              Check your email
            </h3>

            {toEmail ? (
              <p className="text-center text-customColor">
                We&apos;ve sent a verification link to{" "}
                <span className="font-semibold text-green-700">{toEmail}</span>.
              </p>
            ) : (
              <p className="text-muted-foreground text-center text-customColor">
                We&apos;ve sent a verification link to your email.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default VerifyEmailPage;
