"use strict";

/* LOADING */
let loading_container = document.querySelector("#loading-container");
let intervalId;
let hasExecuted = false;
if(loading_container != null){
    document.addEventListener("DOMContentLoaded", function() {
        const pageContent = document.getElementById("page-content");
        setTimeout(() => {
            loading_container.style.display = "none";
            pageContent.style.display = "block";
            hasExecuted = true;
            if (hasExecuted) {
                intervalId = setInterval(() => {
                    moveToRight();
                }, 2000);
            }
        }, 3000);
        
    });
}

/* FUNCION PARA HACER EL SLIDER */
const arrowLeft = document.getElementById("icon-arrow-left"),
      arrowRight = document.getElementById("icon-arrow-right"),
      slider = document.getElementById("slider"),
      imgSlider = document.querySelectorAll(".img-slider");
arrowLeft.addEventListener("click", (e) => {
    moveToLeft();
    pauseAndRestartInterval();
})
arrowRight.addEventListener("click", (e) => {
    moveToRight();
    pauseAndRestartInterval();
})

let isTransitioning = false,
    translateX = 0,
    counter = 0,
    widthImg = 100 / imgSlider.length;
function moveToRight() {
    if (counter >= imgSlider.length-1) {
        counter = 0;
        translateX = 0;
        slider.style.transform = `translate(-${translateX}%)`;
        slider.style.transition = "none";
        return;
    } 
    counter++;
    translateX += widthImg;
    slider.style.transform = `translate(-${translateX}%)`;
    slider.style.transition = "all ease 1s";
}
function moveToLeft() {
    counter--;
    if (counter < 0) {
        counter = imgSlider.length-1;
        translateX = widthImg * (imgSlider.length-1);
        slider.style.transform = `translate(-${translateX}%)`;
        slider.style.transition = "none";
        return;
    }
    translateX = counter * widthImg;
    slider.style.transform = `translate(-${translateX}%)`;
    slider.style.transition = "all ease 1s";
}

function pauseAndRestartInterval() {
  if (isTransitioning) {
    return; // Evitar múltiples llamadas mientras está en transición
  }

  isTransitioning = true;

  clearInterval(intervalId);
  setTimeout(() => {
    intervalId = setInterval(() => {
      moveToRight();
    }, 2000);

    isTransitioning = false;
  }, 5000); // Usar el mismo intervalo de 3000 milisegundos
}

/* MOVER EL SLIDER CON EL TOUCH */

let touchStartX = 0;
let touchEndX = 0;

slider.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX;
});
slider.addEventListener("touchmove", (e) => {
    touchEndX = e.touches[0].clientX;
});
slider.addEventListener("touchend", () => {
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > 50)
        moveToLeft();
    else if (swipeDistance < -50)
        moveToRight();
    pauseAndRestartInterval();
});

/* HEADER FIJO Y APERTURA DEL MENÚ EN MOBILE */
const menu = document.getElementById("icon-menu");
const closeMenu = document.getElementById("close-menu");
const ul = document.getElementById("list-nav");
menu.addEventListener("click", () => {
    ul.classList.add("show");
    const isMenuOpen = ul.classList.contains("show");
    menu.style.display = "none";
    closeMenu.style.display = isMenuOpen ? "flex" : "none";
})
closeMenu.addEventListener("click", () => {
    const isMenuOpen = ul.classList.contains("show");
    ul.classList.remove("show");
    menu.style.display = "block";
    closeMenu.style.display = isMenuOpen ? "none" : "flex";
})

/* VALIDAR FORMULARIO */

const btnForm = document.getElementById("btn-form");
btnForm.addEventListener("click", validateForm);

function validateForm(event) {
    event.preventDefault();
    let nameform = document.getElementById("name-form").value;
    let email = document.getElementById("email-form").value;
    let message = document.getElementById("message-form").value;
    let errorForm = document.getElementById("error-form");
    let validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(nameform.trim() == '' || !validEmail.test(email) || message.trim() == ''){
        errorForm.style.display = 'block';
        errorForm.style.color = 'red';
        errorForm.innerText = 'Completar todos los campos. (*)';
    }
    else {
        errorForm.style.display = 'block';
        errorForm.style.color = "#47A12C";
        errorForm.innerText = '¡Consulta enviada correctamente!';
    
        btnForm.value = 'Enviando...';

        const serviceID = 'service_t8b4utn';
        const templateID_Programador = 'template_biyim8n';
        emailjs.send(serviceID, templateID_Programador, {
            name: nameform,
            message: message,
            email: email,
            })
         .then(() => {
             btnForm.value = 'Enviar';
             errorForm.innerText = '¡Consulta enviada correctamente!';
         }, (err) => {
             btnForm.value = 'Enviar';
             errorForm.innerText = 'No se pudo enviar la consulta. Intente nuevamente en unos minutos.';
         });
        const templateID_Lfernandez = "template_r0r1y68";
        emailjs.send(serviceID, templateID_Lfernandez, {
            name: nameform,
            message: message,
            email: email,
            })
         .then(() => {
             btnForm.value = 'Enviar';
             errorForm.innerText = '¡Consulta enviada correctamente!';
         }, (err) => {
             btnForm.value = 'Enviar';
             errorForm.innerText = 'No se pudo enviar la consulta. Intente nuevamente en unos minutos.';
         });
    }
}

/* CAPTURANDO LOS <a> PARA QUE NO ME APAREZCA EN LA URL */
const links = document.querySelectorAll('a[href^="#"]');

  // Agregar un controlador de eventos a cada enlace
links.forEach(link => {
  link.addEventListener('click', scrollToSection);
});
// Función para manejar el desplazamiento suave
function scrollToSection(event) {
  event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
  const targetId = this.getAttribute('href').substring(1); // Obtener el ID de la sección
  const targetSection = document.getElementById(targetId);
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/* APARECER POPUP DE QUIENES SOMOS */
const about = document.getElementById("about");
const popUp = document.getElementById("section-5");
const closePopUp = document.getElementById("btn-section-5");
about.addEventListener("click", () => {
    popUp.classList.toggle("show");
})
closePopUp.addEventListener("click", () => {
    if(popUp.classList.contains("show"))
        popUp.classList.remove("show");
})




