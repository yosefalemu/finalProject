"use client";
import React, { useEffect, useRef } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Eye, EyeOff, Mail, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { trpc } from "@/trpc/client";
import {
  SignInCredentialValidator,
  TSignInCredentialValidator,
} from "@/validators/sigin-validators";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useUser } from "@/hooks/user";

const SignIn = () => {
  const { addUserId } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState<boolean>(true);
  const [isNationalIdVerified, setIsNationalIdVerified] =
    useState<boolean>(true);
  const [url, setUrl] = useState<string>("");
  const isOrdinaryUser = searchParams.get("as") === "ordinaryUser";
  const isAgent = searchParams.get("as") === "Agent";
  const [errorToDisplay, setErrorToDisplay] = useState<string | null>(null);
  const errorTimeoutRef = useRef<number | null>(null);
  const origin = searchParams.get("origin");

  const continueAsOrdinaryUser = () => {
    router.push("?as=ordinaryUser");
  };
  const continueAsAgent = () => {
    router.push("?as=Agent");
  };
  const continueAsNormalUser = () => {
    setIsNationalIdVerified(true);
    router.push("/sign-in");
  };

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<TSignInCredentialValidator>({
    resolver: zodResolver(SignInCredentialValidator),
  });

  const handleInputChange = (fieldName: string) => {
    clearErrors(fieldName as keyof TSignInCredentialValidator);
  };

  //SIGNIN AS ORDINARY USER
  const {
    isLoading: isLoadingForOrdinaryUser,
    mutate: mutateForOrdinaryUser,
    isSuccess: isSuccessForOrdinaryUser,
  } = trpc.auth.signInOrdinaryUser.useMutation({
    onError: (err) => {
      if (err.data?.code === "CONFLICT") {
        setIsNationalIdVerified(false);
      }
      setErrorToDisplay(err.message);
    },

    onSuccess: ({ loggedInUserId }) => {
      addUserId(loggedInUserId);
      router.refresh();
      // if (origin) {
      //   router.push(`/${origin}`);
      //   return;
      // }
      router.push("/ordinaryuserhome");
    },
  });
  //SIGNIN AS USER
  const {
    isLoading: isLOadingForUser,
    mutate: mutateForUser,
    isSuccess: isSuccessForUser,
  } = trpc.auth.signInUser.useMutation({
    onError: (err) => {
      setErrorToDisplay(err.message);
    },
    onSuccess: ({ loggedInUserId }) => {
      addUserId(loggedInUserId);
      router.refresh();
      router.push("/home");
      // if (origin) {
      //   router.push(`/${origin}`);
      //   return;
      // }
    },
  });
  //SIGNIN AS AGENT
  const {
    isLoading: isLOadingForAgent,
    mutate: mutateForAgent,
    isSuccess: isSuccessForAgent,
  } = trpc.auth.signInAgent.useMutation({
    onError: (err) => {
      setErrorToDisplay(err.message);
    },
    onSuccess: ({ loggedInUserId }) => {
      addUserId(loggedInUserId);
      router.refresh();
      router.push("/agenthome");
      // if (origin) {
      //   router.push(`/${origin}`);
      //   return;
      // }
    },
  });
  const onSubmit = ({ email, password }: TSignInCredentialValidator) => {
    setUrl(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/nationalid-verify?email=${email}`
    );
    if (isOrdinaryUser) {
      mutateForOrdinaryUser({ email, password });
    } else if (isAgent) {
      mutateForAgent({ email, password });
    } else {
      mutateForUser({ email, password });
    }
  };
  useEffect(() => {
    if (errorToDisplay) {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      errorTimeoutRef.current = window.setTimeout(() => {
        setErrorToDisplay(null);
        errorTimeoutRef.current = null;
      }, 4000);
    }

    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, [errorToDisplay]);

  return (
    <div className="p-6 py-36 relative flex items-center justify-center lg:px-0">
      <div className="flex flex-col justify-center w-full sm:w-[350px] space-y-6 mx-auto">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="relative h-52 w-52">
            <Image fill src="/mainImages/logo.png" alt="LOGO IMAGES" />
          </div>
          <h1 className="text-2xl tracking-tight font-semibold">
            Sign in to your {isOrdinaryUser ? "ordinary user" : ""} account
          </h1>
          <Link
            href={"/registor-as-agent"}
            className={buttonVariants({ variant: "link", className: "gap-1" })}
          >
            Don't have an account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid gap-6">
          {errorToDisplay && (
            <p className="text-sm bg-red-600 text-white px-2 py-3 rounded-tr-md rounded-tl-sm error-border">
              {errorToDisplay}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid gap-2">
              <div className="grid gap-2 py-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center justify-center gap-2 relative">
                  <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2">
                    <Mail size={22} className="text-primary" />
                  </div>
                  <Input
                    {...register("email")}
                    placeholder="you@example.com"
                    className={cn({
                      "focus-visible:ring-red-600": errors.email,
                    })}
                    onChange={() => handleInputChange("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2 py-2">
                <Label htmlFor="password">Password</Label>
                <div className="flex items-center justify-center gap-2 relative">
                  <div className="absolute right-2.5 top-1/2 transform -translate-y-1/2">
                    {visible ? (
                      <EyeOff
                        size={22}
                        className="cursor-pointer text-primary"
                        onClick={() => setVisible(!visible)}
                      />
                    ) : (
                      <Eye
                        size={22}
                        className="cursor-pointer text-primary"
                        onClick={() => setVisible(!visible)}
                      />
                    )}
                  </div>
                  <Input
                    {...register("password")}
                    placeholder="Password"
                    type={visible ? "text" : "password"}
                    className={cn({
                      "focus-visible:ring-red-600": errors.password,
                    })}
                    onChange={() => handleInputChange("password")}
                  />
                </div>
                {errors.password && (
                  <p className="text-red-500">{errors.password.message}</p>
                )}
              </div>
              {isLoadingForOrdinaryUser ||
              isLOadingForUser ||
              isLOadingForAgent ? (
                <Button
                  className={buttonVariants({
                    size: "lg",
                    className: "disabled:cursor-not-allowed",
                  })}
                  disabled={
                    isLoadingForOrdinaryUser ||
                    isLOadingForUser ||
                    isLOadingForAgent
                  }
                >
                  Processing
                  <Loader2
                    size={22}
                    className="animate-spin text-zinc-300 ml-2"
                  />
                </Button>
              ) : (
                <Button
                  className={buttonVariants({
                    size: "lg",
                    className: "disabled:cursor-not-allowed",
                  })}
                  disabled={
                    isSuccessForOrdinaryUser ||
                    isSuccessForUser ||
                    isSuccessForAgent
                  }
                >
                  Sign in
                </Button>
              )}
            </div>
          </form>
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute inset-0 flex items-center"
            >
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>
          <Button variant={"secondary"} onClick={continueAsNormalUser}>
            Continue as normal user
          </Button>
          <Button variant={"secondary"} onClick={continueAsAgent}>
            Continue as Agent
          </Button>
          <Button variant={"secondary"} onClick={continueAsOrdinaryUser}>
            Continue as ordinary user
          </Button>
          {!isNationalIdVerified && (
            <Link
              href={url}
              className={buttonVariants({
                variant: "link",
                className: "gap-1 text-red-700",
              })}
            >
              Use this link to verify national id
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
