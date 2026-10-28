export const INITIAL_NEWS = Array.from({ length: 55 }, (_, i) => ({
    id: String(i + 1),
    title: `Новина №${i + 1}: Оновлення освітніх програм Житомирської політехніки`,
    category: i % 3 === 0 ? 'Академічна' : i % 3 === 1 ? 'Наука' : 'Спорт',
    status: i % 4 === 0 ? 'Чернетка' : i % 4 === 1 ? 'На перевірці' : 'Опубліковано',
    imageUrl: 'https://picsum.photos/400/200?random=' + (i + 1),
    content: `Повний текст інформаційного оновлення №${i + 1} для студентів та викладачів Житомирської політехніки.`,
    createdAt: new Date(2026, 9, (i % 28) + 1).toLocaleDateString('uk-UA'),
}));


export const INITIAL_USERS = Array.from({ length: 50 }, (_, i) => ({
    id: String(i + 1),
    name: `Користувач ${i + 1}`,
    email: `user${i + 1}@student.ztu.edu.ua`,
    role: i === 0 ? 'Головний адмін' : i % 5 === 0 ? 'Редактор' : 'Студент',
    status: i % 6 === 0 ? 'Заблокований' : 'Активний',
}));


export const INITIAL_LOGS = [
    {
        id: '1',
        event: 'Вхід у систему',
        details: 'Адміністратор успішно залогувався',
        timestamp: new Date().toLocaleString('uk-UA'),
    },
];