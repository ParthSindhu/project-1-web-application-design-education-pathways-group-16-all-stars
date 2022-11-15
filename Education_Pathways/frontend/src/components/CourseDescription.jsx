import React, { Component } from 'react';
import './css/course-description.css'
import './css/css-circular-prog-bar.css'
import 'bootstrap/dist/css/bootstrap.css';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import requisite_label from './img/requisite-label.png'
import axios from "axios"
<<<<<<< HEAD
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

// let star = empty_star;
=======
import Slider from "react-slick";
>>>>>>> main

class CourseDescriptionPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      course_code: "",
      course_name: "",
      division: "Faculty of Applied Science and Engineering",
      department: "Department of Edward S. Rogers Sr. Dept. of Electrical & Computer Engineering",
      graph: "",
      course_description: "",
      syllabus: "",
      prerequisites: "",
      corequisites: "",
      exclusions: "",
      tags: [],
      recommendations: [],
      starred: false,
      graphics: [],
      username: localStorage.getItem('username'),
      ratings_difficulty: [],
      ratings_courseload: [],
      ratings_engagement: []
    }
  }

  componentDidMount() {
    console.log("pass in course code: ", this.props.match.params.code)
    axios.get(`${process.env.REACT_APP_API_URL}/course/ratings?course=${this.props.match.params.code}`, {})
      .then(res => {
        this.setState({ ratings_difficulty: this.getRatingPercentage(res.data.ratings_difficulty) })
        this.setState({ ratings_courseload: this.getRatingPercentage(res.data.ratings_courseload) })
        this.setState({ ratings_engagement: this.getRatingPercentage(res.data.ratings_engagement) })
      })

    axios.get(`${process.env.REACT_APP_API_URL}/course/details?code=${this.props.match.params.code}`, {
      code: this.props.course_code
    })
      .then(res => {
        console.log(res.data)
        this.setState({ course_code: res.data.course.code })
        this.setState({ course_name: res.data.course.name })
        this.setState({ course_description: res.data.course.description })
        this.setState({ graph: res.data.course.graph })
        let prereq_len = res.data.course.prereq.length
        if (prereq_len > 1) {
          let prereq_str = ""
          for (let i = 0; i < prereq_len; i++) {
            prereq_str += res.data.course.prereq[i]
            if (i !== prereq_len - 1) {
              prereq_str += ", "
            }
          }
          this.setState({ prerequisites: prereq_str })
        } else {
          this.setState({ prerequisites: res.data.course.prereq })
        }
        let coreq_len = res.data.course.coreq.length
        if (coreq_len > 1) {
          let coreq_str = ""
          for (let i = 0; i < coreq_str; i++) {
            coreq_str += res.data.course.coreq[i]
            if (i !== coreq_len - 1) {
              coreq_str += ", "
            }
          }
          this.setState({ corequisites: coreq_str })
        } else {
          this.setState({ corequisites: res.data.course.coreq })
        }
        let exclusion_len = res.data.course.exclusion.length
        if (exclusion_len > 1) {
          let exclusion_str = ""
          for (let i = 0; i < exclusion_str; i++) {
            exclusion_str += res.data.course.exclusion[i]
            if (i !== exclusion_len - 1) {
              exclusion_str += ", "
            }
          }
          this.setState({ exclusions: exclusion_str })
        } else {
          this.setState({ exclusions: res.data.course.exclusion })
        }
        let rec_len = res.data.course.tags.length
        if (rec_len > 1) {
          this.setState({ tags: res.data.course.tags })
        }
        let syllabus_link = "http://courses.skule.ca/course/" + this.props.code
        this.setState({ syllabus: syllabus_link })

        let temp_graph = []
        //temp_graph.push(<ShowGraph graph_src={this.state.graph}></ShowGraph>)
        this.setState({ graphics: temp_graph })

        for (let i = 0; i < this.state.tags.length; i++) {
          axios.get(`${process.env.REACT_APP_API_URL}/course/recommendations?tag=${this.state.tags[i]}`, {
            code: this.props.course_code
          })
            .then(res => {
              let course_recommendations = [];
              for (let j = 0; j < res.data.length; j++) {
                if (res.data[j].code !== this.state.course_code)
                  course_recommendations.push({ 'code': res.data[j].code, 'name': res.data[j].name })
              }

              let unique_course_recommendations = [...new Map(course_recommendations.map(item => [item['code'], item])).values()]

              this.setState({ recommendations: unique_course_recommendations })
            })
        }
      }
      )
  }

  /**
 * This method returns the percentage value of the average ratings which range from 1-5
 * @param {*} ratings the type of rating (e.g. Courseload)
 * @returns percentage value of average rating
 */
  getRatingPercentage(ratings) {
    let total = 0
    for (const value of ratings) {
      total += parseInt(value);
    }
    let percentage = Math.round(((total / ratings.length) / 5) * 100)
    if (percentage == null) {
      percentage = "?"
    }
    return percentage;
  }
  /**
   * This method returns a string indicating if a percentage is over 50 to be used to update circular progress bars accordingly
   * @param {*} percentage percentage value of average rating
   * @returns string indicating whether the percentage is over 50
   */
  getRatingOver50(percentage) {
    let over50 = null
    if (percentage > 50) {
      over50 = "over50"
    }
    return over50
  }

  openLink = () => {
    const newWindow = window.open(this.state.syllabus, '_blacnk', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.opener = null;
    }
  }

  showForm() {
    document.getElementById('formElement').style.display = 'block';
  }
  closeForm() {
    document.getElementById("formElement").style.display = "none";
  }

  /**
   * This method sends a post request and saves info submitted in the ratings form to the db
   */
  submitRating = () => {
    var email = document.getElementById("email");
    var rating_courseload = document.getElementById("rating_courseload");
    var rating_difficulty = document.getElementById("rating_difficulty");
    var rating_engagement = document.getElementById("rating_engagement");
    if (!email.value || !rating_courseload.value || !rating_difficulty.value || !rating_engagement.value) {
      return;
    }
    console.log(rating_courseload.value, rating_difficulty.value, rating_engagement.value)
    console.log("sending post request for rating")
    fetch(`${process.env.REACT_APP_API_URL}/course/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        course: this.props.match.params.code,
        rating_difficulty: rating_courseload.value,
        rating_courseload: rating_difficulty.value,
        rating_engagement: rating_engagement.value,
      })
    })
    toast.success("Thank you!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
  }

  redirectCourseComments = () => {
    this.props.history.push(`/courseComments/${this.state.course_code}`, { course_code: this.state.course_code })
  }

  redirectCourseRecommendations = (courseCode) => {
    window.location.href = `${window.location.origin}/courseDetails/${courseCode}`
  }

  render() {
    var carousel_settings = {
      dots: true,
      infinite: true,
      speed: 600,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

    return (
      <div className="page-content">
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
        <Container className="course-template">
          <Row float="center" className="course-title">
            <Col className="title-center" >
              <h1>{this.state.course_code} : {this.state.course_name}</h1>
            </Col>
            {/* <Col xs={4}>
              <img src={star} onClick={this.check_star} alt="" />
            </Col> */}
          </Row>
          <Row>
            <Col className="col-item">
              <h3>Division</h3>
              <p>{this.state.division}</p>
            </Col>
            <Col className="col-item">
              <h3>Department</h3>
              <p>{this.state.department}</p>
            </Col>
            <Col className="col-item">
              <h3>Past Tests and Syllabi</h3>
              <div className="submit-button-wrapper">
                <button className={"submit-button"} onClick={this.openLink}>View</button>
              </div>
              
            </Col>
            <Col className="col-item">
              <h3>Past Student Comments</h3>
              <div className="submit-button-wrapper">
                <button className={"submit-button"} onClick={this.redirectCourseComments}>View</button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="col-item">
              <h3>Course Description</h3>
              <p>{this.state.course_description}</p>
            </Col>

            <Col className="col-item">
              <h3>Course Ratings</h3>

              <label class="ratings-lbl">
                <div className={`progress-circle p${this.state.ratings_difficulty} ${this.getRatingOver50(this.state.ratings_difficulty)}`}>
                  <span>{this.state.ratings_difficulty}%</span>
                  <div className="left-half-clipper">
                    <div class="first50-bar"></div>
                    <div className="value-bar" />
                  </div>
                </div>
                Difficulty
              </label>

              <label className="ratings-lbl">
                <div className={`progress-circle p${this.state.ratings_courseload} ${this.getRatingOver50(this.state.ratings_courseload)}`}>
                  <span>{this.state.ratings_courseload}%</span>
                  <div className="left-half-clipper">
                    <div class="first50-bar"></div>
                    <div className="value-bar" />
                  </div>
                </div>
                Courseload
              </label>

              <label className="ratings-lbl">
                <div className={`progress-circle p${this.state.ratings_engagement} ${this.getRatingOver50(this.state.ratings_engagement)}`}>
                  <span>{this.state.ratings_engagement}%</span>
                  <div className="left-half-clipper">
                    <div class="first50-bar"></div>
                    <div className="value-bar" />
                  </div>
                </div>
                Engagement
              </label>

<<<<<<< HEAD
              <br></br>
              <div className="rating-button-wrapper">
                <button className={"rating-button"} onClick={this.showForm}>Submit a Rating</button>
              </div>
              
=======
              <button className={"open-button"} onClick={this.showForm}>Submit a Rating</button>

>>>>>>> main
              <div className={"form-popup"} id="formElement">
                <form className={"form-container"} onSubmit={(event) => {
                  event.preventDefault();
                  this.submitRating()
                  this.closeForm()
                }}>
                  <h3>Rate Your Experience!</h3>

                  <div className={"dropdown"}>
                    <label for="hour">Courseload:</label>
                    <input type="number" id="rating_courseload" min="1" max="5" required /><br></br><br></br>

                    <label for="hour">Difficulty:</label>
                    <input type="number" id="rating_difficulty" min="1" max="5" required /><br></br><br></br>

                    <label for="hour">Engagement:</label>
                    <input type="number" id="rating_engagement" min="1" max="5" required />
                  </div>

                  <input type="email" placeholder="Enter Email" id="email" required />

                  <button type="submit" class={"btn"} >Submit</button>
                  <button type="button" className={"btn cancel"} onClick={this.closeForm}>Close</button>
                  
                </form>
              </div>

            </Col>

          </Row>
          <Row className="col-item course-requisite">
            <Row>
              <h3>Course Requisites</h3>
            </Row>
            <Row>
              <Col className="requisites-display">
                <h4>Pre-Requisites</h4>
                <p>{this.state.prerequisites}</p>
              </Col>
              <Col className="requisites-display">
                <h4>Co-Requisites</h4>
                <p>{this.state.corequisites}</p>
              </Col>
              <Col className="requisites-display">
                <h4>Exclusion</h4>
                <p>{this.state.exclusions}</p>
              </Col>
            </Row>
            <Row>
              <div className={"req-graph"}>
                <img style={{ width: "70%", marginBottom: "3%" }} alt="" src={requisite_label}></img>
                <img src={`data:image/jpeg;base64,${this.state.graph}`} alt="" ></img>
              </div>
            </Row>
          </Row>
          <Row className="col-item course-recommendations">
            <Row>
              <h3>Course Recommendations</h3>
            </Row>
            <Slider {...carousel_settings}>
              {this.state.recommendations.map((recommendation) => (
                <div className="recommendations-display" onClick={() => this.redirectCourseRecommendations(recommendation.code)}>
                  <h4>{recommendation.code}</h4>
                  <p>{recommendation.name}</p>
                </div>
              ))}
            </Slider>
          </Row>
        </Container>
      </div>
    )
  }
}

export default CourseDescriptionPage
