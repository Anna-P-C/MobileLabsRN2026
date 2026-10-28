import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { INITIAL_NEWS } from '@/data/mockData';
export default function NewsDetailScreen() {
    const { id } = useLocalSearchParams();
    const newsItem = INITIAL_NEWS.find((item) => item.id === String(id));

    if (!newsItem) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Новину не знайдено</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Image source={{ uri: newsItem.imageUrl }} style={styles.image} />
            <View style={styles.card}>
                <Text style={styles.category}>{newsItem.category} • {newsItem.createdAt}</Text>
                <Text style={styles.title}>{newsItem.title}</Text>
                <Text style={styles.body}>{newsItem.content}</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    content: { padding: 16 },
    image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 16 },
    card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12 },
    category: { color: '#2563EB', fontWeight: 'bold', marginBottom: 8 },
    title: { fontSize: 20, fontWeight: 'bold', color: '#0F172A', marginBottom: 12 },
    body: { fontSize: 15, color: '#334155', lineHeight: 22 },
    errorText: { textAlign: 'center', marginTop: 40, fontSize: 16, color: '#EF4444' },
});