import { useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from '../Styles/useCompStyles.module.scss';

import { CiEdit } from 'react-icons/ci';
import { useState } from 'react';

const cx = classNames.bind(styles);

function InfoItem({ keyValue, title, value, setValue, isEmail }) {
    const [openEdit, setOpenEdit] = useState(true);
    const refElement = useRef(null);

    const handleChange = (e) => {
        setValue((prev) => {
            return {
                ...prev,
                [keyValue]: e.target.value,
            };
        });
    };

    useEffect(() => {
        if (openEdit === false) {
            refElement.current.focus();
        }
    }, [openEdit]);

    return (
        <div className={cx('infoItemContainer')}>
            <div className={cx('boxTitle')}>
                <h3>{title}</h3>
            </div>
            {isEmail ? (
                <p>{value}</p>
            ) : (
                <input
                    ref={refElement}
                    type="text"
                    disabled={openEdit}
                    value={value}
                    onChange={(e) => handleChange(e)}
                />
            )}

            <CiEdit
                className={cx('icon', { isEmail })}
                onClick={() => {
                    setOpenEdit(false);
                }}
            />
        </div>
    );
}

export default InfoItem;
