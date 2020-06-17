import { asyncFunction } from "..";

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
	let formText = document.getElementById('name').value;
	asyncFunction(formText);
    // Client.checkForName(formText)
}

export { handleSubmit }
