/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define([
	'i18n!js/nls/imessages', 'module/ajax/DiaryAjax',
	'module/util/resourceDiary', 'module/util/resourceRequests', 'objectUtil',
	'module/builder/diary/buildTable', 'module/builder/diary/buildMap',
	'module/builder/diary/buildChart', 'module/builder/diary/buildInfo',
	'module/builder/diary/buildOverlay'
], function(imessages, diaryAjax, resourceDiary, resourceRequest, objUtil, TableBuilder,
			MapBuilder, ChartBuilder, InfoBuilder, OverlayBuilder) {

	var globalView, requestProperty = resourceRequest.property, requestStatus = resourceRequest.status,
		componentProperty = resourceDiary.PROPERTY, componentAttribute = resourceDiary.ATTRIBUTE,
		overlayResource = resourceDiary.OVERLAY, infoResource = resourceDiary.INFO;

	/*Carga data*/
	function loadData() {
		globalView.request.list = buildListRequests();
        console.log(globalView.request.list);
		globalView.request.counter = buildRequestCounter(Object.keys(globalView.request.list).length);
        console.log(globalView.request.counter);
		doEmergenciesSearch(globalView.request.list[requestProperty.emergencies_information]);
		do24HoursSearch(globalView.request.list[requestProperty.hours_24_information]);
		doTypeEmergenciesSearch(globalView.request.list[requestProperty.type_emergencies_information]);
		doTypeStatusSearch(globalView.request.list[requestProperty.type_status_information]);
		doDepartmentsSearch(globalView.request.list[requestProperty.departments_information]);
		doProvincesSearch(globalView.request.list[requestProperty.provinces_information]);
		doDistrictsSearch(globalView.request.list[requestProperty.districts_information]);
	}

	/*Construye listado de requests*/
	function buildListRequests(){
        var filters = globalView.filters.getSelected(), listRequests = {};
        if(filters === null){
            throw new TypeError(imessages.filters.error.empty);
        } else {
            listRequests[requestProperty.emergencies_information] = diaryAjax.getEmergenciesInformation(filters);
    		listRequests[requestProperty.hours_24_information] = diaryAjax.get24HoursInformation(filters);
            listRequests[requestProperty.type_emergencies_information] = diaryAjax.getTypeEmergenciesInformation(filters);
            listRequests[requestProperty.type_status_information] = diaryAjax.getTypeStatusInformation(filters);
            listRequests[requestProperty.departments_information] = diaryAjax.getDepartmentsInformation(filters);
            listRequests[requestProperty.provinces_information] = diaryAjax.getProvincesInformation(filters);
            listRequests[requestProperty.districts_information] = diaryAjax.getDistrictsInformation(filters);
        }
        return listRequests;
	}


	/*Construye objeto contador de peticiones*/
	function buildRequestCounter(total){
        var counter = {};
        counter[requestStatus.total] = total;
		counter[requestStatus.goal] = 0;
        counter[requestStatus.success] = 0;
        counter[requestStatus.error] = 0;
        counter[requestStatus.warning] = 0;
        counter[requestStatus.empty] = 0;
        counter[requestStatus.abort] = 0;
        return counter;
	}

	/*Accion para peticion de busqueda de emergencias*/
	function doEmergenciesSearch(request){
		request.done(function(data, textStatus, jqXHR) {
			globalView.request.counter[requestStatus.goal]++;
            if (textStatus === requestStatus.success) {
				if(data.length > 0){
					globalView.request.counter[requestStatus.success]++;
				} else {
					globalView.request.counter[requestStatus.empty]++;
				}
            } else {
				globalView.request.counter[requestStatus.warning]++;
			}
			InfoBuilder.lastEmergencie((data.length > 0) ? data.slice(0,1)[0] : null);
			TableBuilder.emergencies(data);
			MapBuilder.emergencies(data);
			validateRequestsForView();
		}).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
			globalView.request.counter[requestStatus.goal]++;
			OverlayBuilder.overlay(overlayResource[componentProperty.emergencies].map);
			OverlayBuilder.overlay(overlayResource[componentProperty.emergencies].table);
			globalView.request.counter[requestStatus.error]++;
			validateRequestsForView();
        });
	}

	/*Accion para peticion de busqueda de 24 horas*/
	function do24HoursSearch(request){
		request.done(function(data, textStatus, jqXHR) {
			globalView.request.counter[requestStatus.goal]++;
            if (textStatus === requestStatus.success) {
				if(data.length > 0){
					globalView.request.counter[requestStatus.success]++;
				} else {
					globalView.request.counter[requestStatus.empty]++;
				}
            } else {
				globalView.request.counter[requestStatus.warning]++;
			}
			ChartBuilder.hours24(data);
			validateRequestsForView();
		}).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
			globalView.request.counter[requestStatus.goal]++;
			OverlayBuilder.overlay(overlayResource[componentProperty.hours24].container);
			globalView.request.counter[requestStatus.error]++;
			validateRequestsForView();
        });
	}

	/*Accion para peticion de busqueda de tipo de emergencias*/
	function doTypeEmergenciesSearch(request){
		request.done(function(data, textStatus, jqXHR) {
			globalView.request.counter[requestStatus.goal]++;
            if (textStatus === requestStatus.success) {
				if(data.length > 0){
					globalView.request.counter[requestStatus.success]++;
				} else {
					globalView.request.counter[requestStatus.empty]++;
				}
            } else {
				globalView.request.counter[requestStatus.warning]++;
			}
			InfoBuilder.typeEmergencies(data);
			ChartBuilder.typeEmergencies(data);
			TableBuilder.typeEmergencies(data);
			validateRequestsForView();
		}).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
			globalView.request.counter[requestStatus.goal]++;
			OverlayBuilder.overlay(overlayResource[componentProperty.typeEmergencies].container);
			globalView.request.counter[requestStatus.error]++;
			validateRequestsForView();
        });
	}

	/*Accion para peticion de busqueda de tipo de estados*/
	function doTypeStatusSearch(request){
		request.done(function(data, textStatus, jqXHR) {
			globalView.request.counter[requestStatus.goal]++;
            if (textStatus === requestStatus.success) {
				if(data.length > 0){
					globalView.request.counter[requestStatus.success]++;
				} else {
					globalView.request.counter[requestStatus.empty]++;
				}
            } else {
				globalView.request.counter[requestStatus.warning]++;
			}
			ChartBuilder.typeStatus(data);
			TableBuilder.typeStatus(data);
			validateRequestsForView();
		}).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
			globalView.request.counter[requestStatus.goal]++;
			OverlayBuilder.overlay(overlayResource[componentProperty.typeStatus].container);
			globalView.request.counter[requestStatus.error]++;
			validateRequestsForView();
        });
	}

	/*Accion para peticion de busqueda de departamentos*/
	function doDepartmentsSearch(request){
		request.done(function(data, textStatus, jqXHR) {
			globalView.request.counter[requestStatus.goal]++;
            if (textStatus === requestStatus.success) {
				if(data.length > 0){
					globalView.request.counter[requestStatus.success]++;
				} else {
					globalView.request.counter[requestStatus.empty]++;
				}
            } else {
				globalView.request.counter[requestStatus.warning]++;
			}
			ChartBuilder.departments(data);
			TableBuilder.departments(data);
			validateRequestsForView();
		}).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
			globalView.request.counter[requestStatus.goal]++;
			OverlayBuilder.overlay(overlayResource[componentProperty.departments].container);
			globalView.request.counter[requestStatus.error]++;
			validateRequestsForView();
        });
	}

	/*Accion para peticion de busqueda de provincias*/
	function doProvincesSearch(request){
		request.done(function(data, textStatus, jqXHR) {
			globalView.request.counter[requestStatus.goal]++;
            if (textStatus === requestStatus.success) {
				if(data.length > 0){
					globalView.request.counter[requestStatus.success]++;
				} else {
					globalView.request.counter[requestStatus.empty]++;
				}
            } else {
				globalView.request.counter[requestStatus.warning]++;
			}
			ChartBuilder.provinces(data);
			TableBuilder.provinces(data);
			validateRequestsForView();
		}).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
			globalView.request.counter[requestStatus.goal]++;
			OverlayBuilder.overlay(overlayResource[componentProperty.provinces].container);
			globalView.request.counter[requestStatus.error]++;
			validateRequestsForView();
        });
	}

	/*Accion para peticion de busqueda de distritos*/
	function doDistrictsSearch(request){
		request.done(function(data, textStatus, jqXHR) {
			globalView.request.counter[requestStatus.goal]++;
            if (textStatus === requestStatus.success) {
				if(data.length > 0){
					globalView.request.counter[requestStatus.success]++;
				} else {
					globalView.request.counter[requestStatus.empty]++;
				}
            } else {
				globalView.request.counter[requestStatus.warning]++;
			}
			ChartBuilder.districts(data);
			TableBuilder.districts(data);
			validateRequestsForView();
		}).fail(function(jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
            console.log(textStatus);
            console.log(errorThrown);
			globalView.request.counter[requestStatus.goal]++;
			OverlayBuilder.overlay(overlayResource[componentProperty.districts].container);
			globalView.request.counter[requestStatus.error]++;
			validateRequestsForView();
        });
	}

	/*Valida contador de peticiones para acciones finales en vista*/
	function validateRequestsForView(){
		if(globalView.request.counter[requestStatus.total] === globalView.request.counter[requestStatus.goal]) {
			if(globalView.view.validation.firstLoad) {
				globalView.view.validation.firstLoad = false;
			} else {
				$.dataJS(infoResource[componentProperty.typeEmergencies].root).sly('reload');
				if(globalView.view.validation.search) {
						globalView.view.validation.search = false;
						setTimeout(function(){
							$.dataJS(resourceDiary.BLOCK_CONTENT).unblock();
						}, 1000);
				}
			}
		}
	}

	/*Metodo de mapa para localizar marcador*/
	function locateMarkerMap(latitude, longitude){
		MapBuilder.locateMarker(latitude, longitude);
	}

	/*Metodo de mapa para localizar mapa*/
	function locateMap(){
		MapBuilder.locateMap();
	}

	/*Inicializa constructor de componentes*/
	function initializeComponentsBuilder(publicView){
		ChartBuilder.initialize(publicView);
		TableBuilder.initialize(publicView);
		MapBuilder.initialize(publicView);
		InfoBuilder.initialize(publicView);
		OverlayBuilder.initialize(publicView);
	}

	/*Metodo publico*/
	function initialize(publicView) {
		globalView =  publicView;
		initializeComponentsBuilder(globalView);
		diaryAjax.initialize(globalView.request.uri);
	}

	return {
		'initialize': initialize,
        'loadData': loadData,
		'locateMarkerMap': locateMarkerMap,
		'locateMap': locateMap
	};
});
