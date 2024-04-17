import pymongo
from bson import ObjectId 
mongo_db = pymongo.MongoClient("mongodb://localhost:27017/")

my_db = mongo_db['travel_bucket_list']
collection = my_db.list_collection_names()
user_col=my_db["users"]
dest_col=my_db["destinations"]
bucket_col=my_db["bucket_list"]
vlog_col=my_db["vlogs"]
reviews_col=my_db["reviews"]
tags_col= my_db["tags"]

# user_col.create_index([('username', 1)], unique=True)
# dest_col.create_index([('name', 1)], unique=True)
# user_id=ObjectId()
# dest_id=ObjectId()
user_col.insert_one({"username":"pp","email":"pb@gmail.com","password":"whatev"})

dest_col.insert_one({"name":"the sphere","country":"nyc","description":"3d experience","image_url":"something.com","estimated_budget":1345})
user_document = user_col.find_one({})
dest_doc= dest_col.find_one({})
bucket_col.insert_one({"username":user_document["username"],"destname": dest_doc["name"] })
vlog_id=ObjectId()
vlog_col.insert_one({"vlog_id":vlog_id,"username": user_document["username"],"destname": dest_doc["name"],"title": "my travel","description":"jhif","image_url":"some_image.com","budget":2345})

reviews_col.insert_one({"vlog_id": vlog_id,"username": user_document["username"],"rating": 1,"comment":"this is good"})

tags_col.insert_one({"vlog_id": vlog_id,"tag": ["textual tag related to topic"]})

