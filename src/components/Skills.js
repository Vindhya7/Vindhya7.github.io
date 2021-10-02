import React from "react";
import "../css/skills.css";

import { motion } from "framer-motion";
import { Grid } from "semantic-ui-react";
import { Card } from "semantic-ui-react";
import Divider from "@material-ui/core/Divider";
import axios from "axios";
import Chip from "@material-ui/core/Chip";

class Skills extends React.Component {
  constructor(props) {
    super();
    this.state = {
      skills: [],
    };
  }

  fetchData = () => {
    axios.get("http://localhost:5000/skills").then((res) => {
      localStorage.setItem("skills", JSON.stringify(res.data));
      this.setState({ skills: res.data });
    });
  };

  componentDidMount() {
    const data = localStorage.getItem("skills");
    if (data) {
      this.setState({ skills: JSON.parse(data) });
    } else {
      this.fetchData();
    }
  }

  render() {
    const screenType = this.props.screenType;
    const containerType = screenType + "-skills-container";
    const starIcon =
      screenType === "desktop" ? (
        <div>
          <i className="large star icon"></i>
        </div>
      ) : (
        <div></div>
      );
    const skillGrid = (
      <Grid style={{ justifyContent: "center" }} columns={2} divided>
        {this.state.skills.map((skillSet, i) => {
          return (
            <Card
              key={i}
              style={{
                backgroundColor: "#2c2c38",
                margin: "5%",
              }}
            >
              <Card.Content style={{ borderBottom: "white solid 1px" }}>
                <Card.Header>
                  <div className="skill-heading">{skillSet.name}</div>
                </Card.Header>
              </Card.Content>
              <Card.Content>
                {skillSet.list.map((skill, i) => {
                  return (
                    <Chip style={{ margin: "2%" }} key={i} label={skill} />
                  );
                })}
              </Card.Content>
            </Card>
          );
        })}
      </Grid>
    );

    const content = (
      <div className={containerType} ref={this.props.refProp}>
        {starIcon}
        <div>
          <p className="heading">Technical Skill </p>
        </div>
        <Divider
          style={{
            background: "rgba(256, 256, 256, 0.1)",
            width: "65%",
          }}
        />
        {skillGrid}
      </div>
    );

    if (screenType !== "desktop") {
      return content;
    } else {
      return (
        <motion.div
          className="ts-container"
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

export default Skills;
