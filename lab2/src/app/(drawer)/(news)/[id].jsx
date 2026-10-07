import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function NewsDetailsScreen() {
    const { id, title, description } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.tag}>Новина ID: {id}</Text>
                <Text style={styles.title}>{title || `Заголовок новини #${id}`}</Text>
                <Text style={styles.body}>
                    {description || 'Повний текст публікації та розширений аналітичний огляд для обраної новини.'}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f1f5f9',
    },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    tag: {
        fontSize: 12,
        fontWeight: '700',
        color: '#2563eb',
        textTransform: 'uppercase',
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#0f172a',
        marginBottom: 12,
    },
    body: {
        fontSize: 15,
        lineHeight: 22,
        color: '#334155',
    },
});