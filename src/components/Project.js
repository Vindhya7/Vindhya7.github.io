import React from "react";
import "../css/projects.css";

class Project extends React.Component {
  render() {
    const name = this.props.imageName;
    const img = require(`../images/${name}`).default;
    return (
      <div className="item" style={{ padding: "3%" }}>
        <div className="image">
          <img src={img} alt="Project" />
        </div>
        <div className="content">
          <a
            className="header"
            style={{ color: "#FFC300" }}
            href={this.props.github}
            target="_blank"
            rel="noreferrer"
          >
            {this.props.projectName}
          </a>
          <div className="meta">
            <span className="location">{this.props.company}</span>
          </div>
          <div className="description" style={{ color: "#ffff" }}>
            <ul>
              {this.props.desc?.map((des, i) => {
                return <li key={i}>{des}</li>;
              })}
            </ul>
          </div>
          <div className="extra">
            {this.props.tags?.map((tag, i) => {
              return (
                <div
                  className="ui label"
                  style={{ backgroundColor: "rgba(256, 256, 256, 0.5)" }}
                  key={i}
                >
                  {tag}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
