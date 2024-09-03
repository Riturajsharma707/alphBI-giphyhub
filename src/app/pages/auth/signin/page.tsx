"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { login } from "@/firebase/firebaseSlice";

const Signin = () => {
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email({
      message: "Enter valid email address",
    }),
    password: z.string().min(6, { message: "Enter valid password" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { email, password } = values;
    const user = await login(email, password);
    if (user.user) {
      toast.success("Login successfull");
      localStorage.setItem("userID", user.user.uid);
      router.push("/");
    } else {
      toast.error("Login failed! try again");
    }
  };

  return (
    <div className="w-full p-4 items-center bg-pink-50 min-h-screen">
      <div className="min-w-60 md:w-90 lg:w-2/3 lg:mx-52 m-1 border md:mx-3 justify-center rounded-md p-5 bg-pink-50 shadow-xl shadow-black min-h-full">
        <p className="text-center items-center font-medium text-2xl m-4">
          Login{" "}
        </p>
        <hr />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Abcd@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      {...field}
                      type={"password"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 md:mx-8 sm:justify-between">
              <Button type="submit" variant={"newDefault"} size={"lg"}>
                Login
              </Button>
              <p className="font-serif pt-2 ">
                Don&apos;t have an account?
                <Link href="/pages/auth/signup" className="text-blue-400 px-1">
                  Signup
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
export { login };
