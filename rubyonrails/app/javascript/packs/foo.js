window.bar = function(e) {
  fooBar = document.createElement('div');
  fooBar.innerHTML = e;
  return fooBar.innerText;
}

window.foo = function(e) {
  e.disabled = true;
  $.ajax({
    url: "home/ajax",
    success: function(result) {
      $('#quote').html(bar(result['quotes']));
      $('#author').html(bar(result['author']));
      $('#user').html(result['user']);
      $('#user').attr('href', result['link']);
      e.disabled = false;
    }
  });
}

