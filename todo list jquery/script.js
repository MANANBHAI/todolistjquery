 if ($.cookie("item_list_data") == undefined || $.cookie("item_list_data") == "") {
  $.cookie("item_list_data", "ignore");
}


function updateNumbers() {
  //update variable
  var lists = document.querySelectorAll("number");
  //update number
  for (var i = 0; i < lists.length; i++) {
      $(lists[i]).html(i + 1 + ") ");
  }
}


updateNumbers();
//Check off Specific Todos By Clicking
$("ul").on("click", "li", function () {
  $(this).toggleClass("completed");
});

//Click on X to delete Todo
$("ul").on('click', "span", function (e) {
  e.stopPropagation();
  $(this).closest("li").fadeOut(500, function () {
      removeData($(this).index());
      $(this).remove();
      // remove data from array 
      
      updateNumbers();
  });
});

//Clear All
$(".removeall").on('click', function (e) {
  $("li").fadeOut(500, function () {
      $(this).remove();
      // remove data from array
      removeData($(this).index());
  });
});

//Add new todos
$("input[type='text']").keypress(function (e) {
  if (e.which === 13) {
      //grab text
      var todoText = $(this).val();
      //append todotext to ul
      if ($(this).val() !== "") {
          $("ul").append("<li><span><i>Delete</i></span>" + "<number></number>" + todoText + "</li>");
          // add data to array
          addData(todoText);
      }
      updateNumbers();
      //clear text
      $(this).val("");
  }
});

$(".add").click(function () {
  $("input[type='text']").fadeToggle(200);
});


// function store key value pair in cookies
arr = $.cookie("item_list_data").split(";")
for (var i = 1; i < arr.length; i++) {
  var item = arr[i];
  $("ul").append("<li><span><i>Delete</i></span>" + "<number></number>" + item + "</li>");
}

updateNumbers();
// add data to array at end 
function addData(data) {
  arr.push(data);
  $.cookie("item_list_data", arr.join(";"));
}


// remove data from array at index 
function removeData(index) {
  console.log(index);
  arr = arr.slice(0, index+1).concat(arr.slice(index + 2));
  $.cookie("item_list_data", arr.join(";"));
}