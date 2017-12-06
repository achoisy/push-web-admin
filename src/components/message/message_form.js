import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Fields, reduxForm, SubmissionError } from 'redux-form';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
  Label,
  TextArea,
  Input,
  Icon,
  Modal,
  Dropdown,
  Menu,
} from 'semantic-ui-react';
import InputMoment from 'input-moment';
import moment from 'moment';
import isURL from 'validator/lib/isURL';
import 'moment/locale/fr';
import Upload from '../widget/dropzone';
import * as actions from '../../actions';

import '../../styles/ionicons.css';
import '../../styles/dropzone.css';
import 'input-moment/dist/input-moment.css';


moment.locale('fr');
// momentLocalizer();

class MessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headings: '',
      contents: '',
      links: [],
      deliverDate: moment(),
      modalOpen: false,
      linkInput: '',
      urlError: true,
      dropValue:'web',
    };
    // This binding is necessary to make `this` work in the callback
    // this.handleItemClick = this.handleItemClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addLink = this.addLink.bind(this);
    this.createLinkList = this.createLinkList.bind(this);
    this.handleDismiss = this.handleDismiss.bind(this);
  }

  linkOptions () {
    return [
      { key: 'youtube', value: 'youtube', text: 'Youtube' },
      { key: 'facebook', value: 'facebook', text: 'facebook' },
      { key: 'twitter', value: 'twitter', text: 'twitter' },
      { key: 'web', value: 'web', text: 'Web' },
    ];
  }

  handleChange(e, { name, value }) {
    this.setState({[name]: value});

    if (name=== "linkInput") {
      this.setState({ urlError: true });
    }
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  dropChange = (e, { value}) => {
    this.setState({ dropValue: value });
  }

  handleSubmit() {
    const { headings, contents, links, deliverDate } = this.state;
    const images= this.props.upFiles;

    console.log('links:', links);
    console.log('imagelink:', images);

    if (!contents) {
      this.props.modaleMessage('Un message est obligatoire...');
    } else {
      const newMessage = {
        headings: { fr: headings },
        contents: { fr: contents },
        links,
        images,
        deliver_date: deliverDate.valueOf(),
      }
      this.props.loading(true);
      this.props.addMessage(newMessage);
    }
    //this.props.modaleMessage('Ceci est le corp du message', 'message');
  }

  handleDismiss(e, { content }) {
    const { links } = this.state;
    const updateLinks = links.filter(link => link.url !== content);
    this.setState({ links: updateLinks });
  }

  addLink(e) {
    e.preventDefault();
    const { linkInput, urlError, links, dropValue } = this.state;
    if (isURL(linkInput)) {
      const newLink = {
        type: dropValue,
        url: (linkInput.startsWith('http://') || linkInput.startsWith('https://') ? linkInput : `https://${linkInput}`),
      }
      if (links.every(link => link.url !== newLink.url)) {
        this.setState({ links: [...links, newLink], linkInput: '' });
      } else {
        this.props.modaleMessage('Un lien identique existe deja, desole...');
      }
    } else {
      this.setState({ urlError: false });
    }
  }

  datePikerChange = deliverDate => {
    this.setState(deliverDate)
  }

  createLinkList() {
    const { links } = this.state;
    return links.map((link) => {
      return (
        <Message
          key={link.url}
          onDismiss={this.handleDismiss}
          icon={link.type === 'web'? "linkify": link.type}
          header={`Lien ${link.type}`}
          content={link.url}
        />
      );
    })
  }

  render() {
    const { headings, contents, deliverDate, linkInput, urlError } = this.state;
    const dropdownList = [
      { key: 'you', icon:'youtube', value: 'youtube', text: 'Youtube' },
      { key: 'fac', icon:'facebook official', value: 'facebook', text: 'facebook' },
      { key: 'twi', icon:'twitter square', value: 'twitter', text: 'twitter' },
      { key: 'web', icon:'linkify', value: 'linkify', text: 'Web' },
    ]
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

            <Message
              negative
              attached
              hidden={urlError}
              content="Erreur dans l'adress URL"
            />
            <Form.Field>
              <Menu >
                <Dropdown options={dropdownList} simple item defaultValue='linkify' onChange={this.dropChange}/>
                <Input
                  name="linkInput"
                  value={linkInput}
                  label='https://'
                  placeholder='mysite.com'
                  onChange={this.handleChange}
                  action={<Button color='teal' icon='add' onClick={this.addLink} />}
                />
              </Menu>
            </Form.Field>

            <Form.Field>
              {this.createLinkList()}
            </Form.Field>

            <Form.Field>
              <Upload />
            </Form.Field>
          </Segment>
        </Form>
      </Segment.Group>
    );
  }
}

function mapStateToProps(state) {
  return {
    upFiles: state.files.upFiles,
  };
}

export default connect(mapStateToProps, actions)(MessageForm);
