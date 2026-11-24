
import { useState } from "react";
import {
  useRouter,
  useLocalSearchParams,
} from "expo-router";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  type ImageSourcePropType,
} from "react-native";

import { useAuth } from "../contexts/auth";



type OperacaoId =
  | "adicao"
  | "subtracao"
  | "multiplicacao"
  | "divisao";

const IMAGENS_OPERACOES: Record<
  OperacaoId,
  ImageSourcePropType
> = {
  adicao: require("./assets/operacoes/adicao.png"),
  subtracao: require("./assets/operacoes/subtracao.png"),
  multiplicacao: require("./assets/operacoes/multiplicacao.png"),
  divisao: require("./assets/operacoes/divisao.png"),
};

type ModuloId = "objetos" | "reta" | "completar10" | "dezenas";

const operacoes: {
  id: OperacaoId;
  nome: string;
  simbolo: string;
  cor: string;
  fundo: string;
}[] = [
    {
      id: "adicao",
      nome: "Adição",
      simbolo: "+",
      cor: "#F28B13",
      fundo: "#FFF16B",
    },
    {
      id: "subtracao",
      nome: "Subtração",
      simbolo: "−",
      cor: "#D89B00",
      fundo: "#F4EEA3",
    },
    {
      id: "multiplicacao",
      nome: "Multiplicação",
      simbolo: "×",
      cor: "#438E37",
      fundo: "#ADE68E",
    },
    {
      id: "divisao",
      nome: "Divisão",
      simbolo: "÷",
      cor: "#8A794F",
      fundo: "#A6ED9F",
    },
  ];

const conjuntos: {
  numero: string;
  nome: string;
  modulo?: ModuloId;
}[] = [
    {
      numero: "1/4",
      nome: "Soma com objetos",
      modulo: "objetos",
    },
    {
      numero: "2/4",
      nome: "Reta numérica",
      modulo: "reta",
    },
    {
      numero: "3/4",
      nome: "Completando 10",
      modulo: "completar10",
    },
    {
      numero: "4/4",
      nome: "Dezenas",
      modulo: "dezenas",
    },
  ];


const conjuntosMultiplicacao = [
  {
    numero: "1/4",
    nome: "Grupos iguais",
    modulo: "grupos",
    disponivel: true,
  },
  {
    numero: "2/4",
    nome: "Adição repetida",
    modulo: "adicao_repetida",
    disponivel: false,
  },
  {
    numero: "3/4",
    nome: "Linhas e colunas",
    modulo: "linhas_colunas",
    disponivel: false,
  },
  {
    numero: "4/4",
    nome: "Sequências",
    modulo: "sequencia",
    disponivel: false,
  },
] as const;


