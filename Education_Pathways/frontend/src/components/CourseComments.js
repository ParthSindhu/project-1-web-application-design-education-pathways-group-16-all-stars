import CourseDescriptionPage from "./CourseDescription";
import './css/Comments.css'
import React from "react";
import Comment from "./Comment";

class CourseComments extends CourseDescriptionPage{
    
    componentDidMount() {
        console.log("pass in course code: ", this.props.match.params.code)
    }
    submitComment = () => {
        console.log("submit comment")
    }

    render() {
        return (
            <div id="respond">
                
                <div className="container">
                            <h3 className="comments-title">Comments</h3>
                <ul className="comments-list">
                    <Comment 
                    comment={{
                        userId : "parth",
                        username : "parth",
                        body : "heelo",
                        createdAt : new Date(),
                    }}    
                    />
                </ul> 
                </div>
                <div>
                    <h3> Leave a Comment</h3>
                    <form id="commentform">
                        <label htmlFor="comment_author" className="required">Your name</label>
                        <input type="text" name="comment_author" id="comment_author" tabIndex="1"
                            required="required" maxLength="20"/>

                        <label htmlFor="email" className="required">Your email</label>
                        <input type="email" name="email" id="email" tabIndex="2" required="required" maxLength="320"/>

                        <label htmlFor="comment" className="required">Your message</label>
                        <textarea name="comment" id="comment" rows="7" tabIndex="4" maxLength="500" required="required"/>

                        <input type="hidden" name="comment_post_ID" value="1" id="comment_post_ID" />
                        <button className={"syllabus-link"} onClick={this.submitComment}>Submit</button>

                    </form>
                </div>
            </div>
        );
    }
}

export default CourseComments