import React from "react";
import "../css/nav.css";
import { Grid, GridColumn } from "semantic-ui-react";

import { Link } from "react-router-dom";

class Nav extends React.Component {
  createLink = (route, iconType, className) => {
    const title = route.charAt(0).toUpperCase() + route.slice(1);
    return (
      <Link to={`/${route}`} className={className}>
        <div onClick={() => this.props.handleClick(`${route}Ref`)}>
          <i className={`${iconType} icon symbol`} />
          <h2 className="options-text">{title}</h2>
        </div>
      </Link>
    );
  };

  render() {
    const screenType = this.props.screenType;
    const navContainer = screenType + "-nav-options";

    const content = (
      <Grid columns={1} divided className={navContainer}>
        <Grid.Row>
          <GridColumn className="links" style={{ textAlign: "center" }}>
            {this.createLink("resume", "file alternate", "")}
          </GridColumn>
        </Grid.Row>
        <Grid.Row style={{ paddingTop: "0%" }}>
          <GridColumn className="links" style={{ textAlign: "center" }}>
            {this.createLink("projects", "edit", "")}
          </GridColumn>
        </Grid.Row>
        <Grid.Row style={{ paddingTop: "0%" }}>
          <GridColumn className="links" style={{ textAlign: "center" }}>
            {this.createLink("techskill", "code", "")}
          </GridColumn>
        </Grid.Row>
        <Grid.Row style={{ paddingTop: "0%" }}>
          <GridColumn
            className="links"
            style={{ textAlign: "center", borderBottom: "0px" }}
          >
            {this.createLink("contact", "address card", "")}
          </GridColumn>
        </Grid.Row>
      </Grid>
    );

    const mobile = (
      <div className="mobile-nav-container">
        {this.createLink("resume", "file alternate", "mobile-nav-link")}
        {this.createLink("projects", "edit", "mobile-nav-link")}
        {this.createLink("techskill", "code", "mobile-nav-link")}
        {this.createLink("contact", "address card", "mobile-nav-link-last")}
      </div>
    );

    if (screenType === "mobile") {
      return mobile;
    } else {
      return content;
    }
  }
}
export default Nav;
