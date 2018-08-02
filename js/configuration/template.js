/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
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
