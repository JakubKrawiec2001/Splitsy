import Auth from "@/components/Auth";

const SignIn = () => {
  return (
    <div className="flex items-center justify-center lg:justify-end h-full w-full lg:w-1/2">
      <Auth type={"sign-in"} />
    </div>
  );
};

export default SignIn;
