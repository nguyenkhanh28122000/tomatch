import classNames from 'classnames/bind';
import styles from '../styles/detailResultStyles.module.scss';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../store/apiSlice';
import { useLocation, useParams } from 'react-router-dom';
import { BackBtn, BgrMain, Header, Line, BoxResultGroup } from '../../../conponents';

const cx = classNames.bind(styles);
function MemberResult() {
    const IdUser = useSelector(selectUserId);
    const location = useLocation();
    const { idGroup } = useParams();
    return (
        <BgrMain className={cx('container', 'containerMemberResult')} isHomeScreen isVerticalAlignment>
            <div className={cx('boxHeader')}>
                <BackBtn />
                <Header title={`kết quả của ${location.state.data.Name}`} />
                <Line width={'500px'} isLine1 />
            </div>
            <BoxResultGroup item={location.state.data} idGroup={idGroup} />
        </BgrMain>
    );
}

export default MemberResult;
