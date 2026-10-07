import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import CalculintDrawerContent from "../components/CalculintDrawerContent";

const queryClient = new QueryClient();

export default function Layout() {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          drawerContent={(props) => <CalculintDrawerContent {...props} />}
          screenOptions={{
            headerStyle: {
              backgroundColor: "#99D1D3",
            },
            headerTintColor: "#263F50",
            headerTitleStyle: {
              color: "#263F50",
              fontWeight: "700",
            },
            drawerStyle: {
              backgroundColor: "#FFFFFF",
            },
            drawerActiveTintColor: "#D96E2A",
            drawerInactiveTintColor: "#43566A",
            drawerActiveBackgroundColor: "#FFF1E8",
            drawerLabelStyle: {
              fontSize: 15,
              fontWeight: "500",
            },
          }}
        >
          <Drawer.Screen
            name="index"
            options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
          />
          <Drawer.Screen
            name="registre_se"
            options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
          />
          <Drawer.Screen
            name="login"
            options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
          />
          <Drawer.Screen
            name="cadastro"
            options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
          />
          <Drawer.Screen
            name="inicio"
            options={{ title: "Calculint", drawerLabel: "Página Inicial" }}
          />
          <Drawer.Screen
            name="operacoes"
            options={{
              title: "Operações",
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen
            name="em-breve"
            options={{
              title: "Calculint",
              drawerItemStyle: { display: "none" },
            }}
          />
          <Drawer.Screen
            name="logout"
            options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
          />
          <Drawer.Screen
            name="indexTeste"
            options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
          />
          <Drawer.Screen
            name="exercicio"
            options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
          />
          <Drawer.Screen
            name="progresso"
            options={{ headerShown: false, drawerItemStyle: { display: "none" } }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}
