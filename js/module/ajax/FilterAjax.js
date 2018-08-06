/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

/**  Obtener informacion de filtros para modulos
 *
 */
define(['jquery', 'module/util/resourceRequests'], function($, resourceRequests) {

    var REST_MAIN_FILTER = "/resources/Dialy";

    //Obtener tipos de emergencias
    function getTypeEmergency() {
        var REST_TYPE_EMERGENCY_URI = REST_MAIN_FILTER.concat(resourceRequests.filters.type);
        //REST_TYPE_EMERGENCY_URI = "data/filters/TypeEmergencyFilters.json";
        //console.log(REST_TYPE_EMERGENCY_URI);
        return $.ajax({
            'url': REST_TYPE_EMERGENCY_URI,
            'type': 'GET',
            "crossDomain": true,
            'cache': true,
            'dataType': "json",
            'async': true,
            'headers': {
                "Authorization": "Basic " + btoa(resourceRequests.parameters.auth.basic.user.concat(':').concat(resourceRequests.parameters.auth.basic.pass))
            },
            'beforeSend': function (xhr) {
                xhr.withCredentials = true;
            }
        });
    }

    //Obtener estados
    function getStatus() {
        var REST_STATUS_URI = REST_MAIN_FILTER.concat(resourceRequests.filters.status);
        //REST_STATUS_URI = "data/filters/StatusFilters.json";
        //console.log(REST_STATUS_URI);
        return $.ajax({
            'url': REST_STATUS_URI,
            'type': 'GET',
            "crossDomain": true,
            'cache': true,
            'dataType': "json",
            'async': true,
            'headers': {
                "Authorization": "Basic " + btoa(resourceRequests.parameters.auth.basic.user.concat(':').concat(resourceRequests.parameters.auth.basic.pass))
            },
            'beforeSend': function (xhr) {
                xhr.withCredentials = true;
            }
        });
    }

    //Obtener departamentos
    function getDepartments() {
        var REST_DEPARTMENTS_URI = REST_MAIN_FILTER.concat(resourceRequests.filters.departaments);
        //REST_DEPARTMENTS_URI = "data/filters/DepartmentFilters.json";
        //console.log(REST_DEPARTMENTS_URI);
        return $.ajax({
            'url': REST_DEPARTMENTS_URI,
            'type': 'GET',
            "crossDomain": true,
            'cache': true,
            'dataType': "json",
            'async': true,
            'headers': {
                "Authorization": "Basic " + btoa(resourceRequests.parameters.auth.basic.user.concat(':').concat(resourceRequests.parameters.auth.basic.pass))
            },
            'beforeSend': function (xhr) {
                xhr.withCredentials = true;
            }
        });
    }

    //Obtener provincias
    function getProvinces(id) {
        var REST_PROVINCES_URI = (REST_MAIN_FILTER.concat(resourceRequests.filters.provinces))
                                    .replace('{{id}}', id);
        //REST_PROVINCES_URI = "data/filters/ProvincesFilters.json";
        //console.log(REST_PROVINCES_URI);
        return $.ajax({
            'url': REST_PROVINCES_URI,
            'type': 'GET',
            "crossDomain": true,
            'cache': true,
            'dataType': "json",
            'async': true,
            'headers': {
                "Authorization": "Basic " + btoa(resourceRequests.parameters.auth.basic.user.concat(':').concat(resourceRequests.parameters.auth.basic.pass))
            },
            'beforeSend': function (xhr) {
                xhr.withCredentials = true;
            }
        });
    }

    //Inicializacion de peticiones de filtros
    function initialize(urlBase) {
        REST_MAIN_FILTER = urlBase.concat(REST_MAIN_FILTER);
    }

    return {
        'initialize': initialize,
        'getTypeEmergency': getTypeEmergency,
        'getStatus': getStatus,
        'getDepartments': getDepartments,
        'getProvinces': getProvinces
    };
});
