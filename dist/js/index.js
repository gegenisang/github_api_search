$(document).ready(function () {
  $('#myDropdown').dropdown({
    onChange: function (value, text, $selectedItem) {
      console.log(arguments);
      console.log('value', value);
      console.log('text', text);
      console.log('$selectedItem.data("test")', $selectedItem.data("test"));
    }
  });
});