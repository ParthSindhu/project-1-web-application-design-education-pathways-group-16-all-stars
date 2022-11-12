import pymongo
import nltk
from nltk.corpus import stopwords
nltk.download('stopwords')

def get_database():
 
    CONNECTION_STRING = "mongodb+srv://Cansin:cv190499@a-star.roe6s.mongodb.net/A-Star?retryWrites=true&w=majority"
    myclient = pymongo.MongoClient(CONNECTION_STRING)
    db = myclient["A-Star"]
    course_table = db["course"]

    cursor = course_table.find({})
    for document in cursor:
        course_name = document["name"]
        tags = course_name.split()
        filtered_tags = [word.lower() for word in tags if word not in stopwords.words('english')]
        print(tags)
        print(filtered_tags)
        breakpoint()


    #print(course_table.find_one())
  
# This is added so that many files can reuse the function get_database()
if __name__ == "__main__":   
  
   # Get the database
   dbname = get_database()