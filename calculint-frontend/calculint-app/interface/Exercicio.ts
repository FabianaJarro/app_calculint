
export interface Exercicio {
  enunciado: string;
  numero1: number;
  numero2: number;
  simbolo: string;
  objeto: string | null;
  alternativas: number[];
  respostaCorreta: number;
}
