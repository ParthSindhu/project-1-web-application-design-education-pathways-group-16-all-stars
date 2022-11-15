import React from "react";
import { Nav } from "react-bootstrap";

import "./css/coursepackages.css";

export default function CoursePackage({ name, description, courses }) {
    return  (
        <div className="grid-item">

        <div className='package-bg'></div>
        <div className="package-content">
            {name}
            <p>
                {description}
            </p>
            <div className="package-courses">
                {courses.map((course, index) => {
                    return (
                        // <div className="package-course">
                            <Nav.Link to={`/courseDetails/${course.code}`} className="package-course" key={course.code}>
                            {course.code}
                            <p>
                                {course.name}
                            </p>
                            </Nav.Link>
                        // </div>
                    );
                })}
            </div>
        </div>
        </div>
    );
}