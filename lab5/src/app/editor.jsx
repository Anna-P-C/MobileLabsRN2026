import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
    Platform,
} from 'react-native';
import { File, Paths } from 'expo-file-system';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FileEditorScreen() {
    const { relPath, name } = useLocalSearchParams();
    const router = useRouter();

    const [content, setContent] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const decodedRelPath = relPath ? decodeURIComponent(String(relPath)) : '';

    useEffect(() => {
        const loadFileContent = async () => {
            try {
                if (decodedRelPath) {
                    const file = new File(Paths.document, decodedRelPath);
                    const text = await file.text();
                    setContent(text);
                }
            } catch (error) {
                console.error('Помилка читання файлу:', error);
                Alert.alert('Помилка', `Не вдалося зчитати файл: ${error.message}`);
            } finally {
                setIsLoading(false);
            }
        };

        loadFileContent();
    }, [decodedRelPath]);

    const handleSave = () => {
        try {
            if (decodedRelPath) {
                const file = new File(Paths.document, decodedRelPath);
                file.write(content);

                if (Platform.OS === 'web') {
                    window.alert('Файл успішно збережено!');
                    router.back();
                } else {
                    Alert.alert('Успіх', 'Зміни успішно збережено!', [
                        { text: 'ОК', onPress: () => router.back() },
                    ]);
                }
            }
        } catch (error) {
            console.error('Помилка збереження файлу:', error);
            Alert.alert('Помилка', 'Не вдалося зберегти зміни.');
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <Stack.Screen options={{ title: name ? String(name) : 'Редактор файлу' }} />

            <View style={styles.editorContainer}>
                <Text style={styles.label}>Вміст файлу:</Text>
                <TextInput
                    style={styles.textInput}
                    value={content}
                    onChangeText={setContent}
                    multiline
                    textAlignVertical="top"
                    placeholder={isLoading ? 'Завантаження...' : 'Введіть текст файлу...'}
                    editable={!isLoading}
                />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                    <Ionicons name="save-outline" size={20} color="#FFFFFF" />
                    <Text style={styles.saveButtonText}>Зберегти зміни</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
    },
    editorContainer: {
        flex: 1,
        padding: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
        marginBottom: 8,
    },
    textInput: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 14,
        fontSize: 16,
        color: '#111827',
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    footer: {
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
    },
    saveButton: {
        flexDirection: 'row',
        backgroundColor: '#10B981',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});