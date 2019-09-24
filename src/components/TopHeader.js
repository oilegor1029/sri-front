import React from "react";
import { withTranslation } from "react-i18next";
import { Dropdown, Form, Nav, Navbar, Image } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faEllipsisV } from "@fortawesome/free-solid-svg-icons";

import "../style/TopHeader.scss";

class TopHeader extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <header className="">
                <Navbar id="top-header">
                    <Navbar.Brand as={Link} to="/">
                        {t("header.welcome")}
                    </Navbar.Brand>
                    <Nav className="mx-auto">
                        <Nav.Link as={NavLink} activeClassName="active" to="/dashboard">
                            {t("header.main-menu.home")}
                        </Nav.Link>
                        <Nav.Link as={NavLink} activeClassName="active" to="/network">
                            {t("header.main-menu.network")}
                        </Nav.Link>
                        <Nav.Link as={NavLink} activeClassName="active" to="/community">
                            {t("header.main-menu.community")}
                        </Nav.Link>
                        <Nav.Link as={NavLink} activeClassName="active" to="/contracts">
                            {t("header.main-menu.contracts")}
                        </Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Item>
                            <Form inline>
                                <Form.Control type="text" placeholder="Search" className="mr-sm-2" />
                            </Form>
                        </Nav.Item>
                        <Nav.Item>
                            <Dropdown>
                                <Dropdown.Toggle as="span">
                                    <FontAwesomeIcon icon={faBell} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/notification-1">Notification 1</Dropdown.Item>
                                    <Dropdown.Item href="#/notification-2">Notification 2</Dropdown.Item>
                                    <Dropdown.Item href="#/notification-3">Notification 3</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Item>
                        <Nav.Item>
                            <Dropdown>
                                <Dropdown.Toggle as="span">
                                    <FontAwesomeIcon icon={faEllipsisV} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item href="#/notification-1">Notification 1</Dropdown.Item>
                                    <Dropdown.Item href="#/notification-2">Notification 2</Dropdown.Item>
                                    <Dropdown.Item href="#/notification-3">Notification 3</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/personal-area/profile">
                                <Image src={require("../static/img/profile.png")} roundedCircle img-fluid="true" />
                            </Link>
                        </Nav.Item>
                    </Nav>
                </Navbar>
            </header>
        );
    }
}

export default withTranslation()(TopHeader);
