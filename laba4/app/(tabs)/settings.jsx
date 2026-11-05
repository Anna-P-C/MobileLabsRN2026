import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen() {
    const handleReset = async () => {
        try {
            await AsyncStorage.removeItem('game_score');
            await AsyncStorage.removeItem('game_stats');
            Alert.alert('Успіх', 'Весь прогрес успішно скинуто!');
        } catch (e) {
            Alert.alert('Помилка', 'Не вдалося скинути прогрес');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Параметри додатку</Text>

            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Text style={styles.resetButtonText}>Скинути весь прогрес</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3F4F6',
        padding: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 20,
    },
    resetButton: {
        backgroundColor: '#EF4444',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        elevation: 2,
    },
    resetButtonText: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});