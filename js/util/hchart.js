/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define([
    'i18n!js/nls/imessages', 'highcharts-common', 'highcharts-no-data-to-display', 'highcharts-theme'
], function(imessages, Highcharts) {

    window.Highcharts = Highcharts;

    //Metodo principal para crear objeto principal Chart
    function Chart(id, options) {

        var oChart, pChartOptions;

        //Valida que exista tipo objeto principal Chart
        if (!(this instanceof Chart)) {
            throw new TypeError("Chart constructor cannot be called as a function.");
        }

        //Crea objeto chart
        function create() {
            oChart = Highcharts.chart(id, options);
        }

        //Metodo de objeto para construir obtener propiedades construidas de chart y crearlo
        this.create = function() {
            create();
        };

        //Metodo de objeto para destruir chart
        this.destroy = function() {
            oChart.destroy();
        };

        //Metodo de objeto para ejecutar animacion a chart
        this.animate = function() {
            reAnimate(true, oChart);
        };

        //Metodo de objeto para reacomodar y ejecutar animacion a chart
        this.reflowAndAnimate = function() {
            this.reflow();
            this.animate();
        };

        //Metodo de objeto para reacomodar chart
        this.reflow = function() {
            oChart.reflow();
        };

        //Metodo de objeto para redibujar chart
        this.redraw = function() {
            oChart.redraw();
        };

        //Metodo de objeto para reacomodar chart por parametro de veces
        this.reflowNTimes = function(ntimes) {
            var x;
            for (x = 0; x < ntimes; x++) {
                this.reflow();
            }
        };

        //Metodo de objeto para actualizar series de chart
        this.updateSeries = function(newSeries) {
            var iNewSerie;
            this.removeSeries();
            for (iNewSerie in newSeries) {
                oChart.addSeries(newSeries[iNewSerie], false);
            }
            this.redraw();
            this.animate();
        };

        //Metodo de objeto para actualizar series de chart
        this.updateXAxis = function(newCategories) {
            oChart.xAxis[0].setCategories(newCategories, false);
            this.redraw();
        };

        //Metodo de objeto para eliminar series de chart
        this.removeSeries = function() {
            while (oChart['series'].length > 0) {
                oChart.series[0].remove(false);
            }
        };

        //Metodo de objeto para eliminar series de chart y actualizar chart
        this.removeSeriesAndFitChart = function() {
            this.removeSeries();
            this.redraw();
            this.animate();
        };

        //Metodo de objeto para actualizar data de series de pie chart
        this.updateDataPie = function(newData) {
            oChart.series[0].setData(newData, true);
        };

        //Metodo de objeto para obtener categories de objeto XAxis de chart
        this.getCategories = function() {
            return oChart.xAxis[0].categories;
        };

        //Metodo de objeto para mostrar mensaje de cargando en chart
        this.showLoading = function() {
            oChart.showLoading(iMessages.global.load);
        };

        //Metodo de objeto para ocultar mensaje de cargando en chart
        this.hideLoading = function() {
            oChart.hideLoading();
        };
    }

    //Metodo de clase para construir y renderizar listado de charts
    Chart.renderCharts = function(structureCharts, data) {
        var i, structureChart, chart, charts = {};
        for (i in structureCharts) {
            structureChart = structureCharts[i];
            chart = new Chart(structureChart.id, data[structureChart.name]);
            chart.buildAndCreate();
            charts[structureChart.id] = chart;
        }
        return charts;
    };

    //Metodo de clase para reacomodar y reanimar listado de charts
    Chart.reflowAndReanimateCharts = function(listCharts) {
        var iChart;
        for (iChart in listCharts) {
            listCharts[iChart].reflowAndAnimate();
        }
    };

    //Metodo de clase para reacomodar listado de charts
    Chart.reflowCharts = function(listCharts) {
        var iChart;
        for (iChart in listCharts) {
            listCharts[iChart].reflow();
        }
    };

    return Chart;
});
