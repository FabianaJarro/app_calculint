
import { useMutation } from "@tanstack/react-query";
import { RegisterRequest } from "../interface/RegisterRequest";
import { api } from "../api";

const postCadastro =async (data: RegisterRequest) : Promise<void> =>  {
  const response = await api.post("/auth/register", data )
  return response.data;
}

export function useCadastro() {
  const mutate= useMutation({
    mutationFn: postCadastro,
  });

  return {
    cadastro: mutate.mutateAsync,
    loading: mutate.isPending,
    error: mutate.error,
    data: mutate.data,
  };
}
