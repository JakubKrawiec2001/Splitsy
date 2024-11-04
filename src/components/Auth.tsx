import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "./CustomFormField";
import { formSchema } from "@/utils/schemas";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import logo from "../assets/icons/logo-splitsy.png";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";

const Auth = ({ type }: { type: string }) => {
  const authSchema = formSchema(type);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof authSchema>) => {
    console.log(data);
  };
  const handleGuestLogin = async () => {
    form.setValue("email", "guest@example.com");
    form.setValue("password", "guestpassword");
    await onSubmit(form.getValues());
  };
  return (
    <div className="w-[450px]">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Splitsy" className="w-[50px]" />
        <h1 className="text-lg md:text-3xl font-bold">Splitsy</h1>
      </div>

      <p className="text-customBlack text-2xl mt-4 font-medium">
        {type === "sign-in" ? "Welcome Back" : "Get Started"}
      </p>
      <p className="text-customTextColor">Let's manage your finance</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 xs:gap-8 md:gap-12 mt-8"
        >
          <div className="flex flex-col gap-6">
            {type === "sign-up" && (
              <CustomFormField
                name="username"
                placeholder="Enter your username"
                label="Username"
                control={form.control}
              />
            )}
            <CustomFormField
              name="email"
              placeholder="Enter your email"
              label="Email"
              control={form.control}
            />
            <CustomFormField
              name="password"
              placeholder="Enter your password"
              label="Password"
              control={form.control}
            />
            {type === "sign-up" && (
              <CustomFormField
                name="confirmedPassword"
                placeholder="Enter your password"
                label="Confirm password"
                control={form.control}
              />
            )}
          </div>
          <div className="flex flex-col items-center gap-4">
            <Button
              type="submit"
              className="cyan_bg_gradient text-white w-full text-lg md:py-6 rounded-[5px]"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={20} className="animate-spin" />
                  Loading...
                </span>
              ) : type === "sign-in" ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </Button>

            {type === "sign-in" && (
              <>
                <div className="flex justify-between items-center w-full">
                  <div className="bg-customCyan w-[40%] h-[1px]" />
                  <p className="text-customTextColor">or</p>
                  <div className="bg-customCyan w-[40%] h-[1px]" />
                </div>
                <Button
                  type="button"
                  onClick={handleGuestLogin}
                  className="bg-customBlack text-white w-full text-lg md:py-6 rounded-[5px] hover:bg-customCyan hover:text-customBlack transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 size={20} className="animate-spin" />
                      Loading...
                    </span>
                  ) : (
                    "Sign in as Guest"
                  )}
                </Button>
              </>
            )}
          </div>
          <div className="flex items-center justify-center gap-2">
            <p className="text-customTextColor">
              {type === "sign-in"
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <Link
              to={type === "sign-in" ? "/sign-up" : "/sign-in"}
              className="text-mainPink-1 md:text-lg hover:text-customCyan transition-colors font-bold"
            >
              {type === "sign-in" ? "Sign Up" : "Sign In"}
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Auth;
