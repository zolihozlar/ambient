#include "DHT11/DHT11.h"
DHT11 dht11(A0);
int photodiode = A1;
int soil = A2;

void setup(){
  pinMode(photodiode, INPUT);
  pinMode(soil, INPUT);
  Serial.begin(9600);
}

void loop()
{
  int err;
  float t, h;
  int p = analogRead(photodiode);
  int s = analogRead(soil);
  if((err=dht11.read(h, t))==0)
  {
    Serial.print("t");
    Serial.print(t);
    Serial.print("|");
    Serial.print("h");
    Serial.print(h);
    Serial.print("|");
    Serial.print("p");
    Serial.print(p);
    Serial.print("|");
    Serial.print("s");
    Serial.print(s);
    Serial.print("|");
    Serial.println();
  }
  else
  {
    Serial.println();
    Serial.print("Error No :");
    Serial.print(err);
    Serial.println();
  }
//  delay(DHT11_RETRY_DELAY);
delay(10000);
}
