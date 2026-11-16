
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from "react-native";

import GrupoImagens from "./GrupoImagens";
import RetaNumerica from "./RetaNumerica";
import ObjetosRetirados from "./ObjetosRetirados";

type Props = {
  operacao: string;
  modulo: string;
  onContinuar: () => void;
};

const imagemMaca = require(
  "../../app/assets/exercicios/maca.png"
);

export default function IntroducaoExercicio({
  operacao,
  modulo,
  onContinuar,
}: Props) {
  const isReta = modulo === "reta";
  const isSubtracao = operacao === "subtracao";

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
        {isSubtracao
          ? "Retirando objetos"
          : isReta
            ? "Reta numérica"
            : "Soma com objetos"}
      </Text>

      <Text style={styles.subtitulo}>
        {isSubtracao
          ? "O que é subtrair?"
          : isReta
            ? "Somando com saltos"
            : "Juntar quantidades"}
      </Text>

      <Text style={styles.descricao}>
        {isSubtracao
          ? "Subtrair é retirar uma parte de um grupo. Risque o que saiu e conte o que sobrou."
          : isReta
            ? "Na reta numérica, podemos somar avançando casas para a direita. Começamos em um número e damos a quantidade de saltos indicada."
            : "Somar significa juntar grupos. Conte os objetos de cada grupo e depois conte todos juntos."}
      </Text>

      {isSubtracao ? (
        <ObjetosRetirados
          imagem={imagemMaca}
          total={5}
          retirar={2}
        />
      ) : isReta ? (
        <RetaNumerica
          inicio={2}
          passos={3}
          mostrarSolucao={true}
        />
      ) : (
        <View style={styles.grupos}>
          <GrupoImagens
            imagem={imagemMaca}
            quantidade={2}
          />

          <Text style={styles.sinal}>+</Text>

          <GrupoImagens
            imagem={imagemMaca}
            quantidade={3}
          />
        </View>
      )}

      <Text style={styles.etiqueta}>
        VEJA COMO FAZER
      </Text>

      <Text style={styles.descricao}>
        {isSubtracao
          ? "Temos 5 maçãs. Retiramos 2. Restam 3 maçãs. Então, 5 − 2 = 3."
          : isReta
            ? "Começamos no número 2. Para somar 3, avançamos três casas e chegamos ao 5. Portanto, 2 + 3 = 5."
            : "Aqui temos 2 maçãs e mais 3 maçãs. Juntando tudo, temos 5 maçãs: 2 + 3 = 5."}
      </Text>

      <Pressable
        style={styles.botao}
        onPress={onContinuar}
        accessibilityRole="button"
      >
        <Text style={styles.textoBotao}>
          Próximo
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

  faixa: {
    height: 75,
    backgroundColor: "#37C7C5",
    marginHorizontal: -24,
    marginBottom: 25,
  },

  etiqueta: {
    color: "#008DA3",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 12,
  },

  titulo: {
    fontSize: 25,
    color: "#252B2E",
    fontWeight: "700",
    marginBottom: 25,
  },

  subtitulo: {
    fontSize: 17,
    color: "#252B2E",
    fontWeight: "700",
    marginBottom: 12,
  },

  descricao: {
    fontSize: 15,
    lineHeight: 24,
    color: "#444444",
    marginBottom: 24,
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

  botao: {
    backgroundColor: "#FF8915",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },

  textoBotao: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});
