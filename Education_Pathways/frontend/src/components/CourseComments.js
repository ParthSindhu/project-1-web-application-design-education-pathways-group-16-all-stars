import CourseDescriptionPage from "./CourseDescription";
import './css/Comments.css'
import React from "react";

class CourseComments extends CourseDescriptionPage{
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        console.log("pass in course code: ", this.props.match.params.code)
    }
    submitComment = () => {
        console.log("submit comment")
    }

    render() {
        return (
            <div id="respond">

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
        );
    }
}

export default CourseComments