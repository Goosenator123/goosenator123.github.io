import bcrypt
import dotenv

def hash(psw):
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(psw.encode('utf-8'), salt)
    return hashed

def check(psw, hashed):
    return bcrypt.checkpw(psw.encode('utf-8'), hashed)

dict = {
    "test": None,
    "test2": None,
    "test3": "hello",
    "uwu": "ijebdkejibd"
}

updateDict = {}

for key, value in dict.items():
    if value is not None:
        updateDict.update({key: value})

print(updateDict)
print(dotenv.load_dotenv())

psw = "123"

pswinput = input("Enter your password: ")

encrypted = hash(pswinput)
newpsw = input("Enter your password: ")

print(check(newpsw, encrypted))