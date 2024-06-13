#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <DHT.h>

// Update HOST URL here
#define HOST "liawenvironmentsystem.000webhostapp.com"

// Define WiFi credentials
#define WIFI_SSID "666"
#define WIFI_PASSWORD "1a2a3a4a"

// Define the pin where the data line is connected
#define DHTPIN D5     
#define DHTTYPE DHT11   // DHT 11

// Initialize the DHT sensor
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200); 
  Serial.println("Communication Started \n\n");  
  delay(1000);
  dht.begin();

  pinMode(LED_BUILTIN, OUTPUT); // initialize built-in LED on the board

  WiFi.mode(WIFI_STA);           
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD); // try to connect with WiFi
  Serial.print("Connecting to ");
  Serial.print(WIFI_SSID);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println();
  Serial.print("Connected to ");
  Serial.println(WIFI_SSID);
  Serial.print("IP Address is: ");
  Serial.println(WiFi.localIP()); // print local IP address

  delay(30);
}

void loop() {
  delay(2000);
  HTTPClient http;    // http object of class HTTPClient
  WiFiClient wclient; // wclient object of class WiFiClient   

  // Reading temperature and humidity values from the DHT sensor
  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
 
  // Convert float variables to string
  String sendhumidity = String(humidity);  
  String sendtemperature = String(temperature);   

  // Create POST data
  String postData = "sendtemperature=" + sendtemperature + "&sendhumidity=" + sendhumidity;

  // Check if any reads failed and exit early (to try again).
  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  http.begin(wclient, "http://liawenvironmentsystem.000webhostapp.com/dbwrite.php"); // Connect to host
  http.addHeader("Content-Type", "application/x-www-form-urlencoded"); // Specify content-type header
  
  int httpCode = http.POST(postData); // Send POST request and store server response code

  // Print the temperature and humidity to the serial monitor
  Serial.print("Humidity: ");
  Serial.print(sendhumidity);
  Serial.print(" %\t");
  Serial.print("Temperature: ");
  Serial.print(sendtemperature);
  Serial.println(" *C");

  // Print the HTTP response code
  Serial.print("HTTP Response code: ");
  Serial.println(httpCode);

  // if connection established then do this
  if (httpCode == 200) {
    Serial.println("Values uploaded successfully.");
    String webpage = http.getString(); // Get HTML webpage output
    Serial.println(webpage + "\n"); 
  } else { 
    Serial.println("Failed to upload values."); 
  }

  http.end(); // Close connection

  delay(3000); 
  digitalWrite(LED_BUILTIN, LOW);
  delay(3000);
  digitalWrite(LED_BUILTIN, HIGH);
}
