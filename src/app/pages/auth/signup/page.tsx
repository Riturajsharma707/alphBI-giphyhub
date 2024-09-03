"use client";
import React from "react";
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
import { toast } from "react-toastify";
import { z } from "zod";

import { useRouter } from "next/navigation";
import { signUp } from "@/firebase/firebaseSlice";

const Signup = () => {
  const router = useRouter();

  const formSchema = z.object({
    name: z.string(),
    email: z.string().email({
      message: "Enter valid email address",
    }),
    password: z.string().min(6, { message: "Enter valid password" }),
    confirm_password: z.string().min(6, { message: "Password didn't match" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (values.confirm_password === values.password) {
      const user = await signUp(values.email, values.password);
      console.log(user);
      if (user.user) {
        toast.success("Sign up has been successfull");
        router.push("/pages/auth/signin");
      } else {
        toast.error("sign up failed!");
      }
    }
  };

  return (
    <div className="w-full p-4  items-center bg-pink-50 min-h-screen">
      <div className="min-w-60 md:w-90 lg:w-2/3 lg:mx-52 m-1 border md:mx-3 justify-center rounded-md p-5 bg-pink-50 shadow-xl shadow-black min-h-full">
        <p className="text-center items-center font-medium text-2xl m-4">
          Register{" "}
        </p>
        <hr />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                    <Input placeholder="Password" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm Password"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 md:mx-8 sm:justify-between">
              <Button
                type="submit"
                variant={"newDefault"}
                size={"lg"}
                className="active:bg-pink-700"
              >
                Register
              </Button>
              <p className="font-serif pt-2 ">
                Already have an account?
                <Link href="/pages/auth/signin" className="text-blue-400 px-1">
                  Signin
                </Link>
              </p>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
