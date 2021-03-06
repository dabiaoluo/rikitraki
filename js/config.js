'use strict';
// The below is to stop jshint barking at defined but never used variables
/* exported tmConfig */

var tmConfig = {
	// Devellpment port numbers
	DEV_WEB_PORT: '9000',
	DEV_WS_PORT: '3000',
	// This function assumes that the api and the web page are colocated, if that is not the case it will need to be changed
	getApiBaseUrl: function () {
		if (window.location.port === this.DEV_WEB_PORT) {
			return window.location.protocol + '//' + window.location.hostname + ':' + this.DEV_WS_PORT + '/api';
		}
		// Hosted in same nodejs container (local or remote)
		return window.location.protocol + '//' + window.location.host + '/api';
	},
	getTrackId: function () {
		return tmConfig.getUrlVars().track;
	},
	getRegion: function () {
		return decodeURIComponent((tmConfig.getUrlVars().region));
	},
	getGlobeFlag: function () {
		return tmConfig.getUrlVars().globe === 'yes' ? true : false;
	},
	getOverride: function () {
		return tmConfig.getUrlVars().override === 'yes' ? true : false;		
	},
	getTerrainFlag: function () {
		return tmConfig.getUrlVars().terrain === 'yes' ? true : false;
	},
	getLayers: function (f) {
		$.getJSON('config/layers.json', f).fail(function(jqxhr, textStatus, error) {throw error;});
		return f; //f is the function that is invoked when the data is ready
	},
	getUrlVars: function () {
		var urlVars = [];
		var varArray = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
		for (var i = 0; i < varArray.length; i++) {
			var urlVar = varArray[i].split('=');
			urlVars[urlVar[0]] = urlVar[1];
		}
		return urlVars;
	},
	getWebGlFlag: function () {
		// Basic test
		if (!window.WebGLRenderingContext) {
			return false;
		}
		// Ok basic test passed, but can WebGL be initialized?
		var c = document.createElement('canvas'); 
		var webglOptions = { 
			alpha : false, 
			stencil : false, 
			failIfMajorPerformanceCaveat : true
		};
		var gl = c.getContext('webgl', webglOptions) || c.getContext('experimental-webgl', webglOptions) || undefined; 
		if (!gl) { 
			return false; 
		} 
		// This will catch some really crappy versions like IE on virtualized environment
		if (gl.getSupportedExtensions().indexOf('OES_standard_derivatives') < 0) {
			return false;
		}
		// If I got here, it WebGL "should" be supported
		return true; 
	}
};