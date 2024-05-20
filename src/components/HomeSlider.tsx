"use client";
import MaxWidthWrapper from "./MaxWidthWrapper";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
    >
      // ...
    </Carousel>
  );
}

const HomeSlider = () => {
  return (
    <MaxWidthWrapper className="mt-8 flex-grow flex items-center justify-center">
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
        className="w-full  border border-yellow-500"
      >
        <CarouselContent className="border-green-500">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="border border-red-500">
              <div className="h-[700px] w-36"></div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </MaxWidthWrapper>
  );
};
export default HomeSlider;
