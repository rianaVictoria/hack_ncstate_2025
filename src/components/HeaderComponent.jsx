import { NavLink } from 'react-router-dom'

/** Code for the Header of the webpage. */
const HeaderComponent = () => {

	return (
		<div>
			<header>
				<nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
					<a className="navbar-brand" href="http://localhost:3000">Coffee Maker</a>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item">
								<NavLink className="nav-link" to="/near-me">Home</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/inventory">Community</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/inventory">My Reports</NavLink>
							</li>
							<li className="nav-item">
								<NavLink className="nav-link" to="/inventory">Help</NavLink>
							</li>
						</ul>
					</div>
				</nav>
			</header>
		</div>
	)

}

export default HeaderComponent