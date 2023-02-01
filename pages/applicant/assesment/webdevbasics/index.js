import React, { Component } from "react";
import { Form, Radio, Progress, Button } from "semantic-ui-react";
import Layout from "../../../../components/Layout";
// import web3 from "../../../ethereum/web3";
// import factory from "../../../ethereum/factory";
// import { Link } from "../../../routes";
// import RequestRow from "../../../components/RequestRow";

class webdevbasicTest extends Component {
    state = {
        percent : 0,
        q1:"",
        q1Done:1,
        q1Ans:"Object-Oriented",
        q2:"",
        q2Done:1,
        q2Ans:"Both A and B",
        q3:"",
        q3Done:1,
        q3Ans:"Both A and B",
        q4:"",
        q4Done:1,
        q4Ans:"Markup",
        q5:"",
        q5Done:1,
        q5Ans:"HyperLink",
    }
  handleChangeQ1 = (e, data) => {
    this.setState({ q1:data.value})
    this.setState((prevState) => ({
        q1Done: prevState.q1Done+1
      }))
    if(this.state.q1Done===1){
    this.setState((prevState) => ({
    percent:prevState.percent + 20
    }))   
    }
}
handleChangeQ2 = (e, data) => {
    this.setState({ q2:data.value})
    this.setState((prevState) => ({
        q2Done: prevState.q2Done+1
      }))
    if(this.state.q2Done===1){
    this.setState((prevState) => ({
    percent:prevState.percent + 20
    }))   
    }
}

handleChangeQ3= (e, data) => {
    this.setState({ q3:data.value})
    this.setState((prevState) => ({
        q3Done: prevState.q3Done+1
      }))
    if(this.state.q3Done===1){
    this.setState((prevState) => ({
    percent:prevState.percent + 20
    }))   
    }
}
handleChangeQ4 = (e, data) => {
    this.setState({ q4:data.value})
    this.setState((prevState) => ({
        q4Done: prevState.q4Done+1
      }))
    if(this.state.q4Done===1){
    this.setState((prevState) => ({
    percent:prevState.percent + 20
    }))   
    }
}
handleChangeQ5 = (e, data) => {
    this.setState({ q5:data.value})
    this.setState((prevState) => ({
        q5Done: prevState.q5Done+1
      }))
    if(this.state.q5Done===1){
    this.setState((prevState) => ({
    percent:prevState.percent + 20
    }))   
    }
}

onSubmit = async (event) => {
    
}

  render() {
    return (
        <Layout>
        <h3>Web Development Basics Assesment</h3>
        <Progress percent={this.state.percent} indicating >Progress</Progress>
      <Form>
      <Form.Field>
      1. Javascript is an _______ language?
      </Form.Field>
      <Form.Field>
        Selected Answer: <b>{this.state.q1}</b>
        </Form.Field>
        <Form.Field>
          <Radio
            label='Object-Oriented'
            name='radioGroup'
            value='Object-Oriented'
            checked={this.state.q1 === 'Object-Oriented'}
            onChange={this.handleChangeQ1}
            
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Object-Based'
            name='radioGroup'
            value='Object-Based'
            checked={this.state.q1 === 'Object-Based'}
            onChange={this.handleChangeQ1}
            
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Procedural'
            name='radioGroup'
            value='Procedural'
            checked={this.state.q1 === 'Procedural'}
            onChange={this.handleChangeQ1}
           
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='None of the above'
            name='radioGroup'
            value='None of the above'
            checked={this.state.q1 === 'None of the above'}
            onChange={this.handleChangeQ1}
            
          />
        </Form.Field>

        </Form>
        <Form>
        <Form.Field>
      2. Which of the following keywords is used to define a variable in Javascript?
      </Form.Field>
        <Form.Field>
        Selected Answer: <b>{this.state.q2}</b>
        </Form.Field>
        <Form.Field>
          <Radio
            label='var'
            name='radioGroup'
            value='var'
            checked={this.state.q2 === 'var'}
            onChange={this.handleChangeQ2}
            
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='let'
            name='radioGroup'
            value='let'
            checked={this.state.q2 === 'let'}
            onChange={this.handleChangeQ2}
            
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Both A and B'
            name='radioGroup'
            value='Both A and B'
            checked={this.state.q2 === 'Both A and B'}
            onChange={this.handleChangeQ2}
           
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='None of the above'
            name='radioGroup'
            value='None of the above'
            checked={this.state.q2 === 'None of the above'}
            onChange={this.handleChangeQ2}
            
          />
        </Form.Field>
        </Form>
        <Form>
        <Form.Field>
        3. Which of the following methods is used to access HTML elements using Javascript?
      </Form.Field>
        <Form.Field>
        Selected Answer: <b>{this.state.q3}</b>
        </Form.Field>
        <Form.Field>
          <Radio
            label='getElementById()'
            name='radioGroup'
            value='getElementById()'
            checked={this.state.q3 === 'getElementById()'}
            onChange={this.handleChangeQ3}
            
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='getElementsByClassName()'
            name='radioGroup'
            value='getElementsByClassName()'
            checked={this.state.q3 === 'getElementsByClassName()'}
            onChange={this.handleChangeQ3}
            
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Both A and B'
            name='radioGroup'
            value='Both A and B'
            checked={this.state.q3 === 'Both A and B'}
            onChange={this.handleChangeQ3}
           
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='None of the above'
            name='radioGroup'
            value='None of the above'
            checked={this.state.q3 === 'None of the above'}
            onChange={this.handleChangeQ3}
            
          />
        </Form.Field>
        </Form>
        <Form>
        <Form.Field>
        4 . HTML is considered as ___ language
      </Form.Field>
        <Form.Field>
        Selected Answer: <b>{this.state.q4}</b>
        </Form.Field>
        <Form.Field>
          <Radio
            label='Programming'
            name='radioGroup'
            value='Programming'
            checked={this.state.q4 === 'Programming'}
            onChange={this.handleChangeQ4}
            
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='OOP'
            name='radioGroup'
            value='OOP'
            checked={this.state.q4 === 'OOP'}
            onChange={this.handleChangeQ4}
            
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='High Level'
            name='radioGroup'
            value='High Level'
            checked={this.state.q4 === 'High Level'}
            onChange={this.handleChangeQ4}
           
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Markup'
            name='radioGroup'
            value='Markup'
            checked={this.state.q4 === 'Markup'}
            onChange={this.handleChangeQ4}
            
          />
        </Form.Field>
        </Form>
        <Form>
        <Form.Field>
      5. _______ connects web pages?
      </Form.Field>
        <Form.Field>
        Selected Answer: <b>{this.state.q5}</b>
        </Form.Field>
        <Form.Field>
          <Radio
            label='Connector'
            name='radioGroup'
            value='Connector'
            checked={this.state.q5 === 'Connector'}
            onChange={this.handleChangeQ5}
            
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='Link'
            name='radioGroup'
            value='Link'
            checked={this.state.q5 === 'Link'}
            onChange={this.handleChangeQ5}
            
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='HyperLink'
            name='radioGroup'
            value='HyperLink'
            checked={this.state.q5 === 'HyperLink'}
            onChange={this.handleChangeQ5}
           
          />
        </Form.Field>
        <Form.Field>
          <Radio
            label='None of the above'
            name='radioGroup'
            value='None of the above'
            checked={this.state.q5 === 'None of the above'}
            onChange={this.handleChangeQ5}
            
          />
        </Form.Field>
      </Form>
      <Form onSubmit={this.onSubmit}>
      <Button>Submit</Button>
      </Form>
      </Layout>
    )
  }
}

export default webdevbasicTest;