// Esperar a que todo el DOM esté cargado antes de ejecutar el script
window.onload = function () {
  // Verificar si el navegador soporta geolocalización
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Coordenadas del usuario
        const userLocation = L.latLng(position.coords.latitude, position.coords.longitude);

        // Coordenadas de MasterD Barcelona
        const masterDLocation = L.latLng(41.40354, 2.15119);

        // Verificar si el elemento del mapa existe en el DOM
        const mapElement = document.getElementById('map');
        if (!mapElement) {
          console.error("El elemento con ID 'map' no existe en el DOM.");
          return; // Salir si no existe el contenedor del mapa
        }

        // Inicializar el mapa centrado en la ubicación del usuario
        const map = L.map('map').setView(userLocation, 15);

        // Agregar capa de OpenStreetMap
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Agregar marcador en la ubicación del usuario
        L.marker(userLocation).addTo(map).bindPopup("Estás aquí").openPopup();

        // Agregar marcador en MasterD
        L.marker(masterDLocation).addTo(map).bindPopup("MasterD Barcelona");
      },
      function (error) {
        // Manejar errores de geolocalización
        console.error("Error obteniendo la ubicación: ", error);

        // Coordenadas de MasterD Barcelona
        const masterDLocation = L.latLng(41.40354, 2.15119);

        // Verificar si el elemento del mapa existe en el DOM
        const mapElement = document.getElementById('map');
        if (!mapElement) {
          console.error("El elemento con ID 'map' no existe en el DOM.");
          return; // Salir si no existe el contenedor del mapa
        }

        // Inicializar el mapa centrado en MasterD Barcelona
        const map = L.map('map').setView(masterDLocation, 15);

        // Agregar capa de OpenStreetMap
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // Agregar marcador en MasterD
        L.marker(masterDLocation).addTo(map).bindPopup("MasterD Barcelona").openPopup();
      }
    );
  } else {
    console.error("Geolocalización no está soportada por este navegador.");
  }
};