export default function Operacoes() {
  const router = useRouter();
  const { usuario } = useAuth();

  const { nivel: nivelParametro } =
    useLocalSearchParams<{ nivel?: string }>();

  const nivel =
    nivelParametro === "BASICO" ||
      nivelParametro === "INTERMEDIARIO" ||
      nivelParametro === "AVANCADO"
      ? nivelParametro
      : usuario?.nivelAtual ?? null;

  // 0 = fechado
  // 1 = mostra 1/4
  // 2 = mostra os conjuntos
  const [etapaAdicao, setEtapaAdicao] =
    useState<0 | 1 | 2>(0);

  const [etapaMultiplicacao, setEtapaMultiplicacao] =
    useState<0 | 1 | 2>(0);

  function selecionarOperacao(id: OperacaoId) {
    if (!nivel) {
      router.replace("/selecionar_nivel");
      return;
    }


    if (id === "multiplicacao" && nivel === "BASICO") {
      setEtapaMultiplicacao((anterior) => {
        if (anterior === 0) return 1;
        if (anterior === 1) return 2;
        return 0;
      });

      return;
    }

    if (id === "adicao" && nivel === "BASICO") {
      setEtapaAdicao((anterior) => {
        if (anterior === 0) return 1;
        if (anterior === 1) return 2;
        return 0;
      });

      return;
    }

    router.push({
      pathname: "/exercicio",
      params: {
        nivel,
        operacao: id,
      },
    });
  }

  function abrirConjunto(modulo: ModuloId) {
    if (!nivel) return;

    router.push({
      pathname: "/exercicio",
      params: {
        nivel,
        operacao: "adicao",
        modulo,
      },
    });
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.cabecalho}>
        <Text style={styles.titulo}>
          Escolha uma operação
        </Text>

        <Text style={styles.subtitulo}>
          No seu ritmo, um passo de cada vez.
        </Text>
      </View>

      <View style={styles.lista}>

        {nivel === "AVANCADO" && (
          <Pressable
            style={styles.botaoCotidiano}
            onPress={() => router.push("/cotidiano")}
          >
            <Text style={styles.textoCotidiano}>
              Atividades do cotidiano
            </Text>

            <Text style={styles.subtextoCotidiano}>
              Dinheiro, medidas e compras ›
            </Text>
          </Pressable>
        )}

        {operacoes.map((operacao, index) => {
          const mostrarAdicao =
            operacao.id === "adicao" &&
            nivel === "BASICO";

          return (
            <View
              key={operacao.id}
              style={[
                styles.item,
                index % 2 === 0
                  ? styles.esquerda
                  : styles.direita,
              ]}
            >

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={operacao.nome}
                onPress={() => selecionarOperacao(operacao.id)}
                style={({ pressed }) => [
                  styles.areaIcone,
                  pressed && styles.pressionado,
                ]}
              >
                <Image
                  source={IMAGENS_OPERACOES[operacao.id]}
                  style={styles.imagemOperacao}
                  resizeMode="contain"
                />
              </Pressable>


              <Text style={styles.nomeOperacao}>
                {operacao.nome}
              </Text>

              {/* primeiro clique*/}
              {mostrarAdicao && etapaAdicao >= 1 && (
                <Pressable
                  onPress={() => setEtapaAdicao(2)}
                  accessibilityRole="button"
                  accessibilityLabel="Ver conjuntos de adição"
                  style={styles.indicador}
                >
                  <Text style={styles.numeroIndicador}>
                    1/4
                  </Text>

                  {etapaAdicao === 1 && (
                    <Text style={styles.dica}>
                      Toque novamente para ver os conjuntos
                    </Text>
                  )}
                </Pressable>
              )}

              {/*segundo clique*/}
              {mostrarAdicao && etapaAdicao === 2 && (
                <View style={styles.conjuntos}>
                  {conjuntos.map((conjunto) => {
                    const disponivel = !!conjunto.modulo;

                    return (
                      <Pressable
                        key={conjunto.numero}
                        disabled={!disponivel}
                        accessibilityRole="button"
                        onPress={() => {
                          if (conjunto.modulo) {
                            abrirConjunto(conjunto.modulo);
                          }
                        }}
                        style={styles.linhaConjunto}
                      >
                        <Text
                          style={[
                            styles.textoConjunto,
                            !disponivel &&
                            styles.textoDesabilitado,
                          ]}
                        >
                          {conjunto.numero} — {conjunto.nome}
                        </Text>

                        <Text style={styles.seta}>
                          {disponivel ? "›" : "Em breve"}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              )}


              {operacao.id === "multiplicacao" &&
                nivel === "BASICO" &&
                etapaMultiplicacao >= 1 && (
                  <Pressable
                    style={styles.indicador}
                    onPress={() => setEtapaMultiplicacao(2)}
                  >
                    <Text style={styles.numeroIndicador}>
                      1/4
                    </Text>

                    {etapaMultiplicacao === 1 && (
                      <Text style={styles.dica}>
                        Toque novamente para ver os conjuntos
                      </Text>
                    )}
                  </Pressable>
                )}

              {operacao.id === "multiplicacao" &&
                nivel === "BASICO" &&
                etapaMultiplicacao === 2 && (
                  <View style={styles.conjuntos}>
                    {conjuntosMultiplicacao.map((conjunto) => (
                      <Pressable
                        key={conjunto.modulo}
                        disabled={!conjunto.disponivel}
                        style={styles.linhaConjunto}
                        onPress={() => {
                          if (!nivel) return;

                          router.push({
                            pathname: "/exercicio",
                            params: {
                              nivel,
                              operacao: "multiplicacao",
                              modulo: conjunto.modulo,
                            },
                          });
                        }}
                      >
                        <Text
                          style={[
                            styles.textoConjunto,
                            !conjunto.disponivel &&
                            styles.textoDesabilitado,
                          ]}
                        >
                          {conjunto.numero} — {conjunto.nome}
                        </Text>

                        <Text style={styles.seta}>
                          {conjunto.disponivel ? "›" : "Em breve"}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                )}

            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  conteudo: {
    width: "100%",
    maxWidth: 460,
    alignSelf: "center",
    paddingHorizontal: 22,
    paddingTop: 32,
    paddingBottom: 45,
  },

  cabecalho: {
    marginBottom: 24,
  },

  titulo: {
    color: "#6085A0",
    fontSize: 25,
    fontWeight: "700",
  },

  subtitulo: {
    fontSize: 14,
    color: "#6C8BA3",
    marginTop: 7,
  },

  lista: {
    width: "100%",
  },

  item: {
    width: "75%",
    alignItems: "center",
    marginBottom: 13,
  },

  esquerda: {
    alignSelf: "flex-start",
  },

  direita: {
    alignSelf: "flex-end",
  },

  areaIcone: {
    width: 148,
    height: 137,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },

  pressionado: {
    opacity: 0.8,
    transform: [{ scale: 0.96 }],
  },

  nomeOperacao: {
    fontSize: 15,
    color: "#334F61",
    marginTop: -2,
    textAlign: "center",
  },

  indicador: {
    marginTop: 9,
    alignItems: "center",
    paddingVertical: 5,
  },

  numeroIndicador: {
    fontSize: 15,
    fontWeight: "700",
    color: "#F28B13",
  },

  dica: {
    fontSize: 11,
    textAlign: "center",
    color: "#8296A3",
    marginTop: 4,
  },

  conjuntos: {
    width: "100%",
    marginTop: 12,
    paddingHorizontal: 4,
  },

  linhaConjunto: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEE",
    gap: 6,
  },

  textoConjunto: {
    fontSize: 13,
    color: "#334F61",
    flexShrink: 1,
  },

  textoDesabilitado: {
    color: "#A7B0B6",
  },

  seta: {
    color: "#8B9BA5",
    fontSize: 12,
  },

  imagemOperacao: {
    width: 118,
    height: 107,
  },


  botaoCotidiano: {
    backgroundColor: "#D9F2E8",
    borderRadius: 14,
    padding: 18,
    marginBottom: 28,
    alignItems: "center",
  },

  textoCotidiano: {
    color: "#175D51",
    fontSize: 18,
    fontWeight: "700",
  },

  subtextoCotidiano: {
    color: "#5D8278",
    fontSize: 13,
    marginTop: 6,
  },


});
