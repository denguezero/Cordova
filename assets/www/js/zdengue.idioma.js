var language;

var idioma = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener("deviceready", this.fOnDeviceReady, false);
        btnPortugues.addEventListener('click', this.fPortugues, false);
        btnEnglish.addEventListener('click', this.fEnglish, false);
        btnEspanol.addEventListener('click', this.fEspanol, false);
    },
    fOnDeviceReady: function(){
        console.log("INFOAPP: Carregado Idioma");
    },
    fPortugues: function(){
        idioma.fSetLanguage('pt');
    },
    fEnglish: function(){
        idioma.fSetLanguage('en');
    },
    fEspanol: function(){
        idioma.fSetLanguage('es');
    },
    fSetLanguage: function(lng){
        console.log("INFOAPP: " + lng);
        language = lng;
        if(lng == 'pt')
            common.fNotification('Configurar o idioma para Portugu\u00eas?', 'confirm', this.fConfirmLanguage, 'Sim', 'N\u00e3o', 'Portugu\u00eas');
        if(lng == 'en')
            common.fNotification('Set language to English?', 'confirm', this.fConfirmLanguage, 'Yes', 'No', 'English');
        if(lng == 'es')
            common.fNotification('Ajuste del idioma para Espa\u00f1ol?', 'confirm', this.fConfirmLanguage, 'Si', 'No', 'Espa\u00f1ol');
    },
    fConfirmLanguage: function(buttonIndex){
    	if(buttonIndex == 1){
    		var aguarde = (language == 'pt' ? 'Aguarde...' : (language == 'en' ? 'Wait...' : 'Espera...'));
    		$.mobile.loading('show', { text: aguarde, textVisible: true, theme: 'a', textonly: false, html: '' });
    		var localizando = (language == 'pt' ? 'Buscando sua Localiza&ccedil;&atilde;o...' : (language == 'en' ? 'Finding your location...' : 'Buscando su Localizaci&oacute;n...'));
    		var juntos = (language == 'pt' ? 'Juntos, no combate a Dengue!' : (language == 'en' ? 'Together in the fight against Dengue!' : 'Juntos para combatir el Dengue!'));
    		var lbl_cadastro = (language == 'pt' ? 'CADASTRO' : (language == 'en' ? 'SIGN UP' : 'CADASTRE'));
    		var lbl_denuncia = (language == 'pt' ? 'NOVA DEN&Uacute;NCIA' : (language == 'en' ? 'NEW REPORT' : 'NUEVA DENUNCIA'));
    		var coddenuncia = (language == 'pt' ? 'DEN&Uacute;NCIA' : (language == 'en' ? 'REPORT' : 'DENUNCIA'));
    		var lbl_foto = (language == 'pt' ? 'Foto Coletada:' : (language == 'en' ? 'Sample Photo:' : 'Foto Del Muestra:'));
    		var nenhumadenuncia = (language == 'pt' ? 'Nenhuma den&uacute;ncia encontrada!' : (language == 'en' ? 'No reports found!' : 'Ning&uacute;n denuncia encontrada!'));
    		var denunciaspendentes = (language == 'pt' ? 'Den&uacute;ncias Pendentes de Envio:' : (language == 'en' ? 'Reports Pending Submission:' : 'Denuncias pendientes de env&iacute;o:'));
    		var denunciasenviadas = (language == 'pt' ? 'Den&uacute;ncias Enviadas Anteriormente:' : (language == 'en' ? 'Sent Previously Reports:' : 'Denuncias enviadas previamente'));
    		var seminternet = (language == 'pt' ? 'Sem conex\u00e3o com a Internet. Tente novamente!' : (language == 'en' ? 'No Internet conection. Try again!' : 'Sin conecci\u00f3n con la Internet. Int\u00e9ntalo de nuevo!'));
    		var sualocalizacao = (language == 'pt' ? 'O endere\u00e7o da den\u00fancia \u00e9 pr\u00f3ximo de' : (language == 'en' ? 'The report address is near' : 'La direcci\u00f3n de la denuncia es pr\u00f3ximo de'));
    		var text_cadastro = (language == 'pt' ? 'Informe seu Nome, Apelido, E-Mail e a sua Senha para cadastro no Portal DengueZero:' : (language == 'en' ? 'Enter your Name, Nickname, E-Mail and Password to sign up on the Portal DengueZero:' : 'Ingrese su nombre, apodo, E-mail y su contrase&ntilde;a para inscribirse en lo Portal DengueZero:'));
    		var text_denuncia = (language == 'pt' ? 'Ao iniciar uma den&uacute;ncia de um poss&iacute;vel foco detectado, informe o endere&ccedil;o completo, o tipo espec&iacute;fico e as caracter&iacute;sticas detectadas do foco:' : (language == 'en' ? 'When you start a report of a possible detected focus, enter the full address, the specific type and the detected focus features:' : 'Al iniciar una queja de un posible foco detectado, introduzca la direcci&oacute;n completa, el tipo espec&iacute;fico y las caracter&iacute;sticas de enfoque detectados:'));
    		var nomecompl = (language == 'pt' ? 'Nome Completo' : (language == 'en' ? 'Full Name' : 'Nombre Completo'));
    		var seuapelido = (language == 'pt' ? 'Seu Apelido' : (language == 'en' ? 'Your Nickname' : 'Tu Apodo'));
    		var seuemail = (language == 'pt' ? 'Seu E-Mail' : (language == 'en' ? 'Your E-Mail' : 'Tu E-Mail'));
    		var emailinvalido = (language == 'pt' ? 'E-Mail inv\u00e1lido' : (language == 'en' ? 'Invalid E-Mail' : 'E-Mail inv\u00e1lido'));
    		var suasenha = (language == 'pt' ? 'Sua Senha' : (language == 'en' ? 'Your Password' : 'Tu Contrase\u00f1a'));
    		var confsenha = (language == 'pt' ? 'Confirme a Senha' : (language == 'en' ? 'Confirm Your Password' : 'Confirma Tu Contrase\u00f1a'));
    		var senhasconf = (language == 'pt' ? 'As senhas n\u00e3o conferem!' : (language == 'en' ? 'The passwords do not Match' : 'Las contrase\u00f1as no coinciden'));
    		var bemvindo = (language == 'pt' ? 'Bem Vindo(a) ao DengueZero Cidad\u00e3o' : (language == 'en' ? 'Welcome to DengueZero Citizen' : 'Bienvenido a DengueZero Ciudadano'));
    		var denunciaanonima = (language == 'pt' ? 'Den&uacute;ncia An&ocirc;nima' : (language == 'en' ? 'Anonymous Report' : 'Denuncia an&oacute;nima'));
    		var denunciarcomo = (language == 'pt' ? 'Denunciar como' : (language == 'en' ? 'Report as' : 'Denuncia como'));
    		var chkanonimo = (language == 'pt' ? 'Informe um modo de Den\u00fancia' : (language == 'en' ? 'Select at least one report mode' : 'Incluir al menos un modo de denuncia'));
    		var endcompl = (language == 'pt' ? 'Endere\u00e7o da Den\u00fancia' : (language == 'en' ? 'Report Address' : 'Direcci\u00f3n de la Denuncia'));
    		var tpamostra = (language == 'pt' ? 'Tipo da Amostra' : (language == 'en' ? 'Sample Type' : 'Tipo del Muestra'));
    		var outrostipos = (language == 'pt' ? 'Informe Outros Tipos:' : (language == 'en' ? 'Other Types:' : 'Otros tipos del Muestra:'));
    		var caracteristicas = (language == 'pt' ? 'Caracter&iacute;sticas:' : (language == 'en' ? 'Features:' : 'Caracter&iacute;sticas:'));
    		var larvas = (language == 'pt' ? 'Amostra Cont&eacute;m Larvas' : (language == 'en' ? 'Sample With Larvae' : 'Sample Con Larvas'));
    		var vetor = (language == 'pt' ? 'Amostra Cont&eacute;m Mosquito' : (language == 'en' ? 'Sample With Mosquito' : 'Muestra Con Mosquito'));
    		var agua = (language == 'pt' ? 'Amostra Cont&eacute;m &Aacute;gua' : (language == 'en' ? 'Sample With Water' : 'Muestra Con Agua'));
    		var clarvas = (language == 'pt' ? 'Larvas' : (language == 'en' ? 'Larvae' : 'Larvas'));
    		var cvetor = (language == 'pt' ? 'Mosquito' : (language == 'en' ? 'Mosquito' : 'Mosquito'));
    		var cagua = (language == 'pt' ? '&Aacute;gua' : (language == 'en' ? 'Water' : 'Agua'));
    		var foienviado = (language == 'pt' ? 'ENVIADO?' : (language == 'en' ? 'SENT?' : 'ENVIADO?'));
    		var foiinspecionado = (language == 'pt' ? 'INSPECIONADO?' : (language == 'en' ? 'INSPECTED?' : 'INSPECCIONADO?'));
    		var caract = (language == 'pt' ? 'Informe ao menos uma caracter\u00edstica' : (language == 'en' ? 'Type at least one feature' : 'Incluir al menos una caracter\u00edstica'));
    		var obrigatorios = (language == 'pt' ? 'Os seguintes campos s\u00e3o obrigat\u00f3rios' : (language == 'en' ? 'Required Fields' : 'Campos Requeridos'));
    		var confirmsend = (language == 'pt' ? 'Confirma enviar esta Den\u00fancia?' : (language == 'en' ? 'Confirm to send your report?' : 'Confirma enviar su denuncia?'));
    		var apelidocadastrado = (language == 'pt' ? 'Apelido j\u00e1 cadastrado. Informe outro Apelido.' : (language == 'en' ? 'Nickname already exists. Choice another Nickname' : 'Apodo ya registrado. Elige un nuevo Apodo'));
    		var emailcadastrado = (language == 'pt' ? 'E-mail j\u00e1 cadastrado. Informe outro E-Mail.' : (language == 'en' ? 'E-mail already exists. Choice another E-Mail' : 'E-mail ya registrada. Elige un nuevo E-Mail'));
    		var errocadastro = (language == 'pt' ? 'N\u00e3o foi possivel realizar seu cadastro! Tente Novamente.' : (language == 'en' ? 'Could not make your registration! Try again.' : 'No se ha podido mantener su registro! Int\u00e9ntalo de nuevo.'));
    		var informedados = (language == 'pt' ? 'Informe seus dados de acesso corretamente.' : (language == 'en' ? 'Enter your login details correctly.' : 'Introducir correctamente sus datos de acceso.'));
    		var dadosincorretos = (language == 'pt' ? 'Dados de acesso incorretos. Tente novamente.' : (language == 'en' ? 'Login Incorrect. Try again.' : 'Datos de acceso incorrectos. Int\u00e9ntalo de nuevo.'));
    		var erroacesso = (language == 'pt' ? 'N\u00e3o foi possivel verificar seu acesso! Tente Novamente.' : (language == 'en' ? 'Could not verify your access! Try again.' : 'No se pudo verificar su acceso! Int\u00e9ntalo de nuevo.'));
    		var sairapp = (language == 'pt' ? 'Deseja sair do Aplicativo DengueZero Cidad\u00e3o?' : (language == 'en' ? 'Are you sure you want to exit the DengueZero Citizen?' : 'Seguro que desea salir de DengueZero Ciudadano?'));
    		var enviando = (language == 'pt' ? 'Enviando Den\u00fancia...' : (language == 'en' ? 'Sending Report...' : ' Env\u00edo de Informe...'));
    		var enviado = (language == 'pt' ? 'Den\u00fancia enviada com sucesso!' : (language == 'en' ? 'The Report was sent!' : 'La denuncia fue enviada!'));
    		var erroenviar = (language == 'pt' ? 'N\u00e3o foi possivel enviar sua den\u00fancia! Tente Novamente.' : (language == 'en' ? 'Could not send your report! Try again.' : 'No se pudo enviar su informe! Int\u00e9ntalo de nuevo.'));
    		var denunciagravada = (language == 'pt' ? 'Sua den\u00fancia foi gravada mas n\u00e3o foi poss\u00edvel envi\u00e1-la agora.\r\nTente Novamente mais tarde!' : (language == 'en' ? 'Your report has been recorded but could not send it now.\r\nTry again later.' : 'Su denuncia ha sido registrado, pero no pudo enviar ahora. Int\u00e9ntalo de nuevo m\u00e1s tarde!'));
    		var reenviar = (language == 'pt' ? 'Confirma re-enviar esta den\u00fancia?' : (language == 'en' ? 'Are you sure you want to re-send this report?' : 'Confirma re-enviar este informe?'));
    		var sharefb = (language == 'pt' ? 'Deseja publicar esta den\u00fancia no seu Facebook?' : (language == 'en' ? 'Are you sure you want to share your report in Facebook?' : 'Confirma enviar este informe para tu Facebook?'));
    		var errogps = (language == 'pt' ? 'Falha ao obter sua localiza\u00e7\u00e3o. Verifique se o GPS esta ativo e tente novamente!' : (language == 'en' ? 'Failed to get your location. Make sure the GPS is active and try again!' : 'No se pudo obtener su ubicaci\u00f3n. Aseg\u00farese de que el GPS est\u00e1 activo y vuelve a intentarlo!'));
    		var alert_atencao = (language == 'pt' ? 'Aten\u00e7\u00e3o' : (language == 'en' ? 'Attention' : 'Atenci\u00f3n'));
    		var btn_iniciar = (language == 'pt' ? 'INICIAR' : (language == 'en' ? 'START' : 'INICIO'));
    		var lblcamera = (language == 'pt' ? 'TIRAR FOTO' : (language == 'en' ? ' TAKE PHOTO' : 'TIRAR FOTO'));
    		var lblvideo = (language == 'pt' ? 'GRAVAR VIDEO' : (language == 'en' ? 'RECORD VIDEO' : 'GRABAR VIDEO'));
    		var lblalbum = (language == 'pt' ? '\u00c1LBUM' : (language == 'en' ? 'ALBUM' : '\u00c1LBUM'));
    		var sim = (language == 'pt' ? 'SIM' : (language == 'en' ? 'YES' : 'SI'));
    		var nao = (language == 'pt' ? 'N&Atilde;O' : (language == 'en' ? 'NO' : 'NO'));
    		var btn_sim = (language == 'pt' ? 'Sim' : (language == 'en' ? 'Yes' : 'Si'));
    		var btn_nao = (language == 'pt' ? 'N\u00e3o' : (language == 'en' ? 'No' : 'No'));
    		var btn_salvar = (language == 'pt' ? 'SALVAR' : (language == 'en' ? 'SAVE' : 'GUARDAR'));
    		var btn_logout = (language == 'pt' ? 'FAZER LOGOUT' : (language == 'en' ? 'MAKE LOGOUT' : 'HACER LOGOUT'));
    		var btn_logoutfb = (language == 'pt' ? 'SAIR DO FACEBOOK' : (language == 'en' ? 'FACEBOOK LOGOUT' : 'SALIR DEL FACEBOOK'));
    		var confirmlogout = (language == 'pt' ? 'Deseja fazer logout?' : (language == 'en' ? 'Are you sure you want to logout?' : 'Seguro que quieres hacer logout?'));
    		var btn_voltar = (language == 'pt' ? 'VOLTAR' : (language == 'en' ? 'BACK' : 'VOLVER'));
    		var btn_foto = (language == 'pt' ? 'CARREGAR MIDIA' : (language == 'en' ? 'LOAD MEDIA' : 'A&Ntilde;ADIR MEDIA'));
    		var btn_minhafoto = (language == 'pt' ? 'MINHA FOTO' : (language == 'en' ? 'MY PHOTO' : 'MI FOTO'));
    		var addfoto = (language == 'pt' ? 'Qual midia deseja adicionar para esta den\u00fancia?\r\n\r\nUtilize a camera na horizontal para melhor captura.' : (language == 'en' ? 'What kind of media you want to add to this report?\r\n\r\nUse your camera in landscape mode for best capture.' : 'Quieres a\u00f1adir qual media a esta denuncia?\r\n\r\nUtilize la camera na horizontal para el mejor captura.'));
    		var addfoto2 = (language == 'pt' ? 'Selecione a origem da foto:' : (language == 'en' ? 'Select the photo source:' : 'Seleccione la fuente de la foto:'));
    		var remfoto = (language == 'pt' ? 'Deseja remover a foto?' : (language == 'en' ? 'Are you sure you want to remove this photo?' : 'Seguro que quieres eliminar esta foto?'));
    		var btn_remfoto = (language == 'pt' ? 'REMOVER MIDIA' : (language == 'en' ? 'REMOVE MEDIA' : 'ELIMINAR MEDIA'));
    		var btn_enviar = (language == 'pt' ? 'ENVIAR DEN&Uacute;NCIA' : (language == 'en' ? 'SEND REPORT' : 'ENVIAR DENUNCIA'));
    		var btn_novo = (language == 'pt' ? 'NOVA DEN&Uacute;NCIA' : (language == 'en' ? 'NEW REPORT' : 'NUEVA DENUNCIA'));
    		var btn_entrar = (language == 'pt' ? 'ENTRAR' : (language == 'en' ? 'SIGN IN' : 'INGRESAR'));
    		var btn_entrarfb = (language == 'pt' ? 'Login com Facebook' : (language == 'en' ? 'FACEBOOK LOGIN' : 'Ingresar con Facebook'));
    		var btn_novocad = (language == 'pt' ? 'NOVO USU&Aacute;RIO' : (language == 'en' ? 'SIGN UP' : 'NUEVO USUARIO'));
    		var btn_idioma = (language == 'pt' ? 'MEU IDIOMA' : (language == 'en' ? 'MY LANGUAGE' : 'MI IDIOMA'));
    		var btn_meucad = (language == 'pt' ? 'MEU CADASTRO' : (language == 'en' ? 'MY INFO' : 'MI REGISTRO'));
    		var btn_denuncias = (language == 'pt' ? 'MINHAS DEN&Uacute;NCIAS' : (language == 'en' ? 'MY REPORTS' : 'MIS DENUNCIAS'));
    		var btn_feed = (language == 'pt' ? 'DEN&Uacute;NCIAS DOS USU&Aacute;RIOS' : (language == 'en' ? 'USER\'S REPORT' : 'DENUNCIAS DE LOS USUARIOS'));
    		var btn_mapa = (language == 'pt' ? 'VER MAPA DA DENGUE' : (language == 'en' ? 'SHOW DENGUE MAP' : 'VER MAPA DE DENGUE'));
    		var btn_ajuda = (language == 'pt' ? 'AJUDA' : (language == 'en' ? 'HELP' : 'AYUDA'));
    		var btn_sair = (language == 'pt' ? 'SAIR' : (language == 'en' ? 'QUIT' : 'SALIR'));
    		window.localStorage.setItem('language', language);
    		window.localStorage.setItem('aguarde', aguarde);
    		window.localStorage.setItem('localizando', localizando);
    		window.localStorage.setItem('juntos', juntos);
    		window.localStorage.setItem('sharefb', sharefb);
    		window.localStorage.setItem('nenhumadenuncia', nenhumadenuncia);
    		window.localStorage.setItem('denunciaspendentes', denunciaspendentes);
    		window.localStorage.setItem('denunciasenviadas', denunciasenviadas);
    		window.localStorage.setItem('seminternet', seminternet);
    		window.localStorage.setItem('lbl_cadastro', lbl_cadastro);
    		window.localStorage.setItem('lbl_denuncia', lbl_denuncia);
    		window.localStorage.setItem('coddenuncia', coddenuncia);
    		window.localStorage.setItem('lbl_foto', lbl_foto);
    		window.localStorage.setItem('sualocalizacao', sualocalizacao);
    		window.localStorage.setItem('text_cadastro', text_cadastro);
    		window.localStorage.setItem('text_denuncia', text_denuncia);
    		window.localStorage.setItem('nomecompl', nomecompl);
    		window.localStorage.setItem('seuemail', seuemail);
    		window.localStorage.setItem('emailinvalido', emailinvalido);
    		window.localStorage.setItem('seuapelido', seuapelido);
    		window.localStorage.setItem('suasenha', suasenha);
    		window.localStorage.setItem('confsenha', confsenha);
    		window.localStorage.setItem('senhasconf', senhasconf);
    		window.localStorage.setItem('bemvindo', bemvindo);
    		window.localStorage.setItem('denunciaanonima', denunciaanonima);
    		window.localStorage.setItem('denunciarcomo', denunciarcomo);
    		window.localStorage.setItem('chkanonimo', chkanonimo);
    		window.localStorage.setItem('endcompl', endcompl);
    		window.localStorage.setItem('tpamostra', tpamostra);
    		window.localStorage.setItem('outrostipos', outrostipos);
    		window.localStorage.setItem('caracteristicas', caracteristicas);
    		window.localStorage.setItem('larvas', larvas);
    		window.localStorage.setItem('vetor', vetor);
    		window.localStorage.setItem('agua', agua);
    		window.localStorage.setItem('clarvas', clarvas);
    		window.localStorage.setItem('cvetor', cvetor);
    		window.localStorage.setItem('cagua', cagua);
    		window.localStorage.setItem('foienviado', foienviado);
    		window.localStorage.setItem('foiinspecionado', foiinspecionado);
    		window.localStorage.setItem('caract', caract);
    		window.localStorage.setItem('obrigatorios', obrigatorios);
    		window.localStorage.setItem('confirmsend', confirmsend);
    		window.localStorage.setItem('apelidocadastrado', apelidocadastrado);
    		window.localStorage.setItem('emailcadastrado', emailcadastrado);
    		window.localStorage.setItem('errocadastro', errocadastro);
    		window.localStorage.setItem('informedados', informedados);
    		window.localStorage.setItem('dadosincorretos', dadosincorretos);
    		window.localStorage.setItem('erroacesso', erroacesso);
    		window.localStorage.setItem('sairapp', sairapp);
    		window.localStorage.setItem('enviando', enviando);
    		window.localStorage.setItem('enviado', enviado);
    		window.localStorage.setItem('erroenviar', erroenviar);
    		window.localStorage.setItem('denunciagravada', denunciagravada);
    		window.localStorage.setItem('reenviar', reenviar);
    		window.localStorage.setItem('errogps', errogps);
    		window.localStorage.setItem('alert_atencao', alert_atencao);
    		window.localStorage.setItem('lblcamera', lblcamera);
    		window.localStorage.setItem('lblalbum', lblalbum);
    		window.localStorage.setItem('lblvideo', lblvideo);
    		window.localStorage.setItem('sim', sim);
    		window.localStorage.setItem('nao', nao);
    		window.localStorage.setItem('btn_sim', btn_sim);
    		window.localStorage.setItem('btn_nao', btn_nao);
    		window.localStorage.setItem('btn_salvar', btn_salvar);
    		window.localStorage.setItem('btn_entrar', btn_entrar);
    		window.localStorage.setItem('btn_entrarfb', btn_entrarfb);
    		window.localStorage.setItem('btn_voltar', btn_voltar);
    		window.localStorage.setItem('btn_foto', btn_foto);
    		window.localStorage.setItem('btn_minhafoto', btn_minhafoto);
    		window.localStorage.setItem('addfoto', addfoto);
    		window.localStorage.setItem('addfoto2', addfoto2);
    		window.localStorage.setItem('remfoto', remfoto);
    		window.localStorage.setItem('btn_logout', btn_logout);
    		window.localStorage.setItem('btn_logoutfb', btn_logoutfb);
    		window.localStorage.setItem('confirmlogout', confirmlogout);
    		window.localStorage.setItem('btn_remfoto', btn_remfoto);
    		window.localStorage.setItem('btn_enviar', btn_enviar);
    		window.localStorage.setItem('btn_novo', btn_novo);
    		window.localStorage.setItem('btn_feed', btn_feed);
    		window.localStorage.setItem('btn_novocad', btn_novocad);
    		window.localStorage.setItem('btn_meucad', btn_meucad);
    		window.localStorage.setItem('btn_idioma', btn_idioma);
    		window.localStorage.setItem('btn_denuncias', btn_denuncias);
    		window.localStorage.setItem('btn_mapa', btn_mapa);
    		window.localStorage.setItem('btn_ajuda', btn_ajuda);
    		window.localStorage.setItem('btn_sair', btn_sair);
    		console.log('INFOAPP: Salvou os Idiomas para ' + language);
    		location.href="main.html";
    	}
    }
};
idioma.initialize();