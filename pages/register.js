import React, { Component } from "react";
import { Card, Button, Form, Input,Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import factory from "../ethereum/factory";
import web3 from "../ethereum/web3";
import { Link, Router } from "../routes";

const options = [
  { key: 'A', text: 'Applicant', value: 1 },
  { key: 'v', text: 'Verifier', value: 0 },
  { key: 'cv', text: 'Certificate Verifier', value: 2 }
]

class RegisterIndex extends Component{
  static async getInitialProps() {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    return{accounts}
  }
  state = {
    name: "",
    email: "",
    logo: "",
    rdescription: "",
    aType:0,
    errorMessage: "",
    loading:false
  };

  static async getInitialProps(props) {
    const { address } = props.query;

    return { address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const { name, email, logo ,rdescription,aType} = this.state;

    this.setState({ loading: true, errorMessage: "" });
    console.log(name);
    console.log(email);
    console.log(logo);
    console.log(rdescription);
    console.log(aType);
    const accounts = await web3.eth.getAccounts();
    console.log(accounts);
    try {
      //const accounts = await ethereum.request({ method: 'eth_accounts' });
      await factory.methods
        .register(name,email,logo,rdescription, aType)
        .send({ from: accounts[0] });
      if(aType==1){
        Router.pushRoute(`/applicant/${accounts[0]}`);
      }
      else if(aType==2){
        Router.pushRoute(`/certverifier/${accounts[0]}`);
      }
      else{
        Router.pushRoute(`/verifier/${accounts[0]}`);
      }
    } catch (err) {
      this.setState({ errorMessage: err.message });
    }
     this.setState({ loading: false });
  };
  render() {
    return (
      <Layout>
      <div>
        <h3>Please register yourself before using the application</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Name</label>
            <Input
              label="Name"
              labelPosition="right"
              value={this.state.name}
              onChange={(event) =>
                this.setState({ name: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Email Address</label>
            <Input
              label="mail"
              labelPosition="right"
              value={this.state.email}
              onChange={(event) =>
                this.setState({ email: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>logo</label>
            <Input
              label="logo"
              labelPosition="right"
              value={this.state.logo}
              onChange={(event) =>
                this.setState({ logo: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <label>Description about you</label>
            <Input
              label="Bio"
              labelPosition="right"
              value={this.state.rdescription}
              onChange={(event) =>
                this.setState({ rdescription: event.target.value })
              }
            />
          </Form.Field>
          <Form.Select
            fluid
            label='Select your role'
            options={options}
            placeholder='Role'
            value={this.state.aType}
            onChange={(event,data) =>
                this.setState({ aType: data.value })
              }
          />
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button loading={this.state.loading} primary>
            Create!
          </Button>
        </Form>
      </div>
    </Layout>

    );
  }
}

export default RegisterIndex;