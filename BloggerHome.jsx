import React from 'react';
import {FormGroup, ControlLabel,FormControl,Well} from 'react-bootstrap'
import BlogDisplay from './BlogDisplay.jsx';
import $ from 'jquery';
import BloggerConstants from './BloggerConstants';
import { parse_link_header } from './BloggerUtils'


class BloggerHome extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			// blogTitle: "",
			// blogDescription: "",
			// blogTitleValid:null,
			// blogTitleValid:null
			blogData : [],
			pagingOptionFirst : null,
			pagingOptionPrev : null,
			pagingOptionNext : null,
			pagingOptionLast : null

		};
		// console.log("test submitStatus:"+this.props.submitStatus);
		//  console.log("test submitStatusCB:"+this.props.onSubmitStatusChanged);
		this.fetchBlogs = this.fetchBlogs.bind(this);
		this.handlePagingOption = this.handlePagingOption.bind(this);
		this.configurePagingOptions = this.configurePagingOptions.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);

	}

	  componentDidMount() {
  	console.log("BloggerHome componentDidMount userFilter:"+this.props.userFilter);
		//if(this.props.searchStr != undefined && this.props.searchStr != null && this.props.searchStr.trim != ""){
			 // to use for pagination
		//}
		var searchStr = this.props.searchStr;
		var userfilter = this.props.userFilter;
		this.fetchBlogs(searchStr,userfilter);

	}

componentWillReceiveProps(nextProps) {
	console.log("#################################componentWillReceiveProps nextProps userFilter: "+nextProps.userFilter);
	console.log("#################################componentWillReceiveProps this.props userFilter: "+this.props.userFilter);
	console.log("#################################componentWillReceiveProps nextProps searchStr: "+nextProps.searchStr);
	console.log("#################################componentWillReceiveProps this.props searchStr: "+this.props.searchStr);
	if(this.props.userFilter != nextProps.userFilter || this.props.searchStr != nextProps.searchStr ) {

		this.fetchBlogs(nextProps.searchStr,nextProps.userFilter)
	} else {
		console.log("################################# Not calling FETCH BLOGS");
	}

}

fetchBlogs(searchStr,userfilter){
	$.ajax({
	url : 'rest/blogger/blogs',
	type : 'get',
	contentType: "application/json; charset=utf-8",
	dataType : 'json',
	data : {"offset": "0","pageSize": BloggerConstants.BLOG_PAGESIZE,"searchStr":searchStr,"userFilter":userfilter},
	success : function(data,textStatus, jqXHR) {
		console.log("fetchAllBlogs success callback :"+data);
		//displayBlogs(data,textStatus, jqXHR);
		this.setState({
		 blogData: data
	 });
	 this.configurePagingOptions(jqXHR.getResponseHeader("LINK"));
		// for(i = 0;i < 3;i++){
		// 		if(i < data.length) {
		//
		// 		}
		// }
	}.bind(this),
	error : function( jqXHR,textStatus, errorThrown ) {
		console.log("fetchAllBlogs error callback :"+jqXHR+" textStatus:"+textStatus+" errorThrown:"+errorThrown);
		//showErrorScreen("No content available.\nPlease create one");
	}.bind(this),
	 complete : function( jqXHR, textStatus ) {
		console.log("fetchAllBlogs complete callback");
		// this.Setstate = {
		// 	blogTitle: "",
		// 	blogDescription: "",
		// 	blogTitleValid:null,
		// 	blogTitleValid:null
		//
		// };
	}.bind(this)
});

}



configurePagingOptions(linkheader) {
	console.log("configurePagingOptions linkheader.length:"+linkheader.length);
//	$("#next").hide();
	// $("#next").removeData("targetUrl");
	// $("#prev").hide();
	// $("#prev").removeData("targetUrl");
	// $("#first").hide();
	// $("#first").removeData("targetUrl");
	// $("#last").hide();
	// $("#last").removeData("targetUrl");
	var  first = null;
	var  prev = null;
	var  next = null;
	var  last = null;
	if(linkheader.length != 0) {
		var parsedLinks = parse_link_header(linkheader);
		console.log("--Parsing linkheader-- :"+parsedLinks);

		for (var key in parsedLinks) {
			var keyToMatch = key.toLowerCase();
			console.log("keyToMatch:"+keyToMatch);
			if(keyToMatch === "next") {
				console.log("Showing next");
				//$("#next").show();
				//$("#next").data("targetUrl",parsedLinks[key]);
				next = parsedLinks[key];
			}
			if(keyToMatch === "prev") {
				console.log("Showing prev");
		//		$("#prev").show();
		//		$("#prev").data("targetUrl",parsedLinks[key]);
				prev = parsedLinks[key];
			}
			if(keyToMatch === "first") {
				console.log("Showing first");
				//$("#first").show();
				//$("#first").data("targetUrl",parsedLinks[key]);
				first = parsedLinks[key];
			}
			if(keyToMatch === "last"){
				console.log("Showing last");
			//	$("#last").show();
				//$("#last").data("targetUrl",parsedLinks[key]);
				last = parsedLinks[key];
			}
			console.log("parsedLink:"+parsedLinks[key]);
		}


	}
	this.setState({
		pagingOptionFirst : first,
		pagingOptionPrev : prev,
		pagingOptionNext : next,
		pagingOptionLast : last
	});
}

