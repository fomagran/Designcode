import React from "react";
import styled from "styled-components";

class SectionScreen extends React.Component {
  static navigationOptions = {
    title: "Section",
  };
  render() {
    return (
      <Container>
        <Text>Section Screen</Text>
      </Container>
    );
  }
}

export default SectionScreen;

const Container = styled.View`
  flex: 1;
`;
const Text = styled.Text``;
