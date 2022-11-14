import React, { Component } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './css/CourseFiltersResult.css'
// import unstarred from './img/star.png'
// import starred from './img/starred.png'

// let star;

class CourseFiltersResult extends Component{

  constructor(props) {
    super(props);
    this.state = {
      course_code : this.props.course_code,
      course_name: this.props.course_name,
      division: "Division of Computer Engineering",
      faculty: "Faculty of Applied Science and Engineering",
      starred: false,
      username: localStorage.getItem('username')
    };
    // star = unstarred
  }

  redirectCourse = () => {
    this.props.history.push(`/course/details/${this.props.course_code}`, {course_code: this.props.course_code})
  }
  
  // componentDidMount() {
  //   axios.get(`${process.env.REACT_APP_API_URL}/user/wishlist?username=${this.state.username}`)
  //   .then(res => {
  //     let len = res.data.wishlist.course.length
  //     for (let i = 0; i < len; i++) {
  //       if (res.data.wishlist.course[i].code === this.state.course_code) {
  //         // star = starred
  //         this.setState({starred: true})
  //       }
  //     }
  //   }).catch(
  //     err => {
  //       console.log(err)
  //     }
  //   )
  // }





  render(){
    return (
      <Container className = 'container-course-filters-page'>
        <a href={`courseDetails/${this.state.course_code}`} onClick={this.redirectCourse} className={"search-result-item"} style={{textDecoration: "none"}}>
        <Row className={"result-display-course"}>
            <Col>
                <div className="res-item-coursefilters-page">{this.state.course_code}</div>  
            </Col>
            {/* <Col><img src={star} alt=""/></Col> */}
        </Row>
        </a>
      </Container>
    );
  }
}

export default CourseFiltersResult;
