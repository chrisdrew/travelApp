
import { asyncFunction } from './js/api'
import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'

// import "~bootstrap/scss/bootstrap.scss";
// import '~bootstrap/dist/css/bootstrap.min.css';
import './styles/resets.scss'
import './styles/base.scss'

console.log(checkForName);

console.log("CHANGE!!");

export {
    checkForName,
	handleSubmit,
	asyncFunction
}
