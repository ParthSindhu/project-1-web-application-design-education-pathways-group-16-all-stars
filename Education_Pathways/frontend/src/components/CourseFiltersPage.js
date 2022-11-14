import React, {Component} from 'react'
import axios from 'axios'
import CourseFiltersResult from './CourseFiltersResult'
import './css/CourseFiltersResult.css'
import Label from './Label'
import "./css/styles.css";
class CourseFiltersPage extends Component {

    constructor() {
        super();
        this.state = {
          input: "",
          results: [],
          message: "",
          courses: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({ input: event.target.value }, () => {
          if (this.state.input && (this.state.input).length > 1)
            this.getData(this.state.input);
        });
      }
    
      handleSubmit(event) {
        event.preventDefault();
        this.getData(this.state.input)
      }
    
      getData = (input) => {
        axios.get(`${process.env.REACT_APP_API_URL}/course_list`, {})
          .then(res => {
            console.log("Course data 1234")

            if (res.status === 200) {
                console.log(`Initial: ${res.data.courses[0].code}`)
                console.log(`Initial: ${res.data.courses[0].description}`)

              this.setState({ results: [] })
              console.log("Course data 1234")
              if (res.data.courses.length > 0) {
                let len = res.data.courses.length
                let result_temp = []
                console.log("Course data 1234")
                console.log(`Length: ${len}`)
                //result_temp.push(<Label></Label>)

                for (let i = 0; i < len; i++) {
                    console.log(`NEW: ${res.data.courses[i].code}`)
                    result_temp.push(<CourseFiltersResult course_code={res.data.courses[i].code}></CourseFiltersResult>)
                }
                this.setState({ results: result_temp })
                //this.setState({ message: `${res.data.length} courses found for '${input}'`})
              } else if (res.data.length === 0) {
                //this.setState({ message: `No courses found for '${input}'`})
              } else {
                let result_temp = []
                result_temp.push(<Label></Label>)
                result_temp.push(<CourseFiltersResult course_code={res.data.courses.code} course_name={res.data.courses.description}></CourseFiltersResult>)
                this.setState({ results: result_temp })
                this.setState({ message: "" })
              }
            } else if (res.status === 400) {
              alert("System Error. Please refresh")
            }
          }).catch(
            err => {
              console.log(err)
            }
          )
      }

      

      componentDidMount(){
        this.getData(" ");
      }
    
      render() {
        return (
        <div className='filter-wrapper'>
            <div>
                
                <div style={{ marginTop: "10%" }}>
                <h1> Course List</h1>
                </div>
                <div className="SearchQuery-course-filters-page">
                    <div className={"search-result-message-course"} >
                    {this.state.message}
                    </div>
                    <div className={"search-result-display-course"} >
                    {this.state.results}
                    </div>
                </div>
            </div>
        </div>
        );
      }
    }   

export default CourseFiltersPage;