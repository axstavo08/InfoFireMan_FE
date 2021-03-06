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
		'table_routes_column': "temp-table-routes-column",
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
		'rescue': "rescue", 'special_service': "special_service", 'natural_disasters': "natural_disasters"
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
				'latitude': "nuEmergLat", 'longitude': "nuEmergLong", 'type': "nbEmergType",
				'status': "nbEmergStatus", 'address': "txEmergAddress"
			},
			'typeEmergencies': {
				'quantity': "XCount", 'percentage': "XPercent", 'type': "nbEmergType"
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
				'nameUnique': "btnMapLocalizationMarkerUnique"
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
				'name': "{{name}}"
			},
			'property': {
				'name': "btnMapRoutesMarker"
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
			'parent': "contLastEmergencie", 'type': "typeLastEmergencie",
			'address': "addressLastEmergencie", 'container': "contContentAddress",
			'default': {
				'type': "Desconocido", 'address': "Desconocido"
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
	                {'data': "dtEmergDateTime", 'className': "column-custom", 'width': "15%"},
	                {'data': "txEmergAddress", 'className': "column-custom", 'width': "40%"},
	                {'data': "nbEmergType", 'className': "column-custom", 'width': "15%"},
					{'data': "nbEmergStatus", 'className': "column-custom", 'width': "10%"},
	                {'data': "nuEmergPart", 'className': "column-custom", 'width': "10%"},
					{'className': "column-custom", 'width': "5%", 'orderable': false}
	            ],
				'searching': true, 'ordering': true, 'paging': true, 'lengthChange': false, 'info': true,
				'autoWidth': true, 'pageLength': 10, 'scrollX': true, 'order': [4, 'asc']
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
					{'data': "nbEmergType", 'className': "column-custom", 'width': "50%"},
					{'data': "XCount", 'className': "column-custom", 'width': "25%"},
					{'data': "XPercent", 'className': "column-custom", 'width': "25%"}
				],
				'searching': false, 'ordering': false, 'paging': false, 'lengthChange': false, 'info': false,
				'autoWidth': true, 'pageLength': null, 'scrollX': true, 'scrollY': '50vh', 'scrollCollapse': true,
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
					{'data': "nbEmergStatus", 'className': "column-custom", 'width': "50%"},
					{'data': "XCount", 'className': "column-custom", 'width': "25%"},
					{'data': "XPercent", 'className': "column-custom", 'width': "25%"}
				],
				'searching': false, 'ordering': false, 'paging': false, 'lengthChange': false, 'info': false,
				'autoWidth': true, 'pageLength': null, 'scrollX': true, 'scrollY': '50vh', 'scrollCollapse': true,
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
					{'data': "nbDepartName", 'className': "column-custom", 'width': "50%"},
					{'data': "XCount", 'className': "column-custom", 'width': "25%"},
					{'data': "XPercent", 'className': "column-custom", 'width': "25%"}
				],
				'searching': false, 'ordering': false, 'paging': false, 'lengthChange': false, 'info': false,
				'autoWidth': true, 'pageLength': null, 'scrollX': true, 'scrollY': '50vh', 'scrollCollapse': true,
				'columnDefs': [{
					'targets': 2,
					'render': function(data, type, row, meta) {
						return data.toFixed(2);
					}
				}]
			}
		},
		'provinces': {
			'id': 'tProvince',
			'options': {
				'columns': [
					{'data': "nbProvName", 'className': "column-custom", 'width': "50%"},
					{'data': "XCount", 'className': "column-custom", 'width': "25%"},
					{'data': "XPercent", 'className': "column-custom", 'width': "25%"}
				],
				'searching': false, 'ordering': false, 'paging': false, 'lengthChange': false, 'info': false,
				'autoWidth': true, 'pageLength': null, 'scrollX': true, 'scrollY': '50vh', 'scrollCollapse': true,
				'columnDefs': [{
					'targets': 2,
					'render': function(data, type, row, meta) {
						return data.toFixed(2);
					}
				}]
			}
		},
		'districts': {
			'id': 'tDistrict',
			'options': {
				'columns': [
					{'data': "nbDistName", 'className': "column-custom", 'width': "50%"},
					{'data': "XCount", 'className': "column-custom", 'width': "25%"},
					{'data': "XPercent", 'className': "column-custom", 'width': "25%"}
				],
				'searching': false, 'ordering': false, 'paging': false, 'lengthChange': false, 'info': false,
				'autoWidth': true, 'pageLength': null, 'scrollX': true, 'scrollY': '50vh', 'scrollCollapse': true,
				'columnDefs': [{
					'targets': 2,
					'render': function(data, type, row, meta) {
						return data.toFixed(2);
					}
				}]
			}
		}
	},
	'MAP': {
		'emergencies': {
			'id': 'mEmergencies', 'helper': 'mapHelperContainer'
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
				'quantity': "XCount", 'formatHour24': "hrHour", 'formatHour12': "hrHourAM",
				'emergency': "nbEmergType"
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
				'quantity': "XCount", 'percentage': "XPercent", 'emergency': "nbEmergType"
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
				'quantity': "XCount", 'percentage': "XPercent", 'status': "nbEmergStatus"
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
				'quantity': "XCount", 'percentage': "XPercent", 'department': "nbDepartName"
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
				'quantity': "XCount", 'percentage': "XPercent", 'province': "nbProvName"
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
				'quantity': "XCount", 'percentage': "XPercent", 'province': "nbProvName",
				'district': "nbDistName"
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
