/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define([
	'i18n!js/nls/imessages', 'module/util/resourceDiary', 'global-images', 'objectUtil',
    'handlebars', 'dataview', 'sly-scroll', 'jquery.easing'
], function(imessages, resourceDiary, gImages, objUtil, Handlebars) {

    var globalView, infoResource = resourceDiary.INFO, componentResource = resourceDiary.COMPONENT,
		componentProperty = resourceDiary.PROPERTY, componentAttribute = resourceDiary.ATTRIBUTE,
        componentAnimation = resourceDiary.ANIMATION, slyExistence = true;

	/*Renderiza ultima emergencia*/
    function renderLastEmergencie(data){
        var config = infoResource[componentProperty.lastEmergencie],
            dAttribute = componentAttribute.DATA[componentProperty.emergencies],
            type = config.default.type, address = config.default.address;
        if(data !== null){
            type = data[dAttribute.type];
            address = data[dAttribute.address];
            if(globalView.view.validation.lastEmergencieLocalization === null){
                globalView.view.validation.lastEmergencieLocalization = false;
            }
            if(globalView.view.validation.lastEmergencieLocalization){
                $.dataJS(componentResource.localization.property.nameUnique)
						.removeClass(componentResource.localization.status.active)
                        .addClass(componentResource.localization.status.inactive)
                        .addClass(componentResource.localization.status.inactive_extra);
                $.dataJS(componentResource.localization.property.nameUnique).attr('data-lon', data[dAttribute.longitude])
                        .attr('data-lat', data[dAttribute.latitude]).attr('data-animation', componentAnimation.zoom_map);
            } else {
                $.dataJS(config.container).append(
                    buildLocalizationButton(componentResource.localization.property.nameUnique,
                        data[dAttribute.latitude], data[dAttribute.longitude],
                        componentAnimation.zoom_map));
                initializeEventForLocalizationButton();
                globalView.view.validation.lastEmergencieLocalization = true;
            }
        } else {
            if(globalView.view.validation.lastEmergencieLocalization){
                $.dataJS(componentResource.localization.property.nameUnique).remove();
                globalView.view.validation.lastEmergencieLocalization = false;
            }
        }
        $.dataJS(config.type).text(type);
        $.dataJS(config.address).text(address);
    }

    /*Construye boton de localizacion*/
    function buildLocalizationButton(name, latitude, longitude, animation){
        var context, source, template, html;
        context = {
            'disable-style': "", 'name': name, 'longitude': longitude, 'latitude': latitude, 'animation': animation
        };
        source = document.getElementById(resourceDiary.TEMPLATE.table_localization_column).innerHTML;
        template = Handlebars.compile(source);
		return template(context);
    }

    /*Inicializa evento para boton de localizar*/
    function initializeEventForLocalizationButton(){
        $.dataJS(componentResource.localization.property.nameUnique).on('click', function() {
            var $element = $(this), animation = $element.attr('data-animation');
            $.dataJS(componentResource.localization.property.name).removeClass(componentResource.localization.status.active)
    				.addClass(componentResource.localization.status.inactive)
    				.addClass(componentResource.localization.status.inactive_extra);
    		$.dataJS(componentResource.localization.property.name).attr('data-animation', componentAnimation.zoom_map);
            if(animation === componentAnimation.zoom_map) {
                $element.removeClass(componentResource.localization.status.inactive)
                        .removeClass(componentResource.localization.status.inactive_extra)
                        .addClass(componentResource.localization.status.active);
                $element.attr('data-animation', componentAnimation.zoom_marker);
                globalView.view.actions.map.locateMarker($element.attr('data-lat'), $element.attr('data-lon'));
            } else {
                $element.removeClass(componentResource.localization.status.active)
                        .addClass(componentResource.localization.status.inactive)
                        .addClass(componentResource.localization.status.inactive_extra);
                $element.attr('data-animation', componentAnimation.zoom_map);
                globalView.view.actions.map.locateMap();
            }
        });
    }

    /*Renderiza tipos de emergencias*/
    function renderTypeEmergencies(data){
        var iData, node, attribute = componentAttribute.DATA[componentProperty.typeEmergencies],
            config = infoResource[componentProperty.typeEmergencies], quantity, percentage, type,
            property, description, $parent = $.dataJS(infoResource[componentProperty.typeEmergencies].parent),
			$root = $.dataJS(infoResource[componentProperty.typeEmergencies].root),
			$wrapRoot = $root.parent(), firstItem = true;
		if(globalView.view.validation.info === null){
            globalView.view.validation.info = {};
        }
		reInitializeTypeEmergenciesElements($parent.find('li'), config.util.root_existence);
        for(iData in data){
            node = data[iData];
            quantity = node[attribute.quantity];
            percentage = node[attribute.percentage].toFixed(2);
            type = node[attribute.type];
            property = getPropertyForTypeEmergencie(type);
            description = (imessages.diary[componentProperty.typeEmergencies].description)
                            .replace(config.util.description, percentage);
            if(typeof property !== 'undefined'){
				if(typeof globalView.view.validation.info[property] === 'undefined') {
					globalView.view.validation.info[property] = false;
				}
                if(globalView.view.validation.info[property]){
                    updateInfoTypeEmergencie(config.options[property], type, quantity,
                                percentage.toString().concat('%'), description);
					$.dataJS(config.options[property].root).attr('data-existence', config.util.root_existence.ok);
                } else {
					$parent.append(createInfoTypeEmergencie(getColumnWidthByWindowWidth(config.util),
									config.options[property], gImages.INFO_TYPE_EMERGENCIE[property],
									type, quantity, percentage, description, firstItem));
					if(firstItem){
						firstItem = false;
					}
                    globalView.view.validation.info[property] = true;
                }
            }
        }
		if(slyExistence) {
			$root.sly({
				horizontal: 1,
				itemNav: 'basic',
				smart: 1,
				activateMiddle: 1,
				activateOn: 'click',
				mouseDragging: 1,
				touchDragging: 1,
				releaseSwing: 1,
				startAt: 0,
				scrollBar: $wrapRoot.find('.scrollbar'),
				scrollBy: 1,
				speed: 300,
				elasticBounds: 1,
				easing: 'easeOutExpo',
				dragHandle: 1,
				dynamicHandle: 1,
				clickBar: 1
				//prev: $wrapRoot.find('.prev'),
				//next: $wrapRoot.find('.next')
			});
			slyExistence = false;
		} else {
			$root.sly('reload');
		}
		removeUnknownTypeEmergenciesElements($parent);
    }

    /*Obtiene propiedad por tipo de emergencia*/
    function getPropertyForTypeEmergencie(type){
        var property;
        if(type === componentAttribute.TYPE.medical_emergencie){
			property = componentProperty.medical_emergencie;
		} else if(type === componentAttribute.TYPE.fire){
			property = componentProperty.fire;
		} else if(type === componentAttribute.TYPE.incident){
			property = componentProperty.incident;
		} else if(type === componentAttribute.TYPE.vehicular_accident){
			property = componentProperty.vehicular_accident;
		} else if(type === componentAttribute.TYPE.rescue){
			property = componentProperty.rescue;
		} else if(type === componentAttribute.TYPE.special_service){
			property = componentProperty.special_service;
		} else if(type === componentAttribute.TYPE.natural_disasters){
			property = componentProperty.natural_disasters;
		}
        return property;
    }

    /*Obtiene ancho de columna por ancho de pantalla*/
    function getColumnWidthByWindowWidth(config){
        if ($(window).width() <= 500) {
            return config.xs_12;
    	} else {
            return config.xs_6;
    	}
    }

	/*Reinicializa elementos de tipos de emergencias*/
	function reInitializeTypeEmergenciesElements(element, config){
		var idx = 0, quantity = element.length;
		if(quantity > 0){
			while(idx < quantity){
				$(element[idx]).attr('data-existence', config.no);
				idx++;
			}
		}
	}

	/*Elimina elementos de tipos de emergencias que no existan en actualizacion de data*/
	function removeUnknownTypeEmergenciesElements(parent){
		var properties = [], elements = parent.find("li[data-existence~='no']"),
			idx = 0, quantity = elements.length, iProperty;
		if(quantity > 0){
			while(idx < quantity){
				properties.push($(elements[idx]).attr('data-property'));
				idx++;
			}
			elements.remove();
			for(iProperty in properties){
				delete globalView.view.validation.info[properties[iProperty]];
			}
		}
	}

    /*Crea info de tipo de emergencia*/
    function createInfoTypeEmergencie(col_width, property, image, text, number, percentage, description, firstItem){
        var context, source, template, html, active;
		if(firstItem){
			active = 'class="active"';
		}
		context = {
            'root': property.root, 'col-width': col_width, 'style': property.style, 'image': image,
			'text': text, 'number': number, 'percentage': percentage, 'description': description,
			'active': active, 'nameText': property.text, 'nameNumber': property.number,
			'nameProgressbar': property.progressbar, 'nameDescription': property.description,
			'property': property.attribute
        };
        source = document.getElementById(resourceDiary.TEMPLATE.info_content_type_emergencie).innerHTML;
        template = Handlebars.compile(source);
		return template(context);
    }

    /*Actualiza info de tipo de emergencia*/
    function updateInfoTypeEmergencie(options, text, number, percentage, description){
        $.dataJS(options.text).text(text);
        $.dataJS(options.number).text(number);
        $.dataJS(options.progressbar).css('width', percentage);
        $.dataJS(options.description).text(description);
    }

	/*Inicializa variables*/
	function initialize(publicView){
		globalView = publicView;
	}

    return {
		'initialize': initialize,
        'lastEmergencie': renderLastEmergencie,
        'typeEmergencies': renderTypeEmergencies
    };
});
