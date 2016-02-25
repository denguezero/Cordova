var pictureSource;
var destinationType;
var encodingType;
var pictureSourceSignin;
var destinationTypeSignin;
var encodingTypeSignin;
var foto = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function(){
    	document.addEventListener("deviceready", this.onDeviceReadyPhoto, false);
    	document.addEventListener("deviceready", this.onDeviceReadyPhotoSignin, false);
    	btnPhoto.addEventListener('click', this.fCapturePhoto, false);
    	btnRemPhoto.addEventListener('click', this.fRemovePhoto, false);
    	btnMyPhoto.addEventListener('click', this.fCapturePhotoSignin, false);
        btnRemMyPhoto.addEventListener('click', this.fRemovePhotoSignin, false);
    },
    onDeviceReadyPhoto: function() {
    	console.log('INFOAPP: CameraOK Denuncia');
    	pictureSource=navigator.camera.PictureSourceType;
    	destinationType=navigator.camera.DestinationType;

    },
    onDeviceReadyPhotoSignin: function() {
    	console.log('INFOAPP: CameraOK Cadastro');
    	pictureSourceSignin=navigator.camera.PictureSourceType;
    	destinationTypeSignin=navigator.camera.DestinationType;

    },
    onPhotoDataSuccess: function(imageData) {
    	var smallImage = document.getElementById('smallImage');
    	$("#btnPhoto").hide();
    	$("#divFoto").show();
    	smallImage.src = "data:image/jpeg;base64," + imageData;
    },
    onPhotoDataSuccessSignin: function(imageData) {
    	var smallImage = document.getElementById('smallImage2');
    	$("#btnMinhaFoto").hide();
    	$("#divFoto2").show();
    	smallImage.src = "data:image/jpeg;base64," + imageData;
    },
    fCapturePhoto: function() {
    	common.fNotification(window.localStorage.getItem('addfoto'), 'confirm', foto.fConfirmPhoto, window.localStorage.getItem('lblcamera'), window.localStorage.getItem('lblalbum'));
    },
    fCapturePhotoSignin: function() {
    	common.fNotification(window.localStorage.getItem('addfoto2'), 'confirm', foto.fConfirmPhotoSignin, window.localStorage.getItem('lblcamera'), window.localStorage.getItem('lblalbum'));
    },
    fConfirmPhoto: function(buttonIndex){
    	if(buttonIndex == 1){
    		navigator.camera.getPicture(foto.onPhotoDataSuccess, foto.onFail, { quality: 75,
    		destinationType: destinationType.DATA_URL,
    		targetWidth: 800,
    		targetHeight: 600,
    		correctOrientation: true });
    	}else{
    		navigator.camera.getPicture(foto.onPhotoDataSuccess, foto.onFail, { quality: 75,
			destinationType: destinationType.DATA_URL,
			sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
			targetWidth: 800,
			targetHeight: 600 });
    	}
    },
    fConfirmPhotoSignin: function(buttonIndex){
    	if(buttonIndex == 1){
    		navigator.camera.getPicture(foto.onPhotoDataSuccessSignin, foto.onFail, { quality: 75,
    		destinationType: destinationTypeSignin.DATA_URL,
    		sourceType : Camera.PictureSourceType.CAMERA,
    		targetWidth: 800,
    		targetHeight: 600,
    		cameraDirection: 1,
    		correctOrientation: true });
    	}else{
    		navigator.camera.getPicture(foto.onPhotoDataSuccessSignin, foto.onFail, { quality: 75,
    		destinationType: destinationTypeSignin.DATA_URL,
    		sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
    		targetWidth: 800,
    		targetHeight: 600 });
    	}
    },
    fRemovePhoto: function(){
    	common.fNotification(window.localStorage.getItem('remfoto'), 'confirm', foto.fConfirmRemovePhoto);
    },
    fRemovePhotoSignin: function(){
    	common.fNotification(window.localStorage.getItem('remfoto'), 'confirm', foto.fConfirmRemovePhotoSignin);
    },
    fConfirmRemovePhoto: function(buttonIndex){
    	if(buttonIndex == 1){
    		window.localStorage.removeItem("foto_amostra");
    		$("#smallImage").attr('src', null);
    		$("#divFoto").hide();
    		$("#btnPhoto").show().trigger('pagecreate');
    	}
    },
    fConfirmRemovePhotoSignin: function(buttonIndex){
    	if(buttonIndex == 1){
    		window.localStorage.removeItem("foto");
    		$("#smallImage2").attr('src', null);
    		$("#divFoto2").hide();
    		$("#btnMyPhoto").show().trigger('pagecreate');
    	}
    },
    onFail: function(message) {
    	if(message.trim() != 'Camera cancelled.' && message.trim() != 'Selection cancelled.')
    		alert(message);
    }
};
foto.initialize();