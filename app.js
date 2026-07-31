document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('form-message-success');
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');

    if (localStorage.getItem('mala_m_userName')) {
        nameInput.value = localStorage.getItem('mala_m_userName');
    }
    if (localStorage.getItem('mala_m_userEmail')) {
        emailInput.value = localStorage.getItem('mala_m_userEmail');
    }
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            
            localStorage.setItem('mala_m_userName', nameInput.value);
            localStorage.setItem('mala_m_userEmail', emailInput.value);

            if (successMessage) {
                successMessage.style.display = 'block';
            }
            
            form.reset();
            nameInput.value = localStorage.getItem('mala_m_userName');
            emailInput.value = localStorage.getItem('mala_m_userEmail');

            setTimeout(function() {
                if (successMessage) {
                    successMessage.style.display = 'none';
                }
            }, 5000);
        });
    } else {
        console.error("El formulario 'contactForm' no fue encontrado");
    }

    const subscribeForm = document.getElementById('subscribeForm');
    const subscribeMessage = document.getElementById('subscribe-message');

    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            if (subscribeMessage) {
                subscribeMessage.style.display = 'block';
            }
            
            subscribeForm.reset();

            setTimeout(function() {
                if (subscribeMessage) {
                    subscribeMessage.style.display = 'none';
                }
            }, 4000);
        });
    }
});