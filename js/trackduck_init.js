(function ($) {
    Drupal.behaviors.trackduckInit = {

        attach: function() {
            var TrackDuck = {};

            TrackDuck.getStatus = function(withInterval) {
                var trackduckSettings = Drupal.settings.trackduckSettings;
                var url = 'https://app.trackduck.com/api/bar/settings/?url=' + encodeURIComponent(trackduckSettings.url);
                $.ajax({
                    url: url,
                    dataType: 'json',
                    type: 'GET',
                    beforeSend: function(xhr){
                        xhr.withCredentials = true
                    },
                    xhrFields : {
                        withCredentials: true
                    },
                    crossDomain: true,
                    success: function(xhr){
                        if (withInterval == true) { //if project created, clear interval
                            clearInterval(TrackDuck.checkStatus);
                        }

                        if (trackduckSettings.status == 3 && trackduckSettings.id == "") { //if response is positive, save settings
                            $('#trackduck-active').val(1);
                            $('#trackduck-id').val(xhr.projectId);
                            $("#edit-submit").trigger("click");
                        } else if (trackduckSettings.status == 1 && trackduckSettings.id != "") { //show disable container if integration enabled
                            $('#td-disable-container').show();
                            navigator.sayswho = (function(){
                                var ua= navigator.userAgent,
                                    N= navigator.appName, tem,
                                    M= ua.match(/(opera|chrome|safari|firefox|msie|trident)\/?\s*([\d\.]+)/i) || [];
                                M= M[2]? [M[1], M[2]]:[N, navigator.appVersion, '-?'];
                                return M[0];
                            })();
                            if (navigator.sayswho=="Chrome"){
                                $('#trackduck-firefox').hide();
                            }
                            if (navigator.sayswho=="Firefox"){
                                $('#trackduck-chrome').hide();
                            }
                        } else if (trackduckSettings.status == 2 && trackduckSettings.id != "") { //show enable container if integration disabled
                            $('#td-enable-container').show();
                        }

                        if (trackduckSettings.id != xhr.projectId) { //if project id differs, set the new one
                            $('#trackduck-id').val(xhr.projectId);
                            $("#edit-submit").trigger("click");
                        }

                    },
                    error: function(xhr) {
                        if (xhr.status == 401) { //if not logged in
                            $('#td-login-container').show();
                        }
                        else if (xhr.status == 403) { //if logged in
                            if (trackduckSettings.status == 4) { //submit settings after logging in
                                $('#trackduck-active').val(3);
                                $("#edit-submit").trigger("click");
                            } else if (trackduckSettings.status == 3 && trackduckSettings.id == "") { //if logged in but there is no project created
                                $('#td-enable-container').show();
                            } else { //if logged in but project is deleted or trying to access other account's project
                                $('#trackduck-active').val(3);
                                $('#trackduck-id').val("");
                                $("#edit-submit").trigger("click");
                            }

                        }
                    }
                });
            };

            TrackDuck.getStatus(false);

            $("#trackduck-enable").click(function(e){
                var trackduckSettings = Drupal.settings.trackduckSettings;
                if (trackduckSettings.status == 2 && trackduckSettings.id != "") { //if disabled and has id, enable
                    $('#trackduck-active').val(1);
                    $("#edit-submit").trigger("click");
                    e.preventDefault();
                } else if (trackduckSettings.status == 3 && trackduckSettings.id == ""){ //if has no id, set interval and wait for id
                    TrackDuck.checkStatus = setInterval(function(){TrackDuck.getStatus(true)},5000);
                }
            });

            $('#trackduck-disable').click(function(e){
                $('#trackduck-active').val(2);
                $("#edit-submit").trigger("click");
                e.preventDefault();
            });
        }
    }
})(jQuery);