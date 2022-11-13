import React from "react";

import "./css/coursepackages.css";

export default function CoursePackage({ name, description, courses }) {
    return  (
        <>
        <div className='package-bg'></div>
        <div className="package-content">
            {name}
            <p>
                {description}
            </p>
            <div className="package-courses">
                {courses.map((course, index) => {
                    return (
                        <div className="package-course">
                            {course}
                        </div>
                    );
                })}
            </div>
        </div>
        </>
    );
}