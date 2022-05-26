import AboutItem from "./AboutItem";
import Carousel from "./Carousel";

const data1 = [
  "CampusTalk is a platform for institutes to host asynchronous online discussion forums where students can interact with their peers and teachers regarding academic and non academic activities in their institute.",
  "CampusTalk provides forum's based on Commuinty Question Answering (CQA) system where members can start a conversation with other members in the form of posts.",
  "CampusTalk forums enable members to voluntarily read and respond to posts in their own time through multiple means such as upvotes, downvotes and replies, with an optional anonymous environment.",
];

const data2 = [
  "In today's fast growing world, there is a lot of information being thrown at students and it can be overwhelming and confusing at times, especially for new or introverted students.",
  "Students go through a large amount of academic and non-academic activities throughout the year; therefore lack of information or inaccurate information can lead to many complications.",
  "CampusTalk provides platform for students to ask for any information related to their institute's academic and non-academic activities which will be provided by their peers and teachers.",
];

function About() {
  return (
    <section
      className="bg-picture text-center text-white mt-24 p-2 2xl:p-4"
      id="about"
    >
      <h1 className="font-bold text-xl md:text-3xl 2xl:text-5xl 2xl:pt-16 pt-14">
        So, what is CampusTalk anyway?
      </h1>

      <div className="hidden lg:grid lg:gap-x-20 lg:grid-cols-3 p-10 mt-2 2xl:gap-x-40 2xl:px-28 2xl:text-2xl">
        {data1.map((data, i) => (
          <AboutItem data={data} key={i} />
        ))}
      </div>

      <Carousel data={data1} />

      <h1 className="font-bold text-xl md:text-3xl 2xl:text-5xl 2xl:pt-14 pt-8">
        Why do we need CampusTalk?
      </h1>

      <Carousel data={data2} />

      <div className="hidden lg:grid lg:gap-x-20 lg:grid-cols-3 p-10 mt-2 2xl:gap-x-40 2xl:px-28 2xl:text-2xl">
        {data2.map((data, i) => (
          <AboutItem data={data} key={i} />
        ))}
      </div>
    </section>
  );
}

export default About;
