
from index import app

def test_course_package_post_endpoint():
    tester = app.test_client()
    payload = {
        "code": "ECE320",
        "name": "Fields and Waves",
    }
    response = tester.get("/course_list")
    assert response.status_code == 200
    # Check error message to be package already exists


def test_course_package_get_endpoint():
    tester = app.test_client()
    response = tester.get("/course_list")
    assert response.status_code == 200
    

def test_course_package_search_endpoint():
    tester = app.test_client()
    response = tester.get("/course_list")
    assert response.status_code == 200
    # check if length > 2 , for test_course and test_course_2
    assert len(response.json) >= 2