(function ($) {
    Drupal.behaviors.trackduckInit = {

        attach: function() {
            var TrackDuck = {};

            TrackDuck.createCORSRequest = function(url) {
                var xhr;
                $.ajax({
                    url: url,
                    dataType: 'json',
                    type: 'GET',
                    /*beforeSend: function(xhr){
                        xhr.withCredentials = true
                    },*/
                    xhrFields: { withCredentials: true },
                    async: false,
                    crossDomain: true,
                    complete: function(request, statusText){
                        //console.log(xhr);
                        xhr = request;
                    }
                });
                return xhr;
            };

            TrackDuck.getSettings = function (my_href, redirect){
                var url = 'https://app.trackduck.com/api/bar/settings/?url=' + encodeURIComponent(my_href);
                var xhr = TrackDuck.createCORSRequest(url);
                //console.log(xhr);
                TrackDuck.xhr = xhr;

                if (xhr === null) {
                    alert('Please, update your browser. Currently we support all modern browsers and IE 10+','trackduck');
                    return false;
                }

                //console.log(xhr);
                
                // Response handlers.
                if (xhr.status === 200) {
                    if (!$('#trackduck_active').val()){
                        var resp = JSON.parse(xhr.responseText);
                        $('#trackduck_id').val(resp.projectId);
                        $('#trackduck_active').val(1);
                        $("#edit-submit").trigger("click");
                    }
                    //console.log(xhr.status);
                }
                else if(xhr.status === 403){
                    //console.log(xhr.status);

                    $('#td-enable-container').show();
                    $(document).on('click', "#trackduck-enable", function(e){
                        TrackDuck.getSettings(Drupal.settings.trackduckSettings.projectUrl, $(this).attr("href"));
                        //console.log(TrackDuck.xhr);
                        if (TrackDuck.xhr.status=="403") {
                            // go to TrackDuck
                        } else {
                            e.preventDefault();
                        }
                    });
                }
                else if(xhr.status === 401){
                    $('#td-login-container').show();
                    $('#td-enable-container').hide();
                }
                else {
                    console.log(xhr);
                    console.log('TD API Exception status:'+ xhr.status, {responseText: xhr.responseText});
                }
                return xhr.status;

            };


            if (!$('#trackduck_id').val()){
                //console.log($('#trackduck_id').val())
                TrackDuck.getSettings(Drupal.settings.trackduckSettings.projectUrl);
            } else if (!$('#trackduck_active').val()){
                if ($('#td-enable-container').is(':hidden')) {
                    $('#td-enable-container').show();
                    $(document).on('click', "#trackduck-enable", function(e){
                        TrackDuck.getSettings(Drupal.settings.trackduckSettings.projectUrl, $(this).attr("href"));
                        //console.log(TrackDuck.xhr);
                        if (TrackDuck.xhr.status=="403") {
                            // go to TrackDuck
                        } else {
                            e.preventDefault();
                        }
                    });
                }
            } else {
                console.log($('#trackduck_id').val());
                $('#td-disable-container').show();
                $('#trackduck-disable').click(function(){
                    $('#trackduck_active').val('');
                    $("#edit-submit").trigger("click");
                });
            }

            $(document).ready(function(){
                if ($('#trackduck_id').val() && $('#trackduck_active').val()) {
                navigator.sayswho= (function(){
                    var ua= navigator.userAgent,
                        N= navigator.appName, tem,
                        M= ua.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*([\d\.]+)/i) || [];
                    M= M[2]? [M[1], M[2]]:[N, navigator.appVersion, '-?'];
                    return M[0];
                })();
                if(navigator.sayswho=="Chrome"){$('#trackduck-firefox').hide();}
                    if(navigator.sayswho=="Firefox"){
                        $('#trackduck-chrome').hide();}
                    }
                });
        }
    }
})(jQuery);