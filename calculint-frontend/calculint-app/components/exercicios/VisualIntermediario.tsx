
import {
  View,
  Text,
  Image,
  StyleSheet,
} from "react-native";

import { formatarMoeda } from "./VisualCotidiano";

interface Props {
  tipo: string | null;
  numero1: number;
  numero2: number;
  simbolo: string;
}

export function formatarDecimal(valor: number) {
  return (valor / 10)
    .toFixed(1)
    .replace(".", ",");
}

export default function VisualIntermediario({
  tipo,
  numero1,
  numero2,
  simbolo,
}: Props) {
  const dinheiro = tipo === "DINHEIRO_DECIMAL";

  const a = dinheiro
    ? formatarMoeda(numero1)
    : formatarDecimal(numero1);

  const b = dinheiro
    ? formatarMoeda(numero2)
    : formatarDecimal(numero2);

  const ehSubtracao = simbolo === "-";

  return (
    <View style={styles.container}>
      <View style={styles.conta}>
        {ehSubtracao ? (
          <View style={styles.contaVertical}>
            <Text style={styles.numero}>{a}</Text>

            <Text style={styles.numero}>
              − {b}
            </Text>

            <View style={styles.linhaResultado} />
          </View>
        ) : (
          <Text style={styles.numero}>
            {a} + {b}
          </Text>
        )}
      </View>

      {dinheiro && !ehSubtracao && (
        <View style={styles.imagens}>
          <View style={styles.objeto}>
            <Image
              source={require(
                "../../app/assets/intermediario/caderno.png"
              )}
              style={styles.imagem}
              resizeMode="contain"
            />
            <Text style={styles.valorObjeto}>
              {a}
            </Text>
          </View>

          <View style={styles.objeto}>
            <Image
              source={require(
                "../../app/assets/intermediario/caneta.png"
              )}
              style={styles.imagem}
              resizeMode="contain"
            />
            <Text style={styles.valorObjeto}>
              {b}
            </Text>
          </View>
        </View>
      )}

      <Text style={styles.dica}>
        {dinheiro
          ? "Observe os valores em reais e centavos."
          : "Alinhe as vírgulas e calcule cada parte."}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginVertical: 24,
    gap: 20,
  },

  conta: {
    backgroundColor: "#ECF9F7",
    borderRadius: 12,
    width: "100%",
    minHeight: 110,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  contaVertical: {
    alignItems: "flex-end",
    gap: 8,
  },

  numero: {
    fontSize: 24,
    fontWeight: "700",
    color: "#294C55",
    textAlign: "center",
  },

  linhaResultado: {
    height: 2,
    backgroundColor: "#41C7C4",
    width: "100%",
  },

  imagens: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-start",
  },

  objeto: {
    alignItems: "center",
    flex: 1,
    gap: 8,
  },

  imagem: {
    width: 105,
    height: 130,
  },

  valorObjeto: {
    fontSize: 15,
    fontWeight: "700",
    color: "#294C55",
  },

  dica: {
    fontSize: 13,
    color: "#718B90",
    textAlign: "center",
  },
});
