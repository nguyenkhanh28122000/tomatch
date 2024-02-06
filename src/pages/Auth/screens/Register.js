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

function Register() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
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
        if (!formData.username.trim()) {
            validationErrors.username = 'Vui lòng nhập tên của bạn';
        }

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

        if (formData.confirmPassword !== formData.password) {
            validationErrors.confirmPassword = 'Mật khẩu không trùng khớp';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log(formData);
        }
    };

    return (
        <BgrMain isVerticalAlignment onSubmit={handleSubmit} className={cx('formRegister')}>
            <Header title={'đăng ký'} />
            <Line width={'25rem'} styles={{ marginBottom: '3rem' }} />
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
                <label for="username">Tên người dùng</label>
                <InputCpn
                    name="username"
                    input1
                    placeholder={'Vui lòng nhập tên của bạn!'}
                    onChange={(e) => handleChange(e)}
                    errMes={errors.username}
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
            <div className={cx('formGroup')}>
                <label for="confirmPassword">Nhập lại mật khẩu</label>
                <InputCpn
                    name="confirmPassword"
                    typeInput="password"
                    isPassword
                    input1
                    placeholder={'Vui lòng nhập lại mật khẩu!'}
                    onChange={(e) => handleChange(e)}
                    errMes={errors.confirmPassword}
                />
            </div>
            <ButtonCpn type="submit" button2 style={{ marginTop: '2rem', width: '18rem' }}>
                đăng nhập
            </ButtonCpn>

            <div className={cx('authItem')}>
                <p>Bạn đã có tài khoản?</p>
                <Link to={authPath.login} className={cx('link')}>
                    Đăng nhập
                </Link>
            </div>
        </BgrMain>
    );
}

export default Register;
