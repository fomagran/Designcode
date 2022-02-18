import React from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StatusBar, Linking } from "react-native";
import { WebView } from "react-native-webview";

class SectionScreen extends React.Component {
  static navigationOptions = {
    title: "Section",
    header: null,
  };

  componentDidMount() {
    StatusBar.setBarStyle("light-content", true);
  }

  componentWillUnmount() {
    StatusBar.setBarStyle("light-content", true);
  }

  render() {
    const { navigation } = this.props;
    const section = navigation.getParam("section");

    return (
      <Container>
        <StatusBar hidden />
        <Cover>
          <Image source={{ uri: section.image.url }} />
          <Wrapper>
            <Logo source={{ url: section.logo.url }} />
            <Subtitle>{section.subtitle}</Subtitle>
          </Wrapper>
          <Title>{section.title}</Title>
          <Caption>{section.caption}</Caption>
        </Cover>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.goBack();
          }}
          style={{ position: "absolute", top: 20, right: 20 }}
        >
          <CloseView>
            <Ionicons
              name="ios-close"
              size={24}
              color="#4775f2"
              style={{ marginTop: -2 }}
            />
          </CloseView>
        </TouchableOpacity>
        <Content>
          <WebView
            source={{ html: htmlContent + htmlStyle }}
            scalesPageToFit={false}
            scrollEnabled={false}
            ref="webview"
            //웹뷰를 해당 화면에 띄우지 않고 새로운 화면을 띄워서 이동
            onNavigationStateChange={(event) => {
              if (event.url != "about:blank") {
                this.refs.webview.stopLoading();
                Linking.openURL(event.url);
              }
            }}
          />
        </Content>
      </Container>
    );
  }
}

export default SectionScreen;

const htmlContent = `
 <h2>This is a title</h2>
 <p>This <strong>is</strong> a <a href="http://fomagran.com">link</p>
 <img src="https://images.ctfassets.net/ldcl3ayg0mhx/5MeVr1wNWTMMc3upyEmDBl/103f0fc3d36024d3ccb774fd660ab277/background13.jpg"/>
`;

const htmlStyle = `
    <style>
    * {
        font-family:-apple-system, Roboto;
        margin:0
        padding:0
    }

    img {
        width:100%;
        border-radius:10px;
        margin-top:20px;
    }
    </style>
`;

const Content = styled.View`
  height: 100%;
  padding: 20px;
`;

const Wrapper = styled.View`
    flex-direction:row
    position:absolute
    top:40px
    left:20px
    align-items:center
    `;

const Logo = styled.Image`
    width:24px
    height:24px
`;

const Subtitle = styled.Text`
    font-size:15px
    font-weight:600
    color:rgba(255,255,255,0.8)
    margin-left:5px
    text-transform:uppercase
`;

const CloseView = styled.View`
    width:32px
    height:32px
    background:white
    border-radius:16px
    box-shadow:0 5px 10px rgba(0,0,0,0.15)
    justify-content:center
    align-items:center
`;

const Container = styled.View`
  flex: 1;
`;

const Cover = styled.View`
  height: 375px;
`;

const Image = styled.Image`
    width:100%
    height:100%
    position:absolute
`;

const Title = styled.Text`
    font-size:24px
    color:white
    font-weight:bold
    width:170px
    position:absolute
    top:78px
    left:20px
`;

const Caption = styled.Text`
    color:white
    font-size:17px
    position:absolute
    bottom:20px
    left:20px
    width:300px
`;
