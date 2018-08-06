/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define({
    'TYPE': {
        'MULTIPLE': 'multiple', 'SINGLE': 'single'
    },
    'ELEMENT': {
        'TYPE_EMERGENCY': {
            'TITLE': "Emergencias", 'COMPONENT': "sEmergencies", 'MULTIPLE': 'multiple="multiple"',
            'CONTAINER': "contTypeEmergency", 'VALIDATION': "yes"
        },
		'TYPE_STATUS': {
            'TITLE': "Estados", 'COMPONENT': "sStatus", 'MULTIPLE': 'multiple="multiple"',
            'CONTAINER': "contTypeStatus", 'VALIDATION': "yes"
        },
		'DEPARTMENT': {
            'TITLE': "Departamento", 'COMPONENT': "sDepartment", 'MULTIPLE': 'multiple="multiple"', 'CONTAINER': "contDepartment",
            'VALIDATION': "yes"
        },
		'PROVINCE': {
            'TITLE': "Provincias", 'COMPONENT': "sProvince", 'CONTAINER': "contProvince",
            'VALIDATION': "no"
        },
        'DATE_TODAY': {
            'TITLE': "Fecha", 'COMPONENT': "dToday", 'PLACEHOLDER': 'Fecha actual', 'CONTAINER': "contToday",
            'VALIDATION': "no"
        },
        'ACTION': {
            'TITLE': "Buscar", 'COMPONENT': "btnSearch", 'CONTAINER': "contSearch"
        }
    },
	'DEPENDENCY': {
		'DEPARTMENT': {
			'STATUS': false, 'PARENT': true,
			'DATA': {
				'ID': "id_DepartamentId", 'LABEL': "nb_DepartamentName"
			}
		},
		'PROVINCE': {
			'STATUS': false,
			'DATA': {
				'ID': "id_ProvinceId", 'LABEL': "nb_ProvinceName", 'PARENT': "id_DepartamentId"
			}
		},
		'TYPE_EMERGENCY': {
			'STATUS': false,
			'DATA': {
				'ID': "idETypeId", 'LABEL': "nbETypeName"
			}
		},
		'TYPE_STATUS': {
			'STATUS': false,
			'DATA': {
				'ID': "id_EStatusId", 'LABEL': "nb_EStatusName"
			}
		}
	},
	'PROPERTY': {
		'TYPE_EMERGENCY': {
			'NAME': "type_emergency", 'TYPE': "multiple"
		},
		'TYPE_STATUS': {
			'NAME': "type_status", 'TYPE': "multiple"
		},
		'DEPARTMENT': {
			'NAME': "department", 'TYPE': "multiple"
		},
		'PROVINCE': {
			'NAME': "province", 'TYPE': "single"
		},
		'DATE_TODAY': {
			'NAME': "date_today"
		}
	},
	'ITEM': {
		'PARENT': "<div></div>", 'STYLE': "wrap", 'CHECK': "#{{name}} > option"
	},
	'CONFIGURATION': {
		'SEARCHING': 5
	},
    'TEMPLATE': {
        'container': "temp-filters-container", 'select': "temp-filters-select-element",
        'date': "temp-filters-date-element", 'action': "temp-filters-action-container"
    },
    'CONTAINER': {
        'CONTENT': "filters-content"
    },
    'OBSERVER': {
        'MULTIPLE': {
            'attributes': true
        },
        'SINGLE': {
            'attributes': true, 'subtree': true, 'childList': true
        },
        'TYPE': {
            'ATTRIBUTES': 'attributes', 'CHILDLIST': 'childList'
        }
    },
    'DEFAULT': {
        'PROVINCE': '0'
    },
    'SELECT2': {
        'DROPDOWN': ".select2-dropdown",
        'INPUT_SEARCHING': ".select2-search--dropdown"
    },
    'PARENT': {
        'name': "filters",
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
    },
    'FORM': "filters-form",
    'HELPER': {
        'validation': "no"
    },
    'TRIGGERS': {
        'action': "action-event-diary"
    }
});
