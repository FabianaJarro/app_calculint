
import { LoginResponse } from "../interface/LoginResponse";
import { LoginRequest } from "../interface/LoginRequest";
import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

const postLogin = async (
  data: LoginRequest
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  );

  return response.data;
};

export function useLogin() {
  const mutate = useMutation({
    mutationFn: postLogin,
  });

  return {
    login: mutate.mutateAsync,
    data: mutate.data,
    loading: mutate.isPending,
    error: mutate.error,
  };
}
