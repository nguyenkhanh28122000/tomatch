import { useNavigate } from 'react-router-dom';

import classNames from 'classnames/bind';
import styles from './boxResultStyles.module.scss';
import Button from '../Button/Button';
import { findMax } from '../../hooks/hocks';
import BoxChartBird from './component/RenderChart';

const cx = classNames.bind(styles);

function BoxResult({ item, setIdActive }) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/personal-results/personality-detail/${item.id}?type=1`, {
            state: { questionType: findMax(item.result, 'Percentage').QuestionType },
        });
    };

    return (
        <div className={cx('main')}>
            <div className={cx('info')}>
                <div className={cx('titleInfo')}>
                    <h3>{`bài đánh giá ${item.nameGroup ? item.nameGroup : 'cá nhân'}`}</h3>
                    <p>{item.time.split(' ')[0]}</p>
                </div>

                <>
                    <p className={cx('titleTotal')}>
                        Số lựa chọn <span>PHÙ HỢP</span>
                    </p>
                    <p className={cx('total')}>{`${item.totalTrueAnswer}/80`}</p>
                    <p className={cx('titleTotal')}>
                        Số lựa chọn <span style={{ color: '#AF0606' }}>CHƯA PHÙ HỢP</span>
                    </p>
                    <p className={cx('total')}>{`${item.totalFalseAnswer}/80`}</p>
                </>

                <Button button1 className={cx('btn')} onClick={handleClick}>
                    Xem chi tiết
                </Button>
            </div>
            <BoxChartBird item={item} isCancelShow={true} />
        </div>
    );
}

export default BoxResult;
