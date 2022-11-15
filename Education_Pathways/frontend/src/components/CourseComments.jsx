import CourseDescriptionPage from "./CourseDescription";
import './css/Comments.css'
import React from "react";
import Comment from "./Comment";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

class CourseComments extends CourseDescriptionPage{
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            fetching: false
        };
    }
    
    fetchComments =  () => {
        if(!this.state.fetching) {
            this.setState({fetching: true});
            return fetch(`${process.env.REACT_APP_API_URL}/course/comments?course=` + this.props.match.params.code).then(
                response => response.json()
            ).then(comments => {
                this.setState({comments: comments.comments});
                this.setState({fetching: false});
            }).catch(error => {
                console.log(error)
                this.setState({fetching: false});
            })
        }
        return Promise.reject();
    }
    componentDidMount() {
        console.log("pass in course code: ", this.props.match.params.code)
        // fetch comments from backend
        this.fetchComments();
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
            this.fetchComments();
            toast.success("Submitted Comment!", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
            // this.setState({comments: res.data.comments})
        })
        .catch(err => {
            toast.error("Failed to submit comment! Please use UofT Email", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

            // toast.error("Comment error", {
            //     position: "top-center",
            //     autoClose: 1000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "light",
            //     });
            console.log(err)
        })
        
    }


    componentDidUpdate() {
        
    }
    

    render() {
        return (
            <div id="respond">
                <ToastContainer             
                    position="top-center"
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"/>
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
                    update={(inc) => {
                        let comments = this.state.comments;
                        if(inc > 0) {
                            comments[index].upvotes += inc;
                        }
                        else {
                            comments[index].downvotes += inc;
                        }
                        this.setState({comments: comments})
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