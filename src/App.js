import React, { Component } from 'react';
import './App.css';
import Ticket from './container/Ticket';
import styled from 'styled-components';

const Frame = styled.div `
  margin: 2em;
`

class App extends Component {
  render() {
    return (
      <Frame>
        <Ticket />
      </Frame>
    );
  }
}

export default App;
