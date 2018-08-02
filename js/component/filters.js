/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define([
    'jquery', 'module/util/resourceFilters', 'jquery-cookie', 'dataview'
], function($, resourceFilters) {

    //Evento click a boton de filtro
    $('#filters > a.btn-action-filters').click(function(){
        var component = $.dataJS(resourceFilters.PARENT.name);
        if(component.attr('data-status') === resourceFilters.PARENT.status.close){
            $(window).trigger('open-filters-module');
        } else if(component.attr('data-status') === resourceFilters.PARENT.status.open){
            $(window).trigger('close-filters-module');
        }
    });

    //Evento para redimensionar tamaño de filtros
    $(window).resize(function(){
        var component = $.dataJS(resourceFilters.PARENT.name);
        if(component.attr('data-status') === resourceFilters.PARENT.status.open){
            $(window).trigger('resize-filters-module');
        }
    });

    //Trigger al abrir contenedor de filtros
    $(window).on('open-filters-module', function(){
        var component = $.dataJS(resourceFilters.PARENT.name), config,
            currentWidth = $(window).width();
        config = getConfigByWidth(currentWidth);
        component.removeClass().addClass(config.style);
        component.attr('data-status', resourceFilters.PARENT.status.open);
        component.css('right', '0');
    });

    //Trigger al cerrar contenedor de filtros
    $(window).on('close-filters-module', function(){
        var component = $.dataJS(resourceFilters.PARENT.name), config,
            currentWidth = $(window).width();
        config = getConfigByWidth(currentWidth);
        component.removeClass().addClass(config.style);
        component.attr('data-status', resourceFilters.PARENT.status.close);
        component.css('right', config.position);
    });

    //Trigger al redimensionar contenedor de filtros
    $(window).on('resize-filters-module', function(){
        var component = $.dataJS(resourceFilters.PARENT.name), config,
            currentWidth = $(window).width();
        config = getConfigByWidth(currentWidth);
        component.removeClass().addClass(config.style);
    });

    //Obtiene configuracion por tamaño de pantalla
    function getConfigByWidth(width){
        var config;
        if (width >= 768) {
            config = resourceFilters.PARENT.width.greater_768;
        } else if (width < 768 && width >= 405) {
            config = resourceFilters.PARENT.width.from_768_to_405;
        } else if (width < 405 && width >= 360) {
            config = resourceFilters.PARENT.width.from_405_to_360;
        } else if (width < 360 && width >= 335) {
            config = resourceFilters.PARENT.width.from_360_to_335;
        } else if (width < 335 && width >= 320) {
            config = resourceFilters.PARENT.width.from_335_to_320;
        } else {
            config = resourceFilters.PARENT.width.less_320;
        }
        return config;
    }

});
