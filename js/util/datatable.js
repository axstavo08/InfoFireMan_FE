/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define([
    'dataTables.bootstrap', 'datatables-ellipsis'
], function() {

    //Metodo principal para crear objeto principal DataTable
    function DataTable($obj, tableOptions) {
        var dataTable;

        //Valida que exista tipo objeto principal DataTable
        if (!(this instanceof DataTable)) {
            throw new TypeError("DataTable constructor cannot be called as a function.");
        }

        //Crea objeto datatable
        function create() {
            dataTable = $obj.DataTable(tableOptions);
        }

        //Metodo interno que construye y crea objeto datatable
        this.createAnGet = function() {
            //Metodo para crear datatable
            create();
            //Devuelve objeto tabla creada
            return dataTable;
        };

        //Metodo interno que devuelve objeto datatable
        this.get = function() {
            //Devuelve objeto tabla creada
            return dataTable;
        };

        //Metodo interno que actualiza filas de objeto datatable
        this.updateRows = function(newData) {
            //Elimina filas
            this.clearData();
            //Agrega nueva data
            dataTable.rows.add(newData);
            //Refresca tabla
            this.reDraw();
        };

        //Metodo interno para eliminar filas y refrescar objeto datatable
        this.removeRowsAndFit = function() {
            //Elimina filas
            this.clearData();
            //Refresca tabla
            this.reDraw();
        };

        //Metodo interno que limpia filas de objeto datatable
        this.clearData = function() {
            dataTable.clear();
        };

        //Metodo interno que redibuja tabla de objeto datatable
        this.reDraw = function() {
            dataTable.draw();
        };

        //Metodo interno que destruye objeto datatable
        this.destroy = function() {
            dataTable.destroy();
        };

        //Metodo interno que ajusta columnas de tabla
        this.fixColumns = function() {
            dataTable.columns.adjust().draw();
        };

        //Metodo interno que obtiene cantidad de data entrante de tabla
        this.getQuantityData = function() {
            return dataTable.data().count();
        };

		//Metodo interno que busca data por texto en tabla
		this.search = function(text) {
			dataTable.search(text).draw();
		};
    }

	/*Valida existencia de tabla*/
    DataTable.existsTable = function(id) {
        var existence, idTable = '#'.concat(id);
        //Valida existencia de id en datatable
        existence = $.fn.DataTable.isDataTable(idTable);
        return existence;
    };

	/*Encaja listado de tablas*/
	DataTable.fit = function(tables) {
		var table, iTable;
		//Recorre tablas
		for(iTable in tables){
			//Obtiene tabla
			table = tables[iTable];
			//Encaja tabla
			table.fixColumns();
		}
	}

    return DataTable;
});
