import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import AuthContext from "../../context/auth/AuthContext";
import ContactContext from "../../context/contact/contactContext";

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const { isAuthenticated, logout, user } = authContext;

	const contactContext = useContext(ContactContext);
	const { clearContacts } = contactContext;

	const onLogout = () => {
		logout();
		clearContacts();
	};

	const authLinks = (
		<Fragment>
			<li>{user?.name}</li>
			<li>
				<a onClick={onLogout} href="#!">
					
					<span className="hide-sm">Logout</span>
				</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<NavLink to="/register">Register</NavLink>
			</li>
			<li>
				<NavLink to="/login">Login</NavLink>
			</li>
		</Fragment>
	);

	return (
		<div className="navbar bg-primary">
			<h1>
				<i className={icon} /> {title}
			</h1>
			<ul>
				{isAuthenticated ? authLinks : guestLinks}
			</ul>
		</div>
	);
};

Navbar.propTypes = {
	title: PropTypes.string.isRequired,
	icon: PropTypes.string,
};

Navbar.defaultProps = {
	title: "AdressBook Manager",
	icon: "fas fa-adress-book",
};

export default Navbar;
