import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './paginationStyles.module.scss';
import Button from '../Button/Button';

import { MdOutlineArrowBackIos } from 'react-icons/md';

const cx = classNames.bind(styles);

const Pagination = ({
    className,
    isFixedBottom,
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
    isPagination2,
}) => {
    const [currentInput, setCurrentInput] = useState(1);

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
                setCurrentInput(currentInput - 1);
            } else {
                setCurrentPage(currentPage + 1);
                setCurrentInput(currentInput + 1);
            }
        }
    };

    const handleBlur = () => {
        if (currentInput.length === 0 || currentInput === 0) {
            setCurrentInput(1);
            setCurrentPage(1);
        } else if (currentInput > pages.length) {
            setCurrentInput(pages.length);
            setCurrentPage(pages.length);
        } else {
            setCurrentPage(currentInput);
        }
    };

    useEffect(() => {
        const handlePressKey = (e) => {
            if (e.keyCode == 13) {
                if (currentInput.length === 0 || currentInput === 0) {
                    setCurrentInput(1);
                    setCurrentPage(1);
                } else if (currentInput > pages.length) {
                    setCurrentInput(pages.length);
                    setCurrentPage(pages.length);
                } else {
                    setCurrentPage(currentInput);
                }
            }
        };
        window.addEventListener('keyup', handlePressKey);

        return () => {
            window.removeEventListener('keyup', handlePressKey);
        };
    }, [currentInput]);

    return (
        <div className={cx('pagination', { isFixedBottom, [className]: className })}>
            {!!totalPosts && (
                <>
                    <Button
                        button3
                        className={cx('btnPage', 'btnBack')}
                        disabled={currentPage === 1}
                        onClick={() => handleClickBtn('back')}
                    >
                        <MdOutlineArrowBackIos />
                    </Button>
                    {isPagination2 ? (
                        <div className={cx('containerPaginationInput')}>
                            <input
                                className={cx('input')}
                                type="number"
                                min={1}
                                value={currentInput}
                                onChange={(e) => {
                                    if (e.target.value.length === 0) {
                                        setCurrentInput(e.target.value);
                                    } else {
                                        setCurrentInput(Number(e.target.value));
                                    }
                                }}
                                onBlur={handleBlur}
                            />
                            /<p>{pages.length}</p>
                        </div>
                    ) : (
                        pages.map((page, index) => {
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
                        })
                    )}
                    <Button
                        button3
                        className={cx('btnPage', 'btnBack', 'btnNext')}
                        disabled={currentPage === pages.length}
                        onClick={() => handleClickBtn('next')}
                    >
                        <MdOutlineArrowBackIos />
                    </Button>
                </>
            )}
        </div>
    );
};

export default Pagination;
