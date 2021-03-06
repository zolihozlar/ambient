import serial
import MySQLdb

conn = MySQLdb.connect(host= "localhost", user="", passwd="", db="ambient")
x = conn.cursor()

ser = serial.Serial('/dev/cu.usbmodem641', 9600)
while 1 :
    read_chars = ser.readline()

    # temperature
    temperatureBeginningIndex = read_chars.index("t");
    temperatureEndIndex = read_chars.index("|", temperatureBeginningIndex);
    temperature = read_chars[(temperatureBeginningIndex + 1):temperatureEndIndex]

    # humidity
    humidityBeginningIndex = read_chars.index("h");
    humidityEndIndex = read_chars.index("|", humidityBeginningIndex);
    humidity = read_chars[(humidityBeginningIndex + 1):humidityEndIndex]

    # photo
    photoBeginningIndex = read_chars.index("p");
    photoEndIndex = read_chars.index("|", photoBeginningIndex);
    photo = read_chars[(photoBeginningIndex + 1):photoEndIndex]

    # soil
    soilBeginningIndex = read_chars.index("s");
    soilEndIndex = read_chars.index("|", soilBeginningIndex);
    soil = read_chars[(soilBeginningIndex + 1):soilEndIndex]

    try:
       x.execute("""INSERT INTO measurements (Temperature, Humidity, Light, Moisture) VALUES (%s,%s,%s,%s)""",(temperature,humidity,photo,soil))
       conn.commit()
    except:
       conn.rollback()
