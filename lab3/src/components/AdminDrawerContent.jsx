import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useRouter, usePathname } from 'expo-router';

export default function AdminDrawerContent(props) {
    const router = useRouter();
    const pathname = usePathname();

    const menuItems = [
        { label: 'Дашборд', path: '/(admin)/dashboard', route: '/dashboard' },
        { label: 'Новини', path: '/(admin)/news', route: '/news' },
        { label: 'Користувачі', path: '/(admin)/users', route: '/users' },
        { label: 'Системні логи', path: '/(admin)/logs', route: '/logs' },
    ];

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={styles.container}>
            {/* Шапка профілю */}
            <View style={styles.header}>
                <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>A</Text>
                </View>
                <Text style={styles.name}>Адміністратор</Text>
                <Text style={styles.role}>admin@system.com</Text>
            </View>

            {/* Елементи меню */}
            <View style={styles.menuItems}>
                {menuItems.map((item) => {
                    const isActive = pathname.includes(item.route);
                    return (
                        <TouchableOpacity
                            key={item.path}
                            style={[styles.item, isActive && styles.activeItem]}
                            onPress={() => router.push(item.path)}
                        >
                            <Text style={[styles.itemText, isActive && styles.activeItemText]}>
                                {item.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Кнопка виходу */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => router.replace('/login')}
                >
                    <Text style={styles.logoutText}>Вийти</Text>
                </TouchableOpacity>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        backgroundColor: '#f8f9fa',
        borderBottomWidth: 1,
        borderBottomColor: '#e9ecef',
        alignItems: 'center',
    },
    avatarContainer: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatarText: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#212529',
    },
    role: {
        fontSize: 12,
        color: '#6c757d',
        marginTop: 2,
    },
    menuItems: {
        flex: 1,
        paddingTop: 15,
        paddingHorizontal: 10,
    },
    item: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        marginBottom: 4,
    },
    activeItem: {
        backgroundColor: '#e7f1ff',
    },
    itemText: {
        fontSize: 15,
        color: '#495057',
        fontWeight: '500',
    },
    activeItemText: {
        color: '#007AFF',
        fontWeight: '600',
    },
    footer: {
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: '#e9ecef',
    },
    logoutButton: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#fff5f5',
    },
    logoutText: {
        fontSize: 15,
        color: '#dc3545',
        fontWeight: '600',
        textAlign: 'center',
    },
});