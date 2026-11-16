
import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
    ActivityIndicator,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";

import { api } from "../api";
import { useAuth } from "../contexts/auth";
import {
    Image,
    type ImageSourcePropType,
} from "react-native";

type Exercicio = {
    enunciado: string;
    numero1: number;
    numero2: number;
    simbolo: string;
    objeto: string | null;
    alternativas: number[];
    respostaCorreta: number;
};

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


function GrupoImagens({
    imagem,
    quantidade,
}: {
    imagem: ImageSourcePropType;
    quantidade: number;
}) {
    return (
        <View style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            maxWidth: 170,
            gap: 3,
        }}>
            {Array.from({ length: quantidade }, (_, index) => (
                <Image
                    key={index}
                    source={imagem}
                    style={{
                        width: 34,
                        height: 34,
                    }}
                    resizeMode="contain"
                />
            ))}
        </View>
    );
}



function RetaNumerica({
    inicio,
    passos,
    mostrarSolucao = false,
}: {
    inicio: number;
    passos: number;
    mostrarSolucao?: boolean;
}) {
    const chegada = inicio + passos;

    return (
        <View style={{ marginVertical: 25 }}>
            <Text
                style={{
                    textAlign: "center",
                    color: "#51848B",
                    marginBottom: 12,
                }}
            >
                Comece no {inicio} e avance {passos} casas →
            </Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View
                    style={{
                        flexDirection: "row",
                        paddingVertical: 8,
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            top: 46,
                            left: 18,
                            right: 18,
                            height: 2,
                            backgroundColor: "#A7BCC5",
                        }}
                    />

                    {Array.from(
                        { length: Math.max(11, chegada + 1) },
                        (_, numero) => (
                            <View
                                key={numero}
                                style={{
                                    width: 36,
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        height: 23,
                                        color: "#EF7950",
                                        fontSize: 16,
                                    }}
                                >
                                    {mostrarSolucao &&
                                        numero > inicio &&
                                        numero <= chegada
                                        ? "↓"
                                        : " "}
                                </Text>

                                <View
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        borderWidth: 2,
                                        alignItems: "center",
                                        justifyContent: "center",

                                        borderColor:
                                            numero === inicio
                                                ? "#EF7950"
                                                : mostrarSolucao &&
                                                    numero === chegada
                                                    ? "#21A6A4"
                                                    : "#A7BCC5",

                                        backgroundColor:
                                            numero === inicio
                                                ? "#FFE5CE"
                                                : mostrarSolucao &&
                                                    numero === chegada
                                                    ? "#D1F1EA"
                                                    : "#FFFFFF",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: "600",
                                            color: "#334F61",
                                        }}
                                    >
                                        {numero}
                                    </Text>
                                </View>
                            </View>
                        )
                    )}
                </View>
            </ScrollView>

            {mostrarSolucao && (
                <Text
                    style={{
                        textAlign: "center",
                        color: "#21A6A4",
                        fontWeight: "700",
                        marginTop: 15,
                    }}
                >
                    {inicio} + {passos} = {chegada}
                </Text>
            )}
        </View>
    );
}




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

    const [exercicios, setExercicios] = useState<Exercicio[]>([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState("");

    const [indice, setIndice] = useState(0);
    const [selecionada, setSelecionada] = useState<number | null>(null);
    const [conferida, setConferida] = useState(false);
    const [acertos, setAcertos] = useState(0);
    const [introducao, setIntroducao] = useState(false);
    const [finalizado, setFinalizado] = useState(false);


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
                        params: { nivel, operacao, modulo },
                    }
                );

                if (!resposta.data.length) {
                    throw new Error("Nenhum exercício disponível.");
                }

                if (ativo) {
                    setExercicios(resposta.data);
                    setIndice(0);
                    setSelecionada(null);
                    setConferida(false);
                    setAcertos(0);
                    setFinalizado(false);

                    setIntroducao(
                        nivel === "BASICO" &&
                        operacao === "adicao"
                    );
                }

            } catch (error: any) {
                console.warn("Falha ao buscar exercícios");

                console.log("Status:", error.response?.status);
                console.log("Resposta:", error.response?.data);
                console.log("Mensagem:", error.message);

                console.log(
                    "Token configurado?",
                    Boolean(
                        api.defaults.headers.common.Authorization
                    )
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

        carregarExercicios();

        return () => {
            ativo = false;
        };

    }, [nivel, operacao, modulo]);


    function conferirResposta() {
        if (selecionada === null || conferida) return;

        const correta = exercicios[indice].respostaCorreta;

        if (selecionada === correta) {
            setAcertos((anterior) => anterior + 1);
        }

        setConferida(true);
    }
    function tentarNovamente() {
        setSelecionada(null);
        setConferida(false);
    }


    function proximoExercicio() {
        if (indice === exercicios.length - 1) {
            setFinalizado(true);
            return;
        }

        setIndice((anterior) => anterior + 1);
        setSelecionada(null);
        setConferida(false);
    }

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
            <View style={styles.centro}>
                <Text style={styles.titulo}>Atividade concluída!</Text>

                <Text style={styles.resultado}>
                    Você acertou {acertos} de {exercicios.length} questões.
                </Text>

                <Text style={styles.descricao}>
                    Continue praticando no seu ritmo!
                </Text>

                <Pressable
                    style={styles.botao}
                    onPress={() =>
                        router.replace({
                            pathname: "/operacoes",
                            params: { nivel: nivel ?? "" },
                        })
                    }
                >
                    <Text style={styles.textoBotao}>
                        Voltar às operações
                    </Text>
                </Pressable>
            </View>
        );
    }


    if (introducao) {
        const ehReta = modulo === "reta";

        return (
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.conteudo}
            >
                <View style={styles.faixa} />

                <Text style={styles.etiqueta}>
                    VAMOS APRENDER
                </Text>

                <Text style={styles.titulo}>
                    {ehReta ? "Reta numérica" : "Soma com objetos"}
                </Text>

                <Text style={styles.subtitulo}>
                    {ehReta ? "Somando com saltos" : "Juntar quantidades"}
                </Text>

                <Text style={styles.descricao}>
                    {ehReta
                        ? "Na reta numérica, podemos somar avançando casas para a direita. Começamos em um número e damos a quantidade de saltos indicada."
                        : "Somar significa juntar grupos. Conte os objetos de cada grupo e depois conte todos juntos."}
                </Text>

                {ehReta ? (
                    <RetaNumerica
                        inicio={2}
                        passos={3}
                        mostrarSolucao={true}
                    />
                ) : (
                    <View style={styles.grupos}>
                        <GrupoImagens
                            imagem={IMAGENS.MACA}
                            quantidade={2}
                        />

                        <Text style={styles.sinal}>+</Text>

                        <GrupoImagens
                            imagem={IMAGENS.MACA}
                            quantidade={3}
                        />
                    </View>
                )}

                <Text style={styles.etiqueta}>
                    VEJA COMO FAZER
                </Text>

                <Text style={styles.descricao}>
                    {ehReta
                        ? "Começamos no número 2. Para somar 3, avançamos três casas: 3, 4 e 5. Chegamos ao número 5! Portanto, 2 + 3 = 5."
                        : "Aqui temos 2 maçãs e mais 3 maçãs. Juntando tudo, temos 5 maçãs: 2 + 3 = 5."}
                </Text>

                <Pressable
                    style={styles.botao}
                    onPress={() => setIntroducao(false)}
                >
                    <Text style={styles.textoBotao}>
                        Próximo
                    </Text>
                </Pressable>
            </ScrollView>
        );
    }


    const exercicio = exercicios[indice];
    const imagemObjeto = exercicio.objeto
        ? IMAGENS[exercicio.objeto]
        : undefined;
    const acertou = selecionada === exercicio.respostaCorreta;


    if (conferida) {
        return (
            <View style={styles.telaFeedback}>
                <View style={styles.faixaFeedback} />

                <View style={styles.conteudoFeedback}>
                    <Image
                        source={
                            acertou
                                ? require("./assets/exercicios/feedback-acerto.png")
                                : require("./assets/exercicios/feedback-erro.png")
                        }
                        style={styles.imagemFeedback}
                        resizeMode="contain"
                    />

                    <Text style={styles.tituloFeedback}>
                        {acertou ? "Muito bem!" : "Quase lá!"}
                    </Text>

                    <Text style={styles.descricaoFeedback}>
                        {acertou
                            ? "Você encontrou a resposta!\nContinue aprendendo\nno seu ritmo."
                            : "Vamos tentar novamente!\nVocê pode fazer isso\nno seu ritmo."}
                    </Text>
                </View>

                <Pressable
                    style={styles.botaoFeedback}
                    onPress={
                        acertou
                            ? proximoExercicio
                            : tentarNovamente
                    }
                    accessibilityRole="button"
                >
                    <Text style={styles.textoBotao}>
                        {acertou
                            ? "Continuar"
                            : "Tentar novamente"}
                    </Text>
                </Pressable>
            </View>
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
                {nivel === "BASICO" && operacao === "adicao"
                    ? modulo === "reta"
                        ? "Reta numérica"
                        : "Soma com objetos"
                    : nomesOperacoes[operacao] ?? "Exercício"}
            </Text>

            <Text style={styles.descricao}>Observe e responda:</Text>

            <Text style={styles.pergunta}>
                {exercicio.enunciado}
            </Text>


            {exercicio.objeto === "RETA" ? (
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
        </ScrollView>
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
    subtitulo: {
        fontSize: 17,
        fontWeight: "700",
        marginBottom: 12,
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
    objetos: {
        fontSize: 25,
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
    feedback: {
        marginTop: 18,
        padding: 14,
        backgroundColor: "#EAF8F4",
        borderRadius: 12,
    },
    feedbackTexto: {
        color: "#266C5C",
        fontSize: 14,
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


    telaFeedback: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    faixaFeedback: {
        height: 85,
        backgroundColor: "#39C7C5",
    },

    conteudoFeedback: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 30,
    },

    imagemFeedback: {
        width: 165,
        height: 165,
        marginBottom: 26,
    },

    tituloFeedback: {
        fontSize: 30,
        fontWeight: "700",
        color: "#146451",
        textAlign: "center",
        marginBottom: 24,
    },

    descricaoFeedback: {
        fontSize: 18,
        lineHeight: 29,
        color: "#455F66",
        textAlign: "center",
    },

    botaoFeedback: {
        backgroundColor: "#FF8915",
        marginHorizontal: 28,
        marginBottom: 35,
        borderRadius: 12,
        paddingVertical: 17,
        alignItems: "center",
    },

});
