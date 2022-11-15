import React, { Component } from "react";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './css/CourseFiltersResult.css'
// import unstarred from './img/star.png'
// import starred from './img/starred.png'

// let star;

class CourseFilter extends Component{

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
    <div>
        Alphabetical Filter
        <Container className = 'container-course-filters-filter-page'>
            <btn className="submit-button-course">A</btn>
            <btn className="submit-button-course">B</btn>
            <btn className="submit-button-course">C</btn>
            <btn className="submit-button-course">D</btn>
            <btn className="submit-button-course">E</btn>
            <btn className="submit-button-course">F</btn>
            <btn className="submit-button-course">G</btn>
            <btn className="submit-button-course">H</btn>
            <btn className="submit-button-course">I</btn>
            <btn className="submit-button-course">J</btn>
            <btn className="submit-button-course">K</btn>
            <btn className="submit-button-course">L</btn>
            <btn className="submit-button-course">M</btn>
            <btn className="submit-button-course">N</btn>
            <btn className="submit-button-course">O</btn>
            <btn className="submit-button-course">P</btn>
            <btn className="submit-button-course">Q</btn>
            <btn className="submit-button-course">R</btn>
            <btn className="submit-button-course">S</btn>
            <btn className="submit-button-course">T</btn>
            <btn className="submit-button-course">U</btn>
            <btn className="submit-button-course">V</btn>
            <btn className="submit-button-course">W</btn>
            <btn className="submit-button-course">X</btn>
            <btn className="submit-button-course">Y</btn>
            <btn className="submit-button-course">Z</btn>
            
        </Container>

      </div>
    );
  }
}

export default CourseFilter
