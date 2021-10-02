import React from "react";
import Project from "./Project";
import "../css/projects.css";

import { motion } from "framer-motion";
import Divider from "@material-ui/core/Divider";
import axios from "axios";

class Projects extends React.Component {
  constructor(props) {
    super();
    this.state = {
      projects: [],
    };
  }

  fetchData = () => {
    axios.get(`${process.env.REACT_APP_MONGO_URI}projects`).then((res) => {
      console.log("projects: ", res.data);
      localStorage.setItem("projects", JSON.stringify(res.data));
      this.setState({ projects: res.data });
    });
  };

  componentDidMount() {
    const data = localStorage.getItem("projects");
    if (data) {
      this.setState({ projects: JSON.parse(data) });
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

    const content = (
      <div className={containerType} ref={this.props.refProp}>
        {starIcon}
        <div>
          <p className="heading">Projects</p>
        </div>
        <Divider
          style={{
            background: "rgba(256, 256, 256, 0.1)",
            width: "65%",
          }}
        />

        <div className="ui divided items">
          {this.state.projects?.map((project, i) => {
            return <Project key={i} {...project}></Project>;
          })}
        </div>
      </div>
    );

    if (screenType !== "desktop") {
      return content;
    } else {
      return (
        <motion.div
          className="w-container"
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

export default Projects;
