var index = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener("deviceready", this.fOnDeviceReady, false);
        btnNewReport.addEventListener('click', this.fNewReport, false);
        btnNewReportList.addEventListener('click', this.fNewReport, false);
        btnMyReports.addEventListener('click', this.fMyReports, false);
        btnFeedReports.addEventListener("click", this.fFeed, false);
        btnMyRegister.addEventListener('click', this.fMyRegister, false);
        btnExit.addEventListener('click', this.fExit, false);
    },
    fOnDeviceReady: function(){
        //TODO - Montar Carregamento de Algo no load da INDEX
        //alert(window.localStorage.getItem('fbtoken'));
    },
    fNewReport: function(){
        $.mobile.loading('show', { text: window.localStorage.getItem('aguarde'), textVisible: true, theme: 'a', textonly: false, html: '' });
        navigator.geolocation.getCurrentPosition(denuncia.onSuccessGeolocation, denuncia.fFailGPS, { enableHighAccuracy: true, timeout: 15000 });
        $('#imgHeaderDenuncia').attr('src', "css/images/denguezerocidadao_header_" + window.localStorage.getItem('language') + ".png");
        $('#lblDenuncia').html(window.localStorage.getItem('lbl_denuncia'));
        $('#textDenuncia').html(window.localStorage.getItem('text_denuncia'));
        $('#lblDenunciaAnonima').html(window.localStorage.getItem('denunciaanonima'));
        $('#lblEndereco').html(window.localStorage.getItem('endcompl') + ':');
        $('#lblAmostra').html(window.localStorage.getItem('tpamostra') + ':');
        $('#lblOutrosTipos').html(window.localStorage.getItem('outrostipos'));
        $('#lblCaracteristicas').html(window.localStorage.getItem('caracteristicas'));
        $('#lblLarvas').html(window.localStorage.getItem('larvas'));
        $('#lblVetor').html(window.localStorage.getItem('vetor'));
        $('#lblAgua').html(window.localStorage.getItem('agua'));
        $('#lblPhoto').html(window.localStorage.getItem('lbl_foto'));
        $('#btnPhoto').html(window.localStorage.getItem('btn_foto'));
        $('#btnRemPhoto').html(window.localStorage.getItem('btn_remfoto'));
        $('#btnSend').html(window.localStorage.getItem('btn_enviar'));
        $('#btnBack').html(window.localStorage.getItem('btn_voltar'));
        $('#lblDenunciarComo').html(window.localStorage.getItem('denunciarcomo') + '<br>&#9427;' + window.localStorage.getItem('apelido'));
        if(window.localStorage.getItem('foto') == null){
         $('#userPicUser').attr('src', 'css/images/semfoto.png');
        }else{
         $('#userPicUser').attr('src', window.localStorage.getItem('foto'));
        }
    },
    fMyReports: function(){
        edit = true;
        $.mobile.loading('show', { text: window.localStorage.getItem('aguarde'), textVisible: true, theme: 'a', textonly: false, html: '' });
        denuncia.fLoadMyReportsList();
    },
    fFeed: function(){
        console.log('INFOAPP: Feed');
         $('.jscroll').jscroll({
            debug: true,
            loadingHtml: '<div style="text-align:center"><img src="css/images/495.GIF" alt="loading"></div>',
            padding: 30
        });
        $.mobile.changePage('#timelinePage');
    },
    fMap: function(){
        navigator.notification.activityStart("DengueZero", window.localStorage.getItem('aguarde'));
    },
    fMyRegister: function(){
        edit = true;
        $.mobile.loading('show', { text: window.localStorage.getItem('aguarde'), textVisible: true, theme: 'a', textonly: false, html: '' });
        $('#imgHeaderCadastro').attr('src', "css/images/denguezerocidadao_header_" + window.localStorage.getItem('language') + ".png");
        $('#lblCadastro').html(window.localStorage.getItem('lbl_cadastro'));
        $('#textCadastro').html(window.localStorage.getItem('text_cadastro'));
        $('#lblNome').html(window.localStorage.getItem('nomecompl') + ':');
        $('#lblApelido').html(window.localStorage.getItem('seuapelido') + ':');
        $('#lblSenha2').html(window.localStorage.getItem('suasenha') + ':');
        $('#lblCSenha').html(window.localStorage.getItem('confsenha') + ':');
        $('#text-nome').val(window.localStorage.getItem('nome'));
        $('#text-apelido').val(window.localStorage.getItem('apelido'));
        $('#text-email2').val(window.localStorage.getItem('email'));
        $('#btnSave').html(window.localStorage.getItem('btn_salvar'));
        $('#btnLogout').html(window.localStorage.getItem('btn_logout'));
        $('#btnLogoutFB').html(window.localStorage.getItem('btn_logoutfb'));
        $('#btnBackCadastro').html(window.localStorage.getItem('btn_voltar'));
        $('#btnMyPhoto').html(window.localStorage.getItem('btn_minhafoto'));
        if(edit == true){
            $('#text-apelido').attr('disabled', 'disabled');
            $('#text-email2').attr('disabled', 'disabled');
            if(window.localStorage.getItem('fbtoken') == null){
                $('#btnLogoutFB').hide();
                $('#btnLogout').html(window.localStorage.getItem('btn_logout'));
            }else{
                $('#btnLogoutFb').html(window.localStorage.getItem('btn_logoutfb'));
                $('#text-senha2').attr('disabled', 'disabled');
                $('#text-csenha').attr('disabled', 'disabled');
                $('#btnLogout').hide();
                $('#btnSave').hide();
            }
        }
        if(window.localStorage.getItem("foto") != null){
            $('#divFoto2').show();
            $('#smallImage2').attr('src', window.localStorage.getItem("foto"));
            $('#btnRemMyPhoto').html(window.localStorage.getItem('btn_remfoto'));
            $('#btnMyPhoto').hide();
        }
        console.log('INFOAPP: CADASTRO');
        $.mobile.changePage('#myregisterPage', {changeHash: false});
     },
    fExit: function(){
        navigator.app.exitApp();
	    //common.fNotification(window.localStorage.getItem('sairapp'), 'confirm', index.fConfirmExit);
    },
    fConfirmExit: function(buttonIndex){
        if(buttonIndex == 1)
            navigator.app.exitApp();
    }
};
index.initialize();