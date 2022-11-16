import React from 'react';
import CoursePackage from './CoursePackage';
import SticktoTop from "./SticktoTop";
import './css/coursepackages.css'

export default function CoursePackages() {
  // fetch data from packages endpoint
  const [data, setData] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [fetching, setFetching] = React.useState(false);
  const [msg, setMsg] = React.useState("");
  React.useEffect(() => {
    const controller = new AbortController();
    setFetching(true);
    fetch(`${process.env.REACT_APP_API_URL}/packages/search?input=${query}`, {
      signal: controller.signal
    })
      .then(res => {
        setFetching(false);
        return res.json();
      })
      .then(d => {
        const new_data = d.map((item) => {
          return {
            name: item.name,
            description: item.description,
            courses: item.courses,
            _id: item._id
          }
        })
        setMsg(`Found ${new_data.length} matching packages.`)
        setData(r => [...new_data]);
        })
        .catch(e => {
          setFetching(false);
          console.log(e);
        });
      return () => {
        setFetching(false);
        controller.abort();
      }
  }, [query]);
  return (

    <div className='course-packages comment-offset'>

      <div style={{ marginTop: "10%", zIndex:'200', position:'relative'}}>
      <h1>Course Packages</h1>
          <SticktoTop>
            <form onSubmit= {(event)=>{
            event.preventDefault();
            setQuery(event.target[0].value);
            }} className="search">
            <input placeholder="Search for course packages ..." className="text-input" type="text"/>
            <div className="submit-button-wrapper">
              <input type="submit" value="Search" className="submit-button-pack" />
            </div>
          </form>
          </SticktoTop>
        </div>
      
      
      <div className={"search-result-message"} >{msg}</div>
      
      {
      fetching ? <div className={"search-result-message"} >Fetching data..</div>: 
      
      <div className="gird" style={{
        "display": "grid",
        "gridTemplateColumns": "1fr 1fr",
        "color":"red"
      }}>
      
        {
          data?.map((item, index) => 
            <CoursePackage key={item._id} name={item.name} description={item.description} courses={item.courses} />
          )
        }
      </div>
      }
    </div>
  );
}