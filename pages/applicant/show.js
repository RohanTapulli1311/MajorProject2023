import React, { Component } from "react";
import { Card, Grid, Button, Image, Item } from "semantic-ui-react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import factory from "../../ethereum/factory";
import { Link } from "../../routes";


class ApplicantShow extends Component {
  static async getInitialProps(props) {
    const accountDetail = await factory.methods.getAccount().call({from:props.query.address});
    let index = []
    for(let i=0;i<accountDetail[6];i++){
      index.push(i)
    }
    return {
      name: accountDetail[0],
      email: accountDetail[1],
      logo: accountDetail[2],
      aDescription: accountDetail[3],
      skills:accountDetail[6],
      addr:props.query.address,
      index:index
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
          "Name of the applicant",
        style: { overflowWrap: "break-word" },
      },
      {
        header: email,
        meta: "eMail ID",
        description:
          "official email address of the applicant",
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
          "Bio of the user",
      }
    ];

    return <Card.Group items={items} />;
  }

  renderSkills(){
    const {
      skills  
  } = this.props;

  if(skills==[]){
    return (
      <h2>No verified skills</h2>
    );
  }
  else{
  return this.props.skills.map((skills) => {
    return (
      
      <Item>
      {/* <Item.Image size='small' src='../../images/wireframe/image.png' /> */}

      <Item.Content verticalAlign='middle'>
        <Item.Header as ='a'>{skills}</Item.Header>
        <Item.Description>verified skill</Item.Description>
        <Item.Extra>
          <Button floated='right'>Action</Button>
        </Item.Extra>
      </Item.Content>
    </Item>
   
    );
  });
}
  }

  render() {
    return (
      <Layout>
        <h3>Welcome!</h3>
        <Grid>
          <Grid.Row>
            <Grid.Column width={10}>{this.renderCards()}
            <h3>Verified Skills</h3>
            <Card>
              <Card.Content>
          <Item.Group relaxed divided>
          {this.renderSkills()}
          </Item.Group>
          </Card.Content>
          </Card>
            </Grid.Column>
            <Grid.Column width={6}>
            <Card>
              <Card.Content>
                <Card.Header>My Documents</Card.Header>
                <Card.Description>
                  Upload documents for verification and view its status here
                </Card.Description>
                <Link legacyBehavior route={`/applicant/${this.props.addr}/documents`}>
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
            <Card>
              <Card.Content>
                <Card.Header>My Certifications</Card.Header>
                <Card.Description>
                  Upload your Certifications for verification and view its status here
                </Card.Description>
                <Link legacyBehavior route={`/applicant/${this.props.addr}/certificate`}>
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
            <Card>
              <Card.Content>
                <Card.Header>Skill Assesment</Card.Header>
                <Card.Description>
                  Enroll in skill assesment and validation tests to be skill verified by versera
                </Card.Description>
                <Link legacyBehavior route={`/applicant/${this.props.addr}/assesment`}>
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

export default ApplicantShow;
