
import { useEffect, useState } from "react";

import { api } from "../api";
import type { Exercicio } from "../interface/Exercicio";

export function useExercicios(
  nivel: string | null | undefined,
  operacao: string,
  modulo: string
) {
  const [exercicios, setExercicios] =
    useState<Exercicio[]>([]);

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [indice, setIndice] = useState(0);
  const [selecionada, setSelecionada] =
    useState<number | null>(null);

  const [conferida, setConferida] = useState(false);
  const [acertos, setAcertos] = useState(0);
  const [introducao, setIntroducao] = useState(false);
  const [finalizado, setFinalizado] = useState(false);

  // BUSCAR EXERCÍCIOS
  useEffect(() => {
    let ativo = true;

    async function carregarExercicios() {
      if (!nivel || !operacao) {
        setErro("Nível ou operação não informado.");
        setCarregando(false);
        return;
      }

      setCarregando(true);
      setErro("");

      try {
        const resposta = await api.get<Exercicio[]>(
          "/exercicios",
          {
            params: {
              nivel,
              operacao,
              modulo,
            },
          }
        );

        if (!resposta.data.length) {
          throw new Error("Nenhum exercício disponível.");
        }

        if (!ativo) return;

        setExercicios(resposta.data);
        setIndice(0);
        setSelecionada(null);
        setConferida(false);
        setAcertos(0);
        setFinalizado(false);

        setIntroducao(
          nivel === "BASICO" &&
          (operacao === "adicao" ||
            operacao === "subtracao")
        );

      } catch (error) {
        console.warn(
          "Falha ao buscar exercícios:",
          error
        );

        if (ativo) {
          setErro(
            "Não foi possível carregar os exercícios."
          );
        }

      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    void carregarExercicios();

    return () => {
      ativo = false;
    };
  }, [nivel, operacao, modulo]);

  // CONFERIR RESPOSTA
  function conferirResposta() {
    if (selecionada === null || conferida) return;

    const exercicioAtual = exercicios[indice];

    if (!exercicioAtual) return;

    if (
      selecionada === exercicioAtual.respostaCorreta
    ) {
      setAcertos((anterior) => anterior + 1);
    }

    setConferida(true);
  }

  // TENTAR NOVAMENTE
  function tentarNovamente() {
    setSelecionada(null);
    setConferida(false);
  }

  // PRÓXIMO EXERCÍCIO
  function proximoExercicio() {
    if (indice >= exercicios.length - 1) {
      setFinalizado(true);
      return;
    }

    setIndice((anterior) => anterior + 1);
    setSelecionada(null);
    setConferida(false);
  }

  return {
    exercicios,
    carregando,
    erro,
    indice,
    selecionada,
    setSelecionada,
    conferida,
    acertos,
    introducao,
    setIntroducao,
    finalizado,
    conferirResposta,
    tentarNovamente,
    proximoExercicio,
  };
}
