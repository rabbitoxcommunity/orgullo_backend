$(document).ready(function($) {
    $.validator.addMethod('filesize', function (value, element, param) {
        return this.optional(element) || (element.files[0].size <= param * 1000000)
    }, 'File size must be less than {1} MB');

    $("#backstage-form").validate({
        rules: {
            title: {
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
            $("#backstage-button").prop('disabled', true);
            var form = $('#backstage-form')[0];
            var formData = new FormData(form);

            let http_type;
            if($('#id').val()){
                http_type = 'PUT'
            }else{
                http_type = 'POST'
            }

            $.ajax({
                url: base_url+'admin/backstage',
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
                            window.location.href = base_url+'admin/manage-backstage';
                        }, 2000);
                    }else{
                        $('#blog-form')[0].reset();
                        $('#response-modal').css('display', 'block').addClass('alert-danger');
                        $("#response-modal").html(data['message']);
                        window.scrollTo(0, 0);
                        setTimeout(function() { 
                            $("#backstage-button").prop('disabled', false);
                        }, 2000);
                    }
                },
                error: function (data) {
                    $('#response-modal').css('display', 'block').addClass('alert-danger');
                    $("#response-modal").html(data['message']);
                    setTimeout(function() { 
                        $("#backstage-button").prop('disabled', false);
                    }, 2000);
                }
            });
        }
    });
});