import React, {Component, useState} from 'react'
import axios from 'axios'
import CourseFiltersResult from './CourseFiltersResult'
import './css/CourseFiltersResult.css'
import Label from './Label'
import "./css/styles.css";
import CourseFilter from './CourseFilter'

class CourseFiltersPage extends Component {

    constructor() {
        super();
        this.state = {
          input: "",
          results: [],
          resultsFiltered: [],
          resultsFiltered2:[],
          message: "",
          courses: [],
          filter: 'ALL2'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFilterClick = this.handleFilterClick.bind(this);
        this.handleSecondFilter = this.handleSecondFilter.bind(this);
      }
      
      handleChange(event) {
        this.setState({ input: event.target.value }, () => {
          if (this.state.input && (this.state.input).length > 1)
            this.getData(this.state.input);
        });
      }
    
      handleSubmit(event) {
        
        event.preventDefault();
        this.getData(this.state.input);
      }

      
      getData = (input) => {
        
          console.log(input)
          axios.get(`${process.env.REACT_APP_API_URL}/course_list`, {})
          .then(res => {
            console.log("Course data 1234")

            if (res.status === 200) {
                console.log(`Initial: ${res.data.courses[0].code}`)
                console.log(`Initial: ${res.data.courses[0].description}`)

              this.setState({ results: [] })
              this.setState({results: [] }, () => {

                console.log("Course data 1234")
                  if (res.data.courses.length > 0) {
                    let len = res.data.courses.length
                    let result_temp = []
                    console.log("Course data 1234")
                    console.log(`Length: ${len}`)
                    //result_temp.push(<Label></Label>)

                    for (let i = 0; i < len; i++) {
                        console.log(`NEW: ${res.data.courses[i].code}`)
                        result_temp.push(res.data.courses[i].code)
                    }
                    this.setState({ results: result_temp })
                    //this.setState({ message: `${res.data.length} courses found for '${input}'`})
                  } else if (res.data.length === 0) {
                    //this.setState({ message: `No courses found for '${input}'`})
                  } else {
                    let result_temp = []
                    //result_temp.push(<Label></Label>)
                    //result_temp.push(<CourseFiltersResult course_code={res.data.courses.code} course_name={res.data.courses.description}></CourseFiltersResult>)
                    this.setState({ results: result_temp }, () => {
                      this.setState({resultsFiltered: this.state.results }, () => {
                        this.setState({resultsFiltered2: this.state.resultsFiltered2});
                      });
                    });
                    
                  }
                
              });
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
        this.getData("ALL");
        let result_temp = ['ACE140','BAE412', 'ECE412'];
        //result_temp.push(<CourseFiltersResult id = {"B"} course_code={"ECE0"}></CourseFiltersResult>);
        //result_temp.push(<CourseFiltersResult id = {"A"} course_code={"A"}></CourseFiltersResult>);
        this.setState({ results: result_temp });
      }

      handleFilterClick(event) {

        let result_temp = []
        if(event.target.value !== "1" && event.target.value !== "2" && event.target.value !== "3" && event.target.value !== "4" && event.target.value !== "ALL2" ){
          this.setState({resultsFiltered: [] }, () => {
            if (event.target.value === "ALL") {
            
              console.log("Handle Click1");
    
              let len = this.state.results.length
              for (let i = 0; i < len; i++) {
                result_temp.push(this.state.results[i])
              }
    
            } else {
              
              let filter = this.state.results.filter((result_) => {return result_.substring(0,1).toLowerCase().includes(event.target.value.toLowerCase())});
              console.log("Handle Click2");
              console.log(this.state.results);
              console.log(filter);
              console.log("Handle Click2");
    
              if (filter) {
                console.log("Handle Click3");
                
                let len = filter.length
                for (let i = 0; i < len; i++) {
                  result_temp.push(filter[i])
                }            
                console.log("Handle Click3");
              }
            }

            this.setState({resultsFiltered: result_temp }, () => {
              console.log(this.state.resultsFiltered, 'Filtered');
              this.handleSecondFilter(event);
            }); 

          }); 
        
        } else {
          this.handleSecondFilter(event);
        }
        

        console.log("Handle Click");
        console.log(event.target.value);
        event.preventDefault();
      }
      

      handleSecondFilter(event){

        let result_temp = []
        if(event.target.value === "1" || event.target.value === "2" || event.target.value === "3" || event.target.value === "4" || event.target.value === "ALL2" ){
          this.setState({resultsFiltered2: [] }, () => {
            if (event.target.value === "ALL2") {
            
              console.log("Handle Click1");
    
              let len = this.state.resultsFiltered.length
              for (let i = 0; i < len; i++) {
                result_temp.push(this.state.resultsFiltered[i])
              }
    
            } else {
              
              let filter = this.state.resultsFiltered.filter((result_) => {return result_.substring(0,4).toLowerCase().includes(event.target.value.toLowerCase())});
              console.log("Handle Click2");
              console.log(filter);
              console.log("Handle Click2");
    
              if (filter) {
                console.log("Handle Click3");
                
                let len = filter.length
                for (let i = 0; i < len; i++) {
                  result_temp.push(filter[i])
                }            
                console.log("Handle Click3");
              }
            }

            this.setState({filter: event.target.value }, () => {
              console.log(this.state.resultsFiltered2, 'Filtered');
            }); 
            this.setState({resultsFiltered2: result_temp }, () => {
              console.log(this.state.resultsFiltered2, 'Filtered');
            }); 


          });
        } else {
          this.setState({resultsFiltered2: [] }, () => {
            if (this.state.filter=== "ALL2") {
            
              console.log("Handle Click1 2");
    
              let len = this.state.resultsFiltered.length
              for (let i = 0; i < len; i++) {
                result_temp.push(this.state.resultsFiltered[i])
              }
    
            } else {
              
              let filter = this.state.resultsFiltered.filter((result_) => {return result_.substring(0,4).toLowerCase().includes(this.state.filter.toLowerCase())});
              console.log("Handle Click2");
              console.log(filter);
              console.log("Handle Click2");
    
              if (filter) {
                console.log("Handle Click3");
                
                let len = filter.length
                for (let i = 0; i < len; i++) {
                  result_temp.push(filter[i])
                }            
                console.log("Handle Click3");
              }
            }

            this.setState({resultsFiltered2: result_temp }, () => {
              console.log(this.state.resultsFiltered2, 'Filtered2');
            }); 


          });

        }
      }

      render() {
        return (
        <div className='filter-wrapper'>
          <div>
            <div style={{ marginTop: "10%" }}>
              <h1> Course List</h1>
            </div>
            <CourseFilter handleClick={this.handleFilterClick} ></CourseFilter>
            <div className="SearchQuery-course-filters-page">
              <div className={"search-result-message-course"} >
                {this.state.message}
              </div>
              <div className={"search-result-display-course"} >
              {this.state.resultsFiltered2.map(result => <CourseFiltersResult course_code={result}></CourseFiltersResult>)}
              </div>
            </div>
          </div>
        </div>
        );
      }
    }   

export default CourseFiltersPage;