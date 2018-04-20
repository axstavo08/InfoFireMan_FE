/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Project Name : smartflex-client
 * Created: 04/04/2017
 * @author John Portella <C16915>
 * @version 1.0
 */

$.dataJS = function(el, sub) {
    if (!sub) {
        return $('[data-js=' + el + ']');
    } else {
        return $('[data-js=' + el + '] ' + sub);
    }
};
