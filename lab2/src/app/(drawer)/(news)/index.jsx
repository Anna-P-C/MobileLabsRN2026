import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';

const ITEM_HEIGHT = 88;

const NewsCard = React.memo(({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(item)}>
            <View style={styles.badge}>
                <Text style={styles.badgeText}>#{item.id}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.cardDesc} numberOfLines={2}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );
});

export default function NewsListScreen() {
    const router = useRouter();

    const initialItems = useMemo(() => {
        return Array.from({ length: 120 }, (_, index) => ({
            id: String(index + 1),
            title: `Новина №${index + 1}: Оновлення платформи Житомирської політехніки`,
            description: `Короткий зміст події та розширений опис інформаційного оновлення для студентів інженерії ПЗ під номером ${index + 1}.`,
        }));
    }, []);

    const [data, setData] = useState(initialItems);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setData(initialItems);
            setRefreshing(false);
        }, 1000);
    }, [initialItems]);

    const loadMore = useCallback(() => {
        if (loadingMore) return;
        setLoadingMore(true);

        setTimeout(() => {
            setData(prev => {
                const nextId = prev.length + 1;
                const newBatch = Array.from({ length: 20 }, (_, i) => ({
                    id: String(nextId + i),
                    title: `Новина №${nextId + i}: Додатковий випуск інформаційного бюлетеня`,
                    description: `Підвантажена порція новин у режимі Infinite Scroll для перевірки динамічного списку.`,
                }));
                return [...prev, ...newBatch];
            });
            setLoadingMore(false);
        }, 1200);
    }, [loadingMore]);

    const handlePress = useCallback((item) => {
        router.push({
            pathname: `/(drawer)/(news)/${item.id}`,
            params: { title: item.title, description: item.description },
        });
    }, [router]);

    const renderItem = useCallback(({ item }) => (
        <NewsCard item={item} onPress={handlePress} />
    ), [handlePress]);

    const getItemLayout = useCallback((_, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    }), []);

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                getItemLayout={getItemLayout}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
                    loadingMore ? (
                        <View style={styles.loaderContainer}>
                            <ActivityIndicator size="small" color="#2563eb" />
                        </View>
                    ) : null
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    card: {
        height: ITEM_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginHorizontal: 12,
        marginVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    badge: {
        backgroundColor: '#dbeafe',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 6,
        marginRight: 12,
    },
    badgeText: {
        color: '#1d4ed8',
        fontWeight: 'bold',
        fontSize: 13,
    },
    info: {
        flex: 1,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 2,
    },
    cardDesc: {
        fontSize: 13,
        color: '#64748b',
    },
    loaderContainer: {
        paddingVertical: 16,
        alignItems: 'center',
    },
});