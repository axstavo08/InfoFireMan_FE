/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define(['jquery', 'datatableConfig'], function($, configDataTable) {

    /*Construccion de mensajes para componentes de datatable*/
    function mDTLanguage() {
        var oLanguage = {}, aPaginate = {}, aAria = {}, aSelect = {};
        //Construye objeto language
        oLanguage['sProcessing'] = configDataTable['MESSAGES']['S_PROCESSING'];
        oLanguage['sLengthMenu'] = configDataTable['MESSAGES']['S_LENGTH_MENU'];
        oLanguage['sZeroRecords'] = configDataTable['MESSAGES']['S_ZERO_RECORDS'];
        oLanguage['sEmptyTable'] = configDataTable['MESSAGES']['S_EMPTY_TABLE'];
        oLanguage['sInfo'] = configDataTable['MESSAGES']['S_INFO'];
        oLanguage['sInfoEmpty'] = configDataTable['MESSAGES']['S_INFO_EMPTY'];
        oLanguage['sInfoFiltered'] = configDataTable['MESSAGES']['S_INFO_FILTERED'];
        oLanguage['sInfoPostFix'] = configDataTable['MESSAGES']['S_INFO_POST_FIX'];
        oLanguage['sSearch'] = configDataTable['MESSAGES']['S_SEARCH'];
        oLanguage['sUrl'] = configDataTable['MESSAGES']['S_URL'];
        oLanguage['sInfoThousands'] = configDataTable['MESSAGES']['S_INFO_THOUSANDS'];
        oLanguage['sLoadingRecords'] = configDataTable['MESSAGES']['S_LOADING_RECORDS'];
        aPaginate['sFirst'] = configDataTable['MESSAGES']['O_PAGINATE']['S_FIRST'];
        aPaginate['sLast'] = configDataTable['MESSAGES']['O_PAGINATE']['S_LAST'];
        aPaginate['sNext'] = configDataTable['MESSAGES']['O_PAGINATE']['S_NEXT'];
        aPaginate['sPrevious'] = configDataTable['MESSAGES']['O_PAGINATE']['S_PREVIOUS'];
        oLanguage['oPaginate'] = aPaginate;
        aAria['sSortAscening'] = configDataTable['MESSAGES']['O_ARIA']['S_SORT_ASCENDING'];
        aAria['sSortDescending'] = configDataTable['MESSAGES']['O_ARIA']['S_SORT_DESCENDING'];
        oLanguage['oAria'] = aAria;
        aSelect['rows'] = configDataTable['MESSAGES']['O_SELECT']['ROWS'];
        oLanguage['select'] = aSelect;
        return oLanguage;
    };

    //Retorno de metodos publicos
    return {
        language: mDTLanguage
    };
});
