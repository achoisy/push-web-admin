import React from 'react';
import { Grid } from 'semantic-ui-react';
import MessageForm from './message_form';

const MessageNew = () => (
  <Grid centered columns={2} >
    <Grid.Row>
      <Grid.Column>
        <MessageForm />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default (MessageNew);
