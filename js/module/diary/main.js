/**
 * Project Name : info-bomberos
 * @author Gustavo Ramos M
 */

define([

], function() {

    //Variables utiles
    var settings;

    /*Metodo publico*/
    function initialize(config) {
        //Obtiene configuracion publica
        settings = this.settings;
        //Inicializa PageLoad
        /*new PageLoad(settings.pageLoad);*/
    }

    return {
        initialize: initialize,
        settings: {
            pageLoad: 7
        }
    };
});
