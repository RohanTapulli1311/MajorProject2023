import React, { Component } from "react";
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3";
import factory from "../ethereum/factory";

class RequestRow extends Component {
  // onApprove = async () => {
  //   const campaign = Campaign(this.props.address);

  //   const accounts = await web3.eth.getAccounts();
  //   await campaign.methods.approveRequest(this.props.id).send({
  //     from: accounts[0],
  //   });
  // };

  // onFinalize = async () => {
  //   const campaign = Campaign(this.props.address);

  //   const accounts = await web3.eth.getAccounts();
  //   await campaign.methods.finalizeRequest(this.props.id).send({
  //     from: accounts[0],
  //   });
  // };

  render() {
    const { Row, Cell } = Table;
    const { id, name, description,hash, status } = this.props;
    let k=0
    let showStatus = "Pending";
    if(status==1){
      showStatus = "Verified";
      k=1;
    }
    else if(status==2){
      showStatus = "Rejected";
      k=2;
    }
    return (
      <Row 
        // disabled={request.complete}
        // positive={readyToFinalize && !request.complete}
        warning
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
        {/* <Cell>
          {request.complete ? null : (
            <Button color="green" basic onClick={this.onApprove}>
              Approve
            </Button>
          )}
        </Cell>
        <Cell>
          {request.complete ? null : (
            <Button color="teal" basic onClick={this.onFinalize}>
              Finalize
            </Button>
          )}
        </Cell> */}
      </Row>
    );
  }
}

export default RequestRow;
