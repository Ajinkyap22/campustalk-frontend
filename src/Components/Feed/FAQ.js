import { useState } from "react";

function FAQ({ faqData }) {
  const [currentFaq, setCurrentFaq] = useState(-1);

  const handleFaq = (index) => {
    if (index === currentFaq) setCurrentFaq(-1);
    else setCurrentFaq(index);
  };

  return (
    <div className="faq hidden lg:block bg-white dark:bg-darkSecondary shadow-base text-[#000000e6] mb-8 lg:w-[14rem] lg-max-w-[14rem] xl:w-[17rem] xl:max-w-[17rem] 2xl:w-[24rem] 2xl:max-w-[24rem] 3xl:w-[28rem] 3xl:max-w-[28rem] rounded self-start">
      {/* title */}
      <div className="bg-primary-light lg:px-2 xl:p-3 py-2 2xl:px-4 2xl:py-3 rounded-t flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
          className="inline mr-2 align-text-bottom lg:w-5 xl:w-6 2xl:w-9"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
          <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
        </svg>
        <span className="lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl text-white">
          FAQ
        </span>
      </div>

      {/* questions */}
      <div>
        {/* if data is not undefined map over date else map over faqData */}
        {faqData.map((data, index) => (
          <div key={index}>
            <div className="py-3" onClick={() => handleFaq(index)}>
              <div className="flex items-center justify-between text-xs xl:text-sm 2xl:text-lg cursor-pointer">
                {/* text */}
                <p className="lg:px-2 xl:px-3 text-left dark:text-darkLight">
                  {data.question}
                </p>

                {/* toggles */}
                <button className="pr-3">
                  {currentFaq === index ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline dark:fill-darkLight w-3 xl:w-4"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="inline dark:fill-darkLight w-3 xl:w-4"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                      />
                    </svg>
                  )}
                </button>
              </div>

              <div
                className={
                  currentFaq === index
                    ? "lg:px-2 xl:px-3 py-2 pt-4 w-full"
                    : "hidden"
                }
              >
                <p className="text-xsm xl:text-xs 2xl:text-base text-left dark:text-darkLight">
                  {data.answer}
                </p>
              </div>
            </div>
            <hr
              className="bg-light dark:border-top dark:border-light"
              hidden={index === faqData.length - 1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
