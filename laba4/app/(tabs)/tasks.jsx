import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

export default function TasksScreen() {
    const [score, setScore] = useState(0);
    const [stats, setStats] = useState({
        clicks: 0,
        doubleClicks: 0,
        longPresses: 0,
        dragged: false,
        swipeRight: false,
        swipeLeft: false,
        pinched: false,
    });

    useFocusEffect(
        React.useCallback(() => {
            async function loadData() {
                const savedScore = await AsyncStorage.getItem('game_score');
                const savedStats = await AsyncStorage.getItem('game_stats');
                if (savedScore !== null) setScore(parseInt(savedScore, 10));
                if (savedStats !== null) setStats(JSON.parse(savedStats));
            }
            loadData();
        }, [])
    );

    const tasksList = [
        { id: 1, title: 'Зробити 10 кліків', done: stats.clicks >= 10, current: `${Math.min(stats.clicks, 10)}/10` },
        { id: 2, title: 'Зробити подвійний клік 5 разів', done: stats.doubleClicks >= 5, current: `${Math.min(stats.doubleClicks, 5)}/5` },
        { id: 3, title: 'Утримувати обʼєкт 3 секунди', done: stats.longPresses >= 1, current: stats.longPresses >= 1 ? 'Виконано' : '0/1' },
        { id: 4, title: 'Перетягнути обʼєкт (Pan)', done: stats.dragged, current: stats.dragged ? 'Виконано' : 'В процесі' },
        { id: 5, title: 'Свайп вправо та вліво (Fling)', done: stats.swipeRight && stats.swipeLeft, current: `${(stats.swipeRight ? 1 : 0) + (stats.swipeLeft ? 1 : 0)}/2` },
        { id: 6, title: 'Змінити розмір обʼєкта (Pinch)', done: stats.pinched, current: stats.pinched ? 'Виконано' : 'В процесі' },
        { id: 7, title: 'Отримати 100 очок', done: score >= 100, current: `${Math.min(score, 100)}/100` },
        { id: 8, title: '★ Власне завдання: Масштабування + Утримання', done: stats.pinched && stats.longPresses >= 1, current: (stats.pinched && stats.longPresses >= 1) ? 'Виконано' : 'В процесі' },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.header}>Список завдань</Text>
            {tasksList.map((task) => (
                <View key={task.id} style={[styles.taskCard, task.done && styles.taskDone]}>
                    <Ionicons
                        name={task.done ? 'checkmark-circle' : 'ellipse-outline'}
                        size={28}
                        color={task.done ? '#10B981' : '#9CA3AF'}
                    />
                    <View style={styles.taskInfo}>
                        <Text style={[styles.taskTitle, task.done && styles.textDone]}>{task.title}</Text>
                        <Text style={styles.taskProgress}>{task.current}</Text>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#F3F4F6', flexGrow: 1 },
    header: { fontSize: 22, fontWeight: 'bold', color: '#1F2937', marginBottom: 15 },
    taskCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
        elevation: 2,
    },
    taskDone: { backgroundColor: '#ECFDF5' },
    taskInfo: { marginLeft: 12, flex: 1 },
    taskTitle: { fontSize: 15, fontWeight: '600', color: '#374151' },
    textDone: { color: '#065F46', textDecorationLine: 'line-through' },
    taskProgress: { fontSize: 13, color: '#6B7280', marginTop: 2 },
});