import classNames from 'classnames/bind';
import styles from '../styles/itemTableStyles.module.scss';

import { RenderChart, RenderCompatibility, BoxResultBeck, NotDataIcon } from '../../../conponents';
import { useNavigate } from 'react-router-dom';

import { getlistBirdPeople } from '../../../hooks/hocks';

const cx = classNames.bind(styles);

function ItemTable({ data, id = 1, groupId, charaterActive }) {
    const navigate = useNavigate();

    return (
        <tr
            className={cx('itemContainer')}
            onClick={() => navigate(`/group-results/${groupId}/member/${id}`, { state: { data: data } })}
        >
            <td className={cx('id')}>{id}</td>
            <td className={cx('info')}>
                <h4>Email:</h4>
                <p>{data.Email}</p>
                <h4>Tên thành viên:</h4>
                <p>{data.Name}</p>
            </td>

            <td className={cx('boxDisc')}>
                {!data?.DISC ? (
                    <NotDataIcon isCenter />
                ) : (
                    <RenderChart
                        className={cx('chart')}
                        item={{
                            result: data?.DISC.Percentage,
                        }}
                    />
                )}
            </td>
            <td className={cx('boxBeck')}>
                {!data?.BECK ? (
                    <NotDataIcon isCenter />
                ) : (
                    <BoxResultBeck
                        item={{
                            Percentage: {
                                Classify: 0,
                                Total: 16,
                            },
                        }}
                        isBoxGroup
                        className={cx('body')}
                    />
                )}
            </td>
            <td className={cx('boxCompati')}>
                {!data?.DISC ? (
                    <NotDataIcon isCenter />
                ) : (
                    <RenderCompatibility
                        birdSelect={charaterActive}
                        itemPeople={{
                            idItem: 1,
                            listBirdPeople: getlistBirdPeople(data?.DISC.Percentage),
                        }}
                        isFormGroup
                    />
                )}
            </td>
        </tr>
    );
}

export default ItemTable;
