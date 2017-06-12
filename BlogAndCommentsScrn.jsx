import React from 'react';
import {Form,FormGroup, ControlLabel,FormControl,Well} from 'react-bootstrap'

import BlogDisplay from './BlogDisplay.jsx';
import CommentDisplay from './CommentDisplay.jsx';
import BloggerConstants from './BloggerConstants';
import $ from 'jquery';

class BlogAndCommentsScrn extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			commentData : [],
			sortOrder:BloggerConstants.COMMENTS_OLDEST_FIRST

		};
		// console.log("test submitStatus:"+this.props.submitStatus);
		//  console.log("test submitStatusCB:"+this.props.onSubmitStatusChanged);
		this.fetchBlogComments = this.fetchBlogComments.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.changeCommentSortingOrder = this.changeCommentSortingOrder.bind(this);
		this.configureCommentPagingOptions = this.configureCommentPagingOptions.bind(this);

	}

changeCommentSortingOrder(event) {
		console.log("changeCommentSortingOrder"+event.target.value);

	}

	configureCommentPagingOptions(linkheader) {

	}


	componentDidMount() {
	console.log("BlogAndCommentsScrn componentDidMount sortingOrder"+this.props.sortingOrder);
	//if(this.props.searchStr != undefined && this.props.searchStr != null && this.props.searchStr.trim != ""){
		 // to use for pagination
	//}
	var searchStr = this.props.searchStr;
	var userfilter = this.props.userFilter;
	this.fetchBlogComments();

}


fetchBlogComments() {
	var blogId = this.props.selectedBlogData.blogId;
	console.log("fetchBlogComments blogId :"+blogId);
	console.log("fetchBlogComments blogtitle :"+this.props.selectedBlogData.title);
	$.ajax({
		url : 'rest/blogger/blogs/'+blogId+'/comments',
		type : 'get',
		contentType: "application/json; charset=utf-8",
		dataType : 'json',
		data : {"offset": "0","pageSize": "3","sortOrder":this.state.sortOrder},
		success : function(data,textStatus, jqXHR) {
			console.log("fetchBlogComments success callback:"+data);
			// for(i = 0;i < data.length;i++){
			// 	var newcommentIdx = i;
			// 	console.log("new comment Id:"+newcommentIdx);
			// 	var commentData = data[i].comment;
			// 	var commentAuthor = data[i].commentor.userId;
			// 	var commentTime = $.format.prettyDate(data[i].postedDate);
			// 	comment = $("<div id ='comment'+newcommentIdx class='extradivs'>").append("<p id='comment'+newcommentIdx>"+commentData+"</p>")
			// 			       .append($("<div id ='comment'+newcommentIdx+'meta' class='commentmeta' style='margin-left: 40%;font-size: 12px;font-style: italic;'>Posted by </div>")
			// 				   .append("<span id = 'comment'+newcommentIdx+'author'>"+commentAuthor+" "+"</span>")
			// 			       .append("<time id = 'comment'+newcommentIdx+'time'>"+commentTime+"</time>"))
			// 				   .append('<hr/>');
			//
			// 	$("#commentPosts").append(comment);
			// 	console.log("Total divs after adding :"+$("#commentPosts > div").length);
			// 	console.log("Comment:"+data[i].comment);
			// 	console.log("commentor:"+data[i].commentor.userId);
			// 	console.log("Blog id:"+data[i].blogId);
			// 	console.log("Comment created time:"+data[i].postedDate);
			// 	console.log("Comment created time:"+($.format.prettyDate(data[i].postedDate)));
			// }
		//	$("#loadMoreComments").data("loadedCommentCount",data.length);
		//	configureCommentPagingOptions(jqXHR.getResponseHeader("LINK"));
		this.setState({
		 commentData: data
	 });
	 this.configureCommentPagingOptions(jqXHR.getResponseHeader("LINK"));


 }.bind(this),
		error : function( jqXHR,textStatus, errorThrown ) {
			console.log("fetchBlogComments error callback :"+jqXHR+" textStatus:"+textStatus+" errorThrown:"+errorThrown);
			// Need to show in a miniscreen.Let's leave it for now.
			//showErrorScreen("No content Found");
		}.bind(this),
		 complete : function( jqXHR, textStatus ) {
			console.log("fetchBlogComments complete callback");
			//$("#commentInput").val("");
		}.bind(this)
	});
}


	render() {
		console.log("Blog Display render&&");
		var style = {
			//marginLeft: "10%",
			//marginTop: "5%",
			marginRight:"10%"
		};
		var headingStyle = {
			//textAlign:"left",
			fontWeight:"bold",
			textDecoration:"underline",
			display:"inline",
			marginLeft:"12%"
		}
		var selectStyle = {
			//float:"right",
			display:"inline",
			marginLeft:"5%"
			//marginRight : "50%"
		}
		var uStyle = {
			marginLeft:"12%"
		}
//<h5 id ="commentHeading" style={headingStyle}>Comments3</h5>

/* <div>
	<BlogDisplay blogData = {this.props.selectedBlogData} hideCommentOption={true}></BlogDisplay>




<Form inline pullRight>
			<FormGroup controlId="formInlineSelect">
			<FormControl componentClass="select" placeholder="select" onChange={this.changeCommentSortingOrder} >
			<option value="Oldest">Oldest First1</option>
			<option value="Recent">Recent First</option>
			</FormControl>
		</FormGroup>
		</Form>

	<CommentDisplay></CommentDisplay>
	<CommentDisplay></CommentDisplay>
</div> */

/* <Form inline pullRight>
						<FormGroup controlId="formInlineSelect">
						<FormControl componentClass="select" placeholder="select" onChange={this.changeCommentSortingOrder} style={selectStyle}>
						<option value="Oldest">Oldest First1</option>
						<option value="Recent">Recent First</option>
						</FormControl>
					</FormGroup>
					</Form> */

		var commentDataToRender = [];
					var tempObj;
					for( var i = 0;i < this.state.commentData.length;i++){

						  commentDataToRender.push(<CommentDisplay commentData = {this.state.commentData[i]} />);
					}
		return (
			<div >
				<BlogDisplay blogData = {this.props.selectedBlogData} hideCommentOption={true}></BlogDisplay>
				<div style={style}>
					<h5 id ="commentHeading" style={headingStyle}>Comments</h5>
					<Form inline style={selectStyle}>
											<FormGroup controlId="formInlineSelect">
											<FormControl componentClass="select" placeholder="select" onChange={this.changeCommentSortingOrder} >
											<option value="Oldest">Oldest First</option>
											<option value="Recent">Recent First</option>
											</FormControl>
										</FormGroup>
						</Form>
						<hr style={uStyle}/>
				</div>

				{commentDataToRender}
		</div>




		);
	}
}
export default BlogAndCommentsScrn;
