import { useState } from "react";

function Password({
  placeholder = "",
  name,
  label,
  callback,
  minLength = 0,
  required,
  setState = true,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="my-4 relative">
      <label
        htmlFor={name}
        className="text-xs lg:text-sm 2xl:text-lg dark:text-darkLight"
      >
        {label}{" "}
        <span className="text-red-600" hidden={required ? false : true}>
          *
        </span>
      </label>
      <input
        type={showPassword ? "text" : "password"}
        name={name}
        onChange={(e) => (setState ? callback(e.target.value) : callback(e))}
        placeholder={placeholder}
        className="mt-2 block w-full px-3 py-1.5 border dark:text-darkLight border-gray-300 dark:border-[#3e3d3d] bg-[#f6f6f6] dark:bg-[#3e3d3d] rounded-md text-xs lg:text-sm 2xl:text-base shadow-sm placeholder-[#818181] 
              focus:outline-none focus:border-sky-500"
        minLength={minLength}
        required={required}
      />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-auto absolute right-0 mr-3 top-[61.5%] 2xl:top-[62%] fill-[#626262] dark:fill-gray-400"
        viewBox="0 0 20 20"
        hidden={showPassword ? true : false}
        onClick={toggleShowPassword}
      >
        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
        <path
          fillRule="evenodd"
          d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
          clipRule="evenodd"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-auto absolute right-0 mr-3 top-[61.5%] 2xl:top-[62%] fill-[#626262] dark:fill-gray-400"
        viewBox="0 0 20 20"
        hidden={showPassword ? false : true}
        onClick={toggleShowPassword}
      >
        <path
          fillRule="evenodd"
          d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
          clipRule="evenodd"
        />
        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
      </svg>
    </div>
  );
}

export default Password;
