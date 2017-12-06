import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import moment from 'moment';
import { Table, Grid } from 'semantic-ui-react'
import { fetchMessage } from '../../actions';


function UTCtoLocal(date) {
  return moment(date).format('D MMM YYYY HH:mm');
}

class Message extends Component {

  componentWillMount() {
    this.props.fetchMessage();
  }

  renderList() {
    return _.map(this.props.messages, (message) => {
      return (
        <Table.Row key={message._id}>
          <Table.Cell singleLine >{UTCtoLocal(message.create_date)}</Table.Cell>
          <Table.Cell >{message.headings.fr}</Table.Cell>
          <Table.Cell >{message.status}</Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return (
      <Grid padded>
        <Grid.Row columns={3}>
          <Grid.Column>
            <h3>
              List des Messages
            </h3>
          </Grid.Column>
          <Grid.Column>
            <Link className="ui primary button" to="/message/new">
              Nouveau Message
            </Link>
          </Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>
            <Table celled padded>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell singleLine >Date creation</Table.HeaderCell>
                  <Table.HeaderCell>Titre</Table.HeaderCell>
                  <Table.HeaderCell>Etat</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.renderList()}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}


function mapStateToProps(state) {
  return {
    messages: state.messages
  }
}

export default connect(mapStateToProps, { fetchMessage })(Message);
