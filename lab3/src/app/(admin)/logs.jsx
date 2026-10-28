import React from 'react';
import { View, Text, VirtualizedList, StyleSheet } from 'react-native';
import { INITIAL_LOGS } from '../../data/mockData';

const ITEM_HEIGHT = 75;

export default function LogsScreen() {
    const getItem = (data, index) => data[index];
    const getItemCount = (data) => data.length;
    const getItemLayout = (_, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
    });

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.logHeader}>
                <Text style={styles.eventText}>{item.event}</Text>
                <Text style={styles.timeText}>{item.timestamp}</Text>
            </View>
            <Text style={styles.detailsText}>{item.details}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <VirtualizedList
                data={INITIAL_LOGS}
                initialNumToRender={12}
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
        height: 65,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        justifyContent: 'center',
        borderLeftWidth: 4,
        borderLeftColor: '#2563EB',
        elevation: 1,
    },
    logHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 },
    eventText: { fontSize: 14, fontWeight: 'bold', color: '#0F172A' },
    timeText: { fontSize: 11, color: '#94A3B8' },
    detailsText: { fontSize: 12, color: '#475569' },
});