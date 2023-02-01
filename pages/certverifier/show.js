import React, { Component } from "react";
import { Card, Grid, Button } from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory";
import { Link } from "../../routes";

class CertVerifierShow extends Component {
  static async getInitialProps(props) {
    const accountDetail = await factory.methods.getAccount().call({from:props.query.address});

    return {
      name: accountDetail[0],
      email: accountDetail[1],
      logo: accountDetail[2],
      aDescription: accountDetail[3],
      addr:props.query.address
    };
  }

  renderCards() {
    const {
        name,
        email,
        logo,
        aDescription
    } = this.props;

    const items = [
      {
        header: name,
        meta: "Name",
        description:
          "Name of the verifier",
        style: { overflowWrap: "break-word" },
      },
      {
        header: email,
        meta: "eMail ID",
        description:
          "official email address of the verifier",
      },
      {
        header: logo,
        meta: "LOGO",
        description:
          "yet to configure",
      },
      {
        header: aDescription,
        meta: "Description",
        description:
          "Bio of the verifier",
      }
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h3>Welcome Certificate Verifier!</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}</Grid.Column>
            <Grid.Column width={6}>
            <Card>
              <Card.Content>
                <Card.Header>Verify Certificates</Card.Header>
                <Card.Description>
                  View certificates sent for verification on the blockchain
                </Card.Description>
                <Link legacyBehavior route={`/certverifier/${this.props.addr}/verify`}>
                <a>
                  <Button
                    floated="right"
                    content="Open"
                    icon="add circle"
                    primary
                  />
                </a>
              </Link>
              </Card.Content>
            </Card>
            </Grid.Column>

          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default CertVerifierShow;
