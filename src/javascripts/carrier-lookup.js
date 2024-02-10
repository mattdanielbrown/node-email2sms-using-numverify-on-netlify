'use strict';

require('dotenv').config();
// const apiKey = process.env.API_KEY;
const apiKey = process.env.API_ACCESS_KEY;
// Global variable to store the phone number carrier
const accessKey = apiKey;
let phoneNumber;
let phoneNumberCarrier;

window.addEventListener('DOMContentLoaded', (event) => {

	// DOM Setup
	const carrierLookupForm = document.getElementById('carrier-lookup-form');
	const carrierLookupFormSubmit = document.getElementById('carrier-lookup-form-submit');
	const carrierLookupResults = document.getElementById('carrier-lookup-result');
	const phoneNumberInput = document.getElementById('phone-input');

	function handleResult(result) {
		console.log(result);
		console.log("\n");
		console.log("CARRIER " + result.carrier);
		carrierLookupResults.innerText = result.carrier;
	}

	function performApiFetch(url, resultsElement) {
		// use the fetch method for the AJAX call

		// 		fetch(url)
		// 			.then(response => {
		// 				if (!response.ok) {
		// 					throw new Error('Network response was not ok');
		// 				}
		// 				return response.json();
		// 			})
		// 			.then(json => {
		// 				// Store the phone number carrier in the global variable
		// 				// phoneNumberCarrier = json.carrier;
		// 
		// 				// Access and use your preferred validation result objects
		// 				console.log(`IS JSON VALID: ${json.valid}`);
		// 				console.log(`COUNTRY CODE: ${json.country_code}`);
		// 				console.log(`CARRIER: ${phoneNumberCarrier}`);
		// 				// resultsElement.innerHTML = phoneNumberCarrier;
		// 			})
		// 			.catch(error => {
		// 				console.error('There was a problem with the fetch operation:', error);
		// 			});

		const myHeaders = new Headers();
		myHeaders.append("apikey", accessKey);

		const requestOptions = {
			method: 'GET',
			redirect: 'follow',
			headers: myHeaders
		};

		fetch(url, requestOptions)
			.then(response => response.text())
			.then(result => {
				// Extract the "carrier" property from the result
				var carrierResult = result.carrier;

				// Display the result in the HTML element with id "carrier-lookup-results"
				document.getElementById("carrier-lookup-results").innerText = "Carrier: " + carrierResult;
			})
			// .then(result => handleResult(result))
			.catch(error => console.log('error', error));
	}


	carrierLookupForm.addEventListener('submit', function (event) {
		event.preventDefault();

		phoneNumber = phoneNumberInput.value;
		// const url = `http://apilayer.net/api/validate?access_key=${accessKey}&number=${phoneNumber}`;
		const url = `https://api.apilayer.com/number_verification/validate?number=${phoneNumber}`;

		performApiFetch(url, carrierLookupResults);
	});


});
