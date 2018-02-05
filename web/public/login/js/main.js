(function($) {
  "use strict";


  /*==================================================================
  [ Validate ]*/
  var input = $('.validate-input .input100');

  $('.validate-form').on('submit', function() {
    var check = true;
    console.log(check, input)
    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    console.log(check, input)
    return check;
  });

  function validField() {
    var check = true;

    for (var i = 0; i < input.length; i++) {
      if (validate(input[i]) == false) {
        showValidate(input[i]);
        check = false;
      }
    }

    return check;
  }

  $('.validate-form .input100').each(function() {
    $(this).focus(function() {
      hideValidate(this);
    });
  });

  function validate(input) {
    if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
      if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
        return false;
      }
    } else {
      if ($(input).val().trim() == '') {
        return false;
      }
    }
  }

  function showValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).addClass('alert-validate');
  }

  function hideValidate(input) {
    var thisAlert = $(input).parent();

    $(thisAlert).removeClass('alert-validate');
  }

  function sendForm(data) {
    $.ajax({
        method: "POST",
        url: "/login",
        data: data
      })
      .done(function(response) {
       if (response.status) {
        window.location.href = '/administrator'
       }
      });
  }

  $('#login').click(function() {
    var fields = [];
    var data = {};
    if (validField()) {
      for (var i = 0; i < input.length; i++) {
        fields.push($(input[i]).val());
        hideValidate(input[i]);
      }
      data.email = fields[0];
      data.password = fields[1];

      sendForm(data)
    }

  })



})(jQuery);
