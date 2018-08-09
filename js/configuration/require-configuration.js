/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

requirejs.config({
    'locale': 'es',
    'paths': {
        //Configuration
        'i18n': 'js/library/i18n/i18n',
        //Util
        'dataview': 'js/util/dataview',
        'objectUtil': 'js/util/object',
        'dateCalendarPicker': 'js/util/dateCalendarPicker',
        'pageLoad': 'js/util/pageLoad',
        'datatable': 'js/util/datatable',
        'hchart': 'js/util/hchart',
        'googlemap': 'js/util/gmap',
        //Resources
        'select2Config': 'js/resource/select2Configuration',
        'calendarConfig': 'js/resource/calendarConfiguration',
        'globalConfig': 'js/resource/globalConfiguration',
        'datatableConfig': 'js/resource/datatableConfiguration',
        'datatableGlobal': 'js/resource/datatableGlobal',
        'global-images': 'js/resource/images',
        //Components
        'filters': 'js/component/filters',
        'topHeader': 'js/component/topHeader',
        'highcharts-theme': 'js/component/highchartsTheme',
        //Modules
        'module': 'js/module',
        //Template
        'template': 'js/configuration/template',
        //Libraries
        'conflicts': 'template/js/conflicts',
        'adminlte': 'template/js/adminlte',
        'bootstrap': 'js/library/bootstrap/js/bootstrap.min',
        'jquery': 'js/library/jquery/js/jquery.min',
        'jquery-ui': 'js/library/jquery-ui/js/jquery-ui.min',
        'jquery-cookie': 'js/library/jquery-cookie/jquery.cookie',
        'select2': 'js/library/select2/dist/js/select2.full.min',
        'select2-library': 'js/library/select2/src/js/select2',
        'select2-es': 'js/library/select2/dist/js/i18n/es',
        'icheck': 'js/library/icheck/icheck.min',
        'handlebars': 'js/library/handlebars/handlebars-v4.0.11',
        'select2.multi-checkboxes': 'js/library/select2-multi-checkboxes/select2.multi-checkboxes',
        'moment': 'js/library/moment/min/moment.min',
        'moment-with-locales': 'js/library/moment/min/moment-with-locales.min',
        'jquery.daterangepicker': 'js/library/jquery-date-range-picker/dist/jquery.daterangepicker.min',
        'jquery.validate.min': 'js/library/jquery-validation-1.17.0/dist/jquery.validate.min',
        'jquery-messages_es_PE': 'js/library/jquery-validation-1.17.0/src/localization/messages_es_PE',
		'jquery.validate-additional': 'js/library/jquery-validation-1.17.0/dist/additional-methods.min',
        'bootbox': 'js/library/bootbox/4.4.0/bootbox.min',
        'bootbox-def': 'js/library/bootbox/4.4.0/bootbox-def',
        'jquery-circle-progress': 'js/library/jquery-circle-progress/1.2.2/circle-progress',
        'datatables.net': 'js/library/datatables-1.10.16/js/jquery.dataTables.min',
		'dataTables.bootstrap': 'js/library/datatables-1.10.16/js/dataTables.bootstrap.min',
        'datatables-ellipsis': 'js/library/datatables-1.10.16/plugins/dataRender/ellipsis',
        'gmaps': 'https://maps.googleapis.com/maps/api/js?key=AIzaSyB6R-S8OVhszlIPhj4t0QRUBU5XZUIikQ4',
        'highcharts-common': 'js/library/highcharts/highcharts',
        'highcharts-no-data-to-display': 'js/library/highcharts/modules/no-data-to-display',
        'sly-scroll': 'js/library/sly-scroll/dist/sly.min',
        'jquery.easing': 'js/library/sly-scroll/external/jquery.easing.min',
        'blockui': "js/library/blockui/jquery.blockUI"
    },
    'shim': {
        'global-template': {
            'deps': ['dataview']
        },
        'jquery-ui': {
            'deps': ['jquery']
        },
        'jquery-cookie': {
            'deps': ['jquery']
        },
        'conflicts': {
            'deps': ['jquery', 'jquery-ui']
        },
        'bootstrap': {
            'deps': ['jquery', 'jquery-ui', 'conflicts']
        },
        'adminlte': {
            'deps': ['jquery', 'jquery-ui', 'jquery-cookie', 'conflicts', 'bootstrap']
        },
        'template': {
            'deps': ['adminlte', 'dataview']
        },
        'dataview': {
            'deps': ['jquery']
        },
        'filters': {
            'deps': ['jquery']
        },
        'topHeader': {
            'deps': ['jquery']
        },
        'select2-library': {
            'deps': ['select2']
        },
        'select2': {
           'deps': ['jquery']
        },
        'select2-es': {
           'deps': ['select2']
        },
        'icheck': {
            'deps': ['jquery']
        },
        'select2.multi-checkboxes': {
           'deps': ['select2']
        },
        'moment-with-locales': {
           'deps': ['moment']
        },
        'jquery.daterangepicker': {
            'deps': ['jquery', 'moment-with-locales']
        },
        'jquery.validate.min': {
			'deps': ['jquery']
		},
		'jquery-messages_es_PE': {
			'deps': ['jquery.validate.min']
		},
		'jquery.validate-additional': {
			'deps': ['jquery-messages_es_PE']
		},
        'bootbox': {
            'deps': ['jquery', 'bootstrap'],
            'exports': 'bootbox'
        },
        'jquery-circle-progress': {
            'deps': ['jquery']
        },
        'datatables.net': {
            'deps': ['jquery']
        },
        'dataTables.bootstrap': {
           'deps': ['jquery', 'datatables.net']
        },
        'datatables-ellipsis': {
           'deps': ['datatables.net']
        },
        'gmaps': {
            'exports': 'google.maps'
        },
        'highcharts-common': {
            'exports': 'Highcharts'
        },
        'highcharts-no-data-to-display': {
            'deps': ['highcharts-common']
        },
        'highcharts-theme': {
            'deps': ['highcharts-common']
        },
        'sly-scroll': {
            'deps': ['jquery']
        },
        'jquery.easing': {
            'deps': ['jquery']
        },
        'blockui': {
            'deps': ['jquery']
        }
    }
});
