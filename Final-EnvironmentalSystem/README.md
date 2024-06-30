## 02 Final

[Web Interface](https://liawyeeplantmonitoringsystem.000webhostapp.com/index.html)

This project is an Environmental Sensor System that monitors temperature, humidity, and gas levels using an ESP8266 microcontroller, a DHT11 sensor, and an MQ135 gas sensor. The system displays the data on a web dashboard and activates a buzzer when certain thresholds are exceeded.

### Project Components
- **ESP8266:** Microcontroller used to read sensor data and send it to the server.
- **DHT11:** Sensor used to measure temperature and humidity.
- **MQ135:** Gas sensor used to measure air quality.
- **Buzzer:** Activates when the temperature exceeds 32°C or gas levels exceed 700 ppm.
- **Web Dashboard:** Displays the sensor data and insights.

### Setup

#### Connect the DHT11 sensor to the ESP8266:
- Data pin of DHT11 to D2 pin of ESP8266.
- VCC to 3.3V.
- GND to GND.

#### Connect the MQ135 sensor to the ESP8266:
- Analog output pin of MQ135 to A0 pin of ESP8266.
- VCC to 5V.
- GND to GND.

#### Connect the buzzer to the ESP8266:
- Positive pin of buzzer to D1 pin of ESP8266.
- Negative pin of buzzer to GND.

### SQL Structure Table

```sql
CREATE TABLE plantmonitor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    date DATE NOT NULL,
    time TIME NOT NULL,
    temperature FLOAT NOT NULL,
    humidity FLOAT NOT NULL,
    gasValue INT NOT NULL
);
```

This setup and documentation ensure that the project components and requirements are clearly defined and synchronized for both the midterm and final evaluations.
