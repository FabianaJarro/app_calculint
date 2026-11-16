export type Nivel = "basico" | "intermediario" | "avancado";
export type Categoria =
  | "adicao"
  | "subtracao"
  | "multiplicacao"
  | "divisao"
  | "cotidiano";

export type Exercicio = {
  id: string;
  categoria: Categoria;
  nivel: Nivel;
  titulo: string;
  enunciado: string;
  apoio?: string;
  visual?: string;
  alternativas: string[];
  resposta: string;
  explicacao: string;
};

export const CATEGORIAS: { id: Categoria; nome: string; simbolo: string; cor: string; fundo: string }[] = [
  { id: "adicao", nome: "Adição", simbolo: "+", cor: "#D96E2A", fundo: "#FFF1E8" },
  { id: "subtracao", nome: "Subtração", simbolo: "−", cor: "#4D8D9A", fundo: "#EAF6F7" },
  { id: "multiplicacao", nome: "Multiplicação", simbolo: "×", cor: "#D96E2A", fundo: "#FFF1E8" },
  { id: "divisao", nome: "Divisão", simbolo: "÷", cor: "#4D8D9A", fundo: "#EAF6F7" },
  { id: "cotidiano", nome: "Atividades do cotidiano", simbolo: "◷", cor: "#638298", fundo: "#EEF3F7" },
];

const OPERACOES: Record<Exclude<Categoria, "cotidiano">, { titulo: string; simbolo: string }> = {
  adicao: { titulo: "Adição", simbolo: "+" },
  subtracao: { titulo: "Subtração", simbolo: "−" },
  multiplicacao: { titulo: "Multiplicação", simbolo: "×" },
  divisao: { titulo: "Divisão", simbolo: "÷" },
};

const PARAMETROS: Record<Nivel, Record<Exclude<Categoria, "cotidiano">, [number, number][]>> = {
  basico: {
    adicao: [[2, 3], [3, 2], [4, 1], [2, 2], [5, 3]],
    subtracao: [[4, 1], [5, 2], [7, 3], [8, 4], [6, 2]],
    multiplicacao: [[2, 2], [2, 3], [3, 2], [3, 3], [2, 4]],
    divisao: [[4, 2], [6, 2], [8, 4], [6, 3], [10, 2]],
  },
  intermediario: {
    adicao: [[8, 5], [12, 6], [17, 4], [9, 8], [15, 7]],
    subtracao: [[15, 7], [21, 9], [32, 14], [26, 8], [40, 17]],
    multiplicacao: [[4, 3], [5, 4], [6, 7], [8, 3], [9, 5]],
    divisao: [[18, 3], [24, 4], [42, 6], [32, 8], [45, 5]],
  },
  avancado: {
    adicao: [[24, 18], [37, 26], [58, 19], [46, 37], [64, 28]],
    subtracao: [[54, 28], [83, 37], [102, 46], [90, 45], [100, 58]],
    multiplicacao: [[8, 7], [9, 8], [12, 6], [12, 7], [12, 9]],
    divisao: [[72, 8], [96, 12], [144, 12], [108, 9], [132, 11]],
  },
};

