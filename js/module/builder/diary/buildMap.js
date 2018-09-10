/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define([
	'module/util/resourceDiary', 'global-images', 'objectUtil', 'googlemap',
	'handlebars', 'dataview'
], function(resourceDiary, gImages, objUtil, GoogleMap, Handlebars) {

    var globalView, listMaps = {}, mapResource = resourceDiary.MAP,
		componentProperty = resourceDiary.PROPERTY, componentAttribute = resourceDiary.ATTRIBUTE,
		requestsForCentersHelp = {'done': null, 'total': null};

	/*Construye mapa de emergencias*/
    function buildEmergencies(data){
        var map, config = mapResource[componentProperty.emergencies],
			dAttribute = componentAttribute.DATA[componentProperty.emergencies],
			iData, node, statusValidation, position;
		if(globalView.view.validation.map[componentProperty.emergencies] === null){
			globalView.view.validation.map[componentProperty.emergencies] = false;
		}
		if(globalView.view.validation.map[componentProperty.emergencies]){
			listMaps[componentProperty.emergencies].clearMarkers(componentAttribute.STATUS.attending.property);
			listMaps[componentProperty.emergencies].clearMarkers(componentAttribute.STATUS.closed.property);
		} else {
			map = new GoogleMap(config.id);
			map.create(getSpecialType(componentAttribute.STATUS));
			map.createInfoWindow();
			map.createBounds();
			map.createOverlay();
			listMaps[componentProperty.emergencies] = map;
			$.extend(globalView.view.components.maps, listMaps);
			globalView.view.validation.map[componentProperty.emergencies] = true;
		}
		if(data.length > 0){
			for(iData in data){
				node = data[iData];
				if(validateCoordinates(node[dAttribute.latitude], node[dAttribute.longitude])){
					statusValidation = validateStatusType(node[dAttribute.status], componentAttribute.STATUS.attending.title);
					position = GoogleMap.createPosition(node[dAttribute.latitude], node[dAttribute.longitude]);
					listMaps[componentProperty.emergencies].createMarker((statusValidation) ? componentAttribute.STATUS.attending.property : componentAttribute.STATUS.closed.property,
							position, node[dAttribute.type], getIconImage(node[dAttribute.type], componentAttribute.TYPE),
							statusValidation, true, buildStructureForMarkerInformation(node, dAttribute));
					listMaps[componentProperty.emergencies].addPositionToBounds(position);
				}
			}
			listMaps[componentProperty.emergencies].fitWithMarkers();
		}
		if($.dataJS(resourceDiary.TAB.NAME).find('li.active').find('a').attr('data-property') !== resourceDiary.TAB.PROPERTY.main){
			globalView.view.validation.reLoad = true;
		}
    }

	/*Construye mapa de centros de ayuda*/
	function buildCentersHelp(coordinates, data){
		var map, config = mapResource[componentProperty.centersHelp],
			dAttribute = componentAttribute.DATA[componentProperty.centersHelp],
			iData, node, statusValidation, position, directionsService;
		if(globalView.view.validation.map[componentProperty.centersHelp] === null){
			globalView.view.validation.map[componentProperty.centersHelp] = false;
		}
		map = new GoogleMap(config.id);
		map.create(null, coordinates);
		map.createInfoWindow();
		map.createBounds();
		listMaps[componentProperty.centersHelp] = map;
		globalView.view.validation.map[componentProperty.centersHelp] = true;
		directionsService = map.createDirectionsService();
		requestsForCentersHelp.done = 0;
		requestsForCentersHelp.total = data.length;
		if(data.length > 0){
			map.addPositionToBounds(GoogleMap.createPosition(coordinates.latitude, coordinates.longitude));
			for(iData in data){
				node = data[iData];
				if(validateCoordinates(node[dAttribute.latitude], node[dAttribute.longitude])){
					createRouteForCentersHelpMap(map, directionsService, coordinates,
						{'latitude': node[dAttribute.latitude], 'longitude': node[dAttribute.longitude]});
				}
			}
		}
		$.extend(globalView.view.components.maps, listMaps);
	}

	//Crear ruta para mapa de centros de ayuda
	function createRouteForCentersHelpMap(map, directionsService, origin, target){
		var directionsRenderer = map.createDirectionsRenderer();
		map.createRouteDirectionDrivingMode(directionsService, directionsRenderer, origin, target, validateDoneRequestsForCentersHelpMap);
	}

	//Valida peticiones realizadas de centros de ayuda para encajar mapa
	function validateDoneRequestsForCentersHelpMap(request){
		requestsForCentersHelp.done += request;
		if(requestsForCentersHelp.done === requestsForCentersHelp.total){
			listMaps[componentProperty.centersHelp].fitWithMarkers();
		}
	}

	//Obtiene objeto tipo especial
	function getSpecialType(type){
		var special = {};
		special[type.attending.property] = [];
		special[type.closed.property] = [];
		return special;
	}

	//Valida coordenadas
	function validateCoordinates(latitude, longitude){
		var validation = false;
		if(latitude !== null && longitude !== null){
			if(latitude !== 0 && longitude !== 0){
				validation = true;
			}
		}
		return validation;
	}

	//Valida tipo de estado
	function validateStatusType(status, comparative){
		return (status === comparative);
	}

	//Obtiene imagen de icono
	function getIconImage(type, property){
		var url = gImages.MAP_MARKER.pin;
		if(type === property.medical_emergencie){
			url = gImages.MAP_MARKER.medical_emergencie;
		} else if(type === property.fire){
			url = gImages.MAP_MARKER.fire;
		} else if(type === property.incident){
			url = gImages.MAP_MARKER.incident;
		} else if(type === property.vehicular_accident){
			url = gImages.MAP_MARKER.vehicular_accident;
		} else if(type === property.rescue){
			url = gImages.MAP_MARKER.rescue;
		} else if(type === property.special_service){
			url = gImages.MAP_MARKER.special_service;
		} else if(type === property.natural_disasters){
			url = gImages.MAP_MARKER.natural_disasters;
		}
		return GoogleMap.getImageObject(url);
	}

	//Construye estructura para informacion de marcador
	function buildStructureForMarkerInformation(data, attribute){
		var context, source, template, html;
        context = {
            'title': data[attribute.type], 'status': data[attribute.status],
            'address': data[attribute.address], 'date_time': data[attribute.date_time]
        };
        source = document.getElementById(resourceDiary.TEMPLATE.map_marker_info).innerHTML;
        template = Handlebars.compile(source);
		return template(context);
	}

	//Localiza marcador con coordenadas
	function locateMarker(latitude, longitude){
		listMaps[componentProperty.emergencies].locateMarker(latitude, longitude);
		focusMapAfterLocalization(componentProperty.emergencies);
	}

	//Localiza mapa con todos los marcadores
	function locateMap(){
		listMaps[componentProperty.emergencies].fitWithMarkers();
		focusMapAfterLocalization(componentProperty.emergencies);
	}

	//Localiza rutas para centros de ayuda
	function locateRouteForCentersHelp(latitude, longitude){
		listMaps[componentProperty.centersHelp].locateMarker(latitude, longitude);
		focusMapAfterLocalizationInModal(componentProperty.centersHelp);
	}

	//Localiza mapa con todos los marcadores para centros de ayuda
	function locateCentersHelpMap(){
		listMaps[componentProperty.centersHelp].fitWithMarkers();
		focusMapAfterLocalizationInModal(componentProperty.centersHelp);
	}

	//Evento para enfocar mapa
	function focusMapAfterLocalization(property){
		$('html, body').animate({
			'scrollTop': $.dataJS(mapResource[property].helper).offset().top
		}, 1000);
	}

	//Evento para enfocar mapa en modal
	function focusMapAfterLocalizationInModal(property){
		$('.modal-body').animate({
			'scrollTop': ($.dataJS(mapResource[property].helper).offset().top/2) - ($.dataJS(mapResource[property].helper).height()/2)
		}, 1000);
	}

	/*Inicializa variables*/
	function initialize(publicView){
		globalView = publicView;
		globalView.view.validation.map = {};
		globalView.view.validation.map[componentProperty.emergencies] = null;
	}

    return {
		'initialize': initialize, 'emergencies': buildEmergencies, 'locateMarker': locateMarker,
		'locateMap': locateMap, 'centersHelp': buildCentersHelp,
		'locateRouteForCentersHelp': locateRouteForCentersHelp, 'locateCentersHelpMap': locateCentersHelpMap
    };
});
