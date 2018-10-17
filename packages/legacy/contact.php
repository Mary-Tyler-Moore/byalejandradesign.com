<!DOCTYPE html >
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href=' http://fonts.googleapis.com/css?family=Droid+Sans' rel='stylesheet' type='text/css'>
<title>Artist</title>
<link rel="stylesheet" type="text/css" href="style.css">
<link rel="stylesheet" type="text/css" href="contact.css">

<style type="text/css">
<!--

#mainContent {
min-height: 570px;
}

-->
</style></head>

<div class="menu"></div>
<div id="wrapper">
<div id="container">

<?php include 'menu.php'?>

<!-- Header End -->

<div id="mainContent">

<div class="contactpage">	
<p style="">I'll be more then happy to hear from you!</p>
	<div id="page-wrap">

		<div id="contact-area">
			
			<form method="post" action="contactengine.php">
				<label for="Name">Name:</label>
				<input type="text" name="Name" id="Name" />
				
				<label for="Email">Email:</label>
				<input type="text" name="Email" id="Email" />
				
				<label for="Message">Message:</label><br />
				<textarea name="Message" rows="20" cols="20" id="Message"></textarea>

				<input type="submit" name="submit" value="submit" class="submit-button" />
			</form>
			
			<div style="clear: both;"></div>
			
		</div>
		
<?php include 'footer.php'?>

</div>
  
<!-- end #mainContent --></div>
<!-- end #container --></div>
<!-- end #wrapper --></div>
</body>
</html>