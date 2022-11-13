import CourseDescriptionPage from "./CourseDescription";
import './css/Comments.css'
import React from "react";
import Comment from "./Comment";
import axios from "axios";

class CourseComments extends CourseDescriptionPage{
    constructor(props) {
        super(props);
        this.state = {
            comments: []
        };
    }
    
    componentDidMount() {
        console.log("pass in course code: ", this.props.match.params.code)
        // fetch comments from backend
        fetch(`${process.env.REACT_APP_API_URL}/course/comments?course=` + this.props.match.params.code).then(
            response => response.json()
        ).then(comments => {
            this.setState({comments: comments.comments});
        }).catch(
            error => console.log(error)
        )
    }
    submitComment = (event) => {
        event.preventDefault();
        console.log(event)
        const data = new FormData(event.currentTarget);

        let text = data.get("comment");
        let username = data.get("comment_author");
        let email = data.get("email");
        let course = this.props.match.params.code;
        axios.post(`${process.env.REACT_APP_API_URL}/course/comments`, {
            text,
            username,
            course,
            email
        })
        .then(res => {
            console.log(res.data)
            this.setState({comments: res.data.comments})
        })
        .catch(err => {
            console.log(err)
        })
    }


    componentDidUpdate() {
        
    }
    

    render() {
        return (
            <div className="comment-offset" id="respond">
                
                <div className="container">
                            <h3 className="comments-title">Comments</h3>
                <ul className="comments-list">
                    {/* {console.log(this.state.comments)} */}
                    { 
                     this.state.comments?.map((comment, index) =>  
                    <Comment 
                    comment={{
                        id: comment._id,
                        username : comment.username,
                        body : comment.text,
                        createdAt : comment.timestamp.$date,
                        upvotes: comment.upvotes,
                        downvotes: comment.downvotes
                    }}    
                    />
                     )
                     }
                </ul> 
                </div>
                <div>
                    <h3> Leave a Comment</h3>
                    <form id="commentform" onSubmit={this.submitComment}>
                        <label htmlFor="comment_author" className="required">Your name</label>
                        <input type="text" name="comment_author" id="comment_author" tabIndex="1"
                            required="required" maxLength="20"/>

                        <label htmlFor="email" className="required">Your email</label>
                        <input type="email" name="email" id="email" tabIndex="2" required="required" maxLength="320"/>

                        <label htmlFor="comment" className="required">Your message</label>
                        <textarea name="comment" id="comment" rows="7" tabIndex="4" maxLength="500" required="required"/>

                        <input type="hidden" name="comment_post_ID" value="1" id="comment_post_ID" />
                        <button className={"syllabus-link"} >Submit</button>

                    </form>
                </div>
            </div>
        );
    }
}

export default CourseComments