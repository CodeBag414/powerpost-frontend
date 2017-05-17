import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Heading from 'components/Heading';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import SmoothCollapse from 'react-smooth-collapse';
import _ from 'lodash';

import { makeSelectAccountTags } from 'containers/PostEditor/selectors';
import Wrapper from './Wrapper';
import TagsWrapper from './TagsWrapper';
import Tag from './Tag';

class Tags extends Component {

  static propTypes = {
    accountTags: ImmutablePropTypes.map,
    postSet: ImmutablePropTypes.map,
    updatePostSet: PropTypes.func,
  };

  state = { isExpanded: true, input: '' };

  onRemove = (removedTag) => {
    const { postSet, updatePostSet } = this.props;
    const updatedTags = this.getTags().filter((tag) => (tag !== removedTag));
    updatePostSet({
      ...postSet.toJS(),
      id: postSet.get('post_set_id'),
      tags: updatedTags,
    });
  }

  onQueryChange = (input) => {
    this.setState({ input });
  }

  getSource = () => {
    const { accountTags } = this.props;
    const source = {};
    const tags = this.getTags();
    accountTags.get('data').forEach((tag) => (source[tag] = tag));
    const { input } = this.state;
    _.values(tags).forEach((tag) => delete source[tag]);
    if (input && _.values(source).indexOf(input) === -1) {
      source['new-tag'] = `${input} +`;
    }
    return source;
  }

  getTags = () => {
    const { postSet } = this.props;
    const tags = postSet.get('tags');
    return tags ? _.values(tags.toJS()) : {};
  }

  expand = (isExpanded) => {
    this.setState({ isExpanded });
  }

  handleChange = (tags) => {
    const { postSet, updatePostSet } = this.props;
    const { input } = this.state;
    const updatedTags = this.getTags().concat(
      tags.map((tag) => (tag === 'new-tag' ? input : tag))
    );
    this.setState({ input: '' });
    updatePostSet({
      ...postSet.toJS(),
      id: postSet.get('post_set_id'),
      tags: updatedTags,
    });
  }

  render() {
    const { isExpanded } = this.state;
    const tags = this.getTags();
    const source = this.getSource();
    return (
      <Wrapper expanded={isExpanded}>
        <Heading
          title="Tags"
          icon="tags"
          iconColor="#B171B5"
          expand={this.expand}
          isExpanded={isExpanded}
        />
        <SmoothCollapse expanded={isExpanded}>
          <div className="description">Add Tags lorem ipsum anoajvas</div>
          <Autocomplete
            direction="down"
            selectedPosition="above"
            onChange={this.handleChange}
            source={source}
            value={this.state.tags}
            className="auto-complete"
            onQueryChange={this.onQueryChange}
          />
          <TagsWrapper>
            {
              _.values(tags).map((tag) =>
                <Tag key={tag} tag={tag} remove={this.onRemove} />
              )
            }
          </TagsWrapper>
        </SmoothCollapse>
      </Wrapper>
    );
  }
}

function mapDispatchToProps() {
  return {};
}

const mapStateToProps = createStructuredSelector({
  accountTags: makeSelectAccountTags(),
});

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
