import Image from "next/image";

const SuccessApplication = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center border border-teal-500">
      <div className="h-2/3 flex flex-col items-center">
        <div className="relative h-80 w-80">
          <Image fill src={"/mainImages/logo.png"} alt="LOGO" />
        </div>
        <p className="text-customColor text-xl max-w-xl text-center font-normal">
          Your application has been submitted successfully. We will get back to
          you soon. Please check the notifications section for our response.
        </p>
      </div>
    </div>
  );
};
export default SuccessApplication;
