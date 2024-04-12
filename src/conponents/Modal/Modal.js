import classNames from 'classnames/bind';
import styles from './modalStyles.module.scss';

import { GrClose } from 'react-icons/gr';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { updateActivePerInfo } from '../../store/apiSlice';
const cx = classNames.bind(styles);

function Modal({
    className,
    isOpen = false,
    setOpenModal,
    onOk,
    children,
    isBtnCancel = true,
    isBtnOk = true,
    textBtnOk,
}) {
    const dispatch = useDispatch();
    const handleClickCancel = () => {
        if (!setOpenModal) {
            dispatch(
                updateActivePerInfo({
                    isOpen: false,
                    initSlidePerInfo: 4,
                }),
            );
        } else {
            setOpenModal(false);
        }
    };

    return (
        <div className={cx('modalContainer', { isOpen })}>
            <div className={cx('mainModal')} onClick={handleClickCancel}>
                <div className={cx('modalBody', { [className]: className })} onClick={(e) => e.stopPropagation()}>
                    {children}

                    <div className={cx('boxBtn')}>
                        {isBtnCancel ? (
                            <Button button2 className={cx('btn', 'btnCancel')} onClick={handleClickCancel}>
                                Huỷ bỏ
                            </Button>
                        ) : null}
                        {isBtnOk && (
                            <Button button2 className={cx('btn', { btnOk: !isBtnCancel })} onClick={onOk}>
                                {textBtnOk ? textBtnOk : 'Đồng ý'}
                            </Button>
                        )}
                    </div>

                    {!isBtnCancel ? <GrClose className={cx('btnClose')} onClick={handleClickCancel} /> : null}
                </div>
            </div>
        </div>
    );
}

export default Modal;
