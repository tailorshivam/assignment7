document.addEventListener('DOMContentLoaded', () => {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', event => {
            const titleInput = form.querySelector('input[name="title"]');
            if (titleInput && !titleInput.value.trim()) {
                event.preventDefault();
                alert('Please enter a task title before submitting!');
            }
        });
    });
});