var cadastro = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener("deviceready", this.fOnDeviceReady, false);
        btnSave.addEventListener('click', this.fSave, false);
        btnLogout.addEventListener('click', this.fLogout, false);
        btnLogoutFB.addEventListener('click', this.fLogoutFB, false);
    },
    fOnDeviceReady: function(){
		//navigator.geolocation.getCurrentPosition(denuncia.onSuccessGeolocation, denuncia.fFailGPS, { enableHighAccuracy: true, timeout: 15000 });
    },
    fCheckSignUpForm: function(){
    	validation = '';
    	valid = true;
    	var nome_campo = '';
    	var form = $("#form-cadastro");
    	var text_nome = $("#text-nome", form).val();
    	var text_apelido = $("#text-apelido", form).val();
    	var text_email = $("#text-email2", form).val();
    	var text_senha = $("#text-senha2", form).val();
    	var text_csenha = $("#text-csenha", form).val();
        if(text_nome.trim() == ''){
        	valid = false;
        	nome_campo += window.localStorage.getItem('nomecompl') + ';\r\n';
        }
        if(text_apelido.trim() == ''){
        	valid = false;
        	nome_campo += window.localStorage.getItem('seuapelido') + ';\r\n';
        }
        if(text_email.trim() == ''){
        	valid = false;
        	nome_campo += window.localStorage.getItem('seuemail') + ';\r\n';
        }
        if(common.fCheckEmail(text_email) == false && text_email != ''){
        	valid = false;
        	nome_campo += window.localStorage.getItem('emailinvalido') + ';\r\n';
        }
        if(text_senha.trim() == ''){
        	valid = false;
        	nome_campo += window.localStorage.getItem('suasenha') + ';\r\n';
        }
        if(text_csenha.trim() == ''){
        	valid = false;
        	nome_campo += window.localStorage.getItem('confsenha') + ';\r\n';
        }
        if(text_senha != text_csenha){
        	valid = false;
        	nome_campo += window.localStorage.getItem('senhasconf') + '\r\n';
        }
        if(valid == false){
        	validation = window.localStorage.getItem('obrigatorios') + ':\r\n\r\n' + nome_campo;
        }
    },
    fSave: function(){
    	$.mobile.loading('show', { text: window.localStorage.getItem('aguarde'), textVisible: true, theme: 'a', textonly: false, html: '' });
    	cadastro.fCheckSignUpForm();
    	if(valid == true){
    		var form = $("#form-cadastro");
    		var text_nome = $("#text-nome", form).val();
    		var text_apelido = $("#text-apelido", form).val();
    		var text_email = $("#text-email2", form).val();
    		var text_senha = $("#text-senha2", form).val();
    		var text_csenha = $("#text-csenha", form).val();
    		var foto_usuario = $("#smallImage2", form).attr('src');
    		$.mobile.loading('show', { text: window.localStorage.getItem('aguarde'), textVisible: true, theme: 'a', textonly: false, html: '' });
    		$.ajax({
    		     url: urlDengueZero,
    		  method: "POST",
    		    data: ({ nome: text_nome,
    		    		 apelido: text_apelido,
    		    		 email: text_email,
    		    		 senha: text_senha,
    		    		  foto: (foto_usuario == null ? null : foto_usuario),
    		    		editar: (edit == false ? 'nao' : 'sim'),
    		    		 action: "cadastro" }),
    		dataType: "json",
    	    success: function(json){
    					  if(json.retorn == 'ok'){
    						  window.localStorage.setItem('nome', text_nome);
    						  window.localStorage.setItem('apelido', text_apelido);
    						  window.localStorage.setItem('email', text_email);
    						  if(foto_usuario != null)
    						  	window.localStorage.setItem('foto', foto_usuario);
    						  //window.localStorage.removeItem('fbtoken');
    						  if(edit == false)
    						  	common.fNotification(window.localStorage.getItem('bemvindo') + ' ' + text_apelido + '!', 'alert', null);
    						  $.mobile.loading('hide');
    						  edit = false;
    						  location.href="main.html";
    					  }else if(json.retorn == 'apelido'){
    						  common.fNotification(window.localStorage.getItem('apelidocadastrado'), 'alert', null);
    						  $.mobile.loading('hide');
    					  }else if(json.retorn == 'email'){
    						  common.fNotification(window.localStorage.getItem('emailcadastrado'), 'alert', null);
    						  $.mobile.loading('hide');
    					  }else{
    						 common.fNotification(window.localStorage.getItem('errocadastro'), 'alert', null);
    					     $.mobile.loading('hide');
    					  }
    				  },
    		 error: function(xhr, ajaxOptions, thrownError){
    					 common.fNotification(window.localStorage.getItem('errocadastro') + xhr.description, 'alert', null);
    				     $.mobile.loading('hide');
    			  }
    		});
    	}else{
    		common.fNotification(validation, 'alert', null);
    		$.mobile.loading('hide');
    	}
    },
    fLogout: function(){
    	common.fNotification(window.localStorage.getItem('confirmlogout'), 'confirm', cadastro.fConfirmLogout);
    },
    fConfirmLogout: function(buttonIndex){
    	if(buttonIndex == 1){
    		$.mobile.loading('show', { text: window.localStorage.getItem('aguarde'), textVisible: true, theme: 'a', textonly: false, html: '' });
    		if(window.localStorage.getItem('fbtoken') != null){
				facebook.logout();
    		}
    		window.localStorage.removeItem('nome');
    		window.localStorage.removeItem('apelido');
    		window.localStorage.removeItem('email');
    		window.localStorage.removeItem('foto');
    		location.href="main.html";
    	}
    },
    fLogoutFB: function(){
		common.fNotification(window.localStorage.getItem('confirmlogout'), 'confirm', cadastro.fConfirmLogout);
    }
};
cadastro.initialize();