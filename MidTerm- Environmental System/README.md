# Environmental Monitoring System

This project is an Environmental Monitoring System that uses an ESP8266 microcontroller to measure temperature and humidity data using a DHT11 sensor. The data is sent to a MySQL database and displayed on a web interface.

## Table of Contents

- [Features](#features)
- [Hardware Requirements](#hardware-requirements)
- [Software Requirements](#software-requirements)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [File Descriptions](#file-descriptions)
- [Screenshots](#screenshots)
- [License](#license)

## Features

- Measures temperature and humidity using a DHT11 sensor.
- Sends data to a MySQL database hosted on a server.
- Displays current readings and historical data on a web interface.
- Responsive and modern UI design for both current and historical data pages.

## Hardware Requirements

- ESP8266 microcontroller (e.g., NodeMCU)
- DHT11 temperature and humidity sensor
- Breadboard and jumper wires
- Power source (e.g., USB cable)

## Software Requirements

- Arduino IDE or PlatformIO
- Web server with PHP and MySQL support (e.g., 000webhost, XAMPP)

## Setup Instructions

### Hardware Setup

1. Connect the DHT11 sensor to the ESP8266:
   - VCC to 3.3V
   - GND to GND
   - Data to D5

### Software Setup

1. **Arduino Code**: Upload the provided `NodeMCU.ino` file to your ESP8266 using Arduino IDE or PlatformIO.

2. **Web Server Setup**:
   - Upload `fetchdata.php` and `fetchhistory.php` to your web server.
   - Upload `index.html` and `history.html` to your web server.
   - Create a MySQL database and table using the provided SQL schema.

### MySQL Schema

```sql
CREATE TABLE `nodemcu_table` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `temperature` float NOT NULL,
  `humidity` float NOT NULL,
  `Date` date NOT NULL,
  `Time` time NOT NULL,
  PRIMARY KEY (`id`)
);

### Steps to Add Screenshots

1. **Take Screenshots**: Capture the screenshots of the `index.html` and `history.html` pages.
2. **Upload Screenshots**: Upload the screenshots to your repository or an image hosting service.
3. **Update URLs**: Replace `path/to/current_readings_screenshot.png` and `path/to/view_history_screenshot.png` with the actual URLs where your screenshots are hosted.
