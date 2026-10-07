import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DrawerContentScrollView,
  DrawerItem,
  type DrawerContentComponentProps,
} from "expo-router/drawer";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function CalculintDrawerContent(
  props: DrawerContentComponentProps,
) {
  const [name, setName] = useState("");

  useEffect(() => {
    AsyncStorage.getItem("name").then((savedName) => {
      if (savedName) setName(savedName);
    });
  }, []);

  function abrirEmBreve(section: string) {
    props.navigation.navigate("em-breve", { section });
  }

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>
              {name.trim().charAt(0).toUpperCase() || "C"}
            </Text>
          </View>
          <View style={styles.profileText}>
            <Text style={styles.profileName} numberOfLines={1}>
              {name || "Sua conta"}
            </Text>
            <Text style={styles.profileCaption}>Calculint</Text>
          </View>
        </View>

        <View style={styles.menuItems}>
          <DrawerItem
            label="Página Inicial"
            icon={({ color }) => <Text style={[styles.icon, { color }]}>⌂</Text>}
            onPress={() => props.navigation.navigate("inicio")}
            activeTintColor="#D96E2A"
            inactiveTintColor="#43566A"
            activeBackgroundColor="#FFF1E8"
            labelStyle={styles.label}
          />
          <DrawerItem
            label="Histórico"
            icon={({ color }) => <Text style={[styles.icon, { color }]}>◷</Text>}
            onPress={() => abrirEmBreve("Histórico")}
            inactiveTintColor="#43566A"
            labelStyle={styles.label}
          />
          <View style={styles.divider} />
          <DrawerItem
            label="Editar perfil"
            icon={({ color }) => <Text style={[styles.icon, { color }]}>✎</Text>}
            onPress={() => abrirEmBreve("Editar perfil")}
            inactiveTintColor="#43566A"
            labelStyle={styles.label}
          />
          <DrawerItem
            label="Acessibilidade"
            icon={({ color }) => <Text style={[styles.icon, { color }]}>◉</Text>}
            onPress={() => abrirEmBreve("Acessibilidade")}
            inactiveTintColor="#43566A"
            labelStyle={styles.label}
          />
          <DrawerItem
            label="Configurações"
            icon={({ color }) => <Text style={[styles.icon, { color }]}>⚙</Text>}
            onPress={() => abrirEmBreve("Configurações")}
            inactiveTintColor="#43566A"
            labelStyle={styles.label}
          />
        </View>
      </DrawerContentScrollView>

      <View style={styles.footer}>
        <View style={styles.divider} />
        <DrawerItem
          label="Sair"
          icon={({ color }) => <Text style={[styles.icon, { color }]}>↪</Text>}
          onPress={() => props.navigation.navigate("logout")}
          inactiveTintColor="#43566A"
          labelStyle={styles.label}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContent: {
    paddingTop: 0,
  },
  profileHeader: {
    minHeight: 124,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#99D1D3",
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    marginRight: 14,
  },
  avatarLetter: {
    color: "#4D7884",
    fontSize: 23,
    fontWeight: "700",
  },
  profileText: {
    flex: 1,
  },
  profileName: {
    color: "#263F50",
    fontSize: 17,
    fontWeight: "600",
  },
  profileCaption: {
    color: "#446B76",
    fontSize: 12,
    marginTop: 4,
  },
  menuItems: {
    paddingTop: 18,
    paddingHorizontal: 8,
  },
  icon: {
    width: 24,
    textAlign: "center",
    fontSize: 21,
    fontWeight: "600",
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
  },
  divider: {
    height: 1,
    backgroundColor: "#DFE5E8",
    marginHorizontal: 18,
    marginVertical: 6,
  },
  footer: {
    borderTopColor: "#E7ECEF",
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingTop: 4,
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
});
