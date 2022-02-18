import { createStackNavigator } from "react-navigation-stack";
//에러 떠서 npm install --global yarn 한 다음 yarn install 하고 yarn add react-navigation-tabs으로 설치함
import { createBottomTabNavigator } from "react-navigation-tabs";
import SectionScreen from "../screens/SectionScreen";
import HomeScreen from "../screens/HomeScreen";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import CoursesScreen from "../screens/CoursesScreen";
import ProjectsScreen from "../screens/ProjectsScreen";

/*Error: Requiring module "node_modules\react-native-reanimated\src\Animated.js", which threw an exception: Error: Reanimated 2 failed to create a worklet, maybe you forgot to add Reanimated's babel plugin?
barbel.config.js에 plugins: ['react-native-reanimated/plugin']추가하고 
 yarn add react-native-reanimated이거 설치해야 해결됨
 */

const activeColor = "#4775f2";
const inactiveColor = "#b8bece";

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    Section: SectionScreen,
  },
  { mode: "modal" }
);

HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true;
  const routeName = navigation.state.routes[navigation.state.index].routeName;

  if (routeName == "Section") {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: "Home",
    tabBarIcon: ({ focused }) => (
      <Ionicons
        name="ios-home"
        size={26}
        color={focused ? activeColor : inactiveColor}
      />
    ),
  };
};

const CoursesStack = createStackNavigator({
  Courses: CoursesScreen,
});

CoursesStack.navigationOptions = {
  tabBarLabel: "Courses",
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-albums"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  ),
};

const ProjectsStack = createStackNavigator({
  Projects: ProjectsScreen,
});

ProjectsStack.navigationOptions = {
  tabBarLabel: "Projects",
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name="ios-folder"
      size={26}
      color={focused ? activeColor : inactiveColor}
    />
  ),
};

const TabNavigator = createBottomTabNavigator({
  HomeStack,
  CoursesStack,
  ProjectsStack,
});

export default TabNavigator;
