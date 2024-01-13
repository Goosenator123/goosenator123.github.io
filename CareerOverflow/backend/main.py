from fastapi import FastAPI, File, UploadFile
from typing import Annotated
from fastapi.responses import FileResponse
from pydantic import BaseModel
from dbHandler import *

class User(BaseModel):
    _id: str | None = None
    username: str | None = None
    email: str | None = None
    password: str | None = None
    tag: list | None = None
    bio: str | None = None
    pfp: str | None = None
    city: str | None = None
    gender: str | None = None
    birthday: str | None = None

class Job(BaseModel):
    _id: str | None = None
    name: str | None = None
    longName: str | None = None
    contact: str | None = None
    description: str | None = None
    tag: list | None = None
    pfp: str | None = None
    city: str | None = None
    time: str | None = None
    salary: str | None = None
    company: str | None = None


class Event(BaseModel):
    _id: str | None = None
    name: str | None = None
    longName: str | None = None
    contact: str | None = None
    description: str | None = None
    tag: list | None = None
    pfp: str | None = None
    city: str | None = None
    time: str | None = None

class AuthInfo(BaseModel):
    username: str
    password: str

app = FastAPI()
@app.get("/")
async def root():
    return {"message": "Hello World"}

# USERS
@app.get("/user/{id}")
async def getUserAPI(id):
    return getUser(id)

@app.post("/user/update/")
async def updateUserAPI(user: User):
    return updateUser(user.model_dump())

@app.post("/user/new/")
async def newUserAPI(user: User):
    return newUser(user.model_dump())

@app.get("/user/list/")
async def listUserAPI():
    return listUser()

@app.post("/user/authenticate/")
async def authenticateAPI(authInfo: AuthInfo):
    return authenticate(username = authInfo.username, psw = authInfo.password)

# JOBS
@app.get("/job/{id}")
async def getJobAPI(id):
    return getJob(id)

@app.post("/job/update/")
async def updateJobAPI(job: Job):
    return updateJob(job.model_dump())

@app.post("/job/new/")
async def newJobAPI(job: Job):
    return newJob(job.model_dump())

@app.get("/job/list/")
async def listJobAPI():
    return listJob()

# EVENTS
@app.get("/event/{id}")
async def getEventAPI(id):
    return getEvent(id)

@app.post("/event/update/")
async def updateEventAPI(event: Event):
    return updateEvent(event.model_dump())

@app.post("/event/new/")
async def newEventAPI(event: Event):
    return newEvent(event.model_dump())

@app.get("/event/list/")
async def listEventAPI():
    return listEvent()

# FILES

@app.post("/ai/improve/{id}")
async def improveAPI(id):
    ocrCV = ocrPDF(id)
@app.post("/upload/cv/")
async def uploadCV(file: UploadFile):
    try:
        fileID = await saveFile(file)
    except Exception as e:
        print(e)
        return {"message": "Unable to upload"}, 400
    return {"message": f"Uploaded successfully {file.filename}", "fileID":str(fileID)}

@app.get("/asset/{id}", )
async def getAssetAPI(id):
    dict = await getAsset(id)
    if "path" in dict:
        return FileResponse(dict["path"], media_type='application/octet-stream', filename=dict["filename"])
    else:
        return dict["filename"]
