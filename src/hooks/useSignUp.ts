import { useState, useEffect } from "react";
import axios from "axios";
import { signup } from "../redux/authState";
import { useDispatch } from "react-redux";

interface SignUpFormContent {
  email: string;
  password: string;
  passwordConfirmation: string;
}

function useSignUp(formContent: SignUpFormContent) {
  const dispatch = useDispatch();


  const signUpUser = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_PORT}/auth/signup`,
      formContent,
      { withCredentials: true }
    );


  };
}
