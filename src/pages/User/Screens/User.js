import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from '../Styles/userStyles.module.scss';

import { BgrMain, BackBtn, AvatarImg, ButtonCpn, ModalComp, InputCpn } from '../../../conponents';
import { IoIosLogOut } from 'react-icons/io';
import InfoItem from '../Component/InfoItems';
import avatarDefault from '../../../acset/images';
import { authPath } from '../../../Router/paths';

import { selectUserProfile, selectUserId, logout } from '../../../store/apiSlice';
import { useUserLogoutMutation, useUseEditPasswordMutation } from '../../../store/api';

import { testPassword } from '../../../hooks/hocks';
const cx = classNames.bind(styles);

const ModalEditPass = ({ isOpen, setOpen }) => {
    const userID = useSelector(selectUserId);
    const [formPass, setFormPass] = useState({
        oldPassword: '',
        newPassword: '',
        repeatPassword: '',
    });
    const [errors, setErrors] = useState({});

    const [userEditPass, userEditPassLoad] = useUseEditPasswordMutation();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormPass({
            ...formPass,
            [name]: value,
        });
    };

    const handelEditPass = () => {
        const validationErrors = {};
        if (!formPass.oldPassword.trim()) {
            validationErrors.oldPassword = 'Vui lòng nhập mật khẩu';
        } else if (testPassword(formPass.oldPassword)) {
            validationErrors.oldPassword = testPassword(formPass.oldPassword);
        }

        if (!formPass.newPassword.trim()) {
            validationErrors.newPassword = 'Vui lòng nhập mật khẩu';
        } else if (testPassword(formPass.newPassword)) {
            validationErrors.newPassword = testPassword(formPass.newPassword);
        }

        if (formPass.repeatPassword !== formPass.newPassword) {
            validationErrors.repeatPassword = 'Mật khẩu không trùng khớp';
        }

        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            userEditPass({
                userID,
                ...formPass,
            }).then((data) => {
                if (data?.data.status === 1) {
                    alert('Thây đổi mật khẩu thành công');
                    setOpen(false);
                } else {
                    alert(data?.data.data);
                    setFormPass({ oldPassword: '', ...formPass });
                    setErrors({ oldPassword: 'Mât khẩu của bạn không đúng' });
                }
            });
        }
    };

    return (
        <ModalComp
            isOpen={isOpen}
            setOpenModal={setOpen}
            onOk={handelEditPass}
            textBtnOk={'Đổi mật khẩu'}
            className={cx('modalEditPass')}
        >
            <div className={cx('formGroup')}>
                <label for="oldPassword">Mật khẩu cũ</label>
                <InputCpn
                    name="oldPassword"
                    typeInput="password"
                    isPassword
                    input1
                    placeholder={'Vui lòng nhập mật khẩu hiện tại!'}
                    onChange={(e) => handleChange(e)}
                    value={formPass.oldPassword}
                    errMes={errors.oldPassword}
                />
            </div>
            <div className={cx('formGroup')}>
                <label for="newPassword">Mật khẩu mới</label>
                <InputCpn
                    name="newPassword"
                    typeInput="password"
                    isPassword
                    input1
                    placeholder={'Vui lòng nhập mật khẩu mới!'}
                    onChange={(e) => handleChange(e)}
                    value={formPass.newPassword}
                    errMes={errors.newPassword}
                />
            </div>
            <div className={cx('formGroup')}>
                <label for="repeatPassword">Nhập lại mật khẩu</label>
                <InputCpn
                    name="repeatPassword"
                    typeInput="password"
                    isPassword
                    input1
                    placeholder={'Vui lòng nhập lại mật khẩu!'}
                    onChange={(e) => handleChange(e)}
                    value={formPass.repeatPassword}
                    errMes={errors.repeatPassword}
                />
            </div>
        </ModalComp>
    );
};

function UserScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const useInfomation = useSelector(selectUserProfile);

    const [openLogout, setOpenLogout] = useState(false);
    const [openEditPass, setOpenEditPass] = useState(false);

    const [userLogout] = useUserLogoutMutation();

    const [valueUser, setValueUser] = useState({
        name: useInfomation.FullName,
        dateOfBirth: useInfomation.DateOfBirth,
    });

    const handelLogout = () => {
        userLogout().then((data) => {
            if (data?.data?.status === 1) {
                navigate(authPath.login);
            }
        });
        localStorage.clear();
        dispatch(logout);
    };

    console.log(valueUser);

    return (
        <BgrMain isHomeScreen isVerticalAlignment>
            <BackBtn />

            <AvatarImg src={avatarDefault} classname={cx('avatar')} />
            <div className={cx('boxBtn')}>
                <ButtonCpn button1 className={cx('btn')} onClick={() => setOpenEditPass(true)}>
                    Đổi mật khẩu
                </ButtonCpn>
                <ButtonCpn button1 className={cx('btn', 'btnRed')} onClick={() => setOpenLogout(true)}>
                    <span>Logout</span>
                    <IoIosLogOut className={cx('icon')} />
                </ButtonCpn>
            </div>

            <InfoItem title={'Tên của bạn'} value={valueUser.name} setValue={setValueUser} keyValue="name" />
            <InfoItem title={'Email của bạn'} value={useInfomation.UserName} isEmail />
            <InfoItem
                title={'Ngày sinh'}
                value={valueUser.dateOfBirth}
                setValue={setValueUser}
                keyValue="dateOfBirth"
            />
            {openLogout && (
                <ModalComp isOpen={openLogout} setOpenModal={setOpenLogout} onOk={handelLogout} textBtnOk={'Logout'}>
                    <p className={cx('titleLogoutModal')}>
                        <span>Đăng xuất</span> khỏi ứng dụng?
                    </p>
                </ModalComp>
            )}
            {openEditPass && <ModalEditPass isOpen={openEditPass} setOpen={setOpenEditPass} />}
        </BgrMain>
    );
}

export default UserScreen;
