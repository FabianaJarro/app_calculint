import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { useAuth } from "../contexts/auth";

import type { ImageSourcePropType } from "react-native";

import DezenasVisual from "../components/exercicios/DezenasVisual";

import ObjetosRetirados from "../components/exercicios/ObjetosRetirados";

import QuadroDez from "../components/exercicios/QuadroDez";

import IntroducaoCompletar10 from
    "../components/exercicios/IntroducaoCompletar10";

import IntroducaoDezenas from "../components/exercicios/IntroducaoDezenas";

import RetaNumerica from "../components/exercicios/RetaNumerica";

import GrupoImagens from "../components/exercicios/GrupoImagens";

import TelaFeedback from "../components/exercicios/TelaFeedback";

import IntroducaoExercicio from "../components/exercicios/IntroducaoExercicio";

import { useExercicios } from "../hooks/useExercicios";

import TelaConclusao from "../components/exercicios/TelaConclusao";

import { useEffect } from "react";
import { api } from "../api";

const nomesOperacoes: Record<string, string> = {
    adicao: "Adição",
    subtracao: "Subtração",
    multiplicacao: "Multiplicação",
    divisao: "Divisão",
};

const IMAGENS: Record<string, ImageSourcePropType> = {
    MACA: require("./assets/exercicios/maca.png"),
    LAPIS: require("./assets/exercicios/lapis.png"),
    FLOR: require("./assets/exercicios/flor.png"),
    BOLINHA: require("./assets/exercicios/bolinha.png"),
};


