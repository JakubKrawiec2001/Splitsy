import Auth from "@/components/Auth";

const SignUp = () => {
  return (
    <div className="flex items-center justify-center lg:justify-end h-full w-full lg:w-1/2 md:mt-12 lg:mt-0">
      <Auth type={"sign-up"} />
    </div>
  );
};

export default SignUp;
