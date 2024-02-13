import classNames from 'classnames/bind';
import styles from './boxResultStyles.module.scss';
import AvatarImg from '../AvatarImg/AvatarImg';

import { bird } from '../../acset/images';
import Button from '../Button/Button';
const cx = classNames.bind(styles);

function BoxResult({ item }) {
    return (
        <div className={cx('main')}>
            <div className={cx('info')}>
                <div className={cx('titleInfo')}>
                    <h3>{`bài test ${item.nameGroup ? item.nameGroup : 'cá nhân'}`}</h3>
                    <p>{item.time}</p>
                </div>
                <p className={cx('titleTotal')}>
                    số câu trả lời <span>đúng</span>:
                </p>
                <p className={cx('total')}>{`${item.totalYes}/80`}</p>
                <p className={cx('titleTotal')}>
                    số câu trả lời <span style={{ color: '#AF0606' }}>sai</span>:
                </p>
                <p className={cx('total')}>{`${item.totalNo}/80`}</p>
                <Button button1 to={'/personal-results'} className={cx('btn')}>
                    Xem chi tiết
                </Button>
            </div>
            <div className={cx('chart')}>
                <div className={cx('chartLayout')}>
                    <div
                        className={cx('chartLayoutItem')}
                        style={{ height: item.eaglePercent, backgroundColor: '#760404' }}
                    >
                        <span style={{ color: '#760404' }}>{item.eaglePercent}</span>
                    </div>
                    <div
                        className={cx('chartLayoutItem')}
                        style={{ height: item.owlPercent, backgroundColor: '#c0561a' }}
                    >
                        <span style={{ color: '#c0561a' }}>{item.owlPercent}</span>
                    </div>
                    <div
                        className={cx('chartLayoutItem')}
                        style={{ height: item.peacockPercent, backgroundColor: '#0e30a7' }}
                    >
                        <span style={{ color: '#0e30a7' }}>{item.eaglePercent}</span>
                    </div>
                    <div
                        className={cx('chartLayoutItem')}
                        style={{ height: item.dovePercent, backgroundColor: '#a117ad' }}
                    >
                        <span style={{ color: '#a117ad' }}>{item.dovePercent}</span>
                    </div>
                </div>
                <div className={cx('birdBox')}>
                    <AvatarImg src={bird.eagle} isEagle title={'đại bàng'} />
                    <AvatarImg src={bird.owl} isOwl title={'chim cú'} />
                    <AvatarImg src={bird.peacock} isPeacock title={'chim công'} />
                    <AvatarImg src={bird.dove} isDove title={'bồ câu'} />
                </div>
            </div>
        </div>
    );
}

export default BoxResult;
