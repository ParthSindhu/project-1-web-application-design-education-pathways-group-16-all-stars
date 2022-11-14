import pytest
import pytest
from index import app
from minor import check_course_in_minor
from flask.testing import FlaskClient


def test_course_package_post_endpoint():
    tester = app.test_client()
    payload = {
        "name": "Test Course 2",
        "description": "This is a test course",
        "courses": [
            "ECE444H1",
            "ECE496Y1",
            "ECE466H1"
        ]
    }
    response = tester.post("/packages", json=payload)
    assert response.status_code == 400
    # Check error message to be package already exists
    assert response.json['error'] == "package already exists"


def test_course_package_get_endpoint():
    tester = app.test_client()
    response = tester.get("/packages?package_id=test_course_2")
    assert response.status_code == 200
    # check if response.json['package'] has courses, description, name , package_id
    assert 'courses' in response.json['package']
    assert 'description' in response.json['package']
    assert 'name' in response.json['package']
    assert 'package_id' in response.json['package']


def test_course_package_search_endpoint():
    tester = app.test_client()
    response = tester.get("/packages/search?input=test")
    assert response.status_code == 200
    # check if length > 2 , for test_course and test_course_2
    assert len(response.json) >= 2
