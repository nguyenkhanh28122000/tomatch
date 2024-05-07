import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from '../styles/resultScreenStyles.module.scss';
import { Pagination } from '../../../conponents';

import DiscResults from '../components/TestDiscResults';
import BeckResults from '../components/TestBeckResults';
const cx = classNames.bind(styles);

function PersonalResults() {
    const [searchParams, getSearchParams] = useSearchParams();
    const [totalResult, setTotalResult] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);
    console.log(totalResult);
    if (!JSON.parse(localStorage.getItem('is_login'))) {
        return <div className={cx('boxNotLogin')}>Vui long đăng nhập để xem kết quả của bạn !!!</div>;
    }

    return (
        <>
            <div className={cx('container', Number(searchParams.get('type')) === 2 && 'beckContainer')}>
                {Number(searchParams.get('type')) === 1 && (
                    <DiscResults
                        currentPage={currentPage}
                        postsPerPage={postsPerPage}
                        setTotalResult={setTotalResult}
                    />
                )}
                {Number(searchParams.get('type')) === 2 && (
                    <BeckResults
                        currentPage={currentPage}
                        postsPerPage={postsPerPage}
                        setTotalResult={setTotalResult}
                    />
                )}
            </div>
            <Pagination
                totalPosts={totalResult}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>
    );
}

export default PersonalResults;
