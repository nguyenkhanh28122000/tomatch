import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './inputStyles.module.scss';

import { FaRegEye } from 'react-icons/fa';
import { FaRegEyeSlash } from 'react-icons/fa';
import { useState } from 'react';

const cx = classNames.bind(styles);

function Input({
    className,
    placeholder,
    input1 = false,
    onChange,
    onFocus,
    name,
    typeInput = 'text',
    isPassword = false,
    errMes = null,
}) {
    const [showPass, setShowPass] = useState(false);
    const [type, setType] = useState(typeInput);
    const clases = cx('container', { [className]: className, activeErr: !!errMes, input1 });

    const handleClick = () => {
        setShowPass(!showPass);
        setType(() => {
            if (type === 'text') {
                return 'password';
            }
            return 'text';
        });
    };

    return (
        <div className={clases}>
            <div className={cx('boxMain')}>
                <input
                    className={cx('main')}
                    placeholder={placeholder}
                    onChange={onChange}
                    onFocus={onFocus}
                    name={name}
                    type={type}
                />
                {isPassword ? (
                    <>
                        {showPass ? (
                            <FaRegEye className={cx('icon')} onClick={handleClick} />
                        ) : (
                            <FaRegEyeSlash className={cx('icon')} onClick={handleClick} />
                        )}
                    </>
                ) : null}
            </div>
            <span className={cx('mesErr')}>{errMes}</span>
        </div>
    );
}

Input.propTypes = {
    input1: PropTypes.bool,
};

export default Input;
