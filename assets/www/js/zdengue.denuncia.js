var strEmail = '', strEmailLogado, idDenuncia, anonimo, strEndereco, strTipo, strOutrosTipos, strCaracteristicas, strLarvas, strVetor, strAgua, strOBS, strFoto = '';
var validation;
var latitude;
var longitude;
var language;
var valid;
var myaddress;
var resend = false;
var edit = false;
var linhaAtualizacao;
var arrayLinhaCompleta = [];
var arrayEndereco = [];
var arrayLatitude = [];
var arrayLongitude = [];
var denuncia = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener("deviceready", this.fOnDeviceReady, false);
        btnSend.addEventListener('click', this.fSend, false);
    },
    fOnDeviceReady: function(){
		//TODO Do Something...
		console.log('INFOAPP: DenunciaOK');
    },
    onSuccessGeolocation: function(position){
        latitude = common.rpad(String(position.coords.latitude), 11, 0);
        longitude = common.rpad(String(position.coords.longitude), 11, 0);
        console.log('INFOAPP: GPS OK' + common.rpad(String(latitude), 11, 0) + ',' + common.rpad(String(longitude), 11, 0));
        if(internetConnection == 'NONE' || internetConnection == 'CELL'){
			common.fNotification(window.localStorage.getItem('seminternet'), 'alert', null);
			$.mobile.changePage('#indexPage');
		}else{
			$.mobile.loading('show', { text: window.localStorage.getItem('localizando'), textVisible: true, theme: 'a', textonly: false, html: '' });
			denuncia.fReverseGeocode(latitude, longitude);
			console.log('INFOAPP: DENUNCIA');
            $.mobile.changePage('#newreportPage', {changeHash: false});
		}
    },
    fReverseGeocode: function(vLatitude, vLongitude){
    	var urlJSON = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + vLatitude + ',' + vLongitude +
    				  '&key=AIzaSyC13uzDJDW76JEoVu1BkBa9QBfm3deFFR0&sensor=false';
    	console.log('INFOAPP: ' + urlJSON);
   		$.getJSON(urlJSON, function(json){
			myaddress = json.results[0].formatted_address;
			common.fNotification(window.localStorage.getItem('sualocalizacao') + ' ' + myaddress + '?', 'confirm', denuncia.fConfirmAddress);
			$.mobile.loading('hide');
		});
    },
    fConfirmAddress: function(buttonIndex){
    	if(buttonIndex == 1){
			var form = $("#form-amostra");
            $("#text-endereco", form).val(myaddress);
    	}
    },
    fIDNewReport: function(){
        var currDate  = new Date();
        var currDay   = ('0' + currDate.getDate()).slice(-2);
        var currMonth = currDate.getMonth();
        var currYear  = currDate.getFullYear();
        var currHour  = ('0' + currDate.getHours()).slice(-2);
        var currMin   = ('0' + currDate.getMinutes()).slice(-2);
        var currSec   = ('0' + currDate.getSeconds()).slice(-2);
        var nrMonth   = ["01","02","03","04","05","06","07","08","09","10","11","12"];
        var randomize =  Math.floor(Math.random() * (99999 - 11111)) + 11111;
        var idReport = currYear + nrMonth[currMonth] + currDay + currHour + currMin + currSec + common.rpad(randomize, 5, '0');
        return idReport;
    },
    fCheckReportForm: function(){
    	validation = '';
    	valid = true;
    	var nome_campo = '';
    	var form = $("#form-amostra");
    	var text_endereco = $("#text-endereco", form).val();
    	var select_tp_amostra = $("#select-tp-amostra", form).val();
        var vetor = $("input[name=checkbox-am-cvetor]:checked", form).length;
        var larvas = $("input[name=checkbox-am-clarvas]:checked", form).length;
        var agua = $("input[name=checkbox-am-cagua]:checked", form).length;
        if(text_endereco.trim() == ''){
        	valid = false;
        	nome_campo += window.localStorage.getItem('endcompl') + ';\r\n';
        }
        if(select_tp_amostra.trim() == ''){
        	valid = false;
        	nome_campo += window.localStorage.getItem('tpamostra') + ';\r\n';
        }
        if(vetor == '' && larvas == '' && agua == ''){
        	valid = false;
        	nome_campo += window.localStorage.getItem('caract') + ';\r\n';
        }
        if(valid == false){
        	validation = window.localStorage.getItem('obrigatorios') + ':\r\n\r\n' + nome_campo;
        }
    },
    fSend: function(){
    	console.log('INFOAPP: SEND');
        $.mobile.loading('show', { text: window.localStorage.getItem('aguarde'), textVisible: true, theme: 'a', textonly: false, html: '' });
        denuncia.fCheckReportForm();
        if(valid == true){
            var form = $("#form-amostra");
            strEndereco = $("#text-endereco", form).val();
            strTipo = $("#select-tp-amostra", form).val();
            anonimo = 'anonimo';
            strOutrosTipos = $("#text-tipo-outros", form).val();
            strLarvas = $("input[name=checkbox-am-clarvas]:checked", form).length;
            strAgua = $("input[name=checkbox-am-cagua]:checked", form).length;
            strVetor = $("input[name=checkbox-am-cvetor]:checked", form).length;
            strOBS = $("#text-obs-amostra", form).val();
            strFoto = $("#smallImage", form).attr('src');
            common.fNotification(window.localStorage.getItem('confirmsend'), 'confirm', denuncia.fConfirmSend);
            $.mobile.loading('hide');
        }else{
            common.fNotification(validation, 'alert', null);
            $.mobile.loading('hide');
        }
    },
    fConfirmSend: function(buttonIndex){
        if(buttonIndex == 1){
            resend = false;
            denuncia.fSendReport();
        }
    },
    fConfirmResend: function(buttonIndex){
        if(buttonIndex == 1){
            resend = true;
            denuncia.fSendReport();
        }
    },
    fSendReport: function(){
    	var data_atual = common.fCurrDate();
    	var id_denuncia = denuncia.fIDNewReport();
    	$.mobile.loading('show', { text: window.localStorage.getItem('enviando'), textVisible: true, theme: 'a', textonly: false, html: '' });
    	console.log('INFOAPP: Enviando Denuncia para ' + urlDengueZero);
    	$.ajax({
    	     url: urlDengueZero,
    	  method: "POST",
    	    data: ({ denuncia: id_denuncia,
    	    	     usuario_facebook: (anonimo == 'usuario' ? window.localStorage.getItem('email') : ''),
    	    		 endereco: strEndereco,
    	    		 tipo: strTipo,
    	    		 tipo_outros: strOutrosTipos,
    	    		 larvas: (strLarvas != 0 ? 'SIM' : 'NAO'),
    	    		 vetor: (strVetor != 0 ? 'SIM' : 'NAO'),
    	    		 agua: (strAgua != 0 ? 'SIM' : 'NAO'),
    	    		 obs: strOBS,
    	    		 data: data_atual,
    	    		 latitude: common.rpad(latitude, 11, '0'),
    	    		 longitude: common.rpad(longitude, 11, '0'),
    	    		 foto: strFoto,
    	    		 action: "denuncia" }),
    	dataType: "json",
        success: function(json){
    				  if(json.retorn == 'ok'){
    				  	  console.log('INFOAPP: Denuncia Enviada - Gravando...');
    				  	  if(resend == true){
    				  	  	  denuncia.fRemovePendingReports(id_denuncia);
    				  	  }else{
							  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function fSalvarPreparar(fileSystem){
    						  fileSystem.root.getFile(".DNGZ0C", {create: true, exclusive: false}, function fSalvarProcessar(fileEntry){
    						  		fileEntry.createWriter(function fCriarArquivoFinal(writer){
    						  			strCaracteristicas = (strLarvas != 0 ? 'SIM' : 'NAO');
    						  			strCaracteristicas += (strVetor != 0 ? 'SIM' : 'NAO');
    						  			strCaracteristicas += (strAgua != 0 ? 'SIM' : 'NAO');
    						  			var strDenuncia = 'DE' +
										(anonimo == 'usuario' ? common.rpad(window.localStorage.getItem('email'), 60, ' ') : common.rpad(' ', 60, ' ')) +
										common.rpad(strEndereco.substr(0,60), 60, ' ') +
										strTipo +
										common.rpad(strOutrosTipos.substr(0,50), 50, ' ') +
										strCaracteristicas  +
										common.rpad(strOBS.substr(0,100), 100, ' ') +
										data_atual +
										common.rpad(latitude, 11, '0') +
										common.rpad(longitude, 11, '0') +
										'SIM' +
										'NAO' +
										id_denuncia +
										common.rpad(window.localStorage.getItem('email').substr(0,60), 60, ' ') +
										(strFoto) +
										'\r\n';
    						  			writer.seek(writer.length);
    						  			writer.write(strDenuncia);
    						  			console.log('INFOAPP: ' + strDenuncia);
    								    writer.onwriteend = function(evt){
    								    	navigator.notification.beep(1);
    								    	common.fNotification(window.localStorage.getItem('enviado'), 'alert', null);
    								    	$.mobile.loading('hide');
    								    	denuncia.fLoadMyReportsList();
    								    }
    						  		}, denuncia.fail);
    						  	  }, denuncia.fail);
    					  	  }, denuncia.fail);
    				  	  }
    				  }else{
    					 common.fNotification(window.localStorage.getItem('erroenviar'), 'alert', null);
    				     $.mobile.loading('hide');
    				  }
    			  },
    	 error: function(xhr, ajaxOptions, thrownError){
    	 	      if(resend == false){
    				  window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function fSalvarPreparar(fileSystem){
    					  fileSystem.root.getFile(".DNGZ0C", {create: true, exclusive: false}, function fSalvarProcessar(fileEntry){
    					  		fileEntry.createWriter(function fCriarArquivoFinal(writer){
								    strCaracteristicas = (strLarvas != 0 ? 'SIM' : 'NAO');
								    strCaracteristicas += (strVetor != 0 ? 'SIM' : 'NAO');
								    strCaracteristicas += (strAgua != 0 ? 'SIM' : 'NAO');
								    var strDenuncia = 'DE' +
								    (anonimo == 'usuario' ? common.rpad(window.localStorage.getItem('email'), 60, ' ') : common.rpad(' ', 60, ' ')) +
								    common.rpad(strEndereco.substr(0,60), 60, ' ') +
								    strTipo +
								    common.rpad(strOutrosTipos.substr(0,50), 50, ' ') +
								    strCaracteristicas  +
								    common.rpad(strOBS.substr(0,100), 100, ' ') +
								    data_atual +
								    common.rpad(latitude, 11, '0') +
								    common.rpad(longitude, 11, '0') +
								    'NAO' +
								    'NAO' +
								    id_denuncia +
								    common.rpad(window.localStorage.getItem('email').substr(0,60), 60, ' ') +
								    (strFoto) +
								    '\r\n';
    					  			writer.seek(writer.length);
    					  			writer.write(strDenuncia);
    							    writer.onwriteend = function(evt){
    							    	common.fNotification(window.localStorage.getItem('denunciagravada'), 'alert', null);
    								    $.mobile.loading('hide');
    								    denuncia.fLoadMyReportsList();
    							    }
    					  		}, denuncia.fail);
    					  	}, denuncia.fail);
    				  }, denuncia.fail);
    		      }else{
					  common.fNotification(window.localStorage.getItem('denunciagravada'), 'alert', null);
					  $.mobile.loading('hide');
					  denuncia.fLoadMyReportsList();
    		      }
    		  }
    	});
    },
    fShowInMap: function(lat, lng, local){
    	window.localStorage.setItem('lat', lat);
    	window.localStorage.setItem('lng', lng);
    	window.localStorage.setItem('local', local);
    	$.mobile.loading('show', { text: window.localStorage.getItem('aguarde'), textVisible: true, theme: 'a', textonly: true, html: '' });
    },
    fResendReport: function(str){
    	console.log('INFOAPP:' + str);
    	 anonimo = (str.substr(2,60).trim() != '' ? 'usuario' : 'anonimo');
    	 console.log('INFOAPP: Denuncia ' + anonimo);
		 strEmail       = str.substr(2,  60);
		 strEndereco    = str.substr(62, 60);
		 strTipo 		= str.substr(122, 2);
		 strOutrosTipos = str.substr(124,50);
		 strLarvas 	    = (str.substr(174, 3) == 'SIM' ? 1 : 0);
		 strVetor 	    = (str.substr(177, 3) == 'SIM' ? 1 : 0);
		 strAgua 		= (str.substr(180, 3) == 'SIM' ? 1 : 0);
		 strOBS 	    = str.substr(183,100);
		 data_denuncia  = common.fCurrDate();
		 latitude 	    = str.substr(297, 11);
		 longitude      = str.substr(308, 11);
		 idDenuncia     = str.substr(325,19);
		 strEmailLogado = str.substr(344,60);
		 strFoto 	    = str.substr(404);
		 common.fNotification(window.localStorage.getItem('reenviar'), 'confirm', denuncia.fConfirmResend);
    },
    fLoadMyReportsList: function(){
		$.mobile.loading('show', { text: window.localStorage.getItem('aguarde'), textVisible: true, theme: 'a', textonly: true, html: '' });
    	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function fGotFSAddress(fileSystem) {
    	    fileSystem.root.getFile(".DNGZ0C", null, function gotAddressFileEntry(fileEntry) {
    	        fileEntry.file(function gotFileAddress(file){
    	        	    var reader = new FileReader();
    	        	    reader.onloadend = function(evt){
    	        	        var myContentFile = evt.target.result;
    	        	        var lines = myContentFile.split("\r\n");
    	        	        var tableItemPendentes2 = '<tr><td colspan="2">' + window.localStorage.getItem('nenhumadenuncia') + '</td></tr>';
    	        	        var tableItemEnviadas2 = '<tr><td colspan="2">' + window.localStorage.getItem('nenhumadenuncia') + '</td></tr>';
    	        	        var tableItemPendentes = '';
                            var tableItemEnviadas = '';
    	        	        lines.reverse();
    	        	        for(var i in lines){
    	        	        	if(i < 99){
									var linhaLocal = lines[i].substr(0, 2);
									if(linhaLocal == 'DE'){
										var id_denuncia         = lines[i].substr(325,  19);
										var usuario_facebook    = lines[i].substr(2,  60);
										var endereco_denuncia   = lines[i].substr(62, 60);
										var tipo_denuncia 		= lines[i].substr(122, 2);
										var outro_denuncia		= lines[i].substr(124,50);
										var larvas_denuncia 	= lines[i].substr(174, 3);
										var vetor_denuncia 		= lines[i].substr(177, 3);
										var agua_denuncia 		= lines[i].substr(180, 3);
										var obs_denuncia 	    = lines[i].substr(183,100);
										var data_denuncia 	    = lines[i].substr(283, 14);
										var latitude_denuncia 	= lines[i].substr(297, 11);
										var longitude_denuncia 	= lines[i].substr(308, 11);
										var enviado_denuncia    = lines[i].substr(319, 3);
										var inspecionado_denuncia=lines[i].substr(322, 3);
										var usuariologado		= lines[i].substr(344,60);
										var foto_denuncia 	    = lines[i].substr(404);

										if(enviado_denuncia == 'SIM'){
											if(usuariologado.trim() == window.localStorage.getItem('email')){
												tableItemEnviadas += '<tr>' +
																'<td colspan="2">' +
																common.fTrimWords(endereco_denuncia, 7) + '<br>' +
																'<i style="font-size:12px">' + data_denuncia.substr(6,2) + '/' + data_denuncia.substr(4,2) + '/' + data_denuncia.substr(0,4) + ' ' + data_denuncia.substr(8,2) + ':' + data_denuncia.substr(10,2) + '</i></td></tr>' +
																'<tr><td style="text-align:center" valign="top">' +
																'<div class="wrapperMini"><img src="' + (usuario_facebook.trim() != '' ? (window.localStorage.getItem('foto') == null ? 'css/images/semfoto.png' : window.localStorage.getItem('foto')) : 'css/images/semfoto.png') + '" height="50" alt="" /></div><span>' + (usuario_facebook.trim() != '' ? '' : window.localStorage.getItem('denunciaanonima')) + '</span></td>' +
																'<td>' +  (obs_denuncia.trim() != '' ? '<i style="font-size:12px">"' + obs_denuncia + '"</i><br>' : '') +
																'<strong style="font-size:12px">' + window.localStorage.getItem('cagua') + ': ' + (agua_denuncia == 'SIM' ? window.localStorage.getItem('sim') : window.localStorage.getItem('nao')) + ' | ' + window.localStorage.getItem('clarvas') + ': '  + (larvas_denuncia == 'SIM' ? window.localStorage.getItem('sim') : window.localStorage.getItem('nao')) + ' | ' + window.localStorage.getItem('cvetor') + ': ' + (vetor_denuncia == 'SIM' ? window.localStorage.getItem('sim') : window.localStorage.getItem('nao')) + '</strong><br>' +
																'<strong style="color:red;">' + window.localStorage.getItem('foienviado') + ' ' + (enviado_denuncia == 'SIM' ? window.localStorage.getItem('sim') : window.localStorage.getItem('nao')) + '</strong>' +
																//'<strong style="color:red;">' + window.localStorage.getItem('foiinspecionado') + ' ' + (inspecionado_denuncia == 'SIM' ? window.localStorage.getItem('sim') : window.localStorage.getItem('nao')) + '</strong> &nbsp; ' +
																'<div>';
																if(window.localStorage.getItem('fbtoken') != null && usuario_facebook.trim() != ''){
																	tableItemEnviadas += '<a href="javascript:facebook.fShare(\'' + obs_denuncia + '\', ' + latitude_denuncia + ', ' + longitude_denuncia + ');"><img src="css/images/fbshare.png" height="48" style="margin-right:15px;"></a>';
																}
																tableItemEnviadas  +=  '<a href="javascript:denuncia.fShowInMap(' + latitude_denuncia + ',' + longitude_denuncia + ',\'' + endereco_denuncia + '\');location.href=\'showinmap.html\'"><img src="css/images/map.png" height="53" style="margin-right:15px;"></a>' +
																				'<a href="javascript:denuncia.fResendReport(\'' + lines[i] + '\');"><img src="css/images/resend.png" height="53"></a>' +
																'</div>' +

													'</td></tr>';
											}
										}else{
											if(usuariologado.trim() == window.localStorage.getItem('email')){
												tableItemPendentes += '<tr>' +
																'<td colspan="2"><br>' +
																common.fTrimWords(endereco_denuncia, 7) + '<br>' +
																'<i style="font-size:12px">' + data_denuncia.substr(6,2) + '/' + data_denuncia.substr(4,2) + '/' + data_denuncia.substr(0,4) + ' ' + data_denuncia.substr(8,2) + ':' + data_denuncia.substr(10,2) + '</i></td></tr>' +
																'<tr><td style="text-align:center" valign="top">' +
																'<div class="wrapperMini"><img src="' + (usuario_facebook.trim() != '' ? (window.localStorage.getItem('foto') == null ? 'css/images/semfoto.png' : window.localStorage.getItem('foto')) : 'css/images/semfoto.png') + '" height="50" alt="" /></div><span>' + (usuario_facebook.trim() != '' ? '' : window.localStorage.getItem('denunciaanonima')) + '</span></td>' +
																'<td>' +  (obs_denuncia.trim() != '' ? '<i style="font-size:12px">"' + obs_denuncia + '"</i><br>' : '') +
																'<strong style="font-size:12px">' + window.localStorage.getItem('cagua') + ': ' + (agua_denuncia == 'SIM' ? window.localStorage.getItem('sim') : window.localStorage.getItem('nao')) + ' | ' + window.localStorage.getItem('clarvas') + ': '  + (larvas_denuncia == 'SIM' ? window.localStorage.getItem('sim') : window.localStorage.getItem('nao')) + ' | ' + window.localStorage.getItem('cvetor') + ': ' + (vetor_denuncia == 'SIM' ? window.localStorage.getItem('sim') : window.localStorage.getItem('nao')) + '</strong><br>' +
																'<strong style="color:red;">' + window.localStorage.getItem('foienviado') + ' ' + (enviado_denuncia == 'SIM' ? window.localStorage.getItem('sim') : window.localStorage.getItem('nao')) + '</strong>' +
																//'<strong style="color:red;">' + window.localStorage.getItem('foiinspecionado') + ' ' + (inspecionado_denuncia == 'SIM' ? window.localStorage.getItem('sim') : window.localStorage.getItem('nao')) + '</strong> &nbsp; ' +
																'<div>';
																if(window.localStorage.getItem('fbtoken') != null && usuario_facebook.trim() != ''){
																	tableItemPendentes += '<a href="javascript:facebook.fShare(\'' + obs_denuncia + '\', ' + latitude_denuncia + ', ' + longitude_denuncia + ');"><img src="css/images/fbshare.png" height="48" style="margin-right:15px;"></a>';
																}
																tableItemPendentes  +=  '<a href="javascript:denuncia.fShowInMap(' + latitude_denuncia + ',' + longitude_denuncia + ',\'' + endereco_denuncia + '\');location.href=\'showinmap.html\'"><img src="css/images/map.png" height="53" style="margin-right:15px;"></a>' +
																				'<a href="javascript:denuncia.fResendReport(\'' + lines[i] + '\');"><img src="css/images/resend.png" height="53"></a>' +
																'</div>' +

													'</td></tr>';
											}
										}
									}
								}
    	        	        }
    	        	        if(tableItemPendentes == '')
    	        	        	tableItemPendentes = tableItemPendentes2;
    	        	        if(tableItemEnviadas == '')
                                 tableItemEnviadas = tableItemEnviadas2;
    	        	        $("#tbPendentes").html(tableItemPendentes).trigger('pagecreate');
    	        	        $("#tbEnviadas").html(tableItemEnviadas).trigger('pagecreate');
    	        	        $('#imgHeaderMinhasDenuncias').attr('src', "css/images/denguezerocidadao_header_" + window.localStorage.getItem('language') + ".png");
							$('#btnNewReportList').html(window.localStorage.getItem('btn_novo'));
							$('#btnBackMinhasDenuncias').html(window.localStorage.getItem('btn_voltar'));
							$('#lblMinhasDenuncias').html(window.localStorage.getItem('btn_denuncias'));
							$('#lblTableAmostraPendentes').html(window.localStorage.getItem('denunciaspendentes'));
							$('#lblTableAmostraEnviadas').html(window.localStorage.getItem('denunciasenviadas'));
    	                	$.mobile.changePage('#myreportsPage', {changeHash: false});
    	                	$.mobile.loading('hide');
    	        	    };
    	        	    reader.readAsText(file);
    	        }, denuncia.fail);
    	    }, denuncia.fail);
    	}, denuncia.fail);
    },
	fRemovePendingReports: function(id){
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function fGotFSAddress(fileSystem) {
			fileSystem.root.getFile(".DNGZ0C", null, function gotAddressFileEntry(fileEntry) {
				fileEntry.file(function gotFileAddress(file){
						var reader = new FileReader();
						reader.onloadend = function(evt){
							var myContentFile = evt.target.result;
							var lines = myContentFile.split("\r\n");
							var linhaRegistro = '';
							lines.reverse();
							for(var i in lines){
								if(i < 99){
									var linhaLocal = lines[i].substr(0, 2);
									if(linhaLocal == 'DE'){
										var id_denuncia         = lines[i].substr(325,  19);
										var usuario_facebook    = lines[i].substr(2,  60);
										var endereco_denuncia   = lines[i].substr(62, 60);
										var tipo_denuncia 		= lines[i].substr(122, 2);
										var outro_denuncia		= lines[i].substr(124,50);
										var larvas_denuncia 	= lines[i].substr(174, 3);
										var vetor_denuncia 		= lines[i].substr(177, 3);
										var agua_denuncia 		= lines[i].substr(180, 3);
										var obs_denuncia 	    = lines[i].substr(183,100);
										var data_denuncia 	    = lines[i].substr(283, 14);
										var latitude_denuncia 	= lines[i].substr(297, 11);
										var longitude_denuncia 	= lines[i].substr(308, 11);
										var enviado_denuncia    = lines[i].substr(319, 3);
										var inspecionado_denuncia=lines[i].substr(322, 3);
										var usuariologado		= lines[i].substr(344,60);
										var foto_denuncia 	    = lines[i].substr(404);

											linhaRegistro += 'DE';
											linhaRegistro += usuario_facebook;
											linhaRegistro += endereco_denuncia;
											linhaRegistro += tipo_denuncia;
											linhaRegistro += outro_denuncia;
											linhaRegistro += larvas_denuncia;
											linhaRegistro += vetor_denuncia;
											linhaRegistro += agua_denuncia;
											linhaRegistro += obs_denuncia;
											linhaRegistro += data_denuncia;
											linhaRegistro += latitude_denuncia;
											linhaRegistro += longitude_denuncia;
											linhaRegistro += (id_denuncia == id ? 'SIM' : enviado_denuncia);
											linhaRegistro += inspecionado_denuncia;
											linhaRegistro += id_denuncia;
											linhaRegistro += usuariologado;
											linhaRegistro += foto_denuncia;
											linhaRegistro += '\r\n';
									}
								}
							}
							linhaAtualizacao = linhaRegistro;
                            denuncia.fUpdateReports();
						};
						reader.readAsText(file);
				}, denuncia.fail);
			}, denuncia.fail);
		}, denuncia.fail);
	},
	fUpdateReports: function(){
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function fSalvarPreparar(fileSystem){
			fileSystem.root.getFile(".DNGZ0C", {create: true, exclusive: false}, function fSalvarProcessar(fileEntry){
				fileEntry.createWriter(function fCriarArquivoFinal(writer){
					writer.write(linhaAtualizacao);
					writer.onwriteend = function(evt){
						 navigator.notification.beep(1);
						 common.fNotification(window.localStorage.getItem('enviado'), 'alert', null);
						 $.mobile.loading('hide');
						 denuncia.fLoadMyReportsList();
					}
				}, denuncia.fail);
			}, denuncia.fail);
		}, denuncia.fail);
	},
    fail: function(error) {
    	common.fNotification('Erro ao salvar/ler os dados no seu dispositivo!\r\nError while reading/writing data in your device!', 'alert', null);
    	$.mobile.loading('hide');
    },
    fFailGPS: function(error){
    	common.fNotification(window.localStorage.getItem('errogps'), 'alert', null);
    	$.mobile.loading('hide');
    	//latitude = -23.5236589;
		//longitude = -46.6314850;
		//$.mobile.changePage('#newreportPage', {changeHash: false});
		//$.mobile.loading('hide');
    }
};
denuncia.initialize();