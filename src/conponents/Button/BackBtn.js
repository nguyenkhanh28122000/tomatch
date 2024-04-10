import { useNavigate } from 'react-router';
import classNames from 'classnames/bind';
import styles from './buttonStyles.module.scss';

import { MdArrowBackIos } from 'react-icons/md';
import Button from './Button';

const cx = classNames.bind(styles);

function BackBtn() {
    const navigate = useNavigate();
    return (
        <Button onClick={() => navigate(-1)} className={cx('backBtn')}>
            <MdArrowBackIos className={cx('iconBack')} />
            back
        </Button>
    );
}

export default BackBtn;
