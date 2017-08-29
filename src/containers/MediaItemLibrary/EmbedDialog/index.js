import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import FontIcon from 'elements/atm.FontIcon';
import PPDialog from 'elements/atm.Dialog';
import TextField from 'elements/atm.TextField';
import Button from 'elements/atm.Button';

import Wrapper from './Wrapper';
import ImageProviders from './Image_Providers.png';
import RichMediaProviders from './RichMedia_Providers.png';
import VideoProviders from './Video_Providers.png';

const Desc = styled.div`
  clear: both;
  padding: 20px;
`;

const DescTitle = styled.div`
  float: left;
  font-weight: 700;
  width: 30%;
`;

const DescDesc = styled.div`
  float: right;
  width: 70%;
`;

const DescProviders = styled.p`
  font-style: italic;
  color: #8C9496;
`;

const DescLogos = styled.img`
  height: 22px;
`;

class EmbedDialog extends React.Component {

  render() {
    return (
      <PPDialog
        active={this.props.embedDialog}
        onEscKeyDown={this.props.closeAllDialog}
        onOverlayClick={this.props.closeAllDialog}
      >
        <Wrapper>
          <div className="header-info">
            <h3><span><i className="fa fa-link" />{}</span>Embed Content</h3>
            <button onClick={this.props.closeAllDialog}><FontIcon value="clear" /></button>
          </div>
          <div className="info-wrapper">
            <p>Insert a link to the media you would like to embed.</p>
            <TextField
              type="text"
              name="linkValue"
              floatingLabelText="URL"
              value={this.props.urlValue}
              onChange={this.props.handleAddLinkValue}
            />
            <div className="button-wrapper">
              <Button onClick={this.props.handleSubmit} primary>Embed</Button>
            </div>
            <Desc>
              <div style={{ clear: 'both', height: '50px' }}>
                <DescTitle>Video</DescTitle>
                <DescDesc>
                  <DescProviders>Providers include:</DescProviders>
                  <DescLogos src={VideoProviders} />
                </DescDesc>
              </div>
            </Desc>
            <Desc>
              <div style={{ clear: 'both', height: '50px' }}>
                <DescTitle>Images</DescTitle>
                <DescDesc>
                  <DescProviders>Providers include:</DescProviders>
                  <DescLogos src={ImageProviders} />
                </DescDesc>
              </div>
            </Desc>
            <Desc>
              <div style={{ clear: 'both', height: '50px' }}>
                <DescTitle>Rich Media</DescTitle>
                <DescDesc>
                  <DescProviders>Providers include:</DescProviders>
                  <DescLogos src={RichMediaProviders} />
                </DescDesc>
              </div>
            </Desc>
          </div>
        </Wrapper>
      </PPDialog>
    );
  }
}

EmbedDialog.propTypes = {
  embedDialog: PropTypes.bool,
  urlValue: PropTypes.string,
  closeAllDialog: PropTypes.func,
  handleAddLinkValue: PropTypes.func,
  handleSubmit: PropTypes.func,
};

export default EmbedDialog;
