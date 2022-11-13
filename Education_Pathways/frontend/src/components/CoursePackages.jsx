import React from 'react';
import CoursePackage from './CoursePackage';

import './css/coursepackages.css'

const data = [
    {
        name: "Package 1",
        description: "This is a package",
        courses: [
            "CSC343H1",
            "CSC343H1",
            "CSC343H1"
        ],
        _id: 1
    },
    {
        name: "Computer Science",
        description: "This package is for students who are interested in Computer Science.",
        courses: [ 
            "CSC343H1",
            "CSC343H1",
            "CSC343H1"
     ],
        _id: 2               
    },
    {
        name: "Computer Science",
        description: "This package is for students who are interested in Computer Science.",
        courses: [ "CSC343H1", 
        "ECE444H1",
        "ECE444H1"
    ],
        _id: 3
    }
]

export default function CoursePackages() {
  return (
    <div className='course-packages'>
      <h1>Course Packages</h1>
      <div className="gird" style={{
        "display": "grid",
        "gridTemplateColumns": "1fr 1fr"
    }}>
        {
        data.map((item, index) => {
            return ( <div className="grid-item">
                <CoursePackage name={item.name} description={item.description} courses={item.courses} />
            </div>
            );
        })
        }
      </div>
    </div>
  );
}