import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from '../styles/resultScreenStyles.module.scss';

import { Pagination, ButtonCpn } from '../../../conponents';
import { fakeResultGroups } from '../../../acset/dataRender';
const cx = classNames.bind(styles);

function GroupResults() {
    const [coinsData, setCoinsData] = useState(fakeResultGroups);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(6);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    let datas = coinsData.slice(firstPostIndex, lastPostIndex);

    return (
        <>
            <div className={cx('container', 'groupContainer')}>
                {datas.map((item, index) => {
                    return (
                        <ButtonCpn key={index} button1 className={cx('itemBody')}>
                            <h3>{item.nameGroup}</h3>
                            <div className={cx('boxInfo')}>
                                <p className={cx('completePeople')}>
                                    số người làm: <span>{`${item.totalComplete}/${item.total}`}</span>
                                </p>
                                <p className={cx('date')}>{item.dateCreate}</p>
                            </div>
                        </ButtonCpn>
                    );
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

export default GroupResults;