handlePagingOption(event) {
		console.log("blog pagination options");
		var targetUrl ;//= $(this).data("targetUrl");

		console.log("pagingOptions event.target.value :"+event.target.value);
		console.log("pagingOptions event.target.name :"+event.target.name);
		// var userfilter;
		// userPref = $('#myblogsFilter').val();
		// console.log("userpref :"+userPref);
		// if(window.sessionStorage.getItem('accessToken') != null && userPref === "My Blogs"){
		// 	console.log("applying user filter");
		// 	userfilter = $("#myblogsFilter").data("userData");
		// }
		// var searchStr = $("#searchBtn").data("searchStr");
		switch(event.target.name) {
			case "first":
						targetUrl = this.state.pagingOptionFirst;
						break;
			case "prev":
						targetUrl = this.state.pagingOptionPrev;
						break;
			case "next":
						targetUrl = this.state.pagingOptionNext;
						break;
			case "last":
						targetUrl = this.state.pagingOptionLast;
						break;
			default:
						break;

		}
		console.log("targetUrl in pagingOptions click :"+targetUrl);
		var searchStr = this.props.searchStr;
		var userfilter = this.props.userFilter;
		console.log("search String in next:"+searchStr);
		console.log("userfilter String in userfilter:"+userfilter);
		$.ajax({
			url : targetUrl,
			type : 'get',
			contentType: "application/json; charset=utf-8",
			data : {"searchStr":searchStr,"userFilter":userfilter},
			dataType : 'json',
			success : function(data,textStatus, jqXHR) {
				console.log("blog pagination options success callback");
			//    displayBlogs(data,textStatus, jqXHR);
			this.setState({
			 blogData: data
		 });
		 this.configurePagingOptions(jqXHR.getResponseHeader("LINK"));
	 }.bind(this),
			error : function( jqXHR,textStatus, errorThrown ) {
				console.log("blog pagination options error callback :"+jqXHR+" textStatus:"+textStatus+" errorThrown:"+errorThrown);
		//		showErrorScreen("Unexpected error");
	}.bind(this),
			 complete : function( jqXHR, textStatus ) {
				console.log("blog pagination options complete callback");
			}.bind(this)
		});
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
		console.log("Home Screen render");
    var paginationStyle={
      display:"inline",
      marginLeft:"75%",
      fontWeight:"bold"
    }
		var blogDataToRender = [];
		var tempObj;
		for( var i = 0;i < this.state.blogData.length;i++){

			  blogDataToRender.push(<BlogDisplay blogData = {this.state.blogData[i]} onUserTriggerForDetailedView ={this.props.onUserTriggerForDetailedView}/>);
		}
		var pagingOptions = [];
		if(this.state.pagingOptionFirst != null){
			pagingOptions.push(<a href="#" id="first" name="first" onClick={this.handlePagingOption}> First | </a>);
		}
		if(this.state.pagingOptionPrev != null){
			pagingOptions.push(<a href="#" id="prev"  name="prev" onClick={this.handlePagingOption}> Previous | </a>);
		}
		if(this.state.pagingOptionNext != null){
			pagingOptions.push(<a href="#" id="next"  name="next" onClick={this.handlePagingOption}> Next | </a>);
		}
		if(this.state.pagingOptionLast != null){
			pagingOptions.push(<a href="#" id="last" name="last" onClick={this.handlePagingOption}> Last  </a>);
		}
		return (
      <div>
        {blogDataToRender}
        <div id = "pagingOptions" style={paginationStyle}>
						{pagingOptions}
				</div>
      </div>
		);
	}
}
export default BloggerHome;
