import React, { useState } from 'react';
import { View, Text, VirtualizedList, StyleSheet, TouchableOpacity, Image, Modal, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { INITIAL_NEWS, INITIAL_LOGS } from '@/data/mockData';

const ITEM_HEIGHT = 110;
export default function NewsListScreen() {
    const router = useRouter();
    const [newsData, setNewsData] = useState(INITIAL_NEWS);
    const [filter, setFilter] = useState('Усі');
    const [filterModalVisible, setFilterModalVisible] = useState(false);

   
    const filteredNews = newsData.filter((item) => {
        if (filter === 'Усі') return true;
        return item.status === filter;
    });

    
    const getItem = (data, index) => data[index];
    const getItemCount = (data) => data.length;
    const getItemLayout = (_, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    });

   
    const handleDelete = (id, title) => {
        Alert.alert('Підтвердження', `Видалити новину "${title}"?`, [
            { text: 'Скасувати', style: 'cancel' },
            {
                text: 'Видалити',
                style: 'destructive',
                onPress: () => {
                    setNewsData((prev) => prev.filter((item) => item.id !== id));
                    INITIAL_LOGS.unshift({
                        id: String(Date.now()),
                        event: 'Видалення новини',
                        details: `Видалено новину ID ${id}`,
                        timestamp: new Date().toLocaleString('uk-UA'),
                    });
                },
            },
        ]);
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.category}>{item.category} • {item.createdAt}</Text>
                <Text style={[styles.badge, getStatusStyle(item.status)]}>{item.status}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => router.push(`/(admin)/news/${item.id}`)}
                >
                    <Text style={styles.btnText}>👁️</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleDelete(item.id, item.title)}
                >
                    <Text style={styles.btnText}>🗑️</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            
            <View style={styles.topBar}>
                <TouchableOpacity style={styles.createBtn} onPress={() => router.push('/(admin)/news/modal')}>
                    <Text style={styles.createBtnText}>+ Створити новину</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.filterBtn} onPress={() => setFilterModalVisible(true)}>
                    <Text style={styles.filterBtnText}>Фільтр: {filter}</Text>
                </TouchableOpacity>
            </View>

           
            <VirtualizedList
                data={filteredNews}
                initialNumToRender={10}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                getItemCount={getItemCount}
                getItem={getItem}
                getItemLayout={getItemLayout}
                contentContainerStyle={{ padding: 16 }}
            />

          
            <Modal visible={filterModalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Фільтрація новин за статусом</Text>
                        {['Усі', 'Опубліковано', 'Чернетка', 'На перевірці'].map((status) => (
                            <TouchableOpacity
                                key={status}
                                style={styles.filterOption}
                                onPress={() => {
                                    setFilter(status);
                                    setFilterModalVisible(false);
                                }}
                            >
                                <Text style={styles.filterOptionText}>{status}</Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity style={styles.closeBtn} onPress={() => setFilterModalVisible(false)}>
                            <Text style={styles.closeBtnText}>Закрити</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const getStatusStyle = (status) => {
    switch (status) {
        case 'Опубліковано': return { color: '#10B981', backgroundColor: '#D1FAE5' };
        case 'Чернетка': return { color: '#6B7280', backgroundColor: '#F3F4F6' };
        default: return { color: '#F59E0B', backgroundColor: '#FEF3C7' };
    }
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F8FAFC' },
    topBar: { flexDirection: 'row', padding: 12, gap: 10, backgroundColor: '#FFFFFF', borderBottomWidth: 1, borderColor: '#E2E8F0' },
    createBtn: { flex: 1, backgroundColor: '#2563EB', padding: 10, borderRadius: 8, alignItems: 'center' },
    createBtnText: { color: '#FFF', fontWeight: 'bold' },
    filterBtn: { backgroundColor: '#E2E8F0', padding: 10, borderRadius: 8, justifyContent: 'center' },
    filterBtnText: { color: '#1E293B', fontWeight: '600' },
    card: { height: 95, flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 8, marginBottom: 10, padding: 10, alignItems: 'center', elevation: 1 },
    image: { width: 70, height: 70, borderRadius: 6, marginRight: 10 },
    cardContent: { flex: 1 },
    title: { fontSize: 14, fontWeight: 'bold', color: '#0F172A' },
    category: { fontSize: 12, color: '#64748B', marginVertical: 4 },
    badge: { alignSelf: 'flex-start', fontSize: 10, fontWeight: 'bold', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },
    actions: { flexDirection: 'row', gap: 6 },
    actionBtn: { padding: 6 },
    btnText: { fontSize: 16 },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
    modalContent: { backgroundColor: '#FFF', padding: 20, borderTopLeftRadius: 16, borderTopRightRadius: 16 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
    filterOption: { paddingVertical: 12, borderBottomWidth: 1, borderColor: '#F1F5F9' },
    filterOptionText: { fontSize: 16, color: '#334155' },
    closeBtn: { marginTop: 15, backgroundColor: '#EF4444', padding: 12, borderRadius: 8, alignItems: 'center' },
    closeBtnText: { color: '#FFF', fontWeight: 'bold' },
});