import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs
      screenOptions= {{
        headerShown: false,
            tabBarActiveTintColor: '#1B3B6F',
                tabBarInactiveTintColor: '#8E8E93',
                    tabBarStyle: {
            height: 60,
                paddingBottom: 8,
                    paddingTop: 6,
        },
    }
}
    >
    <Tabs.Screen
        name="index"
options = {{
    title: 'Головна',
        tabBarIcon: ({ color, size }) => (
            <Ionicons name= "home" size = { size } color = { color } />
          ),
}}
      />
    < Tabs.Screen
name = "gallery"
options = {{
    title: 'Галерея',
        tabBarIcon: ({ color, size }) => (
            <Ionicons name= "images" size = { size } color = { color } />
          ),
}}
      />
    < Tabs.Screen
name = "profile"
options = {{
    title: 'Профіль',
        tabBarIcon: ({ color, size }) => (
            <Ionicons name= "person" size = { size } color = { color } />
          ),
}}
      />
    </Tabs>
  );
}