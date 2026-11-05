import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerStyle: { backgroundColor: '#4F46E5' },
                headerTintColor: '#fff',
                tabBarActiveTintColor: '#4F46E5',
                tabBarInactiveTintColor: '#6B7280',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Клікер',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="game-controller" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="tasks"
                options={{
                    title: 'Завдання',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="checkbox" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Налаштування',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="settings" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}