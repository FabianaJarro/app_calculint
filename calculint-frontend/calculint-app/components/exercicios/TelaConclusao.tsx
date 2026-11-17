
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

interface Props {
  acertos: number;
  total: number;
  onVoltar: () => void;
}

export default function TelaConclusao({
  acertos,
  total,
  onVoltar,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.faixa} />

      <Text style={styles.etiqueta}>
        ATIVIDADE FINALIZADA
      </Text>

      <View style={styles.conteudo}>
        <Image
          source={require(
            "../../app/assets/basico/conclusao.png"
          )}
          style={styles.imagem}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>
          Atividade concluída!
        </Text>

        <Text style={styles.destaque}>
          Você concluiu essa atividade!
        </Text>

        <Text style={styles.descricao}>
          Continue praticando no seu ritmo.
        </Text>

        <Text style={styles.pontuacao}>
          Você acertou {acertos} de {total} questões.
        </Text>
      </View>

      <Pressable
        style={styles.botao}
        onPress={onVoltar}
        accessibilityRole="button"
      >
        <Text style={styles.textoBotao}>
          Voltar às operações
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  faixa: {
    height: 75,
    backgroundColor: "#41C7C4",
  },

  etiqueta: {
    color: "#009FA7",
    fontSize: 12,
    fontWeight: "700",
    marginHorizontal: 24,
    marginTop: 28,
  },

  conteudo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 16,
  },

  imagem: {
    width: 85,
    height: 85,
    marginBottom: 8,
  },

  titulo: {
    color: "#28474A",
    fontSize: 25,
    fontWeight: "700",
    textAlign: "center",
  },

  destaque: {
    color: "#009FA7",
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },

  descricao: {
    color: "#748A8D",
    fontSize: 15,
    textAlign: "center",
  },

  pontuacao: {
    color: "#748A8D",
    fontSize: 13,
    marginTop: 8,
    textAlign: "center",
  },

  botao: {
    backgroundColor: "#FF8915",
    marginHorizontal: 24,
    marginBottom: 30,
    minHeight: 54,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
