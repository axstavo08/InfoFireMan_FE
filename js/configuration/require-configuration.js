/**
 * Project Name : info-bomberos
 * @author Gustavo Ramos M
 */

requirejs.config({
    locale: 'es',
    paths: {
        //Conf
        'i18n': 'js/library/i18n/i18n',
        //Util
        'dataview': 'js/util/dataview',
        //Modules
        'diary': 'js/module/diary',
		'monthly': 'js/module/monthly',
        //Temlplate
        'template': 'js/configuration/template',
        //Libraries
        'conflicts': 'template/js/conflicts',
        'adminlte': 'template/js/adminlte',
        'bootstrap': 'js/library/bootstrap/js/bootstrap.min',
        'jquery': 'js/library/jquery/js/jquery.min',
        'jquery-ui': 'js/library/jquery-ui/js/jquery-ui.min',
    },
    shim: {
        "global-template": {
            "deps": ['dataview']
        },
        "jquery-ui": {
            deps: ["jquery"]
        },
        "conflicts": {
            deps: ["jquery", "jquery-ui"]
        },
        "bootstrap": {
            deps: ["jquery", "jquery-ui", "conflicts"]
        },
        "adminlte": {
            deps: ["jquery", "jquery-ui", "conflicts", "bootstrap"]
        },
        "template": {
            deps: ["adminlte", "dataview"]
        },
        "dataview": {
            "deps": ['jquery']
        },
    }
});
