import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Drawer } from 'expo-router/drawer';
import { Redirect } from 'expo-router';
import { DrawerContentScrollView, DrawerItemList } from 'expo-router/drawer';
import { useAuth } from '../../context/auth';

function CustomDrawerContent(props) {
    const { logout } = useAuth();

    return (
        <DrawerContentScrollView contentContainerStyle={styles.drawerContainer} {...props}>
            <View style={styles.drawerHeader}>
                <Text style={styles.headerTitle}>Меню застосунку</Text>
            </View>

            <View style={styles.itemsWrapper}>
                <DrawerItemList {...props} />
            </View>

            <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
                <Text style={styles.logoutText}>Вийти</Text>
            </TouchableOpacity>
        </DrawerContentScrollView>
    );
}

export default function DrawerLayout() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Redirect href="/login" />;
    }

    return (
        <Drawer
            drawerContent={(props) => <CustomDrawerContent {...props} />}
            screenOptions={{
                headerStyle: { backgroundColor: '#2563eb' },
                headerTintColor: '#ffffff',
                headerTitleStyle: { fontWeight: 'bold' },
            }}
        >
            <Drawer.Screen
                name="(news)"
                options={{
                    drawerLabel: 'Стрічка новин',
                    title: 'Новини',
                }}
            />
            <Drawer.Screen
                name="faq"
                options={{
                    drawerLabel: 'Довідка (FAQ)',
                    title: 'Довідковий центр FAQ',
                }}
            />
        </Drawer>
    );
}

const styles = StyleSheet.create({
    drawerContainer: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 24,
    },
    drawerHeader: {
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#0f172a',
    },
    itemsWrapper: {
        flex: 1,
        paddingTop: 10,
    },
    logoutBtn: {
        marginHorizontal: 16,
        backgroundColor: '#ef4444',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    logoutText: {
        color: '#ffffff',
        fontWeight: '600',
        fontSize: 16,
    },
});