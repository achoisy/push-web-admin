import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
// import { Image, Transformation } from 'cloudinary-react';
import axios from 'axios'
import _ from 'lodash';
import { Header, Icon, Divider, Grid, Image, Button } from 'semantic-ui-react';
import ProgressiveImage  from 'react-progressive-image';
import { loading, uploadedFiles, deleteFile } from '../../actions';
import logo from './Close_Icon_Dark.png';
import gear from './Gear.svg';

const IMAGE_ROOT_URL = "https://res.cloudinary.com/monmagazine-fr/image/upload/t_thumbnail_square";

class Upload extends Component {
  constructor(props) {
    super(props);

    this.deleteImage = this.deleteImage.bind(this);
  }

  handleDrop = files => {

    this.props.loading(true);
  // Push all the axios request promise into a single array
    const uploaders = files.map(file => {
      // Initial FormData
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tags", `maville.me`);
      formData.append("upload_preset", "snsyrtep"); // Replace the preset name with your own
      formData.append("api_key", "266667672326133	"); // Replace API key with your own Cloudinary key
      formData.append("timestamp", (Date.now() / 1000) | 0);

      // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
      return axios.post("https://api.cloudinary.com/v1_1/monmagazine-fr/image/upload", formData, {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      }).then(response => {
        const data = response.data;
        const fileURL = data.secure_url // You should store this URL for future references in your app
        this.props.uploadedFiles({ filename: data.public_id, url:fileURL });
      })
    });

    // Once all the files are uploaded
    axios.all(uploaders).then(() => {
      // ... perform after upload is successful operation
      this.props.loading(false);
      // console.log('urlfiles:', urlFiles);
    });
  }

  deleteImage({ filename }) {
    this.props.deleteFile(filename);
  }

  showImage = () => {
    return this.props.upFiles.map((file) => {
      return (
        <Grid.Column key={file.filename} className="relative">
          <ProgressiveImage
            src={`${IMAGE_ROOT_URL}/${file.filename}`}
            placeholder={gear}
          >
            {(src) =>
              <img
              className="relative"
              src={src}
              />
          }
          </ProgressiveImage>
          <img
            name={file.filename}
            className="trash"
            src={logo}
            onClick={()=> this.deleteImage(file)}
          />
        </Grid.Column>
      );
    })

  }

  render() {
    return (
      <div>
        <Dropzone
          onDrop={this.handleDrop}
          multiple
          accept="image/*"
          className="dropzone"
        >
          <Header as='h3' icon>
            <Icon name='plus circle' />
            Joindre une Image
            <Header.Subheader>
              Deposer vos images ou clicker ici pour selectionner un fichier.
              Selection multiple possible.
            </Header.Subheader>
          </Header>
        </Dropzone>
        <Divider />
        <Grid>
          <Grid.Row columns={4}>
            {this.showImage()}
          </Grid.Row>
        </Grid>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {
    upFiles: state.files.upFiles,
  };
}

export default connect(mapStateToProps, { loading, uploadedFiles, deleteFile })(Upload);
