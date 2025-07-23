document.addEventListener('DOMContentLoaded', function () {
  const featureData = {
    'comprehensive': `
      <h4 class="text-lg font-semibold text-neutral-900 mb-2">Comprehensive Reports</h4>
      <p class="text-neutral-600 mb-2">Our AI generates full, contextualized research reports covering financials, competitive landscape, regulatory environment, and growth drivers. Get a holistic view in minutes, not days.</p>
      <ul class="list-disc pl-6 text-neutral-500 space-y-1">
        <li>Detailed Financial Performance & Health</li>
        <li>In-depth Valuation & Peer Comparisons</li>
        <li>Scenario forecasts: Bull, Base, Bear</li>
      </ul>
    `,
    'contextual': `
      <h4 class="text-lg font-semibold text-neutral-900 mb-2">Contextual Analysis</h4>
      <p class="text-neutral-600 mb-2">Beyond raw data, our AI synthesizes complex information to provide the 'why' behind the numbers. Understand strategic initiatives, macroeconomic influences, and the impact of AI integration.</p>
      <ul class="list-disc pl-6 text-neutral-500 space-y-1">
        <li>Strategic Overviews & AI Integration Analysis</li>
        <li>Macroeconomic & Regulatory Landscape Insights</li>
        <li>Competitive Dynamics & Moat Identification</li>
      </ul>
    `,
    'speed': `
      <h4 class="text-lg font-semibold text-neutral-900 mb-2">Speed to Insight</h4>
      <p class="text-neutral-600 mb-2">Drastically reduce research time per stock. Our platform allows your analysts to bypass laborious data compilation and jump directly into high-value qualitative analysis and conviction building.</p>
      <ul class="list-disc pl-6 text-neutral-500 space-y-1">
        <li>Reports generated in minutes</li>
        <li>Accelerated due diligence process</li>
        <li>Faster identification of market opportunities</li>
      </ul>
    `,
  };

  const featureContentDiv = document.getElementById('feature-content');
  const tabBtns = document.querySelectorAll('.featureTab');

  // Reset aria-selected on tabs
  function setFeature(feature) {
    featureContentDiv.innerHTML = featureData[feature];

    tabBtns.forEach(btn => {
      const isActive = btn.dataset.tab === feature;
      btn.classList.toggle('bg-blue-600', isActive);
      btn.classList.toggle('text-white', isActive);
      btn.classList.toggle('active', isActive);
      btn.classList.toggle('bg-blue-50', !isActive);
      btn.classList.toggle('text-blue-700', !isActive);

      // Update ARIA attributes for accessibility
      btn.setAttribute('aria-selected', isActive);
      btn.setAttribute('tabindex', isActive ? '0' : '-1');
    });

    // Update role=tabpanel related aria-labelledby for accessibility
    featureContentDiv.setAttribute('aria-labelledby', `${feature}-tab`);
    featureContentDiv.focus({ preventScroll: true });
  }

  tabBtns.forEach(btn =>
    btn.addEventListener('click', () => setFeature(btn.dataset.tab))
  );

  // Keyboard support for tabs (left/right arrows)
  let currentIndex = 0;
  tabBtns.forEach((btn, index) => {
    btn.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        const nextIndex = (index + 1) % tabBtns.length;
        tabBtns[nextIndex].focus();
        setFeature(tabBtns[nextIndex].dataset.tab);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const prevIndex = (index - 1 + tabBtns.length) % tabBtns.length;
        tabBtns[prevIndex].focus();
        setFeature(tabBtns[prevIndex].dataset.tab);
      }
    });
  });

  setFeature('comprehensive');

  // Navbar active link on scroll
  const navLinks = document.querySelectorAll('header nav ul li a');
  const sections = Array.from(document.querySelectorAll('section'));

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY || window.pageYOffset;

    sections.forEach(section => {
      if (scrollY >= section.offsetTop - 120) {
        current = section.id;
      }
    });

    navLinks.forEach(link => {
      const linkHash = link.getAttribute('href').substring(1);
      if (linkHash === current) {
        link.classList.add('text-blue-700', 'font-semibold');
      } else {
        link.classList.remove('text-blue-700', 'font-semibold');
      }
    });
  });
});
