/*
* Author: Gustavo Ramos Montalvo
* Project: info-bomberos
*/

define(['gmaps', 'dataview'], function(gmaps) {

    //Metodo principal para crear objeto principal GoogleMap
    function GoogleMap(id) {
        var map, infoWindow, bounds, markers, markerZoom, mapOverlay;

        //Valida que exista tipo objeto principal GoogleMap
        if (!(this instanceof GoogleMap)) {
            throw new TypeError("GoogleMap constructor cannot be called as a function.");
        }

        //Construye opciones
        function buildOptions(type, coordinates){
            var latitude = -9.36358885706, longitude = -75.0659233683;
            markers = type;
            markerZoom = 16;
            if(typeof coordinates !== 'undefined'){
                if(typeof coordinates.latitude !== 'undefined' && typeof coordinates.longitude !== 'undefined'){
                    latitude = coordinates.latitude;
                    longitude = coordinates.longitude;
                }
            }
            return {
                'center': new gmaps.LatLng(longitude,latitude),
                'zoom': 8,
                'mapTypeControl': false,
                'mapTypeId': 'roadmap'
            };
        }

        //Metodo interno que construye mapa
        this.create = function(type, coordinates) {
            map = new gmaps.Map(document.getElementById(id), buildOptions(type, coordinates));
        };

        //Metodo interno que devuelve objeto mapa
        this.get = function() {
            return map;
        };

        //Metodo interno que crea objeto window
        this.createInfoWindow = function() {
            infoWindow = new gmaps.InfoWindow();
            gmaps.event.addListener(map, 'click', function() {
                infoWindow.close();
            });
        };

        //Metodo interno que crea bounds
        this.createBounds = function() {
            bounds = new gmaps.LatLngBounds();
        };

        //Metodo interno que crea marcador
        this.createMarker = function(type, coordinates, title, image, animation, listener, structureInfo) {
            var marker, optionsMarker = {
                'map': map,
                'position': coordinates,
                'title': title,
                'icon': image,
                'optimized': true
            };
            if(animation){
                optionsMarker.optimized = false;
            }
            marker = new gmaps.Marker(optionsMarker);
            if(typeof listener !== 'undefined' && listener !== null){
                if(listener && typeof structureInfo !== 'undefined' && structureInfo !== null){
                    gmaps.event.addListener(marker, 'click', function() {
            		   infoWindow.setContent(structureInfo);
            		   infoWindow.open(map, marker);
            		});
                }
            }
            markers[type].push(marker);
        };

        //Metodo interno que agrega posiciones a bounds
        this.addPositionToBounds = function(position) {
            bounds.extend(position);
        };

        //Metodo interno que crea overlay
        this.createOverlay = function(position) {
            mapOverlay = new gmaps.OverlayView();
            mapOverlay.draw = function () {
    			this.getPanes().markerLayer.id = 'markerLayer';
    		};
    		mapOverlay.setMap(map);
        };

        //Metodo interno que centra mapa con marcadores
        this.fitWithMarkers = function() {
            map.fitBounds(bounds);
        }

        //Metodo interno que limpia marcadores de mapa
        this.clearMarkers = function(type) {
            var iMarker, marker, arrMarkers = markers[type];
            for(iMarker in arrMarkers){
    			marker = arrMarkers[iMarker];
    			marker.setMap(null);
    		}
    		markers[type] = [];
        }

        //Metodo interno que localiza marcador
        this.locateMarker = function(latitude, longitude) {
            map.panTo(new gmaps.LatLng(latitude, longitude));
    		map.setZoom(markerZoom);
        }

        //Metodo interno que crea servicio de direccion
        this.createDirectionsService = function() {
            return new gmaps.DirectionsService();
        }

        //Metodo interno que crea el renderizador de direcciones
        this.createDirectionsRenderer = function() {
            var directionsRenderer = new gmaps.DirectionsRenderer();
            directionsRenderer.setMap(map);
            return directionsRenderer;
        }

        //Metodo interno que crea el renderizador de direcciones
        this.createRouteDirectionDrivingMode = function(directionsService, directionsRenderer, origin, target, func) {
            var start = new gmaps.LatLng(origin.latitude, origin.longitude),
                end = new gmaps.LatLng(target.latitude, target.longitude), request;
            request = {
                'origin': start,
                'destination': end,
                'travelMode': gmaps.TravelMode.DRIVING
            };
            this.addPositionToBounds(end);
            directionsService.route(request, function (response, status) {
                if (status === gmaps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(response);
                    directionsRenderer.setMap(map);
                } else {
                    console.log("Directions Request from " + start.toUrlValue(6) + " to " + end.toUrlValue(6) + " failed: " + status);
                }
                func(1);
            });
        }
    }

	/*Obtiene objeto imagen para icono*/
	GoogleMap.getImageObject = function(url) {
		return {
            'url': url
        };
	}

    /*Crea posicion por coordenadas*/
	GoogleMap.createPosition = function(latitude, longitude) {
		return new gmaps.LatLng(latitude, longitude);
	}

    return GoogleMap;
});
