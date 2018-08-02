/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define([
	'module/util/resourceFilters', 'module/util/resourceDiary', 'jquery-cookie', 'dataview',
	'blockui'
], function(resourceFilters, resourceDiary) {

    var globalView, tableResource = resourceDiary.TABLE, infoResource = resourceDiary.INFO,
		componentProperty = resourceDiary.PROPERTY, componentAttribute = resourceDiary.ATTRIBUTE,
		viewResource = resourceDiary.VIEW, floatContainerRes = resourceDiary.FLOAT_CONTAINER;

    //Eventos de link
    function link(){
		$.dataJS(viewResource.TITLE_HEADER).on('click', function(){
			window.location.reload();
		});
    }

    //Evento de accion principal
    function action(){
        $.dataJS(resourceFilters.ELEMENT.ACTION.COMPONENT).on('click', function(event){
			globalView.view.validation.search = true;
			$.dataJS(resourceDiary.BLOCK_CONTENT).block({
				'overlayCSS': {
					'backgroundColor': '#1a1a1a', 'opacity': .98, 'cursor': 'not-allowed'
				},
				'message': '<h2><i class="fa fa-spinner fa-spin space-text text-size24"></i>Cargando</h2>',
				'css': {
					'border': 'none', 'padding': '15px', 'backgroundColor': 'transparent',
					'opacity': 1, 'color': '#ffffff', 'font-size': '24px', 'cursor': 'not-allowed',
					'-webkit-border-radius': '10px', '-moz-border-radius': '10px',
				},
				'onBlock': function() {
					$(window).trigger('close-filters-module');
	            }
			});
			$(window).trigger('close-lastEmergencie-module');
			globalView.view.load();
        });
    }

    //Eventos de ancho de pantalla
    function widthWindow(){
		var infoTypeEmergencie = infoResource[componentProperty.typeEmergencies];
    	if ($(window).width() <= 500) {
			$.dataJS(infoTypeEmergencie.container).removeClass(infoTypeEmergencie.util.xs_6);
			$.dataJS(infoTypeEmergencie.container).addClass(infoTypeEmergencie.util.xs_12);
    	} else {
			$.dataJS(infoTypeEmergencie.container).removeClass(infoTypeEmergencie.util.xs_12);
			$.dataJS(infoTypeEmergencie.container).addClass(infoTypeEmergencie.util.xs_6);
    	}
    }

    //Eventos de redimensionamiento de pantalla
    function resizeWindow(){
        $(window).resize(function() {
    		widthWindow();
			reAnimateAndFitComponents($.dataJS(resourceDiary.TAB.NAME).find('li.active').find('a').attr('data-property'));
			$.dataJS(infoResource[componentProperty.typeEmergencies].root).sly('reload');
    	});
    }

	//Eventos de input
	function input(){
		$.dataJS(tableResource[componentProperty.emergencies].util.searching).keyup(function(){
			globalView.view.components.tables[componentProperty.emergencies].search($(this).val());
		});
	}

    //Eventos de trigger
    function trigger(){
        $(window).on(resourceFilters.TRIGGERS.action, function(){
            action();
        });
		$(window).on('box-expand-component', function(e){
            console.log(e);
        });
    }

	//Eventos de tab
	function tab(){
		$(resourceDiary.TAB.ID).on('shown.bs.tab', function(){
			var property = $(this).attr('data-property');
			reAnimateAndFitComponents(property);
		});
	}

	//Eventos de timer
	function timer(){
		setInterval(function(){
			globalView.view.load();
		}, 120000);
	}

	//Reanima y acomoda componentes
	function reAnimateAndFitComponents(property){
		if(property === resourceDiary.TAB.PROPERTY.main){
			globalView.view.components.tables[componentProperty.emergencies].fixColumns();
			if(globalView.view.validation.reLoad){
				globalView.view.validation.reLoad = false;
				globalView.view.components.maps[componentProperty.emergencies].fitWithMarkers();
			}
		} else if(property === resourceDiary.TAB.PROPERTY.charts){
			globalView.view.components.charts[componentProperty.hours24].reflowAndAnimate();
			globalView.view.components.charts[componentProperty.typeEmergencies].reflowAndAnimate();
			globalView.view.components.tables[componentProperty.typeEmergencies].fixColumns();
			globalView.view.components.charts[componentProperty.typeStatus].reflowAndAnimate();
			globalView.view.components.tables[componentProperty.typeStatus].fixColumns();
		} else if(property === resourceDiary.TAB.PROPERTY.geographyc){
			globalView.view.components.charts[componentProperty.departments].reflowAndAnimate();
			globalView.view.components.tables[componentProperty.departments].fixColumns();
			globalView.view.components.charts[componentProperty.provinces].reflowAndAnimate();
			globalView.view.components.tables[componentProperty.provinces].fixColumns();
			globalView.view.components.charts[componentProperty.districts].reflowAndAnimate();
			globalView.view.components.tables[componentProperty.districts].fixColumns();
		}
	}

	//Eventos para componentes flotantes, a excepcion de los filtros
	function floatContainer(){
		//Evento click a boton de ultima emergencia
	    $('#lastEmergencie > a.btn-action-lastEmergencie').click(function(){
	        var component = $.dataJS(floatContainerRes.lastEmergencie.name);
	        if(component.attr('data-status') === floatContainerRes.lastEmergencie.status.close){
	            $(window).trigger('open-lastEmergencie-module');
	        } else if(component.attr('data-status') === floatContainerRes.lastEmergencie.status.open){
	            $(window).trigger('close-lastEmergencie-module');
	        }
	    });

	    //Evento para redimensionar tamaño de ultima emergencia
	    $(window).resize(function(){
	        var component = $.dataJS(floatContainerRes.lastEmergencie.name);
	        if(component.attr('data-status') === floatContainerRes.lastEmergencie.status.open){
	            $(window).trigger('resize-lastEmergencie-module');
	        }
	    });

	    //Trigger al abrir contenedor de ultima emergencia
	    $(window).on('open-lastEmergencie-module', function(){
	        var component = $.dataJS(floatContainerRes.lastEmergencie.name), config,
	            currentWidth = $(window).width();
	        config = getConfigByWidth(currentWidth);
	        component.removeClass().addClass(config.style);
	        component.attr('data-status', floatContainerRes.lastEmergencie.status.open);
	        component.css('right', '0');
	    });

	    //Trigger al cerrar contenedor de ultima emergencia
	    $(window).on('close-lastEmergencie-module', function(){
	        var component = $.dataJS(floatContainerRes.lastEmergencie.name), config,
	            currentWidth = $(window).width();
	        config = getConfigByWidth(currentWidth);
	        component.removeClass().addClass(config.style);
	        component.attr('data-status', floatContainerRes.lastEmergencie.status.close);
	        component.css('right', config.position);
	    });

	    //Trigger al redimensionar contenedor de ultima emergencia
	    $(window).on('resize-lastEmergencie-module', function(){
	        var component = $.dataJS(floatContainerRes.lastEmergencie.name), config,
	            currentWidth = $(window).width();
	        config = getConfigByWidth(currentWidth);
	        component.removeClass().addClass(config.style);
	    });

	    //Obtiene configuracion por tamaño de pantalla
	    function getConfigByWidth(width){
	        var config;
	        if (width >= 768) {
	            config = floatContainerRes.lastEmergencie.width.greater_768;
	        } else if (width < 768 && width >= 405) {
	            config = floatContainerRes.lastEmergencie.width.from_768_to_405;
	        } else if (width < 405 && width >= 360) {
	            config = floatContainerRes.lastEmergencie.width.from_405_to_360;
	        } else if (width < 360 && width >= 335) {
	            config = floatContainerRes.lastEmergencie.width.from_360_to_335;
	        } else if (width < 335 && width >= 320) {
	            config = floatContainerRes.lastEmergencie.width.from_335_to_320;
	        } else {
	            config = floatContainerRes.lastEmergencie.width.less_320;
	        }
	        return config;
	    }
	}

	//Inicia eventos
	function initialize(publicView){
        globalView = publicView;
		//Inicializa eventos de componentes y visuales
        link();
        widthWindow();
        resizeWindow();
		input();
        trigger();
		tab();
		timer();
		floatContainer();
	}

    return {
        'initialize': initialize
    };
});
