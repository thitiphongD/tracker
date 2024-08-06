"use client";
import { signUpUserSchema } from "@/app/validationSchema";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Spinner, TextField } from "@radix-ui/themes";
import ErrorMessage from "@/app/components/ErrorMessage";
import axios, { AxiosError } from "axios";
import { ErrorResponse } from "@/app/utils/ErrorResponse";

type SignUpForm = z.infer<typeof signUpUserSchema>;

const SignUpPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpUserSchema),
  });

  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data) => {
    const email = data.email;
    try {
      setIsSubmit(true);
      await axios.post("/api/auth/signUp", data);
      router.push(`/${email}`);
    } catch (error) {
      setIsSubmit(false);
    }
  });

  return (
    <div className="max-w-xl">
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          placeholder="Email"
          {...register("email")}
        ></TextField.Root>
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <TextField.Root
          placeholder="Password"
          {...register("password")}
        ></TextField.Root>
        <ErrorMessage>{errors.password?.message}</ErrorMessage>

        <TextField.Root
          placeholder="Confirm Password"
          {...register("confirmPassword")}
        ></TextField.Root>
        <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

        <Button>Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpPage;
