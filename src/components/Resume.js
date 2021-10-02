import React from "react";
import { motion } from "framer-motion";
import { Grid } from "semantic-ui-react";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import "../css/resume.css";
import ResumeItem from "./ResumeItem";

class Resume extends React.Component {
  constructor(props) {
    super();
    this.state = {
      education: [],
      experience: [],
    };
  }
  //fetching stuff
  fetchData = (routeName) => {
    axios.get(`${process.env.REACT_APP_MONGO_URI}${routeName}`).then((res) => {
      localStorage.setItem(routeName, JSON.stringify(res.data));
      this.setState({ [routeName]: res.data });
    });
  };

  componentDidMount() {
    const educationData = localStorage.getItem("education");
    if (educationData) {
      this.setState({ education: JSON.parse(educationData) });
    } else {
      this.fetchData("education");
    }
    const experienceData = localStorage.getItem("experience");
    if (experienceData) {
      this.setState({ experience: JSON.parse(experienceData) });
    } else {
      this.fetchData("experience");
    }
  }

  createGridCol = (type, contentHeading) => {
    const title = type.charAt(0).toUpperCase() + type.slice(1);

    return (
      <Grid.Column>
        <div className="content">
          <Grid style={{ paddingBottom: "5%" }}>
            <Grid.Row>
              <Grid.Column style={{ margin: "2%" }}>
                <i
                  className="large briefcase icon resume-i"
                  style={{ color: "#FFC300" }}
                ></i>
              </Grid.Column>
              <Grid.Column style={{ margin: "2%" }}>
                <div className={contentHeading}>{title}</div>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <Divider
            style={{
              background: "rgba(256, 256, 256, 0.1)",
              width: "55%",
            }}
          />

          {this.state[type].map((item, i) => {
            return <ResumeItem key={i} {...item}></ResumeItem>;
          })}
        </div>
      </Grid.Column>
    );
  };

  render() {
    const screenType = this.props.screenType;
    const containerType = screenType + "-resume-container";
    const col = screenType === "mobile" ? 1 : 2;
    const contentHeading = screenType + "-resume-heading";
    const starIcon =
      screenType === "desktop" ? (
        <div>
          <i className="large star icon"></i>
        </div>
      ) : (
        <div></div>
      );
    const divider =
      screenType === "mobile" ? (
        <Divider
          variant="middle"
          style={{
            background: "rgba(256, 256, 256, 0.1)",
            width: "55%",
          }}
        />
      ) : (
        <Divider
          style={{
            background: "rgba(256, 256, 256, 0.1)",
          }}
        />
      );

    const content = (
      <div className={containerType} ref={this.props.refProp}>
        {starIcon}
        <div>
          <p className="heading">Resume</p>
        </div>

        <Divider
          style={{
            background: "rgba(256, 256, 256, 0.1)",
            width: "65%",
          }}
        />

        <Grid columns={col}>
          <Grid.Row>
            {this.createGridCol("experience", contentHeading)}
            {divider}
            {this.createGridCol("education", contentHeading)}
          </Grid.Row>
        </Grid>
      </div>
    );

    if (screenType !== "desktop") {
      return content;
    } else {
      return (
        <motion.div
          className="r-container"
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

export default Resume;
