import { useEffect, useState } from 'react';

import classNames from 'classnames/bind';
import styles from './boxResultBeck.module.scss';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const renderData = (point, classify) => {
    if (point <= 13) {
        return {
            title: 'Bạn không có biểu hiện bất thường gì !!!',
            diagnostic: null,
            note: false,
            classStyle: 'style1',
        };
    }
    if (point > 13 && point <= 19) {
        return {
            title: 'Bạn đang có biểu hiện: TRẦM CẢM NHẸ.',
            diagnostic: classify,
            note: false,
            classStyle: 'style2',
        };
    }

    if (point > 19 && point <= 29) {
        return {
            title: 'Bạn đang có biểu hiện: TRẦM CẢM VỪA',
            diagnostic: classify,
            note: true,
            classStyle: 'style3',
        };
    }
    if (point >= 30) {
        return {
            title: 'Bạn đang có biểu hiện: TRẦM CẢM NẶNG',
            diagnostic: classify,
            note: true,
            classStyle: 'style4',
        };
    }
};

function BoxResultBeck({ item, isBoxGroup = false, className }) {
    const navigate = useNavigate();
    const [dataRender, setDataRender] = useState({
        title: null,
        diagnostic: null,
        note: false,
        classStyle: '',
    });

    const handleClick = () => {
        navigate(`/personal-results/psychological-detail/${item.PersonalResultID}?type=2`);
    };

    useEffect(() => {
        if (item.Percentage) {
            const data = renderData(item.Percentage.Total, item.Percentage.Classify);
            setDataRender(data);
        }
    }, [item]);

    return (
        <div
            className={cx('boxBeckResult', dataRender?.classStyle, {
                [className]: className,
            })}
            onClick={handleClick}
        >
            {isBoxGroup || (
                <div className={cx('titleInfo')}>
                    <h3>{`bài đánh giá ${item.nameGroup ? item.nameGroup : 'cá nhân'}`}</h3>
                    <p>{item.CreatedDate.split(' ')[0]}</p>
                </div>
            )}

            {dataRender?.title && (
                <div className={cx('container', isBoxGroup && 'isFormGroup')}>
                    <p className={cx('title')}>{dataRender.title}</p>
                    {dataRender?.diagnostic !== null && (
                        <p className={cx('titleClsy')}>{`Có dấu hiệu trầm cảm ${
                            dataRender?.diagnostic === 0 ? 'nội sinh' : 'tâm can'
                        }`}</p>
                    )}
                    {dataRender?.note && <span>*Nên tham khoả ý kiến bác sĩ</span>}
                </div>
            )}
        </div>
    );
}

export default BoxResultBeck;
