
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";

type Props = {
  acertou: boolean;
  onContinuar: () => void;
  onTentarNovamente: () => void;
};

export default function TelaFeedback({
  acertou,
  onContinuar,
  onTentarNovamente,
}: Props) {
  return (
    <View style={styles.tela}>
      <View style={styles.faixa} />

      <View style={styles.conteudo}>
        <Image
          source={
            acertou
              ? require("../../app/assets/exercicios/feedback-acerto.png")
              : require("../../app/assets/exercicios/feedback-erro.png")
          }
          style={styles.imagem}
          resizeMode="contain"
        />

        <Text style={styles.titulo}>
          {acertou ? "Muito bem!" : "Quase lá!"}
        </Text>

        <Text style={styles.descricao}>
          {acertou
            ? "Você encontrou a resposta!\nContinue aprendendo\nno seu ritmo."
            : "Vamos tentar novamente!\nVocê pode fazer isso\nno seu ritmo."}
        </Text>
      </View>

      <Pressable
        style={styles.botao}
        onPress={
          acertou ? onContinuar : onTentarNovamente
        }
        accessibilityRole="button"
      >
        <Text style={styles.textoBotao}>
          {acertou ? "Continuar" : "Tentar novamente"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  faixa: {
    height: 85,
    backgroundColor: "#39C7C5",
  },

  conteudo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  imagem: {
    width: 165,
    height: 165,
    marginBottom: 26,
  },

  titulo: {
    fontSize: 30,
    fontWeight: "700",
    color: "#146451",
    textAlign: "center",
    marginBottom: 24,
  },

  descricao: {
    fontSize: 18,
    lineHeight: 29,
    color: "#455F66",
    textAlign: "center",
  },

  botao: {
    backgroundColor: "#FF8915",
    marginHorizontal: 28,
    marginBottom: 35,
    borderRadius: 12,
    paddingVertical: 17,
    alignItems: "center",
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
