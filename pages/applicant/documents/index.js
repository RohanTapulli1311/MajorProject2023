import React, { Component } from "react";
import { Card, Grid, Button, Table } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import web3 from "../../../ethereum/web3";
import factory from "../../../ethereum/factory";
import { Link } from "../../../routes";
import RequestRow from "../../../components/RequestRow";

class DocumentShow extends Component {
  static async getInitialProps(props) {
    const documentCount = await factory.methods.getCounts(props.query.address).call();
    // const accountDetail = await factory.methods.getAccount().call({from:props.query.address});
    const {address} = props.query;
    const requesterDocuments = await factory.methods.getRequesterDocuments().call({from:address});
    console.log(requesterDocuments);
    let index = []
    for(let i=0;i<documentCount[2];i++){
      index.push(i)
    }

    return {
      pending:parseInt(documentCount[2])-(parseInt(documentCount[0])+parseInt(documentCount[1])),
      verified:documentCount[0],
      rejected:documentCount[1],
      total:documentCount[2],
      address:address,
      names:requesterDocuments[0],
      descs:requesterDocuments[1],
      hashes:requesterDocuments[2],
      status:requesterDocuments[3],
      index:index
    };
  }

  renderCards() {
    const {
        pending,
        verified,
        rejected,
        total,
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
        header: verified,
        meta: "Verified",
        description:
          "Count of verified Documents",
      },
      {
        header: rejected,
        meta: "Rejected",
        description:
          "Count of rejected Documents",
      },
      {
        header: total,
        meta: "Total",
        description:
          "Total documents uploaded for verification",
      }
    ];

    return <Card.Group itemsPerRow={4} items={items} />;
  }
  renderRows() {
    return this.props.index.map((index) => {
      return (
        <RequestRow
          key={index}
          id={index}
          name={this.props.names[index]}
          description={this.props.descs[index]}
          hash={this.props.hashes[index]}
          status={this.props.status[index]}
        />
      );
    });
  }
  render() {
    const { Header, Row, HeaderCell, Body } = Table;
    return (
      <Layout>
        <Link route={`/applicant/${this.props.address}`}>
          <a>Back</a>
        </Link>
        <h3>Document status</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16}>{this.renderCards()}</Grid.Column>
          </Grid.Row>
          
        <Grid.Row>
        <Card>
      <Card.Content>
        <Card.Header>Upload Documents</Card.Header>
        <Card.Description>
          Click here to upload Documents for verifications
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Link legacyBehavior route={`/applicant/${this.props.address}/documents/new`}>
          <a>
            <Button
              floated="right"
              content="Upload"
              icon="add circle"
              primary
            />
          </a>
        </Link>
    </Card.Content>
    </Card>
          
          </Grid.Row>
            <Grid.Row>
            <h3>View Documents</h3>
          <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Name</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Hash</HeaderCell>
              <HeaderCell>View Document</HeaderCell>
              <HeaderCell>Status</HeaderCell>
            </Row>
          </Header>
          <Body>{this.renderRows()}</Body>
        </Table>
        <div>Found {this.props.total} Documents</div>
        </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default DocumentShow;
