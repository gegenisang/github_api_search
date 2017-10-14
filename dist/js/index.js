$(document).ready(function () {
  var $val;
  $('#myDropdown').dropdown({
    onChange: function (value, text, $selectedItem) {
      console.log('value', value);
      console.log('text', text);
      $val = text;
      getGitHub($val);
    }
  });




  function getGitHub(res) {
    // var baseUrl = "https://api.github.com/search/repositories?q=language:" + res + "&sort=stars&order=desc";
    var url = "https://api.github.com/search/repositories?q=language:" + res + "&sort=stars&order=desc";
    // var dataSet = [];
    // for (var i = 1; i <= 2; i++) {
    //   var url = baseUrl + "&page=" + i;
    //   // urls.push(url + "&page=" + i);
    //   console.log('url', url);
    $.ajax({
      url: url,
      dataType: "json",
      type: "GET",
      async: "false",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'token c11e3bccc83d77e388a20034c505155b862e7218');
      },
      success: function (data) {
        $(".list").html("");
        console.log(data.items.length);
        console.log(data.items);
        // dataSet.push(data.items);
        for (var i = 0; i < data.items.length; i++) {
          $(".list").append("<li class='item clearfix'><div class='pull-left'><h2><a href='javascript:;'>" + data.items[i].full_name + "</a></h2><p class='description'>" + data.items[i].description + "</p><p class='time'>" + "updata : " + data.items[i].updated_at + "</p></div>" + "<div class='pull-right'><span class='download'><a href=" + data.items[i].url + "/zipball/master" + "><i class='fa fa-cloud-download'></i>Download</a></span><span><i class='fa fa-star'></i><em class='numbers'>" + data.items[i].stargazers_count + "</em></span></div></li>");
        }

      },
      error: function (errorMessage) {
        console.log("aaa");
      }
    })
  }
  // }
});