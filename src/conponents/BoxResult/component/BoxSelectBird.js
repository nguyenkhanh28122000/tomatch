import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './cpnStyles.module.scss';

import Button from '../../Button/Button';
import AvatarImg from '../../AvatarImg/AvatarImg';

import { MdOutlineArrowBackIos } from 'react-icons/md';
import { bird } from '../../../acset/images';

import { updateActivePerInfo } from '../../../store/apiSlice';

const cx = classNames.bind(styles);

function BoxSelectBird({ className, characterSelect, setCharacterSelect, isMemberResult = false }) {
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
        <div className={cx('boxSelectCharacter', { [className]: className })}>
            <Button
                button3
                className={cx('btn', characterSelect === 1 ? 'delBtn' : null)}
                disabled={characterSelect === 1}
                onClick={() => setCharacterSelect(characterSelect - 1)}
            >
                <MdOutlineArrowBackIos />
            </Button>

            <div
                className={cx('birdBody', characterSelect === 1 ? 'active' : null, isMemberResult && 'isMemberResult')}
            >
                <AvatarImg src={bird.eagle} isEagle classname={cx('bird')} isBtn onClick={() => handleClickAvt(1)} />
            </div>
            <div
                className={cx('birdBody', characterSelect === 2 ? 'active' : null, isMemberResult && 'isMemberResult')}
            >
                <AvatarImg src={bird.owl} isOwl classname={cx('bird')} isBtn onClick={() => handleClickAvt(2)} />
            </div>
            <div
                className={cx('birdBody', characterSelect === 3 ? 'active' : null, isMemberResult && 'isMemberResult')}
            >
                <AvatarImg
                    src={bird.peacock}
                    isPeacock
                    classname={cx('bird')}
                    isBtn
                    onClick={() => handleClickAvt(3)}
                />
            </div>
            <div
                className={cx('birdBody', characterSelect === 4 ? 'active' : null, isMemberResult && 'isMemberResult')}
            >
                <AvatarImg src={bird.dove} isDove classname={cx('bird')} isBtn onClick={() => handleClickAvt(4)} />
            </div>
            <Button
                button3
                className={cx(
                    'btn',
                    'btnNext',
                    characterSelect === 4 ? 'delBtn' : null,
                    isMemberResult && 'isMemberResult',
                )}
                disabled={characterSelect === 4}
                onClick={() => setCharacterSelect(characterSelect + 1)}
            >
                <MdOutlineArrowBackIos className={cx('icon')} />
            </Button>
        </div>
    );
}

export default BoxSelectBird;
