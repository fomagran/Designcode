import { StatusBar } from "expo-status-bar";
import { ScrollView, SafeAreaView } from "react-native";
import styled from "styled-components";
import Card from "./components/Card";
import { NotificationIcon } from "./components/Icons";
import Logo from "./components/Logo";
import Course from "./components/Course";
import Menu from "./components/Menu";

//code align alt+shift+f
//image source ""
export default function App() {
  return (
    <Container>
      <Menu />
      <SafeAreaView>
        <ScrollView
          style={{ height: "100%" }}
          showsVerticalScrollIndicator={false}
        >
          <TitleBar>
            <Avatar source={require("./assets/avatar.jpg")} />
            <Title> Welcome back, </Title>
            <Name> Fomagran </Name>
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
          <SubTitle>Continue Learning</SubTitle>
          <ScrollView
            horizontal={true}
            style={{ paddingBottom: 30 }}
            showsHorizontalScrollIndicator={false}
          >
            {cards.map((card, index) => (
              <Card
                key={index}
                title={card.title}
                image={card.image}
                caption={card.caption}
                logo={card.logo}
                subtitle={card.subtitle}
              />
            ))}
          </ScrollView>
          <SubTitle>Popular Courses</SubTitle>
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
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
}

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
`;

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

const Avatar = styled.Image`
  width: 44px;
  height: 44px;
  background: black;
  border-radius: 22px;
  margin-left: 20px;
  position: absolute;
  top: 0;
  left: 0;
`;

const logos = [
  {
    image: require("./assets/logo-framerx.png"),
    text: "Framer X",
  },
  {
    image: require("./assets/logo-studio.png"),
    text: "Studio",
  },
  {
    image: require("./assets/logo-react.png"),
    text: "React",
  },
  {
    image: require("./assets/logo-swift.png"),
    text: "Swift",
  },
  {
    image: require("./assets/logo-sketch.png"),
    text: "Sketch",
  },
  {
    image: require("./assets/logo-figma.png"),
    text: "Figma",
  },
];

const cards = [
  {
    title: "React Native for Designers",
    image: require("./assets/background11.jpg"),
    subtitle: "React Native",
    caption: "1 of 12 sections",
    logo: require("./assets/logo-react.png"),
  },
  {
    title: "Styled Components",
    image: require("./assets/background12.jpg"),
    subtitle: "React Native",
    caption: "2 of 12 sections",
    logo: require("./assets/logo-react.png"),
  },
  {
    title: "Props and Icons",
    image: require("./assets/background13.jpg"),
    subtitle: "React Native",
    caption: "3 of 12 sections",
    logo: require("./assets/logo-react.png"),
  },
  {
    title: "Static Data and Loop",
    image: require("./assets/background14.jpg"),
    subtitle: "React Native",
    caption: "4 of 12 sections",
    logo: require("./assets/logo-react.png"),
  },
];

const courses = [
  {
    title: "Prototype in Invision Studio",
    subtitle: "10sections",
    image: require("./assets/background10.jpg"),
    logo: require("./assets/logo-studio.png"),
    avatar: require("./assets/avatar.jpg"),
    name: "Fomagran",
    caption: "Design and interactive prototype ",
  },
  {
    title: "React for Designers",
    subtitle: "12sections",
    image: require("./assets/background11.jpg"),
    logo: require("./assets/logo-react.png"),
    avatar: require("./assets/avatar.jpg"),
    name: "Fomagran",
    caption: "Design and interactive prototype ",
  },
  {
    title: "Deisgn and Code with Framer X",
    subtitle: "10sections",
    image: require("./assets/background14.jpg"),
    logo: require("./assets/logo-framerx.png"),
    avatar: require("./assets/avatar.jpg"),
    name: "Fomagran",
    caption: "Create powerful design and code components for your app ",
  },
  {
    title: "Design System in Figma",
    subtitle: "10sections",
    image: require("./assets/background6.jpg"),
    logo: require("./assets/logo-figma.png"),
    avatar: require("./assets/avatar.jpg"),
    name: "Fomagran",
    caption:
      "Complete guide to designing a site using a collaborative design tool",
  },
];
