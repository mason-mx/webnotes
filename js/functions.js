function filter(liId)
{
	var items = $("posts").getElementsByTagName("li"), i;
	for (i = 0; i < items.length; i +=1 )
	{
		items[i].style.display = "none";
	}
	var litoshow = document.getElementsByClassName(liId);
	for (i = 0; i < litoshow.length; i +=1 ) {
		litoshow[i].style.display = "block";
	}
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

function emptyResultsContainer () {
    $("#results-container").empty();
}

function JekyllSearch(){
    var items = [];
    $.getJSON( "/jekyll_demo/search.json", function( data ) {
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