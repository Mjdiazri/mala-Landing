/**
 * MALA - Módulo Hero Preloader Interactivo
 * Encapsulado en IIFE para evitar contaminación de variables globales en el proyecto grupal.
 */
(function () {
  'use strict'; // Modo estricto para asegurar un código más seguro y sin errores silenciosos

  // Se ejecuta una vez el DOM esté totalmente cargado y parseado
  document.addEventListener('DOMContentLoaded', () => {
    
    // --- OBTENCIÓN DE ELEMENTOS DEL DOM CON NOMBRES ÚNICOS ---
    const holdBtn = document.getElementById('mala-hero-holdBtn');                 // Contenedor principal del botón interactivo
    const progressCircle = document.getElementById('mala-hero-progressCircle');   // Círculo SVG de progreso
    const splashScreen = document.getElementById('mala-hero-splash-screen');     // Pantalla de bloqueo completa
    const cloudLeft = document.getElementById('mala-hero-cloudLeft');             // Contenedor nube izquierda
    const cloudRight = document.getElementById('mala-hero-cloudRight');           // Contenedor nube derecha

    // --- CÁLCULOS MATEMÁTICOS PARA EL CÍRCULO SVG ---
    const circleRadius = progressCircle.r.baseVal.value;                          // Obtiene el radio 'r' configurado en el SVG (70px)
    const circumference = 2 * Math.PI * circleRadius;                             // Calcula la circunferencia total del círculo (2 * PI * r)

    // --- VARIABLES DE ESTADO Y TIEMPO ---
    let holdTimer = null;                                                         // Referencia del intervalo de tiempo (setInterval)
    let progress = 0;                                                             // Porcentaje inicial de carga (0% a 100%)
    const holdDuration = 1500;                                                    // Tiempo total necesario para desbloquear (1.5 segundos)
    const intervalTime = 20;                                                      // Frecuencia de actualización en milisegundos (50 fps aprox.)

    // --- CONFIGURACIÓN INICIAL DEL ANILLO SVG ---
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;   // Define la longitud del trazo igual a la circunferencia
    progressCircle.style.strokeDashoffset = circumference;                        // Oculta completamente el borde rojo al inicio

    /**
     * Genera partículas de chispas de fuego que salen disparadas desde el centro del botón.
     */
    function createSpark() {
      const container = document.getElementById('mala-hero-fireSparks');         // Obtiene el contenedor de chispas
      if (!container) return;                                                     // Cláusula de guarda si el contenedor no existe

      const spark = document.createElement('div');                                // Crea un nuevo elemento div dinámico
      spark.classList.add('mala-hero-spark');                                     // Le asigna la clase CSS con la animación

      // Cálculo de trayectoria radial aleatoria
      const angle = Math.random() * Math.PI * 2;                                  // Genera un ángulo aleatorio en radianes (0 a 360°)
      const distance = 140 + Math.random() * 180;                                 // Genera una distancia de eyección aleatoria (140px a 320px)

      const tx = Math.cos(angle) * distance;                                      // Desplazamiento final en el eje X
      const ty = Math.sin(angle) * distance;                                      // Desplazamiento final en el eje Y

      // Asigna las posiciones calculadas a variables CSS personalizadas
      spark.style.setProperty('--tx', `${tx}px`);
      spark.style.setProperty('--ty', `${ty}px`);

      // Paleta de colores cálidos seleccionada aleatoriamente
      const colors = ['#FFCC00', '#FF9900', '#FF5500', '#FFAA00', '#FF3300'];
      spark.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      container.appendChild(spark);                                               // Inserta la chispa en el DOM

      // Elimina la chispa del DOM una vez finalizada su animación CSS (800ms)
      setTimeout(() => {
        spark.remove();
      }, 800);
    }

    /**
     * Actualiza visualmente el progreso de la interfaz (Círculo SVG y despliegue de nubes).
     * @param {number} percent - Porcentaje actual de la carga (0 a 100).
     */
    function setProgress(percent) {
      // 1. Calcula el desplazamiento del borde para rellenar el círculo SVG
      const offset = circumference - (percent / 100) * circumference;
      progressCircle.style.strokeDashoffset = offset;

      // 2. Calcula el movimiento lateral de las nubes según el porcentaje
      const maxShift = 45;                                                       // Desplazamiento máximo en porcentaje CSS
      const currentShift = (percent / 100) * maxShift;                           // Proporción actual del desplazamiento

      // Aplica transformación a las nubes para empujarlas hacia los lados
      cloudLeft.style.transform = `translateX(${-100 - currentShift}%)`;
      cloudRight.style.transform = `translateX(${currentShift}%)`;
    }

    /**
     * Inicia el proceso de carga al presionar (Mouse, Táctil o Barra Espaciadora).
     * @param {Event} e - Evento desencadenante.
     */
    function startHold(e) {
      // Previene el scroll por defecto del navegador al presionar la barra espaciadora
      if (e.type === 'keydown' && e.code === 'Space') {
        e.preventDefault();
      }
      
      // Si la pantalla ya está activa en proceso, evita duplicar intervalos
      if (splashScreen.classList.contains('mala-hero-active')) return;
      splashScreen.classList.add('mala-hero-active');                             // Activa el estado de ignición en CSS
      
      let elapsedTime = 0;                                                       // Contador interno de milisegundos transcurridos

      // Inicia el bucle periódico para incrementar el progreso
      holdTimer = setInterval(() => {
        elapsedTime += intervalTime;                                             // Suma el tiempo del intervalo
        progress = (elapsedTime / holdDuration) * 100;                           // Calcula el porcentaje acumulado
        
        setProgress(progress);                                                   // Actualiza la interfaz visual
        createSpark();                                                           // Dispara una chispa en cada ciclo

        // Si se alcanza el 100%, completa la animación y desbloquea
        if (progress >= 100) {
          completeHold();
        }
      }, intervalTime);
    }

    /**
     * Cancela la carga si el usuario suelta la tecla o el botón antes de llegar al 100%.
     */
    function stopHold() {
      splashScreen.classList.remove('mala-hero-active');                          // Desactiva el estado visual en CSS
      clearInterval(holdTimer);                                                  // Detiene el temporizador inmediatamente
      
      // Si no completó la carga, reinicia suavemente los valores a cero
      if (progress < 100) {
        progress = 0;
        setProgress(0);
      }
    }

    /**
     * Finaliza la interacción al completar el 100% y revela la página web principal.
     */
    function completeHold() {
      clearInterval(holdTimer);                                                  // Limpia el temporizador activo
      splashScreen.classList.add('mala-hero-fade-out');                          // Desvanece el preloader mediante CSS
      document.body.style.overflow = 'auto';                                     // Reactiva el scroll general de la página web
    }

    // --- ASIGNACIÓN DE ESCUCHADORES DE EVENTOS (EVENT LISTENERS) ---

    // Eventos de Mouse (Desktop)
    holdBtn.addEventListener('mousedown', startHold);                            // Inicia la carga al presionar sobre el botón
    window.addEventListener('mouseup', stopHold);                                // Cancela si se suelta el mouse en cualquier parte de la ventana

    // Eventos Táctiles (Móviles / Tablets)
    holdBtn.addEventListener('touchstart', startHold);                           // Inicia la carga al tocar la pantalla
    window.addEventListener('touchend', stopHold);                               // Cancela si se levanta el dedo de la pantalla

    // Eventos de Teclado (Accesibilidad)
    window.addEventListener('keydown', (e) => {
      // Inicia la carga solo si se presiona la Barra Espaciadora y no hay un proceso en curso
      if (e.code === 'Space' && progress === 0) {
        startHold(e);
      }
    });

    window.addEventListener('keyup', (e) => {
      // Cancela la carga al soltar la Barra Espaciadora
      if (e.code === 'Space') {
        stopHold();
      }
    });

  });
})();