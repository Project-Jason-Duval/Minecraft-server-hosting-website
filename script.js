document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  menuButton?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', isOpen);
    menuButton.textContent = isOpen ? '✕' : '☰';
  });

  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuButton.textContent = '☰';
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });

  const billingToggle = document.querySelector('#billing-toggle');
  const prices = document.querySelectorAll('.pricing-card');

  billingToggle?.addEventListener('change', () => {
    const yearly = billingToggle.checked;
    prices.forEach(card => {
      card.querySelector('.monthly').style.display = yearly ? 'none' : 'inline';
      card.querySelector('.yearly').style.display = yearly ? 'inline' : 'none';
      card.querySelector('.period').textContent = yearly ? '/year' : '/month';
    });
  });

  document.querySelectorAll('.faq-question').forEach(question => {
    question.setAttribute('aria-expanded', 'false');
    question.addEventListener('click', () => {
      const item = question.closest('.faq-item');
      const answer = item.querySelector('.faq-answer');
      const open = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-answer').style.maxHeight = null;
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      if (!open) {
        item.classList.add('open');
        answer.style.maxHeight = `${answer.scrollHeight}px`;
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  const planSelect = document.querySelector('#plan');
  document.querySelectorAll('.pricing-card .btn-plan').forEach(button => {
    button.addEventListener('click', () => {
      const plan = button.closest('.pricing-card').querySelector('.plan-name').textContent.trim().toLowerCase();
      if (planSelect) planSelect.value = plan;
    });
  });

  const form = document.querySelector('#signup-form');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.elements.name.value.trim();
    const button = form.querySelector('button[type="submit"]');
    button.textContent = `Thanks${name ? `, ${name}` : ''}! We'll be in touch.`;
    button.disabled = true;
    button.style.opacity = '.85';
  });
});
