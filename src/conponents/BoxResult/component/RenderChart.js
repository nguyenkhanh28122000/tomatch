import classNames from 'classnames/bind';
import styles from '../boxResultStyles.module.scss';

import AvatarImg from '../../AvatarImg/AvatarImg';
import { bird } from '../../../acset/images';
import { useDispatch } from 'react-redux';
import { updateActivePerInfo } from '../../../store/apiSlice';
const cx = classNames.bind(styles);

function BoxChartBird({ item, className, isCancelShow = false }) {
    const dispatch = useDispatch();
    const handleClickAvt = (id) => {
        dispatch(
            updateActivePerInfo({
                isOpen: true,
                initSlidePerInfo: id,
            }),
        );
    };
    return (
        <div className={cx('chart', { [className]: className })}>
            <div className={cx('chartLayout')}>
                {item.result.map((bird, index) => {
                    const Percentage = bird.Percentage;
                    const questionType = bird.QuestionType;
                    switch (questionType) {
                        case 1:
                            return (
                                <div
                                    key={index}
                                    className={cx('chartLayoutItem')}
                                    style={{ height: `${Percentage * 4}%`, backgroundColor: '#760404' }}
                                >
                                    <span style={{ color: '#760404' }}>{`${Percentage}%`}</span>
                                </div>
                            );
                        case 2:
                            return (
                                <div
                                    key={index}
                                    className={cx('chartLayoutItem')}
                                    style={{ height: `${Percentage * 4}%`, backgroundColor: '#c0561a' }}
                                >
                                    <span style={{ color: '#c0561a' }}>{`${Percentage}%`}</span>
                                </div>
                            );
                        case 3:
                            return (
                                <div
                                    key={index}
                                    className={cx('chartLayoutItem')}
                                    style={{ height: `${Percentage * 4}%`, backgroundColor: '#0e30a7' }}
                                >
                                    <span style={{ color: '#0e30a7' }}>{`${Percentage}%`}</span>
                                </div>
                            );

                        case 4:
                            return (
                                <div
                                    key={index}
                                    className={cx('chartLayoutItem')}
                                    style={{ height: `${Percentage * 4}%`, backgroundColor: '#a117ad' }}
                                >
                                    <span style={{ color: '#a117ad' }}>{`${Percentage}%`}</span>
                                </div>
                            );
                    }
                })}
            </div>
            <div className={cx('birdBox')}>
                <AvatarImg
                    onClick={isCancelShow ? () => handleClickAvt(1) : null}
                    src={bird.eagle}
                    isEagle
                    title={'đại bàng'}
                    isBtn={isCancelShow}
                />
                <AvatarImg
                    onClick={isCancelShow ? () => handleClickAvt(2) : null}
                    src={bird.owl}
                    isOwl
                    title={'chim cú'}
                    isBtn={isCancelShow}
                />
                <AvatarImg
                    onClick={isCancelShow ? () => handleClickAvt(3) : null}
                    src={bird.peacock}
                    isPeacock
                    title={'chim công'}
                    isBtn={isCancelShow}
                />
                <AvatarImg
                    onClick={isCancelShow ? () => handleClickAvt(4) : null}
                    src={bird.dove}
                    isDove
                    title={'bồ câu'}
                    isBtn={isCancelShow}
                />
            </div>
        </div>
    );
}

export default BoxChartBird;
