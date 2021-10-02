import React from "react";
import { motion } from "framer-motion";
import Divider from "@material-ui/core/Divider";
import { Grid } from "semantic-ui-react";
import "../css/contact.css";
import MapContainer from "./MapContainer";
import axios from "axios";

class Contact extends React.Component {
  constructor(props) {
    super();
    this.state = {
      aboutMe: {},
    };
  }

  fetchData = () => {
    axios.get(`${process.env.REACT_APP_MONGO_URI}aboutme`).then((res) => {
      localStorage.setItem("aboutMe", JSON.stringify(res.data[0]));
      this.setState({ aboutMe: res.data[0] });
    });
  };

  componentDidMount() {
    const data = localStorage.getItem("aboutMe");
    if (data) {
      this.setState({ aboutMe: JSON.parse(data) });
    } else {
      this.fetchData();
    }
  }

  createGridRow = (type) => {
    const title = type.charAt(0).toUpperCase() + type.slice(1);

    return (
      <Grid.Row>
        <Grid.Column>
          <h3 style={{ color: "#FFC300" }}>{title}</h3>
        </Grid.Column>
        <Grid.Column>
          <h3 style={{ color: "#ffff", overflowWrap: "break-word" }}>
            {this.state.aboutMe[type]}
          </h3>
        </Grid.Column>
      </Grid.Row>
    );
  };

  render() {
    const screenType = this.props.screenType;
    const containerType = screenType + "-contact-container";
    const starIcon =
      screenType === "desktop" ? (
        <div>
          <i className="large star icon"></i>
        </div>
      ) : (
        <div></div>
      );
    const content = (
      <div className={containerType} ref={this.props.refProp}>
        {starIcon}
        <div>
          <p className="heading">Contact</p>
        </div>
        <Divider
          style={{
            background: "rgba(256, 256, 256, 0.1)",
            width: "65%",
          }}
        />

        <Grid style={{ padding: "2%" }} columns={2} divided>
          {this.createGridRow("email")}
          {this.createGridRow("phone")}
          {this.createGridRow("location")}
        </Grid>
        <MapContainer />
      </div>
    );

    if (screenType !== "desktop") {
      return content;
    } else {
      return (
        <motion.div
          className="am-container"
          initial={{ x: "-55%", y: "-50%" }}
          animate={{ x: "-35%", y: "-50%" }}
          exit={{ x: "-55%", y: "-50%" }}
        >
          {content}
        </motion.div>
      );
    }
  }
}

export default Contact;
