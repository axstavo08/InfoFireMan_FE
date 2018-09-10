/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define({
	'VIEW': {
		'TYPE': {
			'MAIN': "main", 'DETAIL': "detail"
		},
		'TITLE_HEADER': "lTitleHeader"
	},
	'TEMPLATE': {
        'map_marker_info': "temp-map-marker-info-window", 'overlay_container': "temp-overlay-container",
		'table_localization_column': "temp-table-localization-column",
		'info_content_type_emergencie': "temp-info-content-type-emergencie",
		'tables_status_column': "temp-table-typeEmergencie-status-column",
		'table_routes_column': "temp-table-routes-column", 'table_search_column': "temp-table-search-column",
		'load_overlay_container': "temp-overlay-load-container",
    },
	'BODY': "main_body", 'BLOCK_CONTENT': "blockContainer",
	'MODAL': {
		'name': "infoRoutesModal"
	},
	'PROPERTY': {
		'emergencies': "emergencies", 'hours24': "hours24", 'typeEmergencies': "typeEmergencies",
		'typeStatus': "typeStatus", 'departments': "departments", 'provinces': "provinces",
		'districts': "districts", 'lastEmergencie': "lastEmergencie", 'medical_emergencie': "medical_emergencie",
		'fire': "fire", 'incident': "incident", 'vehicular_accident': "vehicular_accident",
		'rescue': "rescue", 'special_service': "special_service", 'natural_disasters': "natural_disasters",
		'centersHelp': "centersHelp"
	},
	'ATTRIBUTE': {
		'STATUS': {
			'attending': {
				'property': "attending", 'title':  "ATENDIENDO"
			},
			'closed': {
				'property': "closed", 'title':  "CERRADO"
			}
		},
		'TYPE': {
			'medical_emergencie': "EMERGENCIA MEDICA", 'fire': "INCENDIO",
			'incident': "MATERIALES PELIGROSOS (INCIDENTE)",
			'vehicular_accident': "ACCIDENTE VEHICULAR", 'rescue': "RESCATE",
			'special_service': "SERVICIO ESPECIAL", 'natural_disasters': "DESASTRES NATURALES"
		},
		'DATA': {
			'emergencies': {
				'latitude': "nuEmergencyLat", 'longitude': "nuEmergencyLong", 'type': "nbETypeName",
				'status': "nbEStatusName", 'address': "txEmergencyAddress", 'id': "idEmergencyId",
				'date_time': "dtEmergencyDateTime"
			},
			'typeEmergencies': {
				'quantity': "nuXCount", 'percentage': "nuXPercent", 'type': "nbETypeName"
			},
			'centersHelp': {
				'latitude': "nuCHelpLat", 'longitude': "nuCHelpLong", 'distance': "txCHelpDetDistance",
				'duration': "txCHelpDetDuration", 'address': "txCHelpAddress", 'name': "nbTHelpName",
				'center': "nbCHelpName"
			}
		}
	},
	'COMPONENT': {
		'localization': {
			'template': {
				'disable_style': "{{disable_style}}", 'name': "{{name}}", 'longitude': "{{longitude}}",
				'latitude': "{{latitude}}", 'animation': "{{animation}}"
			},
			'property': {
				'name': "btnMapLocalizationMarker", 'unknown': "unknown", 'default_style': " disabled",
				'nameUnique': "btnMapLocalizationMarkerUnique", 'name_CH': "btnMapLocalizationCHMarker"
			},
			'status': {
				'active': "btn-primary", 'inactive': "btn-default", 'inactive_extra': "component-localization"
			}
		},
		'status': {
			'template': {
				'style': "{{style}}", 'status': "{{status}}"
			},
			'label': {
				'attending': "ATENDIENDO", "closed": "CERRADO"
			},
			'status': {
				'attending': "bg-primary", "closed": "bg-red"
			}
		},
		'routes': {
			'template': {
				'name': "{{name}}", 'disable_style': "{{disable_style}}", 'longitude': "{{longitude}}",
				'latitude': "{{latitude}}", 'emergencie': "{{emergencie}}"
			},
			'property': {
				'name': "btnMapRoutesMarker", 'unknown': "unknown", 'default_style': " disabled"
			}
		},
		'search': {
			'template': {
				'name': "{{name}}", 'id': "{{id}}", 'type': "{{type}}",  'identity': "{{identity}}"
			},
			'property': {
				'name': "btnSearchGeo", 'id': "#btnSearchGeo", 'group': '#btnSearchGeo[data-type="{{type}}"]'
			},
			'type': {
				'department': "department", 'province': "province"
			}
		}
	},
	'ANIMATION': {
		'zoom_marker': "zoom_marker", 'zoom_map': "zoom_map", 'disabled': "disabled"
	},
	'TAB': {
		'NAME': "tabContent", 'ID': "#tabContent a",
		'PROPERTY': {
			'main': "main", 'charts': "charts", 'geographyc': "geographyc"
		}
	},
	'OVERLAY': {
		'emergencies': {
			'map': {
				'name': "mapEmergenciesOverlayContainer", 'action': "mapEmergenciesOverlayAction"
			},
			'table': {
				'name': "tableEmergenciesOverlayContainer", 'action': "tableEmergenciesOverlayAction"
			}
		},
		'hours24': {
			'container': {
				'name': "hours24OverlayContainer", 'action': "hours24OverlayAction"
			}
		},
		'typeStatus': {
			'container': {
				'name': "typeStatusOverlayContainer", 'action': "typeStatusOverlayAction"
			}
		},
		'typeEmergencies': {
			'container': {
				'name': "typeEmergenciesOverlayContainer", 'action': "typeEmergenciesOverlayAction"
			},
			'info': {
				'name': "infoParentTypeEmergencie", 'action': "infoTypeEmergencieOverlayAction"
			}
		},
		'departments': {
			'container': {
				'name': "departmentsOverlayContainer", 'action': "departmentsOverlayAction"
			}
		},
		'provinces': {
			'container': {
				'name': "provincesOverlayContainer", 'action': "provincesOverlayAction"
			}
		},
		'districts': {
			'container': {
				'name': "districtsOverlayContainer", 'action': "districtsOverlayAction"
			}
		},
		'centersHelp': {
			'containerMap': {
				'name': "mapCentersHelpOverlayContainer", 'action': "mapCentersHelpOverlayAction"
			},
			'containerTable': {
				'name': "tableCentersHelpOverlayContainer", 'action': "tableCentersHelpOverlayAction"
			}
		},
		'util': {
			'status': {
				'hide': "hide", 'show': "show"
			}
		}
	},
	'INFO': {
		'typeEmergencies': {
			'root': "infoRootTypeEmergencie", 'parent': "infoParentTypeEmergencie", 'container': "infoContainerTypeEmergencie",
			'options': {
				'medical_emergencie': {
					'attribute': "medical_emergencie", 'style': "info-box-medical-emergencie", 'text': "infoTextTypeEmergencieMedical",
					'number': "infoNumberTypeEmergencieMedical", 'progressbar': "infoProgressbarTypeEmergencieMedical",
					'description': "infoDescriptionTypeEmergencieMedical", 'root': "rootInfoTypeEmergencieMedical"
				},
				'fire': {
					'attribute': "fire", 'style': "info-box-fire", 'text': "infoTextTypeEmergencieFire",
					'number': "infoNumberTypeEmergencieFire", 'progressbar': "infoProgressbarTypeEmergencieFire",
					'description': "infoDescriptionTypeEmergencieFire", 'root': "rootInfoTypeEmergencieFire"
				},
				'incident': {
					'attribute': "incident", 'style': "info-box-incident", 'text': "infoTextTypeEmergencieIncident",
					'number': "infoNumberTypeEmergencieIncident", 'progressbar': "infoProgressbarTypeEmergencieIncident",
					'description': "infoDescriptionTypeEmergencieIncident", 'root': "rootInfoTypeEmergencieIncident"
				},
				'vehicular_accident': {
					'attribute': "vehicular_accident", 'style': "info-box-vehicular-accident", 'text': "infoTextTypeEmergencieVehicularAccident",
					'number': "infoNumberTypeEmergencieVehicularAccident", 'progressbar': "infoProgressbarTypeEmergencieVehicularAccident",
					'description': "infoDescriptionTypeEmergencieVehicularAccident", 'root': "rootInfoTypeEmergencieVehicularAccident"
				},
				'rescue': {
					'attribute': "rescue", 'style': "info-box-rescue", 'text': "infoTextTypeEmergencieRescue",
					'number': "infoNumberTypeEmergencieRescue", 'progressbar': "infoProgressbarTypeEmergencieRescue",
					'description': "infoDescriptionTypeEmergencieRescue", 'root': "rootInfoTypeEmergencieRescue"
				},
				'special_service': {
					'attribute': "special_service", 'style': "info-box-special-service", 'text': "infoTextTypeEmergencieSpecialService",
					'number': "infoNumberTypeEmergencieSpecialService", 'progressbar': "infoProgressbarTypeEmergencieSpecialService",
					'description': "infoDescriptionTypeEmergencieSpecialService", 'root': "rootInfoTypeEmergencieSpecialService"
				},
				'natural_disasters': {
					'attribute': "natural_disasters", 'style': "info-box-disaster-natural", 'text': "infoTextTypeEmergencieNaturalDisasters",
					'number': "infoNumberTypeEmergencieNaturalDisasters", 'progressbar': "infoProgressbarTypeEmergencieNaturalDisasters",
					'description': "infoDescriptionTypeEmergencieNaturalDisasters", 'root': "rootInfoTypeEmergencieNaturalDisasters"
				}
			},
			'util': {
				'xs_12': "col-xs-12", 'xs_6': "col-xs-6", 'description': "{{percentage}}",
				'root_existence': {
					'no': "no", "ok": "ok"
				}
			}
		},
		'lastEmergencie': {
			'parent': "contLastEmergencie", 'type': "typeLastEmergencie", 'date_time': "datetimeLastEmergencie",
			'address': "addressLastEmergencie", 'container': "contContentAddress",
			'default': {
				'type': "Desconocido", 'address': "Desconocido", 'date_time': "Desconocido"
			}
		}
	},
	'FLOAT_CONTAINER': {
		'lastEmergencie': {
			'name': "lastEmergencie",
	        'width': {
	            'greater_768': {
	                'position': '-450px', 'style': 'filters-fit-768'
	            },
	            'from_768_to_405': {
	                'position': '-350px', 'style': 'filters-fit-768_405'
	            },
	            'from_405_to_360': {
	                'position': '-305px', 'style': 'filters-fit-405_360'
	            },
	            'from_360_to_335': {
	                'position': '-280px', 'style': 'filters-fit-360_335'
	            },
	            'from_335_to_320': {
	                'position': '-265px', 'style': 'filters-fit-335_320'
	            },
	            'less_320': {
	                'position': '-250px', 'style': 'filters-fit-320'
	            }
	        },
	        'status': {
	            'open': "open", 'close': "close"
	        }
		}
	},
	'TABLE': {
		'emergencies': {
			'id': 'tEmergencies',
			'options': {
				'columns': [
					{'className': "column-custom", 'width': "5%", 'orderable': false},
	                {'data': "dtEmergencyDateTime", 'className': "column-custom", 'width': "15%"},
	                {'data': "txEmergencyAddress", 'className': "column-custom", 'width': "40%"},
	                {'data': "nbETypeName", 'className': "column-custom", 'width': "15%"},
					{'data': "nbEStatusName", 'className': "column-custom", 'width': "10%"},
	                {'data': "nbEmergencyMachine", 'className': "column-custom", 'width': "10%"},
					{'className': "column-custom", 'width': "5%", 'orderable': false}
	            ],
				'searching': true, 'ordering': true, 'paging': true, 'lengthChange': false, 'info': true,
				'autoWidth': true, 'pageLength': 10, 'scrollX': true, 'order': [1, 'desc']
			},
			'util': {
				'searching': "tEmergenciesSearch",
				'columnDefs': {
					'localization': 0, 'align': [2,3,5], 'status': 4, 'routes': 6
				},
				'style': {
					'text_left': "align-left-mandatory"
				}
			}
		},
		'typeEmergencies': {
			'id': 'tTypeEmergencies',
			'options': {
				'columns': [
					{'data': "nbETypeName", 'className': "column-custom", 'width': "50%"},
					{'data': "nuXCount", 'className': "column-custom", 'width': "25%"},
					{'data': "nuXPercent", 'className': "column-custom", 'width': "25%"}
				],
				'searching': false, 'ordering': true, 'paging': false, 'lengthChange': false, 'info': false,
				'autoWidth': true, 'pageLength': null, 'scrollX': true, 'scrollY': '50vh', 'scrollCollapse': true,
				'order': [1, 'desc'],
				'columnDefs': [{
					'targets': 2,
					'render': function(data, type, row, meta) {
						return data.toFixed(2);
					}
				}]
			}
		},
		'typeStatus': {
			'id': 'tTypeStatus',
			'options': {
				'columns': [
					{'data': "nbEStatusName", 'className': "column-custom", 'width': "50%"},
					{'data': "nuXCount", 'className': "column-custom", 'width': "25%"},
					{'data': "nuXPercent", 'className': "column-custom", 'width': "25%"}
				],
				'searching': false, 'ordering': true, 'paging': false, 'lengthChange': false, 'info': false,
				'autoWidth': true, 'pageLength': null, 'scrollX': true, 'scrollY': '50vh', 'scrollCollapse': true,
				'order': [1, 'desc'],
				'columnDefs': [{
					'targets': 2,
					'render': function(data, type, row, meta) {
						return data.toFixed(2);
					}
				}]
			}
		},
		'departments': {
			'id': 'tDepartment',
			'options': {
				'columns': [
					{'data': "nbDepartamentName", 'className': "column-custom", 'width': "50%"},
					{'data': "nuXCount", 'className': "column-custom", 'width': "25%"},
					{'data': "nuXPercent", 'className': "column-custom", 'width': "25%"},
					{'className': "column-custom", 'width': "5%", 'orderable': false}
				],
				'searching': false, 'ordering': true, 'paging': true, 'lengthChange': false, 'info': false,
				'autoWidth': true, 'pageLength': 8, 'scrollX': true, 'scrollY': '50vh', 'scrollCollapse': true,
				'order': [1, 'desc'],
				'columnDefs': [{
					'targets': 2,
					'render': function(data, type, row, meta) {
						return data.toFixed(2);
					}
				}]
			},
			'util': {
				'columnDefs': {
					'search': 3
				},
				'property': {
					'id': "idDepartamentId"
				}
			}
		},
		'provinces': {
			'id': 'tProvince',
			'options': {
				'columns': [
					{'data': "nbProvinceName", 'className': "column-custom", 'width': "50%"},
					{'data': "nuXCount", 'className': "column-custom", 'width': "25%"},
					{'data': "nuXPercent", 'className': "column-custom", 'width': "25%"},
					{'className': "column-custom", 'width': "5%", 'orderable': false}
				],
				'searching': false, 'ordering': true, 'paging': true, 'lengthChange': false, 'info': false,
				'autoWidth': true, 'pageLength': 8, 'scrollX': true, 'scrollY': '50vh', 'scrollCollapse': true,
				'order': [1, 'desc'],
				'columnDefs': [{
					'targets': 2,
					'render': function(data, type, row, meta) {
						return data.toFixed(2);
					}
				}]
			},
			'util': {
				'columnDefs': {
					'search': 3
				},
				'property': {
					'id': "idProvinceId"
				}
			}
		},
		'districts': {
			'id': 'tDistrict',
			'options': {
				'columns': [
					{'data': "nbDistrictName", 'className': "column-custom", 'width': "45%"},
					{'data': "nuXCount", 'className': "column-custom", 'width': "25%"},
					{'data': "nuXPercent", 'className': "column-custom", 'width': "25%"}
				],
				'searching': false, 'ordering': true, 'paging': true, 'lengthChange': false, 'info': false,
				'autoWidth': true, 'pageLength': 8, 'scrollX': true, 'scrollY': '50vh', 'scrollCollapse': true,
				'order': [1, 'desc'],
				'columnDefs': [{
					'targets': 2,
					'render': function(data, type, row, meta) {
						return data.toFixed(2);
					}
				}]
			}
		},
		'centersHelp': {
			'id': 'tCentersHelp',
			'options': {
				'columns': [
					{'className': "column-custom", 'width': "5%", 'orderable': false},
	                {'data': "nbCHelpName", 'className': "column-custom", 'width': "25%"},
	                {'data': "nbTHelpName", 'className': "column-custom", 'width': "15%"},
	                {'data': "txCHelpAddress", 'className': "column-custom", 'width': "35%"},
					{'data': "txCHelpDetDistance", 'className': "column-custom", 'width': "10%"},
	                {'data': "txCHelpDetDuration", 'className': "column-custom", 'width': "10%"}
	            ],
				'searching': true, 'ordering': true, 'paging': true, 'lengthChange': false, 'info': true,
				'autoWidth': true, 'pageLength': 8, 'scrollX': true, 'order': [[5, 'asc'],[4, 'asc']]
			},
			'util': {
				'columnDefs': {
					'localization': 0, 'align': [1,2,3]
				},
				'style': {
					'text_left': "align-left-mandatory"
				}
			}
		}
	},
	'MAP': {
		'emergencies': {
			'id': 'mEmergencies', 'helper': 'mapHelperContainer'
		},
		'centersHelp': {
			'id': 'mCentersHelp', 'helper': 'mapCentersHelpHelperContainer'
		}
	},
	'CHART': {
		'hours24': {
			'id': 'c24Hours',
			'options': {
				'chart': {
					'type': 'line',
					'reflow': true
				},
				'tooltip': {
					'valueSuffix': " ", 'shared': true, 'enabled': true
				},
				'yAxis': [{
					'max': null, 'min': 0, 'opposite': false, 'reversedStacks': true,
					'title': "Cantidad"
			    }],
				'title': null, 'subtitle': null
			},
			'property': {
				'quantity': "nuXTotal", 'formatHour24': "hrTimeHour24H", 'formatHour12': "hrTimeHourAM",
				'emergency': "nbETypeName"
			}
		},
		'typeEmergencies': {
			'id': 'cTypeEmergencies', 'nameSerie': "Emergencias",
			'options': {
				'chart': {
					'type': 'pie',
					'reflow': true
				},
				'plotOptions': {
				   'pie': {
					   'allowPointSelect': true,
					   'cursor': 'pointer',
					   'dataLabels': {
						   'distance': -50,
						   'format': '<b>{point.percentage:.2f}%</b>'
					   },
					   'showInLegend': true
				   }
			    },
				'title': null, 'subtitle': null
			},
			'property': {
				'quantity': "nuXCount", 'percentage': "nuXPercent", 'emergency': "nbETypeName"
			}
		},
		'typeStatus': {
			'id': 'cTypeStatus', 'nameSerie': "Emergencias",
			'options': {
				'chart': {
					'type': 'pie',
					'reflow': true
				},
				'plotOptions': {
				   'pie': {
					   'allowPointSelect': true,
					   'cursor': 'pointer',
					   'dataLabels': {
						   'distance': -50,
						   'format': '<b>{point.percentage:.2f}%</b>'
					   },
					   'showInLegend': true
				   }
			    },
				'title': null, 'subtitle': null
			},
			'property': {
				'quantity': "nuXCount", 'percentage': "nuXPercent", 'status': "nbEStatusName"
			}
		},
		'departments': {
			'id': 'cDepartment', 'nameSerie': "Emergencias",
			'options': {
				'chart': {
					'type': 'pie',
					'reflow': true
				},
				'plotOptions': {
				   'pie': {
					   'allowPointSelect': true,
					   'cursor': 'pointer',
					   'dataLabels': {
						   'distance': -50,
						   'format': '<b>{point.percentage:.2f}%</b>'
					   },
					   'showInLegend': true
				   }
			    },
				'title': null, 'subtitle': null
			},
			'property': {
				'quantity': "nuXCount", 'percentage': "nuXPercent", 'department': "nbDepartamentName"
			}
		},
		'provinces': {
			'id': 'cProvince', 'nameSerie': "Emergencias",
			'options': {
				'chart': {
					'type': 'pie',
					'reflow': true
				},
				'plotOptions': {
				   'pie': {
					   'allowPointSelect': true,
					   'cursor': 'pointer',
					   'dataLabels': {
						   'distance': -50,
						   'format': '<b>{point.percentage:.2f}%</b>'
					   },
					   'showInLegend': true
				   }
			    },
				'title': null, 'subtitle': null
			},
			'property': {
				'quantity': "nuXCount", 'percentage': "nuXPercent", 'province': "nbProvinceName"
			}
		},
		'districts': {
			'id': 'cDistrict', 'nameSerie': "Emergencias",
			'options': {
				'chart': {
					'type': 'pie',
					'reflow': true
				},
				'plotOptions': {
				   'pie': {
					   'allowPointSelect': true,
					   'cursor': 'pointer',
					   'dataLabels': {
						   'distance': -50,
						   'format': '<b>{point.percentage:.2f}%</b>'
					   },
					   'showInLegend': true
				   }
			    },
				'title': null, 'subtitle': null
			},
			'property': {
				'quantity': "nuXCount", 'percentage': "nuXPercent", 'province': "nbDistrictName",
				'district': "nbDistrictName"
			}
		},
		'util': {
			'xAxis': {
				'categories': null, 'crosshair': true
			},
			'serie': {
				'name': null, 'data': null, 'yAxis': 0, 'visible': true, 'connectNulls': false
			},
			'pieSerie': {
				'name': null, 'data': []
			},
			'pieData': {
				'name': null, 'y': null
			},
			'format24': "format24", 'format12': "format12"
		}
	}
});
