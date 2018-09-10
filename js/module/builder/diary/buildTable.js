/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define([
	'module/util/resourceDiary', 'objectUtil', 'datatableConfig', 'datatableGlobal', 'datatable',
	'handlebars', 'dataview'
], function(resourceDiary, objUtil, configDataTable, globalDatatable, DataTable, Handlebars) {

    var globalView, localizationStructure, listTables = {}, tableResource = resourceDiary.TABLE,
        componentProperty = resourceDiary.PROPERTY, componentResource = resourceDiary.COMPONENT,
		componentAttribute = resourceDiary.ATTRIBUTE, componentAnimation = resourceDiary.ANIMATION,
		statusStructure, routesStructure, modalResource = resourceDiary.MODAL, searchStructure,
		overlayResource = resourceDiary.OVERLAY;

	/*Construye tabla de emergencias*/
    function buildEmergencies(data){
		var config = tableResource[componentProperty.emergencies], $table, idTable, tOptions = {},
			dAttribute = componentAttribute.DATA[componentProperty.emergencies];
		if(globalView.view.validation.table[componentProperty.emergencies] === null){
			globalView.view.validation.table[componentProperty.emergencies] = false;
		}
		idTable = config.id;
        if (DataTable.existsTable(idTable) && globalView.view.validation.table[componentProperty.emergencies]) {
			listTables[componentProperty.emergencies].updateRows(data);
        } else {
			$table = $.dataJS(idTable);
            $.extend(tOptions, config.options);
			tOptions.oLanguage = globalDatatable.language();
			tOptions.data = data;
			tOptions.columnDefs = [
				{
					'targets': config.util.columnDefs.localization,
					'render': function(data, type, row, meta) {
						var structure = localizationStructure, configLocalization = componentResource.localization,
							name = configLocalization.property.unknown, defaultStyle = configLocalization.property.default_style,
							latitude = configLocalization.property.unknown, longitude = configLocalization.property.unknown,
							animation = componentAnimation.disabled;
						if(row[dAttribute.latitude] !== null && row[dAttribute.longitude] !== null){
							latitude = row[dAttribute.latitude];
							longitude = row[dAttribute.longitude];
							if(row[dAttribute.latitude] !== 0 && row[dAttribute.longitude] !== 0){
								name = configLocalization.property.name;
								defaultStyle = "";
								animation = componentAnimation.zoom_map;
							}
						}
						return structure.replace(configLocalization.template.name, name)
										.replace(configLocalization.template.latitude, latitude)
										.replace(configLocalization.template.longitude, longitude)
										.replace(configLocalization.template.disable_style, defaultStyle)
										.replace(configLocalization.template.animation, animation);
					}
				},
				{
					'targets': config.util.columnDefs.align,
					'createdCell': function(td, cellData, rowData, row, col){
						$(td).addClass(config.util.style.text_left);
					}
				},
				{
					'targets': config.util.columnDefs.status,
					'render': function(data, type, row, meta) {
						var structure = statusStructure, style = "";
						if(data === componentResource.status.label.attending){
							style = componentResource.status.status.attending;
						} else if(data === componentResource.status.label.closed){
							style = componentResource.status.status.closed;
						}
						return structure.replace(componentResource.status.template.style, style)
								.replace(componentResource.status.template.status, data);
					}
				},
				{
					'targets': config.util.columnDefs.routes,
					'render': function(data, type, row, meta) {
						var structure = routesStructure, configRoutes = componentResource.routes,
							name = configRoutes.property.unknown, defaultStyle = configRoutes.property.default_style,
							latitude = configRoutes.property.unknown, longitude = configRoutes.property.unknown,
							emergencie = configRoutes.property.unknown;
						if(row[dAttribute.latitude] !== null && row[dAttribute.longitude] !== null){
							latitude = row[dAttribute.latitude];
							longitude = row[dAttribute.longitude];
							emergencie = row[dAttribute.id];
							if(row[dAttribute.latitude] !== 0 && row[dAttribute.longitude] !== 0){
								name = configRoutes.property.name;
								defaultStyle = "";
							}
						}
						return structure.replace(configRoutes.template.name, name)
										.replace(configRoutes.template.disable_style, defaultStyle)
										.replace(configRoutes.template.longitude, longitude)
										.replace(configRoutes.template.latitude, latitude)
										.replace(configRoutes.template.emergencie, emergencie);
					}
				}
			];
			tOptions.initComplete = function(settings, json) {
				initializeLocalizationEvent();
			}
			listTables[componentProperty.emergencies] = new DataTable($table, tOptions);
			listTables[componentProperty.emergencies].createAnGet();
			$.extend(globalView.view.components.tables, listTables);
			globalView.view.validation.table[componentProperty.emergencies] = true;
			initializeEvents();
		}
    }

	/*Construye tabla de tipos de emergencias*/
    function buildTypeEmergencies(data){
		var config = tableResource[componentProperty.typeEmergencies], $table, idTable, tOptions = {};
		if(globalView.view.validation.table[componentProperty.typeEmergencies] === null){
			globalView.view.validation.table[componentProperty.typeEmergencies] = false;
		}
		idTable = config.id;
		if (DataTable.existsTable(idTable) && globalView.view.validation.table[componentProperty.typeEmergencies]) {
			listTables[componentProperty.typeEmergencies].updateRows(data);
		} else {
			$table = $.dataJS(idTable);
			$.extend(tOptions, config.options);
			tOptions.oLanguage = globalDatatable.language();
			tOptions.data = data;
			listTables[componentProperty.typeEmergencies] = new DataTable($table, tOptions);
			listTables[componentProperty.typeEmergencies].createAnGet();
			$.extend(globalView.view.components.tables, listTables);
			globalView.view.validation.table[componentProperty.typeEmergencies] = true;
		}
	}

	/*Construye tabla de tipos de estados*/
    function buildTypeStatus(data){
		var config = tableResource[componentProperty.typeStatus], $table, idTable, tOptions = {};
		if(globalView.view.validation.table[componentProperty.typeStatus] === null){
			globalView.view.validation.table[componentProperty.typeStatus] = false;
		}
		idTable = config.id;
		if (DataTable.existsTable(idTable) && globalView.view.validation.table[componentProperty.typeStatus]) {
			listTables[componentProperty.typeStatus].updateRows(data);
		} else {
			$table = $.dataJS(idTable);
			$.extend(tOptions, config.options);
			tOptions.oLanguage = globalDatatable.language();
			tOptions.data = data;
			listTables[componentProperty.typeStatus] = new DataTable($table, tOptions);
			listTables[componentProperty.typeStatus].createAnGet();
			$.extend(globalView.view.components.tables, listTables);
			globalView.view.validation.table[componentProperty.typeStatus] = true;
		}
	}

	/*Construye tabla de departamentos*/
    function buildDepartments(data){
		var config = tableResource[componentProperty.departments], $table, idTable, tOptions = {};
		if(globalView.view.validation.table[componentProperty.departments] === null){
			globalView.view.validation.table[componentProperty.departments] = false;
		}
		idTable = config.id;
		if (DataTable.existsTable(idTable) && globalView.view.validation.table[componentProperty.departments]) {
			listTables[componentProperty.departments].updateRows(data);
		} else {
			$table = $.dataJS(idTable);
			$.extend(tOptions, config.options);
			tOptions.oLanguage = globalDatatable.language();
			tOptions.data = data;
			tOptions.columnDefs.push({
				'targets': config.util.columnDefs.search,
				'render': function(data, type, row, meta) {
					var structure = searchStructure, configSearch = componentResource.search,
						name = configSearch.property.name, id = row[config.util.property.id],
						type = configSearch.type.department;
					return structure.replace(configSearch.template.name, name)
									.replace(configSearch.template.id, id)
									.replace(configSearch.template.type, type)
									.replace(configSearch.template.identity, name);
				}
			});
			listTables[componentProperty.departments] = new DataTable($table, tOptions);
			listTables[componentProperty.departments].createAnGet();
			$.extend(globalView.view.components.tables, listTables);
			globalView.view.validation.table[componentProperty.departments] = true;
			initializeGeoEvents(componentProperty.departments);
		}
	}

	/*Construye tabla de provincias*/
    function buildProvinces(data){
		var config = tableResource[componentProperty.provinces], $table, idTable, tOptions = {};
		if(globalView.view.validation.table[componentProperty.provinces] === null){
			globalView.view.validation.table[componentProperty.provinces] = false;
		}
		idTable = config.id;
		if (DataTable.existsTable(idTable) && globalView.view.validation.table[componentProperty.provinces]) {
			listTables[componentProperty.provinces].updateRows(data);
		} else {
			$table = $.dataJS(idTable);
			$.extend(tOptions, config.options);
			tOptions.oLanguage = globalDatatable.language();
			tOptions.data = data;
			tOptions.columnDefs.push({
				'targets': config.util.columnDefs.search,
				'render': function(data, type, row, meta) {
					var structure = searchStructure, configSearch = componentResource.search,
						name = configSearch.property.name, id = row[config.util.property.id],
						type = configSearch.type.province;
					return structure.replace(configSearch.template.name, name)
									.replace(configSearch.template.id, id)
									.replace(configSearch.template.type, type)
									.replace(configSearch.template.identity, name);
				}
			});
			listTables[componentProperty.provinces] = new DataTable($table, tOptions);
			listTables[componentProperty.provinces].createAnGet();
			$.extend(globalView.view.components.tables, listTables);
			globalView.view.validation.table[componentProperty.provinces] = true;
			initializeGeoEvents(componentProperty.provinces);
		}
	}

	/*Construye tabla de distritos*/
    function buildDistricts(data){
		var config = tableResource[componentProperty.districts], $table, idTable, tOptions = {};
		if(globalView.view.validation.table[componentProperty.districts] === null){
			globalView.view.validation.table[componentProperty.districts] = false;
		}
		idTable = config.id;
		if (DataTable.existsTable(idTable) && globalView.view.validation.table[componentProperty.districts]) {
			listTables[componentProperty.districts].updateRows(data);
		} else {
			$table = $.dataJS(idTable);
			$.extend(tOptions, config.options);
			tOptions.oLanguage = globalDatatable.language();
			tOptions.data = data;
			listTables[componentProperty.districts] = new DataTable($table, tOptions);
			listTables[componentProperty.districts].createAnGet();
			$.extend(globalView.view.components.tables, listTables);
			globalView.view.validation.table[componentProperty.districts] = true;
		}
	}

	/*Construye tabla de centros de ayuda*/
    function buildCentersHelp(data){
		var config = tableResource[componentProperty.centersHelp], $table, idTable, tOptions = {},
			dAttribute = componentAttribute.DATA[componentProperty.centersHelp];
		if(globalView.view.validation.table[componentProperty.centersHelp] === null){
			globalView.view.validation.table[componentProperty.centersHelp] = false;
		}
		idTable = config.id;
        if (DataTable.existsTable(idTable) && globalView.view.validation.table[componentProperty.centersHelp]) {
			listTables[componentProperty.centersHelp].updateRows(data);
        } else {
			$table = $.dataJS(idTable);
            $.extend(tOptions, config.options);
			tOptions.oLanguage = globalDatatable.language();
			tOptions.data = data;
			tOptions.columnDefs = [
				{
					'targets': config.util.columnDefs.localization,
					'render': function(data, type, row, meta) {
						var structure = localizationStructure, configLocalization = componentResource.localization,
							name = configLocalization.property.unknown, defaultStyle = configLocalization.property.default_style,
							latitude = configLocalization.property.unknown, longitude = configLocalization.property.unknown,
							animation = componentAnimation.disabled;
						if(row[dAttribute.latitude] !== null && row[dAttribute.longitude] !== null){
							latitude = row[dAttribute.latitude];
							longitude = row[dAttribute.longitude];
							if(row[dAttribute.latitude] !== 0 && row[dAttribute.longitude] !== 0){
								name = configLocalization.property.name_CH;
								defaultStyle = "";
								animation = componentAnimation.zoom_map;
							}
						}
						return structure.replace(configLocalization.template.name, name)
										.replace(configLocalization.template.latitude, latitude)
										.replace(configLocalization.template.longitude, longitude)
										.replace(configLocalization.template.disable_style, defaultStyle)
										.replace(configLocalization.template.animation, animation);
					}
				},
				{
					'targets': config.util.columnDefs.align,
					'createdCell': function(td, cellData, rowData, row, col){
						$(td).addClass(config.util.style.text_left);
					}
				}
			];
			tOptions.initComplete = function(settings, json) {
				initializeLocalizationEventForCentersHelp();
			}
			listTables[componentProperty.centersHelp] = new DataTable($table, tOptions);
			listTables[componentProperty.centersHelp].createAnGet();
			$.extend(globalView.view.components.tables, listTables);
			globalView.view.validation.table[componentProperty.centersHelp] = true;
			initializeEventsForCentersHelp();
		}
    }

	/*Construye estructura para localizacion de marcadores*/
	function buildStructureToLocateMarkers(){
		var context, source, template, html;
        context = {
            'disable-style': componentResource.localization.template.disable_style,
			'name': componentResource.localization.template.name,
            'longitude': componentResource.localization.template.longitude,
			'latitude': componentResource.localization.template.latitude,
			'animation': componentResource.localization.template.animation
        };
        source = document.getElementById(resourceDiary.TEMPLATE.table_localization_column).innerHTML;
        template = Handlebars.compile(source);
		return template(context);
	}

	/*Construye estructura para estado de tipo de emergencia*/
	function buildStructureToTypeEmergencieStatus(){
		var context, source, template, html;
        context = {
            'style': componentResource.status.template.style,
			'status': componentResource.status.template.status
        };
        source = document.getElementById(resourceDiary.TEMPLATE.tables_status_column).innerHTML;
        template = Handlebars.compile(source);
		return template(context);
	}

	/*Construye estructura para rutas de marcadores*/
	function buildStructureToRoutesMarkers(){
		var context, source, template, html;
        context = {
			'name': componentResource.routes.template.name,
			'disable-style': componentResource.routes.template.disable_style,
			'longitude': componentResource.routes.template.longitude,
			'latitude': componentResource.routes.template.latitude,
			'emergencie': componentResource.routes.template.emergencie
        };
        source = document.getElementById(resourceDiary.TEMPLATE.table_routes_column).innerHTML;
        template = Handlebars.compile(source);
		return template(context);
	}

	/*Construye estructura para buscador*/
	function buildStructureToSearch(){
		var context, source, template, html;
        context = {
			'name': componentResource.search.template.name, 'id': componentResource.search.template.id,
			'type': componentResource.search.template.type, 'identity': componentResource.search.template.identity,
        };
        source = document.getElementById(resourceDiary.TEMPLATE.table_search_column).innerHTML;
        template = Handlebars.compile(source);
		return template(context);
	}

	/*Inicializa eventos para tabla*/
	function initializeEvents() {
		listTables[componentProperty.emergencies].get().on('draw.dt', function () {
			initializeLocalizationEvent();
		});
	}

	/*Inicializa evento click para boton de localizacion*/
	function initializeLocalizationEvent() {
		//Boton de localizacion
		$.dataJS(componentResource.localization.property.name).off('click');
		$.dataJS(componentResource.localization.property.name).on('click', function() {
			var $element = $(this), animation = $element.attr('data-animation');
			setInactiveStatusLocalizationButtons();
			if(animation === componentAnimation.zoom_map) {
				$element.removeClass(componentResource.localization.status.inactive)
						.removeClass(componentResource.localization.status.inactive_extra)
						.addClass(componentResource.localization.status.active);
				$element.attr('data-animation', componentAnimation.zoom_marker);
				globalView.view.actions.map.locateMarker($element.attr('data-lat'), $element.attr('data-lon'));
			} else {
				globalView.view.actions.map.locateMap();
			}
		});
		//Boton de rutas
		$.dataJS(componentResource.routes.property.name).off('click');
		$.dataJS(componentResource.routes.property.name).on('click', function() {
			var $element = $(this);
			globalView.view.loadCentersHelp($element.attr('data-emergencie'),
						{'latitude': parseFloat($element.attr('data-lat')), 'longitude': parseFloat($element.attr('data-lon'))});
			$.dataJS(modalResource.name).modal('show');
		});
	}

	/*Cambia a estado inactivo botones de localizacion*/
	function setInactiveStatusLocalizationButtons(){
		$.dataJS(componentResource.localization.property.name).removeClass(componentResource.localization.status.active)
				.addClass(componentResource.localization.status.inactive)
				.addClass(componentResource.localization.status.inactive_extra);
		$.dataJS(componentResource.localization.property.name).attr('data-animation', componentAnimation.zoom_map);
		$.dataJS(componentResource.localization.property.nameUnique).removeClass(componentResource.localization.status.active)
				.addClass(componentResource.localization.status.inactive)
				.addClass(componentResource.localization.status.inactive_extra);
		$.dataJS(componentResource.localization.property.nameUnique).attr('data-animation', componentAnimation.zoom_map);
	}

	/*Inicializa eventos para tablas geograficos*/
	function initializeGeoEvents(table) {
		listTables[table].get().on('draw.dt', function () {
			initializeSearchGeoEvent();
		});
	}

	/*Inicializa evento click para boton de busqueda geografica*/
	function initializeSearchGeoEvent() {
		//Boton geografico
		$.dataJS(componentResource.search.property.name).off('click');
		$.dataJS(componentResource.search.property.name).on('click', function() {
			var $element = $(this), id = $element.attr('data-id'), type = $element.attr('data-type'),
				attrType = componentResource.search.type, $group = componentResource.search.property.group;
			switch(type){
				case attrType.department:
					$group = $group.replace(componentResource.search.template.type,type);
					$($group).addClass('disabled');
					centerScrollViewToTargetContainer(overlayResource.provinces.container.name);
					globalView.view.loadGeo.provinces(id, $($group));
				break;
				case attrType.province:
					$group = $group.replace(componentResource.search.template.type,type);
					$($group).addClass('disabled');
					centerScrollViewToTargetContainer(overlayResource.districts.container.name);
					globalView.view.loadGeo.districts(id, $($group));
				break;
			}
		});
	}

	/*Centra scroll a contenedor destino*/
	function centerScrollViewToTargetContainer(name){
		$('html, body').animate({
			'scrollTop': $.dataJS(name).offset().top
		}, 1000);
	}

	/*Inicializa eventos para tabla de centros de ayuda*/
	function initializeEventsForCentersHelp() {
		listTables[componentProperty.centersHelp].get().on('draw.dt', function () {
			initializeLocalizationEventForCentersHelp();
		});
	}

	/*Inicializa evento click para boton de localizacion de tabla de centros de ayuda*/
	function initializeLocalizationEventForCentersHelp() {
		//Boton de localizacion
		$.dataJS(componentResource.localization.property.name_CH).off('click');
		$.dataJS(componentResource.localization.property.name_CH).on('click', function() {
			var $element = $(this), animation = $element.attr('data-animation');
			setInactiveStatusLocalizationButtonsForCentersHelp();
			if(animation === componentAnimation.zoom_map) {
				$element.removeClass(componentResource.localization.status.inactive)
						.removeClass(componentResource.localization.status.inactive_extra)
						.addClass(componentResource.localization.status.active);
				$element.attr('data-animation', componentAnimation.zoom_marker);
				globalView.view.actions.map.locateRouteCentersHelp($element.attr('data-lat'), $element.attr('data-lon'));
			} else {
				globalView.view.actions.map.locateCentersHelpMap();
			}
		});
	}

	/*Cambia a estado inactivo botones de localizacion para centros de ayuda*/
	function setInactiveStatusLocalizationButtonsForCentersHelp(){
		$.dataJS(componentResource.localization.property.name_CH).removeClass(componentResource.localization.status.active)
				.addClass(componentResource.localization.status.inactive)
				.addClass(componentResource.localization.status.inactive_extra);
		$.dataJS(componentResource.localization.property.name_CH).attr('data-animation', componentAnimation.zoom_map);
	}

	/*Inicializa variables*/
	function initialize(publicView){
		globalView = publicView;
		globalView.view.validation.table = {};
		globalView.view.validation.table[componentProperty.emergencies] = null;
		globalView.view.validation.table[componentProperty.typeEmergencies] = null;
		globalView.view.validation.table[componentProperty.typeStatus] = null;
		globalView.view.validation.table[componentProperty.departments] = null;
		globalView.view.validation.table[componentProperty.provinces] = null;
		globalView.view.validation.table[componentProperty.districts] = null;
		localizationStructure = buildStructureToLocateMarkers();
		statusStructure = buildStructureToTypeEmergencieStatus();
		routesStructure = buildStructureToRoutesMarkers();
		searchStructure = buildStructureToSearch();
	}

    return {
		'initialize': initialize, 'emergencies': buildEmergencies, 'typeEmergencies': buildTypeEmergencies,
		'typeStatus': buildTypeStatus, 'departments': buildDepartments, 'provinces': buildProvinces,
		'districts': buildDistricts, 'centersHelp': buildCentersHelp,
    };
});
