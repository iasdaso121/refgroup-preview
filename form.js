document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.modal__form, .audit-form');

  forms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const resp = await fetch('/api/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        if (resp.ok) {
          alert('Заявка отправлена');
          form.reset();
        } else {
          alert('Ошибка при отправке');
        }
      } catch (err) {
        console.error(err);
        alert('Ошибка при отправке');
      }
    });
  });
});
