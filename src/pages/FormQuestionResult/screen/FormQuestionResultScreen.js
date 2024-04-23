import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from '../styles/questionStyles.module.scss';

import { BackBtn, BgrMain, Pagination, AvatarImg, BoxInput, Line, Header, LoaderIcon } from '../../../conponents';
import QuestionBiscCompResult from '../component/QuestionBiscCompResult';
import { bird } from '../../../acset/images';

import { useGetExamResultDetailQuery } from '../../../store/api';

const cx = classNames.bind(styles);

const RenderBird = ({ questionType }) => {
    switch (questionType) {
        case 1:
            return (
                <AvatarImg
                    classname={cx('resultBird')}
                    classNameTitle={cx('titleResutl')}
                    src={bird.eagle}
                    isEagle
                    title={'ĐẠI BÀNG'}
                />
            );
        case 2:
            return (
                <AvatarImg
                    classname={cx('resultBird')}
                    classNameTitle={cx('titleResutl')}
                    src={bird.owl}
                    isOwl
                    title={'CHIM CÚ'}
                />
            );
        case 3:
            return (
                <AvatarImg
                    classname={cx('resultBird')}
                    classNameTitle={cx('titleResutl')}
                    src={bird.peacock}
                    isPeacock
                    title={'CHIM CÔNG'}
                />
            );
        case 4:
            return (
                <AvatarImg
                    classname={cx('resultBird')}
                    classNameTitle={cx('titleResutl')}
                    src={bird.dove}
                    isDove
                    title={'BỒ CÂU'}
                />
            );
    }
};

function DetailResultScreen() {
    const { idGroup, idExam } = useParams();
    const location = useLocation();
    const { data, isLoading } = useGetExamResultDetailQuery({ idExam, idGroup });

    const [coinsData, setCoinsData] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage, setPostsPerPage] = useState(5);

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
            <RenderBird questionType={location.state.questionType} />
            <div className={cx('DetailResultContainer')}>
                {idGroup && data?.data && (
                    <BoxInput
                        email={data?.data.Email}
                        name={data?.data.Name}
                        styles={{ marginTop: '-5rem' }}
                        isDistabled
                    />
                )}
                {datas?.map((question, index) => {
                    return (
                        <QuestionBiscCompResult
                            key={question.QuestionID}
                            id={index + (currentPage - 1) * postsPerPage}
                            question={question.Description}
                            result={question.Answer}
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
export { RenderBird };
