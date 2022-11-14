from index import app

def test_course_ratings_get_endpoint():
    tester = app.test_client()
    response = tester.get("/course/ratings?course=ECE361H1")
    assert response.status_code == 200
    # Check if all ratings are contained in the response
    assert ("ratings_difficulty" and "ratings_courseload" and "ratings_engagement") in response.json
    # Check if the ratings are the correct type
    assert isinstance(response.json["ratings_difficulty"], list)
    assert isinstance(response.json["ratings_courseload"], list)
    assert isinstance(response.json["ratings_engagement"], list)

def test_ratings_correct_post_endpoint():
    tester = app.test_client()
    payload = {
        "course": "ECE331H1",
        "rating_difficulty": 1,
        "rating_courseload": 2,
        "rating_engagement": 3
    }
    response = tester.post("/course/ratings", json=payload)
    # Check if payload is succesfully sent to db
    assert response.status_code == 200

def test_ratings_incorrect_post_endpoint():
    tester = app.test_client()
    payload = {
        "course": "ECE331H1",
        "rating_difficulty": 1,
        "rating_courseload": 1
    }
    response = tester.post("/course/ratings", json=payload)
    # Ensure payload is not sent if all ratings are not fed into payload
    assert response.status_code == 400

