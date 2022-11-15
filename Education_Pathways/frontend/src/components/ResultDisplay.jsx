import React, { Component } from "react";
import axios from 'axios'
import Result from './Results'
import './css/Result.css'
import Label from './Label'
import "./css/styles.css";
class SearchResultDisplay extends Component {

  constructor() {
    super();
    this.state = {
      input: "",
      results: [],
      message: "",
      fetching: false,
      controller: null 
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ input: event.target.value }, () => {
      if (this.state.input && (this.state.input).length > 1)
      {
        this.getData(this.state.input);
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getData(this.state.input)
  }

  getData = async (input, controller) => {
    // check if fetching
    if (this.state.fetching) {
      // abort previous request
      this.state.controller.abort();
    }
    if (!this.state.fetching) {
      const controller = new AbortController();
      this.setState({ 
        fetching: true,
        controller: controller
      });
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/searchc?input=${input}`, {
          signal: controller.signal
        })
        console.log("course data")
        console.log(res.data)
<<<<<<< HEAD
        console.log(`it is 123 ${res.status}`)
=======
        console.log(`it is ${res.status}`)
        if (res.status === 400) {
          alert("System Error. Please refresh")
          return
        }
>>>>>>> main

        if (res.status === 200) {
          if (res.data.length > 0) {
            let len = res.data.length
            let result_temp = []
            result_temp.push(<Label></Label>)
            for (let i = 0; i < len; i++) {
              result_temp.push(<Result course_code={res.data[i].code} course_name={res.data[i].name}></Result>)
            }
            this.setState({ 
              results: result_temp,
              message: `${res.data.length} courses found for '${input}'`,
              fetching: false
            })
          } else if (res.data.length === 0) {
            this.setState({ 
              message: `No courses found for '${input}'`,
              results: [],
              fetching: false
            })
          } else {
            let result_temp = []
            result_temp.push(<Label></Label>)
            result_temp.push(<Result course_code={res.data.course.code} course_name={res.data.course.name}></Result>)
            this.setState({ 
              results: result_temp,
              message: "",
               fetching: false
            })
          }
        } 
        
      }catch(err){
          this.setState({
            fetching: false
          })
          console.log(err)
      }
    }
  }

  render() {
    return (
      <div className="SearchQuery">
        <div style={{ marginTop: "10%" }}>
          <h1> Education Pathways</h1>
          <br></br>
          <form onSubmit={this.handleSubmit} className={"search"}>
            <input placeholder={"Search for course code, course name, keyword ..."} className={"text-input"} type="text" value={this.state.input} onChange={this.handleChange} />
            <input type="submit" value="Search" className={"submit-button"} />
          </form>
        </div>
        <div className={"search-result-message"} >
          {this.state.message}
        </div>
        {this.state.fetching ? <div className={"search-result-message"}>Fetching...</div> : 
        <div className={"search-result-display"} >
          {this.state.results}
        </div>
        }
      </div>
    );
  }
}

export default SearchResultDisplay;
