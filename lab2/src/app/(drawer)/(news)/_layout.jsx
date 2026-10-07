import { Stack } from 'expo-router';

export default function NewsStackLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="[id]"
                options={{
                    title: 'Деталі новини',
                    headerBackTitle: 'Назад',
                    headerStyle: { backgroundColor: '#2563eb' },
                    headerTintColor: '#fff',
                }}
            />
        </Stack>
    );
}