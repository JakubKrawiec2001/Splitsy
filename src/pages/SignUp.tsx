import Auth from "@/components/Auth";

const SignUp = () => {
  return (
    <div className="auth_wrapper size-full flex justify-between items-center lg:gap-12 2lg:gap-20 p-6 ">
      <div className="flex items-center justify-center lg:justify-end h-full w-full lg:w-1/2">
        <Auth type={"sign-up"} />
      </div>
      <div className="hidden lg:block h-[95vh] w-[50%] 2lg:w-[40%] custom-radial-gradient rounded-[20px]"></div>
    </div>
  );
};

export default SignUp;
