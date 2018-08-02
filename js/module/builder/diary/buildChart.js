/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define([
	'module/util/resourceDiary', 'objectUtil', 'hchart', 'dataview'
], function(resourceDiary, objUtil, Chart) {

    var globalView, listCharts = {}, chartResource = resourceDiary.CHART,
        componentProperty = resourceDiary.PROPERTY, chartUtil = chartResource.util,
		globalXAxis = {};

	/*Construye chart de 24 horas*/
    function build24Hours(data){
		var iData, hData, sData, tData, nameSerie, dataSerie, node, hour, obj, info, type, serie,
			dataXAxis24hFormatHelper = {}, dataXAxis12hFormatHelper = {}, dataForSeries = {},
			dataXAxis24hFormat = [], dataXAxis12hFormat = [], dataUSeriesValidation = {},
			dataUSeries = {}, config = chartResource[componentProperty.hours24], idChart, optionsChart;
		if(globalView.view.validation.chart[componentProperty.hours24] === null){
			globalView.view.validation.chart[componentProperty.hours24] = false;
		}
		idChart = config.id;
		optionsChart = config.options;
		optionsChart.series = [];
		if(data.length > 0){
			for(iData in data){
				node = data[iData];
				if(!dataXAxis24hFormatHelper.hasOwnProperty(node[config.property.formatHour24])){
					dataXAxis24hFormatHelper[node[config.property.formatHour24]] = true;
					dataXAxis24hFormat.push(node[config.property.formatHour24]);
					dataForSeries[node[config.property.formatHour24]] = [node];
				} else{
					dataForSeries[node[config.property.formatHour24]].push(node);
				}
				if(!dataXAxis12hFormatHelper.hasOwnProperty(node[config.property.formatHour12])){
					dataXAxis12hFormatHelper[node[config.property.formatHour12]] = true;
					dataXAxis12hFormat.push(node[config.property.formatHour12]);
				}
				if(!dataUSeriesValidation.hasOwnProperty(node[config.property.emergency])){
					dataUSeriesValidation[node[config.property.emergency]] = false;
				}
				if(!dataUSeries.hasOwnProperty(node[config.property.emergency])){
					dataUSeries[node[config.property.emergency]] = [];
				}
			}
			globalXAxis[componentProperty.hours24] = {};
			globalXAxis[componentProperty.hours24][chartUtil.format24] = dataXAxis24hFormat;
			globalXAxis[componentProperty.hours24][chartUtil.format12] = dataXAxis12hFormat;
			for(hData in dataXAxis24hFormat){
				hour = dataXAxis24hFormat[hData];
				obj = dataForSeries[hour];
				for(sData in obj){
					info = obj[sData];
					dataUSeriesValidation[info[config.property.emergency]] = true;
					dataUSeries[info[config.property.emergency]].push(info[config.property.quantity]);
				}
				for(tData in dataUSeriesValidation){
					type = dataUSeriesValidation[tData];
					if(type){
						dataUSeriesValidation[tData] = false;
					} else{
						dataUSeries[tData].push(null);
					}
				}
			}
			for(nameSerie in dataUSeries){
				dataSerie = dataUSeries[nameSerie];
				serie = objUtil.clone(chartUtil.serie);
				serie.name = nameSerie;
				serie.data = dataSerie;
				optionsChart.series.push(serie);
			}
		}
		if(globalView.view.validation.chart[componentProperty.hours24]){
			listCharts[componentProperty.hours24].updateXAxis(dataXAxis12hFormat);
			listCharts[componentProperty.hours24].updateSeries(optionsChart.series);
		} else {
			optionsChart.xAxis = objUtil.clone(chartUtil.xAxis);
			optionsChart.xAxis.categories = dataXAxis12hFormat;
	        listCharts[componentProperty.hours24] = new Chart(idChart, optionsChart);
	        listCharts[componentProperty.hours24].create();
	        $.extend(globalView.view.components.charts, listCharts);
			globalView.view.validation.chart[componentProperty.hours24] = true;
		};
    }

	/*Construye chart de tipos de emergencias*/
    function buildTypeEmergencies(data){
		var iData, node, config = chartResource[componentProperty.typeEmergencies], idChart,
			nameSerieChart, serieChart, dataSerieChart, listDataSerieChart, optionsChart;
		if(globalView.view.validation.chart[componentProperty.typeEmergencies] === null){
			globalView.view.validation.chart[componentProperty.typeEmergencies] = false;
		}
		idChart = config.id;
		nameSerieChart = config.nameSerie;
		optionsChart = config.options;
		optionsChart.series = [];
		serieChart = objUtil.clone(chartUtil.pieSerie);
		serieChart.name = nameSerieChart;
		listDataSerieChart = [];
		if(data.length > 0){
			for(iData in data){
				node = data[iData];
				dataSerieChart = objUtil.clone(chartUtil.pieData);
				dataSerieChart.name = node[config.property.emergency];
				dataSerieChart.y = node[config.property.quantity];
				listDataSerieChart.push(dataSerieChart);
			}
			serieChart.data = listDataSerieChart;
			optionsChart.series.push(serieChart);
		}
		if(globalView.view.validation.chart[componentProperty.typeEmergencies]){
			listCharts[componentProperty.typeEmergencies].updateDataPie(listDataSerieChart);
		} else {
			listCharts[componentProperty.typeEmergencies] = new Chart(idChart, optionsChart);
	        listCharts[componentProperty.typeEmergencies].create();
	        $.extend(globalView.view.components.charts, listCharts);
			globalView.view.validation.chart[componentProperty.typeEmergencies] = true;
		}
	}

	/*Construye chart de tipos de estados*/
    function buildTypeStatus(data){
		var iData, node, config = chartResource[componentProperty.typeStatus], idChart,
		 	nameSerieChart, serieChart, dataSerieChart, listDataSerieChart, optionsChart;
		if(globalView.view.validation.chart[componentProperty.typeStatus] === null){
			globalView.view.validation.chart[componentProperty.typeStatus] = false;
		}
		idChart = config.id;
		nameSerieChart = config.nameSerie;
		optionsChart = config.options;
		optionsChart.series = [];
		serieChart = objUtil.clone(chartUtil.pieSerie);
		serieChart.name = nameSerieChart;
		listDataSerieChart = [];
		if(data.length > 0){
			for(iData in data){
				node = data[iData];
				dataSerieChart = objUtil.clone(chartUtil.pieData);
				dataSerieChart.name = node[config.property.status];
				dataSerieChart.y = node[config.property.quantity];
				listDataSerieChart.push(dataSerieChart);
			}
			serieChart.data = listDataSerieChart;
			optionsChart.series.push(serieChart);
		}
		if(globalView.view.validation.chart[componentProperty.typeStatus]){
			listCharts[componentProperty.typeStatus].updateDataPie(listDataSerieChart);
		} else {
			listCharts[componentProperty.typeStatus] = new Chart(idChart, optionsChart);
	        listCharts[componentProperty.typeStatus].create();
	        $.extend(globalView.view.components.charts, listCharts);
			globalView.view.validation.chart[componentProperty.typeStatus] = true;
		}
	}

	/*Construye chart de departamentos*/
    function buildDepartments(data){
		var iData, node, config = chartResource[componentProperty.departments], idChart,
			nameSerieChart, serieChart, dataSerieChart, listDataSerieChart, optionsChart;
		if(globalView.view.validation.chart[componentProperty.departments] === null){
			globalView.view.validation.chart[componentProperty.departments] = false;
		}
		idChart = config.id;
		nameSerieChart = config.nameSerie;
		optionsChart = config.options;
		optionsChart.series = [];
		serieChart = objUtil.clone(chartUtil.pieSerie);
		serieChart.name = nameSerieChart;
		listDataSerieChart = [];
		if(data.length > 0){
			for(iData in data){
				node = data[iData];
				dataSerieChart = objUtil.clone(chartUtil.pieData);
				dataSerieChart.name = node[config.property.department];
				dataSerieChart.y = node[config.property.quantity];
				listDataSerieChart.push(dataSerieChart);
			}
			serieChart.data = listDataSerieChart;
			optionsChart.series.push(serieChart);
		}
		if(globalView.view.validation.chart[componentProperty.departments]){
			listCharts[componentProperty.departments].updateDataPie(listDataSerieChart);
		} else {
			listCharts[componentProperty.departments] = new Chart(idChart, optionsChart);
	        listCharts[componentProperty.departments].create();
	        $.extend(globalView.view.components.charts, listCharts);
			globalView.view.validation.chart[componentProperty.departments] = true;
		}
	}

	/*Construye chart de provincias*/
    function buildProvinces(data){
		var iData, node, config = chartResource[componentProperty.provinces], idChart,
			nameSerieChart, serieChart, dataSerieChart, listDataSerieChart, optionsChart;
		if(globalView.view.validation.chart[componentProperty.provinces] === null){
			globalView.view.validation.chart[componentProperty.provinces] = false;
		}
		idChart = config.id;
		nameSerieChart = config.nameSerie;
		optionsChart = config.options;
		optionsChart.series = [];
		serieChart = objUtil.clone(chartUtil.pieSerie);
		serieChart.name = nameSerieChart;
		listDataSerieChart = [];
		if(data.length > 0){
			for(iData in data){
				node = data[iData];
				dataSerieChart = objUtil.clone(chartUtil.pieData);
				dataSerieChart.name = node[config.property.province];
				dataSerieChart.y = node[config.property.quantity];
				listDataSerieChart.push(dataSerieChart);
			}
			serieChart.data = listDataSerieChart;
			optionsChart.series.push(serieChart);
		}
		if(globalView.view.validation.chart[componentProperty.provinces]){
			listCharts[componentProperty.provinces].updateDataPie(listDataSerieChart);
		} else {
			listCharts[componentProperty.provinces] = new Chart(idChart, optionsChart);
	        listCharts[componentProperty.provinces].create();
	        $.extend(globalView.view.components.charts, listCharts);
			globalView.view.validation.chart[componentProperty.provinces] = true;
		}
	}

	/*Construye chart de distritos*/
    function buildDistricts(data){
		var iData, node, config = chartResource[componentProperty.districts], idChart,
			nameSerieChart, serieChart, dataSerieChart,
			listDataSerieChart, optionsChart;
		if(globalView.view.validation.chart[componentProperty.districts] === null){
			globalView.view.validation.chart[componentProperty.districts] = false;
		}
		idChart = config.id;
		nameSerieChart = config.nameSerie;
		optionsChart = config.options;
		optionsChart.series = [];
		serieChart = objUtil.clone(chartUtil.pieSerie);
		serieChart.name = nameSerieChart;
		listDataSerieChart = [];
		if(data.length > 0){
			for(iData in data){
				node = data[iData];
				dataSerieChart = objUtil.clone(chartUtil.pieData);
				dataSerieChart.name = node[config.property.district];
				dataSerieChart.y = node[config.property.quantity];
				listDataSerieChart.push(dataSerieChart);
			}
			serieChart.data = listDataSerieChart;
			optionsChart.series.push(serieChart);
		}
		if(globalView.view.validation.chart[componentProperty.districts]){
			listCharts[componentProperty.districts].updateDataPie(listDataSerieChart);
		} else {
			listCharts[componentProperty.districts] = new Chart(idChart, optionsChart);
	        listCharts[componentProperty.districts].create();
	        $.extend(globalView.view.components.charts, listCharts);
			globalView.view.validation.chart[componentProperty.districts] = true;
		}
	}

	/*Inicializa variables*/
	function initialize(publicView){
		globalView = publicView;
		globalView.view.validation.chart = {};
		globalView.view.validation.chart[componentProperty.hours24] = null;
		globalView.view.validation.chart[componentProperty.typeEmergencies] = null;
		globalView.view.validation.chart[componentProperty.typeStatus] = null;
		globalView.view.validation.chart[componentProperty.departments] = null;
		globalView.view.validation.chart[componentProperty.provinces] = null;
		globalView.view.validation.chart[componentProperty.districts] = null;
	}

    return {
		'initialize': initialize,
        'hours24': build24Hours,
		'typeEmergencies': buildTypeEmergencies,
		'typeStatus': buildTypeStatus,
		'departments': buildDepartments,
		'provinces': buildProvinces,
		'districts': buildDistricts
    };
});
