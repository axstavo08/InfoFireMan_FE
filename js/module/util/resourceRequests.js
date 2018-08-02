/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define({
	'filters': {
        'type': '/Stats/Types',
        'status': '/Status',
        'departaments': '/Departaments',
        'provinces': '/Provinces/{{ids}}'
    },
	'view': {
		//'emergencies_information': '/Emergencies/{{today}}/{{type}}/{{status}}/{{dep}}/{{prov}}',
		'emergencies_information': '/Emergencies/{{type}}/{{status}}/{{dep}}/{{prov}}',
		'hours_24_information': '/Stats/24hours/{{today}}',
		'type_emergencies_information': '/Stats/Type/{{today}}',
		'type_status_information': '/Stats/Status/{{today}}',
		'departments_information': '/Stats/Department/{{today}}',
		'provinces_information': '/Stats/Province/{{today}}',
		'districts_information': '/Stats/District/{{today}}/{{prov}}'
	},
	'property': {
		'emergencies_information': "emergencies_information",
		'hours_24_information':  "hours_24_information",
		'type_emergencies_information':  "type_emergencies_information",
		'type_status_information':  "type_status_information",
		'departments_information':  "departments_information",
		'provinces_information':  "provinces_information",
		'districts_information':  "districts_information"
	},
    'parameters': {
        'auth': {
            'basic': {
                'user': 'admin', 'pass': 'admin'
            }
        }
    },
	'status': {
		'total': "total", 'success': "success", 'error': "error", 'warning': "warning",
		'empty': "no data", 'abort': "abort", 'goal': "goal"
	},
	'action': {
		'search': "search", 'cancel': "cancel"
	}
});
