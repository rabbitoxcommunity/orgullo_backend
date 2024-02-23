$(document).ready(function($) {
    $.validator.addMethod('filesize', function (value, element, param) {
        return this.optional(element) || (element.files[0].size <= param * 1000000)
    }, 'File size must be less than {1} MB');

    $("#deleteButton").on("click", function() {
        if (confirm("Are you sure you want to delete?")) {
            $.ajax({
                url: base_url+'admin/media/' + $('#id').val(),
                type: "DELETE",
                success: function(response) {
                    console.log("Delete successful", response);
                },
                error: function(error) {
                    console.error("Error deleting", error);
                }
            });
        }
    });

    $("#media-form").validate({
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
            url: {
                required: true
            },
            thumbnail: {
                required: true
            }

        },
        messages: {
            image: {
                required: "Please upload a JPG, JPEG or PNG image.",
                accept: "Only image files are supported. Please upload a valid image file (e.g., JPG, JPEG, PNG).",
                filesize: "The file size must be 1 MB or less.",
            },
        },

        submitHandler: function(form) {
            $("#media-button").prop('disabled', true);
            var form = $('#media-form')[0];
            var formData = new FormData(form);

            let http_type;
            if($('#id').val()){
                http_type = 'PUT'
            }else{
                http_type = 'POST'
            }

            $.ajax({
                url: base_url+'admin/media',
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
                            window.location.href = base_url+'admin/manage-media';
                        }, 1000);
                    }else{
                        $('#media-form')[0].reset();
                        $('#response-modal').css('display', 'block').addClass('alert-danger');
                        $("#response-modal").html(data['message']);
                        window.scrollTo(0, 0);
                        setTimeout(function() { 
                            $('#response-modal').css('display', 'none').removeClass('alert-danger');
                            $("#media-button").prop('disabled', false);
                        }, 1000);
                    }
                },
                error: function (data) {
                    $('#response-modal').css('display', 'block').addClass('alert-danger');
                    $("#response-modal").html(data.responseJSON.message);
                    setTimeout(function() { 
                        $('#response-modal').css('display', 'none').removeClass('alert-danger');
                        $("#media-button").prop('disabled', false);
                    }, 1000);
                }
            });
        }
    });
});