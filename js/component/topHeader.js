/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define(['dataview'], function() {

    //Variables globales
    var label = '_nav', main = $.dataJS('main'.concat(label));

    //Activa item actual de nav
    function activeNavCurrentItem(module) {
        $.dataJS(module.concat(label)).addClass('active');
    }

    return {
        activeCurrentItem: activeNavCurrentItem
    };
});
