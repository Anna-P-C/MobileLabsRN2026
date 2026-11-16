import React, { useState, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Modal,
    TextInput,
    Alert,
    Platform,
} from 'react-native';
import { Directory, File, Paths } from 'expo-file-system';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FileManagerScreen() {
    const router = useRouter();

    const [currentDir, setCurrentDir] = useState(() => Paths.document);
    const [entries, setEntries] = useState([]);

    const [storage, setStorage] = useState({
        total: 0,
        free: 0,
        used: 0,
    });

    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [createType, setCreateType] = useState('folder');
    const [newName, setNewName] = useState('');
    const [newFileContent, setNewFileContent] = useState('');

    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [selectedItemInfo, setSelectedItemInfo] = useState(null);

    const formatBytes = (bytes) => {
        if (!bytes || bytes <= 0) return '0 Б';
        const sizes = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return 'Невідомо';
        const ms = timestamp < 10000000000 ? timestamp * 1000 : timestamp;
        return new Date(ms).toLocaleString('uk-UA');
    };

    const loadStorageStats = () => {
        try {
            const total = Paths.totalDiskSpace ?? 0;
            const free = Paths.availableDiskSpace ?? 0;
            const used = total > free ? total - free : 0;
            setStorage({ total, free, used });
        } catch (e) {
            console.warn('Не вдалося отримати дані про памʼять:', e);
        }
    };

    const loadDirectoryContents = useCallback(() => {
        try {
            if (!currentDir.exists) {
                currentDir.create({ intermediates: true });
            }

            const rawItems = currentDir.list();
            const mapped = rawItems.map((item) => {
                const isDir = item instanceof Directory;
                return {
                    name: item.name,
                    uri: item.uri,
                    isDirectory: isDir,
                    size: isDir ? 0 : item.size ?? 0,
                    modificationTime: isDir ? null : item.modificationTime ?? null,
                };
            });

            mapped.sort((a, b) => {
                if (a.isDirectory === b.isDirectory) {
                    return a.name.localeCompare(b.name);
                }
                return a.isDirectory ? -1 : 1;
            });

            setEntries(mapped);
        } catch (error) {
            console.error('Помилка читання директорії:', error);
            Alert.alert('Помилка', 'Не вдалося відкрити директорію.');
        }
    }, [currentDir]);

    useFocusEffect(
        useCallback(() => {
            loadStorageStats();
            loadDirectoryContents();
        }, [loadDirectoryContents])
    );

    const isRoot = currentDir.uri === Paths.document.uri;

    const handleGoUp = () => {
        if (!isRoot && currentDir.parentDirectory) {
            setCurrentDir(currentDir.parentDirectory);
        }
    };

    const handleItemPress = (item) => {
        if (item.isDirectory) {
            setCurrentDir(new Directory(currentDir, item.name));
        } else if (item.name.toLowerCase().endsWith('.txt')) {
            const rootUri = Paths.document.uri.endsWith('/')
                ? Paths.document.uri
                : `${Paths.document.uri}/`;
            const relPath = decodeURIComponent(item.uri.replace(rootUri, ''));

            router.push({
                pathname: '/editor',
                params: { relPath: encodeURIComponent(relPath), name: item.name },
            });
        } else {
            Alert.alert('Інформація', 'Перегляд доступний лише для текстових файлів (.txt).');
        }
    };

    const openCreateModal = (type) => {
        setCreateType(type);
        setNewName('');
        setNewFileContent('');
        setCreateModalVisible(true);
    };

    const handleCreate = () => {
        const trimmedName = newName.trim();
        if (!trimmedName) {
            Alert.alert('Увага', 'Введіть назву!');
            return;
        }

        try {
            if (createType === 'folder') {
                const folder = new Directory(currentDir, trimmedName);
                if (folder.exists) {
                    Alert.alert('Помилка', 'Папка з такою назвою вже існує.');
                    return;
                }
                folder.create();
            } else {
                const fileName = trimmedName.endsWith('.txt') ? trimmedName : `${trimmedName}.txt`;
                const file = new File(currentDir, fileName);
                if (file.exists) {
                    Alert.alert('Помилка', 'Файл із такою назвою вже існує.');
                    return;
                }
                file.create();
                file.write(newFileContent);
            }

            setCreateModalVisible(false);
            loadDirectoryContents();
            loadStorageStats();
        } catch (error) {
            console.error('Помилка створення:', error);
            Alert.alert('Помилка', 'Не вдалося створити обʼєкт.');
        }
    };

    const handleDelete = (item) => {
        const performDelete = () => {
            try {
                if (item.isDirectory) {
                    const dir = new Directory(currentDir, item.name);
                    dir.delete();
                } else {
                    const file = new File(currentDir, item.name);
                    file.delete();
                }
                loadDirectoryContents();
                loadStorageStats();
            } catch (error) {
                console.error('Помилка видалення:', error);
                Alert.alert('Помилка', 'Не вдалося видалити елемент.');
            }
        };

        if (Platform.OS === 'web') {
            if (window.confirm(`Ви дійсно хочете видалити "${item.name}"?`)) {
                performDelete();
            }
        } else {
            Alert.alert(
                'Підтвердження видалення',
                `Ви дійсно хочете видалити "${item.name}"?`,
                [
                    { text: 'Скасувати', style: 'cancel' },
                    { text: 'Видалити', style: 'destructive', onPress: performDelete },
                ]
            );
        }
    };

    const handleShowInfo = (item) => {
        setSelectedItemInfo(item);
        setInfoModalVisible(true);
    };

    const getDisplayPath = () => {
        const rootUri = Paths.document.uri;
        const relative = currentDir.uri.replace(rootUri, '');
        return relative ? `Documents/${decodeURIComponent(relative)}` : 'Documents/';
    };

    const getFileExtensionType = (item) => {
        if (item.isDirectory) return 'Папка з файлами';
        const parts = item.name.split('.');
        if (parts.length > 1) {
            return `Файл (.${parts.pop()?.toUpperCase()})`;
        }
        return 'Невідомий файл';
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemCard} onPress={() => handleItemPress(item)}>
            <View style={styles.itemLeft}>
                <Ionicons
                    name={item.isDirectory ? 'folder' : 'document-text'}
                    size={28}
                    color={item.isDirectory ? '#F59E0B' : '#2563EB'}
                />
                <View style={styles.itemTextContainer}>
                    <Text style={styles.itemName} numberOfLines={1}>
                        {item.name}
                    </Text>
                    <Text style={styles.itemSubtext}>
                        {item.isDirectory ? 'Директорія' : formatBytes(item.size)}
                    </Text>
                </View>
            </View>

            <View style={styles.itemActions}>
                <TouchableOpacity style={styles.iconBtn} onPress={() => handleShowInfo(item)}>
                    <Ionicons name="information-circle-outline" size={24} color="#4B5563" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconBtn} onPress={() => handleDelete(item)}>
                    <Ionicons name="trash-outline" size={22} color="#EF4444" />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container} edges={['bottom']}>
            <View style={styles.storageCard}>
                <Text style={styles.storageTitle}>Пам'ять пристрою</Text>
                <View style={styles.storageRow}>
                    <View style={styles.storageCol}>
                        <Text style={styles.storageLabel}>Загалом</Text>
                        <Text style={styles.storageValue}>{formatBytes(storage.total)}</Text>
                    </View>
                    <View style={styles.storageCol}>
                        <Text style={styles.storageLabel}>Зайнято</Text>
                        <Text style={[styles.storageValue, { color: '#EF4444' }]}>
                            {formatBytes(storage.used)}
                        </Text>
                    </View>
                    <View style={styles.storageCol}>
                        <Text style={styles.storageLabel}>Вільно</Text>
                        <Text style={[styles.storageValue, { color: '#10B981' }]}>
                            {formatBytes(storage.free)}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.navBar}>
                <TouchableOpacity
                    style={[styles.upButton, isRoot && styles.upButtonDisabled]}
                    onPress={handleGoUp}
                    disabled={isRoot}
                >
                    <Ionicons name="arrow-up" size={20} color={isRoot ? '#9CA3AF' : '#2563EB'} />
                    <Text style={[styles.upButtonText, isRoot && { color: '#9CA3AF' }]}>Вгору</Text>
                </TouchableOpacity>

                <Text style={styles.pathText} numberOfLines={1}>
                    {getDisplayPath()}
                </Text>
            </View>

            <FlatList
                data={entries}
                keyExtractor={(item) => item.uri}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Ionicons name="folder-open-outline" size={48} color="#9CA3AF" />
                        <Text style={styles.emptyText}>Ця папка порожня</Text>
                    </View>
                }
            />

            <View style={styles.bottomBar}>
                <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: '#F59E0B' }]}
                    onPress={() => openCreateModal('folder')}
                >
                    <Ionicons name="folder-outline" size={20} color="#FFF" />
                    <Text style={styles.actionBtnText}>+ Папка</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: '#2563EB' }]}
                    onPress={() => openCreateModal('file')}
                >
                    <Ionicons name="document-text-outline" size={20} color="#FFF" />
                    <Text style={styles.actionBtnText}>+ Файл (.txt)</Text>
                </TouchableOpacity>
            </View>

            <Modal visible={createModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>
                            {createType === 'folder' ? 'Нова папка' : 'Новий текстовий файл'}
                        </Text>

                        <TextInput
                            style={styles.input}
                            placeholder={createType === 'folder' ? 'Назва папки' : 'Назва файлу (напр. notes.txt)'}
                            value={newName}
                            onChangeText={setNewName}
                            autoFocus
                        />

                        {createType === 'file' && (
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Початковий вміст файлу..."
                                value={newFileContent}
                                onChangeText={setNewFileContent}
                                multiline
                                numberOfLines={4}
                            />
                        )}

                        <View style={styles.modalActions}>
                            <TouchableOpacity
                                style={[styles.modalBtn, styles.cancelBtn]}
                                onPress={() => setCreateModalVisible(false)}
                            >
                                <Text style={styles.cancelBtnText}>Скасувати</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalBtn, styles.confirmBtn]}
                                onPress={handleCreate}
                            >
                                <Text style={styles.confirmBtnText}>Створити</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <Modal visible={infoModalVisible} transparent animationType="fade">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalCard}>
                        <Text style={styles.modalTitle}>Властивості об'єкта</Text>
                        {selectedItemInfo && (
                            <View style={styles.infoList}>
                                <Text style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Назва: </Text>
                                    {selectedItemInfo.name}
                                </Text>
                                <Text style={styles.infoRow}>
                                    <Text style={styles.infoLabel}>Тип: </Text>
                                    {getFileExtensionType(selectedItemInfo)}
                                </Text>
                                {!selectedItemInfo.isDirectory && (
                                    <>
                                        <Text style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Розмір: </Text>
                                            {formatBytes(selectedItemInfo.size)} ({selectedItemInfo.size} байт)
                                        </Text>
                                        <Text style={styles.infoRow}>
                                            <Text style={styles.infoLabel}>Змінено: </Text>
                                            {formatDate(selectedItemInfo.modificationTime)}
                                        </Text>
                                    </>
                                )}
                            </View>
                        )}
                        <TouchableOpacity
                            style={[styles.modalBtn, styles.confirmBtn, { marginTop: 16 }]}
                            onPress={() => setInfoModalVisible(false)}
                        >
                            <Text style={styles.confirmBtnText}>Закрити</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#F3F4F6' },
    storageCard: {
        backgroundColor: '#FFFFFF',
        margin: 12,
        padding: 14,
        borderRadius: 12,
        elevation: 2,
    },
    storageTitle: { fontSize: 14, fontWeight: 'bold', color: '#374151', marginBottom: 8 },
    storageRow: { flexDirection: 'row', justifyContent: 'space-between' },
    storageCol: { alignItems: 'center', flex: 1 },
    storageLabel: { fontSize: 12, color: '#6B7280' },
    storageValue: { fontSize: 14, fontWeight: 'bold', color: '#111827', marginTop: 2 },
    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E5E7EB',
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginHorizontal: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    upButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
        marginRight: 10,
    },
    upButtonDisabled: { backgroundColor: '#F3F4F6' },
    upButtonText: { fontSize: 13, fontWeight: '600', color: '#2563EB', marginLeft: 4 },
    pathText: { flex: 1, fontSize: 13, color: '#374151', fontWeight: '500' },
    listContent: { paddingHorizontal: 12, paddingBottom: 80 },
    itemCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFFFFF',
        padding: 12,
        borderRadius: 10,
        marginBottom: 8,
        elevation: 1,
    },
    itemLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    itemTextContainer: { marginLeft: 12, flex: 1 },
    itemName: { fontSize: 15, fontWeight: '600', color: '#1F2937' },
    itemSubtext: { fontSize: 12, color: '#6B7280', marginTop: 2 },
    itemActions: { flexDirection: 'row', alignItems: 'center' },
    iconBtn: { padding: 6, marginLeft: 4 },
    emptyContainer: { alignItems: 'center', justifyContent: 'center', marginTop: 60 },
    emptyText: { marginTop: 10, fontSize: 15, color: '#6B7280' },
    bottomBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: 12,
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#E5E7EB',
        gap: 10,
    },
    actionBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        borderRadius: 10,
    },
    actionBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15, marginLeft: 6 },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalCard: { backgroundColor: '#FFFFFF', borderRadius: 14, padding: 20 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#111827', marginBottom: 14 },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 10,
        fontSize: 15,
        marginBottom: 12,
    },
    textArea: { height: 100, textAlignVertical: 'top' },
    modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 4 },
    modalBtn: { paddingVertical: 10, paddingHorizontal: 16, borderRadius: 8 },
    cancelBtn: { backgroundColor: '#E5E7EB' },
    cancelBtnText: { color: '#374151', fontWeight: '600' },
    confirmBtn: { backgroundColor: '#2563EB' },
    confirmBtnText: { color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center' },
    infoList: { gap: 8 },
    infoRow: { fontSize: 14, color: '#374151' },
    infoLabel: { fontWeight: 'bold', color: '#111827' },
});