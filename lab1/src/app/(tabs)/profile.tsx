import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Switch,
    StatusBar,
    Platform,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
    const [name, setName] = useState('Полякова Анна Сергіївна');
    const [email, setEmail] = useState('ipz242_pas@student.ztu.edu.ua');
    const [group, setGroup] = useState('ІПЗ-24-2');
    const [notifications, setNotifications] = useState(true);

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
                    < TouchableOpacity style = { styles.settingsWrapper } >
                        <Ionicons name="settings-sharp" size = { 20} color = "#FFFFFF" />
                            </TouchableOpacity>
                            </View>

                            < ScrollView contentContainerStyle = { styles.scrollContainer } showsVerticalScrollIndicator = { false} >
                            {/* Синій банер з іконками закриття/збереження та аватаром */ }
                                < View style = { styles.bannerWrapper } >
                                    <View style={ styles.banner }>
                                        <View style={ styles.bannerActions }>
                                            <TouchableOpacity style={ styles.bannerBtn }>
                                                <Ionicons name="close" size = { 18} color = "#FFFFFF" />
                                                    </TouchableOpacity>
                                                    < TouchableOpacity style = { styles.bannerBtn } >
                                                        <Ionicons name="checkmark" size = { 18} color = "#FFFFFF" />
                                                            </TouchableOpacity>
                                                            </View>
                                                            < View style = { styles.avatarWrapper } >
                                                                <Ionicons name="person" size = { 56} color = "#6C757D" />
                                                                    </View>
                                                                    </View>
                                                                    </View>

    {/* Секція ПІБ */ }
    <View style={ styles.sectionBlock }>
        <Text style={ styles.sectionLabel }> ПІБ </Text>
            < TextInput
    style = { styles.singleInput }
    value = { name }
    onChangeText = { setName }
    placeholder = "Введіть ПІБ"
        />
        </View>

    {/* Секція КОНТАКТИ */ }
    <View style={ styles.cardContainer }>
        <Text style={ styles.cardHeaderTitle }> КОНТАКТИ </Text>

            < Text style = { styles.fieldLabel } > Email </Text>
                < TextInput
    style = { styles.cardInput }
    value = { email }
    onChangeText = { setEmail }
    keyboardType = "email-address"
    autoCapitalize = "none"
        />

        <Text style={ [styles.fieldLabel, { marginTop: 12 }] }> Група </Text>
            < TextInput
    style = { styles.cardInput }
    value = { group }
    onChangeText = { setGroup }
        />
        </View>

    {/* Секція НАЛАШТУВАННЯ */ }
    <View style={ styles.cardContainer }>
        <Text style={ styles.cardHeaderTitle }> НАЛАШТУВАННЯ </Text>
            < View style = { styles.switchRow } >
                <View style={ styles.switchLabelContainer }>
                    <Ionicons name="notifications-outline" size = { 20} color = "#1E4A84" style = {{ marginRight: 8 }
} />
    < Text style = { styles.switchTitle } > Сповіщення </Text>
        </View>
        < Switch
value = { notifications }
onValueChange = { setNotifications }
trackColor = {{ false: '#D1D5DB', true: '#1E4A84' }}
thumbColor = "#FFFFFF"
    />
    </View>
    </View>
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAFC',
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
    settingsWrapper: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#B5BAC0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainer: {
        paddingBottom: 32,
    },
    bannerWrapper: {
        paddingHorizontal: 16,
        marginTop: 12,
        marginBottom: 46,
    },
    banner: {
        backgroundColor: '#1E4A84',
        height: 110,
        borderRadius: 18,
        position: 'relative',
        alignItems: 'center',
    },
    bannerActions: {
        position: 'absolute',
        top: 10,
        right: 12,
        flexDirection: 'row',
        gap: 8,
    },
    bannerBtn: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarWrapper: {
        position: 'absolute',
        bottom: -36,
        width: 86,
        height: 86,
        borderRadius: 43,
        backgroundColor: '#E8ECF2',
        borderWidth: 4,
        borderColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
    },
    sectionBlock: {
        paddingHorizontal: 16,
        marginBottom: 14,
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#64748B',
        marginBottom: 6,
    },
    singleInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        fontSize: 14,
        color: '#1E293B',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    cardContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 14,
        marginHorizontal: 16,
        marginBottom: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: '#E2E8F0',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
        elevation: 1,
    },
    cardHeaderTitle: {
        fontSize: 11,
        fontWeight: '700',
        color: '#64748B',
        marginBottom: 10,
        letterSpacing: 0.5,
    },
    fieldLabel: {
        fontSize: 12,
        color: '#64748B',
        marginBottom: 6,
    },
    cardInput: {
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        color: '#1E293B',
        borderWidth: 1,
        borderColor: '#E2E8F0',
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
    },
    switchLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    switchTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#1E293B',
    },
});