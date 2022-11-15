import React, {Component} from 'react'
import axios from 'axios'
import CoursePackageResults from './CoursePackageResults'
import './css/CoursePackagePage.css'
import "./css/styles.css";
import CoursePackageFilter from './CoursePackageFilter'
import SticktoTop from "./SticktoTop";

class CoursePackagePage extends Component {

  constructor() {
      super();
      this.state = {
          input: "",
          results: [],
          resultsFiltered: [],
          resultsFiltered2:[],
          message: "",
          courses: [],
          filter: 'ALL2',
          controller: null 
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
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/course_list`, {
          signal: controller.signal
        })
        console.log("course data")
        console.log(res.data)
        console.log(`it is ${res.status}`)
        if (res.status === 400) {
          alert("System Error. Please refresh")
          return
        }

        let result_temp = []

        if (res.status === 200) {
          if (res.data.courses.length > 0) {
            let len = res.data.courses.length
            for (let i = 0; i < len; i++) {
              result_temp.push(<CoursePackageResults course_code={res.data.courses[i].code} course_name={res.data.courses[i].name}></CoursePackageResults>)
            }
          } else if (res.data.courses.length === 0) {
            result_temp = []
          } else {
            result_temp.push(<CoursePackageResults course_code={res.data.courses.code} course_name={res.data.courses.name}></CoursePackageResults>)
          }


          this.setState({ results: result_temp }, () => {
            this.setState({resultsFiltered: this.state.results }, () => {
              this.setState({resultsFiltered2: this.state.resultsFiltered});
            });
          });

        } 
        
      }
      catch(err){
          this.setState({
            fetching: false
          })
          console.log(err)
      }
    }
  }

  componentDidMount(){
    this.getData("ALL");
    //let result_temp = ['ACE140','BAE412', 'ECE412'];
    //result_temp.push(<CoursePackageResults id = {"B"} course_code={"ECE0"}></CoursePackageResults>);
    //result_temp.push(<CoursePackageResults id = {"A"} course_code={"A"}></CoursePackageResults>);
    //this.setState({ results: result_temp });
  }

  handleFilterClick(event) {

    let result_temp = []
    if(event.target.value !== "1" && event.target.value !== "2" && event.target.value !== "3" && event.target.value !== "4" && event.target.value !== "5" && event.target.value !== "ALL2" ){
      this.setState({resultsFiltered: [] }, () => {
        if (event.target.value === "ALL") {
        
          console.log("Handle Click1");

          let len = this.state.results.length
          for (let i = 0; i < len; i++) {
            result_temp.push(this.state.results[i])
          }

        } else if (event.target.value === "SE"){
          //console.log(result_.props.course_code) 
          let code = `ece`;
          let filter1 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `csc`;
          let filter2 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `rob`;
          let filter3 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `aps360h1`;
          let filter4 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          
          let filter = filter1.concat(filter2).concat(filter3).concat(filter4);

          if (filter) {
            let len = filter.length
            for (let i = 0; i < len; i++) {
              result_temp.push(filter[i])
            }            
          }
        } else if (event.target.value === "CS"){
          
        //console.log(result_.props.course_code) 
          let code = `sta`;
          let filter1 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `csc`;
          let filter2 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `rob`;
          let filter3 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `aps360h1`;
          let filter4 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          code = `tmu111h1`;
          let filter5 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          
          let filter = filter1.concat(filter2).concat(filter3).concat(filter4).concat(filter5);

          if (filter) {
            let len = filter.length
            for (let i = 0; i < len; i++) {
              result_temp.push(filter[i])
            }            
          }
        } else if (event.target.value === "AER"){
          
            //console.log(result_.props.course_code) 
          let code = `aer`;
          let filter1 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `sta`;
          let filter2 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `che`;
          let filter3 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `rob`;
          let filter4 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          
          let filter = filter1.concat(filter2).concat(filter3).concat(filter4);

          if (filter) {
            let len = filter.length
            for (let i = 0; i < len; i++) {
              result_temp.push(filter[i])
            }            
          }
        } else if (event.target.value === "BME"){
          
            //console.log(result_.props.course_code) 
          let code = `bme`;
          let filter1 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `bcb`;
          let filter2 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `csc420h1`;
          let filter3 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          code = `csc428h1`;
          let filter4 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          code = `hmb`;
          let filter5 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `imm`;
          let filter6 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});

          let filter = filter1.concat(filter2).concat(filter3).concat(filter4).concat(filter5).concat(filter6);
          if (filter) {
            let len = filter.length
            for (let i = 0; i < len; i++) {
              result_temp.push(filter[i])
            }            
          }
        } else if (event.target.value === "ENV"){
          
            //console.log(result_.props.course_code) 
          let code = `env`;
          let filter1 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `for`;
          let filter2 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `ggr`;
          let filter3 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `tep`;
          let filter4 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          
          let filter = filter1.concat(filter2).concat(filter3).concat(filter4);

          if (filter) {
            let len = filter.length
            for (let i = 0; i < len; i++) {
              result_temp.push(filter[i])
            }            
          }
        } else if (event.target.value === "MAI"){
          
            //console.log(result_.props.course_code) 
          let code = `aps360h1`;
          let filter1 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          code = `aer336`;
          let filter2 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          code = `csc311`;
          let filter3 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          code = `csc401`;
          let filter4 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          code = `csc413`;
          let filter5 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          code = `csc420`;
          let filter6 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          code = `csc428`;
          let filter7 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          code = `csc485`;
          let filter8 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          
          code = `rob311`;
          let filter9 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          
          code = `rob313`;
          let filter10 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          

          let filter = filter1.concat(filter2).concat(filter3).concat(filter4).concat(filter5).concat(filter6).concat(filter7).concat(filter8).concat(filter9).concat(filter10);

          if (filter) {
            let len = filter.length
            for (let i = 0; i < len; i++) {
              result_temp.push(filter[i])
            }            
          }
        } else if (event.target.value === "GEO"){
          
            //console.log(result_.props.course_code) 
          let code = `ggr`;
          let filter1 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `for`;
          let filter2 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `eco`;
          let filter3 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `sta`;
          let filter4 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          
          let filter = filter1.concat(filter2).concat(filter3).concat(filter4);

          if (filter) {
            let len = filter.length
            for (let i = 0; i < len; i++) {
              result_temp.push(filter[i])
            }            
          }
        } else if (event.target.value === "STATS"){
          
            //console.log(result_.props.course_code) 
          let code = `sta`;
          let filter1 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `eco`;
          let filter2 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `csc343`;
          let filter3 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          code = `csc263`;
          let filter4 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          
          let filter = filter1.concat(filter2).concat(filter3).concat(filter4);

          if (filter) {
            let len = filter.length
            for (let i = 0; i < len; i++) {
              result_temp.push(filter[i])
            }            
          }
        } else if (event.target.value === "PSY"){
          
            //console.log(result_.props.course_code) 
          let code = `tep`;
          let filter1 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `for`;
          let filter2 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `env`;
          let filter3 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `aps360h1`;
          let filter4 = this.state.results.filter((result_) => {console.log(result_.props.course_code); return result_.props.course_code.toLowerCase().includes(code)});
          code = `hmu`;
          let filter5 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          
          let filter = filter1.concat(filter2).concat(filter3).concat(filter4).concat(filter5);

          if (filter) {
            let len = filter.length
            for (let i = 0; i < len; i++) {
              result_temp.push(filter[i])
            }            
          }
        } else if (event.target.value === "AUDIO"){
          
            //console.log(result_.props.course_code) 
          let code = `hmu`;
          let filter1 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `csc`;
          let filter2 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `sta`;
          let filter3 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `tmu`;
          let filter4 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          
          let filter = filter1.concat(filter2).concat(filter3).concat(filter4);

          if (filter) {
            let len = filter.length
            for (let i = 0; i < len; i++) {
              result_temp.push(filter[i])
            }            
          }
        } else if (event.target.value === "CIV"){
          
            //console.log(result_.props.course_code) 
          let code = `civ`;
          let filter1 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `sta`;
          let filter2 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          code = `ggr`;
          let filter3 = this.state.results.filter((result_) => {console.log(result_.props.course_code.substring(0,3)); return result_.props.course_code.substring(0,3).toLowerCase().includes(code)});
          
          let filter = filter1.concat(filter2).concat(filter3);

          if (filter) {
            let len = filter.length
            for (let i = 0; i < len; i++) {
              result_temp.push(filter[i])
            }            
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
    if(event.target.value === "1" || event.target.value === "2" || event.target.value === "3" || event.target.value === "4" || event.target.value === "5" || event.target.value === "ALL2" ){
      this.setState({resultsFiltered2: [] }, () => {
        if (event.target.value === "ALL2") {
        
          console.log("Handle Click1");

          let len = this.state.resultsFiltered.length
          for (let i = 0; i < len; i++) {
            result_temp.push(this.state.resultsFiltered[i])
          }

        } else {
          
          let filter = this.state.resultsFiltered.filter((result_) => {return result_.props.course_code.substring(0,4).toLowerCase().includes(event.target.value.toLowerCase())});
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
          
          let filter = this.state.resultsFiltered.filter((result_) => {return result_.props.course_code.substring(0,4).toLowerCase().includes(this.state.filter.toLowerCase())});
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
    <div className='filter-wrapper-pack'>
      <div>
        <div style={{ marginTop: "10%" }}>
          <h1> Course Packadges</h1>
        </div>
        <div style={{ marginTop: "10%", zIndex:'200', position:'relative'}}>
          
          <SticktoTop>
            <CoursePackageFilter handleClick={this.handleFilterClick} ></CoursePackageFilter>
          </SticktoTop>
        </div>
        <div className="SearchQuery-course-filters-page-pack">
          <div className={"search-result-display-course-pack"} >
          {this.state.resultsFiltered2.sort(
            function(a, b) { 

              //console.log("A")
              //console.log(a.props.course_code.substring(3,6))
              //console.log("B")
              //console.log(b.props.course_code.substring(3,6))
              //console.log("A-B")
              //console.log(a.props.course_code.substring(3,6) - b.props.course_code.substring(3,6))
              
              
              return  (parseInt(a.props.course_code.substring(3,6)) - parseInt(b.props.course_code.substring(3,6)));
              
              
            })
          }
          </div>
        </div>
      </div>
    </div>
    );
  }
}  

export default CoursePackagePage;