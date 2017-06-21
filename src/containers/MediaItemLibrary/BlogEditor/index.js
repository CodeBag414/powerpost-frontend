import React, { Component } from 'react';
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// Import bootstrap(v3 or v4) dependencies
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';

import TextArea from 'elements/atm.TextArea';
import PPTextField from 'elements/atm.TextField';

import Wrapper from './Wrapper';
import GeneralInfo from './GeneralInfo';

class BlogEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titleValue: '',
      descriptionValue: '',
    };
  }

  handleTitleChange = () => {
  }

  handleTitleBlur = (e) => {
    // const { updatePostSet, postSet } = this.props;
    // const titleText = e.target.textContent;
    // updatePostSet({
    //   ...postSet.get('details').toJS(),
    //   id: postSet.getIn(['details', 'post_set_id']),
    //   title: titleText,
    // });
    // if (titleText === '') {
    //   this.setState({
    //     postTitle: 'Untitled Post',
    //   });
    // }
  }

  handleInputChange = (name, value) => {
    this.setState({ ...this.state, [name]: value });
  };

  render() {
    const { titleValue, descriptionValue } = this.state;
    return (
      <Wrapper>
        <GeneralInfo
          handleTitleChange={this.handleTitleChange}
          handleTitleBlur={this.handleTitleBlur}
        />
        <div className="content-wrapper">
          <div className="main">

          </div>
          <div className="right-pane">
            <PPTextField
              type="text"
              name="title"
              floatingLabelText="Title"
              value={titleValue}
              onChange={(e) => this.handleInputChange('titleValue', e.target.value)}
            />
            <TextArea
              floatingLabelText="Description"
              rows={5}
              value={descriptionValue}
              onChange={(e) => this.handleInputChange('descriptionValue', e.target.value)}
            />
            <div className="image-wrapper">
              <div className="header">
                <p>Cover Image</p>
                <SimpleButton
                  style={{ fontSize: '13px' }}
                  color={theme.textColor}
                  onClick={this.removeCoverImage}
                  noBorder
                >
                  Remove
                </SimpleButton>
              </div>
              <div className="cover-image">
                <LargeImageWrapper src={selectedImage.url} />
              </div>
              <SimpleButton
                style={{ fontSize: '13px' }}
                color={theme.textColor}
                onClick={this.openFilePicker}
                noBorder
              >
                Upload New Cover Image
              </SimpleButton>
            </div>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default BlogEditor;
