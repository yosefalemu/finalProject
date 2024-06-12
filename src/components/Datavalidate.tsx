"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { Loader2, Upload } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";

function DataValidate() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [prediction, setPrediction] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setImageUrl(URL.createObjectURL(selectedFile));
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
      setPrediction(response.data.predicted_label);
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
      setFile(null);
    }
  };

  console.log("PREDICTION", prediction);
  console.log("ERROR MESSAGES", errorMessage);

  return (
    <div className="h-full pt-36">
      <div className="h-[calc(100vh-9rem)] flex justify-center items-center pt-6">
        <div className="flex-col justify-between max-w-screen-lg p-3 pb-6">
          <h1 className="w-full text-2xl text-customColor text-center">
            Upload your educational file
          </h1>
          <div className="flex justify-center items-start gap-x-4 mt-4">
            <div className="flex flex-col gap-y-4 p-6 h-[700px] border border-gray-200 rounded-sm">
              <p className="text-lg text-customColor">
                Please ensure the file you upload is authentic. Any attempts at
                misconduct may result in legal action.
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
                        src={"/mainImages/face-verify.png"}
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
                          ? "text-red-500"
                          : "text-customColor"
                      }`}
                    >
                      Prediction: {prediction}
                    </h2>
                  )}
                  {prediction === "authentic" && (
                    <Link href={"/applymain"}>start application</Link>
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
    </div>
  );
}

export default DataValidate;
