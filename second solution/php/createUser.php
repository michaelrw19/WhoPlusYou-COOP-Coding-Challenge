<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossorigin="anonymous">
    <title>Form</title>
</head>
<body>
<?php
    include "User.php";

    $firstName = $_POST["firstName"];
    $lastName = $_POST["lastName"];
    $email = $_POST["email"];
    $phoneNumber = $_POST["phoneNumber"];
    $address = $_POST["address"];
    $city = $_POST["city"];
    $province = $_POST["province"];
    $country = $_POST["country"];
    
    $newUser = new User($firstName, $lastName, $email, $phoneNumber, $address, $city, $province, $country);

    $newUser->insert();

    print("
        <div class='px-4 py-5 my-5 text-center'>
            <h1 class='display-5 fw-bold text-body-emphasis'>Congratulation!</h1>
            <div class='col-lg-6 mx-auto'>
                <p class='lead mb-4'>Your account has been successfully created</p>
                <div class='d-grid gap-2 d-sm-flex justify-content-sm-center'>
                    <button type='button' class='btn btn-success btn-md px-4 gap-3'>Log In</button>
                </div>
            </div>
        </div>
    ")

?>
</body>
</html>