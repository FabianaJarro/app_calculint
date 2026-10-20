
import React, { useCallback, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Animated,
    ScrollView,
    useWindowDimensions,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useAuth } from "../contexts/auth"


type Nivel = "basico" | "intermediario" | "avancado";

const NIVEIS: {
    id: Nivel;
    titulo: string;
    descricao: string;
    cor: string;
}[] = [
        {
            id: "basico",
            titulo: "Básico",
            descricao: "operações básicas, quantidades",
            cor: "#F8F0A8",
        },
        {
            id: "intermediario",
            titulo: "Intermediário",
            descricao: "situações reais, troco, horário",
            cor: "#D1EDBE",
        },
        {
            id: "avancado",
            titulo: "Avançado",
            descricao: "situações completas, financeiro",
            cor: "#D5F0F5",
        },
    ];

export default function EscolherNivel() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    const { usuario } = useAuth()
      const name = usuario?.name ?? ""

    const animacoes = useRef(
        NIVEIS.map(() => ({
            opacity: new Animated.Value(0),
            translateX: new Animated.Value(-55),
        }))
    ).current;

    useFocusEffect(
        useCallback(() => {
            // Reinicia as três animações ao entrar na rota.
            animacoes.forEach((animacao) => {
                animacao.opacity.setValue(0);
                animacao.translateX.setValue(-55);
            });

            const animacoesSequenciais = animacoes.map((animacao) =>
                Animated.parallel([
                    Animated.timing(animacao.opacity, {
                        toValue: 1,
                        duration: 450,
                        useNativeDriver: true,
                    }),
                    Animated.spring(animacao.translateX, {
                        toValue: 0,
                        tension: 55,
                        friction: 9,
                        useNativeDriver: true,
                    }),
                ])
            );

            const sequencia = Animated.stagger(
                180,
                animacoesSequenciais
            );

            sequencia.start();

            return () => {
                sequencia.stop();
            };
        }, [animacoes])
    );

    const larguraCartao = Math.min(width - 52, 430);

    function selecionarNivel(nivel: Nivel) {
        // Ajuste o destino para a rota real do seu aplicativo.
        router.push({
            pathname: "/calculadora",
            params: { nivel },
        });
    }

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.conteudo}
                showsVerticalScrollIndicator={false}
            >
                {/* <Text style={styles.titulo}>
                    Escolha um nível!
                </Text> */}

                <View style={styles.introducao}>
                    <Text style={styles.saudacao}>
                        Olá{name ? `, ${name}` : ""}!
                    </Text>

                    <Text style={styles.titulo}>
                        Escolha um nível
                    </Text>

                    <Text style={styles.subtitulo}>
                        No seu ritmo, um passo de cada vez.
                    </Text>
                </View>


                <View style={styles.lista}>
                    {NIVEIS.map((nivel, index) => {
                        const animacao = animacoes[index];

                        return (
                            <Animated.View
                                key={nivel.id}
                                style={[
                                    styles.cartaoAnimado,
                                    {
                                        width: larguraCartao,
                                        opacity: animacao.opacity,
                                        transform: [
                                            { translateX: animacao.translateX },
                                        ],
                                    },
                                ]}
                            >
                                <Pressable
                                    onPress={() => selecionarNivel(nivel.id)}
                                    accessibilityRole="button"
                                    accessibilityLabel={
                                        `${nivel.titulo}: ${nivel.descricao}`
                                    }
                                    style={({ pressed }) => [
                                        styles.cartao,
                                        { backgroundColor: nivel.cor },
                                        pressed && styles.cartaoPressionado,
                                    ]}
                                >
                                    {/*
                    Quando tiver as imagens, substitua o View
                    abaixo por um ImageBackground.

                    Exemplo:
                    <ImageBackground
                      source={require("../assets/nivel-basico.png")}
                      style={StyleSheet.absoluteFillObject}
                      imageStyle={{ borderRadius: 27 }}
                      resizeMode="cover"
                    />
                  */}

                                    <View
                                        pointerEvents="none"
                                        style={[
                                            styles.cenario,
                                            index === 0 && styles.cenarioBasico,
                                            index === 1 &&
                                            styles.cenarioIntermediario,
                                            index === 2 && styles.cenarioAvancado,
                                        ]}
                                    />

                                    <View style={styles.textos}>
                                        <Text style={styles.nomeNivel}>
                                            {nivel.titulo}
                                        </Text>

                                        <Text style={styles.descricao}>
                                            {nivel.descricao}
                                        </Text>
                                    </View>
                                </Pressable>
                            </Animated.View>
                        );
                    })}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    conteudo: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 26,
        paddingTop: 55,
        paddingBottom: 55,
    },

    lista: {
        width: "100%",
        alignItems: "center",
        gap: 30,
        alignSelf: "stretch",
    },

    cartaoAnimado: {
        height: 96,
    },

    cartao: {
        flex: 1,
        borderRadius: 27,
        overflow: "hidden",
        justifyContent: "center",
        position: "relative",
    },

    cenario: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.75,
    },

    cenarioBasico: {
        backgroundColor: "#FFF4A5",
    },

    cenarioIntermediario: {
        backgroundColor: "#CDEDBA",
    },

    cenarioAvancado: {
        backgroundColor: "#C5E8F0",
    },

    textos: {
        zIndex: 1,
        alignItems: "flex-end",
        paddingHorizontal: 11,
        paddingVertical: 10,
    },

    nomeNivel: {
        fontFamily: "serif",
        fontSize: 21,
        color: "#111111",
        textAlign: "right",
    },

    descricao: {
        fontFamily: "serif",
        fontSize: 16,
        color: "#111111",
        textAlign: "right",
        marginTop: 1,
    },

    cartaoPressionado: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    introducao: {
        marginBottom: 23,
        width:"100%"
    },

    saudacao: {
        fontSize: 13,
        color: "#6C8BA3",
        marginBottom: 5,
    },

    titulo: {
        fontSize: 25,
        fontWeight: "700",
        color: "#6085A0",
        marginBottom: 5,
    },

    subtitulo: {
        fontSize: 13,
        color: "#6C8BA3",
    },
});
