var XMLHttpRequestObject = false; 

if (window.XMLHttpRequest) {
	XMLHttpRequestObject = new XMLHttpRequest();
} else if (window.ActiveXObject) {
	XMLHttpRequestObject = new 
	ActiveXObject("Microsoft.XMLHTTP");
}

//pause function	  
function pause(milliseconds) {
	var dt = new Date();
	while ((new Date()) - dt <= milliseconds) { /* Do nothing */ }
}

//macro function
function macro(string) { 
	if(XMLHttpRequestObject) {
		var obj = document.getElementById('#targetDiv'); 
		XMLHttpRequestObject.open("GET", "http://" + document.location.hostname + "/function%20macro(%22" + string + "%22)"); 
		XMLHttpRequestObject.onreadystatechange = function() { 
			if (XMLHttpRequestObject.readyState == 4 && 
			XMLHttpRequestObject.status == 200) {obj.innerHTML = XMLHttpRequestObject.responseText;} 
			} 
		XMLHttpRequestObject.send(null); 
	}
}