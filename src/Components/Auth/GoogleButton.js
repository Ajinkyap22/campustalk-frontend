function GoogleButton({ renderProps }) {
  return (
    <button
      onClick={renderProps.onClick}
      disabled={renderProps.disabled}
      className="px-5 py-2 text-xs md:text-sm lg:text-base border shadow bg-white dark:bg-darkLight"
    >
      <img
        alt="Google sign-in"
        className="h-4 md:h-5 inline mr-4"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
      />
      Continue with Google
    </button>
  );
}

export default GoogleButton;
