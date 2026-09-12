
document.addEventListener('DOMContentLoaded', () => {
  const planRadios = document.querySelectorAll('input[name="plan"]');
  const serverForm = document.getElementById('server-form');
  const deployBtn = document.getElementById('deploy-btn');
  const deployStatus = document.getElementById('deploy-status');

  const summaryPlan = document.getElementById('summary-plan');
  const summaryRam = document.getElementById('summary-ram');
  const summaryLocation = document.getElementById('summary-location');
  const summaryVersion = document.getElementById('summary-version');
  const summaryType = document.getElementById('summary-type');
  const summaryTotal = document.getElementById('summary-total');

  const addonSubdomain = document.getElementById('addon-subdomain');
  const addonCpu = document.getElementById('addon-premium-cpu');

  let selectedPlanPrice = 0;
  let selectedRam = '';

  function updateSummary() {
    const plan = document.querySelector('input[name="plan"]:checked');
    const location = document.getElementById('server-location').value;
    const version = document.getElementById('server-version').value;
    const type = document.getElementById('server-type').value;

    let total = selectedPlanPrice;
    if (addonSubdomain?.checked) total += 1.99;
    if (addonCpu?.checked) total += 4.99;

    summaryPlan.textContent = plan ? plan.value.charAt(0).toUpperCase() + plan.value.slice(1) : '—';
    summaryRam.textContent = selectedRam || '—';
    summaryLocation.textContent = location ? document.getElementById('server-location').selectedOptions[0].text.replace(/^[^\s]+\s+/, '') : '—';
    summaryVersion.textContent = version || '—';
    summaryType.textContent = type ? type.charAt(0).toUpperCase() + type.slice(1) : '—';
    summaryTotal.textContent = `€${total.toFixed(2)}`;

    const valid = plan && document.getElementById('server-name').value.trim() && location && version && type;
    deployBtn.disabled = !valid;
  }

  planRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      selectedPlanPrice = parseFloat(radio.dataset.price);
      selectedRam = `${radio.dataset.ram} GB`;
      updateSummary();
    });
  });

  serverForm?.addEventListener('input', updateSummary);
  addonSubdomain?.addEventListener('change', updateSummary);
  addonCpu?.addEventListener('change', updateSummary);

  deployBtn?.addEventListener('click', () => {
    const plan = document.querySelector('input[name="plan"]:checked');
    if (!plan) return;

    deployBtn.textContent = 'Deploying...';
    deployBtn.disabled = true;

    setTimeout(() => {
      document.querySelector('.deploy-grid').style.display = 'none';
      deployStatus.style.display = 'block';

      const ipBase = ['play', 'mine', 'craft', 'host'][Math.floor(Math.random() * 4)];
      const id = Math.random().toString(36).slice(2, 7);
      document.getElementById('server-ip').textContent = `${ipBase}-${id}.blockhost.net`;
    }, 1800);
  });

  updateSummary();
});
