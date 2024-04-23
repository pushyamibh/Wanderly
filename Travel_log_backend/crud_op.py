from flask import Flask, request
from flask_pymongo import PyMongo
from bson import ObjectId ,json_util
from flask_cors import CORS
from bson import ObjectId
app = Flask(__name__)
CORS(app)
app.config['MONGO_URI'] = 'mongodb://localhost:27017/travel_bucket_list'
mongo = PyMongo(app)

# Users CRUD operations

@app.route('/users', methods=['GET'])
def get_users():
    users = mongo.db.users.find()
    #print(list(users))
    return json_util.dumps(list(users))

@app.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    user = mongo.db.users.find_one({'user_id': user_id})
    if user:
        return json_util.dumps(list(user)), 200
    else:
        return json_util.dumps({'message': 'User not found'}), 404

@app.route('/users/add', methods=['POST'])
def add_user():
    data = request.json
    user_id = mongo.db.users.insert_one(data).inserted_id
    return json_util.dumps({'message': 'User added', 'user_id': user_id}), 201

@app.route('/users/<username>', methods=['PUT'])
def update_user(username):
    data = request.json
    result = mongo.db.users.update_one({'username': username}, {'$set': data})
    if result.modified_count:
        return json_util.dumps({'message': 'User updated'}), 200
    else:
        return json_util.dumps({'message': 'User not found'}), 404

@app.route('/users/<username>', methods=['DELETE'])
def delete_user(username):
    result = mongo.db.users.delete_one({'username': username})
    if result.deleted_count:
        return json_util.dumps({'message': 'User deleted'}), 200
    else:
        return json_util.dumps({'message': 'User not found'}), 404
    
############################################################################################
    
@app.route('/destinations', methods=['GET'])
def get_destinations():
    destinations = list(mongo.db.destinations.find())
    return json_util.dumps({'destinations': destinations}), 200

@app.route('/destinations/<destinationname>', methods=['GET'])
def get_destination(destinationname):
    destination = mongo.db.destinations.find_one({'name': destinationname})
    if destination:
        return json_util.dumps({'destination': destination}), 200
    else:
        return json_util.dumps({'message': 'Destination not found'}), 404

@app.route('/destinations', methods=['POST'])
def add_destination():
    data = request.json
    destination_id = mongo.db.destinations.insert_one(data).inserted_id
    return json_util.dumps({'message': 'Destination added', 'dest_id': destination_id}), 201

@app.route('/destinations/<destinationname>', methods=['PUT'])
def update_destination(destinationname):
    data = request.json
    result = mongo.db.destinations.update_one({'name': destinationname}, {'$set': data})
    if result.modified_count:
        return json_util.dumps({'message': 'Destination updated'}), 200
    else:
        return json_util.dumps({'message': 'Destination not found'}), 404

@app.route('/destinations/<destinationname>', methods=['DELETE'])
def delete_destination(destinationname):
    result = mongo.db.destinations.delete_one({'name': destinationname})
    if result.deleted_count:
        return json_util.dumps({'message': 'Destination deleted'}), 200
    else:
        return json_util.dumps({'message': 'Destination not found'}), 404
##########################################################################################
# Bucket List CRUD operations

@app.route('/bucket_list', methods=['GET'])
def get_bucket_lists():
    bucket_lists = list(mongo.db.bucket_list.find())
    return json_util.dumps({'bucket_list': bucket_lists}), 200

@app.route('/bucket_list/<username>', methods=['GET'])
def get_user_bucket_list(username):
    bucket_list = list(mongo.db.bucket_list.find({'username': username}))
    return json_util.dumps({'bucket_list': bucket_list}), 200

@app.route('/bucket_list', methods=['POST'])
def add_to_bucket_list():
    data = request.json
    #latest_entry = mongo.db.users.find_one({}, sort=[('_id', -1)])
    #data["username"]=latest_entry["username"]
    try:
        bucket_id = mongo.db.bucket_list.insert_one(data).inserted_id
        return json_util.dumps({'message': 'Item added to bucket list', 'bucket_id': str(bucket_id)}), 201
    except:
        return json_util.dumps({'message': 'No Item'}), 404
    

