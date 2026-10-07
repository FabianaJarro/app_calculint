import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const niveis = [
  {
    id: "basico",
    numero: "01",
    nome: "Básico",
    descricao: "Operações básicas e quantidades",
    detalhe: "Comece pelo essencial",
    cor: "#99D1D3",
  },
  {
    id: "intermediario",
    numero: "02",
    nome: "Intermediário",
    descricao: "Situações reais, troco e horário",
    detalhe: "Pratique no dia a dia",
    cor: "#6EAAB4",
  },
  {
    id: "avancado",
    numero: "03",
    nome: "Avançado",
    descricao: "Situações completas e finanças",
    detalhe: "Desafie seus conhecimentos",
    cor: "#D96E2A",
  },
];

export default function Inicio() {
  const router = useRouter();
  const [name, setName] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("name").then((nomeSalvo) => {
      if (nomeSalvo) setName(nomeSalvo);
    });
  }, []);

  function escolherNivel(nivel: string) {
    router.push({ pathname: "/operacoes", params: { nivel } });
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.conteudo}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.saudacao}>
        Olá{name ? `, ${name}` : ""}!
      </Text>
      <Text style={styles.titulo}>Escolha um nível</Text>
      <Text style={styles.subtitulo}>
        No seu ritmo, um passo de cada vez.
      </Text>

      <View style={styles.listaNiveis}>
        {niveis.map((nivel) => (
          <Pressable
            key={nivel.id}
            accessibilityRole="button"
            accessibilityLabel={`${nivel.nome}: ${nivel.descricao}`}
            onPress={() => escolherNivel(nivel.id)}
            style={({ pressed }) => [
              styles.cartaoNivel,
              pressed && styles.cartaoPressionado,
            ]}
          >
            <View style={[styles.numeroNivel, { backgroundColor: nivel.cor }]}>
              <Text style={styles.textoNumero}>{nivel.numero}</Text>
            </View>
            <View style={styles.textosNivel}>
              <Text style={styles.nomeNivel}>{nivel.nome}</Text>
              <Text style={styles.descricaoNivel}>{nivel.descricao}</Text>
              <Text style={styles.detalheNivel}>{nivel.detalhe}</Text>
            </View>
            <Text style={styles.seta}>›</Text>
          </Pressable>
        ))}
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
    paddingHorizontal: 24,
    paddingTop: 28,
    paddingBottom: 36,
  },
  saudacao: {
    color: "#6B7E8B",
    fontSize: 15,
    marginBottom: 8,
  },
  titulo: {
    color: "#638298",
    fontSize: 30,
    lineHeight: 36,
    fontWeight: "700",
  },
  subtitulo: {
    color: "#6B7E8B",
    fontSize: 15,
    marginTop: 8,
    marginBottom: 28,
  },
  listaNiveis: {
    gap: 16,
  },
  cartaoNivel: {
    minHeight: 130,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5FAFA",
    borderColor: "#D6E9EA",
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  cartaoPressionado: {
    opacity: 0.78,
    transform: [{ scale: 0.99 }],
  },
  numeroNivel: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  textoNumero: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  textosNivel: {
    flex: 1,
  },
  nomeNivel: {
    color: "#334F61",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  descricaoNivel: {
    color: "#4C5C66",
    fontSize: 14,
    lineHeight: 19,
  },
  detalheNivel: {
    color: "#7C8790",
    fontSize: 12,
    marginTop: 5,
  },
  seta: {
    color: "#638298",
    fontSize: 30,
    marginLeft: 8,
    marginRight: 2,
  },
});
