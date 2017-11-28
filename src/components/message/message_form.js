import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import { Fields, reduxForm, SubmissionError } from 'redux-form';
import { Button, Form, Grid, Header, Image, Message, Segment, Label, TextArea, Input, Icon, Modal } from 'semantic-ui-react';
import InputMoment from 'input-moment';
// import DateTimePicker from 'react-widgets/lib/DateTimePicker';
// import momentLocalizer from 'react-widgets-moment';
import moment from 'moment';
// import 'react-widgets/dist/css/react-widgets.css';
import 'moment/locale/fr';
// import Datepiker from '../datePiker';
import * as actions from '../../actions';
import '../../styles/ionicons.css';
import 'input-moment/dist/input-moment.css';


moment.locale('fr');
// momentLocalizer();

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headings: '',
      contents: '',
      links: {},
      deliverDate: moment(),
      modalOpen: false,
    };
    // This binding is necessary to make `this` work in the callback
    // this.handleItemClick = this.handleItemClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, { name, value }) {
    this.setState({[name]: value});
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleSubmit() {
    this.props.loading(true);
    this.setState({ loading: true });
    const { headings, contents, links, deliverDate } = this.state;
    const newMessage = {
      headings: { fr: headings },
      contents: { fr: contents },
      links,
      deliver_date: deliverDate.valueOf(),
    }
    this.props.loading(true);
    this.props.addMessage(newMessage);
    // this.props.modaleMessage('Ceci est le corp du message' );
  }

  datePikerChange = deliverDate => {
    this.setState(deliverDate)
  }

  render() {
    const { headings, contents, deliverDate } = this.state;

    return (
      <Segment.Group>
        <Form onSubmit={this.handleSubmit}>
          <Segment clearing>
            <Header as='h2' floated='left' size="large">
              <Icon name="mail outline" />
              <Header.Content>
                Nouveau message
              </Header.Content>
            </Header>
            <Button
              primary
              floated="right"
              type="submit"
              size="large"
            > <Icon name="send" />{' '}Envoyer</Button>
            <Link className="ui button large right floated" to="/message/">Annuler</Link>
          </Segment>
          <Segment>
            <Form.Field>
              <label>Titre</label>
              <Input
                name="headings"
                value={headings}
                placeholder="Titre de votre message"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Message</label>
              <TextArea
                name="contents"
                value={contents}
                placeholder="Tapez votre message"
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <label>Date et Heure d'envoi</label>
              <div onClick={this.handleOpen}>
                <Input type="text" value={deliverDate.format('llll')} readOnly />
              </div>
              <Modal
                dimmer='blurring'
                size='tiny'
                open={this.state.modalOpen}
              >
                <Modal.Header>
                  Selection de la date et heure d'envoi
                </Modal.Header>
                <Modal.Content>
                  <Grid centered padded>
                    <InputMoment
                      moment={deliverDate}
                      onChange={this.datePikerChange}
                      minStep={5}
                      onSave={this.handleClose}
                    />
                  </Grid>
                </Modal.Content>
              </Modal>
            </Form.Field>
          </Segment>
        </Form>
      </Segment.Group>
    );
  }
}


export default connect(null, actions)(MessageForm);
