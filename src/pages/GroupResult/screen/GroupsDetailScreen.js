import { useState } from 'react';
import classNames from 'classnames/bind';
import styles from '../styles/detailResultStyles.module.scss';

import {
    BackBtn,
    BgrMain,
    Header,
    Line,
    BoxSelectBird,
    BoxResultBeck,
    AvatarImg,
    NotDataIcon,
} from '../../../conponents';
import { useGetGroupInfomationDetailQuery, usePrefetch } from '../../../store/api';
import { useParams } from 'react-router-dom';
import ItemTable from '../components/ItemTable';

import { bird } from '../../../acset/images';

const cx = classNames.bind(styles);

const RenderResultPer = ({ BiscResult, BeckResult, characterSelect, setCharacterSelect }) => {
    return (
        <div className={cx('resultPerContainer')}>
            <div className={cx('boxResultMain')}>
                <h3>kết quả đánh gía mới nhất của bạn</h3>
                <div className={cx('resultBody')}>
                    <div className={cx('boxDisc')}>
                        <p className={cx('title')}>DISC</p>
                        {!BiscResult ? (
                            <NotDataIcon pl={'1rem'} />
                        ) : (
                            BiscResult.map((result, index) => {
                                const Percentage = result.Percentage;
                                const questionType = result.QuestionType;
                                switch (questionType) {
                                    case 1:
                                        return (
                                            <div className={cx('birdResult')} key={index}>
                                                <AvatarImg
                                                    classname={cx('bird')}
                                                    src={bird.eagle}
                                                    isEagle
                                                    value={Percentage}
                                                />
                                            </div>
                                        );
                                    case 2:
                                        return (
                                            <div className={cx('birdResult')} key={index}>
                                                <AvatarImg
                                                    classname={cx('bird')}
                                                    src={bird.owl}
                                                    isOwl
                                                    value={Percentage}
                                                />
                                            </div>
                                        );
                                    case 3:
                                        return (
                                            <div className={cx('birdResult')} key={index}>
                                                <AvatarImg
                                                    classname={cx('bird')}
                                                    src={bird.peacock}
                                                    isPeacock
                                                    value={Percentage}
                                                />
                                            </div>
                                        );
                                    case 4:
                                        return (
                                            <div className={cx('birdResult')} key={index}>
                                                <AvatarImg
                                                    classname={cx('bird')}
                                                    src={bird.dove}
                                                    isDove
                                                    value={Percentage}
                                                />
                                            </div>
                                        );
                                }
                            })
                        )}
                    </div>
                    <Line width={'100%'} />
                    <div className={cx('boxBeck')}>
                        <p className={cx('title')}>BECK</p>
                        {!BeckResult ? (
                            <NotDataIcon pl={'1rem'} />
                        ) : (
                            <BoxResultBeck
                                item={{
                                    Percentage: BeckResult,
                                }}
                                isBoxGroup
                                className={cx('body')}
                            />
                        )}
                    </div>
                </div>
            </div>

            <BoxSelectBird setCharacterSelect={setCharacterSelect} characterSelect={characterSelect} />
        </div>
    );
};

function GroupsDetailScreen() {
    const { idGroup } = useParams();
    const [characterSelect, setCharacterSelect] = useState(1);

    const { data } = useGetGroupInfomationDetailQuery(idGroup);

    return (
        <BgrMain className={cx('container')} isHomeScreen isVerticalAlignment>
            <div className={cx('boxHeader')}>
                <BackBtn />
                <Header title={'kết quả thành viên nhóm'} />
                <Line width={'500px'} isLine1 />
            </div>

            <main className={cx('table')}>
                <RenderResultPer
                    BiscResult={data?.data?.userResult.DISC}
                    BeckResult={data?.data?.userResult.BECK}
                    characterSelect={characterSelect}
                    setCharacterSelect={setCharacterSelect}
                />
                <section className={cx('mainTable')}>
                    {!data?.data?.groupResult ? (
                        <NotDataIcon isMaxSize isCenter title="Không có dữ liệu của thành viên" />
                    ) : (
                        <table className={cx('contentTable')}>
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Thông tin thành viên</th>
                                    <th>
                                        <p>Kết quả trách nghiệm tính cách</p>
                                        <p>DISC</p>
                                    </th>
                                    <th>
                                        <p>Kết quả trách nghiệm tâm lý</p>
                                        <p>BECK</p>
                                    </th>
                                    <th>Độ tương thích</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data?.data.groupResult.map((result, index) => {
                                    return (
                                        <ItemTable
                                            key={index}
                                            data={result}
                                            charaterActive={characterSelect}
                                            id={index + 1}
                                            groupId={idGroup}
                                        />
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </section>
            </main>
        </BgrMain>
    );
}

export default GroupsDetailScreen;
