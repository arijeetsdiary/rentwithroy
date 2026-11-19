/* =====================================================================
   RENT WITH ROY: SITE DATA
   ---------------------------------------------------------------------
   Edit the values in the DATA section below, save, and refresh any page.
   Every page reads from this file, so you only change things once.

   HOW TO...
   - Change a price:        edit "weekly" inside pricing.plans
   - Change the bond:       edit pricing.bond
   - Add a car:             copy one { ... } block inside fleet, paste it
                            under the last car, change the details
   - Mark a car as rented:  set its status to "rented" (or "reserved",
                            "maintenance"). Only "available" cars count
                            in the homepage counter and apply form.
   - Charge more for one car: set weeklyAdjust (e.g. 20 adds $20/wk)
   - Add a car photo:       put the image in the same folder and set
                            image: "yaris1.jpg" (leave "" for the drawing)
   - Add a plan:            copy a plan block inside pricing.plans
   - Use your own logo:     upload the PNG to the assets folder and set
                            business.logo to "assets/logo.png"

   Keep the quotes, commas and brackets as they are.
   ===================================================================== */

window.RWR = {

  /* ---------- BUSINESS DETAILS ---------- */
  business: {
    name: "RentWithRoy",
    logo: "assets/Logo-wide.png",                           // LOGO: set to "assets/logo.png" once you have uploaded your file. Leave "" to keep the built-in logo.
    phone: "0400 000 000",              // UPDATE: shown on the site
    phoneIntl: "+61400000000",          // UPDATE: same number, international format, used for WhatsApp and tap-to-call
    email: "hello@rentwithroy.com.au",  // UPDATE
    abn: "XX XXX XXX XXX",              // UPDATE
    location: "Tarneit VIC 3029",
    locationShort: "Tarneit VIC",
    announcement: "Now taking January 2027 applications. Limited spots available.",
    announcementCta: "Apply now →",
    year: 2026
  },

  /* ---------- RENTAL TERMS ---------- */
  terms: {
    minTermWeeks: 2,
    noticeDays: 7,
    approvalHours: 24,
    minAge: 20,
    supportDays: 7
  },

  /* ---------- PRICING ---------- */
  pricing: {
    gstRate: 0.10,
    bond: 300,
    headlinePlan: "standard",   // the plan whose price is shown as the "starting rate"
    plans: [
      {
        id: "standard",
        name: "Standard",
        weekly: 159,
        termNote: "Week-to-week after a 2-week minimum",
        commitWeeks: 0,
        featured: false,
        badge: "",
        features: [
          "Fully insured vehicle",
          "Roadside assist, 24/7",
          "Servicing and maintenance",
          "Direct contact with Roy"
        ]
      },
      {
        id: "monthly",
        name: "Monthly",
        weekly: 149,
        termNote: "4-week commitment blocks",
        commitWeeks: 4,         // used to work out the saving shown on the card
        featured: true,
        badge: "Best value",
        features: [
          "Everything in Standard",
          "Priority access to new cars",
          "Direct WhatsApp line to Roy",
          "Preferred renter status"
        ]
      }
    ]
  },

  /* ---------- FLEET ---------- */
  fleet: [
    { id: "yaris-1", name: "Toyota Yaris", colour: "White",  colourHex: "#F5F9FF", transmission: "Automatic", fuel: "Petrol", seats: 5, status: "available", weeklyAdjust: 0, image: "" }, // UPDATE
    { id: "yaris-2", name: "Toyota Yaris", colour: "Silver", colourHex: "#B9BEC2", transmission: "Automatic", fuel: "Petrol", seats: 5, status: "available", weeklyAdjust: 0, image: "" }, // UPDATE
    { id: "yaris-3", name: "Toyota Yaris", colour: "Grey",   colourHex: "#7C8388", transmission: "Automatic", fuel: "Petrol", seats: 5, status: "available", weeklyAdjust: 0, image: "" }, // UPDATE
    { id: "yaris-4", name: "Toyota Yaris", colour: "Black",  colourHex: "#2B2F33", transmission: "Automatic", fuel: "Petrol", seats: 5, status: "available", weeklyAdjust: 0, image: "" }  // UPDATE
  ]
};


/* =====================================================================
   DO NOT EDIT BELOW THIS LINE
   This part reads the data above and fills in every page.
   ===================================================================== */
