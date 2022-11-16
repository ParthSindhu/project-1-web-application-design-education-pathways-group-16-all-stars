import React from "react";
import { Nav } from "react-bootstrap";

import "./css/coursepackages.css";

export default function CoursePackage({ name, description, courses }) {
    return  (
        <div className="grid-item">

        <div className='package-bg'></div>
        <div className="package-content">
            <h2>
                {name}
                </h2>
            <p>
                {description}
            </p>
            <div className="package-courses">
                {courses.map((course, index) => {
                    return (
                        // <div className="package-course">
                            <Nav.Link chref={`/courseDetails/${course.code}`} className="package-course" key={course.code}>

                            <div className="title-course-pack">
                                {course.code}
                            </div>
                            <div className="sub-course-pack">
                                {course.name}
                            </div>

                            </Nav.Link>
                        // </div>
                    );
                })}
            </div>
        </div>
        </div>
    );
}