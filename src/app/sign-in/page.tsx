"use client";
import React, { useState } from "react";
import { loginUserSchema } from "../validationSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Button, TextField, Spinner } from "@radix-ui/themes";
import ErrorMessage from "../components/ErrorMessage";

type IssueForm = z.infer<typeof loginUserSchema>;

const SignInPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(loginUserSchema),
  });

  const [isSubmit, setIsSubmit] = useState<boolean>(false);

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      setIsSubmit(true);
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
        <Button disabled={isSubmit}>Sign In {isSubmit && <Spinner />}</Button>
      </form>
    </div>
  );
};

export default SignInPage;
