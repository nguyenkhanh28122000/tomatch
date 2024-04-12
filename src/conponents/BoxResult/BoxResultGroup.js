import { Link, useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './boxResultStyles.module.scss';
import BoxCompatibility from './component/RenderCompatibility';

import { findMax } from '../../hooks/hocks';
import BoxChartBird from './component/RenderChart';
import BoxResultBeck from '../BoxResultBeck/BoxResultBeck';
import Header from '../Header/Header';
import Line from '../Line/Line';

import { getlistBirdPeople } from '../../hooks/hocks';
import NotDataIcon from '../NotDataIcon/NotDataIcon';
import Button from '../Button/Button';

const cx = classNames.bind(styles);

const RenderHeaderTest = ({ type, idGroup, idExam, questionType = null }) => {
    const navigate = useNavigate();
    let title;
    if (type === 1) {
        title = 'KẾT QUẢ BÀI ĐÁNH GIÁ DISC';
    }

    if (type === 2) {
        title = 'KẾT QUẢ BÀI ĐÁNH GIÁ BECK';
    }

    const handleClick = () => {
        if (type == 1) {
            navigate(`/group-results/${idGroup}/detail-personality/${idExam}`, {
                state: { questionType: questionType },
            });
        } else {
            navigate(`/group-results/${idGroup}/detail-psychological/${idExam}`);
        }
    };
    return (
        <div className={cx('headerContainer')}>
            <div className={cx('boxHeader')}>
                <Header title={title} className={cx('header')} />
                {idExam && (
                    <>
                        <Line styles={{ height: '3rem' }} width={'2px'} />
                        <Button className={cx('btn')} button3 onClick={handleClick}>
                            Chi tiết
                        </Button>
                    </>
                )}
            </div>
            <Line width={'100%'} styles={{ margin: '1rem auto' }} />
        </div>
    );
};

function BoxResultGroup({ item, idGroup }) {
    return (
        <div className={cx('main', 'mainResultGroup')}>
            <div className={cx('info')}>
                <p className={cx('title')}>mức độ tương thích với bạn</p>
                <BoxCompatibility
                    birdSelect={1}
                    itemPeople={{
                        idItem: 1,
                        listBirdPeople: getlistBirdPeople(item.DISC?.Percentage),
                    }}
                />
            </div>
            <div className={cx('contentMain')}>
                <RenderHeaderTest
                    type={1}
                    idGroup={idGroup}
                    idExam={item.PersonalResultID_DISC}
                    questionType={findMax(item.DISC?.Percentage, 'Percentage')?.QuestionType}
                />
                {!item.DISC ? (
                    <NotDataIcon isCenter />
                ) : (
                    <BoxChartBird
                        className={cx('chart')}
                        item={{
                            result: item.DISC.Percentage,
                        }}
                    />
                )}
                <RenderHeaderTest type={2} idGroup={idGroup} idExam={item.PersonalResultID_BECK} />
                {!item.BECK ? (
                    <NotDataIcon isCenter />
                ) : (
                    <BoxResultBeck
                        item={{
                            Percentage: item.BECK.Percentage,
                        }}
                        isBoxGroup
                        className={cx('beck')}
                    />
                )}
            </div>
            <div className={cx('boxDate')}>
                <p>Ngày hoàn thành: {item.CreatedDate.split(' ')[0]}</p>
                <p>* Kết luật trên dựa trên bài đánh giá của bạn</p>
            </div>
        </div>
    );
}

export default BoxResultGroup;