@app.route('/bucket_list/<destinationname>', methods=['DELETE'])
def remove_from_bucket_list(destinationname):
    result = mongo.db.bucket_list.delete_one({'destname': destinationname})
    if result.deleted_count:
        return json_util.dumps({'message': 'Item removed from bucket list'}), 200
    else:
        return json_util.dumps({'message': 'Item not found in bucket list'}), 404

################################################################################################

# Vlogs CRUD operations

@app.route('/vlogs', methods=['GET'])
def get_vlogs():
    vlogs = list(mongo.db.vlogs.find())
    return json_util.dumps({'vlogs': vlogs}), 200

@app.route('/vlogs/<destname>', methods=['GET'])
def get_vlog(destname):
    vlog = mongo.db.vlogs.find({'destname': destname})
    if vlog:
        return json_util.dumps({'vlog': vlog}), 200
    else:
        return json_util.dumps({'message': 'Vlog not found'}), 404

@app.route('/vlogs', methods=['POST'])
def add_vlog():
    data = request.json
    data["vlog_id"]=ObjectId()
    vlog_id = mongo.db.vlogs.insert_one(data).inserted_id
    return json_util.dumps({'message': 'Vlog added', 'vlog_id': str(vlog_id)}), 201

@app.route('/vlogs/<title>', methods=['PUT'])
def update_vlog(title):
    data = request.json
    result = mongo.db.vlogs.update_one({'title': title}, {'$set': data})
    if result.modified_count:
        return json_util.dumps({'message': 'Vlog updated'}), 200
    else:
        return json_util.dumps({'message': 'Vlog not found'}), 404

@app.route('/vlogs/<title>', methods=['DELETE'])
def delete_vlog(title):
    result = mongo.db.vlogs.delete_one({'title': title})
    if result.deleted_count:
        return json_util.dumps({'message': 'Vlog deleted'}), 200
    else:
        return json_util.dumps({'message': 'Vlog not found'}), 404

######################################################################################

@app.route('/tags', methods=['GET'])
def get_tags():
    #tags = list(mongo.db.tags.find())
    unique_tags = mongo.db.tags.distinct("tag")
    return json_util.dumps({'tag': unique_tags}), 200

@app.route('/tags/<tag>', methods=['GET'])
def get_tag(tag):
    tag = mongo.db.tags.find_one({'tag': tag})
    if tag:
        return json_util.dumps({'tag': tag}), 200
    else:
        return json_util.dumps({'message': 'Tag not found'}), 404

@app.route('/tags', methods=['POST'])
def add_tag():
    data = request.json
    id_data=mongo.db.vlogs.find_one({}, sort=[('_id', -1)])
    print(id_data)
    data["vlog_id"]=id_data["vlog_id"]
    tag_id = mongo.db.tags.insert_one(data).inserted_id
    return json_util.dumps({'message': 'Tag added', 'tag_id': str(tag_id)}), 201

# @app.route('/tags/<tag_id>', methods=['PUT'])
# def update_tag(tag_id):
#     data = request.json
#     result = mongo.db.tags.update_one({'_id': ObjectId(tag_id)}, {'$set': data})
#     if result.modified_count:
#         return json_util.dumps({'message': 'Tag updated'}), 200
#     else:
#         return json_util.dumps({'message': 'Tag not found'}), 404

