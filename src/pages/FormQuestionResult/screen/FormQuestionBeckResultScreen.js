import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from '../styles/questionStyles.module.scss';

import { BackBtn, BgrMain, Pagination, BoxInput, Line, Header, LoaderIcon } from '../../../conponents';
import QuestionBeckCompResult from '../component/QuestionBeckCompResult';

import { useGetExamResultDetailQuery } from '../../../store/api';

const cx = classNames.bind(styles);

function DetailResultScreen() {
    const { idGroup, idExam } = useParams();
    const { data, isLoading } = useGetExamResultDetailQuery({ idExam, idGroup });

    const [coinsData, setCoinsData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(1);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    let datas = coinsData?.slice(firstPostIndex, lastPostIndex);

    useEffect(() => {
        if (data?.data) {
            setCoinsData(data?.data?.Result);
        }
    }, [data]);

    if (isLoading) {
        return <LoaderIcon title={'Đang tải dữ liệu'} center sizeBig />;
    }

    return (
        <BgrMain isHomeScreen isAlignCenter isVerticalAlignment className={cx('detailResultMain')}>
            <BackBtn />
            <div className={cx('header')}>
                <Header title={'chi tiết bài đánh giá'} header2 className={cx('title')} />
                <Line isShadow isLine1 width={'50rem'} styles={{ marginTop: '-1rem' }} />
            </div>
            <div className={cx('DetailResultContainer')}>
                {idGroup && data?.data && (
                    <BoxInput
                        email={data?.data.Email}
                        name={data?.data.Name}
                        styles={{ marginTop: '-2rem' }}
                        isDistabled
                    />
                )}
                {datas?.map((question, index) => {
                    return (
                        <QuestionBeckCompResult
                            question={question.Description}
                            id={question.SortOrder}
                            answer={question.SelectID}
                        />
                    );
                })}

                <Pagination
                    isFixedBottom
                    isPagination2
                    totalPosts={coinsData?.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </div>
        </BgrMain>
    );
}

export default DetailResultScreen;
