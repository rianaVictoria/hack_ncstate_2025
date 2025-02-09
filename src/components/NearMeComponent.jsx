
import { useNavigate } from 'react-router-dom'

/** Code for the Header of the webpage. */
const NearMeComponent = () => {

	const navigator = useNavigate();

	function addNewIngredient() {
		navigator('/near-me')
	}
}

export default NearMeComponent