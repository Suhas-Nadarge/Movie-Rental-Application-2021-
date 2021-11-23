var datag = [];

load();
// document.getElementById("name").required = true
//-----Function which refresh the movie-list ----------------------------------------------------
function load(){
    $.getJSON("movie.json", function (data) {
        datag = data;
        var alldata = '';
        $.each(data, function (key, val) {
    
            alldata = alldata + getmoview(key, val);
        });
        $("#main").html(alldata)
    });

}
// ---When user type from search bar, this function will call and give the result based on inputs---------
function search(input) {
    var alldata = '';
    $("#main").html('')
    //  $.getJSON("movie.json", function (data) { 
    $.each(datag, function (key, val) {

        if (val.Title.toLowerCase().search(input.toLowerCase()) != -1) {
            alldata = alldata + getmoview(key, val);
        }
    });
    $("#main").html(alldata)
    //  });


}
// Final Booking confirmation modal
function book(title) {
    alert('' + title + ' is reserved')
}

//This function returns div with each movie details
function getmoview(key, data) {
    var hd = parseInt(data.rate) + 3;
    var Fullhd = parseInt(data.rate) + 6;
    var fk = parseInt(data.rate) + 9;
    return '<div class="ui-body ui-body-a ui-corner-all"> ' +
        '<h3>' + data.Title + '</h3>' +
        ' <div>' +
        '<img  class="img" src="' + data.Images[0] + '" alt="">' +
        '<div  class="details">' +
        '<h3> Actors :' + data.Actors + '</h3>' +
        '<h3> Plot :' + data.Plot + '</h3>' +
        '<h3> Rent amount :' + data.rate + '</h3>' +
        '<h3> Language :' + data.Language + '</h3>' +
        '<p><a class="ui-btn bdet ui-shadow ui-corner-all" key="' + key + '">Details</a></p>' +
        '<p><a class="ui-btn book ui-shadow ui-corner-all" id="' + key + '" key="' + data.Title + '">Rent </a></p>' +
        '</div>' +
        '</div> ' +
        '</div>';
}

// This function will give details of movie on seperate page
function getdingmoview(key) {
    var data = datag[key];
    var hd = parseInt(data.rate) + 3;
    var Fullhd = parseInt(data.rate) + 6;
    var fk = parseInt(data.rate) + 9;
    var tb = '<div class="ui-body ui-body-a ui-corner-all"> ' +
        '<h3>' + data.Title + '</h3>' +
        '<p><a class="ui-btn book1 ui-shadow ui-corner-all" id="' + key + '" key="' + data.Title + '">Rent </a></p>' +
        ' <div class ="row"><div class="imgdiv"><ul class="ul">';
    $.each(data.Images, function (key, val) {
        tb = tb + '<li><img  class="img" src="' + data.Images[key] + '" alt=""></li>'
    });

    tb = tb + '</ul></div><div  class="detailsaa">' +
        '<h3> Year :' + data.Year + '</h3>' +
        '<h3> Rated :' + data.Rated + '</h3>' +
        '<h3> Released :' + data.Released + '</h3>' +
        '<h3> Runtime :' + data.Runtime + '</h3>' +
        '<h3> Genre :' + data.Genre + '</h3>' +
        '<h3> Director :' + data.Director + '</h3>' +
        '<h3> Writer :' + data.Writer + '</h3>' +
        '<h3> Actors :' + data.Actors + '</h3>' +
        '<h3> Plot :' + data.Plot + '</h3>' +
        '<h3> Language :' + data.Language + '</h3>' +
        '<h3> Country :' + data.Country + '</h3>' +
        '<h3> Awards :' + data.Awards + '</h3>' +
        '<h3> Metascore :' + data.Metascore + '</h3>' +
        '<h3> imdbRating :' + data.imdbRating + '</h3>' +
        '<h3> imdbVotes :' + data.imdbVotes + '</h3>' +
        '<h3> Type :' + data.Type + '</h3>' +
        '<h3> Rent :' + data.rate + '</h3>' +
        //'<p><a class="ui-btn ui-shadow ui-corner-all" key="' + key + '">Details</a></p>' +
        '</div>' +
        // To Embed the youtube video Iframe is being used
        '<iframe width = "420" height = "315" src = "' + data.video + '" >' +
        '</iframe>' +
        '</div> ' +
        '</div> ' +
        '</div>';

    return tb;
}
$(document).ready(function () {
    //load();
    // called for OnKeyPress event
    $("#search").change(function () {
        if ($("#search").val() !== '') {
            search($("#search").val());
        } else {
            load();
        }
    })
    $("#search").keyup(function () {
        if ($("#search").val() !== '') {
            search($("#search").val());
        } else {
            load();
        }
    });
    // Called when clicked on details
    $(document).on("click", ".bdet", function () {
        var key = $(this).attr('key');
        $("#seccond").html(getdingmoview(key));
        $.mobile.changePage("#details", {
            transition: "slide"
        });
    });
    // called when clicked on rent to book the movie
    $(document).on("click", ".book", function () {
        $("#shows").click(); 
        var key = $(this).attr('key'); 
        
        //book(key)
        $("#dttxt").val(key)
    });

    $(document).on("click", ".book1", function () {
        $("#shows1").click(); 
        var key = $(this).attr('key'); 
        
        //book(key)
        $("#dttxt").val(key)
    });
    

    $(document).on("click", ".rnt", function () {
        
        var dttxt = $("#dttxt").val();
        // Confirmation Box
         alert(dttxt)
        location.reload();
    });

})