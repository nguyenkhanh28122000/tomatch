import classNames from 'classnames/bind';
import styles from './boxInputStyles.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function BoxInput({
    email = '',
    name = '',
    mesErr,
    setValueEmail,
    serErrEmail,
    className,
    styles,
    isDistabled = false,
    isCheckEmail = false,
}) {
    const [formValue, setFormValue] = useState({
        email,
        name,
    });

    const clases = cx('boxInputContainer', {
        [className]: className,
    });

    useEffect(() => {
        if (setValueEmail) {
            setValueEmail(formValue);
        }
    }, [formValue]);

    return (
        <div className={clases} style={styles}>
            <h3>Tên của bạn:</h3>
            <input
                name="nameUser"
                value={formValue.name}
                onChange={(e) => setFormValue({ ...formValue, name: e.target.value })}
                disabled={isDistabled}
            />
            <h3>
                Email của bạn: <span>*</span>
            </h3>
            <input
                name="emailUser"
                className={cx(mesErr && 'err')}
                value={formValue.email}
                onChange={(e) => {
                    setFormValue({ ...formValue, email: e.target.value });
                    serErrEmail({});
                }}
                disabled={isDistabled}
                // placeholder="*"
            />
            {isCheckEmail && { mesErr } && <span className={cx('mesErr')}>{mesErr}</span>}
        </div>
    );
}

export default BoxInput;
