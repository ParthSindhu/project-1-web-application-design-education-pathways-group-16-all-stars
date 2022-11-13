# this is the controller

from flask import jsonify, request
from flask_restful import Resource, reqparse
# from flask_cors import cross_origin
from config import app
from model import *
from fuzzy import nysiis
import re


# -------------------- User related --------------------
class UserRatings(Resource):
    def get(self):
        course = request.args.get('course')
        try:
            course = Course.get(course)
            ratings_difficulty = course.ratings_difficulty
            ratings_courseload = course.ratings_courseload
            ratings_engagement = course.ratings_engagement
            resp = jsonify({
                "ratings_difficulty": ratings_difficulty,
                "ratings_courseload": ratings_courseload,
                "ratings_engagement": ratings_engagement
            })
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('course', required=True)
        parser.add_argument('rating_difficulty', required=True)
        parser.add_argument('rating_courseload', required=True)
        parser.add_argument('rating_engagement', required=True)
        data = parser.parse_args()
        course = data['course']
        rating_difficulty = data['rating_difficulty']
        rating_courseload = data['rating_courseload']
        rating_engagement = data['rating_engagement']
        try:
            in_course = Course.get(course)
            in_course.ratings_difficulty.append(rating_difficulty)
            in_course.ratings_courseload.append(rating_courseload)
            in_course.ratings_engagement.append(rating_engagement)
            in_course.save()
            resp = jsonify({
                "rating_difficulty": rating_difficulty,
                "rating_courseload": rating_courseload,
                "rating_engagement": rating_engagement
            })
            resp.status_code = 200
            return resp
        except Exception as e:
            print(e)
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp


class UserRegistration(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True)
        parser.add_argument('password', required=True)
        data = parser.parse_args()
        username = data['username']
        password = data['password']

        if User.objects(username=username):
            resp = jsonify({'message': 'Username already exists'})
            resp.status_code = 409
            return resp

        try:
            User.create(username, password)
            resp = jsonify({})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp


class UserUpdatePwd(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True)
        parser.add_argument('password', required=True)
        data = parser.parse_args()
        username = data['username']
        password = data['password']
        try:
            User.create(username, password)
            resp = jsonify({})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp


class UserLogin(Resource):
    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True)
        parser.add_argument('password', required=True)
        data = parser.parse_args()
        username = data['username']
        password = data['password']
        try:
            if User.verify_password(username, password):
                resp = jsonify({'username': username})
                resp.status_code = 200
            else:
                resp = jsonify({'message': 'Login failed'})
                resp.status_code = 401
                return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp
# ------------------------------------------------------------

# -------------------- Course related --------------------


class SearchCourse(Resource):
    def get(self):
        input = request.args.get('input')
        code = re.findall('[a-zA-Z]{3}\d{3}[hH]?\d?', input)
        if code:
            code = code[0].upper()
            if len(code) == 6:
                code += 'H1'
            elif len(code) == 5:
                code += '1'
            if Course.objects(code=code):
                try:
                    resp = jsonify({'course': Course.get(code)})
                    resp.status_code = 200
                    return resp
                except Exception as e:
                    resp = jsonify({'error': str(e)})
                    resp.status_code = 400
                    return resp
        input = ' '.join([nysiis(w) for w in input.split()])
        try:
            searchCourseCode = list(Course.objects(code__icontains=input))
            searchCourseName = list(Course.objects(name__icontains=input))
            searchCourseDescription = list(
                Course.objects(description__icontains=input))
            search = list(dict.fromkeys(searchCourseCode +
                          searchCourseName + searchCourseDescription))
            resp = jsonify(search)
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('input', required=True)
        data = parser.parse_args()
        input = data['input']
        code = re.findall('[a-zA-Z]{3}\d{3}[hH]?\d?', input)
        if code:
            code = code[0].upper()
            if len(code) == 6:
                code += 'H1'
            elif len(code) == 5:
                code += '1'
            if Course.objects(code=code):
                try:
                    resp = jsonify({'course': Course.get(code)})
                    resp.status_code = 200
                    return resp
                except Exception as e:
                    resp = jsonify({'error': str(e)})
                    resp.status_code = 400
                    return resp
        input = ' '.join([nysiis(w) for w in input.split()])
        try:
            search = Course.objects.search_text(input).order_by('$text_score')
            resp = jsonify(search)
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp


