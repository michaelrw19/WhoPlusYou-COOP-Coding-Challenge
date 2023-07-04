<?php
    class User {
        public $firstName;
        public $lastName;
        public $email;
        public $phoneNumber;
        public $address;
        public $city;
        public $province;
        public $country;

        function __construct($firstName, $lastName, $email, $phoneNumber, $address, $city, $province, $country) {
            $this->firstName = $firstName;
            $this->lastName = $lastName;
            $this->email = $email;
            $this->phoneNumber = $phoneNumber;
            $this->address = $address;
            $this->city = $city;
            $this->province = $province;
            $this->country = $country;
        }

        function insert() {
            //Insert user to database (for this coding challenge purpose, it only returns the query)
            return "INSERT INTO userTable (FirstName, LastName, Email, Password, PhoneNumber, Address, City, Province, Country) VALUES ($this->firstName, $this->lastName, $this->email, $this->phoneNumber, $this->address, $this->city, $this->province, $this->country)";
        }
    }
?>