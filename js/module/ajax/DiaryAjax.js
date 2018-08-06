/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

/**  Obtener informacion para vista de componentes
 *
 */
define([
    'jquery', 'module/util/resourceRequests', 'module/util/resourceFilters'
], function($, resourceRequests, resourceFilters) {

    var REST_MAIN_VIEW = "/resources/Dialy", filtersProperty = resourceFilters.PROPERTY;

    //Obtener informacion de emergencias
    function getEmergenciesInformation(filters) {
        var REST_EMERGENCIES_INFORMATION_URI = (REST_MAIN_VIEW.concat(resourceRequests.view.emergencies_information))
                                                .replace('{{type}}', filters[filtersProperty.TYPE_EMERGENCY.NAME])
                                                .replace('{{status}}', filters[filtersProperty.TYPE_STATUS.NAME])
                                                .replace('{{dep}}', filters[filtersProperty.DEPARTMENT.NAME])
                                                .replace('{{prov}}', filters[filtersProperty.PROVINCE.NAME]);
        //REST_EMERGENCIES_INFORMATION_URI = "data/diary/EmergenciesSearchDiary.json";
        //console.log(REST_EMERGENCIES_INFORMATION_URI);
        return $.ajax({
            'url': REST_EMERGENCIES_INFORMATION_URI,
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

    //Obtener informacion de 24 horas
    function get24HoursInformation(filters) {
        var REST_24HOURS_INFORMATION_URI = (REST_MAIN_VIEW.concat(resourceRequests.view.hours_24_information))
                                                .replace('{{type}}', filters[filtersProperty.TYPE_EMERGENCY.NAME]);
        //REST_24HOURS_INFORMATION_URI = "data/diary/24HoursSearch.json";
        //console.log(REST_24HOURS_INFORMATION_URI);
        return $.ajax({
            'url': REST_24HOURS_INFORMATION_URI,
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

    //Obtener informacion de tipos de emergencias
    function getTypeEmergenciesInformation(filters) {
        var REST_TYPE_EMERGENCIES_INFORMATION_URI = (REST_MAIN_VIEW.concat(resourceRequests.view.type_emergencies_information));
        //REST_TYPE_EMERGENCIES_INFORMATION_URI = "data/diary/TypeEmergenciesSearch.json";
        //console.log(REST_TYPE_EMERGENCIES_INFORMATION_URI);
        return $.ajax({
            'url': REST_TYPE_EMERGENCIES_INFORMATION_URI,
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

    //Obtener informacion de tipos de estados
    function getTypeStatusInformation(filters) {
        var REST_TYPE_STATUS_INFORMATION_URI = (REST_MAIN_VIEW.concat(resourceRequests.view.type_status_information));
        //REST_TYPE_STATUS_INFORMATION_URI = "data/diary/TypeStatusSearch.json";
        //console.log(REST_TYPE_STATUS_INFORMATION_URI);
        return $.ajax({
            'url': REST_TYPE_STATUS_INFORMATION_URI,
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

    //Obtener informacion de departamentos
    function getDepartmentsInformation(filters) {
        var REST_DEPARTMENTS_INFORMATION_URI = (REST_MAIN_VIEW.concat(resourceRequests.view.departments_information))
                                                .replace('{{dep}}', filters[filtersProperty.DEPARTMENT.NAME]);
        //REST_DEPARTMENTS_INFORMATION_URI = "data/diary/DepartmentsSearch.json";
        //console.log(REST_DEPARTMENTS_INFORMATION_URI);
        return $.ajax({
            'url': REST_DEPARTMENTS_INFORMATION_URI,
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

    //Obtener informacion de provincias
    function getProvincesInformation(filters) {
        var REST_PROVINCES_INFORMATION_URI = (REST_MAIN_VIEW.concat(resourceRequests.view.provinces_information)), idDep;
        idDep = (filters[filtersProperty.PROVINCE.NAME] === "0") ? "1" : filters[filtersProperty.PROVINCE.NAME];
        REST_PROVINCES_INFORMATION_URI = REST_PROVINCES_INFORMATION_URI.replace('{{dep}}', idDep);
        console.log(REST_PROVINCES_INFORMATION_URI);
        REST_PROVINCES_INFORMATION_URI = "data/diary/ProvincesSearch.json";
        //console.log(REST_PROVINCES_INFORMATION_URI);
        return $.ajax({
            'url': REST_PROVINCES_INFORMATION_URI,
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

    //Obtener informacion de distritos
    function getDistrictsInformation(filters) {
        var REST_DISTRICTS_INFORMATION_URI = (REST_MAIN_VIEW.concat(resourceRequests.view.districts_information)), idProv;
        idProv = (filters[filtersProperty.PROVINCE.NAME] === "0") ? "1" : filters[filtersProperty.PROVINCE.NAME];
        REST_DISTRICTS_INFORMATION_URI = REST_DISTRICTS_INFORMATION_URI.replace('{{prov}}', idProv);
        //console.log(REST_DISTRICTS_INFORMATION_URI);
        REST_DISTRICTS_INFORMATION_URI = "data/diary/DistrictsSearch.json";
        console.log(REST_DISTRICTS_INFORMATION_URI);
        return $.ajax({
            'url': REST_DISTRICTS_INFORMATION_URI,
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

    //Inicializacion de peticiones de vista
    function initialize(urlBase) {
        REST_MAIN_VIEW = urlBase.concat(REST_MAIN_VIEW);
    }

    return {
        'initialize': initialize,
        'getEmergenciesInformation': getEmergenciesInformation,
        'get24HoursInformation': get24HoursInformation,
        'getTypeEmergenciesInformation': getTypeEmergenciesInformation,
        'getTypeStatusInformation': getTypeStatusInformation,
        'getDepartmentsInformation': getDepartmentsInformation,
        'getProvincesInformation': getProvincesInformation,
        'getDistrictsInformation': getDistrictsInformation
    };
});
