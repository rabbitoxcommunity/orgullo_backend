$(document).ready(function($) {
    $.validator.addMethod('filesize', function (value, element, param) {
        return this.optional(element) || (element.files[0].size <= param * 1000000)
    }, 'File size must be less than {1} MB');

    $("#tt-contact-form").validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true
            },
            subject: {
                required: true
            },
            message: {
                required: true
            },

        },
        messages: {
            image: {
                required: "Please upload a JPG, JPEG or PNG image.",
                accept: "Only image files are supported. Please upload a valid image file (e.g., JPG, JPEG, PNG).",
                filesize: "The file size must be 1 MB or less.",
            },
        },

        submitHandler: function(form) {
            $("#enquiry-button").prop('disabled', true);
            var form = $('#tt-contact-form')[0];
            var formData = new FormData(form);
            
            $.ajax({
                url: base_url+'submit-enquiry',
                type: 'POST',
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
                            window.location.reload();
                        }, 2000);
                    }else{
                        $('#blog-form')[0].reset();
                        $('#response-modal').css('display', 'block').addClass('alert-danger');
                        $("#response-modal").html(data['message']);
                        window.scrollTo(0, 0);
                        setTimeout(function() { 
                            $("#enquiry-button").prop('disabled', false);
                        }, 2000);
                    }
                },
                error: function (data) {
                    $('#response-modal').css('display', 'block').addClass('alert-danger');
                    $("#response-modal").html(data['message']);
                    setTimeout(function() { 
                        $("#enquiry-button").prop('disabled', false);
                    }, 2000);
                }
            });
        }
    });
});