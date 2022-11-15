import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import './css/CoursePackagePage.css'

// import unstarred from './img/star.png'
// import starred from './img/starred.png'

// let star;


class CoursePackageFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({value: event.target.value});
      }
    
      handleSubmit(event) {
        console.log(this.state.value)
        //alert('A name was submitted: ' + this.state.value);
        event.preventDefault();
      }
    
      render() {
        return (
        <div className = 'wrapper-course-filter-pack'>
            Alphabetical Filter
            <Container className = 'container-course-filters-filter-page-pack'>
                <Button onClick={this.props.handleClick} type="button" value="ALL" className="submit-button-course-pack">ALL</Button>
                <Button onClick={this.props.handleClick} type="button" value="SE" className="submit-button-course-pack">Software Engineer</Button>
                <Button onClick={this.props.handleClick} type="button" value="CS" className="submit-button-course-pack">Computer Science</Button>
                <Button onClick={this.props.handleClick}type="button" value="AER" className="submit-button-course-pack">Aerospace Engineer</Button>
                <Button onClick={this.props.handleClick}type="button" value="BME" className="submit-button-course-pack">Biomedical</Button>
                <Button onClick={this.props.handleClick} type="button" value="ENV" className="submit-button-course-pack">Environmental Engineer</Button>
                <Button onClick={this.props.handleClick}type="button" value="MAI" className="submit-button-course-pack">AI</Button>
                <Button onClick={this.props.handleClick}type="button" value="GEO" className="submit-button-course-pack">Geography</Button>
                <Button onClick={this.props.handleClick} type="button" value="STATS" className="submit-button-course-pack">Statistics</Button>
                <Button onClick={this.props.handleClick}type="button" value="PSY" className="submit-button-course-pack">Psychology</Button>
                <Button onClick={this.props.handleClick} type="button" value="AUDIO" className="submit-button-course-pack">Audio Engineering</Button>
                <Button onClick={this.props.handleClick} type="button" value="CIV" className="submit-button-course-pack">Civil Engineering</Button>
                
            </Container>
            <form>
                <label>
                Course Levels: 
                <select value={this.state.value} onChange={this.handleChange} onClick={this.props.handleClick}>
                    <option value="ALL2">Any</option>
                    <option value="1">100</option>
                    <option value="2">200</option>
                    <option value="3">300</option>
                    <option value="4">400</option>
                    <option value="5">500</option>
                </select>
                </label>
            </form>
        </div>
        
      );
    }
}

  export default CoursePackageFilter