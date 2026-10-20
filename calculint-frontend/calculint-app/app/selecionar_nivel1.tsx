
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


type Nivel = {
  id: "basico" | "intermediario" | "avancado";
  numero: string;
  titulo: string;
  descricao: string;
  detalhe: string;
  cor: string;
};

const NIVEIS: Nivel[] = [
  {
    id: "basico",
    numero: "01",
    titulo: "Básico",
    descricao: "Operações básicas e quantidades",
    detalhe: "Comece pelo essencial",
    cor: "#83D3D3",
  },
  {
    id: "intermediario",
    numero: "02",
    titulo: "Intermediário",
    descricao: "Situações reais, troco e horário",
    detalhe: "Pratique no dia a dia",
    cor: "#59B0B9",
  },
  {
    id: "avancado",
    numero: "03",
    titulo: "Avançado",
    descricao: "Situações completas e finanças",
    detalhe: "Desafie seus conhecimentos",
    cor: "#F06413",
  },
];

export default function SelecionarNivel() {
  const router = useRouter();
  const { width } = useWindowDimensions();

  const animacoes = useRef(
    NIVEIS.map(() => ({
      opacity: new Animated.Value(0),
      translateX: new Animated.Value(-45),
    }))
  ).current;

  useFocusEffect(
    useCallback(() => {
      animacoes.forEach((animacao) => {
        animacao.opacity.setValue(0);
        animacao.translateX.setValue(-45);
      });

      const entradas = animacoes.map((animacao) =>
        Animated.parallel([
          Animated.timing(animacao.opacity, {
            toValue: 1,
            duration: 420,
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

      const sequencia = Animated.stagger(160, entradas);
      sequencia.start();

      return () => sequencia.stop();
    }, [animacoes])
  );

  function selecionarNivel(nivel: Nivel["id"]) {
    router.push(`/basico`);
  }

  // Evita que o conteúdo fique exageradamente largo
  // em monitores grandes, mantendo a adaptação mobile.
  const paddingHorizontal = width > 700 ? 20 : 20;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={[
        styles.conteudo,
        { paddingHorizontal },
      ]}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.introducao}>
        <Text style={styles.saudacao}>Olá, gabs!</Text>

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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  conteudo: {
    flexGrow: 1,
    paddingTop: 24,
    paddingBottom: 35,
  },

  introducao: {
    marginBottom: 23,
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

  lista: {
    width: "100%",
    gap: 14,
  },

  animacaoCartao: {
    width: "100%",
  },

  cartao: {
    minHeight: 112,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 17,
    backgroundColor: "#F4F9F9",
    borderWidth: 1,
    borderColor: "#D0EBEC",
    borderRadius: 16,
    cursor: "pointer",
  } as any,

  numero: {
    width: 41,
    height: 41,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  numeroTexto: {
    fontSize: 12,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  textos: {
    flex: 1,
    justifyContent: "center",
  },

  nomeNivel: {
    fontSize: 17,
    fontWeight: "700",
    color: "#294B63",
    marginBottom: 3,
  },

  descricao: {
    fontSize: 12,
    color: "#355A76",
    marginBottom: 4,
  },

  detalhe: {
    fontSize: 10,
    color: "#7790A3",
  },

  seta: {
    fontSize: 27,
    color: "#6289A5",
    marginLeft: 12,
    marginRight: 1,
    fontWeight: "300",
  },

  cartaoPressionado: {
    opacity: 0.8,
  },

  cartaoHover: {
    borderColor: "#8CCFD0",
    backgroundColor: "#EDF7F7",
  },


  cartaoAnimado: {
    height: 96,
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

});
