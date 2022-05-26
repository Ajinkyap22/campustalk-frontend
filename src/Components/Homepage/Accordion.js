import { useState } from "react";

const faqData = [
  {
    question: "What should I do if my institute's forum is not on the list?",
    answer:
      "Click on the 'Create New Forum' button, you will be taken to a form. Fill up the form with details about your institute and submit the form. Make sure you submit the form with the correct details. Incorrect details will result in deletion of the forum.",
  },
  {
    question: "Can I join multiple forums?",
    answer:
      "Yes, you can join upto 3 forums. This limit is to ensure that your feed is not overcrowded.",
  },
  {
    question: "How do I change my password?",
    answer:
      "Go to the login or signup page and click on the 'Forget Password' button to change your password.",
  },

  {
    question: "How do I post anonymously?",
    answer:
      "When creating a post, you will see a dropdown menu. Select 'Anonymous Mode' to post anonymously.",
  },

  {
    question: "Can I attach files to my posts?",
    answer:
      "Yes, you can attach images, videos and pdf files to your posts We are working on adding support for other document files.",
  },

  {
    question: "Can I send messages to other members of the forum?",
    answer:
      "Yes, you can send messages to other members of the forum by creating a new chat.",
  },

  {
    question: "Can I my name and profile picture?",
    answer:
      "Yes, you can change your user info and picture from the profile tab.",
  },
];

function Accordion() {
  const [currentFaq, setCurrentFaq] = useState(-1);

  const handleFaq = (index) => {
    if (index === currentFaq) setCurrentFaq(-1);
    else setCurrentFaq(index);
  };

  return (
    <div className="mx-3 p-3 md:mx-6 md:p-6">
      {faqData.map((data, index) => (
        <div key={index}>
          <div className="py-6" onClick={() => handleFaq(index)}>
            <div className="flex items-center justify-between pl-3 pr-2 py-3 md:text-2xl 2xl:text-3xl cursor-pointer md:tracking-wide">
              <p className="pr-3">{data.question}</p>
              <button className="w-4 h-4 md:w-6 md:h-6 ml-2 flex-shrink-0">
                {/* Plus */}
                <svg
                  className="fill-white"
                  viewBox="0 0 469.33333 469.33333"
                  xmlns="http://www.w3.org/2000/svg"
                  hidden={currentFaq === index ? true : false}
                >
                  <path d="m437.332031 192h-160v-160c0-17.664062-14.335937-32-32-32h-21.332031c-17.664062 0-32 14.335938-32 32v160h-160c-17.664062 0-32 14.335938-32 32v21.332031c0 17.664063 14.335938 32 32 32h160v160c0 17.664063 14.335938 32 32 32h21.332031c17.664063 0 32-14.335937 32-32v-160h160c17.664063 0 32-14.335937 32-32v-21.332031c0-17.664062-14.335937-32-32-32zm0 0" />
                </svg>
                {/* Minus */}
                <svg
                  className="fill-white"
                  viewBox="0 -192 469.33333 469"
                  xmlns="http://www.w3.org/2000/svg"
                  hidden={currentFaq === index ? false : true}
                >
                  <path d="m437.332031.167969h-405.332031c-17.664062 0-32 14.335937-32 32v21.332031c0 17.664062 14.335938 32 32 32h405.332031c17.664063 0 32-14.335938 32-32v-21.332031c0-17.664063-14.335937-32-32-32zm0 0" />
                </svg>
              </button>
            </div>

            <div className={currentFaq === index ? "p-3" : "p-3 hidden"}>
              <p className="text-sm mb-3 md:text-base 2xl:text-xl w-11/12">
                {data.answer}
              </p>
            </div>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Accordion;
