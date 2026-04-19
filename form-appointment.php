<?php

	$errorMSG = "";

	// NAME
	if (empty($_POST["name"])) {
		$errorMSG = "Name is required. ";
	} else {
		$name = $_POST["name"];
	}

		// EMAIL
	$email = "";
	if (!empty($_POST["email"])) {
		$email = $_POST["email"];
	}

	// PHONE
	if (empty($_POST["phone"])) {
		$errorMSG .= "Phone is required. ";
	} else {
		$phone = $_POST["phone"];
	}

	// CONDITION
	if (empty($_POST["condition"])) {
		$errorMSG .= "Condition is required. ";
	} else {
		$condition = $_POST["condition"];
	}

	// DATE
	if (empty($_POST["date"])) {
		$errorMSG .= "Date is required. ";
	} else {
		$date = $_POST["date"];
	}

	// TIME
	if (empty($_POST["time"])) {
		$errorMSG .= "Time is required. ";
	} else {
		$time = $_POST["time"];
	}
	$subject ='Book Appointment from site';

	$EmailTo = "info@yourdomain.com"; // Replace with your email.

	// prepare email body text
	$Body = "";
	$Body .= "Name: ";
	$Body .= $name;
	$Body .= "\n";
	$Body .= "Email: ";
	$Body .= $email;
	$Body .= "\n";
		$Body .= "Phone: ";
	$Body .= $phone;
	$Body .= "\n";
	$Body .= "Condition: ";
	$Body .= $condition;
	$Body .= "\n";
	$Body .= "Date: ";
	$Body .= $date;
	$Body .= "\n";
	$Body .= "Time: ";
	$Body .= $time;
	$Body .= "\n";

	// send email
		$success = @mail($EmailTo, $subject, $Body, "From: noreply@hvphysiotherapy.com");

	// redirect to success page
	if ($success && $errorMSG == ""){
	   echo "success";
	}else{
		if($errorMSG == ""){
			echo "Something went wrong :(";
		} else {
			echo $errorMSG;
		}
	}

?>
