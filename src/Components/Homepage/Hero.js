import { UserContext } from "../../Contexts/UserContext";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import HeroImg from "../../assets/Hero.png";

function Hero() {
  const [user] = useContext(UserContext);

  return (
    <section className="m-3 mt-16 md:mt-10 flex flex-col p-3 py-5 md:py-20 2xl:py-20">
      <div className="flex items-center justify-around md:p-2">
        <div className="flex flex-col justify-between">
          <p className="uppercase text-secondary font-bold text-[.45rem] tracking-wider md:text-xs md:tracking-widest 2xl:text-lg">
            A tool to help you socialize and learn
          </p>
          <p className="font-[1000] text-2xl md:text-5xl lg:text-6xl 2xl:text-8xl leading-10 md:leading-normal lg:leading-normal 2xl:leading-normal">
            Your College
          </p>
          <p className="font-[1000] text-2xl md:text-5xl lg:text-6xl 2xl:text-8xl leading-10 md:leading-normal lg:leading-normal 2xl:leading-normal">
            life made
          </p>
          <p className="font-[1000] text-2xl md:text-5xl lg:text-6xl 2xl:text-8xl leading-10 md:leading-normal lg:leading-normal 2xl:leading-normal">
            easy
          </p>

          <svg
            width="140"
            height="31"
            viewBox="0 0 173 31"
            fill="none"
            className="w-1/3 h-1/2"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 27C31.673 14.9753 103.415 -5.46662 169 8.96299"
              stroke="#0278E4"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <NavLink
            to={user ? "/feed" : "/signup"}
            className="bg-primary hover:bg-blue-700 self-start text-white p-2 md:px-3 2xl:p-3 2xl:px-5 mt-3 md:mt-5 text-xs md:text-base xl:text-xl 2xl:text-3xl rounded-full"
          >
            Get Started
          </NavLink>
        </div>

        <img
          src={HeroImg}
          alt=""
          className="max-h-full w-auto h-28 md:h-72 lg:h-96 2xl:h-128 object-contain"
        />
      </div>
    </section>
  );
}

export default Hero;
