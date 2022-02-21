import {
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Easing,
  StatusBar,
  Platform,
} from "react-native";
import styled from "styled-components";
import Card from "../components/Card";
import { NotificationIcon } from "../components/Icons";
import Logo from "../components/Logo";
import Course from "../components/Course";
import Menu from "../components/Menu";
import React from "react";
import { connect } from "react-redux";
import Avatar from "../components/Avatar";
import { gql } from "graphql-tag";
import { Query } from "react-apollo";

const CardsQuery = gql`
  {
    cardsCollection {
      items {
        title
        subtitle
        image {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
        subtitle
        caption
        logo {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
      }
    }
  }
`;

function mapStateToProps(state) {
  return { action: state.action, name: state.name };
}

function mapDispatchToProps(dispatch) {
  return {
    openMenu: () =>
      dispatch({
        type: "OPEN_MENU",
      }),
  };
}

//code align alt+shift+f
//image source ""
//한번에 똑같은 것 다 바꾸는 법 ctrl+d 후에 바꾸기
class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    scale: new Animated.Value(1),
    opacity: new Animated.Value(1),
  };

  componentDidMount() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS == "android") StatusBar.setBarStyle("light-content", true);
  }

  componentDidUpdate() {
    this.toggleMenu();
  }

  toggleMenu = () => {
    if (this.props.action == "openMenu") {
      Animated.timing(this.state.scale, {
        toValue: 0.9,
        duration: 300,
        easing: Easing.in(),
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 0.5,
      }).start();
      StatusBar.setBarStyle("light-content", true);
    }

    if (this.props.action == "closeMenu") {
      Animated.spring(this.state.scale, {
        toValue: 1,
        duration: 300,
        easing: Easing.in(),
      }).start();
      Animated.spring(this.state.opacity, {
        toValue: 1,
      }).start();
      //dark-content로 해야함(안드로이드에선 좀 이상해서 바꿔놓음)
      StatusBar.setBarStyle("light-content", true);
    }
  };

  render() {
    return (
      <RootView>
        <Menu />
        <AnimatedContainer
          style={{
            transform: [{ scale: this.state.scale }],
            opacity: this.state.opacity,
          }}
        >
          <SafeAreaView>
            <ScrollView
              style={{ height: "100%" }}
              showsVerticalScrollIndicator={false}
            >
              <TitleBar>
                <TouchableOpacity
                  onPress={this.props.openMenu}
                  style={{ position: "absolute", top: 0, left: 20 }}
                >
                  <Avatar />
                </TouchableOpacity>
                <Title> Welcome back, </Title>
                <Name> {this.props.name} </Name>
                <NotificationIcon
                  style={{ position: "absolute", right: 20, top: 5 }}
                />
                <StatusBar style="auto" />
              </TitleBar>
              <ScrollView
                style={{
                  flexDirection: "row",
                  padding: 20,
                  paddingLeft: 12,
                  paddingTop: 30,
                }}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              >
                {logos.map((logo, index) => (
                  <Logo key={index} image={logo.image} text={logo.text} />
                ))}
              </ScrollView>
              <SubTitle>{"Continue Learning".toUpperCase()}</SubTitle>

              <Query query={CardsQuery}>
                {({ loading, error, data }) => {
                  console.log(data.cardsCollection.items[0].image.url);
                  if (loading) return <Message>Loading...</Message>;
                  return (
                    <CardsContainer>
                      <ScrollView
                        horizontal={true}
                        style={{ paddingBottom: 30 }}
                        showsHorizontalScrollIndicator={false}
                      >
                        {data.cardsCollection.items.map((card, index) => (
                          <TouchableOpacity
                            key={index}
                            onPress={() => {
                              this.props.navigation.push("Section", {
                                section: card,
                              });
                            }}
                          >
                            <Card
                              title={card.title}
                              image={card.image.url}
                              caption={card.caption}
                              logo={card.logo.url}
                              subtitle={card.subtitle}
                            />
                          </TouchableOpacity>
                        ))}
                      </ScrollView>
                    </CardsContainer>
                  );
                }}
              </Query>
              <SubTitle>Popular Courses</SubTitle>
              <CoursesContainer>
                {courses.map((course, index) => (
                  <Course
                    key={index}
                    title={course.title}
                    subtitle={course.subtitle}
                    image={course.image}
                    logo={course.logo}
                    avatar={course.avatar}
                    name={course.name}
                    caption={course.caption}
                  />
                ))}
              </CoursesContainer>
            </ScrollView>
          </SafeAreaView>
        </AnimatedContainer>
      </RootView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const CoursesContainer = styled.View`
  flex-direction:row
  flex-wrap:wrap
  padding-left:10
`;

const CardsContainer = styled.View``;
const Message = styled.Text``;

const RootView = styled.View`
  background:black
  flex:1
`;

const SubTitle = styled.Text`
  color: #b8bece;
  font-weight: 600;
  font-size: 15px;
  margin-left: 20px;
  margin-top: 20px;
  text-transform: uppercase;
`;

const Container = styled.View`
  flex: 1;
  background-color: #f0f3f5;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const AnimatedContainer = Animated.createAnimatedComponent(Container);

const Title = styled.Text`
  font-size: 16px;
  color: #b8bece;
  font-weight: 500;
`;

const Name = styled.Text`
  font-size: 20px;
  color: #3c4560;
  font-weight: bold;
`;

const TitleBar = styled.View`
  width: 100%;
  margin-top: 50px;
  padding-left: 80px;
`;

const logos = [
  {
    image: require("../assets/logo-framerx.png"),
    text: "Framer X",
  },
  {
    image: require("../assets/logo-studio.png"),
    text: "Studio",
  },
  {
    image: require("../assets/logo-react.png"),
    text: "React",
  },
  {
    image: require("../assets/logo-swift.png"),
    text: "Swift",
  },
  {
    image: require("../assets/logo-sketch.png"),
    text: "Sketch",
  },
  {
    image: require("../assets/logo-figma.png"),
    text: "Figma",
  },
];

const cards = [
  {
    title: "React Native for Designers",
    image: require("../assets/background11.jpg"),
    subtitle: "React Native",
    caption: "1 of 12 sections",
    logo: require("../assets/logo-react.png"),
  },
  {
    title: "Styled Components",
    image: require("../assets/background12.jpg"),
    subtitle: "React Native",
    caption: "2 of 12 sections",
    logo: require("../assets/logo-react.png"),
  },
  {
    title: "Props and Icons",
    image: require("../assets/background13.jpg"),
    subtitle: "React Native",
    caption: "3 of 12 sections",
    logo: require("../assets/logo-react.png"),
  },
  {
    title: "Static Data and Loop",
    image: require("../assets/background14.jpg"),
    subtitle: "React Native",
    caption: "4 of 12 sections",
    logo: require("../assets/logo-react.png"),
  },
];

const courses = [
  {
    title: "Prototype in Invision Studio",
    subtitle: "10sections",
    image: require("../assets/background10.jpg"),
    logo: require("../assets/logo-studio.png"),
    avatar: require("../assets/avatar.jpg"),
    name: "Fomagran",
    caption: "Design and interactive prototype ",
  },
  {
    title: "React for Designers",
    subtitle: "12sections",
    image: require("../assets/background11.jpg"),
    logo: require("../assets/logo-react.png"),
    avatar: require("../assets/avatar.jpg"),
    name: "Fomagran",
    caption: "Design and interactive prototype ",
  },
  {
    title: "Deisgn and Code with Framer X",
    subtitle: "10sections",
    image: require("../assets/background14.jpg"),
    logo: require("../assets/logo-framerx.png"),
    avatar: require("../assets/avatar.jpg"),
    name: "Fomagran",
    caption: "Create powerful design and code components for your app ",
  },
  {
    title: "Design System in Figma",
    subtitle: "10sections",
    image: require("../assets/background6.jpg"),
    logo: require("../assets/logo-figma.png"),
    avatar: require("../assets/avatar.jpg"),
    name: "Fomagran",
    caption:
      "Complete guide to designing a site using a collaborative design tool",
  },
];
