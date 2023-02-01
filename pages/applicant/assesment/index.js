import React, { Component } from "react";
import { Card, Grid, Button, Table } from "semantic-ui-react";
import Layout from "../../../components/Layout";
import web3 from "../../../ethereum/web3";
import factory from "../../../ethereum/factory";
import { Link } from "../../../routes";
import RequestRow from "../../../components/RequestRow";

class AssesmentShow extends Component {
  static async getInitialProps(props) {
    const certCount = await factory.methods.getcertCounts(props.query.address).call();
    // const accountDetail = await factory.methods.getAccount().call({from:props.query.address});
    const {address} = props.query;
    const requesterCertificates = await factory.methods.getRequesterCertificates().call({from:address});
    console.log(requesterCertificates);
    let index = []
    for(let i=0;i<certCount[2];i++){
      index.push(i)
    }

    return {
      pending:parseInt(certCount[2])-(parseInt(certCount[0])+parseInt(certCount[1])),
      verified:certCount[0],
      rejected:certCount[1],
      total:certCount[2],
      address:address,
      names:requesterCertificates[0],
      descs:requesterCertificates[1],
      hashes:requesterCertificates[2],
      status:requesterCertificates[3],
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
          "Certificates Pending for verification",
        style: { overflowWrap: "break-word" },
      },
      {
        header: verified,
        meta: "Verified",
        description:
          "Count of verified Certificates",
      },
      {
        header: rejected,
        meta: "Rejected",
        description:
          "Count of rejected Certificates",
      },
      {
        header: total,
        meta: "Total",
        description:
          "Total Certificates uploaded for verification",
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
        <h3>Enroll in Skill assesment tests to be officially verified</h3>
        <Grid>
        <Grid.Row>
        <Card.Group itemsPerRow={3}>
        <Card>
      <Card.Content>
        <Card.Header>Web Development Basics</Card.Header>
        <Card.Description>
        Programming Foundations with JavaScript, HTML and CSS
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Link legacyBehavior route={`/applicant/${this.props.address}/assesment/webdevbasics`}>
          <a>
            <Button
              floated="right"
              content="Enroll"
              icon="add circle"
              primary
            />
          </a>
        </Link>
    </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Card.Header>Blockchain Basics</Card.Header>
        <Card.Description>
          Basics of Ethereum and Solidity
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Link legacyBehavior route={`/applicant/${this.props.address}/certificate/new`}>
          <a>
            <Button
              floated="right"
              content="Enroll"
              icon="add circle"
              primary
            />
          </a>
        </Link>
    </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Card.Header>Python Programming</Card.Header>
        <Card.Description>
        Programming Foundations with Python.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Link legacyBehavior route={`/applicant/${this.props.address}/certificate/new`}>
          <a>
            <Button
              floated="right"
              content="Enroll"
              icon="add circle"
              primary
            />
          </a>
        </Link>
    </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Card.Header>Dummy Test1</Card.Header>
        <Card.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Link legacyBehavior route={`/applicant/${this.props.address}/certificate/new`}>
          <a>
            <Button
              floated="right"
              content="Enroll"
              icon="add circle"
              primary
            />
          </a>
        </Link>
    </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Card.Header>Dummy Test2</Card.Header>
        <Card.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Link legacyBehavior route={`/applicant/${this.props.address}/certificate/new`}>
          <a>
            <Button
              floated="right"
              content="Enroll"
              icon="add circle"
              primary
            />
          </a>
        </Link>
    </Card.Content>
    </Card>
    <Card>
      <Card.Content>
        <Card.Header>Dummy Test3</Card.Header>
        <Card.Description>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
      <Link legacyBehavior route={`/applicant/${this.props.address}/certificate/new`}>
          <a>
            <Button
              floated="right"
              content="Enroll"
              icon="add circle"
              primary
            />
          </a>
        </Link>
    </Card.Content>
    </Card>
    
    </Card.Group>
          
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default AssesmentShow;