export default function TelaExercicio() {
    const router = useRouter();
    const params = useLocalSearchParams<{
        nivel?: string
        operacao?: string
        modulo?: string
    }>();

    const { usuario } = useAuth();
    const modulo = params.modulo ?? "objetos";

    const nivel = params.nivel ?? usuario?.nivelAtual;
    const operacao = params.operacao ?? "";


    const {
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
    } = useExercicios(nivel, operacao, modulo);


    useEffect(() => {
        if (
            !finalizado ||
            !nivel ||
            !operacao ||
            exercicios.length === 0
        ) {
            return;
        }

        async function salvarProgresso() {
            try {
                await api.put("/progresso", {
                    nivel,
                    operacao,
                    modulo,
                    acertos,
                    totalQuestoes: exercicios.length,
                });

                console.log("Progresso salvo com sucesso!");
            } catch (error) {
                console.warn("Erro ao salvar progresso:", error);
            }
        }

        void salvarProgresso();
    }, [
        finalizado,
        nivel,
        operacao,
        modulo,
        acertos,
        exercicios.length,
    ]);




    if (carregando) {
        return (
            <View style={styles.centro}>
                <ActivityIndicator size="large" color="#34C7C3" />
                <Text>Carregando exercícios...</Text>
            </View>
        );
    }

    if (erro || exercicios.length === 0) {
        return (
            <View style={styles.centro}>
                <Text>{erro || "Nenhum exercício encontrado."}</Text>

                <Pressable
                    style={styles.botao}
                    onPress={() => router.replace("/operacoes")}
                >
                    <Text style={styles.textoBotao}>Voltar</Text>
                </Pressable>
            </View>
        );
    }


    if (finalizado) {
        return (
            <TelaConclusao
                acertos={acertos}
                total={exercicios.length}
                onVoltar={() =>
                    router.replace({
                        pathname: "/operacoes",
                        params: {
                            nivel: nivel ?? "",
                        },
                    })
                }
            />
        );
    }

    if (
        introducao &&
        nivel === "BASICO" &&
        operacao === "adicao" &&
        modulo === "completar10"
    ) {
        return (
            <IntroducaoCompletar10
                onContinuar={() => setIntroducao(false)}
            />
        );
    }

    // INTRODUÇÃO: DEZENAS E UNIDADES
    if (
        introducao &&
        nivel === "BASICO" &&
        operacao === "adicao" &&
        modulo === "dezenas"
    ) {
        return (
            <IntroducaoDezenas
                onContinuar={() => setIntroducao(false)}
            />
        );
    }

    if (introducao) {
        return (
            <IntroducaoExercicio
                operacao={operacao}
                modulo={modulo}
                onContinuar={() => setIntroducao(false)}
            />
        );
    }


    const exercicio = exercicios[indice];
    const imagemObjeto = exercicio.objeto
        ? IMAGENS[exercicio.objeto]
        : undefined;
    const acertou = selecionada === exercicio.respostaCorreta;


    if (conferida) {
        return (
            <TelaFeedback
                acertou={acertou}
                onContinuar={proximoExercicio}
                onTentarNovamente={tentarNovamente}
            />
        );
    }


    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.conteudo}
        >
            <View style={styles.faixa} />

            <View style={styles.cabecalho}>
                <Text style={styles.etiqueta}>HORA DE PRATICAR</Text>
                <Text style={styles.contador}>
                    {indice + 1} de {exercicios.length}
                </Text>
            </View>

            <Text style={styles.titulo}>
                {nivel === "BASICO" && operacao === "subtracao"
                    ? "Retirando objetos"
                    : nivel === "BASICO" && operacao === "adicao"
                        ? modulo === "reta"
                            ? "Reta numérica"
                            : modulo === "completar10"
                                ? "Completando 10"
                                : modulo === "dezenas"
                                    ? "Dezenas e unidades"
                                    : "Soma com objetos"
                        : nomesOperacoes[operacao] ?? "Exercício"}
            </Text>

            <Text style={styles.descricao}>Observe e responda:</Text>

            <Text style={styles.pergunta}>
                {exercicio.enunciado}
            </Text>




            {exercicio.objeto === "DEZENAS" ? (
                <DezenasVisual
                    numero1={exercicio.numero1}
                    numero2={exercicio.numero2}
                />
            ) : exercicio.objeto === "QUADRO10" ? (
                <QuadroDez
                    preenchidos={exercicio.numero1}
                />
            ) : nivel === "BASICO" &&
                operacao === "subtracao" &&
                imagemObjeto ? (
                <ObjetosRetirados
                    imagem={imagemObjeto}
                    total={exercicio.numero1}
                    retirar={exercicio.numero2}
                />
            ) : exercicio.objeto === "RETA" ? (
                <RetaNumerica
                    inicio={exercicio.numero1}
                    passos={exercicio.numero2}
                />
            ) : imagemObjeto ? (
                <View style={styles.grupos}>
                    <GrupoImagens
                        imagem={imagemObjeto}
                        quantidade={exercicio.numero1}
                    />

                    <Text style={styles.sinal}>
                        {exercicio.simbolo}
                    </Text>

                    <GrupoImagens
                        imagem={imagemObjeto}
                        quantidade={exercicio.numero2}
                    />
                </View>
            ) : (
                <Text style={styles.ilustracao}>
                    {exercicio.numero1} {exercicio.simbolo}{" "}
                    {exercicio.numero2}
                </Text>
            )}




            <Text style={styles.instrucao}>
                Escolha uma resposta:
            </Text>

            <View style={styles.alternativas}>
                {exercicio.alternativas.map((alternativa) => {
                    const marcada = selecionada === alternativa;

                    return (
                        <Pressable
                            key={alternativa}
                            accessibilityRole="radio"
                            accessibilityState={{
                                checked: marcada,
                                disabled: conferida,
                            }}
                            disabled={conferida}
                            onPress={() => setSelecionada(alternativa)}
                            style={[
                                styles.alternativa,
                                marcada && styles.alternativaSelecionada,
                            ]}
                        >
                            <View
                                style={[
                                    styles.circulo,
                                    marcada && styles.circuloSelecionado,
                                ]}
                            />

                            <Text style={styles.numeroAlternativa}>
                                {alternativa}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>


            <Pressable
                disabled={selecionada === null}
                onPress={conferirResposta}
                style={[
                    styles.botao,
                    selecionada === null && styles.botaoDesabilitado,
                ]}
            >
                <Text style={styles.textoBotao}>
                    Conferir resposta
                </Text>
            </Pressable>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    conteudo: {
        flexGrow: 1,
        paddingHorizontal: 24,
        paddingBottom: 35,
    },
    centro: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 24,
        gap: 20,
    },
    faixa: {
        height: 75,
        backgroundColor: "#37C7C5",
        marginHorizontal: -24,
        marginBottom: 25,
    },
    cabecalho: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 12,
    },
    etiqueta: {
        color: "#008DA3",
        fontSize: 12,
        fontWeight: "700",
        marginBottom: 12,
    },
    contador: {
        fontSize: 12,
        color: "#51848B",
    },
    titulo: {
        fontSize: 25,
        color: "#252B2E",
        fontWeight: "700",
        marginBottom: 25,
    },
    descricao: {
        fontSize: 15,
        lineHeight: 24,
        color: "#444444",
        marginBottom: 24,
    },
    pergunta: {
        fontSize: 19,
        fontWeight: "700",
        color: "#222222",
        marginBottom: 25,
    },
    ilustracao: {
        fontSize: 29,
        textAlign: "center",
        marginVertical: 42,
    },
    grupos: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: 12,
        marginVertical: 36,
    },

    sinal: {
        color: "#EF7950",
        fontSize: 27,
        fontWeight: "700",
    },
    instrucao: {
        fontSize: 13,
        color: "#777777",
        marginBottom: 12,
    },
    alternativas: {
        gap: 10,
    },
    alternativa: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#DDDDDD",
        borderRadius: 12,
        padding: 16,
        gap: 14,
        backgroundColor: "#FFFFFF",
    },
    alternativaSelecionada: {
        borderColor: "#34BFC0",
        backgroundColor: "#EFFBFA",
    },
    circulo: {
        width: 19,
        height: 19,
        borderRadius: 10,
        borderWidth: 1.5,
        borderColor: "#8B959A",
    },
    circuloSelecionado: {
        borderWidth: 6,
        borderColor: "#34BFC0",
    },
    numeroAlternativa: {
        fontSize: 17,
        color: "#347A89",
        fontWeight: "600",
    },

    botao: {
        backgroundColor: "#FF8915",
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: "center",
        marginTop: 30,
    },
    botaoDesabilitado: {
        opacity: 0.45,
    },
    textoBotao: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "700",
    },
    resultado: {
        fontSize: 20,
        fontWeight: "600",
        color: "#347A89",
        textAlign: "center",
    },


});
