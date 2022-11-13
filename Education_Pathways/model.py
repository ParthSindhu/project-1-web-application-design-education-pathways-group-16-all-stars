# This is the model

from config import app, db
import datetime


if db is None:
    print("DB is None")
    exit()


class Comment(db.Document):
    # Unique identifier
    comment_id = db.StringField(required=True, primary_key=True)
    username = db.StringField(required=True)
    course = db.StringField(required=True)
    text = db.StringField(required=True)
    timestamp = db.DateTimeField(required=True)
    upvotes = db.IntField(required=True)
    downvotes = db.IntField(required=True)

    @classmethod
    def get(cls, comment_id_):
        return cls.objects(comment_id=comment_id_).get()

    @classmethod
    def get_all(cls):
        return cls.objects.all()

    def updateComment(self, upvotes, downvotes):
        self.update(upvotes=upvotes)
        self.update(downvotes=downvotes)

    def expand(self):
        ret = {
            'comment_id': self.comment_id,
            'username': self.username,
            'course': self.course,
            'text': self.text,
            'timestamp': self.timestamp,
            'upvotes': self.upvotes,
            'downvotes': self.downvotes
        }
        return ret


class Course(db.Document):
    code = db.StringField(required=True, unique=True)
    name = db.StringField(required=True)
    description = db.StringField(required=True)
    syllabus = db.URLField()
    prereq = db.ListField()
    coreq = db.ListField()
    exclusion = db.ListField()
    keyword = db.StringField(required=True)
    graph = db.StringField(required=True)
    ratings_difficulty = db.ListField()
    ratings_engagement = db.ListField()
    ratings_courseload = db.ListField()
    tags = db.ListField()
    comments = db.ListField(db.ReferenceField(
        Comment),  reverse_delete_rule=db.CASCADE)
    meta = {
        'collection': 'courses'
    }

    def __str__(self):
        return self.code

    def to_json(self):
        return {
            "code": self.code,
            "name": self.name,
            "description": self.description,
            "syllabus": self.syllabus,
            "prereq": self.prereq,
            "coreq": self.coreq,
            "exclusion": self.exclusion,
            "keyword": self.keyword,
            "graph": self.graph,
            "comments": self.comments,
            "tags": self.tags
        }

    meta = {'indexes': [
        '$keyword'
    ]}

    @classmethod
    def get(cls, code_):
        return cls.objects(code=code_).get()

    @classmethod
    def get_requisite_graph(cls, code_):
        return cls.objects(code=code_).get().graph

    def get_comments(self):
        return self.comments


# Course Packages Frontend
class Package(db.Document):
    package_id = db.StringField(required=True, primary_key=True)
    name = db.StringField(required=True)
    description = db.StringField(required=True)
    courses = db.ListField(db.ReferenceField(Course))

    @classmethod
    def create(cls, name_, description_, courses_):
        usr = cls.objects(name=name_)
        if usr:
            return None
        else:
            # Create package_id
            package_id_ = name_.lower().replace(" ", "_")
            # Get courses
            courses = []
            for course in courses_:
                courses.append(Course.get(course))
            package = cls(name=name_, description=description_,
                          courses=courses, package_id=package_id_)
            package.save()
            return package

    meta = {'indexes': [
        'name',
        'description'
    ]}

    @classmethod
    def get(cls, package_id_):
        return cls.objects(package_id=package_id_).get()

    @classmethod
    def get_all(cls):
        return cls.objects.all()

    def add_course(self, course_):
        if course_ not in self.courses:
            self.update(add_to_set__course=course_)

    def remove_course(self, course_):
        if course_ in self.courses:
            self.courses.remove(course_)
            self.save()

    def expand(self):
        ret = {
            'name': self.name,
            'courses': self.courses,
            'description': self.description,
            'package_id': self.package_id
        }
        return ret


class Wishlist(db.Document):
    username = db.StringField(required=True, unique=True)
    course = db.ListField(db.ReferenceField(Course))
    comments = db.DictField()

    @classmethod
    def create(cls, username_):
        usr = cls.objects(username=username_)
        usr.update_one(set__course=[],
                       upsert=True)
        return True

    def add_course(self, course_):
        if course_ not in self.course:
            self.update(add_to_set__course=course_)

    def remove_course(self, course_):
        if course_ in self.course:
            self.course.remove(course_)
            self.save()

    def expand(self):
        ret = {
            'username': self.username,
            'course': self.course,
            'comments': self.comments
        }
        return ret


class User(db.Document):
    username = db.StringField(required=True, unique=True)
    password = db.StringField(required=True)

    @classmethod
    def create(cls, username_, password_):
        usr = cls.objects(username=username_)
        Wishlist.create(username_)
        usr.update_one(set__username=username_,
                       set__password=password_,
                       upsert=True)
        return True

    @classmethod
    def delete(cls, username_):
        usr = cls.objects(username=username_).get()
        if usr:
            usr.delete()
            wl = Wishlist.objects(username=username_).get()
            if wl:
                wl.delete()
            return True
        return False

    @classmethod
    def verify_password(cls, username_, password_):
        usr = cls.objects(username=username_).get()
        if usr and usr.password == password_:
            return True
        return False

    @classmethod
    def get_wishlist(cls, username_):
        return Wishlist.objects(username=username_).get()

    @classmethod
    def add_comment(cls, username_, code_, comment_):
        usr = cls.objects(username=username_).get()
        if usr:
            usr.comments[code_] = comment_
            usr.save()
            return True
        return False


class Minor(db.Document):
    name = db.StringField(required=True, unique=True)
    description = db.StringField()
    requisites = db.ListField(db.ListField(db.ListField()))
    #[ (['code', 'code'], 2), (['code', 'code'], 1), ]

    @classmethod
    def get(cls, name_):
        return cls.objects(name=name_).get()

    @classmethod
    def check(cls, codes_):
        ret = []

        for mn in cls.objects:
            print(f"checking {mn}")
            yes = True
            for req in mn.requisites:
                if len(set(req[0]).intersection(set(codes_))) < req[1]:
                    yes = False
                    break
            if yes:
                ret.append(mn)
        return ret
