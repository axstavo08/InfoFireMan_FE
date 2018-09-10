/**
 * Project Name : smartflex-client
 * Created: 10/09/2019
 * @author Gustavo Ramos <C19104>
 */

define([
	'module/util/resourceFilters', 'module/util/resourceDiary', 'jquery-cookie', 'dataview',
	'blockui'
], function(resourceFilters, resourceDiary) {

    var globalView, tableResource = resourceDiary.TABLE, infoResource = resourceDiary.INFO,
		componentProperty = resourceDiary.PROPERTY, componentAttribute = resourceDiary.ATTRIBUTE,
		viewResource = resourceDiary.VIEW, floatContainerRes = resourceDiary.FLOAT_CONTAINER,
		modalResource = resourceDiary.MODAL;

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
    	});
    }

	//Eventos de input
	function input(){
		$.dataJS(tableResource[componentProperty.emergencies].util.searching).keyup(function(){

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

	//Reanima y acomoda componentes
	function reAnimateAndFitComponents(property){

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

	//Metodo para eventos de modal de vista
	function modal(){
		$.dataJS(modalResource.name).on('show.bs.modal', function () {
            //console.log('modal show');
		});
		$.dataJS(modalResource.name).on('shown.bs.modal', function () {
			//Valida existencia de mapa de centro de ayuda
			if(typeof globalView.view.components.tables[componentProperty.centersHelp] !== 'undefined'
				&& globalView.view.components.tables[componentProperty.centersHelp] !== null){
				globalView.view.components.tables[componentProperty.centersHelp].fixColumns();
			}
		});
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
		floatContainer();
		modal();
	}

    return {
        'initialize': initialize
    };
});
