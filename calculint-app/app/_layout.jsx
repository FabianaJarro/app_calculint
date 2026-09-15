import { Stack } from 'expo-router/stack';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Layout() {
    return (
         <QueryClientProvider client={queryClient}>
        <Stack>
            <Stack.Screen
                name='index'
                options={{ headerShown: false }}
            />
        </Stack >
        </QueryClientProvider>);
}
