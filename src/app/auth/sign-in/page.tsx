"use client";
import React, { useState } from "react";
import { loginUserSchema } from "../../validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, TextField, Spinner } from "@radix-ui/themes";
import ErrorMessage from "../../components/ErrorMessage";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

type SignInForm = z.infer<typeof loginUserSchema>;

const SignInPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInForm>({
    resolver: zodResolver(loginUserSchema),
  });

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const onSubmit = handleSubmit(async (data) => {
    const email = data.email;
    const password = data.password;
    try {
      setIsSubmit(true);
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        console.error("error", result?.error);
        setIsSubmit(false);
        return false;
      }
      router.push(`/${email}`);
    } catch (error) {
      setIsSubmit(false);
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
        <ErrorMessage>{errors.email?.message}</ErrorMessage>
        <input
          type="text"
          placeholder="Password"
          {...register("password")}
          onChange={handleInputChange}
        />
        <ErrorMessage>{errors.password?.message}</ErrorMessage>
        <Button disabled={isSubmit}>Sign In {isSubmit && <Spinner />}</Button>
        {/* <Button onClick={() => signIn("google")}>
          google sign In {isSubmit && <Spinner />}
        </Button> */}
      </form>
    </div>
  );
};

export default SignInPage;
