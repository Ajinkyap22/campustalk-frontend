function Input({
  type,
  placeholder = "",
  name,
  label,
  callback,
  minLength = 0,
  required,
  value,
  setState = true,
}) {
  return (
    <div className="my-4 relative">
      {/* label */}
      <label
        htmlFor={name}
        className="text-xs dark:text-darkLight lg:text-sm 2xl:text-lg"
      >
        {label}{" "}
        <span className="text-red-600" hidden={required ? false : true}>
          *
        </span>
      </label>

      {/* input */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={(e) => (setState ? callback(e.target.value) : callback(e))}
        placeholder={placeholder}
        className="mt-2 block w-full px-3 py-1.5 border dark:text-darkLight border-gray-300 dark:border-[#3e3d3d] bg-[#f6f6f6] dark:bg-[#3e3d3d] rounded-md text-xs lg:text-sm 2xl:text-base shadow-sm placeholder-[#818181] 
              focus:outline-none focus:border-sky-500"
        minLength={minLength}
        required={required}
      />
    </div>
  );
}

export default Input;
