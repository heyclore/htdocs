function bar(e) {
  fooBar = document.createElement('div');
  fooBar.innerHTML = e;
  return fooBar.innerText;
}

function foo(e) {
  e.disabled = true;
  $.ajax({
    url: "ajax",
    success: function(result) {
      $('#quote').html(bar(result['quote']));
      $('#author').html(bar(result['author']));
      $('#user').html(result['user']);
      $('#user').attr('href', result['link']);
      e.disabled = false;
    }
  });
}

