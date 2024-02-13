import classNames from 'classnames/bind';
import styles from './paginationStyles.module.scss';
import Button from '../Button/Button';

import { MdOutlineArrowBackIos } from 'react-icons/md';

const cx = classNames.bind(styles);

const Pagination = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }

    const handleClickBtn = (key) => {
        if (typeof key === 'number') {
            setCurrentPage(key);
        } else {
            if (key === 'back') {
                setCurrentPage(currentPage - 1);
            } else {
                setCurrentPage(currentPage + 1);
            }
        }
    };

    return (
        <div className={cx('pagination')}>
            <Button
                button3
                className={cx('btnPage', 'btnBack')}
                disabled={currentPage === 1}
                onClick={() => handleClickBtn('back')}
            >
                <MdOutlineArrowBackIos />
            </Button>
            {pages.map((page, index) => {
                return (
                    <Button
                        button1
                        key={index}
                        onClick={() => handleClickBtn(page)}
                        className={cx('btnPage', { active: page === currentPage })}
                    >
                        {page}
                    </Button>
                );
            })}
            <Button
                button3
                className={cx('btnPage', 'btnBack', 'btnNext')}
                disabled={currentPage === pages.length}
                onClick={() => handleClickBtn('next')}
            >
                <MdOutlineArrowBackIos />
            </Button>
        </div>
    );
};

export default Pagination;
