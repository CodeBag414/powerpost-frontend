import React from 'react';
import {connect} from 'react-redux';
import PPFullScreenDialog from 'App/shared/atm.FullScreenDialog';
import TextField from 'App/shared/atm.TestTextField';
import PPButton from 'App/shared/atm.Button';

import {Tab, Tabs} from 'react-toolbox';
class AddConnectionDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 1,
            fixedIndex: 1,
            inverseIndex: 1
       };
    }
    
    handleTabChange = (index) => {
        this.setState({index: index});
      };
    
    handleFixedTabChange = (index) => {
        this.setState({fixedIndex: index});
      };
    
    handleInverseTabChange = (index) => {
        this.setState({inverseIndex: index});
      };
    
    getChannelClass(connection, styles) {
        return styles.hasOwnProperty(connection.channel) ? styles[connection.channel] : '';
    }    
    
    render() {
        const labelActions = [
            { label:"Cancel", onClick: this.props.handleDialogToggle},
            { label:"Save", onClick: this.props.handleDialogToggle}
        ];
        
        const connectionTypes = [
            { name: 'Facebook Profile',
              icon: 'fa fa-facebook-square',
              text: 'Log into your Facebook to start sharing content',
              channel: 'facebook'
            },
            { name: 'Facebook Page',
              icon: 'fa fa-facebook-square',
              text: 'Log into your Facebook to start sharing content',
              channel: 'facebook'
            },
            { name: 'Twitter Profile',
              icon: 'fa fa-twitter-square',
              text: 'Log into your Twitter to start sharing content',
              channel: 'twitter'
            },
            { name: 'LinkedIn Profile',
              icon: 'fa fa-linkedin-square',
              text: 'Log into your LinkedIn to start sharing content',
              channel:'linkedin'
            },
            { name: 'LinkedIn Company',
              icon: 'fa fa-linkedin-square',
              text: 'Log into your LinkedIn to start sharing content',
              channel: 'linkedin',
            },
            { name: 'Pinterest Board',
              icon: 'fa fa-pinterest-square',
              text: 'Log into your Pinterest to start sharing content',
              channel: 'pinterest'
            },
        ];
        
        const styles = require('./styles.scss');
        const tabTheme = require('./tabTheme.scss');
        return (
            <PPFullScreenDialog title="Connect a Channel" active={ this.props.dialogShown } actions={ labelActions }>
            <Tabs index={this.state.index} onChange={this.handleTabChange}>
                <Tab label='Social Media' theme={ tabTheme }>
                    <div className={ styles.tabContent }>
                        <p>Lorem ipsum semper. At vitae dictum a lectus scelerisque urna augue mollis nec augue volutpat orci In semper. Vestibulum commodo a.</p>
                        <hr/>
                        <div>
                        { connectionTypes.map((connection, i) => 
                            <div key={ i } className={ styles.connectionTypeContainer }><i className={ [connection.icon, styles.icon, this.getChannelClass(connection, styles)].join(' ') } /><div className={ styles.connectionType }><div className={ styles.connectionName }>{ connection.name }</div><div className={ styles.connectionDesc }>{ connection.text }</div></div><div className={ styles.buttonContainer }><PPButton label="Connect" neutral onClick={ () => this.props.getSocialUrl(connection.channel) } /></div></div>
                        )}
                        </div>
                    </div>
                </Tab>
                <Tab label='Wordpress' theme={ tabTheme }>
                    <div className={ styles.tabContent }>
                        <p>Lorem ipsum semper. At vitae dictum a lectus scelerisque urna augue mollis nec augue volutpat orci In semper. Vestibulum commodo a.</p>
                        <hr/>
                        <div>
                            <TextField floatingLabelText="Wordpress URL" name="wordpressUrl" type="url" />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                            <TextField floatingLabelText="Wordpress Username" name="wordpressUsername" type="text" />
                            </div>
                            <div className="col-md-6">
                            <TextField floatingLabelText="Wordpress Password" name="wordpressPassword" type="password" />
                            </div>
                        </div>
                    </div>
                </Tab>
            </Tabs>
            </PPFullScreenDialog>
        );
    }
}

AddConnectionDialog.propTypes = {children: React.PropTypes.node};

function mapStateToProps() {
    return {};
}

export default connect(mapStateToProps, null)(AddConnectionDialog);
