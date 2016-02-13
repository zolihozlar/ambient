import serial
from pymongo import MongoClient

client = MongoClient()
db = client.arduino

ser = serial.Serial('/dev/cu.usbmodem641', 9600)
while 1 :
    read_chars = ser.readline()
    read_chars = read_chars[:-2]
    result = db.test.insert_one({"random": read_chars});
