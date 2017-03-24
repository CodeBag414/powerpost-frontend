import React from 'react';
import Menu from 'App/shared/atm.Menu';
import Button from 'App/shared/atm.Button';

class ButtonMenu extends React.Component {
    state = { active: false }
    handleButtonClick = () => this.setState({ active: !this.state.active });
    handleMenuHide = () => this.setState({ active: false });
    
    render() {
        return (
            <div style = {{ display: 'inline-block', position: 'relative' }}>
                <Button primary raised onClick={ this.handleButtonClick } label={ this.props.label } />
                <Menu position="topLeft" active={ this.state.active } onHide={ this.handleMenuHide } onSelect={() => console.log('selected') }>
                { this.props.children }
                </Menu>
            </div>
        );
    }
}

export default ButtonMenu;