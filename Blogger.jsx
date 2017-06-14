	import React from 'react';
	import TNavBar from './TNavBar.jsx';
	import NewBlog from './NewBlog.jsx';
	import LoginScreen from './LoginScreen.jsx';
	import NewUser from './NewUser.jsx';
	//import BlogDisplay from './BlogDisplay.jsx';
	import BloggerHome from './BloggerHome.jsx';
	//import CommentDisplay from './CommentDisplay.jsx'; // Should be remvd
	import BlogAndCommentsScrn from './BlogAndCommentsScrn.jsx';
	import BloggerConstants from './BloggerConstants';
	import $ from 'jquery';

	/*
	  States :
	  HOME_LOGGEDOUT
	  LOGIN
	  SIGNUP
	  HOME_LOGGEDIN
	  PROFILE_UPDATE
	  NEW_BLOG
	  VIEW_BLOG
	*/
	class Blogger extends React.Component {
		constructor(props){
			super(props);
			console.log("Blogger");
			this.state = {
				currentAppState: BloggerConstants.STATE_HOME_LOGGEDOUT,
				//currentAppState:"TEST_STATE" ,
				loggedInUserId : "",
				loginReason : BloggerConstants.LOGIN_TO_APP,
				searchStr : "",
				selectedBlog : null

			};
			this.onLoginRequestForComment = this.onLoginRequestForComment.bind(this);
			this.onNavOptionsSelectCB = this.onNavOptionsSelectCB.bind(this);
			this.onLoginDataReceivedCB = this.onLoginDataReceivedCB.bind(this);
			this.onNewUserDataReceivedCB = this.onNewUserDataReceivedCB.bind(this);
			this.onNewBlogDataReceivedCB = this.onNewBlogDataReceivedCB.bind(this);

			this.onUserTriggerForDetailedViewCB = this.onUserTriggerForDetailedViewCB.bind(this);
		}

		onUserTriggerForDetailedViewCB(blogData) {
			console.log("Blogger onUserTriggerForDetailedViewCB :"+blogData);
			this.setState({
				currentAppState:BloggerConstants.STATE_VIEW_BLOG,
				selectedBlog : blogData
			});


		}

		onNewUserDataReceivedCB(newUserData) {
			var nextState;
			if(newUserData != null) {
				console.log("Blogger onNewUserDataReceivedCB userId :"+newUserData.userDetails.userId);
				$.ajax({

					url : 'rest/blogger/user',
					type : 'post',
					contentType: "application/json; charset=utf-8",
					success : function(data,textStatus, jqXHR) {
						console.log("saveSignUpDetailsBtn success callback");
						console.log("Token:"+jqXHR.getResponseHeader("AUTHORIZATION"));
						window.sessionStorage.accessToken = jqXHR.getResponseHeader("AUTHORIZATION");
						//console.log("signUpuserName callback:"+userId);
						//$("#updateProfileBtn").data("userData",userId);
						//$("#myblogsFilter").data("userData",userId);
						// if(window.sessionStorage.getItem("prevAction") == "newBlog"){
						// 	console.log("removing PrevAction and showing new blog screen");
						// 	window.sessionStorage.removeItem("prevAction");
						// 	showNewBlogScreen();
						// } else if(window.sessionStorage.getItem("prevAction") == "addComment") {
						// 	console.log("removing PrevAction and showing add comment screen");
						// 	window.sessionStorage.removeItem("prevAction");
						// 	showBlogAndCommentsScreen();
						// }
						// else{
						// 	console.log("showing logged in options");
						// 	configureMenuBarOptions("loggedIn");
						// 	$("#myblogsFilter").val("My Blogs");
						// 	fetchAllBlogs(null,userId);
						// }
						console.log("new User Add settingState userData.userAddReason :"+newUserData.userAddReason );
						if(newUserData.userAddReason === BloggerConstants.LOGIN_TO_ADDBLOG){
							nextState = BloggerConstants.STATE_NEW_BLOG;
						} else if (newUserData.userAddReason === BloggerConstants.LOGIN_TO_ADDCOMMENT) {
							nextState = BloggerConstants.STATE_VIEW_BLOG;
						} else {
							nextState = BloggerConstants.STATE_HOME_LOGGEDIN;
						}
						this.setState({
							currentAppState:nextState,
							//loginStatus: BloggerConstants.LOGIN_STATUS_SUCCESS,
							loggedInUserId : newUserData.userDetails.userId
						});
					}.bind(this),
					error : function( jqXHR,textStatus, errorThrown ) {
						console.log("saveSignUpDetailsBtn error callback :"+jqXHR+" textStatus:"+textStatus+" errorThrown:"+errorThrown);
						//showErrorScreen("Unexpected error");
					}.bind(this),
					 complete : function( jqXHR, textStatus ) {
						console.log("saveSignUpDetailsBtn complete callback");

					}.bind(this),
					data : JSON.stringify(newUserData.userDetails)
					});
				}
		}

		onLoginDataReceivedCB(loginData) {
			console.log("onLoginDataReceivedCB loginData:"+JSON.stringify(loginData));
			console.log("onLoginDataReceivedCB userData:"+JSON.stringify(loginData.userData));
			var userData = loginData.userData;

			var nextState;
			if(userData === null) {
				console.log("Blogger onLoginDataReceivedCB null - new user");
				this.setState({
					currentAppState:BloggerConstants.STATE_SIGNUP
				});
			} else{

				console.log("Blogger onLoginDataReceivedCB userId :"+userData.userId);
				console.log("Blogger onLoginDataReceivedCB password:"+userData.password);

				$.ajax({
				 type: 'post',
				 url: 'rest/blogger/login',
				 contentType: "application/x-www-form-urlencoded; charset=utf-8",
				 data: userData,//$("#loginForm").serialize(), // serializes the form's elements.
				 success : function(data,textStatus, jqXHR) {
					console.log("loginForm success callback");
					console.log(jqXHR.getResponseHeader("AUTHORIZATION"));
					window.sessionStorage.accessToken = jqXHR.getResponseHeader("AUTHORIZATION");
					console.log("stored prevAction:"+window.sessionStorage.getItem("prevAction"));
					//$("#updateProfileBtn").data("userData",signInUsername);
					//$("#myblogsFilter").data("userData",signInUsername);
					// if(window.sessionStorage.getItem("prevAction") == "newBlog"){
					// 	console.log("loginForm removing PrevAction and showing new blog screen");
					// 	window.sessionStorage.removeItem("prevAction");
					// 	showNewBlogScreen();
					// } else if(window.sessionStorage.getItem("prevAction") == "addComment") {
					// 	console.log("loginForm removing PrevAction and showing add comment screen");
					// 	window.sessionStorage.removeItem("prevAction");
					// 	showBlogAndCommentsScreen();
					// }
					// else{
						console.log("loginForm settingState userData.loginReason :"+loginData.loginReason );
						if(loginData.loginReason === BloggerConstants.LOGIN_TO_ADDBLOG){
							nextState = BloggerConstants.STATE_NEW_BLOG;
						} else if (loginData.loginReason === BloggerConstants.LOGIN_TO_ADDCOMMENT) {
							nextState = BloggerConstants.STATE_VIEW_BLOG;
						} else {
							nextState = BloggerConstants.STATE_HOME_LOGGEDIN;
						}
						//$("#myblogsFilter").val("My Blogs");
						//fetchAllBlogs(null,signInUsername);
						//configureMenuBarOptions("loggedIn");

						this.setState({
							currentAppState:nextState,
							//loginStatus: BloggerConstants.LOGIN_STATUS_SUCCESS,
							loggedInUserId : userData.userId
						});
					//}

				}.bind(this),
				 error : function( jqXHR,textStatus, errorThrown ) {
					console.log("loginForm error callback :"+jqXHR+" textStatus :"+textStatus+" errorThrown:"+errorThrown);
					//showErrorScreen("Unexpected error");
				}.bind(this),
				 complete : function( jqXHR, textStatus ) {
					console.log("loginForm complete callback");
					//$("#submitButton").attr("disabled", false);
				}.bind(this),

				 statusCode: {
					401: function() {
						alert('Invalid username/password');
						//$('#loginForm').trigger("reset");
					}
				}

		//	 });


		});
			}
		}

		onNavOptionsSelectCB(option,param) {
			console.log("Blogger onNavOptionsSelectCB option:"+option);
			console.log("Blogger onNavOptionsSelectCB param:"+param);
			var nextAppState = this.state.currentAppState; // initialize
			var loginReason = BloggerConstants.LOGIN_TO_APP;
			var searchString = "";
			console.log("Blogger onNavOptionsSelectCB CURRENTSTATE:"+nextAppState);

			switch (option) {
				case BloggerConstants.NAVBAR_HOME:

						break;
			 case BloggerConstants.NAVBAR_SEARCH:
			 			nextAppState = BloggerConstants.STATE_HOME_SEARCHRESULTS;
						searchString = param;
						break;
				case BloggerConstants.NAVBAR_LOGIN:
					 nextAppState = BloggerConstants.STATE_LOGIN;
					 break;
				case BloggerConstants.NAVBAR_CREATE_BLOG:
				console.log("Blogger onNavOptionsSelectCB currentAppState :"+this.state.currentAppState)
						if(this.state.currentAppState === BloggerConstants.STATE_HOME_LOGGEDIN){
							 console.log("Blogger onNavOptionsSelectCB currentAppState tp1");
								nextAppState = BloggerConstants.STATE_NEW_BLOG;
						} else {
							  loginReason  = BloggerConstants.LOGIN_TO_ADDBLOG;
								nextAppState = BloggerConstants.STATE_LOGIN;
								 console.log("Blogger onNavOptionsSelectCB currentAppState tp2");
						}

						break;
			 case BloggerConstants.NAVBAR_UPDATE_PROFILE:

							break;
				case BloggerConstants.NAVBAR_LOGOUT:

						break;

				case BloggerConstants.NAVBAR_FILTER_MYBLOGS:
						nextAppState = BloggerConstants.STATE_HOME_LOGGEDIN;
						break;
				case BloggerConstants.NAVBAR_FILTER_ALLBLOGS:
					nextAppState = BloggerConstants.STATE_HOME_LOGGEDIN_ALLBLOGS;
					break;
				default:
					break;
			}
			console.log("Blogger onNavOptionsSelectCB nextAppState:"+nextAppState);
			console.log("Blogger onNavOptionsSelectCB setting loginReason :"+loginReason);
			this.setState({
				currentAppState:nextAppState,
				loginReason : loginReason,
				searchStr : searchString
			});
			console.log("Nav bar processing on Blogger loginReason: "+this.state.loginReason);
		}

		onNewBlogDataReceivedCB(blogData){
			console.log("onLoginDataReceivedCB blogData:"+JSON.stringify(blogData));
			$.ajax({
						url : 'rest/blogger/blogs',
						type : 'post',
						contentType: "application/json; charset=utf-8",
						headers: {"AUTHORIZATION": window.sessionStorage.getItem('accessToken')},
						success : function(data,textStatus, jqXHR) {
							console.log("submitNewBlogbtn success callback");
							//configureMenuBarOptions("loggedIn");
							//$("#myblogsFilter").val("My Blogs");
							//fetchAllBlogs(null,userId);
							this.setState({
								currentAppState:BloggerConstants.STATE_HOME_LOGGEDIN

							});
						}.bind(this),
						error : function( jqXHR,textStatus, errorThrown ) {
							console.log("submitNewBlogbtn error callback :"+jqXHR+" textStatus:"+textStatus+" errorThrown:"+errorThrown);
							//showErrorScreen("Unexpected error");
						}.bind(this),
						 complete : function( jqXHR, textStatus ) {
							console.log("submitNewBlogbtn complete callback");
						}.bind(this),
						data : JSON.stringify(blogData),
						statusCode: {
								400: function() {
									alert('Incorrect data entered.Kindly recheck');
								}
						}
					});
		}
	  //
		// handleSubmit(event) {
		// 	console.log("==handleSubmit :"+event.target.value);
		// 	console.log("handleSubmit this.state.blogTitle.length:"+this.state.blogTitle.length);
		// 	var validationError = false;
		// 	if(this.state.blogTitle.length == 0) {
		// 		console.log("error rxd");
		// 		this.setState({blogTitleValid: "error"});
		// 		validationError = true;
		// 	}
		// 	if (this.state.blogDescription.length == 0){
		// 		console.log("error rxd 2");
		// 		this.setState({blogDescriptionValid: "error"});
		// 		validationError = true;
		// 	}
		// 	if(!validationError){
		// 		alert('An essay was submitted: ' + this.state.blogTitle +" "+ this.state.blogDescription);
		// 	}
		// 	event.preventDefault();
	  //
		// }
	  //
		onLoginRequestForComment() {

			this.setState({
				currentAppState:BloggerConstants.STATE_LOGIN,
				loginReason  : BloggerConstants.LOGIN_TO_ADDCOMMENT


			});
		}
	// <NewBlog submitStatus="none" onSubmitStatusChanged={this.onSubmitStatusChangedCB} />
		render() {
			console.log("BLOGGER++ render:"+BloggerConstants.STATE_HOME_LOGGEDOUT);
			var currentScreenLayout = null;
			console.log("BLOGGER render his.state.currentAppState:"+this.state.currentAppState);
			var NavBarConfig = null;
			if(this.state.loggedInUserId != "") {
				console.log("BLOGGER NavBarConfig with loggedin options");
				NavBarConfig = <TNavBar configureOptions={BloggerConstants.NAVBAR_SHOW_LOGGEDIN_OPTIONS} loggedInUserId={this.state.loggedInUserId} onNavOptionsSelect={this.onNavOptionsSelectCB}/>
			} else {
					console.log("BLOGGER NavBarConfig with loggedout options");
				NavBarConfig = <TNavBar configureOptions={BloggerConstants.NAVBAR_SHOW_LOGGEDOUT_OPTIONS} onNavOptionsSelect={this.onNavOptionsSelectCB}/>
			}
			switch(this.state.currentAppState){
				case "TEST_STATE":
					currentScreenLayout =<div>
					<BlogAndCommentsScrn></BlogAndCommentsScrn>
				</div>
						break;
				case BloggerConstants.STATE_HOME_LOGGEDOUT :
						 console.log("Showing new blog-+-");
						 currentScreenLayout = <div>
																			<TNavBar configureOptions={BloggerConstants.NAVBAR_SHOW_LOGGEDOUT_OPTIONS} onNavOptionsSelect={this.onNavOptionsSelectCB}/>
																			<BloggerHome onUserTriggerForDetailedView ={this.onUserTriggerForDetailedViewCB}></BloggerHome>
																	 </div>
																	 break;

				case BloggerConstants.STATE_LOGIN:
						currentScreenLayout =  <div>
																			 <TNavBar configureOptions={BloggerConstants.NAVBAR_SHOW_NO_OPTIONS} onNavOptionsSelect={this.onNavOptionsSelectCB}/>
																			 <LoginScreen loginReason={this.state.loginReason} onLoginDataReceived={this.onLoginDataReceivedCB}/>
																		</div>
																		break;
			  case BloggerConstants.STATE_HOME_LOGGEDIN:
				     currentScreenLayout =  <div>
																				 <TNavBar configureOptions={BloggerConstants.NAVBAR_SHOW_LOGGEDIN_OPTIONS} loggedInUserId={this.state.loggedInUserId} onNavOptionsSelect={this.onNavOptionsSelectCB}/>
																				 <BloggerHome onUserTriggerForDetailedView ={this.onUserTriggerForDetailedViewCB} userFilter = {this.state.loggedInUserId}/>
																		</div>
																		break;
				case BloggerConstants.STATE_HOME_LOGGEDIN_ALLBLOGS:
						console.log("Showing STATE_HOME_LOGGEDIN_ALLBLOGS-+-");
						currentScreenLayout =  <div>
																				<TNavBar configureOptions={BloggerConstants.NAVBAR_SHOW_LOGGEDIN_OPTIONS} loggedInUserId={this.state.loggedInUserId} onNavOptionsSelect={this.onNavOptionsSelectCB}/>
																				<BloggerHome onUserTriggerForDetailedView ={this.onUserTriggerForDetailedViewCB}></BloggerHome>
																		</div>
																		break;
				case BloggerConstants.STATE_HOME_SEARCHRESULTS:
				console.log("Showing STATE_HOME_SEARCHRESULTS");
				currentScreenLayout =  <div>
																		{NavBarConfig}
																		<BloggerHome searchStr = {this.state.searchStr}/>
															 </div>
															 break;

				case BloggerConstants.STATE_SIGNUP:
						currentScreenLayout =  <div>
																			 <TNavBar configureOptions={BloggerConstants.NAVBAR_SHOW_NO_OPTIONS} onNavOptionsSelect={this.onNavOptionsSelectCB}/>
																			 <NewUser userAddReason={this.state.loginReason}  onNewUserDataReceived={this.onNewUserDataReceivedCB}/>
																		</div>
																		break;
				case BloggerConstants.STATE_NEW_BLOG:
						currentScreenLayout =  <div>
																			<TNavBar configureOptions={BloggerConstants.NAVBAR_SHOW_NO_OPTIONS} onNavOptionsSelect={this.onNavOptionsSelectCB}/>
																			<NewBlog onNewBlogDataReceived={this.onNewBlogDataReceivedCB}/>
																		</div>
																		break;
				case BloggerConstants.STATE_VIEW_BLOG:
				console.log("Showing STATE_VIEW_BLOG");
				currentScreenLayout =  <div>
																		{NavBarConfig}
																		<BlogAndCommentsScrn selectedBlogData = {this.state.selectedBlog} loggedInUser = {this.state.loggedInUserId} onLoginRequestForComment={this.onLoginRequestForComment}/>
															 </div>
															 break;

				default:
						break;

			}
			return (
					<div>
	        	{currentScreenLayout}
					</div>
			);
		}
	}
	export default Blogger;
