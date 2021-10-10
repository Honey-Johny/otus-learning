let users = [
    {
        id: 1,
        name: 'Иван Иванов',
        email: 'i.ivanov@mail.ru',
    },
    {
        id: 2,
        name: 'Петр Петров',
        email: 'p.petrov@mail.ru',
    }
]

let categories = [
    {
        id: 1,
        name: 'Шапки',
        description: 'Шапки ручной работы'
    },
    {
        id: 2,
        name: 'Футболки',
        description: 'Футболки с веселыми картинками'
    },
    {
        id: 3,
        name: 'Кружки',
        description: 'Кружки с афтографами блогеров'
    },
]

let items = [
    {
        id: 100,
        name: 'ШАПКА ДОКЕР «ПОРА ВАЛИТЬ» КРАСНАЯ',
        price: 1990,
        description: 'Шапка докер ручной работы с вышитым логотипом',
        categoryId: 1
    },
    {
        id: 101,
        name: 'ШАПКА ДОКЕР «USACHEVSHOW» ЧЕРНАЯ',
        price: 1990,
        description: 'Шапка докер ручной работы с вышитым логотипом',
        categoryId: 1
    },
    {
        id: 102,
        name: 'ФУТБОЛКА «ПОРА ВАЛИТЬ» ЧЕРНАЯ ОВЕРСАЙЗ',
        price: 2290,
        description: 'Oversize футболка черного цвета, для тех, кому Пора Валить',
        categoryId: 2
    },
    {
        id: 103,
        name: 'ФУТБОЛКА «USACHEVSHOW» БЕЛАЯ',
        price: 1490,
        description: 'Базовая белая футболка и вышитый на ней логотип обеспечат вам пропуск куда угодно. Наверное, мы не проверяли.',
        categoryId: 2
    },
    {
        id: 104,
        name: 'КРУЖКА «ПАМ ПАМ»',
        price: 890,
        description: 'Керамическая кружка с гравировкой «ПАМ ПАМ» с двух сторон.',
        categoryId: 3
    }
]


exports.users = users;
exports.categories = categories;
exports.items = items;
