import React, { PropTypes } from 'react';
import { getFormattedDate, getCurrentMonth } from 'utils/timeUtils';

import ListWrapper from '../Wrapper/ListWrapper';
import ImgWrapper from '../Wrapper/ImgWrapper';
import TxtWrapper from '../Wrapper/TxtWrapper';
import TableWrapper from '../Wrapper/TableWrapper';

class TopListItem extends React.Component {

  static propTypes = {
    topItem: PropTypes.shape(),
    imageUrlKey: PropTypes.string,
    createTimeKey: PropTypes.string,
    descriptionKey: PropTypes.string,
    infos: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.string,
      }),
    ),
  };

  renderItem() {
    const { topItem, imageUrlKey, createTimeKey, descriptionKey } = this.props;
    return (
      <div className={['col-md-7', 'col-lg-7', 'col-sm-7', 'col-xs-7'].join(' ')}>
        <div className={['col-md-2', 'col-sm-2', 'col-xs-2'].join(' ')}>
          <ImgWrapper>
            <img src={topItem.getIn(imageUrlKey.split('.'))} role="presentation" />
          </ImgWrapper>
        </div>
        <div className={['col-md-10', 'col-sm-10', 'col-xs-1'].join(' ')}>
          <TxtWrapper>
            <p><b>{getFormattedDate(topItem.getIn(createTimeKey.split('.')))}</b></p>
            <p>{topItem.getIn(descriptionKey.split('.'))}</p>
          </TxtWrapper>
        </div>
      </div>
    );
  }

  renderItemInfo() {
    const { infos } = this.props;
    return (
      <div className={['col-md-5', 'col-lg-5', 'col-sm-5', 'col-xs-5'].join(' ')}>
        <TableWrapper>
          <table>
            <tbody className="lsitItem" >
              {
                infos.map((info, index) =>
                  <th className={infos.length - 1 > index ? 'borderRight' : ''}>
                    <h3>
                      {info.value}
                    </h3>
                    <p className="desctiption">{info.label}</p>
                  </th>
                )
              }
            </tbody>
          </table>
        </TableWrapper>
      </div>
    );
  }

  render() {
    if (this.props.topItem.get('month') === getCurrentMonth()) {
      return (
        <ListWrapper>
          {this.renderItem()}
          {this.renderItemInfo()}
        </ListWrapper>
      );
    }
    return null;
  }
}

export default TopListItem;
