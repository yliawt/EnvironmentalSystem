<?php
$host = "localhost";
$dbname = "id22312400_environment";
$username = "id22312400_yliawt02";
$password = "ThankYou979!";

$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT id, temperature, humidity, Date, Time FROM nodemcu_table ORDER BY id DESC LIMIT 10";
$result = $conn->query($sql);

$data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
$conn->close();
?>
