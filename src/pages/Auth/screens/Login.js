import { useState, useEffect } from 'react';

import classNames from 'classnames/bind';
import styles from '../styles/authStyles.module.scss';

import { BgrMain } from '../../../conponents';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { InputCpn, ButtonCpn, Header, Line } from '../../../conponents';

import { testEmail, testPassword } from '../../../hooks/hocks';
import { authPath } from '../../../Router/paths';

import { useUserLoginMutation } from '../../../store/api';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '../../../store/apiSlice';

import { privatePath } from '../../../Router/paths';

const cx = classNames.bind(styles);

function Login() {
    const navigate = useNavigate();
    const location = useLocation();

    const [formData, setFormData] = useState({
        userName: location.state?.email ? location.state?.email : '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const [userLogin] = useUserLoginMutation();
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
                console.log(99, data);
                if (data?.data.status !== 1) {
                    alert(data?.data.message);
                }
            });
        }
    };

    useEffect(() => {
        // Navigate to home page if authenticated
        if (auth?.UserID) {
            navigate(privatePath.personalResults);
        }
    }, [auth]);

    return (
        <BgrMain isVerticalAlignment onSubmit={handleSubmit}>
            <Header title={'đăng nhập'} />
            <Line width={'25rem'} styles={{ marginBottom: '4rem' }} />
            <ButtonCpn button1 to={'http://127.0.0.1:8000/auth/google/login'}>
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
            <ButtonCpn type="submit" button2 style={{ marginTop: '2rem', width: '18rem' }}>
                đăng nhập
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
