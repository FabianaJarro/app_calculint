
import React, { useCallback, useRef, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Animated,
    ScrollView,
    useWindowDimensions,
    Alert
} from "react-native";

import { useFocusEffect, useRouter } from "expo-router";
import { useAuth } from "../contexts/auth"
import type { Nivel } from "../interface/LoginResponse";


const NIVEIS: {
    id: Nivel;
    titulo: string;
    descricao: string;
    cor: string;
}[] = [
        {
            id: "BASICO",
            titulo: "Básico",
            descricao: "operações básicas, quantidades",
            cor: "#F8F0A8",
        },
        {
            id: "INTERMEDIARIO",
            titulo: "Intermediário",
            descricao: "situações reais, troco, horário",
            cor: "#D1EDBE",
        },
        {
            id: "AVANCADO",
            titulo: "Avançado",
            descricao: "situações completas, financeiro",
            cor: "#D5F0F5",
        },
    ];

export default function EscolherNivel() {
    const router = useRouter();
    const { width } = useWindowDimensions();

    const { usuario, atualizarNivel } = useAuth();
    const [salvando, setSalvando] = useState(false);

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

    async function selecionarNivel(nivel: Nivel) {
        if (salvando) return;

        setSalvando(true);

        try {
            await atualizarNivel(nivel);

            router.replace({
                pathname: "/operacoes",
                params: { nivel },
            });

        } catch (error) {
            console.error("Erro ao salvar nível:", error);

            Alert.alert(
                "Erro",
                "Não foi possível salvar o nível."
            );
        } finally {
            setSalvando(false);
        }
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
                                    disabled={salvando}
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
                    quando tiver as imagens, substituir o View
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
        ...StyleSheet.absoluteFill,
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
        width: "100%"
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



//
//usar replace inves de push, suas diferenças 
//evita que o usuáriovolta à seleção de nível simplesmente pressionando o botão de voltar
