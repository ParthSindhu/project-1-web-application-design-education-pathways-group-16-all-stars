import React from 'react';
import CoursePackage from './CoursePackage';

import './css/coursepackages.css'

function submitPackage(event){
  console.log("submit package")
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  let name = data.get("package");
  let description = data.get("description");
  let course1 = data.get("p1");
  let course2 = data.get("p2");
  let course3 = data.get("p3");
  let course4 = data.get("p4");
  let courses = [course1, course2, course3, course4];
  fetch(`${process.env.REACT_APP_API_URL}/packages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      description,
      courses
    }),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  }
  )
}


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
    <>
    <div className='course-packages comment-offset'>

      <h1>Course Packages</h1>
      <form onSubmit={(event)=>{
        event.preventDefault();
        setQuery(event.target[0].value);
      }} className="search">
        <input placeholder="Search for course packages ..." className="text-input" type="text"/>
        <input type="submit" value="Search" className="submit-button" />
      </form>
      <div className={"search-result-message"} >{msg}</div>
      {
      fetching ? <div className={"search-result-message"} >Fetching data..</div>: 
      <div className="gird" style={{
        "display": "grid",
        "gridTemplateColumns": "1fr 1fr"
    }}>
      
        {
          data?.map((item, index) => 
            <CoursePackage key={item._id} name={item.name} description={item.description} courses={item.courses} />
          )
        }
      </div>
      }
    </div>
    <div className='submit-package-form'>
    <h3> Create a New Package</h3>
    <form id="packageform" onSubmit={submitPackage}>
        <label htmlFor="package" className="required"> Add Package name</label>
        <input type="text" name="package" tabIndex="1"
            required="required" maxLength="20"/>
        <br />
        <label htmlFor="description" className="required"> Add Description</label> <br />
        <textarea name="description" rows="7" tabIndex="4" maxLength="500" required="required"/>
        <br />
        Add Courses
        <br />
        Course 1<input type="text" name="p1"  /> <br />
        Course 2<input type="text" name="p2"  /> <br />
        Course 3<input type="text" name="p3"  /> <br />
        Course 4<input type="text" name="p4"  /> <br />
        <button className={"syllabus-link"} >Submit</button>

    </form>
</div>
</>
  );
}