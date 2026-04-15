// T2 Magazine — TacomaSeats.com
document.addEventListener('DOMContentLoaded', function() {
  // Mobile nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function() {
      links.classList.toggle('active');
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

/* ═══════════════════════════════════════════════
   MOBILE UX OVERHAUL — JS Module
   Accordion cards, sticky nav, collapsible sections,
   FAQ toggle, vehicle finder
   ═══════════════════════════════════════════════ */
(function() {
  'use strict';

  // ── 1. Accordion Review Detail Toggle ──
  document.querySelectorAll('.review-detail-toggle').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var body = this.nextElementSibling;
      if (!body) return;
      var isCollapsed = body.classList.contains('collapsed');
      if (isCollapsed) {
        body.style.maxHeight = body.scrollHeight + 'px';
        body.classList.remove('collapsed');
        this.classList.add('expanded');
        this.textContent = 'Hide details';
      } else {
        body.style.maxHeight = '0';
        body.classList.add('collapsed');
        this.classList.remove('expanded');
        this.textContent = 'Read full review';
      }
    });
  });

  // ── 2. Collapsible Sections (buying guide, "what to look for") ──
  document.querySelectorAll('.collapsible-header').forEach(function(header) {
    header.addEventListener('click', function() {
      var body = this.nextElementSibling;
      if (!body || !body.classList.contains('collapsible-body')) return;
      var isCollapsed = body.classList.contains('collapsed');
      if (isCollapsed) {
        body.style.maxHeight = body.scrollHeight + 'px';
        body.classList.remove('collapsed');
        this.classList.add('expanded');
      } else {
        body.style.maxHeight = '0';
        body.classList.add('collapsed');
        this.classList.remove('expanded');
      }
    });
  });

  // ── 3. FAQ Accordion ──
  document.querySelectorAll('.faq-question').forEach(function(q) {
    q.addEventListener('click', function() {
      var body = this.nextElementSibling;
      if (!body) return;
      var isCollapsed = body.classList.contains('collapsed');
      if (isCollapsed) {
        body.style.maxHeight = body.scrollHeight + 'px';
        body.classList.remove('collapsed');
        this.classList.add('expanded');
      } else {
        body.style.maxHeight = '0';
        body.classList.add('collapsed');
        this.classList.remove('expanded');
      }
    });
  });

  // ── 4. Vehicle Finder (seat cover sites only) ──
  var vfMake = document.getElementById('vf-make');
  var vfModel = document.getElementById('vf-model');
  var vfYear = document.getElementById('vf-year');
  var vfBtn = document.getElementById('vf-go');

  if (vfMake && vfModel && vfYear && vfBtn) {
    var vehicleData = {
      'Jeep': {
        'Wrangler TJ': { years: '1997-2006', page: 'best-jeep-seat-covers.html' },
        'Wrangler JK': { years: '2007-2010', page: 'best-jeep-seat-covers.html' },
        'Wrangler JKU': { years: '2007-2018', page: 'best-jeep-seat-covers.html' },
        'Wrangler JL': { years: '2018-2026', page: 'best-jeep-seat-covers.html' },
        'Wrangler JLU': { years: '2018-2026', page: 'best-jeep-seat-covers.html' },
        'Gladiator': { years: '2020-2026', page: 'best-jeep-seat-covers.html' }
      },
      'Toyota': {
        'Tacoma (2nd Gen)': { years: '2005-2015', page: 'best-tacoma-seat-covers.html' },
        'Tacoma (3rd Gen)': { years: '2016-2023', page: 'best-tacoma-seat-covers.html' },
        '4Runner': { years: '2010-2024', page: 'best-toyota-4runner-seat-covers.html' }
      },
      'Ford': {
        'Bronco': { years: '2021-2026', page: 'best-bronco-seat-covers.html' }
      }
    };

    // Check for bestseatcover.com-specific pages
    var isBSC = window.location.hostname.indexOf('bestseatcover') !== -1;
    if (isBSC) {
      vehicleData['Jeep']['Wrangler TJ'].page = 'best-jeep-seat-covers.html';
      vehicleData['Jeep']['Wrangler JK'].page = 'best-jeep-seat-covers.html';
      vehicleData['Jeep']['Wrangler JKU'].page = 'best-jeep-seat-covers.html';
      vehicleData['Jeep']['Wrangler JL'].page = 'best-jeep-seat-covers.html';
      vehicleData['Jeep']['Wrangler JLU'].page = 'best-jeep-seat-covers.html';
      vehicleData['Jeep']['Gladiator'].page = 'best-jeep-seat-covers.html';
      vehicleData['Toyota']['Tacoma (2nd Gen)'].page = 'best-toyota-tacoma-seat-covers.html';
      vehicleData['Toyota']['Tacoma (3rd Gen)'].page = 'best-toyota-tacoma-seat-covers.html';
      vehicleData['Toyota']['4Runner'].page = 'best-toyota-4runner-seat-covers.html';
      vehicleData['Ford']['Bronco'].page = 'best-ford-bronco-seat-covers.html';
    }

    // Check for tacomaseats.com-specific pages
    var isTacoma = window.location.hostname.indexOf('tacomaseats') !== -1;
    if (isTacoma) {
      vehicleData['Toyota']['Tacoma (2nd Gen)'].page = 'best-tacoma-seat-covers.html';
      vehicleData['Toyota']['Tacoma (3rd Gen)'].page = 'best-tacoma-seat-covers.html';
      vehicleData['Toyota']['4Runner'].page = 'best-tacoma-seat-covers.html';
    }

    function populateModels() {
      var make = vfMake.value;
      vfModel.innerHTML = '<option value="">Select Model</option>';
      vfYear.innerHTML = '<option value="">Select Year</option>';
      if (make && vehicleData[make]) {
        Object.keys(vehicleData[make]).forEach(function(model) {
          var opt = document.createElement('option');
          opt.value = model;
          opt.textContent = model;
          vfModel.appendChild(opt);
        });
      }
    }

    function populateYears() {
      var make = vfMake.value;
      var model = vfModel.value;
      vfYear.innerHTML = '<option value="">Select Year</option>';
      if (make && model && vehicleData[make] && vehicleData[make][model]) {
        var range = vehicleData[make][model].years.split('-');
        var start = parseInt(range[0]);
        var end = parseInt(range[1]);
        for (var y = end; y >= start; y--) {
          var opt = document.createElement('option');
          opt.value = y;
          opt.textContent = y;
          vfYear.appendChild(opt);
        }
      }
    }

    vfMake.addEventListener('change', populateModels);
    vfModel.addEventListener('change', populateYears);
    vfBtn.addEventListener('click', function() {
      var make = vfMake.value;
      var model = vfModel.value;
      if (make && model && vehicleData[make] && vehicleData[make][model]) {
        window.location.href = vehicleData[make][model].page;
      } else if (make) {
        // Fallback: go to first model's page
        var models = Object.keys(vehicleData[make]);
        if (models.length) window.location.href = vehicleData[make][models[0]].page;
      }
    });
  }

  // ── 5. Initialize collapsed states on mobile ──
  function initMobileCollapse() {
    if (window.innerWidth > 768) return;
    document.querySelectorAll('.collapsible-body').forEach(function(body) {
      body.classList.add('collapsed');
      body.style.maxHeight = '0';
    });
    document.querySelectorAll('.review-detail-body').forEach(function(body) {
      body.classList.add('collapsed');
      body.style.maxHeight = '0';
    });
    document.querySelectorAll('.faq-toggle-body').forEach(function(body) {
      body.classList.add('collapsed');
      body.style.maxHeight = '0';
    });
  }
  initMobileCollapse();
})();
