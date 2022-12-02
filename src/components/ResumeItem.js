import React from "react";
import "../css/resume.css";

class ResumeItem extends React.Component {
  render() {
    return (
      <div className="content-items">
        <div className="content-item">
          <div className="date">{this.props.date}</div>
          <div className="name">
            {this.props.school_name || this.props.position}
          </div>
          <div className="company">{this.props.company}</div>
          <div className="location">{this.props.location}</div>
          <p>{this.props.degree}</p>
          <div className="content-item-description">
            <ul>
              {this.props.desc?.map((des, i) => {
                return <li key={i}>{des}</li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ResumeItem;
