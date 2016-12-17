$(document).ready(function() {
  $("#article").hide();

  var search = '';
// calling the wikipedia API for search results.
  var searchResult = function() {

    var apiurl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + search + "&format=json&callback=?";
    $.getJSON(apiurl, function(data) {
      var titles = "";
      var articles = data[2];
      var links = data[3];

      $("#article").empty();
      for (var i in data[1]) {
        titles += ("<a href= '" + links[i] + "' target='_blank'>");
        titles += ("<b>" + data[1][i] + "</b></a>" +
          "</br>");
        titles += (articles[i] + "</br><hr></br>");
      }
      $("#article").html(titles);
      console.log(titles);

    });
  }

  // calling the wikipedia API for random articles.
  var randomResult = function() {

    var randomURL = "https://en.wikipedia.org/w/api.php?action=query&generator=random&grnnamespace=0&prop=extracts&exlimit=max&exchars=5000&format=json&callback=?";
    $.getJSON(randomURL, function(data) {
      var pages = data.query.pages;
      var article = pages[Object.keys(pages)[0]].extract;
      var title = pages[Object.keys(pages)[0]].title
      //console.log(data.query.pages);
      $("#article").html("<b>" + title + "</b>" + "<br>" + article);

    });
  }
// button click events.
  $("#submit").click(function() {
    $(".main-window").css("margin", "20px auto");
    search = $("#search").val();
    $("#article").show();

    searchResult();
  });
  $("#random").click(function() {
    $(".main-window").css("margin", "20px auto");
    $("#article").show();

    randomResult();

  });
  // Auto Complete feature for search.
  $("input").autocomplete({
    source: function(request, response) {
      $.ajax({
        url: 'https://en.wikipedia.org/w/api.php',
        dataType: 'jsonp',
        data: {
          'action': "opensearch",
          'format': "json",
          'search': request.term
        },
        success: function(data) {
          response(data[1]);

        }

      });
    }

  }); //End auto compelete

  //api.php?action=opensearch&search=Te
  //console.log("test");
  ///w/api.php?action=query&format=json&list=random&rnlimit=5

});
