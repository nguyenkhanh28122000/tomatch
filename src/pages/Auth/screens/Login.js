import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from '../styles/authStyles.module.scss';

import { BgrMain } from '../../../conponents';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { InputCpn, ButtonCpn, Header, Line } from '../../../conponents';

import { testEmail, testPassword } from '../../../hooks/hocks';
import { authPath } from '../../../Router/paths';

const cx = classNames.bind(styles);

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

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
        // if (!formData.username.trim()) {
        //     validationErrors.username = 'username is required';
        // }

        if (!formData.email.trim()) {
            validationErrors.email = 'Vui lòng nhập Email';
        } else if (testEmail(formData.email)) {
            validationErrors.email = testEmail(formData.email);
        }

        if (!formData.password.trim()) {
            validationErrors.password = 'Vui lòng nhập mật khẩu';
        } else if (testPassword(formData.password)) {
            validationErrors.password = testPassword(formData.password);
        }

        // if (formData.confirmPassword !== formData.password) {
        //     validationErrors.confirmPassword = 'password not matched';
        // }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log(formData);
        }
    };

    return (
        <BgrMain isVerticalAlignment onSubmit={handleSubmit}>
            <Header title={'đăng nhập'} />
            <Line width={'25rem'} styles={{ marginBottom: '4rem' }} />
            <ButtonCpn button1>
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
                    name="email"
                    input1
                    placeholder={'Vui lòng nhập Email của bạn!'}
                    onChange={(e) => handleChange(e)}
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
