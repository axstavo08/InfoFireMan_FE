/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define(['i18n!js/nls/imessages', 'module/util/resourceRequests', 'module/util/resourceDiary',
    'module/util/resourceFilters', 'select2Config', 'module/ajax/FilterAjax', 'handlebars',
    'dateCalendarPicker', 'calendarConfig', 'select2-es', 'select2.multi-checkboxes', 'filters',
    'jquery.validate-additional'
], function(imessages, resourceRequest, resourceDiary, resourceFilters, select2Config, filterAjax,
                Handlebars, DatepickerWeek, calendarConfig) {

    var globalView, filtersData, filtersComponent = {}, filtersProperty = resourceFilters.PROPERTY,
        filtersDependency = resourceFilters.DEPENDENCY, filtersElement = resourceFilters.ELEMENT,
        filtersSelected = {}, dataDependency, filterAdapter, defaultFilters = {},
        filterSearching = {'element': null, 'validation': false},
        $form = $.dataJS(resourceFilters.FORM), $button;

    //Carga de data
    function loadData(){
        //Obtiene objetos ajax de peticion y ejecuta
		$.when(filterAjax.getTypeEmergency(), filterAjax.getStatus(),
            filterAjax.getDepartments()/*, filterAjax.getProvinces('1')*/)
		.then(doActionsForSuccessfulLoad, doActionsForFailedLoad);
    }

    //Acciones para carga satisfactoria
    function doActionsForSuccessfulLoad(dataTypeEmergency, dataStatus, dataDepartments/*, dataProvinces*/){
        var filterProcessedData;
        filtersData = {};
        dataDependency = {};
        filtersComponent.select = {};
        initializeSelectedAndDefaultFilters();
        if(dataTypeEmergency[1] === resourceRequest.status.success) {
            filterProcessedData = processFilterData(dataTypeEmergency[0], filtersDependency.TYPE_EMERGENCY);
            filtersData[filtersProperty.TYPE_EMERGENCY.NAME] = filterProcessedData.items;
            filtersSelected[filtersProperty.TYPE_EMERGENCY.NAME] = getInitialValuesOfFilters(filtersData[filtersProperty.TYPE_EMERGENCY.NAME]);
        }
        if(dataStatus[1] === resourceRequest.status.success) {
            filterProcessedData = processFilterData(dataStatus[0], filtersDependency.TYPE_STATUS);
            filtersData[filtersProperty.TYPE_STATUS.NAME] = filterProcessedData.items;
            filtersSelected[filtersProperty.TYPE_STATUS.NAME] = getInitialValuesOfFilters(filtersData[filtersProperty.TYPE_STATUS.NAME]);
        }
        if(dataDepartments[1] === resourceRequest.status.success) {
            filterProcessedData = processFilterData(dataDepartments[0], filtersDependency.DEPARTMENT);
            if(filterProcessedData.parent !== null){
                dataDependency[filtersProperty.DEPARTMENT.NAME] = filterProcessedData.parent;
            }
            filtersData[filtersProperty.DEPARTMENT.NAME] = filterProcessedData.items;
            defaultFilters[filtersProperty.DEPARTMENT.NAME] = getInitialValuesOfFilters(filtersData[filtersProperty.DEPARTMENT.NAME]);
            filtersSelected[filtersProperty.DEPARTMENT.NAME] = defaultFilters[filtersProperty.DEPARTMENT.NAME];
        }
        /*if(dataProvinces[1] === resourceRequest.status.success) {
            filterProcessedData = processFilterData(dataProvinces[0], filtersDependency.PROVINCE,
                                    dataDependency[filtersProperty.DEPARTMENT.NAME]);
            filtersData[filtersProperty.PROVINCE.NAME] = filterProcessedData.items;
            defaultFilters[filtersProperty.PROVINCE.NAME] = resourceFilters.DEFAULT.PROVINCE;
            filtersSelected[filtersProperty.PROVINCE.NAME] = defaultFilters[filtersProperty.PROVINCE.NAME];
        }*/
        filtersData[filtersProperty.PROVINCE.NAME] = [];
        defaultFilters[filtersProperty.PROVINCE.NAME] = resourceFilters.DEFAULT.PROVINCE;
        filtersSelected[filtersProperty.PROVINCE.NAME] = defaultFilters[filtersProperty.PROVINCE.NAME];
        buildSelects();
        buildDate();
        createAction();
        globalView.view.load();
    }

    //Acciones para carga erronea
    function doActionsForFailedLoad(jqXHR, textStatus){
        console.error(jqXHR);
        console.error(textStatus);
        console.error('any filter request has failed');
    }

    //Peticion para cargar provincias
    function doActionForProvinces(id){
        var filterProcessedData;
        filterAjax.getProvinces(id).done(function(data, textStatus, jqXHR) {
            if(jqXHR.status === 200){
                filterProcessedData = processFilterData(data, filtersDependency.PROVINCE);
                filtersData[filtersProperty.PROVINCE.NAME] = filterProcessedData.items;
                destroyAndCreateElementSelect2(filtersProperty.PROVINCE.NAME, false,
                                filtersData[filtersProperty.PROVINCE.NAME], buildTemplateSelectionForMultiSelect2,
                                filtersElement.DEPARTMENT.CONTAINER);
            }
        }).fail(function(jqXHR, textStatus, errorThrown) {
            console.error(jqXHR);
            console.error(textStatus);
            console.error('province filter request has failed');
        });
    }

    //Inicializa objeto de filtros seleccionados y valores por defecto
    function initializeSelectedAndDefaultFilters(){
        filtersSelected[filtersProperty.TYPE_EMERGENCY.NAME] = null;
        defaultFilters[filtersProperty.TYPE_EMERGENCY.NAME] = null;
        filtersSelected[filtersProperty.TYPE_STATUS.NAME] = null;
        defaultFilters[filtersProperty.TYPE_STATUS.NAME] = null;
        filtersSelected[filtersProperty.DEPARTMENT.NAME] = null;
        defaultFilters[filtersProperty.DEPARTMENT.NAME] = null;
        filtersSelected[filtersProperty.PROVINCE.NAME] = null;
        defaultFilters[filtersProperty.PROVINCE.NAME] = null;
        filtersSelected[filtersProperty.DATE_TODAY.NAME] = null;
        defaultFilters[filtersProperty.DATE_TODAY.NAME] = null;
    }

    //Procesa data y transforma a formato de select2
    function processFilterData(data, dependency, dataDependency) {
        var items, item, iData, oData, idDependency, dataParent = null;
        if(typeof dependency.PARENT !== 'undefined') {
            if(dependency.PARENT){
                dataParent = {};
            }
        }
        if(dependency.STATUS) {
            items = dataDependency;
            idDependency = dependency.DATA.PARENT;
        } else {
            items = [];
        }
        for(iData in data) {
            oData = data[iData];
            item = {};
            item.id = oData[dependency.DATA.ID];
            item.text = oData[dependency.DATA.LABEL];
            if(typeof dependency.PARENT !== 'undefined') {
                if(dependency.PARENT){
                    dataParent[oData[dependency.DATA.ID].toString()] = [];
                }
            }
            if(dependency.STATUS) {
                items[oData[idDependency].toString()].push(item);
            } else {
                items.push(item);
            }
        }
        return {
            'items': items,
            'parent': dataParent
        };
    }

    //Construye selects
    function buildSelects(){
        var selected, select2Object;
        //Construye selects
        selected = createSelects();
        if(selected){
            //Eventos para filtros de tipos de emergencias
            initializeEventsForElementMultipleSelect2(filtersProperty.TYPE_EMERGENCY.NAME);
            //Eventos para filtros de tipos de estados
            initializeEventsForElementMultipleSelect2(filtersProperty.TYPE_STATUS.NAME);
            //Eventos para filtros de departamentos
            initializeEventsForElementMultipleSelect2(filtersProperty.DEPARTMENT.NAME, false, filtersElement.DEPARTMENT.CONTAINER, filtersProperty.PROVINCE);
            //Eventos para filtros de provincias
            initializeEventsForElementSingleSelect2(filtersProperty.PROVINCE.NAME, true);
            /*$.dataJS('test').on('click', function(){
                console.log(getFiltersSelected());
            });*/
        }
    }

    //Construye componente de fecha
    function buildDate(){
        //Crea fecha
        createDate();
        //Inicializa componente fecha
        filtersComponent.date = new DatepickerWeek($.dataJS(filtersElement.DATE_TODAY.COMPONENT),
                                    $.dataJS(filtersElement.DATE_TODAY.CONTAINER));
        //Construye y crea fecha
        filtersComponent.date.buildAndCreate(calendarConfig.TYPE.TODAY);
        filtersSelected[filtersProperty.DATE_TODAY.NAME] = filtersComponent.date.getParameters().date;
    }

    //Crea componente date
    function createDate(){
        var filtersContent = $.dataJS(resourceFilters.CONTAINER.CONTENT);
        buildContextForElementDate(filtersElement.DATE_TODAY, filtersContent);
		return true;
    }

    //Construye contexto para elemento fecha
    function buildContextForElementDate(configElement, filtersContent){
        var context, source, template, html;
        context = {
            'name': configElement.COMPONENT, 'placeholder': configElement.PLACEHOLDER,
            'validation': configElement.VALIDATION
        };
        source = document.getElementById(resourceFilters.TEMPLATE.date).innerHTML;
        template = Handlebars.compile(source);
        html = template(context);
        filtersContent.append(buildContextForFilterContainer(configElement.COMPONENT,
                                configElement.TITLE, html, configElement.CONTAINER,
                                configElement.VALIDATION));
    }

    //Crea componente de accion
    function createAction() {
        var context, source, template, html,
            filtersContent = $.dataJS(resourceFilters.CONTAINER.CONTENT);
        context = {
            'container': filtersElement.ACTION.CONTAINER, 'name': filtersElement.ACTION.COMPONENT,
            'status': resourceRequest.action.search, 'title': filtersElement.ACTION.TITLE
        };
        source = document.getElementById(resourceFilters.TEMPLATE.action).innerHTML;
        template = Handlebars.compile(source);
        html = template(context);
        filtersContent.append(html);
        $button = $.dataJS(filtersElement.ACTION.COMPONENT);
        $(window).trigger(resourceFilters.TRIGGERS.action);
    }

    //Inicializa eventos para elemento select2 unico
    function initializeEventsForElementSingleSelect2(name, parent, dependency){
        filtersComponent.select[name].on('change', function(e) {
            console.log("change");
            var selectId = $(this).val();
			$(this).valid();
			if(selectId === null){
                if(typeof dependency !== 'undefined' && dependency !== null){
                    filtersComponent.select[dependency.NAME].empty();
                }
                filtersSelected[name] = defaultFilters[name];
			}
        });
        filtersComponent.select[name].on('select2:select', function(e) {
            console.log("select");
            var selectId = $(this).val();
            filtersSelected[name] = selectId;
            if(typeof dependency !== 'undefined' && dependency !== null){
                destroyAndCreateElementSelect2(dependency.NAME,
                                (dependency.TYPE === resourceFilters.TYPE.MULTIPLE) ? true : false,
                                (filtersSelected[name] !== null) ? filtersData[dependency.NAME][selectId] : null,
                                buildTemplateSelectionForMultiSelect2, parent);
            }
        });
    }

    //Inicializa eventos para elemento select2 multiple
    function initializeEventsForElementMultipleSelect2(name, defaultValidation, parent, dependency){
        filtersComponent.select[name].on('select2:close', function(e) {
            var sData;
            console.log("close");
            filtersSelected[name] = getValueOfItemsSelectedForMultiSelect2($(this).val());
            if(filtersSelected[name] === null){
                if(typeof defaultValidation !== 'undefined' && defaultValidation !== null){
                    if(defaultValidation){
                        filtersSelected[name] = defaultFilters[name];
                        console.log(filtersSelected[name]);
                    }
                }
            }
            if(typeof dependency !== 'undefined' && dependency !== null){
                sData = (filtersSelected[name] !== null) ? filtersSelected[name].split(",") : [];
                if(sData.length === 1){
                    doActionForProvinces(sData);
                } else {
                    destroyAndCreateElementSelect2(dependency.NAME,
                                    (dependency.TYPE === resourceFilters.TYPE.MULTIPLE) ? true : false,
                                    [], buildTemplateSelectionForMultiSelect2, parent);
                    defaultFilters[filtersProperty.PROVINCE.NAME] = resourceFilters.DEFAULT.PROVINCE;
                }
            }
        });
        filtersComponent.select[name].on('select2:closing', function(e) {
            console.log("closing");
			$(this).valid();
        });
    }

    //Crea selects para filtros
    function createSelects(){
        var filtersContent = $.dataJS(resourceFilters.CONTAINER.CONTENT);
        buildContextForElementSelectForFilter(resourceFilters.ELEMENT.TYPE_EMERGENCY, filtersContent,
                filtersProperty.TYPE_EMERGENCY.NAME, filtersElement.TYPE_EMERGENCY.COMPONENT,
                filtersData[filtersProperty.TYPE_EMERGENCY.NAME], buildTemplateSelectionForMultiSelect2,
                true, filtersProperty.TYPE_EMERGENCY.TYPE);
        buildContextForElementSelectForFilter(resourceFilters.ELEMENT.TYPE_STATUS, filtersContent,
                filtersProperty.TYPE_STATUS.NAME, filtersElement.TYPE_STATUS.COMPONENT,
                filtersData[filtersProperty.TYPE_STATUS.NAME], buildTemplateSelectionForMultiSelect2,
                true, filtersProperty.TYPE_STATUS.TYPE);
        buildContextForElementSelectForFilter(resourceFilters.ELEMENT.DEPARTMENT, filtersContent,
                filtersProperty.DEPARTMENT.NAME, filtersElement.DEPARTMENT.COMPONENT,
                filtersData[filtersProperty.DEPARTMENT.NAME], buildTemplateSelectionForMultiSelect2,
                true, filtersProperty.DEPARTMENT.TYPE);
        buildContextForElementSelectForFilter(resourceFilters.ELEMENT.PROVINCE, filtersContent,
                filtersProperty.PROVINCE.NAME, filtersElement.PROVINCE.COMPONENT, null,
                null, null, filtersProperty.PROVINCE.TYPE);
		return true;
    }

    //Construye contexto para elemento select de filtro
    function buildContextForElementSelectForFilter(configElement, filtersContent, name,
                component, data, funcTemplateSelection, selected, type){
        var context, source, template, html;
        context = {
            'name': configElement.COMPONENT, 'multiple': configElement.MULTIPLE,
            'validation': configElement.VALIDATION
        };
        source = document.getElementById(resourceFilters.TEMPLATE.select).innerHTML;
        template = Handlebars.compile(source);
        html = template(context);
        filtersContent.append(buildContextForFilterContainer(configElement.COMPONENT,
                                configElement.TITLE, html, configElement.CONTAINER));
        if(type === resourceFilters.TYPE.SINGLE){
            initializeElementCreatedSingleSelect2(name, component, data, configElement.CONTAINER);
        } else if (type === resourceFilters.TYPE.MULTIPLE){
            initializeElementCreatedMultipleSelect2(name, component, data, funcTemplateSelection, selected, configElement.CONTAINER);
        }
    }

    //Construye contexto para contenedor de filtro
    function buildContextForFilterContainer(name, title, element, container){
        var context, source, template, html;
        context = {
            'name': name, 'title': title, 'element': element, 'container': container
        };
        source = document.getElementById(resourceFilters.TEMPLATE.container).innerHTML;
        template = Handlebars.compile(source);
        html = template(context);
        return html;
    }

    //Construye plantilla de seleccion para select2 multiple
    function buildTemplateSelectionForMultiSelect2(selected, total){
        var result = imessages.filters.select.multi.results;
        if(selected.length > 0){
            return result.replace('{{selected}}', selected.length).replace('{{total}}', total);
        }
        return imessages.filters.select.multi.placeholder;
    }

    //Selecciona todas las opciones de select2 multiple
    function selectAllForMultiSelect2(element, name){
        var optionElement = (resourceFilters.ITEM.CHECK).replace('{{name}}', name);
        $(optionElement).prop('selected', 'selected');
        element.trigger("change");
    }

    //Inicializa elemento select2 unico
    function initializeElementCreatedSingleSelect2(name, component, data, parent){
        filtersComponent.select[name] = $.dataJS(component).select2(
            getElementSingleSelect2Configuration(data, parent)
        );
        filtersComponent.select[name].val(null).trigger('change');
    }

    //Inicializa elemento select2 multiple
    function initializeElementCreatedMultipleSelect2(name, component, data, funcTemplateSelection, selected, parent){
        filtersComponent.select[name] = $.dataJS(component).select2MultiCheckboxes(
            getElementMultipleSelect2Configuration(data, funcTemplateSelection, parent)
        );
        if(typeof selected !== 'undefined' && selected !== null){
            if(selected){
                selectAllForMultiSelect2(filtersComponent.select[name], component);
            } else{
                filtersComponent.select[name].val(null).trigger('change');
            }
        }
    }

    //Destruye elemento select2 y crea nuevo
    function destroyAndCreateElementSelect2(name, isMultiple, data, funcTemplateSelection, parent){
        filtersComponent.select[name].select2('destroy').empty().select2(
            (isMultiple) ? getElementMultipleSelect2Configuration(data, funcTemplateSelection, parent)
                         : getElementSingleSelect2Configuration(data, parent)
        );
        filtersComponent.select[name].val(null).trigger('change');
    }

    //Obtiene configuracion para select unico
    function getElementSingleSelect2Configuration(data, parent){
        return {
			'theme': select2Config.THEME.BOOTSTRAP,
			'closeOnSelect': select2Config.CLOSE_ON_SELECT.ACTIVE,
			'language': select2Config.LANGUAGE.ES,
            'data': data,
			'placeholder': imessages.filters.select.multi.placeholder,
			'allowClear': select2Config.ALLOW_CLEAR.ACTIVE,
			'minimumResultsForSearch': resourceFilters.CONFIGURATION.SEARCHING,
            'dropdownParent': $.dataJS(parent)
		};
    }

    //Obtiene configuracion para select multiple
    function getElementMultipleSelect2Configuration(data, funcTemplateSelection, parent){
        return {
            'theme': select2Config.THEME.BOOTSTRAP,
            'language': select2Config.LANGUAGE.ES,
            'placeholder': imessages.filters.select.multi.placeholder,
            'allowClear': select2Config.ALLOW_CLEAR.ACTIVE,
            'data': data,
            'minimumResultsForSearch': resourceFilters.CONFIGURATION.SEARCHING,
            'templateSelection': function(selected, total) {
                return funcTemplateSelection(selected, total);
            },
            'dropdownParent': $.dataJS(parent)
        };
    }

    //Obtiene valor de items seleccionados de select2 multiple
    function getValueOfItemsSelectedForMultiSelect2(selected){
        var iSelected, item, values = null;
        if(selected.length > 0){
            values = "";
            for(iSelected in selected){
                item = selected[iSelected];
                values = values.concat(item).concat(',');
            }
            if(values.length > 0){
                values = values.substring(0, values.length - 1);
            }
        }
        return values;
    }

    //Obtiene valores iniciales de filtros
    function getInitialValuesOfFilters(data){
        var values = null, iData, node;
        if(data.length > 0){
            values = "";
            for(iData in data){
                node = data[iData];
                values = values.concat(node.id).concat(',');
            }
            if(values.length > 0){
                values = values.substring(0, values.length - 1);
            }
        }
        return values;
    }

    /*Inicializa validacion de formulario de filtros*/
	function initializeValidationForm() {
		//Deshabilita atributo required para validacion
		$.validator.messages.required = '';
		//Agrega metodo de validacion para select2 solitario
		$.validator.addMethod("validSelectSingle", function (value, element) {
			//Valida valor de select2
			if(value ===  null || typeof value === 'undefined'){
				return false;
			}
			return true;
		}, "");
        //Agrega metodo de validacion para select2 multiple
		$.validator.addMethod("validSelectMultiple", function (value, element) {
			//Valida valor de select2
			if(value.length === 0){
				return false;
			}
			return true;
		}, "");
		//Valida formulario
		$form.validate({
			'errorClass': 'input-danger-cust',
			'rules': {
				'sEmergencies': {
					'validSelectMultiple': true
				},
				'sStatus': {
					'validSelectMultiple': true
				},
				'sDepartment': {
					'validSelectMultiple': true
				}
			},
			'highlight': function(element) {
				var $element = $(element).next();
				if ($element.hasClass('select2')) {
					$element.parent().find('.select2-selection').addClass('input-danger-cust');
				} else {
					$element.addClass('input-danger-cust');
				}
				$button.addClass("disabled");
			},
			'unhighlight': function(element) {
				var $elementOrigin = $(element), $element = $elementOrigin.next(),
                    validation = false;
                validation = ($elementOrigin.attr('data-validation') === resourceFilters.HELPER.validation);
                if(!validation){
                    if ($element.hasClass('select2')) {
                        $element.parent().find('.select2-selection').removeClass('input-danger-cust');
                    } else {
                        $element.removeClass('input-danger-cust');
                    }
                    $button.removeClass("disabled");
                }
			},
            'errorPlacement': function(error, element) {
            }
		});
	}

    //Obtiene filtros seleccionados
    function getFiltersSelected(){
        if(filtersSelected[filtersProperty.TYPE_EMERGENCY.NAME] === null ||
            filtersSelected[filtersProperty.TYPE_STATUS.NAME] === null){
            return null;
        }
        return filtersSelected;
    }

    //Metodo publico
    function initialize(publicView){
        globalView = publicView;
        filterAjax.initialize(globalView.request.uri);
        initializeValidationForm();
        loadData();
    }

    return {
        'initialize': initialize,
        'getFiltersSelected': getFiltersSelected
    };
});
