import React from "react";
import Contact from "./Contact";
import Resume from "./Resume";
import Projects from "./Projects";
import Nav from "./Nav";
import Skills from "./Skills";
import ParticleBackground from "./particleBackground";
import "../css/App.css";

import AV from "../images/me.jpg";

import pdf from "../file/VindhyaRaviPrakash_Resume.pdf";

import { Image } from "semantic-ui-react";
import { Grid } from "semantic-ui-react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import TypeWriterEffect from "react-typewriter-effect";
import axios from "axios";

const initPages = { aboutMe: false, resume: false, works: false };

class App extends React.Component {
  constructor() {
    super();
    console.log("starting app");
    this.state = {
      pages: initPages,
      aboutMe: {},
      width: window.innerWidth,
      resumeRef: React.createRef(),
      projectsRef: React.createRef(),
      techskillRef: React.createRef(),
      contactRef: React.createRef(),
    };
  }

  handleClick = (type) => {
    this.state[type]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  componentDidMount() {
    console.log(process.env.PUBLIC_URL);
    axios.get(`${process.env.REACT_APP_MONGO_URI}aboutme`).then((res) => {
      this.setState({ aboutMe: res.data[0] });
    });
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    this.setState({ width: window.innerWidth });
  };

  showComponent = (name) => {
    console.log(name);
    let pages = initPages;
    switch (name) {
      case "Contact":
        pages.aboutMe = true;
        break;
      case "Resume":
        pages.resume = true;
        break;
      case "Projects":
        pages.works = true;
        break;
      default:
        break;
    }
    this.setState({ pages });
  };

  createSubComponents = (type) => {
    return (
      <>
        <Resume screenType={`${type}`} refProp={this.state.resumeRef} />
        <Projects screenType={`${type}`} refProp={this.state.projectsRef} />
        <Skills screenType={`${type}`} refProp={this.state.techskillRef} />
        <Contact screenType={`${type}`} refProp={this.state.contactRef} />
      </>
    );
  };

  createRouter = (type) => {
    return (
      <Router>
        <Nav screenType={`${type}`} handleClick={this.handleClick} />
        <Switch>
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    );
  };

  render() {
    const styles = {
      backgroundColor: "#2c2c38",
      height: "70%",
      position: "relative",
      flex: "1",
    };

    const gridRow = (
      <>
        <Grid.Row style={{ marginBottom: "2%" }}>
          <Grid.Column>
            <Image src={AV} className="ui fluid image" />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ marginBottom: "2%" }}>
          <Grid.Column style={{ textAlign: "center" }}>
            <h1 className="my-name">{this.state.aboutMe?.name}</h1>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ marginBottom: "2%" }}>
          <Grid.Column>
            <TypeWriterEffect
              textStyle={{
                color: "#ffc300",
                fontSize: "20px",
                textAlign: "center",
              }}
              loop={true}
              startDelay={500}
              nextTextDelay={1000}
              typeSpeed={70}
              cursorColor="#ffc300"
              multiText={this.state.aboutMe?.interests}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ marginBottom: "10%" }}>
          <Grid.Column style={{ textAlign: "center" }}>
            <a
              href={this.state.aboutMe?.github}
              target="_blank"
              rel="noreferrer"
            >
              <i className="large github icon app-icon" />
            </a>
            <a
              href={this.state.aboutMe?.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <i className="large linkedin icon app-icon" />
            </a>
          </Grid.Column>
        </Grid.Row>
      </>
    );

    const resumeDiv = (
      <div>
        <button
          style={{
            width: "100%",
            backgroundColor: "#2c2c38",
            borderTop: "1px solid rgba(256, 256, 256, 0.1)",
            height: "55px",
          }}
          className="ui  button"
        >
          <i className="arrow down icon app-icon"></i>
          <a
            className="download-text"
            href={pdf}
            target="_blank"
            rel="noreferrer"
          >
            Download Resume
          </a>
        </button>
      </div>
    );

    const grid = (
      <>
        <Grid style={{ marginBottom: "2%" }}>{gridRow}</Grid>
        {resumeDiv}
      </>
    );

    const content = (
      <div className="main-container">
        <Grid className="content-container">{gridRow}</Grid>
        {resumeDiv}
      </div>
    );

    const tablet = (
      <ParticleBackground subComponents={this.createSubComponents("tablet")}>
        <div
          style={{
            ...styles,
            width: "60%",
            marginTop: "12%",
            alignContent: "flex-start",
          }}
        >
          {grid}
        </div>
        {this.createRouter("tablet")}
      </ParticleBackground>
    );

    const mobile = (
      <ParticleBackground subComponents={this.createSubComponents("mobile")}>
        {this.createRouter("mobile")}
        <div style={{ ...styles, width: "90%", marginTop: "83px" }}>{grid}</div>
      </ParticleBackground>
    );

    if (this.state.width > 650 && this.state.width <= 1200) {
      return tablet;
    } else if (this.state.width <= 650) {
      return mobile;
    } else {
      return (
        <>
          <ParticleBackground />
          <div className="duplicate-main-container"></div>
          {content}
          <Router>
            <Nav screenType={`desktop`} handleClick={this.handleClick} />
            <AnimatePresence exitBeforeEnter>
              <Switch>
                <Route
                  path={`/contact`}
                  exact
                  render={() => <Contact screenType={`desktop`} />}
                />
                <Route
                  path={`/resume`}
                  render={() => <Resume screenType={`desktop`} />}
                />
                <Route
                  path={`/projects`}
                  render={() => <Projects screenType={`desktop`} />}
                />
                <Route
                  path={`/techskill`}
                  render={() => <Skills screenType={`desktop`} />}
                />
              </Switch>
            </AnimatePresence>
          </Router>
        </>
      );
    }
  }
}

export default App;
