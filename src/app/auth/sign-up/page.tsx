"use client";
import { signUpUserSchema } from "@/app/validationSchema";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button, Spinner, TextField } from "@radix-ui/themes";
import ErrorMessage from "@/app/components/ErrorMessage";
import axios from "axios";

type SignUpForm = z.infer<typeof signUpUserSchema>;

const SignUpPage = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpForm>({
    resolver: zodResolver(signUpUserSchema),
  });

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmit(true);
      setError("");
      await axios.post("/api/auth/signUp", data);
      reset();
      router.push(`/auth/sign-in`);
    } catch (error) {
      setIsSubmit(false);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.errors) {
          const errorMessages = error.response.data.errors.map(
            (err: any) => err.message
          );
          setError(errorMessages.join(", "));
        } else if (error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("An unexpected error occurred");
        }
      } else {
        setError("An unexpected error occurred");
      }
    }
  });

  const handleInputChange = () => {
    if (error) setError("");
  };

  return (
    <div className="max-w-xl">
      <form className="space-y-3" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Email"
          {...register("email")}
          onChange={handleInputChange}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <input
          type="password"
          placeholder="Password"
          {...register("password")}
          onChange={handleInputChange}
        />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        <input
          type="text"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          onChange={handleInputChange}
        />
        <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>
        <Button disabled={isSubmit}>Sign Up {isSubmit && <Spinner />}</Button>
      </form>
    </div>
  );
};

export default SignUpPage;
