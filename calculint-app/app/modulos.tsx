
import { useRouter } from "expo-router";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";

type Modulo = "objetos" | "reta";

const MODULOS: {
  id: Modulo;
  nome: string;
  descricao: string;
}[] = [
  {
    id: "objetos",
    nome: "Soma com objetos",
    descricao: "Junte quantidades usando imagens.",
  },
  {
    id: "reta",
    nome: "Reta numérica",
    descricao: "Aprenda a somar avançando casas.",
  },
];

export default function Modulos() {
  const router = useRouter();

  function abrirModulo(modulo: Modulo) {
    router.push({
      pathname: "/exercicio",
      params: {
        nivel: "BASICO",
        operacao: "adicao",
        modulo,
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Adição</Text>
      <Text style={styles.subtitulo}>
        Escolha o que deseja aprender.
      </Text>

      {MODULOS.map((modulo, index) => (
        <Pressable
          key={modulo.id}
          onPress={() => abrirModulo(modulo.id)}
          style={[
            styles.cartao,
            {
              backgroundColor:
                index === 0 ? "#F8F0A8" : "#D1EDBE",
            },
          ]}
        >
          <Text style={styles.nome}>{modulo.nome}</Text>
          <Text style={styles.descricao}>
            {modulo.descricao}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    padding: 26,
    paddingTop: 55,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#6085A0",
  },
  subtitulo: {
    fontSize: 15,
    color: "#6C8BA3",
    marginTop: 8,
    marginBottom: 30,
  },
  cartao: {
    borderRadius: 22,
    padding: 25,
    marginBottom: 18,
  },
  nome: {
    fontSize: 21,
    fontWeight: "700",
    color: "#334F61",
  },
  descricao: {
    fontSize: 14,
    color: "#334F61",
    marginTop: 8,
  },
});
