import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from '../styles/detailResultStyles.module.scss';

import { BackBtn, BgrMain, Pagination, AvatarImg, BoxInput } from '../../../conponents';
import QuestionCompResult from '../components/QuestionCompResult';
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
    const { data } = useGetExamResultDetailQuery({ idExam, idGroup });

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

    return (
        <BgrMain isHomeScreen isAlignCenter isVerticalAlignment className={cx('detailResultMain')}>
            <BackBtn />
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
                        <QuestionCompResult
                            key={question.QuestionID}
                            id={index + (currentPage - 1) * postsPerPage}
                            question={question.Description}
                            result={question.Answer}
                        />
                    );
                })}

                <Pagination
                    isFixedBottom
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
