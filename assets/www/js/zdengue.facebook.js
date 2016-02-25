var loginURL = 'https://www.facebook.com/dialog/oauth',
        logoutURL = 'https://www.facebook.com/logout.php',
        fbAppId,
        cordovaOAuthRedirectURL = "https://www.facebook.com/connect/login_success.html",
        logoutRedirectURL,
        loginCallback,
        obsShare,
        latShare,
        lngShare,
        cidadao,
        runningInCordova = false,
        loginProcessed = false;
var facebook = {
    initialize: function() {
            console.log('INFOAPP: Load Facebook OK');
            document.addEventListener("deviceready", function () { runningInCordova = true; }, false);
            btnFB.addEventListener('click', this.fLogin, false);
            fbAppId = 421039164758367;
    },
    login:function(callback, options) {
        var loginWindow,
            startTime,
            scope = '',
            redirectURL = cordovaOAuthRedirectURL;
        if (!fbAppId) {
            return callback({status: 'unknown', error: 'Facebook App Id not set.'});
        }
         var loginWindow_loadStartHandler = function(event) {
            navigator.notification.activityStart("DengueZero", window.localStorage.getItem('aguarde'));
            var url = event.url;
            if (url.indexOf("access_token=") > 0 || url.indexOf("error=") > 0) {
                var timeout = 600 - (new Date().getTime() - startTime);
                setTimeout(function () {
                    loginWindow.close();
                    facebook.getInfo();
                }, timeout > 0 ? timeout : 0);
                facebook.oauthCallback(url);
            }
        };
        var loginWindow_exitHandler = function() {
            console.log('exit and remove listeners');
            if (loginCallback && !loginProcessed) facebook.loginCallback({status: 'user_cancelled'});
            loginWindow.removeEventListener('loadstop', facebook.loginWindow_loadStopHandler);
            loginWindow.removeEventListener('exit', facebook.loginWindow_exitHandler);
            loginWindow = null;
            navigator.notification.activityStop();
        };
        var loginWindow_loadStopHandler = function(){
            navigator.notification.activityStop();
            console.log('page is loaded');
        };
        if (options && options.scope) {
            scope = options.scope;
        }
        loginCallback = callback;
        loginProcessed = false;
        startTime = new Date().getTime();
        loginWindow = window.open(loginURL + '?client_id=' + fbAppId + '&redirect_uri=' + redirectURL + '&response_type=token&scope=' + scope, '_blank', 'location=no,clearcache=yes');
        loginWindow.addEventListener('loadstart', loginWindow_loadStartHandler);
        loginWindow.addEventListener('exit', loginWindow_exitHandler);
        loginWindow.addEventListener('loadstop', loginWindow_loadStopHandler);
        navigator.notification.activityStop();
    },
    oauthCallback: function(url) {
        var queryString, obj;
        loginProcessed = true;
        if (url.indexOf("access_token=") > 0) {
            $.mobile.loading('show', { text: window.localStorage.getItem('aguarde'), textVisible: true, theme: 'a', textonly: false, html: '' });
            queryString = url.substr(url.indexOf('#') + 1);
            obj = facebook.parseQueryString(queryString);
            window.localStorage.setItem('fbtoken', obj['access_token']);
            console.log('INFOAPP: ' + window.localStorage.getItem('fbtoken'));
            if (loginCallback) facebook.loginCallback({status: 'connected', authResponse: {accessToken: obj['access_token']}});
        } else if (url.indexOf("error=") > 0) {
            queryString = url.substring(url.indexOf('?') + 1, url.indexOf('#'));
            obj = facebook.parseQueryString(queryString);
            if (loginCallback) facebook.loginCallback({status: 'not_authorized', error: obj.error});
        } else {
            if (loginCallback) facebook.loginCallback({status: 'not_authorized'});
        }
    },
    logout: function(callback) {
        console.log('INFOAPP: Logout Facebook...');
        var logoutWindow,
            token = window.localStorage.getItem('fbtoken');
            window.localStorage.removeItem('fbtoken');
        if (token) {
            console.log('INFOAPP: ' + logoutURL + '?access_token=' + token + '&next=' + logoutRedirectURL);
            logoutWindow = window.open(logoutURL + '?access_token=' + token + '&next=' + logoutRedirectURL, '_blank', 'location=no,clearcache=yes');
            if (runningInCordova) {
                setTimeout(function() {
                    logoutWindow.close();
                }, 700);
            }
        }
        if (callback) {
            callback();
        }
    },
    getInfo: function() {
        navigator.notification.activityStop();
        console.log('INFOAPP: Carregando info...');
        var method = 'GET', params = {}, xhr = new XMLHttpRequest(), url;
        params['access_token'] = window.localStorage.getItem('fbtoken');
        params['fields'] = "name,email";
        url = 'https://graph.facebook.com/me?' + facebook.toQueryString(params);
        console.log('INFOAPP: URL INfo: ' + url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    if(window.localStorage.getItem('email') == null){
                        window.localStorage.setItem('email', data.email);
                        window.localStorage.setItem('foto', 'http://graph.facebook.com/' + data.id + '/picture?type=large');
                        window.localStorage.setItem('nome', data.name);
                        window.localStorage.setItem('apelido', data.name);
                        $.ajax({
                                 url: urlDengueZero,
                              method: "POST",
                                data: ({ nome: data.name,
                                         apelido: data.name,
                                         email: data.email,
                                         senha: 'denguezero',
                                          foto: window.localStorage.getItem('foto'),
                                        editar: 'nao',
                                         action: "cadastro" }),
                            dataType: "json",
                            success: function(json){
                                  if(json.retorn == 'ok'){
                                     location.href='main.html';
                                  }else if(json.retorn == 'email'){
                                        $.ajax({
                                                 url: urlDengueZero,
                                              method: "POST",
                                                data: ({ nome: data.name,
                                                     apelido: data.name,
                                                     email: data.email,
                                                     senha: 'denguezero',
                                                      foto: window.localStorage.getItem('foto'),
                                                    editar: 'sim',
                                                     action: "cadastro" }),
                                                dataType: "json",
                                                success: function(json){
                                                      if(json.retorn == 'ok'){
                                                         location.href='main.html';
                                                      }
                                                },
                                                error: function(xhr, ajaxOptions, thrownError){
                                                     common.fNotification(window.localStorage.getItem('errocadastro') + xhr.description, 'alert', null);
                                                     $.mobile.loading('hide');
                                                }
                                        });
                                        location.href='main.html';
                                  }
                            },
                            error: function(xhr, ajaxOptions, thrownError){
                                 common.fNotification(window.localStorage.getItem('errocadastro') + xhr.description, 'alert', null);
                                 $.mobile.loading('hide');
                            }
                        });
                    }
                } else {
                    var error = xhr.responseText ? JSON.parse(xhr.responseText).error : {message: 'An error has occurred'};
                    if (obj.error) alert(error);
                }
            }
        };
        xhr.open(method, url, true);
        xhr.send();
    },
    fShare: function(vObs, vLat, vLng, cid){
         obsShare = vObs || '';
         latShare = vLat;
         lngShare = vLng;
         cidadao = cid;
         common.fNotification(window.localStorage.getItem('sharefb'), 'confirm', facebook.fConfirmShare);
    },
    fConfirmShare: function(buttonIndex){
         if(buttonIndex == 1)
             facebook.share();
    },
    share: function(){
        $.mobile.loading('show', { text: window.localStorage.getItem('aguarde'), textVisible: true, theme: 'a', textonly: false, html: '' });
        console.log('INFOAPP: Carregando Share...');
        var mensagem = 'Encontrei um local com poss\u00edvel foco de dengue.\r\n' +
                        (obsShare.trim() != '' ? '"' + obsShare.trim() + '"\r\n' : '') +
                       '\r\nConfira no Mapa da Rede DengueZero:\r\n http://www.denguezero.com.br/cidadao/anonimo/local/' +
                       latShare + '/' + lngShare + '\r\ne entre nesta batalha voc\u00ea tamb\u00e9m!\r\nVeja mais em http://www.denguezero.com.br';
        var method = 'POST', params = { message: mensagem }, xhr = new XMLHttpRequest(), url;
        params['access_token'] = window.localStorage.getItem('fbtoken');
        url = 'https://graph.facebook.com/me/feed?' + facebook.toQueryString(params);
        console.log('INFOAPP: URL INFO: ' + url);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    common.fNotification('Den\u00fancia publicada com sucesso!', 'alert', null);
                } else {
                    var error = xhr.responseText ? JSON.parse(xhr.responseText).error : 'An error has occurred';
                    alert(error);
                }
                $.mobile.loading('hide');
            }
        };
        xhr.open(method, url, true);
        xhr.send();
    },
    parseQueryString: function(queryString) {
        var qs = decodeURIComponent(queryString),
            obj = {},
            params = qs.split('&');
        params.forEach(function (param) {
            var splitter = param.split('=');
            obj[splitter[0]] = splitter[1];
        });
        return obj;
    },
    toQueryString: function(obj) {
        var parts = [];
        for (var i in obj) {
            if (obj.hasOwnProperty(i)) {
                parts.push(encodeURIComponent(i) + "=" + encodeURIComponent(obj[i]));
            }
        }
        return parts.join("&");
    },
    fLogin: function() {
        console.log('INFOAPP: Login Facebook...');
        facebook.login(
                function(response) {
                    if(response.status === 'connected') {
                        window.localStorage.setItem('fbtoken', response.authResponse.accessToken);
                    } else {
                        alert('Falha ao autenticar-se no Facebook: ' + response.error);
                    }
                }, {scope: 'email,public_profile,publish_actions'});
    }
};
facebook.initialize();

