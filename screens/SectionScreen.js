import React from "react";
import styled from "styled-components";
import { Button } from "react-native";

class SectionScreen extends React.Component {
  static navigationOptions = {
    title: "Section",
    header: null,
  };
  render() {
    const { navigation } = this.props;
    const section = navigation.getParam("section");

    return (
      <Container>
        <Text>{section.title}</Text>
      </Container>
    );
  }
}

export default SectionScreen;

const Container = styled.View`
  flex: 1;
  justify-content:center
  align-items:center
`;
const Text = styled.Text``;
