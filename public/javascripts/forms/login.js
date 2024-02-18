$(document).ready(function($) {
    $.validator.addMethod('filesize', function (value, element, param) {
        return this.optional(element) || (element.files[0].size <= param * 1000000)
    }, 'File size must be less than {1} MB');

    $("#login-form").validate({
        rules: {
            email: {
                required: true,
                email: true
            },
            password: {
                required: true
            },
        },

        submitHandler: function(form) {
            $("#login-button").prop('disabled', true);
            var form = $('#login-form')[0];
            var formData = new FormData(form);
            $.ajax({
                url: base_url+'login',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                success: function (data) {      
                    console.log(data);       
                    if(data.success){
                        $('#response-modal').css('display', 'block');
                        $('#response-modal').css('display', 'block').addClass('alert-primary');
                        $('#response-modal').html(data['message'])
                        window.scrollTo(0, 0);
                        var token = data.accessToken;
                        // var ownerId = data['data']['ownerId']
                        var date = new Date();
                        date.setTime(date.getTime() + (1*24*60*60*1000));
                        document.cookie = `token=${token};expires=${date.toUTCString()};path=/` 
                        localStorage.setItem("token", token);
                        localStorage.setItem("user_token", Math.floor((Math.random() * 100) + 1));
                        setTimeout(function() { 
                            window.location.href = base_url+'admin';
                        }, 1000);
                    }else{
                        // $('#login-form')[0].reset();
                        $('#response-modal').css('display', 'block');
                        $('#response-modal').css('display', 'block').addClass('alert-danger');
                        $("#response-modal").html(data['message']);
                        window.scrollTo(0, 0);
                        setTimeout(function() { 
                            $('#response-modal').css('display', 'none').removeClass('alert-danger');
                            $("#login-button").prop('disabled', false);
                        }, 1000);
                    }
                },
                error: function (data) {
                    $('#login-form')[0].reset();
                    $('#response-modal').css('display', 'block');
                    $('#response-modal').css('display', 'block').addClass('alert-danger');
                    $("#response-modal").html(data.responseJSON.message);
                    setTimeout(function() { 
                        $('#response-modal').css('display', 'none').removeClass('alert-danger');
                        $("#login-button").prop('disabled', false);
                    }, 1000);
                }
            });
        }
    });
});