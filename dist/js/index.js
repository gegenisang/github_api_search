$(document).ready(function () {
  var $val;
  var $math = "stars";
  var num = 1;
  $('#myDropdown').dropdown({
    onChange: function (value, text, $selectedItem) {
      console.log('value', value);
      console.log('text', text);
      $val = text;
      showActive();
      getGitHub($val, $math, num);
    }
  });

  function showActive() {
    if (num > 1) {
      num = 1;
      $(".pagination li").removeClass("active");
      $("*[data-value='1']").parent("li").addClass("active");

    }
  }
  $("#filterbox").dropdown({
    onChange: function (value, text, $selectedItem) {
      console.log('value', value);
      console.log('text', text);
      $math = text;
      switch (text) {
        case "Most stars":
          $math = "stars";
          break;
        case "Best match":
          $math = "match";
          break;
        case "Most forks":
          $math = "forks";
          break;
        case "Recently updated":
          $math = "updated"
          break;
        default:
          $math = "stars";
          break;
      }
      showActive();
      console.log($math);
      getGitHub($val, $math, num);
    }
  });

  $(".pagination li a").click(function () {
    $(".pagination li").removeClass("active");
    num = $(this).data("value");
    $(this).parent("li").addClass("active");
    console.log('num', num);
    getGitHub($val, $math, num);
  });


  function getGitHub(lang, sort, idx) {
    $(".list").html("");
    var url = "https://api.github.com/search/repositories?q=language:" + lang + "&sort=" + sort + "&page=" + idx + "&order=desc&per_page=100";

    $.ajax({
      url: url,
      dataType: "json",
      type: "GET",
      async: "false",
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'token c11e3bccc83d77e388a20034c505155b862e7218');
      },
      success: function (data) {

        console.log(data.items.length);
        console.log(data.items);

        for (var i = 0; i < data.items.length; i++) {
          $(".list").append("<li class='item clearfix'><div class='pull-left'><h2><a href='javascript:;'>" + data.items[i].full_name + "</a></h2><p class='description'>" + data.items[i].description + "</p><p class='time'>" + "updata : " + data.items[i].updated_at + "</p></div>" + "<div class='pull-right'><span class='download'><a href=" + data.items[i].url + "/zipball/master" + "><i class='fa fa-cloud-download'></i>Download</a></span><span><i class='fa fa-star'></i><em class='numbers'>" + data.items[i].stargazers_count + "</em></span><span><i class='fa fa-code-fork'></i><em class='fork'>" + data.items[i].forks_count + "</em></span></div></li>");
        }
        getSearchMess();
        $(".page-list").removeClass("hidden");

      },
      error: function (errorMessage) {
        console.log("aaa");
      }
    })
    // }

  }


  function filterSearch(ele, searchValue) {
    $(ele).each(function () {
      if ($(this).text().search(new RegExp(searchValue, "i")) > -1) {

        $(this).parents("li").show();
        $(ele).unhighlight({
          element: "em",
          className: "highlight"
        });

        $(ele).highlight($("#search-input").val(), {
          element: "em",
          className: "highlight"
        });
      } else {
        $(this).parents("li").hide();

      }
    });
  }

  function getSearchValue() {
    var search = $("#search-input").val();
    return search;
  }

  function getSearchMess() {
    var $input_value = getSearchValue();
    console.log($input_value);
    filterSearch($("item h2 a"), $input_value);
    filterSearch($(".item .description"), $input_value);
  }
  $("#search-input").keyup(function () {
    getSearchMess();
  });

  // $("#search-input").on("keyup", function () {
  //   $(".item").highlight($(this).val(), {
  //     element: 'span',
  //     className: 'highlight'
  //   });

  // })

});