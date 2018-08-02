/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define(['jquery'], function($) {
    var removeByAttr, assignObject, clone, compare, toString, validateJsonResponse;

    function clone(obj) {
        if (null === obj || "object" !== typeof obj)
            return obj;
        var copy = obj.constructor(), attr;
        for (attr in obj) {
            if (obj.hasOwnProperty(attr))
                copy[attr] = obj[attr];
        }
        return copy;
    };

    return {
        clone: clone
    };
});