# @app.route('/tags/<tag>', methods=['DELETE'])
# def delete_tag(tag_id):
#     result = mongo.db.tags.delete_one({'_id': ObjectId(tag_id)})
#     if result.deleted_count:
#         return json_util.dumps({'message': 'Tag deleted'}), 200
#     else:
#         return json_util.dumps({'message': 'Tag not found'}), 404
#############################################################################
@app.route('/add-bucketlist/search', methods=['POST'])
def search():
    data=request.json
    print(data)
    tags = data['selectedTag']
    min_destination_budget = data['minDestBudget']  # Minimum destination budget
    max_destination_budget = data['maxDestBudget']  # Maximum destination budget
    min_vlog_budget = data['minVlogBudget'] # Minimum vlog budget
    max_vlog_budget = data['maxVlogBudget']  # Maximum vlog budget

    # Query tags collection to find vlog IDs matching the filtered tags
    
    tagged_vlogs = list(mongo.db.tags.find({'tag': {'$in': [tags]}}))
    
    # Extract vlog IDs from tagged_vlogs
    vlog_ids = [tagged_vlog['vlog_id'] for tagged_vlog in tagged_vlogs]

    # Define conditions for filtering destinations and vlogs
    destination_conditions = []
    vlog_conditions = {'vlog_id': {'$in': vlog_ids}}

    if min_destination_budget:
        destination_conditions.append({'estimated_budget': {'$gte': float(min_destination_budget)}})
    if max_destination_budget:
        destination_conditions.append({'estimated_budget': {'$lte': float(max_destination_budget)}})

    if min_vlog_budget:
        vlog_conditions['budget'] = {'$gte': float(min_vlog_budget)}
    if max_vlog_budget:
        vlog_conditions['budget'] = {'$lte': float(max_vlog_budget)}

    # Construct the final query for destinations
    destination_query = {'$or': destination_conditions} if destination_conditions else {}

    # Execute the queries
    destinations = list(mongo.db.destinations.find(destination_query))
    vlogs = list(mongo.db.vlogs.find(vlog_conditions))

    return json_util.dumps({'destinations': destinations, 'vlogs': vlogs}), 200
#####################################################################################################
@app.route("/selected-vlogs", methods=["POST"])
def get_selected_vlogs():
    try:
        data = request.json
        destname = data.get("destname")
        
        # Fetch vlogs related to the selected destination name
        selected_vlogs = mongo.db.vlogs.find({"destname": destname})
        
        # Join vlogs and reviews collections to get ratings for each vlog
        # Assuming there's a field called "vlog_id" in the reviews collection referencing the vlog
        # This code is just a representation, adjust it according to your actual database schema
        vlogs_with_ratings = []
        for vlog in selected_vlogs:
            vlog_id = vlog["vlog_id"]
            reviews = mongo.db.reviews.find({"vlog_id": vlog_id})
            ratings = [review["rating"] for review in reviews]
            avg_rating = sum(ratings) / len(ratings) if ratings else 0
            vlog["avg_rating"] = avg_rating
            vlogs_with_ratings.append(vlog)
        
        # Sort vlogs by average rating
        sorted_vlogs = sorted(vlogs_with_ratings, key=lambda x: x["avg_rating"], reverse=True)
        
        return json_util.dumps({"vlogs": sorted_vlogs}), 200
    except Exception as e:
        return json_util.dumps({"error": str(e)}), 500
    
##########################################################################################################

@app.route("/add-review", methods=["POST"])
def add_review():
    try:
        data = request.json
        # vlog_id = data.get("vlog")
        username = data.get("username")
        destname=data.get("destname")
        rating = data.get("rating")
        comment = data.get("comment")
        
        # Assuming you have a vlogs collection with "_id" as vlogId
        vlog = mongo.db.vlogs.find_one({"username": username,"destname": destname})
        if not vlog:
            return jsonify({"error": "Vlog not found"}), 404
        
        # Add review to the reviews collection
        review_id = mongo.db.reviews.insert_one({
            "vlog_id": vlog["vlog_id"],
            "username": username,
            "rating": rating,
            "comment": comment
        }).inserted_id
        
        return json_util.dumps({"success": True, "review_id": str(review_id)}), 201
    except Exception as e:
        return json_util.dumps({"error": str(e)}), 500


########################################################################################################
@app.route('/getVlogs', methods=['POST'])
def getVlogs():
    data = request.json
    username = data['username']
    destination_name = data['destinationName']

    # Find vlogs for the specific user and destination name
    vlogs = list(mongo.db.vlogs.find({'username': username, 'destinationName': destination_name}))

    if vlogs:
        # Sort the vlogs by review ratings
        vlogs.sort(key=lambda x: x['reviews'][0]['rating'], reverse=True)

        return json_util.dumps({'vlogs': vlogs}), 200
    else:
        return json_util.dumps({'message': 'No vlogs found for the given user and destination'}), 404


if __name__ == '__main__':
    app.run(debug=True,port=4343)
