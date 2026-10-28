import { Drawer } from 'expo-router/drawer';
import AdminDrawerContent from '@/components/AdminDrawerContent';

export default function AdminLayout() {
    return (
        <Drawer
            drawerContent={(props) => <AdminDrawerContent {...props} />}
            screenOptions={{
                headerStyle: { backgroundColor: '#1E293B' },
                headerTintColor: '#FFFFFF',
                drawerActiveTintColor: '#2563EB',
                drawerInactiveTintColor: '#475569',
            }}
        >
            <Drawer.Screen
                name="dashboard"
                options={{
                    drawerLabel: 'Дашборд',
                    title: 'Панель аналітики',
                }}
            />
            <Drawer.Screen
                name="news"
                options={{
                    drawerLabel: 'Новини',
                    title: 'Управління новинами',
                }}
            />
            <Drawer.Screen
                name="users"
                options={{
                    drawerLabel: 'Користувачі',
                    title: 'Управління користувачами',
                }}
            />
            <Drawer.Screen
                name="logs"
                options={{
                    drawerLabel: 'Системні логи',
                    title: 'Журнал аудиту',
                }}
            />
        </Drawer>
    );
}