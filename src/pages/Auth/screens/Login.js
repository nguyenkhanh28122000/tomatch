import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from '../styles/authStyles.module.scss';

import { BgrMain } from '../../../conponents';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { InputCpn, ButtonCpn, Header, Line, LoaderIcon } from '../../../conponents';

import { testEmail, testPassword } from '../../../hooks/hocks';
import { authPath } from '../../../Router/paths';

import { useGetUesrProfileGoogleQuery, useUserLoginMutation } from '../../../store/api';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserProfile, updateUserInfo } from '../../../store/apiSlice';

import { privatePath } from '../../../Router/paths';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        userName: location.state?.email ? location.state?.email : '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const [userLogin, userLoginResponse] = useUserLoginMutation();
    const { data } = useGetUesrProfileGoogleQuery({ method: 'google', type: 'existing' });
    const auth = useSelector(selectUserProfile);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (!formData.userName.trim()) {
            validationErrors.email = 'Vui lòng nhập Email';
        } else if (testEmail(formData.userName)) {
            validationErrors.email = testEmail(formData.email);
        }

        if (!formData.password.trim()) {
            validationErrors.password = 'Vui lòng nhập mật khẩu';
        } else if (testPassword(formData.password)) {
            validationErrors.password = testPassword(formData.password);
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            userLogin(formData).then((data) => {
                if (data?.data.status !== 1) {
                    alert(data?.data.message);
                }
            });
        }
    };

    // useEffect(() => {
    //     if (data?.userInfo) {
    //         console.log(4444, data?.userInfo[0]);
    //         localStorage.setItem('user_profile', JSON.stringify(data?.userInfo[0]));
    //         localStorage.setItem('id_user', data?.userInfo[0].userID);

    //         dispatch(
    //             updateUserInfo({
    //                 idUser: data?.userInfo[0].userID,
    //                 userProfile: data?.userInfo[0],
    //             }),
    //         );
    //     }
    // }, [data]);

    useEffect(() => {
        // console.log(44, auth, localStorage.getItem('id_user'));
        // Navigate to home page if authenticated
        if (Object.values(auth).length !== 0) {
            // console.log(888, localStorage.getItem('id_user'));
            navigate(`${privatePath.personalResults}?type=1`);
        }
    }, [auth]);

    return (
        <BgrMain isVerticalAlignment onSubmit={handleSubmit}>
            <Header title={'đăng nhập'} />
            <Line width={'25rem'} styles={{ marginBottom: '4rem' }} />
            <ButtonCpn button1 to={'http://127.0.0.1:8000/auth/google/login?token=c3BlY2kxMjM='}>
                <FcGoogle className={cx('icon')} />
                đăng nhập với google
            </ButtonCpn>
            <p className={cx('text')}>Mẹo: Đăng nhập nhanh hơn với Google</p>
            <div className={cx('separation')}>
                <Line width={'13rem'} isLine1 />
                <p>hoặc</p>
                <Line width={'13rem'} isLine1 />
            </div>
            <div className={cx('formGroup')}>
                <label for="email">Email</label>
                <InputCpn
                    name="userName"
                    input1
                    placeholder={'Vui lòng nhập Email của bạn!'}
                    onChange={(e) => handleChange(e)}
                    value={formData.userName}
                    errMes={errors.email}
                />
            </div>
            <div className={cx('formGroup')}>
                <label for="password">Mật khẩu</label>
                <InputCpn
                    name="password"
                    typeInput="password"
                    isPassword
                    input1
                    placeholder={'Vui lòng nhập mật khẩu!'}
                    onChange={(e) => handleChange(e)}
                    value={formData.password}
                    errMes={errors.password}
                />
            </div>
            <ButtonCpn
                type="submit"
                button2
                style={{ marginTop: '2rem', width: '18rem' }}
                disabled={userLoginResponse.isLoading}
            >
                {userLoginResponse.isLoading && <LoaderIcon className={cx('loaderIcon')} />}
                <span>đăng nhập</span>
            </ButtonCpn>

            <div className={cx('authItem')}>
                <p>Bạn chưa có tài khoản?</p>
                <Link to={authPath.register} className={cx('link')}>
                    Đăng ký
                </Link>
            </div>
        </BgrMain>
    );
}

export default Login;
