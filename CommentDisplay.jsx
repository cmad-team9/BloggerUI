import React from 'react';
import {FormGroup, ControlLabel,FormControl,Well} from 'react-bootstrap'
import TimeAgo from 'react-timeago'


class CommentDisplay extends React.Component {
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
		//this.handleChange = this.handleChange.bind(this);
		//this.handleSubmit = this.handleSubmit.bind(this);
		//this.handleCancel = this.handleCancel.bind(this);
	}

/*	handleChange(event) {
		console.log("handle change :"+event.target.value);
		console.log("handle change :"+event.target.name);
		const target = event.target;
		const value = target.value;
		const name = target.name;
		this.setState({
			[name]: value,
			blogTitleValid :null,
			blogDescriptionValid :null,
		});
	}

	handleSubmit(event) {
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
		console.log("comment Display render");
		var style = {
			marginLeft: "10%",
			marginTop: "5%",
			marginRight:"25%",

		}

    var metaStyle = {
			textAlign:"right",
			fontStyle:"italic",
			fontSize :"12px"
		}
		var commentAuthor = this.props.commentData.commentorId;
		var commentTime = this.props.commentData.postedDate;
		var commentDescription = this.props.commentData.comment;
		return (

      <div id ='newcommentIdx' style={style}>
        <p>{commentDescription}</p>
			  <div id ='commentmeta'  style={metaStyle}>Posted by
								   <span id = 'commentauthor'> {commentAuthor}</span>
							     <time id = 'commenttime'> <TimeAgo date={commentTime}/></time>
        </div>
        <hr/>
      </div>


		);
	}
}
export default CommentDisplay;
