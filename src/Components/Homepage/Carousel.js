import { useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import Swipe from "react-easy-swipe";

// null
// if null in next add slideoutleft

// if null in prev add slideoutleft

function Carousel({ data }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(null);
  const slideRef = useRef();

  const nextSlide = () => {
    slideRef.current.classList.add("slide-out-left");

    setTimeout(() => {
      let newSlide = currentSlide === data.length - 1 ? 0 : currentSlide + 1;
      setDirection("slide-in-left");
      setCurrentSlide(newSlide);
    }, 100);
  };

  const prevSlide = () => {
    slideRef.current.classList.add("slide-out-right");

    setTimeout(() => {
      let newSlide = currentSlide === 0 ? data.length - 1 : currentSlide - 1;
      setDirection("slide-in-right");
      setCurrentSlide(newSlide);
    }, 100);
  };

  const changeSlide = (index) => {
    if (currentSlide === index) return;

    if (currentSlide > index) {
      slideRef.current.classList.add(`slide-out-right`);
      setTimeout(() => {
        setDirection("slide-in-right");
        setCurrentSlide(index);
      }, 100);
    } else {
      slideRef.current.classList.add(`slide-out-left`);
      setTimeout(() => {
        setCurrentSlide(index);
        setDirection("slide-in-left");
      }, 100);
    }
  };

  return (
    <div className="lg:hidden grid grid-cols-1 md:mx-24 overflow-hidden relative">
      <AiOutlineLeft
        onClick={prevSlide}
        className="absolute left-0 text-3xl inset-y-1/2 text-white cursor-pointer"
      />

      <Swipe onSwipeLeft={nextSlide} onSwipeRight={prevSlide}>
        {data.map((content, index) => {
          return (
            <div
              ref={index === currentSlide ? slideRef : null}
              key={index}
              className={
                index === currentSlide
                  ? `block first-letter border-2 rounded m-10 border-white p-4 py-8 md:py-10 ${
                      direction || "slide-in-left"
                    }`
                  : "hidden first-letter border-2 rounded m-10 border-white p-4 py-8 md:py-10"
              }
            >
              {content}
            </div>
          );
        })}
      </Swipe>

      <AiOutlineRight
        onClick={nextSlide}
        className="absolute right-0 text-3xl inset-y-1/2 text-white cursor-pointer"
      />

      <div className="absolute w-full flex justify-center bottom-0">
        {data.map((content, index) => {
          return (
            <div
              className={
                index === currentSlide
                  ? "h-2 w-2 bg-blue-700 rounded-full mx-2 mb-2 cursor-pointer"
                  : "h-2 w-2 bg-white rounded-full mx-2 mb-2 cursor-pointer"
              }
              key={index}
              onClick={() => {
                changeSlide(index);
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
}

export default Carousel;
