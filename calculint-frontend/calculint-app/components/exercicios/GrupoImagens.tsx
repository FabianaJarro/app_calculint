
import {
  View,
  Image,
  type ImageSourcePropType,
} from "react-native";

type Props = {
  imagem: ImageSourcePropType;
  quantidade: number;
};

export default function GrupoImagens({
  imagem,
  quantidade,
}: Props) {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        maxWidth: 170,
        gap: 3,
      }}
    >
      {Array.from({ length: quantidade }, (_, index) => (
        <Image
          key={index}
          source={imagem}
          style={{
            width: 34,
            height: 34,
          }}
          resizeMode="contain"
        />
      ))}
    </View>
  );
}
