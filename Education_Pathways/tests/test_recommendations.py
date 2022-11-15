from index import app

def test_course_recommendations_valid_input():
    tester = app.test_client()
    response = tester.get("/course/recommendations?tag=software")
    # Validate status code
    assert response.status_code == 200

    recommended_courses = response.get_json()

    # Validate payload
    assert isinstance(recommended_courses, list)
    if (len(recommended_courses) > 0):
        for course in recommended_courses:
            assert isinstance(course['code'], str)
            assert isinstance(course['name'], str)

def test_course_recommendations_invalid_input():
    tester = app.test_client()
    response = tester.get("/course/recommendations")
    # Validate status code
    assert response.status_code == 400

    # Validate payload
    error = response.get_json()
    assert isinstance(error, dict)
    assert error['error'] == 'missing or invalid parameter'
