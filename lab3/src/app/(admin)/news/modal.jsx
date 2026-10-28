import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { INITIAL_NEWS, INITIAL_LOGS } from '@/data/mockData';

export default function CreateNewsModal() {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Академічна');
    const [content, setContent] = useState('');

    const handleSave = () => {
        if (!title.trim() || !content.trim()) {
            Alert.alert('Помилка', 'Заповніть усі обов’язкові поля');
            return;
        }

        const newId = String(INITIAL_NEWS.length + 1);
        INITIAL_NEWS.unshift({
            id: newId,
            title,
            category,
            status: 'Чернетка',
            imageUrl: 'https://picsum.photos/400/200?random=' + newId,
            content,
            createdAt: new Date().toLocaleDateString('uk-UA'),
        });

      
        INITIAL_LOGS.unshift({
            id: String(Date.now()),
            event: 'Створення новини',
            details: `Створено новину "${title}"`,
            timestamp: new Date().toLocaleString('uk-UA'),
        });

        Alert.alert('Успішно', 'Новину додано');
        router.back();
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.heading}>Нова новина</Text>

            <Text style={styles.label}>Заголовок:</Text>
            <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Введіть заголовок" />

            <Text style={styles.label}>Категорія:</Text>
            <TextInput style={styles.input} value={category} onChangeText={setCategory} placeholder="Категорія" />

            <Text style={styles.label}>Текст новини:</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={content}
                onChangeText={setContent}
                placeholder="Зміст новини"
                multiline
            />

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                <Text style={styles.saveBtnText}>Зберегти новину</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={() => router.back()}>
                <Text style={styles.cancelBtnText}>Скасувати</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    content: { padding: 20 },
    heading: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    label: { fontSize: 14, color: '#475569', marginBottom: 6, fontWeight: '600' },
    input: { borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 12, marginBottom: 16, backgroundColor: '#F8FAFC' },
    textArea: { height: 100, textAlignVertical: 'top' },
    saveBtn: { backgroundColor: '#10B981', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
    saveBtnText: { color: '#FFF', fontWeight: 'bold' },
    cancelBtn: { padding: 12, alignItems: 'center' },
    cancelBtnText: { color: '#EF4444', fontWeight: '600' },
});