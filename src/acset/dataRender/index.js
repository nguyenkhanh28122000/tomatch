import { IoIosLogOut } from 'react-icons/io';
import { FaCaretDown } from 'react-icons/fa';

const itemNavbarPath1 = [
    {
        ID: 1,
        title: 'kết quả bài test',
        path: '/personal-results',
    },
    {
        title: 'làm bài test',
        icon: FaCaretDown,
        children: [
            {
                ID: '2a',
                title: 'Bài test tính cách',
                path: '/',
            },
            {
                ID: '2b',
                title: 'Bài test độ stress',
                path: '/',
            },
        ],
    },
    {
        ID: 3,
        title: 'kết quả bài test',
        path: 'login',
    },
];

const itemNavbarPath2 = [
    {
        ID: 4,
        title: 'thông tin cá nhân',
        path: '/',
    },
    {
        ID: 5,
        title: 'Đổi mật khẩu',
        path: '/',
    },
    {
        ID: 6,
        title: 'Logout',
        path: '/',
        icon: IoIosLogOut,
    },
];

const fakeResults = [
    {
        id: 0,
        nameGrounp: null,
        time: '25/1/2024',
        totalYes: 30,
        totalNo: 50,
        eaglePercent: '90%',
        owlPercent: '10%',
        peacockPercent: '0%',
        dovePercent: '0%',
    },
    {
        id: 1,
        nameGrounp: null,
        time: '25/1/2024',
        totalYes: 30,
        totalNo: 50,
        eaglePercent: '90%',
        owlPercent: '10%',
        peacockPercent: '0%',
        dovePercent: '0%',
    },
    {
        id: 2,
        nameGrounp: null,
        time: '25/1/2024',
        totalYes: 30,
        totalNo: 50,
        eaglePercent: '90%',
        owlPercent: '10%',
        peacockPercent: '0%',
        dovePercent: '0%',
    },
    {
        id: 3,
        nameGrounp: null,
        time: '25/1/2024',
        totalYes: 30,
        totalNo: 50,
        eaglePercent: '90%',
        owlPercent: '10%',
        peacockPercent: '0%',
        dovePercent: '0%',
    },
    {
        id: 4,
        nameGrounp: null,
        time: '25/1/2024',
        totalYes: 30,
        totalNo: 50,
        eaglePercent: '90%',
        owlPercent: '10%',
        peacockPercent: '0%',
        dovePercent: '0%',
    },
    {
        id: 5,
        nameGrounp: null,
        time: '25/1/2024',
        totalYes: 30,
        totalNo: 50,
        eaglePercent: '90%',
        owlPercent: '10%',
        peacockPercent: '0%',
        dovePercent: '0%',
    },
    {
        id: 6,
        nameGrounp: null,
        time: '25/1/2024',
        totalYes: 30,
        totalNo: 50,
        eaglePercent: '90%',
        owlPercent: '10%',
        peacockPercent: '0%',
        dovePercent: '0%',
    },
    {
        id: 7,
        nameGrounp: null,
        time: '25/1/2024',
        totalYes: 30,
        totalNo: 50,
        eaglePercent: '90%',
        owlPercent: '10%',
        peacockPercent: '0%',
        dovePercent: '0%',
    },
    {
        id: 8,
        nameGrounp: null,
        time: '25/1/2024',
        totalYes: 30,
        totalNo: 50,
        eaglePercent: '90%',
        owlPercent: '10%',
        peacockPercent: '0%',
        dovePercent: '0%',
    },
];

const fakeResultGroups = [
    {
        nameGroup: 'nhóm số 1',
        totalComplete: 40,
        total: 70,
        dateCreate: '16/1/2024',
    },
    {
        nameGroup: 'nhóm số 2',
        totalComplete: 50,
        total: 80,
        dateCreate: '16/1/2024',
    },
    {
        nameGroup: 'nhóm số 3',
        totalComplete: 30,
        total: 90,
        dateCreate: '16/1/2024',
    },
    {
        nameGroup: 'nhóm số 4',
        totalComplete: 28,
        total: 65,
        dateCreate: '16/1/2024',
    },
    {
        nameGroup: 'nhóm số 5',
        totalComplete: 41,
        total: 68,
        dateCreate: '16/1/2024',
    },
    {
        nameGroup: 'nhóm số 6',
        totalComplete: 40,
        total: 88,
        dateCreate: '16/1/2024',
    },
];

export { itemNavbarPath1, itemNavbarPath2, fakeResults, fakeResultGroups };
