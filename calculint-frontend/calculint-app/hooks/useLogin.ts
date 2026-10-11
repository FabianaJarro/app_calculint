
import { LoginResponse } from "../types/LoginResponse";
import { LoginRequest } from "../types/LoginRequest";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../api";


const postData = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await axios.post(API_URL + "/auth/login", data)
  return response.data;
}


export function useLogin() {
  const mutate = useMutation({
    mutationFn: postData,
  });
  //
  return {
    login: mutate.mutateAsync,
    data: mutate.data,
    loading: mutate.isPending,
    error: mutate.error,
  }
}


