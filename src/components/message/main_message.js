import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Dimmer, Segment, Loader, Button, Modal } from 'semantic-ui-react';
import { connect } from 'react-redux';
import MessageList from './message_list';
import MessageNew from './message_new';
import Header from '../header';
import Message from '../widget/user_message';


// TODO: Create modal to communicate after axios send
// could be link back after succes or error msg.

// TODO: Create a Dimmer for loading

const MainMessage = (props) => {
  const { loading } = props;

  return (
    <div>
      <Dimmer.Dimmable as={Segment} dimmed={loading}>
        <Dimmer active={loading} inverted>
          <Loader>Loading</Loader>
        </Dimmer>
        <Header />
        <Message />
        <Switch>
          <Route exact path="/message" component={MessageList} />
          <Route exact path="/message/new" component={MessageNew} />
        </Switch>
      </Dimmer.Dimmable>
    </div>
  );
};

function mapStateToProps(state) {
  return { loading: state.widget.loading };
}

export default connect(mapStateToProps)(MainMessage);
