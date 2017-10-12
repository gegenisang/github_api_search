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
    var url = "https://api.github.com/search/repositories?q=language:" + res + "&sort=stars&order=desc&page=2&";
    console.log(url);
  }
});