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
                            <Nav.Link href={`/courseDetails/${course.code}`} className="package-course" key={course.code}>
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