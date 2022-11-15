import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
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
                <Button onClick={this.props.handleClick} type="button" value="A" className="submit-button-course">A</Button>
                <Button onClick={this.props.handleClick}type="button" value="B" className="submit-button-course">B</Button>
                <Button onClick={this.props.handleClick}type="button" value="C" className="submit-button-course">C</Button>
                <Button onClick={this.props.handleClick} type="button" value="D" className="submit-button-course">D</Button>
                <Button onClick={this.props.handleClick}type="button" value="E" className="submit-button-course">E</Button>
                <Button onClick={this.props.handleClick}type="button" value="F" className="submit-button-course">F</Button>
                <Button onClick={this.props.handleClick} type="button" value="G" className="submit-button-course">G</Button>
                <Button onClick={this.props.handleClick}type="button" value="H" className="submit-button-course">H</Button>
                <Button onClick={this.props.handleClick} type="button" value="I" className="submit-button-course">I</Button>
                <Button onClick={this.props.handleClick}type="button" value="J" className="submit-button-course">J</Button>
                <Button onClick={this.props.handleClick} type="button" value="K" className="submit-button-course">K</Button>
                <Button onClick={this.props.handleClick} type="button" value="L" className="submit-button-course">L</Button>
                <Button onClick={this.props.handleClick}type="button" value="M" className="submit-button-course">M</Button>
                <Button onClick={this.props.handleClick} type="button" value="N" className="submit-button-course">N</Button>
                <Button onClick={this.props.handleClick} type="button" value="O" className="submit-button-course">O</Button>
                <Button onClick={this.props.handleClick} type="button" value="P" className="submit-button-course">P</Button>
                <Button onClick={this.props.handleClick} type="button" value="Q" className="submit-button-course">Q</Button>
                <Button onClick={this.props.handleClick} type="button" value="R" className="submit-button-course">R</Button>
                <Button onClick={this.props.handleClick}type="button" value="S" className="submit-button-course">S</Button>
                <Button onClick={this.props.handleClick}type="button" value="T" className="submit-button-course">T</Button>
                <Button onClick={this.props.handleClick}type="button" value="U" className="submit-button-course">U</Button>
                <Button onClick={this.props.handleClick} type="button" value="V" className="submit-button-course">V</Button>
                <Button onClick={this.props.handleClick} type="button" value="W" className="submit-button-course">W</Button>
                <Button onClick={this.props.handleClick} type="button" value="X" className="submit-button-course">X</Button>
                <Button onClick={this.props.handleClick}type="button" value="Y" className="submit-button-course">Y</Button>
                <Button onClick={this.props.handleClick} type="button" value="Z" className="submit-button-course">Z</Button>
                
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