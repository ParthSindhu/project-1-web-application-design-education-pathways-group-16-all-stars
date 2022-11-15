"""
Description: The purpose of this script is to assign tags, based on course names, to each course and save to the database.
Author: Sepehr Hosseini
"""

import pymongo
import nltk
from nltk.corpus import stopwords

nltk.download('stopwords')


# This function will generate course tags for each course to be used by course recommendations
def generate_course_tags():
 
    CONNECTION_STRING = "mongodb+srv://allstars:allstars@cluster0.vh9xizq.mongodb.net/A-Star"
    myclient = pymongo.MongoClient(CONNECTION_STRING)
    db = myclient["A-Star"]
    course_table = db["course"]
    cursor = course_table.find({})
    excluded_words = ["introduction", "engineering"]

    # Iterate through every document in the courses table
    for document in cursor:

        course_name = document["name"]
        # Create tags by using individual terms from the course name
        tags = course_name.split()
        # Filter the tags by removing stop words and converting to lowercase
        filtered_tags = [word.lower() for word in tags if word.lower() not in stopwords.words('english') and word.lower() not in excluded_words]
        
        # Add the filtered tags to each course in the database
        doc = course_table.find_one_and_update(
            {"_id" : document["_id"]},
            {"$set":
                {"tags": filtered_tags}
            },upsert=True
        )

  
if __name__ == "__main__":   
    
    generate_course_tags()