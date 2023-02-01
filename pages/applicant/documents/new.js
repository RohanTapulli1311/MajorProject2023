import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import factory from "../../../ethereum/factory";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

const INFURA_ID = '';
const INFURA_SECRET_KEY = '';
const auth =
    'Basic ' + Buffer.from(INFURA_ID + ':' + INFURA_SECRET_KEY).toString('base64');
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https',    headers: {
  authorization: auth,
}  })


class UploadDocument extends Component {
  // state = {
  //   name: "",
  //   description: "",
  //   hash: "",
  //   loading: false,
  //   errorMessage: "",
  // };
  constructor(props) {
    super(props)
    this.state = {
      account: '',
      description: "",
      hash: "",
      loading: false,
      type: null,
      name: null,
      errorMessage: "",
    }
    //this.uploadFile = this.uploadFile.bind(this)
    this.captureFile = this.captureFile.bind(this)
  }

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }
  captureFile = event => {
    event.preventDefault()

    const file = event.target.files[0]
    console.log(file)
    const reader = new window.FileReader()

    reader.readAsArrayBuffer(file)
    reader.onloadend = () => {
      console.log(Buffer(reader.result))
      this.setState({ buffer: Buffer(reader.result),type: file.type});
    }
    console.log('buffer', this.state.buffer)
    console.log('type', this.state.type)
    console.log('name', this.state.name)
  }

  // uploadFile = description => {
  //   console.log("Submitting file to IPFS...")

  //   // Add file to the IPFS
  //   ipfs.add(this.state.buffer, (error, result) => {
  //     console.log('IPFS result', result.size)
  //     if(error) {
  //       console.error(error)
  //       return
  //     }

  //     this.setState({ loading: true })
  //     // Assign value for the file without extension
  //     if(this.state.type === ''){
  //       this.setState({type: 'none'})
  //     }
  //     this.state.dstorage.methods.uploadFile(result[0].hash, result[0].size, this.state.type, this.state.name, description).send({ from: this.state.account }).on('transactionHash', (hash) => {
  //       this.setState({
  //        loading: false,
  //        type: null,
  //        name: null
  //      })
  //      window.location.reload()
  //     }).on('error', (e) =>{
  //       window.alert('Error')
  //       this.setState({loading: false})
  //     })
  //   })
  // }

  onSubmit = async (event) => {
    event.preventDefault();
    console.log('Buffer',this.state.buffer);
    const { name, description } = this.state;
  //   try{
  //     const result = await ipfs.add(this.state.buffer);
  //     console.log('result',result)   
  // }
  // catch(err){
  //   console.log(err)
  // }

    this.setState({ loading: true, errorMessage: "" });

    try {
      const result = await ipfs.add(this.state.buffer);
      console.log('result',result); 
      const accounts = await web3.eth.getAccounts();
      await factory.methods
        .addDocument(name,description,result[0].hash)
        .send({ from: accounts[0] });
      Router.pushRoute(`/applicant/${this.props.address}/documents`);
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <Link route={`/applicant/${this.props.address}/documents`}>
          <a>Back</a>
        </Link>
        <h3>Upload a Document for verification</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Document Name</label>
            <Input
              value={this.state.name}
              onChange={(event) =>
                this.setState({ name: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Description of the document</label>
            <Input
              value={this.state.description}
              onChange={(event) => this.setState({ description: event.target.value })}
            />
          </Form.Field>
          {/* <Form.Field> */}
            <label>Upload Document</label>
            {/* <Input
              value={this.state.hash}
              onChange={(event) =>
                this.setState({ hash: event.target.value })
              }
            /> */}
            <input type="file" onChange={this.captureFile}/>
          {/* </Form.Field> */}
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button primary loading={this.state.loading}>
           Upload
          </Button>
        </Form>
      </Layout>
    );
  }
}

export default UploadDocument;

