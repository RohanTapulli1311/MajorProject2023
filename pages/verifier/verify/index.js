import React, { Component } from "react";
import { Card, Grid, Button, Table } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import web3 from "../../../ethereum/web3";
import factory from "../../../ethereum/factory";
import { Link } from "../../../routes";
import RequestRowVerifier from "../../../components/RequestRowVerifier";

class VerifierShow extends Component {
  static async getInitialProps(props) {
    const {address} = props.query;

    const verifierDocuments = await factory.methods.getVerifierDocuments().call({from:address});
    console.log(verifierDocuments);

    const docCount = await factory.methods.getVerifierDocumentCount().call({from:address});
    console.log(docCount);
    let index = []
    for(let i=0;i<docCount;i++){
      index.push(i)
    }
    let pending = docCount;
    console.log(pending)
    let completed = 0
    return {
      address:address,
      names:verifierDocuments[0],
      descs:verifierDocuments[1],
      hashes:verifierDocuments[2],
      status:verifierDocuments[3],
      index:index,
      pending:pending,
      completed:completed,
    };
  }

  renderCards() {
    const {
        pending,
        completed
    } = this.props;

    const items = [
      {
        header: pending,
        meta: "Pending",
        description:
          "Documents Pending for verification",
        style: { overflowWrap: "break-word" },
      },
      {
        header: completed,
        meta: "completed",
        description:
          "Documents which have been checked",
      }
    ];

    return <Card.Group itemsPerRow={2} items={items} />;
  }
  renderRows() {
    return this.props.index.map((index) => {
      return (
        <RequestRowVerifier
          key={index}
          id={index}
          name={this.props.names[index]}
          description={this.props.descs[index]}
          hash={this.props.hashes[index]}
          status={this.props.status[index]}
          add = {this.props.address}
        />
      );
    });
  }
  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <Link route={`/verifier/${this.props.address}`}>
          <a>Back</a>
        </Link>
        <h3>Verification Status</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>{this.renderCards()}</Grid.Column>
          </Grid.Row>         
            <Grid.Row>
            <h3>View Documents for verification</h3>
          <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Name</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Hash</HeaderCell>
              <HeaderCell>View Document</HeaderCell>
              <HeaderCell>Status</HeaderCell>
              <HeaderCell>Verify</HeaderCell>
              <HeaderCell>Reject</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.pending} Documents</div>
        </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default VerifierShow;
