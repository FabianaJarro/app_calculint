
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";

import {
    View,
    Text,
    ScrollView,
    Pressable,
    ActivityIndicator,
    StyleSheet,
} from "react-native";

import { useAuth } from "../contexts/auth";

type Nivel = "BASICO" | "INTERMEDIARIO" | "AVANCADO";

const niveis = [
    {
        id: "BASICO",
        nome: "Básico",
        cor: "#F8F0A8",
        borda: "#D9C765",
    },
    {
        id: "INTERMEDIARIO",
        nome: "Intermediário",
        cor: "#D1EDBE",
        borda: "#99C785",
    },
    {
        id: "AVANCADO",
        nome: "Avançado",
        cor: "#D5F0F5",
        borda: "#90C7D1",
    },
] as const;

export default function SelecionarNivel() {
    const router = useRouter();
    const { usuario, atualizarNivel } = useAuth();

    const [nivelSelecionado, setNivelSelecionado] =
        useState<Nivel>("BASICO");

    const [salvando, setSalvando] = useState(false);
    const [erro, setErro] = useState("");

    // Se já existe um nível salvo, deixa ele selecionado.
    useEffect(() => {
        const atual = usuario?.nivelAtual;

        if (
            atual === "BASICO" ||
            atual === "INTERMEDIARIO" ||
            atual === "AVANCADO"
        ) {
            setNivelSelecionado(atual);
        }
    }, [usuario?.nivelAtual]);

    async function continuar() {
        if (salvando) return;

        setSalvando(true);
        setErro("");

        try {
            // Salva no backend e atualiza o contexto.
            await atualizarNivel(nivelSelecionado);

            if (nivelSelecionado === "AVANCADO") {
                router.replace("/cotidiano");
            } else {
                router.replace({
                    pathname: "/operacoes",
                    params: {
                        nivel: nivelSelecionado,
                    },
                });
            }
        } catch (error) {
            console.error("Erro ao atualizar nível:", error);

            setErro(
                "Não foi possível salvar o nível. Tente novamente."
            );
        } finally {
            setSalvando(false);
        }
    }

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
        >
            <View style={styles.conteudo}>
                <View>
                    <Text style={styles.etiqueta}>
                        VAMOS COMEÇAR
                    </Text>

                    <Text style={styles.titulo}>
                        Escolha seu nível
                    </Text>

                    <Text style={styles.descricao}>
                        Selecione por qual nível quer começar.
                        Você pode mudar depois.
                    </Text>

                    <View style={styles.lista}>
                        {niveis.map((nivel) => {
                            const selecionado =
                                nivelSelecionado === nivel.id;

                            return (
                                <Pressable
                                    key={nivel.id}
                                    accessibilityRole="radio"
                                    accessibilityState={{
                                        checked: selecionado,
                                    }}
                                    onPress={() =>
                                        setNivelSelecionado(nivel.id)
                                    }
                                    style={[
                                        styles.cartao,
                                        {
                                            backgroundColor: nivel.cor,
                                            borderColor: nivel.borda,
                                            borderWidth: selecionado ? 2 : 1,
                                        },
                                    ]}
                                >
                                    <View
                                        style={[
                                            styles.circulo,
                                            {
                                                borderColor: nivel.borda,
                                            },
                                            selecionado &&
                                            styles.circuloSelecionado,
                                        ]}
                                    >
                                        {selecionado && (
                                            <Text style={styles.check}>
                                                ✓
                                            </Text>
                                        )}
                                    </View>

                                    <Text style={styles.nomeNivel}>
                                        {nivel.nome}
                                    </Text>
                                </Pressable>
                            );
                        })}
                    </View>
                </View>

                <View style={styles.rodape}>
                    {!!erro && (
                        <Text style={styles.erro}>
                            {erro}
                        </Text>
                    )}

                    <Pressable
                        accessibilityRole="button"
                        disabled={salvando}
                        onPress={continuar}
                        style={[
                            styles.botao,
                            salvando && styles.botaoDesabilitado,
                        ]}
                    >
                        {salvando ? (
                            <ActivityIndicator color="#FFFFFF" />
                        ) : (
                            <Text style={styles.textoBotao}>
                                Continuar
                            </Text>
                        )}
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },

    scroll: {
        flexGrow: 1,
        alignItems: "center",
    },

    conteudo: {
        flexGrow: 1,
        width: "100%",
        maxWidth: 420,
        paddingHorizontal: 24,
        paddingTop: 50,
        paddingBottom: 32,
        justifyContent: "space-between",
    },

    etiqueta: {
        fontSize: 12,
        fontWeight: "700",
        color: "#175D51",
        marginBottom: 16,
    },

    titulo: {
        fontSize: 28,
        fontWeight: "700",
        color: "#245D51",
        marginBottom: 16,
    },

    descricao: {
        fontSize: 15,
        lineHeight: 23,
        color: "#50747B",
    },

    lista: {
        marginTop: 32,
        gap: 14,
    },

    cartao: {
        width: "100%",
        minHeight: 85,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 18,
        gap: 18,
    },

    circulo: {
        width: 32,
        height: 32,
        borderRadius: 16,
        borderWidth: 1,
        backgroundColor: "rgba(255,255,255,0.3)",
        alignItems: "center",
        justifyContent: "center",
    },

    circuloSelecionado: {
        backgroundColor: "#245D51",
        borderColor: "#245D51",
    },

    check: {
        fontSize: 23,
        fontWeight: "700",
        color: "#FFFFFF",
    },

    nomeNivel: {
        color: "#245D51",
        fontSize: 19,
        fontWeight: "700",
    },

    rodape: {
        marginTop: 60,
    },

    botao: {
        backgroundColor: "#FF8915",
        minHeight: 52,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },

    botaoDesabilitado: {
        opacity: 0.6,
    },

    textoBotao: {
        color: "#FFFFFF",
        fontWeight: "700",
        fontSize: 16,
    },

    erro: {
        color: "#B13D3D",
        textAlign: "center",
        marginBottom: 12,
        fontSize: 13,
    },
});
