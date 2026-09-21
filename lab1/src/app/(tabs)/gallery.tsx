import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    StatusBar,
    Platform,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const GALLERY_ITEMS = [
    'https://kb.khmnu.edu.ua/wp-content/uploads/sites/6/signal-2026-09-18-14-20-22-415_003-1024x576.jpg',
    'https://news.ztu.edu.ua/wp-content/uploads/2026/09/na-sajt-7.png',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHBEcPJX8G6OXodc5qrx0y07Oi8FxxojxHj601sesSTGk96Ua-f8v8aYPN&s=10',
    'https://magic-comfort.com.ua/wp-content/uploads/2025/02/magiya-sajt-4.png',
    'https://news.ztu.edu.ua/wp-content/uploads/2026/09/na-sajt-1-1-1.png',
    'https://mms.gov.ua/storage/app/resources/resize/820_360_0_0_auto/img_718bf993436bc7bf7bbf11c19595e3a6.jpeg',
    'https://cdn4.suspilne.media/images/resize/400x1.78/4b647ee1c08739eb.jpg',
];

export default function GalleryScreen() {
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

    {/* Заголовок галереї */ }
    <View style={ styles.galleryHeader }>
        <Text style={ styles.galleryTitle }> Фотогалерея </Text>
            < View style = { styles.viewIcons } >
                <TouchableOpacity style={ [styles.iconButton, styles.iconButtonActive] }>
                    <Ionicons name="grid" size = { 16} color = "#FFFFFF" />
                        </TouchableOpacity>
                        < TouchableOpacity style = { styles.iconButton } >
                            <Ionicons name="list" size = { 16} color = "#6C757D" />
                                </TouchableOpacity>
                                </View>
                                </View>

    {/* Сітка 2 колонки */ }
    <FlatList
        data={ GALLERY_ITEMS }
    keyExtractor = {(_, index) => index.toString()
}
numColumns = { 2}
contentContainerStyle = { styles.gridContainer }
showsVerticalScrollIndicator = { false}
renderItem = {({ item }) => (
    <View style= { styles.imageCard } >
    <Image
              source={ { uri: item } }
style = { styles.image }
resizeMode = "cover"
    />
    </View>
        )}
      />
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
    galleryHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 14,
    },
    galleryTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1A2A44',
    },
    viewIcons: {
        flexDirection: 'row',
        backgroundColor: '#F1F3F5',
        borderRadius: 8,
        padding: 2,
    },
    iconButton: {
        paddingHorizontal: 8,
        paddingVertical: 6,
        borderRadius: 6,
    },
    iconButtonActive: {
        backgroundColor: '#1E4A84',
    },
    gridContainer: {
        paddingHorizontal: 10,
        paddingBottom: 24,
    },
    imageCard: {
        flex: 1,
        margin: 6,
        height: 110,
        borderRadius: 12,
        overflow: 'hidden',
        backgroundColor: '#E9ECEF',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});