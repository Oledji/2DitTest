<?php
$_POST = json_decode(file_get_contents("php://input"),put);
echo var_dump($_POST);