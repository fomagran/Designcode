import React from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, StatusBar, Linking, ScrollView } from "react-native";
import { WebView } from "react-native-webview";
import MarkdownView from "react-native-showdown";

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
      <ScrollView>
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
            {/* <WebView
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
          /> */}
            <MarkdownView
              body={markDownSample}
              pureCSS={htmlStyle}
              scalesPageToFit={false}
              scrollEnabled={false}
            />
          </Content>
        </Container>
      </ScrollView>
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
    * {
        font-family:-apple-system, Roboto;
        margin:0
        padding:0
        font-size:17px
        font-weight:normal
        color:#3c4560
        line-height:24px
    }

    h2 {
      font-size:20px
      text-transform:uppercase
      color:#b8bece
      font-weight:600
      margin-top:50px
    }

    p{
      margin-top:20px
    }

    a {
      color:#4775f2
      font-weight:600
      text-decoration:none
    }

    strong {
      font-weight:700
    }

    img {
        width:100%;
        border-radius:10px;
        margin-top:20px;
    }
`;

const Content = styled.View`
  height: 1000px
  padding: 0px;
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

const markDownSample = `
---
__Advertisement :)__

- __[pica](https://nodeca.github.io/pica/demo/)__ - high quality and fast image
  resize in browser.
- __[babelfish](https://github.com/nodeca/babelfish/)__ - developer friendly
  i18n with plurals support and easy syntax.

You will like those projects!

---

# h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

***


## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.


## Lists

Unordered

+ Create a list by starting a line with
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
1. ...or keep all the numbers as 

Start numbering with offset:

57. foo
1. bar


## Code

Inline

Indented code

    // Some comments
    line 1 of code
    line 2 of code
    line 3 of code


Block code "fences"
`;
