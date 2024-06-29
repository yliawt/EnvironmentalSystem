#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <DHT.h>

#define DHTPIN D2          // DHT11 data pin
#define DHTTYPE DHT11      // DHT 11 sensor type
#define BUZZER_PIN D1      // Buzzer pin
#define MQ135_PIN A0       // MQ135 connected to the analog pin
DHT dht(DHTPIN, DHTTYPE);

#define WIFI_SSID "666"            // Your WiFi SSID
#define WIFI_PASSWORD "1a2a3a4a"   // Your WiFi password

void setup() {
    Serial.begin(115200); 
    WiFi.mode(WIFI_STA);           
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFi.status() != WL_CONNECTED) {
        Serial.print(".");
        delay(500);
    }
    Serial.println("Connected to WiFi");
    Serial.print("IP Address: ");
    Serial.println(WiFi.localIP());
    dht.begin();
}

void loop() {
    HTTPClient http;    
    WiFiClient client;
    float humidity = dht.readHumidity();
    float temperature = dht.readTemperature();
    int gasValue = analogRead(MQ135_PIN);

    String postData = "send_temperature=" + String(temperature) + "&send_humidity=" + String(humidity) + "&send_gas_Value=" + String(gasValue);
    http.begin(client, "http://liawyeeplantmonitoringsystem.000webhostapp.com/dbwrite.php");
    http.addHeader("Content-Type", "application/x-www-form-urlencoded");
    int httpCode = http.POST(postData);
    
    if (httpCode == 200) {
        String response = http.getString();
        Serial.println("Data uploaded successfully");
        Serial.println(response);
    } else {
        Serial.println("Failed to upload data");
    }

    http.end();
    delay(10000);
}
