import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const ApplyInstructions = async () => {
  return (
    <div className="p-6 h-full">
      <MaxWidthWrapper className=" flex flex-col items-center gap-y-2">
        <div className="relative h-44 w-44">
          <Image
            fill
            src={"/mainImages/logo.png"}
            alt="LOGO"
            className="object-cover"
          />
        </div>
        <h1 className="text-3xl text-customColor">Applications guide lines</h1>
        <h3 className="text-xl text-customColor font-extralight">
          Welcome to Ethiopian federal police private security agent managnment
          system{" "}
        </h3>
        <h5 className="text-xl text-customColor font-thin">
          To ensure a smooth application experience, please carefully follow the
          steps outlined below !
        </h5>
        <div className="w-full flex-grow p-4 mt-8">
          <div className="w-5/6 mx-auto">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-x-2 text-customColor">
                    <h1 className="text-2xl">STEP 1</h1>
                    <ArrowRight className="" size={12} />
                    <h1 className="text-2xl">Prepare Your Documents</h1>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-y-4 max-w-screen-xl">
                    <h1 className="text-customColor font-extralight text-xl">
                      Before you begin the application process, make sure you
                      have the following documents ready.
                    </h1>
                    <div className="w-3/4 mx-auto flex flex-col gap-y-2">
                      <h1 className="text-xl font-thin">
                        1. High-resolution photo of the applicant
                      </h1>
                      <h1 className="text-xl font-thin">
                        2. Applicant National Id
                      </h1>
                      <h1 className="text-xl font-thin">
                        4. Applicant's Medical Certificate
                      </h1>
                      <h1 className="text-xl font-thin">
                        3. Applicant's Footprint
                      </h1>
                      <h1 className="text-xl font-thin">
                        4. Applicant's Job Experience Details
                      </h1>
                      <h1 className="text-xl font-thin">
                        5. Applicant's Education Certifications
                      </h1>
                      <h1 className="text-xl font-thin">6. Trade Permission</h1>
                      <h1 className="text-xl font-thin">
                        7. Employee Qualification Assurance
                      </h1>
                      <h1 className="text-xl font-thin">
                        8. Structure of the Agency
                      </h1>
                      <h1 className="text-xl font-thin">
                        9. Rules and Regulations
                      </h1>
                      <h1 className="text-xl font-thin">
                        10. Form of Registration
                      </h1>
                      <h1 className="text-xl font-thin">11. Warranty Form</h1>
                      <h1 className="text-xl font-thin">12. Agency Logo</h1>
                      <h1 className="text-xl font-thin">13. Bank Statement</h1>
                      <h1 className="text-xl font-thin">
                        14. Proof of House Rent Payment for at least 1 year
                      </h1>
                      <h1 className="text-xl font-thin">15. Uniform Details</h1>
                      <h1 className="text-xl font-thin">
                        16. Employee ID (front and back)
                      </h1>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-x-2 text-customColor">
                    <h1 className="text-2xl">STEP 2 </h1>
                    <ArrowRight className="" size={12} />
                    <h1 className="text-2xl">Convert Documents to PDF</h1>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-y-4 max-w-screen-xl">
                    <h1 className="text-customColor font-extralight text-xl">
                      Take clear photos and scans of each document and convert
                      to pdf file
                    </h1>
                    <div className="w-3/4 mx-auto flex flex-col gap-y-2">
                      <h1 className="text-xl font-thin">
                        1. Use clear and consistent names for your PDF files.
                      </h1>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-x-2 text-customColor">
                    <h1 className="text-2xl">STEP 3</h1>
                    <ArrowRight className="" size={12} />
                    <h1 className="text-2xl">Application Submission</h1>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-y-4 max-w-screen-xl">
                    <h1 className="text-customColor font-extralight text-xl">
                      Submit PDF files through the designated online portal or
                      submission method specified by the Ethiopian Federal
                      Police. Ensure that all documents are legible, up-to-date,
                      and meet the specified requirements. We appreciate your
                      commitment to becoming a registered Private Security
                      Agent. If you encounter any difficulties during the
                      application process, feel free to reach out to our support
                      team for assistance:
                    </h1>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-x-2 text-customColor">
                    <h1 className="text-2xl">STEP 4</h1>
                    <ArrowRight className="" size={12} />
                    <h1 className="text-2xl">
                      Application Outcome Notification
                    </h1>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-y-4 max-w-screen-xl">
                    <h1 className="text-customColor font-extralight text-xl">
                      After the thorough review of your application, we are
                      pleased to inform you of the following outcomes
                    </h1>
                    <div className="flex flex-col gap-y-2">
                      <h1 className="text-xl font-thin">
                        <span className="font-normal mr-2">
                          1. Application Accepted
                        </span>
                        You will receive message, containing your login details.
                        With your credentials, you can now access the system
                        portal. From there, you'll have the ability to hire
                        employees, manage your team, update your profile, and
                        perform various administrative tasks. We appreciate your
                        commitment to maintaining security standards, and we
                        wish you success in your role.
                      </h1>
                      <h1 className="text-xl font-thin">
                        <span className="font-normal mr-2">
                          {" "}
                          2. Application Rejected
                        </span>{" "}
                        Detailed reasons for the rejection will be provided via
                        message. Carefully review the feedback, address any
                        identified issues, and feel free to reapply. We
                        appreciate your interest and encourage you to make the
                        necessary adjustments before submitting a new
                        application.
                      </h1>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        <h1 className="text-2xl font-extralight">
          Best of luck with your application!
        </h1>
        <Link
          className={buttonVariants({
            className: "bg-transparent hover:bg-transparent",
            size: "lg",
            variant: "link",
          })}
          href={"/applymain"}
        >
          Proceeds to applications
        </Link>
      </MaxWidthWrapper>
    </div>
  );
};
export default ApplyInstructions;
