import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { RegisterTypes, SCHEMAS } from "./constants";
import s from "./Auth.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { StudentFormValues } from "./types";
import CompanyAuth from "./CompanyAuth";
import StudentAuth from "./StudentAuth";

const Register = () => {
  // TODO: update code after implementing company employee register
  const [registerMode, setRegisterMode] = useState<RegisterTypes | null>(null);
  const currentSchema = useMemo(() => {
    if (registerMode) {
      return SCHEMAS[registerMode];
    }
  }, [registerMode]);
  const { register, handleSubmit, formState } = useForm<StudentFormValues>({
    resolver: yupResolver(),
  });

  const onSubmit = () => {};

  return <StudentAuth />;
};

export default Register;