const ROTULOS_NIVEL: Record<Nivel, string> = {
  basico: "Básico",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

function calcular(categoria: Exclude<Categoria, "cotidiano">, a: number, b: number) {
  if (categoria === "adicao") return a + b;
  if (categoria === "subtracao") return a - b;
  if (categoria === "multiplicacao") return a * b;
  return a / b;
}

function alternativasNumero(resposta: number, indice: number) {
  const variacoes = [
    [1, -1, 2],
    [-1, 2, -2],
    [2, -2, 1],
    [-2, 1, 3],
    [1, 3, -1],
  ][indice % 5];
  const erradas = variacoes
    .map((variacao) => resposta + variacao)
    .filter((valor) => valor >= 0 && valor !== resposta)
    .map(String);
  const escolhas = [...new Set([...erradas, String(resposta)])].slice(0, 4);
  const posicaoCorreta = indice % escolhas.length;
  const respostaCorreta = escolhas.pop()!;
  escolhas.splice(posicaoCorreta, 0, respostaCorreta);
  return escolhas;
}

function criarExercicioNumerico(nivel: Nivel, categoria: Exclude<Categoria, "cotidiano">, a: number, b: number, indice: number): Exercicio {
  const resposta = calcular(categoria, a, b);
  const op = OPERACOES[categoria];
  const apoio = nivel === "basico"
    ? categoria === "adicao"
      ? `${a} objetos + ${b} objetos`
      : categoria === "subtracao"
        ? `${a} objetos. Retire ${b}.`
        : categoria === "multiplicacao"
          ? `${b} grupos com ${a} objetos em cada grupo`
          : `${a} objetos divididos em ${b} grupos iguais`
    : categoria === "adicao"
      ? "Se ajudar, separe dezenas e unidades."
      : categoria === "subtracao"
        ? "Você pode voltar em etapas na reta numérica."
        : categoria === "multiplicacao"
          ? "Pense em grupos iguais ou em uma soma repetida."
          : "Separe a quantidade em grupos iguais.";
  const visual = nivel !== "basico"
    ? `${a} ${op.simbolo} ${b} = ?`
    : categoria === "adicao"
      ? `${"● ".repeat(a).trim()}   +   ${"● ".repeat(b).trim()}`
      : categoria === "subtracao"
        ? `${a} objetos   −   retirar ${b}`
        : categoria === "multiplicacao"
          ? Array.from({ length: b }, () => "● ".repeat(a).trim()).join("    ")
          : `${a} objetos   →   ${b} grupos iguais`;

  const enunciado = categoria === "adicao"
    ? `Quanto é ${a} + ${b}?`
    : categoria === "subtracao"
      ? `Quanto é ${a} − ${b}?`
      : categoria === "multiplicacao"
        ? `Quanto é ${a} × ${b}?`
        : `Quanto é ${a} ÷ ${b}?`;

  return {
    id: `${nivel}-${categoria}-${indice + 1}`,
    nivel,
    categoria,
    titulo: op.titulo,
    enunciado,
    apoio,
    visual,
    alternativas: alternativasNumero(resposta, indice),
    resposta: String(resposta),
    explicacao: `${a} ${op.simbolo} ${b} = ${resposta}.`,
  };
}

const ATIVIDADES_COTIDIANO: Record<Nivel, Omit<Exercicio, "id" | "nivel" | "categoria">[]> = {
  basico: [
    { titulo: "Dinheiro", enunciado: "Você tem R$ 2,00 e recebe mais R$ 1,00. Quanto tem agora?", apoio: "Junte os valores.", visual: "R$ 2,00 + R$ 1,00", alternativas: ["R$ 2,00", "R$ 3,00", "R$ 4,00", "R$ 1,00"], resposta: "R$ 3,00", explicacao: "2 reais + 1 real = 3 reais." },
    { titulo: "Relógio digital", enunciado: "O relógio marca 07:00. Que horas são?", apoio: "Leia primeiro o número das horas.", visual: "07:00", alternativas: ["Sete horas", "Oito horas", "Meio-dia", "Uma hora"], resposta: "Sete horas", explicacao: "07:00 corresponde a sete horas da manhã." },
    { titulo: "Compras", enunciado: "Uma fruta custa R$ 3,00. Você paga com R$ 5,00. Quanto recebe de troco?", apoio: "Pense em quanto falta de 3 para chegar a 5.", alternativas: ["R$ 1,00", "R$ 2,00", "R$ 3,00", "R$ 8,00"], resposta: "R$ 2,00", explicacao: "5 − 3 = 2 reais de troco." },
  ],
  intermediario: [
    { titulo: "Dinheiro", enunciado: "Um lanche custa R$ 8,00 e um suco custa R$ 5,00. Quanto você paga pelos dois?", apoio: "Some os preços.", visual: "R$ 8,00 + R$ 5,00", alternativas: ["R$ 12,00", "R$ 13,00", "R$ 14,00", "R$ 3,00"], resposta: "R$ 13,00", explicacao: "8 + 5 = 13 reais." },
    { titulo: "Relógio digital", enunciado: "Agora são 14:20. Que horas serão daqui a 30 minutos?", apoio: "Complete primeiro os minutos até a próxima hora.", visual: "14:20 + 30 min", alternativas: ["14:40", "14:50", "15:20", "15:50"], resposta: "14:50", explicacao: "20 + 30 = 50 minutos; a hora continua 14." },
    { titulo: "Compras", enunciado: "Você tinha R$ 20,00 e gastou R$ 12,00. Quanto sobrou?", apoio: "Subtraia o valor gasto do total.", alternativas: ["R$ 6,00", "R$ 7,00", "R$ 8,00", "R$ 9,00"], resposta: "R$ 8,00", explicacao: "20 − 12 = 8 reais." },
  ],
  avancado: [
    { titulo: "Compras", enunciado: "Uma mochila custa R$ 28,00 e um caderno custa R$ 17,00. Você paga com R$ 50,00. Quanto recebe de troco?", apoio: "Some os preços e depois subtraia do valor pago.", visual: "R$ 28,00 + R$ 17,00; pagamento: R$ 50,00", alternativas: ["R$ 3,00", "R$ 5,00", "R$ 7,00", "R$ 9,00"], resposta: "R$ 5,00", explicacao: "28 + 17 = 45. Depois, 50 − 45 = 5 reais de troco." },
    { titulo: "Relógio digital", enunciado: "Uma atividade começa às 09:45 e dura 1 hora e 35 minutos. A que horas termina?", apoio: "Some horas e minutos em etapas.", visual: "09:45 + 1h35", alternativas: ["10:20", "11:10", "11:20", "12:20"], resposta: "11:20", explicacao: "09:45 + 1 hora = 10:45. Mais 35 minutos = 11:20." },
    { titulo: "Orçamento", enunciado: "Você tem R$ 100,00. Compra itens de R$ 24,00, R$ 18,00 e R$ 27,00. Quanto sobra?", apoio: "Some as compras antes de subtrair do total.", alternativas: ["R$ 29,00", "R$ 31,00", "R$ 33,00", "R$ 35,00"], resposta: "R$ 31,00", explicacao: "24 + 18 + 27 = 69. Então, 100 − 69 = 31 reais." },
  ],
};

export function obterExercicios(nivel: Nivel, categoria: Categoria): Exercicio[] {
  if (categoria === "cotidiano") {
    return ATIVIDADES_COTIDIANO[nivel].map((item, indice) => ({
      ...item,
      id: `${nivel}-cotidiano-${indice + 1}`,
      nivel,
      categoria,
    }));
  }
  return PARAMETROS[nivel][categoria].map(([a, b], indice) =>
    criarExercicioNumerico(nivel, categoria, a, b, indice),
  );
}

export function nomeNivel(nivel: Nivel) {
  return ROTULOS_NIVEL[nivel];
}
