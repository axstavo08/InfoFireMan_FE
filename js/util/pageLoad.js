/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define([
    'globalConfig', 'bootbox-def', 'i18n!js/nls/imessages',
    'jquery-circle-progress', 'dataview'
], function(globalConfig, bootbox, imessages) {

    function PageLoad(totalRequests) {

        var eAjaxComplete, requestCount = {all: totalRequests, loaded: 0};

        if (!(this instanceof PageLoad)) {
            throw new TypeError("PageLoad constructor cannot be called as a function.");
        }

        function hide() {
            $.dataJS(globalConfig.pageLoad.circle_progress).hide();
            $.dataJS(globalConfig.pageLoad.circle_progress).remove();
            $.dataJS(globalConfig.pageLoad.block_page).addClass('hide');
            $.dataJS(globalConfig.pageLoad.block_page).remove();
            $('body').removeClass('scroll-hide');
            $(document).unbind('ajaxComplete.pageLoad');
        }

        function errorMessage() {
            bootbox.dialog({
                'message': imessages.global.error.default,
                'closeButton': false,
                'buttons': {
                    'reloadPage': {
                        'label': imessages.global.reload,
                        'callback': function() {
                            window.location.reload();
                        }
                    }
                }
            });
            $(".modal-backdrop").css({
                'opacity': '0.9',
                'filter': 'alpha(opacity=90)'
            });
        }

        if (totalRequests === 0) {
            hide(true);
        }

        $.dataJS(globalConfig.pageLoad.circle_progress).circleProgress({
            value: 0.01,
            fill: {gradient: ['#ff1e41', '#ff5f43']}
        }).on('circle-animation-progress', function(event, progress, stepValue) {
            $(this).find('strong').html(Math.round(100 * stepValue) + '<i>%</i>');
        });

        function updateProgress() {
            var progressPerc = requestCount.loaded / requestCount.all;
            $.dataJS(globalConfig.pageLoad.circle_progress).circleProgress('value', progressPerc);
            if (requestCount.loaded === requestCount.all) {
                setTimeout(function() {
                    hide(true);
                }, 900);
            }
        }

        eAjaxComplete = function(event, xhr, settings) {
            if (xhr.status === 200) {
                requestCount.loaded = requestCount.loaded + 1;
                updateProgress();
            } else {
                hide();
                errorMessage();
            }
        };

        $(document).bind("ajaxComplete.pageLoad", eAjaxComplete);
    }
    return PageLoad;
});
