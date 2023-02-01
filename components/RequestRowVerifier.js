import React, { Component } from "react";
import { Table, Button, Message, Form } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import factory from "../ethereum/factory";
import { Link, Router } from "../routes";

class RequestRowVerifier extends Component {
    state = {
        loadingv: false,
        loadingr: false,
        errorMessagev: "",
        errorMessager:""
      };
    
  onVerify = async () => {
    //const campaign = Campaign(this.props.address);
    this.setState({ loadingv: true, errorMessagev: "", errorMessager:"" });
    const accounts = await web3.eth.getAccounts();
    console.log(accounts[0])
    try{
    await factory.methods.verifyDocument(this.props.hash, 1).send({
      from: accounts[0],
    });
    Router.pushRoute(`/verifier/${this.props.add}/verify`);
}catch(err){
    this.setState({ errorMessagev: err.message });
}
    this.setState({ loadingv: false });
  };

  onReject = async () => {
    //const campaign = Campaign(this.props.address);
    this.setState({ loadingr: true, errorMessager: "" , errorMessagev:""});
    const accounts = await web3.eth.getAccounts();
    try{
    
    await factory.methods.verifyDocument(this.props.hash, 2).send({
      from: accounts[0],
    });
    Router.pushRoute(`/verifier/${this.props.add}/verify`);
}catch(err){
    this.setState({ errorMessager: err.message });
}
    this.setState({ loadingr: false });
  };

  render() {
    const { Row, Cell } = Table;
    const { id, name, description,hash, status } = this.props;
    let positive = false
    let warning = true
    let error = false
    let showStatus = "Pending"
    if(status==1){
      showStatus = "Verified"
      positive = true
    }
    else if(status==2){
      showStatus = "Rejected"
      error = true
    }
    return (
      <Row 
        // disabled={request.complete}
        // positive={readyToFinalize && !request.complete}
        positive = {positive}
        warning = {warning}
        error = {error}
      >
        <Cell>{id}</Cell>
        <Cell>{name}</Cell>
        <Cell>{description}</Cell>
        <Cell>{hash.substring(0,10)}...</Cell>
        <Cell><a
        href={"https://dstorage8975.infura-ipfs.io/ipfs/" + hash}
        rel="noopener noreferrer"
        target="_blank">
        {hash.substring(0,10)}...
        </a></Cell>
        <Cell>{showStatus}</Cell>
        <Cell>
        <Form error={!!this.state.errorMessagev}>
         
            <Button color="green" basic loading={this.state.loadingv} onClick={this.onVerify}>
              Verify
            </Button>
            <Message error header="Oops!" content={this.state.errorMessagev} />
            </Form>
        </Cell>
        <Cell >
        <Form error={!!this.state.errorMessager}>
        
            <Button color="red" basic loading={this.state.loadingr} onClick={this.onReject}>
              Reject
            </Button>
            <Message error header="Oops!" content={this.state.errorMessager} />
            </Form>
        </Cell>

      </Row>
    );
  }
}

export default RequestRowVerifier;
