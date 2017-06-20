import React from 'react';
import {Navbar,Nav,NavItem,NavDropdown,MenuItem,FormGroup, ControlLabel,FormControl,Button,Glyphicon} from 'react-bootstrap';
import BloggerConstants from './BloggerConstants'

class TNavBar extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			searchInput: ""
		};
		//this.processLogin = this.processLogin.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.changeBlogsFilter = this.changeBlogsFilter.bind(this);
		this.handleSelect = this.handleSelect.bind(this);
		this.searchBlogs = this.searchBlogs.bind(this);

		this.onHomeSelect = this.onHomeSelect.bind(this);

	}

	// processLogin() {
	// 	console.log("process login");
	// 	this.setState({userLoggedIn: true});
	// }
	//
	// processLogout() {
	// 	console.log("process logout ");
	// 	this.setState({userLoggedIn: false});
	// }
	//
	searchBlogs(){
		console.log("handle searchBlogs");
		this.props.onNavOptionsSelect(BloggerConstants.NAVBAR_SEARCH,this.state.searchInput);
	}
changeBlogsFilter(eventKey) {
	console.log("handle select eventKey:"+eventKey);
	console.log("handle select eventKey value:"+eventKey.target.value);
	console.log("setting search input empty");
	this.setState({
		searchInput: ""
	});
	this.props.onNavOptionsSelect(eventKey.target.value);
}

handleChange(event) {
	console.log("handle change :"+event.target.value);
	console.log("handle change :"+event.target.name);

	this.setState({
		searchInput: event.target.value
	});
}

	handleSelect(eventKey) {
		event.preventDefault();

		console.log("handle select eventKey:"+eventKey);
		// switch(eventKey){
		// 	case 1://Create Blog
		// 		//this.handleCreateBlog();
		// 		break;
		// 	case 2://login
		// 		//this.processLogin();
		// 		console.log("Calling Callback");
		// 		this.props.onNavOptionsSelect(BloggerConstants.NAVBAR_LOGIN);
		// 		break;
		// 	case 4.2://logout
		// 		//this.processLogout();
		// 		break;
		// 	case BloggerConstants.NAVBAR_CREATE_BLOG:
		// 		console.log("Calling Callback NAVBAR_CREATE_BLOG");
		// 		this.props.onNavOptionsSelect(BloggerConstants.NAVBAR_CREATE_BLOG);
		// 	default:
			console.log("Navbar handleSelect deafult Calling Callback");
				this.props.onNavOptionsSelect(eventKey);
		//		break;
		//}
		console.log("setting search input empty");
		this.setState({
			searchInput: ""
		});
	}


onHomeSelect() {
	this.props.onNavOptionsSelect(BloggerConstants.NAVBAR_HOME);
	this.setState({
		searchInput: ""
	});
}

	render() {
		console.log("Navbar render## searchInput:"+this.state.searchInput);
		var loggedInTitle = this.props.loggedInUserId;//"Hi "+this.props.loggedInUserId+" !";
		console.log("loggedInTitle :"+loggedInTitle);
		var loggedOutOptions = <Nav pullRight  onSelect={this.handleSelect}>
									<NavItem eventKey={BloggerConstants.NAVBAR_CREATE_BLOG} href="#">Create Blog</NavItem>
									<NavItem eventKey={BloggerConstants.NAVBAR_LOGIN} href="#" >Login</NavItem>
								</Nav>;
		var loggedInOptions =
								<div>
									<Nav pullRight   onSelect={this.handleSelect}>
										<NavItem eventKey={BloggerConstants.NAVBAR_CREATE_BLOG} href="#">Create Blog</NavItem>
										<NavDropdown eventKey={4} title={loggedInTitle} id="basic-nav-dropdown">
										  <MenuItem eventKey={BloggerConstants.NAVBAR_UPDATE_PROFILE}>Update Profile</MenuItem>
										   <MenuItem divider />
										  <MenuItem eventKey={BloggerConstants.NAVBAR_LOGOUT}>Logout</MenuItem>
										</NavDropdown>
									</Nav>
									  <Navbar.Form pullRight>
										<FormGroup controlId="formControlsSelect">
										  <ControlLabel>Select</ControlLabel>
										  <FormControl componentClass="select" placeholder="select" onChange={this.changeBlogsFilter} >
											<option value={BloggerConstants.NAVBAR_FILTER_MYBLOGS}>My Blogs</option>
											<option value={BloggerConstants.NAVBAR_FILTER_ALLBLOGS}>All Blogs</option>
										  </FormControl>
										</FormGroup>
									 </Navbar.Form>
								</div>
		var displayData = "";
		console.log("Navbar configureOptions : "+this.props.configureOptions);
		switch(this.props.configureOptions){
			case BloggerConstants.NAVBAR_SHOW_LOGGEDOUT_OPTIONS :
					console.log("displayData as loggedin options");
					 displayData = loggedOutOptions;
					break;
			case BloggerConstants.NAVBAR_SHOW_LOGGEDIN_OPTIONS :
					console.log("displayData as logged out options");
					displayData = loggedInOptions;
					break;
			default:
					break;

		}
	//	var displayData = (this.props.loginStatus === BloggerConstants.LOGIN_STATUS_SUCCESS) ? loggedInOptions : loggedOutOptions;
		return (
			<Navbar inverse collapseOnSelect fixedTop>
				<Navbar.Header  >
				  <Navbar.Brand >
					<a href="#"  onClick={this.onHomeSelect}>CloudTest1</a>
				  </Navbar.Brand>
				  <Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>

					<Navbar.Form pullLeft>
						<FormGroup>
						  <FormControl type="text" placeholder="Search" value={this.state.searchInput} onChange={this.handleChange} />
						</FormGroup>

						<Button type="button" onClick={this.searchBlogs}>
						<Glyphicon glyph="search" />
						</Button>
					</Navbar.Form>

				  {displayData}
				</Navbar.Collapse>
			</Navbar>
		);
	}
}
export default TNavBar;
