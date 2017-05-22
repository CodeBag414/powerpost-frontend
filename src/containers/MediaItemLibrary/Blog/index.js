/*
 * Blog
 *
 *
 */

import React from 'react';
import styled from 'styled-components';

import { UserCanAccount } from 'config.routes/UserRoutePermissions';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { convertFromHTML, ContentState, convertToRaw } from 'draft-js';

const Wrapper = styled.div`
  height:100%;
  width:100%;
`;

class Blog extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      editorContent: null,
    };
  }
  
  componentDidMount() {
    if (this.props.params.media_id) {
      this.props.setActiveMediaItemId(this.props.params.media_id);
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.params.media_id && (nextProps.params.media_id !== this.props.params.media_id)) {
      this.props.setActiveMediaItemId(nextProps.params.media_id);
    }
    
    if(!this.props.activeMediaItem && nextProps.activeMediaItem) {
      console.log('initialize content');
      this.initializeContent(nextProps.activeMediaItem.properties.html);
    }
  }
  
  initializeContent = (html) => {
    const contentBlocks = convertFromHTML(html);
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    this.setState({ editorContent: convertToRaw(contentState) });
  }
  
  onEditorStateChange = (editorContent) => {
    console.log(draftToHtml(editorContent));
    this.setState({ editorContent });
  } 
  
  render() {
    const { editorContent } = this.state;
    console.log(editorContent);
    return (
      <Wrapper>
        <div style={{maxWidth: '600px'}}>
         <Editor rawContentState={editorContent} onChange={this.onEditorStateChange} />
        </div>
      </Wrapper>
    );
  }
}

export default UserCanAccount(Blog);
