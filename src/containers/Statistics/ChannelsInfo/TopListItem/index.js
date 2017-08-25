import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getFormattedDate, getCurrentMonth } from 'utils/timeUtils';

import ListWrapper from '../Wrapper/ListWrapper';
import ImgWrapper from '../Wrapper/ImgWrapper';
import TxtWrapper from '../Wrapper/TxtWrapper';
import ContentWrapper from '../Wrapper/ContentWrapper';
import TableWrapper from '../Wrapper/TableWrapper';

class TopListItem extends React.Component {

  static propTypes = {
    topItem: PropTypes.shape(),
    imageUrlKey: PropTypes.string,
    createTimeKey: PropTypes.string,
    descriptionKey: PropTypes.string,
    channel: PropTypes.string,
    infos: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ),
  };

  renderItem() {
    const { topItem, imageUrlKey, createTimeKey, descriptionKey, channel } = this.props;
    return (
      <ContentWrapper>
        <ImgWrapper>
          <img src={topItem.getIn(imageUrlKey.split('.'))} role="presentation" />
        </ImgWrapper>
        <TxtWrapper>
          <p><b>{channel === 'instagram' ? moment.unix(topItem.getIn(createTimeKey.split('.'))).format('MMM DD - hh:mm a')
            : getFormattedDate(topItem.getIn(createTimeKey.split('.')))}</b></p>
          <p className="description">{topItem.getIn(descriptionKey.split('.'))}</p>
        </TxtWrapper>
      </ContentWrapper>
    );
  }

  renderItemInfo() {
    const { infos } = this.props;
    return (
      <TableWrapper>
        {
          infos.map((info, index) =>
            <div key={index} className={infos.length - 1 > index ? 'borderRight' : ''}>
              <span className="value">{info.value}</span>
              <span className="description">{info.label}</span>
            </div>
          )
        }
      </TableWrapper>
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
