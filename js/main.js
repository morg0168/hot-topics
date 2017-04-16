
/*global $, console, alert, confirm, prompt*/

//LOADING PARTIALS W AJAX RIGHT AFTER PAGE IS LOADED

$(document).ready(function () {
    "use strict";
    var
        contents,
        url;
    contents = [];

    /* Load the first content (partial-1.html) by default
    (on the page load)*/
    $("#container").load('./partials/partial-1.html');
    
    function storeContents(url) {
        
        if (!contents[url]) {
            $("#container").load(url, function (pageRsp) {
        //create a key so response will be saves in pages 
                $('html, body').animate({ scrollTop: 0 }, 0);
               // $('.hero-contents-contain, .page-content').hide().fadeIn(1000);
                contents[url] = pageRsp;
            });
       
        //if object element/content with this specific key exists inside pages already
        } else if (contents[url]) {
            //then load the content from the array
            $("#container").html(contents[url]);
            $('html, body').animate({ scrollTop: 0 }, 0);
           // $('.hero-contents-contain, .page-content').hide().fadeIn(1000);
            console.log("Loaded from array");
        }
    }
    
    //what happens when link is clicked
    $("nav a").on("click", function (ev) {
        //make sure not taken to another link
        ev.preventDefault();
        //attr method collects value of href attribute. save it in url
        url = $(this).attr("href");
        //will see each partial ref consoled in log when clicked
//        console.log(url);
        storeContents(url);
    });
  
});


    








