document.addEventListener('DOMContentLoaded', function () {
    const navLinks = document.querySelectorAll('.navbar a');
    const sections = document.querySelectorAll('section');


    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            sections.forEach(section => {
                section.classList.remove('visible');
                section.classList.add('hidden');
            });

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.classList.remove('hidden');
                targetSection.classList.add('visible');
            }
        });
    });

    
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); 

            const formData = new FormData(this);

            fetch('/submit-form', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                
                const responseMessage = data.message || 'Message sent successfully!';
                document.getElementById('response-message').textContent = responseMessage;
                contactForm.reset(); 
            })
            .catch(error => {
                document.getElementById('response-message').textContent = 'There was an error sending your message.';
                console.error('Error:', error);
            });
        });
    }
});
