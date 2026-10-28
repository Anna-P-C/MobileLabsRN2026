import React, { useState } from 'react';
import { View, Text, VirtualizedList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { INITIAL_USERS, INITIAL_LOGS } from '@/data/mockData';
const ITEM_HEIGHT = 80;

export default function UsersScreen() {
    const [users, setUsers] = useState(INITIAL_USERS);

    const getItem = (data, index) => data[index];
    const getItemCount = (data) => data.length;
    const getItemLayout = (_, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    });

   
    const toggleUserStatus = (id, currentStatus, name) => {
        const newStatus = currentStatus === 'Активний' ? 'Заблокований' : 'Активний';

        setUsers((prev) =>
            prev.map((user) => (user.id === id ? { ...user, status: newStatus } : user))
        );

      
        INITIAL_LOGS.unshift({
            id: String(Date.now()),
            event: 'Зміна статусу користувача',
            details: `Статус користувача ${name} змінено на "${newStatus}"`,
            timestamp: new Date().toLocaleString('uk-UA'),
        });

        Alert.alert('Статус оновлено', `${name} тепер: ${newStatus}`);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.userEmail}>{item.email} • {item.role}</Text>
            </View>

            <TouchableOpacity
                style={[
                    styles.statusBtn,
                    item.status === 'Активний' ? styles.activeBtn : styles.blockedBtn,
                ]}
                onPress={() => toggleUserStatus(item.id, item.status, item.name)}
            >
                <Text style={styles.statusBtnText}>{item.status}</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <VirtualizedList
                data={users}
                initialNumToRender={10}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                getItemLayout={getItemLayout}
                contentContainerStyle={{ padding: 16 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    card: {
        height: 70,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 1,
    },
    userInfo: { flex: 1 },
    userName: { fontSize: 15, fontWeight: 'bold', color: '#0F172A' },
    userEmail: { fontSize: 12, color: '#64748B', marginTop: 2 },
    statusBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 6 },
    activeBtn: { backgroundColor: '#D1FAE5' },
    blockedBtn: { backgroundColor: '#FEE2E2' },
    statusBtnText: { fontSize: 12, fontWeight: 'bold', color: '#0F172A' },
});