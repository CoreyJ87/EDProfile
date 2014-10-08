var commandRunning = false;
var Daelement;
$(document).foundation();
$(document).ready(function () {

    $(".toggle").click(function () {
        $(this).toggleClass("active");
    });

    $(".multitoggle").click(function () {
        $(".multitoggle").removeClass("active");
        $(this).toggleClass("active");
    });

    $('.button').click(function () {
        var key = $(this).attr('key');
        if (!$(this).hasClass('multiFunction')) runMacro(key);
    });

    $('.multiFunction').click(function () {
            if(!commandRunning) {
                commandRunning = true;
                Daelement = $(this);
                $(this).addClass('active').delay(500).queue(function () {
                    var keys = $(this).attr('key');
                    multiFunction(keys, Daelement);
                    $(this).dequeue();
                });
            }
    });
});

function pause(milliseconds) {
    var dt = new Date();
    while ((new Date()) - dt <= milliseconds) { /* Do nothing */
    }
}
function multiFunction(macroItems, theElement) {
    var split = macroItems.split(";");
    var x = 0;
    while (split[x] != null) {
        runMacro(split[x]);
        pause(350);
        x++;
    }
    theElement.removeClass('active');
    commandRunning = false;
}

function runMacro(macroItem) {
    result = runRequest2("/function macro(\"" + macroItem + "\");");
}


function runRequest2(page, values) {
    $.ajax({
        type: "GET",
        url: page,
        data: values
    });
}