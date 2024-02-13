import classNames from 'classnames/bind';
import styles from './modalStyles.module.scss';

import Button from '../Button/Button';
const cx = classNames.bind(styles);

function Modal({ isOpen = false, setOpenModal, children }) {
    const handleClick = () => {
        setOpenModal(false);
    };

    return (
        <div className={cx('modalContainer', { isOpen })}>
            <div className={cx('mainModal')} onClick={handleClick}>
                <div className={cx('modalBody')} onClick={(e) => e.stopPropagation()}>
                    {children}

                    <div className={cx('boxBtn')}>
                        <Button button2 className={cx('btn', 'btnCancel')} onClick={handleClick}>
                            Huỷ bỏ
                        </Button>
                        <Button button2 className={cx('btn')}>
                            Đồng ý
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;
