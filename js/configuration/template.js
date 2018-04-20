/**
 * Project Name : info-bomberos
 * @author Gustavo Ramos M
 */

define([], function() {

    function initialize() {
        //Load Template
        $(window).trigger('load');
	   //Show current year on footer
        $.dataJS("currentYear").text(new Date().getFullYear());
    }

    return {
        initialize: initialize
    };
});
