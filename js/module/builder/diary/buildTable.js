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
		statusStructure, routesStructure, modalResource = resourceDiary.MODAL;

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
							name = configRoutes.property.name;
						return structure.replace(configRoutes.template.name, name);
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
			listTables[componentProperty.departments] = new DataTable($table, tOptions);
			listTables[componentProperty.departments].createAnGet();
			$.extend(globalView.view.components.tables, listTables);
			globalView.view.validation.table[componentProperty.departments] = true;
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
			listTables[componentProperty.provinces] = new DataTable($table, tOptions);
			listTables[componentProperty.provinces].createAnGet();
			$.extend(globalView.view.components.tables, listTables);
			globalView.view.validation.table[componentProperty.provinces] = true;
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
			'name': componentResource.routes.template.name
        };
        source = document.getElementById(resourceDiary.TEMPLATE.table_routes_column).innerHTML;
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
			console.log("open modal");
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
	}

    return {
		'initialize': initialize,
        'emergencies': buildEmergencies,
		'typeEmergencies': buildTypeEmergencies,
		'typeStatus': buildTypeStatus,
		'departments': buildDepartments,
		'provinces': buildProvinces,
		'districts': buildDistricts
    };
});
