import React, { Component } from "react";
import { Card, Button ,Form,Message} from "semantic-ui-react";
import Layout from "../components/Layout";
import factory from "../ethereum/factory";
//import web3 from "../ethereum/web3";
import Web3 from "web3";
import { Link,Router } from "../routes";


class AccountIndex extends Component{
  
  // static async getInitialProps() {
  //   const accounts = await web3.eth.getAccounts();
  //   console.log(accounts);
  //   return {accounts};
  // }
  state = {
    errorMessage: "",
    loading: false,
  };
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (typeof window.ethereum !== 'undefined') {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }
  async loadBlockchainData() {
    const web3 = window.web3;
    const mAccounts = await web3.eth.getAccounts();
    console.log(mAccounts);
    const accounts = await factory.methods.getAccount().call({from:mAccounts[0]});
    console.log(accounts);
  }
  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMessage: "" });

    try {
      const mAccounts = await web3.eth.getAccounts();
      console.log(mAccounts);
      const accounts = await factory.methods.getAccount().call({from:mAccounts[0]});
      console.log(accounts[5]);
      if(accounts[5]!=0){
        if(accounts["aType"]==1){
          Router.pushRoute(`/applicant/${mAccounts[0]}`);
        }
        else if(accounts["aType"]==2){
          Router.pushRoute(`/certverifier/${mAccounts[0]}`);
        }
        else if(accounts["aType"]==0){
          Router.pushRoute(`/verifier/${mAccounts[0]}`);
        }
      }
      else{
        this.setState({errorMessage: "Account not registered on the blockchain"});
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
        <h3>Welcome to VERSERA</h3>
        <Card.Group itemsPerRow={2}>
          <Card>
      <Card.Content>
        <Card.Header>Login</Card.Header>
        <Card.Description>
          Click here to login using MetaMask
        </Card.Description>
      </Card.Content>
      
      <Card.Content extra>
      <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button 
              floated="right"
              content="Login"
              icon="add circle"
              loading={this.state.loading} 
              primary>
            
          </Button>
        </Form>
    </Card.Content>
    </Card>

    <Card>
      <Card.Content>
        <Card.Header>Register</Card.Header>
        <Card.Description>
          Click here to Register to VERSERA
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Link legacyBehavior route="/register">
          <a>
            <Button
              floated="right"
              content="Register"
              icon="add circle"
              primary
            />
          </a>
        </Link>
    </Card.Content>
    </Card>
</Card.Group>
      </div>
    </Layout>

    );
  }
}

export default AccountIndex;