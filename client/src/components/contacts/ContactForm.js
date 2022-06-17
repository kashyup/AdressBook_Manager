import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";

const ContactForm = () => {
	const contactContext = useContext(ContactContext);
	const { addContact, current, clearCurrent, updateContact } = contactContext;

	const [contact, setContact] = useState({
		name: "",
		
		phone: "",
		
	});

	useEffect(() => {
		if (current !== null) {
			setContact(current);
		} else {
			setContact({ name: "", phone: "" });
		}
	}, [contactContext, current]);

	const { name, phone,} = contact;

	const onChange = (e) => {
		setContact({ ...contact, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (current == null) {
			addContact(contact);
		} else {
			updateContact(contact);
		}
		clearAll();
	};

	const clearAll = () => {
		clearCurrent();
	};

	return (
		<form onSubmit={onSubmit}>
			<h2 className="text-primary">{`${
				current ? "Edit Contact" : "Add Contact"
			}`}</h2>
			<input
				type="text"
				name="name"
				placeholder="name"
				value={name}
				onChange={onChange}
			/>
			
			<input
				type="text"
				name="phone"
				placeholder="Phone"
				value={phone}
				onChange={onChange}
			/>
			<div>
				<input
					type="submit"
					value={`${current ? "Update	 Contact" : "Add Contact"}`}
					className="btn btn-primary btn-block"
				/>
			</div>
			{current && (
				<div>
					<button className="btn btn-light btn-block" onClick={clearAll}>
						Clear
					</button>
				</div>
			)}
		</form>
	);
};

export default ContactForm;
