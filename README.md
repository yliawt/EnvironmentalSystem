# Environmental Monitoring System

## Contents
- [01 MidTerm](#01-midterm)
  - [Hardware & Software Requirements](#hardware--software-requirements)
  - [Setup](#setup)
    - [Connect the DHT11 sensor to the ESP8266](#connect-the-dht11-sensor-to-the-esp8266)
  - [SQL Structure Table](#sql-structure-table)
- [02 Final](#02-final)
  - [Project Components](#project-components)
  - [Setup](#setup-1)
    - [Connect the DHT11 sensor to the ESP8266](#connect-the-dht11-sensor-to-the-esp8266-1)
    - [Connect the MQ135 sensor to the ESP8266](#connect-the-mq135-sensor-to-the-esp8266)
    - [Connect the buzzer to the ESP8266](#connect-the-buzzer-to-the-esp8266)
  - [SQL Structure Table](#sql-structure-table-1)

## 01 MidTerm

This project is an Environmental Monitoring System that uses an ESP8266 microcontroller to measure temperature and humidity data using a DHT11 sensor. The data is sent to a MySQL database and displayed on a web interface.

[Web Interface](https://liawenvironmentsystem.000webhostapp.com/index.html)

### Hardware & Software Requirements
- ESP8266 microcontroller (e.g., NodeMCU)
- DHT11 temperature and humidity sensor
- Breadboard and jumper wires
- Power source (e.g., USB cable)
- Arduino IDE or PlatformIO
- Web server with PHP and MySQL support (e.g., 000webhost, XAMPP)

### Setup

#### Connect the DHT11 sensor to the ESP8266:
- VCC to 3.3V
- GND to GND
- Data to D5

### SQL Structure Table

```sql
CREATE TABLE `nodemcu_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `temperature` float NOT NULL,
  `humidity` float NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL,
  PRIMARY KEY (`id`)
);
```

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
