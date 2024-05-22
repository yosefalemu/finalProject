"use client";
import React, { useState, useRef, useCallback, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "./ui/button";
import Image from "next/image";
import { Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";
import { trpc } from "@/trpc/client";
import { useSearchParams, useRouter } from "next/navigation";

type UserDataType = {
  match: boolean;
  face_distance: number;
  id_number: number;
};

const VerifyNationalId = () => {
  const router = useRouter();
  const [idCardImage, setIdCardImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [verifySuccess, setVerifySuccess] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserDataType | null>(null);
  const [webcamVisible, setWebcamVisible] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const errorTimeoutRef = useRef<number | null>(null);
  const [otherNationalId, setOtherNationalId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const [loadingCompare, setLoadingCompare] = useState<boolean>(false);
  const userEmail = searchParams.get("email");

  const openCamera = () => {
    setWebcamVisible(true);
  };

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        setWebcamVisible(false);
      } else {
        toast.error("Failed to capture image.");
      }
    } else {
      toast.error("Webcam is not available.");
    }
  }, [webcamRef]);

  const uploadIdCard = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5000/upload_id_card",
        formData
      );
      setIdCardImage(file);
    } catch (error) {
      console.log("UPLOAD ID ERROR", error);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  const compareFaces = async () => {
    if (!capturedImage || !idCardImage) {
      setErrorMessage("Both applicant image and ID card image are required.");
      return;
    }

    const formData = new FormData();
    formData.append("applicant_image", dataURItoBlob(capturedImage));
    formData.append("id_card_image", idCardImage);

    setLoadingCompare(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/compare_faces",
        formData
      );
      if (response.data.id_number) {
        setUserData(response.data);
        setOtherNationalId(null); // Reset the otherNationalId state
      } else {
        setLoadingCompare(false);
        setUserData(null);
        setOtherNationalId("Please upload your own national ID");
      }
    } catch (error) {
      setLoadingCompare(false);
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };

  const { mutate, isLoading } = trpc.auth.verifyNationalId.useMutation({
    onSuccess: () => {
      setVerifySuccess(true);
      setLoadingCompare(false);
      setTimeout(() => {
        router.push("/sign-in");
      }, 4000);
      setUserData(null);
    },
    onError: (err) => {
      setErrorMessage(err.message);
      setLoadingCompare(false);
      setUserData(null);
    },
  });

  useEffect(() => {
    if (userData?.id_number) {
      mutate({
        nationalId: userData?.id_number.toString()!,
        email: userEmail!,
      });
    }
  }, [userData?.id_number]);

  const dataURItoBlob = (dataURI: string): Blob => {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  useEffect(() => {
    if (errorMessage || otherNationalId) {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
      errorTimeoutRef.current = window.setTimeout(() => {
        setErrorMessage(null);
        setOtherNationalId(null);
        errorTimeoutRef.current = null;
      }, 4000);
    }

    return () => {
      if (errorTimeoutRef.current) {
        clearTimeout(errorTimeoutRef.current);
      }
    };
  }, [errorMessage, otherNationalId]);

  return (
    <div className="h-full pt-36">
      <div className="h-[calc(100vh-9rem)] flex justify-center items-center pt-6">
        <div className="flex-col justify-between max-w-screen-lg p-3 pb-6">
          <h1 className="w-full text-2xl text-customColor text-center">
            Verify national Id
          </h1>
          <div className="flex justify-center items-start gap-x-4 mt-4">
            <div className="flex flex-col gap-y-4 p-6 h-[700px] border border-gray-200 rounded-sm">
              {errorMessage && (
                <p className="text-sm bg-red-600 text-white px-2 py-3 rounded-tr-md rounded-tl-sm error-border">
                  {errorMessage}
                </p>
              )}
              {verifySuccess && (
                <p className="text-sm bg-green-600 text-white px-2 py-3 rounded-tr-md rounded-tl-sm error-border">
                  National id verified successfully
                </p>
              )}
              {otherNationalId && (
                <p className="text-sm bg-red-600 text-white px-2 py-3 rounded-tr-md rounded-tl-sm error-border">
                  {otherNationalId}
                </p>
              )}
              <p className="text-lg text-customColor">
                Please capture your face in a place with good lighting, such as
                facing a window during the day or under a bright ceiling light.
                Then, upload the front side of your national ID and press the
                compare button.
              </p>
              <div className="w-full">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full rounded-none">
                      Capture image
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="pt-4">
                    <DialogHeader>
                      {!webcamVisible ? (
                        <>
                          <DialogTitle className="text-customColor my-4">
                            Are you completely sure you want to open the camera?
                          </DialogTitle>
                          <Button onClick={openCamera} className="">
                            Open Camera
                          </Button>
                        </>
                      ) : (
                        <>
                          <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                            className="py-4"
                          />
                          <Button onClick={capture}>Take selfie</Button>
                        </>
                      )}
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <div>
                <div className="fileUpload">
                  <label htmlFor="fileId" className="fileUploadLabel">
                    <h2>Upload File</h2>
                    <Upload className="upload__icon" />
                    <p>Upload your national id</p>
                  </label>
                  <input type="file" id="fileId" onChange={uploadIdCard} />
                </div>
              </div>
              <div className="flex-grow flex items-end">
                {isLoading || loadingCompare ? (
                  <div className="w-full flex justify-end">
                    <Button
                      className={buttonVariants({
                        size: "lg",
                        className:
                          "disabled:cursor-not-allowed w-full text-lg mt-6 py-7 font-normal",
                      })}
                      disabled={isLoading || loadingCompare}
                    >
                      Processing
                      <Loader2
                        size={22}
                        className="animate-spin text-zinc-300 ml-2"
                      />
                    </Button>
                  </div>
                ) : (
                  <div className="w-full flex justify-end">
                    <Button
                      className={buttonVariants({
                        size: "lg",
                        className:
                          "disabled:cursor-not-allowed w-full text-lg mt-6 py-7 font-normal",
                      })}
                      disabled={isLoading || loadingCompare}
                      onClick={compareFaces}
                    >
                      Compare
                    </Button>
                  </div>
                )}
              </div>
            </div>
            <div className="h-[700px]">
              <div className="flex-col gap-y-44 h-full overflow-hidden">
                <div className="h-[500px] w-[500px]">
                  <div className="relative h-[500px] w-[500px] bg-green-400">
                    <Image
                      fill
                      src={"/mainImages/face-verify.png"}
                      alt="Face-recognition"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 flex-col items-center justify-between py-4 text-customColor text-lg">
                  {userData === null ? (
                    <Skeleton className="w-full h-12 bg-gray-200" />
                  ) : (
                    <div className="flex items-center gap-x-3 px-4">
                      <h1 className="font-semibold">NationalId</h1>
                      <h1>{userData.id_number}</h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default VerifyNationalId;
