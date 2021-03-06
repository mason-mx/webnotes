function filter(liClass)
{
    var liClass= "." + liClass;
    $("#postlist li").hide();
    $(liClass).show();
}

function showCategory(CategoryId)
{
    $("#wrapper").css("display","none");
    $("#content").css("display","block");
    filter(CategoryId)
}

function showCards()
{
    var div1 = $("content");
    var div2 = $("wrapper");
    div1.style.display = "none";
    div2.style.display = "block";
}

function scrollToDiv(element,navheight){
	var offset = element.offset();
	var offsetTop = offset.top;
	var totalScroll = offsetTop-navheight;
	
	$('body,html').animate({
			scrollTop: totalScroll
	}, 500);
}

function askWeather() {
    $.ajax('https://api.wunderground.com/api/c6dc8e785d943109/conditions/q/NZ/Auckland.json', {
        dataType: 'jsonp',
        success: function(json) {
            console.log(json.current_observation.weather);
          $('div#city strong').text(json.current_observation.display_location.full)
          $('div#icon').html('<img src=' + json.current_observation.icon_url + '>')
          $('div#weather').text(json.current_observation.temperature_string + " " + json.current_observation.weather);
          $('div#time').text(json.current_observation.observation_time_rfc822);
        }
      });
    
}

function emptyResultsContainer () {
    $("#results-container").empty();
}

function JekyllSearch(){
    var items = [];
    $.getJSON( "/webnotes/search.json", function( data ) {
        $.each( data, function( key, val ) {
            items.push( "<li><a href='" + val.url + "'>" +val.title + "</a></li>" );
            //$.each( val, function( key2, val2 ) {
                //items.push( "<li id='" + key2 + "'>" +val2 + "</li>" );
            //});
        });
    });
    $("#search-input").keyup(function(){
        $("#search-input").css("background-color","pink");
        var text = document.getElementById('search-input').value;
        emptyResultsContainer ()
        if (text.length > 0) {
            var re = new RegExp(text, "gi");
            $.each(items, function( index, value ) {
                console.log(value);
                var res = value.match(re);
                console.log(res);
                if(res != null) {
                    $("#results-container").append(value);
                }
            }); 
        }
        else {
            $("#search-input").css("background-color","white");
        }
    });
}