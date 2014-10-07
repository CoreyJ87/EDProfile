//These functions are declared outside the 
//ready function as they require global scope

function switchTab(tab) {
    var str = tab.replace('#tabs-', '');
    var n = parseInt(str);
    var n = n - 1;
    $("#tabs").tabs("option", "active", n);
};

//function output our debig messages to the browser console
function updateLog(strText) {
    console.log('TouchDown build log - ' + strText)
}


//Specify a function to execute when the Document Object Model is fully loaded.
//This is required to ensure that jQuery is fully loaded and able to interact with the page
//all our functions will be enclosed in this "parent" function
$(document).ready(function () {

    //initialise tabs
    $(function () {
        $("#tabs").tabs();
        updateLog('jQuery Tabs initialised');
		//load Tabs
        loadTabs();
    });

    function loadTabs() {
        //loading tabs section
        //load tab data file
        updateLog('loading tab.json')
        $.getJSON('json/tab.json', function (data) {
            updateLog('loaded tab.json')

            //set tab number to 1
            index = 1;

            //step through tab data in a for each loop
            //each item is a full section of info about a tab
            $.each(data, function (i, item) {
                //retrieve tab name
                var tabName = data[i].name;

                //retrieve background image
                var bgImageTest = data[i].bgimage;

                if (typeof bgImageTest == 'undefined') {
                    bgImage = '';
                } else {
                    bgImage = 'background-image:url(' + bgImageTest + ');'
                }

                //strip all non alpha numeric characters off tab name, we add this
                //as a class name to both the tab item and the tab content area so we 
                //can reference it later when we come to adding the buttons
                var safeName = tabName.replace(/[^a-zA-Z0-9-]/g, '');

                //retrieve value for tab visibility
                var isVisible = data[i].visible;

                //set default visibility class to an empty string
                var visible = '';

                //test visability value and set css class name 
                //if this tab should be hiddenit should be hidden
                if (isVisible == '0') {
                    visible = ' hideTab';
                };

                //get dom element for tabs
                var tabs = $('#tabs').tabs();

                //get dom elelemnt for tabs list
                var ul = tabs.find('ul');

                //create the tabs list item and append it to the list	
				updateLog('created tab ' + tabName);	
                $('<li class="' + safeName + visible + '"><a href="#tabs-' + index + '">' + tabName + '</a></li>').appendTo(ul);

                //create the tab content pane and append it to the document
                $('<div id="tabs-' + index + '" class="' + safeName + '"><div class="contentArea" style="position:relative;' + bgImage + '"></div></div>').appendTo(tabs);

                // refresh the tabs
                tabs.tabs('refresh');

                //activate the first tab
                $('#tabs').tabs('option', 'active', 0);

                //increment our tab number
                index++;

                // loop end - re-loop if more data or exit if none

            });
            updateLog('tabs data completed');
			loadButtons();
        });
        //end of loading tabs
    };



	function loadButtons() {
		//loading button info
		//load button data file 	
		updateLog('loading button.json');
		$.getJSON('json/button.json', function (data) {
			updateLog('loaded button.json');
			//step through button data in a for each loop
			//each item is a full section of info about a button
			$.each(data, function (i, item) {
	
				//get button type - these include 
				//button, toggle, hold, clone, & static 
				var type = data[i].type;
	
				// get button name
				var buttonName = data[i].name;
	
				// convert button name to a safe string
				var buttonSafeName = buttonName.replace(/[^a-zA-Z0-9-]/g, '');
	
				//get the name of the tab this button will be displayed
				var tabName = data[i].tabname;
	
				// convert tab name to a safe string
				var safeName = tabName.replace(/[^a-zA-Z0-9-]/g, '');
	
				// get button positions
				var xPos = data[i].xpos;
				var yPos = data[i].ypos;
	
				// get layer for z-indexing
				var layer = data[i].layer;
	
				//get the tab to load if this button is a 
				//navigation button rather than a macro	
				var selectTab = data[i].select_tab;
	
				//test if this is a nav button
				if (typeof selectTab == 'undefined') {
					//not a nav button
					selectTabLink = '';
				} else {
					//is a nav button
					//make tablink a safe string
					selectTabSafe = selectTab.replace(/[^a-zA-Z0-9-]/g, '');
	
					//build string of code for tab navigation
					selectTabLink = 'onclick="switchTab(\'';
					selectTabLink += $('#tabs ul li.' + selectTabSafe + ' a').attr('href');
					selectTabLink += '\')"';
				}
				// check if button is a clone of another
				if (type == 'clone') {
					// get name of button to clone
					var cloneTarget = data[i].clone_source;
					//make safe string
					var cloneTagetSafe = cloneTarget.replace(/[^a-zA-Z0-9-]/g, '');
					//get image of cloned button
					var image = $('#' + cloneTagetSafe).find('img').attr('src');
					//get images array of cloned button
					var imageArray = $('#' + cloneTagetSafe).data('images')
					//get macros array of cloned button
					var macrosArray = $('#' + cloneTagetSafe).data('macro')
				} else {
					//not a clone so get image file
					var image = data[i].image_file;
				}
	
				images = [];
				macros = [];
				//iterate through each property
				$.each(item, function (key, value) {
					//if the property starts with image_file, push into the array
					if (key.indexOf('image_file') === 0) {
						images.push(value);
					};
					if (key.indexOf('macro') === 0) {
						macros.push(value);
					};
				});
				if (images.length > 1) {
					var imagesList = 'data-images="' + images + '"';
				} else {
					if (typeof imageArray == 'undefined') {
						var imagesList = '';
					} else {
						var imagesList = 'data-images="' + imageArray + '"';
					}
				}
	
	
	
				if (macros.length != 0) {
					var macrosList = 'data-macro="' + macros + '"';
				} else {
					if (typeof macrosArray == 'undefined') {
						var macrosList = '';
					} else {
						var macrosList = 'data-macro="' + macrosArray + '"';
					}
				}
				updateLog('created button ' + buttonSafeName);
				$('#tabs div.' + safeName + ' .contentArea').append('<a class="button" id="' + buttonSafeName + '" ' + selectTabLink + ' href="#" ' + macrosList + ' ' + imagesList + '><img src="' + image + '" alt="" style="position:absolute;top:' + yPos + 'px;left:' + xPos + 'px"></a>');
			});
		loadWindow();
		});
	};
	// End loading buttons
	
	
	function loadWindow() {
		//loading window info
		//load window data file 
		updateLog('loading window.json');	
		$.getJSON('json/window.json', function (data) {
			updateLog('loaded window.json');
	
			//step through window data in a for each loop
			//each item is an individual value
			$.each(data, function (i, item) {
	
				// get profile name and set it to page title
				if (i = 'name') {
					document.title = data[i];
				};
	
				// get background colour and set it in the page body
				if (i = 'background') {
					$('body').css({
						'background-color': 'rgb(' + data[i] + ')'
					})
				};
	
				//set defualt text colour
				if (i = 'foreground') {
					$('body').css({
						'color': 'rgb(' + data[i] + ')'
					})
				};
	
				//set width
				if (i = 'width') {
					$('body').css({
						'width': data[i]
					})
				};
	
				//set height
				if (i = 'height') {
					$('body').css({
						'height': data[i]
					})
				};
	
				//set fontsize for tabs
				if (i = 'tabfontsize') {
					$('#tabs ul li').css({
						'font-size': data[i] + 'px'
					})
				};
	
				//set font for tabs
				if (i = 'tabfont') {
					$('#tabs ul li').css({
						'font-family': data[i]
					})
				};
	
				//set tab height
				if (i = 'tabheight') {
					$('#tabs ul li').css({
						'height': data[i]
					})
				};
				// loop end - re-loop if more data or exit if none
			});
			//end load window info
			var bodyHeight = $('body').height();
			var tabHeight = $('#tabs ul').height();
			var contentHeight = (bodyHeight - tabHeight)
			$('.contentArea').css({
				'min-height': contentHeight + 'px'
			})
	
		});
    //end load window info
	};

    // click events
    $(document.body).on('click', '.button', function (event) {
        var elem = $(this);
        event.preventDefault();
        var images = $(elem).data('images');

        if (typeof images != 'undefined') {
            var imageArray = images.split(',');
            console.log(imageArray);
        }

        var macros = $(elem).data('macro');
        if (typeof macros != 'undefined') {
            var macroArray = macros.split(',');
            console.log(macroArray);
        }

        // toggle images
        if (typeof imageArray != 'undefined') {
            var currentImage = $(elem).find('img').attr('src');
            var totalImages = imageArray.length;
            var currentIndex = $.inArray(currentImage, imageArray);
            if ((currentIndex + 1) >= totalImages) {
                $(elem).find('img').attr('src', imageArray[0]);
            } else {
                $(elem).find('img').attr('src', imageArray[(currentIndex + 1)]);
            }
        }
        if (typeof macroArray != 'undefined') {
            $.each(macroArray, function (i, item) {
                if (macroArray[i].indexOf('PAUSE') > -1) {
                    str = macroArray[i].replace('{PAUSE ', '')
                    nMill = str.replace('}', '')
                    pause(nMill)
                } else {
                    macro(macroArray[i]);
                }
            });
        }
    });
});
// End of our $(document).ready() function area


