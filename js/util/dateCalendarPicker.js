/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define(['calendarConfig', 'objectUtil', 'moment-with-locales',
    'jquery.daterangepicker', 'dataview'
], function(calendarConfig, objUtil, moment) {

    function DateCalendarPicker(component, container) {

		var calendar, parameters, componentParam, containerParam, typeCalendar,
            endDate = moment(new Date()), startDate = moment(endDate).subtract(29, 'days');

        //console.log(endDate.toDate());
    	//console.log(startDate.toDate());

		//Establece objeto momento to locale spanish
		moment.locale(calendarConfig.LANGUAGE);

		//Valida que objeto sea de tipo DateCalendarPicker
		if (!(this instanceof DateCalendarPicker)) {
            throw new TypeError("DateCalendarPicker constructor cannot be called as a function.");
        }

		//Construye calendario
		function build(type){
            componentParam = component;
            containerParam = container;
            if(typeof type === 'undefined' || type === null){
                type = calendarConfig.TYPE.TODAY;
            }
            parameters = buildParametersByType(type);
            options = buildOptionsByTypeAndContainer(type, container);
		}

		//Crea calendario
		function create(type){
			calendar = componentParam.dateRangePicker(options)
                                .on('datepicker-change',function(event,obj){
                                    console.log('change',obj);
                                    if(typeCalendar === calendarConfig.TYPE.RANGE){

                                    } else if (typeCalendar === calendarConfig.TYPE.TODAY) {
                                        parameters.date = moment(obj.date1)
                                                            .format(calendarConfig.OUTPUT_FORMAT);
                                    }
                                })
                                .on('datepicker-open',function(){
                                    console.log('open');
                                    fitTopPosition();
                                });
            if(type === calendarConfig.TYPE.RANGE){
                fit();
                initializeRangeCalendar();
            } else if (type === calendarConfig.TYPE.TODAY) {
                parameters.date = moment(new Date())
                                    .format(calendarConfig.OUTPUT_FORMAT);
                componentParam.val(moment().format(calendarConfig.FORMAT));
            }
		}

        //Construye parametros por tipo
        function buildParametersByType(type){
            var params = {};
            if(type === calendarConfig.TYPE.TODAY){
                params = objUtil.clone(calendarConfig.PARAMETERS.TODAY);
            } else if(type === calendarConfig.TYPE.RANGE){
                params = objUtil.clone(calendarConfig.PARAMETERS.RANGE);
            }
            return params;
        }

        //Construye opciones por tipo
        function buildOptionsByTypeAndContainer(type, container){
            var opts = {};
            opts.language = calendarConfig.LANGUAGE;
            opts.showShortcuts = false;
            opts.showTopbar = false;
            opts.format = calendarConfig.FORMAT;
            opts.container = container;
            if(type === calendarConfig.TYPE.TODAY){
                opts.startDate = new Date();
                opts.endDate = new Date();
                opts.autoClose = true;
                opts.singleDate = true;
                opts.singleMonth = calendarConfig.SINGLE_MONTH.SINGLE;
            } else if(type === calendarConfig.TYPE.RANGE){
                opts.minDays = 30;
                opts.maxDays = 30;
                opts.autoClose = false;
                opts.singleMonth = calendarConfig.SINGLE_MONTH.AUTO;
                opts.endDate = endDate;
                opts.separator = calendarConfig.SEPARATOR;
            }
            return opts;
        }

		//Encaja calendario segun dimension de navegador
		function fit(){
			var dateRangeResize, dateRangeReCreated = {'single': false, 'range': false};
            if ($(window).width() < 480) {
        		dateRangeResize = false;
        	} else {
        		dateRangeResize = true;
        		dateRangeReCreated.range = true;
        	}
            $(window).resize(function(){
        		if(typeof dateRangeResize !== 'undefined' && dateRangeResize !== null){
        			if(dateRangeResize){
        				if(dateRangeReCreated.single && $(window).width() < 480){
        					dateRangeReCreated.single = reCreatedDateRange();
        					dateRangeReCreated.range = true;
        					console.log("single");
        				} else if(dateRangeReCreated.range && $(window).width() >= 480){
        					dateRangeReCreated.range = reCreatedDateRange();
        					dateRangeReCreated.single = true;
        					console.log("both");
        				}
        			}
        		}
                fitTopPosition();
        	});
		}

        //Ajusta posicion top de calendario
        function fitTopPosition(){
            if ($(window).height() < 710) {
        		container.find('.date-picker-wrapper').addClass('fit-top-datepicker');
        	} else {
                container.find('.date-picker-wrapper').removeClass('fit-top-datepicker');
                $(window).trigger("resize.datepicker");
            }
        }

		//Inicializa calendario
		function initializeRangeCalendar(){
			componentParam.data('dateRangePicker').setDateRange(startDate.format(calendarConfig.FORMAT),
                    endDate.format(calendarConfig.FORMAT));
		}

        function reCreatedDateRange(){
    		componentParam.data('dateRangePicker').close();
            componentParam.data('dateRangePicker').destroy();
    		calendar = componentParam.dateRangePicker(buildOptionsByTypeAndContainer(
                        calendarConfig.TYPE.RANGE, containerParam));
    		return false;
    	}

		//Metodo interno que construye y crea objeto calendario de semana
		this.buildAndCreate = function(type) {
            typeCalendar = type;
			build(type);
            create(type);
        };

		//Metodo interno que devuelve parametros de calendario
		this.getParameters = function() {
            return parameters;
        };

		//Metodo interno que devuelve objeto creado de calendario
		this.getObject = function() {
			return calendar;
		};
    }
    return DateCalendarPicker;
});
