
import { LoginResponse } from "../interface/LoginResponse";
import { LoginRequest } from "../interface/LoginRequest";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../api";


const postlogin = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post(API_URL + "/auth/login", data)
  return response.data;
}


export function useLogin() {
  const mutate = useMutation({
    mutationFn: postlogin,
  });
  //
  return {
    login: mutate.mutateAsync,
    data: mutate.data,
    loading: mutate.isPending,
    error: mutate.error,
  }
}


