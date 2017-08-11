import PropTypes from 'prop-types';
import styled from 'styled-components';

const PostPreviewWrapper = styled.div`
  margin-bottom: ${(props) => props.marginBottom ? 60 : 0}px;

  i {
    border-radius: 2px;
    vertical-align: middle;
    margin-right: 16px;
  }
  .facebook-icon-color {
    color: #4867AA;
  }
  .linkedin-icon-color {
    color: #0177B5;
  }
  .pinterest-icon-color {
    color: #D50C22;
  }
  .twitter-icon-color {
    color: #1DA1F2;
  }
  .wordpress-icon-color {
    color: #464646;
  }
  .google-icon-color {
    color: #d34836;
  }

  .post-preview-title {
    color: #616669;
    font-family: Lato;
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 13px;
    margin-top: 40px;
  }

  .post-preview-note {
    font-size: 12px;
    font-style: italic;
    margin-top: 10px;
    /*text-align: center;*/
    &.pinterest {
      margin-top: -10px;
    }
  }
`;

PostPreviewWrapper.propTypes = {
  marginBottom: PropTypes.bool,
};

export default PostPreviewWrapper;
