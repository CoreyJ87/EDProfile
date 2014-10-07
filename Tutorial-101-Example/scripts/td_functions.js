// TouchDown JavaScript Document
//----------------------------
//  initial script to create  
// an object to interact with 
// a server in the background   
//----------------------------
var XMLHttpRequestObject = false;

if (window.XMLHttpRequest)
{
    XMLHttpRequestObject = new XMLHttpRequest();
}
else if (window.ActiveXObject)
{
    XMLHttpRequestObject = new
    ActiveXObject("Microsoft.XMLHTTP");
}

//---------------------------
// Function to create a Pause  
//---------------------------

function pause(milliseconds)
{
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds)
    { /* Do nothing */
    }
}

//---------------------------
// Function to send a macro   
//---------------------------

function macro(string)
{
    if (XMLHttpRequestObject)
    {
        var obj = document.getElementById(targetDiv);
        XMLHttpRequestObject.open("GET", "function%20macro(%22" + string + "%22)");
        XMLHttpRequestObject.onreadystatechange = function ()
        {
            if (XMLHttpRequestObject.readyState == 4 && XMLHttpRequestObject.status == 200)
            {
                obj.innerHTML = XMLHttpRequestObject.responseText;
            }
        }
        XMLHttpRequestObject.send(null);
    }
}

//---------------------------
// Function to swap an image
// from name_up to name_down
// and vice versa   
//---------------------------

function switchImg(img)
{
	img.src = img.src.match(/up/) ? img.src.replace(/up/, "down") : img.src.replace(/down/, "up");
}
//---------------------------
//         END               
//---------------------------