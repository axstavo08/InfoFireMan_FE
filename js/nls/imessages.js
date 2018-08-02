/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define({
    'root': {
        'filters': {
            'select': {
                'single': {
                    'placeholder': 'Seleccione'
                },
                'multi': {
                    'placeholder': 'Seleccione',
                    'results': 'Seleccionado {{selected}} de {{total}}'
                }
            },
            'error': {
                'empty': 'Filtros vac\u00EDos, no se realizar\u00E1 ninguna acci\u00F3n.'
            }
        },
        'global': {
            'reload': "Volver a cargar",
            'load': "Cargando...",
            'error': {
                'default': 'Hubo un error al cargar la aplicaci\u00F3n',
                'search': 'Error al buscar',
                'system': 'Error en el sistema',
                'overlay': "Error al cargar"
            },
            'action': {
                'close': "Cerrar"
            }
        },
        'diary': {
            'typeEmergencies': {
                'description': "{{percentage}}% de emergencias"
            }
        }
    },
    'en': true
});