(function () {
  var R = window.RWR;
  if (!R) return;
  var B = R.business, T = R.terms, P = R.pricing, F = R.fleet || [];
  var plans = P.plans || [];
  if (!plans.length) return;

  function money(n) { return '$' + (Math.round(n) === n ? n : n.toFixed(2)); }
  function gstOf(w) { return Math.round(w * P.gstRate * 100) / 100; }
  function h(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    return e;
  }
  function anim(e, i) {
    e.setAttribute('data-anim', 'up');
    e.setAttribute('data-delay', String(Math.min(i + 1, 6)));
  }

  var headline = plans.filter(function (p) { return p.id === P.headlinePlan; })[0] || plans[0];
  var lowest = plans.reduce(function (a, p) { return p.weekly < a.weekly ? p : a; }, plans[0]);
  var available = F.filter(function (c) { return c.status === 'available'; });
  var digits = String(B.phoneIntl || '').replace(/\D/g, '');

  var text = {
    name: B.name, phone: B.phone, email: B.email, abn: B.abn,
    location: B.location, locationShort: B.locationShort,
    announcement: B.announcement, announcementCta: B.announcementCta,
    year: String(B.year),
    bond: money(P.bond),
    noticeDays: String(T.noticeDays),
    approvalHours: String(T.approvalHours),
    approvalHoursLabel: T.approvalHours + 'hrs',
    minAge: String(T.minAge),
    minTermWeeksLabel: T.minTermWeeks + ' weeks',
    minTermLabel: T.minTermWeeks + '-week',
    headlineWeekly: money(headline.weekly),
    headlineWeeklyWk: money(headline.weekly) + '/wk',
    lowestWeekly: money(lowest.weekly),
    availableCount: String(available.length),
    fleetCount: String(F.length)
  };
  var nums = {
    availableCount: available.length,
    headlineWeeklyNum: headline.weekly,
    approvalHours: T.approvalHours,
    supportDays: T.supportDays
  };
  var links = {
    whatsapp: 'https://wa.me/' + digits,
    mailto: 'mailto:' + B.email,
    tel: 'tel:+' + digits
  };

  /* logo: swaps the built-in logo for your PNG */
  if (B.logo) {
    document.querySelectorAll('[data-logo]').forEach(function (slot) {
      var fallback = slot.innerHTML;
      var img = document.createElement('img');
      img.className = 'logo-img' + (slot.getAttribute('data-logo-size') === 'footer' ? ' footer' : '');
      img.src = B.logo;
      img.alt = B.name + ' logo';
      img.onerror = function () { slot.innerHTML = fallback; };
      slot.innerHTML = '';
      slot.appendChild(img);
    });
  }

  /* simple text, number and link bindings */
  document.querySelectorAll('[data-d]').forEach(function (el) {
    var k = el.getAttribute('data-d');
    if (text.hasOwnProperty(k)) el.textContent = text[k];
  });
  document.querySelectorAll('[data-d-target]').forEach(function (el) {
    var k = el.getAttribute('data-d-target');
    if (nums.hasOwnProperty(k)) el.setAttribute('data-target', String(nums[k]));
  });
  document.querySelectorAll('[data-d-href]').forEach(function (el) {
    var k = el.getAttribute('data-d-href');
    if (links.hasOwnProperty(k)) el.setAttribute('href', links[k]);
  });

  /* GST lines, one per plan */
  document.querySelectorAll('[data-gst-lines]').forEach(function (host) {
    host.textContent = '';
    plans.forEach(function (p) {
      var g = gstOf(p.weekly);
      var line = h('div', null, p.name + ': ' + money(p.weekly) + '/wk + ' + money(g) + '/wk GST = ' + money(p.weekly + g) + '/wk total');
      host.appendChild(line);
    });
  });

  /* pricing plan cards: data-plans="preview" (home) or "full" (pricing page) */
  var CHECK = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1677FF" stroke-width="2.5"><path d="M20 6L9 17l-5-5"/></svg>';
  document.querySelectorAll('[data-plans]').forEach(function (host) {
    var mode = host.getAttribute('data-plans');
    host.textContent = '';
    plans.forEach(function (p, i) {
      var card = h('div', 'price-card' + (p.featured ? ' featured' : ''));
      anim(card, i);
      if (p.badge) card.appendChild(h('span', 'badge', p.badge));
      card.appendChild(h('h3', null, p.name));
      var amt = h('div', 'amount', money(p.weekly));
      amt.appendChild(h('span', null, mode === 'full' ? '/wk +GST' : '/wk'));
      card.appendChild(amt);

      var note = p.termNote || '';
      if (p.commitWeeks > 0 && p.weekly < headline.weekly) {
        note += ' · saves ' + money((headline.weekly - p.weekly) * p.commitWeeks) + ' every ' + p.commitWeeks + ' weeks';
      }
      card.appendChild(h('div', 'excl', (mode === 'full' ? '' : 'excl. GST · ') + note));

      if (mode === 'full') {
        var ul = document.createElement('ul');
        (p.features || []).forEach(function (f) {
          var li = document.createElement('li');
          li.innerHTML = CHECK;
          li.appendChild(document.createTextNode(f));
          ul.appendChild(li);
        });
        card.appendChild(ul);
        var a = h('a', p.featured ? 'btn btn-gold' : 'btn btn-outline on-light', 'Apply to rent →');
        a.href = 'apply.html';
        a.style.cssText = 'width:100%;justify-content:center;';
        card.appendChild(a);
      } else {
        var l = h('a', 'link-more', 'View full pricing →');
        l.href = 'pricing.html';
        card.appendChild(l);
      }
      host.appendChild(card);
    });
  });

  /* fleet cards */
  var STATUS = {
    available: 'Available now',
    reserved: 'Reserved',
    rented: 'Currently rented',
    maintenance: 'In servicing'
  };
  function carSvg(hex) {
    if (!/^#[0-9a-f]{3,8}$/i.test(hex || '')) hex = '#F5F9FF';
    return '<svg viewBox="0 0 380 170" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
      '<ellipse cx="190" cy="150" rx="150" ry="10" fill="rgba(0,0,0,0.35)"/>' +
      '<path d="M40 112 Q55 66 110 58 L260 58 Q305 64 330 112 L330 135 L40 135 Z" fill="' + hex + '"/>' +
      '<path d="M110 60 Q130 32 175 31 L225 31 Q255 33 268 60 Z" fill="#0A2540" opacity="0.85"/>' +
      '<line x1="192" y1="32" x2="192" y2="60" stroke="' + hex + '" stroke-width="3"/>' +
      '<rect x="45" y="92" width="26" height="12" rx="3" fill="#1677FF"/>' +
      '<rect x="302" y="92" width="22" height="12" rx="3" fill="#FFFFFF"/>' +
      '<circle cx="105" cy="135" r="22" fill="#0A2540" stroke="#26496B" stroke-width="4"/><circle cx="105" cy="135" r="8" fill="#1677FF"/>' +
      '<circle cx="270" cy="135" r="22" fill="#0A2540" stroke="#26496B" stroke-width="4"/><circle cx="270" cy="135" r="8" fill="#1677FF"/>' +
      '</svg>';
  }
  document.querySelectorAll('[data-fleet="grid"]').forEach(function (host) {
    host.textContent = '';
    F.forEach(function (c, i) {
      var ok = c.status === 'available';
      var card = h('div', 'fleet-card' + (ok ? '' : ' is-unavailable'));
      anim(card, i);

      var vis = h('div', 'fleet-visual');
      if (c.image) {
        var img = document.createElement('img');
        img.src = c.image;
        img.alt = c.name + (c.colour ? ', ' + c.colour : '');
        img.loading = 'lazy';
        vis.className += ' has-photo';
        vis.appendChild(img);
      } else {
        vis.insertAdjacentHTML('beforeend', carSvg(c.colourHex));
      }
      vis.appendChild(h('span', 'status-pill', STATUS[c.status] || c.status));
      card.appendChild(vis);

      var body = h('div', 'fleet-body');
      body.appendChild(h('h3', null, c.name));
      var bits = [c.colour, c.transmission, c.fuel, c.seats ? c.seats + ' seats' : ''].filter(Boolean);
      body.appendChild(h('p', 'fleet-sub fleet-spec', bits.join(' · ')));

      var adj = c.weeklyAdjust || 0;
      var price = h('div', 'fleet-price', money(headline.weekly + adj));
      price.appendChild(h('span', null, ' /wk'));
      body.appendChild(price);
      if (lowest.id !== headline.id) {
        body.appendChild(h('p', 'fleet-sub', 'or ' + money(lowest.weekly + adj) + '/wk on ' + lowest.name.toLowerCase() + ', excl. GST'));
      } else {
        body.appendChild(h('p', 'fleet-sub', 'excl. GST'));
      }

      var a = h('a', ok ? 'btn btn-gold' : 'btn btn-outline on-light', ok ? 'Apply for this car →' : 'Join the waitlist →');
      a.href = ok ? 'apply.html?car=' + encodeURIComponent(c.id) : 'apply.html';
      body.appendChild(a);
      card.appendChild(body);
      host.appendChild(card);
    });
  });

  /* apply form: preferred car dropdown */
  document.querySelectorAll('[data-fleet-select]').forEach(function (sel) {
    available.forEach(function (c) {
      var o = document.createElement('option');
      o.value = c.id;
      o.textContent = c.name + (c.colour ? ' (' + c.colour + ')' : '');
      sel.appendChild(o);
    });
    try {
      var want = new URLSearchParams(window.location.search).get('car');
      if (want) sel.value = want;
    } catch (e) {}
  });
})();
