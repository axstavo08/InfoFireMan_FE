/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define({
	'filters': {
        'type': '/Stats/Types',
        'status': '/Status',
        'departaments': '/Departaments',
        'provinces': '/Provinces/{{id}}'
    },
	'view': {
		'emergencies_information': '/Emergencies/{{type}}/{{status}}/{{dep}}/{{prov}}',
		'hours_24_information': '/Stats/24hours/{{type}}',
		'type_emergencies_information': '/Stats/Types',
		'type_status_information': '/Stats/Status',
		'departments_information': '/Stats/Departaments/{{dep}}',
		'provinces_information': '/Stats/Provinces/{{dep}}',
		'districts_information': '/Stats/Districts/{{prov}}'
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
