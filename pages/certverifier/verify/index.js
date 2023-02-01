import React, { Component } from "react";
import { Card, Grid, Button, Table } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import web3 from "../../../ethereum/web3";
import factory from "../../../ethereum/factory";
import { Link } from "../../../routes";
import RequestRowCVerifier from "../../../components/RequestRowCVerifier";

class certVerifierCertShow extends Component {
  static async getInitialProps(props) {
    const {address} = props.query;

    const cvCertificates = await factory.methods.getCVerifierCertificates().call({from:address});
    console.log(cvCertificates);

    const certCount = await factory.methods.getCVerifierCertCount().call({from:address});
    console.log(certCount);
    let index = []
    for(let i=0;i<certCount;i++){
      index.push(i)
    }
    let pending = certCount;
    console.log(pending)
    let completed = 0
    return {
      address:address,
      names:cvCertificates[0],
      descs:cvCertificates[1],
      hashes:cvCertificates[2],
      status:cvCertificates[3],
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
          "Certificates Pending for verification",
        style: { overflowWrap: "break-word" },
      },
      {
        header: completed,
        meta: "completed",
        description:
          "Certificates which have been checked",
      }
    ];

    return <Card.Group itemsPerRow={2} items={items} />;
  }
  renderRows() {
    return this.props.index.map((index) => {
      return (
        <RequestRowCVerifier
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
        <Link route={`/certverifier/${this.props.address}`}>
          <a>Back</a>
        </Link>
        <h3>Verification Status</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>{this.renderCards()}</Grid.Column>
          </Grid.Row>         
            <Grid.Row>
            <h3>View Certificates for verification</h3>
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
        <div>Found {this.props.pending} Certificates</div>
        </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default certVerifierCertShow;
