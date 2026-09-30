import { Stack } from 'expo-router/stack';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


import { Drawer } from 'expo-router/drawer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


const queryClient = new QueryClient();

export default function Layout() {
    return (
         <QueryClientProvider client={queryClient}>
        {/* <Stack>
            <Stack.Screen
                name='index'
                options={{ headerShown: false }}
            />
        </Stack > */}
        <GestureHandlerRootView style={{ flex: 1 }}>
            <Drawer
                screenOptions={{

                    headerStyle: {
                        backgroundColor: '#021123'
                    },
                    headerTintColor: '#FFF',
                    drawerStyle: {
                        backgroundColor: '#021123'
                    },
                    drawerLabelStyle: {
                        color: '#FFF'
                    }
                }}
            >
                <Drawer.Screen
                    name='tasks/index'
                    options={{
                        drawerLabel: 'Lista de tarefas',
                        title:''
                    }}
                />
            </Drawer>
        </GestureHandlerRootView>
        </QueryClientProvider>);
}
