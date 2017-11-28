import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import { setActiveItem } from '../actions';

class Header extends Component {
  constructor(props) {
    super(props);

    // This binding is necessary to make `this` work in the callback
    this.handleItemClick = this.handleItemClick.bind(this);
  }


  handleItemClick(e,{ name }) {
    this.props.setActiveItem({ name }, this.props.history);
  }

  render() {
    const { activeItem } = this.props

    return (
      <Menu size="large">
        <Menu.Item name="messages" active={(activeItem === 'messages') || (!activeItem)} onClick={this.handleItemClick} />
        <Menu.Menu position="right">
          <Menu.Item>
            <Link className="ui primary button" to="/signout">Deconnexion</Link>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated,
    activeItem: state.header.activeItem,
  };
}

export default withRouter(connect(mapStateToProps, { setActiveItem })(Header));
