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
    var baseUrl = "https://api.github.com/search/repositories?q=language:" + res + "&sort=stars&order=desc";
    var dataSet = [];
    for (var i = 1; i <= 34; i++) {
      var url = baseUrl + "&page=" + i;
      // urls.push(url + "&page=" + i);
      console.log('url', url);
      $.ajax({
        url: url,
        dataType: "json",
        type: "GET",
        async: "false",
        beforeSend: function (xhr) {
          xhr.setRequestHeader('Authorization', 'token c11e3bccc83d77e388a20034c505155b862e7218');
        },
        success: function (data) {
          $("#list").html("");
          console.log(data.items.length);
          dataSet.push(data.items);
          console.log(dataSet);
        },
        error: function (errorMessage) {
          alert("error");
        }
      })
    }
  }
});