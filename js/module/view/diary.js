/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define([
    'pageLoad', 'module/util/resourceDiary', 'topHeader',
    'module/component/diary/filterComponent', 'module/component/diary/viewComponent',
    'module/event/diaryEvent'
], function(PageLoad, resourceDiary, topHeader, filterComponent, viewComponent, diaryEvent) {

    //Variables utiles
    var settings, publicView, wsUri, listTables = {}, listMaps = {}, listCharts = {};

    //Iniciaiza objeto publico para componentes de vista y eventos
    function initializePublicObject() {
        //Construye metodos a usar en eventos
        publicView = {};
		publicView['filters'] = {
            'getSelected': filterComponent.getFiltersSelected
		};
		publicView['view'] = {
            'load': viewComponent.loadData,
            'components': {
                'tables': listTables, 'maps': listMaps, 'charts': listCharts
            },
            'actions': {
                'map': {
                    'locateMarker': viewComponent.locateMarkerMap, 'locateMap': viewComponent.locateMap
                }
            },
            'validation': {
                'info': null, 'lastEmergencieLocalization': null, 'map': null, 'table': null, 'chart': null,
                'reLoad': false, 'search': false, 'firstLoad': true
            }
		};
        publicView['message'] = {

		};
        publicView['request'] = {
            'uri': wsUri, 'list': null, 'counter': null
		};
    }

    //Inicializa eventos y alertas en vista
    function initializeEvents() {
        //Inicializa construccion de eventos
        diaryEvent.initialize(publicView);
    }

    //Inicializa componentes para vista
    function initializeComponents() {
        //Inicializa componente de filtro
        filterComponent.initialize(publicView);
        //Inicializa componente de vista
        viewComponent.initialize(publicView);
    }

    //Inicializa metodos
    function initializeMethods() {
        //Inicializa objeto publico para vista
        initializePublicObject();
        //Inicializa eventos
        initializeEvents();
        //Inicializa componentes para vista
        initializeComponents();
    }

    /*Metodo publico*/
    function initialize(config) {
        //Almacena url de ws
		wsUri = config.urlWs;
        //Inicializa metodos utiles
        initializeMethods();
        //Activa item
        topHeader.activeCurrentItem(config.module);
        //Obtiene configuracion publica
        settings = this.settings;
        //Inicializa PageLoad
        new PageLoad(settings.pageLoad);
    }

    return {
        'initialize': initialize,
        'settings': {
            'pageLoad': 11
        }
    };
});
