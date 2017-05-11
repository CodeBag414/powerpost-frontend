import React from 'react';
import {Tab, Tabs} from 'react-toolbox';
import PPDialog from 'elements/atm.Dialog';
import Wrapper from './Wrapper';
import TextField from 'elements/atm.TextField';
import Button from 'elements/atm.Button';
import FeedContainer from './FeedContainer';
import Spinner from 'elements/atm.Spinner';
import SearchItem from '../SearchItem';
import Dropdown from 'elements/atm.Dropdown';

class RSSFeed extends React.Component  {
  constructor(props) {
    super(props);
    
    this.state = {
      isLoading: false,
      rssValue: '',
      selectedFeed: null,
    };
    
    this.handleInputChangeURL = this.handleInputChangeURL.bind(this);
    this.handleInputChangeName = this.handleInputChangeName.bind(this);
  }
  
  componentWillReceiveProps(nextProps) {

  }
  
  handleInputChangeURL(event) {
    this.setState({ rssUrl: event.target.value });
  }
  
  onFeedChange = (option) => {
    this.setState({ selectedFeed: option });
    console.log(option);
    this.props.getFeedItems(option.value);
  }
  
  createFeed = () => {
    const data = {
      url: this.state.rssUrl,
      name: this.state.rssName,
    };
    
    this.props.createFeed(data);
    this.setState({
      rssName: '',
      rssUrl: '',
    });
    
  }
  handleInputChangeName(event) {
    this.setState({ rssName: event.target.value });
  }
  
  render() {
    const selectOptions = this.props.feeds.length ? this.props.feeds.map((feed) => ({ value: feed.feed_id, label: feed.name })) : [];
    return(
      <PPDialog
        active={this.props.rssFeedDialog}
        title='Add RSS Feed'
        onEscKeyDown={this.props.closeAllDialog}
        onOverlayClick={this.props.closeAllDialog}
        actions={this.props.actions}
      >
        <Wrapper>
          <div style={{ clear: 'both' }}>
            <div className="row">
              <div className="col-md-5">
                <TextField floatingLabelText='RSS Feed URL' type='text' onChange={this.handleInputChangeURL} />
              </div>
              <div className="col-md-5">
                <TextField floatingLabelText="Name of Feed" type='text' onChange={this.handleInputChangeName} />
              </div>
              <div className="col-md-2">
                <Button primary label='Add' onClick={this.createFeed} style={{marginTop: '29px'}} />
              </div>
           </div>
          </div>
          <FeedContainer>
            <Dropdown label="Your RSS Feeds" value={this.state.selectedFeed} options={selectOptions} onChange={this.onFeedChange} />
            { this.state.isLoading && <Spinner /> }
            { !this.state.isLoading && this.props.rssItems && this.props.rssItems.map((item, i) =>
              <SearchItem  key={i} item={item} handleClick={this.props.handleAddLinkValueFromDialog} />
              )
            }
          </FeedContainer>
        </Wrapper>
      </PPDialog>  
    );
  }
}

export default RSSFeed;