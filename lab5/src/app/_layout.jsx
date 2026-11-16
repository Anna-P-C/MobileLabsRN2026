import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
    return (
        <SafeAreaProvider>
        <Stack
        screenOptions= {{
        headerStyle: { backgroundColor: '#2563EB' },
        headerTintColor: '#FFFFFF',
            headerTitleStyle: { fontWeight: 'bold' },
    }
}
      >
    <Stack.Screen
          name="index"
options = {{ title: 'Файловий менеджер' }}
        />
    < Stack.Screen
name = "editor"
options = {{ title: 'Редактор файлу' }}
        />
    </Stack>
    </SafeAreaProvider>
  );
}