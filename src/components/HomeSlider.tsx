"use client";
import Image from "next/image";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Footer from "./Footer";

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      {/* Add content here if needed */}
    </Carousel>
  );
}

const imageToDisplay = [
  { src: "/homeImages/img1.jpeg" },
  { src: "/homeImages/img2.jpg" },
  { src: "/homeImages/img3.jpg" },
  { src: "/homeImages/img4.jpg" },
  { src: "/homeImages/img5.jpg" },
  { src: "/homeImages/img6.jpg" },
  { src: "/homeImages/img7.jpg" },
  { src: "/homeImages/img8.jpg" },
  { src: "/homeImages/img9.jpg" },
  { src: "/homeImages/img10.jpg" },
  { src: "/homeImages/img11.jpg" },
];

const newsItems = [
  {
    imgSrc: "/homeImages/news1.jpg",
    description:
      "Federal Police dismantled a major human trafficking ring, rescuing over 50 victims and ensuring their safe return to their families.",
  },
  {
    imgSrc: "/homeImages/news2.jpg",
    description:
      "A new advanced forensic lab has been inaugurated to significantly enhance our crime-solving capabilities and speed up investigations.",
  },
  {
    imgSrc: "/homeImages/news3.jpg",
    description:
      "Our community outreach program aims to build trust and cooperation between the police and local communities for a safer environment.",
  },
  {
    imgSrc: "/homeImages/news4.jpg",
    description:
      "A joint operation with international agencies led to a significant drug bust, seizing large quantities of illegal substances.",
  },
  {
    imgSrc: "/homeImages/news5.jpg",
    description:
      "Federal Police officers have received specialized training in cybercrime prevention to tackle the growing threat of online crimes.",
  },
  {
    imgSrc: "/homeImages/news6.jpg",
    description:
      "The annual report indicates a decline in crime rates due to increased patrols and effective community engagement strategies.",
  },
];

const servicesItems = [
  "Emergency Response: Rapid deployment teams for critical incidents.",
  "Criminal Investigation: Comprehensive investigative services for all types of crimes.",
  "Community Policing: Building trust and cooperation with local communities.",
  "Cybercrime Unit: Specialized team tackling online crimes and digital security threats.",
  "Forensic Services: Advanced forensic analysis to support investigations.",
  "Traffic Management: Ensuring road safety and managing traffic flow.",
  "Public Safety Education: Programs to educate the public on safety and crime prevention.",
  "Counter-Terrorism: Specialized operations to prevent and respond to terrorist activities.",
  "Border Security: Securing national borders against illegal activities.",
  "Victim Support: Providing assistance and support services to crime victims.",
];

const HomeSlider = () => {
  return (
    <div className="flex flex-col gap-y-14">
      <MaxWidthWrapper>
        <div className="grid grid-cols-12 px-8 py-8 gap-x-6">
          <Carousel
            opts={{
              align: "center",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 2000,
              }),
            ]}
            className="max-w-6xl border-gray-200 col-span-8"
          >
            <CarouselContent className="">
              {imageToDisplay.map((image, index) => (
                <CarouselItem key={index} className="border-gray-200">
                  <img
                    src={image.src}
                    alt={`Slide ${index}`}
                    className="h-[600px] w-full object-cover"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="col-span-4 flex flex-col items-center gap-y-6">
            <h1 className="text-2xl text-center text-customColor w-full  border-b pb-8">
              General commissioner&apos;s message
            </h1>
            <div className="relative h-96 w-96 border">
              <Image
                fill
                src={"/homeImages/img12.jpg"}
                alt="MAIN IMAGE"
                className="object-cover"
              />
            </div>
            <p className="text-lg text-customColor">
              I commend your dedication and professionalism in ensuring public
              safety. We will enhance our capabilities through advanced
              technologies.
            </p>
          </div>
        </div>
        <div className="px-8 py-8">
          <div className="grid grid-cols-12 gap-x-12">
            <div className="col-span-8">
              <h1 className="text-2xl text-customColor">New news</h1>
              <div className="flex flex-col gap-y-2">
                {newsItems.map((news, index) => (
                  <div
                    key={index}
                    className="border-t flex gap-x-10 items-center"
                  >
                    <div className="relative h-36 w-36">
                      <Image
                        src={"/homeImages/img13.jpg"}
                        fill
                        className="object-contain"
                        alt={`News Image ${index}`}
                      />
                    </div>
                    <p className="text-lg p-4 text-customColor">
                      {news.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-span-4 border p-3 rounded-md">
              <h1 className="text-2xl text-customColor pb-1 mb-5 border-b">
                Available services
              </h1>
              <ul className="list-disc pl-5">
                {servicesItems.map((service, index) => (
                  <li key={index} className="text-lg text-customColor mb-2">
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
      <Footer />
    </div>
  );
};

export default HomeSlider;
