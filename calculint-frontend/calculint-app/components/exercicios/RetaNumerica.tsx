import {
  View,
  Text,
  ScrollView,
} from "react-native";


export default function RetaNumerica({
    inicio,
    passos,
    mostrarSolucao = false,
}: {
    inicio: number;
    passos: number;
    mostrarSolucao?: boolean;
}) {
    const chegada = inicio + passos;

    return (
        <View style={{ marginVertical: 25 }}>
            <Text
                style={{
                    textAlign: "center",
                    color: "#51848B",
                    marginBottom: 12,
                }}
            >
                Comece no {inicio} e avance {passos} casas →
            </Text>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <View
                    style={{
                        flexDirection: "row",
                        paddingVertical: 8,
                    }}
                >
                    <View
                        style={{
                            position: "absolute",
                            top: 46,
                            left: 18,
                            right: 18,
                            height: 2,
                            backgroundColor: "#A7BCC5",
                        }}
                    />

                    {Array.from(
                        { length: Math.max(11, chegada + 1) },
                        (_, numero) => (
                            <View
                                key={numero}
                                style={{
                                    width: 36,
                                    alignItems: "center",
                                }}
                            >
                                <Text
                                    style={{
                                        height: 23,
                                        color: "#EF7950",
                                        fontSize: 16,
                                    }}
                                >
                                    {mostrarSolucao &&
                                        numero > inicio &&
                                        numero <= chegada
                                        ? "↓"
                                        : " "}
                                </Text>

                                <View
                                    style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 15,
                                        borderWidth: 2,
                                        alignItems: "center",
                                        justifyContent: "center",

                                        borderColor:
                                            numero === inicio
                                                ? "#EF7950"
                                                : mostrarSolucao &&
                                                    numero === chegada
                                                    ? "#21A6A4"
                                                    : "#A7BCC5",

                                        backgroundColor:
                                            numero === inicio
                                                ? "#FFE5CE"
                                                : mostrarSolucao &&
                                                    numero === chegada
                                                    ? "#D1F1EA"
                                                    : "#FFFFFF",
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 12,
                                            fontWeight: "600",
                                            color: "#334F61",
                                        }}
                                    >
                                        {numero}
                                    </Text>
                                </View>
                            </View>
                        )
                    )}
                </View>
            </ScrollView>

            {mostrarSolucao && (
                <Text
                    style={{
                        textAlign: "center",
                        color: "#21A6A4",
                        fontWeight: "700",
                        marginTop: 15,
                    }}
                >
                    {inicio} + {passos} = {chegada}
                </Text>
            )}
        </View>
    );
}
