import pytest
from index import app
from minor import check_course_in_minor
from flask.testing import FlaskClient


def test_course_list_endpoint():
    tester = app.test_client()
    response = tester.get("/course_list")
    assert response.status_code == 200


def test_course_list_endpoint_limit():
    tester = app.test_client()
    response = tester.get("/course_list?limit=10")
    assert response.status_code == 200
    assert len(response.json['courses']) == 10
