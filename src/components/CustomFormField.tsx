import { Control, FieldPath } from "react-hook-form";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { formSchema } from "@/utils/schemas";

const authSchema = formSchema("sign-up");

type AuthSchema = z.infer<typeof authSchema>;

interface ICustomFormFieldProps {
  control: Control<AuthSchema>;
  name: FieldPath<AuthSchema>;
  label: string;
  placeholder: string;
}

const CustomFormField = ({
  control,
  name,
  label,
  placeholder,
}: ICustomFormFieldProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="w-full">
          <FormLabel className="text-customBlack">{label}</FormLabel>
          <FormControl>
            <Input
              className="mt-1"
              placeholder={placeholder}
              type={
                name === "password" || name === "confirmedPassword"
                  ? "password"
                  : "text"
              }
              {...field}
            />
          </FormControl>
          <FormMessage />
        </div>
      )}
    />
  );
};

export default CustomFormField;
