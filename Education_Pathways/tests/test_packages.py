import pytest
import pytest
from index import app
from minor import check_course_in_minor
from flask.testing import FlaskClient


def test_course_package_endpoint():
    tester = app.test_client()
    response = tester.get("/packages?package_id=1")
    assert response.status_code == 200
