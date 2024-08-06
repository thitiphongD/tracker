"use client";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  type: string;
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}

const AuthFormInput: React.FC<Props> = ({
  type,
  id,
  name,
  label,
  placeholder,
  register,
  errors,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <div>
        <input
          type={type}
          id={id}
          {...register(name)}
          placeholder={placeholder}
        />
        {errors[name] && (
          <span className="text-xs text-red-700">
            {errors[name]?.message as string}
          </span>
        )}
      </div>
    </div>
  );
};

export default AuthFormInput;
