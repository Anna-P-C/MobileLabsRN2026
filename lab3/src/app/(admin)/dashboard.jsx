import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import { INITIAL_NEWS, INITIAL_USERS, INITIAL_LOGS } from '@/data/mockData';

export default function DashboardScreen() {
    const [stats, setStats] = useState({
        newsCount: 0,
        usersCount: 0,
        logsCount: 0,
    });

  
    useFocusEffect(
        useCallback(() => {
            setStats({
                newsCount: INITIAL_NEWS.length,
                usersCount: INITIAL_USERS.length,
                logsCount: INITIAL_LOGS.length,
            });
        }, [])
    );

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.headerTitle}>Загальна статистика порталу</Text>

            <View style={styles.cardGrid}>
                <View style={[styles.card, { borderLeftColor: '#2563EB' }]}>
                    <Text style={styles.cardLabel}>Усього новин</Text>
                    <Text style={styles.cardValue}>{stats.newsCount}</Text>
                </View>

                <View style={[styles.card, { borderLeftColor: '#10B981' }]}>
                    <Text style={styles.cardLabel}>Користувачів</Text>
                    <Text style={styles.cardValue}>{stats.usersCount}</Text>
                </View>

                <View style={[styles.card, { borderLeftColor: '#F59E0B' }]}>
                    <Text style={styles.cardLabel}>Записів у логах</Text>
                    <Text style={styles.cardValue}>{stats.logsCount}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
    },
    content: {
        padding: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#0F172A',
        marginBottom: 20,
    },
    cardGrid: {
        gap: 16,
    },
    card: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 12,
        borderLeftWidth: 5,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    cardLabel: {
        fontSize: 14,
        color: '#64748B',
        marginBottom: 6,
    },
    cardValue: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#0F172A',
    },
});