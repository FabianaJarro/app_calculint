

import {
  View,
  Text,
  Image,
  StyleSheet,
  type ImageSourcePropType,
} from "react-native";

interface Props {
  modulo: string;
  numero1: number;
  numero2: number;
}

// Todos os valores monetários são recebidos em centavos.
export function formatarMoeda(centavos: number) {
  return (centavos / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

// Imagens exportadas do Figma
const NOTAS: Record<number, ImageSourcePropType> = {
  500: require("../../app/assets/cotidiano/nota-5.png"),
  1000: require("../../app/assets/cotidiano/nota-10.png"),
  2000: require("../../app/assets/cotidiano/nota-20.png"),
};

const MOEDAS: Record<number, ImageSourcePropType> = {
  25: require("../../app/assets/cotidiano/moeda-025.png"),
  50: require("../../app/assets/cotidiano/moeda-050.png"),
  100: require("../../app/assets/cotidiano/moeda-1.png"),
};

function ImagemDinheiro({
  valor,
  tipo,
}: {
  valor: number;
  tipo: "nota" | "moeda";
}) {
  const imagem =
    tipo === "nota" ? NOTAS[valor] : MOEDAS[valor];

  // Caso o valor sorteado não tenha imagem exportada,
  // mostra um cartão com o valor correto.
  if (!imagem) {
    return (
      <View style={styles.valorSemImagem}>
        <Text style={styles.textoValor}>
          {formatarMoeda(valor)}
        </Text>
      </View>
    );
  }

  return (
    <Image
      source={imagem}
      style={
        tipo === "nota"
          ? styles.imagemNota
          : styles.imagemMoeda
      }
      resizeMode="contain"
    />
  );
}

function CartaoValor({
  titulo,
  valor,
}: {
  titulo: string;
  valor: number;
}) {
  return (
    <View style={styles.cartao}>
      <Text style={styles.rotulo}>{titulo}</Text>

      <Text style={styles.numero}>
        {formatarMoeda(valor)}
      </Text>
    </View>
  );
}

export default function VisualCotidiano({
  modulo,
  numero1,
  numero2,
}: Props) {

  // 1. DINHEIRO: JUNTAR CÉDULAS E MOEDAS
  if (modulo === "dinheiro") {
    return (
      <View style={styles.container}>
        <Text style={styles.etiqueta}>
          Junte os valores
        </Text>

        <View style={styles.linha}>
          <ImagemDinheiro
            valor={numero1}
            tipo="nota"
          />

          <Text style={styles.sinal}>+</Text>

          <ImagemDinheiro
            valor={numero2}
            tipo="moeda"
          />
        </View>

        <Text style={styles.instrucao}>
          Some primeiro os reais e depois os centavos.
        </Text>
      </View>
    );
  }

  // 2. DINHEIRO E TROCO
  if (modulo === "troco") {
    return (
      <View style={styles.container}>
        <Text style={styles.etiqueta}>
          Observe o dinheiro e responda
        </Text>

        <View style={styles.linha}>
          <View style={styles.grupo}>
            <Text style={styles.rotulo}>VALOR PAGO</Text>

            <ImagemDinheiro
              valor={numero1}
              tipo="nota"
            />
          </View>

          <View style={styles.grupo}>
            <Text style={styles.rotulo}>PREÇO</Text>

            <CartaoValor
              titulo="COMPRA"
              valor={numero2}
            />
          </View>
        </View>

        <Text style={styles.instrucao}>
          Subtraia o preço do valor pago.
        </Text>
      </View>
    );
  }

  // 3. MEDIDAS
  if (modulo === "medidas") {
    return (
      <View style={styles.container}>
        <Text style={styles.etiqueta}>
          Observe as quantidades
        </Text>

        <View style={styles.linha}>
          <View style={styles.cartaoMedida}>
            <Text style={styles.numero}>
              {numero2}
            </Text>
            <Text style={styles.rotulo}>
              RECIPIENTES
            </Text>
          </View>

          <Text style={styles.sinal}>×</Text>

          <View style={styles.cartaoMedida}>
            <Text style={styles.numero}>
              {numero1} mL
            </Text>
            <Text style={styles.rotulo}>
              CADA UM
            </Text>
          </View>
        </View>

        <Text style={styles.instrucao}>
          Multiplique a quantidade de recipientes
          pela capacidade de cada um.
        </Text>
      </View>
    );
  }

  // 4. COMPRAS E TROCO
  if (modulo === "compras") {
    return (
      <View style={styles.container}>
        <Text style={styles.etiqueta}>
          Observe os valores da compra
        </Text>

        <View style={styles.linhaCompras}>
          <Text style={styles.rotuloCompras}>
            Preço da compra
          </Text>

          <Text style={styles.valorCompras}>
            {formatarMoeda(numero2)}
          </Text>
        </View>

        <View style={styles.linhaCompras}>
          <Text style={styles.rotuloCompras}>
            Valor pago
          </Text>

          <Text style={styles.valorCompras}>
            {formatarMoeda(numero1)}
          </Text>
        </View>

        <View style={styles.dinheiroCompras}>
          <ImagemDinheiro
            valor={numero1}
            tipo="nota"
          />
        </View>

        <Text style={styles.instrucao}>
          Encontre a diferença entre o valor pago
          e o preço.
        </Text>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginVertical: 25,
    gap: 17,
  },

  etiqueta: {
    fontSize: 13,
    color: "#70868C",
    textAlign: "center",
  },

  linha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    gap: 10,
  },

  grupo: {
    flex: 1,
    alignItems: "center",
    gap: 10,
    minWidth: 0,
  },

  imagemNota: {
    width: 125,
    height: 80,
  },

  imagemMoeda: {
    width: 65,
    height: 65,
  },

  valorSemImagem: {
    minWidth: 105,
    minHeight: 65,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#A9C9C9",
    backgroundColor: "#F8FBFB",
    alignItems: "center",
    justifyContent: "center",
    padding: 9,
  },

  textoValor: {
    color: "#367B86",
    fontSize: 16,
    fontWeight: "700",
  },

  sinal: {
    fontSize: 25,
    fontWeight: "700",
    color: "#EF7950",
  },

  rotulo: {
    fontSize: 11,
    color: "#70868C",
    textAlign: "center",
  },

  cartao: {
    borderWidth: 1,
    borderColor: "#C9DEDE",
    borderRadius: 8,
    backgroundColor: "#F8FBFB",
    minWidth: 100,
    padding: 12,
    alignItems: "center",
    gap: 6,
  },

  numero: {
    color: "#367B86",
    fontSize: 17,
    fontWeight: "700",
  },

  cartaoMedida: {
    flex: 1,
    maxWidth: 145,
    minHeight: 85,
    padding: 12,
    borderWidth: 1,
    borderColor: "#C9DEDE",
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  instrucao: {
    fontSize: 12,
    color: "#849395",
    textAlign: "center",
    lineHeight: 18,
  },

  linhaCompras: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E3E9E9",
  },

  rotuloCompras: {
    color: "#718A8E",
    fontSize: 13,
  },

  valorCompras: {
    color: "#367B86",
    fontSize: 15,
    fontWeight: "700",
  },

  dinheiroCompras: {
    marginTop: 10,
    alignItems: "center",
  },
});

