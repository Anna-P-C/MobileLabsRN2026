import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ScrollView,
    Image,
    StatusBar,
    Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
    const [search, setSearch] = useState('');

    return (
        <View style= { styles.container } >
        <StatusBar barStyle="dark-content" backgroundColor = "#FFFFFF" />

        {/* Верхня спільна шапка */ }
            < View style = { styles.header } >
                <Image
          source={ { uri: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Zhytomyr_Polytechnic_logo.png' } }
    style = { styles.polytechLogo }
        />
        <View style={ styles.headerTitleContainer }>
            <Text style={ styles.headerTitle }> Лабораторна робота 1 </Text>
                < Text style = { styles.headerSubtitle } > Полякова А.С., ІПЗ - 24 - 2 </Text>
                    </View>
                    < View style = { styles.headerRightSpacer } />
                        </View>

    {/* Поле пошуку */ }
    <View style={ styles.searchWrapper }>
        <View style={ styles.searchContainer }>
            <Ionicons name="search" size = { 18} color = "#8E8E93" style = { styles.searchIcon } />
                <TextInput
            style={ styles.searchInput }
    placeholder = "Пошук..."
    placeholderTextColor = "#8E8E93"
    value = { search }
    onChangeText = { setSearch }
        />
        </View>
        </View>

    {/* Стрічка новин */ }
    <ScrollView contentContainerStyle={ styles.scrollContainer } showsVerticalScrollIndicator = { false} >
    {/* Новина 1 (Cybersecurity) */ }
        < View style = { styles.card } >
            <Image
            source={
        {
            uri: 'https://kb.khmnu.edu.ua/wp-content/uploads/sites/6/signal-2026-09-18-14-20-22-415_003-1024x576.jpg',
            }
    }
    style = { styles.cardImage }
        />
        <View style={ styles.cardContent }>
            <Text style={ styles.cardTitle }>
                Житомирська політехніка – учасник міжнародного проєкту Pilot Program for Enhancing Cybersecurity Skills Gaps in Ukraine
                    </Text>
                    < Text style = { styles.cardDate } > 17 вересня 2026 р.</Text>
                        < Text style = { styles.cardText } >
                            Житомирська політехніка долучається до міжнародного освітнього проєкту Pilot Program for Enhancing Cybersecurity Skills Gaps in Ukraine, який є складовою системного стратегічного партнерства...
    </Text>
        </View>
        </View>

    {/* Новина 2 (Конференція) */ }
    <View style={ styles.card }>
        <Image
            source={
        {
            uri: 'https://news.ztu.edu.ua/wp-content/uploads/2026/09/na-sajt-7.png',
            }
    }
    style = { styles.cardImage }
        />
        <View style={ styles.cardContent }>
            <Text style={ styles.cardTitle }>
                VII ВСЕУКРАЇНСЬКА НАУКОВО - ПРАКТИЧНА КОНФЕРЕНЦІЯ «ПРАВОВА ПОЛІТИКА УКРАЇНИ: ІСТОРІЯ ТА СУЧАСНІСТЬ»
    </Text>
        < Text style = { styles.cardDate } > 22 жовтня 2026 р., 10:00 </Text>
            < Text style = { styles.cardText } >
                Запрошуємо здобувачів вищої освіти, аспірантів та викладачів взяти участь у роботі всеукраїнської науково - практичної конференції.
            </Text>
                    </View>
                    </View>
                    </ScrollView>
                    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 28) + 8 : 44,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F2F5',
    },
    polytechLogo: {
        width: 38,
        height: 38,
        resizeMode: 'contain',
    },
    headerTitleContainer: {
        flex: 1,
        marginLeft: 12,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1A2A44',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#6C757D',
        marginTop: 2,
    },
    headerRightSpacer: {
        width: 38,
    },
    searchWrapper: {
        paddingHorizontal: 16,
        paddingVertical: 10,
        backgroundColor: '#FFFFFF',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        height: 40,
        borderRadius: 10,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
        color: '#212529',
    },
    scrollContainer: {
        paddingHorizontal: 16,
        paddingBottom: 24,
        backgroundColor: '#FFFFFF',
    },
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E9ECEF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
    },
    cardImage: {
        width: '100%',
        height: 185,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: 14,
    },
    cardTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1A2A44',
        lineHeight: 20,
        marginBottom: 6,
    },
    cardDate: {
        fontSize: 12,
        color: '#8E8E93',
        marginBottom: 6,
    },
    cardText: {
        fontSize: 13,
        color: '#495057',
        lineHeight: 18,
    },
});