import React, { useState } from "react";
import Cards from "react-credit-cards";
import Axios from "axios";
import "./App.css";
import "react-credit-cards/es/styles-compiled.css";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
	// UseStates ...................

	const [number, setNumber] = useState("");
	const [name, setName] = useState("");
	const [expiry, setExpiry] = useState("");
	const [cvc, setCvc] = useState("");
	const [focus, setFocus] = useState("");
	const [allEnt, setAllEnt] = useState([]);
	const [respdata, setRespData] = useState();

	// const [error, setError] = useState("");
	// api ........
	const url = "https://run.mocky.io/v3/0b14a8da-5fc7-4443-8511-53d687399bc9";
	const [data, setData] = useState({
		number: "",
		name: "",
		expiry: "",
		cvc: "",
		focus: "",
	});

	const submitData = (e) => {
		e.preventDefault();

		if (number && name && expiry && cvc) {
			Axios.post(url, {
				number: data.number,
				name: data.name,
				expiry: data.expiry,
				cvc: data.cvc,
				res: data.res,
				focus: data.focus,
			})

				.then((res) => {
					console.log(res.data);
					setRespData(res.data);
				})
				.catch((error) => {
					console.log(error.response + " error");
				});

			setNumber("");
			setName("");
			setExpiry("");
			setCvc("");
		} else {
			alert("please fill the data properly");
		}

		const newData = {
			number: number,
			name: name,
			expiry: expiry,
			cvc: cvc,
			focus: focus,
		};

		setAllEnt([...allEnt, newData]);
		setData(newData);
		console.log(newData);

		// const newData = { ...data };
		// newData[e.target.id] = e.target.value;
	};

	// 2nd option .....................
	// const submitData = (e) => {
	// 	e.preventDefault();

	//   const newData = {

	// if (number && name && expiry && cvc) {
	// 	const newEnt = {
	// 		number: number,
	// 		name: name,
	// 		expiry: expiry,
	// 		cvc: cvc,
	// 		focus: focus,
	// 	};
	// 	setAllEnt([...allEnt, newEnt]);

	// 	setNumber("");
	// 	setName("");
	// 	setExpiry("");
	// 	setCvc("");
	// } else {
	// 	alert("please fill the data properly");
	// }
	// console.log(allEnt);
	// };

	return (
		<>
			<div className="app">
				<img
					// src="https://freesvg.org/img/credit_card.png"
					alt=""
					className="header_image"
				/>

				<h5 className="app_heading mt-4">INSTA CRED APP </h5>
				{/* 5 props passed in below React-Card */}
				<Cards
					number={number}
					name={name}
					expiry={expiry}
					cvc={cvc}
					focused={focus}
				/>

				{/*Main Container starts from here */}
				<div className="form-container">
					<form action="" onSubmit={submitData}>
						<strong>Account Number :</strong>
						<input
							type="number"
							name="number"
							placeholder="Please Enter your Card Number"
							value={number}
							onChange={(e) => setNumber(e.target.value)}
							onFocus={(e) => setFocus(e.target.name)}
							required
							// min="1"
							// max="16"
							// maxLength="16"
							// size="20"
						/>
						<br />

						<strong>Account Holder Name :</strong>
						<input
							type="text"
							name="name"
							placeholder="Enter Name Here"
							value={name}
							onChange={(e) => setName(e.target.value)}
							onFocus={(e) => setFocus(e.target.name)}
							required
							// min="1"
							// maxLength="20"
						/>
						<br />

						<strong>Expiry :</strong>
						<input
							type="number"
							name="expiry"
							min="0"
							placeholder=" MM/YY Expiry"
							value={expiry}
							// min="0"
							// max="4"
							onChange={(e) => setExpiry(e.target.value)}
							onFocus={(e) => setFocus(e.target.name)}
							required
						/>
						<br />

						<strong>CVV :</strong>
						<input
							type="number"
							name="cvc"
							placeholder="CVC"
							value={cvc}
							onChange={(e) => setCvc(e.target.value)}
							onFocus={(e) => setFocus(e.target.name)}
							required
							// min="0"
							// max="3"
						/>
						<br />
						<button className="submit_button" type="submit">
							Send
						</button>
					</form>

					{/* Show the Inserted data */}
					<div>
						{allEnt.map((currElem) => {
							return (
								<div className="showDetails mt-4">
									<p>{`💳 Your Credit Card Number:${currElem.number}`}</p>
									<p>{`🧑 ‍Your Name :${currElem.name}`}</p>
									<p>{`🤯 Your Expiry Date is :${currElem.expiry}`}</p>
									<p>{`💳 Your CVV number is :${currElem.cvc}`}</p>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
