import React from 'react';
import {FormGroup, ControlLabel,FormControl,Well} from 'react-bootstrap';
import TimeAgo from 'react-timeago'



class BlogDisplay extends React.Component {
	constructor(props){
		super(props);
		// this.state = {
		// 	blogTitle: "",
		// 	blogDescription: "",
		// 	blogTitleValid:null,
		// 	blogTitleValid:null
		//
		// };
		// console.log("test submitStatus:"+this.props.submitStatus);
		//  console.log("test submitStatusCB:"+this.props.onSubmitStatusChanged);
		this.handleViewAddComments = this.handleViewAddComments.bind(this);
		//this.handleSubmit = this.handleSubmit.bind(this);
		//this.handleCancel = this.handleCancel.bind(this);
	}

	handleViewAddComments(event) {
		console.log("handleViewAddComments :"+this.props.blogData.title);

		this.props.onUserTriggerForDetailedView(this.props.blogData);
	}
/*	handleSubmit(event) {
		console.log("==handleSubmit :"+event.target.value);
		console.log("handleSubmit this.state.blogTitle.length:"+this.state.blogTitle.length);
		event.preventDefault();
		var validationError = false;
		if(this.state.blogTitle.length == 0) {
			console.log("error rxd");
			this.setState({blogTitleValid: "error"});
			validationError = true;
		}
		if (this.state.blogDescription.length == 0){
			console.log("error rxd 2");
			this.setState({blogDescriptionValid: "error"});
			validationError = true;
		}
		if(!validationError){

			console.log('An essay was submitted:-- ' + this.state.blogTitle +" "+ this.state.blogDescription);
			console.log("props:"+this.props.onSubmitStatusChanged);
			this.props.onSubmitStatusChanged(event);

		}


	}

	handleCancel(event) {
		this.setState({
			blogTitle: "",
			blogDescription: "",
			blogTitleValid:null,
			blogDescriptionValid:null
		});
	}*/

	render() {
		console.log("Blog Display render");
		var style = {
			marginLeft: "10%",
			marginTop: "5%",
			marginRight:"10%",
		};
		var headingStyle = {
			textAlign:"center",
			fontWeight:"bold"
		}
    var metaStyle = {
			textAlign:"right",
			fontStyle:"italic",
      fontWeight:"bold"
		}
		var blogTitle = this.props.blogData.title;
		var blogDescription = this.props.blogData.description;
		var blogAuthor = this.props.blogData.userId;
		var blogPostedDate = this.props.blogData.postedDate;
		var addViewComments = null;
		if(this.props.hideCommentOption != true){
			addViewComments = <a href="#" id = "commentOptionspost" onClick={this.handleViewAddComments} >COMMENTS </a>
		}
		return (

      <Well style={style}>
        <h4 id ="postHeading" style={headingStyle}>{blogTitle}</h4>
        <p id ="postContent">
          {blogDescription}
        </p>
        <div id ="postmeta"style={metaStyle}> Posted by
            <span id = "postauthor"> {blogAuthor}</span>
            <time id = "posttime"> <TimeAgo date={blogPostedDate}/></time>
        </div>
        {addViewComments}
      </Well>


		);
	}
}
export default BlogDisplay;