class ShowCourse(Resource):
    def get(self):
        code = request.args.get('code')
        if not Course.objects(code=code):
            resp = jsonify({'message': f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp
        try:
            resp = jsonify({'course': Course.get(code)})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('code', required=True)
        data = parser.parse_args()
        code = data['code']
        if not Course.objects(code=code):
            resp = jsonify({'message': f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp
        try:
            resp = jsonify({'course': Course.get(code)})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp


class ShowRecommendations(Resource):
    def get(self):
        tag = request.args.get('tag')

        try:
            recommended_courses = list(Course.objects(tag__iexact=tag))
            resp = jsonify(recommended_courses)
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp


class ShowCourseGraph(Resource):
    def get(self):
        code = request.args.get('code')
        if not Course.objects(code=code):
            resp = jsonify({'message': f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp
        try:
            resp = jsonify({'graph': Course.get_requisite_graph(code)})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('code', required=True)
        data = parser.parse_args()
        code = data['code']
        if not Course.objects(code=code):
            resp = jsonify({'message': f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp
        try:
            resp = jsonify({'graph': Course.get_requisite_graph(code)})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp

# ------------------------------------------------------------

# -------------------- Wishlist related --------------------


class UserWishlist(Resource):
    def get(self):
        username = request.args.get('username')
        try:
            resp = jsonify(
                {'wishlist': User.get_wishlist(username_=username).expand()})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True)
        data = parser.parse_args()
        username = data['username']
        try:
            resp = jsonify(
                {'wishlist': User.get_wishlist(username_=username).expand()})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('code', required=True)
        data = parser.parse_args()
        code = data['code']
        if not Course.objects(code=code):
            resp = jsonify({'message': f"Course {code} doesn't exist"})
            resp.status_code = 404
            return resp
# ------------------------------------------------------------


class UserWishlistAdd(Resource):
    def get(self):
        username = request.args.get('username')
        code = request.args.get('code')
        try:
            course = Course.get(code)
            wl = User.get_wishlist(username_=username)
            wl.add_course(course)
            resp = jsonify({'wishlist': wl.expand()})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True)
        parser.add_argument('code', required=True)
        data = parser.parse_args()
        username = data['username']
        code = data['code']
        try:
            course = Course.get(code)
            wl = User.get_wishlist(username_=username)
            wl.add_course(course)
            resp = jsonify({'wishlist': wl.expand()})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp


class UserWishlistRemove(Resource):
    def get(self):
        username = request.args.get('username')
        code = request.args.get('code')
        try:
            course = Course.get(code)
            wl = User.get_wishlist(username_=username)
            wl.remove_course(course)
            resp = jsonify({'wishlist': wl.expand()})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True)
        parser.add_argument('code', required=True)
        data = parser.parse_args()
        username = data['username']
        code = data['code']
        try:
            course = Course.get(code)
            wl = User.get_wishlist(username_=username)
            wl.remove_course(course)
            resp = jsonify({'wishlist': wl.expand()})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp


class UserWishlistMinorCheck(Resource):
    def get(self):
        username = request.args.get('username')
        try:
            wl = User.get_wishlist(username_=username)
            courses = [c.code for c in wl.course]
            print(courses)
            check = Minor.check(codes_=courses)
            print(check)
            resp = jsonify({'minorCheck': check})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True)
        data = parser.parse_args()
        username = data['username']
        try:
            wl = User.get_wishlist(username_=username)
            courses = [c.code for c in wl.course]
            print(courses)
            check = Minor.check(codes_=courses)
            print(check)
            resp = jsonify({'minorCheck': check})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp


# ------------------------------------------------------------
# Comments


class UserComment(Resource):
    def get(self):
        course = request.args.get('course')

        try:
            course = Course.get(course)
            comments = course.get_comments()
            comments = [c for c in comments if isinstance(c, Comment)]
            resp = jsonify(
                {'comments': comments})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('username', required=True)
        parser.add_argument('course', required=True)
        parser.add_argument('text', required=True)
        parser.add_argument('email', required=True)
        data = parser.parse_args()
        email = data['email']
        username = data['username']
        course = data['course']
        text = data['text']
        # check if email ends with @mail.utoronto.ca
        if not email.endswith('@mail.utoronto.ca'):
            resp = jsonify({'error': 'invalid email'})
            resp.status_code = 400
            return resp
        try:
            in_course = Course.get(course)
            comment_id = str(
                hash(datetime.datetime.utcnow().timestamp()) +
                hash(username + course + text))
            comment = Comment(
                comment_id=comment_id,
                username=username,
                course=course,
                text=text,
                timestamp=datetime.datetime.now(),
                upvotes=0,
                downvotes=0)
            in_course.comments.append(comment)
            comment.save()
            in_course.save()
            resp = jsonify({"comment": comment})
            resp.status_code = 200
            return resp
        except Exception as e:
            print(e)
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp

    def put(self):
        comment_id = request.args.get('comment_id')

        parser = reqparse.RequestParser()
        parser.add_argument('increment', required=True)
        data = parser.parse_args()
        change = data['increment']

        try:
            comment = Comment.get(comment_id)
            upvp = comment.upvotes
            downvp = comment.downvotes
            if change > 0:
                upvp += change
            else:
                downvp += change

            comment.updateComment(upvp, downvp)
            updatedComment = Comment.get(comment_id)
            resp = jsonify(
                {'comment': updatedComment})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp


# ------------------------------------------------------------
# Course Packages

class CoursePackages(Resource):
    def get(self):
        package_id = request.args.get('package_id')
        try:
            package = Package.get(package_id)
            resp = jsonify({'package': package.expand()})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp

    def post(self):
        parser = reqparse.RequestParser()
        parser.add_argument('name', required=True)
        parser.add_argument('description', required=True)
        parser.add_argument('courses', required=True,
                            type=str, action='append')
        data = parser.parse_args()
        name = data['name']
        description = data['description']
        courses = data['courses']
        try:
            package = Package.create(
                name, description, courses)
            if package is None:
                resp = jsonify({'error': 'package already exists'})
                resp.status_code = 400
                return resp
            resp = jsonify({'package': package.expand()})
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp


class SearchPackages(Resource):
    def get(self):
        input = request.args.get('input')
        # input = ' '.join([nysiis(w) for w in input.split()])
        try:
            searchPackageName = list(Package.objects(name__icontains=input))
            searchPackageDescription = list(
                Package.objects(description__icontains=input))
            search = searchPackageName + searchPackageDescription
            packages = []
            # Get packages
            for package in search:
                packages.append(package.expand())
            resp = jsonify(packages)
            resp.status_code = 200
            return resp
        except Exception as e:
            resp = jsonify({'error': str(e)})
            resp.status_code = 400
            return resp
