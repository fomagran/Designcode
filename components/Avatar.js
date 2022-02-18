import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    name: state.name,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateName: (name) =>
      dispatch({
        type: "UPDATE_NAME",
        name: name,
      }),
  };
}

class Avatar extends React.Component {
  state = {
    photo:
      "https://user-images.githubusercontent.com/47676921/154576116-39367841-a7f2-4e93-8024-e6967c7162c2.jpg",
  };

  componentDidMount() {
    fetch("https://api.github.com/users/fomagran")
      .then((res) => res.json())
      .then((res) => {
        this.setState({
          photo: res.avatar_url,
        });
        this.props.updateName(res.name);
      });
  }

  render() {
    return <Image source={{ uri: this.state.photo }} />;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Avatar);

const Image = styled.Image`
    width:44px
    height:44px
    border-radius:22px
`;
