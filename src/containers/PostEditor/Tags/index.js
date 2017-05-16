import React, { Component } from 'react';
import Heading from 'components/Heading';
import Autocomplete from 'react-toolbox/lib/autocomplete';
import SmoothCollapse from 'react-smooth-collapse';
import _ from 'lodash';

import Wrapper from './Wrapper';
import TagsWrapper from './TagsWrapper';
import Tag from './Tag';

class Tags extends Component {

  state = { isExpanded: true, tags: [] };

  onRemove = (tagId) => {
    const newTags = this.state.tags.filter((tag) => tag.id !== tagId);
    this.setState({ tags: newTags });
  }

  getSource = () => {
    const source = {
      'ES-es': 'Spain',
      'TH-th': 'Thailand',
      'EN-gb': 'England',
      'EN-en': 'USA',
    };
    const { tags } = this.state;
    tags.forEach((tag) => delete source[tag.id]);
    return source;
  }

  expand = (isExpanded) => {
    this.setState({ isExpanded });
  }

  handleChange = (tags) => {
    const source = this.getSource();
    const newTags = _.concat(this.state.tags, tags.filter((tag) => source[tag]).map((tag) => ({ id: tag, value: source[tag] })));
    this.setState({ tags: newTags });
  }

  render() {
    const { isExpanded, tags } = this.state;
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
          />
          <TagsWrapper>
            {
              tags.map((tag) =>
                <Tag key={tag.id} tag={tag} remove={this.onRemove} />
              )
            }
          </TagsWrapper>
        </SmoothCollapse>
      </Wrapper>
    );
  }
}

export default Tags;
