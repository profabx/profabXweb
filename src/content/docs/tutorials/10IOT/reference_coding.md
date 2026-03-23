---
title: "Reference Coding"
sidebar:
  attrs: { id: tutorial }
---

## Reference coding 

```cpp
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

#include <aliyun_mqtt.h>
 

#define SENSOR_PIN 13    //pin define
#define LED D4
#define LED2 D5
#define PRODUCT_KEY     "*****"//exchange  PRODUCT_KEY
#define DEVICE_NAME     "*****"//exchange  DEVICE_NAME
#define DEVICE_SECRET   "e1dae1bb344c49a704387dc461ecf505"//exchange DEVICE_SECRET

#define DEV_VERSION      "S-TH-WIFI-v1.0-20190220"

#define WIFI_SSID       "*****"//exchange WIFI
#define WIFI_PASSWD     "******"//exchange WIFI password


 
#define ALINK_BODY_FORMAT         "{\"id\":\"123\",\"version\":\"1.0\",\"method\":\"%s\",\"params\":%s}"
#define ALINK_TOPIC_PROP_POST     "/sys/" PRODUCT_KEY "/" DEVICE_NAME "/thing/event/property/post"
#define ALINK_TOPIC_PROP_POSTRSP  "/sys/" PRODUCT_KEY "/" DEVICE_NAME "/thing/event/property/post_reply"
#define ALINK_TOPIC_PROP_SET      "/sys/" PRODUCT_KEY "/" DEVICE_NAME "/thing/service/property/set"
#define ALINK_METHOD_PROP_POST    "thing.event.property.post"
#define ALINK_TOPIC_DEV_INFO      "/ota/device/inform/" PRODUCT_KEY "/" DEVICE_NAME ""    
#define ALINK_VERSION_FROMA      "{\"id\": 123,\"params\": {\"version\": \"%s\"}}"
unsigned long lastMs = 0;
int val=0;

WiFiClient   espClient;
PubSubClient mqttClient(espClient);
 
void init_wifi(const char *ssid, const char *password)
{
    WiFi.mode(WIFI_STA);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.println("WiFi does not connect, try again ...");
        delay(500);
    }
 
    Serial.println("Wifi is connected.");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}
 
void mqtt_callback(char *topic, byte *payload, unsigned int length)
{
    Serial.print("Message arrived [");
    Serial.print(topic);
    Serial.print("] ");
    payload[length] = '\0';
    Serial.println((char *)payload);
  
    Serial.println("");
    Serial.println((char *)payload);
    Serial.println("");
  
    if (strstr(topic, ALINK_TOPIC_PROP_SET))
    {
        StaticJsonBuffer<100> jsonBuffer;
        JsonObject &root = jsonBuffer.parseObject(payload);
        int params_LightSwitch = root["params"]["LightSwitch"];
        if(params_LightSwitch==1)
        { Serial.println("Led on");
          digitalWrite(LED,HIGH);}
        else
         { Serial.println("Led off");
          digitalWrite(LED,LOW);}
        

        
        if (!root.success())
        {
            Serial.println("parseObject() failed");
            return;
        }
    }
}
void mqtt_version_post()
{
    char param[512];
    char jsonBuf[1024];
 
    //sprintf(param, "{\"MotionAlarmState\":%d}", digitalRead(13));
    sprintf(param, "{\"id\": 123,\"params\": {\"version\": \"%s\"}}", DEV_VERSION);
   // sprintf(jsonBuf, ALINK_BODY_FORMAT, ALINK_METHOD_PROP_POST, param);
    Serial.println(param);
    mqttClient.publish(ALINK_TOPIC_DEV_INFO, param);
}
void mqtt_check_connect()
{
    while (!mqttClient.connected())//mqttδ����
    {
        while (connect_aliyun_mqtt(mqttClient, PRODUCT_KEY, DEVICE_NAME, DEVICE_SECRET))
        {
            Serial.println("MQTT connect succeed!");
            //client.subscribe(ALINK_TOPIC_PROP_POSTRSP);
            mqttClient.subscribe(ALINK_TOPIC_PROP_SET);
            
            Serial.println("subscribe done");
            mqtt_version_post();
        }
    }
    
}
 
void mqtt_interval_post()
{
    char param[512];
    char jsonBuf[1024];
 
    //sprintf(param, "{\"MotionAlarmState\":%d}", digitalRead(13));
    sprintf(param, "{\"LightSwitch\":%d,\"range\":%d}",!digitalRead(LED),val);
    sprintf(jsonBuf, ALINK_BODY_FORMAT, ALINK_METHOD_PROP_POST, param);
    Serial.println(jsonBuf);
    mqttClient.publish(ALINK_TOPIC_PROP_POST, jsonBuf);
}
 
 
void setup()
{
 
    pinMode(SENSOR_PIN, INPUT);
    pinMode(LED, OUTPUT);
    pinMode(LED2, OUTPUT);
    /* initialize serial for debugging */
    Serial.begin(115200);
 
    Serial.println("Demo Start");
 
    init_wifi(WIFI_SSID, WIFI_PASSWD);
 
    mqttClient.setCallback(mqtt_callback);
}
 
// the loop function runs over and over again forever
void loop()
{
    val= analogRead(A0);
    if (val>500)
    {digitalWrite(LED2,HIGH);}
    else
    {digitalWrite(LED2,LOW);}
  
    if (millis() - lastMs >= 5000)
    {
        lastMs = millis();
        mqtt_check_connect();
        /* Post */        
        mqtt_interval_post();
    }
 
    mqttClient.loop();
 
    unsigned int WAIT_MS = 2000;
    if (digitalRead(SENSOR_PIN) == HIGH)
    {
        Serial.println("Motion detected!");
    }
    else
    {
        Serial.println("Motion absent!");
    }
    delay(WAIT_MS); // ms
    Serial.println(millis() / WAIT_MS);
}


```