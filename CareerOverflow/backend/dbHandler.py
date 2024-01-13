import base64
import hashlib
import time
from openai import OpenAI
from pymongo import MongoClient
import gridfs
import uuid
import bcrypt
from dotenv import dotenv_values
import ocrmypdf

# Load environment variables
env = dotenv_values(".env")
mongoDBUrl = env["USERDBURL"]
gridFSUrl = env["GRIDFSDBURL"]
aiClient = OpenAI(api_key="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")

# Connect to MongoDB and GridFS
userDB = MongoClient(mongoDBUrl)['userDB']
gridFSDB = MongoClient(gridFSUrl)["uploadDB"]
fs = gridfs.GridFS(gridFSDB)

# USERS
def newUser(dict):
    userCollection = userDB["user"]
    user = {
        "_id": str(uuid.uuid4()),
        "username": dict.get("username"),
        "email": dict.get("email"),
        "password": hashPsw(dict.get("password")),
        "tag": dict.get("tag"),
        "bio": dict.get("bio"),
        "pfp": dict.get("pfp"),
        "city": dict.get("city"),
        "gender": dict.get("gender"),
        "birthday": dict.get("birthday"),
    }
    userCollection.insert_one(user)
    del user["password"]
    return user

def getUser(id):
    userCollection = userDB["user"]
    return userCollection.find_one({"_id": id})

def getDB():
    CONNECTION_STRING = mongoDBUrl
    client = MongoClient(CONNECTION_STRING)
    return client['userDB']

def getGridFSDB():
    CONNECTION_STRING = gridFSUrl
    gridFSDB = MongoClient(CONNECTION_STRING)["uploadDB"]
    return gridFSDB

def listUser():
    userList = []
    userCollection = userDB["user"]
    cursor = userCollection.find()
    for i in cursor:
        userList.append(i)
    return userList

def updateUser(dict):
    userCollection = userDB["user"]
    updateDict = {}

    for key, value in dict.items():
        if value is not None:
            updateDict.update({key: value})

    if updateDict:
        userCollection.update_one(filter={"_id": dict["_id"]}, update={"$set": updateDict})
        return True
    else:
        return None

def authenticate(username, psw):
    userCollection = userDB["user"]
    id = idFromUser(username)
    document = userCollection.find_one({"_id": id})

    if document:
        if verifyPsw(hashed=document["password"], psw=psw):
            return {"sessionID": str(uuid.uuid4()), "userID":str(userCollection.find_one({"_id": id}))}
        else:
            return "Wrong password"
    else:
        return "Document does not exist/"

def idFromUser(username):
    userCollection = userDB["user"]
    document = userCollection.find_one({"username": username})
    if document:
        return document["_id"]
    else:
        return None

# JOBS
def newJob(dict):
    jobCollection = userDB["job"]
    job = {
        "_id": str(uuid.uuid4()),
        "name": dict.get("name"),
        "longName": dict.get("longName"),
        "contact": dict.get("contact"),
        "description": dict.get("description"),
        "tag": dict.get("tag"),
        "pfp": dict.get("pfp"),
        "city": dict.get("city"),
        "time": str(time.time()),
        "salary": dict.get("salary"),
        "company": dict.get("company"),
    }
    jobCollection.insert_one(job)
    return job

def getJob(id):
    jobCollection = userDB["job"]
    return jobCollection.find_one({"_id": id})

def listJob():
    jobList = []
    jobCollection = userDB["job"]
    cursor = jobCollection.find()
    for i in cursor:
        jobList.append(i)
    return jobList

def updateJob(dict):
    jobCollection = userDB["job"]
    updateDict = {}

    for key, value in dict.items():
        if value is not None:
            updateDict.update({key: value})

    if updateDict:
        jobCollection.update_one(filter={"_id": dict["_id"]}, update={"$set": updateDict})
        return True
    else:
        return None

