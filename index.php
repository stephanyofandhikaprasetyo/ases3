<?php
require_once 'koneksi.php';
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$req_type = $_SERVER['REQUEST_METHOD'];
if($req_type == "GET"){
    global $conn;
    $query = $conn->query("SELECT * FROM hobi");            
    while($row=mysqli_fetch_object($query))
    {
        $data[] =$row;
    }
    echo json_encode($data);
}

if($req_type == "POST"){
    $nim  = $_POST["nim"];
    $hobi = $_POST['hobi'];

    global $conn;
    $query = "INSERT INTO hobi(nim, hobi) VALUES('$nim', '$hobi')";
    
    if($conn->query($query)){
        header("HTTP/1.1 200 OK");
        $data = array("response" => "success", "code" => 200);
    }
    else{
        header("HTTP/1.1 500 Internal Server Error");
        $data = array("response" => "failed", "code" => 500);
    }
    
    echo json_encode($data);
}

if($req_type == "PUT"){
    $input = file_get_contents('php://input');
    parse_str($input, $params);

    $data = array("lima" => "jumat", "enam" => $params['data']);
    echo json_encode($data);
}

if($req_type == "PATCH"){
    $input = file_get_contents('php://input');
    parse_str($input, $params);

    $data = array("tujuh" => "jumat", "delapan" => $params['data']);
    echo json_encode($data);
}

if($req_type == "DELETE"){
    $input = file_get_contents('php://input');
    parse_str($input, $params);

    $data = array("tujuh" => "jumat", "delapan" => $params['id']);
    echo json_encode($data);
}



