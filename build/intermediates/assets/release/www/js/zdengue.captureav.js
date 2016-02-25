var myVideoInBase64 = '';
var captureav = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener("deviceready", this.fOnDeviceReady, false);
        btnVideo.addEventListener("click", this.fStartCapture, false);
    },
    fOnDeviceReady: function(){
		console.log('INFOAPP: CaptureAV ' + navigator.device.capture);
    },
    fCaptureSuccess: function(mediaFiles) {
        $("#btnPhoto").hide();
        var v = "<video id='myVideoId' poster='css/images/ic_launcher.png' width='100%' controls autoplay muted loop>" +
                    "<source src='" + mediaFiles[0].fullPath + "' type='video/mp4'>" +
                 "</video>";
        $("#divFoto").html(v);
        $("#btnRemMyVideo").show();
        $("#divFoto").show();
        btnRemMyVideo.addEventListener('click', captureav.fRemoveVideo, false);
        var myfile = mediaFiles[0].fullPath;
        if (myfile){
            var videoFile = mediaFiles[0], fileReader = new FileReader(), file;
            fileReader.onload = function(readerEvt) {
                var base64 = readerEvt.target.result;
                myVideoInBase64 = base64;
            };
            file = new window.File(videoFile.name,
                                   videoFile.localURL,
                                   videoFile.type,
                                   videoFile.lastModifiedDate,
                                   videoFile.size);
            fileReader.readAsDataURL(file);
        }
    },
    fCaptureError: function(error) {
        if(error.code != '3')
            navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
    },
    fStartCapture: function(){
        console.log('INFOAPP: CaptureAV - Start');
        var captureOptions = { limit: 1, duration: 15 };
        navigator.device.capture.captureVideo(captureav.fCaptureSuccess, captureav.fCaptureError, captureOptions);
    },
    fRemoveVideo: function(){
        common.fNotification(window.localStorage.getItem('remfoto'), 'confirm', captureav.fConfirmRemoveVideo);
    },
    fConfirmRemoveVideo: function(buttonIndex){
        if(buttonIndex == 1){
            $("#smallImage").attr('src', null);
            $("#divFoto").hide();
            $("#btnPhoto").show().trigger('pagecreate');
            $("#btnRemMyVideo").hide();
        }
    },
    fail: function(error){
        alert(error.message);
    }
};
captureav.initialize();