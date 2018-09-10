/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define([
	'i18n!js/nls/imessages', 'module/util/resourceDiary', 'objectUtil',
    'handlebars', 'dataview'
], function(imessages, resourceDiary, objUtil, Handlebars) {

    var globalView, overlayResource = resourceDiary.OVERLAY, componentResource = resourceDiary.COMPONENT,
		componentProperty = resourceDiary.PROPERTY, componentAttribute = resourceDiary.ATTRIBUTE;

	/*Renderiza overlay*/
    function renderOverlay(property){
        var $container = $.dataJS(property.name), overlayAttribute = $container.attr('data-overlay');
        if(overlayAttribute === overlayResource.util.status.hide){
            $container.append(createOverlayStructure(property.action));
            $container.attr('data-overlay', overlayResource.util.status.show);
            $.dataJS(property.action).on('click', function(){
                $(this).parent().parent().parent().attr('data-overlay', overlayResource.util.status.hide);
                $(this).parent().parent().remove();
            });
        }
    }

    /*Crea estructura de overlay*/
    function createOverlayStructure(action){
        var context, source, template, html;
        context = {
            'action': action, 'message': imessages.global.error.overlay,
            'action-message': imessages.global.action.close
        };
        source = document.getElementById(resourceDiary.TEMPLATE.overlay_container).innerHTML;
        template = Handlebars.compile(source);
		return template(context);
    }

	/*Renderiza overlay de carga*/
    function renderLoadOverlay(property){
        var $container = $.dataJS(property.name), overlayAttribute = $container.attr('data-overlay');
        if(overlayAttribute === overlayResource.util.status.hide){
            $container.append(createLoadOverlayStructure());
            $container.attr('data-overlay', overlayResource.util.status.show);
        }
    }

	/*Crea estructura de overlay de carga*/
    function createLoadOverlayStructure(){
        var context = {}, source, template, html;
        source = document.getElementById(resourceDiary.TEMPLATE.load_overlay_container).innerHTML;
        template = Handlebars.compile(source);
		return template(context);
    }

	/*Elimina overlay de carga*/
	function removeLoadOverlay(property){
		var $container = $.dataJS(property.name), overlayAttribute = $container.attr('data-overlay');
		$container.attr('data-overlay', overlayResource.util.status.hide);
		$container.find('.overlay').remove();
	}

	/*Inicializa variables*/
	function initialize(publicView){
		globalView = publicView;
	}

    return {
		'initialize': initialize,
        'overlay': renderOverlay,
		'loadOverlay': renderLoadOverlay,
		'removeLoadOverlay': removeLoadOverlay
    };
});