def idFromJob(name):
    userCollection = userDB["job"]
    document = userCollection.find_one({"name": name})
    if document:
        return document["_id"]
    else:
        return None

# EVENTS
def newEvent(dict):
    eventCollection = userDB["event"]
    event = {
        "_id": str(uuid.uuid4()),
        "name": dict.get("name"),
        "longName": dict.get("longName"),
        "contact": dict.get("contact"),
        "description": hashPsw(dict.get("description")),
        "tag": dict.get("tag"),
        "pfp": dict.get("pfp"),
        "city": dict.get("city"),
        "time": time.time()
    }
    eventCollection.insert_one(event)
    return event

def getEvent(id):
    eventCollection = userDB["event"]
    return eventCollection.find_one({"_id": id})

def listEvent():
    eventList = []
    eventCollection = userDB["event"]
    cursor = eventCollection.find()
    for i in cursor:
        eventList.append(i)
    return eventList

def updateEvent(dict):
    eventCollection = userDB["event"]
    updateDict = {}

    for key, value in dict.items():
        if value is not None:
            updateDict.update({key: value})

    if updateDict:
        eventCollection.update_one(filter={"_id": dict["_id"]}, update={"$set": updateDict})
        return True
    else:
        return None

def idFromEvent(name):
    userCollection = userDB["event"]
    document = userCollection.find_one({"name": name})
    if document:
        return document["_id"]
    else:
        return None

async def saveFile(file): # add redundant uploading check 
    metadataCollection = gridFSDB["metadata"]
    content = await file.read()
    encoded = base64.b64encode(content)
    fileHash = md5Hash(content)
    returnID = str(uuid.uuid4())
    id = fs.put(encoded, filename=file.filename)
    metadata = {
        "filename": file.filename,
        "hash": fileHash,
        "file_id": id,
        "uuid": returnID
    }
    metadataCollection.insert_one(metadata)
    return returnID

async def getAsset(id):
    metadataCollection = gridFSDB["metadata"]
    objectid = metadataCollection.find_one({"uuid": id})
    if objectid:
        object = metadataCollection.find_one({"uuid": id})["file_id"]
        print(type(object))
        asset = fs.find_one({'_id': object}).read()
        decodedAsset = base64.b64decode(asset)
        path = f"uploads/{metadataCollection.find_one({'uuid': id})['filename']}"
        f = open(path, "wb")
        f.write(decodedAsset)
        return {"path": path, "filename":str({metadataCollection.find_one({'uuid': id})['filename']})}
    else:
        return {"message": "No file"}


def aiRecommandFeedback(cvID):
    pdf = ocrPDF(cvID)
    completion = aiClient.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": "You are a resume editor to give the best feedback on how the job hunter can improve their CV in order to make their chance of getting a job at a big company better"},
            {"role": "user", "content": f"Here's my resume: {pdf}"}
        ]
    )
    return completion.choices[0].message

def aiRecommendJob(cvID):
    jobs = listJob()
    pdf = ocrPDF(cvID)
    completion = aiClient.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system",
             "content": "You are a person whose job is to help a job hunter find their find the best job that would fit them, your responses have to be in a json compliant dictionary with double quotes for strings, the answers should be like {'choice1:'uuid', 'choice2:'uuid', 'choice3':'uuid', 'msg': 'reasons explaining why you chose those'}"},
            {"role": "user", "content": f"Here's my resume: {pdf} and here's all the job listings {jobs}"}
        ]
    )
    return completion.choices[0].message
# helpers

def ocrPDF(id):
    asset = getAsset(id)
    return ocrmypdf.ocr(input_file=asset["path"])
def hashPsw(psw):
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(psw.encode('utf-8'), salt)
    return hashed

def verifyPsw(hashed, psw):
    return bcrypt.checkpw(psw.encode('utf-8'), hashed)

def md5Hash(content):
    md5 = hashlib.md5()
    md5.update(content)
    return md5.hexdigest()

