import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Modal } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { modaleMessage } from '../../actions';

class ModalExampleCloseConfig extends Component {
  constructor(props) {
    super(props);

    this.buttonOnClick = this.buttonOnClick.bind(this);
  }

  buttonOnClick(e, data) {
    this.props.modaleMessage(null);
  }

  handleKeyPress = (event) => {
    if(event.charCode == 13) {
      this.buttonOnClick();
    }
  }

  addLink(link){
    if (!link) {  // If no link then close modal
      return (
        <Button
          positive
          content="Ok"
        />
      );
    } else {
      return ( // else push to history
        <Link
          className="ui positive button large"
          to={`/${link}`}>
          Ok
        </Link>
      );
    }
  }

  render() {
    const { modal, link } = this.props;

    return (
      <Modal
        open={modal ? true : false }
        closeOnEscape
        closeOnRootNodeClick
      >
        <Modal.Header>
          Message du serveur
        </Modal.Header>
        <Modal.Content>
          <p>{modal}</p>
        </Modal.Content>
        <Modal.Actions>
          <div
            onClick={this.buttonOnClick}
            onKeyPress={this.handleKeyPress}
            role="button"
            tabIndex={0}
          >
            {this.addLink(link)}
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
}

function mapStateToProps(state) {
  return {
    modal: state.widget.message,
    link: state.widget.link,
  };
}

export default connect(mapStateToProps, { modaleMessage })(ModalExampleCloseConfig);
