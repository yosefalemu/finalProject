"use client";
import ApplicationMain from "@/components/ApplicationMain";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useUser } from "@/hooks/user";
import { trpc } from "@/trpc/client";
import axios from "axios";
import { Loader2, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ApplyPage = () => {
  const { userId } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [prediction, setPrediction] = useState("");
  const [showLink, setShowLink] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    data,
    isLoading: isLoadingForCheck,
    isError,
  } = trpc.application.checkPersmission.useQuery(
    {
      applier: userId,
    },
    {
      refetchOnMount: true,
      refetchOnWindowFocus: true,
    }
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Check if the selected file is an image
      if (selectedFile.type.startsWith("image/")) {
        setImageUrl(URL.createObjectURL(selectedFile));
      } else {
        setImageUrl(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      setErrorMessage("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.predicted_label === "authentic") {
        setPrediction(response.data.predicted_label);
        setTimeout(() => {
          setShowLink(true);
        }, 4000);
      } else {
        setPrediction(response.data.predicted_label);
      }
      console.log("result", response.data);
      setErrorMessage("");
    } catch (error) {
      console.error("Error uploading file:", error);
      setPrediction("");
      if (axios.isAxiosError(error) && error.response) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred while processing the file.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (prediction || errorMessage) {
      setTimeout(() => {
        setPrediction("");
        setFile(null);
        setImageUrl(null);
        setErrorMessage("");
      }, 4000);
    }
  }, [prediction, errorMessage]);

  console.log("LOG", isError);

  return (
    <div className="h-full px-14">
      {isLoadingForCheck ? (
        <div className="p-6 h-full flex items-center justify-center">
          <div className="grid grid-cols-12 gap-6 h-full w-full mt-12">
            <div className="col-span-12 flex items-center justify-center">
              <Skeleton className="h-14 w-1/3" />
            </div>
            <div className="col-span-3 flex flex-col gap-y-4">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
            <div className="col-span-3 flex flex-col gap-y-4">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
            <div className="col-span-3 flex flex-col gap-y-4">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
            <div className="col-span-3 flex flex-col gap-y-4">
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
              <Skeleton className="h-14 w-full" />
            </div>
            <div className="col-span-12 flex items-center justify-end">
              <Skeleton className="h-14 w-1/3" />
            </div>
          </div>
        </div>
      ) : !userId ? (
        <div className="h-full flex flex-col items-center justify-center">
          <div className="h-2/3 flex flex-col items-center">
            <div className="relative h-80 w-80">
              <Image fill src={"/mainImages/logo.png"} alt="LOGO" />
            </div>
            <p className="text-customColor text-lg">Please login first</p>
            <Link href={"/sign-in"} className="text-sm text-customColor">
              Sign in
            </Link>
          </div>
        </div>
      ) : isError ? (
        <div className="w-full h-[calc(100vh-17rem)] flex flex-col items-center justify-center">
          <div className="h-4/5 flex flex-col items-center">
            <div className="relative h-80 w-80">
              <Image fill src={"/mainImages/logo.png"} alt="LOGO" />
            </div>
            <p className="text-2xl text-customColor text-center w-2/3">
              Your request has been received, and we&apos;re awaiting further
              instructions. Please hold while we prepare our response.
            </p>
          </div>
        </div>
      ) : showLink ? (
        <ApplicationMain />
      ) : (
        <div className="flex justify-center items-center mt-12">
          <div className="flex-col justify-between max-w-screen-lg p-3 pb-6">
            <h1 className="w-full text-2xl text-customColor text-center">
              Upload your educational file
            </h1>
            <div className="flex justify-center items-start gap-x-4 mt-4">
              <div className="flex flex-col gap-y-4 p-6 h-[700px] border border-gray-200 rounded-sm">
                <p className="text-lg text-customColor">
                  Please ensure the file you upload is authentic. Any attempts
                  at misconduct may result in legal action.
                </p>
                <form onSubmit={handleSubmit}>
                  <div className="fileUpload">
                    <label htmlFor="fileId" className="fileUploadLabel">
                      <h2>Upload File</h2>
                      <Upload className="upload__icon" />
                      <p>Upload your educational file</p>
                    </label>
                    <input
                      type="file"
                      id="fileId"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </div>
                  <div className="flex-grow flex items-end">
                    <div className="w-full flex justify-end">
                      <Button
                        type="submit"
                        className={buttonVariants({
                          size: "lg",
                          className:
                            "disabled:cursor-not-allowed w-full text-lg mt-6 py-7 font-normal",
                        })}
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            Processing
                            <Loader2
                              size={22}
                              className="animate-spin text-zinc-300 ml-2"
                            />
                          </>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="h-fit">
                <div className="flex-col gap-y-44 h-full">
                  <div className="h-full w-[500px]">
                    <div className="relative h-[550px] w-[500px] bg-green-400">
                      {imageUrl ? (
                        <Image
                          fill
                          src={imageUrl}
                          alt="Uploaded file preview"
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <Image
                          fill
                          src={"/mainImages/datavalidate.png"}
                          alt="Face-recognition"
                          className="object-cover"
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex-col items-center justify-between py-4 text-customColor text-lg">
                    {prediction && (
                      <h2
                        className={`mt-4 text-lg  ${
                          prediction === "forged"
                            ? "text-sm bg-red-600 text-white px-2 py-4 rounded-br-md rounded-bl-sm error-border"
                            : "text-sm bg-green-600 text-white px-2 py-4 rounded-br-md rounded-bl-sm error-border"
                        }`}
                      >
                        Prediction: {prediction}
                      </h2>
                    )}
                    {errorMessage && (
                      <h2 className="mt-4 text-lg text-red-500">
                        Error: {errorMessage}
                      </h2>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default ApplyPage;
