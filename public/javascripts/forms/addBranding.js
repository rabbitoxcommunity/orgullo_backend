$(document).ready(function($) {
    $.validator.addMethod('filesize', function (value, element, param) {
        return this.optional(element) || (element.files[0].size <= param * 1000000)
    }, 'File size must be less than {1} MB');

    $("#branding-form").validate({
        rules: {
            title: {
                required: true
            },
            subtitle: {
                required: true
            },
            about: {
                required: true
            },
            desc: {
                required: false
            },
            banner: {
                required:($('#id').val())?false:true,
                accept: "jpg,jpeg,png",
                filesize: 10,
            },
        },
        messages: {
            image: {
                required: "Please upload a JPG, JPEG or PNG image.",
                accept: "Only image files are supported. Please upload a valid image file (e.g., JPG, JPEG, PNG).",
                filesize: "The file size must be 10 MB or less.",
            },
        },

        submitHandler: function(form) {
            $("#branding-button").prop('disabled', true);
            $("#spinner-loader").css('display', 'block');
            var form = $('#branding-form')[0];
            var formData = new FormData(form);

            let http_type;
            if($('#id').val()){
                http_type = 'PUT'
            }else{
                http_type = 'POST'
            }

            $.ajax({
                url: base_url+'admin/branding',
                type: http_type,
                data: formData,
                processData: false,
                contentType: false,
                cache: false,
                success: function (data) {             
                    if(data.success){
                        $('#response-modal').css('display', 'block');
                        $('#response-modal').css('display', 'block').addClass('alert-primary');
                        $('#response-modal').html(data['message'])
                        window.scrollTo(0, 0);
                        setTimeout(function() { 
                            window.location.href = base_url+'admin/manage-branding';
                        }, 1000);
                    }else{
                        $('#branding-form')[0].reset();
                        $('#response-modal').css('display', 'block').addClass('alert-danger');
                        $("#response-modal").html(data['message']);
                        window.scrollTo(0, 0);
                        setTimeout(function() { 
                            $('#response-modal').css('display', 'none').removeClass('alert-danger');
                            $("#branding-button").prop('disabled', false);
                        }, 1000);
                    }
                },
                error: function (data) {
                    $('#response-modal').css('display', 'block').addClass('alert-danger');
                    $("#response-modal").html(data.responseJSON.message);
                    setTimeout(function() { 
                        $('#response-modal').css('display', 'none').removeClass('alert-danger');
                        $("#branding-button").prop('disabled', false);
                    }, 1000);
                }
            });
        }
    });
});