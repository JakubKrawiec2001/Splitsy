import Auth from "@/components/Auth";

const SignIn = () => {
  return (
    <div className="auth_wrapper h-screen flex justify-between items-center gap-20 p-6">
      <div className="flex items-center justify-end h-full w-1/2">
        <Auth type={"sign-in"} />
      </div>
      <div className="h-full w-[40%] custom-radial-gradient rounded-[20px]"></div>
    </div>
  );
};

export default SignIn;
