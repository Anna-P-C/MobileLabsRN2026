import React from 'react';
import { View, Text, SectionList, StyleSheet } from 'react-native';

const FAQ_DATA = [
    {
        title: 'Навігація та маршрутизація',
        data: [
            { q: 'Як працює бічне меню (Drawer)?', a: 'Бічне меню базується на компоненті Drawer з @react-navigation/drawer та відкривається свайпом або кнопкою меню в шапці.' },
            { q: 'Чому заголовок стека новин вимкнено?', a: 'Щоб запобігти дублюванню верхньої навігаційної панелі екрана.' },
        ],
    },
    {
        title: 'Оптимізація та рендеринг',
        data: [
            { q: 'Що дає застосування React.memo?', a: 'Запобігає повторному рендерингу незмінних карток новин при оновленні списку.' },
            { q: 'Для чого потрібна властивість getItemLayout?', a: 'Вона заздалегідь обчислює координати кожного елемента, позбавляючи пристрій необхідності динамічно вимірювати їхні розміри.' },
        ],
    },
    {
        title: 'Безпека та доступ',
        data: [
            { q: 'Як захищено групу Drawer від гостей?', a: 'Через редирект Redirect на сторінку /login у випадку, коли isAuthenticated має значення false.' },
        ],
    },
];

export default function FaqScreen() {
    return (
        <View style={styles.container}>
            <SectionList
                sections={FAQ_DATA}
                keyExtractor={(item, index) => item.q + index}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.header}>
                        <Text style={styles.headerText}>{title}</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.question}>{item.q}</Text>
                        <Text style={styles.answer}>{item.a}</Text>
                    </View>
                )}
                contentContainerStyle={styles.listContent}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    listContent: {
        paddingBottom: 20,
    },
    header: {
        backgroundColor: '#e2e8f0',
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    headerText: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1e293b',
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 16,
        marginHorizontal: 12,
        marginVertical: 6,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    question: {
        fontSize: 15,
        fontWeight: '600',
        color: '#0f172a',
        marginBottom: 4,
    },
    answer: {
        fontSize: 14,
        color: '#475569',
        lineHeight: 20,
    },
});