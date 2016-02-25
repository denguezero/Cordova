var login = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener("deviceready", this.fVerifyLogin, false);
        btnSignUp.addEventListener('click', this.fSignUp, false);
        btnSignIn.addEventListener('click', this.fSignIn, false);
    },
    fVerifyLogin: function(){
        if((window.localStorage.getItem('email') != null || window.localStorage.getItem('fbtoken') != null) && window.localStorage.getItem('localizando') != null){
            $.mobile.loading('show', { text: window.localStorage.getItem('aguarde'), textVisible: true, theme: 'a', textonly: false, html: '' });
            $('#imgHeaderIndex').attr('src', "css/images/denguezerocidadao_header_" + window.localStorage.getItem('language') + ".png");
			$('#userName').html('&#9427;' + window.localStorage.getItem('apelido').substr(0,20));
			//$('#lblJuntos').html('"' + window.localStorage.getItem('juntos') + '"');
			$('#btnNewReport').html(window.localStorage.getItem('btn_novo'));
			$('#btnMyReports').html(window.localStorage.getItem('btn_denuncias'));
			$('#btnFeedReports').html(window.localStorage.getItem('btn_feed'));
			$('#btnMap').html(window.localStorage.getItem('btn_mapa'));
			$('#btnMyRegister').html(window.localStorage.getItem('btn_meucad'));
			$('#btnExit').html(window.localStorage.getItem('btn_sair'));
			if(window.localStorage.getItem('foto') == null){
				$('#userPic').attr('src', 'css/images/semfoto.png');
			}else{
				$('#userPic').attr('src', window.localStorage.getItem('foto'));
			}
			console.log('INFOAPP: INDEX');
            $.mobile.changePage('#indexPage'/*, {changeHash: false}*/);
        }else{
            if(window.localStorage.getItem('language') == null || window.localStorage.getItem('localizando') == null){
               console.log('INFOAPP: LANGUAGE');
               $.mobile.changePage('#languagePage');
            }else{
            	$('#imgLogo').attr('src', "css/images/icone_" + window.localStorage.getItem('language') + ".png");
                $('#btnSignUp').html(window.localStorage.getItem('btn_novocad'));
                $('#btnSignIn').html(window.localStorage.getItem('btn_entrar'));
                $('#btnFBLabel').html(window.localStorage.getItem('btn_entrarfb'));
                $('#lblSenha').html(window.localStorage.getItem('suasenha') + ':');
                $('#form-login').show();
            }
        }
    },
    fSignIn: function() {
        var form = $("#form-login");
        	var text_email = $("#text-email", form).val();
        	var text_senha = $("#text-senha", form).val();
        	if(text_email == '' || text_senha == ''){
        	    console.log('INFOAPP: Informe seus Dados');
        		common.fNotification(window.localStorage.getItem('informedados'), 'alert', null);
        	    $.mobile.loading('hide');
        	}else{
        	    console.log('INFOAPP: Consultando Login');
        		$.mobile.loading('show', { text: window.localStorage.getItem('aguarde'), textVisible: true, theme: 'a', textonly: false, html: '' });
        		$.ajax({
        		     url: urlDengueZero,
        		  method: "POST",
        		    data: ({ email: text_email,
        		    		 senha: text_senha,
        		    		 action: "login" }),
        		dataType: "json",
        	    success: function(json){
        					  if(json.retorn == 'ok'){
        						  window.localStorage.setItem('nome', json.nome);
        						  window.localStorage.setItem('apelido', json.apelido);
        						  window.localStorage.setItem('email', json.email);
        						  if(json.foto != '')
        						  	window.localStorage.setItem('foto', json.foto);
        						  window.localStorage.removeItem('fbtoken');
        						  common.fNotification(window.localStorage.getItem('bemvindo') + ' ' + json.apelido + '!', 'alert', null);
        						  console.log('INFOAPP: Login OK');
        						  $.mobile.loading('hide');
        						  location.href="main.html";
        					  }else if(json.retorn == 'error'){
        					      console.log('INFOAPP: Login Incorreto');
        						  common.fNotification(window.localStorage.getItem('dadosincorretos'), 'alert', null);
        						  $.mobile.loading('hide');
        					  }
        				},
        		 error: function(xhr, ajaxOptions, thrownError){
        		             console.log('INFOAPP: Erro Conexao com Servidor ' + xhr.message);
        					 common.fNotification(window.localStorage.getItem('erroacesso'), 'alert', null);
        				     $.mobile.loading('hide');
        			    }
        		});
        	}
    },
    fSignUp: function(){
        $.mobile.loading('show', { text: window.localStorage.getItem('aguarde'), textVisible: true, theme: 'a', textonly: false, html: '' });
    	edit = false;
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
		$('#btnRemMyPhoto').html(window.localStorage.getItem('btn_remfoto'));
		$('#btnLogout').hide();
		$('#btnLogoutFB').hide();
		$.mobile.changePage('#myregisterPage', {changeHash: false});
    	console.log('INFOAPP: Carregar Novo Cadastro');
    }
};
login.initialize();