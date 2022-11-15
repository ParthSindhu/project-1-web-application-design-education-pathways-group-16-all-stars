import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import './css/CourseFiltersResult.css'

// import unstarred from './img/star.png'
// import starred from './img/starred.png'

// let star;


class CourseFilter extends Component {
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
        <div>
            Alphabetical Filter
            <Container className = 'container-course-filters-filter-page'>
                <Button onClick={this.props.handleClick} type="button" value="ALL" className="submit-button-course">ALL</Button>
                <Button onClick={this.props.handleClick} type="button" value="APS" className="submit-button-course">APS</Button>
                <Button onClick={this.props.handleClick}type="button" value="AER" className="submit-button-course">AER</Button>
                <Button onClick={this.props.handleClick}type="button" value="BME" className="submit-button-course">BME</Button>
                <Button onClick={this.props.handleClick} type="button" value="BCB" className="submit-button-course">BCB</Button>
                <Button onClick={this.props.handleClick}type="button" value="CHE" className="submit-button-course">CHE</Button>
                <Button onClick={this.props.handleClick}type="button" value="CIV" className="submit-button-course">CIV</Button>
                <Button onClick={this.props.handleClick} type="button" value="CSC" className="submit-button-course">CSC</Button>
                <Button onClick={this.props.handleClick}type="button" value="ECE" className="submit-button-course">ECE</Button>
                <Button onClick={this.props.handleClick} type="button" value="ECO" className="submit-button-course">ECO</Button>
                <Button onClick={this.props.handleClick}type="button" value="ENV" className="submit-button-course">ENV</Button>
                <Button onClick={this.props.handleClick} type="button" value="FOR" className="submit-button-course">FOR</Button>
                <Button onClick={this.props.handleClick} type="button" value="GGR" className="submit-button-course">GGR</Button>
                <Button onClick={this.props.handleClick}type="button" value="HMU" className="submit-button-course">HMU</Button>
                <Button onClick={this.props.handleClick} type="button" value="HPS" className="submit-button-course">HPS</Button>
                <Button onClick={this.props.handleClick} type="button" value="HMB" className="submit-button-course">HMB</Button>
                <Button onClick={this.props.handleClick} type="button" value="IMM" className="submit-button-course">IMM</Button>
                <Button onClick={this.props.handleClick} type="button" value="ROB" className="submit-button-course">ROB</Button>
                <Button onClick={this.props.handleClick} type="button" value="STA" className="submit-button-course">STA</Button>
                <Button onClick={this.props.handleClick}type="button" value="TEP" className="submit-button-course">TEP</Button>
                <Button onClick={this.props.handleClick}type="button" value="TMU" className="submit-button-course">TMU</Button>
                
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
                </select>
                </label>
            </form>
        </div>
        
      );
    }
}

  export default CourseFilter