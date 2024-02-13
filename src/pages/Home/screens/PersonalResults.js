import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from '../styles/resultScreenStyles.module.scss';
import { BoxResult, Pagination } from '../../../conponents';
import { fakeResults } from '../../../acset/dataRender';
const cx = classNames.bind(styles);

function PersonalResults() {
    const [coinsData, setCoinsData] = useState(fakeResults);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);

    console.log(11, currentPage);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    let datas = coinsData.slice(firstPostIndex, lastPostIndex);

    console.log(datas);
    return (
        <>
            <div className={cx('container')}>
                {datas.map((item, index) => {
                    return <BoxResult key={index} item={item} />;
                })}
            </div>
            <Pagination
                totalPosts={coinsData.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            />
        </>
    );
}

export default PersonalResults;
