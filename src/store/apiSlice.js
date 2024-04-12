import { createSlice } from '@reduxjs/toolkit';
import { userApi } from './api';

const initialState = {
    idUser: localStorage.getItem('id_user') || '',
    userProfile: JSON.parse(localStorage.getItem('user_profile')) || {},
    error: '',

    activePerInfo: { isOpen: false, initSlidePerInfo: 1 },
};

const apiSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // for logout
        logout: () => initialState,
        updateUsername: () => {},
        updateUserInfo: (state, action) => {
            console.log(44111, action.payload);
            return {
                ...action.payload,
                ...state,
            };
        },
        updateActivePerInfo: (state, action) => {
            return {
                ...state,
                activePerInfo: action.payload,
            };
        },
    },

    extraReducers: (builder) => {
        // Xử lý logic khi endpoint login được fulfilled
        builder.addMatcher(userApi.endpoints.userLogin.matchFulfilled, (state, action) => {
            // Lưu token vào state
            const data = action?.payload;

            if (data?.status === 1) {
                state.idUser = data?.data.UserID;
                state.userProfile = data?.data;
                state.error = '';

                localStorage.setItem('user_profile', JSON.stringify(data?.data));
                localStorage.setItem('id_user', data?.data.UserID);
            }
        });

        builder.addMatcher(userApi.endpoints.getUesrProfileGoogle.matchFulfilled, (state, action) => {
            console.log(333, action.payload);
        });

        builder.addMatcher(userApi.endpoints.userLogout.matchFulfilled, (state, action) => {
            // Lưu token vào state
            const data = action?.payload;

            if (data?.status === 1) {
                state.userProfile = {};
                state.error = '';
            }
        });
    },
});

// Export action ra để sử dụng cho tiện.
export const { updateUsername, logout, updateActivePerInfo, updateUserInfo } = apiSlice.actions;

// Action là 1 hàm trả về object dạng {type, payload}, chạy thử console.log(updateUsername()) để xem chi tiết

// Hàm giúp lấy ra state mong muốn.
// Hàm này có 1 tham số là root state là toàn bộ state trong store, chạy thử console.log(state) trong nội dung hàm để xem chi tiết
export const selectUserId = (state) => state.user?.idUser;
export const selectUserProfile = (state) => state.user?.userProfile;
export const selectErrMes = (state) => state.user?.error;
export const selectActivePerInfo = (state) => state.user?.activePerInfo;
// Export reducer để nhúng vào Store
export default apiSlice.reducer;
