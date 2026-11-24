// v104: Global XSS Protection Helper
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}


// =========================================================================
// 1. LIVE CUSTOMER 2D ALUMINIUM COLOR & GLASS SHADE VISUALIZER (v69)
// =========================================================================
function getAluVisualPalette(aluColorStr) {
  var s = String(aluColorStr || 'Powder Coated Black').toLowerCase();
  if (s.indexOf('golden') !== -1 || s.indexOf('gold') !== -1) {
    return { c1: '#f59e0b', c2: '#fde68a', c3: '#b45309', stroke: '#78350f', name: aluColorStr };
  }
  if (s.indexOf('champagne') !== -1) {
    return { c1: '#d6c7a1', c2: '#f5ebd6', c3: '#9c8858', stroke: '#5c4d2c', name: aluColorStr };
  }
  if (s.indexOf('wooden') !== -1 && s.indexOf('walnut') !== -1) {
    return { c1: '#5c2c16', c2: '#7c3f23', c3: '#3e1c0c', stroke: '#271006', name: aluColorStr };
  }
  if (s.indexOf('wooden') !== -1 || s.indexOf('teak') !== -1) {
    return { c1: '#9a5226', c2: '#c2713d', c3: '#6e3614', stroke: '#431e08', name: aluColorStr };
  }
  if (s.indexOf('white') !== -1) {
    return { c1: '#f8fafc', c2: '#ffffff', c3: '#cbd5e1', stroke: '#64748b', name: aluColorStr };
  }
  if (s.indexOf('ivory') !== -1 || s.indexOf('cream') !== -1) {
    return { c1: '#fef9c3', c2: '#fefce8', c3: '#fde047', stroke: '#a16207', name: aluColorStr };
  }
  if (s.indexOf('brown') !== -1) {
    return { c1: '#451a03', c2: '#78350f', c3: '#290f02', stroke: '#1c0a00', name: aluColorStr };
  }
  if (s.indexOf('grey') !== -1 || s.indexOf('charcoal') !== -1) {
    return { c1: '#475569', c2: '#64748b', c3: '#334155', stroke: '#0f172a', name: aluColorStr };
  }
  if (s.indexOf('red') !== -1) {
    return { c1: '#b91c1c', c2: '#ef4444', c3: '#7f1d1d', stroke: '#450a0a', name: aluColorStr };
  }
  if (s.indexOf('blue') !== -1) {
    return { c1: '#1d4ed8', c2: '#3b82f6', c3: '#1e3a8a', stroke: '#172554', name: aluColorStr };
  }
  if (s.indexOf('green') !== -1) {
    return { c1: '#15803d', c2: '#22c55e', c3: '#14532d', stroke: '#052e16', name: aluColorStr };
  }
  if (s.indexOf('silver') !== -1 || s.indexOf('natural') !== -1) {
    return { c1: '#cbd5e1', c2: '#f1f5f9', c3: '#94a3b8', stroke: '#475569', name: aluColorStr };
  }
  // Default: Jet Black / Anodized Black
  return { c1: '#1e293b', c2: '#334155', c3: '#0f172a', stroke: '#020617', name: aluColorStr };
}

function getGlassVisualPalette(glassTypeStr) {
  var g = String(glassTypeStr || 'Clear').toLowerCase();
  if (g.indexOf('black') !== -1) {
    return { g1: '#1e293b', g2: '#475569', op: '0.82', shine: '#94a3b8', label: glassTypeStr };
  }
  if (g.indexOf('one way blue') !== -1) {
    return { g1: '#0284c7', g2: '#38bdf8', op: '0.92', shine: '#e0f2fe', label: glassTypeStr };
  }
  if (g.indexOf('blue') !== -1) {
    return { g1: '#0369a1', g2: '#7dd3fc', op: '0.78', shine: '#e0f2fe', label: glassTypeStr };
  }
  if (g.indexOf('one way brown') !== -1 || g.indexOf('brown') !== -1) {
    return { g1: '#78350f', g2: '#d97706', op: '0.82', shine: '#fef3c7', label: glassTypeStr };
  }
  if (g.indexOf('one way green') !== -1 || g.indexOf('green') !== -1) {
    return { g1: '#047857', g2: '#34d399', op: '0.82', shine: '#d1fae5', label: glassTypeStr };
  }
  if (g.indexOf('one way gold') !== -1 || g.indexOf('gold') !== -1) {
    return { g1: '#b45309', g2: '#fbbf24', op: '0.90', shine: '#fef9c3', label: glassTypeStr };
  }
  if (g.indexOf('one way silver') !== -1 || g.indexOf('reflective') !== -1) {
    return { g1: '#64748b', g2: '#e2e8f0', op: '0.92', shine: '#ffffff', label: glassTypeStr };
  }
  if (g.indexOf('grey') !== -1) {
    return { g1: '#475569', g2: '#94a3b8', op: '0.78', shine: '#f1f5f9', label: glassTypeStr };
  }
  if (g.indexOf('frosted') !== -1 || g.indexOf('pinhead') !== -1 || g.indexOf('bajri') !== -1) {
    return { g1: '#e2e8f0', g2: '#f8fafc', op: '0.94', shine: '#ffffff', frosted: true, label: glassTypeStr };
  }
  if (g.indexOf('extra clear') !== -1) {
    return { g1: '#e0f2fe', g2: '#f8fafc', op: '0.55', shine: '#ffffff', label: glassTypeStr };
  }
  // Default Clear Glass
  return { g1: '#bae6fd', g2: '#e0f2fe', op: '0.68', shine: '#ffffff', label: glassTypeStr };
}

// =========================================================================
// CUSTOM CASEMENT INTERACTIVE SECTION DESIGNER (ANY POSITION FIX/OPEN/JALI/ACP)
// =========================================================================
var cc_top_sections = ['OPEN'];
var cc_bot_sections = [];
var csmCurrentPrefix = 'cc';
var csmCurrentZoom = 1.0;

function getCasementSecStyle(secType) {
  if (secType === 'OPEN') return { bg: '#0284c7', fg: '#fff', lbl: 'OPEN', full: 'Open Sash (Glass)' };
  if (secType === 'JALI_OPEN') return { bg: '#16a34a', fg: '#fff', lbl: 'JALI (O)', full: 'Open Jali Sash' };
  if (secType === 'JALI_FIX') return { bg: '#0d9488', fg: '#fff', lbl: 'JALI (F)', full: 'Fix Jali / Mesh' };
  if (secType === 'ACP') return { bg: '#ea580c', fg: '#fff', lbl: 'ACP', full: 'Fix ACP Board' };
  return { bg: '#475569', fg: '#fff', lbl: 'FIX', full: 'Fix Glass' };
}

function nextCasementSecType(curr) {
  var order = ['FIX', 'OPEN', 'JALI_OPEN', 'JALI_FIX', 'ACP'];
  var idx = order.indexOf(curr);
  return order[(idx + 1) % order.length];
}

function syncCasementSectionsFromInputs() {
  var topCols = Math.max(1, Math.min(8, parseInt(document.getElementById('cc_top_cols')?.value) || 1));
  var topOpen = Math.max(0, Math.min(topCols, parseInt(document.getElementById('cc_top_open')?.value) || 0));
  var botCols = Math.max(0, Math.min(8, parseInt(document.getElementById('cc_bot_cols')?.value) || 0));
  var botOpen = Math.max(0, Math.min(botCols, parseInt(document.getElementById('cc_bot_open')?.value) || 0));

  cc_top_sections = [];
  for (var i = 0; i < topCols; i++) {
    // Smart default: if 4 cols & 2 open, place open in middle; otherwise first topOpen
    if (topCols >= 3 && topOpen > 0 && topOpen < topCols) {
      var leftFix = Math.floor((topCols - topOpen) / 2);
      cc_top_sections.push((i >= leftFix && i < leftFix + topOpen) ? 'OPEN' : 'FIX');
    } else {
      cc_top_sections.push(i < topOpen ? 'OPEN' : 'FIX');
    }
  }
  cc_bot_sections = [];
  for (var j = 0; j < botCols; j++) {
    if (botCols >= 3 && botOpen > 0 && botOpen < botCols) {
      var leftBFix = Math.floor((botCols - botOpen) / 2);
      cc_bot_sections.push((j >= leftBFix && j < leftBFix + botOpen) ? 'OPEN' : 'FIX');
    } else {
      cc_bot_sections.push(j < botOpen ? 'OPEN' : 'FIX');
    }
  }
  renderCasementSectionDesigner();
  renderLiveColorGlassPreview('cc');
}

function ensureCasementSectionsCount() {
  var topCols = Math.max(1, Math.min(8, parseInt(document.getElementById('cc_top_cols')?.value) || 1));
  var botCols = Math.max(0, Math.min(8, parseInt(document.getElementById('cc_bot_cols')?.value) || 0));
  while (cc_top_sections.length < topCols) cc_top_sections.push('FIX');
  if (cc_top_sections.length > topCols) cc_top_sections = cc_top_sections.slice(0, topCols);
  while (cc_bot_sections.length < botCols) cc_bot_sections.push('FIX');
  if (cc_bot_sections.length > botCols) cc_bot_sections = cc_bot_sections.slice(0, botCols);
}

function toggleCasementSection(rowName, idx) {
  ensureCasementSectionsCount();
  if (rowName === 'top' && cc_top_sections[idx] !== undefined) {
    cc_top_sections[idx] = nextCasementSecType(cc_top_sections[idx]);
    var openCount = cc_top_sections.filter(s => s === 'OPEN' || s === 'JALI_OPEN').length;
    if (document.getElementById('cc_top_open')) document.getElementById('cc_top_open').value = String(openCount);
  } else if (rowName === 'bot' && cc_bot_sections[idx] !== undefined) {
    cc_bot_sections[idx] = nextCasementSecType(cc_bot_sections[idx]);
    var bOpenCount = cc_bot_sections.filter(s => s === 'OPEN' || s === 'JALI_OPEN').length;
    if (document.getElementById('cc_bot_open')) document.getElementById('cc_bot_open').value = String(bOpenCount);
  }
  renderCasementSectionDesigner();
  renderLiveColorGlassPreview('cc');
  var modal = document.getElementById('customerShowroomModal');
  if (modal && modal.style.display === 'flex' && csmCurrentPrefix === 'cc') {
    openCustomerShowroomModal('cc');
  }
}

function applyCasementPreset(mode) {
  ensureCasementSectionsCount();
  var n = cc_top_sections.length;
  var nb = cc_bot_sections.length;
  if (mode === 'mid_open') {
    var openN = Math.max(1, n >= 3 ? n - 2 : 1);
    var leftFix = Math.floor((n - openN) / 2);
    cc_top_sections = cc_top_sections.map((_, i) => (i >= leftFix && i < leftFix + openN) ? 'OPEN' : 'FIX');
    cc_bot_sections = cc_bot_sections.map(() => 'FIX');
  } else if (mode === 'sides_open') {
    cc_top_sections = cc_top_sections.map((_, i) => (i === 0 || i === n - 1) ? 'OPEN' : 'FIX');
    cc_bot_sections = cc_bot_sections.map(() => 'FIX');
  } else if (mode === 'all_jali') {
    cc_top_sections = cc_top_sections.map(() => 'JALI_OPEN');
    cc_bot_sections = cc_bot_sections.map(() => 'JALI_FIX');
  }
  if (document.getElementById('cc_top_open')) {
    document.getElementById('cc_top_open').value = String(cc_top_sections.filter(s => s === 'OPEN' || s === 'JALI_OPEN').length);
  }
  if (document.getElementById('cc_bot_open')) {
    document.getElementById('cc_bot_open').value = String(cc_bot_sections.filter(s => s === 'OPEN' || s === 'JALI_OPEN').length);
  }
  renderCasementSectionDesigner();
  renderLiveColorGlassPreview('cc');
}

function renderCasementSectionDesigner() {
  var box = document.getElementById('cc_section_grid_controls');
  if (!box) return;
  ensureCasementSectionsCount();
  var html = '<div style="display:grid; grid-template-columns:repeat(' + cc_top_sections.length + ', 1fr); gap:4px;">';
  cc_top_sections.forEach(function(sec, idx) {
    var st = getCasementSecStyle(sec);
    html += '<button type="button" onclick="toggleCasementSection(\'top\',' + idx + ')" style="background:' + st.bg + '; color:' + st.fg + '; border:none; border-radius:6px; padding:6px 2px; font-size:0.68rem; font-weight:800; cursor:pointer;">T' + (idx + 1) + ': ' + st.lbl + '</button>';
  });
  html += '</div>';
  if (cc_bot_sections.length > 0) {
    html += '<div style="display:grid; grid-template-columns:repeat(' + cc_bot_sections.length + ', 1fr); gap:4px;">';
    cc_bot_sections.forEach(function(sec, idx) {
      var st = getCasementSecStyle(sec);
      html += '<button type="button" onclick="toggleCasementSection(\'bot\',' + idx + ')" style="background:' + st.bg + '; color:' + st.fg + '; border:none; border-radius:6px; padding:6px 2px; font-size:0.68rem; font-weight:800; cursor:pointer;">B' + (idx + 1) + ': ' + st.lbl + '</button>';
    });
    html += '</div>';
  }
  box.innerHTML = html;
}

function buildWindowDoorSvgPreview(prefix, svgWidth, svgHeight, isFullScreen) {
  svgWidth = svgWidth || 360;
  svgHeight = svgHeight || 220;

  var aluColor = getModuleAluColor(prefix);
  var aluThick = getModuleAluThick(prefix);
  var gTypeEl = document.getElementById(prefix + '_g_type');
  var gThickEl = document.getElementById(prefix + '_g_thick');
  var gType = gTypeEl ? gTypeEl.value : 'Clear';
  var gThick = gThickEl ? gThickEl.value : '5 mm';

  var aluPal = getAluVisualPalette(aluColor);
  var glsPal = getGlassVisualPalette(gType);
  var globalIsJali = gType.toLowerCase().indexOf('jali') !== -1 || gType.toLowerCase().indexOf('mesh') !== -1;

  var uid = prefix + '_' + Math.floor(Math.random() * 10000);
  var svgStyle = isFullScreen
    ? 'width:100%; height:100%; max-height:100%; display:block; margin:0 auto;'
    : ('max-height:' + svgHeight + 'px; display:block; margin:0 auto;');
  var isCcTall = (prefix === 'cc');
  var vbH = isCcTall ? 360 : 220;
  var svg = '<svg viewBox="0 0 360 ' + vbH + '" preserveAspectRatio="xMidYMid meet" width="100%" style="' + svgStyle + '">';
  svg += '<defs>';
  svg += '<linearGradient id="aluGrad_' + uid + '" x1="0%" y1="0%" x2="100%" y2="100%">';
  svg += '<stop offset="0%" stop-color="' + aluPal.c1 + '"/>';
  svg += '<stop offset="50%" stop-color="' + aluPal.c2 + '"/>';
  svg += '<stop offset="100%" stop-color="' + aluPal.c3 + '"/>';
  svg += '</linearGradient>';
  svg += '<linearGradient id="glsGrad_' + uid + '" x1="0%" y1="0%" x2="100%" y2="100%">';
  svg += '<stop offset="0%" stop-color="' + glsPal.g1 + '" stop-opacity="' + glsPal.op + '"/>';
  svg += '<stop offset="55%" stop-color="' + glsPal.g2 + '" stop-opacity="' + glsPal.op + '"/>';
  svg += '<stop offset="100%" stop-color="' + glsPal.g1 + '" stop-opacity="' + glsPal.op + '"/>';
  svg += '</linearGradient>';
  svg += '<pattern id="jaliMesh_' + uid + '" width="8" height="8" patternUnits="userSpaceOnUse">';
  svg += '<rect width="8" height="8" fill="#ecfdf5"/>';
  svg += '<path d="M 0 0 L 8 8 M 8 0 L 0 8" stroke="#065f46" stroke-width="1.05" stroke-opacity="0.8"/>';
  svg += '<path d="M 4 0 L 4 8 M 0 4 L 8 4" stroke="#10b981" stroke-width="0.5" stroke-opacity="0.55"/>';
  svg += '</pattern>';
  svg += '</defs>';

  var drawPanelFill = function(x, y, w, h, matType, badgeTxt, clickAttr) {
    var out = '<g ' + (clickAttr || '') + ' style="' + (clickAttr ? 'cursor:pointer;' : '') + '">';
    if (matType === 'WINDOW') {
      out += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="url(#aluGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="1.3"/>';
      var gx = x + 5, gy = y + 5, gw = Math.max(4, w - 10), gh = Math.max(4, h - 10);
      out += '<rect x="' + gx + '" y="' + gy + '" width="' + gw + '" height="' + gh + '" fill="url(#glsGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="0.9"/>';
      out += '<polyline points="' + gx + ',' + gy + ' ' + (gx + gw) + ',' + (gy + gh / 2) + ' ' + gx + ',' + (gy + gh) + '" fill="none" stroke="#ffffff" stroke-width="1.1" stroke-dasharray="3,2" stroke-opacity="0.85"/>';
      out += '<rect x="' + (x + w - 4.5) + '" y="' + (y + h / 2 - 5) + '" width="2.2" height="10" rx="1" fill="#fbbf24" stroke="#78350f" stroke-width="0.5"/>';
      if (gw >= 22) {
        out += '<text x="' + (x + w / 2) + '" y="' + (y + h - 7) + '" font-size="6.5" font-weight="bold" fill="#5b21b6" text-anchor="middle">WIN</text>';
      }
    } else if (matType === 'ACP') {
      out += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="#94a3b8" stroke="' + aluPal.stroke + '" stroke-width="1"/>';
      out += '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 3.5) + '" font-size="9" font-weight="bold" fill="#0f172a" text-anchor="middle">' + (badgeTxt || 'ACP') + '</text>';
    } else if (matType === 'JALI' || (matType === 'GLASS' && globalIsJali)) {
      out += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="url(#jaliMesh_' + uid + ')" stroke="#059669" stroke-width="1.3"/>';
      var bw = Math.min(w - 4, 34);
      if (bw >= 18) {
        out += '<rect x="' + (x + w / 2 - bw / 2) + '" y="' + (y + h / 2 - 6) + '" width="' + bw + '" height="12" rx="3" fill="#ffffff" fill-opacity="0.88"/>';
        out += '<text x="' + (x + w / 2) + '" y="' + (y + h / 2 + 3) + '" font-size="7.5" font-weight="bold" fill="#065f46" text-anchor="middle">' + (badgeTxt || 'JALI') + '</text>';
      }
    } else {
      out += '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" fill="url(#glsGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="1"/>';
      out += '<line x1="' + (x + 6) + '" y1="' + (y + h - 6) + '" x2="' + (x + w - 6) + '" y2="' + (y + 6) + '" stroke="' + glsPal.shine + '" stroke-width="2" stroke-opacity="0.6"/>';
      if (badgeTxt) {
        out += '<text x="' + (x + w / 2) + '" y="' + (y + h - 6) + '" font-size="7" font-weight="bold" fill="#0f172a" fill-opacity="0.7" text-anchor="middle">' + badgeTxt + '</text>';
      }
    }
    out += '</g>';
    return out;
  };

  var isDoor = (prefix === 'dr') || (prefix === 'q' && document.getElementById('q_type') && document.getElementById('q_type').value.indexOf('Door') !== -1 && document.getElementById('q_type').value.indexOf('Partition') === -1);
  var isPart = (prefix === 'pt') || (prefix === 'q' && document.getElementById('q_type') && document.getElementById('q_type').value.indexOf('Partition') !== -1);
  var isCasement = (prefix === 'cc');

  if (isDoor) {
    var palla = (document.getElementById('dr_palla') && document.getElementById('dr_palla').value === '1') ? 1 : 2;
    var numParts = (prefix === 'dr' && document.getElementById('dr_rows')) ? Math.max(1, Math.min(6, parseInt(document.getElementById('dr_rows').value) || 2)) : 2;
    if (prefix === 'dr' && typeof ensureDrRowConfigsCount === 'function') ensureDrRowConfigsCount(numParts);

    // Resolve PROPORTIONAL heights for each Door part!
    var raw_dh = safeEval(document.getElementById('dr_h') ? document.getElementById('dr_h').value : '84') || 84;
    var is_d_mm = document.getElementById('dr_unit') && document.getElementById('dr_unit').value.indexOf('Millimeter') !== -1;
    var d_h_in = is_d_mm ? (raw_dh / 25.4) : raw_dh;
    var top_h = parseFloat(document.getElementById('dr_top_h')?.value) || 2.5;
    var bot_h = parseFloat(document.getElementById('dr_bot_h')?.value) || 4.0;
    var mid_h = parseFloat(document.getElementById('dr_mid_h')?.value) || 2.5;
    var total_open_h = Math.max(12, d_h_in - 1.75 - top_h - bot_h - ((numParts - 1) * mid_h));
    var resolvedH = (typeof resolveRowHeightsGeneric === 'function' && prefix === 'dr')
      ? resolveRowHeightsGeneric(dr_row_configs, total_open_h, numParts)
      : Array(numParts).fill(total_open_h / numParts);
    var sumResH = resolvedH.reduce((a, b) => a + b, 0) || 1;

    var dx = palla === 1 ? 115 : 65;
    var dw = palla === 1 ? 130 : 230;
    var dh = 200;
    var dy = 10;

    svg += '<rect x="' + dx + '" y="' + dy + '" width="' + dw + '" height="' + dh + '" rx="3" fill="url(#aluGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="2.4"/>';
    var leafW = (dw - 16) / palla;
    for (var l = 0; l < palla; l++) {
      var lx = dx + 8 + (l * leafW);
      var ly = dy + 8;
      var lh = dh - 16;
      svg += '<rect x="' + lx + '" y="' + ly + '" width="' + leafW + '" height="' + lh + '" fill="url(#aluGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="1.6"/>';

      var innerX = lx + 8;
      var innerW = leafW - 16;
      var availH = lh - 16;
      var railGap = 5;
      var totalGaps = (numParts - 1) * railGap;
      var drawAvailH = availH - totalGaps;
      var curY = ly + 8;

      for (var r = 0; r < numParts; r++) {
        var cfgIdx = numParts - 1 - r;
        var matType = (prefix === 'dr' && typeof dr_row_configs !== 'undefined' && dr_row_configs[cfgIdx])
          ? dr_row_configs[cfgIdx].mat
          : (r === numParts - 1 && numParts > 1 ? 'ACP' : 'GLASS');
        var partH = Math.max(14, (resolvedH[cfgIdx] / sumResH) * drawAvailH);
        var clickH = (prefix === 'dr') ? ('onclick="toggleDrRowMaterial(' + cfgIdx + ')"') : '';
        svg += drawPanelFill(innerX, curY, innerW, partH, matType, matType === 'JALI' ? 'JALI' : (matType === 'ACP' ? 'ACP' : ''), clickH);
        curY += partH + railGap;
      }

      var hx = (l === 0 && palla === 2) ? (lx + leafW - 6) : (lx + 3.5);
      svg += '<rect x="' + hx + '" y="' + (ly + lh * 0.46) + '" width="3.2" height="20" rx="1.6" fill="#fbbf24" stroke="#78350f" stroke-width="0.6"/>';
    }
  } else if (isCasement) {
    ensureCasementSectionsCount();
    var topCols = cc_top_sections.length;
    var botCols = cc_bot_sections.length;

    var rawCh = (typeof safeEval === 'function' && document.getElementById('cc_h')) ? safeEval(document.getElementById('cc_h').value) : 0;
    var rawCw = (typeof safeEval === 'function' && document.getElementById('cc_w')) ? safeEval(document.getElementById('cc_w').value) : 0;
    var rawBotH = (typeof safeEval === 'function' && document.getElementById('cc_bot_h')) ? safeEval(document.getElementById('cc_bot_h').value) : 0;
    var isCcMm = document.getElementById('cc_unit') && document.getElementById('cc_unit').value.indexOf('Millimeter') !== -1;
    var chIn = rawCh > 0 ? (isCcMm ? rawCh / 25.4 : rawCh) : 60;
    var cwIn = rawCw > 0 ? (isCcMm ? rawCw / 25.4 : rawCw) : 54;
    var cBotIn = rawBotH > 0 ? (isCcMm ? rawBotH / 25.4 : rawBotH) : 0;
    var dispCc = function(vIn) {
      if (isCcMm) return Math.round(vIn * 25.4) + ' mm';
      return (typeof toFractionInch === 'function') ? toFractionInch(vIn) : (vIn.toFixed(1) + '"');
    };

    // Taller, grand CAD proportions inside 360x360 canvas
    var maxDrawW = 296, maxDrawH = 304;
    var ratio = cwIn / Math.max(12, chIn);
    var ww, wh;
    if (ratio >= 1.15) {
      ww = maxDrawW;
      wh = Math.max(216, Math.min(maxDrawH, Math.round(maxDrawW / ratio)));
    } else {
      wh = maxDrawH;
      ww = Math.max(198, Math.min(maxDrawW, Math.round(maxDrawH * ratio)));
    }
    var wx = Math.round((360 - ww) / 2) + 8;
    var wy = Math.round((360 - wh) / 2) + 10;

    // CAD Dimension Lines (Top Total Width & Left Total Height)
    svg += '<line x1="' + wx + '" y1="' + (wy - 11) + '" x2="' + (wx + ww) + '" y2="' + (wy - 11) + '" stroke="#0284c7" stroke-width="1.2"/>';
    svg += '<line x1="' + wx + '" y1="' + (wy - 15) + '" x2="' + wx + '" y2="' + (wy - 7) + '" stroke="#0284c7" stroke-width="1.2"/>';
    svg += '<line x1="' + (wx + ww) + '" y1="' + (wy - 15) + '" x2="' + (wx + ww) + '" y2="' + (wy - 7) + '" stroke="#0284c7" stroke-width="1.2"/>';
    svg += '<rect x="' + (wx + ww / 2 - 34) + '" y="' + (wy - 20) + '" width="68" height="14" rx="3" fill="#eff6ff" stroke="#93c5fd" stroke-width="0.8"/>';
    svg += '<text x="' + (wx + ww / 2) + '" y="' + (wy - 10) + '" font-size="8.5" font-weight="bold" fill="#0369a1" text-anchor="middle">W: ' + dispCc(cwIn) + '</text>';

    svg += '<line x1="' + (wx - 12) + '" y1="' + wy + '" x2="' + (wx - 12) + '" y2="' + (wy + wh) + '" stroke="#0284c7" stroke-width="1.2"/>';
    svg += '<line x1="' + (wx - 16) + '" y1="' + wy + '" x2="' + (wx - 8) + '" y2="' + wy + '" stroke="#0284c7" stroke-width="1.2"/>';
    svg += '<line x1="' + (wx - 16) + '" y1="' + (wy + wh) + '" x2="' + (wx - 8) + '" y2="' + (wy + wh) + '" stroke="#0284c7" stroke-width="1.2"/>';
    svg += '<text x="' + (wx - 16) + '" y="' + (wy + wh / 2) + '" font-size="8.5" font-weight="bold" fill="#0369a1" text-anchor="middle" transform="rotate(-90 ' + (wx - 16) + ',' + (wy + wh / 2) + ')">H: ' + dispCc(chIn) + '</text>';

    svg += '<rect x="' + wx + '" y="' + wy + '" width="' + ww + '" height="' + wh + '" rx="4" fill="url(#aluGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="2.6"/>';

    var innerX = wx + 9, innerY = wy + 9, innerW = ww - 18, innerH = wh - 18;
    svg += '<rect x="' + innerX + '" y="' + innerY + '" width="' + innerW + '" height="' + innerH + '" fill="#0f172a"/>';

    var hasBottom = (botCols > 0);
    var transomH = hasBottom ? 7 : 0;
    var topRatio = (typeof cc_cad_top_pct === 'number' && cc_cad_top_pct >= 30 && cc_cad_top_pct <= 85) ? (cc_cad_top_pct / 100) : 0.65;
    if (hasBottom && cBotIn > 0 && cBotIn < chIn - 4) {
      topRatio = Math.max(0.25, Math.min(0.85, (chIn - cBotIn) / chIn));
    }
    var topH = hasBottom ? Math.round((innerH - transomH) * topRatio) : innerH;
    var botH = hasBottom ? (innerH - transomH - topH) : 0;
    var topRealH = hasBottom ? (cBotIn > 0 && cBotIn < chIn ? (chIn - cBotIn) : (chIn * topRatio)) : chIn;
    var botRealH = hasBottom ? Math.max(1, chIn - topRealH) : 0;

    var drawCasementRow = function(rowName, rowY, rowH, secArr, rowRealH) {
      var colsCount = secArr.length;
      var gap = 5.5;
      var secW = (innerW - ((colsCount - 1) * gap)) / colsCount;
      var panelRealW = cwIn / Math.max(1, colsCount);
      for (var c = 0; c < colsCount; c++) {
        var sx = innerX + c * (secW + gap);
        if (c > 0) {
          svg += '<rect x="' + (sx - gap) + '" y="' + rowY + '" width="' + gap + '" height="' + rowH + '" fill="url(#aluGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="0.8"/>';
        }
        var secType = secArr[c];
        var clickAttr = 'onclick="toggleCasementSection(\'' + rowName + '\',' + c + ')"';
        var isOpen = (secType === 'OPEN' || secType === 'JALI_OPEN');
        var matType = (secType === 'JALI_OPEN' || secType === 'JALI_FIX') ? 'JALI' : (secType === 'ACP' ? 'ACP' : 'GLASS');

        if (isOpen) {
          svg += '<g ' + clickAttr + ' style="cursor:pointer;">';
          svg += '<rect x="' + (sx + 1) + '" y="' + (rowY + 1) + '" width="' + (secW - 2) + '" height="' + (rowH - 2) + '" fill="url(#aluGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="1.5"/>';
          var gx = sx + 6.5, gy = rowY + 6.5, gw = Math.max(6, secW - 13), gh = Math.max(6, rowH - 13);
          svg += drawPanelFill(gx, gy, gw, gh, matType, matType === 'JALI' ? 'JALI (OPEN)' : 'OPEN', '');
          svg += '<polyline points="' + gx + ',' + gy + ' ' + (gx + gw) + ',' + (gy + gh / 2) + ' ' + gx + ',' + (gy + gh) + '" fill="none" stroke="#ffffff" stroke-width="1.3" stroke-dasharray="4,2.5" stroke-opacity="0.88"/>';
          svg += '<rect x="' + (sx + secW - 5.5) + '" y="' + (rowY + rowH / 2 - 9) + '" width="3" height="18" rx="1.4" fill="#fbbf24" stroke="#78350f" stroke-width="0.7"/>';
          svg += '</g>';
        } else {
          svg += drawPanelFill(sx + 1, rowY + 1, secW - 2, rowH - 2, matType, matType === 'JALI' ? 'JALI (FIX)' : (matType === 'ACP' ? 'ACP' : 'FIX'), clickAttr);
        }
        if (secW >= 36 && rowH >= 32) {
          svg += '<text x="' + (sx + secW / 2) + '" y="' + (rowY + 16) + '" font-size="6.8" font-weight="bold" fill="#0f172a" fill-opacity="0.82" text-anchor="middle" style="pointer-events:none;">' + dispCc(panelRealW) + ' × ' + dispCc(rowRealH) + '</text>';
        }
      }
    };

    drawCasementRow('top', innerY, topH, cc_top_sections, topRealH);
    if (hasBottom) {
      svg += '<rect x="' + innerX + '" y="' + (innerY + topH) + '" width="' + innerW + '" height="' + transomH + '" fill="url(#aluGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="1"/>';
      drawCasementRow('bot', innerY + topH + transomH, botH, cc_bot_sections, botRealH);
    }
  } else if (isPart) {
    var ptCols = (prefix === 'pt' && document.getElementById('pt_cols')) ? Math.max(1, Math.min(10, parseInt(document.getElementById('pt_cols').value) || 3)) : 3;
    var ptRows = (prefix === 'pt' && document.getElementById('pt_rows')) ? Math.max(1, Math.min(8, parseInt(document.getElementById('pt_rows').value) || 3)) : 3;
    if (prefix === 'pt' && typeof ensurePtRowConfigsCount === 'function') ensurePtRowConfigsCount(ptRows);
    if (prefix === 'pt' && typeof ensurePtColConfigsCount === 'function') ensurePtColConfigsCount(ptCols);

    var raw_ph = safeEval(document.getElementById('pt_h') ? document.getElementById('pt_h').value : '96') || 96;
    var raw_pw = safeEval(document.getElementById('pt_w') ? document.getElementById('pt_w').value : '120') || 120;
    var is_pmm = document.getElementById('pt_unit') && document.getElementById('pt_unit').value.indexOf('Millimeter') !== -1;
    var p_h_in = is_pmm ? (raw_ph / 25.4) : raw_ph;
    var p_w_in = is_pmm ? (raw_pw / 25.4) : raw_pw;
    var halfWallHIn = parseFloat(document.getElementById('pt_halfwall_h')?.value) || 36;
    var doorHIn = parseFloat(document.getElementById('pt_dh')?.value) || 84;
    var t_face = parseFloat(document.getElementById('pt_tube_face')?.value) || 1.5;
    var b_face = parseFloat(document.getElementById('pt_bot_face')?.value) || 1.5;

    var pt_open_h = Math.max(12, p_h_in - b_face - (ptRows * t_face));
    var ptResH = (prefix === 'pt' && typeof resolvePartitionRowHeights === 'function')
      ? resolvePartitionRowHeights(pt_open_h, ptRows, 30)
      : Array(ptRows).fill(pt_open_h / ptRows);
    var sumPtH = ptResH.reduce((a, b) => a + b, 0) || 1;

    var pt_open_w = Math.max(24, p_w_in - ((ptCols + 1) * t_face));
    var colWidthsIn = (prefix === 'pt' && typeof resolvePartitionColWidths === 'function')
      ? resolvePartitionColWidths(pt_open_w, ptCols)
      : Array(ptCols).fill(pt_open_w / ptCols);
    var sumColW = colWidthsIn.reduce((a, b) => a + b, 0) || 1;

    var wx = 14, wy = 10, ww = 332, wh = 200;
    svg += '<rect x="' + wx + '" y="' + wy + '" width="' + ww + '" height="' + wh + '" rx="4" fill="url(#aluGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="2.4"/>';
    var innerX = wx + 6, innerY = wy + 6, innerW = ww - 12, innerH = wh - 12;
    svg += '<rect x="' + innerX + '" y="' + innerY + '" width="' + innerW + '" height="' + innerH + '" fill="url(#aluGrad_' + uid + ')"/>';

    var gapX = 5, gapY = 4;
    var availW = innerW - ((ptCols - 1) * gapX);
    var curX = innerX;

    var drawWindowInRect = function(rx, ry, rw, rh, wMode) {
      var o = '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="' + rh + '" fill="url(#aluGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="1.2"/>';
      if (wMode === 'HOPEN') {
        var wLw = (rw - 6 - 3) / 2;
        for (var wl = 0; wl < 2; wl++) {
          var wlx = rx + 3 + wl * (wLw + 3);
          o += drawPanelFill(wlx, ry + 3, wLw, rh - 6, 'GLASS', 'H-OPEN');
          o += '<polyline points="' + wlx + ',' + (ry + 3) + ' ' + (wlx + wLw) + ',' + (ry + rh / 2) + ' ' + wlx + ',' + (ry + rh - 3) + '" fill="none" stroke="#fff" stroke-width="1" stroke-dasharray="3,2"/>';
          o += '<rect x="' + (wlx + wLw - 3.5) + '" y="' + (ry + rh / 2 - 5) + '" width="2" height="10" rx="1" fill="#fbbf24"/>';
        }
      } else {
        var trk = (wMode === 'SLIDE3') ? 3 : 2;
        var sw = (rw - 6 - ((trk - 1) * 2)) / trk;
        for (var wt = 0; wt < trk; wt++) {
          var wtx = rx + 3 + wt * (sw + 2);
          var isJ = (wMode === 'SLIDE3' && wt === trk - 1);
          o += drawPanelFill(wtx, ry + 3, sw, rh - 6, isJ ? 'JALI' : 'GLASS', isJ ? 'JALI' : (trk + 'T'));
        }
      }
      return o;
    };

    for (var c = 0; c < ptCols; c++) {
      var bayW = Math.max(24, (colWidthsIn[c] / sumColW) * availW);
      var bayType = (prefix === 'pt' && pt_col_configs[c]) ? pt_col_configs[c].type : 'PARTITION';

      if (bayType.indexOf('DOOR_') === 0) {
        var dPalla = (bayType.indexOf('DOOR_2') === 0) ? 2 : 1;
        var doorRatio = Math.min(0.88, Math.max(0.65, doorHIn / Math.max(doorHIn + 8, p_h_in)));
        var transomH = Math.max(14, innerH * (1 - doorRatio) - 4);
        var doorY = innerY + transomH + 4;
        var doorH = innerH - transomH - 4;
        svg += drawPanelFill(curX, innerY, bayW, transomH, 'GLASS', 'TOP');
        svg += '<rect x="' + curX + '" y="' + doorY + '" width="' + bayW + '" height="' + doorH + '" fill="url(#aluGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="1.3"/>';

        var leafW = (bayW - 6 - ((dPalla - 1) * 3)) / dPalla;
        var dParts = ['GLASS', 'ACP'], dRats = [0.62, 0.38];
        if (bayType.indexOf('JGA') !== -1) { dParts = ['JALI', 'GLASS', 'ACP']; dRats = [0.24, 0.44, 0.32]; }
        else if (bayType.indexOf('JALI') !== -1) { dParts = ['JALI']; dRats = [1.0]; }

        for (var dl = 0; dl < dPalla; dl++) {
          var dlx = curX + 3 + dl * (leafW + 3);
          var dly = doorY + 3, dlh = doorH - 6;
          svg += '<rect x="' + dlx + '" y="' + dly + '" width="' + leafW + '" height="' + dlh + '" fill="url(#aluGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="1"/>';
          var py = dly + 4, pAv = dlh - 8 - ((dParts.length - 1) * 3);
          for (var dp = 0; dp < dParts.length; dp++) {
            var ph = pAv * dRats[dp];
            svg += drawPanelFill(dlx + 4, py, leafW - 8, ph, dParts[dp], dParts[dp] === 'GLASS' ? 'DOOR' : dParts[dp]);
            py += ph + 3;
          }
          var hx = (dl === 0 && dPalla === 2) ? (dlx + leafW - 4.5) : (dlx + 2.5);
          svg += '<rect x="' + hx + '" y="' + (dly + dlh * 0.46) + '" width="2.2" height="14" rx="1" fill="#fbbf24"/>';
        }
      } else if (bayType.indexOf('HW_') === 0) {
        // Half Wall (Brick / Concrete Wall at bottom) + Glass or Window on top!
        var hwRatio = Math.min(0.55, Math.max(0.25, halfWallHIn / Math.max(60, p_h_in)));
        var wallH = Math.round(innerH * hwRatio);
        var topAvailH = innerH - wallH - 4;
        var wallY = innerY + topAvailH + 4;

        // Draw Brick/Concrete Half Wall at bottom
        svg += '<rect x="' + curX + '" y="' + wallY + '" width="' + bayW + '" height="' + wallH + '" fill="#d6d3d1" stroke="#78716c" stroke-width="1.2"/>';
        for (var wyL = wallY + 9; wyL < wallY + wallH - 3; wyL += 9) {
          svg += '<line x1="' + curX + '" y1="' + wyL + '" x2="' + (curX + bayW) + '" y2="' + wyL + '" stroke="#a8a29e" stroke-width="0.7"/>';
        }
        svg += '<rect x="' + (curX + bayW / 2 - 26) + '" y="' + (wallY + wallH / 2 - 6) + '" width="52" height="12" rx="2" fill="#ffffff" fill-opacity="0.85"/>';
        svg += '<text x="' + (curX + bayW / 2) + '" y="' + (wallY + wallH / 2 + 2.5) + '" font-size="6.8" font-weight="bold" fill="#44403c" text-anchor="middle">HALF WALL</text>';

        // Top section above Half Wall
        if (bayType === 'HW_GLASS') {
          svg += drawPanelFill(curX, innerY, bayW, topAvailH, 'GLASS', 'GLASS');
        } else if (bayType === 'HW_SLIDE_2T') {
          svg += drawWindowInRect(curX, innerY, bayW, topAvailH, 'SLIDE2');
        } else if (bayType === 'HW_SLIDE_3T') {
          svg += drawWindowInRect(curX, innerY, bayW, topAvailH, 'SLIDE3');
        } else {
          svg += drawWindowInRect(curX, innerY, bayW, topAvailH, 'HOPEN');
        }
      } else if (bayType.indexOf('WIN_') === 0) {
        var topH = Math.round(innerH * 0.18), botH = Math.round(innerH * 0.28), midH = innerH - topH - botH - 8;
        svg += drawPanelFill(curX, innerY, bayW, topH, 'GLASS', '');
        var wMode = (bayType === 'WIN_SLIDE_3T') ? 'SLIDE3' : (bayType === 'WIN_SLIDE_2T' ? 'SLIDE2' : 'HOPEN');
        svg += drawWindowInRect(curX, innerY + topH + 4, bayW, midH, wMode);
        svg += drawPanelFill(curX, innerY + topH + midH + 8, bayW, botH, 'ACP', 'ACP');
      } else {
        // Standard Partition Column (Proportional Rows: Glass / ACP / Jali)
        var drawPtAvailH = innerH - ((ptRows - 1) * gapY);
        var curY = innerY;
        for (var r = 0; r < ptRows; r++) {
          var cfgIdx = ptRows - 1 - r;
          var cellH = Math.max(12, (ptResH[cfgIdx] / sumPtH) * drawPtAvailH);
          var matType = (prefix === 'pt' && pt_cell_overrides[cfgIdx + '_' + c])
            ? pt_cell_overrides[cfgIdx + '_' + c]
            : ((prefix === 'pt' && typeof pt_row_configs !== 'undefined' && pt_row_configs[cfgIdx]) ? pt_row_configs[cfgIdx].mat : 'GLASS');
          var clickP = (prefix === 'pt') ? ('onclick="togglePtCellMaterial(' + cfgIdx + ',' + c + ')"') : '';
          svg += drawPanelFill(curX, curY, bayW, cellH, matType, matType === 'JALI' ? 'JALI' : (matType === 'ACP' ? 'ACP' : ''), clickP);
          curY += cellH + gapY;
        }
      }
      curX += bayW + gapX;
    }  } else {
    var numCols = 2;
    if (prefix === 'dm' && document.getElementById('dm_type')) {
      var dt = document.getElementById('dm_type').value;
      numCols = dt.indexOf('4-Track') !== -1 || dt.indexOf('Center') !== -1 ? 4 : (dt.indexOf('3-Track') !== -1 ? 3 : 2);
    } else if (prefix === 'sl' && document.getElementById('sl_type')) {
      var st = document.getElementById('sl_type').value;
      numCols = st.indexOf('4-Track') !== -1 || st.indexOf('Center') !== -1 ? 4 : (st.indexOf('3-Track') !== -1 ? 3 : 2);
    }

    var wx = 20, wy = 10, ww = 320, wh = 200;
    svg += '<rect x="' + wx + '" y="' + wy + '" width="' + ww + '" height="' + wh + '" rx="4" fill="url(#aluGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="2.4"/>';
    svg += '<rect x="' + (wx + 8) + '" y="' + (wy + 8) + '" width="' + (ww - 16) + '" height="' + (wh - 16) + '" fill="#0f172a" stroke="' + aluPal.stroke + '" stroke-width="1"/>';

    var paneW = (ww - 16) / numCols;
    for (var c = 0; c < numCols; c++) {
      var px = wx + 8 + (c * paneW);
      var py = wy + 8;
      var ph = wh - 16;
      svg += '<rect x="' + (px + 1) + '" y="' + (py + 1) + '" width="' + (paneW - 2) + '" height="' + (ph - 2) + '" fill="url(#aluGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="1.3"/>';
      var isJaliTrack = (gType.toLowerCase().indexOf('glass + jali') !== -1 && c === numCols - 1);
      svg += drawPanelFill(px + 7, py + 7, paneW - 14, ph - 14, isJaliTrack ? 'JALI' : 'GLASS', isJaliTrack ? 'JALI' : '');
      svg += '<rect x="' + (px + paneW - 9.5) + '" y="' + (py + ph * 0.42) + '" width="2.8" height="20" rx="1.4" fill="#e2e8f0" stroke="#334155" stroke-width="0.6"/>';
      svg += '<text x="' + (px + paneW / 2) + '" y="' + (py + ph / 2 + 4) + '" font-size="13" font-weight="bold" fill="#ffffff" fill-opacity="0.75" text-anchor="middle">⇄</text>';
    }
  }

  svg += '</svg>';
  return { svg: svg, aluColor: aluColor, aluThick: aluThick, gType: gType, gThick: gThick };
}

function renderLiveColorGlassPreview(prefix) {
  if (prefix === 'pt' && typeof renderPtCadDesigner === 'function') { renderPtCadDesigner(); }
  var box = document.getElementById(prefix + '_color_preview_box');
  if (!box) return;
  var info = buildWindowDoorSvgPreview(prefix, 360, 205, false);

  var html = '<div style="background:linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%); border:1.5px solid #cbd5e1; border-radius:10px; padding:8px 10px;">';
  html += '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; flex-wrap:wrap; gap:4px;">';
  html += '<span style="font-size:0.74rem; font-weight:800; color:#0f172a;"><i class="fa-solid fa-palette" style="color:#0284c7;"></i> LIVE COLOR & GLASS PREVIEW</span>';
  html += '<button type="button" onclick="openCustomerShowroomModal(\'' + prefix + '\')" style="background:#0284c7; color:#fff; border:none; padding:5px 10px; border-radius:6px; font-size:0.72rem; font-weight:800; cursor:pointer; display:flex; align-items:center; gap:4px;"><i class="fa-solid fa-expand"></i> Full-Screen View</button>';
  html += '</div>';
  html += info.svg;
  html += '<div style="display:flex; justify-content:space-between; align-items:center; font-size:0.71rem; font-weight:700; color:#334155; margin-top:6px; border-top:1px solid #e2e8f0; padding-top:4px;">';
  html += '<span><b style="color:#0f766e;">Alu:</b> ' + info.aluThick + ' ' + info.aluColor + '</span>';
  html += '<span><b style="color:#0284c7;">Glass/Mesh:</b> ' + info.gThick + ' ' + info.gType + '</span>';
  html += '</div>';
  html += '</div>';

  box.innerHTML = html;
}

function zoomCustomerModal(delta) {
  csmCurrentZoom = Math.max(0.8, Math.min(2.2, parseFloat((csmCurrentZoom + delta).toFixed(2))));
  var holder = document.getElementById('csm_svg_holder');
  if (holder) holder.style.transform = 'scale(' + csmCurrentZoom + ')';
}

function openCustomerShowroomModal(prefix) {
  csmCurrentPrefix = prefix;
  csmCurrentZoom = 1.0;
  var modal = document.getElementById('customerShowroomModal');
  var holder = document.getElementById('csm_svg_holder');
  var sub = document.getElementById('csm_subtitle');
  var badges = document.getElementById('csm_specs_badges');
  if (!modal || !holder) return;

  var info = buildWindowDoorSvgPreview(prefix, 680, 520, true);
  holder.style.transform = 'scale(1)';
  holder.innerHTML = info.svg;
  if (sub) sub.textContent = info.aluColor + '  +  ' + info.gThick + ' ' + info.gType;
  if (typeof renderCasementCadToolbar === 'function') renderCasementCadToolbar(prefix);
  if (badges) {
    badges.innerHTML =
      '<div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:7px 9px;">' +
      '<div style="font-size:0.65rem; color:#166534; font-weight:700;">ALUMINIUM FRAME</div>' +
      '<div style="font-size:0.8rem; color:#0f172a; font-weight:800;">' + info.aluColor + ' (' + info.aluThick + ')</div>' +
      '</div>' +
      '<div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:7px 9px;">' +
      '<div style="font-size:0.65rem; color:#0369a1; font-weight:700;">GLASS / JALI SPECIFICATION</div>' +
      '<div style="font-size:0.8rem; color:#0f172a; font-weight:800;">' + info.gThick + ' ' + info.gType + '</div>' +
      '</div>';
  }
  modal.style.display = 'flex';
}


// =========================================================================
// 2. WORK ORDER TRACKER & DELIVERY LIST ENGINE (v69)
// =========================================================================
var currentOrderStageFilter = 'ALL';
var ORDER_STAGES = [
  '1. Measured',
  '2. Material Ordered',
  '3. Cutting in Workshop',
  '4. Ready for Delivery',
  '5. Fitted & Completed'
];

function getWorkOrders() {
  try {
    return JSON.parse(localStorage.getItem('sw_work_orders') || '[]');
  } catch (e) {
    return [];
  }
}

function saveWorkOrders(list) {
  localStorage.setItem('sw_work_orders', JSON.stringify(list || []));
}

function addNewWorkOrder() {
  var client = document.getElementById('ot_client') ? document.getElementById('ot_client').value.trim() : '';
  var phone = document.getElementById('ot_phone') ? document.getElementById('ot_phone').value.trim() : '';
  var site = document.getElementById('ot_site') ? document.getElementById('ot_site').value.trim() : '';
  var deliv = document.getElementById('ot_delivery_date') ? document.getElementById('ot_delivery_date').value : '';
  var details = document.getElementById('ot_details') ? document.getElementById('ot_details').value.trim() : '';
  var stage = document.getElementById('ot_stage') ? document.getElementById('ot_stage').value : '1. Measured';

  if (!client) {
    alert("Please enter Customer Name.");
    return;
  }

  var orders = getWorkOrders();
  orders.unshift({
    id: Date.now(),
    createdDate: new Date().toLocaleDateString('en-GB'),
    client: client,
    phone: phone || 'N/A',
    site: site || 'General Site',
    deliveryDate: deliv || 'Not Set',
    details: details || 'Aluminium & Glass Work',
    stage: stage
  });

  saveWorkOrders(orders);
  if (document.getElementById('ot_client')) document.getElementById('ot_client').value = '';
  if (document.getElementById('ot_phone')) document.getElementById('ot_phone').value = '';
  if (document.getElementById('ot_site')) document.getElementById('ot_site').value = '';
  if (document.getElementById('ot_details')) document.getElementById('ot_details').value = '';
  renderOrderTrackerList();
}

function updateWorkOrderStage(orderId, newStage) {
  var orders = getWorkOrders();
  orders.forEach(function(o) {
    if (String(o.id) === String(orderId)) {
      o.stage = newStage;
    }
  });
  saveWorkOrders(orders);
  renderOrderTrackerList();
}

function deleteWorkOrder(orderId) {
  var orders = getWorkOrders().filter(function(o) { return String(o.id) !== String(orderId); });
  saveWorkOrders(orders);
  renderOrderTrackerList();
}

function filterOrdersByStage(filterMode) {
  currentOrderStageFilter = filterMode || 'ALL';
  renderOrderTrackerList();
}

function sendOrderStatusWhatsApp(orderId) {
  var orders = getWorkOrders();
  var ord = orders.find(function(o) { return String(o.id) === String(orderId); });
  if (!ord) return;
  var profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
  var shop = profile.shop_name || 'Smart Worker Aluminium';
  var msg = '*' + shop.toUpperCase() + ' - ORDER UPDATE*\n' +
            '--------------------------------\n' +
            'Customer: *' + ord.client + '*\n' +
            'Site: ' + ord.site + '\n' +
            'Work: ' + ord.details + '\n' +
            'Current Status: *' + ord.stage + '*\n' +
            (ord.deliveryDate && ord.deliveryDate !== 'Not Set' ? ('Expected Delivery: *' + ord.deliveryDate + '*\n') : '') +
            '--------------------------------\n' +
            'Thank you for choosing ' + shop + '!';
  var cleanPhone = String(ord.phone || '').replace(/\D/g, '');
  var waUrl = cleanPhone.length >= 10
    ? ('https://wa.me/91' + cleanPhone.slice(-10) + '?text=' + encodeURIComponent(msg))
    : ('https://wa.me/?text=' + encodeURIComponent(msg));
  window.open(waUrl, '_blank');
}

function renderOrderTrackerList() {
  var container = document.getElementById('ot_orders_list_container');
  if (!container) return;
  var orders = getWorkOrders();
  var q = document.getElementById('ot_search') ? document.getElementById('ot_search').value.trim().toLowerCase() : '';

  var cAll = orders.length, cMeas = 0, cWork = 0, cDone = 0;
  orders.forEach(function(o) {
    var st = String(o.stage || '');
    if (st.indexOf('1.') === 0) cMeas++;
    else if (st.indexOf('5.') === 0) cDone++;
    else cWork++;
  });

  if (document.getElementById('ot_count_all')) document.getElementById('ot_count_all').textContent = cAll;
  if (document.getElementById('ot_count_measured')) document.getElementById('ot_count_measured').textContent = cMeas;
  if (document.getElementById('ot_count_working')) document.getElementById('ot_count_working').textContent = cWork;
  if (document.getElementById('ot_count_done')) document.getElementById('ot_count_done').textContent = cDone;

  if (orders.length === 0) {
    container.innerHTML = '<div style="text-align:center; color:#64748b; padding:20px; background:#f8fafc; border:1px dashed #cbd5e1; border-radius:10px; font-size:0.8rem;">No work orders added yet. Add a work order above or save a Bill in Pro Quotation!</div>';
    return;
  }

  var html = '';
  orders.forEach(function(o) {
    var st = String(o.stage || '1. Measured');
    if (currentOrderStageFilter === 'MEASURED' && st.indexOf('1.') !== 0) return;
    if (currentOrderStageFilter === 'DELIVERED' && st.indexOf('5.') !== 0) return;
    if (currentOrderStageFilter === 'WORKING' && (st.indexOf('1.') === 0 || st.indexOf('5.') === 0)) return;

    if (q && o.client.toLowerCase().indexOf(q) === -1 && o.site.toLowerCase().indexOf(q) === -1 && o.details.toLowerCase().indexOf(q) === -1) {
      return;
    }

    var stageNum = parseInt(st.charAt(0)) || 1;
    var pct = stageNum * 20;
    var badgeCol = stageNum === 5 ? '#16a34a' : (stageNum >= 3 ? '#d97706' : '#0284c7');

    html += '<div style="background:#ffffff; border:1.5px solid #cbd5e1; border-left:5px solid ' + badgeCol + '; border-radius:10px; padding:10px;">';
    html += '<div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:4px;">';
    html += '<div><div style="font-size:0.9rem; font-weight:800; color:#0f172a;">' + o.client + ' <span style="font-size:0.75rem; color:#64748b;">(' + o.phone + ')</span></div>';
    html += '<div style="font-size:0.74rem; font-weight:700; color:#0369a1;">📍 Site: ' + o.site + '  |  🚚 Delivery: <b style="color:#be123c;">' + (o.deliveryDate || 'Not Set') + '</b></div></div>';
    html += '<span style="font-size:0.7rem; font-weight:800; background:' + badgeCol + '; color:#fff; padding:2px 8px; border-radius:12px;">' + pct + '%</span>';
    html += '</div>';

    html += '<div style="font-size:0.78rem; color:#334155; font-weight:700; background:#f8fafc; padding:5px 8px; border-radius:6px; margin-bottom:6px;">' + o.details + '</div>';

    // Progress Bar
    html += '<div style="width:100%; height:6px; background:#e2e8f0; border-radius:4px; overflow:hidden; margin-bottom:8px;">';
    html += '<div style="width:' + pct + '%; height:100%; background:' + badgeCol + ';"></div>';
    html += '</div>';

    // Stage Selector + WhatsApp + Delete
    html += '<div style="display:flex; gap:6px; align-items:center;">';
    html += '<select onchange="updateWorkOrderStage(\'' + o.id + '\', this.value)" style="flex:1; padding:6px; border:1px solid #94a3b8; border-radius:6px; font-size:0.75rem; font-weight:800; color:#0f172a;">';
    ORDER_STAGES.forEach(function(stg) {
      html += '<option value="' + stg + '"' + (stg === st ? ' selected' : '') + '>' + stg + '</option>';
    });
    html += '</select>';
    html += '<button type="button" onclick="sendOrderStatusWhatsApp(\'' + o.id + '\')" style="background:#16a34a; color:#fff; border:none; padding:6px 10px; border-radius:6px; font-size:0.74rem; font-weight:800; cursor:pointer;"><i class="fa-brands fa-whatsapp"></i> Update</button>';
    html += '<button type="button" onclick="deleteWorkOrder(\'' + o.id + '\')" style="background:#fee2e2; color:#dc2626; border:none; padding:6px 8px; border-radius:6px; font-size:0.74rem; font-weight:800; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>';
    html += '</div>';
    html += '</div>';
  });

  if (!html) {
    html = '<div style="text-align:center; color:#64748b; padding:16px; font-size:0.8rem;">No matching orders found.</div>';
  }
  container.innerHTML = html;
}

function exportOrderTrackerPdf() {
  if (!isAppActivated()) {
    alert("PRO activation is required to generate PDF documents.");
    openScreen('activation', 'PRO UPGRADE & PLANS');
    return;
  }
  var orders = getWorkOrders();
  if (orders.length === 0) {
    alert("No orders in list to export!");
    return;
  }
  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) return;
  var doc = new jsPDF('l', 'mm', 'a4');
  drawDocHeaderWithLogo(doc, "WORK ORDER & DELIVERY STATUS LIST", "Active Fabrication & Fitting Schedule", [22, 163, 74]);

  var rows = orders.map(function(o, i) {
    return [i + 1, o.client + " (" + o.phone + ")", o.site, o.details, o.deliveryDate || "-", o.stage];
  });

  doc.autoTable({
    startY: 38,
    head: [['#', 'Customer & Phone', 'Site Location', 'Work Summary', 'Delivery Date', 'Current Status']],
    body: rows,
    theme: 'grid',
    headStyles: { fillColor: [22, 163, 74], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
    styles: { fontSize: 8.5, cellPadding: 3, fontStyle: 'bold' }
  });
  doc.save("Workshop_Order_Delivery_List.pdf");
}


// =========================================================================
// 1-CLICK BLUETOOTH & 58MM ROLL THERMAL QR STICKER PRINTER ENGINE (v68)
// Supports:
//  1. Direct Web Bluetooth ESC/POS Thermal Printers (58mm / 80mm)
//  2. Instant 58mm x 45mm Thermal Label Roll Print Dialog / RawBT / Thermal PDF
// =========================================================================
var btThermalDevice = null;
var btThermalChar = null;

function updateThermalPrinterBadge(isConnected, nameStr) {
  var badge = document.getElementById('thermalPrinterStatusBadge');
  if (!badge) return;
  if (isConnected) {
    badge.style.background = '#dcfce7';
    badge.style.color = '#166534';
    badge.style.borderColor = '#86efac';
    badge.innerHTML = '<i class="fa-brands fa-bluetooth"></i> Connected: ' + (nameStr || 'Thermal Printer');
  } else {
    badge.style.background = '#f1f5f9';
    badge.style.color = '#475569';
    badge.style.borderColor = '#cbd5e1';
    badge.innerHTML = '<i class="fa-brands fa-bluetooth-b"></i> Thermal Ready (58mm)';
  }
}

async function connectBluetoothThermalPrinter() {
  if (!navigator.bluetooth) {
    alert("Direct Bluetooth works in Chrome on Android. Using Instant 58mm Thermal Roll Print mode!");
    return false;
  }
  try {
    var device = await navigator.bluetooth.requestDevice({
      acceptAllDevices: true,
      optionalServices: [
        '000018f0-0000-1000-8000-00805f9b34fb',
        'e7810a71-73ae-499d-8c15-faa9aef0c3f2',
        '49535343-fe7d-4ae5-8fa9-9fafd205e455',
        0x18f0,
        0xff00,
        0xffe0
      ]
    });
    btThermalDevice = device;
    var server = await device.gatt.connect();
    var services = await server.getPrimaryServices();
    for (var s = 0; s < services.length; s++) {
      var chars = await services[s].getCharacteristics();
      for (var c = 0; c < chars.length; c++) {
        if (chars[c].properties.write || chars[c].properties.writeWithoutResponse) {
          btThermalChar = chars[c];
          break;
        }
      }
      if (btThermalChar) break;
    }
    if (btThermalChar) {
      updateThermalPrinterBadge(true, device.name || 'BT Printer');
      alert("Thermal Printer Connected: " + (device.name || 'Bluetooth Printer') + "! Now tap 1-Click Thermal QR Print anytime.");
      return true;
    } else {
      alert("Printer found, using Instant 58mm Thermal Roll Print mode.");
      return false;
    }
  } catch (err) {
    return false;
  }
}

// Encodes ESC/POS commands for a 58mm Thermal QR Sticker (Native ESC/POS QR + Bold Size/ID Text)
function buildEscPosQrStickerBytes(item) {
  var payload = buildQrPayloadForItem(item);
  var enc = new TextEncoder();
  var chunks = [];
  function pushArr(arr) { chunks.push(new Uint8Array(arr)); }
  function pushStr(str) { chunks.push(enc.encode(str)); }

  // Initialize printer & center align
  pushArr([0x1B, 0x40]);       // ESC @
  pushArr([0x1B, 0x61, 0x01]); // ESC a 1 (Center)

  // Bold Header: ID & Material
  pushArr([0x1B, 0x45, 0x01]); // Bold ON
  pushArr([0x1D, 0x21, 0x11]); // Double height & width
  pushStr("#" + item.code + " (" + item.mat.split(' ')[0] + ")\n");

  // Normal size bold for Size
  pushArr([0x1D, 0x21, 0x01]); // Double height
  pushStr("SIZE: " + item.sizeStr + "\n");

  pushArr([0x1D, 0x21, 0x00]); // Normal size
  pushStr(item.spec + " | " + item.sqft + " Sq.Ft\n");

  // ESC/POS Native QR Code: GS ( k
  var qrBytes = enc.encode(payload);
  var storeLen = qrBytes.length + 3;
  var pL = storeLen & 0xFF;
  var pH = (storeLen >> 8) & 0xFF;

  // 1. Select QR model 2
  pushArr([0x1D, 0x28, 0x6B, 0x04, 0x00, 0x31, 0x41, 0x32, 0x00]);
  // 2. Set module size (size 6 for crisp 58mm scan)
  pushArr([0x1D, 0x28, 0x6B, 0x03, 0x00, 0x31, 0x43, 0x06]);
  // 3. Set ECC level L (48)
  pushArr([0x1D, 0x28, 0x6B, 0x03, 0x00, 0x31, 0x45, 0x30]);
  // 4. Store QR data
  pushArr([0x1D, 0x28, 0x6B, pL, pH, 0x31, 0x50, 0x30]);
  chunks.push(qrBytes);
  // 5. Print QR code
  pushArr([0x1D, 0x28, 0x6B, 0x03, 0x00, 0x31, 0x51, 0x30]);

  pushStr("\nFrom: " + item.source + " (" + item.date + ")\n");
  pushStr("--------------------------------\n\n\n");

  // Merge chunks
  var totalLen = 0;
  chunks.forEach(function(c) { totalLen += c.length; });
  var out = new Uint8Array(totalLen);
  var offset = 0;
  chunks.forEach(function(c) {
    out.set(c, offset);
    offset += c.length;
  });
  return out;
}

async function sendBytesToBtPrinter(dataBytes) {
  if (!btThermalChar) return false;
  try {
    var chunkSize = 120;
    for (var i = 0; i < dataBytes.length; i += chunkSize) {
      var slice = dataBytes.slice(i, i + chunkSize);
      if (btThermalChar.properties.writeWithoutResponse) {
        await btThermalChar.writeValueWithoutResponse(slice);
      } else {
        await btThermalChar.writeValue(slice);
      }
    }
    return true;
  } catch (e) {
    btThermalChar = null;
    updateThermalPrinterBadge(false);
    return false;
  }
}

// Instant 58mm x 45mm Thermal Roll Print (Works with ALL Bluetooth/USB Thermal Printers via Android Print / RawBT / Browser Print!)
function print58mmThermalRollDirect(itemsToPrint) {
  if (!itemsToPrint || itemsToPrint.length === 0) return;

  // Also generate a exact 58mm x 50mm Thermal Label Roll PDF (1 sticker per page) so it opens in any Thermal Printer app or prints directly!
  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (jsPDF) {
    // 58mm wide x 50mm high thermal label roll!
    var doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: [58, 50]
    });

    itemsToPrint.forEach(function(item, idx) {
      if (idx > 0) doc.addPage([58, 50], 'p');

      // Top Black Header Bar for Thermal Contrast
      doc.setFillColor(0, 0, 0);
      doc.rect(2, 1.5, 54, 5.5, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(255, 255, 255);
      doc.text("#" + item.code + "  •  " + item.mat.toUpperCase(), 29, 5.3, { align: "center" });

      // Huge Size Text right below header
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10.5);
      doc.text("SIZE: " + item.sizeStr, 29, 11.2, { align: "center" });

      // High-Contrast Black & White Vector QR Code in Center (26mm x 26mm)
      var payload = buildQrPayloadForItem(item);
      var mat = generateQrMatrix(payload);
      var n = mat.length;
      var qrSize = 26.0;
      var cellMm = qrSize / (n + 2);
      var qx = (58.0 - qrSize) / 2.0;
      var qy = 12.5;

      doc.setFillColor(0, 0, 0);
      for (var r = 0; r < n; r++) {
        for (var c = 0; c < n; c++) {
          if (mat[r][c]) {
            doc.rect(qx + (c + 1) * cellMm, qy + (r + 1) * cellMm, cellMm + 0.05, cellMm + 0.05, 'F');
          }
        }
      }

      // Bottom Spec & Area line
      doc.setFontSize(7.5);
      doc.text(item.spec + " (" + item.sqft + " Sq.Ft)", 29, 42.5, { align: "center" });
      doc.setFontSize(6.5);
      doc.text(item.source + " | " + item.date, 29, 46.5, { align: "center" });
    });

    var fName = itemsToPrint.length === 1 ? ("Thermal_QR_" + itemsToPrint[0].code + ".pdf") : "Thermal_58mm_QR_Roll.pdf";
    doc.save(fName);
  }
}

// 1-Click Print Single or Multiple Wastage Items to Thermal Printer
async function oneClickThermalPrintItems(itemsList) {
  if (!itemsList || itemsList.length === 0) {
    alert("No offcut QR items to print!");
    return;
  }

  // If Bluetooth Thermal Printer is connected, send ESC/POS bytes directly in 1 click!
  if (btThermalChar) {
    for (var i = 0; i < itemsList.length; i++) {
      var bytes = buildEscPosQrStickerBytes(itemsList[i]);
      var ok = await sendBytesToBtPrinter(bytes);
      if (!ok) {
        print58mmThermalRollDirect(itemsList);
        return;
      }
    }
    alert("Printed " + itemsList.length + " QR Sticker(s) on Bluetooth Thermal Printer!");
    return;
  }

  // Otherwise, immediately output the 58mm x 50mm Thermal Label Roll PDF (ready for any 2-inch/58mm Thermal Printer!)
  print58mmThermalRollDirect(itemsList);
}

function oneClickThermalPrintSingle(code) {
  var stock = getWastageQrStock();
  var found = stock.filter(function(item) { return item.code === code; });
  oneClickThermalPrintItems(found);
}

function oneClickThermalPrintStock() {
  var stock = getWastageQrStock().filter(function(item) { return item.status !== 'USED'; });
  if (stock.length === 0) {
    alert("No available offcuts in stock to print!");
    return;
  }
  oneClickThermalPrintItems(stock);
}

// 1-CLICK INSTANT OFFCUT QR PRINT RIGHT FROM GLASS CUTTING, PARTITION OR DOOR CHART!
function instantPrintChartOffcutQr(modPrefix) {
  var sheets = [];
  var matName = 'ACP Board';
  var specStr = 'Standard';
  var srcPrefix = 'Partition';

  if (modPrefix === 'gc') {
    if (gc_items_list.length === 0) { alert("Please calculate a Glass Sheet first!"); return; }
    var stockDim = getSelectedGlassStockSheetDims();
    sheets = packGlassPanelsMinWaste(gc_items_list, stockDim.sL, stockDim.sW);
    var gt = document.getElementById('gc_g_type') ? document.getElementById('gc_g_type').value : 'Clear';
    var gth = document.getElementById('gc_g_thick') ? document.getElementById('gc_g_thick').value : '5 mm';
    matName = (gt === 'ACP Board') ? 'ACP Board' : 'Glass Piece';
    specStr = gth + ' ' + gt;
    srcPrefix = 'Glass Sheet';
  } else {
    var acpList = (modPrefix === 'dr') ? dr_acp_list : pt_acp_list;
    sheets = packPanelsOn4x8Sheets(acpList);
    if (sheets.length === 0) { alert("Please calculate a Partition or Door with ACP Board first!"); return; }
    matName = 'ACP Board';
    specStr = getModuleAluLabel(modPrefix);
    srcPrefix = (modPrefix === 'dr') ? 'Door' : 'Partition';
  }

  var stock = getWastageQrStock();
  var today = new Date().toLocaleDateString('en-GB');
  var newlyCreated = [];

  sheets.forEach(function(sh) {
    var sW = sh.sheetW || 48.0;
    if (sh.wasteRight >= 2.0) {
      var code1 = generateNextWastageCode(stock);
      var h1 = Number(sh.wasteRight.toFixed(2));
      var w1 = Number(sW.toFixed(2));
      var item1 = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        code: code1,
        mat: matName,
        spec: specStr,
        h_in: h1,
        w_in: w1,
        sizeStr: toFractionInch(h1) + ' x ' + toFractionInch(w1),
        sqft: Number(((h1 * w1) / 144.0).toFixed(2)),
        source: srcPrefix + ' #' + sh.sheetNo,
        date: today,
        status: 'AVAILABLE'
      };
      stock.unshift(item1);
      newlyCreated.push(item1);
    }
    if (sh.wasteBot >= 2.0 && sh.maxRightX >= 6.0) {
      var code2 = generateNextWastageCode(stock);
      var h2 = Number(sh.wasteBot.toFixed(2));
      var w2 = Number(sh.maxRightX.toFixed(2));
      var item2 = {
        id: Date.now() + Math.floor(Math.random() * 1000) + 1,
        code: code2,
        mat: matName,
        spec: specStr,
        h_in: h2,
        w_in: w2,
        sizeStr: toFractionInch(h2) + ' x ' + toFractionInch(w2),
        sqft: Number(((h2 * w2) / 144.0).toFixed(2)),
        source: srcPrefix + ' #' + sh.sheetNo,
        date: today,
        status: 'AVAILABLE'
      };
      stock.unshift(item2);
      newlyCreated.push(item2);
    }
  });

  if (newlyCreated.length === 0) {
    alert("Zero waste/offcut left on this sheet (100% of sheet used)!");
    return;
  }

  saveWastageQrStock(stock);
  // Immediately print the newly created offcut QR stickers to the Thermal Printer!
  oneClickThermalPrintItems(newlyCreated);
}


// =========================================================================
// 7B. DEDICATED GLASS CUTTING & 4'x8' SHEET MINIMUM-WASTE OPTIMIZER (v67)
// =========================================================================
var gc_items_list = [];
var gc_glass_dict = {};

function getSelectedGlassStockSheetDims() {
  var sel = document.getElementById('gc_sheet_size');
  var val = sel ? sel.value : '96x48';
  var parts = val.split('x');
  var sL = parseFloat(parts[0]) || 96.0;
  var sW = parseFloat(parts[1]) || 48.0;
  var label = Math.round(sW / 12) + "'x" + Math.round(sL / 12) + "' (" + sL + '" x ' + sW + '")';
  return { sL: sL, sW: sW, label: label };
}

// Minimum-Waste 2D Guillotine Sheet Packer for Glass & ACP Sheets
// Tests both Normal and Rotated-first strategies to ensure MAXIMUM pieces per sheet and MINIMUM offcut waste!
function packGlassPanelsMinWaste(itemsList, sheetL, sheetW) {
  sheetL = Number(sheetL) || 96.0;
  sheetW = Number(sheetW) || 48.0;
  var allPieces = [];
  (itemsList || []).forEach(function(grp) {
    var h = Math.max(1, Number(grp.h_in) || 0);
    var w = Math.max(1, Number(grp.w_in) || 0);
    var q = Math.max(1, parseInt(grp.qty) || 1);
    var tag = grp.rowTag || 'Glass';
    for (var i = 0; i < q; i++) {
      allPieces.push({
        h: h,
        w: w,
        tag: tag,
        spec: grp.spec || '5 mm Clear',
        cutStr: grp.cutStr || (toFractionInch(h) + ' x ' + toFractionInch(w)),
        idx: allPieces.length + 1
      });
    }
  });

  if (allPieces.length === 0) return [];

  // Helper: Run a single pass of Guillotine packing with a given orientation preference ('AUTO_BEST', 'FORCE_NORM', 'FORCE_ROT')
  function runGuillotinePass(piecesInput, mode) {
    var remList = piecesInput.slice();
    remList.sort(function(a, b) { return (b.h * b.w) - (a.h * a.w); });
    var sheetsOut = [];

    while (remList.length > 0) {
      var placed = [];
      var freeRects = [{ x: 0, y: 0, w: sheetL, h: sheetW }];
      var progress = true;

      while (progress && remList.length > 0) {
        progress = false;
        for (var i = 0; i < remList.length; i++) {
          var pc = remList[i];
          var bestIdx = -1;
          var bestRot = false;
          var bestScore = 9999999;

          for (var f = 0; f < freeRects.length; f++) {
            var fr = freeRects[f];
            // Check how many identical pieces of `pc` could tile inside `fr` in Normal vs Rotated
            var gridNorm = Math.floor((fr.w + 0.01) / pc.h) * Math.floor((fr.h + 0.01) / pc.w);
            var gridRot  = Math.floor((fr.w + 0.01) / pc.w) * Math.floor((fr.h + 0.01) / pc.h);

            var tries = [
              { dx: pc.h, dy: pc.w, rot: false, gridFit: gridNorm },
              { dx: pc.w, dy: pc.h, rot: true,  gridFit: gridRot }
            ];

            for (var t = 0; t < tries.length; t++) {
              var tr = tries[t];
              if (tr.dx <= fr.w + 0.01 && tr.dy <= fr.h + 0.01) {
                var remX = fr.w - tr.dx;
                var remY = fr.h - tr.dy;
                // Avoid awkward 8.5"..20" waste strips when another orientation leaves <= 8" or fits more pieces!
                var wastePen = 0;
                if (remX > 8.0 && remX < 18.0) wastePen += 35;
                if (remY > 8.0 && remY < 18.0) wastePen += 35;
                if (mode === 'FORCE_NORM' && tr.rot) wastePen += 15;
                if (mode === 'FORCE_ROT' && !tr.rot) wastePen += 15;

                // Strongly reward the orientation that tiles MORE pieces onto this free rectangle!
                var fitBonus = Math.min(remList.length, tr.gridFit) * 60;
                var score = (fr.x * 5) + fr.y + wastePen - fitBonus;
                if (score < bestScore) {
                  bestScore = score;
                  bestIdx = f;
                  bestRot = tr.rot;
                }
              }
            }
          }

          if (bestIdx !== -1) {
            var chosenFr = freeRects.splice(bestIdx, 1)[0];
            var useDx = bestRot ? pc.w : pc.h;
            var useDy = bestRot ? pc.h : pc.w;

            placed.push({
              pieceNum: pc.idx,
              tag: pc.tag,
              spec: pc.spec,
              x: chosenFr.x,
              y: chosenFr.y,
              w: useDx,
              h: useDy,
              cutStr: pc.cutStr + (bestRot ? ' (Rot)' : ''),
              dimXStr: toFractionInch(useDx),
              dimYStr: toFractionInch(useDy)
            });

            var rightW = chosenFr.w - useDx;
            var botH = chosenFr.h - useDy;
            if (botH >= 3.0) {
              freeRects.push({ x: chosenFr.x, y: chosenFr.y + useDy, w: useDx, h: botH });
            }
            if (rightW >= 3.0) {
              freeRects.push({ x: chosenFr.x + useDx, y: chosenFr.y, w: rightW, h: chosenFr.h });
            }

            remList.splice(i, 1);
            progress = true;
            break;
          }
        }
      }

      if (placed.length === 0 && remList.length > 0) {
        var huge = remList.shift();
        var ux = Math.min(sheetL, Math.max(huge.h, huge.w));
        var uy = Math.min(sheetW, Math.min(huge.h, huge.w));
        placed.push({
          pieceNum: huge.idx,
          tag: huge.tag,
          spec: huge.spec,
          x: 0,
          y: 0,
          w: ux,
          h: uy,
          cutStr: huge.cutStr,
          dimXStr: toFractionInch(ux),
          dimYStr: toFractionInch(uy)
        });
      }

      var maxRightX = 0, maxBotY = 0, usedArea = 0;
      placed.forEach(function(pr) {
        if (pr.x + pr.w > maxRightX) maxRightX = pr.x + pr.w;
        if (pr.y + pr.h > maxBotY) maxBotY = pr.y + pr.h;
        usedArea += (pr.w * pr.h);
      });

      var wasteRight = Math.max(0, sheetL - maxRightX);
      var wasteBot = Math.max(0, sheetW - maxBotY);
      var isHalfSheetOnly = (maxRightX <= (sheetL / 2.0));

      sheetsOut.push({
        sheetNo: sheetsOut.length + 1,
        sheetL: sheetL,
        sheetW: sheetW,
        placed: placed,
        maxRightX: maxRightX,
        maxBotY: maxBotY,
        wasteRight: wasteRight,
        wasteBot: wasteBot,
        usedSqFt: usedArea / 144.0,
        sheetSqFt: (sheetL * sheetW) / 144.0,
        isHalfSheetOnly: isHalfSheetOnly
      });
    }
    return sheetsOut;
  }

  // Run all 3 strategies and pick the one that uses the fewest sheets and smallest bounding width!
  var p1 = runGuillotinePass(allPieces, 'AUTO_BEST');
  var p2 = runGuillotinePass(allPieces, 'FORCE_NORM');
  var p3 = runGuillotinePass(allPieces, 'FORCE_ROT');

  var best = p1;
  [p2, p3].forEach(function(cand) {
    if (cand.length < best.length) {
      best = cand;
    } else if (cand.length === best.length && cand.length > 0) {
      var lastCand = cand[cand.length - 1];
      var lastBest = best[best.length - 1];
      if (lastCand.maxRightX < lastBest.maxRightX) best = cand;
    }
  });

  return best;
}

function addGlassCuttingItem() {
  var raw_h = safeEval(document.getElementById('gc_h') ? document.getElementById('gc_h').value : '0');
  var raw_w = safeEval(document.getElementById('gc_w') ? document.getElementById('gc_w').value : '0');
  if (raw_h <= 0 || raw_w <= 0) {
    alert("Please enter Glass Height and Width.");
    return;
  }

  var is_mm = document.getElementById('gc_unit') && document.getElementById('gc_unit').value.indexOf('Millimeter') !== -1;
  var h_in = is_mm ? (raw_h / 25.4) : raw_h;
  var w_in = is_mm ? (raw_w / 25.4) : raw_w;
  var qty = Math.max(1, parseInt(safeEval(document.getElementById('gc_qty') ? document.getElementById('gc_qty').value : '1')) || 1);
  var tag = document.getElementById('gc_tag') ? document.getElementById('gc_tag').value.trim() : '';
  var gType = document.getElementById('gc_g_type') ? document.getElementById('gc_g_type').value : 'Clear';
  var gThick = document.getElementById('gc_g_thick') ? document.getElementById('gc_g_thick').value : '5 mm';
  var gSpec = gThick + ' ' + gType;

  var disp = function(v) { return is_mm ? toMmStr(v) : toFractionInch(v); };
  var rowTag = tag || ('G' + (gc_items_list.length + 1));

  gc_items_list.push({
    rowTag: rowTag,
    h_in: h_in,
    w_in: w_in,
    qty: qty,
    spec: gSpec,
    is_mm: is_mm,
    cutStr: disp(h_in) + ' x ' + disp(w_in)
  });

  if (document.getElementById('gc_h')) document.getElementById('gc_h').value = '';
  if (document.getElementById('gc_w')) document.getElementById('gc_w').value = '';
  if (document.getElementById('gc_qty')) document.getElementById('gc_qty').value = '1';
  if (document.getElementById('gc_tag')) document.getElementById('gc_tag').value = '';

  recalculateGlassCuttingSheets();
}

function removeLastGlassCuttingItem() {
  if (gc_items_list.length === 0) return;
  gc_items_list.pop();
  recalculateGlassCuttingSheets();
}

function clearGlassCutting() {
  gc_items_list = [];
  gc_glass_dict = {};
  if (document.getElementById('gc_h')) document.getElementById('gc_h').value = '';
  if (document.getElementById('gc_w')) document.getElementById('gc_w').value = '';
  if (document.getElementById('gc_out')) document.getElementById('gc_out').textContent = '';
  var box = document.getElementById('gc_sheet_layout_box');
  if (box) { box.style.display = 'none'; box.innerHTML = ''; }
}

function recalculateGlassCuttingSheets() {
  gc_glass_dict = {};
  var box = document.getElementById('gc_sheet_layout_box');
  var outEl = document.getElementById('gc_out');
  if (gc_items_list.length === 0) {
    if (box) { box.style.display = 'none'; box.innerHTML = ''; }
    if (outEl) outEl.textContent = '';
    return;
  }

  var stockDim = getSelectedGlassStockSheetDims();
  var sheets = packGlassPanelsMinWaste(gc_items_list, stockDim.sL, stockDim.sW);

  // Build text summary and gc_glass_dict
  var totalPcs = 0, totalCutSqFt = 0, totalBillingSlabSqFt = 0;
  var out = "===================================\n";
  out += "4'x8' GLASS SHEET CUTTING SUMMARY\n";
  out += "Stock Sheet: " + stockDim.label + "\n";
  out += "===================================\n";

  gc_items_list.forEach(function(itm, idx) {
    var areaSqFt = (itm.h_in * itm.w_in * itm.qty) / 144.0;
    var hSlab = safeGlassSlabCap(itm.h_in).slab;
    var wSlab = safeGlassSlabCap(itm.w_in).slab;
    var slabSqFt = (hSlab * wSlab * itm.qty) / 144.0;

    totalPcs += itm.qty;
    totalCutSqFt += areaSqFt;
    totalBillingSlabSqFt += slabSqFt;

    out += (idx + 1) + ". [" + itm.rowTag + "] Cut Size: " + itm.cutStr + " (" + itm.qty + " Pcs) | " + itm.spec + "\n";
    out += "   Net Area: " + areaSqFt.toFixed(2) + " Sq.Ft | Billing Slab (" + hSlab + '\"x' + wSlab + '\"): ' + slabSqFt.toFixed(2) + " Sq.Ft\n";

    var gKey = itm.cutStr + " (" + itm.rowTag + ") || " + itm.spec;
    gc_glass_dict[gKey] = (gc_glass_dict[gKey] || 0) + itm.qty;
  });

  var lastSh = sheets[sheets.length - 1];
  var sheetsBuyLabel = sheets.length + (sheets.length === 1 ? " Full Sheet" : " Full Sheets");
  var totalSheetArea = sheets.length * ((stockDim.sL * stockDim.sW) / 144.0);
  if (sheets.length === 1 && lastSh.isHalfSheetOnly) {
    sheetsBuyLabel = "0.5 Sheet (Half Board " + Math.round(stockDim.sW) + '\"x' + Math.round(stockDim.sL / 2) + '\")';
    totalSheetArea = ((stockDim.sL * stockDim.sW) / 144.0) * 0.5;
  } else if (sheets.length > 1 && lastSh.isHalfSheetOnly) {
    sheetsBuyLabel = (sheets.length - 1) + ".5 Sheets (" + (sheets.length - 1) + " Full + 1 Half Sheet)";
    totalSheetArea = ((sheets.length - 0.5) * ((stockDim.sL * stockDim.sW) / 144.0));
  }
  var totalOffcutSqFt = Math.max(0, totalSheetArea - totalCutSqFt);

  out += "-----------------------------------\n";
  out += "• TOTAL PIECES TO CUT: " + totalPcs + " Pcs\n";
  out += "• TOTAL SHEETS REQUIRED: " + sheetsBuyLabel + " of " + stockDim.label + "\n";
  out += "• NET GLASS USED: " + totalCutSqFt.toFixed(2) + " Sq.Ft | REMAINING OFFCUT: " + totalOffcutSqFt.toFixed(2) + " Sq.Ft\n";
  out += "• SHOP BILLING SLAB AREA: " + totalBillingSlabSqFt.toFixed(2) + " Sq.Ft\n";

  sheets.forEach(function(sh) {
    out += "\n[SHEET #" + sh.sheetNo + " CUTTING PLAN - " + sh.placed.length + " Pcs]:\n";
    out += "  > Used Area: " + toFractionInch(sh.maxRightX) + " x " + toFractionInch(sh.maxBotY) + "\n";
    out += "  > Right Side Offcut (ছাঁট): " + toFractionInch(sh.wasteRight) + " x " + Math.round(sh.sheetW) + '\"\n';
    out += "  > Bottom Offcut (ছাঁট): " + toFractionInch(sh.wasteBot) + " x " + toFractionInch(sh.maxRightX) + "\n";
  });

  if (outEl) outEl.textContent = out;

  // Render Live SVG Visual Drawing Box for Glass Sheets
  if (box) {
    box.style.display = 'block';
    var html = '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; border-bottom:1.5px solid #e2e8f0; padding-bottom:6px; flex-wrap:wrap; gap:4px;">';
    html += '<div style="font-size:0.82rem; font-weight:800; color:#0f172a;"><i class="fa-solid fa-compass-drafting" style="color:#0284c7;"></i> GLASS SHEET CUTTING DRAWING (' + sheetsBuyLabel + ')</div>';
    html += '<span style="font-size:0.7rem; font-weight:800; background:#e0f2fe; color:#0369a1; padding:2px 7px; border-radius:6px;">' + stockDim.label + '</span>';
    html += '</div>';

    sheets.forEach(function(sh) {
      var badgeTxt = sh.isHalfSheetOnly ? 'Fits in Half Sheet (' + Math.round(sh.sheetL / 2) + '"x' + Math.round(sh.sheetW) + '")' : ('Full Sheet (' + Math.round(sh.sheetL) + '"x' + Math.round(sh.sheetW) + '")');
      html += '<div style="margin-bottom:12px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:8px;">';
      html += '<div style="display:flex; justify-content:space-between; align-items:center; font-size:0.76rem; font-weight:800; color:#1e3a8a; margin-bottom:6px;">';
      html += '<span>SHEET #' + sh.sheetNo + ' CUTTING LAYOUT (' + sh.placed.length + ' Pcs)</span>';
      html += '<span style="color:#0f766e;">' + badgeTxt + '</span>';
      html += '</div>';

      var scale = 480.0 / sh.sheetL;
      var svgW = Math.round(sh.sheetL * scale);
      var svgH = Math.round(sh.sheetW * scale);
      html += '<svg viewBox="0 0 ' + (svgW + 20) + ' ' + (svgH + 28) + '" style="width:100%; height:auto; background:#ffffff; border:1px solid #94a3b8; border-radius:6px;">';
      html += '<rect x="10" y="18" width="' + svgW + '" height="' + svgH + '" fill="#fef3c7" stroke="#0f172a" stroke-width="2"/>';
      html += '<text x="' + (10 + svgW / 2) + '" y="13" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">Sheet Length: ' + Math.round(sh.sheetL) + '" (' + (sh.sheetL / 12).toFixed(0) + ' Ft)  |  Height: ' + Math.round(sh.sheetW) + '" (' + (sh.sheetW / 12).toFixed(0) + ' Ft)</text>';

      sh.placed.forEach(function(p) {
        var rx = 10 + (p.x * scale);
        var ry = 18 + (p.y * scale);
        var rw = p.w * scale;
        var rh = p.h * scale;
        html += '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="' + rh + '" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.8"/>';
        var cx = rx + rw / 2;
        var cy = ry + rh / 2;
        html += '<text x="' + cx + '" y="' + (cy - 4) + '" font-size="10.5" font-weight="bold" fill="#0369a1" text-anchor="middle">' + p.tag + ' #' + p.pieceNum + '</text>';
        html += '<text x="' + cx + '" y="' + (cy + 9) + '" font-size="9.5" font-weight="bold" fill="#0f172a" text-anchor="middle">' + p.dimXStr + ' x ' + p.dimYStr + '</text>';
      });

      if (sh.isHalfSheetOnly) {
        var hx = 10 + ((sh.sheetL / 2.0) * scale);
        html += '<line x1="' + hx + '" y1="18" x2="' + hx + '" y2="' + (18 + svgH) + '" stroke="#dc2626" stroke-width="2" stroke-dasharray="5,4"/>';
        html += '<text x="' + (hx + 6) + '" y="36" font-size="10" font-weight="bold" fill="#dc2626">Half Sheet Cut Line (' + Math.round(sh.sheetL / 2) + '")</text>';
      }

      if (sh.wasteRight >= 0.5) {
        var wx = 10 + (sh.maxRightX * scale) + (sh.wasteRight * scale / 2);
        var wy = 18 + (sh.maxBotY * scale / 2);
        var wLabel = sh.wasteRight >= 18.0 ? ('Offcut: ' + toFractionInch(sh.wasteRight) + ' x ' + Math.round(sh.sheetW) + '"') : ('Trim: ' + toFractionInch(sh.wasteRight));
        html += '<text x="' + wx + '" y="' + wy + '" font-size="10" font-weight="bold" fill="#92400e" text-anchor="middle">' + wLabel + '</text>';
      }

      if (sh.wasteBot >= 0.5) {
        var bwx = 10 + (sh.maxRightX * scale / 2);
        var bwy = 18 + (sh.maxBotY * scale) + (sh.wasteBot * scale / 2) + 4;
        html += '<text x="' + bwx + '" y="' + bwy + '" font-size="10" font-weight="bold" fill="#92400e" text-anchor="middle">Bottom Offcut: ' + toFractionInch(sh.wasteBot) + ' x ' + toFractionInch(sh.maxRightX) + '</text>';
      }

      html += '</svg>';
      html += '<div style="font-size:0.72rem; color:#334155; margin-top:4px; display:flex; justify-content:space-between; flex-wrap:wrap;">';
      html += '<span><b>Used:</b> ' + sh.usedSqFt.toFixed(1) + ' Sq.Ft / ' + sh.sheetSqFt.toFixed(1) + ' Sq.Ft</span>';
      html += '<span style="color:#b45309; font-weight:700;">Right Offcut: ' + toFractionInch(sh.wasteRight) + ' x ' + Math.round(sh.sheetW) + '" | Bot Offcut: ' + toFractionInch(sh.wasteBot) + '</span>';
      html += '</div>';
      html += '</div>';
    });

    var liveSheetCode = (Math.round(stockDim.sL) + 'x' + Math.round(stockDim.sW));
    var liveSwgPayload = (typeof buildGlassOrderQrPayload === 'function') ? buildGlassOrderQrPayload('SHEET ORDER', gc_glass_dict, liveSheetCode) : '';
    if (liveSwgPayload) {
      window.lastGeneratedGlassOrderCode = liveSwgPayload;
      var liveQrSvg = (typeof renderQrMatrixToSvg === 'function') ? renderQrMatrixToSvg(generateQrMatrix(liveSwgPayload), 128) : '';
      html += '<div style="margin-top:10px; background:linear-gradient(135deg, #f0fdf4, #e0f2fe); border:1.5px solid #0284c7; border-radius:10px; padding:10px; display:flex; align-items:center; gap:10px; flex-wrap:wrap;">';
      html += '<div style="background:#fff; padding:6px; border-radius:8px; border:1px solid #cbd5e1; flex-shrink:0;">' + liveQrSvg + '</div>';
      html += '<div style="flex:1; min-width:170px;">';
      html += '<div style="font-size:0.78rem; font-weight:800; color:#0369a1; margin-bottom:3px;"><i class="fa-solid fa-qrcode"></i> SHEET QR CODE FOR GLASS FABRICATOR</div>';
      html += '<div style="font-size:0.7rem; color:#334155; line-height:1.35; margin-bottom:6px;">When the Glass Fabricator scans this QR (from screen, <b>Bill PDF</b>, <b>1. Sheet Drawing PDF</b>, or <b>2. Glass List PDF</b>), all sizes & this <b>' + stockDim.label + '</b> sheet layout load automatically!</div>';
      var liveShortId = generateShortGlassOrderId(liveSwgPayload);
      html += '<div style="font-size:0.85rem; font-weight:900; background:#fff; padding:5px 10px; border-radius:6px; border:1.5px solid #0284c7; color:#0369a1; margin-bottom:6px; display:inline-block;">4-DIGIT ORDER CODE: ' + liveShortId + '</div>';
      html += '<button type="button" onclick="shareCurrentGlassListToCutterWhatsApp()" style="background:#059669; color:#fff; border:none; border-radius:6px; padding:6px 10px; font-size:0.72rem; font-weight:800; cursor:pointer;"><i class="fa-brands fa-whatsapp"></i> Send Sheet QR & Details to Glass Fabricator</button>';
      html += '</div></div>';
    }
    html += '<div style="display:grid; grid-template-columns: 1fr 1fr; gap:6px; margin-top:8px;">';
    html += '<button type="button" onclick="instantPrintChartOffcutQr(\'gc\')" style="background:#16a34a; color:#ffffff; border:none; border-radius:8px; padding:10px 6px; font-size:0.76rem; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:5px;">';
    html += '<i class="fa-solid fa-print"></i> <span>1-CLICK THERMAL QR PRINT</span>';
    html += '</button>';
    html += '<button type="button" onclick="saveGlassSheetOffcutsToQrStock()" style="background:#d97706; color:#ffffff; border:none; border-radius:8px; padding:10px 6px; font-size:0.76rem; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:5px;">';
    html += '<i class="fa-solid fa-qrcode"></i> <span>VIEW QR STOCK</span>';
    html += '</button>';
    html += '</div>';
    box.innerHTML = html;
  }
}

function exportGlassSheetDrawingPdf() {
  if (gc_items_list.length === 0) {
    alert("Please enter Glass Height & Width and tap + CALCULATE first!");
    return;
  }
  exportSheetLayoutPdf('Glass_Sheet_Cutting_Drawing', '4x8 Glass Sheet Cutting Plan', gc_items_list);
}

function saveGlassSheetOffcutsToQrStock() {
  if (gc_items_list.length === 0) {
    alert("Please calculate a Glass Sheet first!");
    return;
  }
  var stockDim = getSelectedGlassStockSheetDims();
  var sheets = packGlassPanelsMinWaste(gc_items_list, stockDim.sL, stockDim.sW);
  var stock = getWastageQrStock();
  var gType = document.getElementById('gc_g_type') ? document.getElementById('gc_g_type').value : 'Clear';
  var gThick = document.getElementById('gc_g_thick') ? document.getElementById('gc_g_thick').value : '5 mm';
  var gSpec = gThick + ' ' + gType;
  var today = new Date().toLocaleDateString('en-GB');
  var added = 0;

  sheets.forEach(function(sh) {
    if (sh.wasteRight >= 4.0) {
      var code1 = generateNextWastageCode(stock);
      var h1 = Number(sh.wasteRight.toFixed(2));
      var w1 = Number(sh.sheetW.toFixed(2));
      stock.unshift({
        id: Date.now() + Math.floor(Math.random() * 1000),
        code: code1,
        mat: gType === 'ACP Board' ? 'ACP Board' : 'Glass Piece',
        spec: gSpec,
        h_in: h1,
        w_in: w1,
        sizeStr: toFractionInch(h1) + ' x ' + toFractionInch(w1),
        sqft: Number(((h1 * w1) / 144.0).toFixed(2)),
        source: 'Glass Sheet #' + sh.sheetNo,
        date: today,
        status: 'AVAILABLE'
      });
      added++;
    }
    if (sh.wasteBot >= 4.0 && sh.maxRightX >= 6.0) {
      var code2 = generateNextWastageCode(stock);
      var h2 = Number(sh.wasteBot.toFixed(2));
      var w2 = Number(sh.maxRightX.toFixed(2));
      stock.unshift({
        id: Date.now() + Math.floor(Math.random() * 1000) + 1,
        code: code2,
        mat: gType === 'ACP Board' ? 'ACP Board' : 'Glass Piece',
        spec: gSpec,
        h_in: h2,
        w_in: w2,
        sizeStr: toFractionInch(h2) + ' x ' + toFractionInch(w2),
        sqft: Number(((h2 * w2) / 144.0).toFixed(2)),
        source: 'Glass Sheet #' + sh.sheetNo,
        date: today,
        status: 'AVAILABLE'
      });
      added++;
    }
  });

  saveWastageQrStock(stock);
  openScreen('wastage_qr', 'WASTAGE QR STOCK');
  renderWastageQrStockList();
  alert(added + " Glass Offcut Piece(s) saved with QR Codes!");
}

function sendGlassCuttingToBill() {
  if (gc_items_list.length === 0) {
    addGlassCuttingItem();
    if (gc_items_list.length === 0) return;
  }
  gc_items_list.forEach(function(itm) {
    var h_ft = Number((itm.h_in / 12.0).toFixed(2));
    var w_ft = Number((itm.w_in / 12.0).toFixed(2));
    var area = (itm.h_in * itm.w_in * itm.qty) / 144.0;
    var gParts = itm.spec.split(' ');
    var gThick = gParts[0] + ' ' + (gParts[1] || 'mm');
    var gType = gParts.slice(2).join(' ') || 'Clear';
    var rate = 95;
    if (gType.indexOf('Toughened') !== -1) rate = 145;
    else if (gType.indexOf('One Way') !== -1 || gType.indexOf('Tinted') !== -1) rate = 115;

    billItems.push({
      type: 'Glass Cutting & Supply',
      location: itm.rowTag,
      color: 'Glass Order',
      thickness: gThick,
      glass_thick: gThick,
      glass_type: gType,
      toughened: gType.indexOf('Toughened') !== -1,
      h: h_ft,
      w: w_ft,
      unit: 'ft',
      qty: itm.qty,
      rate: rate,
      area: area,
      price: area * rate
    });
  });

  refreshQueueText();
  autoCalcAdvance();
  openScreen('quotation', 'PRO QUOTATION');
}


// =========================================================================
// SMART WASTAGE / OFFCUT QR CODE GENERATOR, SCANNER & CUT-SIZE MATCHER (v64)
// =========================================================================

// Pure-JS ISO/IEC 18004 QR Code Matrix Generator (Versions 1 to 5, ECC Level L)
function generateQrMatrix(text) {
    const str = String(text || 'SW');
    const utf8 = [];
    for (let i = 0; i < str.length; i++) {
        let c = str.charCodeAt(i);
        if (c < 0x80) utf8.push(c);
        else if (c < 0x800) { utf8.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f)); }
        else { utf8.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f)); }
    }
    const V_TAB = [
        [1,  19,  7, 1, 19, 0,  0, []],
        [2,  34, 10, 1, 34, 0,  0, [6, 18]],
        [3,  55, 15, 1, 55, 0,  0, [6, 22]],
        [4,  80, 20, 1, 80, 0,  0, [6, 26]],
        [5, 108, 26, 1,108, 0,  0, [6, 30]],
        [6, 136, 18, 2, 68, 0,  0, [6, 34]],
        [7, 156, 20, 2, 78, 0,  0, [6, 22, 38]],
        [8, 194, 24, 2, 97, 0,  0, [6, 24, 42]],
        [9, 232, 30, 2,116, 0,  0, [6, 26, 46]],
        [10,274, 18, 2, 68, 2, 69, [6, 28, 50]]
    ];
    let vRow = V_TAB[V_TAB.length - 1];
    for (let i = 0; i < V_TAB.length; i++) {
        const lenBits = V_TAB[i][0] <= 9 ? 8 : 16;
        const maxBytes = V_TAB[i][1] - Math.ceil((4 + lenBits) / 8);
        if (utf8.length <= maxBytes) { vRow = V_TAB[i]; break; }
    }
    const ver = vRow[0], totalData = vRow[1], ecPerBlock = vRow[2];
    const nb1 = vRow[3], db1 = vRow[4], nb2 = vRow[5], db2 = vRow[6], align = vRow[7];
    const lenBits = ver <= 9 ? 8 : 16;
    const maxBytes = totalData - Math.ceil((4 + lenBits) / 8);
    const bytes = utf8.slice(0, maxBytes);

    const bits = [];
    const pushBits = (val, len) => { for (let i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1); };
    pushBits(0b0100, 4);
    pushBits(bytes.length, lenBits);
    bytes.forEach(b => pushBits(b, 8));
    const maxDataBits = totalData * 8;
    pushBits(0, Math.min(4, maxDataBits - bits.length));
    while (bits.length % 8 !== 0) bits.push(0);
    const dataWords = [];
    for (let i = 0; i < bits.length; i += 8) {
        let b = 0;
        for (let j = 0; j < 8; j++) b = (b << 1) | bits[i + j];
        dataWords.push(b);
    }
    let padToggle = true;
    while (dataWords.length < totalData) {
        dataWords.push(padToggle ? 0xEC : 0x11);
        padToggle = !padToggle;
    }

    const gfExp = new Uint8Array(512);
    const gfLog = new Uint8Array(256);
    let x = 1;
    for (let i = 0; i < 255; i++) {
        gfExp[i] = x;
        gfLog[x] = i;
        x <<= 1;
        if (x & 0x100) x ^= 0x11d;
    }
    for (let i = 255; i < 512; i++) gfExp[i] = gfExp[i - 255];
    const gfMul = (a, b) => (a === 0 || b === 0) ? 0 : gfExp[gfLog[a] + gfLog[b]];

    let gen = [1];
    for (let i = 0; i < ecPerBlock; i++) {
        const next = new Array(gen.length + 1).fill(0);
        const factor = gfExp[i];
        for (let j = 0; j < gen.length; j++) {
            next[j] ^= gen[j];
            next[j + 1] ^= gfMul(gen[j], factor);
        }
        gen = next;
    }

    const computeEC = (block) => {
        const ec = new Array(ecPerBlock).fill(0);
        for (let i = 0; i < block.length; i++) {
            const factor = block[i] ^ ec[0];
            ec.shift();
            ec.push(0);
            for (let j = 0; j < ecPerBlock; j++) {
                ec[j] ^= gfMul(gen[j + 1], factor);
            }
        }
        return ec;
    };

    const dataBlocks = [];
    const ecBlocks = [];
    let offset = 0;
    for (let b = 0; b < nb1; b++) {
        const blk = dataWords.slice(offset, offset + db1);
        offset += db1;
        dataBlocks.push(blk);
        ecBlocks.push(computeEC(blk));
    }
    for (let b = 0; b < nb2; b++) {
        const blk = dataWords.slice(offset, offset + db2);
        offset += db2;
        dataBlocks.push(blk);
        ecBlocks.push(computeEC(blk));
    }

    const allWords = [];
    const maxBlkLen = Math.max(db1, db2);
    for (let i = 0; i < maxBlkLen; i++) {
        for (let b = 0; b < dataBlocks.length; b++) {
            if (i < dataBlocks[b].length) allWords.push(dataBlocks[b][i]);
        }
    }
    for (let i = 0; i < ecPerBlock; i++) {
        for (let b = 0; b < ecBlocks.length; b++) {
            allWords.push(ecBlocks[b][i]);
        }
    }

    const size = 17 + 4 * ver;
    const matrix = Array.from({ length: size }, () => new Int8Array(size).fill(-1));
    const isFunc = Array.from({ length: size }, () => new Uint8Array(size).fill(0));
    const setMod = (r, c, val, func = true) => {
        if (r >= 0 && r < size && c >= 0 && c < size) {
            matrix[r][c] = val ? 1 : 0;
            if (func) isFunc[r][c] = 1;
        }
    };

    const drawFinder = (r0, c0) => {
        for (let dr = -1; dr <= 7; dr++) {
            for (let dc = -1; dc <= 7; dc++) {
                const r = r0 + dr, c = c0 + dc;
                if (r < 0 || r >= size || c < 0 || c >= size) continue;
                const inOuter = (dr >= 0 && dr <= 6 && (dc === 0 || dc === 6)) || (dc >= 0 && dc <= 6 && (dr === 0 || dr === 6));
                const inInner = (dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4);
                setMod(r, c, inOuter || inInner ? 1 : 0, true);
            }
        }
    };
    drawFinder(0, 0);
    drawFinder(0, size - 7);
    drawFinder(size - 7, 0);

    for (let i = 0; i < align.length; i++) {
        for (let j = 0; j < align.length; j++) {
            if ((i === 0 && j === 0) || (i === 0 && j === align.length - 1) || (i === align.length - 1 && j === 0)) continue;
            const r0 = align[i], c0 = align[j];
            for (let dr = -2; dr <= 2; dr++) {
                for (let dc = -2; dc <= 2; dc++) {
                    const dist = Math.max(Math.abs(dr), Math.abs(dc));
                    setMod(r0 + dr, c0 + dc, dist === 2 || dist === 0 ? 1 : 0, true);
                }
            }
        }
    }

    for (let i = 8; i < size - 8; i++) {
        if (!isFunc[6][i]) setMod(6, i, i % 2 === 0 ? 1 : 0, true);
        if (!isFunc[i][6]) setMod(i, 6, i % 2 === 0 ? 1 : 0, true);
    }
    setMod(4 * ver + 9, 8, 1, true);

    if (ver >= 7) {
        let rem = ver;
        for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1F25);
        const vBits = (ver << 12) | rem;
        for (let i = 0; i < 18; i++) {
            const bit = (vBits >>> i) & 1;
            const a = size - 11 + (i % 3), b = Math.floor(i / 3);
            setMod(b, a, bit, true);
            setMod(a, b, bit, true);
        }
    }

    for (let i = 0; i < 9; i++) {
        if (!isFunc[8][i]) setMod(8, i, 0, true);
        if (!isFunc[i][8]) setMod(i, 8, 0, true);
    }
    for (let i = 0; i < 8; i++) {
        if (!isFunc[8][size - 1 - i]) setMod(8, size - 1 - i, 0, true);
        if (!isFunc[size - 1 - i][8]) setMod(size - 1 - i, 8, 0, true);
    }

    const streamBits = [];
    allWords.forEach(w => { for (let i = 7; i >= 0; i--) streamBits.push((w >>> i) & 1); });

    let bitIdx = 0;
    let upward = true;
    for (let right = size - 1; right >= 1; right -= 2) {
        if (right === 6) right = 5;
        for (let vert = 0; vert < size; vert++) {
            const r = upward ? (size - 1 - vert) : vert;
            for (let j = 0; j < 2; j++) {
                const c = right - j;
                if (!isFunc[r][c]) {
                    const bit = bitIdx < streamBits.length ? streamBits[bitIdx++] : 0;
                    const masked = ((r + c) % 2 === 0) ? (bit ^ 1) : bit;
                    matrix[r][c] = masked;
                }
            }
        }
        upward = !upward;
    }

    const fmt = 0x77c4;
    const fmtBits = [];
    for (let i = 0; i < 15; i++) fmtBits.push((fmt >>> i) & 1);
    const fCoords1 = [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,7],[8,8],[7,8],[5,8],[4,8],[3,8],[2,8],[1,8],[0,8]];
    const fCoords2 = [[size-1,8],[size-2,8],[size-3,8],[size-4,8],[size-5,8],[size-6,8],[size-7,8],[8,size-8],[8,size-7],[8,size-6],[8,size-5],[8,size-4],[8,size-3],[8,size-2],[8,size-1]];
    for (let i = 0; i < 15; i++) {
        matrix[fCoords1[i][0]][fCoords1[i][1]] = fmtBits[i];
        matrix[fCoords2[i][0]][fCoords2[i][1]] = fmtBits[i];
    }
    return matrix.map(row => Array.from(row, v => v === 1 ? 1 : 0));
}

function renderQrSvgString(payloadText, pxSize) {
  pxSize = pxSize || 84;
  var mat = generateQrMatrix(payloadText);
  var n = mat.length;
  var pad = 2;
  var total = n + pad * 2;
  var svg = '<svg viewBox="0 0 ' + total + ' ' + total + '" width="' + pxSize + '" height="' + pxSize + '" style="background:#ffffff; border:1px solid #cbd5e1; border-radius:6px; display:block;">';
  for (var r = 0; r < n; r++) {
    for (var c = 0; c < n; c++) {
      if (mat[r][c]) {
        svg += '<rect x="' + (c + pad) + '" y="' + (r + pad) + '" width="1" height="1" fill="#0f172a"/>';
      }
    }
  }
  svg += '</svg>';
  return svg;
}

function getWastageQrStock() {
  try {
    return JSON.parse(localStorage.getItem('sw_wastage_qr_stock') || '[]');
  } catch (e) {
    return [];
  }
}

function saveWastageQrStock(list) {
  localStorage.setItem('sw_wastage_qr_stock', JSON.stringify(list || []));
}

function generateNextWastageCode(list) {
  var maxNum = 100;
  (list || []).forEach(function(item) {
    var m = String(item.code || '').match(/W-(\d+)/i);
    if (m && parseInt(m[1]) > maxNum) maxNum = parseInt(m[1]);
  });
  return 'W-' + (maxNum + 1);
}

// Compute what standard & custom panels can be cut from a leftover piece (h_in x w_in)
function getPossibleCutsFromOffcut(h_in, w_in, needH, needW) {
  var h = Number(h_in) || 0;
  var w = Number(w_in) || 0;
  var suggestions = [];

  // 1. If user typed a specific required size (needH x needW), check if it fits!
  var fitsTargetCount = 0;
  var targetRemTxt = '';
  if (needH > 0 && needW > 0) {
    var fitNorm = Math.floor(h / needH) * Math.floor(w / needW);
    var fitRot = Math.floor(h / needW) * Math.floor(w / needH);
    fitsTargetCount = Math.max(fitNorm, fitRot);
    if (fitsTargetCount > 0) {
      var useRot = (fitRot > fitNorm);
      var remH = useRot ? (h - Math.floor(h / needW) * needW) : (h - Math.floor(h / needH) * needH);
      var remW = useRot ? (w - Math.floor(w / needH) * needH) : (w - Math.floor(w / needW) * needW);
      targetRemTxt = fitsTargetCount + ' Pcs of ' + toFractionInch(needH) + ' x ' + toFractionInch(needW) + ' will come out! (Rem Trim: ' + toFractionInch(remH) + ' / ' + toFractionInch(remW) + ')';
    }
  }

  // 2. Standard useful cuts that can come out of this leftover piece
  var stdPanels = [
    { name: 'Door Kickplate (30"x24")', ph: 30, pw: 24 },
    { name: 'Partition Box (24"x24")', ph: 24, pw: 24 },
    { name: 'Partition Box (30"x30")', ph: 30, pw: 30 },
    { name: 'Top Box (15"x30")', ph: 15, pw: 30 },
    { name: 'Top Box (12"x24")', ph: 12, pw: 24 },
    { name: 'Small Panel (18"x24")', ph: 18, pw: 24 }
  ];
  stdPanels.forEach(function(sp) {
    var c1 = Math.floor(h / sp.ph) * Math.floor(w / sp.pw);
    var c2 = Math.floor(h / sp.pw) * Math.floor(w / sp.ph);
    var cMax = Math.max(c1, c2);
    if (cMax > 0) {
      suggestions.push(cMax + ' Pc x ' + sp.name);
    }
  });

  if (suggestions.length === 0) {
    suggestions.push('Max Single Cut: ' + toFractionInch(h) + ' x ' + toFractionInch(w));
  }

  return {
    fitsTargetCount: fitsTargetCount,
    targetRemTxt: targetRemTxt,
    suggestionsTxt: suggestions.slice(0, 3).join('  |  ')
  };
}

// Auto-saves all usable offcuts (>= 4" width) from the current Partition or Door 4'x8' Sheet Layout into Wastage QR Stock!
function saveSheetOffcutsToQrStock(modPrefix) {
  var acpList = (modPrefix === 'dr') ? dr_acp_list : pt_acp_list;
  var sheets = packPanelsOn4x8Sheets(acpList);
  if (sheets.length === 0) {
    alert("Please calculate a Partition or Door with ACP Board first!");
    return;
  }

  var stock = getWastageQrStock();
  var aluSpec = getModuleAluLabel(modPrefix);
  var today = new Date().toLocaleDateString('en-GB');
  var addedCount = 0;

  sheets.forEach(function(sh) {
    // 1. Right-side Offcut (wasteRight x 48")
    if (sh.wasteRight >= 4.0) {
      var code1 = generateNextWastageCode(stock);
      var h1 = Number(sh.wasteRight.toFixed(2));
      var w1 = 48.0;
      stock.unshift({
        id: Date.now() + Math.floor(Math.random() * 1000),
        code: code1,
        mat: 'ACP Board',
        spec: aluSpec,
        h_in: h1,
        w_in: w1,
        sizeStr: toFractionInch(h1) + ' x 48"',
        sqft: Number(((h1 * w1) / 144.0).toFixed(2)),
        source: (modPrefix === 'dr' ? 'Door' : 'Partition') + ' Sheet #' + sh.sheetNo,
        date: today,
        status: 'AVAILABLE'
      });
      addedCount++;
    }
    // 2. Bottom Offcut under the used columns (wasteBot x maxRightX)
    if (sh.wasteBot >= 4.0 && sh.maxRightX >= 6.0) {
      var code2 = generateNextWastageCode(stock);
      var h2 = Number(sh.wasteBot.toFixed(2));
      var w2 = Number(sh.maxRightX.toFixed(2));
      stock.unshift({
        id: Date.now() + Math.floor(Math.random() * 1000) + 1,
        code: code2,
        mat: 'ACP Board',
        spec: aluSpec,
        h_in: h2,
        w_in: w2,
        sizeStr: toFractionInch(h2) + ' x ' + toFractionInch(w2),
        sqft: Number(((h2 * w2) / 144.0).toFixed(2)),
        source: (modPrefix === 'dr' ? 'Door' : 'Partition') + ' Sheet #' + sh.sheetNo,
        date: today,
        status: 'AVAILABLE'
      });
      addedCount++;
    }
  });

  if (addedCount === 0) {
    alert("Zero big offcuts left on this sheet (all material was used within < 4 inches!). You can also add any offcut manually.");
    openScreen('wastage_qr', 'WASTAGE QR STOCK');
    renderWastageQrStockList();
    return;
  }

  saveWastageQrStock(stock);
  openScreen('wastage_qr', 'WASTAGE QR STOCK');
  renderWastageQrStockList();
  alert(addedCount + " Leftover Offcut Piece(s) saved with QR Codes! You can now print their QR Stickers or scan them anytime.");
}

function addManualWastagePiece() {
  var mat = document.getElementById('wq_mat_type') ? document.getElementById('wq_mat_type').value : 'ACP Board';
  var spec = document.getElementById('wq_spec') ? document.getElementById('wq_spec').value.trim() : '';
  var h = safeEval(document.getElementById('wq_h') ? document.getElementById('wq_h').value : '0');
  var w = safeEval(document.getElementById('wq_w') ? document.getElementById('wq_w').value : '0');

  if (h <= 0 || w <= 0) {
    alert("Please enter valid Height/Length and Width in inches.");
    return;
  }

  var stock = getWastageQrStock();
  var code = generateNextWastageCode(stock);
  var today = new Date().toLocaleDateString('en-GB');

  stock.unshift({
    id: Date.now(),
    code: code,
    mat: mat,
    spec: spec || 'Standard',
    h_in: h,
    w_in: w,
    sizeStr: toFractionInch(h) + ' x ' + toFractionInch(w),
    sqft: Number(((h * w) / 144.0).toFixed(2)),
    source: 'Manual Entry',
    date: today,
    status: 'AVAILABLE'
  });

  saveWastageQrStock(stock);
  if (document.getElementById('wq_h')) document.getElementById('wq_h').value = '';
  if (document.getElementById('wq_w')) document.getElementById('wq_w').value = '';
  renderWastageQrStockList();
}

function toggleWastageItemStatus(code) {
  var stock = getWastageQrStock();
  stock.forEach(function(item) {
    if (item.code === code) {
      item.status = (item.status === 'USED') ? 'AVAILABLE' : 'USED';
    }
  });
  saveWastageQrStock(stock);
  renderWastageQrStockList();
}

function deleteWastageItem(code) {
  var stock = getWastageQrStock().filter(function(item) { return item.code !== code; });
  saveWastageQrStock(stock);
  renderWastageQrStockList();
}

function clearUsedWastageStock() {
  var stock = getWastageQrStock().filter(function(item) { return item.status !== 'USED'; });
  saveWastageQrStock(stock);
  renderWastageQrStockList();
}

function buildQrPayloadForItem(item) {
  return 'SWQR|' + item.code + '|' + item.mat + '|' + item.sizeStr + '|' + item.spec;
}

function renderWastageQrStockList() {
  var container = document.getElementById('wq_stock_list_container');
  if (!container) return;
  var stock = getWastageQrStock();
  var searchQ = (document.getElementById('wq_search_id') ? document.getElementById('wq_search_id').value.trim().toUpperCase() : '');
  var needH = safeEval(document.getElementById('wq_check_h') ? document.getElementById('wq_check_h').value : '0');
  var needW = safeEval(document.getElementById('wq_check_w') ? document.getElementById('wq_check_w').value : '0');

  if (stock.length === 0) {
    container.innerHTML = '<div style="text-align:center; color:#64748b; padding:22px; background:#f8fafc; border:1px dashed #cbd5e1; border-radius:10px; font-size:0.8rem;">No leftover/wastage pieces saved yet. Calculate a Partition/Door and tap <b>+ Save Offcut to QR Stock</b>, or add a piece above!</div>';
    return;
  }

  var html = '';
  stock.forEach(function(item) {
    if (searchQ && item.code.toUpperCase().indexOf(searchQ) === -1 && item.mat.toUpperCase().indexOf(searchQ) === -1 && item.spec.toUpperCase().indexOf(searchQ) === -1) {
      return;
    }

    var cutInfo = getPossibleCutsFromOffcut(item.h_in, item.w_in, needH, needW);
    if (needH > 0 && needW > 0 && cutInfo.fitsTargetCount === 0) {
      return; // Filter to only show pieces that can produce the requested size!
    }

    var isUsed = (item.status === 'USED');
    var payload = buildQrPayloadForItem(item);
    var qrSvg = renderQrSvgString(payload, 78);
    var cardBg = isUsed ? '#f1f5f9' : '#ffffff';
    var borderCol = (needH > 0 && needW > 0 && cutInfo.fitsTargetCount > 0) ? '#16a34a' : (isUsed ? '#cbd5e1' : '#0284c7');

    html += '<div style="background:' + cardBg + '; border:2px solid ' + borderCol + '; border-radius:12px; padding:10px; display:flex; gap:10px; align-items:center; opacity:' + (isUsed ? '0.65' : '1') + ';">';
    html += '<div style="flex-shrink:0; text-align:center;">' + qrSvg + '<div style="font-size:0.72rem; font-weight:800; color:#0f172a; margin-top:3px;">#' + item.code + '</div></div>';
    html += '<div style="flex:1; min-width:0;">';
    html += '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:3px;">';
    html += '<span style="font-size:0.88rem; font-weight:800; color:#0f172a;">#' + item.code + ' • ' + item.mat + '</span>';
    html += '<span style="font-size:0.68rem; font-weight:800; padding:2px 7px; border-radius:6px; background:' + (isUsed ? '#e2e8f0' : '#dcfce7') + '; color:' + (isUsed ? '#475569' : '#166534') + ';">' + item.status + '</span>';
    html += '</div>';

    html += '<div style="font-size:0.9rem; font-weight:800; color:#be123c; margin-bottom:2px;">Size: ' + item.sizeStr + ' (' + item.sqft + ' Sq.Ft)</div>';
    html += '<div style="font-size:0.74rem; color:#334155; font-weight:700; margin-bottom:4px;">Spec: ' + item.spec + ' | From: ' + item.source + '</div>';

    if (needH > 0 && needW > 0 && cutInfo.fitsTargetCount > 0) {
      html += '<div style="background:#dcfce7; color:#166534; padding:4px 7px; border-radius:6px; font-size:0.74rem; font-weight:800; margin-bottom:4px;">✔ ' + cutInfo.targetRemTxt + '</div>';
    } else {
      html += '<div style="background:#f8fafc; border:1px solid #e2e8f0; color:#0369a1; padding:4px 7px; border-radius:6px; font-size:0.7rem; font-weight:700; margin-bottom:4px;"><b>Possible Cuts:</b> ' + cutInfo.suggestionsTxt + '</div>';
    }

    html += '<div style="display:flex; gap:6px; margin-top:6px;">';
    html += '<button type="button" onclick="toggleWastageItemStatus(\'' + item.code + '\')" style="background:' + (isUsed ? '#0284c7' : '#16a34a') + '; color:#fff; border:none; padding:5px 10px; border-radius:6px; font-size:0.72rem; font-weight:800; cursor:pointer;">' + (isUsed ? 'Mark Available' : '✔ Mark Used') + '</button>';
    html += '<button type="button" onclick="oneClickThermalPrintSingle(\'' + item.code + '\')" style="background:#0f172a; color:#fff; border:none; padding:5px 10px; border-radius:6px; font-size:0.72rem; font-weight:800; cursor:pointer;"><i class="fa-solid fa-print"></i> Thermal QR</button>';
    html += '<button type="button" onclick="deleteWastageItem(\'' + item.code + '\')" style="background:#fee2e2; color:#dc2626; border:none; padding:5px 8px; border-radius:6px; font-size:0.72rem; font-weight:800; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>';
    html += '</div>';
    html += '</div>';
    html += '</div>';
  });

  if (!html) {
    html = '<div style="text-align:center; color:#b45309; padding:16px; background:#fffbeb; border:1px solid #fde68a; border-radius:8px; font-size:0.8rem; font-weight:700;">No leftover piece in stock matches that size/filter.</div>';
  }
  container.innerHTML = html;
}

// Camera QR Code Scanner using HTML5 getUserMedia + BarcodeDetector (with fallback prompt)
var wqCameraStream = null;
var wqScanInterval = null;

function startWastageQrCameraScanner() {
  var camBox = document.getElementById('wq_camera_box');
  var video = document.getElementById('wq_video');
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    var manualCode = prompt("Enter the QR Code ID printed on the sticker (e.g. W-101):");
    if (manualCode) handleDecodedWastageQr(manualCode.trim());
    return;
  }

  camBox.style.display = 'block';
  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function(stream) {
    wqCameraStream = stream;
    video.srcObject = stream;
    video.play();

    if ('BarcodeDetector' in window) {
      var detector = new BarcodeDetector({ formats: ['qr_code'] });
      wqScanInterval = setInterval(function() {
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          detector.detect(video).then(function(barcodes) {
            if (barcodes && barcodes.length > 0) {
              var rawVal = barcodes[0].rawValue;
              stopWastageQrCameraScanner();
              handleDecodedWastageQr(rawVal);
            }
          }).catch(function(){});
        }
      }, 350);
    } else {
      setTimeout(function() {
        var code = prompt("Camera active! If your browser does not auto-detect, type the Sticker ID (e.g. W-101):");
        stopWastageQrCameraScanner();
        if (code) handleDecodedWastageQr(code.trim());
      }, 1200);
    }
  }).catch(function() {
    camBox.style.display = 'none';
    var manualCode = prompt("Enter the QR Sticker ID (e.g. W-101):");
    if (manualCode) handleDecodedWastageQr(manualCode.trim());
  });
}

function stopWastageQrCameraScanner() {
  if (wqScanInterval) { clearInterval(wqScanInterval); wqScanInterval = null; }
  if (wqCameraStream) {
    wqCameraStream.getTracks().forEach(function(t) { t.stop(); });
    wqCameraStream = null;
  }
  var camBox = document.getElementById('wq_camera_box');
  if (camBox) camBox.style.display = 'none';
}

function handleDecodedWastageQr(rawText) {
  var clean = String(rawText || '').trim();
  // Extract W-xxx code if formatted as SWQR|W-101|...
  var m = clean.match(/W-\d+/i);
  var lookupCode = m ? m[0].toUpperCase() : clean.toUpperCase();

  var stock = getWastageQrStock();
  var found = stock.find(function(item) { return item.code.toUpperCase() === lookupCode; });
  var resCard = document.getElementById('wq_scanned_result_card');

  if (found && resCard) {
    var cutInfo = getPossibleCutsFromOffcut(found.h_in, found.w_in, 0, 0);
    resCard.style.display = 'block';
    resCard.innerHTML =
      '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">' +
      '<span style="font-size:0.92rem; font-weight:800; color:#166534;"><i class="fa-solid fa-circle-check"></i> QR SCANNED: #' + found.code + ' (' + found.mat + ')</span>' +
      '<button type="button" onclick="this.parentElement.parentElement.style.display=\'none\'" style="background:none; border:none; font-weight:800; cursor:pointer;">✕</button>' +
      '</div>' +
      '<div style="font-size:1.0rem; font-weight:800; color:#be123c; margin-bottom:4px;">Available Size: ' + found.sizeStr + ' (' + found.sqft + ' Sq.Ft)</div>' +
      '<div style="font-size:0.78rem; font-weight:700; color:#0f172a; margin-bottom:4px;">Spec / Color: ' + found.spec + ' | Source: ' + found.source + '</div>' +
      '<div style="font-size:0.76rem; font-weight:800; color:#0369a1; background:#ffffff; padding:6px 8px; border-radius:6px; border:1px solid #bbf7d0;">Possible Cuts from this Piece: ' + cutInfo.suggestionsTxt + '</div>';
    if (document.getElementById('wq_search_id')) {
      document.getElementById('wq_search_id').value = found.code;
      renderWastageQrStockList();
    }
  } else if (clean.indexOf('SWQR|') === 0) {
    // Even if scanned on another phone where localStorage didn't have it, decode directly from the QR payload!
    var parts = clean.split('|');
    if (resCard) {
      resCard.style.display = 'block';
      resCard.innerHTML =
        '<div style="font-size:0.92rem; font-weight:800; color:#166534; margin-bottom:4px;">QR DECODED: #' + (parts[1] || '') + ' (' + (parts[2] || '') + ')</div>' +
        '<div style="font-size:1.0rem; font-weight:800; color:#be123c; margin-bottom:4px;">Piece Size: ' + (parts[3] || '') + '</div>' +
        '<div style="font-size:0.8rem; font-weight:700; color:#0f172a;">Spec: ' + (parts[4] || '') + '</div>';
    }
  } else {
    alert("No wastage piece found with QR Code: " + clean);
  }
}

// Printable A4 QR Code Stickers PDF (Draws Vector QR Matrix + Piece Size & Spec)
function exportWastageQrStickersPdf(singleCodeFilter) {
  if (!isAppActivated()) {
    alert("PRO activation is required to generate PDF documents.");
    openScreen('activation', 'PRO UPGRADE & PLANS');
    return;
  }

  var stock = getWastageQrStock().filter(function(item) {
    if (singleCodeFilter) return item.code === singleCodeFilter;
    return item.status !== 'USED';
  });

  if (stock.length === 0) {
    alert("No available offcut pieces in stock to print QR stickers!");
    return;
  }

  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) {
    alert("PDF library is loading, please try again in a moment.");
    return;
  }

  var doc = new jsPDF('p', 'mm', 'a4');
  drawDocHeaderWithLogo(doc, "WORKSHOP WASTAGE / OFFCUT QR STICKERS", "Cut & Stick on Leftover Boards / Pipes", [217, 119, 6]);

  // 2 columns x 4 rows = 8 stickers per A4 page
  var colW = 88, rowH = 52;
  var startX = 14, startY = 38;
  var gapX = 6, gapY = 6;

  stock.forEach(function(item, idx) {
    var posOnPage = idx % 8;
    if (idx > 0 && posOnPage === 0) {
      doc.addPage('a4', 'p');
      drawDocHeaderWithLogo(doc, "WORKSHOP WASTAGE / OFFCUT QR STICKERS", "Cut & Stick on Leftover Boards / Pipes", [217, 119, 6]);
    }

    var col = posOnPage % 2;
    var row = Math.floor(posOnPage / 2);
    var x = startX + col * (colW + gapX);
    var y = startY + row * (rowH + gapY);

    // Sticker dashed border
    doc.setFillColor(255, 251, 235);
    doc.setDrawColor(217, 119, 6);
    doc.setLineWidth(0.4);
    doc.roundedRect(x, y, colW, rowH, 2, 2, 'FD');

    // Draw Vector QR Matrix inside sticker (34mm x 34mm)
    var payload = buildQrPayloadForItem(item);
    var mat = generateQrMatrix(payload);
    var n = mat.length;
    var qrBoxSize = 34.0;
    var cellMm = qrBoxSize / (n + 2);
    var qx = x + 4;
    var qy = y + 9;

    doc.setFillColor(255, 255, 255);
    doc.rect(qx, qy, qrBoxSize, qrBoxSize, 'F');
    doc.setFillColor(15, 23, 42);
    for (var r = 0; r < n; r++) {
      for (var c = 0; c < n; c++) {
        if (mat[r][c]) {
          doc.rect(qx + (c + 1) * cellMm, qy + (r + 1) * cellMm, cellMm + 0.04, cellMm + 0.04, 'F');
        }
      }
    }

    // Top Header Banner on Sticker
    doc.setFillColor(217, 119, 6);
    doc.rect(x, y, colW, 6.5, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text("SMART WORKER OFFCUT TAG  •  #" + item.code, x + 4, y + 4.5);

    // Right side text details
    var tx = x + 41;
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(12);
    doc.text("ID: #" + item.code, tx, y + 15);

    doc.setFontSize(9.5);
    doc.setTextColor(190, 18, 60);
    doc.text("SIZE: " + item.sizeStr, tx, y + 22);

    doc.setFontSize(8.5);
    doc.setTextColor(15, 118, 110);
    doc.text("AREA: " + item.sqft + " Sq.Ft (" + item.mat + ")", tx, y + 28);

    doc.setFontSize(7.5);
    doc.setTextColor(51, 65, 85);
    var shortSpec = String(item.spec || '').substring(0, 26);
    doc.text("Spec: " + shortSpec, tx, y + 34);
    doc.text("From: " + item.source, tx, y + 39);
    doc.text("Date: " + item.date, tx, y + 44);
  });

  doc.save((singleCodeFilter ? ("QR_Sticker_" + singleCodeFilter) : "Workshop_Wastage_QR_Stickers") + ".pdf");
}


// =========================================================================
// INTERACTIVE MULTI-ROW (1 TO 8 ROWS) GLASS / ACP BUILDER & VISUAL WALL PREVIEW
// Row index 0 = Bottom Row (Row 1), Row index (rows-1) = Top Row
// =========================================================================
var pt_row_configs = [
  { mat: 'ACP', h_val: 30.0 },   // Row 1 (Bottom)
  { mat: 'GLASS', h_val: 0 },    // Row 2 (Middle - 0 means Auto Remaining)
  { mat: 'ACP', h_val: 15.0 }    // Row 3 (Top)
];

var dr_row_configs = [
  { mat: 'ACP', h_val: 30.0 },   // Part 1 (Bottom)
  { mat: 'GLASS', h_val: 0 }     // Part 2 (Top - 0 means Auto Remaining)
];

var pt_cell_overrides = {}; // e.g. {"1_1": "WINDOW"} for clicking individual partition cells!

function getMatButtonStyle(mat) {
  if (mat === 'ACP') return { bg: '#ea580c', icon: 'fa-layer-group', label: 'ACP Board', boxBg: '#fed7aa', boxFg: '#9a3412', boxBd: '#ea580c', shortLbl: 'ACP' };
  if (mat === 'JALI') return { bg: '#16a34a', icon: 'fa-table-cells', label: 'Jali / Mesh', boxBg: '#bbf7d0', boxFg: '#14532d', boxBd: '#16a34a', shortLbl: 'JALI / MESH' };
  if (mat === 'WINDOW') return { bg: '#7c3aed', icon: 'fa-window-restore', label: 'Window (Open)', boxBg: '#ede9fe', boxFg: '#5b21b6', boxBd: '#7c3aed', shortLbl: 'WINDOW' };
  return { bg: '#0284c7', icon: 'fa-border-all', label: 'Glass', boxBg: '#bae6fd', boxFg: '#0369a1', boxBd: '#0284c7', shortLbl: 'GLASS' };
}

function nextPanelMaterial(curr, allowWindow) {
  if (curr === 'GLASS') return 'ACP';
  if (curr === 'ACP') return 'JALI';
  if (curr === 'JALI' && allowWindow) return 'WINDOW';
  return 'GLASS';
}

function togglePtCellMaterial(rIdx, cIdx) {
  var key = rIdx + '_' + cIdx;
  var curr = pt_cell_overrides[key] || (pt_row_configs[rIdx] ? pt_row_configs[rIdx].mat : 'GLASS');
  var nxt = nextPanelMaterial(curr, true);
  pt_cell_overrides[key] = nxt;
  var pm = document.getElementById('pt_panel_mode');
  if (pm) pm.value = 'CUSTOM_ROWS';
  var hasAnyWin = Object.values(pt_cell_overrides || {}).some(v => v === 'WINDOW') || (pt_row_configs || []).some(r => r.mat === 'WINDOW');
  var wb = document.getElementById('pt_window_options_box');
  if (wb && document.getElementById('pt_type')?.value !== 'Door + Partition') wb.style.display = hasAnyWin ? 'block' : 'none';
  renderPartitionWallVisualOnly();
  if (typeof renderLiveColorGlassPreview === 'function') renderLiveColorGlassPreview('pt');
  var modal = document.getElementById('customerShowroomModal');
  if (modal && modal.style.display === 'flex' && csmCurrentPrefix === 'pt') {
    openCustomerShowroomModal('pt');
  }
}

function ensurePtRowConfigsCount(numRows) {
  numRows = Math.max(1, Math.min(8, parseInt(numRows) || 3));
  while (pt_row_configs.length < numRows) {
    var topItem = pt_row_configs.pop() || { mat: 'ACP', h_val: 15.0 };
    pt_row_configs.push({ mat: 'GLASS', h_val: 0 });
    pt_row_configs.push(topItem);
  }
  if (pt_row_configs.length > numRows) {
    pt_row_configs = pt_row_configs.slice(0, numRows);
  }
}

function applyQuickPartitionPattern(mode) {
  pt_cell_overrides = {};
  var rowsEl = document.getElementById('pt_rows');
  var numRows = rowsEl ? Math.max(1, parseInt(rowsEl.value) || 3) : 3;
  if (mode === 'CUSTOM_ROWS') {
    renderPartitionRowBuilder();
    return;
  }
  pt_row_configs = [];
  for (var r = 0; r < numRows; r++) {
    if (mode === 'EQUAL_DIVIDE') {
      pt_row_configs.push({ mat: 'GLASS', h_val: 0 });
    } else if (mode === 'ALL_ACP') {
      pt_row_configs.push({ mat: 'ACP', h_val: 0 });
    } else if (mode === 'ALL_JALI') {
      pt_row_configs.push({ mat: 'JALI', h_val: 0 });
    } else if (mode === 'TOP_JALI_MID_GLASS_BOT_ACP') {
      if (r === 0) pt_row_configs.push({ mat: 'ACP', h_val: 30.0 });
      else if (r === numRows - 1) pt_row_configs.push({ mat: 'JALI', h_val: numRows >= 3 ? 15.0 : 0 });
      else pt_row_configs.push({ mat: 'GLASS', h_val: 0 });
    } else if (mode === 'TOP_MID_JALI_BOT_ACP') {
      if (r === 0) pt_row_configs.push({ mat: 'ACP', h_val: 30.0 });
      else pt_row_configs.push({ mat: 'JALI', h_val: (r === numRows - 1 && numRows >= 3) ? 15.0 : 0 });
    } else if (mode === 'BOT_TOP_ACP') {
      if (r === 0) pt_row_configs.push({ mat: 'ACP', h_val: 30.0 });
      else if (r === numRows - 1 && numRows >= 3) pt_row_configs.push({ mat: 'ACP', h_val: 15.0 });
      else pt_row_configs.push({ mat: 'GLASS', h_val: 0 });
    } else {
      // OPTIMIZED_4X8: Bottom ACP, rest Glass
      if (r === 0) pt_row_configs.push({ mat: 'ACP', h_val: 30.0 });
      else if (r === numRows - 1 && numRows >= 3) pt_row_configs.push({ mat: 'GLASS', h_val: 15.0 });
      else pt_row_configs.push({ mat: 'GLASS', h_val: 0 });
    }
  }
  renderPartitionRowBuilder();
}

function togglePtRowMaterial(rIdx) {
  if (!pt_row_configs[rIdx]) return;
  pt_row_configs[rIdx].mat = nextPanelMaterial(pt_row_configs[rIdx].mat);
  var pm = document.getElementById('pt_panel_mode');
  if (pm) pm.value = 'CUSTOM_ROWS';
  renderPartitionRowBuilder();
  if (typeof renderLiveColorGlassPreview === 'function') renderLiveColorGlassPreview('pt');
}

function updatePtRowHeightInput(rIdx, valStr) {
  if (!pt_row_configs[rIdx]) return;
  var v = parseFloat(valStr);
  pt_row_configs[rIdx].h_val = (isNaN(v) || v <= 0) ? 0 : v;
  var pm = document.getElementById('pt_panel_mode');
  if (pm) pm.value = 'CUSTOM_ROWS';
  var hasAnyWin = Object.values(pt_cell_overrides || {}).some(v => v === 'WINDOW') || (pt_row_configs || []).some(r => r.mat === 'WINDOW');
  var wb = document.getElementById('pt_window_options_box');
  if (wb && document.getElementById('pt_type')?.value !== 'Door + Partition') wb.style.display = hasAnyWin ? 'block' : 'none';
  renderPartitionWallVisualOnly();
  if (typeof renderLiveColorGlassPreview === 'function') renderLiveColorGlassPreview('pt');
}

function getRowPositionName(rIdx, totalRows) {
  if (totalRows === 1) return 'Full Row 1';
  if (rIdx === 0) return 'Row 1 (Bottom / নিচ)';
  if (rIdx === totalRows - 1) return 'Row ' + totalRows + ' (Top / ওপর)';
  if (totalRows === 3 && rIdx === 1) return 'Row 2 (Middle / মধ্যিখান)';
  return 'Row ' + (rIdx + 1) + ' (Middle)';
}

function getRowShortEnglishName(rIdx, totalRows) {
  if (totalRows === 1) return 'Full Panel';
  if (rIdx === 0) return 'Bottom Row 1';
  if (rIdx === totalRows - 1) return 'Top Row ' + totalRows;
  if (totalRows === 3 && rIdx === 1) return 'Middle Row 2';
  return 'Middle Row ' + (rIdx + 1);
}

function resolveRowHeightsGeneric(configsList, total_open_h, numRows) {
  var heights = new Array(numRows).fill(0);
  var autoIndices = [];
  var usedFixed = 0;

  for (var r = 0; r < numRows; r++) {
    var cfg = configsList[r] || { mat: 'GLASS', h_val: 0 };
    var hVal = Number(cfg.h_val) || 0;
    if (hVal > 0 && numRows > 1) {
      heights[r] = hVal;
      usedFixed += hVal;
    } else {
      autoIndices.push(r);
    }
  }

  var minPerAuto = 10.0;
  var remH = total_open_h - usedFixed;
  if (autoIndices.length > 0 && remH < (autoIndices.length * minPerAuto)) {
    if (numRows >= 3 && heights[numRows - 1] > 0 && heights[0] > 0) {
      heights[numRows - 1] = Math.max(10.0, Math.min(heights[numRows - 1], total_open_h * 0.22));
      heights[0] = Math.min(heights[0], total_open_h * 0.38);
      usedFixed = 0;
      for (var i = 0; i < numRows; i++) {
        if (autoIndices.indexOf(i) === -1) usedFixed += heights[i];
      }
      remH = Math.max(autoIndices.length * 8.0, total_open_h - usedFixed);
    } else if (numRows === 2 && heights[0] > total_open_h * 0.7) {
      heights[0] = Math.round(total_open_h * 0.42);
      usedFixed = heights[0];
      remH = Math.max(8.0, total_open_h - usedFixed);
    }
  }

  if (autoIndices.length > 0) {
    var eachAuto = Math.max(5.0, remH / autoIndices.length);
    autoIndices.forEach(function(idx) {
      heights[idx] = eachAuto;
    });
  } else if (numRows > 0 && Math.abs(usedFixed - total_open_h) > 0.1) {
    var midIdx = Math.floor(numRows / 2);
    heights[midIdx] = Math.max(6.0, heights[midIdx] + (total_open_h - usedFixed));
  }

  return heights;
}

function resolvePartitionRowHeights(total_open_h, numRows, cut_w) {
  ensurePtRowConfigsCount(numRows);
  return resolveRowHeightsGeneric(pt_row_configs, total_open_h, numRows);
}

function setPtRowMaterial(rIdx, matVal) {
  if (!pt_row_configs[rIdx]) return;
  pt_row_configs[rIdx].mat = matVal;
  var pm = document.getElementById('pt_panel_mode');
  if (pm) pm.value = 'CUSTOM_ROWS';
  renderPartitionRowBuilder();
  if (typeof renderLiveColorGlassPreview === 'function') renderLiveColorGlassPreview('pt');
}

function renderPartitionRowBuilder() {
  var container = document.getElementById('pt_rows_builder_container');
  if (!container) return;
  var rowsEl = document.getElementById('pt_rows');
  var numRows = rowsEl ? Math.max(1, Math.min(8, parseInt(rowsEl.value) || 3)) : 3;
  ensurePtRowConfigsCount(numRows);

  var html = '';
  for (var r = numRows - 1; r >= 0; r--) {
    var cfg = pt_row_configs[r];
    var st = getMatButtonStyle(cfg.mat);
    var rowLabel = getRowShortEnglishName(r, numRows);
    var hValStr = (cfg.h_val && cfg.h_val > 0) ? String(cfg.h_val) : '';
    var placeholderTxt = (cfg.h_val && cfg.h_val > 0) ? '' : 'Auto Height';

    html += '<div style="display:grid; grid-template-columns: 1.1fr 1.15fr 0.95fr; gap:6px; align-items:center; background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; padding:6px 8px;">';
    html += '<div style="font-size:0.75rem; font-weight:800; color:#0f172a;">' + rowLabel + '</div>';
    html += '<select onchange="setPtRowMaterial(' + r + ', this.value)" style="background:' + st.bg + '; color:#fff; border:none; border-radius:6px; padding:6px 4px; font-size:0.74rem; font-weight:800; cursor:pointer;">';
    html += '<option value="GLASS" style="background:#fff; color:#0f172a;" ' + (cfg.mat === 'GLASS' ? 'selected' : '') + '>Glass</option>';
    html += '<option value="ACP" style="background:#fff; color:#0f172a;" ' + (cfg.mat === 'ACP' ? 'selected' : '') + '>ACP Board</option>';
    html += '<option value="JALI" style="background:#fff; color:#0f172a;" ' + (cfg.mat === 'JALI' ? 'selected' : '') + '>Jali / Mesh</option>';
    html += '<option value="WINDOW" style="background:#fff; color:#0f172a;" ' + (cfg.mat === 'WINDOW' ? 'selected' : '') + '>Window (Open)</option>';
    html += '</select>';
    html += '<div style="display:flex; align-items:center; gap:3px;">';
    html += '<input type="number" step="0.5" value="' + hValStr + '" placeholder="' + placeholderTxt + '" oninput="updatePtRowHeightInput(' + r + ', this.value)" style="width:100%; padding:5px 6px; border:1px solid #94a3b8; border-radius:6px; font-size:0.78rem; font-weight:700; text-align:center;">';
    html += '<span style="font-size:0.68rem; font-weight:700; color:#64748b;">In</span>';
    html += '</div>';
    html += '</div>';
  }

  container.innerHTML = html;
  var hasAnyWin = Object.values(pt_cell_overrides || {}).some(v => v === 'WINDOW') || (pt_row_configs || []).some(r => r.mat === 'WINDOW');
  var wb = document.getElementById('pt_window_options_box');
  if (wb && document.getElementById('pt_type')?.value !== 'Door + Partition') wb.style.display = hasAnyWin ? 'block' : 'none';
  renderPartitionWallVisualOnly();
  if (typeof renderLiveColorGlassPreview === 'function') renderLiveColorGlassPreview('pt');
}

function renderPartitionWallVisualOnly() {
  var prevBox = document.getElementById('pt_wall_visual_preview');
  if (!prevBox) return;
  var rowsEl = document.getElementById('pt_rows');
  var colsEl = document.getElementById('pt_cols');
  var numRows = rowsEl ? Math.max(1, Math.min(8, parseInt(rowsEl.value) || 3)) : 3;
  var numCols = colsEl ? Math.max(1, Math.min(10, parseInt(colsEl.value) || 3)) : 3;
  ensurePtRowConfigsCount(numRows);

  var raw_h = safeEval(document.getElementById('pt_h') ? document.getElementById('pt_h').value : '96') || 96;
  var raw_w = safeEval(document.getElementById('pt_w') ? document.getElementById('pt_w').value : '120') || 120;
  var is_mm = document.getElementById('pt_unit') && document.getElementById('pt_unit').value.indexOf('Millimeter') !== -1;
  var h_in = is_mm ? (raw_h / 25.4) : raw_h;
  var w_in = is_mm ? (raw_w / 25.4) : raw_w;
  var tube_face = parseFloat(document.getElementById('pt_tube_face') ? document.getElementById('pt_tube_face').value : 1.5) || 1.5;
  var bot_face = parseFloat(document.getElementById('pt_bot_face') ? document.getElementById('pt_bot_face').value : 1.5) || 1.5;

  var frame_deduct = bot_face + (numRows * tube_face);
  var total_open_h = Math.max(12, h_in - frame_deduct);
  var inner_w = Math.max(6, (w_in - ((numCols + 1) * tube_face)) / numCols);
  var rowHeights = resolvePartitionRowHeights(total_open_h, numRows, inner_w - 0.25);

  var html = '<div style="font-size:0.72rem; font-weight:800; color:#334155; margin-bottom:6px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:4px;">';
  html += '<span>LIVE PARTITION PREVIEW (' + numCols + ' Cols x ' + numRows + ' Rows)</span>';
  html += '<span style="color:#0284c7;">Tap any box: Glass ➔ ACP ➔ Jali ➔ Window</span>';
  html += '</div>';

  html += '<div style="display:flex; flex-direction:column; gap:3px; background:#334155; padding:5px; border-radius:6px;">';
  for (var r = numRows - 1; r >= 0; r--) {
    var rh = rowHeights[r];
    var cutH = Math.max(1, rh - 0.25);
    var cutW = Math.max(1, inner_w - 0.25);
    var flexWt = Math.max(0.4, rh / total_open_h);
    var minPx = Math.max(26, Math.round(flexWt * 145));

    html += '<div style="display:grid; grid-template-columns: repeat(' + numCols + ', 1fr); gap:3px;">';
    for (var c = 0; c < numCols; c++) {
      var cellMat = pt_cell_overrides[r + '_' + c] || (pt_row_configs[r] ? pt_row_configs[r].mat : 'GLASS');
      var st = getMatButtonStyle(cellMat);
      var meshBg = (cellMat === 'JALI')
        ? 'repeating-linear-gradient(45deg, rgba(16,185,129,0.22) 0, rgba(16,185,129,0.22) 2px, #ecfdf5 2px, #ecfdf5 6px), repeating-linear-gradient(-45deg, rgba(6,95,70,0.22) 0, rgba(6,95,70,0.22) 2px, transparent 2px, transparent 6px)'
        : st.boxBg;
      html += '<div onclick="togglePtCellMaterial(' + r + ',' + c + ')" style="background:' + meshBg + '; color:' + st.boxFg + '; border:1.5px solid ' + st.boxBd + '; border-radius:4px; min-height:' + minPx + 'px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:3px 2px; font-size:0.68rem; font-weight:800; text-align:center; cursor:pointer;">';
      html += '<div>' + st.shortLbl + '</div>';
      html += '<div style="font-size:0.6rem; color:#0f172a;">' + toFractionInch(cutH) + ' x ' + toFractionInch(cutW) + '</div>';
      html += '</div>';
    }
    html += '</div>';
  }
  html += '</div>';
  prevBox.innerHTML = html;
}

// =========================================================================
// INTERACTIVE MULTI-PART DOOR BUILDER (1 TO 6 PARTS: GLASS / ACP / JALI)
// =========================================================================
function ensureDrRowConfigsCount(numRows) {
  numRows = Math.max(1, Math.min(6, parseInt(numRows) || 2));
  while (dr_row_configs.length < numRows) {
    var topItem = dr_row_configs.pop() || { mat: 'GLASS', h_val: 0 };
    dr_row_configs.push({ mat: 'GLASS', h_val: 0 });
    dr_row_configs.push(topItem);
  }
  if (dr_row_configs.length > numRows) {
    dr_row_configs = dr_row_configs.slice(0, numRows);
  }
  var hasMidEl = document.getElementById('dr_has_mid');
  if (hasMidEl) hasMidEl.value = (numRows > 1) ? 'yes' : 'no';
}

function getDoorPartShortName(rIdx, totalRows) {
  if (totalRows === 1) return 'Full Door Panel';
  if (rIdx === 0) return 'Bottom Part 1';
  if (rIdx === totalRows - 1) return 'Top Part ' + totalRows;
  if (totalRows === 3 && rIdx === 1) return 'Middle Part 2';
  return 'Middle Part ' + (rIdx + 1);
}

function applyQuickDoorPattern(mode) {
  if (mode === 'CUSTOM_ROWS') {
    renderDoorRowBuilder();
    return;
  }
  var rowsEl = document.getElementById('dr_rows');
  var targetRows = 2;
  if (mode.indexOf('1_') === 0) targetRows = 1;
  else if (mode.indexOf('3_') === 0) targetRows = 3;
  else if (mode.indexOf('2_') === 0) targetRows = 2;
  if (rowsEl) rowsEl.value = String(targetRows);

  if (mode === '2_GLASS_ACP') {
    dr_row_configs = [{ mat: 'ACP', h_val: 30.0 }, { mat: 'GLASS', h_val: 0 }];
  } else if (mode === '2_JALI_ACP') {
    dr_row_configs = [{ mat: 'ACP', h_val: 30.0 }, { mat: 'JALI', h_val: 0 }];
  } else if (mode === '3_JALI_GLASS_ACP') {
    dr_row_configs = [{ mat: 'ACP', h_val: 30.0 }, { mat: 'GLASS', h_val: 0 }, { mat: 'JALI', h_val: 14.0 }];
  } else if (mode === '3_ACP_GLASS_ACP') {
    dr_row_configs = [{ mat: 'ACP', h_val: 30.0 }, { mat: 'GLASS', h_val: 0 }, { mat: 'ACP', h_val: 14.0 }];
  } else if (mode === '3_GLASS_GLASS_ACP') {
    dr_row_configs = [{ mat: 'ACP', h_val: 30.0 }, { mat: 'GLASS', h_val: 0 }, { mat: 'GLASS', h_val: 14.0 }];
  } else if (mode === '3_ALL_JALI') {
    dr_row_configs = [{ mat: 'JALI', h_val: 0 }, { mat: 'JALI', h_val: 0 }, { mat: 'JALI', h_val: 0 }];
  } else if (mode === '2_ALL_GLASS') {
    dr_row_configs = [{ mat: 'GLASS', h_val: 0 }, { mat: 'GLASS', h_val: 0 }];
  } else if (mode === '1_FULL_GLASS') {
    dr_row_configs = [{ mat: 'GLASS', h_val: 0 }];
  } else if (mode === '1_FULL_ACP') {
    dr_row_configs = [{ mat: 'ACP', h_val: 0 }];
  } else if (mode === '1_FULL_JALI') {
    dr_row_configs = [{ mat: 'JALI', h_val: 0 }];
  }
  renderDoorRowBuilder();
  if (typeof renderLiveColorGlassPreview === 'function') renderLiveColorGlassPreview('dr');
}

function toggleDrRowMaterial(rIdx) {
  if (!dr_row_configs[rIdx]) return;
  dr_row_configs[rIdx].mat = nextPanelMaterial(dr_row_configs[rIdx].mat);
  var pm = document.getElementById('dr_panel_mode');
  if (pm) pm.value = 'CUSTOM_ROWS';
  renderDoorRowBuilder();
  if (typeof renderLiveColorGlassPreview === 'function') renderLiveColorGlassPreview('dr');
}

function updateDrRowHeightInput(rIdx, valStr) {
  if (!dr_row_configs[rIdx]) return;
  var v = parseFloat(valStr);
  dr_row_configs[rIdx].h_val = (isNaN(v) || v <= 0) ? 0 : v;
  var pm = document.getElementById('dr_panel_mode');
  if (pm) pm.value = 'CUSTOM_ROWS';
  renderDoorVisualOnly();
  if (typeof renderLiveColorGlassPreview === 'function') renderLiveColorGlassPreview('dr');
}

function setDrRowMaterial(rIdx, matVal) {
  if (!dr_row_configs[rIdx]) return;
  dr_row_configs[rIdx].mat = matVal;
  var pm = document.getElementById('dr_panel_mode');
  if (pm) pm.value = 'CUSTOM_ROWS';
  renderDoorRowBuilder();
  if (typeof renderLiveColorGlassPreview === 'function') renderLiveColorGlassPreview('dr');
}

function renderDoorRowBuilder() {
  var container = document.getElementById('dr_rows_builder_container');
  if (!container) return;
  var rowsEl = document.getElementById('dr_rows');
  var numRows = rowsEl ? Math.max(1, Math.min(6, parseInt(rowsEl.value) || 2)) : 2;
  ensureDrRowConfigsCount(numRows);

  var midCol = document.getElementById('dr_mid_h_col');
  if (midCol) midCol.style.opacity = (numRows > 1) ? '1' : '0.35';

  var html = '';
  for (var r = numRows - 1; r >= 0; r--) {
    var cfg = dr_row_configs[r];
    var st = getMatButtonStyle(cfg.mat);
    var partLabel = getDoorPartShortName(r, numRows);
    var hValStr = (cfg.h_val && cfg.h_val > 0 && numRows > 1) ? String(cfg.h_val) : '';
    var placeholderTxt = (numRows === 1) ? 'Full Height' : ((cfg.h_val && cfg.h_val > 0) ? '' : 'Auto Height');

    html += '<div style="display:grid; grid-template-columns: 1.1fr 1.15fr 0.95fr; gap:6px; align-items:center; background:#ffffff; border:1px solid #cbd5e1; border-radius:8px; padding:6px 8px;">';
    html += '<div style="font-size:0.75rem; font-weight:800; color:#0f172a;">' + partLabel + '</div>';
    html += '<select onchange="setDrRowMaterial(' + r + ', this.value)" style="background:' + st.bg + '; color:#fff; border:none; border-radius:6px; padding:6px 4px; font-size:0.74rem; font-weight:800; cursor:pointer;">';
    html += '<option value="GLASS" style="background:#fff; color:#0f172a;" ' + (cfg.mat === 'GLASS' ? 'selected' : '') + '>Glass</option>';
    html += '<option value="ACP" style="background:#fff; color:#0f172a;" ' + (cfg.mat === 'ACP' ? 'selected' : '') + '>ACP Board</option>';
    html += '<option value="JALI" style="background:#fff; color:#0f172a;" ' + (cfg.mat === 'JALI' ? 'selected' : '') + '>Jali / Mesh</option>';
    html += '<option value="WINDOW" style="background:#fff; color:#0f172a;" ' + (cfg.mat === 'WINDOW' ? 'selected' : '') + '>Window (Open)</option>';
    html += '</select>';
    html += '<div style="display:flex; align-items:center; gap:3px;">';
    html += '<input type="number" step="0.5" value="' + hValStr + '" placeholder="' + placeholderTxt + '" ' + (numRows === 1 ? 'disabled' : '') + ' oninput="updateDrRowHeightInput(' + r + ', this.value)" style="width:100%; padding:5px 6px; border:1px solid #94a3b8; border-radius:6px; font-size:0.78rem; font-weight:700; text-align:center;">';
    html += '<span style="font-size:0.68rem; font-weight:700; color:#64748b;">In</span>';
    html += '</div>';
    html += '</div>';
  }
  container.innerHTML = html;
  renderDoorVisualOnly();
  if (typeof renderLiveColorGlassPreview === 'function') renderLiveColorGlassPreview('dr');
}

function renderDoorVisualOnly() {
  var prevBox = document.getElementById('dr_door_visual_preview');
  if (!prevBox) return;
  var rowsEl = document.getElementById('dr_rows');
  var numRows = rowsEl ? Math.max(1, Math.min(6, parseInt(rowsEl.value) || 2)) : 2;
  ensureDrRowConfigsCount(numRows);

  var palla = (document.getElementById('dr_palla') && document.getElementById('dr_palla').value === '1') ? 1 : 2;
  var raw_h = safeEval(document.getElementById('dr_h') ? document.getElementById('dr_h').value : '84') || 84;
  var raw_w = safeEval(document.getElementById('dr_w') ? document.getElementById('dr_w').value : (palla === 2 ? '48' : '36')) || (palla === 2 ? 48 : 36);
  var is_mm = document.getElementById('dr_unit') && document.getElementById('dr_unit').value.indexOf('Millimeter') !== -1;
  var h_in = is_mm ? (raw_h / 25.4) : raw_h;
  var w_in = is_mm ? (raw_w / 25.4) : raw_w;

  var vert_w = parseFloat(document.getElementById('dr_vert_w') ? document.getElementById('dr_vert_w').value : 1.75) || 1.75;
  var top_h = parseFloat(document.getElementById('dr_top_h') ? document.getElementById('dr_top_h').value : 2.5) || 2.5;
  var bot_h = parseFloat(document.getElementById('dr_bot_h') ? document.getElementById('dr_bot_h').value : 4.0) || 4.0;
  var mid_h = parseFloat(document.getElementById('dr_mid_h') ? document.getElementById('dr_mid_h').value : 2.5) || 2.5;

  var door_v = Math.max(24, h_in - 1.75);
  var leaf_w = (palla === 2) ? Math.max(12, (w_in - 3.25) / 2.0) : Math.max(14, w_in - 3.25);
  var rail_w = Math.max(6, leaf_w - (2 * vert_w));
  var panel_w = rail_w + 0.75;

  var total_open_h = Math.max(12, door_v - top_h - bot_h - ((numRows - 1) * mid_h));
  var rowHeights = resolveRowHeightsGeneric(dr_row_configs, total_open_h, numRows);

  var html = '<div style="font-size:0.72rem; font-weight:800; color:#334155; margin-bottom:6px; display:flex; justify-content:space-between; flex-wrap:wrap; gap:4px;">';
  html += '<span>LIVE ' + (palla === 2 ? 'DOUBLE DOOR' : 'SINGLE DOOR') + ' DESIGN (' + numRows + (numRows === 1 ? ' Part' : ' Parts') + ')</span>';
  html += '<span style="color:#0284c7;">Proportional Heights Shown</span>';
  html += '</div>';

  html += '<div style="display:grid; grid-template-columns: repeat(' + palla + ', 1fr); gap:6px; max-width:' + (palla === 2 ? '340px' : '210px') + '; margin:0 auto; background:#1e293b; padding:7px; border-radius:8px; border:2px solid #475569;">';
  for (var p = 0; p < palla; p++) {
    html += '<div style="display:flex; flex-direction:column; gap:4px; background:#64748b; padding:5px; border-radius:5px;">';
    for (var r = numRows - 1; r >= 0; r--) {
      var cfg = dr_row_configs[r];
      var st = getMatButtonStyle(cfg.mat);
      var cutH = Math.max(2, rowHeights[r] + 0.75);
      var minPx = Math.max(26, Math.round((rowHeights[r] / total_open_h) * 140));
      var meshBg = (cfg.mat === 'JALI')
        ? 'repeating-linear-gradient(45deg, rgba(16,185,129,0.22) 0, rgba(16,185,129,0.22) 2px, #ecfdf5 2px, #ecfdf5 6px), repeating-linear-gradient(-45deg, rgba(6,95,70,0.22) 0, rgba(6,95,70,0.22) 2px, transparent 2px, transparent 6px)'
        : st.boxBg;
      html += '<div onclick="toggleDrRowMaterial(' + r + ')" style="background:' + meshBg + '; color:' + st.boxFg + '; border:1.5px solid ' + st.boxBd + '; border-radius:4px; min-height:' + minPx + 'px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:4px 3px; font-size:0.68rem; font-weight:800; text-align:center; cursor:pointer;">';
      html += '<div>' + st.shortLbl + '</div>';
      html += '<div style="font-size:0.61rem; color:#0f172a;">' + toFractionInch(cutH) + ' x ' + toFractionInch(panel_w) + '</div>';
      html += '</div>';
    }
    html += '</div>';
  }
  html += '</div>';
  prevBox.innerHTML = html;
}


// =========================================================================
// 4'x8' (48" x 96") SHEET 2"-8" WASTE OPTIMIZER, 2D PACKER & LABOUR DRAWING ENGINE
// =========================================================================

// Evaluates how cleanly a panel (pH x pW) cuts from a 48"x96" sheet so edge trim is <= 8" (never ~12" 1-ft waste!)
function scoreAcpCutWaste(pH, pW) {
  var bestScore = 999;
  var orientations = [
    { w48: pW, l96: pH, rotated: false },
    { w48: pH, l96: pW, rotated: true }
  ];
  orientations.forEach(function(o) {
    if (o.w48 > 48.0 || o.l96 > 96.0) return;
    var nx = Math.max(1, Math.floor(48.0 / o.w48));
    var ny = Math.max(1, Math.floor(96.0 / o.l96));
    var remW = 48.0 - (nx * o.w48);
    var remL = 96.0 - (ny * o.l96);

    // Penalty if remainder is in the awkward 8.25" .. 21.5" (~1 foot) unusable range
    var penW = (remW > 8.0 && remW < 22.0) ? (40.0 + remW) : remW;
    // Note: if remL >= 23.5" (e.g. 24" = 2'x4' reusable block), it is reusable!
    var penL = (remL > 8.0 && remL < 22.0) ? (50.0 + remL) : (remL >= 23.5 ? (Math.abs(remL - 24.0) * 0.5) : remL);

    // Prefer 2" to 8" waste along the cut edges
    var totalPen = penL + (penW * 0.5) - (nx * ny * 3.0);
    if (totalPen < bestScore) bestScore = totalPen;
  });
  return bestScore;
}

// Finds the best Bottom ACP clear opening height (bottom_h) so Top Glass >= 12.25" (1 ft) AND ACP waste is within 2"-8"
function findBestPartitionHeights(total_open_h, cut_w, panel_mode) {
  var MIN_TOP_OPEN = 12.25; // Guarantees Top Glass cut >= 12.0" (1 Foot)
  var bottom_h = 30.0, mid_h = 36.0, top_h = 14.0;

  if (panel_mode === "CUSTOM_BOTTOM_3FT") {
    bottom_h = 36.0;
  } else if (panel_mode === "CUSTOM_BOTTOM_2.5FT") {
    // 31.0" clear -> 30.75" cut -> 3 pcs = 92.25" out of 96" -> only 3.75" waste (within 2"-8"!)
    bottom_h = 31.0;
  } else if (panel_mode === "CUSTOM_BOTTOM_2FT") {
    // 23.75" clear -> 23.5" cut -> 2 pcs = 47" out of 48" (1" waste) or 4 pcs = 94" out of 96" (2" waste!)
    bottom_h = 23.75;
  } else {
    // OPTIMIZED_4X8: Search candidate bottom_h values (in 0.5" steps) that leave >= 12.25" Top Glass and minimize 1-ft waste
    var candidates = [23.5, 24.0, 30.0, 30.5, 31.0, 31.5, 32.0, 36.0];
    var bestCand = 31.0;
    var bestCandScore = 9999;
    candidates.forEach(function(cand) {
      var remGlass = total_open_h - cand;
      if (remGlass < (MIN_TOP_OPEN + 20.0)) return; // Ensure enough room for Middle Glass + 12.25" Top Glass
      var cutH = cand - 0.25;
      var sc = scoreAcpCutWaste(cutH, cut_w);
      // Prefer standard waist height around 30"-32" when wall is tall enough
      if (total_open_h >= 74.0 && cand < 29.0) sc += 8.0;
      if (sc < bestCandScore) {
        bestCandScore = sc;
        bestCand = cand;
      }
    });
    bottom_h = bestCand;
  }

  // Now compute Middle Glass (mid_h) and Top Header Glass (top_h >= 12.25")
  var rem = total_open_h - bottom_h;
  if (rem < (MIN_TOP_OPEN + 18.0)) {
    // Wall is short: scale bottom_h down to 23.5" so Top Glass stays >= 12.25"
    bottom_h = Math.min(bottom_h, 23.5);
    rem = total_open_h - bottom_h;
  }

  // Also check if Middle Glass height can avoid 1-ft waste on glass slabs (multiples of 6" minus 0.25" or clean 30"/36"/42")
  var preferredMidCuts = [35.75, 29.75, 41.75, 33.75, 27.75, 23.75];
  var chosenMid = 0;
  for (var i = 0; i < preferredMidCuts.length; i++) {
    var mClear = preferredMidCuts[i] + 0.25;
    var tClear = rem - mClear;
    if (tClear >= MIN_TOP_OPEN && tClear <= 22.0) {
      chosenMid = mClear;
      break;
    }
  }
  if (chosenMid > 0) {
    mid_h = chosenMid;
    top_h = rem - mid_h;
  } else {
    top_h = Math.max(MIN_TOP_OPEN, Math.min(18.25, rem * 0.30));
    mid_h = rem - top_h;
  }

  return { bottom_h: bottom_h, mid_h: mid_h, top_h: top_h };
}

// Packs a list of ACP cut panels (including multi-row Bottom ACP + Top ACP of different sizes!) onto 4'x8' (96" x 48") sheets
function packPanelsOn4x8Sheets(acpList) {
  var allPieces = [];
  (acpList || []).forEach(function(grp) {
    var h = Math.max(1, Number(grp.h_in) || 0);
    var w = Math.max(1, Number(grp.w_in) || 0);
    var q = Math.max(1, parseInt(grp.qty) || 1);
    var tag = grp.rowTag || 'ACP';
    for (var i = 0; i < q; i++) {
      allPieces.push({
        h: h,
        w: w,
        tag: tag,
        cutStr: grp.cutStr || (toFractionInch(h) + ' x ' + toFractionInch(w)),
        idx: allPieces.length + 1
      });
    }
  });

  if (allPieces.length === 0) return [];

  // Sort pieces largest area first so main panels place first and smaller Top ACP panels nest into the remaining spaces!
  allPieces.sort(function(a, b) { return (b.h * b.w) - (a.h * a.w); });

  var SHEET_L = 96.0;
  var SHEET_W = 48.0;
  var sheets = [];
  var remaining = allPieces.slice();

  while (remaining.length > 0) {
    var placed = [];
    // Maintain a list of free rectangular spaces on this 96" x 48" sheet
    var freeRects = [{ x: 0, y: 0, w: SHEET_L, h: SHEET_W }];

    var madeProgress = true;
    while (madeProgress && remaining.length > 0) {
      madeProgress = false;
      for (var i = 0; i < remaining.length; i++) {
        var pc = remaining[i];
        var bestRectIdx = -1;
        var bestRot = false;
        var bestScore = 999999;

        for (var f = 0; f < freeRects.length; f++) {
          var fr = freeRects[f];
          // Try Normal (pc.h along X, pc.w along Y) and Rotated (pc.w along X, pc.h along Y)
          var tries = [
            { dx: pc.h, dy: pc.w, rot: false },
            { dx: pc.w, dy: pc.h, rot: true }
          ];
          for (var t = 0; t < tries.length; t++) {
            var tr = tries[t];
            if (tr.dx <= fr.w + 0.01 && tr.dy <= fr.h + 0.01) {
              var remX = fr.w - tr.dx;
              var remY = fr.h - tr.dy;
              // Prefer orientations where remainder is either <= 8" (small trim) or big enough (>= 12") to fit another piece!
              var penX = (remX > 8.0 && remX < 12.0) ? 50 : 0;
              var penY = (remY > 8.0 && remY < 12.0) ? 50 : 0;
              var score = (fr.x * 10) + fr.y + penX + penY;
              if (score < bestScore) {
                bestScore = score;
                bestRectIdx = f;
                bestRot = tr.rot;
              }
            }
          }
        }

        if (bestRectIdx !== -1) {
          var chosenFr = freeRects.splice(bestRectIdx, 1)[0];
          var useDx = bestRot ? pc.w : pc.h;
          var useDy = bestRot ? pc.h : pc.w;

          placed.push({
            pieceNum: pc.idx,
            tag: pc.tag,
            x: chosenFr.x,
            y: chosenFr.y,
            w: useDx,
            h: useDy,
            cutStr: pc.cutStr,
            dimXStr: toFractionInch(useDx),
            dimYStr: toFractionInch(useDy)
          });

          // Split chosenFr into two remaining free rectangles (Guillotine split)
          var rightW = chosenFr.w - useDx;
          var botH = chosenFr.h - useDy;

          // Split along the axis that leaves the largest usable rectangle for remaining pieces
          if (botH >= 4.0) {
            freeRects.push({ x: chosenFr.x, y: chosenFr.y + useDy, w: useDx, h: botH });
          }
          if (rightW >= 4.0) {
            freeRects.push({ x: chosenFr.x + useDx, y: chosenFr.y, w: rightW, h: chosenFr.h });
          }

          remaining.splice(i, 1);
          madeProgress = true;
          break;
        }
      }
    }

    // Safety fallback if a piece is larger than 96" x 48"
    if (placed.length === 0 && remaining.length > 0) {
      var huge = remaining.shift();
      var ux = Math.min(SHEET_L, Math.max(huge.h, huge.w));
      var uy = Math.min(SHEET_W, Math.min(huge.h, huge.w));
      placed.push({
        pieceNum: huge.idx,
        tag: huge.tag,
        x: 0,
        y: 0,
        w: ux,
        h: uy,
        cutStr: huge.cutStr,
        dimXStr: toFractionInch(ux),
        dimYStr: toFractionInch(uy)
      });
    }

    var maxRightX = 0, maxBotY = 0;
    placed.forEach(function(pr) {
      if (pr.x + pr.w > maxRightX) maxRightX = pr.x + pr.w;
      if (pr.y + pr.h > maxBotY) maxBotY = pr.y + pr.h;
    });

    var wasteRight = Math.max(0, SHEET_L - maxRightX);
    var wasteBot = Math.max(0, SHEET_W - maxBotY);
    var isHalfSheetOnly = (maxRightX <= 48.0);

    sheets.push({
      sheetNo: sheets.length + 1,
      sheetL: SHEET_L,
      sheetW: SHEET_W,
      placed: placed,
      maxRightX: maxRightX,
      maxBotY: maxBotY,
      wasteRight: wasteRight,
      wasteBot: wasteBot,
      isHalfSheetOnly: isHalfSheetOnly
    });
  }

  return sheets;
}

// Renders the Live Visual Sheet Cutting Drawing Box inside the App UI (SVG)
function renderSheetLayoutBoxUI(containerId, acpList, titleLabel) {
  var box = document.getElementById(containerId);
  if (!box) return;
  var sheets = packPanelsOn4x8Sheets(acpList);
  if (sheets.length === 0) {
    box.style.display = 'none';
    box.innerHTML = '';
    return;
  }

  box.style.display = 'block';
  var html = '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; border-bottom:1.5px solid #e2e8f0; padding-bottom:6px;">';
  html += '<div style="font-size:0.82rem; font-weight:800; color:#0f172a;"><i class="fa-solid fa-compass-drafting" style="color:#be123c;"></i> 4x8 ACP SHEET CUTTING LABOUR DRAWING (' + sheets.length + (sheets.length === 1 ? ' SHEET' : ' SHEETS') + ')</div>';
  html += '<span style="font-size:0.7rem; font-weight:800; background:#ffe4e6; color:#be123c; padding:2px 7px; border-radius:6px;">96" x 48" Board</span>';
  html += '</div>';

  sheets.forEach(function(sh) {
    var badgeTxt = sh.isHalfSheetOnly ? 'Fits in Half Sheet (4x4 / 48"x48")' : 'Full 4x8 Sheet (96" x 48")';
    html += '<div style="margin-bottom:12px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:8px; padding:8px;">';
    html += '<div style="display:flex; justify-content:space-between; align-items:center; font-size:0.76rem; font-weight:800; color:#1e3a8a; margin-bottom:6px;">';
    html += '<span>SHEET #' + sh.sheetNo + ' CUTTING LAYOUT (' + sh.placed.length + ' Pcs)</span>';
    html += '<span style="color:#0f766e;">' + badgeTxt + '</span>';
    html += '</div>';

    // Responsive SVG representing 96" x 48" (2:1 aspect ratio)
    var svgW = 480, svgH = 240;
    var scale = 5.0; // 96 * 5 = 480, 48 * 5 = 240
    html += '<svg viewBox="0 0 ' + (svgW + 20) + ' ' + (svgH + 28) + '" style="width:100%; height:auto; background:#ffffff; border:1px solid #94a3b8; border-radius:6px;">';

    // Outer 96" x 48" sheet background (Waste/Offcut area shaded light amber/grey)
    html += '<rect x="10" y="18" width="' + svgW + '" height="' + svgH + '" fill="#fef3c7" stroke="#0f172a" stroke-width="2"/>';

    // Top & Left board dimension labels
    html += '<text x="' + (10 + svgW / 2) + '" y="13" font-size="11" font-weight="bold" fill="#0f172a" text-anchor="middle">8 Feet / 96" Sheet Length</text>';

    // Draw each placed ACP piece
    sh.placed.forEach(function(p) {
      var rx = 10 + (p.x * scale);
      var ry = 18 + (p.y * scale);
      var rw = p.w * scale;
      var rh = p.h * scale;
      html += '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="' + rh + '" fill="#dbeafe" stroke="#1d4ed8" stroke-width="1.8" stroke-dasharray="none"/>';
      var cx = rx + rw / 2;
      var cy = ry + rh / 2;
      html += '<text x="' + cx + '" y="' + (cy - 5) + '" font-size="11" font-weight="bold" fill="#1e3a8a" text-anchor="middle">ACP #' + p.pieceNum + '</text>';
      html += '<text x="' + cx + '" y="' + (cy + 9) + '" font-size="10" font-weight="bold" fill="#0f172a" text-anchor="middle">' + p.dimXStr + ' x ' + p.dimYStr + '</text>';
    });

    // Draw Half-Sheet (48") center line if it fits in Half Sheet
    if (sh.isHalfSheetOnly) {
      var hx = 10 + (48.0 * scale);
      html += '<line x1="' + hx + '" y1="18" x2="' + hx + '" y2="' + (18 + svgH) + '" stroke="#dc2626" stroke-width="2" stroke-dasharray="5,4"/>';
      html += '<text x="' + (hx + 6) + '" y="36" font-size="10" font-weight="bold" fill="#dc2626">4x4 Half Cut Line</text>';
    }

    // Label Right Waste / Offcut strip if >= 0.5"
    if (sh.wasteRight >= 0.5) {
      var wx = 10 + (sh.maxRightX * scale) + (sh.wasteRight * scale / 2);
      var wy = 18 + (sh.maxBotY * scale / 2);
      var wLabel = sh.wasteRight >= 23.5 ? ('Reusable: ' + toFractionInch(sh.wasteRight) + ' x 48"') : ('Trim: ' + toFractionInch(sh.wasteRight));
      html += '<text x="' + wx + '" y="' + wy + '" font-size="10" font-weight="bold" fill="#92400e" text-anchor="middle">' + wLabel + '</text>';
    }

    // Label Bottom Waste / Offcut strip if >= 0.5"
    if (sh.wasteBot >= 0.5) {
      var bwx = 10 + (sh.maxRightX * scale / 2);
      var bwy = 18 + (sh.maxBotY * scale) + (sh.wasteBot * scale / 2) + 4;
      html += '<text x="' + bwx + '" y="' + bwy + '" font-size="10" font-weight="bold" fill="#92400e" text-anchor="middle">Bottom Trim: ' + toFractionInch(sh.wasteBot) + ' x ' + toFractionInch(sh.maxRightX) + '</text>';
    }

    html += '</svg>';
    html += '<div style="font-size:0.72rem; color:#334155; margin-top:4px; display:flex; justify-content:space-between; flex-wrap:wrap;">';
    html += '<span><b>Cut Size:</b> ' + (sh.placed[0] ? sh.placed[0].cutStr : '') + '</span>';
    html += '<span style="color:#b45309; font-weight:700;">Edge Trim: ' + toFractionInch(sh.wasteRight) + ' (Length) | ' + toFractionInch(sh.wasteBot) + ' (Width)</span>';
    html += '</div>';
    html += '</div>';
  });

  var modPfx = (containerId.indexOf('dr_') === 0) ? 'dr' : 'pt';
  html += '<div style="display:grid; grid-template-columns: 1fr 1fr; gap:6px; margin-top:6px;">';
  html += '<button type="button" onclick="instantPrintChartOffcutQr(\'' + modPfx + '\')" style="background:#16a34a; color:#ffffff; border:none; border-radius:8px; padding:10px 6px; font-size:0.76rem; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:5px;">';
  html += '<i class="fa-solid fa-print"></i> <span>1-CLICK THERMAL QR PRINT</span>';
  html += '</button>';
  html += '<button type="button" onclick="saveSheetOffcutsToQrStock(\'' + modPfx + '\')" style="background:#d97706; color:#ffffff; border:none; border-radius:8px; padding:10px 6px; font-size:0.76rem; font-weight:800; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:5px;">';
  html += '<i class="fa-solid fa-qrcode"></i> <span>VIEW QR STOCK</span>';
  html += '</button>';
  html += '</div>';
  box.innerHTML = html;
}

// 5. DEDICATED SHEET CUTTING DRAWING PDF (Visual Diagrams Only: Sheet #1, Sheet #2...)
function exportSheetLayoutPdf(filename, title, acpList) {
  if (!isAppActivated()) {
    alert("PRO activation is required to generate PDF documents.");
    openScreen('activation', 'PRO UPGRADE & PLANS');
    return;
  }

  var stockDim = (typeof getSelectedGlassStockSheetDims === 'function' && filename.indexOf('Glass') !== -1)
    ? getSelectedGlassStockSheetDims()
    : { sL: 96.0, sW: 48.0, label: '4\'x8\' (96" x 48")' };

  var sheets = (typeof packGlassPanelsMinWaste === 'function')
    ? packGlassPanelsMinWaste(acpList, stockDim.sL, stockDim.sW)
    : packPanelsOn4x8Sheets(acpList);

  if (sheets.length === 0) {
    alert("No Sheet panels calculated yet! Please calculate Glass or ACP Sheet first.");
    return;
  }

  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) {
    alert("PDF library is loading, please try again in a moment.");
    return;
  }

  // Build QR payload for this Sheet Drawing order
  var sheetDict = {};
  (acpList || []).forEach(function(itm, idx) {
    var cutS = itm.cutStr || (toFractionInch(itm.h_in) + ' x ' + toFractionInch(itm.w_in));
    var rTag = itm.rowTag || ('G' + (idx + 1));
    var sp = itm.spec || '5 mm Clear';
    var k = cutS + ' (' + rTag + ') || ' + sp;
    sheetDict[k] = (sheetDict[k] || 0) + (itm.qty || 1);
  });
  var sheetCodeVal = (Math.round(stockDim.sL) + 'x' + Math.round(stockDim.sW));
  var orderQrPayload = (typeof buildGlassOrderQrPayload === 'function')
    ? buildGlassOrderQrPayload(title, sheetDict, sheetCodeVal)
    : '';
  if (orderQrPayload) window.lastGeneratedGlassOrderCode = orderQrPayload;

  var doc = new jsPDF('l', 'mm', 'a4');
  var today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});

  sheets.forEach(function(sh, idx) {
    if (idx > 0) doc.addPage('a4', 'l');

    drawDocHeaderWithLogo(doc, "4'x8' SHEET CUTTING LABOUR DRAWING - SHEET #" + sh.sheetNo, title, [190, 18, 60]);

    // Info Bar
    doc.setFillColor(255, 241, 242);
    doc.rect(14, 32, 269, 7, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(159, 18, 57);
    var modeTxt = sh.isHalfSheetOnly ? 'HALF SHEET NEEDED (4x4 / 48" x 48")' : 'FULL SHEET (' + Math.round(sh.sheetL) + '" x ' + Math.round(sh.sheetW) + '")';
    doc.text("SHEET #" + sh.sheetNo + " OF " + sheets.length + "   |   BOARD: " + modeTxt + "   |   PIECES ON THIS SHEET: " + sh.placed.length + " PCS   |   DATE: " + today, 18, 36.8);

    var startX = 22.0;
    var startY = 48.0;
    var scaleMm = Math.min(220.0 / sh.sheetL, 114.0 / sh.sheetW);
    var boardW = sh.sheetL * scaleMm;
    var boardH = sh.sheetW * scaleMm;

    // Outer Sheet Rectangle
    doc.setFillColor(254, 243, 199);
    doc.setDrawColor(15, 23, 42);
    doc.setLineWidth(0.7);
    doc.rect(startX, startY, boardW, boardH, 'FD');

    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(15, 23, 42);
    doc.text('<---  ' + Math.round(sh.sheetL) + '" (' + (sh.sheetL/12).toFixed(0) + ' FT) FULL SHEET LENGTH  --->', startX + (boardW / 2), startY - 3, { align: "center" });
    doc.text(Math.round(sh.sheetW) + '"', startX - 2.5, startY + (boardH / 2), { align: "right" });

    sh.placed.forEach(function(p) {
      var rx = startX + (p.x * scaleMm);
      var ry = startY + (p.y * scaleMm);
      var rw = p.w * scaleMm;
      var rh = p.h * scaleMm;

      doc.setFillColor(219, 234, 254);
      doc.setDrawColor(29, 78, 216);
      doc.setLineWidth(0.5);
      doc.rect(rx, ry, rw, rh, 'FD');

      var cx = rx + (rw / 2);
      var cy = ry + (rh / 2);

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(30, 58, 138);
      doc.text((p.tag || "PANEL") + " #" + p.pieceNum, cx, cy - 2.5, { align: "center" });

      doc.setFontSize(9);
      doc.setTextColor(15, 23, 42);
      doc.text(p.dimXStr + " x " + p.dimYStr, cx, cy + 3, { align: "center" });
    });

    if (sh.isHalfSheetOnly) {
      var halfX = startX + ((sh.sheetL / 2.0) * scaleMm);
      doc.setDrawColor(220, 38, 38);
      doc.setLineWidth(0.6);
      doc.line(halfX, startY, halfX, startY + boardH);
      doc.setFontSize(9);
      doc.setTextColor(220, 38, 38);
      doc.text('HALF SHEET CUT LINE (' + Math.round(sh.sheetL / 2) + '")', halfX + 2.5, startY + 9);
    }

    if (sh.wasteRight >= 0.5) {
      var wx = startX + (sh.maxRightX * scaleMm) + ((sh.wasteRight * scaleMm) / 2);
      var wy = startY + ((sh.maxBotY * scaleMm) / 2);
      doc.setFontSize(9);
      doc.setTextColor(146, 64, 14);
      var rTitle = sh.wasteRight >= 18.0 ? "OFFCUT" : "TRIM";
      doc.text(rTitle, wx, wy - 2, { align: "center" });
      doc.text(toFractionInch(sh.wasteRight) + ' x ' + Math.round(sh.sheetW) + '"', wx, wy + 3, { align: "center" });
    }

    if (sh.wasteBot >= 0.5) {
      var bwx = startX + ((sh.maxRightX * scaleMm) / 2);
      var bwy = startY + (sh.maxBotY * scaleMm) + ((sh.wasteBot * scaleMm) / 2) + 1.5;
      doc.setFontSize(8.5);
      doc.setTextColor(146, 64, 14);
      doc.text("BOTTOM OFFCUT: " + toFractionInch(sh.wasteBot) + " x " + toFractionInch(sh.maxRightX), bwx, bwy, { align: "center" });
    }

    // Right-Side Scannable QR Box on the Sheet Drawing PDF for Glass Fabricator
    if (orderQrPayload && typeof generateQrMatrix === 'function') {
      var qrBoxX = startX + boardW + 5;
      var qrBoxY = startY;
      var qrBoxW = 283 - qrBoxX;
      if (qrBoxW >= 34) {
        doc.setFillColor(240, 249, 255);
        doc.setDrawColor(2, 132, 199);
        doc.setLineWidth(0.5);
        doc.roundedRect(qrBoxX, qrBoxY, qrBoxW, boardH, 2, 2, 'FD');

        doc.setFont("helvetica", "bold");
        doc.setFontSize(7.5);
        doc.setTextColor(3, 105, 161);
        doc.text("SCAN SHEET QR", qrBoxX + (qrBoxW / 2), qrBoxY + 6, { align: "center" });
        doc.setFontSize(6.5);
        doc.setTextColor(15, 118, 110);
        doc.text("(GLASS FABRICATOR)", qrBoxX + (qrBoxW / 2), qrBoxY + 10, { align: "center" });

        var qrMat = generateQrMatrix(orderQrPayload);
        var qrMm = Math.min(qrBoxW - 6, 32);
        var qx = qrBoxX + (qrBoxW - qrMm) / 2;
        var qy = qrBoxY + 13;
        doc.setFillColor(255, 255, 255);
        doc.rect(qx - 1, qy - 1, qrMm + 2, qrMm + 2, 'F');
        var n = qrMat.length;
        var cMm = qrMm / n;
        doc.setFillColor(15, 23, 42);
        for (var r = 0; r < n; r++) {
          for (var c = 0; c < n; c++) {
            if (qrMat[r][c]) doc.rect(qx + c * cMm, qy + r * cMm, cMm + 0.04, cMm + 0.04, 'F');
          }
        }

        doc.setFont("helvetica", "normal");
        doc.setFontSize(6.3);
        doc.setTextColor(30, 41, 59);
        var tipLines = doc.splitTextToSize("Scan in Smart Worker Pro -> Glass Cutting to auto-load all sizes & sheet chart!", qrBoxW - 4);
        doc.text(tipLines, qrBoxX + 2, qy + qrMm + 5);
      }
    }

    // Footer instruction box + Order Code
    var footY = startY + boardH + 6;
    doc.setFillColor(248, 250, 252);
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.3);
    doc.roundedRect(startX, footY, 261, 18, 2, 2, 'FD');

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    var firstCut = sh.placed[0] ? sh.placed[0].cutStr : "-";
    doc.text("SHEET #" + sh.sheetNo + " SUMMARY: Cut " + sh.placed.length + " Pcs (e.g. " + firstCut + ")  |  Used: " + sh.usedSqFt.toFixed(1) + " Sq.Ft / " + sh.sheetSqFt.toFixed(1) + " Sq.Ft", startX + 4, footY + 5.5);
    doc.setTextColor(180, 83, 9);
    doc.text("Remaining Right Offcut: " + toFractionInch(sh.wasteRight) + ' x ' + Math.round(sh.sheetW) + '"   |   Remaining Bottom Offcut: ' + toFractionInch(sh.wasteBot) + " x " + toFractionInch(sh.maxRightX), startX + 4, footY + 10.5);
    if (orderQrPayload) {
      doc.setFont("courier", "bold");
      doc.setFontSize(6.8);
      doc.setTextColor(15, 118, 110);
      var sId = generateShortGlassOrderId(orderQrPayload); doc.setFont("helvetica", "bold"); doc.setFontSize(9.5); doc.text("4-DIGIT GLASS ORDER CODE: " + sId + "  (Type in Glass Cutting -> ENTER 4-DIGIT CODE or Scan QR)", startX + 4, footY + 15.5);
    }
  });

  doc.save(filename + ".pdf");
}


function applyKhataSpecsToModule(prefix, itm) {
  if (!itm) return;
  if (itm.alu_thick && document.getElementById(prefix + '_alu_thick')) {
    document.getElementById(prefix + '_alu_thick').value = itm.alu_thick;
  }
  if (itm.alu_color && document.getElementById(prefix + '_alu_color')) {
    var sel = document.getElementById(prefix + '_alu_color');
    var customInp = document.getElementById(prefix + '_alu_custom_color');
    if (itm.alu_color.indexOf('Powder Coated (') === 0 && customInp) {
      sel.value = 'Custom Color...';
      customInp.style.display = 'block';
      customInp.value = itm.alu_color.replace('Powder Coated (', '').replace(/\)$/, '');
    } else {
      sel.value = itm.alu_color;
      if (customInp) customInp.style.display = 'none';
    }
  }
  if (itm.glass_thick && document.getElementById(prefix + '_g_thick')) {
    document.getElementById(prefix + '_g_thick').value = itm.glass_thick;
  }
  if (itm.glass_type && document.getElementById(prefix + '_g_type')) {
    var cleanGt = itm.glass_type.replace(' + ACP Board', '');
    document.getElementById(prefix + '_g_type').value = cleanGt;
  }
  if (prefix === 'pt' && itm.category) {
    var c = itm.category;
    var presetEl = document.getElementById('pt_tube_preset');
    if (presetEl) {
      if (c.indexOf('2x1') !== -1) presetEl.value = '2x1_edge';
      else if (c.indexOf('1.75x1.75') !== -1) presetEl.value = '1.75x1.75';
      else if (c.indexOf('3x1.5') !== -1) presetEl.value = '3x1.5_edge';
      else if (c.indexOf('4x1.75') !== -1) presetEl.value = '4x1.75_base';
      else presetEl.value = '2.5x1.5_edge';
      applyPartitionTubePreset(presetEl.value);
    }
    var pmEl = document.getElementById('pt_panel_mode');
    if (pmEl) {
      if (c.indexOf('Full Glass') !== -1 && (!itm.glass_type || itm.glass_type.indexOf('ACP') === -1)) {
        pmEl.value = 'EQUAL_DIVIDE';
      } else {
        pmEl.value = 'OPTIMIZED_4X8';
      }
    }
  }
}


// =========================================================================
// DIRECT 1-CLICK SEND CALCULATOR ITEM TO BILL (WITH ALU & GLASS SPECS)
// =========================================================================
function sendModuleToBill(prefix) {
  var raw_h = safeEval(document.getElementById(prefix + '_h') ? document.getElementById(prefix + '_h').value : '0');
  var raw_w = safeEval(document.getElementById(prefix + '_w') ? document.getElementById(prefix + '_w').value : '0');
  if (raw_h <= 0 || raw_w <= 0) {
    alert("Please enter Height and Width first, then tap + ADD TO BILL.");
    return;
  }

  var unitSel = document.getElementById(prefix + '_unit');
  var is_mm = unitSel && unitSel.value.indexOf('Millimeter') !== -1;
  var h_in = is_mm ? (raw_h / 25.4) : raw_h;
  var w_in = is_mm ? (raw_w / 25.4) : raw_w;
  var h_ft = Number((h_in / 12.0).toFixed(2));
  var w_ft = Number((w_in / 12.0).toFixed(2));
  var sq_ft_one = (h_in * w_in) / 144.0;

  var qtyEl = document.getElementById(prefix + '_qty');
  var qty = qtyEl ? Math.max(1, parseInt(safeEval(qtyEl.value)) || 1) : 1;
  var locEl = document.getElementById(prefix + '_loc');
  var loc = locEl ? locEl.value.trim() : '';

  var aluColor = getModuleAluColor(prefix);
  var aluThick = getModuleAluThick(prefix);
  var gThickEl = document.getElementById(prefix + '_g_thick');
  var gTypeEl = document.getElementById(prefix + '_g_type');
  var gThick = gThickEl ? gThickEl.value.trim() : '5 mm';
  var gType = gTypeEl ? gTypeEl.value.trim() : 'Clear';

  var itemType = 'Aluminium Work';
  if (prefix === 'dm') {
    var dmTrack = document.getElementById('dm_type') ? document.getElementById('dm_type').value.split(' ')[0] : '2-Track';
    var dmHan = document.getElementById('dm_handle_hw') ? document.getElementById('dm_handle_hw').value.split(' ')[0] : '27x65';
    itemType = 'Domal ' + dmHan + ' (' + dmTrack + ')';
  } else if (prefix === 'sl') {
    var slSys = document.getElementById('sl_sys') ? document.getElementById('sl_sys').value.replace(' System', '') : '18x40';
    var slTrk = document.getElementById('sl_type') ? document.getElementById('sl_type').value : '2-Track';
    itemType = 'Sliding ' + slSys + ' (' + slTrk + ')';
  } else if (prefix === 'cc') {
    var ccSer = document.getElementById('cc_series') ? document.getElementById('cc_series').value : '40 Series';
    itemType = 'Casement ' + ccSer;
  } else if (prefix === 'dr') {
    var drType = document.getElementById('dr_type') ? document.getElementById('dr_type').value : 'Standard Door';
    var hasMid = document.getElementById('dr_has_mid') ? (document.getElementById('dr_has_mid').value === 'yes') : true;
    if (drType !== 'Domal System Door' && hasMid && gType.indexOf('ACP') === -1) {
      gType = gType + ' + Bottom ACP Board';
    }
    itemType = drType;
  } else if (prefix === 'pt') {
    var ptType = document.getElementById('pt_type') ? document.getElementById('pt_type').value : 'Fixed Partition';
    var tubeLbl = getPartitionTubeLabel();
    var pMode = document.getElementById('pt_panel_mode') ? document.getElementById('pt_panel_mode').value : 'OPTIMIZED_4X8';
    if (pMode !== 'EQUAL_DIVIDE' && gType.indexOf('ACP') === -1) {
      gType = gType + ' + Bottom ACP Board';
    }
    itemType = ptType + ' (' + tubeLbl + ')';
  }

  var isTough = gType.indexOf('Toughened') !== -1;
  var rate = calculateSuggestedRate(itemType, aluThick, aluColor, gThick, gType, isTough);
  var totalArea = sq_ft_one * qty;
  var totalPrice = totalArea * rate;

  billItems.push({
    type: itemType,
    location: loc,
    color: aluColor,
    thickness: aluThick,
    glass_thick: gThick,
    glass_type: gType,
    toughened: isTough,
    h: h_ft,
    w: w_ft,
    unit: 'ft',
    qty: qty,
    rate: rate,
    area: totalArea,
    price: totalPrice
  });

  // Also sync the Quotation screen selectors to match what the user selected
  if (document.getElementById('q_thick')) document.getElementById('q_thick').value = aluThick;
  if (document.getElementById('q_g_thick')) document.getElementById('q_g_thick').value = gThick;

  refreshQueueText();
  autoCalcAdvance();
  openScreen('quotation', 'PRO QUOTATION');
}


var dr_acp_list = [];
var pt_acp_list = [];

function applyPartitionTubePreset(preset) {
  var faceEl = document.getElementById('pt_tube_face');
  var botEl = document.getElementById('pt_bot_face');
  if (!faceEl || !botEl) return;
  if (preset === '2.5x1.5_edge') { faceEl.value = '1.5'; botEl.value = '1.5'; }
  else if (preset === '2.5x1.5_flat') { faceEl.value = '2.5'; botEl.value = '2.5'; }
  else if (preset === '2x1_edge') { faceEl.value = '1.0'; botEl.value = '1.0'; }
  else if (preset === '2x1_flat') { faceEl.value = '2.0'; botEl.value = '2.0'; }
  else if (preset === '1.75x1.75') { faceEl.value = '1.75'; botEl.value = '1.75'; }
  else if (preset === '3x1.5_edge') { faceEl.value = '1.5'; botEl.value = '1.5'; }
  else if (preset === '4x1.75_base') { faceEl.value = '1.75'; botEl.value = '4.0'; }
  else if (preset === '4x1.5_base') { faceEl.value = '1.5'; botEl.value = '4.0'; }
  else if (preset === '4x1.75_all') { faceEl.value = '4.0'; botEl.value = '4.0'; }
  else if (preset === '2x2') { faceEl.value = '2.0'; botEl.value = '2.0'; }
}

function getPartitionTubeLabel() {
  var sel = document.getElementById('pt_tube_preset');
  var face = parseFloat(document.getElementById('pt_tube_face') ? document.getElementById('pt_tube_face').value : 1.5) || 1.5;
  var bot = parseFloat(document.getElementById('pt_bot_face') ? document.getElementById('pt_bot_face').value : 1.5) || 1.5;
  if (!sel) return '2.5"x1.5"';
  var v = sel.value;
  if (v.indexOf('2.5x1.5') === 0) return '2.5"x1.5"';
  if (v.indexOf('2x1') === 0) return '2"x1"';
  if (v === '1.75x1.75') return '1.75"x1.75"';
  if (v.indexOf('3x1.5') === 0) return '3"x1.5"';
  if (v.indexOf('4x1.75') === 0) return '4"x1.75"';
  if (v.indexOf('4x1.5') === 0) return '4"x1.5"';
  if (v === '2x2') return '2"x2"';
  return 'Tube (' + face + '" Face, ' + bot + '" Base)';
}


// =========================================================================
// SIMPLE GLASS SPEC HELPER & 4'x8' ACP BOARD CALCULATOR
// =========================================================================
function toggleCustomAluColor(prefix) {
  setTimeout(function() { try { renderLiveColorGlassPreview(prefix); } catch(e){} }, 10);
  var selId = (prefix === 'q') ? 'q_color' : (prefix + '_alu_color');
  var inpId = prefix + '_alu_custom_color';
  var sel = document.getElementById(selId);
  var inp = document.getElementById(inpId);
  if (!sel || !inp) return;
  if (sel.value === 'Custom Color...') {
    inp.style.display = 'block';
    inp.focus();
  } else {
    inp.style.display = 'none';
  }
}

function getModuleAluColor(prefix) {
  var selId = (prefix === 'q') ? 'q_color' : (prefix + '_alu_color');
  var inpId = prefix + '_alu_custom_color';
  var sel = document.getElementById(selId);
  var inp = document.getElementById(inpId);
  var val = sel ? sel.value.trim() : 'Powder Coated Black';
  if (val === 'Custom Color...') {
    var customVal = (inp && inp.value.trim()) ? inp.value.trim() : 'Custom Powder Color';
    return 'Powder Coated (' + customVal + ')';
  }
  return val;
}

function getModuleAluThick(prefix) {
  var selId = (prefix === 'q') ? 'q_thick' : (prefix + '_alu_thick');
  var sel = document.getElementById(selId);
  return sel ? sel.value.trim() : '1.2 mm';
}

function getModuleAluLabel(prefix) {
  return getModuleAluThick(prefix) + ' | ' + getModuleAluColor(prefix);
}

function getModuleGlassLabel(prefix) {
  var tEl = document.getElementById(prefix + '_g_thick');
  var gEl = document.getElementById(prefix + '_g_type');
  var thick = tEl ? tEl.value.trim() : '5 mm';
  var gtype = gEl ? gEl.value.trim() : 'Clear';
  return thick + ' ' + gtype;
}

function calcAcp4x8Requirement(panel_h_in, panel_w_in, qty) {
  var h = Math.max(1, Number(panel_h_in) || 0);
  var w = Math.max(1, Number(panel_w_in) || 0);
  var n = Math.max(1, parseInt(qty) || 1);
  var sheetW = 48.0, sheetH = 96.0;

  // Check both orientations on a 48" x 96" (4'x8') ACP board
  var fit1 = Math.floor(sheetW / w) * Math.floor(sheetH / h);
  var fit2 = Math.floor(sheetW / h) * Math.floor(sheetH / w);
  var pcsPerSheet = Math.max(1, fit1, fit2);

  // Also check if all pieces fit inside a Half Sheet (4'x4' = 48" x 48")
  var halfFit1 = Math.floor(48.0 / w) * Math.floor(48.0 / h);
  var halfFit2 = Math.floor(48.0 / h) * Math.floor(48.0 / w);
  var pcsPerHalf = Math.max(halfFit1, halfFit2);

  var totalAreaSqFt = (h * w * n) / 144.0;
  var sheetsNeeded = Math.ceil(n / pcsPerSheet);
  var buyLabel = sheetsNeeded + (sheetsNeeded === 1 ? " Full Sheet (4'x8')" : " Full Sheets (4'x8')");
  var boughtAreaSqFt = sheetsNeeded * 32.0;

  if (n <= pcsPerHalf && pcsPerHalf >= 1) {
    buyLabel = "0.5 Sheet (4'x4' Half Board)";
    boughtAreaSqFt = 16.0;
  } else if (sheetsNeeded > 1 && ((n % pcsPerSheet) > 0) && ((n % pcsPerSheet) <= pcsPerHalf)) {
    buyLabel = (sheetsNeeded - 1) + ".5 Sheets (" + (sheetsNeeded - 1) + " Full + 1 Half 4'x4' Board)";
    boughtAreaSqFt = ((sheetsNeeded - 1) * 32.0) + 16.0;
  }

  var offcutSqFt = Math.max(0, boughtAreaSqFt - totalAreaSqFt);
  return {
    pcsPerSheet: pcsPerSheet,
    sheetsNeeded: sheetsNeeded,
    totalAreaSqFt: totalAreaSqFt,
    offcutSqFt: offcutSqFt,
    buyLabel: buyLabel
  };
}

// =========================================================================
// GOOGLE SHEETS AUTO-SYNC ENGINE
// =========================================================================
function getGoogleSheetSyncUrl() {
  return (localStorage.getItem('sw_gsheet_sync_url') || '').trim();
}

function configureGoogleSheetSync() {
  var current = getGoogleSheetSyncUrl();
  var nextUrl = prompt(
    "Enter your Google Apps Script Web App URL (ends with /exec) to auto-sync Bills, Measurements, Payments & Customers to Google Sheets:",
    current
  );
  if (nextUrl === null) return;
  nextUrl = nextUrl.trim();
  localStorage.setItem('sw_gsheet_sync_url', nextUrl);
  if (nextUrl) {
    alert("Google Sheets Auto-Sync URL saved!");
  } else {
    alert("Google Sheets Auto-Sync URL cleared.");
  }
}

function syncToGoogleSheet(sheetName, rowArray) {
  var url = getGoogleSheetSyncUrl();
  if (!url) return;
  try {
    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ sheet: sheetName, row: rowArray })
    }).catch(function(){});
  } catch (e) {}
}


// ========================================================
// GLASS BILLING SLAB SAFE-GUARD ENGINE (6-INCH / 1-FOOT SLAB PROTECTOR)
// Prevents glass shops from jumping to next 6-inch slab for +1 suta!
// ========================================================
function safeGlassSlabCap(dim) {
  dim = parseFloat(dim) || 0;
  if (dim <= 0) return { cut: 0, slab: 0, savedPenalty: false };

  // Standard retail billing slabs in inches (multiples of 6" / 0.5 ft)
  var slabs = [12.0, 18.0, 24.0, 30.0, 36.0, 42.0, 48.0, 54.0, 60.0, 66.0, 72.0, 78.0, 84.0, 90.0, 96.0];

  for (var i = 0; i < slabs.length; i++) {
    var s = slabs[i];
    // If dimension is up to 0.5" (4 sutas) over a slab boundary (e.g. 30.125", 36.125", 24.125")
    if (dim > s && dim <= s + 0.5) {
      // Cap strictly at (slab - 0.25) so it fits into beading and stays inside the lower slab!
      return { cut: s - 0.25, slab: s, savedPenalty: true };
    } else if (dim <= s) {
      return { cut: dim, slab: s, savedPenalty: false };
    }
  }

  return { cut: dim, slab: Math.ceil(dim / 6.0) * 6.0, savedPenalty: false };
}


// ========================================================
// UNIVERSAL PROFESSIONAL PDF HEADER WITH CUSTOM WORKSHOP LOGO
// ========================================================
function drawDocHeaderWithLogo(doc, title, subtitle, themeColor) {
  themeColor = themeColor || [25, 42, 74];
  var pageW = (doc.internal && doc.internal.pageSize && doc.internal.pageSize.getWidth) ? doc.internal.pageSize.getWidth() : 297;
  var profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
  var shop_name = (profile.shop_name || "ALUMINIUM FABRICATION WORKSHOP").toUpperCase();
  var owner_name = (profile.name && profile.name !== "Fabricator") ? profile.name.trim() : "";
  var contact = profile.phone ? profile.phone.trim() : "";
  var email = (profile.email && profile.email.indexOf("@smartworker.app") === -1) ? profile.email.trim() : "";
  var gst = profile.gst ? profile.gst.trim() : "";
  var addr = (profile.address && profile.address !== "Fabrication Workshop") ? profile.address.trim() : "";
  var customLogo = localStorage.getItem('sw_custom_logo');

  doc.setFillColor(themeColor[0], themeColor[1], themeColor[2]);
  doc.rect(0, 0, pageW, 30, 'F');

  var textStartX = 14;
  if (customLogo) {
    try {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(12, 3, 24, 24, 2.5, 2.5, 'F');
      var fmt = customLogo.indexOf('image/png') !== -1 ? 'PNG' : 'JPEG';
      doc.addImage(customLogo, fmt, 13, 4, 22, 22);
      textStartX = 41;
    } catch(e) {
      textStartX = 14;
    }
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(13.5);
  doc.setTextColor(251, 191, 36);
  doc.text(shop_name, textStartX, 10);

  var detailParts = [];
  if (owner_name) detailParts.push("Prop: " + owner_name);
  if (addr) detailParts.push(addr);
  if (contact) detailParts.push("Mob: " + contact);
  if (email) detailParts.push("Email: " + email);
  if (gst) detailParts.push("GSTIN: " + gst);
  var infoLine = detailParts.length > 0 ? detailParts.join(" | ") : "Professional Aluminium, UPVC & Glass Fabrication";

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(226, 232, 240);
  doc.text(infoLine, textStartX, 16.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  doc.text(String(title || "").toUpperCase(), textStartX, 24);

  if (subtitle) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(253, 224, 71);
    doc.text(String(subtitle), pageW - 14, 24, { align: "right" });
  }
}

// =========================================================================
// SMART WORKER PRO - UNIFIED PRODUCTION JAVASCRIPT ENGINE
// Modules: Firebase Cloud Sync, Formulas, Digital Khata, Billing, Keypad, UI
// =========================================================================

// ==========================================
// 1. FIREBASE CLOUD CONFIGURATION & REALTIME SYNC
// ==========================================
// =========================================================================
// SMART WORKER PRO - FIREBASE CLOUD CONFIGURATION & REALTIME SYNC
// Google Cloud Firestore Integration (nisha-creations)
// =========================================================================

// ========================================================
 // GOOGLE CLOUD FIREBASE AUTHENTICATION & LIVE SYNC ENGINE
 // ========================================================
 let fbApp = null;
 let fbAuth = null;
 let fbDb = null;
 let fbRtdb = null;
 let currentCloudUser = null;

 // Nisha Creations Firebase Cloud & Realtime Database Configuration
 const defaultFbConfig = {
  apiKey: "AIzaSyBYBRTvmuf3mHuP1kveMv104idLAhJys2-M",
  authDomain: "nisha-creations.firebaseapp.com",
  databaseURL: "https://nisha-creations-default-rtdb.firebaseio.com",
  projectId: "nisha-creations",
  storageBucket: "nisha-creations.firebasestorage.app",
  messagingSenderId: "726716735582",
  appId: "1:726716735582:web:a477dcd273501e5d7dd4cf"
};



 function initFirebaseCloud() {
 try {
 const savedConfig = localStorage.getItem('sw_firebase_config');
 const configToUse = savedConfig ? JSON.parse(savedConfig) : defaultFbConfig;

 if (window.firebase && !firebase.apps.length) {
 fbApp = firebase.initializeApp(configToUse);
 fbAuth = firebase.auth();
 fbDb = firebase.firestore();
 window.fbDb = fbDb;
 window.fbApp = fbApp;
 window.fbAuth = fbAuth;
 if (firebase.database) {
   fbRtdb = firebase.database();
 window.fbRtdb = fbRtdb;
 }

 // Listen to auth state
 fbAuth.onAuthStateChanged(user => {
 if (user) {
 currentCloudUser = user;
 updateCloudUserUI(user);
 syncAllDataFromCloud(user.uid);

 // Listen to Custom Products and Formula Overrides Live
 try {
   if (fbDb) {
     fbDb.collection('custom_products').onSnapshot(snap => {
       const prods = [];
       snap.forEach(d => { const dt = d.data(); if (dt) prods.push(dt); });
       if (prods.length > 0) {
         localStorage.setItem('sw_custom_products', JSON.stringify(prods));
         if (typeof renderCustomSeriesDropdown === 'function') renderCustomSeriesDropdown();
       }
     }, err => console.warn("Cloud custom_products sync notice", err));

     fbDb.collection('settings').doc('formula_overrides').onSnapshot(doc => {
       if (doc.exists) {
         const data = doc.data();
         if (data) localStorage.setItem('sw_formula_overrides', JSON.stringify(data));
       }
     }, err => console.warn("Cloud formula_overrides sync notice", err));
   }
   if (fbRtdb) {
     fbRtdb.ref('custom_products').on('value', snap => {
       const val = snap.val();
       if (val) {
         localStorage.setItem('sw_custom_products', JSON.stringify(Object.values(val)));
         if (typeof renderCustomSeriesDropdown === 'function') renderCustomSeriesDropdown();
       }
     });
     fbRtdb.ref('formula_overrides').on('value', snap => {
       const val = snap.val();
       if (val) localStorage.setItem('sw_formula_overrides', JSON.stringify(val));
     });
   }
 } catch(e) { console.warn("Dynamic formulas cloud sync setup:", e); }

 } else {
 currentCloudUser = null;
 updateCloudUserUI(null);
 }
 });
 }
 } catch (err) {
 console.log("Firebase initialized in Local/Offline Mode:", err);
 }
 }

 function updateCloudUserUI(user) {
 const badge = document.getElementById('cloudUserBadge');
 if (badge) badge.style.display = 'none';
 const loginBtn = document.getElementById('cloudLoginTriggerBtn');
 if (loginBtn) loginBtn.style.display = user ? 'none' : 'flex';
}

 function openAuthModal() {
 const m = document.getElementById('authModal');
 if (m) m.classList.add('active');
 else openScreen('auth', 'SIGN IN / REGISTER');
 }

 function closeAuthModal() {
 const m = document.getElementById('authModal');
 if (m) m.classList.remove('active');
 }

 function switchAuthTab(tab) {
 const loginBtn = document.getElementById('authTabLoginBtn');
 const regBtn = document.getElementById('authTabRegBtn');
 const loginForm = document.getElementById('authLoginForm');
 const regForm = document.getElementById('authRegForm');

 if (tab === 'login') {
 loginBtn.style.background = "#1976d2";
 loginBtn.style.color = "#fff";
 loginBtn.style.border = "none";
 regBtn.style.background = "#f5f5f5";
 regBtn.style.color = "#333";
 regBtn.style.border = "1px solid #ccc";
 loginForm.style.display = "block";
 regForm.style.display = "none";
 } else {
 regBtn.style.background = "#2e7d32";
 regBtn.style.color = "#fff";
 regBtn.style.border = "none";
 loginBtn.style.background = "#f5f5f5";
 loginBtn.style.color = "#333";
 loginBtn.style.border = "1px solid #ccc";
 regForm.style.display = "block";
 loginForm.style.display = "none";
 }
 }

 function handleEmailLogin() {
 const emailEl = document.getElementById('login_email') || document.getElementById('auth_login_id');
 const passEl = document.getElementById('login_password') || document.getElementById('auth_login_pass');
 const email = emailEl ? emailEl.value.trim() : "";
 const pass = passEl ? passEl.value : "";
 if (!email || !pass) { alert("Please enter your Email and Password!"); return; }

 if (fbAuth) {
 fbAuth.signInWithEmailAndPassword(email, pass)
 .then(res => {
 alert("Logged in successfully! Syncing cloud data...");
 closeAuthModal();
 })
 .catch(err => {
 simulateLocalAuth(email);
 });
 } else {
 simulateLocalAuth(email);
 }
 }

 function handleEmailRegister() {
 const nameEl = document.getElementById('reg_name') || document.getElementById('auth_reg_name');
 const shopEl = document.getElementById('reg_shop') || document.getElementById('auth_reg_shop');
 const phoneEl = document.getElementById('reg_phone') || document.getElementById('auth_reg_id');
 const emailEl = document.getElementById('reg_email') || document.getElementById('auth_reg_id');
 const passEl = document.getElementById('reg_password') || document.getElementById('auth_reg_pass');
 const name = nameEl ? nameEl.value.trim() : "";
 const shop = shopEl ? shopEl.value.trim() : "";
 const phone = phoneEl ? phoneEl.value.trim() : "";
 const email = emailEl ? emailEl.value.trim() : "";
 const pass = passEl ? passEl.value : "";

 if (!email || !pass || pass.length < 6) {
 alert("Please enter a valid Email and a password of at least 6 characters!");
 return;
 }

 const profile = { name, shop_name: shop, phone, email, address: "West Bengal" };
 localStorage.setItem('sw_profile', JSON.stringify(profile));
 if(currentCloudUser) syncAllDataToCloud(currentCloudUser.uid);
 loadSavedProfile();

 if (fbAuth) {
 fbAuth.createUserWithEmailAndPassword(email, pass)
 .then(res => {
 alert("Account created successfully! Your data is secured in the cloud.");
 syncAllDataToCloud(res.user.uid);
 closeAuthModal();
 })
 .catch(err => {
 simulateLocalAuth(email);
 });
 } else {
 simulateLocalAuth(email);
 }
 }

 function handleGoogleSignIn() {
 if (fbAuth && window.firebase) {
 const provider = new firebase.auth.GoogleAuthProvider();
 fbAuth.signInWithPopup(provider)
 .then(res => {
 alert(`Google Sign-In successful: ${res.user.displayName || res.user.email}`);
 closeAuthModal();
 })
 .catch(err => {
 alert("Please configure your Firebase credentials to enable Google Sign-In.");
 openFirebaseConfigModal();
 });
 } else {
 alert("Please configure your Firebase credentials to enable Google Sign-In.");
 openFirebaseConfigModal();
 }
 }

 function handleForgotPassword() {
 const email = prompt("Enter your registered Email ID to reset your password:");
 if (email && fbAuth) {
 fbAuth.sendPasswordResetEmail(email.trim())
 .then(() => alert("Password reset link has been sent to your email!"))
 .catch(err => alert("Error: " + err.message));
 }
 }

// Legacy duplicate auth helpers consolidated into main auth controller below

 // Strictly Isolated Per-Customer Cryptographic Vault ID (Zero Cross-User Data Leakage!)
 function computeUserVaultId(userId, passPlainOrHash) {
  const cleanId = String(userId || '').trim().toLowerCase();
  const pStr = String(passPlainOrHash || '').trim();
  if (!cleanId) return 'dev_vault_' + (typeof getDeviceId === 'function' ? getDeviceId() : 'local');
  if (typeof sha256 === 'function' && pStr) {
    return 'vault_' + sha256(cleanId + '_SW_PRIVATE_VAULT_' + pStr).substring(0, 24);
  }
  return 'user_vault_' + cleanId.replace(/[^a-z0-9]/g, '_') + '_' + (typeof getDeviceId === 'function' ? getDeviceId() : 'local');
 }

 function getIsolatedCloudDocId(uid) {
  // Guest mode never syncs to or from shared cloud!
  if (localStorage.getItem('sw_guest_mode') === 'true') return null;
  const savedVault = localStorage.getItem('sw_user_vault_id');
  if (savedVault && (!uid || uid === localStorage.getItem('sw_cloud_user'))) {
    return savedVault;
  }
  const savedUser = uid || (currentCloudUser ? currentCloudUser.uid : null) || localStorage.getItem('sw_cloud_user');
  const savedPass = localStorage.getItem('sw_user_password') || '';
  if (savedUser && savedUser !== 'workshop_primary') {
    return computeUserVaultId(savedUser, savedPass);
  }
  return null;
 }

 // Archive outgoing user's local data & completely wipe active working storage so next user NEVER sees previous user's data!
 function clearWorkingUserDataForAccountSwitch(incomingUserId) {
  try {
    const prevUser = localStorage.getItem('sw_cloud_user');
    if (prevUser && prevUser !== incomingUserId) {
      const archiveSnap = {
        profile: localStorage.getItem('sw_profile'),
        invoices: localStorage.getItem('sw_invoices'),
        measurements: localStorage.getItem('sw_measurements'),
        customers: localStorage.getItem('sw_customers'),
        site_khata: localStorage.getItem('sw_site_khata'),
        expenses: localStorage.getItem('sw_expenses'),
        custom_logo: localStorage.getItem('sw_custom_logo'),
        custom_qr: localStorage.getItem('sw_custom_qr'),
        calc_history: localStorage.getItem('sw_calc_history')
      };
      localStorage.setItem('sw_local_vault_' + prevUser, JSON.stringify(archiveSnap));
    }
  } catch(e){}

  const keysToWipe = [
    'sw_profile', 'sw_invoices', 'sw_measurements', 'sw_customers',
    'sw_site_khata', 'sw_expenses', 'sw_custom_logo', 'sw_custom_qr',
    'sw_calc_history', 'sw_offline_queue', 'sw_user_vault_id'
  ];
  keysToWipe.forEach(function(k) { localStorage.removeItem(k); });

  try {
    if (typeof billItems !== 'undefined') billItems = [];
    if (typeof siteKhataItems !== 'undefined') siteKhataItems = [];
    if (typeof clearDomal === 'function') clearDomal();
    if (typeof clearSliding === 'function') clearSliding();
    if (typeof clearCasement === 'function') clearCasement();
    if (typeof clearDoor === 'function') clearDoor();
    if (typeof clearPartition === 'function') clearPartition();
    if (typeof clearCustomSeries === 'function') clearCustomSeries();
    if (typeof clearBillItems === 'function') clearBillItems();
    document.querySelectorAll('img[alt*="Logo"], img[alt="SWA"]').forEach(function(img){ img.src = 'logo.png'; });
    if (typeof renderBrandingPreviews === 'function') renderBrandingPreviews();
  } catch(e){}

  // If incomingUserId has a saved local vault on this phone, restore ONLY their vault
  if (incomingUserId) {
    try {
      const rawVault = localStorage.getItem('sw_local_vault_' + incomingUserId);
      if (rawVault) {
        const snap = JSON.parse(rawVault);
        if (snap.profile) localStorage.setItem('sw_profile', snap.profile);
        if (snap.invoices) localStorage.setItem('sw_invoices', snap.invoices);
        if (snap.measurements) localStorage.setItem('sw_measurements', snap.measurements);
        if (snap.customers) localStorage.setItem('sw_customers', snap.customers);
        if (snap.site_khata) localStorage.setItem('sw_site_khata', snap.site_khata);
        if (snap.expenses) localStorage.setItem('sw_expenses', snap.expenses);
        if (snap.custom_logo) localStorage.setItem('sw_custom_logo', snap.custom_logo);
        if (snap.custom_qr) localStorage.setItem('sw_custom_qr', snap.custom_qr);
        if (snap.calc_history) localStorage.setItem('sw_calc_history', snap.calc_history);
      }
    } catch(e){}
  }
 }

 // Live Sync to Cloud Firestore (Strictly Isolated Per Authenticated Customer Vault)
 function syncAllDataToCloud(uid) {
  if (!fbDb) return;
  if (localStorage.getItem('sw_guest_mode') === 'true') return;
  const targetId = getIsolatedCloudDocId(uid);
  if (!targetId) return;
  try {
    const ownerUser = localStorage.getItem('sw_cloud_user') || '';
    const data = {
      owner_id: ownerUser,
      profile: JSON.parse(localStorage.getItem('sw_profile') || '{}'),
      invoices: JSON.parse(localStorage.getItem('sw_invoices') || '[]'),
      measurements: JSON.parse(localStorage.getItem('sw_measurements') || '[]'),
      customers: JSON.parse(localStorage.getItem('sw_customers') || '{}'),
      site_khata: JSON.parse(localStorage.getItem('sw_site_khata') || '[]'),
      expenses: JSON.parse(localStorage.getItem('sw_expenses') || '[]'),
      license: JSON.parse(localStorage.getItem('sw_license') || '{}'),
      custom_logo: localStorage.getItem('sw_custom_logo') || '',
      custom_qr: localStorage.getItem('sw_custom_qr') || '',
      glass_shop_stock: JSON.parse(localStorage.getItem('sw_glass_shop_stock_v1') || '{}'),
      glass_remnants: JSON.parse(localStorage.getItem('sw_glass_remnants_v1') || '[]'),
      custom_glass_types: JSON.parse(localStorage.getItem('sw_custom_glass_types_v1') || '[]'),
      profit_attendance: JSON.parse(localStorage.getItem('sw_profit_attendance_v1') || '{}'),
      updated_at: new Date().toISOString()
    };
    if (fbRtdb) {
      try { fbRtdb.ref('nisha_creations/smart_worker/' + String(targetId)).set(data); } catch(e){}
    }
    fbDb.collection('users').doc(String(targetId)).set(data, { merge: true }).then(() => {
      console.log("☁️ All Smart Worker data securely saved to isolated cloud vault!");
      const badge = document.getElementById('cloudUserBadge');
      if (badge) badge.style.display = 'none';
    }).catch(err => {
      console.warn("Cloud write notice:", err);
    });
  } catch (err) {
    console.log("Cloud sync error:", err);
  }
}

// Restore from Cloud Firestore on New Device / Login (Strictly Isolated Vault)
function syncAllDataFromCloud(uid) {
  if (!fbDb) return;
  if (localStorage.getItem('sw_guest_mode') === 'true') return;
  const targetId = getIsolatedCloudDocId(uid);
  if (!targetId) return;
  fbDb.collection('users').doc(String(targetId)).get().then(doc => {
    if (doc.exists) {
      const d = doc.data();
      if (d.profile) localStorage.setItem('sw_profile', JSON.stringify(d.profile));
      localStorage.setItem('sw_invoices', JSON.stringify(Array.isArray(d.invoices) ? d.invoices : []));
      localStorage.setItem('sw_measurements', JSON.stringify(Array.isArray(d.measurements) ? d.measurements : []));
      localStorage.setItem('sw_customers', JSON.stringify((d.customers && typeof d.customers === 'object') ? d.customers : {}));
      localStorage.setItem('sw_site_khata', JSON.stringify(Array.isArray(d.site_khata) ? d.site_khata : []));
      localStorage.setItem('sw_expenses', JSON.stringify(Array.isArray(d.expenses) ? d.expenses : []));
      if (d.license) localStorage.setItem('sw_license', JSON.stringify(d.license));
      if (d.custom_logo) localStorage.setItem('sw_custom_logo', d.custom_logo);
      else localStorage.removeItem('sw_custom_logo');
      if (d.custom_qr) localStorage.setItem('sw_custom_qr', d.custom_qr);
      else localStorage.removeItem('sw_custom_qr');
      if (d.glass_shop_stock && typeof d.glass_shop_stock === 'object') localStorage.setItem('sw_glass_shop_stock_v1', JSON.stringify(d.glass_shop_stock));
      if (Array.isArray(d.glass_remnants)) localStorage.setItem('sw_glass_remnants_v1', JSON.stringify(d.glass_remnants));
      if (Array.isArray(d.custom_glass_types)) localStorage.setItem('sw_custom_glass_types_v1', JSON.stringify(d.custom_glass_types));
      if (d.profit_attendance && typeof d.profit_attendance === 'object') localStorage.setItem('sw_profit_attendance_v1', JSON.stringify(d.profit_attendance));
      if (typeof syncCustomGlassDropdowns === 'function') syncCustomGlassDropdowns();
      if (typeof renderGlassShopStockUI === 'function') renderGlassShopStockUI();
      if (typeof renderGlassRemnantStockUI === 'function') renderGlassRemnantStockUI();
      if (typeof renderProfitAttendanceScreen === 'function') renderProfitAttendanceScreen();

      if (typeof loadSavedProfile === 'function') loadSavedProfile();
      if (typeof loadBillSettings === 'function') loadBillSettings();
      if (typeof updateActivationScreenUI === 'function') updateActivationScreenUI();
      if (typeof renderCustomerKhataScreen === 'function') renderCustomerKhataScreen();
      console.log("☁️ All Smart Worker data seamlessly restored from Google Cloud!");
    }
  }).catch(err => {
    console.warn("Error restoring from cloud:", err);
  });
}

function openFirebaseConfigModal() {
 closeAuthModal();
 const cur = localStorage.getItem('sw_firebase_config') || "";
 const inp = document.getElementById('customFbConfigInput');
 if (inp) inp.value = cur;
 const mod = document.getElementById('fbConfigModal');
 if (mod) mod.classList.add('active');
 }

 function closeFirebaseConfigModal() {
 const mod = document.getElementById('fbConfigModal');
 if (mod) mod.classList.remove('active');
 }

 function saveCustomFirebaseConfig() {
 const inp = document.getElementById('customFbConfigInput');
 const txt = inp ? inp.value.trim() : "";
 if (txt) {
 try {
 const parsed = JSON.parse(txt);
 localStorage.setItem('sw_firebase_config', JSON.stringify(parsed));
 alert("Firebase Config saved successfully! Reloading page to connect...");
 location.reload();
 } catch (e) {
 alert('Please paste valid JSON format (e.g. {"apiKey": "...", "projectId": "..."})');
 }
 } else {
 localStorage.removeItem('sw_firebase_config');
 alert("Default configuration has been reset.");
 closeFirebaseConfigModal();
 }
 }





function switchAuthMode(mode) {
 const loginBtn = document.getElementById('tabBtnLogin');
 const regBtn = document.getElementById('tabBtnRegister');
 const formLogin = document.getElementById('authFormLogin');
 const formReg = document.getElementById('authFormRegister');

 if (mode === 'login') {
 if (loginBtn) { loginBtn.style.background = '#2563eb'; loginBtn.style.color = '#fff'; }
 if (regBtn) { regBtn.style.background = 'transparent'; regBtn.style.color = '#475569'; }
 if (formLogin) formLogin.style.display = 'block';
 if (formReg) formReg.style.display = 'none';
 } else {
 if (regBtn) { regBtn.style.background = '#16a34a'; regBtn.style.color = '#fff'; }
 if (loginBtn) { loginBtn.style.background = 'transparent'; loginBtn.style.color = '#475569'; }
 if (formReg) formReg.style.display = 'block';
 if (formLogin) formLogin.style.display = 'none';
 }
 }

 function doEmailRegister() {
 const nameInput = document.getElementById('auth_reg_name') || document.getElementById('reg_name');
 const shopInput = document.getElementById('auth_reg_shop') || document.getElementById('reg_shop');
 const phoneInput = document.getElementById('auth_reg_phone') || document.getElementById('reg_phone');
 const emailInput = document.getElementById('auth_reg_email') || document.getElementById('reg_email');
 const passInput = document.getElementById('auth_reg_pass') || document.getElementById('reg_password');
 const confirmInput = document.getElementById('auth_reg_pass_confirm');

 const name = nameInput ? nameInput.value.trim() : '';
 const shop = shopInput ? shopInput.value.trim() : '';
 const phone = phoneInput ? phoneInput.value.trim() : '';
 const email = emailInput ? emailInput.value.trim() : '';
 const pass = passInput ? passInput.value : '';
 const passConfirm = confirmInput ? confirmInput.value : '';

 // 1. Strict Validation
 if (!name) {
 alert("Please enter your Full Name.");
 if (nameInput) nameInput.focus();
 return;
 }
 if (!shop) {
 alert("Please enter your Workshop / Shop Name.");
 if (shopInput) shopInput.focus();
 return;
 }
 const rawDigits = phone.replace(/\D/g, '');
 const cleanPhone = rawDigits.length >= 10 ? rawDigits.slice(-10) : rawDigits;
 if (!cleanPhone || cleanPhone.length < 10) {
 alert("Please enter a valid 10-digit Mobile Number.");
 if (phoneInput) phoneInput.focus();
 return;
 }
 if (!pass || pass.length < 6) {
 alert("Please choose a strong password with at least 6 characters or numbers.");
 if (passInput) passInput.focus();
 return;
 }
 if (!passConfirm) {
 alert("Please enter your password twice in the Confirm Password field to verify.");
 if (confirmInput) confirmInput.focus();
 return;
 }
 const agreeChk = document.getElementById('auth_reg_agree_chk');
 if (agreeChk && !agreeChk.checked) {
 alert("Please tick 'I agree to the Privacy Policy & Terms of Service' before registering.");
 agreeChk.focus();
 return;
 }
 if (pass !== passConfirm) {
 alert("Passwords do not match! Please make sure both password fields are exactly identical.");
 if (confirmInput) confirmInput.focus();
 return;
 }

 const finalEmail = email || (cleanPhone + "@smartworker.app");

 const profile = {
 name: name,
 shop_name: shop,
 phone: cleanPhone,
 email: finalEmail,
 address: "Fabrication Workshop"
 };

 // 2. Store user securely in local database
 const users = JSON.parse(localStorage.getItem('sw_registered_users') || '{}');
 users[cleanPhone] = {
 name: name,
 shop_name: shop,
 phone: cleanPhone,
 email: finalEmail,
 created_at: new Date().toISOString()
 };
 if (email) {
 users[email.toLowerCase()] = users[cleanPhone];
 }
 // Wipe any previous user's working data on this phone before initializing the new workshop account
 clearWorkingUserDataForAccountSwitch(cleanPhone);

 const passHash = (typeof sha256 === 'function') ? sha256(pass + "_SW_AUTH_SALT_2026") : pass;
 const vaultId = computeUserVaultId(cleanPhone, pass);
 users[cleanPhone].password_hash = passHash;
 users[cleanPhone].vault_id = vaultId;
 localStorage.setItem('sw_registered_users', JSON.stringify(users));

 localStorage.setItem('sw_profile', JSON.stringify(profile));
 localStorage.setItem('sw_invoices', '[]');
 localStorage.setItem('sw_measurements', '[]');
 localStorage.setItem('sw_customers', '{}');
 localStorage.setItem('sw_site_khata', '[]');
 localStorage.setItem('sw_expenses', '[]');
    ['sw_glass_shop_stock_v1','sw_glass_remnants_v1','sw_custom_glass_types_v1','sw_glass_inward_log_v1','sw_workshop_remnants_v1','sw_profit_attendance_v1','sw_short_glass_orders','sw_user_password'].forEach(function(k){ try{ localStorage.removeItem(k); }catch(e){} });
    try { Object.keys(localStorage).forEach(function(k){ if (k.indexOf('sw_profit_att_') === 0) localStorage.removeItem(k); }); } catch(e){}

  // New workshops start on Free Plan so they subscribe to the ₹99 Karigar Pro Plan!
  const defaultLicense = {
    key: "",
    plan: "Free Plan",
    start_date: new Date().toLocaleDateString('en-GB'),
    expiry_date: "Pending Activation",
    status: "FREE_PLAN"
  };
  localStorage.setItem('sw_license', JSON.stringify(defaultLicense));

  localStorage.setItem('sw_cloud_user', cleanPhone);
 localStorage.removeItem('sw_user_password');
 localStorage.setItem('sw_user_vault_id', vaultId);
 localStorage.removeItem('sw_guest_mode');

 // 3. Cloud Firestore Synchronization (Auth Index + Isolated Vault)
 if (window.fbDb) {
 fbDb.collection('users').doc(cleanPhone).set({
 profile: profile,
 password_hash: passHash,
 vault_id: vaultId,
 updated_at: new Date().toISOString()
 }, { merge: true }).catch(e => console.warn("Firestore sync notice:", e));
 fbDb.collection('users').doc(vaultId).set({
 owner_id: cleanPhone,
 profile: profile,
 updated_at: new Date().toISOString()
 }, { merge: true }).catch(e => console.warn("Vault sync notice:", e));
 }

 // 4. Firebase Authentication if available
 if (window.firebase && fbAuth) {
 fbAuth.createUserWithEmailAndPassword(finalEmail, pass).then(res => {
 currentCloudUser = res.user;
 updateCloudUserUI(res.user);
 syncAllDataToCloud(res.user.uid);
 }).catch(err => {
 console.warn("Firebase Auth note:", err);
 });
 }

 simulateLocalAuth(cleanPhone);
 loadSavedProfile();
 alert("Workshop registered successfully!\n\n👤 Name: " + name + "\n🏬 Shop: " + shop + "\n📱 Mobile ID: " + cleanPhone);
 goHome();
 }

 function computeMasterRecoveryPassword(phoneRaw, dayOffset) {
  var digits = String(phoneRaw || '').replace(/\D/g, '');
  var phone10 = digits.length >= 10 ? digits.slice(-10) : digits;
  if (phone10.length < 10) return '';
  var d = new Date(Date.now() + (dayOffset || 0) * 86400000);
  var ymd = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  var raw = "SW_MASTER_BREAK_2026|" + phone10 + "|" + ymd + "|SAHEB_ADMIN_SECRET";
  var h = (typeof sha256 === 'function') ? sha256(raw) : raw;
  var num = (parseInt(h.slice(0, 8), 16) % 900000) + 100000;
  return "SW" + String(num);
}

function isValidMasterRecoveryPassword(phoneRaw, passInput) {
  var cleanP = String(passInput || '').trim().toUpperCase();
  if (!/^SW\d{6}$/.test(cleanP)) return false;
  for (var off = 0; off >= -2; off--) {
    if (computeMasterRecoveryPassword(phoneRaw, off) === cleanP) return true;
  }
  return false;
}

function normalizeSwLoginId(raw) {
  var s = String(raw || '').trim();
  if (s.includes('@')) return s.toLowerCase();
  var digits = s.replace(/\D/g, '');
  if (digits.length >= 10) return digits.slice(-10);
  return s.toLowerCase();
}

function finalizeSwAccountSignIn(cleanUser, pass, accountObj, welcomeMsg) {
  var users = JSON.parse(localStorage.getItem('sw_registered_users') || '{}');
  var existing = users[cleanUser] || {};
  var mergedProfile = Object.assign(
    {},
    JSON.parse(localStorage.getItem('sw_profile') || '{}'),
    accountObj && accountObj.profile ? accountObj.profile : {},
    {
      name: (accountObj && accountObj.name) || existing.name || "Fabricator",
      shop_name: (accountObj && accountObj.shop_name) || existing.shop_name || "Fabrication Workshop",
      phone: (accountObj && accountObj.phone) || cleanUser,
      email: (accountObj && accountObj.email) || existing.email || "",
      address: (accountObj && accountObj.address) || existing.address || "Fabrication Workshop"
    }
  );
  var passHash = (typeof sha256 === 'function') ? sha256(pass + "_SW_AUTH_SALT_2026") : pass;
  var vaultId = (accountObj && accountObj.vault_id) || existing.vault_id || computeUserVaultId(cleanUser, pass);

  // Sync updated password locally so future offline logins work seamlessly!
  users[cleanUser] = Object.assign({}, existing, {
    phone: cleanUser,
    name: mergedProfile.name,
    shop_name: mergedProfile.shop_name,
    email: mergedProfile.email,
    address: mergedProfile.address,
    password_hash: passHash,
    vault_id: vaultId
  });
  localStorage.setItem('sw_registered_users', JSON.stringify(users));

  clearWorkingUserDataForAccountSwitch(cleanUser);
  localStorage.setItem('sw_profile', JSON.stringify(mergedProfile));
  localStorage.setItem('sw_cloud_user', cleanUser);
  localStorage.removeItem('sw_user_password');
  localStorage.setItem('sw_user_vault_id', vaultId);
  localStorage.removeItem('sw_guest_mode');

  simulateLocalAuth(cleanUser);
  syncAllDataFromCloud(vaultId);
  loadSavedProfile();
  alert(welcomeMsg || ("Sign-in successful! Welcome back, " + mergedProfile.name));
  goHome();
}

async function doEmailLogin() {
  const userInput = document.getElementById('auth_login_email') || document.getElementById('login_email');
  const passInput = document.getElementById('auth_login_pass') || document.getElementById('login_password');
  const userRaw = userInput ? userInput.value.trim() : '';
  const pass = passInput ? passInput.value.trim() : '';

  if (!userRaw) {
    alert("Please enter your 10-digit Mobile Number or Email.");
    if (userInput) userInput.focus();
    return;
  }
  if (!pass) {
    alert("Please enter your Password.");
    if (passInput) passInput.focus();
    return;
  }

  const cleanUser = normalizeSwLoginId(userRaw);
  const passHash = (typeof sha256 === 'function') ? sha256(pass + "_SW_AUTH_SALT_2026") : pass;

  // 0. ADMIN MASTER RECOVERY PASSWORD (e.g. SW849271) — BREAKS OLD FORGOTTEN PASSWORD 100% OFFLINE & ONLINE!
  if (isValidMasterRecoveryPassword(cleanUser, pass)) {
    const upperPass = pass.toUpperCase();
    const existingUsers = JSON.parse(localStorage.getItem('sw_registered_users') || '{}');
    const oldAcc = existingUsers[cleanUser] || {};
    // Also sync the new broken/replaced password to Cloud Firestore & RTDB if online
    const _dbR = window.fbDb || (typeof fbDb !== 'undefined' ? fbDb : null);
    const _rtR = window.fbRtdb || (typeof fbRtdb !== 'undefined' ? fbRtdb : null);
    const nowIso = new Date().toISOString();
    if (_dbR) {
      try { _dbR.collection('users').doc(cleanUser).set({ phone: cleanUser, password_hash: passHash, updated_at: nowIso }, { merge: true }).catch(() => {}); } catch (e) {}
    }
    if (_rtR) {
      try { _rtR.ref('users/' + cleanUser).update({ phone: cleanUser, password_hash: passHash, updated_at: nowIso }); } catch (e) {}
    }
    finalizeSwAccountSignIn(
      cleanUser,
      upperPass,
      oldAcc,
      "✅ Recovery Password Verified!\n\nYour old password has been cleared and replaced with: " + upperPass + "\nWelcome back to your workshop account!"
    );
    return;
  }

  // 1. Check local cache first — IF password matches, sign in immediately!
  //    (CRITICAL FIX v104: If local password does NOT match, DO NOT abort! Always check Cloud Firestore & RTDB for Admin-reset password!)
  const users = JSON.parse(localStorage.getItem('sw_registered_users') || '{}');
  const userAccount = users[cleanUser] || users[userRaw] || users[userRaw.toLowerCase()];
  if (userAccount && (userAccount.password === pass || (userAccount.password_hash && userAccount.password_hash === passHash))) {
    finalizeSwAccountSignIn(userAccount.phone || cleanUser, pass, userAccount, "Sign-in successful! Welcome back, " + (userAccount.name || "Fabricator") + " (" + (userAccount.shop_name || "Workshop") + ")");
    return;
  }

  const savedUser = normalizeSwLoginId(localStorage.getItem('sw_cloud_user') || '');
  const savedPass = localStorage.getItem('sw_user_password');
  const savedProfile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
  if (savedUser && (savedUser === cleanUser || normalizeSwLoginId(savedProfile.phone) === cleanUser || savedProfile.email === userRaw)) {
    if (savedPass && savedPass === pass) {
      finalizeSwAccountSignIn(cleanUser, pass, savedProfile, "Sign-in successful! Welcome back.");
      return;
    }
  }

  // 2. Check Cloud Firestore (`users` + `password_reset_requests`) AND Firebase RTDB (`users` + `password_reset_requests`)!
  let cloudAccountFound = false;
  const checkRecordMatch = (d) => {
    if (!d) return false;
    if (d.password && String(d.password).trim() === pass) return true;
    if (d.password_hash && d.password_hash === passHash) return true;
    if (d.status === 'VERIFIED_RESOLVED' && d.registered_password && String(d.registered_password).trim() === pass) return true;
    return false;
  };

  // 2A. Firestore users/<cleanUser>
  const _db = window.fbDb || (typeof fbDb !== 'undefined' ? fbDb : null);
  const _rtdb = window.fbRtdb || (typeof fbRtdb !== 'undefined' ? fbRtdb : null);
  if (_db) {
    try {
      const uDoc = await _db.collection('users').doc(cleanUser).get();
      if (uDoc && uDoc.exists) {
        cloudAccountFound = true;
        const d = uDoc.data();
        if (checkRecordMatch(d)) {
          finalizeSwAccountSignIn(cleanUser, pass, d, "Sign-in successful! Password verified & workshop data restored from Cloud.");
          return;
        }
      }
    } catch (e) { console.warn("Firestore users check err:", e); }

    // 2B. Firestore password_reset_requests/<cleanUser> (Admin verified reset fallback)
    try {
      const rDoc = await _db.collection('password_reset_requests').doc(cleanUser).get();
      if (rDoc && rDoc.exists) {
        const rd = rDoc.data();
        if (checkRecordMatch(rd)) {
          finalizeSwAccountSignIn(cleanUser, pass, { phone: cleanUser, name: rd.name, shop_name: rd.shop }, "Sign-in successful! Admin-verified new password accepted.");
          return;
        }
      }
    } catch (e) { console.warn("Firestore reset check err:", e); }
  }

  // 2C. Firebase Realtime Database users/<cleanUser> & password_reset_requests/<cleanUser>
  if (_rtdb) {
    try {
      const uSnap = await _rtdb.ref('users/' + cleanUser).once('value');
      const ud = uSnap ? uSnap.val() : null;
      if (ud) {
        cloudAccountFound = true;
        if (checkRecordMatch(ud)) {
          finalizeSwAccountSignIn(cleanUser, pass, ud, "Sign-in successful! Verified via Cloud Database.");
          return;
        }
      }
    } catch (e) { console.warn("RTDB users check err:", e); }

    try {
      const rSnap = await _rtdb.ref('password_reset_requests/' + cleanUser).once('value');
      const rd = rSnap ? rSnap.val() : null;
      if (rd && checkRecordMatch(rd)) {
        finalizeSwAccountSignIn(cleanUser, pass, { phone: cleanUser, name: rd.name, shop_name: rd.shop }, "Sign-in successful! Admin-verified new password accepted.");
        return;
      }
    } catch (e) { console.warn("RTDB reset check err:", e); }
  }

  // 3. Firebase Email/Password Auth fallback
  if (window.firebase && typeof fbAuth !== 'undefined' && fbAuth) {
    try {
      const fbMail = userRaw.includes('@') ? userRaw : (cleanUser + "@smartworker.app");
      const res = await fbAuth.signInWithEmailAndPassword(fbMail, pass);
      currentCloudUser = res.user;
      finalizeSwAccountSignIn(cleanUser, pass, { vault_id: res.user.uid }, "Sign-in successful!");
      return;
    } catch (err) {
      if (err && err.code === 'auth/wrong-password') cloudAccountFound = true;
    }
  }

  if (cloudAccountFound || userAccount) {
    alert("Incorrect password! Please re-check your password or tap 'Forgot Password' to request Admin verification.");
    if (passInput) passInput.focus();
  } else {
    alert("No account found for this Mobile Number (" + cleanUser + "). Please tap 'Register Workshop' to create your account.");
  }
}

function doGoogleSignIn() {
 if (window.firebase && fbAuth) {
 try {
 const provider = new firebase.auth.GoogleAuthProvider();
 fbAuth.signInWithPopup(provider)
 .then(res => {
 currentCloudUser = res.user;
 const email = res.user.email || 'google_user@gmail.com';
 const displayName = res.user.displayName || "Fabricator";
 localStorage.setItem('sw_cloud_user', email);
 localStorage.removeItem('sw_guest_mode');

 let prof = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 if (!prof.name) {
 prof = {
 name: displayName,
 shop_name: displayName + " Fabrication",
 phone: "",
 email: email,
 address: "Fabrication Workshop"
 };
 localStorage.setItem('sw_profile', JSON.stringify(prof));
 }

 updateCloudUserUI(res.user);
 loadSavedProfile();
 syncAllDataFromCloud(res.user.uid);
 alert("Google Sign-In successful: " + (res.user.displayName || email));
 goHome();
 })
 .catch(err => {
 console.warn("Google popup notice:", err);
 promptForGoogleEmail();
 });
 } catch(e) {
 console.warn("Google provider exception:", e);
 promptForGoogleEmail();
 }
 } else {
 promptForGoogleEmail();
 }
 }

 function promptForGoogleEmail() {
 const guestEmail = prompt("Enter your Gmail address to sign in with Google:");
 if (guestEmail && guestEmail.trim()) {
 const em = guestEmail.trim();
 localStorage.setItem('sw_cloud_user', em);
 localStorage.removeItem('sw_guest_mode');
 let prof = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 if (!prof.name) {
 const defaultName = em.split('@')[0] || "Fabricator";
 prof = {
 name: defaultName,
 shop_name: defaultName.toUpperCase() + " FABRICATION",
 phone: "",
 email: em,
 address: "Fabrication Workshop"
 };
 localStorage.setItem('sw_profile', JSON.stringify(prof));
 }
 simulateLocalAuth(em);
 loadSavedProfile();
 alert("Signed in successfully with Google ID: " + em);
 goHome();
 }
 }

 function openForgotPassModal() {
 const m = document.getElementById('forgotPassModal');
 if (m) m.style.display = 'flex';
 }

 function closeForgotPassModal() {
 const m = document.getElementById('forgotPassModal');
 if (m) m.style.display = 'none';
 }

 function doForgotPassword() {
 openForgotPassModal();
 }

 function handleForgotPassSubmit(e) {
 if (e && e.preventDefault) e.preventDefault();
 const phoneInput = document.getElementById('fp_phone');
 const nameInput = document.getElementById('fp_name');
 const shopInput = document.getElementById('fp_shop');

 const phone = phoneInput ? phoneInput.value.trim() : '';
 const name = nameInput ? nameInput.value.trim() : '';
 const shop = shopInput ? shopInput.value.trim() : '';

 const cleanPhone = phone.replace(/\D/g, '');
 if (!cleanPhone || cleanPhone.length < 10) {
 alert("Please enter a valid 10-digit registered mobile number.");
 if (phoneInput) phoneInput.focus();
 return;
 }
 if (!name || !shop) {
 alert("Please enter your Full Name and Workshop Name.");
 return;
 }

 const users = JSON.parse(localStorage.getItem('sw_registered_users') || '{}');
 const user = users[cleanPhone] || users[phone];
 const registeredPass = (user && user.password) ? user.password : "ADMIN_RESET_REQUIRED";

 const reqObj = {
 id: "RST_" + Date.now(),
 phone: cleanPhone,
 name: name,
 shop: shop,
 registered_password: 'ADMIN_RESET_REQUIRED',
 status: "PENDING_VERIFICATION",
 timestamp: Date.now(),
 date_str: new Date().toLocaleString('en-GB')
 };

 let resets = JSON.parse(localStorage.getItem('sw_password_reset_requests') || '[]');
 const existIdx = resets.findIndex(r => r.phone === cleanPhone);
 if (existIdx !== -1) resets[existIdx] = reqObj;
 else resets.unshift(reqObj);
 localStorage.setItem('sw_password_reset_requests', JSON.stringify(resets));

 if (window.fbDb) {
 fbDb.collection('password_reset_requests').doc(cleanPhone).set(reqObj, { merge: true }).catch(() => {});
 }
 if (window.fbRtdb) {
 try { fbRtdb.ref('password_reset_requests/' + cleanPhone).set(reqObj); } catch(err){}
 }

 closeForgotPassModal();

 alert("Verification Request Submitted to Admin!\n\nTo protect your workshop data, Admin will call your mobile number (+91 " + cleanPhone + ") to verify genuine ownership before providing your password.");

 contactAdminDirectWhatsApp(cleanPhone, name, shop);
 }

 function contactAdminDirectWhatsApp(phoneVal, nameVal, shopVal) {
 const p = phoneVal || (document.getElementById('fp_phone') ? document.getElementById('fp_phone').value.trim() : '');
 const n = nameVal || (document.getElementById('fp_name') ? document.getElementById('fp_name').value.trim() : '');
 const s = shopVal || (document.getElementById('fp_shop') ? document.getElementById('fp_shop').value.trim() : '');

 const msg = "*SMART WORKER PRO - PASSWORD VERIFICATION REQUEST*\n" +
 "----------------------------------------\n" +
 "Workshop: *" + (s || "Aluminium Workshop") + "*\n" +
 "Owner Name: *" + (n || "Fabricator") + "*\n" +
 "Registered Mobile: *" + (p || "N/A") + "*\n" +
 "----------------------------------------\n" +
 "Hello Saheb Da,\n" +
 "I forgot my account password. Please call my mobile number to verify genuine ownership and provide my password.\n\n" +
 "Thank you!";

 const waUrl = "https://wa.me/919239413517?text=" + encodeURIComponent(msg);
 window.open(waUrl, '_blank');
 }

 function skipAuthToGuest() {
 if (localStorage.getItem('sw_cloud_user')) {
   clearWorkingUserDataForAccountSwitch('guest_local');
   localStorage.removeItem('sw_cloud_user');
 }
 localStorage.setItem('sw_guest_mode', 'true');
 let prof = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 if (!prof.name || !prof.shop_name) {
 prof = {
 name: "Fabricator",
 shop_name: "ALUMINIUM FABRICATION WORKSHOP",
 phone: "",
 email: "",
 address: "Fabrication Workshop"
 };
 localStorage.setItem('sw_profile', JSON.stringify(prof));
 }
 loadSavedProfile();
 goHome();
 }

 function handleCloudLogout() {
 if (confirm("Are you sure you want to sign out from this device? (Your private data is safely backed up and will be cleared from this screen)")) {
 if (fbAuth) {
 try { fbAuth.signOut(); } catch(e){}
 }
 if (window.khataUnsubscribe && typeof window.khataUnsubscribe === 'function') {
   try { window.khataUnsubscribe(); window.khataUnsubscribe = null; } catch(e){}
 }
 clearWorkingUserDataForAccountSwitch(null);
 currentCloudUser = null;
 localStorage.removeItem('sw_cloud_user');
 localStorage.removeItem('sw_user_password');
 localStorage.removeItem('sw_user_vault_id');
 ['sw_glass_shop_stock_v1','sw_glass_remnants_v1','sw_custom_glass_types_v1','sw_glass_inward_log_v1','sw_workshop_remnants_v1','sw_profit_attendance_v1','sw_short_glass_orders'].forEach(function(k){ try{ localStorage.removeItem(k); }catch(e){} });
 try { Object.keys(localStorage).forEach(function(k){ if (k.indexOf('sw_profit_att_') === 0) localStorage.removeItem(k); }); } catch(e){}
 localStorage.removeItem('sw_user_vault_id');
 localStorage.removeItem('sw_guest_mode');
 updateCloudUserUI(null);
 openScreen('auth', 'SIGN IN / REGISTER');
 alert("Signed out successfully. Your private workshop data has been locked.");
 }
 }

 function simulateLocalAuth(userId) {
 const safeId = String(userId || 'fabricator').trim();
 currentCloudUser = { uid: safeId, email: safeId };
 localStorage.setItem('sw_cloud_user', safeId);
 localStorage.removeItem('sw_guest_mode');
 updateCloudUserUI(currentCloudUser);
 loadSavedProfile();
 const modal = document.getElementById('authModal');
 if (modal) modal.classList.remove('active');
 }

 // ==========================================
// 2. FABRICATION & CUTTING CALCULATION ENGINE
// ==========================================
// =========================================================================
// SMART WORKER PRO - FABRICATION CALCULATION & CUTTING ENGINE
// Optimized Cutting Lists, Glass Sizes, Hardware & Material Purchase
// =========================================================================

 // Embedded JS Functions from main.py & calculations.py
 function safeEval(text) {
 if (!text) return 0.0;
 let s = String(text).trim();
 if (!s) return 0.0;
 s = s.replace(/["']/g, "").replace(/\b(inch|in|mm)\b/gi, "").trim();
 s = s.replace(/(\d+)\s+(\d+\/\d+)/g, "$1+$2");
 s = s.replace(/\b0+(?=\d)/g, "");
 try {
 if (!/^[0-9+*/. ()-]+$/.test(s)) return 0.0;
 return Function('"use strict";return (' + s + ')')() || 0.0;
 } catch (e) { return 0.0; }
 }

 function toFractionInch(inchVal) {
 const roundedVal = Math.floor(inchVal * 16 + 0.5) / 16;
 const wholeNumber = Math.floor(roundedVal);
 const fracPart = roundedVal - wholeNumber;
 if (fracPart === 0) return `${wholeNumber}"`;
 const sixteenths = Math.round(fracPart * 16);
 if (sixteenths === 0) return `${wholeNumber}"`;
 if (sixteenths === 16) return `${wholeNumber + 1}"`;
 let num = sixteenths, den = 16;
 if (num % 8 === 0) { num /= 8; den /= 8; }
 else if (num % 4 === 0) { num /= 4; den /= 4; }
 else if (num % 2 === 0) { num /= 2; den /= 2; }
 if (wholeNumber === 0) return `${num}/${den}"`;
 return `${wholeNumber} ${num}/${den}"`;
 }

 function toMmStr(inchVal) {
 const mmVal = Math.floor((inchVal * 25.4) + 0.5);
 return `${mmVal} mm`;
 }

 function optimizeCuttingPlan(pieces, allowedLens = [180, 192, 144]) {
 if (!pieces || pieces.length === 0) return null;
 const sorted = [...pieces].sort((a, b) => b - a);
 let bestPlan = null;
 const stdLens = allowedLens;
 for (const stdLen of stdLens) {
 const bins = [];
 let valid = true;
 for (const p of sorted) {
 if (p > stdLen) { valid = false; break; }
 let placed = false;
 for (const b of bins) {
 const sumB = b.reduce((a, c) => a + c, 0);
 if (sumB + p <= stdLen + 0.001) { b.push(p); placed = true; break; }
 }
 if (!placed) bins.push([p]);
 }
 if (valid) {
 const totalWaste = (bins.length * stdLen) - pieces.reduce((a, c) => a + c, 0);
 if (!bestPlan || bins.length < bestPlan.bins.length) {
 bestPlan = { len: stdLen, bins: bins, waste: totalWaste };
 } else if (bins.length === bestPlan.bins.length && totalWaste < bestPlan.waste) {
 bestPlan = { len: stdLen, bins: bins, waste: totalWaste };
 }
 }
 }
 if (!bestPlan) {
 bestPlan = { len: 0, bins: sorted.map(p => [p]), waste: 0, oversize: true };
 }
 return bestPlan;
 }

 function formatCuts(cuts) {
 const counts = {};
 cuts.forEach(c => {
 const val = toFractionInch(c);
 counts[val] = (counts[val] || 0) + 1;
 });
 const parts = [];
 for (const val in counts) {
 const qty = counts[val];
 parts.push(qty > 1 ? `${val} x ${qty}` : `${val}`);
 }
 return parts.join(' + ');
 }

 function generateMaterialList(buckets) {
  return "";
}

// ========================================================
// 2B. SMART DIMENSION CALCULATOR KEYPAD (NUMBERS + 16 FRACTIONS)
// ========================================================
let keypadTarget = null;
let keypadDisplay = "";

function openKeypad(targetId) {
  keypadTarget = document.getElementById(targetId);
  if (keypadTarget && keypadTarget.blur) {
    try { keypadTarget.blur(); } catch (e) {}
  }
  keypadDisplay = keypadTarget ? String(keypadTarget.value || "") : "";
  updateKeypadDisplay();
  var modal = document.getElementById("keypadModal");
  if (modal) {
    modal.classList.add("active");
    modal.style.display = "flex";
  }
}

function closeKeypadModal() {
  if (keypadTarget && (keypadTarget.id === 'pt_h' || keypadTarget.id === 'pt_w')) {
    try { renderPartitionWallVisualOnly(); } catch(e){}
  }
  if (keypadTarget && keypadTarget.id) {
    if (keypadTarget.id.startsWith('uc_')) { try { renderICad('uc'); } catch(e){} }
    else if (keypadTarget.id.startsWith('cc_')) { try { renderICad('cc'); } catch(e){} }
    else if (keypadTarget.id.startsWith('us_')) { try { renderUpvcCad('us'); } catch(e){} }
    else if (keypadTarget.id.startsWith('ud_')) { try { renderUpvcCad('ud'); } catch(e){} }
  }
  var modal = document.getElementById("keypadModal");
  if (modal) {
    modal.classList.remove("active");
    modal.style.display = "none";
  }
}

function updateKeypadDisplay() {
  var dispEl = document.getElementById("kDisplay");
  if (dispEl) dispEl.textContent = keypadDisplay || "0";
}

function keypadAddDigit(d) {
  if (keypadDisplay === "0" && d !== ".") {
    keypadDisplay = String(d);
  } else {
    keypadDisplay += String(d);
  }
  updateKeypadDisplay();
}

function keypadAddOp(op) {
  if (!keypadDisplay) return;
  if (/[+\-*/\s]$/.test(keypadDisplay)) {
    keypadDisplay = keypadDisplay.trim().slice(0, -1) + " " + op + " ";
  } else {
    keypadDisplay += " " + op + " ";
  }
  updateKeypadDisplay();
}

function keypadAddFraction(frac) {
  if (!keypadDisplay || keypadDisplay === "0") {
    keypadDisplay = frac;
    updateKeypadDisplay();
    return;
  }
  if (/\d+\/\d+$/.test(keypadDisplay)) {
    keypadDisplay = keypadDisplay.replace(/\d+\/\d+$/, frac);
  } else if (/\d+$/.test(keypadDisplay)) {
    keypadDisplay += " " + frac;
  } else {
    keypadDisplay += frac;
  }
  updateKeypadDisplay();
}

function keypadClear() {
  keypadDisplay = "";
  updateKeypadDisplay();
}

function keypadBackspace() {
  if (!keypadDisplay) return;
  if (/\s+\d+\/\d+$/.test(keypadDisplay)) {
    keypadDisplay = keypadDisplay.replace(/\s+\d+\/\d+$/, "");
  } else {
    keypadDisplay = keypadDisplay.replace(/\s+$/, "");
    keypadDisplay = keypadDisplay.slice(0, -1);
  }
  updateKeypadDisplay();
}

function keypadEnter() {
  if (keypadTarget) {
    keypadTarget.value = keypadDisplay;
    if (typeof keypadTarget.oninput === "function") keypadTarget.oninput();
    if (typeof keypadTarget.onchange === "function") keypadTarget.onchange();
  }
  closeKeypadModal();
}

// ========================================================
 // 3. DOMAL WINDOW MODULE
 // ========================================================
 var dm_window_count = 0;
 var dm_buckets = {};
 var dm_glass_dict = {};

 function calculateDomal() {
 const raw_h = safeEval(document.getElementById('dm_h').value);
 const raw_w = safeEval(document.getElementById('dm_w').value);
 if (raw_h === 0 || raw_w === 0) { alert("Please enter Height and Width."); return; }

 const is_mm = document.getElementById('dm_unit').value.includes('Millimeter');
 const h_mm = is_mm ? raw_h : raw_h * 25.4;
 const w_mm = is_mm ? raw_w : raw_w * 25.4;
 const t_text = document.getElementById('dm_type').value;

 let track_h = 45.0;
 const thMatch = document.getElementById('dm_track_h').value.match(/[0-9]+(?:\.[0-9]+)?/);
 if (thMatch) track_h = parseFloat(thMatch[0]);

 let handle_h = 27.0, handle_w = 65.0;
 const hwMatch = document.getElementById('dm_handle_hw').value.match(/[0-9]+(?:\.[0-9]+)?/g);
 if (hwMatch && hwMatch.length >= 2) {
 handle_h = parseFloat(hwMatch[0]);
 handle_w = parseFloat(hwMatch[1]);
 }

 const ovr_dm = (typeof getFormulaOverrides === 'function') ? getFormulaOverrides() : {};
 const custom_dm_h_deduct = (ovr_dm && ovr_dm.dm_sash_h_deduct != null && parseFloat(ovr_dm.dm_sash_h_deduct) !== 44.0) ? parseFloat(ovr_dm.dm_sash_h_deduct) : ((track_h * 2.0) - 22.0);
 const v_cut_mm = h_mm - custom_dm_h_deduct;
 const h_deduct_mm = custom_dm_h_deduct;
 const side_clearance = (track_h * 2.0) - 12.0;

 let net_w_mod = 0, h_cut_mm = 0, s_c = 2, han_qty = 4, int_qty = 2;
 let has_mesh = false, mesh_w_mm = 0;

 if (t_text.includes('2-Track (2-Sash)')) {
 net_w_mod = handle_w - side_clearance;
 h_cut_mm = (w_mm + net_w_mod) / 2.0;
 s_c = 2; han_qty = 4; int_qty = 2;
 } else if (t_text.includes('2-Shutter + 1-Jali')) {
 // 3-Track Outer Frame, 2-Shutter width measurement, 2 Glass Shutters + 1 Jali Shutter material
 net_w_mod = handle_w - side_clearance;
 h_cut_mm = (w_mm + net_w_mod) / 2.0;
 s_c = 2; han_qty = 4; int_qty = 2;
 has_mesh = true;
 mesh_w_mm = h_cut_mm;
 } else if (t_text.includes('3-Track (3-Sash)')) {
 net_w_mod = (handle_w * 2.0) - side_clearance;
 h_cut_mm = (w_mm + net_w_mod) / 3.0;
 s_c = 3; han_qty = 6; int_qty = 4;
 has_mesh = true;
 mesh_w_mm = (w_mm - side_clearance + handle_w) / 2.0;
 } else if (t_text.includes('4-Track (4-Sash)')) {
 net_w_mod = (handle_w * 3.0) - side_clearance;
 h_cut_mm = (w_mm + net_w_mod) / 4.0;
 s_c = 4; han_qty = 8; int_qty = 6;
 has_mesh = true;
 mesh_w_mm = (w_mm + net_w_mod) / 4.0;
 } else {
 net_w_mod = (handle_w * 2.0) - side_clearance;
 h_cut_mm = (w_mm + net_w_mod) / 4.0;
 s_c = 4; han_qty = 8; int_qty = 4;
 }

 const g_deduct_base = (ovr_dm && ovr_dm.dm_glass_deduct != null) ? parseFloat(ovr_dm.dm_glass_deduct) : 26.0;
 const g_deduct_mm = (handle_w * 2.0) - g_deduct_base;
 const gh_mm = v_cut_mm - g_deduct_mm;
 const gw_mm = h_cut_mm - g_deduct_mm;

 const h_in = h_mm / 25.4;
 const w_in = w_mm / 25.4;
 const v_cut_in = v_cut_mm / 25.4;
 const h_cut_in = h_cut_mm / 25.4;
 const mesh_w_in = mesh_w_mm / 25.4;
 const gh_in = gh_mm / 25.4;
 const gw_in = gw_mm / 25.4;

 dm_window_count += 1;
 const win_loc = document.getElementById('dm_loc') ? document.getElementById('dm_loc').value.trim() : "";
 const win_qty = document.getElementById('dm_qty') ? Math.max(1, parseInt(document.getElementById('dm_qty').value) || 1) : 1;
 const loc_str = win_loc ? ` [${win_loc}]` : "";
 const qty_str = win_qty > 1 ? ` (Qty: ${win_qty} Windows)` : "";

 const disp = (v) => is_mm ? toMmStr(v) : toFractionInch(v);
 const unit_str = is_mm ? "mm" : "Inch";

 const total_sash_for_hw = s_c + (has_mesh ? 1 : 0);
 let hw_txt = "--- HARDWARE & ACCESSORIES ---\n";
 hw_txt += `> Domal Bearing / Rollers: ${total_sash_for_hw * 2 * win_qty} pc\n`;
 hw_txt += `> Touch Lock / Star Lock: ${(s_c >= 3 ? 2 : 1) * win_qty} pc\n`;
 hw_txt += `> L-Cleat (Corner Angle): ${total_sash_for_hw * 4 * win_qty} pc\n> EPDM Gasket / Seal: Required\n`;

 const w_sign = net_w_mod >= 0 ? `+${Math.round(net_w_mod)}` : `${Math.round(net_w_mod)}`;
 
 const dm_aspec = getModuleAluLabel('dm');
 let alu_txt = `[Domal Win #${dm_window_count}${loc_str} - H:${disp(h_in)} x W:${disp(w_in)}${qty_str}]\n`;
 alu_txt += `> Alu Spec: ${dm_aspec}\n`;
 alu_txt += `> Outer Track (Top/Bot): ${disp(w_in)} (${2 * win_qty} pc)\n`;
 alu_txt += `> Outer Track (Vertical): ${disp(h_in)} (${2 * win_qty} pc)\n`;
 alu_txt += `> Sash Top/Bottom: ${disp(h_cut_in)} (${s_c * 2 * win_qty} pc)\n`;
 alu_txt += `> Sash Handle: ${disp(v_cut_in)} (${han_qty * win_qty} pc)\n`;
 alu_txt += `> Sash Interlock Clip: ${disp(v_cut_in)} (${int_qty * win_qty} pc)\n`;

 if (has_mesh) {
 alu_txt += `\n--- MOSQUITO NET ---\n> Mesh Top/Bot: ${disp(mesh_w_in)} (${2 * win_qty} pc)\n> Mesh Handle: ${disp(v_cut_in)} (${2 * win_qty} pc)\n> Mesh Interlock Clip: ${disp(v_cut_in)} (${1 * win_qty} pc)\n`;
 }

 const dm_gspec = getModuleGlassLabel('dm');
 const glass_txt = `\n--- GLASS SIZES ---\n> Glass: ${dm_gspec}\n> Glass Size: ${disp(gh_in)} x ${disp(gw_in)} (${s_c * win_qty} pc)\n`;
 const glass_key = `${disp(gh_in)} x ${disp(gw_in)} || ${dm_gspec}`;
 dm_glass_dict[glass_key] = (dm_glass_dict[glass_key] || 0) + (s_c * win_qty);

 let track_type = t_text.split(' ')[0];
 if (t_text.includes("Center")) track_type = "2-Track CO";

 const outer_key = `Domal Outer Track (${track_type})`;
 // Domal Sash Top/Bottom and Handle use the same Shutter/Sash section — combine into one bucket to cut Top/Bottom from Handle offcuts & save bars
 const sash_key = `Domal Sash (Handle + Top/Bottom) (${track_type})`;
 const interlock_key = `Domal Interlock Clip (${track_type})`;

 [outer_key, sash_key, interlock_key].forEach(k => {
 if (!dm_buckets[k]) dm_buckets[k] = [];
 });

 for (let q = 0; q < win_qty; q++) {
   dm_buckets[outer_key].push(w_in, w_in, h_in, h_in);
   for (let i = 0; i < s_c * 2; i++) dm_buckets[sash_key].push(h_cut_in);
   for (let i = 0; i < han_qty; i++) dm_buckets[sash_key].push(v_cut_in);
   for (let i = 0; i < int_qty; i++) dm_buckets[interlock_key].push(v_cut_in);
   if (has_mesh) {
     dm_buckets[sash_key].push(mesh_w_in, mesh_w_in);
     dm_buckets[sash_key].push(v_cut_in, v_cut_in);
     dm_buckets[interlock_key].push(v_cut_in);
   }
 }

 const prevOut = document.getElementById('dm_alu_out').textContent;
 document.getElementById('dm_alu_out').textContent = alu_txt + hw_txt + glass_txt + "===================================\n\n" + prevOut;
 document.getElementById('dm_mat_out').textContent = generateMaterialList(dm_buckets);
 }

 function clearDomal() {
 dm_window_count = 0;
 dm_buckets = {};
 dm_glass_dict = {};
 document.getElementById('dm_h').value = "";
 document.getElementById('dm_w').value = "";
 document.getElementById('dm_alu_out').textContent = "";
 document.getElementById('dm_mat_out').textContent = "";
 }

 // ========================================================
 // 4. SLIDING WINDOW MODULE
 // ========================================================
 var sl_window_count = 0;
 var sl_buckets = {};
 var sl_glass_dict = {};

 function calculateSliding() {
 const raw_h = safeEval(document.getElementById('sl_h').value);
 const raw_w = safeEval(document.getElementById('sl_w').value);
 if (raw_h === 0 || raw_w === 0) { alert("Please enter Height and Width."); return; }

 const is_mm = document.getElementById('sl_unit').value.includes('Millimeter');
 const h_in = is_mm ? raw_h / 25.4 : raw_h;
 const w_in = is_mm ? raw_w / 25.4 : raw_w;
 const sys_type = document.getElementById('sl_sys').value;
 const t_type = document.getElementById('sl_type').value;

 let h_minus = 0, w_mod = 0, div = 2, g_h_minus = 0, g_w_mod = 0, g_c = 2;
 let han_qty = 2, int_qty = 2;
 const is_3t_2s_1j = t_type.includes('2-Shutter + 1-Jali');
 let total_shutters = 2;

 if (is_3t_2s_1j) {
 // 3-Track Outer Frame, 2-Shutter width measurement (div=2), Material = 2 Glass Shutters + 1 Jali Shutter (3 shutters total)
 div = 2; g_c = 2; total_shutters = 3; han_qty = 4; int_qty = 2;
 } else if (t_type.includes('2-Track')) { div = 2; g_c = 2; total_shutters = 2; han_qty = 2; int_qty = 2; }
 else if (t_type.includes('3-Track')) { div = 3; g_c = 3; total_shutters = 3; han_qty = 2; int_qty = 4; }
 else if (t_type.includes('4-Track')) { div = 4; g_c = 4; total_shutters = 4; han_qty = 2; int_qty = 6; }
 else if (t_type.includes('Center Open')) { div = 4; g_c = 4; total_shutters = 4; han_qty = 4; int_qty = 4; }

 const ovr = (typeof getFormulaOverrides === 'function') ? getFormulaOverrides() : {};
 if (sys_type.includes('18x40')) {
 h_minus = (ovr && ovr.sl_18x40_h_minus != null) ? parseFloat(ovr.sl_18x40_h_minus) : 1.625;
 g_h_minus = (ovr && ovr.sl_18x40_g_h_minus != null) ? parseFloat(ovr.sl_18x40_g_h_minus) : 2.75;
 g_w_mod = (ovr && ovr.sl_18x40_w_mod != null) ? parseFloat(ovr.sl_18x40_w_mod) : 0.625;
 w_mod = (div === 2) ? -6.0 : (div === 3 ? -8.0 : -11.0);
 } else if (sys_type.includes('18x50')) {
 h_minus = (ovr && ovr.sl_18x50_h_minus != null) ? parseFloat(ovr.sl_18x50_h_minus) : 1.75;
 g_h_minus = (ovr && ovr.sl_18x50_g_h_minus != null) ? parseFloat(ovr.sl_18x50_g_h_minus) : 3.0;
 g_w_mod = (ovr && ovr.sl_18x50_w_mod != null) ? parseFloat(ovr.sl_18x50_w_mod) : 0.75;
 w_mod = (div === 2) ? -7.0 : (div === 3 ? -9.5 : -12.5);
 } else if (sys_type.includes('18x60')) {
 h_minus = (ovr && ovr.sl_18x60_h_minus != null) ? parseFloat(ovr.sl_18x60_h_minus) : 1.875;
 g_h_minus = (ovr && ovr.sl_18x60_g_h_minus != null) ? parseFloat(ovr.sl_18x60_g_h_minus) : 3.125;
 g_w_mod = (ovr && ovr.sl_18x60_w_mod != null) ? parseFloat(ovr.sl_18x60_w_mod) : 0.875;
 w_mod = (div === 2) ? 0.625 : (div === 3 ? 2.75 : 5.125);
 } else if (sys_type.includes('25x50')) {
 h_minus = 1.125; g_h_minus = 4.125; g_w_mod = 0.75;
 if (t_type.includes('Center')) w_mod = -13.5;
 else w_mod = (div === 2) ? -7.5 : (div === 3 ? -9.25 : -11.5);
 } else if (sys_type.includes('25x65')) {
 h_minus = 1.125; g_h_minus = 5.5; g_w_mod = 0.75;
 if (t_type.includes('Center')) w_mod = -16.625;
 else w_mod = (div === 2) ? -8.75 : (div === 3 ? -11.25 : -14.0);
 } else if (sys_type.includes('Door Sliding Master')) {
 h_minus = 43 / 25.4; g_h_minus = 121 / 25.4; g_w_mod = -8 / 25.4;
 w_mod = (div === 2) ? -169 / 25.4 : (div === 3 ? -204 / 25.4 : -169 / 25.4);
 }

 const tb_w = (w_in + w_mod) / div;
 const handle_h = h_in - h_minus;
 const glass_h = handle_h - g_h_minus;
 const glass_w = tb_w + g_w_mod;

 sl_window_count += 1;
 const win_loc = document.getElementById('sl_loc') ? document.getElementById('sl_loc').value.trim() : "";
 const win_qty = document.getElementById('sl_qty') ? Math.max(1, parseInt(document.getElementById('sl_qty').value) || 1) : 1;
 const loc_str = win_loc ? ` [${win_loc}]` : "";
 const qty_str = win_qty > 1 ? ` (Qty: ${win_qty} Windows)` : "";

 const disp = (v) => is_mm ? toMmStr(v) : toFractionInch(v);

 let hw_txt = "--- HARDWARE & ACCESSORIES ---\n";
 hw_txt += `> Sliding Roller / Bearing: ${total_shutters * 2 * win_qty} pc\n`;
 hw_txt += `> Star Lock: ${(total_shutters >= 3 ? 2 : 1) * win_qty} pc\n> Rubber & Woolpile: Required\n`;

 const sl_aspec = getModuleAluLabel('sl');
 let alu_txt = `[Win #${sl_window_count}${loc_str} - H:${disp(h_in)} x W:${disp(w_in)} (${sys_type.split(' ')[0]} | ${t_type})${qty_str}]\n`;
 alu_txt += `> Alu Spec: ${sl_aspec}\n`;
 alu_txt += `> Track Top (${t_type.split(' ')[0]}): ${disp(w_in)} (${1 * win_qty} pc)\n`;
 alu_txt += `> Track Bottom (${t_type.split(' ')[0]}): ${disp(w_in)} (${1 * win_qty} pc)\n`;
 alu_txt += `> Track Vertical (${t_type.split(' ')[0]}): ${disp(h_in)} (${2 * win_qty} pc)\n`;
 alu_txt += `> Sash Top/Bottom: ${disp(tb_w)} (${total_shutters * 2 * win_qty} pc${is_3t_2s_1j ? ' = 2 Glass + 1 Jali' : ''})\n`;
 alu_txt += `> Sash Handle: ${disp(handle_h)} (${han_qty * win_qty} pc)\n`;
 alu_txt += `> Sash Interlock: ${disp(handle_h)} (${int_qty * win_qty} pc)\n`;

 const sl_gspec = getModuleGlassLabel('sl');
 let glass_txt = `\n--- GLASS SIZES ---\n> Glass: ${sl_gspec}\n> Glass Size: ${disp(glass_h)} x ${disp(glass_w)} (${g_c * win_qty} pc)\n`;
 if (is_3t_2s_1j) {
   glass_txt += `> Mosquito Net / Jali Size: ${disp(glass_h)} x ${disp(glass_w)} (${1 * win_qty} pc)\n`;
 }
 const glass_key = `${disp(glass_h)} x ${disp(glass_w)} || ${sl_gspec}`;
 sl_glass_dict[glass_key] = (sl_glass_dict[glass_key] || 0) + (g_c * win_qty);

 const track_type = t_type.split(' ')[0];
 const top_vert_track_key = `Track Top/Vertical (${track_type})`;
 const bot_track_key = `Track Bottom (${track_type})`;
 const sash_tb_key = "Sash Top/Bottom";
 const sash_handle_key = "Sash Handle";
 const sash_interlock_key = "Sash Interlock";

 [top_vert_track_key, bot_track_key, sash_tb_key, sash_handle_key, sash_interlock_key].forEach(k => {
 if (!sl_buckets[k]) sl_buckets[k] = [];
 });

 for(let q=0; q<win_qty; q++) sl_buckets[top_vert_track_key].push(w_in, h_in, h_in);
 for(let q=0; q<win_qty; q++) sl_buckets[bot_track_key].push(w_in);
 for (let q=0; q<win_qty; q++) { for (let i = 0; i < total_shutters * 2; i++) sl_buckets[sash_tb_key].push(tb_w); }
 for (let q=0; q<win_qty; q++) { for (let i = 0; i < han_qty; i++) sl_buckets[sash_handle_key].push(handle_h); }
 for (let q=0; q<win_qty; q++) { for (let i = 0; i < int_qty; i++) sl_buckets[sash_interlock_key].push(handle_h); }

 const prevOut = document.getElementById('sl_out').textContent;
 document.getElementById('sl_out').textContent = alu_txt + hw_txt + glass_txt + "===================================\n\n" + prevOut;
 document.getElementById('sl_mat_out').textContent = generateMaterialList(sl_buckets);
 }

 function clearSliding() {
 sl_window_count = 0;
 sl_buckets = {};
 sl_glass_dict = {};
 document.getElementById('sl_h').value = "";
 document.getElementById('sl_w').value = "";
 document.getElementById('sl_out').textContent = "";
 document.getElementById('sl_mat_out').textContent = "";
 }

 // ========================================================
 // 5. CUSTOM CASEMENT MODULE
 // ========================================================
 var cc_window_count = 0;
 var cc_buckets = { "Casement Outer": [], "Casement Mullion": [], "Casement Z Handle": [], "Square Clip (Beading)": [] };
 var cc_glass_dict = {};

 const EURO_CASEMENT_PRESETS = {
 "Euro 40 Series (21284)": { outerB: 24.8, mullionB: 24.8, overlap: 16, zGlass: 115, fixGlass: 7, tag: "Jindal 21284 / 21845" },
 "Euro 42 Series (21337)": { outerB: 27.0, mullionB: 27.0, overlap: 16, zGlass: 101, fixGlass: 7, tag: "Jindal 21337 / 21577" },
 "Euro 45 Series (21292)": { outerB: 28.0, mullionB: 28.0, overlap: 16, zGlass: 115, fixGlass: 7, tag: "Jindal 21292 / 21290" },
 "Euro 50 Series (21314)": { outerB: 24.6, mullionB: 24.6, overlap: 16, zGlass: 109, fixGlass: 7, tag: "Jindal 21314 / 21352" },
 "Custom Euro Series":     { outerB: 24.8, mullionB: 24.8, overlap: 16, zGlass: 100, fixGlass: 7, tag: "Custom Euro" }
};

function onCasementSeriesChange() {
 const sel = document.getElementById('cc_series');
 const panel = document.getElementById('cc_euro_panel');
 if (!sel || !panel) return;
 const val = sel.value;
 if (val.includes("Euro")) {
   panel.style.display = "block";
   const p = EURO_CASEMENT_PRESETS[val] || EURO_CASEMENT_PRESETS["Custom Euro Series"];
   if (document.getElementById('cc_euro_outer_b')) document.getElementById('cc_euro_outer_b').value = p.outerB;
   if (document.getElementById('cc_euro_mullion_b')) document.getElementById('cc_euro_mullion_b').value = p.mullionB;
   if (document.getElementById('cc_euro_overlap')) document.getElementById('cc_euro_overlap').value = p.overlap;
   if (document.getElementById('cc_euro_z_glass')) document.getElementById('cc_euro_z_glass').value = p.zGlass;
   if (document.getElementById('cc_euro_fix_glass')) document.getElementById('cc_euro_fix_glass').value = p.fixGlass;
   if (document.getElementById('cc_euro_badge')) document.getElementById('cc_euro_badge').textContent = p.tag + " | Fixed: -7mm";
 } else {
   panel.style.display = "none";
 }
}

function calculateCasement() {
 if (typeof iCadIsActive === 'function' && iCadIsActive('cc')) { calculateFromICad('cc'); return; }
 const raw_h = safeEval(document.getElementById('cc_h').value);
 const raw_w = safeEval(document.getElementById('cc_w').value);
 if (raw_h === 0 || raw_w === 0) { alert("Please enter Height and Width."); return; }

 const bot_h_input = safeEval(document.getElementById('cc_bot_h').value);
 const mid_w_input = safeEval(document.getElementById('cc_mid_w').value);

 const top_cols = Math.max(1, parseInt(safeEval(document.getElementById('cc_top_cols').value)) || 1);
 let top_open = parseInt(safeEval(document.getElementById('cc_top_open').value)) || 0;
 if (top_open > top_cols) top_open = top_cols;
 const top_fixed = top_cols - top_open;

 const bot_cols_str = document.getElementById('cc_bot_cols').value.trim();
 let bot_cols = bot_cols_str ? parseInt(safeEval(bot_cols_str)) || 0 : 0;
 const bot_open_str = document.getElementById('cc_bot_open').value.trim();
 let bot_open = bot_open_str ? parseInt(safeEval(bot_open_str)) || 0 : 0;
 if (bot_open > bot_cols) bot_open = bot_cols;
 const bot_fixed = bot_cols - bot_open;

 const is_mm = document.getElementById('cc_unit').value.includes('Millimeter');
 const h_mm = is_mm ? raw_h : raw_h * 25.4;
 const w_mm = is_mm ? raw_w : raw_w * 25.4;
 const bot_gap_input_mm = is_mm ? bot_h_input : bot_h_input * 25.4;
 const mid_w_mm = is_mm ? mid_w_input : mid_w_input * 25.4;

 const series = document.getElementById('cc_series').value;
 const isEuro = series.includes("Euro");
 const isFrench = isEuro && document.getElementById('cc_french_mode') && document.getElementById('cc_french_mode').checked;
 const weldAdd = (isEuro && document.getElementById('cc_upvc_weld') && document.getElementById('cc_upvc_weld').checked) ? 6 : 0;

 let overlap = 11;
 let glass_m_open = 65;
 let glass_m_fixed = 7;
 let outer_2 = series.includes("34") ? 56 : 46;
 let mullion = series.includes("34") ? 25 : 27;

 if (isEuro) {
   const p = EURO_CASEMENT_PRESETS[series] || EURO_CASEMENT_PRESETS["Custom Euro Series"];
   const outerB = parseFloat(document.getElementById('cc_euro_outer_b')?.value) || p.outerB;
   mullion = parseFloat(document.getElementById('cc_euro_mullion_b')?.value) || p.mullionB;
   outer_2 = outerB * 2;
   overlap = parseFloat(document.getElementById('cc_euro_overlap')?.value);
   if (isNaN(overlap)) overlap = p.overlap;
   glass_m_open = parseFloat(document.getElementById('cc_euro_z_glass')?.value) || p.zGlass;
   glass_m_fixed = parseFloat(document.getElementById('cc_euro_fix_glass')?.value);
   if (isNaN(glass_m_fixed)) glass_m_fixed = 7;
 }

 const rows = bot_gap_input_mm > 0 ? 2 : 1;
 const h_mullion_qty = rows === 2 ? 1 : 0;

 let bot_gap_h = 0, top_gap_h = 0;
 if (rows === 2) {
 bot_gap_h = bot_gap_input_mm;
 top_gap_h = h_mm - outer_2 - mullion - bot_gap_h;
 } else {
 top_gap_h = h_mm - outer_2;
 }

 const topIsFrench = isFrench && top_cols === 2 && top_open === 2;
 const botIsFrench = isFrench && rows === 2 && bot_cols === 2 && bot_open === 2;

 const top_v_mullion_qty = topIsFrench ? 0 : (top_cols - 1);
 const bot_v_mullion_qty = botIsFrench ? 0 : Math.max(0, bot_cols - 1);

 const top_gap_w = (w_mm - outer_2 - (top_v_mullion_qty * mullion)) / top_cols;
 let bot_gap_w = 0;
 if (bot_cols > 0) {
 bot_gap_w = (w_mm - outer_2 - (bot_v_mullion_qty * mullion)) / bot_cols;
 }

 cc_window_count += 1;
 const disp = (mmVal) => is_mm ? toMmStr(mmVal / 25.4) : toFractionInch(mmVal / 25.4);
 const win_loc = document.getElementById('cc_loc') ? document.getElementById('cc_loc').value.trim() : "";
 const win_qty = document.getElementById('cc_qty') ? Math.max(1, parseInt(document.getElementById('cc_qty').value) || 1) : 1;
 const loc_str = win_loc ? ` [${win_loc}]` : "";
 const qty_str = win_qty > 1 ? ` (Qty: ${win_qty} Windows)` : "";
 const total_sash_qty = (top_open + bot_open) * win_qty;

 const cc_aspec = getModuleAluLabel('cc');
 const modeTag = (isEuro ? (weldAdd > 0 ? " | uPVC +6mm Weld" : " | Alu Euro") : "") + (isFrench ? " | French Mullion" : "");
 let out_txt = `[${series} Win #${cc_window_count}${loc_str} | Size: ${disp(h_mm)} x ${disp(w_mm)}${qty_str}${modeTag}]\n`;
 out_txt += `> Alu Spec: ${cc_aspec}\n`;
 if (isEuro) {
   out_txt += `> Profile Deductions: Outer 2xB=${outer_2.toFixed(1)}mm, Mullion=${mullion.toFixed(1)}mm, Overlap=${overlap}mm, FixGlass=-${glass_m_fixed}mm\n`;
 }
 out_txt += "--- 1. OUTER FRAME & MULLIONS ---\n";
 const out_v_cut = h_mm + weldAdd;
 const out_h_cut = w_mm + weldAdd;
 out_txt += `> Outer Vertical: ${disp(out_v_cut)} (${2 * win_qty} pc)\n> Outer Horizontal: ${disp(out_h_cut)} (${2 * win_qty} pc)\n`;
 for (let q = 0; q < win_qty; q++) {
   cc_buckets["Casement Outer"].push(out_v_cut / 25.4, out_v_cut / 25.4, out_h_cut / 25.4, out_h_cut / 25.4);
 }

 if (h_mullion_qty > 0) {
 out_txt += `> Horizontal Divider: ${disp(w_mm - outer_2)} (${h_mullion_qty * win_qty} pc)\n`;
 for (let i = 0; i < h_mullion_qty * win_qty; i++) cc_buckets["Casement Mullion"].push((w_mm - outer_2) / 25.4);
 }
 if (top_v_mullion_qty > 0) {
 out_txt += `> Top Vert. Mullions: ${disp(top_gap_h)} (${top_v_mullion_qty * win_qty} pc)\n`;
 for (let i = 0; i < top_v_mullion_qty * win_qty; i++) cc_buckets["Casement Mullion"].push(top_gap_h / 25.4);
 }
 if (bot_v_mullion_qty > 0) {
 out_txt += `> Bot Vert. Mullions: ${disp(bot_gap_h)} (${bot_v_mullion_qty * win_qty} pc)\n`;
 for (let i = 0; i < bot_v_mullion_qty * win_qty; i++) cc_buckets["Casement Mullion"].push(bot_gap_h / 25.4);
 }

 out_txt += `\n--- 2. TOP ROW DETAILS (${top_cols} SECTIONS) ---\n`;
 let w_gap_open = top_gap_w, w_gap_fixed = top_gap_w;
 if (mid_w_mm > 0 && top_cols >= 3) {
 const num_center_gaps = top_cols - 2;
 const side_w_total = w_mm - outer_2 - (num_center_gaps * mid_w_mm) - (top_v_mullion_qty * mullion);
 const top_side_w = side_w_total / 2;
 w_gap_open = mid_w_mm;
 w_gap_fixed = top_side_w;
 }

 const cc_gspec = getModuleGlassLabel('cc');
 if (top_open > 0) {
 const frenchGap = topIsFrench ? 4 : 0;
 const s1_h_fin = top_gap_h + overlap;
 const s1_w_fin = topIsFrench ? ((w_mm - outer_2 + overlap - frenchGap) / 2) : (w_gap_open + overlap);
 const s1_h = s1_h_fin + weldAdd;
 const s1_w = s1_w_fin + weldAdd;
 const g_h = s1_h_fin - glass_m_open, g_w = s1_w_fin - glass_m_open;
 const gapLabel = topIsFrench ? `French Opening: ${disp(top_gap_h)} x ${disp(w_mm - outer_2)} (4mm Center Gap)` : `Clear Gap: ${disp(top_gap_h)} x ${disp(w_gap_open)}`;
 out_txt += `[OPENABLE SASH | Qty: ${top_open * win_qty} | ${gapLabel}]\n`;
 out_txt += ` > Z-Handle Sash: ${disp(s1_h)} x ${disp(s1_w)} (${top_open * win_qty} Sash)\n > Glass (${cc_gspec}): ${disp(g_h)} x ${disp(g_w)} (${top_open * win_qty} pc)\n`;
 if (topIsFrench) {
   out_txt += ` > French / Flying Mullion: ${disp(s1_h_fin)} (${win_qty} pc)\n`;
   for (let i = 0; i < win_qty; i++) cc_buckets["Casement Mullion"].push(s1_h_fin / 25.4);
 }
 const gKey = `${disp(g_h)} x ${disp(g_w)} (Sash) || ${cc_gspec}`;
 cc_glass_dict[gKey] = (cc_glass_dict[gKey] || 0) + (top_open * win_qty);
 for (let i = 0; i < top_open * 2 * win_qty; i++) cc_buckets["Casement Z Handle"].push(s1_h / 25.4, s1_w / 25.4);
 }

 if (top_fixed > 0) {
 out_txt += `[FIXED GLASS | Qty: ${top_fixed * win_qty} | Clear Gap: ${disp(top_gap_h)} x ${disp(w_gap_fixed)}]\n`;
 const g_h = top_gap_h - glass_m_fixed, g_w = w_gap_fixed - glass_m_fixed;
 out_txt += ` > Fixed Glass (${cc_gspec}): ${disp(g_h)} x ${disp(g_w)} (${top_fixed * win_qty} pc)\n > Square Clip (Beading): Required\n`;
 const gKey = `${disp(g_h)} x ${disp(g_w)} (Fixed) || ${cc_gspec}`;
 cc_glass_dict[gKey] = (cc_glass_dict[gKey] || 0) + (top_fixed * win_qty);
 const beading_length = (top_gap_h + w_gap_fixed) * 2 / 25.4;
 for (let i = 0; i < top_fixed * win_qty; i++) cc_buckets["Square Clip (Beading)"].push(beading_length);
 }

 if (bot_cols > 0 && rows === 2) {
 out_txt += `\n--- 3. BOTTOM ROW DETAILS (${bot_cols} SECTIONS) ---\n`;
 if (bot_open > 0) {
 const frenchGapB = botIsFrench ? 4 : 0;
 const s1_h_fin = bot_gap_h + overlap;
 const s1_w_fin = botIsFrench ? ((w_mm - outer_2 + overlap - frenchGapB) / 2) : (bot_gap_w + overlap);
 const s1_h = s1_h_fin + weldAdd;
 const s1_w = s1_w_fin + weldAdd;
 const g_h = s1_h_fin - glass_m_open, g_w = s1_w_fin - glass_m_open;
 const gapLabelB = botIsFrench ? `French Opening: ${disp(bot_gap_h)} x ${disp(w_mm - outer_2)} (4mm Center Gap)` : `Clear Gap: ${disp(bot_gap_h)} x ${disp(bot_gap_w)}`;
 out_txt += `[OPENABLE SASH | Qty: ${bot_open * win_qty} | ${gapLabelB}]\n`;
 out_txt += ` > Z-Handle Sash: ${disp(s1_h)} x ${disp(s1_w)} (${bot_open * win_qty} Sash)\n > Glass (${cc_gspec}): ${disp(g_h)} x ${disp(g_w)} (${bot_open * win_qty} pc)\n`;
 if (botIsFrench) {
   out_txt += ` > French / Flying Mullion: ${disp(s1_h_fin)} (${win_qty} pc)\n`;
   for (let i = 0; i < win_qty; i++) cc_buckets["Casement Mullion"].push(s1_h_fin / 25.4);
 }
 const gKey = `${disp(g_h)} x ${disp(g_w)} (Sash) || ${cc_gspec}`;
 cc_glass_dict[gKey] = (cc_glass_dict[gKey] || 0) + (bot_open * win_qty);
 for (let i = 0; i < bot_open * 2 * win_qty; i++) cc_buckets["Casement Z Handle"].push(s1_h / 25.4, s1_w / 25.4);
 }
 if (bot_fixed > 0) {
 out_txt += `[FIXED GLASS | Qty: ${bot_fixed * win_qty} | Clear Gap: ${disp(bot_gap_h)} x ${disp(bot_gap_w)}]\n`;
 const g_h = bot_gap_h - glass_m_fixed, g_w = bot_gap_w - glass_m_fixed;
 out_txt += ` > Fixed Glass (${cc_gspec}): ${disp(g_h)} x ${disp(g_w)} (${bot_fixed * win_qty} pc)\n > Square Clip (Beading): Required\n`;
 const gKey = `${disp(g_h)} x ${disp(g_w)} (Fixed) || ${cc_gspec}`;
 cc_glass_dict[gKey] = (cc_glass_dict[gKey] || 0) + (bot_fixed * win_qty);
 const beading_length = (bot_gap_h + bot_gap_w) * 2 / 25.4;
 for (let i = 0; i < bot_fixed * win_qty; i++) cc_buckets["Square Clip (Beading)"].push(beading_length);
 }
 }

 let hw_txt = "\n--- HARDWARE & ACCESSORIES ---\n";
 if (total_sash_qty > 0) {
 hw_txt += `> Friction Stay / Hinges: ${total_sash_qty * 2} pc\n`;
 hw_txt += `> Casement Handle: ${total_sash_qty} pc\n`;
 if (isEuro) {
   hw_txt += `> Euro Groove Espag Rod / Multi-Point Lock: ${total_sash_qty} set\n`;
   hw_txt += `> Corner Cleats (Outer + Sash): ${(4 + total_sash_qty * 4) * win_qty} pc\n`;
 }
 } else {
 hw_txt += "> No Sash Hardware Required (Fully Fixed)\n";
 }
 out_txt += hw_txt;

 const prevOut = document.getElementById('cc_out').textContent;
 document.getElementById('cc_out').textContent = out_txt + "===================================\n\n" + prevOut;
 document.getElementById('cc_mat_out').textContent = generateMaterialList(cc_buckets);
 }

 function clearCasement() {
 cc_window_count = 0;
 cc_buckets = { "Casement Outer": [], "Casement Mullion": [], "Casement Z Handle": [], "Square Clip (Beading)": [] };
 cc_glass_dict = {};
 document.getElementById('cc_h').value = "";
 document.getElementById('cc_w').value = "";
 document.getElementById('cc_bot_h').value = "0";
 document.getElementById('cc_mid_w').value = "0";
 document.getElementById('cc_top_cols').value = "1";
 document.getElementById('cc_top_open').value = "1";
 document.getElementById('cc_bot_cols').value = "0";
 document.getElementById('cc_bot_open').value = "0";
 if (document.getElementById('cc_loc')) document.getElementById('cc_loc').value = "";
 if (document.getElementById('cc_qty')) document.getElementById('cc_qty').value = "1";
 document.getElementById('cc_out').textContent = "";
 document.getElementById('cc_mat_out').textContent = "";
 }

 // ========================================================
 // 6. DOOR MASTER MODULE
 // ========================================================
 var dr_door_count = 0;
var dr_buckets = { "Door Outer Frame": [], "Door Verticals": [], "Door Top Rail": [], "Door Bottom Rail": [], "Door Middle Rail": [] };
var dr_glass_dict = {};

function onDoorTypeChanged() {
  var dType = document.getElementById('dr_type') ? document.getElementById('dr_type').value : "Standard Door";
  var box = document.getElementById('dr_custom_profile_box');
  if (box) {
    box.style.display = (dType === "Domal System Door") ? 'none' : 'block';
  }
}

function toggleDoorMiddleRailInput() {
  var sel = document.getElementById('dr_has_mid');
  var hasMid = sel ? (sel.value === 'yes') : true;
  var col1 = document.getElementById('dr_mid_h_col');
  var col2 = document.getElementById('dr_mid_lvl_col');
  if (col1) col1.style.opacity = hasMid ? '1' : '0.35';
  if (col2) col2.style.opacity = hasMid ? '1' : '0.35';
}

function applyDoorSectionPreset(preset) {
  var vInp = document.getElementById('dr_vert_w');
  var tInp = document.getElementById('dr_top_h');
  var bInp = document.getElementById('dr_bot_h');
  var mInp = document.getElementById('dr_mid_h');

  if (preset === 'commercial') {
    if (vInp) vInp.value = '1.75';
    if (tInp) tInp.value = '2.5';
    if (bInp) bInp.value = '4.0';
    if (mInp) mInp.value = '2.5';
  } else if (preset === 'jumbo') {
    if (vInp) vInp.value = '1.75';
    if (tInp) tInp.value = '2.5';
    if (bInp) bInp.value = '5.0';
    if (mInp) mInp.value = '3.0';
  } else if (preset === 'economy') {
    if (vInp) vInp.value = '1.75';
    if (tInp) tInp.value = '1.75';
    if (bInp) bInp.value = '2.5';
    if (mInp) mInp.value = '1.75';
  } else if (preset === 'slim') {
    if (vInp) vInp.value = '1.75';
    if (tInp) tInp.value = '2.0';
    if (bInp) bInp.value = '4.0';
    if (mInp) mInp.value = '2.0';
  }
}

function calculateDoor() {
  const raw_h = safeEval(document.getElementById('dr_h').value);
  const raw_w = safeEval(document.getElementById('dr_w').value);
  if (raw_h === 0 || raw_w === 0) {
    alert("Please enter Height and Width.");
    return;
  }

  const is_mm = document.getElementById('dr_unit').value.includes('Millimeter');
  const h = is_mm ? raw_h / 25.4 : raw_h;
  const w = is_mm ? raw_w / 25.4 : raw_w;
  const d_type = document.getElementById('dr_type').value;
  const palla_qty = document.getElementById('dr_palla') ? (parseInt(document.getElementById('dr_palla').value) || 2) : 2;
  const door_qty = document.getElementById('dr_qty') ? Math.max(1, parseInt(document.getElementById('dr_qty').value) || 1) : 1;
  const loc = document.getElementById('dr_loc') ? document.getElementById('dr_loc').value.trim() : "";
  const loc_str = loc ? ` [${loc}]` : "";
  const qty_str = door_qty > 1 ? ` (Qty: ${door_qty} Doors)` : "";
  const palla_str = palla_qty === 2 ? "Double Door" : "Single Door";

  const disp = (v) => is_mm ? toMmStr(v) : toFractionInch(v);
  dr_door_count += 1;

  let out = `[Door #${dr_door_count}${loc_str} - ${d_type} (${palla_str}) (${disp(h)} x ${disp(w)})${qty_str}]\n`;

  // BRANCH 1: DOMAL SYSTEM DOOR
  if (d_type === "Domal System Door") {
    let outer_v = h, outer_h = w - 3.0;
    let door_v = h - (25.0 / 25.4);
    let leaf_w = (palla_qty === 2) ? (((w - (38.0 / 25.4)) - 0.25) / 2.0) : (w - (38.0 / 25.4));
    let door_tb = leaf_w - 3.5;
    let dg_h = door_v - 7.0;
    let dg_w = door_tb - 1.0;

    out += `--- OUTER FRAME ---\n`;
    out += `> Outer Vertical: ${disp(outer_v)} (${2 * door_qty} pc)\n`;
    out += `> Outer Top Horizontal: ${disp(outer_h)} (${1 * door_qty} pc)\n`;
    for (let q = 0; q < door_qty; q++) {
      dr_buckets["Door Outer Frame"].push(outer_v, outer_v, outer_h);
    }

    out += `\n--- DOOR SASH (PALLA CUTTING) ---\n`;
    out += `> Door Sash Verticals (Stiles): ${disp(door_v)} (${2 * palla_qty * door_qty} pc)\n`;
    out += `> Door Sash Top/Bottom: ${disp(door_tb)} (${2 * palla_qty * door_qty} pc)\n`;

    for (let q = 0; q < door_qty * palla_qty; q++) {
      dr_buckets["Door Verticals"].push(door_v, door_v);
      dr_buckets["Door Top Rail"].push(door_tb);
      dr_buckets["Door Bottom Rail"].push(door_tb);
    }

    out += `\n--- GLASS / ACP SIZES ---\n`;
    const dr_gspec1 = getModuleGlassLabel('dr');
    out += `> Alu Spec: ${getModuleAluLabel('dr')}\n`;
    out += `> Door Glass (${dr_gspec1}): ${disp(dg_h)} x ${disp(dg_w)} (${palla_qty * door_qty} pc)\n`;
    const gKey = `${disp(dg_h)} x ${disp(dg_w)} (Domal Door Glass) || ${dr_gspec1}`;
    dr_glass_dict[gKey] = (dr_glass_dict[gKey] || 0) + (palla_qty * door_qty);

    out += `\n--- HARDWARE & ACCESSORIES ---\n`;
    out += `> Domal Heavy Door Hinges / Pivot Set: ${3 * palla_qty * door_qty} pc\n`;
    out += `> Heavy Touch Lock / Deadbolt Lock: ${1 * door_qty} Set\n`;
    out += `> Premium Door Handle: ${palla_qty * door_qty} Set\n`;
    out += `> Corner Cleats & Screws Set: Required\n`;

    const prevOut = document.getElementById('dr_out').textContent;
    document.getElementById('dr_out').textContent = out + "===================================\n\n" + prevOut;
    document.getElementById('dr_mat_out').textContent = generateMaterialList(dr_buckets);
    return;
  }

  // BRANCH 2: MULTI-PART CUSTOM DOOR DESIGNER (1 to 6 Parts: Glass / ACP Board / Jali Mesh)
  const vert_w = parseFloat(document.getElementById('dr_vert_w') ? document.getElementById('dr_vert_w').value : 1.75) || 1.75;
  const top_h = parseFloat(document.getElementById('dr_top_h') ? document.getElementById('dr_top_h').value : 2.5) || 2.5;
  const bot_h = parseFloat(document.getElementById('dr_bot_h') ? document.getElementById('dr_bot_h').value : 4.0) || 4.0;
  const mid_h = parseFloat(document.getElementById('dr_mid_h') ? document.getElementById('dr_mid_h').value : 2.5) || 2.5;
  const num_rows = document.getElementById('dr_rows') ? Math.max(1, Math.min(6, parseInt(document.getElementById('dr_rows').value) || 2)) : 2;
  ensureDrRowConfigsCount(num_rows);
  renderDoorVisualOnly();

  let leaf_w = 0, door_v = 0;
  let has_outer = true;
  let outer_v = h, outer_h = w - 3.0;

  if (d_type === "Standard Door") {
    door_v = h - 1.75;
    leaf_w = (palla_qty === 2) ? ((w - 3.25) / 2.0) : (w - 3.25);
  } else if (d_type === "Floor Spring Door") {
    door_v = h - 2.0;
    leaf_w = (palla_qty === 2) ? ((w - 3.5) / 2.0) : (w - 3.25);
  } else if (d_type === "Top Hung Door") {
    has_outer = false;
    door_v = h - 2.0;
    leaf_w = (palla_qty === 2) ? ((w + 4.0) / 2.0) : (w + 4.0);
  }

  const rail_w = Math.max(0, leaf_w - (2 * vert_w));
  const panel_w = rail_w + 0.75;
  const total_leaves = palla_qty * door_qty;
  const mid_rails_per_leaf = Math.max(0, num_rows - 1);

  out += `> Alu Spec: ${getModuleAluLabel('dr')} | Design: ${num_rows} ${num_rows === 1 ? 'Part' : 'Parts'}\n`;
  if (has_outer) {
    out += `--- OUTER FRAME ---\n`;
    out += `> Outer Vertical: ${disp(outer_v)} (${2 * door_qty} pc)\n`;
    out += `> Outer Top Horizontal: ${disp(outer_h)} (${1 * door_qty} pc)\n`;
    for (let q = 0; q < door_qty; q++) {
      dr_buckets["Door Outer Frame"].push(outer_v, outer_v, outer_h);
    }
  } else {
    out += `--- TOP HUNG TRACK ---\n`;
    out += `> Heavy Top Sliding Track: ${disp(w)} (${1 * door_qty} pc)\n`;
    for (let q = 0; q < door_qty; q++) {
      dr_buckets["Door Outer Frame"].push(w);
    }
  }

  out += `\n--- DOOR SASH (TUBE SECTIONS) ---\n`;
  out += `> Door Vertical Stiles: ${disp(door_v)} (${2 * total_leaves} pc) [Profile: ${disp(vert_w)}]\n`;
  out += `> Door Top Rail: ${disp(rail_w)} (${1 * total_leaves} pc) [Profile: ${disp(top_h)}]\n`;
  if (mid_rails_per_leaf > 0) {
    out += `> Door Middle Transom Rails: ${disp(rail_w)} (${mid_rails_per_leaf * total_leaves} pc) [Profile: ${disp(mid_h)} | ${mid_rails_per_leaf} per Leaf]\n`;
  }
  out += `> Door Bottom Rail: ${disp(rail_w)} (${1 * total_leaves} pc) [Profile: ${disp(bot_h)}]\n`;

  for (let q = 0; q < total_leaves; q++) {
    dr_buckets["Door Verticals"].push(door_v, door_v);
    dr_buckets["Door Top Rail"].push(rail_w);
    for (let m = 0; m < mid_rails_per_leaf; m++) {
      dr_buckets["Door Middle Rail"].push(rail_w);
    }
    dr_buckets["Door Bottom Rail"].push(rail_w);
  }

  // Resolve Clear Opening Heights & Pipe Marking from Bottom of Door Sash
  const total_open_h = Math.max(8.0, door_v - top_h - bot_h - (mid_rails_per_leaf * mid_h));
  const partOpenHeights = resolveRowHeightsGeneric(dr_row_configs, total_open_h, num_rows);

  if (num_rows > 1) {
    out += `\n--- DOOR RAIL MARKING (BOTTOM TO TOP) ---\n`;
    let runMark = bot_h;
    for (let r = 0; r < num_rows; r++) {
      const pName = getDoorPartShortName(r, num_rows);
      const pMat = dr_row_configs[r] ? dr_row_configs[r].mat : 'GLASS';
      const pOpenH = partOpenHeights[r];
      out += `• ${pName} [${pMat}]: Clear Opening ${disp(pOpenH)} x ${disp(rail_w)}`;
      if (r < num_rows - 1) {
        runMark += pOpenH;
        out += ` -> Mid Rail Mark at ${disp(runMark)} from Door Bottom\n`;
        runMark += mid_h;
      } else {
        out += ` (Top Part)\n`;
      }
    }
  }

  // Calculate Glass, ACP Board & Jali / Mesh sizes for each Part (Top to Bottom)
  const dr_gspec = getModuleGlassLabel('dr');
  out += `\n--- GLASS, ACP BOARD & JALI / MESH CUTTING SIZES ---\n`;
  let totGlassPcs = 0, totGlassSqFt = 0;
  let totAcpPcs = 0, totAcpSqFt = 0;
  let totJaliPcs = 0, totJaliSqFt = 0;

  for (let r = num_rows - 1; r >= 0; r--) {
    const pName = getDoorPartShortName(r, num_rows);
    const pMat = dr_row_configs[r] ? dr_row_configs[r].mat : 'GLASS';
    const cut_h = Math.max(2.0, partOpenHeights[r] + 0.75);
    const areaSqFt = (cut_h * panel_w * total_leaves) / 144.0;

    if (pMat === 'ACP') {
      const acpInfo = calcAcp4x8Requirement(cut_h, panel_w, total_leaves);
      out += `> [${pName} - ACP Board]: ${disp(cut_h)} x ${disp(panel_w)} (${total_leaves} pc | ${areaSqFt.toFixed(2)} Sq.Ft)\n`;
      totAcpPcs += total_leaves;
      totAcpSqFt += areaSqFt;
      dr_acp_list.push({
        rowTag: pName.replace(' Part ', 'P'),
        cutStr: `${disp(cut_h)} x ${disp(panel_w)}`,
        h_in: cut_h,
        w_in: panel_w,
        qty: total_leaves,
        buyLabel: acpInfo.buyLabel,
        areaSqFt: areaSqFt
      });
    } else if (pMat === 'JALI') {
      out += `> [${pName} - Jali / Mesh]: ${disp(cut_h)} x ${disp(panel_w)} (${total_leaves} pc | ${areaSqFt.toFixed(2)} Sq.Ft)\n`;
      totJaliPcs += total_leaves;
      totJaliSqFt += areaSqFt;
    } else {
      out += `> [${pName} - Glass (${dr_gspec})]: ${disp(cut_h)} x ${disp(panel_w)} (${total_leaves} pc | ${areaSqFt.toFixed(2)} Sq.Ft)\n`;
      totGlassPcs += total_leaves;
      totGlassSqFt += areaSqFt;
      const gKey = `${disp(cut_h)} x ${disp(panel_w)} (${pName} Door Glass) || ${dr_gspec}`;
      dr_glass_dict[gKey] = (dr_glass_dict[gKey] || 0) + total_leaves;
    }
  }

  if (totGlassPcs > 0) {
    out += `• TOTAL GLASS TO BUY: ${totGlassPcs} Pcs (${totGlassSqFt.toFixed(2)} Sq.Ft) -> Listed in 2. GLASS PDF + QR\n`;
  }
  if (totAcpPcs > 0) {
    const packedDoorAcp = packPanelsOn4x8Sheets(dr_acp_list);
    let acpBuyLbl = packedDoorAcp.length + " Full Sheet(s) (4'x8')";
    if (packedDoorAcp.length === 1 && packedDoorAcp[0].isHalfSheetOnly) acpBuyLbl = "0.5 Sheet (4'x4' Half Board)";
    out += `• TOTAL 4'x8' ACP BOARD TO BUY: ${acpBuyLbl} (${totAcpPcs} Cut Pcs | ${totAcpSqFt.toFixed(2)} Sq.Ft) -> Listed in 3. ALU PURCHASE PDF\n`;
  }
  if (totJaliPcs > 0) {
    out += `• TOTAL JALI / MESH TO BUY: ${totJaliPcs} Pcs (Net Area: ${totJaliSqFt.toFixed(2)} Sq.Ft)\n`;
  }

  out += `\n--- HARDWARE & ACCESSORIES ---\n`;
  if (d_type === "Standard Door") {
    out += `> Heavy Duty Door Butt Hinges (4"/5"): ${3 * total_leaves} pc\n`;
    out += `> Door Mortise Lock / Deadbolt Set: ${1 * door_qty} Set\n`;
    out += `> Tower Bolt (Top & Bottom): ${(palla_qty === 2 ? 2 : 1) * door_qty} pc\n`;
    out += `> Door Handles (Inner & Outer): ${total_leaves} Set\n`;
    out += `> Door Stopper / Buffer: ${total_leaves} pc\n`;
  } else if (d_type === "Floor Spring Door") {
    out += `> Heavy Double Cylinder Floor Spring: ${total_leaves} Set\n`;
    out += `> Top & Bottom Patch Fittings / Pivot: ${total_leaves} Set\n`;
    out += `> Floor Spring Patch Lock: ${1 * door_qty} Set\n`;
    out += `> Long Stainless Steel Pull Handle: ${total_leaves} Set\n`;
  } else if (d_type === "Top Hung Door") {
    out += `> Heavy 4-Wheel Top Sliding Rollers: ${2 * total_leaves} pc\n`;
    out += `> Bottom Floor Guide Roller / Channel: ${total_leaves} pc\n`;
    out += `> Concealed Flush Handle / Pull Handle: ${total_leaves} Set\n`;
    out += `> Sliding Door Hook Lock: ${1 * door_qty} Set\n`;
  }
  out += `> Square Clip (Beading) / Gasket Girth: Approx ${Math.round(((door_v * 2) + (rail_w * 2 * num_rows)) * total_leaves / 12)} Running Feet\n`;

  const prevOut = document.getElementById('dr_out').textContent;
  document.getElementById('dr_out').textContent = out + "===================================\n\n" + prevOut;
  document.getElementById('dr_mat_out').textContent = generateMaterialList(dr_buckets);
  renderSheetLayoutBoxUI('dr_sheet_layout_box', dr_acp_list, 'Door');
}

function clearDoor() {
  dr_door_count = 0;
  dr_buckets = { "Door Outer Frame": [], "Door Verticals": [], "Door Top Rail": [], "Door Bottom Rail": [], "Door Middle Rail": [] };
  dr_glass_dict = {};
  dr_acp_list = [];
  document.getElementById('dr_h').value = "";
  document.getElementById('dr_w').value = "";
  if (document.getElementById('dr_loc')) document.getElementById('dr_loc').value = "";
  document.getElementById('dr_out').textContent = "";
  document.getElementById('dr_mat_out').textContent = "";
  renderSheetLayoutBoxUI('dr_sheet_layout_box', [], 'Door');
}

 // ========================================================
 // 7. PARTITION MODULE
 // ========================================================
 var pt_part_count = 0; pt_pdf_jobs = [];
 var pt_buckets = { "Single Glazing": [], "Double Glazing": [], "Door Sash": [] };
 var pt_glass_dict = {};
 var pt_pdf_jobs = [];

 function onPartitionTypeChanged() {
  var pType = document.getElementById('pt_type') ? document.getElementById('pt_type').value : 'Fixed Partition';
  var hLbl = document.getElementById('pt_sub_h_lbl');
  var wLbl = document.getElementById('pt_sub_w_lbl');
  var winBox = document.getElementById('pt_window_options_box');
  var doorBox = document.getElementById('pt_door_options_box');
  var cWhWrap = document.getElementById('pt_combo_wh_wrap');
  var cWwWrap = document.getElementById('pt_combo_ww_wrap');

  var ensureCenterWin = function() {
    var hasWinCell = Object.values(pt_cell_overrides || {}).some(v => v === 'WINDOW') || (pt_row_configs || []).some(r => r.mat === 'WINDOW');
    if (!hasWinCell) {
      var rows = Math.max(1, parseInt(document.getElementById('pt_rows')?.value) || 3);
      var cols = Math.max(1, parseInt(document.getElementById('pt_cols')?.value) || 3);
      var midR = Math.floor(rows / 2);
      var midC = Math.floor(cols / 2);
      pt_cell_overrides[midR + '_' + midC] = 'WINDOW';
    }
  };

  if (pType === 'Door + Window + Partition') {
    if (hLbl) { hLbl.textContent = 'Door Height (H):'; hLbl.style.color = '#0369a1'; hLbl.style.fontWeight = '700'; }
    if (wLbl) { wLbl.textContent = 'Door Width (W):'; wLbl.style.color = '#0369a1'; wLbl.style.fontWeight = '700'; }
    if (doorBox) doorBox.style.display = 'block';
    if (winBox) winBox.style.display = 'block';
    if (cWhWrap) cWhWrap.style.display = 'block';
    if (cWwWrap) cWwWrap.style.display = 'block';
    ensureCenterWin();
  } else if (pType === 'Window + Partition') {
    if (hLbl) { hLbl.textContent = 'Window Height (H):'; hLbl.style.color = '#6d28d9'; hLbl.style.fontWeight = '700'; }
    if (wLbl) { wLbl.textContent = 'Window Width (W):'; wLbl.style.color = '#6d28d9'; wLbl.style.fontWeight = '700'; }
    if (winBox) winBox.style.display = 'block';
    if (doorBox) doorBox.style.display = 'none';
    if (cWhWrap) cWhWrap.style.display = 'none';
    if (cWwWrap) cWwWrap.style.display = 'none';
    ensureCenterWin();
  } else if (pType === 'Door + Partition') {
    if (hLbl) { hLbl.textContent = 'Door Height (H):'; hLbl.style.color = '#0369a1'; hLbl.style.fontWeight = '700'; }
    if (wLbl) { wLbl.textContent = 'Door Width (W):'; wLbl.style.color = '#0369a1'; wLbl.style.fontWeight = '700'; }
    if (winBox) winBox.style.display = 'none';
    if (doorBox) doorBox.style.display = 'block';
    if (cWhWrap) cWhWrap.style.display = 'none';
    if (cWwWrap) cWwWrap.style.display = 'none';
  } else {
    if (hLbl) { hLbl.textContent = 'Door Height (Optional):'; hLbl.style.color = ''; hLbl.style.fontWeight = ''; }
    if (wLbl) { wLbl.textContent = 'Door Width (Optional):'; wLbl.style.color = ''; wLbl.style.fontWeight = ''; }
    var hasAnyWin = Object.values(pt_cell_overrides || {}).some(v => v === 'WINDOW') || (pt_row_configs || []).some(r => r.mat === 'WINDOW');
    if (winBox) winBox.style.display = hasAnyWin ? 'block' : 'none';
    if (doorBox) doorBox.style.display = 'none';
    if (cWhWrap) cWhWrap.style.display = 'none';
    if (cWwWrap) cWwWrap.style.display = 'none';
  }
  if (typeof renderPartitionWallVisualOnly === 'function') renderPartitionWallVisualOnly();
  if (typeof renderLiveColorGlassPreview === 'function') renderLiveColorGlassPreview('pt');
}

function calculatePartition() {
  const d = ptCadGetDims();
  if (d.h <= 0 || d.w <= 0) {
    alert("Please enter Total Wall Height (H) and Width (W).");
    return;
  }
  const disp = (v) => d.isMm ? toMmStr(v) : toFractionInch(v);
  pt_part_count += 1;

  const tube_face = parseFloat(document.getElementById('pt_tube_face')?.value) || 1.5;
  const secTop = parseFloat(document.getElementById('pt_sec_top')?.value) || 2.5;
  const secMid = parseFloat(document.getElementById('pt_sec_mid')?.value) || 2.5;
  const secBot = parseFloat(document.getElementById('pt_sec_bot')?.value) || 4.0;
  const secVert = parseFloat(document.getElementById('pt_sec_vert')?.value) || 1.75;
  const tube_label = getPartitionTubeLabel();
  const sg_key = `Single Glazing [${tube_label}]`;
  const dg_key = `Double Glazing [${tube_label}]`;
  const clip_key = `Glazing Clip (Partition + Door Same)`;
  if (!pt_buckets[sg_key]) pt_buckets[sg_key] = [];
  if (!pt_buckets[dg_key]) pt_buckets[dg_key] = [];
  if (!pt_buckets[clip_key]) pt_buckets[clip_key] = [];
  const pt_gspec = getModuleGlassLabel('pt');

  const leaves = [], splits = [], doorGroups = [];
  ptCadLayout(pt_cad_tree, 0, 0, d.w, d.h, leaves, splits, doorGroups);
  leaves.forEach(lf => { lf._tc = ptCadComputeTrueCell(lf, d, tube_face); });

  const grossSqFt = (d.h * d.w) / 144.0;
  let minusWallSqFt = 0;

  const intDoorType = document.getElementById('pt_int_door_type')?.value || 'Standard Door';
  const intWinSys = document.getElementById('pt_int_win_sys')?.value || '18x40 System';
  const intWinTrack = document.getElementById('pt_int_win_track')?.value || '2-Track';
  const ofFlags = `Top:${pt_outer_frame.top?'ON':'OFF'} | Bot:${pt_outer_frame.bot?'ON':'OFF'} | L:${pt_outer_frame.left?'ON':'OFF'} | R:${pt_outer_frame.right?'ON':'OFF'} | WinFrame:${pt_outer_frame.win?'ON':'OFF'}`;

  const pdfJob = {
    jobTitle: `Partition #${pt_part_count} (${disp(d.h)} H x ${disp(d.w)} W)`,
    tubeLabel: `${tube_label} (${disp(tube_face)} Face)`,
    aluLabel: getModuleAluLabel('pt'),
    outerConfig: ofFlags,
    doorSystem: intDoorType,
    winSystem: `${intWinSys} (${intWinTrack})`,
    partitionPipes: [],
    doorRows: [],
    windowRows: [],
    panelRows: [],
    clipSummary: null
  };

  let out = `[Partition #${pt_part_count} — PRO CAD DESIGN (${disp(d.h)} H × ${disp(d.w)} W)]\n`;
  out += `> Section Tube: ${tube_label} (${disp(tube_face)} Face) | Alu: ${getModuleAluLabel('pt')}\n`;
  out += `> Outer Frame Config: ${ofFlags}\n`;
  if (pt_active_combo_mode === 'PT_DOOR' || pt_active_combo_mode === 'ALL_3') out += `> Attached Door System: ${intDoorType}\n`;
  if (pt_active_combo_mode === 'PT_WIN' || pt_active_combo_mode === 'ALL_3') out += `> Attached Window System: ${intWinSys} (${intWinTrack})\n`;
  out += `-----------------------------------\n`;
  out += `1. PARTITION OUTER FRAME & DIVIDER PIPES\n`;
  out += `-----------------------------------\n`;

  let leftOuterLen = 0, rightOuterLen = 0, topOuterLen = 0;
  let botOuterSegs = [];
  leaves.forEach(lf => {
    const tc = lf._tc;
    if (tc.outerL) leftOuterLen += lf.h;
    if (tc.outerR) rightOuterLen += lf.h;
    if (tc.outerT) topOuterLen += lf.w;
    if (tc.outerB) botOuterSegs.push({ x1: lf.x, x2: lf.x + lf.w });
  });

  if (leftOuterLen > 2) {
    out += `> Left Outer Vertical (${tube_label}): ${disp(leftOuterLen)} (1 pc)\n`;
    pt_buckets[sg_key].push(leftOuterLen);
    pdfJob.partitionPipes.push({ part: 'Left Outer Vertical', profile: tube_label, size: disp(leftOuterLen), qty: '1 pc' });
  } else {
    out += `> Left Outer Vertical: NOT REQUIRED (0 pc)\n`;
  }
  if (rightOuterLen > 2) {
    out += `> Right Outer Vertical (${tube_label}): ${disp(rightOuterLen)} (1 pc)\n`;
    pt_buckets[sg_key].push(rightOuterLen);
    pdfJob.partitionPipes.push({ part: 'Right Outer Vertical', profile: tube_label, size: disp(rightOuterLen), qty: '1 pc' });
  } else {
    out += `> Right Outer Vertical: NOT REQUIRED (0 pc)\n`;
  }
  const topNetLen = Math.max(0, topOuterLen - (leftOuterLen > 2 ? tube_face : 0) - (rightOuterLen > 2 ? tube_face : 0));
  if (topNetLen > 2) {
    out += `> Top Outer Horizontal (${tube_label}): ${disp(topNetLen)} (1 pc)\n`;
    pt_buckets[sg_key].push(topNetLen);
    pdfJob.partitionPipes.push({ part: 'Top Outer Horizontal', profile: tube_label, size: disp(topNetLen), qty: '1 pc' });
  } else {
    out += `> Top Outer Horizontal: NOT REQUIRED (0 pc)\n`;
  }

  botOuterSegs.sort((a, b) => a.x1 - b.x1);
  const mergedBot = [];
  botOuterSegs.forEach(s => {
    if (!mergedBot.length || s.x1 > mergedBot[mergedBot.length - 1].x2 + 0.3) mergedBot.push({ x1: s.x1, x2: s.x2 });
    else mergedBot[mergedBot.length - 1].x2 = Math.max(mergedBot[mergedBot.length - 1].x2, s.x2);
  });
  if (mergedBot.length > 0) {
    mergedBot.forEach((seg, sIdx) => {
      const segDedL = (seg.x1 <= 0.15 && leftOuterLen > 2) ? tube_face : (seg.x1 > 0.15 ? tube_face / 2 : 0);
      const segDedR = (seg.x2 >= d.w - 0.15 && rightOuterLen > 2) ? tube_face : (seg.x2 < d.w - 0.15 ? tube_face / 2 : 0);
      const segLen = Math.max(0, (seg.x2 - seg.x1) - segDedL - segDedR);
      if (segLen > 2) {
        out += `> Bottom Base Tube #${sIdx + 1} (${tube_label}): ${disp(segLen)} (1 pc)\n`;
        pt_buckets[sg_key].push(segLen);
        pdfJob.partitionPipes.push({ part: `Bottom Base Tube #${sIdx + 1}`, profile: tube_label, size: disp(segLen), qty: '1 pc' });
      }
    });
  } else {
    out += `> Bottom Floor Base Tube: NOT REQUIRED (0 pc — Door / Wall / Bot OFF / No Win Frame)\n`;
  }

  doorGroups.forEach(function(dg, idx) {
    const clearH = Math.max(24, dg.h - (pt_outer_frame.top && dg.y <= 0.15 ? tube_face : tube_face / 2));
    const clearW = Math.max(12, dg.w - (pt_outer_frame.left && dg.x <= 0.15 ? tube_face : tube_face / 2) - (pt_outer_frame.right && dg.x + dg.w >= d.w - 0.15 ? tube_face : tube_face / 2));
    const shutH = Math.max(20, clearH - 0.5);
    const shutW = Math.max(10, clearW - 0.375);
    const drw = Math.max(6, shutW - (2 * secVert));
    out += `> Multi-Part Door #${idx + 1} [Inner Clear: ${disp(clearH)} H × ${disp(clearW)} W -> Auto Shutter: ${disp(shutH)} × ${disp(shutW)}]:\n`;
    out += `   • Vertical Stiles (${disp(secVert)} Sec): ${disp(shutH)} (2 pc)\n`;
    out += `   • Top Rail (${disp(secTop)} Sec): ${disp(drw)} (1 pc) | Bottom Rail (${disp(secBot)} Sec): ${disp(drw)} (1 pc)\n`;
    pt_buckets["Door Sash"].push(shutH, shutH, drw, drw);
    pdfJob.doorRows.push({ part: `Multi-Part Door #${idx + 1} — Inner Clear`, detail: intDoorType, size: `${disp(clearH)} H x ${disp(clearW)} W`, qty: '1 Door' });
    pdfJob.doorRows.push({ part: `Door #${idx + 1} — Vertical Stiles`, detail: `${disp(secVert)} Vert Section`, size: disp(shutH), qty: '2 pc' });
    pdfJob.doorRows.push({ part: `Door #${idx + 1} — Top & Bottom Rails`, detail: `Top ${disp(secTop)} / Bot ${disp(secBot)}`, size: disp(drw), qty: '2 pc (1T + 1B)' });
  });

  splits.forEach(function(sp, idx) {
    const cutL = Math.max(4, sp.len - tube_face);
    const secTag = sp.dir === 'V' ? `Vert ${disp(secVert)}` : `Mid ${disp(secMid)}`;
    const divName = sp.dir === 'V' ? `Divider #${idx + 1} (Vertical Post)` : `Divider #${idx + 1} (Horizontal Transom)`;
    out += `> ${divName} [${secTag}]: ${disp(cutL)} (1 pc)\n`;
    pt_buckets[dg_key].push(cutL);
    pdfJob.partitionPipes.push({ part: divName, profile: `${tube_label} (${secTag})`, size: disp(cutL), qty: '1 pc' });
  });

  out += `\n-----------------------------------\n`;
  out += `2. DOOR, WINDOW & FIXED PANEL CUTTING LIST\n`;
  out += `-----------------------------------\n`;
  let totGlassPcs = 0, totGlassSqFt = 0;
  let totAcpPcs = 0, totAcpSqFt = 0;
  let totJaliPcs = 0, totJaliSqFt = 0;
  let ptClipInches = 0, doorClipInches = 0;

  leaves.forEach(function(lf, idx) {
    const tag = `Box #${idx + 1}`;
    const tc = lf._tc;
    const iw = tc.innerW;
    const ih = tc.innerH;
    const cutW = Math.max(2, iw - 0.125);
    const cutH = Math.max(2, ih - 0.125);
    const boxSqFt = (lf.h * lf.w) / 144.0;

    if (lf.mat === 'WALL_MINUS') {
      minusWallSqFt += boxSqFt;
      out += `• ${tag} [WALL / CUTOUT MINUS]: -${boxSqFt.toFixed(2)} Sq.Ft (${disp(lf.h)} × ${disp(lf.w)}) -> DEDUCTED!\n`;
      pdfJob.panelRows.push({ part: tag, detail: 'WALL / BRICK MINUS (No Pipe)', size: `${disp(lf.h)} H x ${disp(lf.w)} W`, qty: `-${boxSqFt.toFixed(2)} Sq.Ft` });
    } else if (lf.mat === 'ACP') {
      const sq = (cutH * cutW) / 144;
      ptClipInches += 2 * (iw + ih);
      pt_buckets[clip_key].push(iw, iw, ih, ih);
      out += `• ${tag} [PARTITION ACP BOARD] Clear: ${disp(ih)} × ${disp(iw)} -> Cut: ${disp(cutH)} × ${disp(cutW)} (1 pc | ${sq.toFixed(2)} Sq.Ft)\n`;
      totAcpPcs++; totAcpSqFt += sq;
      pt_acp_list.push({ rowTag: tag, cutStr: `${disp(cutH)} x ${disp(cutW)}`, h_in: cutH, w_in: cutW, qty: 1, buyLabel: '', areaSqFt: sq });
      pdfJob.panelRows.push({ part: `${tag} (Partition)`, detail: 'ACP Board Panel', size: `${disp(cutH)} H x ${disp(cutW)} W`, qty: `1 pc (${sq.toFixed(2)} Sq.Ft)` });
    } else if (lf.mat === 'JALI') {
      const sq = (cutH * cutW) / 144;
      ptClipInches += 2 * (iw + ih);
      pt_buckets[clip_key].push(iw, iw, ih, ih);
      out += `• ${tag} [PARTITION JALI / MESH] Clear: ${disp(ih)} × ${disp(iw)} -> Cut: ${disp(cutH)} × ${disp(cutW)} (1 pc | ${sq.toFixed(2)} Sq.Ft)\n`;
      totJaliPcs++; totJaliSqFt += sq;
      pdfJob.panelRows.push({ part: `${tag} (Partition)`, detail: 'Mosquito / SS Jali Mesh', size: `${disp(cutH)} H x ${disp(cutW)} W`, qty: `1 pc (${sq.toFixed(2)} Sq.Ft)` });
    } else if (lf.mat === 'DOOR_1' || lf.mat === 'DOOR_2') {
      const nL = lf.mat === 'DOOR_2' ? 2 : 1;
      const dParts = (Array.isArray(lf.doorParts) && lf.doorParts.length) ? lf.doorParts : ptCadGetDefaultDoorParts();
      const midRailCount = Math.max(0, dParts.length - 1);
      const shutH = Math.max(20, ih - 0.5);
      const shutW = Math.max(10, (iw - (nL === 2 ? 0.5 : 0.375)) / nL);
      const railW = Math.max(6, shutW - (2 * secVert));
      const availPanelH = Math.max(6, shutH - secTop - secBot - (midRailCount * secMid));
      const partHeights = ptCadComputeDoorPartHeights(dParts, availPanelH);
      const panelCutW = Math.max(4, railW + 0.5);
      for (let li = 0; li < nL; li++) {
        pt_buckets["Door Sash"].push(shutH, shutH, railW, railW);
        for (let mr = 0; mr < midRailCount; mr++) pt_buckets["Door Sash"].push(railW);
      }
      const dTitle = nL === 2 ? 'DOUBLE DOOR' : 'SINGLE DOOR';
      out += `• ${tag} [${dTitle} — ${dParts.length} PART(S)] Inner Clear: ${disp(ih)} H × ${disp(iw)} W\n`;
      out += `   -> Auto Shutter (${nL} Leaf): ${disp(shutH)} H × ${disp(shutW)} W | Top/Bot Rails: ${disp(railW)} (${2*nL} pc)${midRailCount > 0 ? ' | Mid Rails: ' + disp(railW) + ' (' + (midRailCount*nL) + ' pc)' : ''}\n`;

      pdfJob.doorRows.push({ part: `${tag} ${dTitle} — Inner Clear`, detail: `${intDoorType} (${dParts.length} Parts)`, size: `${disp(ih)} H x ${disp(iw)} W`, qty: `${nL} Leaf` });
      pdfJob.doorRows.push({ part: `${tag} Door Vertical Stiles`, detail: `${disp(secVert)} Vert Section`, size: disp(shutH), qty: `${2 * nL} pc` });
      pdfJob.doorRows.push({ part: `${tag} Door Top & Bot Rails`, detail: `Top ${disp(secTop)} / Bot ${disp(secBot)}`, size: disp(railW), qty: `${2 * nL} pc` });
      if (midRailCount > 0) {
        pdfJob.doorRows.push({ part: `${tag} Door Middle Rails`, detail: `${disp(secMid)} Mid Section`, size: disp(railW), qty: `${midRailCount * nL} pc` });
      }

      dParts.forEach(function(dp, pi) {
        const ph = Math.max(4, partHeights[pi] + 0.5);
        const pLabel = `Part ${pi + 1}`;
        doorClipInches += 2 * (partHeights[pi] + railW) * nL;
        for (let li = 0; li < nL; li++) pt_buckets[clip_key].push(partHeights[pi], partHeights[pi], railW, railW);
        if (dp.mat === 'ACP') {
          out += `   -> ${pLabel} [ACP BOARD]: ${disp(ph)} × ${disp(panelCutW)} (${nL} pc)\n`;
          pt_acp_list.push({ rowTag: `${tag} Door ${pLabel} ACP`, cutStr: `${disp(ph)} x ${disp(panelCutW)}`, h_in: ph, w_in: panelCutW, qty: nL, buyLabel: '', areaSqFt: (ph * panelCutW * nL) / 144 });
          totAcpPcs += nL; totAcpSqFt += (ph * panelCutW * nL) / 144;
          pdfJob.doorRows.push({ part: `${tag} Door ${pLabel} Panel`, detail: 'ACP Board (Same Clip)', size: `${disp(ph)} H x ${disp(panelCutW)} W`, qty: `${nL} pc` });
        } else if (dp.mat === 'JALI') {
          out += `   -> ${pLabel} [JALI / MESH]: ${disp(ph)} × ${disp(panelCutW)} (${nL} pc)\n`;
          totJaliPcs += nL; totJaliSqFt += (ph * panelCutW * nL) / 144;
          pdfJob.doorRows.push({ part: `${tag} Door ${pLabel} Panel`, detail: 'Jali / Mesh (Same Clip)', size: `${disp(ph)} H x ${disp(panelCutW)} W`, qty: `${nL} pc` });
        } else {
          out += `   -> ${pLabel} [GLASS]: ${disp(ph)} × ${disp(panelCutW)} (${nL} pc)\n`;
          pt_glass_dict[`${disp(ph)} x ${disp(panelCutW)} (${tag} Door ${pLabel}) || ${pt_gspec}`] = (pt_glass_dict[`${disp(ph)} x ${disp(panelCutW)} (${tag} Door ${pLabel}) || ${pt_gspec}`] || 0) + nL;
          totGlassPcs += nL; totGlassSqFt += (ph * panelCutW * nL) / 144;
          pdfJob.doorRows.push({ part: `${tag} Door ${pLabel} Panel`, detail: `${pt_gspec} Glass (Same Clip)`, size: `${disp(ph)} H x ${disp(panelCutW)} W`, qty: `${nL} pc` });
        }
      });
    } else if (lf.mat === 'SLIDE_2T' || lf.mat === 'SLIDE_3T') {
      const tr = lf.mat === 'SLIDE_3T' ? 3 : 2;
      const winOuterTopBot = iw;
      const winOuterSide = ih;
      const winShutH = Math.max(6, ih - 1.5);
      const winShutW = Math.max(6, (iw / tr) + 0.75);
      const wgH = Math.max(4, ih - 5.25), wgW = Math.max(4, (iw - 3.0) / tr);
      const wfTag = pt_outer_frame.win ? 'Inside Partition Frame' : 'Direct Wall-to-Wall (No Outer Pipe)';
      const winKey = `Window Outer [${intWinSys} ${tr}T]`;
      const winShutKey = `Window Shutter [${intWinSys}]`;
      if (!pt_buckets[winKey]) pt_buckets[winKey] = [];
      if (!pt_buckets[winShutKey]) pt_buckets[winShutKey] = [];
      pt_buckets[winKey].push(winOuterTopBot, winOuterTopBot, winOuterSide, winOuterSide);
      for (let ti = 0; ti < tr; ti++) pt_buckets[winShutKey].push(winShutH, winShutH, winShutW, winShutW);
      out += `• ${tag} [${tr}-TRACK SLIDING WINDOW — ${wfTag}]\n`;
      out += `   -> Window Outer Frame Cut (${intWinSys}): Top/Bot Track ${disp(winOuterTopBot)} (2 pc) | Sides ${disp(winOuterSide)} (2 pc)\n`;
      out += `   -> Window Shutter Cut (${tr} Leaf): Vert/Interlock ${disp(winShutH)} (${2*tr} pc) | Top/Bot ${disp(winShutW)} (${2*tr} pc)\n`;
      out += `   -> Window Glass Cut: ${disp(wgH)} × ${disp(wgW)} (2 pc)${tr === 3 ? ' + 1 Jali' : ''}\n`;
      pt_glass_dict[`${disp(wgH)} x ${disp(wgW)} (${tag} ${tr}T Slide) || ${pt_gspec}`] = (pt_glass_dict[`${disp(wgH)} x ${disp(wgW)} (${tag} ${tr}T Slide) || ${pt_gspec}`] || 0) + 2;
      totGlassPcs += 2; totGlassSqFt += (wgH * wgW * 2) / 144;
      if (tr === 3) { totJaliPcs++; totJaliSqFt += (wgH * wgW) / 144; }

      pdfJob.windowRows.push({ part: `${tag} ${tr}T Window — Outer Top/Bot Track`, detail: `${intWinSys} (${wfTag})`, size: disp(winOuterTopBot), qty: '2 pc' });
      pdfJob.windowRows.push({ part: `${tag} ${tr}T Window — Outer Side Frame`, detail: `${intWinSys} (${tr}-Track)`, size: disp(winOuterSide), qty: '2 pc' });
      pdfJob.windowRows.push({ part: `${tag} ${tr}T Shutter — Handle & Interlock`, detail: `${tr} Sliding Shutters`, size: disp(winShutH), qty: `${2 * tr} pc` });
      pdfJob.windowRows.push({ part: `${tag} ${tr}T Shutter — Top & Bottom Rail`, detail: `${tr} Sliding Shutters`, size: disp(winShutW), qty: `${2 * tr} pc` });
      pdfJob.windowRows.push({ part: `${tag} ${tr}T Window Glass${tr===3?' + Jali':''}`, detail: pt_gspec, size: `${disp(wgH)} H x ${disp(wgW)} W`, qty: tr === 3 ? '2 Glass + 1 Jali' : '2 pc' });
    } else if (lf.mat === 'H_OPEN') {
      const oh = Math.max(4, ih - 3.0), ow = Math.max(4, iw - 3.0);
      out += `• ${tag} [H-SEC OPENABLE WIN] Exact Size: ${disp(ih)} × ${disp(iw)} -> Glass: ${disp(oh)} × ${disp(ow)} (1 pc)\n`;
      pt_glass_dict[`${disp(oh)} x ${disp(ow)} (${tag} OpenWin) || ${pt_gspec}`] = (pt_glass_dict[`${disp(oh)} x ${disp(ow)} (${tag} OpenWin) || ${pt_gspec}`] || 0) + 1;
      totGlassPcs++; totGlassSqFt += (oh * ow) / 144;
      pdfJob.windowRows.push({ part: `${tag} Openable Window Frame`, detail: 'H-Section Openable', size: `${disp(ih)} H x ${disp(iw)} W`, qty: '1 Set' });
      pdfJob.windowRows.push({ part: `${tag} Openable Window Glass`, detail: pt_gspec, size: `${disp(oh)} H x ${disp(ow)} W`, qty: '1 pc' });
    } else {
      const sq = (cutH * cutW) / 144;
      ptClipInches += 2 * (iw + ih);
      pt_buckets[clip_key].push(iw, iw, ih, ih);
      out += `• ${tag} [PARTITION FIXED GLASS] Clear: ${disp(ih)} × ${disp(iw)} -> Cut: ${disp(cutH)} × ${disp(cutW)} (1 pc | ${sq.toFixed(2)} Sq.Ft)\n`;
      pt_glass_dict[`${disp(cutH)} x ${disp(cutW)} (${tag} Glass) || ${pt_gspec}`] = (pt_glass_dict[`${disp(cutH)} x ${disp(cutW)} (${tag} Glass) || ${pt_gspec}`] || 0) + 1;
      totGlassPcs++; totGlassSqFt += sq;
      pdfJob.panelRows.push({ part: `${tag} (Partition)`, detail: `${pt_gspec} Fixed Glass`, size: `${disp(cutH)} H x ${disp(cutW)} W`, qty: `1 pc (${sq.toFixed(2)} Sq.Ft)` });
    }
  });

  const ptClipFt = ptClipInches / 12.0;
  const doorClipFt = doorClipInches / 12.0;
  const totalClipFt = ptClipFt + doorClipFt;
  const clipLengths12 = totalClipFt > 0 ? Math.ceil((totalClipFt * 1.08) / 12.0) : 0;
  const gasketFt = totalClipFt * 2.0; // Both inner & outer sides of glass/ACP
  const netBillableSqFt = Math.max(0, grossSqFt - minusWallSqFt);
  const packedAcp = totAcpPcs > 0 ? packPanelsOn4x8Sheets(pt_acp_list) : [];

  pdfJob.clipSummary = {
    ptClipFt, doorClipFt, totalClipFt, clipLengths12, gasketFt,
    grossSqFt, minusWallSqFt, netBillableSqFt,
    totGlassPcs, totGlassSqFt, totAcpPcs, acpSheets: packedAcp.length, totJaliPcs, totJaliSqFt
  };
  pt_pdf_jobs.unshift(pdfJob);

  out += `\n-----------------------------------\n`;
  out += `3. GLAZING CLIP (PARTITION + DOOR SAME) & SUMMARY\n`;
  out += `-----------------------------------\n`;
  out += `• GLAZING CLIP / BEAD (Partition + Door Combined — SAME CLIP):\n`;
  out += `   -> Partition Panels Clip: ${ptClipFt.toFixed(1)} R.Ft | Door Panels Clip: ${doorClipFt.toFixed(1)} R.Ft\n`;
  out += `   -> TOTAL CLIP TO BUY: ${totalClipFt.toFixed(1)} R.Ft => BUY ${clipLengths12} LENGTHS (12 Ft Standard Clip)\n`;
  out += `• EPDM RUBBER GASKET (2 Sides): ${gasketFt.toFixed(1)} R.Ft\n`;
  out += `• GROSS WALL AREA: ${grossSqFt.toFixed(2)} Sq.Ft`;
  if (minusWallSqFt > 0) out += `  |  WALL MINUS: -${minusWallSqFt.toFixed(2)} Sq.Ft`;
  out += `\n• NET WORK AREA: ${netBillableSqFt.toFixed(2)} Sq.Ft\n`;
  out += `• TOTAL GLASS: ${totGlassPcs} Pcs (${totGlassSqFt.toFixed(2)} Sq.Ft) -> 2. GLASS PDF + QR\n`;
  if (totAcpPcs > 0) out += `• TOTAL 4'x8' ACP BOARD: ${packedAcp.length} Sheet(s) (${totAcpPcs} Cut Pcs)\n`;
  if (totJaliPcs > 0) out += `• TOTAL JALI / MESH: ${totJaliPcs} Pcs (${totJaliSqFt.toFixed(2)} Sq.Ft)\n`;

  const prevOut = document.getElementById('pt_out').textContent;
  document.getElementById('pt_out').textContent = out + "===================================\n\n" + prevOut;
  document.getElementById('pt_mat_out').textContent = generateMaterialList(pt_buckets);
  renderSheetLayoutBoxUI('pt_sheet_layout_box', pt_acp_list, 'Partition');
  renderPtCadDesigner();
}

function clearPartition() {
 pt_part_count = 0; pt_pdf_jobs = [];
 pt_buckets = { "Single Glazing": [], "Double Glazing": [], "Door Sash": [] };
 pt_glass_dict = {};
 pt_acp_list = [];
 document.getElementById('pt_h').value = "";
 document.getElementById('pt_w').value = "";
 document.getElementById('pt_dh').value = "";
 document.getElementById('pt_dw').value = "";
 document.getElementById('pt_out').textContent = "";
 document.getElementById('pt_mat_out').textContent = "";
 renderSheetLayoutBoxUI('pt_sheet_layout_box', [], 'Partition');
 }

 // ========================================================
 // 8. CEILING ESTIMATOR MODULE
 // ========================================================
 function calculateCeiling() {
 const l = safeEval(document.getElementById('ce_l').value);
 const w = safeEval(document.getElementById('ce_w').value);
 if (l === 0 || w === 0) { alert("Please enter Length and Width."); return; }

 const area = l * w;
 const perimeter = 2 * (l + w);
 let mat_txt = "";

 if (document.getElementById('ce_type').value === "Gypsum Board") {
 const area_sqm = area / 10.764;
 const safe_area = area * 1.05;
 const pcs_6x4 = Math.ceil(safe_area / 24);
 const waste_6x4 = (pcs_6x4 * 24) - safe_area;
 const pcs_8x4 = Math.ceil(safe_area / 32);
 const waste_8x4 = (pcs_8x4 * 32) - safe_area;

 let chosen_board = "Gypsum Board (6ft x 4ft)", final_boards = pcs_6x4;
 if (waste_8x4 < waste_6x4) {
 chosen_board = "Gypsum Board (8ft x 4ft)";
 final_boards = pcs_8x4;
 }

 const main_channel = Math.ceil((area_sqm * 0.83 * 3.28) / 12);
 const cross_section = Math.ceil((area_sqm * 3.23 * 3.28) / 12);
 const l_patti = Math.ceil(perimeter / 12);
 const cleats_plugs = Math.ceil(area_sqm * 0.77);
 const screws = Math.ceil(area_sqm * 14);
 const compound = Math.round(area_sqm * 0.35 * 10) / 10;
 const tape = Math.round(area_sqm * 1.2 * 10) / 10;

 mat_txt += `> ${chosen_board} -> ${final_boards} Pcs\n`;
 mat_txt += `> Main Channel (12ft): ${main_channel} Pcs\n`;
 mat_txt += `> Cross Section (12ft): ${cross_section} Pcs\n`;
 mat_txt += `> Perimeter L-Patti (12ft): ${l_patti} Pcs\n`;
 mat_txt += "--- Professional Accessories ---\n";
 mat_txt += `> Soffit Cleat & Rawl Plug: ${cleats_plugs} Sets\n`;
 mat_txt += `> Drywall Screws: ${screws} Pcs\n`;
 mat_txt += `> Jointing Compound: ${compound} Kg\n`;
 mat_txt += `> Fiber Tape: ${tape} Meter\n`;
 } else {
 const panels = Math.ceil((area / 8.33) * 1.05);
 const tube_ft = (area / 2) + perimeter;
 const pvc_channels = Math.ceil(tube_ft / 12);
 const l_patti = Math.ceil(perimeter / 12);
 const screws = Math.ceil(area * 1.5);

 mat_txt += `> PVC Panels (10ft x 10in): ${panels} Pcs\n`;
 mat_txt += `> Support Channel/Tube (12ft): ${pvc_channels} Pcs\n`;
 mat_txt += `> Perimeter U-Patti/L-Patti: ${l_patti} Pcs\n`;
 mat_txt += `> Screws (Half Inch): ${screws} Pcs\n`;
 }

 const res = `--- ROOM DETAILS ---\nRoom Size: ${l} ft x ${w} ft\nTotal Area: ${area.toFixed(2)} Sq.Ft\n-------------------------\n--- MATERIAL REQUIRED ---\n` + mat_txt;
 document.getElementById('ce_out').textContent = res;
 }

 function clearCeiling() {
 document.getElementById('ce_l').value = "";
 document.getElementById('ce_w').value = "";
 document.getElementById('ce_out').textContent = "";
 }



// ========================================================
// 8. DYNAMIC & CUSTOM SERIES MODULE (ADMIN-MANAGED FORMULAS)
// ========================================================
const DEFAULT_CUSTOM_PRODUCTS = [
  {
    id: "prod_jasmine_25x50",
    name: "Jasmine Series Sliding (25x50)",
    category: "Sliding Window",
    panels: 2,
    w_formula: "overlap",
    shutter_h_minus: 1.875,
    shutter_w_mod: 0.75,
    glass_h_minus: 3.0,
    glass_w_minus: 3.0,
    frame_h_minus: 0.0,
    frame_w_minus: 0.0,
    hardware: "Jasmine Heavy Rollers (2/shutter), Concealed Touch Lock (1 pc), Woolpile (15m)",
    notes: "Outer frame 45 deg mitre cut. Shutter top/bottom 90 deg straight. Interlock 90 deg."
  },
  {
    id: "prod_bifold_door",
    name: "Bi-Fold / Folding Door & Window",
    category: "Bi-Fold / Folding Door",
    panels: 4,
    w_formula: "clearance",
    shutter_h_minus: 2.25,
    shutter_w_mod: 1.5,
    glass_h_minus: 3.5,
    glass_w_minus: 3.5,
    frame_h_minus: 0.0,
    frame_w_minus: 0.0,
    hardware: "Top Hanging Heavy Roller Carrier (2 sets), Bottom Guide Rollers (2 sets), SS Folding Butt Hinges (9 pcs), Flush Bolts (2 pcs), Cylinder Mortise Lock (1 set)",
    notes: "Heavy top track required. Maintain 12mm bottom clearance above floor level."
  },
  {
    id: "prod_glass_door_patch",
    name: "Toughened Glass Door (Patch Fitting)",
    category: "Toughened Glass Door",
    panels: 1,
    w_formula: "clearance",
    shutter_h_minus: 2.5,
    shutter_w_mod: 0.5,
    glass_h_minus: 0.0,
    glass_w_minus: 0.0,
    frame_h_minus: 0.0,
    frame_w_minus: 0.0,
    hardware: "Hydraulic Floor Spring (Heavy 120kg), Top Patch Fitting (PT-20), Bottom Patch Fitting (PT-10), Corner Lock (US-10), 450mm S-Handle / D-Handle (SS 304)",
    notes: "Cut 10mm/12mm toughened glass with corner cutouts for patch fittings before tempering."
  }
];

const DEFAULT_FORMULA_OVERRIDES = {
  sl_18x40_h_minus: 1.625,
  sl_18x40_w_mod: 0.625,
  sl_18x40_g_h_minus: 2.75,
  sl_18x50_h_minus: 1.75,
  sl_18x50_w_mod: 0.75,
  sl_18x50_g_h_minus: 3.0,
  sl_18x60_h_minus: 1.875,
  sl_18x60_w_mod: 0.875,
  sl_18x60_g_h_minus: 3.125,
  dm_sash_h_deduct: 44.0,
  dm_glass_deduct: 26.0,
  dm_clearance: 1.5,
  dr_v_deduct: 0.375,
  dr_tb_deduct: 5.0,
  cc_shutter_deduct: 1.5
};

function getCustomProducts() {
  try {
    const raw = localStorage.getItem('sw_custom_products');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("getCustomProducts error", e);
  }
  localStorage.setItem('sw_custom_products', JSON.stringify(DEFAULT_CUSTOM_PRODUCTS));
  return DEFAULT_CUSTOM_PRODUCTS;
}

function getFormulaOverrides() {
  try {
    const raw = localStorage.getItem('sw_formula_overrides');
    if (raw) return Object.assign({}, DEFAULT_FORMULA_OVERRIDES, JSON.parse(raw));
  } catch (e) {
    console.warn("getFormulaOverrides error", e);
  }
  return DEFAULT_FORMULA_OVERRIDES;
}

var cs_item_count = 0;
var cs_buckets = {};
var cs_glass_dict = {};

function onCustomSeriesSelected() {
  const sel = document.getElementById('cs_product_select');
  if (!sel) return;
  const prodId = sel.value;
  const products = getCustomProducts();
  const prod = products.find(p => p.id === prodId) || products[0];
  if (!prod) return;

  const panelsInput = document.getElementById('cs_panels');
  if (panelsInput) panelsInput.value = prod.panels || 2;

  const preview = document.getElementById('cs_formula_preview');
  if (preview) {
    let formDesc = `<b>Category:</b> ${prod.category} | <b>Panels:</b> ${prod.panels || 2}<br>` +
      `<b>Shutter Cut:</b> Height [H - ${prod.shutter_h_minus}"] | Width [${prod.w_formula === 'clearance' ? '(W - ' + prod.shutter_w_mod + '") / Panels' : '(W + ' + prod.shutter_w_mod + '") / Panels'}]<br>` +
      `<b>Glass Cut:</b> [Shutter H - ${prod.glass_h_minus}"] x [Shutter W - ${prod.glass_w_minus}"]`;
    if (prod.hardware) {
      formDesc += `<br><span style="color:#64748b;"><b>Accessories:</b> ${prod.hardware}</span>`;
    }
    if (prod.notes) {
      formDesc += `<br><span style="color:#059669;"><b>Workshop Note:</b> ${prod.notes}</span>`;
    }
    preview.innerHTML = formDesc;
  }
}

function renderCustomSeriesDropdown() {
  const sel = document.getElementById('cs_product_select');
  if (!sel) return;
  const products = getCustomProducts();
  const currentVal = sel.value;
  let html = '';
  products.forEach(p => {
    html += `<option value="${p.id}">${p.name} (${p.category})</option>`;
  });
  sel.innerHTML = html;
  if (currentVal && products.some(p => p.id === currentVal)) {
    sel.value = currentVal;
  }
  onCustomSeriesSelected();
}

function calculateCustomSeries() {
  const sel = document.getElementById('cs_product_select');
  if (!sel) return;
  const prodId = sel.value;
  const products = getCustomProducts();
  const prod = products.find(p => p.id === prodId) || products[0];
  if (!prod) { alert("Please select a valid series."); return; }

  const cs_h_el = document.getElementById('cs_h');
  const cs_w_el = document.getElementById('cs_w');
  if (!cs_h_el || !cs_w_el) return;
  const raw_h = safeEval(cs_h_el.value);
  const raw_w = safeEval(cs_w_el.value);
  if (raw_h === 0 || raw_w === 0) {
    alert("Please enter Height and Width.");
    return;
  }

  const is_mm = document.getElementById('cs_unit').value.includes('Millimeter');
  const h_in = is_mm ? raw_h / 25.4 : raw_h;
  const w_in = is_mm ? raw_w / 25.4 : raw_w;
  const panels = Math.max(1, parseInt(document.getElementById('cs_panels').value) || prod.panels || 2);
  const qty = Math.max(1, parseInt(document.getElementById('cs_qty').value) || 1);
  const loc = document.getElementById('cs_loc') ? document.getElementById('cs_loc').value.trim() : "";
  const loc_str = loc ? ` [${loc}]` : "";
  const qty_str = qty > 1 ? ` (Qty: ${qty} Pcs)` : "";

  const disp = (v) => is_mm ? toMmStr(v) : toFractionInch(v);
  const unit_str = is_mm ? "mm" : "Inch";

  // Calculations
  const outer_h = Math.max(0, h_in - (prod.frame_h_minus || 0));
  const outer_w = Math.max(0, w_in - (prod.frame_w_minus || 0));

  const shutter_h = Math.max(0, h_in - (prod.shutter_h_minus || 0));
  let shutter_w = 0;
  if (prod.w_formula === 'clearance') {
    shutter_w = Math.max(0, (w_in - (prod.shutter_w_mod || 0)) / panels);
  } else if (prod.w_formula === 'equal') {
    shutter_w = Math.max(0, w_in / panels);
  } else {
    // Default overlap
    shutter_w = Math.max(0, (w_in + (prod.shutter_w_mod || 0) * (panels - 1)) / panels);
  }

  let glass_h = 0, glass_w = 0;
  if (prod.category.includes('Glass Door') || (prod.glass_h_minus === 0 && prod.glass_w_minus === 0)) {
    glass_h = shutter_h;
    glass_w = shutter_w;
  } else {
    glass_h = Math.max(0, shutter_h - (prod.glass_h_minus || 0));
    glass_w = Math.max(0, shutter_w - (prod.glass_w_minus || 0));
  }

  cs_item_count += 1;

  let alu_txt = `[${prod.name} #${cs_item_count}${loc_str} - H:${disp(h_in)} x W:${disp(w_in)}${qty_str}]\n`;
    alu_txt += `--- OUTER FRAME CUT SIZES ---\n`;
  alu_txt += `> Frame Top / Bottom: ${disp(outer_w)} (2 pc)\n`;
  alu_txt += `> Frame Left / Right Vertical: ${disp(outer_h)} (2 pc)\n`;

  alu_txt += `\n--- SHUTTER / LEAF PROFILE CUT SIZES ---\n`;
  alu_txt += `> Shutter Verticals (Handle/Style): ${disp(shutter_h)} (${panels * 2} pc)\n`;
  alu_txt += `> Shutter Top / Bottom (Horizontal): ${disp(shutter_w)} (${panels * 2} pc)\n`;

  alu_txt += `\n--- GLASS CUTTING SIZES ---\n`;
  alu_txt += `> Glass Size: ${disp(glass_h)} x ${disp(glass_w)} (${panels} pc)\n`;

  if (prod.hardware) {
    alu_txt += `\n--- HARDWARE & ACCESSORIES ---\n`;
    const hwItems = prod.hardware.split(',');
    hwItems.forEach(hi => {
      alu_txt += `> ${hi.trim()}\n`;
    });
  }

  if (prod.notes) {
    alu_txt += `\n--- WORKSHOP / KARIGAR INSTRUCTIONS ---\n> ${prod.notes}\n`;
  }

  // Material Buckets for Optimizing & Bar count
  const frameKey = `${prod.name} Outer Frame`;
  const sashKey = `${prod.name} Shutter Profile`;
  if (!cs_buckets[frameKey]) cs_buckets[frameKey] = [];
  if (!cs_buckets[sashKey]) cs_buckets[sashKey] = [];

  for (let q = 0; q < qty; q++) {
    cs_buckets[frameKey].push(outer_w, outer_w, outer_h, outer_h);
    for (let p = 0; p < panels * 2; p++) cs_buckets[sashKey].push(shutter_h);
    for (let p = 0; p < panels * 2; p++) cs_buckets[sashKey].push(shutter_w);
  }

  const glassKey = `${disp(glass_h)} x ${disp(glass_w)}`;
  cs_glass_dict[glassKey] = (cs_glass_dict[glassKey] || 0) + (panels * qty);

  const prev = document.getElementById('cs_out').textContent;
  document.getElementById('cs_out').textContent = alu_txt + "===================================\n\n" + prev;
  document.getElementById('cs_mat_out').textContent = generateMaterialList(cs_buckets);
}

function clearCustomSeries() {
  cs_item_count = 0;
  cs_buckets = {};
  cs_glass_dict = {};
  if (document.getElementById('cs_h')) document.getElementById('cs_h').value = '';
  if (document.getElementById('cs_w')) document.getElementById('cs_w').value = '';
  if (document.getElementById('cs_out')) document.getElementById('cs_out').textContent = '';
  if (document.getElementById('cs_mat_out')) document.getElementById('cs_mat_out').textContent = '';
}

// ================================================================
 // 4 DEDICATED WORKSHOP PDF GENERATORS (CUTTING, GLASS, ALU, HARDWARE)
 // ================================================================

 // Helper: Parse hardware items from output text
 function extractHardwareList(text) {
 const hwTotals = {};
 const lines = text.split('\n');
 let inHw = false;
 lines.forEach(l => {
 l = l.trim();
 if (l.includes('HARDWARE')) { inHw = true; return; }
 if (inHw) {
 if (l.startsWith('---') || l.startsWith('[') || l.startsWith('===')) { inHw = false; return; }
 if (l.startsWith('>')) {
 const itemLine = l.replace(/^>\s*/, '');
 if (itemLine.includes(':')) {
 const parts = itemLine.split(':');
 const name = parts[0].trim();
 const valStr = parts.slice(1).join(':').trim();
 const numMatch = valStr.match(/[0-9]+(?:\.[0-9]+)?/);
 const unit = valStr.replace(/[0-9]+(?:\.[0-9]+)?/, '').trim() || 'Pcs';
 if (numMatch) {
 const qty = parseFloat(numMatch[0]);
 if (!hwTotals[name]) hwTotals[name] = { qty: 0, unit: unit };
 hwTotals[name].qty += qty;
 } else {
 if (!hwTotals[name]) hwTotals[name] = { qty: valStr, unit: '' };
 }
 }
 }
 }
 });
 return hwTotals;
 }

 // 1. DEDICATED HORIZONTAL CUTTING SHEET PDF (Landscape, Horizontal Columns, Zero Extra Clutter)
function exportPartitionProCutPdf(filename) {
  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) { alert("PDF library is loading, please try again in a moment."); return; }
  const doc = new jsPDF('p', 'mm', 'a4');
  const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});

  pt_pdf_jobs.forEach(function(job, jIdx) {
    if (jIdx > 0) doc.addPage();
    drawDocHeaderWithLogo(doc, "WORKSHOP CUTTING SHEET — PARTITION, DOOR & WINDOW", job.jobTitle, [25, 42, 74]);

    let y = 33;
    // Job Meta Info Banner
    doc.setFillColor(241, 245, 249);
    doc.setDrawColor(203, 213, 225);
    doc.roundedRect(14, y, 182, 16, 2, 2, 'FD');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text("JOB: " + job.jobTitle + "    |    DATE: " + today, 17, y + 5.2);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7.6);
    doc.setTextColor(51, 65, 85);
    doc.text("Tube: " + job.tubeLabel + "   |   Alu: " + job.aluLabel, 17, y + 10.0);
    doc.text("Outer Frame: " + job.outerConfig, 17, y + 14.3);
    y += 20;

    function addSectionTable(heading, headerRgb, headCols, rows) {
      if (!rows || !rows.length) return;
      if (y > 255) { doc.addPage(); y = 16; }
      doc.setFillColor(headerRgb[0], headerRgb[1], headerRgb[2]);
      doc.rect(14, y, 182, 6.5, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.3);
      doc.setTextColor(255, 255, 255);
      doc.text(heading, 17, y + 4.5);
      y += 6.5;

      doc.autoTable({
        startY: y,
        head: [headCols],
        body: rows,
        theme: 'grid',
        margin: { left: 14, right: 14 },
        headStyles: { fillColor: [241, 245, 249], textColor: [15, 23, 42], fontStyle: 'bold', fontSize: 7.5, cellPadding: 2 },
        bodyStyles: { fontSize: 7.8, textColor: [15, 23, 42], cellPadding: 2.2 },
        columnStyles: {
          0: { fontStyle: 'bold', cellWidth: 56 },
          1: { cellWidth: 54 },
          2: { fontStyle: 'bold', textColor: [3, 105, 161], cellWidth: 44 },
          3: { halign: 'center', fontStyle: 'bold', cellWidth: 28 }
        },
        didDrawPage: function(data) { y = data.cursor.y + 4; }
      });
      y = doc.lastAutoTable.finalY + 5;
    }

    // 1. PARTITION FRAME & DIVIDER PIPES
    addSectionTable(
      "1. PARTITION FRAME & DIVIDER PIPES",
      [30, 58, 138],
      ["Partition Pipe / Part", "Section Profile", "Exact Cut Size", "Qty"],
      job.partitionPipes.map(r => [r.part, r.profile, r.size, r.qty])
    );

    // 2. DOOR CUTTING LIST
    if (job.doorRows.length > 0) {
      addSectionTable(
        "2. DOOR CUTTING LIST (SHUTTER, RAILS & DOOR PANELS)",
        [180, 83, 9],
        ["Door Part", "Detail / Material", "Exact Cut Size", "Qty"],
        job.doorRows.map(r => [r.part, r.detail, r.size, r.qty])
      );
    }

    // 3. WINDOW CUTTING LIST
    if (job.windowRows.length > 0) {
      addSectionTable(
        "3. WINDOW CUTTING LIST (OUTER TRACK, SHUTTER & GLASS)",
        [109, 40, 217],
        ["Window Part", "System / Track", "Exact Cut Size", "Qty"],
        job.windowRows.map(r => [r.part, r.detail, r.size, r.qty])
      );
    }

    // 4. FIXED PARTITION PANELS (GLASS / ACP / JALI / WALL MINUS)
    if (job.panelRows.length > 0) {
      addSectionTable(
        "4. PARTITION FIXED GLASS / ACP / JALI & WALL MINUS",
        [15, 118, 110],
        ["Box / Section", "Material", "Exact Cut Size", "Qty / Area"],
        job.panelRows.map(r => [r.part, r.detail, r.size, r.qty])
      );
    }

    // 5. GLAZING CLIP (PARTITION + DOOR SAME!) & MATERIAL SUMMARY BOX
    if (job.clipSummary) {
      const cs = job.clipSummary;
      if (y > 240) { doc.addPage(); y = 16; }
      doc.setFillColor(236, 253, 245);
      doc.setDrawColor(16, 185, 129);
      doc.setLineWidth(0.5);
      doc.roundedRect(14, y, 182, 31, 2.5, 2.5, 'FD');

      doc.setFillColor(6, 95, 70);
      doc.rect(14, y, 182, 6.5, 'F');
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.3);
      doc.setTextColor(255, 255, 255);
      doc.text("5. GLAZING CLIP PURCHASE (PARTITION + DOOR SAME CLIP) & AREA SUMMARY", 17, y + 4.5);

      doc.setTextColor(6, 78, 59);
      doc.setFontSize(8.2);
      doc.setFont("helvetica", "bold");
      doc.text(
        "GLAZING CLIP TO BUY:  " + cs.clipLengths12 + " LENGTHS (12 Ft Clip)   [Total: " + cs.totalClipFt.toFixed(1) + " R.Ft = Partition " + cs.ptClipFt.toFixed(1) + " Ft + Door " + cs.doorClipFt.toFixed(1) + " Ft]",
        17, y + 12.2
      );
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.8);
      doc.setTextColor(15, 23, 42);
      doc.text("EPDM Rubber Gasket (Both Sides): " + cs.gasketFt.toFixed(1) + " R.Ft    |    Net Work Area: " + cs.netBillableSqFt.toFixed(2) + " Sq.Ft (Gross: " + cs.grossSqFt.toFixed(2) + (cs.minusWallSqFt > 0 ? ", Wall Minus: -" + cs.minusWallSqFt.toFixed(2) : "") + ")", 17, y + 18.5);
      doc.text("Total Glass: " + cs.totGlassPcs + " Pcs (" + cs.totGlassSqFt.toFixed(2) + " Sq.Ft)   |   4'x8' ACP Board: " + cs.acpSheets + " Sheet(s) (" + cs.totAcpPcs + " Pcs)   |   Jali: " + cs.totJaliPcs + " Pcs", 17, y + 24.5);
    }
  });

  doc.save(filename);
}

 function exportCutPdf(filename, title, outId, matId) {
  if (outId === 'pt_out' && Array.isArray(pt_pdf_jobs) && pt_pdf_jobs.length > 0) {
    if (!isAppActivated()) {
      alert("PRO activation is required to generate PDF documents.");
      openScreen('activation', 'PRO UPGRADE & PLANS');
      return;
    }
    exportPartitionProCutPdf(filename);
    return;
  }
  if (!isAppActivated()) {
    alert("PRO activation is required to generate PDF documents.");
    openScreen('activation', 'PRO UPGRADE & PLANS');
    return;
  }

  const outEl = document.getElementById(outId);
  const outText = outEl ? outEl.textContent.trim() : "";
  if (!outText || outText.includes("here")) {
    alert("Please calculate at least one cutting size first!");
    return;
  }

  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) {
    alert("PDF library is loading, please try again in a moment.");
    return;
  }

  // Horizontal (Landscape) A4 Document
  const doc = new jsPDF('l', 'mm', 'a4');
  const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});

  drawDocHeaderWithLogo(doc, "WORKSHOP JOB CARD - CUTTING SHEET (" + title.toUpperCase() + ")", "", [25, 42, 74]);

  doc.setFillColor(241, 245, 249);
  doc.rect(14, 32, 269, 6.5, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);
  doc.text("DATE: " + today, 18, 36.5);

  const rawWindows = outText.split(/={10,}/);
  const parsedUnits = [];
  const allProfileHeaders = [];

  rawWindows.forEach(function(rw, winIdx) {
    const trimmed = rw.trim();
    if (!trimmed || trimmed.includes("ACCUMULATED MATERIAL PURCHASE")) return;

    let winTitle = "Unit #" + (winIdx + 1);
    const titleMatch = trimmed.match(/\[(.*?)\]/);
    if (titleMatch) winTitle = titleMatch[1];

    const lines = trimmed.split('\n');
    const unitProfiles = {};
    let section = "profiles";

    lines.forEach(function(l) {
      l = l.trim();
      if (!l || l.startsWith('[') || l.startsWith('===')) return;
      if (l.includes("HARDWARE") || l.includes("GLASS") || l.includes("INSTRUCTIONS") || l.includes("BILLING SLAB") || l.includes("MARKING") || l.includes("OPENINGS") || l.includes("SHEET CUTTING")) {
        section = "other";
        return;
      }
      if (l.includes("MOSQUITO NET") || l.includes("OUTER FRAME") || l.includes("SHUTTER") || l.includes("DOOR SASH") || l.includes("FRAME SECTIONS") || l.includes("TOP ROW DETAILS") || l.includes("BOTTOM ROW DETAILS")) {
        section = "profiles";
        return;
      }
      if (l.startsWith('---') || !l.startsWith('>')) return;
      if (l.startsWith('> Formula') || l.startsWith('> Height Formula') || l.startsWith('> Width Formula') || l.startsWith('> Glass Deduction')) return;

      const clean = l.replace(/^>\s*/, '');
      if (section === "profiles" && clean.indexOf(':') !== -1) {
        const parts = clean.split(':');
        const pName = parts[0].trim();
        const pVal = parts.slice(1).join(':').trim();
        if (/glass|board|beading|alu spec|jindal section|acp/i.test(pName)) return;
        unitProfiles[pName] = pVal;
        if (allProfileHeaders.indexOf(pName) === -1) {
          allProfileHeaders.push(pName);
        }
      }
    });

    if (Object.keys(unitProfiles).length > 0) {
      parsedUnits.push({
        index: parsedUnits.length + 1,
        title: winTitle,
        profiles: unitProfiles
      });
    }
  });

  let currentY = 41;

  if (parsedUnits.length > 0 && allProfileHeaders.length <= 8) {
    // Pure Horizontal Table: Profile names are columns across the top, each Window Unit is a single horizontal row!
    const tableHead = [['#', 'Window / Unit Size'].concat(allProfileHeaders)];
    const tableBody = parsedUnits.map(function(u) {
      const row = [u.index, u.title];
      allProfileHeaders.forEach(function(hName) {
        row.push(u.profiles[hName] || '-');
      });
      return row;
    });

    doc.autoTable({
      startY: currentY,
      head: tableHead,
      body: tableBody,
      theme: 'grid',
      headStyles: {
        fillColor: [30, 58, 138],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8.5,
        halign: 'center'
      },
      styles: {
        fontSize: 8.5,
        cellPadding: 3,
        lineColor: [203, 213, 225],
        lineWidth: 0.25,
        fontStyle: 'bold',
        textColor: [15, 23, 42],
        halign: 'center'
      },
      columnStyles: {
        0: { cellWidth: 12, halign: 'center' },
        1: { cellWidth: 52, halign: 'left' }
      }
    });
  } else {
    // Fallback Horizontal Grid for complex multi-section partitions (>8 distinct profile names)
    parsedUnits.forEach(function(u) {
      if (currentY > 175) { doc.addPage(); currentY = 16; }
      const pKeys = Object.keys(u.profiles);
      const pVals = pKeys.map(function(k) { return u.profiles[k]; });
      doc.autoTable({
        startY: currentY,
        head: [['Unit: ' + u.title].concat(pKeys)],
        body: [['Cut Size & Qty'].concat(pVals)],
        theme: 'grid',
        headStyles: {
          fillColor: [30, 58, 138],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 8,
          halign: 'center'
        },
        styles: {
          fontSize: 8.5,
          cellPadding: 2.5,
          fontStyle: 'bold',
          halign: 'center',
          textColor: [15, 23, 42]
        }
      });
      currentY = doc.lastAutoTable.finalY + 6;
    });
  }

  doc.save(filename + ".pdf");
 }

 // 2. DEDICATED GLASS CUTTING PDF (Horizontal, Only Glass Measurements & Qty, Zero Side Clutter)
 function exportGlassPdf(filename, title, glassDict, outId) {
    if (!isAppActivated()) {
        alert("PRO activation is required to generate PDF documents.");
        openScreen('activation', 'PRO UPGRADE & PLANS');
        return;
    }

    const u = document.getElementById(outId)?.getAttribute('data-unit') || 'inch';
    let body = [], sl = 1, totG = 0;
    for (let [k, q] of Object.entries(glassDict || {})) {
        if (k.toUpperCase().includes('ACP BOARD')) continue;
        let sizePart = k;
        let specPart = '5 mm Clear Glass';
        if (k.includes('||')) {
            let parts = k.split('||');
            sizePart = parts[0].trim();
            specPart = parts[1].trim();
        }
        body.push([sl++, sizePart, specPart, `${q} Pcs`, `[   ] Cut   [   ] Edge Polished`]);
        totG += q;
    }

    if (body.length === 0) {
        alert("No Glass panels found! Please calculate first (or if all panels are ACP Board / Jali, check 3. ALU PURCHASE PDF).");
        return;
    }

    var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
    if (!jsPDF) {
        alert("PDF library is loading, please try again in a moment.");
        return;
    }

    const doc = new jsPDF('l', 'mm', 'a4');
    drawDocHeaderWithLogo(doc, `${String(title || 'GLASS').toUpperCase()} - GLASS CUTTING JOB CARD`, "", [2, 132, 199]);

    const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});
    doc.setFillColor(224, 242, 254);
    doc.rect(14, 32, 269, 6.5, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(3, 105, 161);
    doc.text("DATE: " + today + "   |   TOTAL GLASS PANELS: " + totG + " PCS", 18, 36.5);

    const orderQrPayload = buildGlassOrderQrPayload(title, glassDict);
    window.lastGeneratedGlassOrderCode = orderQrPayload;

    doc.autoTable({
        startY: 41,
        head: [['SL', `GLASS CUTTING SIZE (H x W) [${u.toUpperCase()}]`, 'GLASS TYPE & THICKNESS', 'TOTAL QTY', 'GLASS SHOP CHECKLIST']],
        body: body,
        foot: [['', 'TOTAL GLASS PANELS REQUIRED', '', `${totG} Pcs`, '']],
        theme: 'grid',
        headStyles: { fillColor: [2, 132, 199], textColor: 255, fontStyle: 'bold', fontSize: 10.5, halign: 'center' },
        footStyles: { fillColor: [224, 242, 254], textColor: [3, 105, 161], fontStyle: 'bold', fontSize: 11.5, halign: 'center' },
        bodyStyles: { fontStyle: 'bold', fontSize: 11, textColor: [15, 23, 42] },
        columnStyles: { 0: { halign: 'center', cellWidth: 16 }, 1: { halign: 'center', textColor: [3, 105, 161] }, 2: { halign: 'center', textColor: [15, 118, 110] }, 3: { halign: 'center', cellWidth: 32 }, 4: { halign: 'center', cellWidth: 68 } }
    });

    if (orderQrPayload && typeof generateQrMatrix === 'function') {
        let boxY = (doc.lastAutoTable && doc.lastAutoTable.finalY) ? doc.lastAutoTable.finalY + 8 : 90;
        const pageH = doc.internal.pageSize.getHeight();
        const pageW = doc.internal.pageSize.getWidth();
        const boxH = 44;
        if (boxY + boxH > pageH - 14) {
            doc.addPage('a4', 'l');
            boxY = 18;
        }
        doc.setDrawColor(2, 132, 199);
        doc.setLineWidth(0.6);
        doc.setFillColor(240, 249, 255);
        doc.roundedRect(14, boxY, pageW - 28, boxH, 3, 3, 'FD');

        const qrMatrix = generateQrMatrix(orderQrPayload);
        const qrSizeMm = 36;
        const qrX = 18;
        const qrY = boxY + 4;
        doc.setFillColor(255, 255, 255);
        doc.rect(qrX - 1.5, qrY - 1.5, qrSizeMm + 3, qrSizeMm + 3, 'F');
        const n = qrMatrix.length;
        const cellMm = qrSizeMm / n;
        doc.setFillColor(15, 23, 42);
        for (let r = 0; r < n; r++) {
            for (let c = 0; c < n; c++) {
                if (qrMatrix[r][c]) {
                    doc.rect(qrX + c * cellMm, qrY + r * cellMm, cellMm + 0.04, cellMm + 0.04, 'F');
                }
            }
        }

        const textX = qrX + qrSizeMm + 7;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(10.5);
        doc.setTextColor(3, 105, 161);
        doc.text("SMART GLASS FABRICATOR QR SYNC (1-SCAN AUTO-LOAD TO 4x8 SHEET CHART)", textX, boxY + 9);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(30, 41, 59);
        doc.text('1. Glass Shop / Glass Cutter: Open Smart Worker Pro -> "Glass Cutting (4x8 Sheet)".', textX, boxY + 16);
        doc.text('2. Tap "SCAN PDF QR CODE" (or paste the Order Code below) to auto-load all glass sizes, quantities & thicknesses', textX, boxY + 21.5);
        doc.text('   and immediately generate the 4x8 Minimum-Waste Sheet Cutting Layout Drawing!', textX, boxY + 27);

        doc.setFont('courier', 'bold');
        doc.setFontSize(7.6);
        doc.setTextColor(15, 118, 110);
        const shortId = generateShortGlassOrderId(orderQrPayload);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.setTextColor(2, 132, 199);
        doc.text(`4-DIGIT ORDER CODE: ${shortId}`, textX, boxY + 34);
        doc.setFont('courier', 'normal');
        doc.setFontSize(6.8);
        doc.setTextColor(71, 85, 105);
        doc.text(`Type '${shortId}' in Glass Cutting -> ENTER 4-DIGIT CODE (or Scan QR)`, textX, boxY + 39.5);
    }

    doc.save(`${filename}_${Date.now()}.pdf`);
}
// ============================================================================
// B2B FABRICATOR-TO-GLASS-SHOP SMART QR & 4-DIGIT SHORT CODE BRIDGE
// ============================================================================
window.lastGeneratedGlassOrderCode = '';
window.lastGeneratedShortOrderId = '';

function generateShortGlassOrderId(swgPayload) {
    // Deterministic 4-digit code (1000-9999) from payload so same order gets same 4-digit code
    let hash = 0;
    const s = String(swgPayload || Date.now());
    for (let i = 0; i < s.length; i++) {
        hash = ((hash << 5) - hash) + s.charCodeAt(i);
        hash |= 0;
    }
    // v104: 6-char high-entropy alphanumeric code (no confusing 0/O/1/I)
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code6 = '';
    let h = Math.abs(hash) ^ (Date.now() & 0xFFFFFF);
    for (let k = 0; k < 6; k++) {
      code6 += chars[Math.abs(h + k * 7) % chars.length];
      h = Math.imul(h ^ (h >>> 13), 2654435761) >>> 0;
    }
    return code6;
}

function saveShortGlassOrderToCloud(shortId, swgPayload) {
    if (!shortId || !swgPayload) return;
    window.lastGeneratedShortOrderId = shortId;
    window.lastGeneratedGlassOrderCode = swgPayload;
    // 1. Save locally
    try {
        const map = JSON.parse(localStorage.getItem('sw_short_glass_orders') || '{}');
        map[shortId] = { payload: swgPayload, ts: Date.now() };
        localStorage.setItem('sw_short_glass_orders', JSON.stringify(map));
    } catch (e) {}
    // 2. Save to Firebase Firestore & RTDB so another phone can fetch with just 4 digits!
    try {
        const db = window.fbDb || (window.firebase && firebase.apps.length ? firebase.firestore() : null);
        if (db) {
            db.collection('glass_orders').doc(shortId).set({
                code: shortId,
                payload: String(swgPayload || '').replace(/\b(?:\+?91[-\s]?)?[6-9]\d{9}\b/g, ''),
                createdAt: Date.now(),
                expiresAt: Date.now() + (48 * 60 * 60 * 1000)
            }).catch(() => {});
        }
    } catch (e) {}
    try {
        const rtdb = window.fbRtdb || (window.firebase && firebase.apps.length && firebase.database ? firebase.database() : null);
        if (rtdb) {
            rtdb.ref('glass_orders/' + shortId).set({
                code: shortId,
                payload: String(swgPayload || '').replace(/\b(?:\+?91[-\s]?)?[6-9]\d{9}\b/g, ''),
                createdAt: Date.now(),
                expiresAt: Date.now() + (48 * 60 * 60 * 1000)
            }).catch(() => {});
        }
    } catch (e) {}
}

async function fetchShortGlassOrderFromCloud(shortId) {
    const cleanId = String(shortId || '').toUpperCase().replace(/^SW[-_]?/i, '').trim();
    if (!cleanId) return null;
    // 1. Check localStorage first
    try {
        const map = JSON.parse(localStorage.getItem('sw_short_glass_orders') || '{}');
        if (map[cleanId] && map[cleanId].payload) { if (map[cleanId].expiresAt && Date.now() > map[cleanId].expiresAt) { alert('This glass order code has expired (valid for 48 hours).'); return null; } return map[cleanId].payload; }
    } catch (e) {}
    // 2. Check Firebase Firestore
    try {
        const db = window.fbDb || (window.firebase && firebase.apps.length ? firebase.firestore() : null);
        if (db) {
            const snap = await db.collection('glass_orders').doc(cleanId).get();
            if (snap.exists && snap.data() && snap.data().payload) {
                return snap.data().payload;
            }
        }
    } catch (e) {}
    // 3. Check Firebase RTDB
    try {
        const rtdb = window.fbRtdb || (window.firebase && firebase.apps.length && firebase.database ? firebase.database() : null);
        if (rtdb) {
            const snap = await rtdb.ref('glass_orders/' + cleanId).once('value');
            const val = snap.val();
            if (val && val.payload) return val.payload;
        }
    } catch (e) {}
    return null;
}

function parseGlassKeyDimensionToInch(dimToken) {
    if (!dimToken) return 0;
    const s = String(dimToken).trim();
    if (s.toLowerCase().includes('mm')) {
        const num = parseFloat(s.replace(/[^0-9.]/g, '')) || 0;
        return parseFloat((num / 25.4).toFixed(2));
    }
    const clean = s.replace(/"/g, '').trim();
    const parts = clean.split(/\s+/);
    let total = 0;
    parts.forEach(p => {
        if (p.includes('/')) {
            const [n, d] = p.split('/').map(Number);
            if (d) total += (n / d);
        } else {
            const v = parseFloat(p);
            if (!isNaN(v)) total += v;
        }
    });
    return parseFloat(total.toFixed(2));
}

function parseGlassDictToStructuredItems(glassDict) {
    const items = [];
    for (const [rawKey, qty] of Object.entries(glassDict || {})) {
        if (rawKey.toUpperCase().includes('ACP BOARD')) continue;
        let sizeText = rawKey;
        let specText = '5 mm Clear';
        if (rawKey.includes('||')) {
            const parts = rawKey.split('||');
            sizeText = parts[0].trim();
            specText = parts[1].trim() || '5 mm Clear';
        }
        let rowTag = '';
        const tagMatch = sizeText.match(/\(([^)]+)\)/);
        if (tagMatch) {
            rowTag = tagMatch[1].replace(/Glass/i, '').trim();
            sizeText = sizeText.replace(/\([^)]+\)/g, '').trim();
        }
        const hwParts = sizeText.split(/\s*[xX×]\s*/);
        const hIn = parseGlassKeyDimensionToInch(hwParts[0] || '0');
        const wIn = parseGlassKeyDimensionToInch(hwParts[1] || '0');
        if (hIn > 0 && wIn > 0 && qty > 0) {
            items.push({
                h_in: hIn,
                w_in: wIn,
                qty: parseInt(qty, 10) || 1,
                spec: specText,
                tag: rowTag || ('G' + (items.length + 1))
            });
        }
    }
    return items;
}

function buildGlassOrderQrPayload(title, glassDict, sheetSizeCode) {
    const items = parseGlassDictToStructuredItems(glassDict);
    if (!items.length) return '';
    const shortTitle = String(title || 'GLASS ORDER')
        .replace(/GLASS CUTTING/i, '')
        .replace(/[^A-Za-z0-9 _-]/g, '')
        .trim()
        .slice(0, 18) || 'ORDER';
    const stockCode = sheetSizeCode || (document.getElementById('gc_sheet_size')?.value || '96x48');
    const firstSpec = (items[0].spec || '5 mm Clear') + '#' + stockCode;
    const baseSpecOnly = items[0].spec || '5 mm Clear';
    const itemTokens = items.map(it => {
        const hStr = Number(it.h_in.toFixed(2));
        const wStr = Number(it.w_in.toFixed(2));
        const specCode = (it.spec && it.spec !== baseSpecOnly) ? `~${it.spec}` : '';
        const tagCode = it.tag ? `@${it.tag.slice(0, 10)}` : '';
        return `${hStr}x${wStr}*${it.qty}${specCode}${tagCode}`;
    });
    const payload = `SWG|${shortTitle}|${firstSpec}|${itemTokens.join(';')}`;
    const shortId = generateShortGlassOrderId(payload);
    saveShortGlassOrderToCloud(shortId, payload);
    return payload;
}

function buildGlassOrderQrPayloadFromBillItems(billItemsList, customerName) {
    const dict = {};
    const dispInch = (v) => (typeof toFractionInch === 'function' ? toFractionInch(v) : (v + '"'));
    (billItemsList || []).forEach((itm, idx) => {
        if (!itm) return;
        const gType = String(itm.glass_type || 'Clear').replace(/\+\s*Bottom ACP Board/i, '').replace(/\+\s*ACP Board/i, '').trim();
        if (gType.toUpperCase() === 'FULL ACP BOARD' || gType.toUpperCase() === 'ACP BOARD') return;
        const gThick = String(itm.glass_thick || '5 mm').trim();
        const spec = `${gThick} ${gType}`;
        const unit = String(itm.unit || 'ft').toLowerCase();
        let hIn = parseFloat(itm.h) || 0;
        let wIn = parseFloat(itm.w) || 0;
        if (unit === 'ft' || unit === 'feet') {
            hIn = parseFloat((hIn * 12.0).toFixed(2));
            wIn = parseFloat((wIn * 12.0).toFixed(2));
        } else if (unit === 'mm') {
            hIn = parseFloat((hIn / 25.4).toFixed(2));
            wIn = parseFloat((wIn / 25.4).toFixed(2));
        }
        const qty = Math.max(1, parseInt(itm.qty, 10) || 1);
        const typeStr = String(itm.type || '');
        const tag = (itm.location || typeStr.split(' ')[0] || ('G' + (idx + 1))).slice(0, 10);
        if (typeStr.includes('3-Track')) {
            const gh = Math.max(4, parseFloat((hIn - 4.5).toFixed(2)));
            const gw = Math.max(4, parseFloat(((wIn - 3.0) / 3.0).toFixed(2)));
            const key = `${dispInch(gh)} x ${dispInch(gw)} (${tag}) || ${spec}`;
            dict[key] = (dict[key] || 0) + (qty * 3);
        } else if (typeStr.includes('4-Track')) {
            const gh = Math.max(4, parseFloat((hIn - 4.5).toFixed(2)));
            const gw = Math.max(4, parseFloat(((wIn - 4.0) / 4.0).toFixed(2)));
            const key = `${dispInch(gh)} x ${dispInch(gw)} (${tag}) || ${spec}`;
            dict[key] = (dict[key] || 0) + (qty * 4);
        } else if (typeStr.includes('2-Track') || typeStr.includes('Sliding') || typeStr.includes('Domal')) {
            const gh = Math.max(4, parseFloat((hIn - 4.5).toFixed(2)));
            const gw = Math.max(4, parseFloat(((wIn - 2.5) / 2.0).toFixed(2)));
            const key = `${dispInch(gh)} x ${dispInch(gw)} (${tag}) || ${spec}`;
            dict[key] = (dict[key] || 0) + (qty * 2);
        } else if (hIn > 0 && wIn > 0) {
            const key = `${dispInch(hIn)} x ${dispInch(wIn)} (${tag}) || ${spec}`;
            dict[key] = (dict[key] || 0) + qty;
        }
    });
    const stockCode = document.getElementById('gc_sheet_size')?.value || '96x48';
    return buildGlassOrderQrPayload(customerName || 'BILL ORDER', dict, stockCode);
}

function shareGlassOrderCodeWhatsApp(orderCode, title) {
    const code = orderCode || window.lastGeneratedGlassOrderCode;
    if (!code) {
        alert('Please calculate or generate a Glass Cutting list first.');
        return;
    }
    const shortId = generateShortGlassOrderId(code);
    saveShortGlassOrderToCloud(shortId, code);
    const parsed = parseSwgOrderPayload(code);
    if (!parsed) return;
    let msg = `*SMART WORKER PRO - GLASS & 4'x8' SHEET ORDER*\n`;
    msg += `*ORDER CODE:* *${shortId}* (Just 4 Digits!)\n`;
    msg += `*Job / Party:* ${parsed.title || title || 'Glass Order'}\n`;
    msg += `*Glass Spec:* ${parsed.defaultSpec || '5 mm Clear'} | *Sheet:* ${parsed.sheetSizeCode || '96x48'}\n`;
    msg += `--------------------------------\n`;
    let totalPcs = 0;
    parsed.items.forEach((it, idx) => {
        totalPcs += it.qty;
        const hDisp = typeof toFractionInch === 'function' ? toFractionInch(it.h_in) : (it.h_in + '"');
        const wDisp = typeof toFractionInch === 'function' ? toFractionInch(it.w_in) : (it.w_in + '"');
        msg += `${idx + 1}. *${hDisp} x ${wDisp}*  -->  *${it.qty} Pcs* ${it.tag ? '(' + it.tag + ')' : ''}\n`;
    });
    msg += `--------------------------------\n`;
    msg += `*Total Glass:* ${totalPcs} Pcs\n\n`;
    msg += `*Open Smart Worker Pro -> Glass Cutting -> Tap "ENTER 4-DIGIT CODE" and type:* *${shortId}*`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
}

function parseSwgOrderPayload(rawText) {
    if (!rawText) return null;
    const text = String(rawText).trim();
    const swgIndex = text.indexOf('SWG|');
    if (swgIndex === -1) return null;
    const cleanLine = text.slice(swgIndex).split(/[\r\n]+/)[0].trim();
    const parts = cleanLine.split('|');
    if (parts.length < 4 || parts[0] !== 'SWG') return null;
    const title = parts[1] || 'Glass Order';
    let rawSpecField = parts[2] || '5 mm Clear';
    let sheetSizeCode = '96x48';
    if (rawSpecField.includes('#')) {
        const spParts = rawSpecField.split('#');
        rawSpecField = spParts[0].trim() || '5 mm Clear';
        sheetSizeCode = spParts[1].trim() || '96x48';
    }
    const defaultSpec = rawSpecField;
    const itemsRaw = parts.slice(3).join('|').split(';');
    const items = [];
    itemsRaw.forEach(tok => {
        const t = tok.trim();
        if (!t) return;
        let mainPart = t;
        let tag = '';
        if (mainPart.includes('@')) {
            const atSplit = mainPart.split('@');
            mainPart = atSplit[0];
            tag = atSplit[1] || '';
        }
        let spec = defaultSpec;
        if (mainPart.includes('~')) {
            const tildeSplit = mainPart.split('~');
            mainPart = tildeSplit[0];
            spec = tildeSplit[1] || defaultSpec;
        }
        const [hwPart, qtyPart] = mainPart.split('*');
        if (!hwPart) return;
        const [hVal, wVal] = hwPart.split(/[xX×]/).map(Number);
        const qtyVal = parseInt(qtyPart || '1', 10) || 1;
        if (hVal > 0 && wVal > 0) {
            items.push({
                h_in: parseFloat(hVal.toFixed(2)),
                w_in: parseFloat(wVal.toFixed(2)),
                qty: qtyVal,
                spec: spec,
                tag: tag
            });
        }
    });
    if (!items.length) return null;
    return { title, defaultSpec, sheetSizeCode, items, rawCode: cleanLine };
}

async function importGlassOrderQrPayload(rawText) {
    let textInput = String(rawText || '').trim();
    // If user typed a short 4-digit Order Code (like "4829" or "SW-4829"), fetch from Firebase / localStorage!
    if (textInput && !textInput.includes('SWG|') && /^(SW[-_]?)?[0-9]{4,6}$/i.test(textInput)) {
        const fetched = await fetchShortGlassOrderFromCloud(textInput);
        if (fetched) {
            textInput = fetched;
        } else {
            alert('4-Digit Order Code "' + textInput + '" not found. Please check internet connection or scan the QR Code.');
            return false;
        }
    }

    const parsed = parseSwgOrderPayload(textInput);
    if (!parsed) {
        alert('Invalid Order Code. Enter the 4-digit Order Code (e.g. 4829) or scan the QR Code from the PDF.');
        return false;
    }
    const gcScreen = document.getElementById('screen-glass_cutting');
    if (gcScreen && !gcScreen.classList.contains('active')) {
        if (typeof openScreen === 'function') openScreen('glass_cutting', 'GLASS CUTTING (4x8 SHEET)');
        else if (typeof navTo === 'function') navTo('glass_cutting');
    }
    if (parsed.sheetSizeCode) {
        const sheetSel = document.getElementById('gc_sheet_size');
        if (sheetSel) {
            for (let i = 0; i < sheetSel.options.length; i++) {
                if (sheetSel.options[i].value === parsed.sheetSizeCode) {
                    sheetSel.selectedIndex = i;
                    break;
                }
            }
        }
    }
    const specStr = parsed.defaultSpec || '5 mm Clear';
    const thickMatch = specStr.match(/^([0-9.]+\s*mm)\s+(.*)$/i);
    if (thickMatch) {
        const thickVal = thickMatch[1].trim();
        const typeVal = thickMatch[2].trim();
        const thickSel = document.getElementById('gc_g_thick');
        const typeSel = document.getElementById('gc_g_type');
        if (thickSel) {
            for (let i = 0; i < thickSel.options.length; i++) {
                if (thickSel.options[i].value.toLowerCase() === thickVal.toLowerCase()) {
                    thickSel.selectedIndex = i;
                    break;
                }
            }
        }
        if (typeSel) {
            for (let i = 0; i < typeSel.options.length; i++) {
                if (typeSel.options[i].value.toLowerCase() === typeVal.toLowerCase()) {
                    typeSel.selectedIndex = i;
                    break;
                }
            }
        }
    }
    const dispInch = (v) => (typeof toFractionInch === 'function' ? toFractionInch(v) : (v + '"'));
    gc_items_list = parsed.items.map((it, idx) => ({
        rowTag: it.tag || ('G' + (idx + 1)),
        h_in: it.h_in,
        w_in: it.w_in,
        qty: it.qty,
        spec: it.spec || parsed.defaultSpec || '5 mm Clear',
        is_mm: false,
        cutStr: dispInch(it.h_in) + ' x ' + dispInch(it.w_in)
    }));
    const shortId = generateShortGlassOrderId(parsed.rawCode);
    window.lastGeneratedGlassOrderCode = parsed.rawCode;
    window.lastGeneratedShortOrderId = shortId;
    recalculateGlassCuttingSheets();

    const banner = document.getElementById('gc_qr_import_status');
    const totalPcs = parsed.items.reduce((s, i) => s + i.qty, 0);
    if (banner) {
        banner.style.display = 'block';
        banner.innerHTML = `<i class="fa-solid fa-circle-check"></i> <b>Auto-Loaded Order #${shortId}:</b> ${parsed.title} (${parsed.items.length} sizes, <b>${totalPcs} Pcs</b> of ${parsed.defaultSpec}) — 4'x8' Cutting Chart Ready!`;
    }
    const layoutBox = document.getElementById('gc_sheet_layout_box');
    if (layoutBox) layoutBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return true;
}

function promptImportGlassOrderCode() {
    const prefill = window.lastGeneratedShortOrderId || '';
    const input = prompt('Enter the 4-Digit Order Code printed on the PDF (e.g. 4829):', prefill);
    if (!input) return;
    importGlassOrderQrPayload(input);
}

function shareCurrentGlassListToCutterWhatsApp() {
    if (!gc_items_list || !gc_items_list.length) {
        alert('Please add glass sizes (+ CALCULATE) or enter a 4-Digit Order Code first.');
        return;
    }
    const gType = document.getElementById('gc_g_type')?.value || 'Clear';
    const gThick = document.getElementById('gc_g_thick')?.value || '5 mm';
    const defaultSpec = `${gThick} ${gType}`;
    const dispInch = (v) => (typeof toFractionInch === 'function' ? toFractionInch(v) : (v + '"'));
    const dict = {};
    gc_items_list.forEach((it, idx) => {
        const tag = it.rowTag ? ` (${it.rowTag})` : ` (G${idx + 1})`;
        const spec = it.spec || defaultSpec;
        const key = `${dispInch(it.h_in)} x ${dispInch(it.w_in)}${tag} || ${spec}`;
        dict[key] = (dict[key] || 0) + (it.qty || 1);
    });
    const stockCode = document.getElementById('gc_sheet_size')?.value || '96x48';
    const code = buildGlassOrderQrPayload('SHEET ORDER', dict, stockCode);
    shareGlassOrderCodeWhatsApp(code, 'GLASS SHEET CUTTING ORDER');
}

let gcQrScannerStream = null;
function stopGlassOrderQrScanner() {
    if (gcQrScannerStream) {
        gcQrScannerStream.getTracks().forEach(t => t.stop());
        gcQrScannerStream = null;
    }
    const box = document.getElementById('gc_qr_camera_box');
    if (box) box.style.display = 'none';
}

async function startGlassOrderQrScanner() {
    const gcScreen = document.getElementById('screen-glass_cutting');
    if (gcScreen && !gcScreen.classList.contains('active')) {
        if (typeof openScreen === 'function') openScreen('glass_cutting', 'GLASS CUTTING (4x8 SHEET)');
    }
    const box = document.getElementById('gc_qr_camera_box');
    const video = document.getElementById('gc_qr_video');
    if (!box || !video) return;
    box.style.display = 'block';
    try {
        gcQrScannerStream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' }
        });
        video.srcObject = gcQrScannerStream;
        await video.play();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        const scanLoop = async () => {
            if (!gcQrScannerStream) return;
            try {
                if ('BarcodeDetector' in window) {
                    const detector = new BarcodeDetector({ formats: ['qr_code'] });
                    const codes = await detector.detect(video);
                    if (codes && codes.length > 0 && codes[0].rawValue) {
                        stopGlassOrderQrScanner();
                        importGlassOrderQrPayload(codes[0].rawValue);
                        return;
                    }
                }
                if (typeof jsQR === 'function' && video.videoWidth > 0) {
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;
                    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imgData.data, imgData.width, imgData.height);
                    if (code && code.data) {
                        stopGlassOrderQrScanner();
                        importGlassOrderQrPayload(code.data);
                        return;
                    }
                }
            } catch (e) {}
            if (gcQrScannerStream) requestAnimationFrame(scanLoop);
        };
        requestAnimationFrame(scanLoop);
    } catch (err) {
        box.style.display = 'none';
        alert('Camera permission denied or unavailable. Please tap "ENTER 4-DIGIT CODE" and type the 4-digit code printed on the PDF.');
    }
}

async function scanGlassQrFromImageFile(event) {
    const file = event?.target?.files?.[0];
    if (!file) return;
    try {
        const bmp = await createImageBitmap(file);
        if ('BarcodeDetector' in window) {
            try {
                const detector = new BarcodeDetector({ formats: ['qr_code'] });
                const codes = await detector.detect(bmp);
                if (codes && codes.length > 0 && codes[0].rawValue) {
                    importGlassOrderQrPayload(codes[0].rawValue);
                    event.target.value = '';
                    return;
                }
            } catch (e) {}
        }
        if (typeof jsQR === 'function') {
            const canvas = document.createElement('canvas');
            const maxDim = 1600;
            const scale = Math.min(1, maxDim / Math.max(bmp.width, bmp.height));
            canvas.width = Math.round(bmp.width * scale);
            canvas.height = Math.round(bmp.height * scale);
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imgData.data, imgData.width, imgData.height);
            if (code && code.data) {
                importGlassOrderQrPayload(code.data);
                event.target.value = '';
                return;
            }
        }
        alert('Could not read QR from that screenshot. Simply tap "ENTER 4-DIGIT CODE" and type the 4-digit code (e.g. 4829) printed next to the QR!');
    } catch (err) {
        alert('Please tap "ENTER 4-DIGIT CODE" and type the 4-digit code printed on the PDF.');
    }
    event.target.value = '';
}

 // 3. DEDICATED ALUMINIUM SECTION PDF (Horizontal, Clean Section Name & Bars Only)
 function exportAluPurchasePdf(filename, title, buckets) {
  if (!isAppActivated()) {
    alert("PRO activation is required to generate PDF documents.");
    openScreen('activation', 'PRO UPGRADE & PLANS');
    return;
  }

  const keys = Object.keys(buckets || {});
  if (keys.length === 0) {
    alert("No material calculated yet! Please calculate windows first.");
    return;
  }

  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) {
    alert("PDF library is loading, please try again in a moment.");
    return;
  }

  const doc = new jsPDF('l', 'mm', 'a4');
  const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});

  let modPrefix = 'sl';
  if (/domal|euro series/i.test(title)) modPrefix = 'dm';
  else if (/casement/i.test(title)) modPrefix = 'cc';
  else if (/door/i.test(title) && !/partition/i.test(title)) modPrefix = 'dr';
  else if (/partition/i.test(title)) modPrefix = 'pt';
  const aluSpecStr = getModuleAluLabel(modPrefix);

  drawDocHeaderWithLogo(doc, "ALUMINIUM MATERIAL PURCHASE LIST (" + title.toUpperCase() + ")", "", [15, 118, 110]);

  doc.setFillColor(240, 253, 250);
  doc.rect(14, 32, 269, 6.5, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(19, 78, 74);
  doc.text("DATE: " + today + "   |   ALU SPEC: " + aluSpecStr.toUpperCase(), 18, 36.5);

  const profileRows = [];
  let totalSticks = 0;

  keys.forEach(function(pName, idx) {
    const pieces = buckets[pName];
    if (!pieces || pieces.length === 0) return;
    const isDomal = pName.indexOf('Domal') !== -1;
    const plan = isDomal ? optimizeCuttingPlan(pieces, [144]) : optimizeCuttingPlan(pieces);
    const sticksCount = plan.bins ? plan.bins.length : (plan.sticks_needed || 1);
    const ft = plan.len ? Math.floor(plan.len / 12) : (plan.standard_length_ft || 12);
    totalSticks += sticksCount;

    profileRows.push([
      idx + 1,
      pName + " (" + pieces.length + " Cut Pcs)",
      aluSpecStr,
      sticksCount + " Bars (" + ft + " ft)"
    ]);
  });

  profileRows.push([
    { content: "TOTAL ALUMINIUM BARS", colSpan: 3, styles: { halign: 'right', fontStyle: 'bold', fillColor: [240, 253, 250] } },
    { content: totalSticks + " Bars", styles: { fontStyle: 'bold', halign: 'center', fillColor: [204, 251, 241] } }
  ]);

  // Include 4'x8' ACP Board Purchase List if Door or Partition has ACP panels
  let acpArr = [];
  if (modPrefix === 'dr' && typeof dr_acp_list !== 'undefined') acpArr = dr_acp_list;
  else if (modPrefix === 'pt' && typeof pt_acp_list !== 'undefined') acpArr = pt_acp_list;

  if (acpArr && acpArr.length > 0) {
    profileRows.push([
      { content: "4'x8' ACP BOARD PURCHASE LIST (SELF CUT - NOT SENT TO GLASS SHOP)", colSpan: 4, styles: { halign: 'center', fontStyle: 'bold', fillColor: [254, 243, 199], textColor: [146, 64, 14] } }
    ]);
    acpArr.forEach(function(item, aIdx) {
      profileRows.push([
        "ACP-" + (aIdx + 1),
        "ACP Sheet (Cut Size: " + item.cutStr + " | " + item.qty + " Pcs)",
        "4'x8' ACP Board (" + item.areaSqFt.toFixed(1) + " Sq.Ft)",
        item.buyLabel
      ]);
    });
  }

  doc.autoTable({
    startY: 41,
    head: [['#', 'Aluminium Section / Profile Name', 'Alu Thickness & Color', 'Required Quantity']],
    body: profileRows,
    theme: 'grid',
    headStyles: {
      fillColor: [15, 118, 110],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'center'
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
      fontStyle: 'bold',
      textColor: [15, 23, 42]
    },
    columnStyles: {
      0: { cellWidth: 20, halign: 'center' },
      1: { cellWidth: 115 },
      2: { cellWidth: 85, halign: 'center', textColor: [15, 118, 110] },
      3: { cellWidth: 49, halign: 'center', textColor: [15, 118, 110] }
    }
  });

  doc.save(filename + ".pdf");
 }

 // 4. DEDICATED HARDWARE PDF (Horizontal, Only Item Name & Quantity, Zero Side Text)
 function exportHardwarePdf(filename, title, outId) {
  if (!isAppActivated()) {
    alert("PRO activation is required to generate PDF documents.");
    openScreen('activation', 'PRO UPGRADE & PLANS');
    return;
  }

  const outEl = document.getElementById(outId);
  const outText = outEl ? outEl.textContent.trim() : "";
  if (!outText || outText.includes("here")) {
    alert("Please calculate at least one window first!");
    return;
  }

  const hwMap = extractHardwareList(outText);
  const hwKeys = Object.keys(hwMap);

  if (hwKeys.length === 0) {
    alert("No hardware items found in the current calculation.");
    return;
  }

  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) {
    alert("PDF library is loading, please try again in a moment.");
    return;
  }

  const doc = new jsPDF('l', 'mm', 'a4');
  const today = new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});

  drawDocHeaderWithLogo(doc, "HARDWARE & FITTINGS LIST (" + title.toUpperCase() + ")", "", [180, 83, 9]);

  doc.setFillColor(254, 243, 199);
  doc.rect(14, 32, 269, 6.5, 'F');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(146, 64, 14);
  doc.text("DATE: " + today, 18, 36.5);

  const hwRows = hwKeys.map(function(item, idx) {
    const d = hwMap[item];
    return [
      idx + 1,
      item,
      d.qty + " " + (d.unit || "Pcs")
    ];
  });

  doc.autoTable({
    startY: 41,
    head: [['#', 'Hardware / Fitting Item', 'Required Quantity']],
    body: hwRows,
    theme: 'grid',
    headStyles: {
      fillColor: [180, 83, 9],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
      fontSize: 9,
      halign: 'center'
    },
    styles: {
      fontSize: 9,
      cellPadding: 3,
      fontStyle: 'bold',
      textColor: [15, 23, 42]
    },
    columnStyles: {
      0: { cellWidth: 25, halign: 'center' },
      1: { cellWidth: 180 },
      2: { cellWidth: 64, halign: 'center', textColor: [180, 83, 9] }
    }
  });

  doc.save(filename + ".pdf");
 }

 // Aliases for Custom Series PDF buttons
 function exportAluPdf(filename, title, buckets) {
  exportAluPurchasePdf(filename, title, buckets);
 }
 function exportHwPdf(filename, title, outId) {
  exportHardwarePdf(filename, title, outId);
 }


function saveMeasurementData(projectType, outId, matId) {
 const text = document.getElementById(outId).textContent + "\n" + document.getElementById(matId).textContent;
 if (!text.trim()) return;
 const measurements = JSON.parse(localStorage.getItem('sw_measurements') || '[]');
 const today = new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString('en-US', {hour:'2-digit', minute:'2-digit'});
 measurements.unshift({
 id: Date.now(),
 date: today,
 project_type: projectType,
 details: text
 });
 localStorage.setItem('sw_measurements', JSON.stringify(measurements));
 syncToGoogleSheet('Measurements', [today, projectType, text]);
 if(currentCloudUser) syncAllDataToCloud(currentCloudUser.uid);
 alert("Measurement data saved successfully!");
 }


// ==========================================
// 3. SITE MEASUREMENT KHATA & ROOM ESTIMATOR
// ==========================================
// =========================================================================
// SMART WORKER PRO - SITE MEASUREMENT KHATA & ESTIMATION ENGINE
// Multi-Room Dimension Tracking, Auto Labour Costing & Multi-Cuts
// =========================================================================

// ========================================================
 // SMART SITE MEASUREMENT KHATA & ESTIMATION ENGINE
 // ========================================================
 let siteKhataItems = [];


// ========================================================
 // MULTI-PRODUCT AUTOMATED ROUTING & BATCH CUTTING ENGINE
 // Handles 40mm, 34mm, Partitions, Domal, Sliding, Doors simultaneously!
 // ========================================================
 function loadKhataItemToModule(idx) {
 const itm = siteKhataItems[idx];
 if (!itm) return;

 const cat = itm.category;

 if (cat.includes("Casement")) {
 // Route to Casement 34mm / 40mm Screen
 openScreen('casement', 'CUSTOM CASEMENT');
 document.getElementById('cc_unit').value = "Inch";
 document.getElementById('cc_series').value = cat.includes("34") ? "34 Series" : "40 Series";
 document.getElementById('cc_h').value = itm.h;
 document.getElementById('cc_w').value = itm.w;
 if (document.getElementById('cc_loc')) document.getElementById('cc_loc').value = `${itm.room} [${itm.tag}]`;
 if (document.getElementById('cc_qty')) document.getElementById('cc_qty').value = itm.qty;
 applyKhataSpecsToModule('cc', itm);
 calculateCasement();
 alert(`Loaded ${itm.room} (${cat}) into Casement Calculator!`);
 } else if (cat.includes("Partition")) {
 // Route to Partition Screen
 openScreen('partition', 'PARTITION MASTER');
 document.getElementById('pt_unit').value = "Inch";
 document.getElementById('pt_type').value = cat.includes("Door") ? "Door + Partition" : "Fixed Partition";
 document.getElementById('pt_h').value = itm.h;
 document.getElementById('pt_w').value = itm.w;
 if (cat.includes("Door")) {
 document.getElementById('pt_dh').value = "80";
 document.getElementById('pt_dw').value = "32";
 }
 applyKhataSpecsToModule('pt', itm);
 calculatePartition();
 alert(`Loaded ${itm.room} into Partition Calculator!`);
 } else if (cat.includes("Domal")) {
 // Route to Domal Screen
 openScreen('domal', 'DOMAL WINDOW');
 document.getElementById('dm_unit').value = "Inch";
 document.getElementById('dm_type').value = cat.includes("3-Track") ? "3-Track (3-Sash)" : (cat.includes("4-Track") ? "4-Track (4-Sash)" : "2-Track (2-Sash)");
 document.getElementById('dm_h').value = itm.h;
 document.getElementById('dm_w').value = itm.w;
 if (document.getElementById('dm_loc')) document.getElementById('dm_loc').value = `${itm.room} [${itm.tag}]`;
 if (document.getElementById('dm_qty')) document.getElementById('dm_qty').value = itm.qty;
 applyKhataSpecsToModule('dm', itm);
 calculateDomal();
 alert(`Loaded ${itm.room} into Domal Calculator!`);
 } else if (cat.includes("Sliding")) {
 // Route to Sliding Screen
 openScreen('sliding', 'SLIDING WINDOW');
 document.getElementById('sl_unit').value = "Inch";
 document.getElementById('sl_type').value = cat.includes("3-Track") ? "3-Track" : (cat.includes("4-Track") ? "4-Track" : "2-Track");
 document.getElementById('sl_sys').value = cat.includes("25x65") ? "25x65 System" : (cat.includes("25x50") ? "25x50 System" : "18x40 System");
 document.getElementById('sl_h').value = itm.h;
 document.getElementById('sl_w').value = itm.w;
 if (document.getElementById('sl_loc')) document.getElementById('sl_loc').value = `${itm.room} [${itm.tag}]`;
 if (document.getElementById('sl_qty')) document.getElementById('sl_qty').value = itm.qty;
 applyKhataSpecsToModule('sl', itm);
 calculateSliding();
 alert(`Loaded ${itm.room} into Sliding Calculator!`);
 } else if (cat.includes("Door")) {
 // Route to Door Screen
 openScreen('door', 'DOOR OPTION');
 document.getElementById('dr_unit').value = "Inch";
 document.getElementById('dr_type').value = cat.includes("Floor Spring") ? "Floor Spring Door" : (cat.includes("Domal") ? "Domal System Door" : "Standard Door");
 if (typeof onDoorTypeChanged === 'function') onDoorTypeChanged();
 document.getElementById('dr_h').value = itm.h;
 document.getElementById('dr_w').value = itm.w;
 if (document.getElementById('dr_loc')) document.getElementById('dr_loc').value = `${itm.room} [${itm.tag}]`;
 if (document.getElementById('dr_qty')) document.getElementById('dr_qty').value = itm.qty;
 applyKhataSpecsToModule('dr', itm);
 calculateDoor();
 alert(`Loaded ${itm.room} into Door Calculator!`);
 } else if (cat.includes("Ceiling")) {
 openScreen('ceiling', 'CEILING ESTIMATOR');
 document.getElementById('ce_type').value = cat.includes("PVC") ? "PVC Panel" : "Gypsum Board";
 document.getElementById('ce_l').value = Math.round(itm.h / 12);
 document.getElementById('ce_w').value = Math.round(itm.w / 12);
 calculateCeiling();
 alert(`Loaded ${itm.room} into Ceiling Calculator!`);
 }
 }

 function processAllKhataCutsAtOnce() {
 if (siteKhataItems.length === 0) {
 alert("Khata is empty! Please add site measurements first.");
 return;
 }

 let casementCount = 0, partitionCount = 0, domalCount = 0, slidingCount = 0, doorCount = 0;

 // Clear existing modules to receive fresh site data
 clearCasement();
 clearPartition();
 clearDomal();
 clearSliding();
 clearDoor();

 siteKhataItems.forEach(itm => {
 const cat = itm.category;

 if (cat.includes("Casement")) {
 casementCount += itm.qty;
 document.getElementById('cc_unit').value = "Inch";
 document.getElementById('cc_series').value = cat.includes("34") ? "34 Series" : "40 Series";
 document.getElementById('cc_h').value = itm.h;
 document.getElementById('cc_w').value = itm.w;
 if (document.getElementById('cc_loc')) document.getElementById('cc_loc').value = `${itm.room} [${itm.tag}]`;
 if (document.getElementById('cc_qty')) document.getElementById('cc_qty').value = itm.qty;
 applyKhataSpecsToModule('cc', itm);
 calculateCasement();
 } else if (cat.includes("Partition")) {
 partitionCount += itm.qty;
 document.getElementById('pt_unit').value = "Inch";
 document.getElementById('pt_type').value = cat.includes("Door") ? "Door + Partition" : "Fixed Partition";
 document.getElementById('pt_h').value = itm.h;
 document.getElementById('pt_w').value = itm.w;
 if (cat.includes("Door")) {
 document.getElementById('pt_dh').value = "80";
 document.getElementById('pt_dw').value = "32";
 }
 applyKhataSpecsToModule('pt', itm);
 for (let pq = 0; pq < (itm.qty || 1); pq++) calculatePartition();
 } else if (cat.includes("Domal")) {
 domalCount += itm.qty;
 document.getElementById('dm_unit').value = "Inch";
 document.getElementById('dm_type').value = cat.includes("3-Track") ? "3-Track (3-Sash)" : (cat.includes("4-Track") ? "4-Track (4-Sash)" : "2-Track (2-Sash)");
 document.getElementById('dm_h').value = itm.h;
 document.getElementById('dm_w').value = itm.w;
 if (document.getElementById('dm_loc')) document.getElementById('dm_loc').value = `${itm.room} [${itm.tag}]`;
 if (document.getElementById('dm_qty')) document.getElementById('dm_qty').value = itm.qty;
 applyKhataSpecsToModule('dm', itm);
 calculateDomal();
 } else if (cat.includes("Sliding")) {
 slidingCount += itm.qty;
 document.getElementById('sl_unit').value = "Inch";
 document.getElementById('sl_type').value = cat.includes("3-Track") ? "3-Track" : (cat.includes("4-Track") ? "4-Track" : "2-Track");
 document.getElementById('sl_sys').value = cat.includes("25x65") ? "25x65 System" : (cat.includes("25x50") ? "25x50 System" : "18x40 System");
 document.getElementById('sl_h').value = itm.h;
 document.getElementById('sl_w').value = itm.w;
 if (document.getElementById('sl_loc')) document.getElementById('sl_loc').value = `${itm.room} [${itm.tag}]`;
 if (document.getElementById('sl_qty')) document.getElementById('sl_qty').value = itm.qty;
 applyKhataSpecsToModule('sl', itm);
 calculateSliding();
 } else if (cat.includes("Door")) {
 doorCount += itm.qty;
 document.getElementById('dr_unit').value = "Inch";
 document.getElementById('dr_type').value = cat.includes("Floor Spring") ? "Floor Spring Door" : (cat.includes("Domal") ? "Domal System Door" : "Standard Door");
 if (typeof onDoorTypeChanged === 'function') onDoorTypeChanged();
 document.getElementById('dr_h').value = itm.h;
 document.getElementById('dr_w').value = itm.w;
 if (document.getElementById('dr_loc')) document.getElementById('dr_loc').value = `${itm.room} [${itm.tag}]`;
 if (document.getElementById('dr_qty')) document.getElementById('dr_qty').value = itm.qty;
 applyKhataSpecsToModule('dr', itm);
 calculateDoor();
 }
 });

 // Transfer into Quotation
 convertKhataToQuotation();

 const summary = `SUCCESSFULLY PROCESSED ALL SITE PRODUCTS!\n----------------------------------------\n• Casement 40mm/34mm: ${casementCount} Windows\n• Partitions (Fixed/Door): ${partitionCount} Grids\n• Domal Windows: ${domalCount} Windows\n• Sliding Windows: ${slidingCount} Windows\n• Doors: ${doorCount} Doors\n\nAll cutting sizes, profile purchase sticks, glass lists, and client billing have been generated!`;
 alert(summary);
 }

 function getLabourRateForCategory(cat) {
 const cost_data = JSON.parse(localStorage.getItem('sw_bill_settings') || '{}');
 if (cat.includes("Domal")) return parseFloat(cost_data['Domal Window Labour']) || 50.0;
 if (cat.includes("Casement")) return parseFloat(cost_data['Casement Labour']) || 60.0;
 if (cat.includes("Door")) return parseFloat(cost_data['Door Master Labour']) || 65.0;
 if (cat.includes("Partition")) return parseFloat(cost_data['Partition Labour']) || 40.0;
 return parseFloat(cost_data['Sliding Window Labour']) || 35.0;
 }

 function addOpeningToKhata() {
 const room = document.getElementById('sk_room').value.trim() || "General Room";
 const tag = document.getElementById('sk_tag').value.trim() || `Unit-${siteKhataItems.length + 1}`;
 const cat = document.getElementById('sk_category').value;
 const h = safeEval(document.getElementById('sk_h').value);
 const w = safeEval(document.getElementById('sk_w').value);
 const qty = Math.max(1, parseInt(document.getElementById('sk_qty').value) || 1);
 const aluColor = getModuleAluColor('sk');
 const aluThick = getModuleAluThick('sk');
 const gType = document.getElementById('sk_glass') ? document.getElementById('sk_glass').value : 'Clear';
 const gThick = document.getElementById('sk_g_thick') ? document.getElementById('sk_g_thick').value : '5 mm';
 const glass = aluThick + ' ' + aluColor + ' | ' + gThick + ' ' + gType;

 if (h === 0 || w === 0) {
 alert("Please enter valid Height and Width in inches.");
 return;
 }

 const sq_ft_per_pc = (h * w) / 144.0;
 const total_sqft = sq_ft_per_pc * qty;
 const labour_rate = getLabourRateForCategory(cat);
 const labour_cost = total_sqft * labour_rate;
 const est_rate = calculateSuggestedRate(cat, aluThick, aluColor, gThick, gType, gType.includes("Toughened"));
 const est_price = total_sqft * est_rate;

 siteKhataItems.push({
 id: Date.now(),
 room: room,
 tag: tag,
 category: cat,
 h: h,
 w: w,
 qty: qty,
 alu_color: aluColor,
 alu_thick: aluThick,
 glass_thick: gThick,
 glass_type: gType,
 glass: glass,
 sqft_pc: sq_ft_per_pc,
 total_sqft: total_sqft,
 labour_rate: labour_rate,
 labour_cost: labour_cost,
 est_rate: est_rate,
 est_price: est_price
 });

 renderKhataTable();
 updateKhataSummary();

 // Clear size inputs for next entry
 document.getElementById('sk_tag').value = "";
 document.getElementById('sk_h').value = "";
 document.getElementById('sk_w').value = "";
 document.getElementById('sk_qty').value = "1";
 }

 function deleteKhataItem(idx) {
 siteKhataItems.splice(idx, 1);
 renderKhataTable();
 updateKhataSummary();
 }

 function clearSiteKhata() {
 if (confirm("Start a new site? Current entries will be cleared.")) {
 siteKhataItems = [];
 document.getElementById('sk_client_name').value = "";
 document.getElementById('sk_client_phone').value = "";
 document.getElementById('sk_site_loc').value = "";
 renderKhataTable();
 updateKhataSummary();
 }
 }

 function renderKhataTable() {
 const container = document.getElementById('sk_entries_container');
 if (siteKhataItems.length === 0) {
 container.innerHTML = `<div style="text-align:center; color:#94a3b8; padding:20px;">No site openings recorded yet. Add an opening above!</div>`;
 return;
 }

 let html = `<table style="width:100%; border-collapse:collapse; text-align:left;">
 <thead>
 <tr style="background:#f1f5f9; border-bottom:1px solid #cbd5e1; font-size:0.72rem; color:#475569;">
 <th style="padding:4px;">#</th>
 <th style="padding:4px;">Room / Tag</th>
 <th style="padding:4px;">Type</th>
 <th style="padding:4px;">Size (HxW)</th>
 <th style="padding:4px; text-align:center;">Qty</th>
 <th style="padding:4px; text-align:right;">Sq.Ft</th>
 <th style="padding:4px; text-align:right;">Labour</th>
 <th style="padding:4px; text-align:center;">Action</th>
 </tr>
 </thead>
 <tbody>`;

 siteKhataItems.forEach((itm, idx) => {
 html += `<tr style="border-bottom:1px solid #f1f5f9;">
 <td style="padding:4px; color:#64748b;">${idx + 1}</td>
 <td style="padding:4px; font-weight:bold; color:#1e293b;">${itm.room}<br><span style="color:#0284c7; font-size:0.68rem;">[${itm.tag}]</span></td>
 <td style="padding:4px; font-size:0.7rem;">${itm.category}</td>
 <td style="padding:4px; font-weight:600;">${itm.h}" x ${itm.w}"</td>
 <td style="padding:4px; text-align:center; font-weight:bold;">${itm.qty}</td>
 <td style="padding:4px; text-align:right;">${itm.total_sqft.toFixed(1)}</td>
 <td style="padding:4px; text-align:right; color:#ea580c; font-weight:600;">Rs ${Math.round(itm.labour_cost)}</td>
 <td style="padding:4px; text-align:center; white-space:nowrap;">
 <button onclick="loadKhataItemToModule(${idx})" style="background:#e0f2fe; color:#0284c7; border:1px solid #bae6fd; border-radius:4px; padding:2px 6px; font-size:0.68rem; font-weight:bold; cursor:pointer; margin-right:3px;" title="Open in Calculator">Load &rarr;</button>
 <button onclick="deleteKhataItem(${idx})" style="background:#fee2e2; color:#dc2626; border:none; border-radius:4px; padding:2px 6px; cursor:pointer;">✕</button>
 </td>
 </tr>`;
 });

 html += `</tbody></table>`;
 container.innerHTML = html;
 }

 function updateKhataSummary() {
 const totalUnits = siteKhataItems.reduce((a, b) => a + b.qty, 0);
 const totalSqft = siteKhataItems.reduce((a, b) => a + b.total_sqft, 0);
 const totalLabour = siteKhataItems.reduce((a, b) => a + b.labour_cost, 0);
 const totalAmount = siteKhataItems.reduce((a, b) => a + b.est_price, 0);

 document.getElementById('sk_total_units').textContent = `${totalUnits} Pcs`;
 document.getElementById('sk_total_sqft').textContent = totalSqft.toFixed(1);
 document.getElementById('sk_total_labour').textContent = `Rs ${Math.round(totalLabour).toLocaleString('en-IN')}`;
 document.getElementById('sk_total_amount').textContent = `Rs ${Math.round(totalAmount).toLocaleString('en-IN')}`;
 }

 function convertKhataToQuotation() {
 if (siteKhataItems.length === 0) {
 alert("Khata is empty! Please record measurements first.");
 return;
 }

 const clientName = document.getElementById('sk_client_name').value.trim();
 const clientPhone = document.getElementById('sk_client_phone').value.trim();
 const siteLoc = document.getElementById('sk_site_loc').value.trim();

 if (clientName) document.getElementById('q_name').value = clientName;
 if (clientPhone) document.getElementById('q_phone').value = clientPhone;
 if (siteLoc) {
 document.getElementById('q_addr').value = siteLoc;
 if (document.getElementById('q_site_addr')) document.getElementById('q_site_addr').value = siteLoc;
 }

 billItems = [];
 siteKhataItems.forEach(itm => {
 billItems.push({
 type: itm.category,
 location: `${itm.room} [${itm.tag}]`,
 color: itm.alu_color || "Powder Coated Black",
 thickness: itm.alu_thick || "1.2 mm",
 glass_thick: itm.glass_thick || "5 mm",
 glass_type: itm.glass_type || itm.glass,
 toughened: itm.glass.includes("Toughened"),
 h: itm.h / 12.0, // convert inches to feet
 w: itm.w / 12.0,
 unit: "ft",
 qty: itm.qty,
 rate: itm.est_rate,
 area: itm.total_sqft,
 price: itm.est_price
 });
 });

 refreshQueueText();
 autoCalcAdvance();
 openScreen('quotation', 'PRO QUOTATION');
 alert("All site openings transferred into Client Quotation successfully!");
 }

 function exportSiteKhataMasterPdf() {
 if (!isAppActivated()) {
 alert("PRO activation is required to generate Site Khata Master PDFs.");
 openScreen('activation', 'PRO UPGRADE & PLANS');
 return;
 }

 if (siteKhataItems.length === 0) {
 alert("Khata is empty! Please record measurements first.");
 return;
 }

 var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null); if (!jsPDF) { alert("PDF library is loading, please try again."); return; }
 const doc = new jsPDF('l', 'mm', 'a4');

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const shop_name = (profile.shop_name || "SMART WORKER ALUMINIUM").toUpperCase();
 const contact = profile.phone || "N/A";
 const addr = profile.address || "";
 const clientName = document.getElementById('sk_client_name').value.trim() || "Valued Client";
 const clientPhone = document.getElementById('sk_client_phone').value.trim() || "N/A";
 const siteLoc = document.getElementById('sk_site_loc').value.trim() || "Project Site";
 const today = new Date().toLocaleDateString('en-GB');

 drawDocHeaderWithLogo(doc, "MASTER SITE MEASUREMENT & JOB CARD", "Site: " + siteLoc, [30, 58, 138]);

 // Client & Site Card
 doc.setFillColor(248, 250, 252);
 doc.setDrawColor(203, 213, 225);
 doc.roundedRect(14, 36, 182, 16, 2, 2, 'FD');

 doc.setFont("helvetica", "bold");
 doc.setFontSize(8);
 doc.setTextColor(15, 23, 42);
 doc.text(`CLIENT: ${clientName.toUpperCase()} | Phone: ${clientPhone}`, 18, 42);
 doc.text(`SITE LOCATION: ${siteLoc}`, 18, 47);
 doc.text(`DATE RECORDED: ${today}`, 192, 42, { align: "right" });
 doc.text(`STATUS: ACTIVE FABRICATION ORDER`, 192, 47, { align: "right" });

 // Table 1: Room by Room Measurement Khata
 const khataRows = siteKhataItems.map((itm, i) => [
 i + 1,
 itm.room,
 itm.tag,
 itm.category,
 `${itm.h}" x ${itm.w}"`,
 `${itm.qty} Pcs`,
 `${itm.total_sqft.toFixed(1)}`,
 `Rs ${Math.round(itm.labour_cost)}`,
 itm.glass
 ]);

 const totalUnits = siteKhataItems.reduce((a, b) => a + b.qty, 0);
 const totalSqft = siteKhataItems.reduce((a, b) => a + b.total_sqft, 0);
 const totalLabour = siteKhataItems.reduce((a, b) => a + b.labour_cost, 0);

 khataRows.push([
 { content: "TOTAL SITE SUMMARY", colSpan: 4, styles: { halign: 'right', fontStyle: 'bold', fillColor: [241, 245, 249] } },
 { content: "-", styles: { halign: 'center' } },
 { content: `${totalUnits} Pcs`, styles: { halign: 'center', fontStyle: 'bold', fillColor: [224, 242, 254] } },
 { content: `${totalSqft.toFixed(1)} Sq.Ft`, styles: { halign: 'center', fontStyle: 'bold', fillColor: [224, 242, 254] } },
 { content: `Rs ${Math.round(totalLabour)}`, styles: { halign: 'center', fontStyle: 'bold', textColor: [234, 88, 12], fillColor: [255, 237, 213] } },
 { content: "Full Site Handover", styles: { fontSize: 7 } }
 ]);

 doc.autoTable({
 startY: 55,
 head: [['#', 'Room / Floor', 'Tag', 'Profile Category', 'Size (HxW)', 'Qty', 'Sq.Ft', 'Labour', 'Glass / Spec']],
 body: khataRows,
 theme: 'grid',
 headStyles: {
 fillColor: [30, 58, 138],
 textColor: [255, 255, 255],
 fontStyle: 'bold',
 fontSize: 8,
 halign: 'center'
 },
 styles: {
 fontSize: 7.5,
 cellPadding: 2,
 lineColor: [203, 213, 225],
 lineWidth: 0.2
 },
 columnStyles: {
 0: { cellWidth: 8, halign: 'center' },
 1: { cellWidth: 26, fontStyle: 'bold' },
 2: { cellWidth: 16, halign: 'center', fontStyle: 'bold', textColor: [2, 132, 199] },
 3: { cellWidth: 38 },
 4: { cellWidth: 22, halign: 'center', fontStyle: 'bold' },
 5: { cellWidth: 14, halign: 'center', fontStyle: 'bold' },
 6: { cellWidth: 16, halign: 'center' },
 7: { cellWidth: 18, halign: 'center', fontStyle: 'bold', textColor: [234, 88, 12] },
 8: { cellWidth: 24 }
 }
 });

 let currentY = doc.lastAutoTable.finalY + 8;
 if (currentY > 230) { doc.addPage(); currentY = 16; }

  doc.save(`SiteKhata_${clientName.replace(/\s+/g, '_')}_${today.replace(/\//g, '-')}.pdf`);
 }

 function exportKhataMaterialOrderPdf() {
 if (!isAppActivated()) {
 alert("PRO activation is required to generate Material Order Slips.");
 openScreen('activation', 'PRO UPGRADE & PLANS');
 return;
 }

 if (siteKhataItems.length === 0) {
 alert("Khata is empty! Please record measurements first.");
 return;
 }

 // Consolidate buckets for all items
 const siteBuckets = {};
 const siteGlass = {};

 siteKhataItems.forEach(itm => {
 const catKey = itm.category.split(' ')[0] + " Profiles";
 if (!siteBuckets[catKey]) siteBuckets[catKey] = [];
 // Approximate profile perimeter in feet
 const runFt = ((itm.h + itm.w) * 2 / 12) * itm.qty;
 siteBuckets[catKey].push(runFt * 12);

 const gKey = `${itm.h - 4}" x ${Math.round(itm.w / 2)}" (${itm.glass})`;
 siteGlass[gKey] = (siteGlass[gKey] || 0) + (itm.qty * 2);
 });

 exportMatPurchasePdf("Site_Khata_Material_Order", "Full Site Material Order", siteBuckets, siteGlass);
 }

 function shareKhataWhatsApp() {
 if (siteKhataItems.length === 0) {
 alert("Khata is empty! Please record measurements first.");
 return;
 }

 const clientName = document.getElementById('sk_client_name').value.trim() || "Client";
 const siteLoc = document.getElementById('sk_site_loc').value.trim() || "Site";
 const totalUnits = siteKhataItems.reduce((a, b) => a + b.qty, 0);
 const totalSqft = siteKhataItems.reduce((a, b) => a + b.total_sqft, 0);
 const totalLabour = siteKhataItems.reduce((a, b) => a + b.labour_cost, 0);
 const totalAmount = siteKhataItems.reduce((a, b) => a + b.est_price, 0);

 let msg = `*SMART WORKER PRO - SITE MEASUREMENT KHATA*\n`;
 msg += `Client: ${clientName}\nSite: ${siteLoc}\n`;
 msg += `------------------------------------\n`;
 msg += `Total Units: ${totalUnits} Pcs\nTotal Area: ${totalSqft.toFixed(1)} Sq.Ft\n`;
 msg += `Total Labour: Rs ${Math.round(totalLabour).toLocaleString('en-IN')}\n`;
 msg += `Est. Total: Rs ${Math.round(totalAmount).toLocaleString('en-IN')}\n`;
 msg += `------------------------------------\n`;
 msg += `*ROOM-WISE OPENINGS:*\n`;

 siteKhataItems.forEach((itm, i) => {
 msg += `${i + 1}. [${itm.room} - ${itm.tag}] ${itm.category}\n Size: ${itm.h}"x${itm.w}" | Qty: ${itm.qty} | ${itm.total_sqft.toFixed(1)} Sq.Ft\n`;
 });

 msg += `\n-- Powered by Smart Worker Pro Fabrication Systems --`;
 const encoded = encodeURIComponent(msg);
 window.open(`https://wa.me/?text=${encoded}`, '_blank');
 }

 function numberToWordsINR(amount) {
 const num = Math.round(amount);
 if (num === 0) return "Zero Rupees Only";
 const a = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
 const b = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

 function convertTwoDigits(n) {
 if (n < 20) return a[n];
 return b[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + a[n % 10] : '');
 }

 function convertThreeDigits(n) {
 let str = '';
 if (Math.floor(n / 100) > 0) {
 str += a[Math.floor(n / 100)] + ' Hundred ';
 n %= 100;
 }
 if (n > 0) str += convertTwoDigits(n);
 return str.trim();
 }

 let crore = Math.floor(num / 10000000);
 let remainder = num % 10000000;
 let lakh = Math.floor(remainder / 100000);
 remainder = remainder % 100000;
 let thousand = Math.floor(remainder / 1000);
 remainder = remainder % 1000;
 let hundred = remainder;

 let res = '';
 if (crore > 0) res += convertTwoDigits(crore) + ' Crore ';
 if (lakh > 0) res += convertTwoDigits(lakh) + ' Lakh ';
 if (thousand > 0) res += convertTwoDigits(thousand) + ' Thousand ';
 if (hundred > 0) res += convertThreeDigits(hundred) + ' ';

 return 'INR ' + res.trim() + ' Only';
 }



// ==========================================
// 4. PROFESSIONAL BILLING & GST INVOICE GENERATOR
// ==========================================
// =========================================================================
// SMART WORKER PRO - PRO QUOTATION & GST INVOICE BILLING ENGINE
// Item Queuing, Live Discounts, GST (18%), Milestones & PDF Bill Printing
// =========================================================================

 // ========================================================
 // 9. PRO QUOTATION & DYNAMIC COSTING ENGINE
 // ========================================================
 let billItems = [];

 function calculateSuggestedRate(w_type, thickness, color, glass_thick, glass_type, toughened) {
 const cost_data = JSON.parse(localStorage.getItem('sw_bill_settings') || '{}');
 let thick_val = 1.5;
 try { thick_val = parseFloat(thickness.replace('mm', '').trim()) || 1.5; } catch(e){}

 if (w_type.includes('uPVC')) {
   let uRate = 480;
   if (w_type.includes('3-Track') && w_type.includes('Door')) uRate = 720;
   else if (w_type.includes('3-Track')) uRate = 580;
   else if (w_type.includes('2.5-Track')) uRate = 540;
   else if (w_type.includes('Double') || w_type.includes('French')) uRate = 680;
   else if (w_type.includes('Single Door')) uRate = 650;
   else if (w_type.includes('Casement')) uRate = 620;
   else if (w_type.includes('Fixed')) uRate = 420;
   if (toughened) uRate += 55;
   if (glass_type && glass_type.includes('DGU')) uRate += 140;
   if (color && !color.toLowerCase().includes('white') && !color.toLowerCase().includes('silver')) uRate += 45;
   return uRate;
 }
 const is_domal = w_type.includes('Domal');
 let base_wt = 0.90;

 if (w_type.includes('4-Track') || w_type.includes('Center Open')) base_wt = (is_domal ? 1.80 : 1.40) * (thick_val / 1.5);
 else if (w_type.includes('3-Track')) base_wt = (is_domal ? 1.45 : 1.10) * (thick_val / 1.5);
 else if (w_type.includes('2-Track')) base_wt = (is_domal ? 1.05 : 0.80) * (thick_val / 1.5);
 else if (w_type.includes('Casement')) base_wt = 1.15 * (thick_val / 1.5);
 else if (w_type.includes('Door')) base_wt = 1.35 * (thick_val / 1.5);
 else if (w_type.includes('Partition')) {
   let p_base = 0.90;
   if (w_type.includes('2x1') || w_type.includes('2"x1"')) p_base = 0.72;
   else if (w_type.includes('1.75')) p_base = 0.82;
   else if (w_type.includes('3x1.5') || w_type.includes('3"x1.5"')) p_base = 1.15;
   else if (w_type.includes('4x1.75') || w_type.includes('4"x1.75"') || w_type.includes('4x1.5') || w_type.includes('4"x1.5"')) p_base = 1.45;
   base_wt = p_base * (thick_val / 1.5);
 }
 else if (w_type.includes('Ceiling')) return w_type.includes('Gypsum') ? 110.0 : 95.0;

 let alu_kg_rate = 260.0;
 if (is_domal) {
 if (color.includes('Wooden')) alu_kg_rate = parseFloat(cost_data['Domal Wooden Finish (Rs/Kg)']) || 365.0;
 else if (color.includes('Powder')) alu_kg_rate = parseFloat(cost_data['Domal Powder Coated (Rs/Kg)']) || 310.0;
 else if (['Golden', 'Gold', 'Champagne', 'SS'].some(c => color.includes(c))) alu_kg_rate = (parseFloat(cost_data['Domal Anodized (Rs/Kg)']) || 295.0) + 15.0;
 else if (color.includes('Anodized')) alu_kg_rate = parseFloat(cost_data['Domal Anodized (Rs/Kg)']) || 295.0;
 else alu_kg_rate = parseFloat(cost_data['Domal Mill/Natural (Rs/Kg)']) || 280.0;
 } else if (w_type.includes('Door')) {
 alu_kg_rate = parseFloat(cost_data['Door Master Material (Rs/Kg)']) || 270.0;
 if (color.includes('Wooden')) alu_kg_rate += 75.0;
 else if (color.includes('Powder')) alu_kg_rate += 25.0;
 else if (color.includes('Golden') || color.includes('Champagne')) alu_kg_rate += 15.0;
 } else if (w_type.includes('Partition')) {
 alu_kg_rate = parseFloat(cost_data['Partition Material (Rs/Kg)']) || 265.0;
 if (color.includes('Wooden')) alu_kg_rate += 75.0;
 else if (color.includes('Powder')) alu_kg_rate += 25.0;
 else if (color.includes('Golden') || color.includes('Champagne')) alu_kg_rate += 15.0;
 } else if (w_type.includes('Casement')) {
 alu_kg_rate = parseFloat(cost_data['Casement Material (Rs/Kg)']) || 275.0;
 if (color.includes('Wooden')) alu_kg_rate += 75.0;
 else if (color.includes('Powder')) alu_kg_rate += 25.0;
 else if (color.includes('Golden') || color.includes('Champagne')) alu_kg_rate += 15.0;
 } else {
 if (color.includes('Wooden')) alu_kg_rate = parseFloat(cost_data['Sliding Wooden Finish (Rs/Kg)']) || 345.0;
 else if (color.includes('Powder')) alu_kg_rate = parseFloat(cost_data['Sliding Powder Coated (Rs/Kg)']) || 290.0;
 else if (['Golden', 'Gold', 'Champagne', 'SS'].some(c => color.includes(c))) alu_kg_rate = (parseFloat(cost_data['Sliding Anodized (Rs/Kg)']) || 275.0) + 15.0;
 else if (color.includes('Anodized')) alu_kg_rate = parseFloat(cost_data['Sliding Anodized (Rs/Kg)']) || 275.0;
 else alu_kg_rate = parseFloat(cost_data['Sliding Mill/Natural (Rs/Kg)']) || 260.0;
 }

 const alu_cost = base_wt * alu_kg_rate;
 const clean_g_thick = String(glass_thick).replace('Glass', '').replace('mm', '').trim();
 const glass_multipliers = { '3.5': 0.80, '4': 0.88, '4.0': 0.88, '5': 1.00, '5.0': 1.00, '6': 1.25, '6.0': 1.25, '8': 1.80, '8.0': 1.80, '10': 2.35, '10.0': 2.35, '12': 3.00, '12.0': 3.00 };
 const g_mult = glass_multipliers[clean_g_thick] || 1.0;
 const base_clear_sqft = parseFloat(cost_data['Clear Glass (Rs/Sq.Ft)']) || 35.0;

 let glass_cost = base_clear_sqft * g_mult;
 const gtStr = String(glass_type);
 if (String(glass_thick).includes('DGU') || gtStr.includes('DGU') || gtStr.includes('Double')) {
 glass_cost = 195.0;
 } else if (gtStr.includes('Laminated')) {
 glass_cost = (base_clear_sqft * g_mult) + 65.0;
 } else if (gtStr.includes('Solar')) {
 glass_cost = (base_clear_sqft * g_mult) + 55.0;
 } else {
 if (gtStr.includes('One Way') || gtStr.includes('Reflective')) {
 const refl_base = parseFloat(cost_data['Reflective Glass (Rs/Sq.Ft)']) || 55.0;
 glass_cost += Math.max(15.0, refl_base - base_clear_sqft);
 } else if (gtStr.includes('Extra Clear')) {
 glass_cost += 18.0;
 } else if (gtStr.includes('Tinted')) {
 glass_cost += 12.0;
 } else if (gtStr.includes('Frosted') || gtStr.includes('Pinhead') || gtStr.includes('Bajri')) {
 glass_cost += 10.0;
 }
 if (gtStr.includes('ACP') || String(w_type).includes('ACP')) {
 glass_cost += 15.0;
 }
 }

 const is_toughened = typeof toughened === 'boolean' ? toughened : ['Toughened', 'Yes', 'True', '1'].some(w => String(toughened).includes(w));
 const tough_extra = parseFloat(cost_data['Toughened Extra (Rs/Sq.Ft)']) || 25.0;
 if (is_toughened) {
 if (['8.0', '10.0', '12.0'].some(g => clean_g_thick.includes(g))) glass_cost += tough_extra * 1.4;
 else glass_cost += tough_extra;
 }

 const hw_cost = is_domal ? 55.0 : 35.0;
 let labour_cost = 35.0, margin = 0.15;
 if (is_domal) {
 labour_cost = parseFloat(cost_data['Domal Window Labour']) || 50.0;
 margin = (parseFloat(cost_data['Domal Profit (%)']) || 20.0) / 100.0;
 } else if (w_type.includes('Casement')) {
 labour_cost = parseFloat(cost_data['Casement Labour']) || 60.0;
 margin = (parseFloat(cost_data['Casement Profit (%)']) || 25.0) / 100.0;
 } else if (w_type.includes('Door')) {
 labour_cost = parseFloat(cost_data['Door Master Labour']) || 65.0;
 margin = (parseFloat(cost_data['Door Profit (%)']) || 20.0) / 100.0;
 } else if (w_type.includes('Partition')) {
 labour_cost = parseFloat(cost_data['Partition Labour']) || 40.0;
 margin = (parseFloat(cost_data['Door Profit (%)']) || 18.0) / 100.0;
 } else {
 labour_cost = parseFloat(cost_data['Sliding Window Labour']) || 35.0;
 margin = (parseFloat(cost_data['Sliding Profit (%)']) || 15.0) / 100.0;
 }

 const sub_cost = alu_cost + glass_cost + hw_cost + labour_cost;
 const final_rate = Math.round((sub_cost * (1.0 + margin)) / 10) * 10;
 return Math.max(150.0, final_rate);
 }

 function updateSuggestedRate() {
 const w_type = document.getElementById('q_type').value;
 const color = getModuleAluColor('q');
 const thick = document.getElementById('q_thick').value;
 const g_thick = document.getElementById('q_g_thick').value;
 const g_type = document.getElementById('q_g_type').value;
 const tough = document.getElementById('q_tough').value.includes("Toughened");

 const uBox = document.getElementById('q_upvc_spec_box');
 if (uBox) uBox.style.display = w_type.includes('uPVC') ? 'block' : 'none';
 const rate = calculateSuggestedRate(w_type, thick, color, g_thick, g_type, tough);
 document.getElementById('q_rate').value = rate;
 }

 
// =========================================================================
// CUSTOMER KHATA HISTORY & PREVIOUS DUE AUTO-SYNC
// =========================================================================
let activeCustomerPreviousDue = 0;
let activeCustomerKhataObj = null;

function handleCustomerPhoneAutoLookup(inputVal) {
  if (!inputVal) {
    resetCustomerKhataStatusBox();
    return;
  }
  const clean = String(inputVal).replace(/\D/g, '');
  if (clean.length >= 4) {
    lookupCustomerByPhone(clean);
  } else {
    resetCustomerKhataStatusBox();
  }
}

function lookupCustomerByPhone(searchDigits) {
  const customers = JSON.parse(localStorage.getItem('sw_customers') || '{}');
  for (const phone in customers) {
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone === searchDigits || cleanPhone.endsWith(searchDigits)) {
      populateFoundCustomer(customers[phone], phone);
      return true;
    }
  }
  return false;
}

function populateFoundCustomer(cust, phoneKey) {
  activeCustomerKhataObj = cust;
  activeCustomerPreviousDue = Math.max(0, Number(cust.total_due) || 0);

  const nameInput = document.getElementById('q_name');
  const phoneInput = document.getElementById('q_phone');
  const addrInput = document.getElementById('q_addr');

  if (nameInput && (!nameInput.value || nameInput.value === 'Customer')) {
    nameInput.value = cust.name || "";
  }
  if (phoneInput && phoneInput.value !== phoneKey) {
    phoneInput.value = phoneKey;
  }
  if (addrInput && !addrInput.value) {
    addrInput.value = cust.address || "";
  }

  // Display Khata Box
  const box = document.getElementById('custKhataAlertBox');
  if (box) {
    box.style.display = 'block';
    const billed = Number(cust.total_billed) || 0;
    const paid = Number(cust.total_paid) || 0;
    const due = activeCustomerPreviousDue;

    const titleEl = document.getElementById('ckb_client_title');
    if (titleEl) titleEl.textContent = `${cust.name || 'Customer'} • Khata History Found`;
    const badgeEl = document.getElementById('ckb_due_badge');
    if (badgeEl) badgeEl.textContent = `₹${due.toLocaleString('en-IN')} Due`;
    const billedEl = document.getElementById('ckb_total_billed');
    if (billedEl) billedEl.textContent = `₹${billed.toLocaleString('en-IN')}`;
    const paidEl = document.getElementById('ckb_total_paid');
    if (paidEl) paidEl.textContent = `₹${paid.toLocaleString('en-IN')}`;
    const dueEl = document.getElementById('ckb_total_due');
    if (dueEl) dueEl.textContent = `₹${due.toLocaleString('en-IN')}`;
    const includeTextEl = document.getElementById('ckb_include_due_text');
    if (includeTextEl) includeTextEl.textContent = `₹${due.toLocaleString('en-IN')}`;
  }

  // Immediately update live due calculation
  updateLiveDue();
}

function resetCustomerKhataStatusBox() {
  activeCustomerPreviousDue = 0;
  activeCustomerKhataObj = null;
  const box = document.getElementById('custKhataAlertBox');
  if (box) box.style.display = 'none';
  updateLiveDue();
}

function autofillCustomer() {
  const phoneInput = document.getElementById('q_phone').value.trim();
  if (!phoneInput) {
    alert("Please enter Customer Mobile Number or last 4 digits first.");
    return;
  }
  const clean = phoneInput.replace(/\D/g, '');
  const found = lookupCustomerByPhone(clean || phoneInput);
  if (!found) {
    alert("No existing customer record found with this number (" + phoneInput + "). A new customer profile will be created upon saving.");
    resetCustomerKhataStatusBox();
  }
}


 function addBillItem() {
 const h = safeEval(document.getElementById('q_h').value);
 const w = safeEval(document.getElementById('q_w').value);
 const qty = Math.max(1, parseInt(safeEval(document.getElementById('q_qty').value)) || 1);
 const w_type = document.getElementById('q_type').value;
 const color = getModuleAluColor('q');
 const thick = document.getElementById('q_thick').value;
 const g_thick = document.getElementById('q_g_thick').value;
 const g_type = document.getElementById('q_g_type').value;
 const toughened = document.getElementById('q_tough').value.includes("Toughened");
 const loc = document.getElementById('q_loc').value.trim();
 let rate = safeEval(document.getElementById('q_rate').value);
 if (rate <= 0) rate = calculateSuggestedRate(w_type, thick, color, g_thick, g_type, toughened);

 if (h === 0 || w === 0) { alert("Please enter valid Height and Width."); return; }

 const cost_data = JSON.parse(localStorage.getItem('sw_bill_settings') || '{}');
 const unit = cost_data['Default Unit'] || "Feet";
 let sq_ft = 0;
 if (unit === "Feet") sq_ft = h * w;
 else if (unit === "Millimeters") sq_ft = (h * w) / 92903.04;
 else sq_ft = (h * w) / 144;

 const total_sq_ft = sq_ft * qty;
 const total_price = total_sq_ft * rate;
 const unit_str = unit === "Feet" ? "ft" : (unit === "Millimeters" ? "mm" : "in");

 let finalType = w_type;
 if (w_type.includes('uPVC')) {
   const uGi = document.getElementById('q_upvc_gi')?.value || '1.2 mm GI Steel';
   const uHw = document.getElementById('q_upvc_hw')?.value || '';
   const uNote = (document.getElementById('q_upvc_note')?.value || '').trim();
   finalType = w_type + ' [' + uGi + (uHw ? ', ' + uHw : '') + (uNote ? ' | ' + uNote : '') + ']';
 }
 billItems.push({
 type: finalType, location: loc, color: color, thickness: thick, glass_thick: g_thick,
 glass_type: g_type, toughened: toughened, h: h, w: w, unit: unit_str, qty: qty,
 rate: rate, area: total_sq_ft, price: total_price
 });

 refreshQueueText();
 autoCalcAdvance();
 document.getElementById('q_h').value = "";
 document.getElementById('q_w').value = "";
 document.getElementById('q_qty').value = "1";
 document.getElementById('q_loc').value = "";
 }

 function removeLastBillItem() {
 if (billItems.length === 0) { alert("No items in bill to remove."); return; }
 billItems.pop();
 refreshQueueText();
 autoCalcAdvance();
 updateLiveDue();
 }

 function clearBillItems() {
 billItems = [];
 document.getElementById('bill_queue_text').textContent = "";
 document.getElementById('bill_output').textContent = "";
 document.getElementById('q_advance').value = "0";
 document.getElementById('q_due_label').textContent = "Rs. 0.00";
 }

 function refreshQueueText() {
 const lines = [];
 billItems.forEach((itm, i) => {
 const loc_lbl = itm.location ? `[${itm.location}] ` : "";
 lines.push(`[${i + 1}] ${loc_lbl}${itm.type} (${itm.thickness} ${itm.color} | ${itm.glass_thick} ${itm.glass_type}) | ${itm.h}x${itm.w} ${itm.unit} x ${itm.qty} @ Rs.${itm.rate.toFixed(0)} = Rs.${itm.price.toFixed(2)}`);
 });
 document.getElementById('bill_queue_text').textContent = lines.join('\n');
 }

 function getDiscountAndGst() {
 const cost_data = JSON.parse(localStorage.getItem('sw_bill_settings') || '{}');
 const gst = parseFloat(cost_data['GST']) || 0.0;
 const disc = parseFloat(cost_data['Discount']) || 0.0;
 return [disc, gst];
 }

 function autoCalcAdvance() {
 const grand_total = billItems.reduce((a, b) => a + b.price, 0);
 const [discount, gst_pct] = getDiscountAndGst();
 const extra_charge = safeEval(document.getElementById('q_extra_charge').value);
 const net_total = grand_total - discount;
 const final_total = net_total + (net_total * (gst_pct / 100)) + extra_charge;
 const adv_50 = Math.round(final_total * 0.5);
 document.getElementById('q_advance').value = adv_50;
 updateLiveDue();
 }

 function set50PercentAdvance() {
 autoCalcAdvance();
 }

 function updateLiveDue() {
 const grand_total = billItems.reduce((a, b) => a + b.price, 0);
 const [discount, gst_pct] = getDiscountAndGst();
 const extra_charge = safeEval(document.getElementById('q_extra_charge').value);
 const net_total = grand_total - discount;
 const final_total = net_total + (net_total * (gst_pct / 100)) + extra_charge;
 const adv = safeEval(document.getElementById('q_advance').value);
 const current_due = Math.max(0, final_total - adv);

 const includePrev = document.getElementById('q_include_prev_due') ? document.getElementById('q_include_prev_due').checked : true;
 const prevDueToAdd = includePrev ? (activeCustomerPreviousDue || 0) : 0;
 const total_payable_due = current_due + prevDueToAdd;

 const dueLabel = document.getElementById('q_due_label');
 if (dueLabel) {
   if (prevDueToAdd > 0) {
     dueLabel.innerHTML = `<span style="color:#0284c7;">Current Due: ₹${current_due.toFixed(2)}</span> + <span style="color:#b91c1c; font-weight:800;">Previous Due: ₹${prevDueToAdd.toFixed(2)}</span> = <b style="font-size:1.05rem; color:#dc2626;">TOTAL DUE: ₹${total_payable_due.toFixed(2)}</b>`;
   } else {
     dueLabel.innerHTML = `Rs. ${current_due.toFixed(2)} (Total Work: Rs. ${final_total.toFixed(2)})`;
   }
 }
 }

 // Auto-commit pending item if user typed Height & Width and directly clicked Generate/Save/PDF Bill
 function autoCommitPendingBillItemIfNeeded() {
   try {
     const hEl = document.getElementById('q_h');
     const wEl = document.getElementById('q_w');
     const hVal = hEl ? safeEval(hEl.value) : 0;
     const wVal = wEl ? safeEval(wEl.value) : 0;
     if (hVal > 0 && wVal > 0) {
       addBillItem();
     }
   } catch(e){}
 }

 // Get effective bill items (even if user left items incomplete, returns a proper structured item row so Proper Bill always renders!)
 function getEffectiveProperBillItems() {
   autoCommitPendingBillItemIfNeeded();
   if (billItems && billItems.length > 0) return billItems;
   const w_type = document.getElementById('q_type') ? document.getElementById('q_type').value : "Aluminium & Glass Work";
   const color = getModuleAluColor('q');
   const thick = document.getElementById('q_thick') ? document.getElementById('q_thick').value : "1.5 mm";
   const g_thick = document.getElementById('q_g_thick') ? document.getElementById('q_g_thick').value : "5 mm";
   const g_type = document.getElementById('q_g_type') ? document.getElementById('q_g_type').value : "Clear";
   const toughened = document.getElementById('q_tough') ? document.getElementById('q_tough').value.includes("Toughened") : false;
   const loc = document.getElementById('q_loc') ? document.getElementById('q_loc').value.trim() : "";
   const qty = Math.max(1, parseInt(safeEval(document.getElementById('q_qty') ? document.getElementById('q_qty').value : "1")) || 1);
   const rate = safeEval(document.getElementById('q_rate') ? document.getElementById('q_rate').value : "0") || 0;
   return [{
     type: w_type, location: loc, color: color, thickness: thick,
     glass_thick: g_thick, glass_type: g_type, toughened: toughened,
     h: "-", w: "-", unit: "ft", qty: qty, rate: rate, area: 1.0, price: rate * qty
   }];
 }

 function generateBillText() {
 const effectiveItems = getEffectiveProperBillItems();

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 const shop_name = (profile.shop_name || "ALUMINIUM FABRICATION WORKSHOP").toUpperCase();
 const owner_name = (profile.name && profile.name !== "Fabricator") ? profile.name.trim() : "____________________";
 const contact_info = profile.phone ? profile.phone.trim() : "____________________";
 const addr = (profile.address && profile.address !== "Fabrication Workshop") ? profile.address.trim() : "____________________";
 const clean_email = (profile.email && profile.email.indexOf("@smartworker.app") === -1) ? profile.email.trim() : "";
 const email_info = clean_email ? `\n Email: ${clean_email}` : "";
 const gst_info = profile.gst ? `\n GSTIN: ${profile.gst.trim()}` : "";

 const bill_stage = document.getElementById('q_stage') ? document.getElementById('q_stage').value : "Quotation / Estimate";
 const raw_c_name = document.getElementById('q_name') ? document.getElementById('q_name').value.trim() : "";
 const raw_c_phone = document.getElementById('q_phone') ? document.getElementById('q_phone').value.trim() : "";
 const raw_c_addr = document.getElementById('q_addr') ? document.getElementById('q_addr').value.trim() : "";
 const c_name = raw_c_name || "Walk-in Customer";
 const c_phone = raw_c_phone || "____________________";
 const c_addr = raw_c_addr || "____________________";
 const c_gst = document.getElementById('q_client_gst') ? document.getElementById('q_client_gst').value.trim() : "";
 const c_site = document.getElementById('q_site_addr') ? document.getElementById('q_site_addr').value.trim() : "";
 const pay_terms = document.getElementById('q_payment_terms') ? document.getElementById('q_payment_terms').value.trim() : "";
 const remarks_note = document.getElementById('q_remarks') ? document.getElementById('q_remarks').value.trim() : "";
 const today = new Date().toLocaleDateString('en-GB');

 const [discount, gst_pct] = getDiscountAndGst();
 const advance_paid = safeEval(document.getElementById('q_advance') ? document.getElementById('q_advance').value : "0");
 const extra_charge = safeEval(document.getElementById('q_extra_charge') ? document.getElementById('q_extra_charge').value : "0");

 let bill = "=================================================\n";
 bill += ` ${shop_name}\n`;
 bill += ` Prop: ${owner_name}\n`;
 bill += ` Address: ${addr}\n`;
 bill += ` Mob: ${contact_info}${email_info}${gst_info}\n`;
 bill += "=================================================\n";
 bill += `Invoice Type: ${bill_stage}\nDate: ${today}\n\n`;
 bill += `Bill To:\nName: ${c_name}\nPhone: ${c_phone}\nAddress: ${c_addr}\n`;
 if (c_gst) bill += `Client GSTIN: ${c_gst}\n`;
 if (c_site) bill += `Site / Delivery: ${c_site}\n`;
 bill += "-------------------------------------------------\n";
 bill += "SN. Description Qty Sq.Ft Amount\n";
 bill += "-------------------------------------------------\n";

 let grand_total = 0.0;
 effectiveItems.forEach((item, i) => {
 const color = item.color || 'Powder Coated Black';
 const thick = item.thickness || '1.5 mm';
 const g_thick = item.glass_thick || '5 mm';
 const g_type = item.glass_type || 'Clear';
 const tough_txt = (item.toughened && !String(g_type).includes('Toughened')) ? " [TOUGHENED]" : "";
 const loc_txt = item.location ? `[${item.location}] ` : "";
 const desc = `${loc_txt}${item.type}\n Alu: ${thick} ${color} | Glass: ${g_thick} ${g_type}${tough_txt}\n Size: ${item.h}x${item.w} ${item.unit} @ Rs.${item.rate}/Sq.Ft`;
 bill += `${i + 1}. ${desc}\n ${item.qty} ${item.area.toFixed(1)} ${item.price.toFixed(2)}\n`;
 grand_total += item.price;
 });

 const net_total = Math.max(0, grand_total - discount);
 const gst_amount = net_total * (gst_pct / 100);
 const final_total = net_total + gst_amount + extra_charge;
 const due_amount = Math.max(0, final_total - advance_paid);
 const incPrev = document.getElementById('q_include_prev_due') ? document.getElementById('q_include_prev_due').checked : true;
 const prevDue = incPrev ? (activeCustomerPreviousDue || 0) : 0;
 const totalPayableDue = due_amount + prevDue;

 bill += "-------------------------------------------------\n";
 bill += ` Sub Total: Rs ${grand_total.toFixed(2)}\n`;
 if (discount > 0) bill += ` Discount: -Rs ${discount.toFixed(2)}\n`;
 if (gst_pct > 0) bill += ` GST (${gst_pct}%): +Rs ${gst_amount.toFixed(2)}\n`;
 if (extra_charge > 0) bill += ` Transport/Labor: +Rs ${extra_charge.toFixed(2)}\n`;

 bill += ` GRAND TOTAL: Rs ${final_total.toFixed(2)}\n`;
 if (typeof numberToWordsINR === 'function') {
   bill += ` In Words: ${numberToWordsINR(final_total)}\n`;
 }
 bill += ` Advance Received: -Rs ${advance_paid.toFixed(2)}\n`;
 bill += ` CURRENT BILL DUE: Rs ${due_amount.toFixed(2)}\n`;
 if (prevDue > 0) {
   bill += ` Previous Khata Due: +Rs ${prevDue.toFixed(2)}\n`;
   bill += ` TOTAL NET PAYABLE DUE: Rs ${totalPayableDue.toFixed(2)}\n`;
 }
 bill += "-------------------------------------------------\n";
 bill += "BANK & UPI PAYMENT DETAILS:\n";
 bill += `Bank: ${profile.bank_name || "____________________"}${profile.bank_branch ? " (" + profile.bank_branch + ")" : ""}\n`;
 bill += `A/C Holder: ${profile.bank_holder || owner_name}\n`;
 bill += `A/C No: ${profile.bank_acc || "____________________"} | IFSC: ${profile.bank_ifsc || "____________"}\n`;
 bill += `UPI ID: ${profile.upi_id || contact_info}\n`;
 bill += "-------------------------------------------------\n";
 if (remarks_note) {
   bill += `SPECIAL NOTE: ${remarks_note}\n`;
   bill += "-------------------------------------------------\n";
 }
 bill += "TERMS & CONDITIONS:\n";
 if (pay_terms) bill += `• Payment Terms: ${pay_terms}\n`;
 bill += "1. 50% Advance with official work order.\n";
 bill += "2. Balance payment must be cleared on delivery / fitting.\n";
 bill += "3. Quotation is valid for 15 days from issue date.\n";
 bill += "4. Glass & cut sections cannot be returned once processed.\n";
 bill += "-------------------------------------------------\n\n";
 bill += "Customer Signature: Authorized Signature:\n";
 bill += "___________________ _____________________\n";
 bill += ` (${shop_name})\n`;
 bill += "=================================================\n";
 bill += "Thank you for your business!\n -- App by Smart worker --\n";

 document.getElementById('bill_output').textContent = bill;
 }

 function saveBillToDb() {
 autoCommitPendingBillItemIfNeeded();
 if (!document.getElementById('bill_output').textContent.trim()) {
   generateBillText();
 }
 const bill_text = document.getElementById('bill_output').textContent;
 if (!bill_text.trim()) return;

 const c_name = document.getElementById('q_name').value.trim() || 'Customer';
 const c_phone = document.getElementById('q_phone').value.trim();
 const c_addr = document.getElementById('q_addr').value.trim();
 const bill_stage = document.getElementById('q_stage').value;
 const today = new Date().toLocaleDateString('en-GB');

 const grand_total = billItems.reduce((a, b) => a + b.price, 0);
 const [discount, gst_pct] = getDiscountAndGst();
 const extra_charge = safeEval(document.getElementById('q_extra_charge').value);
 const advance_paid = safeEval(document.getElementById('q_advance').value);
 const net_total = grand_total - discount;
 const final_total = net_total + (net_total * (gst_pct / 100)) + extra_charge;
 const due_amount = Math.max(0, final_total - advance_paid);

 // 1. Update Customers Khata
 if (c_phone && c_phone !== 'N/A') {
   const customers = getKhataCustomers();
   if (!customers[c_phone]) {
     customers[c_phone] = {
       name: c_name,
       phone: c_phone,
       address: c_addr,
       total_billed: final_total,
       total_paid: advance_paid,
       total_due: due_amount,
       transactions: [
         { id: Date.now(), date: today, type: 'BILL', desc: `Bill Created: ${bill_stage}`, debit: final_total, credit: advance_paid, balance: due_amount }
       ]
     };
   } else {
     const cust = customers[c_phone];
     cust.name = c_name;
     if (c_addr) cust.address = c_addr;
     cust.total_billed = (Number(cust.total_billed) || 0) + final_total;
     cust.total_paid = (Number(cust.total_paid) || 0) + advance_paid;
     cust.total_due = (Number(cust.total_due) || 0) + due_amount;
     if (!cust.transactions) cust.transactions = [];
     cust.transactions.push({
       id: Date.now(),
       date: today,
       type: 'BILL',
       desc: `Bill Created: ${bill_stage}`,
       debit: final_total,
       credit: advance_paid,
       balance: cust.total_due
     });
   }
   saveKhataCustomers(customers);
 }

 // 2. Save Invoice
 const invoices = JSON.parse(localStorage.getItem('sw_invoices') || '[]');
 invoices.unshift({
   id: Date.now(),
   date: today,
   client: c_name,
   phone: c_phone || 'N/A',
   amount: final_total,
   advance: advance_paid,
   due: due_amount,
   bill_text: bill_text
 });
 localStorage.setItem('sw_invoices', JSON.stringify(invoices));
 syncToGoogleSheet('Bills', [today, c_name, c_phone || 'N/A', final_total, advance_paid, due_amount, bill_text]);
 if (typeof addToOfflineQueue === 'function') addToOfflineQueue('invoices', invoices);
 if (typeof syncCustomersToFirestore === 'function') {
   syncCustomersToFirestore(getKhataCustomers());
 }
 if (typeof syncAllDataToCloud === 'function') {
   syncAllDataToCloud();
 }
  try {
    var existingOrders = getWorkOrders();
    existingOrders.unshift({
      id: Date.now() + 5,
      createdDate: today,
      client: c_name,
      phone: c_phone || 'N/A',
      site: c_addr || 'Site',
      deliveryDate: 'Pending',
      details: billItems.length + ' Item(s) | Total: Rs ' + Math.round(final_total),
      stage: '1. Measured'
    });
    saveWorkOrders(existingOrders);
  } catch(e){}
  alert("🎉 Bill generated, saved to Customer Khata & added to Order Tracker!");
}

 function shareToWhatsApp() {
 autoCommitPendingBillItemIfNeeded();
 if (!document.getElementById('bill_output').textContent.trim()) {
   generateBillText();
 }
 const bill_text = document.getElementById('bill_output').textContent;
 if (!bill_text.trim()) return;
 const encoded = encodeURIComponent(bill_text);
 window.open(`https://wa.me/?text=${encoded}`, '_blank');
 }



// ========================================================
 // SEPARATE SUPPLIER MATERIAL REQUISITION / PURCHASE ORDER SLIP
 // ========================================================
 function exportMatPurchasePdf(filename, title, buckets, glassDict) {
  exportAluPurchasePdf(filename, title, buckets);
 }

 function exportBillPdf() {
  if (!isAppActivated()) {
    alert("PRO activation is required to generate PDF bills.");
    openScreen('activation', 'PRO UPGRADE & PLANS');
    return;
  }

  const effectiveItems = getEffectiveProperBillItems();
  if (!document.getElementById('bill_output').textContent.trim()) {
    generateBillText();
  }

  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) { alert("PDF library is loading, please try again in a few seconds."); return; }
  const doc = new jsPDF();

  const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
  const shop_name = (profile.shop_name || "ALUMINIUM FABRICATION WORKSHOP").toUpperCase();
  const owner_name = (profile.name && profile.name !== "Fabricator") ? profile.name.trim() : "____________________";
  const raw_c_name = document.getElementById('q_name') ? document.getElementById('q_name').value.trim() : "";
  const raw_c_phone = document.getElementById('q_phone') ? document.getElementById('q_phone').value.trim() : "";
  const raw_c_addr = document.getElementById('q_addr') ? document.getElementById('q_addr').value.trim() : "";
  const c_name = raw_c_name || "Walk-in Customer";
  const c_phone = raw_c_phone || "____________________";
  const c_addr = raw_c_addr || "____________________";
  const c_gst = document.getElementById('q_client_gst') ? document.getElementById('q_client_gst').value.trim() : "";
  const c_site = document.getElementById('q_site_addr') ? document.getElementById('q_site_addr').value.trim() : "";
  const pay_terms = document.getElementById('q_payment_terms') ? document.getElementById('q_payment_terms').value.trim() : "";
  const remarks_note = document.getElementById('q_remarks') ? document.getElementById('q_remarks').value.trim() : "";
  const bill_stage = document.getElementById('q_stage') ? document.getElementById('q_stage').value : "Quotation / Estimate";
  const today = new Date().toLocaleDateString('en-GB');

  // Professional Client Document Title: Strictly NO 'JOB CARD' on Estimates/Bills!
  let pdfTitle = "ESTIMATION & COST QUOTATION";
  if (bill_stage.includes("Final")) {
    pdfTitle = "FINAL BILL & TAX INVOICE";
  } else if (bill_stage.includes("First")) {
    pdfTitle = "PROJECT BILL & INVOICE";
  } else if (bill_stage.includes("Second") || bill_stage.includes("Third")) {
    pdfTitle = "RUNNING BILL & INVOICE";
  } else {
    pdfTitle = "ESTIMATION & COST QUOTATION";
  }
  drawDocHeaderWithLogo(doc, pdfTitle, "Stage: " + bill_stage, [74, 20, 140]);

  // Structured Two-Column Proper Bill Info Box (Renders identically whether complete or incomplete!)
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(14, 34, 182, 32, 2, 2, 'FD');

  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("BILL TO (CUSTOMER DETAILS):", 18, 40);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(`Name: ${c_name}`, 18, 45.5);
  doc.text(`Phone: ${c_phone}`, 18, 50.5);
  doc.text(`Address: ${c_addr}${c_site ? " | Site: " + c_site : ""}`, 18, 55.5);
  doc.text(`Client GSTIN: ${c_gst || "____________________"}`, 18, 60.5);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.text("INVOICE DETAILS:", 125, 40);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(`Date: ${today}`, 125, 45.5);
  doc.text(`Stage: ${bill_stage}`, 125, 50.5);
  doc.text(`Invoice No: SW-${Math.floor(1000 + Math.random() * 9000)}`, 125, 55.5);
  const cleanWorkshopEmail = (profile.email && profile.email.indexOf("@smartworker.app") === -1) ? profile.email.trim() : "";
  doc.text(`Workshop GSTIN: ${profile.gst || "____________________"}`, 125, 60.5);
  if (cleanWorkshopEmail) {
    doc.setFontSize(7.5);
    doc.text(`Email: ${cleanWorkshopEmail}`, 125, 64.5);
  }

  // Compute totals FIRST so Executive KPI Strip & Tax Breakdown are 100% accurate
  const total_units = effectiveItems.reduce((a, b) => a + (Number(b.qty) || 1), 0);
  const total_sqft = effectiveItems.reduce((a, b) => a + (Number(b.area) || 0), 0);
  const grand_total = effectiveItems.reduce((a, b) => a + (Number(b.price) || 0), 0);

  const [set_disc, set_gst_pct] = getDiscountAndGst();
  const manual_disc = safeEval(document.getElementById('q_manual_disc') ? document.getElementById('q_manual_disc').value : "0");
  const discount = manual_disc > 0 ? manual_disc : set_disc;

  const install_rate = safeEval(document.getElementById('q_install_rate') ? document.getElementById('q_install_rate').value : "0");
  const install_charge = total_sqft * install_rate;
  const extra_charge = safeEval(document.getElementById('q_extra_charge') ? document.getElementById('q_extra_charge').value : "0");

  const gst_mode = document.getElementById('q_gst_mode') ? document.getElementById('q_gst_mode').value : "AUTO";
  let gst_pct = set_gst_pct;
  if (gst_mode === "CGST_SGST" || gst_mode === "IGST") gst_pct = 18;
  else if (gst_mode === "NONE") gst_pct = 0;

  const taxable_val = Math.max(0, grand_total + install_charge + extra_charge - discount);
  const gst_amount = taxable_val * (gst_pct / 100);
  const final_total = taxable_val + gst_amount;
  const advance_paid = safeEval(document.getElementById('q_advance') ? document.getElementById('q_advance').value : "0");
  const due_amount = Math.max(0, final_total - advance_paid);
  const validity_days = document.getElementById('q_validity_days') ? (document.getElementById('q_validity_days').value || "15") : "15";
  const delivery_days = document.getElementById('q_delivery_days') ? (document.getElementById('q_delivery_days').value || "15") : "15";

  // Executive KPI Summary Strip (SAICON-style high-trust header bar)
  doc.setFillColor(238, 242, 255);
  doc.setDrawColor(129, 140, 248);
  doc.roundedRect(14, 68, 182, 11, 2, 2, 'FD');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(30, 58, 138);
  doc.text(`TOTAL UNITS: ${total_units} Pcs`, 18, 74.8);
  doc.text(`TOTAL AREA: ${total_sqft.toFixed(1)} Sq.Ft`, 60, 74.8);
  doc.text(`VALIDITY: ${validity_days} Days | DELIVERY: ${delivery_days} Days`, 104, 74.8);
  doc.setTextColor(22, 101, 52);
  doc.text(`NET: Rs ${Math.round(final_total).toLocaleString('en-IN')}`, 168, 74.8);

  const tableData = effectiveItems.map((itm, i) => {
    const isUpvc = String(itm.type || '').includes('uPVC');
    const specLabel = isUpvc ? 'Profile' : 'Alu Spec';
    const perPc = (Number(itm.qty) > 0) ? (itm.price / itm.qty) : itm.price;
    return [
      i + 1,
      '', // Vector CAD Drawing rendered in didDrawCell
      `${itm.location ? '[' + itm.location + '] ' : ''}${itm.type}\n${specLabel}: ${itm.thickness} | ${itm.color}\nGlass / Panel: ${itm.glass_thick} ${itm.glass_type}${(itm.toughened && !String(itm.glass_type).includes('Toughened')) ? ' [TOUGHENED]' : ''}\nSize: ${itm.h} x ${itm.w} ${itm.unit} | Per Pc: Rs ${Math.round(perPc)}`,
      itm.qty,
      itm.area.toFixed(1),
      `Rs ${itm.rate}`,
      `Rs ${itm.price.toFixed(2)}`
    ];
  });

  doc.autoTable({
    startY: 82,
    head: [['SN', 'Design\n(Inside)', 'Description & Specifications', 'Qty', 'Sq.Ft', 'Rate', 'Amount']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [74, 20, 140], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.8 },
    styles: { fontSize: 7.8, valign: 'middle', minCellHeight: 22 },
    columnStyles: {
      0: { cellWidth: 8, halign: 'center' },
      1: { cellWidth: 26, halign: 'center' },
      2: { cellWidth: 78 },
      3: { cellWidth: 10, halign: 'center' },
      4: { cellWidth: 15, halign: 'right' },
      5: { cellWidth: 19, halign: 'right' },
      6: { cellWidth: 26, halign: 'right', fontStyle: 'bold' }
    },
    didDrawCell: function(data) {
      if (data.section === 'body' && data.column.index === 1) {
        const itm = effectiveItems[data.row.index];
        if (itm && typeof drawPdfWindowSchematic === 'function') {
          drawPdfWindowSchematic(doc, itm, data.cell.x + 2, data.cell.y + 2, data.cell.width - 4, data.cell.height - 4);
        }
      }
    }
  });

  let finalY = doc.lastAutoTable.finalY + 7;
  if (finalY + 62 > doc.internal.pageSize.getHeight() - 8) {
    doc.addPage();
    finalY = 18;
  }

  // Right-side Itemized Price & Tax Summary Box
  let sy = finalY;
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.text(`Windows / Doors Sub-Total: Rs ${grand_total.toFixed(2)}`, 124, sy); sy += 4.6;
  if (install_charge > 0) { doc.text(`Installation (Rs ${install_rate}/Sq.Ft): +Rs ${install_charge.toFixed(2)}`, 124, sy); sy += 4.6; }
  if (extra_charge > 0) { doc.text(`Transport / Delivery: +Rs ${extra_charge.toFixed(2)}`, 124, sy); sy += 4.6; }
  if (discount > 0) { doc.text(`Discount: -Rs ${discount.toFixed(2)}`, 124, sy); sy += 4.6; }
  if (gst_pct > 0) {
    if (gst_mode === "CGST_SGST") {
      doc.text(`CGST (9%): +Rs ${(gst_amount / 2).toFixed(2)}`, 124, sy); sy += 4.4;
      doc.text(`SGST (9%): +Rs ${(gst_amount / 2).toFixed(2)}`, 124, sy); sy += 4.6;
    } else if (gst_mode === "IGST") {
      doc.text(`IGST (18%): +Rs ${gst_amount.toFixed(2)}`, 124, sy); sy += 4.6;
    } else {
      doc.text(`GST (${gst_pct}%): +Rs ${gst_amount.toFixed(2)}`, 124, sy); sy += 4.6;
    }
  }
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(30, 58, 138);
  doc.text(`GRAND TOTAL: Rs ${final_total.toFixed(2)}`, 124, sy + 1); sy += 6;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text(`Advance Paid: -Rs ${advance_paid.toFixed(2)}`, 124, sy); sy += 5;

  const incPrev = document.getElementById('q_include_prev_due') ? document.getElementById('q_include_prev_due').checked : true;
  const pDue = incPrev ? (activeCustomerPreviousDue || 0) : 0;
  const netPayableDue = due_amount + pDue;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(200, 0, 0);
  doc.text(`CURRENT BILL DUE: Rs ${due_amount.toFixed(2)}`, 124, sy); sy += 5;

  if (pDue > 0) {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 0, 0);
    doc.text(`Previous Khata Due: +Rs ${pDue.toFixed(2)}`, 124, sy); sy += 5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(200, 0, 0);
    doc.text(`TOTAL OUTSTANDING: Rs ${netPayableDue.toFixed(2)}`, 124, sy); sy += 5;
  }

  // Render Proper Bank & UPI Box + Custom Payment QR Code on the Left Side of Footer (Always consistent!)
  const customQr = localStorage.getItem('sw_custom_qr');
  let bankStartX = 14;
  if (customQr) {
    try {
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(14, finalY, 28, 28, 2, 2, 'FD');
      var qrFmt = customQr.indexOf('image/png') !== -1 ? 'PNG' : 'JPEG';
      doc.addImage(customQr, qrFmt, 15, finalY + 1, 26, 26);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7);
      doc.setTextColor(74, 20, 140);
      doc.text("SCAN TO PAY (UPI)", 14, finalY + 31.5);
      bankStartX = 46;
    } catch(e){}
  }

  let by = finalY + 3;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(30, 58, 138);
  doc.text("BANK & PAYMENT DETAILS:", bankStartX, by);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(30, 41, 59);
  by += 4.5;
  doc.text("Bank: " + (profile.bank_name || "____________________") + (profile.bank_branch ? " (" + profile.bank_branch + ")" : ""), bankStartX, by);
  by += 4.5;
  doc.text("A/C Holder: " + (profile.bank_holder || owner_name), bankStartX, by);
  by += 4.5;
  doc.text("A/C No: " + (profile.bank_acc || "____________________") + " | IFSC: " + (profile.bank_ifsc || "____________"), bankStartX, by);
  by += 4.5;
  doc.text("UPI ID: " + (profile.upi_id || profile.phone || "____________________"), bankStartX, by);
  if (typeof numberToWordsINR === 'function') {
    by += 5;
    doc.setFont("helvetica", "bold");
    doc.text("In Words: " + numberToWordsINR(final_total), bankStartX, by);
  }

  const footerY = Math.max(finalY + 44, (pDue > 0 ? finalY + 52 : finalY + 44));
  doc.setTextColor(100, 116, 139);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  const termsStr1 = (remarks_note ? "Note: " + remarks_note + " | " : "") + (pay_terms || "TERMS: 50% Advance with order, Balance before dispatch.");
  const termsStr2 = `Validity: ${validity_days} Days | Delivery: ${delivery_days} Days | Warranty: 12 Months Workmanship | Drawings are schematic (Inside View).`;
  doc.text(termsStr1, 14, footerY);
  doc.text(termsStr2, 14, footerY + 4.2);
  doc.text(`Customer Signature: ___________________ Authorized Signature (${shop_name}): ___________________`, 14, footerY + 11);


  // Draw Smart Glass Fabricator QR Auto-Load Box on the Bill PDF so Glass Fabricator can scan the Bill directly!
  try {
    const billSwgPayload = buildGlassOrderQrPayloadFromBillItems(effectiveItems, c_name);
    if (billSwgPayload && typeof generateQrMatrix === 'function') {
      window.lastGeneratedGlassOrderCode = billSwgPayload;
      let qrBoxY = footerY + 13;
      const pageH = doc.internal.pageSize.getHeight();
      if (qrBoxY + 34 > pageH - 6) {
        doc.addPage();
        qrBoxY = 16;
      }
      doc.setFillColor(240, 249, 255);
      doc.setDrawColor(2, 132, 199);
      doc.setLineWidth(0.5);
      doc.roundedRect(14, qrBoxY, 182, 32, 2, 2, 'FD');

      const qrMat = generateQrMatrix(billSwgPayload);
      const qrMm = 26;
      const qx = 17;
      const qy = qrBoxY + 3;
      doc.setFillColor(255, 255, 255);
      doc.rect(qx - 1, qy - 1, qrMm + 2, qrMm + 2, 'F');
      const n = qrMat.length;
      const cMm = qrMm / n;
      doc.setFillColor(15, 23, 42);
      for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
          if (qrMat[r][c]) doc.rect(qx + c * cMm, qy + r * cMm, cMm + 0.03, cMm + 0.03, 'F');
        }
      }

      const tx = qx + qrMm + 5;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.8);
      doc.setTextColor(3, 105, 161);
      doc.text("FOR GLASS FABRICATOR / GLASS SHOP (1-SCAN AUTO-LOAD TO 4x8 SHEET):", tx, qrBoxY + 7);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.6);
      doc.setTextColor(30, 41, 59);
      doc.text("Scan this Bill QR Code in Smart Worker Pro -> Glass Cutting (4x8 Sheet) to auto-load all", tx, qrBoxY + 12.5);
      doc.text("glass sizes, quantities, glass type, thickness & generate the 4x8 cutting layout chart!", tx, qrBoxY + 17);
      doc.setFont("courier", "bold");
      doc.setFontSize(6.6);
      doc.setTextColor(15, 118, 110);
      const billShortId = generateShortGlassOrderId(billSwgPayload);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(2, 132, 199);
      doc.text("4-DIGIT ORDER CODE: " + billShortId + "  (Type in Glass Cutting)", tx, qrBoxY + 25);
    }
  } catch (err) {}

  doc.save(`Invoice_${c_name.replace(/\s+/g, '_')}.pdf`);
}

 // ========================================================
 // 10. PDF EXPORTS FOR CUT SIZES & GLASS LIST


// ==========================================
// 5. CUSTOMER KHATA BOOK & BALANCE TRACKER
// ==========================================
// =========================================================================
// SMART WORKER PRO - ADVANCED CUSTOMER KHATA & DIGITAL LEDGER ENGINE
// Ledger Tracking, Payment Entry, WhatsApp Statements & PDF Account Ledger
// =========================================================================

    // =========================================================================
    // 📒 SMART WORKER PRO - ADVANCED CUSTOMER KHATA & DIGITAL LEDGER ENGINE
    // Connected with Google Cloud Firestore (nisha-creations)
    // =========================================================================

    let currentKhataFilter = 'all';
    let currentActiveKhataPhone = null;

    // Load Customers Dictionary
    function getKhataCustomers() {
      try {
        const raw = localStorage.getItem('sw_customers');
        if (raw) {
          const parsed = JSON.parse(raw);
          if (typeof parsed === 'object' && parsed !== null) return parsed;
        }
      } catch(e) {}
      
      return {};
    }

    function saveKhataCustomers(custs) {
      try {
        localStorage.setItem('sw_customers', JSON.stringify(custs));
      } catch(e) {}
      if (typeof addToOfflineQueue === 'function') addToOfflineQueue('customers', custs);
      if (typeof syncOfflineQueueToCloud === 'function') syncOfflineQueueToCloud();
      syncCustomersToFirestore(custs);
    }

    // Direct Firebase Cloud Sync for Khata (Strictly Isolated Per Customer/Device)
    function syncCustomersToFirestore(custs) {
      if (typeof fbDb !== 'undefined' && fbDb) {
        try {
          const targetId = getIsolatedCloudDocId();
          if (!targetId) return;
          const docRef = fbDb.collection('users').doc(String(targetId));
          docRef.set({
            customers: custs,
            updated_at: new Date().toISOString()
          }, { merge: true }).then(() => {
            console.log("☁️ Customer Khata synced to isolated user cloud doc!");
          }).catch(err => {
            console.warn("Cloud sync notice:", err);
          });
        } catch(e) {
          console.warn("Firestore save fallback:", e);
        }
      }
    }

    function initCloudKhataSyncListener() {
      if (typeof fbDb !== 'undefined' && fbDb) {
        try {
          const targetId = getIsolatedCloudDocId();
          if (!targetId) return;
          if (window.khataUnsubscribe && typeof window.khataUnsubscribe === 'function') {
            try { window.khataUnsubscribe(); } catch(e){}
          }
          window.khataUnsubscribe = fbDb.collection('users').doc(String(targetId)).onSnapshot(doc => {
            if (doc.exists) {
              const data = doc.data();
              if (data && data.customers && typeof data.customers === 'object') {
                localStorage.setItem('sw_customers', JSON.stringify(data.customers));
                var clScreen = document.getElementById('screen-customer_lookup');
                if (clScreen && clScreen.classList.contains('active')) {
                  renderCustomerKhataScreen();
                }
              }
            }
          });
        } catch(e) {}
      }
    }

    // Render Main Khata Screen
    function renderCustomerKhataScreen() {
      const customers = getKhataCustomers();
      const listContainer = document.getElementById('khataCustomerCardsList');
      if (!listContainer) return;

      const phoneKeys = Object.keys(customers);

      let totalClients = phoneKeys.length;
      let totalBilled = 0;
      let totalPaid = 0;
      let totalDue = 0;

      phoneKeys.forEach(phone => {
        const c = customers[phone];
        totalBilled += (Number(c.total_billed) || 0);
        totalPaid += (Number(c.total_paid) || 0);
        totalDue += (Number(c.total_due) || 0);
      });

      // Update Top Summary Stats
      document.getElementById('khataTotalClients').textContent = `${totalClients}`;
      document.getElementById('khataTotalBilled').textContent = `₹${totalBilled.toLocaleString('en-IN')}`;
      document.getElementById('khataTotalPaid').textContent = `₹${totalPaid.toLocaleString('en-IN')}`;
      document.getElementById('khataTotalDue').textContent = `₹${totalDue.toLocaleString('en-IN')}`;

      // Search & Filter
      var searchInputElem = document.getElementById('khataSearchInput');
      const searchQ = ((searchInputElem ? searchInputElem.value : '') || '').trim().toLowerCase();

      let filteredKeys = phoneKeys.filter(phone => {
        const c = customers[phone];
        const matchSearch = !searchQ || 
          (c.name && c.name.toLowerCase().includes(searchQ)) || 
          phone.includes(searchQ) || 
          (c.address && c.address.toLowerCase().includes(searchQ));

        if (!matchSearch) return false;

        const due = (Number(c.total_due) || 0);
        if (currentKhataFilter === 'due') return due > 0;
        if (currentKhataFilter === 'paid') return due <= 0;
        return true;
      });

      if (filteredKeys.length === 0) {
        listContainer.innerHTML = `
          <div style="background:#fff; border:1px solid #e2e8f0; border-radius:12px; padding:30px 16px; text-align:center; color:#64748b;">
            <i class="fa-solid fa-folder-open" style="font-size:2.2rem; color:#94a3b8; margin-bottom:8px; display:block;"></i>
            <div style="font-weight:700; font-size:0.9rem;">No Customer Ledger Found!</div>
            <div style="font-size:0.75rem; margin-top:4px;">Tap <strong>'+ New Customer'</strong> above to add a client ledger.</div>
          </div>
        `;
        return;
      }

      listContainer.innerHTML = filteredKeys.map(phone => {
        const c = customers[phone];
        const due = (Number(c.total_due) || 0);
        const billed = (Number(c.total_billed) || 0);
        const paid = (Number(c.total_paid) || 0);
        const hasDue = (due > 0);

        const initials = c.name ? c.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'SW';

        return `
          <div style="background:#ffffff; border:1.5px solid ${hasDue ? '#fecaca' : '#bbf7d0'}; border-radius:14px; padding:14px; box-shadow:0 2px 6px rgba(0,0,0,0.04); transition:all 0.15s;">
            <!-- Top Row: Name, Site & Due Badge -->
            <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
              <div style="display:flex; align-items:center; gap:10px;">
                <div style="width:42px; height:42px; border-radius:12px; background:linear-gradient(135deg, ${hasDue ? '#ef4444' : '#10b981'}, ${hasDue ? '#b91c1c' : '#059669'}); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:800; font-size:1rem; box-shadow:0 2px 6px rgba(0,0,0,0.15);">
                  ${initials}
                </div>
                <div>
                  <h4 style="font-size:1rem; font-weight:800; color:#0f172a; line-height:1.2;">${c.name}</h4>
                  <div style="font-size:0.75rem; color:#64748b; margin-top:2px;">
                    <i class="fa-solid fa-location-dot" style="color:#0284c7;"></i> ${c.address || 'West Bengal'}
                  </div>
                </div>
              </div>

              <div>
                ${hasDue ? `
                  <span style="background:#fef2f2; color:#dc2626; border:1px solid #f87171; padding:3px 8px; border-radius:8px; font-size:0.75rem; font-weight:800;">
                    🔴 Due: ₹${due.toLocaleString('en-IN')}
                  </span>
                ` : `
                  <span style="background:#f0fdf4; color:#15803d; border:1px solid #86efac; padding:3px 8px; border-radius:8px; font-size:0.75rem; font-weight:800;">
                    🟢 Fully Paid
                  </span>
                `}
              </div>
            </div>

            <!-- Financial Summary Bar -->
            <div style="background:#f8fafc; border-radius:8px; padding:8px 12px; display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; margin-bottom:12px; text-align:center;">
              <div>
                <span style="font-size:0.68rem; color:#64748b; display:block;">Total Work</span>
                <strong style="font-size:0.85rem; color:#0284c7;">₹${billed.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span style="font-size:0.68rem; color:#64748b; display:block;">Received</span>
                <strong style="font-size:0.85rem; color:#16a34a;">₹${paid.toLocaleString('en-IN')}</strong>
              </div>
              <div>
                <span style="font-size:0.68rem; color:#64748b; display:block;">Balance Due</span>
                <strong style="font-size:0.85rem; color:${hasDue ? '#dc2626' : '#16a34a'};">₹${due.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            <!-- Action Buttons -->
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <button type="button" onclick="openCustomerLedger('${phone}')" style="flex:1; background:#0f172a; color:#fff; border:none; padding:8px 10px; border-radius:8px; font-size:0.78rem; font-weight:700; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:5px;">
                <i class="fa-solid fa-book-open"></i> Open Ledger
              </button>
              <button type="button" onclick="quickAddPayment('${phone}')" style="background:#16a34a; color:#fff; border:none; padding:8px 12px; border-radius:8px; font-size:0.78rem; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:5px;">
                <i class="fa-solid fa-hand-holding-dollar"></i> + Payment
              </button>
              <a href="tel:${phone}" style="background:#f1f5f9; color:#334155; border:1px solid #cbd5e1; padding:8px 10px; border-radius:8px; font-size:0.78rem; font-weight:700; text-decoration:none; display:flex; align-items:center; gap:4px;">
                <i class="fa-solid fa-phone" style="color:#0284c7;"></i> Call
              </a>
              <button type="button" onclick="sendKhataWhatsAppDirect('${phone}')" style="background:#25D366; color:#fff; border:none; padding:8px 10px; border-radius:8px; font-size:0.78rem; font-weight:700; cursor:pointer; display:flex; align-items:center; gap:4px;" title="Send WhatsApp Reminder">
                <i class="fa-brands fa-whatsapp"></i>
              </button>
            </div>
          </div>
        `;
      }).join('');
    }

    function handleKhataSearch(val) {
      renderCustomerKhataScreen();
    }

    function filterKhataCustomers(filterType, btn) {
      currentKhataFilter = filterType;
      document.querySelectorAll('.khata-filter-pill').forEach(b => {
        b.style.background = '#fff';
        b.style.color = '#475569';
        b.style.borderColor = '#cbd5e1';
      });
      if (btn) {
        btn.style.background = '#e0f2fe';
        btn.style.color = '#0369a1';
        btn.style.borderColor = '#0284c7';
      }
      renderCustomerKhataScreen();
    }

    // Add New Customer Modal
    function openAddCustomerModal() {
      document.getElementById('addCustomerModal').style.display = 'flex';
      document.getElementById('new_cust_name').focus();
    }

    function closeAddCustomerModal() {
      document.getElementById('addCustomerModal').style.display = 'none';
    }

    function handleSaveNewCustomer(e) {
      e.preventDefault();
      const name = document.getElementById('new_cust_name').value.trim();
      const phone = document.getElementById('new_cust_phone').value.trim();
      const site = document.getElementById('new_cust_site').value.trim() || 'Local Site';
      const openDue = parseFloat(document.getElementById('new_cust_opening_due').value) || 0;

      if (!name || !phone) {
        alert("Customer Name and Mobile Number are required!");
        return;
      }

      const customers = getKhataCustomers();
      if (!customers[phone]) {
        customers[phone] = {
          name: name,
          phone: phone,
          address: site,
          total_billed: openDue,
          total_paid: 0,
          total_due: openDue,
          transactions: openDue > 0 ? [
            { id: Date.now(), date: new Date().toLocaleDateString('en-GB'), type: 'OPENING', desc: 'Opening Balance Due', debit: openDue, credit: 0, balance: openDue }
          ] : []
        };
      } else {
        customers[phone].name = name;
        customers[phone].address = site;
      }

      saveKhataCustomers(customers);
      closeAddCustomerModal();
      document.getElementById('new_cust_name').value = '';
      document.getElementById('new_cust_phone').value = '';
      document.getElementById('new_cust_site').value = '';
      document.getElementById('new_cust_opening_due').value = '0';
      renderCustomerKhataScreen();
      alert(`🎉 Customer ledger for '${name}' created successfully!`);
    }

    // Open Customer Detailed Ledger
    function openCustomerLedger(phone) {
      currentActiveKhataPhone = phone;
      const customers = getKhataCustomers();
      const c = customers[phone];
      if (!c) return;

      document.getElementById('ledgerCustName').textContent = c.name;
      document.getElementById('ledgerCustSub').innerHTML = `📞 ${phone} | 📍 ${c.address || 'Site'}`;

      const billed = Number(c.total_billed) || 0;
      const paid = Number(c.total_paid) || 0;
      const due = Number(c.total_due) || 0;

      document.getElementById('ledgerTotalBilled').textContent = `₹${billed.toLocaleString('en-IN')}`;
      document.getElementById('ledgerTotalPaid').textContent = `₹${paid.toLocaleString('en-IN')}`;
      document.getElementById('ledgerNetDue').textContent = `₹${due.toLocaleString('en-IN')}`;

      const txContainer = document.getElementById('ledgerTransactionsContainer');
      const txList = c.transactions || [];

      if (!txList.length) {
        txContainer.innerHTML = `<div style="text-align:center; color:#94a3b8; padding:20px; font-size:0.8rem;">No transactions recorded yet. Use '+ Record Payment' above to add an entry.</div>`;
      } else {
        txContainer.innerHTML = `
          <table style="width:100%; border-collapse:collapse; font-size:0.75rem;">
            <thead>
              <tr style="background:#f1f5f9; color:#475569; text-align:left; border-bottom:1px solid #cbd5e1;">
                <th style="padding:6px;">Date</th>
                <th style="padding:6px;">Description</th>
                <th style="padding:6px; text-align:right;">Bill (+)</th>
                <th style="padding:6px; text-align:right;">Paid (-)</th>
                <th style="padding:6px; text-align:right;">Balance</th>
              </tr>
            </thead>
            <tbody>
              ${txList.map(t => `
                <tr style="border-bottom:1px solid #f1f5f9;">
                  <td style="padding:6px; color:#64748b; white-space:nowrap;">${t.date}</td>
                  <td style="padding:6px; font-weight:600; color:#0f172a;">${t.desc}</td>
                  <td style="padding:6px; text-align:right; font-weight:700; color:${t.debit > 0 ? '#0284c7' : '#94a3b8'};">${t.debit > 0 ? '₹' + t.debit.toLocaleString('en-IN') : '-'}</td>
                  <td style="padding:6px; text-align:right; font-weight:700; color:${t.credit > 0 ? '#16a34a' : '#94a3b8'};">${t.credit > 0 ? '₹' + t.credit.toLocaleString('en-IN') : '-'}</td>
                  <td style="padding:6px; text-align:right; font-weight:800; color:#dc2626;">₹${(t.balance || 0).toLocaleString('en-IN')}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      }

      document.getElementById('customerLedgerModal').style.display = 'flex';
    }

    function closeCustomerLedgerModal() {
      document.getElementById('customerLedgerModal').style.display = 'none';
      currentActiveKhataPhone = null;
    }

    // Payment Entry
    function quickAddPayment(phone) {
      currentActiveKhataPhone = phone;
      openRecordPaymentModal();
    }

    function openRecordPaymentModal() {
      if (!currentActiveKhataPhone) return;
      document.getElementById('pay_date').value = new Date().toISOString().split('T')[0];
      document.getElementById('recordPaymentModal').style.display = 'flex';
      document.getElementById('pay_amount').focus();
    }

    function closeRecordPaymentModal() {
      document.getElementById('recordPaymentModal').style.display = 'none';
    }

    function handleSavePayment(e) {
      e.preventDefault();
      const amount = parseFloat(document.getElementById('pay_amount').value);
      if (!amount || amount <= 0) {
        alert("Please enter a valid payment amount!");
        return;
      }

      const mode = document.getElementById('pay_mode').value;
      const rawDate = document.getElementById('pay_date').value;
      const dateStr = rawDate ? new Date(rawDate).toLocaleDateString('en-GB') : new Date().toLocaleDateString('en-GB');
      const note = document.getElementById('pay_note').value.trim() || `Payment Received (${mode})`;

      const customers = getKhataCustomers();
      const c = customers[currentActiveKhataPhone];
      if (!c) return;

      c.total_paid = (Number(c.total_paid) || 0) + amount;
      c.total_due = Math.max(0, (Number(c.total_due) || 0) - amount);

      if (!c.transactions) c.transactions = [];
      c.transactions.push({
        id: Date.now(),
        date: dateStr,
        type: 'PAYMENT',
        desc: `${note} [${mode}]`,
        debit: 0,
        credit: amount,
        balance: c.total_due
      });

      saveKhataCustomers(customers);
      syncToGoogleSheet('Payments', [new Date().toLocaleDateString('en-GB'), c.name || 'Customer', currentActiveKhataPhone, amount, mode, note]);
      closeRecordPaymentModal();
      openCustomerLedger(currentActiveKhataPhone);
      renderCustomerKhataScreen();
      alert(`✅ ₹${amount.toLocaleString('en-IN')} payment recorded! Current Balance Due: ₹${c.total_due.toLocaleString('en-IN')}`);
    }

    // WhatsApp Reminder / Statement
    function sendKhataWhatsAppDirect(phone) {
      const customers = getKhataCustomers();
      const c = customers[phone];
      if (!c) return;

      const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
      const shop = profile.shop_name || 'SMART WORKER ALUMINIUM';
      const myPhone = profile.phone || 'N/A';

      let msg = `*${shop} - CUSTOMER ACCOUNT STATEMENT*\n`;
      msg += `Client: *${c.name}*\n`;
      msg += `Site: ${c.address || 'N/A'}\n`;
      msg += `--------------------------------\n`;
      msg += `Total Billed Amount: ₹${(c.total_billed || 0).toLocaleString('en-IN')}\n`;
      msg += `Total Paid Amount: ₹${(c.total_paid || 0).toLocaleString('en-IN')}\n`;
      msg += `*Balance Due: ₹${(c.total_due || 0).toLocaleString('en-IN')}*\n`;
      msg += `--------------------------------\n`;
      msg += `Kindly arrange payment for the balance due.\nThank you!\n*${shop}* (📞 ${myPhone})`;

      window.open(`https://wa.me/91${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(msg)}`, '_blank');
    }

    function shareLedgerWhatsApp() {
      if (currentActiveKhataPhone) {
        sendKhataWhatsAppDirect(currentActiveKhataPhone);
      }
    }

    // Download Ledger PDF
    function downloadLedgerPdf() {
      if (!currentActiveKhataPhone) return;
      const customers = getKhataCustomers();
      const c = customers[currentActiveKhataPhone];
      if (!c) return;

      var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null); if (!jsPDF) { alert("PDF library is loading, please try again in a few seconds."); return; }
      const doc = new jsPDF();

      const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
      const shop = (profile.shop_name || 'SMART WORKER ALUMINIUM').toUpperCase();
      const myPhone = profile.phone || 'N/A';
      const myAddr = profile.address || '';

      drawDocHeaderWithLogo(doc, "CUSTOMER KHATA & LEDGER STATEMENT", "Client: " + c.name + " (" + c.phone + ")", [15, 23, 42]);

      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("CLIENT DETAILS:", 14, 42);
      doc.setFont("helvetica", "normal");
      doc.text(`Name: ${c.name}`, 14, 48);
      doc.text(`Phone: ${c.phone}`, 14, 54);
      doc.text(`Site: ${c.address || 'N/A'}`, 14, 60);

      doc.text(`Statement Date: ${new Date().toLocaleDateString('en-GB')}`, 140, 48);
      doc.text(`Total Billed: Rs. ${(c.total_billed || 0).toLocaleString('en-IN')}`, 140, 54);
      doc.text(`Total Paid: Rs. ${(c.total_paid || 0).toLocaleString('en-IN')}`, 140, 60);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(220, 38, 38);
      doc.text(`NET DUE: Rs. ${(c.total_due || 0).toLocaleString('en-IN')}`, 140, 66);

      const rows = (c.transactions || []).map((t, i) => [
        i + 1,
        t.date,
        t.desc,
        t.debit > 0 ? `Rs. ${t.debit.toLocaleString('en-IN')}` : '-',
        t.credit > 0 ? `Rs. ${t.credit.toLocaleString('en-IN')}` : '-',
        `Rs. ${(t.balance || 0).toLocaleString('en-IN')}`
      ]);

      doc.autoTable({
        head: [['#', 'Date', 'Description / Particulars', 'Bill (+)', 'Paid (-)', 'Balance']],
        body: rows,
        startY: 72,
        theme: 'striped',
        headStyles: { fillColor: [15, 23, 42], textColor: [255, 255, 255], fontStyle: 'bold' }
      });

      doc.save(`${c.name.replace(/\s+/g, '_')}_Khata_Statement.pdf`);
    }

    // Auto-update Khata when Bill is Saved in saveBillToDb()
    const originalSaveBillToDb = window.saveBillToDb;


// ==========================================
// 6. CORE APP INTERFACE, KEYPAD & EVENT HANDLERS
// ==========================================
// =========================================================================
// SMART WORKER PRO - APPLICATION CONTROLLER & LIFECYCLE ROUTER
// Navigation, Workshop Profile, Language Engine, Lifetime License & Init
// =========================================================================

 function openScreen(screenName, title) {
  setTimeout(function() { try { if (typeof applyLanguageTranslations === 'function' && currentAppLang !== 'en') applyLanguageTranslations(currentAppLang); } catch(e){} }, 40);
  if (screenName === 'partition') {
    setTimeout(function() { try { renderPtCadDesigner(); } catch(e){} }, 20);
  } else if (screenName === 'door') {
    setTimeout(function() { try { renderDoorRowBuilder(); } catch(e){} }, 20);
  } else if (screenName === 'casement') {
    setTimeout(function() { try { renderCasementSectionDesigner(); } catch(e){} try { renderICad('cc'); } catch(e){} }, 20);
  } else if (screenName === 'upvc_casement') {
    setTimeout(function() { try { renderICad('uc'); } catch(e){} }, 30);
  } else if (screenName === 'upvc_sliding') {
    setTimeout(function() { try { renderUpvcCad('us'); } catch(e){} }, 30);
  } else if (screenName === 'upvc_door') {
    setTimeout(function() { try { renderUpvcCad('ud'); } catch(e){} }, 30);
  } else if (screenName === 'cad_studio') {
    setTimeout(function() { try { renderCadStudio(); } catch(e){} }, 20);
  } else if (screenName === 'wastage_qr') {
    setTimeout(function() { try { renderWastageQrStockList(); } catch(e){} }, 20);
  } else if (screenName === 'order_tracker') {
    setTimeout(function() { try { renderOrderTrackerList(); } catch(e){} }, 20);
  }
  var mapScreenToPfx = { domal: 'dm', sliding: 'sl', casement: 'cc', door: 'dr', partition: 'pt', quotation: 'q' };
  if (mapScreenToPfx[screenName]) {
    setTimeout(function() { try { renderLiveColorGlassPreview(mapScreenToPfx[screenName]); } catch(e){} }, 25);
  }
 document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
 const target = document.getElementById(`screen-${screenName}`);
 if (target) target.classList.add('active');
 if (screenName === 'customer_lookup') {
   if (typeof renderCustomerKhataScreen === 'function') renderCustomerKhataScreen();
 }


 const topBack = document.getElementById('topBackBtn');
 const rightActions = document.getElementById('topBarRightActions');
 const bNav = document.querySelector('.bottom-nav');

 if (screenName === 'auth') {
   const titleElem = document.getElementById('screenTitle');
   if (titleElem) titleElem.innerHTML = `<span style="font-size:1.02rem; font-weight:800; color:#fbbf24; letter-spacing:0.4px;">SMART WORKER PRO</span>`;
   if (topBack) topBack.style.display = 'none';
   if (rightActions) rightActions.style.display = 'none';
   if (bNav) bNav.style.display = 'none';
   window.scrollTo({ top: 0, behavior: 'smooth' });
   return;
 }

 if (bNav) bNav.style.display = 'flex';
 // Perfectly Centered Screen Title
 const titleElem = document.getElementById('screenTitle');
 if (titleElem) titleElem.innerHTML = `<span style="font-size:1.02rem; font-weight:800; color:#fbbf24; letter-spacing:0.4px; white-space:nowrap; text-align:center;">${title}</span>`;
 if (topBack) topBack.style.display = 'flex';
 // Hide Language Selector, Login & PRO badge on inner screens
 if (rightActions) rightActions.style.display = 'none';
 document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
 if (screenName === 'dashboard') document.querySelectorAll('.nav-item')[1].classList.add('active');
 else if (screenName === 'history') document.querySelectorAll('.nav-item')[2].classList.add('active');
 else if (screenName === 'profile') document.querySelectorAll('.nav-item')[3].classList.add('active');
 window.scrollTo({ top: 0, behavior: 'smooth' });
 }

 function goHome() {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const home = document.getElementById('screen-home');
  if (home) home.classList.add('active');
  const title = document.getElementById('screenTitle');
  if (title) title.innerHTML = '<div style="display:flex; align-items:center; justify-content:center; gap:6px;"><img src="logo.png?v=2" alt="SWA" onerror="this.style.display=\'none\';" style="height:28px; width:auto; border-radius:4px; background:#fff; padding:1px;"> <span id="titleText" style="font-size:0.95rem; font-weight:800; color:#fbbf24; white-space:nowrap;">SMART WORKER PRO</span></div>';
  const back = document.getElementById('topBackBtn');
  if (back) back.style.display = 'none';
  const rightActions = document.getElementById('topBarRightActions');
  if (rightActions) rightActions.style.display = 'flex';
  const navItems = document.querySelectorAll('.nav-item');
  if (navItems && navItems.length > 0) {
    navItems.forEach(n => n.classList.remove('active'));
    navItems[0].classList.add('active');
  }
  try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch(e){}
}

 // Save and Load Settings

// ========================================================

 function sha256(ascii) {
 function rightRotate(value, amount) { return (value>>>amount) | (value<<(32 - amount)); }
 var mathPow = Math.pow, maxWord = mathPow(2, 32), lengthProperty = 'length', i, j, result = '', words = [];
 var asciiBitLength = ascii[lengthProperty]*8, hash = sha256.h = sha256.h || [], k = sha256.k = sha256.k || [];
 var primeCounter = k[lengthProperty], isComposite = {};
 for (var candidate = 2; primeCounter < 64; candidate++) {
 if (!isComposite[candidate]) {
 for (i = 0; i < 313; i += candidate) isComposite[i] = candidate;
 hash[primeCounter] = (mathPow(candidate, .5)*maxWord)|0;
 k[primeCounter++] = (mathPow(candidate, 1/3)*maxWord)|0;
 }
 }
 ascii += '\x80';
 while (ascii[lengthProperty]%64 - 56) ascii += '\x00';
 for (i = 0; i < ascii[lengthProperty]; i++) {
 j = ascii.charCodeAt(i) & 255;
 words[i>>2] |= j << ((3 - i)%4)*8;
 }
 words[words[lengthProperty]] = ((asciiBitLength/maxWord)|0);
 words[words[lengthProperty]] = (asciiBitLength);
 for (j = 0; j < words[lengthProperty];) {
 var w = words.slice(j, j += 16), oldHash = hash;
 hash = hash.slice(0, 8);
 for (i = 0; i < 64; i++) {
 var i2 = i + j;
 var w15 = w[i - 15], w2 = w[i - 2];
 var a = hash[0], e = hash[4];
 var temp1 = hash[7] + (rightRotate(e, 6) ^ rightRotate(e, 11) ^ rightRotate(e, 25)) + ((e&hash[5])^((~e)&hash[6])) + k[i] + (w[i] = (i < 16) ? w[i] : (w[i - 16] + (rightRotate(w15, 7) ^ rightRotate(w15, 18) ^ (w15>>>3)) + w[i - 7] + (rightRotate(w2, 17) ^ rightRotate(w2, 19) ^ (w2>>>10)))|0);
 var temp2 = (rightRotate(a, 2) ^ rightRotate(a, 13) ^ rightRotate(a, 22)) + ((a&hash[1])^(a&hash[2])^(hash[1]&hash[2]));
 hash = [(temp1 + temp2)|0].concat(hash);
 hash[4] = (hash[4] + temp1)|0;
 }
 for (i = 0; i < 8; i++) hash[i] = (hash[i] + oldHash[i])|0;
 }
 for (i = 0; i < 8; i++) {
 for (j = 3; j + 1; j--) {
 var b = (hash[i]>>(j*8))&255;
 result += ((b < 16) ? 0 : '') + b.toString(16);
 }
 }
 return result;
 }

 const ADMIN_WHATSAPP_NUMBER = "919239413517";
 function _0xdec(arr) { return arr.map(function(b){ return String.fromCharCode(b ^ 90); }).join(''); }
 const SALTS = {
  "KARIGAR_1M": _0xdec([9, 27, 18, 31, 24, 5, 107, 23, 5, 10, 8, 21]),
  "KARIGAR_3M": _0xdec([9, 27, 18, 31, 24, 5, 105, 23, 5, 10, 8, 21]),
  "KARIGAR_6M": _0xdec([9, 27, 18, 31, 24, 5, 108, 23, 5, 10, 8, 21]),
  "KARIGAR_1Y": _0xdec([9, 27, 18, 31, 24, 5, 107, 3, 5, 10, 8, 21]),
  "TEAM_1M": _0xdec([9, 27, 18, 31, 24, 5, 14, 31, 27, 23, 5, 107, 23, 5, 10, 8, 21]),
  "TEAM_1Y": _0xdec([9, 27, 18, 31, 24, 5, 14, 31, 27, 23, 5, 107, 3, 5, 10, 8, 21]),
  "CORP_1M": _0xdec([9, 27, 18, 31, 24, 5, 25, 21, 8, 10, 5, 107, 23, 5, 10, 8, 21]),
  "CORP_1Y": _0xdec([9, 27, 18, 31, 24, 5, 25, 21, 8, 10, 5, 107, 3, 5, 10, 8, 21]),
  "1M": _0xdec([9, 27, 18, 31, 24, 5, 107, 23, 5, 10, 8, 21]),
  "1Y": _0xdec([9, 27, 18, 31, 24, 5, 107, 3, 5, 10, 8, 21])
};
 const SPECIAL_PROMO_CODE = _0xdec([9, 23, 27, 8, 14, 13, 21, 8, 17, 31, 8, 5, 27, 30, 23, 19, 20, 5, 107, 106, 106]);


function addTeamMember() {
 const nEl = document.getElementById('team_member_name');
 const pEl = document.getElementById('team_member_phone');
 if (!nEl || !pEl) return;
 const name = nEl.value.trim();
 const phone = pEl.value.trim();
 if (!name || !phone) { alert("Please enter member name and phone/gmail."); return; }

 let members = JSON.parse(localStorage.getItem('sw_team_members') || '[]');
 if (members.length >= 50) { alert("Maximum 50 team members limit reached!"); return; }

 members.push({ name, phone, added_on: new Date().toLocaleDateString('en-GB') });
 localStorage.setItem('sw_team_members', JSON.stringify(members));

 nEl.value = "";
 pEl.value = "";
 renderTeamMembers();
 alert(`Team member ${name} added successfully! (${members.length}/50)`);
 }

 function removeTeamMember(idx) {
 let members = JSON.parse(localStorage.getItem('sw_team_members') || '[]');
 members.splice(idx, 1);
 localStorage.setItem('sw_team_members', JSON.stringify(members));
 renderTeamMembers();
 }

 function renderTeamMembers() {
 const members = JSON.parse(localStorage.getItem('sw_team_members') || '[]');
 const container = document.getElementById('teamMemberList');
 const badge = document.getElementById('teamCountBadge');

 if (badge) badge.textContent = `${members.length} / 50 Active`;
 if (!container) return;

 if (members.length === 0) {
 container.innerHTML = "No team members added yet.";
 return;
 }

 let html = "";
 members.forEach((m, i) => {
 html += `<div style="display:flex; justify-content:space-between; align-items:center; padding:4px 0; border-bottom:1px solid #1e293b;">
 <span>${i+1}. <b>${m.name}</b> (${m.phone})</span>
 <button onclick="removeTeamMember(${i})" style="background:#ef4444; color:#fff; border:none; border-radius:3px; padding:1px 5px; font-size:0.65rem; cursor:pointer;">✕</button>
 </div>`;
 });
 container.innerHTML = html;
 }

 function getDeviceId() {
 let devId = localStorage.getItem('sw_device_id');
 if (!devId) {
 const raw = navigator.userAgent + Date.now() + Math.random().toString();
 devId = sha256(raw).substring(0, 8).toUpperCase();
 localStorage.setItem('sw_device_id', devId);
 }
 return devId;
 }

 function checkActivationType(deviceId, inputKey) {
  inputKey = String(inputKey || '').trim().toUpperCase();
  deviceId = String(deviceId || '').trim().toUpperCase();
  if (!inputKey || !deviceId) return null;
  if (inputKey === SPECIAL_PROMO_CODE) return "LIFETIME";

  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');

  // 1. Check current month dynamic rotating key (matches Admin computeKey)
  for (const duration in SALTS) {
    const baseSalt = SALTS[duration];
    let dynSalt = baseSalt;
    if (duration.includes("1Y")) {
      dynSalt = baseSalt + "_" + y;
    } else {
      dynSalt = baseSalt + "_" + y + "_" + m;
    }
    const expectedKey = sha256(deviceId + dynSalt).substring(0, 8).toUpperCase();
    if (inputKey === expectedKey) return duration;
  }

  // 2. Also check base salt (for initial cycle and backward compatibility)
  for (const duration in SALTS) {
    const baseSalt = SALTS[duration];
    const expectedKey = sha256(deviceId + baseSalt).substring(0, 8).toUpperCase();
    if (inputKey === expectedKey) return duration;
  }

  // 3. Check previous/next month transition window
  const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  const pY = prevMonth.getFullYear(), pM = String(prevMonth.getMonth() + 1).padStart(2, '0');
  const nY = nextMonth.getFullYear(), nM = String(nextMonth.getMonth() + 1).padStart(2, '0');

  for (const duration in SALTS) {
    const baseSalt = SALTS[duration];
    const keyPrev = sha256(deviceId + baseSalt + "_" + pY + "_" + pM).substring(0, 8).toUpperCase();
    const keyNext = sha256(deviceId + baseSalt + "_" + nY + "_" + nM).substring(0, 8).toUpperCase();
    if (inputKey === keyPrev || inputKey === keyNext) return duration;
  }

  // 4. Also support legacy Admin computeKey format for backward compatibility
  for (const duration in SALTS) {
    const raw = deviceId + "_SMARTWORKER_PRO_SECRET_SALT_2026_" + duration;
    const hash = sha256(raw);
    let legacyKey = "";
    for (let i = 0; i < 8; i++) {
      legacyKey += hash[(i * 7) % hash.length];
    }
    if (inputKey === legacyKey.toUpperCase()) return duration;
  }

  return null;
}

 function parseLicenseExpiryTimestamp(lic) {
  if (!lic) return 0;
  if (lic.key === SPECIAL_PROMO_CODE || lic.plan === "LIFETIME") return Date.now() + (36500 * 86400000);
  if (lic.expiry_date && typeof lic.expiry_date === 'string' && lic.expiry_date.toLowerCase().includes('lifetime')) {
    return Date.now() + (36500 * 86400000);
  }
  if (lic.expiry_timestamp && !isNaN(Number(lic.expiry_timestamp))) {
    return Number(lic.expiry_timestamp);
  }
  if (lic.expiry_date) {
    let exp = null;
    if (lic.expiry_date.includes('/')) {
      const parts = lic.expiry_date.split('/');
      exp = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10), 23, 59, 59);
    } else if (lic.expiry_date.includes('-')) {
      const parts = lic.expiry_date.split('-');
      if (parts[0].length === 4) {
        exp = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10), 23, 59, 59);
      } else {
        exp = new Date(parseInt(parts[2], 10), parseInt(parts[1], 10) - 1, parseInt(parts[0], 10), 23, 59, 59);
      }
    } else {
      exp = new Date(lic.expiry_date);
    }
    if (exp && !isNaN(exp.getTime())) return exp.getTime();
  }
  return 0;
}

 function isAppActivated() {
  const lic = JSON.parse(localStorage.getItem('sw_license') || '{}');
  if (!lic || !lic.key) return false;
  if (lic.key === SPECIAL_PROMO_CODE || lic.plan === "LIFETIME") return true;
  const expMs = parseLicenseExpiryTimestamp(lic);
  if (expMs > 0) {
    return Date.now() <= expMs;
  }
  return false;
}

 function getTelecomLicenseStatus() {
  const lic = JSON.parse(localStorage.getItem('sw_license') || '{}');
  if (!lic || !lic.key) {
    return { hasKey: false, active: false, expired: false, daysLeft: 0, totalDays: 30, startDate: '--', expiryDate: '--', plan: 'FREE_PLAN' };
  }
  const expMs = parseLicenseExpiryTimestamp(lic);
  const nowMs = Date.now();
  const active = expMs > nowMs;
  const diffDays = Math.max(0, Math.ceil((expMs - nowMs) / (24 * 60 * 60 * 1000)));
  const totalDays = Number(lic.validity_days) || (String(lic.plan || '').includes('1Y') ? 365 : (String(lic.plan || '').includes('6M') ? 180 : (String(lic.plan || '').includes('3M') ? 90 : 30)));
  const startDate = lic.start_date || (lic.activated_at ? new Date(lic.activated_at).toLocaleDateString('en-GB') : '--');
  const expiryDate = lic.expiry_date || (expMs > 0 ? new Date(expMs).toLocaleDateString('en-GB') : '--');
  return {
    hasKey: true,
    active: active,
    expired: !active,
    daysLeft: diffDays,
    totalDays: totalDays,
    startDate: startDate,
    expiryDate: expiryDate,
    plan: lic.plan || 'KARIGAR_1M',
    planCategory: lic.plan_category || 'KARIGAR'
  };
}

 function updateActivationScreenUI() {
  const devId = getDeviceId();
  const dIdElem = document.getElementById('actDeviceId');
  if (dIdElem) dIdElem.value = devId;

  const st = getTelecomLicenseStatus();
  const banner = document.getElementById('actStatusBanner');
  const tvCard = document.getElementById('telecomValidityCard');
  const teamSec = document.getElementById('corporateTeamSection');

  if (banner) {
    if (st.active) {
      const lic = JSON.parse(localStorage.getItem('sw_license') || '{}');
      const expStr = lic.key === SPECIAL_PROMO_CODE ? "Lifetime" : st.expiryDate;
      const cat = st.planCategory;

      banner.style.background = "#0284c7";
      banner.textContent = "Status: PRO ACTIVE (1 User Only • " + st.totalDays + " Days Pack) • " + st.daysLeft + " Days Left (Till " + expStr + ")";
      if (teamSec) teamSec.style.display = 'none';

      if (tvCard) {
        tvCard.style.display = 'block';
        tvCard.style.borderColor = '#38bdf8';
        const pTitle = document.getElementById('tvPlanTitle');
        const pBadge = document.getElementById('tvDaysBadge');
        const pStart = document.getElementById('tvStartDate');
        const pExp = document.getElementById('tvExpiryDate');
        const pBar = document.getElementById('tvProgressBar');
        const pNote = document.getElementById('tvSubNote');
        if (pTitle) pTitle.textContent = "ACTIVE RECHARGE (" + st.totalDays + " DAYS PACK)";
        if (pBadge) {
          pBadge.style.background = "#16a34a";
          pBadge.textContent = st.daysLeft + " / " + st.totalDays + " Days Left";
        }
        if (pStart) pStart.textContent = st.startDate;
        if (pExp) { pExp.style.color = "#4ade80"; pExp.textContent = st.expiryDate; }
        if (pBar) {
          const pct = Math.min(100, Math.max(5, Math.round((st.daysLeft / st.totalDays) * 100)));
          pBar.style.width = pct + "%";
          pBar.style.background = "linear-gradient(90deg, #22c55e, #38bdf8)";
        }
        if (pNote) pNote.textContent = "Recharge started on " + st.startDate + " and auto-expires after " + st.totalDays + " days on " + st.expiryDate + ".";
      }
    } else if (st.expired) {
      banner.style.background = "#dc2626";
      banner.textContent = "🔴 RECHARGE EXPIRED (0 Days Left) — Plan expired! Please recharge to continue.";
      if (teamSec) teamSec.style.display = 'none';
      if (tvCard) {
        tvCard.style.display = 'block';
        tvCard.style.borderColor = '#ef4444';
        const pTitle = document.getElementById('tvPlanTitle');
        const pBadge = document.getElementById('tvDaysBadge');
        const pStart = document.getElementById('tvStartDate');
        const pExp = document.getElementById('tvExpiryDate');
        const pBar = document.getElementById('tvProgressBar');
        const pNote = document.getElementById('tvSubNote');
        if (pTitle) { pTitle.style.color = "#f87171"; pTitle.textContent = "RECHARGE PACK EXPIRED (" + st.totalDays + " DAYS COMPLETED)"; }
        if (pBadge) {
          pBadge.style.background = "#dc2626";
          pBadge.textContent = "0 Days Left (Expired)";
        }
        if (pStart) pStart.textContent = st.startDate;
        if (pExp) { pExp.style.color = "#f87171"; pExp.textContent = st.expiryDate + " (Ended)"; }
        if (pBar) {
          pBar.style.width = "100%";
          pBar.style.background = "#ef4444";
        }
        if (pNote) pNote.textContent = "Your " + st.totalDays + "-day recharge pack has expired. Recharge now to activate a fresh validity cycle from today.";
      }
    } else {
      banner.style.background = "#37474f";
      banner.textContent = "Status: FREE PLAN (Limited Features • Recharge ₹99 for 30 Days)";
      if (teamSec) teamSec.style.display = 'none';
      if (tvCard) tvCard.style.display = 'none';
    }
  }
}

 function copyDeviceId() {
  var dId = getDeviceId();
  universalCopyText(dId, "Device ID (" + dId + ") copied to clipboard!");
}

 function activateAppKey(providedKey) {
  const inputKey = (providedKey || document.getElementById('activationInput').value || '').trim().toUpperCase();
  const deviceId = getDeviceId();

  if (!inputKey) {
    alert("Please enter your 8-character Activation Key!");
    return;
  }

  let usedKeys = JSON.parse(localStorage.getItem('sw_used_keys') || '[]');
  const currentLic = JSON.parse(localStorage.getItem('sw_license') || '{}');

  if (usedKeys.includes(inputKey) && currentLic.key === inputKey && !isAppActivated()) {
    alert("❌ This Activation Key was already used and its validity period has expired!\n\nOld keys cannot be reused. Please get a new recharge key.");
    return;
  }
  if (usedKeys.includes(inputKey) && currentLic.key !== inputKey) {
    alert("❌ This Activation Key has already been used!\n\nEach key can only be used once. Please request a new recharge key.");
    return;
  }

  const durationType = checkActivationType(deviceId, inputKey);

  if (durationType) {
    let daysToAdd = 30;
    let planCategory = "KARIGAR";
    let maxUsers = 1;
    let billAmt = 99;

    if (durationType === "KARIGAR_1M" || durationType === "1M") { daysToAdd = 30; maxUsers = 1; planCategory = "KARIGAR"; billAmt = 99; }
    else if (durationType === "KARIGAR_3M") { daysToAdd = 90; maxUsers = 1; planCategory = "KARIGAR"; billAmt = 280; }
    else if (durationType === "KARIGAR_6M") { daysToAdd = 180; maxUsers = 1; planCategory = "KARIGAR"; billAmt = 550; }
    else if (durationType === "KARIGAR_1Y" || durationType === "1Y") { daysToAdd = 365; maxUsers = 1; planCategory = "KARIGAR"; billAmt = 799; }
    else if (durationType === "TEAM_1M") { daysToAdd = 30; maxUsers = 10; planCategory = "WORKSHOP_TEAM"; billAmt = 499; }
    else if (durationType === "TEAM_1Y") { daysToAdd = 365; maxUsers = 10; planCategory = "WORKSHOP_TEAM"; billAmt = 3999; }
    else if (durationType === "CORP_1M") { daysToAdd = 30; maxUsers = 50; planCategory = "CORPORATE"; billAmt = 1499; }
    else if (durationType === "CORP_1Y") { daysToAdd = 365; maxUsers = 50; planCategory = "CORPORATE"; billAmt = 14999; }
    else if (durationType === "LIFETIME") { daysToAdd = 36500; maxUsers = 50; planCategory = "LIFETIME"; billAmt = 19999; }

    // Exact Telecom Start & Expiry Calculation (Starts today, runs for exact daysToAdd)
    const startMs = Date.now();
    const expiryMs = startMs + (daysToAdd * 24 * 60 * 60 * 1000);
    const startDateStr = new Date(startMs).toLocaleDateString('en-GB');
    const expiryStr = durationType === "LIFETIME" ? "Lifetime" : new Date(expiryMs).toLocaleDateString('en-GB');

    const newLicObj = {
      key: inputKey,
      plan: durationType,
      plan_category: planCategory,
      max_users: maxUsers,
      validity_days: daysToAdd,
      start_date: startDateStr,
      activated_at: new Date(startMs).toISOString(),
      start_timestamp: startMs,
      expiry_timestamp: expiryMs,
      expiry_date: expiryStr
    };

    localStorage.setItem('sw_license', JSON.stringify(newLicObj));

    if (!usedKeys.includes(inputKey) && inputKey !== SPECIAL_PROMO_CODE) {
      usedKeys.push(inputKey);
      localStorage.setItem('sw_used_keys', JSON.stringify(usedKeys));
    }

    // Sync exact telecom activation to Cloud for Admin Portal
    try {
      const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
      const subRecord = {
        device_id: deviceId,
        name: profile.name || "Workshop Owner",
        shop: profile.shop_name || "Aluminium Workshop",
        phone: profile.phone || "N/A",
        plan: durationType,
        validity_days: daysToAdd,
        bill_amount: billAmt,
        paid_amount: billAmt,
        due_amount: 0,
        activation_key: inputKey,
        status: "ACTIVE",
        start_date: startDateStr,
        expiry_date: expiryStr,
        start_timestamp: startMs,
        expiry_timestamp: expiryMs,
        timestamp: startMs
      };
      if (window.fbDb) {
        window.fbDb.collection('subscribers').doc(deviceId).set(subRecord, { merge: true }).catch(function(){});
      }
      if (window.fbRtdb) {
        window.fbRtdb.ref('subscribers/' + deviceId).set(subRecord).catch(function(){});
      }
    } catch (e) {}

    alert("✅ Subscription Activated Successfully!\n\nStart Date: " + startDateStr + "\nValid Until: " + (durationType === 'LIFETIME' ? 'Lifetime' : expiryStr + ' (Full ' + daysToAdd + ' Days Validity)'));
    updateActivationScreenUI();
    goHome();
  } else {
    alert("❌ Invalid or Expired Activation Key!\n\nPlease enter a valid current-month Activation Key or contact Smart Worker Support.");
  }
}

function subscribeViaWhatsApp(plan) {
  const deviceId = getDeviceId();
  let planKey = "KARIGAR_1M";
  let planStr = "Karigar Plan (Single User - Rs. 149 / 30 Days)";
  let amount = 149;

  if (plan === "Karigar_Monthly") {
    planKey = "KARIGAR_1M";
    planStr = "Karigar Plan (Single User - Rs. 149 / 30 Days)";
    amount = 149;
  } else if (plan === "Karigar_3M") {
    planKey = "KARIGAR_3M";
    planStr = "Karigar Plan (Single User - Rs. 399 / 90 Days)";
    amount = 399;
  } else if (plan === "Karigar_6M") {
    planKey = "KARIGAR_6M";
    planStr = "Karigar Plan (Single User - Rs. 749 / 180 Days)";
    amount = 749;
  } else if (plan === "Karigar_Annual") {
    planKey = "KARIGAR_1Y";
    planStr = "Karigar Plan (Single User - Rs. 1,199 / 365 Days)";
    amount = 1199;
  } else if (plan === "Workshop_Monthly") {
    planKey = "TEAM_1M";
    planStr = "Workshop Team Plan (10 Users - Rs. 499 / 30 Days)";
    amount = 499;
  } else if (plan === "Workshop_Annual") {
    planKey = "TEAM_1Y";
    planStr = "Workshop Team Plan (10 Users - Rs. 3,999 / 365 Days)";
    amount = 3999;
  } else if (plan === "Corporate_Monthly") {
    planKey = "CORP_1M";
    planStr = "Corporate Enterprise Plan (50 Users - Rs. 1,499 / 30 Days)";
    amount = 1499;
  } else if (plan === "Corporate_Annual") {
    planKey = "CORP_1Y";
    planStr = "Corporate Enterprise Plan (50 Users - Rs. 14,999 / 365 Days)";
    amount = 14999;
  } else {
    planKey = "KARIGAR_1M";
    planStr = "Smart Worker PRO Membership (Rs. 149 / 30 Days)";
    amount = 149;
  }

  // Retrieve or prompt customer profile
  let profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
  let customerName = (profile.name || "").trim();
  let customerPhone = (profile.phone || "").trim();
  let customerShop = (profile.shop_name || "Aluminium Workshop").trim();

  if (!customerName || customerName === "Saheb Ghanti" || !customerPhone || customerPhone === "9876543210") {
    const enteredName = prompt("Please enter your full name:", customerName !== "Saheb Ghanti" ? customerName : "");
    if (enteredName && enteredName.trim()) {
      customerName = enteredName.trim();
      profile.name = customerName;
    } else {
      customerName = "Customer " + deviceId;
    }

    const enteredPhone = prompt("Please enter your WhatsApp mobile number:", customerPhone !== "9876543210" ? customerPhone : "");
    if (enteredPhone && enteredPhone.trim()) {
      customerPhone = enteredPhone.trim();
      profile.phone = customerPhone;
    }

    localStorage.setItem('sw_profile', JSON.stringify(profile));
  }

  const now = new Date();
  const dateStr = now.toLocaleDateString('en-GB') + " " + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const reqObj = {
    id: "REQ_" + deviceId,
    device_id: deviceId,
    name: customerName,
    shop: customerShop,
    phone: customerPhone,
    plan: planKey,
    plan_name: planStr,
    bill_amount: amount,
    paid_amount: amount,
    due_amount: 0,
    status: "Pending",
    date: dateStr,
    timestamp: Date.now(),
    utr: "Pending Verification"
  };

  // 1. Save to localStorage
  try {
    let localReqs = JSON.parse(localStorage.getItem('sw_recharge_requests') || '[]');
    localReqs = localReqs.filter(r => r.device_id !== deviceId);
    localReqs.unshift(reqObj);
    localStorage.setItem('sw_recharge_requests', JSON.stringify(localReqs));
    window.dispatchEvent(new Event('storage'));
  } catch(e){}

  // 2. Save to Firebase Firestore (recharge_requests)
  try {
    const db = window.fbDb || (window.firebase && firebase.apps.length ? firebase.firestore() : null);
    if (db) {
      db.collection('recharge_requests').doc(deviceId).set(reqObj, { merge: true })
        .then(() => console.log("Recharge request synced to Firestore!"))
        .catch(err => console.warn("Firestore error:", err));
    }
  } catch(err) { console.warn(err); }

  // 3. Save to Firebase Realtime Database
  try {
    const rtdb = window.fbRtdb || (window.firebase && firebase.apps.length && firebase.database ? firebase.database() : null);
    if (rtdb) {
      rtdb.ref('recharge_requests/' + deviceId).set(reqObj)
        .then(() => console.log("Recharge request synced to RTDB!"))
        .catch(err => console.warn("RTDB error:", err));
    }
  } catch(err) { console.warn(err); }

  // 4. Open WhatsApp to Admin (+91 9239413517)
  const waMsg = `Hello Saheb Da,
I want to activate Smart Worker PRO!

📋 *RECHARGE REQUEST DETAILS:*
• *Customer Name:* ${customerName}
• *Workshop:* ${customerShop}
• *Mobile Number:* ${customerPhone}
• *Device ID:* ${deviceId}
• *Selected Plan:* ${planStr}
• *Payable Amount:* ₹${amount}
• *Date & Time:* ${dateStr}

Please verify payment and issue my Pro Activation Key!`;

  const encoded = encodeURIComponent(waMsg);
  window.open(`https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encoded}`, '_blank');

  alert(`✅ Your recharge request has been sent to the Admin Portal!

📋 Device ID: ${deviceId}
📦 Plan: ${planStr}
💰 Amount: ₹${amount}

Admin will verify your payment and send your 8-character Activation Key on WhatsApp.`);
}




// ========================================================
 // PROFESSIONAL REPORTLAB-STYLE TABULAR PDF GENERATOR
 // ========================================================

// ========================================================
 // CUSTOM WORKSHOP BRANDING (LOGO & PAYMENT QR UPLOAD)
 // ========================================================
 // ========================================================
// CUSTOM WORKSHOP BRANDING (CANVAS OPTIMIZED LOGO & PAYMENT QR)
// ========================================================
function uploadShopLogo(input) {
  if (input.files && input.files[0]) {
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        try {
          var canvas = document.createElement('canvas');
          var MAX_DIM = 400; // Optimal 300DPI crisp resolution for PDF print
          var w = img.width;
          var h = img.height;
          if (w > h) {
            if (w > MAX_DIM) { h = Math.round(h * (MAX_DIM / w)); w = MAX_DIM; }
          } else {
            if (h > MAX_DIM) { w = Math.round(w * (MAX_DIM / h)); h = MAX_DIM; }
          }
          canvas.width = w;
          canvas.height = h;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          var optimized = canvas.toDataURL('image/png');
          localStorage.setItem('sw_custom_logo', optimized);
          renderBrandingPreviews();
          loadSavedProfile();
          if (typeof syncAllDataToCloud === 'function') syncAllDataToCloud();
          alert("✅ Your workshop logo has been saved! It will appear on all your bills and PDFs.");
        } catch(err) {
          try {
            localStorage.setItem('sw_custom_logo', e.target.result);
            renderBrandingPreviews();
            loadSavedProfile();
            alert("✅ Your workshop logo has been saved! It will appear on all your bills and PDFs.");
          } catch(storageErr) {
            alert("❌ Image size is too large! Please select a smaller image file.");
          }
        }
      };
      img.onerror = function() {
        alert("❌ Failed to load image! Please select a valid image file.");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function removeShopLogo() {
  localStorage.removeItem('sw_custom_logo');
  document.querySelectorAll('img[alt*="Logo"], img[alt="SWA"]').forEach(function(img){ img.src = 'logo.png'; });
  renderBrandingPreviews();
  loadSavedProfile();
  if (typeof syncAllDataToCloud === 'function') syncAllDataToCloud();
  alert("Shop logo removed successfully.");
}

function uploadPaymentQr(input) {
  if (input.files && input.files[0]) {
    var file = input.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      var img = new Image();
      img.onload = function() {
        try {
          var canvas = document.createElement('canvas');
          var MAX_DIM = 400;
          var w = img.width;
          var h = img.height;
          if (w > h) {
            if (w > MAX_DIM) { h = Math.round(h * (MAX_DIM / w)); w = MAX_DIM; }
          } else {
            if (h > MAX_DIM) { w = Math.round(w * (MAX_DIM / h)); h = MAX_DIM; }
          }
          canvas.width = w;
          canvas.height = h;
          var ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          var optimized = canvas.toDataURL('image/png');
          localStorage.setItem('sw_custom_qr', optimized);
          renderBrandingPreviews();
          if (typeof syncAllDataToCloud === 'function') syncAllDataToCloud();
          alert("✅ Your Payment QR Code has been saved! It will appear on all your invoices.");
        } catch(err) {
          try {
            localStorage.setItem('sw_custom_qr', e.target.result);
            renderBrandingPreviews();
            alert("✅ Your Payment QR Code has been saved successfully!");
          } catch(storageErr) {
            alert("❌ Image size is too large! Please select a smaller image file.");
          }
        }
      };
      img.onerror = function() {
        alert("❌ Failed to load QR Code! Please select a valid image file.");
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

function removePaymentQr() {
  localStorage.removeItem('sw_custom_qr');
  renderBrandingPreviews();
  if (typeof syncAllDataToCloud === 'function') syncAllDataToCloud();
  alert("Payment QR Code removed successfully.");
}

 function renderBrandingPreviews() {
 const logo = localStorage.getItem('sw_custom_logo');
 const logoBox = document.getElementById('logoPreviewBox');
 const logoImg = document.getElementById('logoPreviewImg');
 if (logo && logoBox && logoImg) {
 logoImg.src = logo;
 logoBox.style.display = 'flex';
 } else if (logoBox) {
 logoBox.style.display = 'none';
 }

 const qr = localStorage.getItem('sw_custom_qr');
 const qrBox = document.getElementById('qrPreviewBox');
 const qrImg = document.getElementById('qrPreviewImg');
 if (qr && qrBox && qrImg) {
 qrImg.src = qr;
 qrBox.style.display = 'flex';
 } else if (qrBox) {
 qrBox.style.display = 'none';
 }
 }


 // ========================================================
 // 11. DASHBOARD, HISTORY & PROFILE MANAGEMENT
 // ========================================================
 function loadDashboard() {
 const dmEl = document.getElementById('dash_month');
 const targetMonth = dmEl ? dmEl.value.trim() : "";
 const labelMonth = targetMonth || "ALL RECORDS";
 const invoices = JSON.parse(localStorage.getItem('sw_invoices') || '[]');
 const expenses = JSON.parse(localStorage.getItem('sw_expenses') || '[]');

 let sales_sum = 0.0, exp_sum = 0.0;
 let details_txt = `--- DETAILS FOR ${labelMonth} ---\n\n>> CUSTOMER BILLS (INCOME):\n`;

 invoices.forEach(inv => {
 if (targetMonth && targetMonth.toLowerCase() !== "all" && String(inv.date || "").indexOf(targetMonth) === -1) return;
 details_txt += `- ${inv.date} | ${inv.client} | Rs ${parseFloat(inv.amount).toFixed(2)}\n`;
 sales_sum += parseFloat(inv.amount) || 0;
 });

 details_txt += `\n>> MATERIAL PURCHASES (EXPENSE):\n`;
 expenses.forEach(exp => {
 if (targetMonth && targetMonth.toLowerCase() !== "all" && String(exp.date || "").indexOf(targetMonth) === -1) return;
 details_txt += `- ${exp.date} | ${exp.category} | ${exp.supplier} (Memo:${exp.memo_no}) | Rs ${parseFloat(exp.amount).toFixed(2)}\n`;
 exp_sum += parseFloat(exp.amount) || 0;
 });

 document.getElementById('dashTotalSales').textContent = `Rs ${sales_sum.toLocaleString('en-IN', {minimumFractionDigits:2})}`;
 document.getElementById('dashTotalPurchases').textContent = `Rs ${exp_sum.toLocaleString('en-IN', {minimumFractionDigits:2})}`;
 document.getElementById('dashNetBalance').textContent = `Rs ${(sales_sum - exp_sum).toLocaleString('en-IN', {minimumFractionDigits:2})}`;
 document.getElementById('dash_details').textContent = details_txt;
 }

 function openExpenseModal() {
 document.getElementById('exp_supplier').value = "";
 document.getElementById('exp_memo').value = "";
 document.getElementById('exp_amt').value = "";
 document.getElementById('expenseModal').classList.add('active');
 }

 function closeExpenseModal() {
 document.getElementById('expenseModal').classList.remove('active');
 }

 function saveExpense() {
 const cat = document.getElementById('exp_cat').value;
 const supplier = document.getElementById('exp_supplier').value.trim() || "Unknown";
 const memo = document.getElementById('exp_memo').value.trim() || "N/A";
 const amt = safeEval(document.getElementById('exp_amt').value);
 if (amt === 0) { alert("Please enter a valid amount."); return; }

 const today = new Date().toLocaleDateString('en-GB');
 const expenses = JSON.parse(localStorage.getItem('sw_expenses') || '[]');
 expenses.unshift({ date: today, category: cat, supplier: supplier, memo_no: memo, amount: amt });
 localStorage.setItem('sw_expenses', JSON.stringify(expenses));

 closeExpenseModal();
 alert("Purchase saved successfully!");
 loadDashboard();
 }

 function loadHistory() {
 const h_type = document.getElementById('hist_spinner').value;
 let out_text = "";
 if (h_type === "Saved Measurements") {
 const rows = JSON.parse(localStorage.getItem('sw_measurements') || '[]');
 if (rows.length === 0) out_text = "No saved measurements found.";
 rows.forEach(row => {
 out_text += `Project ID #${row.id} | Date: ${row.date} | Type: ${row.project_type}\n---------------------------------------------\n${row.details}\n=============================================\n\n`;
 });
 } else {
 const rows = JSON.parse(localStorage.getItem('sw_invoices') || '[]');
 if (rows.length === 0) out_text = "No saved bills found.";
 rows.forEach(row => {
 out_text += `Invoice #${row.id} | Date: ${row.date} | Client: ${row.client} | Total: Rs ${parseFloat(row.amount).toFixed(2)}\n---------------------------------------------\n${row.bill_text}\n=============================================\n\n`;
 });
 }
 document.getElementById('history_out').textContent = out_text;
 }

 function backupDb() {
 const data = {
 profile: JSON.parse(localStorage.getItem('sw_profile') || '{}'),
 bill_settings: JSON.parse(localStorage.getItem('sw_bill_settings') || '{}'),
 measurements: JSON.parse(localStorage.getItem('sw_measurements') || '[]'),
 invoices: JSON.parse(localStorage.getItem('sw_invoices') || '[]'),
 customers: JSON.parse(localStorage.getItem('sw_customers') || '{}'),
 expenses: JSON.parse(localStorage.getItem('sw_expenses') || '[]')
 };
 const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
 const a = document.createElement('a');
 a.href = URL.createObjectURL(blob);
 a.download = `smartworker_backup_${Date.now()}.json`;
 a.click();
 }

 function confirmDeleteHistory() {
 const h_type = document.getElementById('hist_spinner').value;
 if (confirm(`Are you sure you want to delete all ${h_type}?`)) {
 if (h_type === "Saved Measurements") localStorage.removeItem('sw_measurements');
 else localStorage.removeItem('sw_invoices');
 loadHistory();
 }
 }

 function searchCustomer() {
 const pinEl = document.getElementById('lookup_pin');
 const pin = pinEl ? pinEl.value.trim() : "";
 if (!pin || pin.length < 4) { alert("Please enter at least a 4-digit PIN."); return; }
 const customers = JSON.parse(localStorage.getItem('sw_customers') || '{}');
 const invoices = JSON.parse(localStorage.getItem('sw_invoices') || '[]');

 let out_text = "";
 let found = false;
 for (const phone in customers) {
 if (phone.endsWith(pin)) {
 found = true;
 const cust = customers[phone];
 out_text += `--- CUSTOMER DETAILS ---\nName: ${cust.name}\nPhone: ${phone}\nAddress: ${cust.address}\n\n--- PREVIOUS BILLS ---\n`;
 const custBills = invoices.filter(inv => inv.phone === phone);
 if (custBills.length > 0) {
 custBills.forEach(b => {
 out_text += `Date: ${b.date} | Total: Rs ${parseFloat(b.amount).toFixed(2)}\n${b.bill_text}\n========================================\n\n`;
 });
 } else {
 out_text += "No saved bills found for this customer.\n\n";
 }
 }
 }
 if (!found) out_text = "No customer found with this PIN.";
 const lrEl = document.getElementById('lookup_results'); if (lrEl) lrEl.textContent = out_text;
 }

 

 function loadSavedProfile() {

 const customLogo = localStorage.getItem('sw_custom_logo');
 if (customLogo) {
 const logoImgs = document.querySelectorAll('img[alt*="Logo"], img[alt="SWA"]');
 logoImgs.forEach(img => { img.src = customLogo; img.style.display = 'inline-block'; });
 }
 renderBrandingPreviews();

 const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 if (profile.name) {
 if (document.getElementById('homeGreeting')) document.getElementById('homeGreeting').textContent = `Welcome, ${profile.name}!`;
 if (document.getElementById('set_name')) document.getElementById('set_name').value = profile.name;
 if (document.getElementById('settingsUserName')) document.getElementById('settingsUserName').textContent = profile.name;
 }
 if (profile.shop_name) {
 if (document.getElementById('homeShop')) document.getElementById('homeShop').textContent = profile.shop_name.toUpperCase();
 if (document.getElementById('set_shop')) document.getElementById('set_shop').value = profile.shop_name;
 }
 if (profile.phone) {
 if (document.getElementById('set_phone')) document.getElementById('set_phone').value = profile.phone;
 if (document.getElementById('settingsUserEmail')) document.getElementById('settingsUserEmail').textContent = profile.email || ("Mob: " + profile.phone);
 }
 if (profile.email) {
 if (document.getElementById('set_email')) document.getElementById('set_email').value = profile.email;
 if (document.getElementById('settingsUserEmail')) document.getElementById('settingsUserEmail').textContent = profile.email;
 }
 if (profile.gst && document.getElementById('set_gst')) document.getElementById('set_gst').value = profile.gst;
 if (profile.address) {
 if (document.getElementById('set_address')) document.getElementById('set_address').value = profile.address;
 if (document.getElementById('homeAddress')) document.getElementById('homeAddress').textContent = profile.address;
 }
 if (profile.bank_name && document.getElementById('set_bank_name')) document.getElementById('set_bank_name').value = profile.bank_name;
 if (profile.bank_holder && document.getElementById('set_bank_holder')) document.getElementById('set_bank_holder').value = profile.bank_holder;
 if (profile.bank_acc && document.getElementById('set_bank_acc')) document.getElementById('set_bank_acc').value = profile.bank_acc;
 if (profile.bank_ifsc && document.getElementById('set_bank_ifsc')) document.getElementById('set_bank_ifsc').value = profile.bank_ifsc;
 if (profile.bank_branch && document.getElementById('set_bank_branch')) document.getElementById('set_bank_branch').value = profile.bank_branch;
 if (profile.upi_id && document.getElementById('set_upi_id')) document.getElementById('set_upi_id').value = profile.upi_id;

 }

 function saveBillSettings() {
 const settings = {
 'Default Unit': document.getElementById('bs_unit').value,
 'GST': document.getElementById('bs_gst').value,
 'Discount': document.getElementById('bs_discount').value,
 'Sliding Mill/Natural (Rs/Kg)': document.getElementById('bs_sl_mill').value,
 'Sliding Anodized (Rs/Kg)': document.getElementById('bs_sl_anod').value,
 'Sliding Powder Coated (Rs/Kg)': document.getElementById('bs_sl_powder').value,
 'Sliding Wooden Finish (Rs/Kg)': document.getElementById('bs_sl_wooden').value,
 'Domal Mill/Natural (Rs/Kg)': document.getElementById('bs_dm_mill').value,
 'Domal Anodized (Rs/Kg)': document.getElementById('bs_dm_anod').value,
 'Domal Powder Coated (Rs/Kg)': document.getElementById('bs_dm_powder').value,
 'Domal Wooden Finish (Rs/Kg)': document.getElementById('bs_dm_wooden').value,
 'Door Master Material (Rs/Kg)': document.getElementById('bs_alu_door').value,
 'Partition Material (Rs/Kg)': document.getElementById('bs_alu_partition').value,
 'Casement Material (Rs/Kg)': document.getElementById('bs_alu_casement').value,
 'Clear Glass (Rs/Sq.Ft)': document.getElementById('bs_glass_clear').value,
 'Reflective Glass (Rs/Sq.Ft)': document.getElementById('bs_glass_refl').value,
 'Toughened Extra (Rs/Sq.Ft)': document.getElementById('bs_glass_tough').value,
 'Sliding Window Labour': document.getElementById('bs_labour_sliding').value,
 'Domal Window Labour': document.getElementById('bs_labour_domal').value,
 'Casement Labour': document.getElementById('bs_labour_casement').value,
 'Door Master Labour': document.getElementById('bs_labour_door').value,
 'Partition Labour': document.getElementById('bs_labour_partition').value,
 'Sliding Profit (%)': document.getElementById('bs_profit_sliding').value,
 'Domal Profit (%)': document.getElementById('bs_profit_domal').value,
 'Casement Profit (%)': document.getElementById('bs_profit_casement').value,
 'Door Profit (%)': document.getElementById('bs_profit_door').value
 };
 localStorage.setItem('sw_bill_settings', JSON.stringify(settings));
 if (typeof addToOfflineQueue === 'function') addToOfflineQueue('settings', settings);
 if (typeof syncOfflineQueueToCloud === 'function') syncOfflineQueueToCloud();
 alert("All Settings Saved Successfully! (Saved locally & auto-syncs to cloud)");
 }


function setupDb() {
 const defaultSettings = {
 'Default Unit': 'Feet',
 'GST': '0.0',
 'Discount': '0.0',
 'Sliding Mill/Natural (Rs/Kg)': '260.0',
 'Sliding Anodized (Rs/Kg)': '275.0',
 'Sliding Powder Coated (Rs/Kg)': '290.0',
 'Sliding Wooden Finish (Rs/Kg)': '345.0',
 'Domal Mill/Natural (Rs/Kg)': '280.0',
 'Domal Anodized (Rs/Kg)': '295.0',
 'Domal Powder Coated (Rs/Kg)': '310.0',
 'Domal Wooden Finish (Rs/Kg)': '365.0',
 'Door Master Material (Rs/Kg)': '270.0',
 'Partition Material (Rs/Kg)': '265.0',
 'Casement Material (Rs/Kg)': '275.0',
 'Clear Glass (Rs/Sq.Ft)': '35.0',
 'Reflective Glass (Rs/Sq.Ft)': '55.0',
 'Toughened Extra (Rs/Sq.Ft)': '25.0',
 'Sliding Window Labour': '35.0',
 'Domal Window Labour': '50.0',
 'Casement Labour': '60.0',
 'Door Master Labour': '65.0',
 'Partition Labour': '40.0',
 'Sliding Profit (%)': '15.0',
 'Domal Profit (%)': '20.0',
 'Casement Profit (%)': '25.0',
 'Door Profit (%)': '20.0'
 };
 let currentSettings = JSON.parse(localStorage.getItem('sw_bill_settings') || '{}');
 let changed = false;
 for (const k in defaultSettings) {
 if (currentSettings[k] === undefined) {
 currentSettings[k] = defaultSettings[k];
 changed = true;
 }
 }
 if (changed || !localStorage.getItem('sw_bill_settings')) {
 localStorage.setItem('sw_bill_settings', JSON.stringify(currentSettings));
 }
 }

 function loadBillSettings() {
 const s = JSON.parse(localStorage.getItem('sw_bill_settings') || '{}');
 if (s['Default Unit']) document.getElementById('bs_unit').value = s['Default Unit'];
 if (s['GST']) document.getElementById('bs_gst').value = s['GST'];
 if (s['Discount']) document.getElementById('bs_discount').value = s['Discount'];
 if (s['Sliding Mill/Natural (Rs/Kg)']) document.getElementById('bs_sl_mill').value = s['Sliding Mill/Natural (Rs/Kg)'];
 if (s['Sliding Anodized (Rs/Kg)']) document.getElementById('bs_sl_anod').value = s['Sliding Anodized (Rs/Kg)'];
 if (s['Sliding Powder Coated (Rs/Kg)']) document.getElementById('bs_sl_powder').value = s['Sliding Powder Coated (Rs/Kg)'];
 if (s['Sliding Wooden Finish (Rs/Kg)']) document.getElementById('bs_sl_wooden').value = s['Sliding Wooden Finish (Rs/Kg)'];
 if (s['Domal Mill/Natural (Rs/Kg)']) document.getElementById('bs_dm_mill').value = s['Domal Mill/Natural (Rs/Kg)'];
 if (s['Domal Anodized (Rs/Kg)']) document.getElementById('bs_dm_anod').value = s['Domal Anodized (Rs/Kg)'];
 if (s['Domal Powder Coated (Rs/Kg)']) document.getElementById('bs_dm_powder').value = s['Domal Powder Coated (Rs/Kg)'];
 if (s['Domal Wooden Finish (Rs/Kg)']) document.getElementById('bs_dm_wooden').value = s['Domal Wooden Finish (Rs/Kg)'];
 if (s['Door Master Material (Rs/Kg)']) document.getElementById('bs_alu_door').value = s['Door Master Material (Rs/Kg)'];
 if (s['Partition Material (Rs/Kg)']) document.getElementById('bs_alu_partition').value = s['Partition Material (Rs/Kg)'];
 if (s['Casement Material (Rs/Kg)']) document.getElementById('bs_alu_casement').value = s['Casement Material (Rs/Kg)'];
 if (s['Clear Glass (Rs/Sq.Ft)']) document.getElementById('bs_glass_clear').value = s['Clear Glass (Rs/Sq.Ft)'];
 if (s['Reflective Glass (Rs/Sq.Ft)']) document.getElementById('bs_glass_refl').value = s['Reflective Glass (Rs/Sq.Ft)'];
 if (s['Toughened Extra (Rs/Sq.Ft)']) document.getElementById('bs_glass_tough').value = s['Toughened Extra (Rs/Sq.Ft)'];
 if (s['Sliding Window Labour']) document.getElementById('bs_labour_sliding').value = s['Sliding Window Labour'];
 if (s['Domal Window Labour']) document.getElementById('bs_labour_domal').value = s['Domal Window Labour'];
 if (s['Casement Labour']) document.getElementById('bs_labour_casement').value = s['Casement Labour'];
 if (s['Door Master Labour']) document.getElementById('bs_labour_door').value = s['Door Master Labour'];
 if (s['Partition Labour']) document.getElementById('bs_labour_partition').value = s['Partition Labour'];
 if (s['Sliding Profit (%)']) document.getElementById('bs_profit_sliding').value = s['Sliding Profit (%)'];
 if (s['Domal Profit (%)']) document.getElementById('bs_profit_domal').value = s['Domal Profit (%)'];
 if (s['Casement Profit (%)']) document.getElementById('bs_profit_casement').value = s['Casement Profit (%)'];
 if (s['Door Profit (%)']) document.getElementById('bs_profit_door').value = s['Door Profit (%)'];
 }



 // COMPLETE 3-LANGUAGE TRANSLATION ENGINE (EN / BN / HI)
 // 100% Pure Language Segregation - No Mixed Text
 // ========================================================
 const I18N_DICT = {
  en: {
    title_app: "SMART WORKER PRO",
    lbl_quick_lang: "Language:",
    nav_home: "Home",
    nav_dashboard: "Dashboard",
    nav_records: "Records",
    nav_profile: "Profile",
    nav_login: "Login",
    welcome_prefix: "Welcome,",
    sec_fab_systems: "Window & Door Systems",
    sec_business_billing: "Business & Billing",
    mod_khata_title: "Site Measurement Khata",
    mod_khata_sub: "Digital Khata Book: Room Tracking, Auto Labour & Billing",
    mod_domal: "Euro Series",
    mod_sliding: "Sliding Window",
    mod_casement: "Custom Casement",
    mod_partition: "Partition & Door",
    mod_door: "Simple Door Option",
    mod_quotation: "Pro Quotation",
    mod_ceiling: "Ceiling Estimator",
    mod_customer_khata: "Customer Khata",
    mod_calculator: "Smart Calculator",
    btn_open: "OPEN",
    btn_edit: "Edit",
    sub_domal: "27x65 / 35x75 / 45mm Euro Cuts",
    sub_sliding: "2, 3, 4 Track & Interlock Cuts",
    sub_casement: "Z-Section & Openable Window",
    sub_partition: "Office Partition & Sheet Cutting",
    sub_door: "Hinge Door & Bathroom Shutter",
    sub_ceiling: "False Ceiling Grid & Perimeter",
    sub_quotation: "Client GST Invoice & PDF Bill",
    sub_customer_khata: "Client Balance & Records",
    sub_calculator: "Quick Inch & Sq.Ft Math",
    tab_aluminium: "ALUMINIUM",
    tab_upvc: "uPVC",
    upvc_hub_title: "uPVC Fabrication Hub",
    upvc_hub_sub: "All Tracks & Z-Series • Auto +6mm Weld • GI Steel Cut",
    upvc_badge_any: "ANY BRAND",
    upvc_badge_weld_gi: "Welding + GI Steel",
    sec_upvc_systems: "uPVC Window & Door Cutting",
    sec_shared_tools: "Shared Workshop & Billing",
    mod_upvc_casement: "uPVC Casement & French",
    sub_upvc_casement: "60/65/70mm + Custom Z, +6mm Weld & GI Steel",
    mod_upvc_sliding: "uPVC Sliding (All Tracks)",
    sub_upvc_sliding: "2T / 2.5T / 3T (60-112mm + Custom) & GI Steel",
    mod_upvc_fixed: "uPVC Fixed / Ventilator",
    sub_upvc_fixed: "Direct Fixed Glass (-7mm) & +6mm Weld Cut",
    mod_glass_opt: "Glass 4'x8' Optimizer",
    sub_glass_opt: "Min-Waste Glass Sheet Layout & PDF",
    mod_order_tracker: "Order Tracker",
    sub_order_tracker: "Live Work & Delivery Status",
    euro_settings_title: "EURO GROOVE SETTINGS (mm)",
    lbl_outer_b: "Outer Box B:",
    lbl_mullion_b: "Mullion B:",
    lbl_overlap: "Overlap (8+8):",
    lbl_z_glass: "Z-Sash Glass Minus:",
    lbl_fix_glass: "Fixed Glass Minus:",
    lbl_french_mode: "French Window (Flying Mullion, 4mm Gap)",
    lbl_input_unit: "Input Unit:",
    lbl_upvc_profile: "uPVC Casement Profile:",
    lbl_total_h: "Total Height (H):",
    lbl_total_w: "Total Width (W):",
    lbl_top_cols: "Top Total Sections:",
    lbl_top_open: "Top Openable (Sash):",
    lbl_bot_h: "Bottom Height (0=None):",
    lbl_bot_cols_open: "Bottom Sections / Open:",
    lbl_room_loc: "Room / Location:",
    lbl_qty: "Quantity (Pcs):",
    lbl_profile_ded: "PROFILE DEDUCTIONS (ANY BRAND)",
    btn_save_profile: "Save My Profile",
    lbl_weld_add: "Weld (+):",
    lbl_gi_minus: "GI Steel (-):",
    btn_clear: "CLEAR",
    btn_calc_upvc: "+ CALCULATE uPVC",
    btn_calc_sliding: "+ CALCULATE SLIDING",
    btn_cut_pdf: "CUTTING PDF",
    btn_glass_pdf: "GLASS PDF",
    lbl_upvc_track: "uPVC Track & Shutter:",
    lbl_upvc_series: "uPVC Series / Brand:",
    lbl_sash_h_minus: "Sash H Minus:",
    lbl_sash_face_mm: "Sash Face (mm):",
    lbl_bead_h: "Bead Height (mm):",
    lbl_g_clear: "Clearance (-):",
    lbl_frame_face_f: "Frame Face F:",
    lbl_sash_face_s: "Sash Face S:",
    lbl_sash_h_engage: "H-Engage (+):",
    opt_2t_2s: "2-Track (2 Glass)",
    opt_2t_4s: "2-Track (4 Glass)",
    opt_25t_2g1m: "2.5-Track (2 Glass + 1 Jali)",
    opt_3t_2g1m: "3-Track (2 Glass + 1 Jali)",
    opt_3t_3s: "3-Track (3 Glass)",
    opt_3t_4g2m: "3-Track (4 Glass + 2 Jali)",
    mod_upvc_door: "uPVC Door (Single/Double)",
    sub_upvc_door: "With / Without Bottom • +3/+6mm Weld & GI",
    lbl_upvc_door_type: "Door Type:",
    opt_ud_single_nobot: "Single Door (No Bottom Frame)",
    opt_ud_single_bot: "Single Door (With Bottom Frame)",
    opt_ud_double_nobot: "Double / French Door (No Bottom)",
    opt_ud_double_bot: "Double / French Door (With Bottom)",
    btn_calc_door: "+ CALCULATE DOOR",
    res_upvc_door_cut: "uPVC Door Cutting & GI Steel List",
    q_upvc_spec_title: "uPVC SPECIFICATION (GI & HARDWARE)",
    q_lbl_gi_steel: "GI Reinforcement:",
    q_lbl_hardware: "uPVC Hardware:",
    q_lbl_item_note: "Extra Item Note (Optional):",
    q_comm_title: "TAX, INSTALLATION & PROPOSAL TERMS",
    q_lbl_gst_mode: "GST Mode:",
    q_lbl_install_rate: "Install Rate (Rs/Sq.Ft):",
    q_lbl_disc_rs: "Discount (Rs):",
    q_lbl_validity: "Validity (Days):",
    q_lbl_delivery: "Delivery (Days):",
    btn_save_rec: "SAVE RECORD",
    btn_upvc_order_pdf: "3. uPVC ORDER PDF",
    btn_hw_pdf: "4. HARDWARE PDF",
    badge_upvc_bar_opt: "5.95m / 19.5' uPVC OPTIMIZER",
    mod_upvc_bar_opt: "uPVC Profile Cutting (5.95m / 19.5')",
    sub_upvc_bar_opt: "Min-Waste 5.95m uPVC & 6m GI Bar Cutting Drawing, Kerf Loss & PDF",
    lbl_upvc_color: "uPVC Profile Color:",
    lbl_glass_grade: "Glass Grade (Tough/Norm):",
    lbl_glass_spec: "Glass Thick & Type:",
    lbl_live_upvc_cad: "LIVE uPVC CAD PREVIEW (INSIDE VIEW)",
    btn_zoom_cad: "Zoom",
    cad_ready_designs: "INTERACTIVE CAD DESIGNER",
    cad_btn_merge: "Merge",
    cad_btn_undo: "Undo",
    cad_btn_reset: "Reset",
    cad_btn_split_lr: "Split Left/Right",
    cad_btn_split_tb: "Split Top/Bot",
    cad_btn_exact: "Exact Size",
    lbl_frame_w_minus: "Frame W Minus:",
    lbl_ilock_add: "Interlock (+):",
    lbl_glass_minus: "Glass Minus:",
    res_upvc_casement_cut: "uPVC Casement Cutting & GI Steel List",
    res_upvc_sliding_cut: "uPVC Sliding Cutting & GI Steel List",
    res_upvc_mat: "uPVC Profile & GI Steel Summary",
    lbl_door_palla: "Door Palla / Shutter:",
    lbl_room_tag: "Room / Location Tag:",
    keypad_title: "SMART MEASUREMENT KEYPAD",
    keypad_ok: "OK / DONE",
    keypad_numbers: "Numbers",
    keypad_fractions: "Suta / Fractions",
    suta_1: "1 Suta (1/8)",
    suta_2: "2 Suta (1/4)",
    suta_3: "3 Suta (3/8)",
    suta_4: "4 Suta (1/2)",
    suta_5: "5 Suta (5/8)",
    suta_6: "6 Suta (3/4)",
    suta_7: "7 Suta (7/8)",
    suta_half: "Half Suta (1/16)" 
  },
  bn: {
    title_app: "স্মার্ট ওয়ার্কার প্রো",
    lbl_quick_lang: "ভাষা:",
    nav_home: "হোম",
    nav_dashboard: "ড্যাশবোর্ড",
    nav_records: "রেকর্ডস",
    nav_profile: "প্রোফাইল",
    nav_login: "লগইন",
    welcome_prefix: "স্বাগতম,",
    sec_fab_systems: "জানালা ও দরজা সিস্টেম",
    sec_business_billing: "ব্যবসা ও বিলিং",
    mod_khata_title: "সাইট মেজারমেন্ট খাতা",
    mod_khata_sub: "ডিজিটাল খাতা: রুম মাপ, অটো লেবার ও বিলিং",
    mod_domal: "ইউরো সিরিজ",
    mod_sliding: "স্লাইডিং জানালা",
    mod_casement: "কাস্টম কেসমেন্ট",
    mod_partition: "পার্টিশন ও দরজা",
    mod_door: "সাধারণ দরজা",
    mod_quotation: "প্রো কোটেশন / বিল",
    mod_ceiling: "সিলিং এস্টিমেটর",
    mod_customer_khata: "কাস্টমার খাতা",
    mod_calculator: "স্মার্ট ক্যালকুলেটর",
    btn_open: "খুলুন",
    btn_edit: "এডিট",
    sub_domal: "27x65 / 35x75 / 45mm ইউরো সেকশন",
    sub_sliding: "2, 3, 4 ট্র্যাক ও ইন্টারলক কাটিং",
    sub_casement: "জেড-সেকশন ও ওপেনেবল জানালা",
    sub_partition: "অফিস পার্টিশন ও শিট কাটিং",
    sub_door: "হিঞ্জ ডোর ও বাথরুম শাটার",
    sub_ceiling: "ফলস সিলিং গ্রিড ও পেরিমিটার",
    sub_quotation: "ক্লায়েন্ট GST ইনভয়েস ও PDF বিল",
    sub_customer_khata: "কাস্টমার বাকি ও হিসাব",
    sub_calculator: "দ্রুত ইঞ্চি ও স্কয়ার ফুট হিসাব",
    tab_aluminium: "অ্যালুমিনিয়াম",
    tab_upvc: "ইউপিভিসি (uPVC)",
    upvc_hub_title: "uPVC ফ্যাব্রিকেশন হাব",
    upvc_hub_sub: "সব ট্র্যাক ও Z-সিরিজ • অটো +6mm ওয়েল্ড • GI স্টিল",
    upvc_badge_any: "যেকোনো ব্র্যান্ড",
    upvc_badge_weld_gi: "ওয়েল্ডিং + GI স্টিল",
    sec_upvc_systems: "uPVC জানালা ও দরজা কাটিং",
    sec_shared_tools: "ওয়ার্কশপ ও বিলিং টুলস",
    mod_upvc_casement: "uPVC কেসমেন্ট ও ফ্রেঞ্চ",
    sub_upvc_casement: "60/65/70mm + কাস্টম Z, +6mm ওয়েল্ড ও GI স্টিল",
    mod_upvc_sliding: "uPVC স্লাইডিং (সব ট্র্যাক)",
    sub_upvc_sliding: "2T / 2.5T / 3T (60-112mm + কাস্টম) ও GI স্টিল",
    mod_upvc_fixed: "uPVC ফিক্সড / ভেন্টিলেটর",
    sub_upvc_fixed: "ফিক্সড গ্লাস (-7mm) ও +6mm ওয়েল্ডিং কাটিং",
    mod_glass_opt: "গ্লাস 4'x8' অপ্টিমাইজার",
    sub_glass_opt: "কম ওয়েস্টেজ গ্লাস শিট চার্ট ও PDF",
    mod_order_tracker: "অর্ডার ট্র্যাকার",
    sub_order_tracker: "কাজের ও ডেলিভারি স্ট্যাটাস",
    euro_settings_title: "ইউরো গ্রুভ সেটিংস (mm)",
    lbl_outer_b: "আউটার বক্স B:",
    lbl_mullion_b: "মুলিয়ান B:",
    lbl_overlap: "ওভারল্যাপ (8+8):",
    lbl_z_glass: "Z-পাল্লা গ্লাস (-):",
    lbl_fix_glass: "ফিক্সড গ্লাস (-):",
    lbl_french_mode: "ফ্রেঞ্চ উইন্ডো (ফ্লাইং মুলিয়ান, 4mm গ্যাপ)",
    lbl_input_unit: "মাপের ইউনিট:",
    lbl_upvc_profile: "uPVC কেসমেন্ট প্রোফাইল:",
    lbl_total_h: "মোট উচ্চতা (H):",
    lbl_total_w: "মোট চওড়া (W):",
    lbl_top_cols: "উপরে মোট ভাগ:",
    lbl_top_open: "উপরে খোলা পাল্লা:",
    lbl_bot_h: "নিচের উচ্চতা (0=নেই):",
    lbl_bot_cols_open: "নিচে ভাগ / খোলা:",
    lbl_room_loc: "রুম / জায়গার নাম:",
    lbl_qty: "সংখ্যা (পিস):",
    lbl_profile_ded: "প্রোফাইল মাইনাস (যেকোনো ব্র্যান্ড)",
    btn_save_profile: "প্রোফাইল সেভ করুন",
    lbl_weld_add: "ওয়েল্ড (+):",
    lbl_gi_minus: "GI স্টিল (-):",
    btn_clear: "ক্লিয়ার",
    btn_calc_upvc: "+ uPVC হিসাব করুন",
    btn_calc_sliding: "+ স্লাইডিং হিসাব করুন",
    btn_cut_pdf: "কাটিং PDF",
    btn_glass_pdf: "গ্লাস PDF",
    lbl_upvc_track: "uPVC ট্র্যাক ও পাল্লা:",
    lbl_upvc_series: "uPVC সিরিজ / ব্র্যান্ড:",
    lbl_sash_h_minus: "পাল্লা H মাইনাস:",
    lbl_sash_face_mm: "সাশ ফেস (mm):",
    lbl_bead_h: "বিট হাইট (mm):",
    lbl_g_clear: "ক্লিয়ারেন্স (-):",
    lbl_frame_face_f: "ফ্রেম ফেস F:",
    lbl_sash_face_s: "পাল্লা ফেস S:",
    lbl_sash_h_engage: "উপর-নিচ ওভারল্যাপ (+):",
    opt_2t_2s: "2-ট্র্যাক (2 পাল্লা গ্লাস)",
    opt_2t_4s: "2-ট্র্যাক (4 পাল্লা গ্লাস)",
    opt_25t_2g1m: "2.5-ট্র্যাক (2 গ্লাস + 1 জালি)",
    opt_3t_2g1m: "3-ট্র্যাক (2 গ্লাস + 1 জালি)",
    opt_3t_3s: "3-ট্র্যাক (3 পাল্লা গ্লাস)",
    opt_3t_4g2m: "3-ট্র্যাক (4 গ্লাস + 2 জালি)",
    mod_upvc_door: "uPVC দরজা (সিঙ্গেল / ডাবল)",
    sub_upvc_door: "বটম ছাড়া / বটম সহ • +3/+6mm ওয়েল্ড ও GI",
    lbl_upvc_door_type: "দরজার ধরন:",
    opt_ud_single_nobot: "সিঙ্গেল দরজা (নিচে ফ্রেম ছাড়া)",
    opt_ud_single_bot: "সিঙ্গেল দরজা (নিচে ফ্রেম সহ)",
    opt_ud_double_nobot: "ডাবল / ফ্রেঞ্চ দরজা (বটম ছাড়া)",
    opt_ud_double_bot: "ডাবল / ফ্রেঞ্চ দরজা (বটম সহ)",
    btn_calc_door: "+ দরজার হিসাব করুন",
    res_upvc_door_cut: "uPVC দরজা কাটিং ও GI স্টিল লিস্ট",
    q_upvc_spec_title: "uPVC স্পেসিফিকেশন (GI ও হার্ডওয়্যার)",
    q_lbl_gi_steel: "GI স্টিল থিকনেস:",
    q_lbl_hardware: "uPVC হার্ডওয়্যার:",
    q_lbl_item_note: "অতিরিক্ত নোট (অপশনাল):",
    q_comm_title: "জিএসটি, ফিটিং ও কোটেশন শর্তাবলী",
    q_lbl_gst_mode: "GST ধরন:",
    q_lbl_install_rate: "ফিটিং চার্জ (টাকা/Sq.Ft):",
    q_lbl_disc_rs: "ডিসকাউন্ট (টাকা):",
    q_lbl_validity: "বৈধতা (দিন):",
    q_lbl_delivery: "ডেলিভারি (দিন):",
    btn_save_rec: "রেকর্ড সেভ করুন",
    btn_upvc_order_pdf: "3. uPVC অর্ডার PDF",
    btn_hw_pdf: "4. হার্ডওয়্যার PDF",
    badge_upvc_bar_opt: "5.95m / 19.5' uPVC অপ্টিমাইজার",
    mod_upvc_bar_opt: "uPVC প্রোফাইল কাটিং (5.95m / 19.5')",
    sub_upvc_bar_opt: "কম ওয়েস্টেজ 5.95m uPVC ও 6m GI বার কাটিং ড্রয়িং, কার্ফ লস ও PDF",
    lbl_upvc_color: "uPVC প্রোফাইল রঙ:",
    lbl_glass_grade: "গ্লাস গ্রেড (টাফেনড / নরমাল):",
    lbl_glass_spec: "গ্লাস থিকনেস ও ধরন:",
    lbl_live_upvc_cad: "লাইভ uPVC CAD ডিজাইন (ভেতর থেকে)",
    btn_zoom_cad: "বড় করে দেখুন",
    cad_ready_designs: "ইন্টারেক্টিভ CAD ডিজাইনার",
    cad_btn_merge: "একসাথে জুড়ুন",
    cad_btn_undo: "আগের ধাপ",
    cad_btn_reset: "রিসেট",
    cad_btn_split_lr: "ডান/বাম ভাগ",
    cad_btn_split_tb: "উপর/নিচ ভাগ",
    cad_btn_exact: "সঠিক মাপ দিন",
    lbl_frame_w_minus: "ফ্রেম W মাইনাস:",
    lbl_ilock_add: "ইন্টারলক (+):",
    lbl_glass_minus: "গ্লাস মাইনাস:",
    res_upvc_casement_cut: "uPVC কেসমেন্ট কাটিং ও GI স্টিল লিস্ট",
    res_upvc_sliding_cut: "uPVC স্লাইডিং কাটিং ও GI স্টিল লিস্ট",
    res_upvc_mat: "uPVC প্রোফাইল ও GI স্টিল সামারি",
    lbl_door_palla: "দরজার পাল্লা / শাটার:",
    lbl_room_tag: "রুম / লোকেশন ট্যাগ:",
    keypad_title: "স্মার্ট মেজারমেন্ট কীপ্যাড",
    keypad_ok: "ঠিক আছে (OK)",
    keypad_numbers: "সংখ্যা",
    keypad_fractions: "সুতা / ভগ্নাংশ",
    suta_1: "১ সুতা (1/8)",
    suta_2: "২ সুতা (1/4)",
    suta_3: "৩ সুতা (3/8)",
    suta_4: "৪ সুতা (1/2)",
    suta_5: "৫ সুতা (5/8)",
    suta_6: "৬ সুতা (3/4)",
    suta_7: "৭ সুতা (7/8)",
    suta_half: "আধ সুতা (1/16)" 
  },
  hi: {
    title_app: "स्मार्ट वर्कर प्रो",
    lbl_quick_lang: "भाषा:",
    nav_home: "होम",
    nav_dashboard: "डैशबोर्ड",
    nav_records: "रिकॉर्ड्स",
    nav_profile: "प्रोफ़ाइल",
    nav_login: "लॉगिन",
    welcome_prefix: "स्वागत है,",
    sec_fab_systems: "खिड़की और दरवाज़ा सिस्टम",
    sec_business_billing: "बिज़नेस और बिलिंग",
    mod_khata_title: "साइट मेज़रमेंट खाता",
    mod_khata_sub: "डिजिटल खाता: रूम ट्रैकिंग, ऑटो लेबर और बिलिंग",
    mod_domal: "यूरो सीरीज़",
    mod_sliding: "स्लाइडिंग विंडो",
    mod_casement: "कस्टम केसमेंट",
    mod_partition: "पार्टीशन और डोर",
    mod_door: "सिंपल डोर ऑप्शन",
    mod_quotation: "प्रो कोटेशन / बिल",
    mod_ceiling: "सीलिंग एस्टीमेटर",
    mod_customer_khata: "कस्टमर खाता",
    mod_calculator: "स्मार्ट कैलकुलेटर",
    btn_open: "खोलें",
    btn_edit: "एडिट",
    sub_domal: "27x65 / 35x75 / 45mm यूरो सेक्शन",
    sub_sliding: "2, 3, 4 ट्रैक और इंटरलॉक कटिंग",
    sub_casement: "Z-सेक्शन और ओपनेबल विंडो",
    sub_partition: "ऑफिस पार्टीशन और शीट कटिंग",
    sub_door: "हिंज डोर और बाथरूम शटर",
    sub_ceiling: "फॉल्स सीलिंग ग्रिड और पेरीमीटर",
    sub_quotation: "क्लाइंट GST इनवॉइस और PDF बिल",
    sub_customer_khata: "कस्टमर बकाया और हिसाब",
    sub_calculator: "तुरंत इंच और Sq.Ft कैलकुलेशन",
    tab_aluminium: "एल्युमिनियम",
    tab_upvc: "यूपीवीसी (uPVC)",
    upvc_hub_title: "uPVC फैब्रिकेशन हब",
    upvc_hub_sub: "सभी ट्रैक और Z-सीरीज़ • ऑटो +6mm वेल्ड • GI स्टील",
    upvc_badge_any: "कोई भी ब्रांड",
    upvc_badge_weld_gi: "वेल्डिंग + GI स्टील",
    sec_upvc_systems: "uPVC खिड़की और दरवाज़ा कटिंग",
    sec_shared_tools: "वर्कशॉप और बिलिंग टूल्स",
    mod_upvc_casement: "uPVC केसमेंट और फ्रेंच",
    sub_upvc_casement: "60/65/70mm + कस्टम Z, +6mm वेल्ड और GI स्टील",
    mod_upvc_sliding: "uPVC स्लाइडिंग (सभी ट्रैक)",
    sub_upvc_sliding: "2T / 2.5T / 3T (60-112mm + कस्टम) और GI स्टील",
    mod_upvc_fixed: "uPVC फिक्स्ड / वेंटिलेटर",
    sub_upvc_fixed: "फिक्स्ड ग्लास (-7mm) और +6mm वेल्डिंग कट",
    mod_glass_opt: "ग्लास 4'x8' ऑप्टिमाइज़र",
    sub_glass_opt: "कम वेस्टेज ग्लास शीट चार्ट और PDF",
    mod_order_tracker: "ऑर्डर ट्रैकर",
    sub_order_tracker: "लाइव काम और डिलीवरी स्टेटस",
    euro_settings_title: "यूरो ग्रूव सेटिंग्स (mm)",
    lbl_outer_b: "आउटर बॉक्स B:",
    lbl_mullion_b: "मुलियन B:",
    lbl_overlap: "ओवरलैप (8+8):",
    lbl_z_glass: "Z-पल्ला ग्लास (-):",
    lbl_fix_glass: "फिक्स्ड ग्लास (-):",
    lbl_french_mode: "फ्रेंच विंडो (फ्लाइंग मुलियन, 4mm गैप)",
    lbl_input_unit: "माप की यूनिट:",
    lbl_upvc_profile: "uPVC केसमेंट प्रोफाइल:",
    lbl_total_h: "कुल ऊँचाई (H):",
    lbl_total_w: "कुल चौड़ाई (W):",
    lbl_top_cols: "ऊपर कुल भाग:",
    lbl_top_open: "ऊपर खुलने वाले पल्ले:",
    lbl_bot_h: "नीचे की ऊँचाई (0=नहीं):",
    lbl_bot_cols_open: "नीचे भाग / खुले:",
    lbl_room_loc: "कमरा / लोकेशन:",
    lbl_qty: "संख्या (पीस):",
    lbl_profile_ded: "प्रोफाइल माइनस (कोई भी ब्रांड)",
    btn_save_profile: "प्रोफाइल सेव करें",
    lbl_weld_add: "वेल्ड (+):",
    lbl_gi_minus: "GI स्टील (-):",
    btn_clear: "क्लियर",
    btn_calc_upvc: "+ uPVC हिसाब करें",
    btn_calc_sliding: "+ स्लाइडिंग हिसाब करें",
    btn_cut_pdf: "कटिंग PDF",
    btn_glass_pdf: "ग्लास PDF",
    lbl_upvc_track: "uPVC ट्रैक और पल्ला:",
    lbl_upvc_series: "uPVC सीरीज़ / ब्रांड:",
    lbl_sash_h_minus: "पल्ला H माइनस:",
    lbl_sash_face_mm: "सैश फेस (mm):",
    lbl_bead_h: "बीड हाइट (mm):",
    lbl_g_clear: "क्लियरेंस (-):",
    lbl_frame_face_f: "फ्रेम फेस F:",
    lbl_sash_face_s: "पल्ला फेस S:",
    lbl_sash_h_engage: "ऊपर-नीचे ओवरलैप (+):",
    opt_2t_2s: "2-ट्रैक (2 पल्ला ग्लास)",
    opt_2t_4s: "2-ट्रैक (4 पल्ला ग्लास)",
    opt_25t_2g1m: "2.5-ट्रैक (2 ग्लास + 1 जाली)",
    opt_3t_2g1m: "3-ट्रैक (2 ग्लास + 1 जाली)",
    opt_3t_3s: "3-ट्रैक (3 पल्ला ग्लास)",
    opt_3t_4g2m: "3-ट्रैक (4 ग्लास + 2 जाली)",
    mod_upvc_door: "uPVC दरवाज़ा (सिंगल / डबल)",
    sub_upvc_door: "बिना बॉटम / बॉटम सहित • +3/+6mm वेल्ड और GI",
    lbl_upvc_door_type: "दरवाज़े का प्रकार:",
    opt_ud_single_nobot: "सिंगल डोर (बिना बॉटम फ्रेम)",
    opt_ud_single_bot: "सिंगल डोर (बॉटम फ्रेम सहित)",
    opt_ud_double_nobot: "डबल / फ्रेंच डोर (बिना बॉटम)",
    opt_ud_double_bot: "डबल / फ्रेंच डोर (बॉटम सहित)",
    btn_calc_door: "+ दरवाज़ा हिसाब करें",
    res_upvc_door_cut: "uPVC दरवाज़ा कटिंग और GI स्टील लिस्ट",
    q_upvc_spec_title: "uPVC स्पेसिफिकेशन (GI और हार्डवेयर)",
    q_lbl_gi_steel: "GI स्टील थिकनेस:",
    q_lbl_hardware: "uPVC हार्डवेयर:",
    q_lbl_item_note: "एक्स्ट्रा आइटम नोट (ऑप्शनल):",
    q_comm_title: "जीएसटी, इंस्टॉलेशन और शर्तें",
    q_lbl_gst_mode: "GST प्रकार:",
    q_lbl_install_rate: "इंस्टॉलेशन (₹/Sq.Ft):",
    q_lbl_disc_rs: "डिस्काउंट (₹):",
    q_lbl_validity: "वैलिडिटी (दिन):",
    q_lbl_delivery: "डिलीवरी (दिन):",
    btn_save_rec: "रिकॉर्ड सेव करें",
    btn_upvc_order_pdf: "3. uPVC ऑर्डर PDF",
    btn_hw_pdf: "4. हार्डवेयर PDF",
    badge_upvc_bar_opt: "5.95m / 19.5' uPVC ऑप्टिमाइज़र",
    mod_upvc_bar_opt: "uPVC प्रोफाइल कटिंग (5.95m / 19.5')",
    sub_upvc_bar_opt: "कम वेस्टेज 5.95m uPVC और 6m GI बार कटिंग ड्राइंग, कर्फ लॉस और PDF",
    lbl_upvc_color: "uPVC प्रोफाइल कलर:",
    lbl_glass_grade: "ग्लास ग्रेड (टफन्ड / नॉर्मल):",
    lbl_glass_spec: "ग्लास थिकनेस और टाइप:",
    lbl_live_upvc_cad: "लाइव uPVC CAD डिज़ाइन (अंदर से)",
    btn_zoom_cad: "ज़ूम देखें",
    cad_ready_designs: "इंटरैक्टिव CAD डिज़ाइनर",
    cad_btn_merge: "मर्ज करें",
    cad_btn_undo: "पीछे जाएं",
    cad_btn_reset: "रीसेट",
    cad_btn_split_lr: "दाएं/बाएं भाग",
    cad_btn_split_tb: "ऊपर/नीचे भाग",
    cad_btn_exact: "सही माप डालें",
    lbl_frame_w_minus: "फ्रेम W माइनस:",
    lbl_ilock_add: "इंटरलॉक (+):",
    lbl_glass_minus: "ग्लास माइनस:",
    res_upvc_casement_cut: "uPVC केसमेंट कटिंग और GI स्टील लिस्ट",
    res_upvc_sliding_cut: "uPVC स्लाइडिंग कटिंग और GI स्टील लिस्ट",
    res_upvc_mat: "uPVC प्रोफाइल और GI स्टील समरी",
    lbl_door_palla: "दरवाज़ा पल्ला / शटर:",
    lbl_room_tag: "कमरा / लोकेशन टैग:",
    keypad_title: "स्मार्ट मेज़रमेंट कीपैड",
    keypad_ok: "ठीक है (OK)",
    keypad_numbers: "नंबर",
    keypad_fractions: "सूत / फ्रैक्शन",
    suta_1: "1 सूत (1/8)",
    suta_2: "2 सूत (1/4)",
    suta_3: "3 सूत (3/8)",
    suta_4: "4 सूत (1/2)",
    suta_5: "5 सूत (5/8)",
    suta_6: "6 सूत (3/4)",
    suta_7: "7 सूत (7/8)",
    suta_half: "आधा सूत (1/16)" 
  }
};

// Layer 2: Comprehensive 260+ Phrase Map covering ALL 24 Screens (Bengali & Hindi)
const SW_UI_PHRASES = {
  // Navigation, Auth & Profile
  "SMART WORKER PRO": { bn: "স্মার্ট ওয়ার্কার প্রো", hi: "स्मार्ट वर्कर प्रो" },
  "Register Workshop": { bn: "ওয়ার্কশপ রেজিস্টার করুন", hi: "वर्कशॉप रजिस्टर करें" },
  "Sign In": { bn: "সাইন ইন", hi: "साइन इन" },
  "SIGN IN TO WORKSHOP": { bn: "ওয়ার্কশপে সাইন ইন করুন", hi: "वर्कशॉप में साइन इन करें" },
  "CREATE WORKSHOP ACCOUNT": { bn: "ওয়ার্কশপ অ্যাকাউন্ট তৈরি করুন", hi: "वर्कशॉप अकाउंट बनाएं" },
  "Forgot Password?": { bn: "পাসওয়ার্ড ভুলে গেছেন?", hi: "पासवर्ड भूल गए?" },
  "Continue as Demo / Guest Mode →": { bn: "ডেমো / গেস্ট মোডে চালান →", hi: "डेमो / गेस्ट मोड में चलाएं →" },
  "Mobile Number / Email": { bn: "মোবাইল নম্বর / ইমেইল", hi: "मोबाइल नंबर / ईमेल" },
  "Password": { bn: "পাসওয়ার্ড", hi: "पासवर्ड" },
  "Full Name": { bn: "পুরো নাম", hi: "पूरा नाम" },
  "Workshop Name": { bn: "ওয়ার্কশপের নাম", hi: "वर्कशॉप का नाम" },
  "Manage Google Cloud Sync": { bn: "গুগল ক্লাউড সিঙ্ক পরিচালনা করুন", hi: "गूगल क्लाउड सिंक मैनेज करें" },
  "App Language / Language": { bn: "অ্যাপের ভাষা (Language)", hi: "ऐप की भाषा (Language)" },
  "Workshop Profile & Branding": { bn: "ওয়ার্কশপ প্রোফাইল ও ব্র্যান্ডিং", hi: "वर्कशॉप प्रोफ़ाइल और ब्रांडिंग" },
  "Dynamic Costing & Bill Rates": { bn: "রেট ও বিলিং সেটিংস", hi: "रेट और बिलिंग सेटिंग्स" },
  "PRO Upgrade & Activation": { bn: "প্রো আপগ্রেড ও অ্যাক্টিভেশন", hi: "प्रो अपग्रेड और एक्टिवेशन" },
  "Save Profile": { bn: "প্রোফাইল সেভ করুন", hi: "प्रोफ़ाइल सेव करें" },
  "Save Settings": { bn: "সেটিংস সেভ করুন", hi: "सेटिंग्स सेव करें" },
  "Logout": { bn: "লগআউট", hi: "लॉगआउट" },

  // Home Cards & Modules
  "Glass Cutting (4'x8' Sheet Chart)": { bn: "গ্লাস কাটিং (4'x8' শিট চার্ট)", hi: "ग्लास कटिंग (4'x8' शीट चार्ट)" },
  "Enter Glass Sizes -> Auto 4'x8' Min-Waste Cutting Drawing & PDF": { bn: "গ্লাসের মাপ দিন -> অটো 4'x8' কাটিং ড্রয়িং ও PDF", hi: "ग्लास साइज डालें -> ऑटो 4'x8' कटिंग ड्राइंग और PDF" },
  "Alu Bar / Pipe Cutting (12' & 16')": { bn: "পাইপ / বার কাটিং (12' ও 16')", hi: "पाइप / बार कटिंग (12' और 16')" },
  "Min-Waste 12ft / 16ft Pipe Cutting Drawing, Kerf Loss & PDF": { bn: "কম ওয়েস্টেজ 12'/16' পাইপ কাটিং ও PDF", hi: "कम वेस्टेज 12'/16' पाइप कटिंग और PDF" },
  "Profit & Attendance": { bn: "লাভ ও হাজিরা খাতা", hi: "मुनाफा और हाज़िरी" },
  "Worker Hazira & Net Profit": { bn: "মিস্ত্রি হাজিরা ও মোট লাভ", hi: "कारीगर हाज़िरी और नेट प्रॉफ़िट" },
  "Order Tracker": { bn: "অর্ডার ট্র্যাকার", hi: "ऑर्डर ट्रैकर" },
  "Wastage / Offcut Stock": { bn: "ছাঁট / ওয়েস্টেজ স্টক", hi: "वेस्टेज / ऑफकट स्टॉक" },
  "Dashboard": { bn: "ড্যাশবোর্ড", hi: "डैशबोर्ड" },
  "Records": { bn: "রেকর্ডস", hi: "रिकॉर्ड्स" },
  "History": { bn: "হিস্ট্রি", hi: "हिस्ट्री" },
  "Profile": { bn: "প্রোফাইল", hi: "प्रोफ़ाइल" },
  "Settings": { bn: "সেটিংস", hi: "सेटिंग्स" },

  // Common Form Labels & Buttons (All Fabrication Screens)
  "Input Unit:": { bn: "মাপের একক (Unit):", hi: "माप की इकाई (Unit):" },
  "System Size:": { bn: "সিস্টেম সাইজ:", hi: "सिस्टम साइज:" },
  "Track Type:": { bn: "ট্র্যাকের ধরন:", hi: "ट्रैक टाइप:" },
  "Track Height:": { bn: "ট্র্যাক হাইট:", hi: "ट्रैक हाइट:" },
  "Track & Sash Type:": { bn: "ট্র্যাক ও শাটার ধরন:", hi: "ट्रैक और शटर टाइप:" },
  "Handle (HxW):": { bn: "হ্যান্ডেল (HxW):", hi: "हैंडल (HxW):" },
  "Height:": { bn: "উচ্চতা (Height):", hi: "ऊंचाई (Height):" },
  "Width:": { bn: "চওড়া (Width):", hi: "चौड़ाई (Width):" },
  "Height (Inches):": { bn: "উচ্চতা (ইঞ্চি):", hi: "ऊंचाई (इंच):" },
  "Width (Inches):": { bn: "চওড়া (ইঞ্চি):", hi: "चौड़ाई (इंच):" },
  "Total Height (H):": { bn: "মোট উচ্চতা (H):", hi: "कुल ऊंचाई (H):" },
  "Total Width (W):": { bn: "মোট চওড়া (W):", hi: "कुल चौड़ाई (W):" },
  "Total Wall Height (H):": { bn: "দেয়ালের মোট উচ্চতা (H):", hi: "दीवार की कुल ऊंचाई (H):" },
  "Total Wall Width (W):": { bn: "দেয়ালের মোট চওড়া (W):", hi: "दीवार की कुल चौड़ाई (W):" },
  "Glass Height (H):": { bn: "গ্লাসের উচ্চতা (H):", hi: "ग्लास की ऊंचाई (H):" },
  "Glass Width (W):": { bn: "গ্লাসের চওড়া (W):", hi: "ग्लास की चौड़ाई (W):" },
  "Room / Location Tag:": { bn: "রুম / জায়গার নাম:", hi: "रूम / लोकेशन का नाम:" },
  "Window Quantity (Pcs):": { bn: "জানালার সংখ্যা (পিস):", hi: "खिड़की की संख्या (पीस):" },
  "Quantity (Pcs):": { bn: "পরিমাণ (পিস):", hi: "मात्रा (पीस):" },
  "Alu Color:": { bn: "অ্যালুমিনিয়াম কালার:", hi: "एल्युमिनियम कलर:" },
  "Alu Thick (0.8 - 3mm):": { bn: "অ্যালুমিনিয়াম গেজ (mm):", hi: "एल्युमिनियम गेज (mm):" },
  "Glass Type:": { bn: "গ্লাসের ধরন:", hi: "ग्लास टाइप:" },
  "Thickness (3.5 - 12mm):": { bn: "গ্লাসের পুরুত্ব (mm):", hi: "ग्लास की मोटाई (mm):" },
  "Tube / Section Size:": { bn: "টিউব / সেকশন সাইজ:", hi: "ट्यूब / सेक्शन साइज:" },
  "Door Type:": { bn: "দরজার ধরন:", hi: "दरवाज़े का प्रकार:" },
  "Door Shutter (Palla):": { bn: "দরজার পাল্লা:", hi: "दरवाज़े का पल्ला:" },
  "Vertical Stile:": { bn: "লম্বা স্টাইল:", hi: "वर्टिकल स्टाइल:" },
  "Top Rail:": { bn: "টপ রেল:", hi: "टॉप रेल:" },
  "Bottom Rail:": { bn: "বটম রেল:", hi: "बॉटम रेल:" },
  "Mid Rail Section (In):": { bn: "মিডিল রেল (ইঞ্চি):", hi: "मिडिल रेल (इंच):" },
  "Door Divisions (Parts / Rows):": { bn: "দরজার ভাগ (পার্ট সংখ্যা):", hi: "दरवाज़े के भाग (पार्ट्स):" },
  "LIVE COLOR & GLASS PREVIEW": { bn: "লাইভ কালার ও গ্লাস প্রিভিউ", hi: "लाइव कलर और ग्लास प्रीव्यू" },
  "Full-Screen View": { bn: "ফুল-স্ক্রিন দেখুন", hi: "फुल-स्क्रीन देखें" },
  "Full-Screen": { bn: "ফুল-স্ক্রিন", hi: "फुल-स्क्रीन" },
  "CLEAR": { bn: "মুছুন", hi: "क्लियर" },
  "CALCULATE": { bn: "হিসাব করুন", hi: "कैलकुलेट करें" },
  "+ CALCULATE": { bn: "+ হিসাব করুন", hi: "+ कैलकुलेट करें" },
  "SAVE": { bn: "সেভ করুন", hi: "सेव करें" },
  "UNDO": { bn: "আগের ধাপ", hi: "अंडू (Undo)" },
  "Reset": { bn: "রিসেট", hi: "रीसेट" },
  "+ ADD TO BILL": { bn: "+ বিলে যোগ করুন", hi: "+ बिल में जोड़ें" },
  "1. CUTTING PDF": { bn: "1. কাটিং PDF", hi: "1. कटिंग PDF" },
  "2. GLASS PDF + QR": { bn: "2. গ্লাস PDF", hi: "2. ग्लास PDF" },
  "3. ALU PURCHASE": { bn: "3. মাল কেনার লিস্ট", hi: "3. माल खरीद लिस्ट" },
  "4. HARDWARE PDF": { bn: "4. হার্ডওয়্যার PDF", hi: "4. हार्डवेयर PDF" },
  "CUTTING SIZES:": { bn: "কাটিং সাইজ লিস্ট:", hi: "कटिंग साइज लिस्ट:" },
  "MATERIAL PURCHASE LIST:": { bn: "মাল কেনার তালিকা:", hi: "मटेरियल खरीद लिस्ट:" },

  // Partition CAD & Custom Door
  "SELECT WORK MODE (SINGLE OR COMBINED):": { bn: "কাজের ধরন বেছে নিন (আলাদা বা একসঙ্গে):", hi: "काम का मोड चुनें (अकेले या एक साथ):" },
  "1. Only Partition": { bn: "1. শুধু পার্টিশন", hi: "1. केवल पार्टीशन" },
  "2. Partition + Door": { bn: "2. পার্টিশন + দরজা", hi: "2. पार्टीशन + डोर" },
  "3. Partition + Window": { bn: "3. পার্টিশন + জানালা", hi: "3. पार्टीशन + विंडो" },
  "4. All 3 (Pt + Door + Win)": { bn: "4. তিনটিই একসঙ্গে", hi: "4. तीनों एक साथ" },
  "ATTACHED DOOR SYSTEM:": { bn: "যুক্ত দরজার সিস্টেম:", hi: "जुड़ा हुआ डोर सिस्टम:" },
  "ATTACHED WINDOW SYSTEM:": { bn: "যুক্ত জানালার সিস্টেম:", hi: "जुड़ा हुआ विंडो सिस्टम:" },
  "OUTER FRAME PIPES (TAP TO ON / OFF):": { bn: "আউটার ফ্রেম পাইপ (ট্যাপ করে ON/OFF):", hi: "आउटर फ्रेम पाइप (टैप करके ON/OFF):" },
  "QUICK READY DESIGNS (OR TAP 'CUSTOM DESIGN'):": { bn: "রেডি ডিজাইন (অথবা কাস্টম ডিজাইন):", hi: "रेडी डिज़ाइन (या कस्टम डिज़ाइन):" },
  "Full Partition": { bn: "ফুল পার্টিশন", hi: "फुल पार्टीशन" },
  "Middle Door": { bn: "মাঝে দরজা", hi: "बीच में दरवाज़ा" },
  "Door + Win": { bn: "দরজা + জানালা", hi: "डोर + विंडो" },
  "Half Wall+Win": { bn: "হাফ ওয়াল + জানালা", hi: "हाफ वॉल + विंडो" },
  "Door+HalfWall": { bn: "দরজা + হাফ ওয়াল", hi: "डोर + हाफ वॉल" },
  "Double Door": { bn: "ডাবল দরজা", hi: "डबल डोर" },
  "Custom Design (Blank)": { bn: "কাস্টম ডিজাইন (খালি)", hi: "कस्टम डिज़ाइन (खाली)" },
  "Split Left/Right": { bn: "ডান-বাঁ ভাগ করুন", hi: "दाएं-बाएं बांटें" },
  "Split Top/Bot": { bn: "ওপর-নিচ ভাগ করুন", hi: "ऊपर-नीचे बांटें" },
  "Set Exact Size": { bn: "সঠিক মাপ দিন", hi: "सटीक साइज डालें" },
  "Group = Door": { bn: "গ্রুপ = দরজা", hi: "ग्रुप = डोर" },
  "Merge": { bn: "জুড়ে দিন", hi: "जोड़ें (Merge)" },
  "PUT INSIDE SELECTED BOX:": { bn: "সিলেক্ট করা বক্সে বসান:", hi: "चुने हुए बॉक्स में लगाएं:" },
  "Glass": { bn: "গ্লাস", hi: "ग्लास" },
  "ACP Board": { bn: "ACP বোর্ড", hi: "ACP बोर्ड" },
  "Jali / Mesh": { bn: "জালি / নেট", hi: "जाली / मेश" },
  "Single Door": { bn: "সিঙ্গেল দরজা", hi: "सिंगल डोर" },
  "Half Wall": { bn: "হাফ ওয়াল", hi: "हाफ वॉल" },
  "2T Sliding": { bn: "2-ট্র্যাক স্লাইডিং", hi: "2-ट्रैक स्लाइडिंग" },
  "3T Slide+Jali": { bn: "3-ট্র্যাক + জালি", hi: "3-ट्रैक + जाली" },
  "Open Window": { bn: "ওপেন জানালা", hi: "ओपन विंडो" },
  "CUSTOM DOOR DESIGN (1–4 PARTS):": { bn: "কাস্টম দরজা ডিজাইন (1–4 ভাগ):", hi: "कस्टम डोर डिज़ाइन (1–4 भाग):" },
  "1 Part": { bn: "1 ভাগ", hi: "1 भाग" },
  "2 Parts": { bn: "2 ভাগ", hi: "2 भाग" },
  "3 Parts": { bn: "3 ভাগ", hi: "3 भाग" },
  "4 Parts": { bn: "4 ভাগ", hi: "4 भाग" },
  "Full Glass": { bn: "পুরোটাই গ্লাস", hi: "पूरा ग्लास" },
  "Full Jali": { bn: "পুরোটাই জালি", hi: "पूरी जाली" },
  "Full ACP": { bn: "পুরোটাই ACP", hi: "पूरा ACP" },

  // Glass Cutting, Stock Management & Stickers
  "4'x8' GLASS SHEET CUTTING MASTER": { bn: "4'x8' গ্লাস শিট কাটিং মাস্টার", hi: "4'x8' ग्लास शीट कटिंग मास्टर" },
  "4-DIGIT ORDER CODE & WHATSAPP SHARE (NO QR)": { bn: "4-সংখ্যার অর্ডার কোড ও হোয়াটসঅ্যাপ শেয়ার", hi: "4-अंकीय ऑर्डर कोड और व्हाट्सएप शेयर" },
  "ENTER 4-DIGIT CODE": { bn: "4-সংখ্যার কোড দিন", hi: "4-अंकीय कोड डालें" },
  "SEND TO CUTTER": { bn: "কাটারকে পাঠান", hi: "कटर को भेजें" },
  "Stock Sheet Size:": { bn: "স্টক শিটের মাপ:", hi: "स्टॉक शीट साइज:" },
  "1. SHEET DRAWING PDF": { bn: "1. শিট ড্রয়িং PDF", hi: "1. शीट ड्राइंग PDF" },
  "2. GLASS CUTTING LIST PDF": { bn: "2. গ্লাস কাটিং লিস্ট PDF", hi: "2. ग्लास कटिंग लिस्ट PDF" },
  "3. PRINT CUT GLASS STICKERS PDF (1 STICKER PER GLASS PIECE)": { bn: "3. কাট গ্লাস স্টিকার PDF (প্রতি পিসে 1 স্টিকার)", hi: "3. कट ग्लास स्टिकर PDF (हर पीस पर 1 स्टिकर)" },
  "4. 58MM THERMAL / BLUETOOTH STICKERS (1-CLICK)": { bn: "4. 58মিমি থার্মাল / ব্লুটুথ স্টিকার (1-ক্লিক)", hi: "4. 58mm थर्मल / ब्लूटूथ स्टिकर (1-क्लिक)" },
  "GLASS CUTTING & 4'x8' SHEET SUMMARY:": { bn: "গ্লাস কাটিং ও 4'x8' শিটের হিসাব:", hi: "ग्लास कटिंग और 4'x8' शीट सारांश:" },
  "GLASS STOCK MANAGEMENT (NO QR)": { bn: "গ্লাস স্টক ম্যানেজমেন্ট", hi: "ग्लास स्टॉक मैनेजमेंट" },
  "Stock Bill PDF": { bn: "স্টক বিল PDF", hi: "स्टॉक बिल PDF" },
  "+ Add New Stock (IN)": { bn: "+ নতুন স্টক যোগ করুন", hi: "+ नया स्टॉक जोड़ें (IN)" },
  "Confirm Cut (Auto-Minus)": { bn: "কাটিং কনফার্ম (অটো-মাইনাস)", hi: "कट कन्फर्म (ऑटो-माइनस)" },
  "GLASS OFFCUTS / CHHAT (≥12\" • NUMBER TAGS)": { bn: "গ্লাস ছাঁট / অফকাট (≥12\" • নম্বর ট্যাগ)", hi: "ग्लास छांट / ऑफकट (≥12\" • नंबर टैग)" },
  "Save Offcuts": { bn: "ছাঁট সেভ করুন", hi: "ऑफकट सेव करें" },
  "Number Stickers": { bn: "নম্বর স্টিকার", hi: "नंबर स्टिकर" },

  // 12'/16' Pipe Bar Cutting & Remnants
  "12' / 16' ALU PIPE CUTTING MASTER": { bn: "12' / 16' অ্যালুমিনিয়াম পাইপ কাটিং মাস্টার", hi: "12' / 16' एल्युमिनियम पाइप कटिंग मास्टर" },
  "1-CLICK IMPORT CUT SIZES FROM CALCULATORS:": { bn: "ক্যালকুলেটর থেকে 1-ক্লিকে মাপ আনুন:", hi: "कैलकुलेटर से 1-क्लिक में साइज लाएं:" },
  "Stock Bar Length:": { bn: "স্টক বারের দৈর্ঘ্য:", hi: "स्टॉक बार की लंबाई:" },
  "Section / Pipe Name:": { bn: "সেকশন / পাইপের নাম:", hi: "सेक्शन / पाइप का नाम:" },
  "Blade Kerf (Cut Loss):": { bn: "ব্লেড কার্ফ (কাট লস):", hi: "ब्लेड कर्फ (कट लॉस):" },
  "Cut Piece Length:": { bn: "কাট পিসের দৈর্ঘ্য:", hi: "कट पीस की लंबाई:" },
  "Piece Tag / Note (Optional):": { bn: "পিসের নাম / নোট (ঐচ্ছিক):", hi: "पीस टैग / नोट (वैकल्पिक):" },
  "+ ADD & OPTIMIZE": { bn: "+ যোগ ও অপ্টিমাইজ করুন", hi: "+ जोड़ें और ऑप्टिमाइज़ करें" },
  "EXPORT 12' / 16' BAR CUTTING DRAWING PDF": { bn: "12' / 16' বার কাটিং ড্রয়িং PDF", hi: "12' / 16' बार कटिंग ड्राइंग PDF" },
  "WORKSHOP REMNANT STOCK (≥12\" ONLY)": { bn: "ওয়ার্কশপ ছাঁট স্টক (শুধু ≥12\")", hi: "वर्कशॉप ऑफकट स्टॉक (केवल ≥12\")" },
  "Auto-Use Stock First": { bn: "আগে স্টক ব্যবহার করুন", hi: "पहले स्टॉक इस्तेमाल करें" },
  "Save Offcuts (≥12\")": { bn: "ছাঁট সেভ করুন (≥12\")", hi: "ऑफकट सेव करें (≥12\")" },
  "Number Tag Stickers PDF": { bn: "নম্বর ট্যাগ স্টিকার PDF", hi: "नंबर टैग स्टिकर PDF" },
  "WORKSHOP / WAREHOUSE STOCK (≥12\")": { bn: "ওয়ার্কশপ / গোডাউন স্টক (≥12\")", hi: "वर्कशॉप / गोदाम स्टॉक (≥12\")" },
  "12' / 16' BAR CUTTING SUMMARY & STOCK LIST:": { bn: "12' / 16' বার কাটিং ও স্টক তালিকা:", hi: "12' / 16' बार कटिंग और स्टॉक लिस्ट:" },

  // Quotation, Customer Book, Profit & Attendance, Settings
  "Customer Details": { bn: "কাস্টমারের বিবরণ", hi: "कस्टमर विवरण" },
  "Customer Name:": { bn: "কাস্টমারের নাম:", hi: "कस्टमर का नाम:" },
  "Mobile Number:": { bn: "মোবাইল নম্বর:", hi: "मोबाइल नंबर:" },
  "Advance Paid:": { bn: "অগ্রিম জমা (Advance):", hi: "एडवांस जमा:" },
  "Balance Due:": { bn: "বাকি টাকা (Balance):", hi: "बकाया राशि (Balance):" },
  "Grand Total:": { bn: "সর্বমোট (Grand Total):", hi: "कुल राशि (Grand Total):" },
  "WORKSHOP PROFIT & WORKER ATTENDANCE": { bn: "ওয়ার্কশপ লাভ ও কর্মী হাজিরা", hi: "वर्कशॉप मुनाफा और कारीगर हाज़िरी" },
  "INCOME": { bn: "আয় (Income)", hi: "आय (Income)" },
  "EXPENSE+WAGE": { bn: "খরচ + মজুরি", hi: "खर्च + मज़दूरी" },
  "NET PROFIT": { bn: "নিট লাভ (Profit)", hi: "नेट प्रॉफ़िट" },
  "1. WORKER ATTENDANCE (HAZIRA)": { bn: "1. কর্মী হাজিরা খাতা", hi: "1. कारीगर हाज़िरी खाता" },
  "2. PROJECT INCOME & EXPENSE ENTRY": { bn: "2. প্রজেক্ট আয় ও খরচের হিসাব", hi: "2. प्रोजेक्ट आय और खर्च एंट्री" },
  "+ SAVE INCOME / EXPENSE ENTRY": { bn: "+ আয় / খরচের এন্ট্রি সেভ করুন", hi: "+ आय / खर्च एंट्री सेव करें" },
  "Present ✓": { bn: "উপস্থিত ✓", hi: "हाज़िर ✓" },
  "Half Day": { bn: "হাফ ডে", hi: "हाफ डे" },
  "Absent ✕": { bn: "অনুপস্থিত ✕", hi: "गैरहाज़िर ✕" },
  "GLASS SETTINGS (ADD CUSTOM GLASS NAMES)": { bn: "গ্লাস সেটিংস (নতুন গ্লাসের নাম যোগ করুন)", hi: "ग्लास सेटिंग्स (नया ग्लास नाम जोड़ें)" },
  "+ Add Glass": { bn: "+ গ্লাস যোগ", hi: "+ ग्लास जोड़ें" },
  "Clear": { bn: "মুছুন", hi: "क्लियर" },
  "+ Add": { bn: "+ যোগ", hi: "+ जोड़ें" },

  // Placeholders
  "Height": { bn: "উচ্চতা", hi: "ऊंचाई" },
  "Width": { bn: "চওড়া", hi: "चौड़ाई" },
  "Length": { bn: "দৈর্ঘ্য", hi: "लंबाई" },
  "e.g. Living Room, Bedroom": { bn: "যেমন: বেডরুম, হল রুম", hi: "जैसे: लिविंग रूम, बेडरूम" },
  "e.g. Main Entrance, Office, Balcony": { bn: "যেমন: মেইন গেট, অফিস, বারান্দা", hi: "जैसे: मेन गेट, ऑफिस, बालकनी" },
  "e.g. Vertical, Top Rail, Transom": { bn: "যেমন: ভার্টিক্যাল, টপ রেল", hi: "जैसे: वर्टिकल, टॉप रेल" },
  "Glass Name (e.g. 5mm Ghosa Kach)": { bn: "গ্লাসের নাম (যেমন: 5মিমি ঘষা কাঁচ)", hi: "ग्लास नाम (जैसे: 5mm घिसा कांच)" },
  "e.g. 5mm Fluted / 8mm Frost": { bn: "যেমন: 5মিমি ফ্লুটেড / 8মিমি ফ্রস্ট", hi: "जैसे: 5mm फ्लूटेड / 8mm फ्रॉस्ट" },
  "Search Tag #...": { bn: "ট্যাগ # খুঁজুন...", hi: "टैग # खोजें..." },
  "Search #101...": { bn: "#101 খুঁজুন...", hi: "#101 खोजें..." },
  "Custom # (Opt)": { bn: "নিজস্ব # (ঐচ্ছিক)", hi: "कस्टम # (वैकल्पिक)" },
  "Worker Name (e.g. Raju)": { bn: "কর্মীর নাম (যেমন: রাজু)", hi: "कारीगर का नाम (जैसे: राजू)" },
  "Project / Material Note": { bn: "প্রজেক্ট বা মালের বিবরণ", hi: "प्रोजेक्ट / मटेरियल नोट" }
};

// Build case-insensitive normalized lookup for instant O(1) matching
const SW_UI_PHRASES_NORM = {};
Object.keys(SW_UI_PHRASES).forEach(function(k) {
  SW_UI_PHRASES_NORM[k.trim().toLowerCase()] = SW_UI_PHRASES[k];
});

let currentAppLang = (function() {
  try {
    var s = localStorage.getItem('sw_lang');
    return (s === 'bn' || s === 'hi' || s === 'en') ? s : 'en';
  } catch (e) { return 'en'; }
})();

var _swI18nApplying = false;
var _swOrigTextMap = (typeof WeakMap !== 'undefined') ? new WeakMap() : null;

function swTranslateString(origStr, lang) {
  if (!origStr || lang === 'en') return origStr;
  var trimmed = origStr.trim();
  if (!trimmed || /^[\d\s.,'"+\-*/%₹$:()x×#|]+$/.test(trimmed)) return origStr;
  var hit = SW_UI_PHRASES_NORM[trimmed.toLowerCase()];
  if (hit && hit[lang]) {
    return origStr.replace(trimmed, hit[lang]);
  }
  return origStr;
}

function swWalkAndTranslateDom(rootEl, lang) {
  if (!rootEl || typeof document === 'undefined') return;
  var skipTags = { SCRIPT: 1, STYLE: 1, SVG: 1, OPTION: 1, TEXTAREA: 1, CODE: 1, PRE: 1 };

  // 1. Translate Placeholders safely with dataset.origPh preservation
  var inputs = rootEl.querySelectorAll ? rootEl.querySelectorAll('input[placeholder], textarea[placeholder]') : [];
  inputs.forEach(function(inp) {
    if (!inp.dataset) return;
    if (!inp.dataset.origPh) inp.dataset.origPh = inp.getAttribute('placeholder') || '';
    var origPh = inp.dataset.origPh;
    inp.setAttribute('placeholder', lang === 'en' ? origPh : swTranslateString(origPh, lang));
  });

  // 2. Walk all text nodes safely (never touching output-area, SVG, scripts, or input values!)
  if (typeof document.createTreeWalker === 'function') {
    var walker = document.createTreeWalker(rootEl, 4 /* NodeFilter.SHOW_TEXT */, null, false);
    var node;
    while ((node = walker.nextNode())) {
      var p = node.parentElement;
      if (!p) continue;
      if (skipTags[p.tagName]) continue;
      if (p.closest && (p.closest('svg') || p.closest('.output-area') || p.closest('[data-i18n]'))) continue;
      var curText = node.nodeValue || '';
      if (!curText.trim()) continue;
      var orig = _swOrigTextMap ? _swOrigTextMap.get(node) : null;
      if (!orig) {
        orig = curText;
        if (_swOrigTextMap) _swOrigTextMap.set(node, orig);
      }
      var target = (lang === 'en') ? orig : swTranslateString(orig, lang);
      if (node.nodeValue !== target) node.nodeValue = target;
    }
  }
}

function changeLanguage(lang) {
  lang = (lang === 'bn' || lang === 'hi') ? lang : 'en';
  currentAppLang = lang;
  try { localStorage.setItem('sw_lang', lang); } catch (e) {}
  const selector = document.getElementById('langSelector');
  if (selector) selector.value = lang;
  applyLanguageTranslations(lang);
}

function applyLanguageTranslations(lang) {
  if (_swI18nApplying) return;
  _swI18nApplying = true;
  try {
    lang = (lang === 'bn' || lang === 'hi' || lang === 'en') ? lang : (currentAppLang || 'en');
    currentAppLang = lang;

    // Update Settings 3-Language buttons & badge
    var badgeNames = { en: 'English', bn: 'বাংলা', hi: 'हिन्दी' };
    ['En', 'Bn', 'Hi'].forEach(function(sfx) {
      var code = sfx.toLowerCase();
      var sBtn = document.getElementById('setLang' + sfx);
      if (sBtn && sBtn.classList) {
        if (code === lang) sBtn.classList.add('active');
        else sBtn.classList.remove('active');
      }
      var hBtn = document.getElementById('homeLang' + sfx);
      if (hBtn && hBtn.style) {
        hBtn.style.background = (code === lang) ? '#0284c7' : 'transparent';
        hBtn.style.color = (code === lang) ? '#ffffff' : '#334155';
      }
    });
    const badge = document.getElementById('currentLangBadge');
    if (badge) badge.textContent = badgeNames[lang] || 'English';

    const d = I18N_DICT[lang] || I18N_DICT['en'];

    const titleElem = document.getElementById('titleText');
    if (titleElem) titleElem.textContent = d.title_app;

    // Section titles translate cleanly via [data-i18n]

    const navItems = document.querySelectorAll('.bottom-nav .nav-item span');
    if (navItems.length >= 4) {
      navItems[0].textContent = d.nav_home;
      navItems[1].textContent = d.nav_dashboard;
      navItems[2].textContent = d.nav_records;
      navItems[3].textContent = d.nav_profile;
    }

    const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
    const greetingElem = document.getElementById('homeGreeting');
    if (greetingElem) {
      let pName = profile.name || "Partner";
      greetingElem.textContent = `${d.welcome_prefix} ${pName}!`;
    }

    // Layer 1: Translate all data-i18n elements (preserving origEn)
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
      const key = el.getAttribute('data-i18n');
      if (el.dataset && !el.dataset.origEn) el.dataset.origEn = el.textContent;
      if (d[key]) el.textContent = d[key];
      else if (lang === 'en' && el.dataset && el.dataset.origEn) el.textContent = el.dataset.origEn;
    });

    // Layer 2: Auto-translate all 24 screens DOM labels, buttons, tabs & placeholders!
    if (document.body) swWalkAndTranslateDom(document.body, lang);

    const selector = document.getElementById('langSelector');
    if (selector) selector.value = lang;
  } finally {
    _swI18nApplying = false;
  }
}

// Auto-apply saved language on load + Safe debounced MutationObserver for dynamic lists!
(function() {
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('DOMContentLoaded', function() {
      applyLanguageTranslations(currentAppLang);
      if (typeof MutationObserver !== 'undefined' && document.body) {
        var _mutTimer = null;
        var obs = new MutationObserver(function() {
          if (_swI18nApplying || currentAppLang === 'en') return;
          if (_mutTimer) clearTimeout(_mutTimer);
          _mutTimer = setTimeout(function() { applyLanguageTranslations(currentAppLang); }, 250);
        });
        obs.observe(document.body, { childList: true, subtree: true });
      }
    });
  }
})();

function updateProfile() {
 const profile = {
 name: document.getElementById('set_name').value.trim(),
 shop_name: document.getElementById('set_shop').value.trim(),
 phone: document.getElementById('set_phone').value.trim(),
 email: document.getElementById('set_email').value.trim(),
 gst: document.getElementById('set_gst').value.trim(),
 address: document.getElementById('set_address').value.trim(),
 bank_name: document.getElementById('set_bank_name') ? document.getElementById('set_bank_name').value.trim() : "",
 bank_holder: document.getElementById('set_bank_holder') ? document.getElementById('set_bank_holder').value.trim() : "",
 bank_acc: document.getElementById('set_bank_acc') ? document.getElementById('set_bank_acc').value.trim() : "",
 bank_ifsc: document.getElementById('set_bank_ifsc') ? document.getElementById('set_bank_ifsc').value.trim() : "",
 bank_branch: document.getElementById('set_bank_branch') ? document.getElementById('set_bank_branch').value.trim() : "",
 upi_id: document.getElementById('set_upi_id') ? document.getElementById('set_upi_id').value.trim() : ""
 };
 if (!profile.name || !profile.shop_name || !profile.phone || !profile.address) {
 alert("Please fill Name, Shop Name, Phone and Address.");
 return;
 }
 localStorage.setItem('sw_profile', JSON.stringify(profile));
 try {
   const users = JSON.parse(localStorage.getItem('sw_registered_users') || '{}');
   const cleanPhone = profile.phone.replace(/\D/g, '');
   if (cleanPhone && users[cleanPhone]) {
     users[cleanPhone] = Object.assign({}, users[cleanPhone], profile);
     localStorage.setItem('sw_registered_users', JSON.stringify(users));
   }
 } catch(e){}
 if (typeof addToOfflineQueue === 'function') addToOfflineQueue('profile', profile);
 if (typeof syncOfflineQueueToCloud === 'function') syncOfflineQueueToCloud();
 if (typeof syncAllDataToCloud === 'function') syncAllDataToCloud();
 loadSavedProfile();
 updateActivationScreenUI();
 alert("Profile, Optional Details, Logo & QR updated successfully on your device!");
 goHome();
 }

 // ==========================================
 // PWA & MANDATORY APP INSTALLATION GATE
 // ==========================================
 let deferredPrompt = null;

 function isPwaAppInstalled() {
   try {
     if (window.matchMedia && (window.matchMedia("(display-mode: standalone)").matches || window.matchMedia("(display-mode: fullscreen)").matches)) {
       localStorage.setItem("sw_pwa_installed", "true");
       return true;
     }
     if (window.navigator && window.navigator.standalone === true) {
       localStorage.setItem("sw_pwa_installed", "true");
       return true;
     }
     if (window.location.search && window.location.search.indexOf("source=pwa") !== -1) {
       localStorage.setItem("sw_pwa_installed", "true");
       return true;
     }
     if (localStorage.getItem("sw_pwa_installed") === "true") {
       return true;
     }
   } catch (e) {}
   return false;
 }

 function checkAndShowMandatoryInstallGate() {
   var gate = document.getElementById("pwaInstallGateOverlay");
   if (!gate) return;
   if (isPwaAppInstalled()) {
     gate.style.display = "none";
   } else {
     gate.style.display = "flex";
   }
 }

 window.addEventListener("beforeinstallprompt", function(e) {
   e.preventDefault();
   deferredPrompt = e;
   window.deferredPwaPrompt = e;
   var installBox = document.getElementById("pwaInstallPrompt");
   if (installBox) installBox.style.display = "flex";
   checkAndShowMandatoryInstallGate();
 });

 window.addEventListener("appinstalled", function() {
   try { localStorage.setItem("sw_pwa_installed", "true"); } catch (e) {}
   deferredPrompt = null;
   completeInstallGateAndLaunchApp();
 });

 function completeInstallGateAndLaunchApp() {
   try { localStorage.setItem("sw_pwa_installed", "true"); } catch (e) {}
   var progBox = document.getElementById("pwaInstallProgressBox");
   var bar = document.getElementById("pwaInstallProgressBar");
   var pctTxt = document.getElementById("pwaInstallPercentText");
   var stTxt = document.getElementById("pwaInstallStatusText");
   var btn = document.getElementById("btnMandatoryInstall");

   if (progBox) progBox.style.display = "block";
   if (bar) bar.style.width = "100%";
   if (pctTxt) pctTxt.textContent = "100%";
   if (stTxt) stTxt.textContent = "Installation Complete! Launching App...";
   if (btn) {
     btn.style.background = "#0284c7";
     btn.innerHTML = "<i class=\"fa-solid fa-circle-check\"></i> <span>INSTALLED • OPENING APP...</span>";
   }

   setTimeout(function() {
     var gate = document.getElementById("pwaInstallGateOverlay");
     if (gate) gate.style.display = "none";
   }, 600);
 }

 function runSimulatedPackageInstallAndUnlock() {
   var progBox = document.getElementById("pwaInstallProgressBox");
   var bar = document.getElementById("pwaInstallProgressBar");
   var pctTxt = document.getElementById("pwaInstallPercentText");
   var stTxt = document.getElementById("pwaInstallStatusText");
   var btn = document.getElementById("btnMandatoryInstall");

   if (progBox) progBox.style.display = "block";
   if (btn) {
     btn.disabled = true;
     btn.style.opacity = "0.85";
     btn.innerHTML = "<i class=\"fa-solid fa-spinner fa-spin\"></i> <span>INSTALLING APPLICATION...</span>";
   }

   var pct = 0;
   var timer = setInterval(function() {
     pct += 20;
     if (pct > 100) pct = 100;
     if (bar) bar.style.width = pct + "%";
     if (pctTxt) pctTxt.textContent = pct + "%";
     if (stTxt) {
       if (pct < 50) stTxt.textContent = "Downloading App Modules...";
       else if (pct < 90) stTxt.textContent = "Configuring Offline Database...";
       else stTxt.textContent = "Finalizing Installation...";
     }
     if (pct >= 100) {
       clearInterval(timer);
       completeInstallGateAndLaunchApp();
     }
   }, 280);
 }

 function triggerNativePromptOrFallback(promptEvent) {
   promptEvent.prompt();
   promptEvent.userChoice.then(function(choiceResult) {
     deferredPrompt = null;
     window.deferredPwaPrompt = null;
     if (choiceResult.outcome === "accepted") {
       runSimulatedPackageInstallAndUnlock();
     } else {
       var btn = document.getElementById("btnMandatoryInstall");
       if (btn) {
         btn.disabled = false;
         btn.style.opacity = "1";
         btn.innerHTML = "<i class=\"fa-solid fa-download\"></i> <span>INSTALL APP NOW</span>";
       }
       var hint = document.getElementById("pwaInstallFooterHint");
       if (hint) {
         hint.style.color = "#fbbf24";
         hint.innerHTML = "<b>Home Screen Install:</b> Please tap <b>INSTALL APP NOW</b> and click <b>Install</b> on the popup to add the app to your Home Screen.";
       }
     }
   });
 }

 function handleMandatoryPwaInstall() {
   var activePrompt = window.deferredPwaPrompt || deferredPrompt;
   if (activePrompt) {
     triggerNativePromptOrFallback(activePrompt);
     return;
   }
   // Wait briefly (up to 1.6s) in case Chrome is still initializing beforeinstallprompt
   var btn = document.getElementById("btnMandatoryInstall");
   if (btn) {
     btn.innerHTML = "<i class=\"fa-solid fa-spinner fa-spin\"></i> <span>PREPARING INSTALLER...</span>";
   }
   var attempts = 0;
   var waitTimer = setInterval(function() {
     attempts++;
     var p = window.deferredPwaPrompt || deferredPrompt;
     if (p) {
       clearInterval(waitTimer);
       triggerNativePromptOrFallback(p);
     } else if (attempts >= 8) {
       clearInterval(waitTimer);
       // Fallback if opened in WhatsApp in-app browser or iOS/unsupported browser
       runSimulatedPackageInstallAndUnlock();
     }
   }, 200);
 }

 function triggerPwaInstall() {
   handleMandatoryPwaInstall();
 }

 if ('serviceWorker' in navigator) {
 window.addEventListener('load', () => {
 navigator.serviceWorker.register('./sw.js').catch(err => {
 console.log('ServiceWorker registration optional', err);
 });
 });
 }

 
// =========================================================================
// OFFLINE-FIRST QUEUE & AUTOMATIC CLOUD DATABASE SYNC ENGINE
// =========================================================================

function getOfflineQueue() {
  try {
    return JSON.parse(localStorage.getItem('sw_offline_queue') || '[]');
  } catch(e) {
    return [];
  }
}

function addToOfflineQueue(actionType, payload) {
  try {
    const queue = getOfflineQueue();
    queue.push({
      action: actionType,
      payload: payload,
      timestamp: Date.now()
    });
    localStorage.setItem('sw_offline_queue', JSON.stringify(queue));
    updateOfflineStatusBadge();
  } catch(e) {
    console.warn("Offline queue notice:", e);
  }
}

function updateOfflineStatusBadge() {
  const badge = document.getElementById('networkStatusBadge');
  if (badge) badge.style.display = 'none';
  const notice = document.getElementById('homeSyncNotice');
  if (notice) notice.style.display = 'none';
}

function syncOfflineQueueToCloud() {
  if (!navigator.onLine) {
    updateOfflineStatusBadge();
    return;
  }
  if (!window.fbDb) {
    if (typeof initFirebaseCloud === 'function') initFirebaseCloud();
    if (!window.fbDb) {
      updateOfflineStatusBadge();
      return;
    }
  }

  const queue = getOfflineQueue();
  const targetId = getIsolatedCloudDocId();
  if (!targetId) {
    updateOfflineStatusBadge();
    return;
  }
  const fullBackup = {
    settings: JSON.parse(localStorage.getItem('sw_bill_settings') || '{}'),
    profile: JSON.parse(localStorage.getItem('sw_profile') || '{}'),
    customers: JSON.parse(localStorage.getItem('sw_customers') || '{}'),
    invoices: JSON.parse(localStorage.getItem('sw_invoices') || '[]'),
    measurements: JSON.parse(localStorage.getItem('sw_measurements') || '[]'),
    site_khata: JSON.parse(localStorage.getItem('sw_site_khata') || '[]'),
    expenses: JSON.parse(localStorage.getItem('sw_expenses') || '[]'),
    license: JSON.parse(localStorage.getItem('sw_license') || '{}'),
    custom_logo: localStorage.getItem('sw_custom_logo') || '',
    custom_qr: localStorage.getItem('sw_custom_qr') || '',
    updated_at: new Date().toISOString()
  };

  fbDb.collection('users').doc(String(targetId)).set(fullBackup, { merge: true })

    .then(() => {
      if (window.fbRtdb) {
        try { fbRtdb.ref('nisha_creations/smart_worker/' + String(targetId)).set(fullBackup); } catch(e){}
      }
      if (typeof syncUserActivityToCloud === 'function') {
        syncUserActivityToCloud();
      }
      localStorage.setItem('sw_offline_queue', '[]');
      console.log("✅ Database synchronization complete.");
      updateOfflineStatusBadge();
    })
    .catch((err) => {
      console.warn("Cloud sync retry pending:", err);
      updateOfflineStatusBadge();
    });
}

// Auto-Reconnection & Periodic Sync Listeners
window.addEventListener('online', () => {
  console.log("Network online event detected.");
  updateOfflineStatusBadge();
  setTimeout(syncOfflineQueueToCloud, 500);
});

window.addEventListener('offline', () => {
  console.log("Network offline event detected.");
  updateOfflineStatusBadge();
});

function enforceTelecomExpiryAutoLock() {
  try {
    if (typeof updateActivationScreenUI === 'function') updateActivationScreenUI();
    if (!isAppActivated()) {
      var matAreas = ['dm_mat_out', 'sl_mat_out', 'cc_mat_out', 'dr_mat_out', 'pt_mat_out', 'cs_mat_out'];
      matAreas.forEach(function(id) {
        var el = document.getElementById(id);
        if (el && el.textContent && el.textContent.indexOf('ACCUMULATED MATERIAL PURCHASE') !== -1) {
          el.textContent = generateMaterialList({ 'Expired': [12] });
        }
      });
    }
  } catch (e) {}
}

setInterval(() => {
  enforceTelecomExpiryAutoLock();
  if (navigator.onLine) {
    const queue = getOfflineQueue();
    if (queue && queue.length > 0) {
      syncOfflineQueueToCloud();
    }
  }
}, 30000);


function bootApp() {
  // 0. Enforce Mandatory App Install Gate when link is clicked
  try { checkAndShowMandatoryInstallGate(); } catch(e){}

  // 1. Check Authentication Status (New visitors get Login/Register screen; no leaked workshop details)
  const savedUser = localStorage.getItem('sw_cloud_user');
  const isGuest = localStorage.getItem('sw_guest_mode');
  const isAuthenticated = !!(savedUser || isGuest);

  if (!isAuthenticated) {
    // Brand new visitor or new phone: open Login / Registration screen FIRST!
    openScreen('auth', 'SIGN IN / REGISTER');
  } else {
    // Authenticated user: load profile and navigate to Home screen
    try { loadSavedProfile(); } catch(e){}
    try { goHome(); } catch(e){}
  }

  try {
    if (!localStorage.getItem('sw_lang')) {
      localStorage.setItem('sw_lang', 'en');
      currentAppLang = 'en';
    }
  } catch(e){}

  try { changeLanguage(currentAppLang); } catch(e){ console.warn("changeLanguage error", e); }
  try { setupDb(); } catch(e){}
  try { loadBillSettings(); } catch(e){}
  try { updateSuggestedRate(); } catch(e){}
  try { updateOfflineStatusBadge(); } catch(e){}
  try { if (typeof renderCustomSeriesDropdown === "function") renderCustomSeriesDropdown(); } catch(e){}

  // 2. Background Asynchronous Cloud Sync (Non-blocking for 4G devices)
  setTimeout(() => {
    try { if (typeof initFirebaseCloud === 'function') initFirebaseCloud(); } catch(e){}
    try { if (typeof initCloudKhataSyncListener === 'function') initCloudKhataSyncListener(); } catch(e){}
    if (isAuthenticated) {
      try { syncUserActivityToCloud(); } catch(e){}
      try { checkCustomerInAppNotifications(); } catch(e){}
      try { syncOfflineQueueToCloud(); } catch(e){}
    }
    try { updateOfflineStatusBadge(); } catch(e){}
  }, 400);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootApp);
} else {
  bootApp();
}
window.addEventListener('load', bootApp);
window.onload = bootApp;



// =========================================================================
// SMART WORKER PRO - MASTER ADMIN SUBSCRIPTION & RECHARGE ENGINE
// =========================================================================

const MASTER_ADMIN_PIN_HASH = "584a7334e8e0e5233965da1ac78cf9b48548fd6fbb0257432436a86788276b85";
const ADMIN_PIN_SALT_PREFIX = "SW_ADMIN_MASTER_PIN_V27::";
let lastGeneratedAdminKey = "";
let lastTargetPhone = "";
let lastTargetPlan = "";
let lastTargetName = "";

function getAdminPinHash() {
  return localStorage.getItem('sw_admin_pin_hash') || MASTER_ADMIN_PIN_HASH;
}

function verifyAdminPinInput(rawPin) {
  if (!rawPin) return false;
  const clean = String(rawPin).trim();
  return sha256(ADMIN_PIN_SALT_PREFIX + clean) === getAdminPinHash();
}

function getAdminPin() {
  return "•••••• (Protected)";
}

function openAdminPortalWithPin() {
  const entered = prompt("🔑 Enter 6-Digit Admin Security PIN:");
  if (entered === null) return;
  if (verifyAdminPinInput(entered)) {
    sessionStorage.setItem('sw_admin_authenticated', 'true');
    sessionStorage.setItem('sw_admin_gate_unlocked', getAdminPinHash());
    window.location.href = 'admin.html';
  } else {
    alert("❌ Incorrect Admin PIN! Unauthorized access blocked.");
  }
}

function lockAdminPortal() {
  sessionStorage.removeItem('sw_admin_authenticated');
  alert("🔒 Admin Portal has been locked.");
  goHome();
}

function adminChangePinPrompt() {
  const oldPin = prompt("Enter current Admin Security PIN:");
  if (!verifyAdminPinInput(oldPin)) { alert("❌ Current Admin PIN is incorrect!"); return; }
  const newPin = prompt("Enter new 6-digit Admin Security PIN:");
  if (!newPin || newPin.trim().length < 4) { alert("❌ PIN must be at least 4 characters!"); return; }
  const newHash = sha256(ADMIN_PIN_SALT_PREFIX + newPin.trim());
  localStorage.setItem('sw_admin_pin_hash', newHash);
  localStorage.removeItem('sw_admin_pin');
  const pinDisp = document.getElementById('admCurrentPinDisplay');
  if (pinDisp) pinDisp.textContent = "•••••• (Protected)";
  alert("✅ Admin Security PIN updated and encrypted successfully!");
}

// Generate mathematical key matching checkActivationType
function generateActivationKey(deviceId, planType) {
  deviceId = String(deviceId || '').trim().toUpperCase();
  if (!deviceId) return null;
  if (planType === "LIFETIME") return SPECIAL_PROMO_CODE;
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const baseSalt = SALTS[planType] || SALTS["KARIGAR_1M"];
  const dynSalt = String(planType).indexOf("1Y") !== -1 ? (baseSalt + "_" + y) : (baseSalt + "_" + y + "_" + m);
  return sha256(deviceId + dynSalt).substring(0, 8).toUpperCase();
}

// Customer submits online recharge request
function submitCustomerRechargeRequest() {
  const nameEl = document.getElementById('req_cust_name');
  const phoneEl = document.getElementById('req_cust_phone');
  const planEl = document.getElementById('req_cust_plan');
  const utrEl = document.getElementById('req_cust_utr');
  const name = nameEl ? nameEl.value.trim() : "";
  const phone = phoneEl ? phoneEl.value.trim() : "";
  const plan = planEl ? planEl.value : "KARIGAR_1M";
  const utr = utrEl ? utrEl.value.trim() : "";
  const devId = getDeviceId();

  if (!name || !phone) {
    alert("Please enter your Name and Mobile Number!");
    return;
  }

  const reqObj = {
    id: "REQ_" + Date.now(),
    name: name,
    phone: phone,
    device_id: devId,
    plan: plan,
    utr: utr || "Paid online",
    date: new Date().toLocaleDateString('en-GB') + " " + new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
    status: "Pending"
  };

  let requests = JSON.parse(localStorage.getItem('sw_recharge_requests') || '[]');
  requests.unshift(reqObj);
  localStorage.setItem('sw_recharge_requests', JSON.stringify(requests));

  // Sync to Firebase if connected
  try {
    if (window.fbDb) {
      fbDb.collection('recharge_requests').doc(reqObj.id).set(reqObj).catch(()=>{});
    }
  } catch(e){}

  alert("✅ Your recharge request has been submitted!\n\nAdmin will verify and send your Activation Key shortly.");
  if (nameEl) nameEl.value = "";
  if (phoneEl) phoneEl.value = "";
  if (utrEl) utrEl.value = "";
}

// Render Admin Portal UI
function renderAdminPortal() {
  const devInput = document.getElementById('adm_target_device');
  if (devInput && !devInput.value) devInput.value = getDeviceId();
  const pinDisplay = document.getElementById('admCurrentPinDisplay');
  if (pinDisplay) pinDisplay.textContent = getAdminPin();
  renderAdminRechargeRequests();
}

function renderAdminRechargeRequests() {
  const container = document.getElementById('admRequestsListContainer');
  const badge = document.getElementById('admReqCountBadge');
  if (!container) return;

  let requests = JSON.parse(localStorage.getItem('sw_recharge_requests') || '[]');
  if (badge) badge.textContent = `${requests.length} Requests`;

  if (requests.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:24px 10px; color:#94a3b8; font-size:0.85rem;">
        <i class="fa-solid fa-inbox" style="font-size:1.8rem; margin-bottom:6px; color:#cbd5e1; display:block;"></i>
        No pending recharge requests found.
      </div>`;
    return;
  }

  let html = "";
  requests.forEach((req, idx) => {
    const isPending = req.status === "Pending";
    const statusColor = isPending ? "#f59e0b" : "#16a34a";
    const planLabels = {
      "KARIGAR_1M": "Single User - 30 Days (₹99)",
      "KARIGAR_1Y": "Single User VIP - 365 Days (₹799)",
      "TEAM_1M": "Single User - 90 Days (₹280)",
      "TEAM_1Y": "Single User - 180 Days (₹550)",
      "CORP_1M": "Single User - 30 Days (₹99)",
      "CORP_1Y": "Single User - 365 Days (₹799)",
      "LIFETIME": "Lifetime VIP"
    };
    const planText = planLabels[req.plan] || req.plan;

    html += `
      <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:10px; padding:12px; margin-bottom:10px; text-align:left;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start;">
          <div>
            <div style="font-size:0.92rem; font-weight:800; color:#0f172a;">${req.name}</div>
            <div style="font-size:0.75rem; color:#475569; margin-top:1px;"><i class="fa-solid fa-phone"></i> ${req.phone}</div>
          </div>
          <span style="background:${statusColor}; color:#fff; font-size:0.68rem; font-weight:bold; padding:2px 7px; border-radius:6px;">
            ${req.status}
          </span>
        </div>
        
        <div style="margin-top:8px; font-size:0.76rem; color:#334155; line-height:1.4; background:#fff; padding:6px 10px; border-radius:6px; border:1px solid #cbd5e1;">
          <div><b>Device ID:</b> <span style="font-family:monospace; font-weight:bold; color:#0284c7;">${req.device_id}</span></div>
          <div><b>Plan:</b> ${planText}</div>
          <div><b>Ref / UTR:</b> ${req.utr}</div>
          <div style="font-size:0.7rem; color:#94a3b8;"><b>Date:</b> ${req.date}</div>
        </div>

        <div style="display:flex; gap:6px; margin-top:8px;">
          <button type="button" onclick="adminProcessRequest('${req.id}')" style="flex:2; background:#2563eb; color:#fff; border:none; padding:7px; border-radius:6px; font-size:0.76rem; font-weight:bold; cursor:pointer;">
            <i class="fa-solid fa-key"></i> Generate Key & Send via WhatsApp
          </button>
          <button type="button" onclick="adminDeleteRequest('${req.id}')" style="flex:1; background:#fee2e2; color:#dc2626; border:1px solid #fca5a5; padding:7px; border-radius:6px; font-size:0.76rem; font-weight:bold; cursor:pointer;">
            Delete
          </button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// Process a customer request directly
function adminProcessRequest(reqId) {
  let requests = JSON.parse(localStorage.getItem('sw_recharge_requests') || '[]');
  const req = requests.find(r => r.id === reqId);
  if (!req) return;

  const key = generateActivationKey(req.device_id, req.plan);
  req.status = "Approved";
  req.generated_key = key;
  localStorage.setItem('sw_recharge_requests', JSON.stringify(requests));
  renderAdminRechargeRequests();

  lastGeneratedAdminKey = key;
  lastTargetPhone = req.phone;
  lastTargetPlan = req.plan;
  lastTargetName = req.name;

  const planLabels = {
    "KARIGAR_1M": "Single User Plan (30 Days)",
    "KARIGAR_1Y": "Single User VIP Plan (365 Days)",
    "TEAM_1M": "Single User Plan (90 Days)",
    "TEAM_1Y": "Single User Plan (180 Days)",
    "CORP_1M": "Single User Plan (30 Days)",
    "CORP_1Y": "Single User Plan (365 Days)",
    "LIFETIME": "Lifetime VIP"
  };
  const planText = planLabels[req.plan] || req.plan;

  const msg = `Hello ${req.name}, your ${planText} on Smart Worker Pro has been approved!\n\nYour Activation Key:\n👉 *${key}*\n\nOpen the PRO UPGRADE screen in the app, paste this key, and tap Activate to unlock all Pro features. Thank you!\n-- Saheb Ghanti (Smart Worker Pro)`;

  const cleanPhone = req.phone.replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/91${cleanPhone}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

function adminDeleteRequest(reqId) {
  if (!confirm("Are you sure you want to delete this request?")) return;
  let requests = JSON.parse(localStorage.getItem('sw_recharge_requests') || '[]');
  requests = requests.filter(r => r.id !== reqId);
  localStorage.setItem('sw_recharge_requests', JSON.stringify(requests));
  renderAdminRechargeRequests();
}

// Manual Key Generator
function adminGenerateManualKey() {
  const devEl = document.getElementById('adm_target_device');
  const planEl = document.getElementById('adm_target_plan');
  const devId = devEl ? devEl.value.trim().toUpperCase() : "";
  const plan = planEl ? planEl.value : "KARIGAR_1M";

  if (!devId || devId.length !== 8) {
    alert("Please enter a valid 8-character Device ID!");
    return;
  }

  const key = generateActivationKey(devId, plan);
  lastGeneratedAdminKey = key;
  lastTargetPlan = plan;

  const dispEl = document.getElementById('admGeneratedKeyDisplay');
  if (dispEl) dispEl.value = key;
  const boxEl = document.getElementById('admGeneratedResultBox');
  if (boxEl) boxEl.style.display = "block";
}

function adminCopyGeneratedKey() {
  if (!lastGeneratedAdminKey) return;
  navigator.clipboard.writeText(lastGeneratedAdminKey).then(() => {
    const btn = document.getElementById('admCopyKeyBtn');
    if (btn) {
      btn.textContent = "COPIED!";
      btn.style.background = "#0284c7";
      setTimeout(() => {
        btn.textContent = "COPY";
        btn.style.background = "#16a34a";
      }, 2000);
    }
  }).catch(() => {
    alert("Key: " + lastGeneratedAdminKey);
  });
}

function adminShareKeyWhatsApp() {
  if (!lastGeneratedAdminKey) return;
  const devEl = document.getElementById('adm_target_device');
  const planEl = document.getElementById('adm_target_plan');
  const devId = devEl ? devEl.value.trim().toUpperCase() : "";
  const plan = planEl ? planEl.value : "KARIGAR_1M";
  const msg = `Hello, here is your Smart Worker Pro Activation Key:\n👉 *${lastGeneratedAdminKey}*\nDevice ID: ${devId}\nPlan: ${plan}\n\nEnter this key in the app to activate all Pro features. Thank you!`;
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
}

// Directly unlock this device on the spot
function adminDirectSelfApplyKey() {
  if (!lastGeneratedAdminKey) return;
  document.getElementById('activationInput').value = lastGeneratedAdminKey;
  activateAppKey();
  alert("🎉 Subscription activated successfully on this device!");
  goHome();
}

// URL Hash router check
function checkUrlHash() {
  if (window.location.hash === '#admin' || window.location.hash === '#admin-portal') {
    openAdminPortalWithPin();
  }
}

window.addEventListener('hashchange', checkUrlHash);
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(checkUrlHash, 500);
  // Auto-fill Device ID on recharge form
  const reqDev = document.getElementById('req_cust_device');
  if (reqDev) reqDev.value = getDeviceId();
});



// Sync user activity to database for Admin detection
function syncUserActivityToCloud() {
  try {
    const profile = JSON.parse(localStorage.getItem('sw_profile') || '{}');
    const devId = (typeof getDeviceId === 'function') ? getDeviceId() : 'UNKNOWN';
    const isPro = (typeof isAppActivated === 'function') ? isAppActivated() : false;
    const lic = JSON.parse(localStorage.getItem('sw_license') || '{}');

    const st = (typeof getTelecomLicenseStatus === 'function') ? getTelecomLicenseStatus() : { active: isPro, expired: false, startDate: '--', expiryDate: '--' };
    const userObj = {
      device_id: devId,
      name: profile.name || "Customer Workshop",
      shop: profile.shop_name || "Aluminium Workshop",
      phone: profile.phone || "N/A",
      plan: lic.plan || lic.plan_category || "KARIGAR_1M",
      status: st.active ? "ACTIVE" : (st.expired ? "EXPIRED" : "PENDING_ACTIVATION"),
      start_date: lic.start_date || st.startDate,
      expiry_date: lic.expiry_date || st.expiryDate,
      start_timestamp: lic.start_timestamp || 0,
      expiry_timestamp: lic.expiry_timestamp || 0,
      validity_days: lic.validity_days || 30,
      timestamp: Date.now(),
      last_active: new Date().toLocaleString('en-US')
    };

    let list = JSON.parse(localStorage.getItem('sw_active_subscribers') || '[]');
    const idx = list.findIndex(s => s.device_id === devId);
    if (idx !== -1) {
      list[idx] = { ...list[idx], ...userObj };
    } else {
      list.unshift(userObj);
    }
    localStorage.setItem('sw_active_subscribers', JSON.stringify(list));

    if (window.fbDb) {
      fbDb.collection('subscribers').doc(devId).set(userObj, { merge: true }).catch(() => {});
    }
  } catch(e) {}
}




// =========================================================================
// IN-APP NOTIFICATIONS & CLOUD ACTIVATION AUTO-DETECTOR
// =========================================================================

function showCustomerNotificationPopup(notif) {
  let bar = document.getElementById('inAppNotifBanner');
  if (!bar) {
    bar = document.createElement('div');
    bar.id = 'inAppNotifBanner';
    bar.style.cssText = 'position:fixed; top:12px; left:12px; right:12px; z-index:99999; background:linear-gradient(135deg, #1e1b4b, #312e81); border:1.5px solid #818cf8; border-radius:12px; padding:12px 14px; color:#fff; box-shadow:0 8px 24px rgba(0,0,0,0.4); display:flex; gap:10px; align-items:flex-start;';
    document.body.appendChild(bar);
  }
  bar.innerHTML = `
    <div style="font-size:1.4rem; color:#fde047;"><i class="fa-solid fa-bell"></i></div>
    <div style="flex:1;">
      <div style="font-size:0.88rem; font-weight:800; color:#38bdf8;">${notif.title || 'Admin Notification'}</div>
      <div style="font-size:0.78rem; color:#e0e7ff; margin-top:3px; line-height:1.4; white-space:pre-line;">${notif.message}</div>
      <div style="font-size:0.68rem; color:#94a3b8; margin-top:5px;">${notif.date || 'Today'}</div>
    </div>
    <button type="button" onclick="dismissCustomerNotif('${notif.device_id || getDeviceId()}', '${notif.timestamp}')" style="background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.25); color:#fff; border-radius:6px; padding:4px 8px; font-size:0.8rem; cursor:pointer;">&times;</button>
  `;
  bar.style.display = 'flex';
}

function dismissCustomerNotif(devId, ts) {
  const bar = document.getElementById('inAppNotifBanner');
  if (bar) bar.style.display = 'none';
  localStorage.setItem('sw_last_seen_notif_' + devId, String(ts));
}

function checkCustomerInAppNotifications() {
  const devId = getDeviceId();
  // 1. Local Notification Check
  try {
    const raw = localStorage.getItem('sw_client_notification_' + devId);
    if (raw) {
      const notif = JSON.parse(raw);
      const lastSeen = localStorage.getItem('sw_last_seen_notif_' + devId);
      if (notif && notif.timestamp && String(notif.timestamp) !== lastSeen) {
        showCustomerNotificationPopup(notif);
      }
    }
  } catch(e){}

  // 2. Firebase Cloud Notification Check
  try {
    const db = window.fbDb || (window.firebase && firebase.apps.length ? firebase.firestore() : null);
    if (db) {
      db.collection('notifications').doc(devId).get().then(doc => {
        if (doc.exists) {
          const data = doc.data();
          const lastSeen = localStorage.getItem('sw_last_seen_notif_' + devId);
          if (data && data.timestamp && String(data.timestamp) !== lastSeen) {
            showCustomerNotificationPopup(data);
          }
        }
      }).catch(()=>{});
    }
  } catch(e){}

  // 3. Auto-sync approved key from Firebase
  try {
    const db = window.fbDb || (window.firebase && firebase.apps.length ? firebase.firestore() : null);
    if (db) {
      db.collection('recharge_requests').doc(devId).get().then(doc => {
        if (doc.exists) {
          const req = doc.data();
          if (req && req.status === 'Approved' && req.activation_key) {
            const actInput = document.getElementById('activationInput');
            if (actInput && !actInput.value) actInput.value = req.activation_key;
          }
        }
      }).catch(()=>{});
    }
  } catch(e){}
}


// =========================================================================
// GENERAL PURPOSE ANDROID STANDARD, SCIENTIFIC & UNIT CONVERTER CALCULATOR ENGINE (100% ENGLISH)
// =========================================================================

var calcExpr = '';
var calcCurNum = '0';
var calcJustEvaled = false;
var calcSciMode = false;
var calcSciInv = false;
var calcAngleUnit = 'DEG'; // 'DEG' or 'RAD'
var calcMemoryVal = 0;
var calcAccentColors = ['#0284c7', '#2563eb', '#059669', '#7c3aed', '#d97706', '#e11d48'];
var calcAccentIdx = 0;
var trigAngleMode = 'DEG';

function formatCalcNumberWithCommas(valStr) {
  if (valStr === null || valStr === undefined) return '0';
  var s = String(valStr);
  if (s === 'Error' || s === 'Infinity' || s === 'Undefined') return s;
  var parts = s.split('.');
  var intPart = parts[0];
  var decPart = parts.length > 1 ? '.' + parts[1] : '';
  var sign = '';
  if (intPart.startsWith('-')) {
    sign = '-';
    intPart = intPart.substring(1);
  }
  intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return sign + intPart + decPart;
}

function formatExprWithCommas(exprStr) {
  if (!exprStr) return '';
  return String(exprStr).replace(/\d+(?:\.\d+)?/g, function(m) {
    return formatCalcNumberWithCommas(m);
  });
}

function evaluateRawMathExpression(rawExpr) {
  if (!rawExpr) return null;
  var s = String(rawExpr)
    .replace(/,/g, '')
    .replace(/×/g, '*')
    .replace(/÷/g, '/')
    .replace(/−/g, '-')
    .replace(/π/g, '(' + Math.PI + ')')
    .replace(/\be\b/g, '(' + Math.E + ')')
    .replace(/\^/g, '**');

  // Balance open parentheses automatically for live evaluation
  var openCount = (s.match(/\(/g) || []).length;
  var closeCount = (s.match(/\)/g) || []).length;
  while (openCount > closeCount) {
    s += ')';
    closeCount++;
  }

  // Strip trailing operator for live preview
  s = s.replace(/[+\-*/.]+$/, '');
  if (!s) return null;

  // v104: Strict whitelist validation before expression evaluation
  var _safeExprCheck = s.replace(/\b(sin|cos|tan|asin|acos|atan|sqrt|cbrt|abs|log|ln|exp|pow|pi|PI|E|Math|floor|ceil|round)\b/g, '');
  if (/[^0-9+\-*/().,%\s^eE]/.test(_safeExprCheck)) return null;

  try {
    var fn = new Function('DEG_MODE', '"use strict"; ' +
      'var _toRad = function(x){ return DEG_MODE ? (x * Math.PI / 180) : x; }; ' +
      'var _toDeg = function(x){ return DEG_MODE ? (x * 180 / Math.PI) : x; }; ' +
      'var sin = function(x){ var r = Math.sin(_toRad(x)); return Math.abs(r) < 1e-12 ? 0 : r; }; ' +
      'var cos = function(x){ var r = Math.cos(_toRad(x)); return Math.abs(r) < 1e-12 ? 0 : r; }; ' +
      'var tan = function(x){ if(DEG_MODE && Math.abs((((x % 180) + 180) % 180) - 90) < 1e-9) return NaN; var r = Math.tan(_toRad(x)); return Math.abs(r) < 1e-12 ? 0 : r; }; ' +
      'var asin = function(x){ return _toDeg(Math.asin(x)); }; ' +
      'var acos = function(x){ return _toDeg(Math.acos(x)); }; ' +
      'var atan = function(x){ return _toDeg(Math.atan(x)); }; ' +
      'var sqrt = function(x){ return Math.sqrt(x); }; ' +
      'var ln = function(x){ return Math.log(x); }; ' +
      'var log = function(x){ return Math.log10 ? Math.log10(x) : (Math.log(x)/Math.LN10); }; ' +
      'var abs = function(x){ return Math.abs(x); }; ' +
      'return (' + s + ');');
    var res = fn(calcAngleUnit === 'DEG');
    if (res === undefined || res === null || isNaN(res)) return NaN;
    if (!isFinite(res)) return Infinity;
    return Math.round(res * 100000000) / 100000000;
  } catch (err) {
    return null;
  }
}

function updateCalcDisplay() {
  var exprEl = document.getElementById('calcExpressionLine');
  var mainEl = document.getElementById('calcMainResult');
  var prevEl = document.getElementById('calcLivePreview');

  if (exprEl) {
    exprEl.textContent = formatExprWithCommas(calcExpr);
  }
  if (mainEl) {
    mainEl.textContent = formatCalcNumberWithCommas(calcCurNum);
    if (String(calcCurNum).length > 12) {
      mainEl.style.fontSize = '1.9rem';
    } else {
      mainEl.style.fontSize = '2.65rem';
    }
  }
  if (prevEl) {
    if (calcExpr && !calcJustEvaled) {
      var candidate = calcExpr + (calcCurNum !== '0' ? calcCurNum : '');
      var liveVal = evaluateRawMathExpression(candidate);
      if (liveVal !== null && !isNaN(liveVal) && isFinite(liveVal)) {
        prevEl.textContent = '= ' + formatCalcNumberWithCommas(String(liveVal));
      } else {
        prevEl.textContent = '';
      }
    } else {
      prevEl.textContent = '';
    }
  }
}

function calcInputNum(digit) {
  if (calcJustEvaled) {
    calcExpr = '';
    calcCurNum = '0';
    calcJustEvaled = false;
  }
  if (calcCurNum === '0' || calcCurNum === '-0' || calcCurNum === 'Error') {
    calcCurNum = (calcCurNum === '-0' ? '-' : '') + String(digit);
  } else {
    if (calcCurNum.replace(/[^0-9]/g, '').length < 15) {
      calcCurNum += String(digit);
    }
  }
  updateCalcDisplay();
}

function calcInputMultiZero() {
  var tripleChk = document.getElementById('chkCalcTripleZero');
  var zeros = (tripleChk && tripleChk.checked) ? '000' : '00';
  if (calcJustEvaled) {
    calcExpr = '';
    calcCurNum = '0';
    calcJustEvaled = false;
  }
  if (calcCurNum === '0' || calcCurNum === 'Error') {
    calcCurNum = '0';
  } else if (calcCurNum.replace(/[^0-9]/g, '').length <= 13) {
    calcCurNum += zeros;
  }
  updateCalcDisplay();
}

function calcInputDot() {
  if (calcJustEvaled) {
    calcExpr = '';
    calcCurNum = '0';
    calcJustEvaled = false;
  }
  if (calcCurNum.indexOf('.') === -1) {
    calcCurNum += '.';
  }
  updateCalcDisplay();
}

function calcInputParen() {
  if (calcJustEvaled) {
    calcExpr = '';
    calcJustEvaled = false;
  }
  var full = calcExpr;
  var openCount = (full.match(/\(/g) || []).length;
  var closeCount = (full.match(/\)/g) || []).length;
  if (openCount > closeCount && (calcCurNum !== '0' || full.slice(-1) === ')')) {
    if (calcCurNum !== '0') {
      calcExpr += calcCurNum + ')';
      calcCurNum = '0';
    } else {
      calcExpr += ')';
    }
  } else {
    if (calcCurNum !== '0') {
      calcExpr += calcCurNum + '×(';
      calcCurNum = '0';
    } else {
      calcExpr += '(';
    }
  }
  updateCalcDisplay();
}

function calcToggleSign() {
  if (calcCurNum === '0' || calcCurNum === 'Error') return;
  if (calcCurNum.startsWith('-')) {
    calcCurNum = calcCurNum.substring(1);
  } else {
    calcCurNum = '-' + calcCurNum;
  }
  updateCalcDisplay();
}

function calcBackspace() {
  if (calcJustEvaled) {
    calcAllClear();
    return;
  }
  if (calcCurNum.length > 1) {
    calcCurNum = calcCurNum.slice(0, -1);
    if (calcCurNum === '-' || calcCurNum === '') calcCurNum = '0';
  } else if (calcCurNum !== '0') {
    calcCurNum = '0';
  } else if (calcExpr.length > 0) {
    calcExpr = calcExpr.slice(0, -1);
  }
  updateCalcDisplay();
}

function calcClearEntry() {
  calcCurNum = '0';
  updateCalcDisplay();
}

function calcAllClear() {
  calcCurNum = '0';
  calcExpr = '';
  calcJustEvaled = false;
  updateCalcDisplay();
}

function calcInputOp(op) {
  if (calcCurNum === 'Error') calcCurNum = '0';
  if (calcJustEvaled) {
    calcExpr = calcCurNum + op;
    calcCurNum = '0';
    calcJustEvaled = false;
    updateCalcDisplay();
    return;
  }

  if (op === '%') {
    var curVal = parseFloat(calcCurNum) || 0;
    // If there is a preceding addition/subtraction like "1000−", compute percentage of base
    var baseMatch = calcExpr.match(/^(\d+(?:\.\d+)?)([+−])$/);
    if (baseMatch) {
      var baseVal = parseFloat(baseMatch[1]) || 0;
      calcCurNum = String(Math.round((baseVal * (curVal / 100)) * 10000) / 10000);
    } else {
      calcCurNum = String(Math.round((curVal / 100) * 1000000) / 1000000);
    }
    updateCalcDisplay();
    return;
  }

  if (calcCurNum === '0' && /[+−×÷^]$/.test(calcExpr)) {
    calcExpr = calcExpr.slice(0, -1) + op;
  } else {
    calcExpr += calcCurNum + op;
    calcCurNum = '0';
  }
  updateCalcDisplay();
}

function calcEvaluateEqual() {
  var fullExpr = calcExpr + (calcCurNum !== '0' || !calcExpr ? calcCurNum : '');
  if (!fullExpr) return;
  var res = evaluateRawMathExpression(fullExpr);
  if (res === null || isNaN(res)) {
    calcCurNum = 'Error';
  } else if (!isFinite(res)) {
    calcCurNum = 'Infinity';
  } else {
    var cleanResult = Math.round(res * 1000000) / 1000000;
    calcCurNum = String(cleanResult);
    addCalcHistory(fullExpr, String(cleanResult));
  }
  calcExpr = fullExpr;
  calcJustEvaled = true;
  updateCalcDisplay();
}

// SCIENTIFIC FUNCTIONS (Screenshot 2)
function toggleCalcScientificMode() {
  calcSciMode = !calcSciMode;
  var stdGrid = document.getElementById('calcGridStandard');
  var sciGrid = document.getElementById('calcGridScientific');
  var btnSci = document.getElementById('btnToolScientific');
  var iconTxt = document.getElementById('sciToggleIconText');
  var ucPanel = document.getElementById('calcUnitConverterPanel');
  var keypadArea = document.getElementById('calcKeypadArea');

  if (ucPanel && ucPanel.style.display !== 'none') {
    ucPanel.style.setProperty('display', 'none', 'important');
    if (keypadArea) keypadArea.style.setProperty('display', 'block', 'important');
  }

  if (stdGrid) {
    stdGrid.style.setProperty('display', calcSciMode ? 'none' : 'grid', 'important');
  }
  if (sciGrid) {
    sciGrid.style.setProperty('display', calcSciMode ? 'grid' : 'none', 'important');
  }
  if (btnSci) btnSci.classList.toggle('active', calcSciMode);
  if (iconTxt) iconTxt.innerHTML = calcSciMode ? '+−<br>×÷' : '√π<br>e=';
}

function toggleSciInverse() {
  calcSciInv = !calcSciInv;
  var bSin = document.getElementById('btnSciSin');
  var bCos = document.getElementById('btnSciCos');
  var bTan = document.getElementById('btnSciTan');
  if (bSin) bSin.innerHTML = calcSciInv ? 'sin<sup>-1</sup>' : 'sin';
  if (bCos) bCos.innerHTML = calcSciInv ? 'cos<sup>-1</sup>' : 'cos';
  if (bTan) bTan.innerHTML = calcSciInv ? 'tan<sup>-1</sup>' : 'tan';
}

function toggleSciRadDeg() {
  calcAngleUnit = (calcAngleUnit === 'DEG') ? 'RAD' : 'DEG';
  trigAngleMode = calcAngleUnit;
  var btn = document.getElementById('btnSciRadDeg');
  if (btn) btn.textContent = (calcAngleUnit === 'DEG') ? 'Rad' : 'Deg';
  updateCalcDisplay();
}

function calcSciFunc(fn) {
  var val = parseFloat(calcCurNum) || 0;
  var isDeg = (calcAngleUnit === 'DEG');
  var res = 0;
  var label = '';

  if (fn === 'pi') {
    calcCurNum = String(Math.round(Math.PI * 1000000) / 1000000);
    calcJustEvaled = false;
    updateCalcDisplay();
    return;
  }
  if (fn === 'e') {
    calcCurNum = String(Math.round(Math.E * 1000000) / 1000000);
    calcJustEvaled = false;
    updateCalcDisplay();
    return;
  }
  if (fn === 'pow') {
    calcInputOp('^');
    return;
  }

  if (fn === 'sin') {
    if (calcSciInv) {
      if (val < -1 || val > 1) { calcCurNum = 'Error'; updateCalcDisplay(); return; }
      res = Math.asin(val);
      if (isDeg) res = res * 180 / Math.PI;
      label = 'asin(' + val + ')';
    } else {
      var r = isDeg ? (val * Math.PI / 180) : val;
      res = Math.abs(Math.sin(r)) < 1e-12 ? 0 : Math.sin(r);
      label = 'sin(' + val + ')';
    }
  } else if (fn === 'cos') {
    if (calcSciInv) {
      if (val < -1 || val > 1) { calcCurNum = 'Error'; updateCalcDisplay(); return; }
      res = Math.acos(val);
      if (isDeg) res = res * 180 / Math.PI;
      label = 'acos(' + val + ')';
    } else {
      var r2 = isDeg ? (val * Math.PI / 180) : val;
      res = Math.abs(Math.cos(r2)) < 1e-12 ? 0 : Math.cos(r2);
      label = 'cos(' + val + ')';
    }
  } else if (fn === 'tan') {
    if (calcSciInv) {
      res = Math.atan(val);
      if (isDeg) res = res * 180 / Math.PI;
      label = 'atan(' + val + ')';
    } else {
      var norm = isDeg ? (((val % 180) + 180) % 180) : val;
      if (isDeg && Math.abs(norm - 90) < 1e-6) {
        calcCurNum = 'Undefined';
        calcExpr = 'tan(' + val + ')';
        calcJustEvaled = true;
        updateCalcDisplay();
        return;
      }
      var r3 = isDeg ? (val * Math.PI / 180) : val;
      res = Math.abs(Math.tan(r3)) < 1e-12 ? 0 : Math.tan(r3);
      label = 'tan(' + val + ')';
    }
  } else if (fn === 'sqrt') {
    if (val < 0) { calcCurNum = 'Error'; updateCalcDisplay(); return; }
    res = Math.sqrt(val);
    label = '√(' + val + ')';
  } else if (fn === 'sq') {
    res = val * val;
    label = '(' + val + ')²';
  } else if (fn === 'inv') {
    if (val === 0) { calcCurNum = 'Infinity'; updateCalcDisplay(); return; }
    res = 1 / val;
    label = '1/(' + val + ')';
  } else if (fn === 'ln') {
    if (val <= 0) { calcCurNum = 'Error'; updateCalcDisplay(); return; }
    res = Math.log(val);
    label = 'ln(' + val + ')';
  } else if (fn === 'log') {
    if (val <= 0) { calcCurNum = 'Error'; updateCalcDisplay(); return; }
    res = Math.log10 ? Math.log10(val) : (Math.log(val) / Math.LN10);
    label = 'log(' + val + ')';
  } else if (fn === 'exp') {
    res = Math.exp(val);
    label = 'e^(' + val + ')';
  } else if (fn === 'abs') {
    res = Math.abs(val);
    label = '|' + val + '|';
  }

  var clean = Math.round(res * 1000000) / 1000000;
  calcExpr = label;
  calcCurNum = String(clean);
  calcJustEvaled = true;
  addCalcHistory(label, String(clean));
  updateCalcDisplay();
}

function calcMemoryOp(op) {
  var cur = parseFloat(calcCurNum) || 0;
  var badge = document.getElementById('calcMemIndicator');
  if (op === 'MC') calcMemoryVal = 0;
  else if (op === 'MR') { calcCurNum = String(calcMemoryVal); calcJustEvaled = false; }
  else if (op === 'M+') calcMemoryVal += cur;
  else if (op === 'M-') calcMemoryVal -= cur;
  if (badge) badge.style.display = calcMemoryVal !== 0 ? 'inline-block' : 'none';
  updateCalcDisplay();
}

function calcQuickGst(pct) {
  var curVal = parseFloat(calcCurNum) || 0;
  if (curVal === 0) return;
  var factor = 1 + (pct / 100);
  var result = Math.round(curVal * factor * 100) / 100;
  var exprLabel = curVal + (pct >= 0 ? '+' + pct + '%' : pct + '%');
  calcExpr = exprLabel;
  calcCurNum = String(result);
  calcJustEvaled = true;
  addCalcHistory(exprLabel, String(result));
  updateCalcDisplay();
}

// =========================================================================
// HISTORY SCREEN (Screenshot 5)
// =========================================================================
function formatHistoryTimestamp() {
  var d = new Date();
  var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  var mon = months[d.getMonth()];
  var day = d.getDate();
  var yr = d.getFullYear();
  var hr = d.getHours();
  var min = String(d.getMinutes()).padStart(2, '0');
  var ampm = hr >= 12 ? 'PM' : 'AM';
  hr = hr % 12;
  if (hr === 0) hr = 12;
  return mon + ' ' + day + ', ' + yr + ' ' + hr + ':' + min + ' ' + ampm;
}

function addCalcHistory(exprStr, ansStr) {
  try {
    var hist = JSON.parse(localStorage.getItem('sw_calc_history') || '[]');
    if (ansStr === undefined && String(exprStr).indexOf('=') !== -1) {
      var sp = String(exprStr).split('=');
      exprStr = sp[0].trim();
      ansStr = sp[1].trim();
    }
    hist.unshift({
      expr: exprStr,
      ans: ansStr,
      text: exprStr + ' = ' + ansStr,
      time: formatHistoryTimestamp()
    });
    if (hist.length > 40) hist = hist.slice(0, 40);
    localStorage.setItem('sw_calc_history', JSON.stringify(hist));
    renderCalcHistory();
  } catch(e) {}
}

function renderCalcHistory() {
  var tape = document.getElementById('calcHistoryTape');
  if (!tape) return;
  try {
    var hist = JSON.parse(localStorage.getItem('sw_calc_history') || '[]');
    if (hist.length === 0) {
      tape.innerHTML = '<div style="text-align:center; padding:40px 16px; color:#64748b; font-size:0.95rem;">No calculation history yet</div>';
      return;
    }
    var html = '';
    hist.forEach(function(h) {
      var exprPart = h.expr || (h.text ? h.text.split('=')[0].trim() : '0');
      var ansPart = h.ans || (h.text && h.text.split('=')[1] ? h.text.split('=')[1].trim() : '0');
      var dateStr = h.time || formatHistoryTimestamp();
      if (dateStr.length <= 10 && dateStr.indexOf(',') === -1) {
        var nowD = new Date();
        var mNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
        dateStr = mNames[nowD.getMonth()] + ' ' + nowD.getDate() + ', ' + nowD.getFullYear() + ' ' + dateStr;
      }
      html += '<div class="android-history-item" style="padding:14px 18px; border-bottom:1px solid #e2e8f0; display:flex; flex-direction:column; position:relative; cursor:pointer;" onclick="calcUseHistoryVal(\'' + String(ansPart).replace(/[^0-9.-]/g, '') + '\')">' +
        '<span class="android-history-dots" style="position:absolute; left:16px; top:18px; color:#64748b; font-size:1.05rem;"><i class="fa-solid fa-ellipsis-vertical"></i></span>' +
        '<div class="android-history-expr" style="text-align:right; font-size:1.35rem; color:#334155; font-weight:400; width:100%;">' + formatExprWithCommas(exprPart) + '</div>' +
        '<div class="android-history-ans" style="text-align:right; font-size:1.5rem; color:#0284c7; font-weight:400; margin-top:2px; width:100%;">= ' + formatCalcNumberWithCommas(ansPart) + '</div>' +
        '<div class="android-history-date" style="text-align:left; font-size:0.78rem; color:#334155; margin-top:6px; width:100%;">' + dateStr + '</div>' +
      '</div>';
    });
    tape.innerHTML = html;
  } catch(e) {}
}

function calcUseHistoryVal(val) {
  calcCurNum = String(val).replace(/[^\d.-]/g, '') || '0';
  calcExpr = '';
  calcJustEvaled = false;
  openCalcSubScreen('main');
  updateCalcDisplay();
}

function calcClearHistory() {
  localStorage.removeItem('sw_calc_history');
  renderCalcHistory();
}

// =========================================================================
// SUB-SCREEN NAVIGATION & SETTINGS (Screenshot 4)
// =========================================================================
function openCalcSubScreen(screenName) {
  var mainV = document.getElementById('calcMainView');
  var histV = document.getElementById('calcHistoryView');
  var setV = document.getElementById('calcSettingsView');

  if (mainV) mainV.style.setProperty('display', (screenName === 'main') ? 'flex' : 'none', 'important');
  if (histV) histV.style.setProperty('display', (screenName === 'history') ? 'block' : 'none', 'important');
  if (setV) setV.style.setProperty('display', (screenName === 'settings') ? 'block' : 'none', 'important');

  if (screenName === 'history') renderCalcHistory();
}

function toggleAndroidCalcTheme() {
  var shell = document.getElementById('androidCalcShell');
  var chk = document.getElementById('chkCalcNightMode');
  if (!shell) return;
  var isDark = shell.classList.toggle('dark-theme');
  if (chk) chk.checked = isDark;
}

function cycleCalcAccentColor() {
  calcAccentIdx = (calcAccentIdx + 1) % calcAccentColors.length;
  var color = calcAccentColors[calcAccentIdx];
  var shell = document.getElementById('androidCalcShell');
  var swatch = document.getElementById('calcColorSwatch');
  if (shell) shell.style.setProperty('--calc-accent', color);
  if (swatch) swatch.style.background = color;
}

function applyCalcSettingsUI(zeroMode) {
  var shell = document.getElementById('androidCalcShell');
  var chkRound = document.getElementById('chkCalcRounded');
  var chkMem = document.getElementById('chkCalcMemory');
  var chkDbl = document.getElementById('chkCalcDoubleZero');
  var chkTrp = document.getElementById('chkCalcTripleZero');
  var memBar = document.getElementById('calcMemoryBar');
  var btnZStd = document.getElementById('btnMultiZeroStd');
  var btnZSci = document.getElementById('btnMultiZeroSci');

  if (zeroMode === 'triple' && chkTrp && chkTrp.checked && chkDbl) {
    chkDbl.checked = false;
  } else if (zeroMode === 'double' && chkDbl && chkDbl.checked && chkTrp) {
    chkTrp.checked = false;
  }

  if (shell && chkRound) {
    shell.classList.toggle('rounded-keys', chkRound.checked);
  }
  if (memBar && chkMem) {
    memBar.style.display = chkMem.checked ? 'grid' : 'none';
  }
  var zLabel = (chkTrp && chkTrp.checked) ? '000' : ((chkDbl && !chkDbl.checked) ? '0' : '00');
  if (btnZStd) btnZStd.textContent = zLabel;
  if (btnZSci) btnZSci.textContent = zLabel;
}

// =========================================================================
// UNIT CONVERTER SHEET & INTERACTIVE ENGLISH TOOLS (Screenshot 3)
// =========================================================================
function toggleUnitConverterPanel() {
  var ucPanel = document.getElementById('calcUnitConverterPanel');
  var keypadArea = document.getElementById('calcKeypadArea');
  var btnConv = document.getElementById('btnToolConverter');
  if (!ucPanel) return;

  var isOpen = ucPanel.style.display !== 'none';
  if (isOpen) {
    ucPanel.style.setProperty('display', 'none', 'important');
    if (keypadArea) keypadArea.style.setProperty('display', 'block', 'important');
    if (btnConv) btnConv.classList.remove('active');
  } else {
    ucPanel.style.setProperty('display', 'block', 'important');
    if (keypadArea) keypadArea.style.setProperty('display', 'none', 'important');
    if (btnConv) btnConv.classList.add('active');
    closeActiveUnitConverterTool();
  }
}

function closeActiveUnitConverterTool() {
  var box = document.getElementById('ucActiveToolBox');
  var grid = document.querySelector('#calcUnitConverterPanel .uc-icon-grid');
  if (box) {
    box.style.display = 'none';
    box.innerHTML = '';
  }
  if (grid) grid.style.display = 'grid';
}

function openUnitConverterTool(toolKey) {
  var ucPanel = document.getElementById('calcUnitConverterPanel');
  var keypadArea = document.getElementById('calcKeypadArea');
  var box = document.getElementById('ucActiveToolBox');
  var grid = document.querySelector('#calcUnitConverterPanel .uc-icon-grid');
  if (ucPanel && ucPanel.style.display === 'none') {
    ucPanel.style.display = 'block';
    if (keypadArea) keypadArea.style.display = 'none';
  }
  if (!box) return;
  box.style.display = 'block';
  if (grid) grid.style.display = 'none';
  var backBtnHtml = '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; padding-bottom:6px; border-bottom:1px solid #e2e8f0;">' +
    '<button type="button" onclick="closeActiveUnitConverterTool()" style="background:transparent; border:none; color:#0284c7; font-weight:700; font-size:0.82rem; cursor:pointer; padding:2px 0;">← All Unit Converters</button>' +
    '<span style="font-size:0.72rem; color:#64748b;">Tap to switch tool</span>' +
  '</div>';

  if (toolKey === 'discount') {
    box.innerHTML = backBtnHtml +
      '<div style="font-weight:700; font-size:0.88rem; color:#0284c7; margin-bottom:8px;">🏷️ DISCOUNT CALCULATOR</div>' +
      '<div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:8px;">' +
        '<div><label style="font-size:0.72rem; color:#64748b;">Original Price (₹)</label>' +
        '<input type="number" id="disc_orig_price" placeholder="e.g. 5000" oninput="calcDiscountLive()" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:8px; font-weight:700;"></div>' +
        '<div><label style="font-size:0.72rem; color:#64748b;">Discount (%)</label>' +
        '<input type="number" id="disc_pct" placeholder="e.g. 10" oninput="calcDiscountLive()" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:8px; font-weight:700;"></div>' +
      '</div>' +
      '<div style="margin-bottom:8px;"><label style="font-size:0.72rem; color:#64748b;">Or Direct Flat Discount (₹)</label>' +
        '<input type="number" id="disc_flat" placeholder="e.g. 500" oninput="calcDiscountFromFlatLive()" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:8px;">' +
      '</div>' +
      '<div style="display:flex; gap:6px; margin-bottom:10px; flex-wrap:wrap;">' +
        '<button type="button" class="calc-preset-chip" style="padding:4px 10px;" onclick="setDiscountPreset(5)">5%</button>' +
        '<button type="button" class="calc-preset-chip" style="padding:4px 10px;" onclick="setDiscountPreset(10)">10%</button>' +
        '<button type="button" class="calc-preset-chip" style="padding:4px 10px;" onclick="setDiscountPreset(15)">15%</button>' +
        '<button type="button" class="calc-preset-chip" style="padding:4px 10px;" onclick="setDiscountPreset(20)">20%</button>' +
        '<button type="button" class="calc-preset-chip" style="padding:4px 10px;" onclick="setDiscountPreset(25)">25%</button>' +
      '</div>' +
      '<div style="background:#ffffff; border:1px solid #e2e8f0; border-radius:8px; padding:10px; display:grid; grid-template-columns:1fr 1fr; gap:8px; text-align:center;">' +
        '<div><div style="font-size:0.7rem; color:#64748b;">Amount Saved</div><div id="disc_val_saved" style="font-size:1.05rem; font-weight:800; color:#16a34a;">₹ 0.00</div></div>' +
        '<div><div style="font-size:0.7rem; color:#64748b;">Final Payable Price</div><div id="disc_val_final" style="font-size:1.05rem; font-weight:800; color:#0284c7;">₹ 0.00</div></div>' +
      '</div>' +
      '<div id="disc_val_breakdown" style="font-size:0.75rem; color:#64748b; margin-top:6px; text-align:center;">Enter price and discount % to view breakdown</div>';
    return;
  }

  if (toolKey === 'gst') {
    box.innerHTML = backBtnHtml +
      '<div style="font-weight:700; font-size:0.88rem; color:#0284c7; margin-bottom:8px;">🧾 GST TAX CALCULATOR</div>' +
      '<div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:8px;">' +
        '<div><label style="font-size:0.72rem; color:#64748b;">Base Amount (₹)</label>' +
        '<input type="number" id="uc_gst_amt" value="1000" oninput="runUcGstCalc()" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:8px; font-weight:700;"></div>' +
        '<div><label style="font-size:0.72rem; color:#64748b;">GST Rate (%)</label>' +
        '<select id="uc_gst_rate" onchange="runUcGstCalc()" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:8px; font-weight:700;">' +
          '<option value="18" selected>18% GST</option><option value="12">12% GST</option><option value="5">5% GST</option><option value="28">28% GST</option>' +
        '</select></div>' +
      '</div>' +
      '<div id="uc_gst_res" style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:10px; font-size:0.82rem;"></div>';
    runUcGstCalc();
    return;
  }

  if (toolKey === 'angle') {
    box.innerHTML = backBtnHtml +
      '<div style="font-weight:700; font-size:0.88rem; color:#0284c7; margin-bottom:8px;">📐 ANGLE, TRIGONOMETRY & MITRE CUT</div>' +
      '<div style="display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-bottom:8px;">' +
        '<div><label style="font-size:0.72rem; color:#64748b;">Width / Base (Inch)</label>' +
        '<input type="number" id="mitre_base" placeholder="e.g. 36" oninput="calcMitreLive()" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:8px;"></div>' +
        '<div><label style="font-size:0.72rem; color:#64748b;">Height / Rise (Inch)</label>' +
        '<input type="number" id="mitre_height" placeholder="e.g. 36" oninput="calcMitreLive()" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:8px;"></div>' +
      '</div>' +
      '<div id="mitre_results_box" style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:10px; font-size:0.78rem; color:#334155;">Enter Width and Height to calculate Diagonal Length and Mitre Cut Angles.</div>';
    return;
  }

  // Generic Unit Converter for Length, Area, Currency, Temperature, Mass, Volume, Split Bill, Loan, etc.
  var configs = {
    length: { title: '📏 LENGTH CONVERTER', u1: 'Feet (ft)', u2: 'Inches (in)', u3: 'Millimeters (mm)', f12: 12, f13: 304.8 },
    area: { title: '⬛ AREA CONVERTER', u1: 'Sq. Feet (sq.ft)', u2: 'Sq. Meters (sq.m)', u3: 'Sq. Inches (sq.in)', f12: 0.092903, f13: 144 },
    currency: { title: '💱 CURRENCY CONVERTER', u1: 'Indian Rupee (INR ₹)', u2: 'US Dollar (USD $)', u3: 'Euro (EUR €)', f12: 0.0119, f13: 0.011 },
    temperature: { title: '🌡️ TEMPERATURE CONVERTER', u1: 'Celsius (°C)', u2: 'Fahrenheit (°F)', u3: 'Kelvin (K)', temp: true },
    volume: { title: '🧊 VOLUME CONVERTER', u1: 'Liters (L)', u2: 'Milliliters (mL)', u3: 'Cubic Feet (cu.ft)', f12: 1000, f13: 0.035315 },
    mass: { title: '⚖️ MASS / WEIGHT CONVERTER', u1: 'Kilograms (kg)', u2: 'Grams (g)', u3: 'Pounds (lb)', f12: 1000, f13: 2.20462 },
    data: { title: '💾 DATA STORAGE CONVERTER', u1: 'Gigabytes (GB)', u2: 'Megabytes (MB)', u3: 'Terabytes (TB)', f12: 1024, f13: 0.00097656 },
    speed: { title: '🚀 SPEED CONVERTER', u1: 'km/h', u2: 'm/s', u3: 'mph', f12: 0.277778, f13: 0.621371 },
    time: { title: '⏱️ TIME CONVERTER', u1: 'Hours', u2: 'Minutes', u3: 'Seconds', f12: 60, f13: 3600 },
    pressure: { title: '🧭 PRESSURE CONVERTER', u1: 'Bar', u2: 'PSI', u3: 'Pascal (Pa)', f12: 14.5038, f13: 100000 },
    force: { title: '🛠️ FORCE CONVERTER', u1: 'Newton (N)', u2: 'Kilogram-force (kgf)', u3: 'Pound-force (lbf)', f12: 0.10197, f13: 0.22481 },
    power: { title: '⚡ POWER CONVERTER', u1: 'Kilowatt (kW)', u2: 'Watts (W)', u3: 'Horsepower (HP)', f12: 1000, f13: 1.34102 },
    energy: { title: '🔥 ENERGY CONVERTER', u1: 'Kilowatt-hour (kWh)', u2: 'Joules (J)', u3: 'Calories (cal)', f12: 3600000, f13: 860421 },
    frequency: { title: '〰️ FREQUENCY CONVERTER', u1: 'Hertz (Hz)', u2: 'Kilohertz (kHz)', u3: 'RPM', f12: 0.001, f13: 60 },
    fuel: { title: '⛽ FUEL CONVERTER', u1: 'km / Liter', u2: 'Liters / 100 km', u3: 'Miles / Gallon (MPG)', f12: 100, f13: 2.35215 },
    split_bill: { title: '🧾 SPLIT BILL CALCULATOR', u1: 'Total Bill Amount (₹)', u2: 'Per Person (2 People)', u3: 'Per Person (4 People)', f12: 0.5, f13: 0.25 },
    loan: { title: '🏦 LOAN ESTIMATE (1 Yr @ 10%)', u1: 'Loan Principal (₹)', u2: 'Monthly EMI (₹)', u3: 'Total Payable (₹)', f12: 0.087916, f13: 1.055 },
    savings: { title: '🐷 SAVINGS GROWTH (1 Yr @ 7%)', u1: 'Deposit Amount (₹)', u2: 'Interest Earned (₹)', u3: 'Maturity Value (₹)', f12: 0.07, f13: 1.07 }
  };

  var cfg = configs[toolKey] || { title: '🔄 ' + String(toolKey).toUpperCase() + ' CALCULATOR', u1: 'Input Value', u2: 'Converted (x12)', u3: 'Converted (x100)', f12: 12, f13: 100 };
  window._activeUcCfg = cfg;

  box.innerHTML = backBtnHtml +
    '<div style="font-weight:700; font-size:0.88rem; color:#0284c7; margin-bottom:8px;">' + cfg.title + '</div>' +
    '<div style="margin-bottom:8px;">' +
      '<label style="font-size:0.72rem; color:#64748b;">' + cfg.u1 + '</label>' +
      '<input type="number" id="uc_gen_input" value="1" oninput="runGenericUcConvert()" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:8px; font-weight:700;">' +
    '</div>' +
    '<div id="uc_gen_output" style="background:#fff; border:1px solid #e2e8f0; border-radius:8px; padding:10px; font-size:0.82rem;"></div>';
  runGenericUcConvert();
}

function runUcGstCalc() {
  var amtEl = document.getElementById('uc_gst_amt');
  var rateEl = document.getElementById('uc_gst_rate');
  var resEl = document.getElementById('uc_gst_res');
  if (!amtEl || !rateEl || !resEl) return;
  var amt = parseFloat(amtEl.value) || 0;
  var rate = parseFloat(rateEl.value) || 18;
  var gstAmt = Math.round(amt * (rate / 100) * 100) / 100;
  var total = Math.round((amt + gstAmt) * 100) / 100;
  resEl.innerHTML = '<div>CGST (' + (rate/2) + '%): <b>₹' + (gstAmt/2).toFixed(2) + '</b> | SGST (' + (rate/2) + '%): <b>₹' + (gstAmt/2).toFixed(2) + '</b></div>' +
    '<div style="margin-top:4px; color:#0284c7; font-size:0.95rem;">Total GST: <b>₹' + gstAmt.toFixed(2) + '</b> | Total with GST: <b>₹' + total.toFixed(2) + '</b></div>';
}

function runGenericUcConvert() {
  var inp = document.getElementById('uc_gen_input');
  var out = document.getElementById('uc_gen_output');
  var cfg = window._activeUcCfg;
  if (!inp || !out || !cfg) return;
  var v = parseFloat(inp.value) || 0;
  var r1 = 0, r2 = 0;
  if (cfg.temp) {
    r1 = (v * 9 / 5) + 32;
    r2 = v + 273.15;
  } else {
    r1 = v * cfg.f12;
    r2 = v * cfg.f13;
  }
  out.innerHTML = '<div>• ' + cfg.u2 + ': <b style="color:#0284c7;">' + (Math.round(r1 * 10000) / 10000) + '</b></div>' +
    '<div style="margin-top:4px;">• ' + cfg.u3 + ': <b style="color:#16a34a;">' + (Math.round(r2 * 10000) / 10000) + '</b></div>';
}

// -------------------------------------------------------------------------
// DISCOUNT, TRIGONOMETRY & MITRE HELPERS (100% ENGLISH)
// -------------------------------------------------------------------------
function setCalcTabMode(mode) {
  if (mode === 'discount') {
    openCalcSubScreen('main');
    var ucPanel = document.getElementById('calcUnitConverterPanel');
    if (ucPanel && ucPanel.style.display === 'none') toggleUnitConverterPanel();
    openUnitConverterTool('discount');
  } else if (mode === 'trig') {
    openCalcSubScreen('main');
    if (!calcSciMode) toggleCalcScientificMode();
  } else {
    openCalcSubScreen('main');
    updateCalcDisplay();
  }
}

function switchCalcSubTab(mode) {
  setCalcTabMode(mode);
}

function setDiscountPreset(pct) {
  var pInput = document.getElementById('disc_pct');
  if (pInput) pInput.value = pct;
  var fInput = document.getElementById('disc_flat');
  if (fInput) fInput.value = '';
  calcDiscountLive();
}

function calcDiscountLive() {
  var origEl = document.getElementById('disc_orig_price');
  var pctEl = document.getElementById('disc_pct');
  var flatEl = document.getElementById('disc_flat');
  var savedEl = document.getElementById('disc_val_saved');
  var finalEl = document.getElementById('disc_val_final');
  var bdEl = document.getElementById('disc_val_breakdown');
  var gstEl = document.getElementById('disc_val_with_gst');

  if (!origEl || !savedEl || !finalEl) return;
  var orig = parseFloat(origEl.value) || 0;
  var pct = parseFloat(pctEl ? pctEl.value : 0) || 0;

  if (orig <= 0) {
    savedEl.textContent = '₹ 0.00';
    finalEl.textContent = '₹ 0.00';
    if (bdEl) bdEl.textContent = 'Enter original price and discount % to view breakdown';
    if (gstEl) gstEl.textContent = '₹ 0.00';
    return;
  }

  var savedAmt = Math.round((orig * (pct / 100)) * 100) / 100;
  var finalPrice = Math.max(0, Math.round((orig - savedAmt) * 100) / 100);
  var withGst = Math.round((finalPrice * 1.18) * 100) / 100;

  if (flatEl && document.activeElement === pctEl) {
    flatEl.value = savedAmt > 0 ? savedAmt : '';
  }

  savedEl.textContent = '₹ ' + savedAmt.toLocaleString('en-IN', {minimumFractionDigits: 2});
  finalEl.textContent = '₹ ' + finalPrice.toLocaleString('en-IN', {minimumFractionDigits: 2});
  if (bdEl) bdEl.innerHTML = 'Original Price: <b>₹' + orig.toLocaleString('en-IN') + '</b> − Discount (' + pct + '%): <b style="color:#16a34a;">₹' + savedAmt.toLocaleString('en-IN') + '</b> = <b style="color:#0284c7;">₹' + finalPrice.toLocaleString('en-IN') + '</b>';
  if (gstEl) gstEl.textContent = '₹ ' + withGst.toLocaleString('en-IN', {minimumFractionDigits: 2});
}

function calcDiscountFromFlatLive() {
  var origEl = document.getElementById('disc_orig_price');
  var flatEl = document.getElementById('disc_flat');
  var pctEl = document.getElementById('disc_pct');
  if (!origEl || !flatEl) return;
  var orig = parseFloat(origEl.value) || 0;
  var flat = parseFloat(flatEl.value) || 0;
  if (orig > 0 && flat >= 0) {
    var calcPct = Math.round((flat / orig) * 10000) / 100;
    if (pctEl) pctEl.value = calcPct;
  }
  calcDiscountLive();
}

function setTrigAngleMode(mode) {
  trigAngleMode = mode;
  calcAngleUnit = mode;
  evalTrigInstant();
}

function evalTrigInstant() {
  var inp = document.getElementById('trig_input_val');
  var pill = document.getElementById('trig_result_pill');
  if (!inp || !pill) return;
  var val = parseFloat(inp.value) || 0;
  var isDeg = trigAngleMode === 'DEG';
  var rad = isDeg ? (val * Math.PI / 180) : val;
  var unitStr = isDeg ? '°' : ' rad';
  var s = Math.abs(Math.sin(rad)) < 1e-12 ? 0 : Math.round(Math.sin(rad) * 10000) / 10000;
  var c = Math.abs(Math.cos(rad)) < 1e-12 ? 0 : Math.round(Math.cos(rad) * 10000) / 10000;
  pill.innerHTML = 'sin(' + val + unitStr + ') = <b>' + s + '</b> | cos(' + val + unitStr + ') = <b>' + c + '</b>';
}

function applyTrig(fn) {
  calcSciFunc(fn);
}

function applySci(op) {
  calcSciFunc(op);
}

function calcMitreLive() {
  var bEl = document.getElementById('mitre_base');
  var hEl = document.getElementById('mitre_height');
  var box = document.getElementById('mitre_results_box');
  if (!bEl || !hEl || !box) return;
  var b = parseFloat(bEl.value) || 0;
  var h = parseFloat(hEl.value) || 0;

  if (b <= 0 || h <= 0) {
    box.innerHTML = 'Enter Width and Height to calculate <b>Diagonal Cutting Size</b> and <b>Mitre Cut Angles</b> automatically.';
    return;
  }

  var hyp = Math.round(Math.sqrt(b * b + h * h) * 100) / 100;
  var angRad = Math.atan2(h, b);
  var angDeg = Math.round(angRad * (180 / Math.PI) * 100) / 100;
  var compDeg = Math.round((90 - angDeg) * 100) / 100;

  box.innerHTML = '<div style="color:#0284c7; font-weight:800; font-size:0.82rem; margin-bottom:4px;">✔ Workshop Angle & Diagonal Cut Result:</div>' +
    '<div>• Diagonal Pipe Cutting Length: <b style="color:#d97706; font-size:0.95rem;">' + hyp + '"</b></div>' +
    '<div>• Base Mitre Cut Angle: <b style="color:#16a34a;">' + angDeg + '°</b></div>' +
    '<div>• Top Plumb Cut Angle: <b style="color:#7c3aed;">' + compDeg + '°</b></div>' +
    '<div style="margin-top:4px; font-size:0.72rem; color:#64748b;">💡 Cutting Tip: Set your mitre saw to <b>' + angDeg + '°</b> for an exact corner joint.</div>';
}

if (typeof renderCalcHistory === 'function') {
  setTimeout(renderCalcHistory, 300);
}


// =========================================================================
// SMART WORKER PRO - ANTI-THEFT, ANTI-INSPECT & ANTI-HANG SECURITY SHIELD (v27)
// =========================================================================
(function initSmartWorkerSecurityShield() {
  try {
    // Remove any legacy plaintext admin pin from localStorage
    localStorage.removeItem('sw_admin_pin');

    // 1. Block Right-Click Context Menu on non-input elements to prevent code copying
    document.addEventListener('contextmenu', function(e) {
      var tag = (e.target && e.target.tagName) ? e.target.tagName.toUpperCase() : '';
      if (tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault();
        return false;
      }
    }, false);

    // 2. Block F12, Ctrl+Shift+I/J/C (DevTools), Ctrl+U (View Source), Ctrl+S (Save Page)
    document.addEventListener('keydown', function(e) {
      var key = e.key || e.keyCode;
      if (
        key === 'F12' || key === 123 ||
        (e.ctrlKey && e.shiftKey && (key === 'I' || key === 'i' || key === 'J' || key === 'j' || key === 'C' || key === 'c' || key === 73 || key === 74 || key === 67)) ||
        (e.ctrlKey && (key === 'U' || key === 'u' || key === 'S' || key === 's' || key === 85 || key === 83))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, false);

    
    // 4. Official Domain Lock & Anti-Clone Protection for SmartWorkerPro.in
    (function enforceSmartWorkerDomainLock() {
      var host = (window.location && window.location.hostname) ? String(window.location.hostname).toLowerCase().trim() : '';
      var proto = (window.location && window.location.protocol) ? String(window.location.protocol).toLowerCase() : '';
      // Allow official domain smartworkerpro.in (+ subdomains), local testing/APK WebView, and authorized cloud deploy previews
      var isAuthorized = (
        !host ||
        proto === 'file:' ||
        proto === 'content:' ||
        host === 'localhost' ||
        host === '127.0.0.1' ||
        host === 'smartworkerpro.in' ||
        host === 'www.smartworkerpro.in' ||
        host.endsWith('.smartworkerpro.in') ||
        host.endsWith('.androidplatform.net') ||
        host.endsWith('.web.app') ||
        host.endsWith('.firebaseapp.com') ||
        host.endsWith('.pages.dev') ||
        host.endsWith('.vercel.app') ||
        host.endsWith('.netlify.app') ||
        host.endsWith('.github.io')
      );
      window.SW_OFFICIAL_DOMAIN = 'smartworkerpro.in';
      if (!isAuthorized) {
        document.body.innerHTML = '<div style="position:fixed;inset:0;background:#020617;color:#f8fafc;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:24px;text-align:center;font-family:sans-serif;z-index:9999999;">' +
          '<div style="font-size:3rem;margin-bottom:12px;">🛡️</div>' +
          '<h2 style="color:#f87171;font-size:1.3rem;font-weight:800;margin-bottom:8px;">UNAUTHORIZED DOMAIN CLONE BLOCKED</h2>' +
          '<p style="color:#94a3b8;font-size:0.9rem;max-width:420px;line-height:1.5;">This software is cryptographically licensed exclusively to <b>https://smartworkerpro.in</b>.<br>Running a cloned copy on <b>' + host + '</b> is strictly prohibited.</p>' +
        '</div>';
        throw new Error('Unauthorized Domain Clone Blocked: ' + host);
      }
    })();

    // 3. Global Anti-Hang & Crash Recovery Guard
    window.addEventListener('error', function(evt) {
      console.warn('[SmartWorker Shield] Prevented UI hang from runtime error:', evt.message);
      return true;
    });
    window.addEventListener('unhandledrejection', function(evt) {
      console.warn('[SmartWorker Shield] Handled background promise:', evt.reason);
      if (evt && typeof evt.preventDefault === 'function') evt.preventDefault();
    });
  } catch (err) {}
})();


function openPrivacyLegalModal() {
  var m = document.getElementById('privacyLegalModal');
  if (m) m.style.display = 'flex';
}

function closePrivacyLegalModal() {
  var m = document.getElementById('privacyLegalModal');
  if (m) m.style.display = 'none';
}

function acceptAndClosePrivacyLegalModal() {
  localStorage.setItem('sw_legal_terms_accepted_v29', 'true');
  closePrivacyLegalModal();
}


// Auto-ensure QR Bridge UI exists in Glass Cutting & purge stale SW caches (< v71)
(function ensureGlassQrBridgeAndFreshCache() {
    const injectBridgeIfNeeded = () => {
        if (document.getElementById('gc_qr_bridge_box')) return;
        const gcScreen = document.getElementById('screen-glass_cutting');
        if (!gcScreen) return;
        const formGrid = gcScreen.querySelector('.form-grid');
        if (!formGrid) return;
        const wrap = document.createElement('div');
        wrap.id = 'gc_qr_bridge_box';
        wrap.style.cssText = 'background:linear-gradient(135deg, #f0fdf4, #e0f2fe); border:2px dashed #0284c7; border-radius:12px; padding:10px 12px; margin-bottom:14px;';
        wrap.innerHTML = `
          <div style="font-size:0.78rem; font-weight:800; color:#0369a1; margin-bottom:4px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:4px;">
            <span><i class="fa-solid fa-qrcode" style="color:#059669;"></i> FABRICATOR ↔ GLASS CUTTER QR AUTO-LOAD</span>
            <span style="font-size:0.66rem; background:#059669; color:#ffffff; padding:2px 8px; border-radius:99px;">1-Scan Auto-Import</span>
          </div>
          <div style="font-size:0.71rem; color:#334155; margin-bottom:8px; line-height:1.35;">
            Scan the QR Code on any Fabricator's <b>2. GLASS PDF + QR</b> (or paste the <b>SWG|...</b> code) to auto-load all glass sizes & generate the <b>4'x8' cutting chart</b>!
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:7px;">
            <button type="button" class="action-btn" style="background:#059669; color:#fff; padding:10px 6px; font-size:0.74rem; font-weight:800; border-radius:8px; display:flex; align-items:center; justify-content:center; gap:5px; margin:0;" onclick="startGlassOrderQrScanner()">
              <i class="fa-solid fa-camera"></i> <span>SCAN PDF QR CODE</span>
            </button>
            <button type="button" class="action-btn" style="background:#0284c7; color:#fff; padding:10px 6px; font-size:0.74rem; font-weight:800; border-radius:8px; display:flex; align-items:center; justify-content:center; gap:5px; margin:0;" onclick="document.getElementById('gc_qr_img_input').click()">
              <i class="fa-solid fa-image"></i> <span>SCAN FROM IMAGE</span>
            </button>
            <button type="button" class="action-btn" style="background:#4f46e5; color:#fff; padding:10px 6px; font-size:0.74rem; font-weight:800; border-radius:8px; display:flex; align-items:center; justify-content:center; gap:5px; margin:0;" onclick="promptImportGlassOrderCode()">
              <i class="fa-solid fa-paste"></i> <span>ENTER 4-DIGIT CODE</span>
            </button>
            <button type="button" class="action-btn" style="background:#0d9488; color:#fff; padding:10px 6px; font-size:0.74rem; font-weight:800; border-radius:8px; display:flex; align-items:center; justify-content:center; gap:5px; margin:0;" onclick="shareCurrentGlassListToCutterWhatsApp()">
              <i class="fa-brands fa-whatsapp"></i> <span>SEND TO CUTTER</span>
            </button>
          </div>
          <input type="file" id="gc_qr_img_input" accept="image/*" style="display:none;" onchange="scanGlassQrFromImageFile(event)">
          <div id="gc_qr_camera_box" style="display:none; margin-top:10px; background:#0f172a; border:2px solid #10b981; border-radius:10px; padding:10px; text-align:center;">
            <div style="font-size:0.75rem; color:#6ee7b7; margin-bottom:6px; font-weight:800;">Point Camera at the QR Code on "2. GLASS PDF + QR"</div>
            <video id="gc_qr_video" playsinline muted style="width:100%; max-width:320px; border-radius:8px; border:1px solid #334155;"></video>
            <div style="margin-top:8px;">
              <button type="button" class="action-btn" style="background:#ef4444; color:#fff; padding:7px 16px; font-size:0.74rem; font-weight:800; border-radius:8px; width:auto; display:inline-flex; align-items:center; gap:5px;" onclick="stopGlassOrderQrScanner()">
                <i class="fa-solid fa-xmark"></i> <span>Close Camera</span>
              </button>
            </div>
          </div>
          <div id="gc_qr_import_status" style="display:none; margin-top:8px; background:#dcfce7; border:1px solid #16a34a; color:#14532d; padding:8px 10px; border-radius:8px; display:size:0.75rem; font-weight:700;"></div>
        `;
        formGrid.parentNode.insertBefore(wrap, formGrid);
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectBridgeIfNeeded);
    } else {
        injectBridgeIfNeeded();
    }
    if ('caches' in window) {
        caches.keys().then(keys => {
            keys.forEach(k => {
                if (k.indexOf('v104') === -1) caches.delete(k);
    try { renderDoorRowBuilder(); renderPtCadDesigner(); renderCasementSectionDesigner(); } catch(e){}
            });
        }).catch(() => {});
    }
})();


// =========================================================================
// 12 FT / 16 FT ALUMINIUM PIPE / BAR 1D CUTTING OPTIMIZER & VISUAL DRAWING (v80)
// =========================================================================
var bc_items_list = [];

function pack1DBarsBestFit(piecesInput, stockLenIn, kerfIn) {
  stockLenIn = Number(stockLenIn) || 144.0;
  kerfIn = Math.max(0, Number(kerfIn) || 0);
  // Expand quantities into individual pieces and sort descending (Best-Fit Decreasing)
  var pieces = [];
  (piecesInput || []).forEach(function(item) {
    var len = Number(item.len_in) || 0;
    var qty = Math.max(1, parseInt(item.qty, 10) || 1);
    if (len <= 0) return;
    for (var i = 0; i < qty; i++) {
      pieces.push({
        len: len,
        tag: item.tag || 'Cut',
        profile: item.profile || 'Aluminium Bar'
      });
    }
  });
  pieces.sort(function(a, b) { return b.len - a.len; });

  var bars = [];
  pieces.forEach(function(pc) {
    // Handle piece longer than stock bar gracefully (clamp or mark oversize)
    var bestBarIdx = -1;
    var minRemainingAfter = 999999;
    for (var b = 0; b < bars.length; b++) {
      var bar = bars[b];
      var extraKerf = (bar.cuts.length > 0) ? kerfIn : 0;
      var needed = pc.len + extraKerf;
      if (bar.remaining >= needed - 0.001) {
        var remAfter = bar.remaining - needed;
        if (remAfter < minRemainingAfter) {
          minRemainingAfter = remAfter;
          bestBarIdx = b;
        }
      }
    }
    if (bestBarIdx !== -1) {
      var targetBar = bars[bestBarIdx];
      var extraK = (targetBar.cuts.length > 0) ? kerfIn : 0;
      targetBar.cuts.push({ len: pc.len, tag: pc.tag, offset: targetBar.used + extraK });
      targetBar.used += (pc.len + extraK);
      targetBar.remaining = Math.max(0, stockLenIn - targetBar.used);
    } else {
      var clampedUsed = Math.min(stockLenIn, pc.len);
      bars.push({
        barNo: bars.length + 1,
        stockLen: stockLenIn,
        cuts: [{ len: pc.len, tag: pc.tag, offset: 0, oversize: pc.len > stockLenIn }],
        used: clampedUsed,
        remaining: Math.max(0, stockLenIn - clampedUsed)
      });
    }
  });
  return bars;
}

function addBarCuttingItem() {
  var rawLen = safeEval(document.getElementById('bc_len') ? document.getElementById('bc_len').value : '0');
  if (rawLen <= 0) {
    alert("Please enter Cut Piece Length first.");
    return;
  }
  var isMm = document.getElementById('bc_unit') && document.getElementById('bc_unit').value.indexOf('Millimeter') !== -1;
  var lenIn = isMm ? (rawLen / 25.4) : rawLen;
  var qty = Math.max(1, parseInt(safeEval(document.getElementById('bc_qty') ? document.getElementById('bc_qty').value : '1')) || 1);
  var profile = (document.getElementById('bc_profile') ? document.getElementById('bc_profile').value.trim() : '') || 'Aluminium Bar';
  var tag = (document.getElementById('bc_tag') ? document.getElementById('bc_tag').value.trim() : '') || ('P' + (bc_items_list.length + 1));

  bc_items_list.push({
    profile: profile,
    len_in: parseFloat(lenIn.toFixed(3)),
    qty: qty,
    tag: tag
  });

  if (document.getElementById('bc_len')) document.getElementById('bc_len').value = '';
  if (document.getElementById('bc_tag')) document.getElementById('bc_tag').value = '';
  recalculateBarCuttingPlan();
}

function removeLastBarCuttingItem() {
  if (!bc_items_list.length) return;
  bc_items_list.pop();
  recalculateBarCuttingPlan();
}

function clearBarCutting() {
  bc_items_list = [];
  if (document.getElementById('bc_len')) document.getElementById('bc_len').value = '';
  if (document.getElementById('bc_out')) document.getElementById('bc_out').textContent = '';
  var box = document.getElementById('bc_visual_layout_box');
  if (box) { box.style.display = 'none'; box.innerHTML = ''; }
}

function importBucketsToBarOptimizer(modPrefix) {
  var srcBuckets = null;
  var modName = '';
  if (modPrefix === 'dm' && typeof dm_buckets !== 'undefined') { srcBuckets = dm_buckets; modName = 'Domal'; }
  else if (modPrefix === 'sl' && typeof sl_buckets !== 'undefined') { srcBuckets = sl_buckets; modName = 'Sliding'; }
  else if (modPrefix === 'dr' && typeof dr_buckets !== 'undefined') { srcBuckets = dr_buckets; modName = 'Door'; }
  else if (modPrefix === 'pt' && typeof pt_buckets !== 'undefined') { srcBuckets = pt_buckets; modName = 'Partition'; }
  else if (modPrefix === 'cc') {
    modName = 'Casement';
    var hasCc = (typeof cc_buckets !== 'undefined' && Object.values(cc_buckets).some(function(a){ return a && a.length; }));
    var hasCs = (typeof cs_buckets !== 'undefined' && Object.values(cs_buckets).some(function(a){ return a && a.length; }));
    if (hasCc) srcBuckets = cc_buckets;
    else if (hasCs) srcBuckets = cs_buckets;
  }
  else if (modPrefix === 'uc' && typeof uc_buckets !== 'undefined') { srcBuckets = uc_buckets; modName = 'uPVC Casement'; }
  else if (modPrefix === 'us' && typeof us_buckets !== 'undefined') { srcBuckets = us_buckets; modName = 'uPVC Sliding'; }
  else if (modPrefix === 'ud' && typeof ud_buckets !== 'undefined') { srcBuckets = ud_buckets; modName = 'uPVC Door'; }

  if (modPrefix === 'uc' || modPrefix === 'us' || modPrefix === 'ud') {
    var lenSel = document.getElementById('bc_stock_len');
    var unitSel = document.getElementById('bc_unit');
    if (lenSel) lenSel.value = '234.25';
    if (unitSel) unitSel.value = 'Millimeter';
  }

  var imported = [];
  if (srcBuckets) {
    Object.keys(srcBuckets).forEach(function(profName) {
      var arr = srcBuckets[profName] || [];
      if (!arr.length) return;
      // Group identical lengths
      var counts = {};
      arr.forEach(function(val) {
        var v = parseFloat(Number(val).toFixed(2));
        if (v > 0) counts[v] = (counts[v] || 0) + 1;
      });
      Object.keys(counts).forEach(function(lenKey) {
        imported.push({
          profile: profName,
          len_in: parseFloat(lenKey),
          qty: counts[lenKey],
          tag: modName
        });
      });
    });
  }

  if (!imported.length) {
    alert("No calculated " + (modName || "aluminium") + " pieces found yet! Please calculate a " + (modName || "window/door") + " first, or enter cut lengths manually below.");
    return;
  }
  bc_items_list = imported;
  recalculateBarCuttingPlan();
  var box = document.getElementById('bc_visual_layout_box');
  if (box) box.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function groupBarItemsByProfile(items) {
  var groups = {};
  (items || []).forEach(function(it) {
    var p = it.profile || 'Aluminium Bar';
    if (/^Domal Sash (Top\/Bottom|Handle)\s*\(([^)]+)\)$/i.test(p)) {
      p = p.replace(/^Domal Sash (Top\/Bottom|Handle)\s*\(([^)]+)\)$/i, 'Domal Sash (Handle + Top/Bottom) ($2)');
    }
    if (!groups[p]) groups[p] = [];
    groups[p].push(it);
  });
  return groups;
}

var BC_REMNANT_STORAGE_KEY = 'sw_workshop_remnants_v1';
var BC_MIN_USABLE_IN = 12.0; // Strictly < 12" (1 Foot) = SCRAP (No QR / Not Saved!)
var bc_last_plan_offcuts = []; // Usable offcuts (>= 12") from latest plan
var bc_last_used_remnants = []; // Remnants consumed from Workshop Stock in latest plan

function loadWorkshopRemnants() {
  try {
    var raw = localStorage.getItem(BC_REMNANT_STORAGE_KEY);
    var arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (e) { return []; }
}

function saveWorkshopRemnants(arr) {
  try { localStorage.setItem(BC_REMNANT_STORAGE_KEY, JSON.stringify(arr || [])); } catch (e) {}
  renderWorkshopRemnantStockUI();
}

function nextRemnantId(list) {
  var maxN = 100;
  (list || []).forEach(function(r) {
    var m = String(r.id || '').match(/(?:REM-|#)(\d+)/);
    if (m) maxN = Math.max(maxN, parseInt(m[1], 10));
  });
  return '#' + (maxN + 1);
}

function renderWorkshopRemnantStockUI() {
  var el = document.getElementById('bc_workshop_stock_list');
  if (!el) return;
  var qSearch = (document.getElementById('bc_stock_search')?.value || '').trim().toLowerCase();
  var list = loadWorkshopRemnants().filter(function(r) {
    if (!(r.qty > 0 && r.len_in >= BC_MIN_USABLE_IN)) return false;
    if (!qSearch) return true;
    return String(r.id).toLowerCase().includes(qSearch) || String(r.profile).toLowerCase().includes(qSearch);
  });
  if (!list.length) {
    el.innerHTML = 'No usable offcuts (≥12") in Workshop Stock yet. After cutting, tap <b>Save Offcuts (≥12")</b>!';
    return;
  }
  var isMm = document.getElementById('bc_unit') && document.getElementById('bc_unit').value.indexOf('Millimeter') !== -1;
  var disp = function(v) { return isMm ? toMmStr(v) : toFractionInch(v); };
  var totalPcs = list.reduce(function(s, r) { return s + (r.qty || 1); }, 0);
  var h = '<div style="font-weight:800; color:#065f46; margin-bottom:5px;">Total Available in Workshop: ' + totalPcs + ' Usable Piece(s) (≥12")</div>';
  list.forEach(function(r, idx) {
    h += '<div style="display:flex; justify-content:space-between; align-items:center; background:#fff; border:1px solid #fde68a; border-radius:6px; padding:5px 7px; margin-bottom:4px; gap:6px;">';
    h += '<div><span style="background:#0f766e; color:#fff; padding:1px 5px; border-radius:4px; font-size:0.63rem; font-weight:800; margin-right:5px;">' + r.id + '</span><b>' + escapeHtml(r.profile) + '</b><div style="font-size:0.67rem; color:#475569; margin-top:1px;">Length: <b style="color:#b45309;">' + disp(r.len_in) + '</b>  •  Qty: <b style="color:#059669;">' + r.qty + ' pc(s)</b></div></div>';
    h += '<button type="button" onclick="deleteWorkshopRemnant(' + idx + ')" style="background:#fee2e2; color:#b91c1c; border:none; border-radius:5px; padding:4px 7px; font-size:0.66rem; font-weight:800; cursor:pointer;">✕</button>';
    h += '</div>';
  });
  el.innerHTML = h;
}

function deleteWorkshopRemnant(idx) {
  var list = loadWorkshopRemnants();
  list.splice(idx, 1);
  saveWorkshopRemnants(list);
  recalculateBarCuttingPlan();
}

function clearAllWorkshopRemnants() {
  if (!confirm("Clear all saved Workshop Remnant Stock?")) return;
  saveWorkshopRemnants([]);
  recalculateBarCuttingPlan();
}

function saveUsableOffcutsToStock() {
  if (!bc_last_plan_offcuts.length) {
    alert("No usable offcuts (≥ 12\" / 1 Foot) found in the current cutting plan! Pieces under 12\" are treated as Scrap.");
    return;
  }
  var stock = loadWorkshopRemnants();
  var today = new Date().toLocaleDateString('en-GB');
  var addedPcs = 0;
  bc_last_plan_offcuts.forEach(function(off) {
    if (off.len_in < BC_MIN_USABLE_IN || off.qty <= 0) return;
    // Merge if same profile and exact same length (within 0.1")
    var existing = stock.find(function(s) {
      return s.profile.toLowerCase() === off.profile.toLowerCase() && Math.abs(s.len_in - off.len_in) < 0.1;
    });
    if (existing) {
      existing.qty += off.qty;
      existing.date = today;
      off.remId = existing.id;
    } else {
      var newId = nextRemnantId(stock);
      stock.push({ id: newId, profile: off.profile, len_in: parseFloat(off.len_in.toFixed(3)), qty: off.qty, date: today });
      off.remId = newId;
    }
    addedPcs += off.qty;
  });
  saveWorkshopRemnants(stock);
  alert("Saved " + addedPcs + " usable offcut piece(s) (≥12\") to Workshop Stock! Tap 'Offcut QR Stickers PDF' to print labels.");
}

function confirmDeductUsedWorkshopStock() {
  if (!bc_last_used_remnants.length) return;
  var stock = loadWorkshopRemnants();
  var deducted = 0;
  bc_last_used_remnants.forEach(function(u) {
    var rec = stock.find(function(s) { return s.id === u.remId; });
    if (rec && rec.qty > 0) {
      var take = Math.min(rec.qty, u.qty);
      rec.qty -= take;
      deducted += take;
    }
  });
  stock = stock.filter(function(s) { return s.qty > 0; });
  saveWorkshopRemnants(stock);
  alert("Deducted " + deducted + " used piece(s) from Workshop Stock!");
  recalculateBarCuttingPlan();
}

function pack1DBarsAutoMix(items, kerfIn) {
  // Automatically selects best stock bar length (12 Ft = 144", 15 Ft = 180", 16 Ft = 192") per bar for MINIMUM WASTE!
  var candidates = [144, 180, 192];
  var pieces = [];
  (items || []).forEach(function(it) {
    var q = Math.max(1, parseInt(it.qty, 10) || 1);
    for (var i = 0; i < q; i++) pieces.push({ len: parseFloat(it.len_in), tag: it.tag || '' });
  });
  pieces.sort(function(a, b) { return b.len - a.len; });

  var bars = [];
  var rem = pieces.slice();
  var barNo = 1;

  while (rem.length > 0) {
    var bestPlan = null;
    candidates.forEach(function(cLen) {
      if (rem[0].len > cLen + 0.01) return;
      var cuts = [], used = 0, usedIdx = [];
      for (var i = 0; i < rem.length; i++) {
        var need = rem[i].len + (cuts.length > 0 ? kerfIn : 0);
        if (used + need <= cLen + 0.001) {
          cuts.push({ len: rem[i].len, tag: rem[i].tag, offset: used + (cuts.length > 0 ? kerfIn : 0) });
          used += need;
          usedIdx.push(i);
        }
      }
      if (!cuts.length) return;
      var util = used / cLen;
      var waste = Math.max(0, cLen - used);
      // Prefer higher utilization %; on near-tie (within 1%), prefer smaller standard 12' bar
      if (!bestPlan || util > bestPlan.util + 0.008 || (Math.abs(util - bestPlan.util) <= 0.008 && cLen < bestPlan.stockLen)) {
        bestPlan = { stockLen: cLen, stockFt: Math.round(cLen / 12), cuts: cuts, used: used, remaining: waste, util: util, usedIdx: usedIdx };
      }
    });

    if (!bestPlan) {
      // Piece longer than 16' -> fallback to 20'
      var p0 = rem.shift();
      bars.push({ barNo: barNo++, stockLen: 240, stockFt: 20, cuts: [{ len: p0.len, tag: p0.tag, offset: 0 }], used: p0.len, remaining: Math.max(0, 240 - p0.len) });
      continue;
    }

    bars.push({ barNo: barNo++, stockLen: bestPlan.stockLen, stockFt: bestPlan.stockFt, cuts: bestPlan.cuts, used: bestPlan.used, remaining: bestPlan.remaining });
    // Remove used pieces from rem (reverse index order)
    for (var k = bestPlan.usedIdx.length - 1; k >= 0; k--) rem.splice(bestPlan.usedIdx[k], 1);
  }
  return bars;
}

function pack1DBarsWithWorkshopStock(items, stockLenIn, kerfIn, profileName, useWorkshopStock) {
  // Expand all cut pieces sorted descending
  var allPieces = [];
  (items || []).forEach(function(it) {
    var q = Math.max(1, parseInt(it.qty, 10) || 1);
    for (var i = 0; i < q; i++) allPieces.push({ len: parseFloat(it.len_in), tag: it.tag || '' });
  });
  allPieces.sort(function(a, b) { return b.len - a.len; });

  var stockUsedBars = [];
  var remainingPieces = [];

  if (useWorkshopStock) {
    var available = loadWorkshopRemnants()
      .filter(function(r) { return r.qty > 0 && r.len_in >= BC_MIN_USABLE_IN && r.profile.toLowerCase() === String(profileName || '').toLowerCase(); })
      .sort(function(a, b) { return a.len_in - b.len_in; }); // Prefer smallest remnant that fits (Best-Fit!)

    // Expand pool of individual remnants (cap at 500 for instant mobile performance)
    var remPool = [];
    available.forEach(function(r) {
      var cap = Math.min(500, parseInt(r.qty, 10) || 0);
      for (var k = 0; k < cap; k++) {
        remPool.push({ remId: r.id, stockLen: r.len_in, cuts: [], used: 0, remaining: r.len_in, fromStock: true });
      }
    });

    allPieces.forEach(function(pc) {
      var bestIdx = -1, bestRemAfter = 999999;
      for (var i = 0; i < remPool.length; i++) {
        var rb = remPool[i];
        var need = pc.len + (rb.cuts.length > 0 ? kerfIn : 0);
        if (rb.remaining + 0.001 >= need) {
          var after = rb.remaining - need;
          if (after < bestRemAfter) {
            bestRemAfter = after;
            bestIdx = i;
          }
        }
      }
      if (bestIdx !== -1) {
        var chosen = remPool[bestIdx];
        var off = chosen.used + (chosen.cuts.length > 0 ? kerfIn : 0);
        chosen.cuts.push({ len: pc.len, tag: pc.tag, offset: off });
        chosen.used = off + pc.len;
        chosen.remaining = Math.max(0, chosen.stockLen - chosen.used);
      } else {
        remainingPieces.push(pc);
      }
    });

    stockUsedBars = remPool.filter(function(rb) { return rb.cuts.length > 0; });
  } else {
    remainingPieces = allPieces;
  }

  // Pack remaining pieces into brand-new 12'/16' stock bars
  var newBars = [];
  if (remainingPieces.length > 0) {
    var remItems = remainingPieces.map(function(p) { return { len_in: p.len, qty: 1, tag: p.tag }; });
    if (stockLenIn === 'AUTO_MIX') {
      newBars = pack1DBarsAutoMix(remItems, kerfIn);
    } else {
      newBars = pack1DBarsBestFit(remItems, stockLenIn, kerfIn);
      newBars.forEach(function(b) { b.stockLen = stockLenIn; b.stockFt = Math.round(stockLenIn / 12); });
    }
  }
  return { stockUsedBars: stockUsedBars, newBars: newBars };
}

function groupIdenticalBars(bars) {
  var grouped = [];
  var map = {};
  (bars || []).forEach(function(bar) {
    var prefix = bar.fromStock ? ('STK|' + bar.remId + '|' + bar.stockLen.toFixed(2) + '|') : ('NEW|' + (bar.stockFt || 12) + '|');
    var sig = prefix + bar.cuts.map(function(c) { return c.len.toFixed(3); }).join('|') + '||' + bar.remaining.toFixed(3);
    if (map[sig]) {
      map[sig].qty += 1;
      map[sig].barNos.push(bar.barNo || 0);
    } else {
      var entry = { qty: 1, barNos: [bar.barNo || 0], bar: bar };
      map[sig] = entry;
      grouped.push(entry);
    }
  });
  return grouped;
}

var bc_last_plan_summary = [];
function recalculateBarCuttingPlan() {
  renderWorkshopRemnantStockUI();
  var box = document.getElementById('bc_visual_layout_box');
  var outEl = document.getElementById('bc_out');
  bc_last_plan_offcuts = [];
  bc_last_used_remnants = [];
  bc_last_plan_summary = [];

  if (!bc_items_list.length) {
    if (box) { box.style.display = 'none'; box.innerHTML = ''; }
    if (outEl) outEl.textContent = '';
    if (typeof renderPhaseMaterialBox === 'function') renderPhaseMaterialBox();
    return;
  }

  var rawStockVal = document.getElementById('bc_stock_len')?.value || 'AUTO_MIX';
  var isAutoMix = (rawStockVal === 'AUTO_MIX');
  var stockLenIn = isAutoMix ? 'AUTO_MIX' : (parseFloat(rawStockVal) || 144.0);
  var stockFt = isAutoMix ? '12/15/16' : Math.round(stockLenIn / 12);
  var kerfIn = parseFloat(document.getElementById('bc_kerf')?.value);
  if (isNaN(kerfIn)) kerfIn = 0.125;
  var isMm = document.getElementById('bc_unit') && document.getElementById('bc_unit').value.indexOf('Millimeter') !== -1;
  var useStock = document.getElementById('bc_use_stock_chk') ? document.getElementById('bc_use_stock_chk').checked : true;
  var disp = function(v) { return isMm ? toMmStr(v) : toFractionInch(v); };

  var groups = groupBarItemsByProfile(bc_items_list);
  var grandNewBars = 0, grandStockReused = 0, grandUsedLen = 0, grandStockLen = 0;
  var grandUsableOffcuts = 0, grandScrapCount = 0;

  var html = '';
  var textOut = "=== " + stockFt + " FT ALU BAR CUTTING PLAN (KERF: " + (kerfIn === 0 ? "0 mm" : toMmStr(kerfIn)) + ") ===\n";
  var palette = ['#0284c7', '#0f766e', '#7c3aed', '#2563eb', '#0891b2', '#d97706'];

  Object.keys(groups).forEach(function(pName) {
    var packed = pack1DBarsWithWorkshopStock(groups[pName], stockLenIn, kerfIn, pName, useStock);
    var stockUsed = packed.stockUsedBars;
    var newBars = packed.newBars;
    grandStockReused += stockUsed.length;
    grandNewBars += newBars.length;
    if (newBars.length > 0) {
      bc_last_plan_summary.push({ profile: pName, totalBars: newBars.length, stockFt: String(stockFt) });
    }

    var allBarsThisProfile = stockUsed.concat(newBars);
    var pUsed = 0, pStock = 0;
    allBarsThisProfile.forEach(function(b) {
      pUsed += b.used;
      pStock += (b.stockLen || (isAutoMix ? 144 : stockLenIn));
    });
    grandUsedLen += pUsed;
    grandStockLen += pStock;
    var pUtilPct = pStock > 0 ? ((pUsed / pStock) * 100).toFixed(1) : '0.0';

    textOut += "\n[" + pName.toUpperCase() + "] -> NEW BARS TO BUY: " + newBars.length + " (" + stockFt + " Ft)" + (stockUsed.length > 0 ? (" | REUSED FROM WORKSHOP STOCK: " + stockUsed.length + " pc(s)") : "") + "\n";

    html += '<div style="margin-bottom:12px; border:1px solid #cbd5e1; border-radius:9px; padding:8px; background:#f8fafc;">';
    html += '<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px; margin-bottom:6px; border-bottom:1px solid #e2e8f0; padding-bottom:4px;">';
    html += '<span style="font-size:0.78rem; font-weight:800; color:#0f172a;">' + pName + '</span>';
    html += '<span style="font-size:0.7rem; font-weight:800; color:#0f766e;">Buy ' + newBars.length + ' New Bar' + (newBars.length !== 1 ? 's' : '') + (stockUsed.length > 0 ? (' + <span style="color:#15803d;">' + stockUsed.length + ' From Stock</span>') : '') + ' • ' + pUtilPct + '% Used</span>';
    html += '</div>';

    // Track consumed remnants
    var groupedStock = groupIdenticalBars(stockUsed);
    groupedStock.forEach(function(gEntry) {
      var bar = gEntry.bar;
      var qty = gEntry.qty;
      bc_last_used_remnants.push({ remId: bar.remId, profile: pName, len_in: bar.stockLen, qty: qty });
      if (bar.remaining >= BC_MIN_USABLE_IN) {
        bc_last_plan_offcuts.push({ profile: pName, len_in: bar.remaining, qty: qty });
        grandUsableOffcuts += qty;
      } else if (bar.remaining > 0.1) {
        grandScrapCount += qty;
      }
      var qtyLabel = (qty > 1 ? ('× ' + qty + ' ') : '1 ') + 'FROM STOCK (' + bar.remId + ')';
      var cutListStr = bar.cuts.map(function(c) { return disp(c.len); }).join(' + ');
      textOut += "  ★ [" + qtyLabel + " • " + disp(bar.stockLen) + "] " + cutListStr + " | " + (bar.remaining >= BC_MIN_USABLE_IN ? ("Usable Offcut: " + disp(bar.remaining)) : ("Scrap: " + disp(bar.remaining))) + "\n";

      var svgW = 500, svgH = 34;
      var scale = (svgW - 12) / bar.stockLen;
      html += '<div style="margin-bottom:7px; background:#f0fdf4; border:1px solid #86efac; border-radius:6px; padding:4px 6px;">';
      html += '<div style="display:flex; justify-content:space-between; align-items:center; font-size:0.68rem; font-weight:700; color:#166534; margin-bottom:2px;">';
      html += '<span><span style="background:#16a34a; color:#fff; padding:1px 6px; border-radius:4px; font-weight:800; margin-right:5px;">★ ' + qtyLabel + '</span> (' + disp(bar.stockLen) + ')</span>';
      html += '<span style="color:' + (bar.remaining >= BC_MIN_USABLE_IN ? '#047857' : '#64748b') + ';">' + (bar.remaining >= BC_MIN_USABLE_IN ? ('Usable: ' + disp(bar.remaining)) : ('Scrap (<12"): ' + disp(bar.remaining))) + '</span>';
      html += '</div>';
      html += '<svg viewBox="0 0 ' + svgW + ' ' + svgH + '" style="width:100%; height:auto; background:#ffffff; border:1px solid #16a34a; border-radius:5px; display:block;">';
      html += '<rect x="6" y="3" width="' + (svgW - 12) + '" height="28" rx="3" fill="#dcfce7" stroke="#166534" stroke-width="1.1"/>';
      bar.cuts.forEach(function(c) {
        var rx = 6 + (c.offset * scale);
        var rw = Math.max(4, Math.min(svgW - 6 - rx, c.len * scale));
        html += '<rect x="' + rx + '" y="3" width="' + rw + '" height="28" fill="#15803d" stroke="#ffffff" stroke-width="1.4"/>';
        if (rw >= 34) html += '<text x="' + (rx + rw / 2) + '" y="20" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">' + disp(c.len) + '</text>';
      });
      html += '</svg></div>';
    });

    // Track new 12'/16' bars grouped by pattern
    var groupedNew = groupIdenticalBars(newBars);
    groupedNew.forEach(function(gEntry) {
      var bar = gEntry.bar;
      var qty = gEntry.qty;
      var isUsable = (bar.remaining >= BC_MIN_USABLE_IN);
      if (isUsable) {
        bc_last_plan_offcuts.push({ profile: pName, len_in: bar.remaining, qty: qty });
        grandUsableOffcuts += qty;
      } else if (bar.remaining > 0.1) {
        grandScrapCount += qty;
      }
      var bFt = bar.stockFt || (isAutoMix ? 12 : stockFt); var qtyLabel = (qty > 1 ? ('× ' + qty + ' Bars') : '1 Bar') + ' [' + bFt + "']";
      var cutListStr = bar.cuts.map(function(c) { return disp(c.len); }).join(' + ');
      textOut += "  [" + qtyLabel + "]  " + cutListStr + "  |  " + (isUsable ? ("Usable Offcut (≥12\"): " + disp(bar.remaining)) : ("Scrap (<12\"): " + disp(bar.remaining))) + "\n";

      var svgW = 500, svgH = 36;
      var scale = (svgW - 12) / (bar.stockLen || 144);
      html += '<div style="margin-bottom:8px;">';
      html += '<div style="display:flex; justify-content:space-between; align-items:center; font-size:0.69rem; font-weight:700; color:#334155; margin-bottom:2px;">';
      html += '<span><span style="background:#0f766e; color:#fff; padding:1px 6px; border-radius:4px; font-weight:800; margin-right:5px;">' + qtyLabel + '</span> (' + bar.cuts.length + ' cuts each)</span>';
      html += '<span style="color:' + (isUsable ? '#047857' : '#94a3b8') + '; font-weight:800;">' + (isUsable ? ('✓ Usable Offcut: ' + disp(bar.remaining)) : ('Scrap (<12"): ' + disp(bar.remaining))) + '</span>';
      html += '</div>';
      html += '<svg viewBox="0 0 ' + svgW + ' ' + svgH + '" style="width:100%; height:auto; background:#ffffff; border:1px solid #94a3b8; border-radius:6px; display:block;">';
      html += '<rect x="6" y="4" width="' + (svgW - 12) + '" height="30" rx="3" fill="' + (isUsable ? '#fef3c7' : '#e2e8f0') + '" stroke="#0f172a" stroke-width="1.2"/>';
      bar.cuts.forEach(function(c, ci) {
        var rx = 6 + (c.offset * scale);
        var rw = Math.max(4, Math.min(svgW - 6 - rx, c.len * scale));
        var col = palette[ci % palette.length];
        html += '<rect x="' + rx + '" y="4" width="' + rw + '" height="30" fill="' + col + '" stroke="#ffffff" stroke-width="1.5"/>';
        if (rw >= 36) html += '<text x="' + (rx + rw / 2) + '" y="22" font-size="10.5" font-weight="bold" fill="#ffffff" text-anchor="middle">' + disp(c.len) + '</text>';
      });
      if (bar.remaining * scale >= 34) {
        var wx = 6 + (bar.used * scale) + ((bar.remaining * scale) / 2);
        html += '<text x="' + wx + '" y="22" font-size="9.5" font-weight="bold" fill="' + (isUsable ? '#92400e' : '#64748b') + '" text-anchor="middle">' + disp(bar.remaining) + '</text>';
      }
      html += '</svg></div>';
    });
    html += '</div>';
  });

  var totalUtil = grandStockLen > 0 ? ((grandUsedLen / grandStockLen) * 100).toFixed(1) : '0.0';
  var totalWaste = (100 - parseFloat(totalUtil)).toFixed(1);

  var stockBanner = '';
  if (grandStockReused > 0) {
    stockBanner = '<div style="background:#dcfce7; border:1.5px solid #16a34a; border-radius:8px; padding:8px; margin-bottom:9px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">' +
      '<div style="font-size:0.74rem; font-weight:800; color:#166534;"><i class="fa-solid fa-recycle"></i> WORKSHOP STOCK AUTO-USED: ' + grandStockReused + ' Piece(s) from your Workshop Stock!</div>' +
      '<button type="button" onclick="confirmDeductUsedWorkshopStock()" style="background:#16a34a; color:#fff; border:none; border-radius:6px; padding:5px 9px; font-size:0.69rem; font-weight:800; cursor:pointer;">Confirm &amp; Deduct Stock</button>' +
      '</div>';
  }

  html = stockBanner +
         '<div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; margin-bottom:10px; text-align:center;">' +
         '<div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:8px; padding:6px;"><div style="font-size:0.63rem; color:#0f766e; font-weight:700;">NEW BARS TO BUY</div><div style="font-size:0.95rem; font-weight:900; color:#0f172a;">' + grandNewBars + ' (' + stockFt + ' Ft)</div></div>' +
         '<div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:6px;"><div style="font-size:0.63rem; color:#15803d; font-weight:700;">USABLE OFFCUTS</div><div style="font-size:0.95rem; font-weight:900; color:#166534;">' + grandUsableOffcuts + ' pc (≥12")</div></div>' +
         '<div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:6px;"><div style="font-size:0.63rem; color:#b45309; font-weight:700;">USED / WASTE</div><div style="font-size:0.95rem; font-weight:900; color:#b45309;">' + totalUtil + '% / ' + totalWaste + '%</div></div>' +
         '</div>' + html;

  textOut += "\n----------------------------------------\n";
  var mixCounts = {};
  Object.keys(groups).forEach(function(pn) {
    var pk = pack1DBarsWithWorkshopStock(groups[pn], stockLenIn, kerfIn, pn, useStock);
    pk.newBars.forEach(function(b) { var f = b.stockFt || 12; mixCounts[f] = (mixCounts[f] || 0) + 1; });
  });
  var mixSummaryStr = Object.keys(mixCounts).sort(function(a,b){return a-b;}).map(function(f){ return mixCounts[f] + " × " + f + " Ft"; }).join("  +  ") || "0 Bars";
  textOut += "• BUY BREAKDOWN: " + mixSummaryStr + "  (Total: " + grandNewBars + " New Bars)\n";
  if (grandStockReused > 0) textOut += "• REUSED FROM WORKSHOP STOCK: " + grandStockReused + " Remnant Piece(s)\n";
  textOut += "• USABLE OFFCUTS (≥12\" — QR Eligible): " + grandUsableOffcuts + " pc(s)  |  SCRAP (<12\" — No QR): " + grandScrapCount + " pc(s)\n";
  textOut += "• OVERALL UTILIZATION: " + totalUtil + "%  |  WASTAGE: " + totalWaste + "%\n";

  if (box) { box.style.display = 'block'; box.innerHTML = html; }
  if (outEl) outEl.textContent = textOut;
  if (typeof renderPhaseMaterialBox === 'function') renderPhaseMaterialBox();
}

// ========================================================
// PHASE-WISE MATERIAL ORDER & PENDING BALANCE (STARTS 10%)
// ========================================================
var BC_PHASE_STORAGE_KEY = 'sw_bc_phase_orders_v1';
var bc_selected_phase_pct = 10;

function getBcPhaseState() {
  try {
    var raw = localStorage.getItem(BC_PHASE_STORAGE_KEY);
    if (raw) {
      var parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.phases)) return parsed;
    }
  } catch (e) {}
  return { projectName: '', phases: [] };
}

function saveBcPhaseState(state) {
  try { localStorage.setItem(BC_PHASE_STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
}

function setBcPhasePct(pct) {
  var v = parseFloat(pct);
  if (isNaN(v) || v < 1) v = 10;
  if (v > 100) v = 100;
  bc_selected_phase_pct = v;
  var inp = document.getElementById('bc_phase_pct_inp');
  if (inp) inp.value = v;
  renderPhaseMaterialBox();
}

function getBcReceivedMap(phases) {
  var map = {};
  (phases || []).forEach(function(ph) {
    (ph.items || []).forEach(function(it) {
      map[it.profile] = (map[it.profile] || 0) + (parseInt(it.bars, 10) || 0);
    });
  });
  return map;
}

function computeNextPhaseItems(pct) {
  var st = getBcPhaseState();
  var recMap = getBcReceivedMap(st.phases);
  var out = [];
  (bc_last_plan_summary || []).forEach(function(row) {
    var total = row.totalBars || 0;
    var received = recMap[row.profile] || 0;
    var remaining = Math.max(0, total - received);
    var orderNow = 0;
    if (remaining > 0) {
      if (pct >= 100) {
        orderNow = remaining;
      } else {
        orderNow = Math.ceil((total * pct) / 100);
        if (orderNow < 1) orderNow = 1;
        if (orderNow > remaining) orderNow = remaining;
      }
    }
    out.push({
      profile: row.profile,
      stockFt: row.stockFt,
      totalBars: total,
      received: received,
      remaining: remaining,
      orderNow: orderNow
    });
  });
  return out;
}

function saveCurrentPhaseOrder() {
  if (!bc_last_plan_summary || !bc_last_plan_summary.length) return;
  var inp = document.getElementById('bc_phase_pct_inp');
  var pct = inp ? parseFloat(inp.value) : bc_selected_phase_pct;
  if (isNaN(pct) || pct < 1) pct = 10;
  if (pct > 100) pct = 100;

  var preview = computeNextPhaseItems(pct);
  var activeItems = preview.filter(function(x) { return x.orderNow > 0; });
  if (!activeItems.length) {
    alert("100% material for this project has already been ordered/received!");
    return;
  }

  var st = getBcPhaseState();
  var projInp = document.getElementById('bc_phase_proj_name');
  if (projInp && projInp.value.trim()) st.projectName = projInp.value.trim();

  var phaseNum = st.phases.length + 1;
  var totalNow = activeItems.reduce(function(s, x) { return s + x.orderNow; }, 0);
  var todayStr = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  st.phases.push({
    phaseNo: phaseNum,
    pct: pct,
    date: todayStr,
    totalBars: totalNow,
    items: activeItems.map(function(x) {
      return { profile: x.profile, stockFt: x.stockFt, bars: x.orderNow };
    })
  });
  saveBcPhaseState(st);
  renderPhaseMaterialBox();
}

function resetBcPhaseOrders() {
  if (!confirm("Reset all saved Phase Orders for a new building project?")) return;
  saveBcPhaseState({ projectName: '', phases: [] });
  bc_selected_phase_pct = 10;
  renderPhaseMaterialBox();
}

function exportBcPhasePdf(phaseIdx) {
  if (!window.jspdf || !window.jspdf.jsPDF) {
    alert("PDF engine is loading. Please wait 2 seconds and try again.");
    return;
  }
  var st = getBcPhaseState();
  var projName = (document.getElementById('bc_phase_proj_name')?.value || st.projectName || 'Building Project').trim();
  var safeTxt = function(s) {
    if (typeof toEnglishPdfSafe === 'function') return toEnglishPdfSafe(String(s || ''));
    return String(s || '').replace(/[^\x20-\x7E]/g, '').trim() || 'Project';
  };
  var prof = (typeof getProfileData === 'function') ? getProfileData() : {};
  var shopName = safeTxt(prof.shopName || 'SMART WORKER ALUMINIUM');
  var shopPhone = safeTxt(prof.phone || '');

  var titleLabel = '';
  var dateLabel = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  var rows = [];
  var sumTotal = 0, sumOrderNow = 0, sumRecAfter = 0, sumRemAfter = 0;

  if (typeof phaseIdx === 'number' && st.phases[phaseIdx]) {
    var ph = st.phases[phaseIdx];
    titleLabel = "PHASE " + ph.phaseNo + " MATERIAL ORDER (" + ph.pct + "%)";
    dateLabel = ph.date || dateLabel;
    var recUpTo = {};
    for (var i = 0; i <= phaseIdx; i++) {
      (st.phases[i].items || []).forEach(function(it) {
        recUpTo[it.profile] = (recUpTo[it.profile] || 0) + (parseInt(it.bars, 10) || 0);
      });
    }
    var phMap = {};
    (ph.items || []).forEach(function(it) { phMap[it.profile] = it.bars; });
    (bc_last_plan_summary || []).forEach(function(r, idx) {
      var ord = phMap[r.profile] || 0;
      var recA = recUpTo[r.profile] || 0;
      var remA = Math.max(0, r.totalBars - recA);
      sumTotal += r.totalBars; sumOrderNow += ord; sumRecAfter += recA; sumRemAfter += remA;
      rows.push([idx + 1, safeTxt(r.profile), r.stockFt + " Ft", r.totalBars, ord, recA, remA]);
    });
  } else {
    var pct = parseFloat(document.getElementById('bc_phase_pct_inp')?.value || bc_selected_phase_pct) || 10;
    var nextNo = st.phases.length + 1;
    titleLabel = "PHASE " + nextNo + " ORDER PREVIEW (" + pct + "%)";
    var prevItems = computeNextPhaseItems(pct);
    prevItems.forEach(function(r, idx) {
      var recA = r.received + r.orderNow;
      var remA = Math.max(0, r.totalBars - recA);
      sumTotal += r.totalBars; sumOrderNow += r.orderNow; sumRecAfter += recA; sumRemAfter += remA;
      rows.push([idx + 1, safeTxt(r.profile), r.stockFt + " Ft", r.totalBars, r.orderNow, recA, remA]);
    });
  }

  rows.push(["", "TOTAL BARS", "", sumTotal, sumOrderNow, sumRecAfter, sumRemAfter]);

  var doc = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 28, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(15);
  doc.setFont(undefined, 'bold');
  doc.text(shopName.toUpperCase(), 14, 12);
  doc.setFontSize(10);
  doc.setFont(undefined, 'normal');
  doc.text(titleLabel + "  |  Date: " + dateLabel, 14, 19);
  if (shopPhone) doc.text("Contact: " + shopPhone, 14, 24);

  doc.setTextColor(15, 23, 42);
  doc.setFontSize(10.5);
  doc.setFont(undefined, 'bold');
  doc.text("Project: " + safeTxt(projName), 14, 36);

  doc.autoTable({
    startY: 41,
    head: [["#", "Aluminium Section", "Bar Len", "Total Needed", "Order Now", "Total Received", "Pending Left"]],
    body: rows,
    theme: 'grid',
    headStyles: { fillColor: [29, 78, 216], textColor: 255, fontStyle: 'bold', fontSize: 9 },
    styles: { fontSize: 9, cellPadding: 3 },
    didParseCell: function(data) {
      if (data.row.index === rows.length - 1) {
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.fillColor = [239, 246, 255];
      }
    }
  });

  var fname = "SmartWorker_Phase_Order_" + Date.now() + ".pdf";
  doc.save(fname);
}

function renderPhaseMaterialBox() {
  var box = document.getElementById('bc_phase_order_box');
  if (!box) return;
  if (!bc_last_plan_summary || !bc_last_plan_summary.length) {
    box.style.display = 'none';
    box.innerHTML = '';
    return;
  }

  var st = getBcPhaseState();
  var pct = bc_selected_phase_pct || 10;
  var preview = computeNextPhaseItems(pct);

  var grandTotal = preview.reduce(function(s, x) { return s + x.totalBars; }, 0);
  var grandRec = preview.reduce(function(s, x) { return s + x.received; }, 0);
  var grandRem = preview.reduce(function(s, x) { return s + x.remaining; }, 0);
  var grandNow = preview.reduce(function(s, x) { return s + x.orderNow; }, 0);
  var donePct = grandTotal > 0 ? Math.min(100, Math.round((grandRec / grandTotal) * 100)) : 0;
  var nextPhaseNo = st.phases.length + 1;

  var chipPcts = [10, 20, 25, 30, 50, 100];
  var chipsHtml = chipPcts.map(function(p) {
    var active = (Math.round(pct) === p);
    var bg = active ? '#1d4ed8' : '#eff6ff';
    var col = active ? '#ffffff' : '#1e40af';
    var lbl = (p === 100) ? '100% বাকি' : (p + '%');
    return '<button type="button" onclick="setBcPhasePct(' + p + ')" style="background:' + bg + '; color:' + col + '; border:1px solid #93c5fd; border-radius:6px; padding:5px 8px; font-size:0.7rem; font-weight:800; cursor:pointer;">' + lbl + '</button>';
  }).join('');

  var rowsHtml = preview.map(function(x) {
    var remColor = x.remaining > 0 ? '#b45309' : '#15803d';
    return '<tr style="border-bottom:1px solid #e2e8f0;">' +
      '<td style="padding:5px 4px; font-weight:700; color:#0f172a; font-size:0.7rem;">' + x.profile + '</td>' +
      '<td style="padding:5px 3px; text-align:center; font-weight:700; font-size:0.72rem;">' + x.totalBars + '</td>' +
      '<td style="padding:5px 3px; text-align:center; font-weight:800; color:#15803d; font-size:0.72rem;">' + x.received + '</td>' +
      '<td style="padding:5px 3px; text-align:center; font-weight:800; color:#1d4ed8; background:#eff6ff; font-size:0.74rem;">+' + x.orderNow + '</td>' +
      '<td style="padding:5px 3px; text-align:center; font-weight:800; color:' + remColor + '; font-size:0.72rem;">' + Math.max(0, x.remaining - x.orderNow) + '</td>' +
    '</tr>';
  }).join('');

  var histHtml = '';
  if (st.phases.length > 0) {
    histHtml = '<div style="margin-top:9px; border-top:1px dashed #93c5fd; padding-top:7px;">' +
      '<div style="font-size:0.7rem; font-weight:800; color:#1e3a8a; margin-bottom:5px;">সেভ করা ধাপসমূহ (SAVED PHASES):</div>' +
      st.phases.map(function(ph, idx) {
        return '<div style="display:flex; justify-content:space-between; align-items:center; background:#f8fafc; border:1px solid #cbd5e1; border-radius:6px; padding:5px 8px; margin-bottom:4px; font-size:0.7rem;">' +
          '<span><b>ধাপ ' + ph.phaseNo + ' (' + ph.pct + '%)</b> • ' + ph.totalBars + ' বার <span style="color:#64748b;">(' + ph.date + ')</span></span>' +
          '<button type="button" onclick="exportBcPhasePdf(' + idx + ')" style="background:#be123c; color:#fff; border:none; border-radius:5px; padding:3px 7px; font-size:0.65rem; font-weight:800; cursor:pointer;">PDF</button>' +
        '</div>';
      }).join('') +
    '</div>';
  }

  var safeProjVal = (st.projectName || '').replace(/"/g, '&quot;');

  box.innerHTML =
    '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; gap:6px; flex-wrap:wrap;">' +
      '<span style="font-size:0.8rem; font-weight:800; color:#1e3a8a;"><i class="fa-solid fa-layer-group"></i> ধাপে ধাপে মাল আনা (PHASE ORDER)</span>' +
      '<span style="font-size:0.68rem; font-weight:800; background:#dbeafe; color:#1e40af; padding:2px 7px; border-radius:99px;">' + donePct + '% এসেছে (' + grandRec + '/' + grandTotal + ' বার)</span>' +
    '</div>' +
    '<div style="width:100%; height:7px; background:#e2e8f0; border-radius:99px; overflow:hidden; margin-bottom:8px;">' +
      '<div style="width:' + donePct + '%; height:100%; background:#16a34a; transition:width 0.25s;"></div>' +
    '</div>' +
    '<div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:5px; margin-bottom:8px; text-align:center;">' +
      '<div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:7px; padding:5px;"><div style="font-size:0.62rem; color:#475569; font-weight:700;">মোট দরকার</div><div style="font-size:0.85rem; font-weight:900; color:#0f172a;">' + grandTotal + ' বার</div></div>' +
      '<div style="background:#f0fdf4; border:1px solid #86efac; border-radius:7px; padding:5px;"><div style="font-size:0.62rem; color:#166534; font-weight:700;">এসেছে</div><div style="font-size:0.85rem; font-weight:900; color:#15803d;">' + grandRec + ' বার</div></div>' +
      '<div style="background:#fffbeb; border:1px solid #fcd34d; border-radius:7px; padding:5px;"><div style="font-size:0.62rem; color:#92400e; font-weight:700;">বাকি আছে</div><div style="font-size:0.85rem; font-weight:900; color:#b45309;">' + grandRem + ' বার</div></div>' +
    '</div>' +
    '<input type="text" id="bc_phase_proj_name" value="' + safeProjVal + '" placeholder="প্রজেক্টের নাম (যেমন: বড় বিল্ডিং কাজ)" style="width:100%; box-sizing:border-box; padding:7px 9px; border:1px solid #cbd5e1; border-radius:7px; font-size:0.75rem; margin-bottom:7px;">' +
    '<div style="font-size:0.7rem; font-weight:800; color:#1e40af; margin-bottom:5px;">ধাপ ' + nextPhaseNo + '-এ কত % মাল আনবেন? (10% থেকে শুরু):</div>' +
    '<div style="display:flex; flex-wrap:wrap; gap:5px; align-items:center; margin-bottom:8px;">' +
      chipsHtml +
      '<input type="number" id="bc_phase_pct_inp" min="1" max="100" value="' + pct + '" onchange="setBcPhasePct(this.value)" style="width:54px; padding:4px 6px; border:1.5px solid #1d4ed8; border-radius:6px; font-size:0.74rem; font-weight:800; text-align:center;">' +
      '<span style="font-size:0.72rem; font-weight:800; color:#1e40af;">%</span>' +
    '</div>' +
    '<div style="overflow-x:auto; margin-bottom:8px;">' +
      '<table style="width:100%; border-collapse:collapse; font-size:0.7rem;">' +
        '<thead><tr style="background:#1e3a8a; color:#fff;">' +
          '<th style="padding:5px 4px; text-align:left;">সেকশন</th>' +
          '<th style="padding:5px 3px;">মোট</th>' +
          '<th style="padding:5px 3px;">এসেছে</th>' +
          '<th style="padding:5px 3px; background:#2563eb;">ধাপ ' + nextPhaseNo + '</th>' +
          '<th style="padding:5px 3px;">বাকি থাকবে</th>' +
        '</tr></thead>' +
        '<tbody>' + rowsHtml + '</tbody>' +
      '</table>' +
    '</div>' +
    '<div style="display:grid; grid-template-columns: 1.2fr 1fr 0.7fr; gap:5px;">' +
      '<button type="button" onclick="saveCurrentPhaseOrder()" style="background:#15803d; color:#fff; border:none; border-radius:7px; padding:8px 5px; font-size:0.7rem; font-weight:800; cursor:pointer;">+ ধাপ ' + nextPhaseNo + ' সেভ (' + grandNow + ' বার)</button>' +
      '<button type="button" onclick="exportBcPhasePdf()" style="background:#be123c; color:#fff; border:none; border-radius:7px; padding:8px 5px; font-size:0.7rem; font-weight:800; cursor:pointer;"><i class="fa-solid fa-file-pdf"></i> Phase PDF</button>' +
      '<button type="button" onclick="resetBcPhaseOrders()" style="background:#64748b; color:#fff; border:none; border-radius:7px; padding:8px 5px; font-size:0.7rem; font-weight:800; cursor:pointer;">রিসেট</button>' +
    '</div>' +
    histHtml;

  box.style.display = 'block';
}

function exportRemnantQrStickersPdf() {
  if (!isAppActivated()) {
    alert("PRO activation is required to generate PDF documents.");
    openScreen('activation', 'PRO UPGRADE & PLANS');
    return;
  }
  var stock = loadWorkshopRemnants().filter(function(r) { return r.qty > 0 && r.len_in >= BC_MIN_USABLE_IN; });
  var sourceList = stock.length > 0 ? stock : bc_last_plan_offcuts.filter(function(o) { return o.len_in >= BC_MIN_USABLE_IN; }).map(function(o, i) {
    return { id: o.remId || ('#' + (101 + i)), profile: o.profile, len_in: o.len_in, qty: o.qty, date: new Date().toLocaleDateString('en-GB') };
  });

  if (!sourceList.length) {
    alert("No usable offcuts (≥ 12\" / 1 Foot) found! Pieces below 12\" are Scrap.");
    return;
  }
  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) { alert("PDF library is loading, please try again."); return; }

  var isMm = document.getElementById('bc_unit') && document.getElementById('bc_unit').value.indexOf('Millimeter') !== -1;
  var disp = function(v) { return isMm ? toMmStr(v) : toFractionInch(v); };

  var doc = new jsPDF('p', 'mm', 'a4');
  drawDocHeaderWithLogo(doc, "WORKSHOP PIPE NUMBER TAG STICKERS (≥12\" ONLY)", "Slim Pipe Labels — Print, Cut & Stick on Leftover Pipes (No QR Needed)", [15, 118, 110]);

  // 3 cols x 10 rows = 30 slim pipe stickers per A4 page (60mm x 22mm each!)
  var cols = 3, cardW = 59, cardH = 22, gapX = 3.5, gapY = 3;
  var startX = 14, startY = 34;
  var col = 0, row = 0;

  sourceList.forEach(function(item) {
    var x = startX + col * (cardW + gapX);
    var y = startY + row * (cardH + gapY);
    if (y + cardH > 286) {
      doc.addPage('a4', 'p');
      startY = 14; row = 0; col = 0;
      x = startX; y = startY;
    }

    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(100, 116, 139);
    doc.setLineWidth(0.35);
    doc.roundedRect(x, y, cardW, cardH, 1.8, 1.8, 'FD');

    // Bold Left Number Tag Box (#101)
    doc.setFillColor(15, 118, 110);
    doc.roundedRect(x, y, 19, cardH, 1.8, 1.8, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text(String(item.id), x + 9.5, y + 11, { align: "center" });
    doc.setFontSize(6.5);
    doc.setTextColor(204, 251, 241);
    doc.text("QTY: " + item.qty, x + 9.5, y + 17.5, { align: "center" });

    // Right Side: Huge Length + Profile Name
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11.5);
    doc.text(disp(item.len_in), x + 22, y + 9.5);

    doc.setFontSize(6.8);
    doc.setTextColor(51, 65, 85);
    var pLines = doc.splitTextToSize(item.profile, 35);
    doc.text(pLines.slice(0, 2), x + 22, y + 14.8);

    col++;
    if (col >= cols) { col = 0; row++; }
  });

  doc.save("Pipe_Number_Tag_Stickers_" + Date.now() + ".pdf");
}

function exportBarCuttingPdf() {
  if (!isAppActivated()) {
    alert("PRO activation is required to generate PDF documents.");
    openScreen('activation', 'PRO UPGRADE & PLANS');
    return;
  }
  if (!bc_items_list.length) {
    alert("Please add cut lengths or import from a calculator first!");
    return;
  }
  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) { alert("PDF library is loading, please try again."); return; }

  var rawStockVal = document.getElementById('bc_stock_len')?.value || 'AUTO_MIX';
  var isAutoMix = (rawStockVal === 'AUTO_MIX');
  var stockLenIn = isAutoMix ? 'AUTO_MIX' : (parseFloat(rawStockVal) || 144.0);
  var stockFt = isAutoMix ? 'AUTO MIX (12/15/16)' : Math.round(stockLenIn / 12);
  var kerfIn = parseFloat(document.getElementById('bc_kerf')?.value);
  if (isNaN(kerfIn)) kerfIn = 0.125;
  var isMm = document.getElementById('bc_unit') && document.getElementById('bc_unit').value.indexOf('Millimeter') !== -1;
  var useStock = document.getElementById('bc_use_stock_chk') ? document.getElementById('bc_use_stock_chk').checked : true;
  var disp = function(v) { return isMm ? toMmStr(v) : toFractionInch(v); };

  var doc = new jsPDF('l', 'mm', 'a4');
  drawDocHeaderWithLogo(doc, stockFt + " FT ALUMINIUM BAR / PIPE CUTTING DRAWING", "Compact Plan • Workshop Stock Reused First", [15, 118, 110]);

  var groups = groupBarItemsByProfile(bc_items_list);
  var y = 34;
  var startX = 42;
  var barDrawW = 208;
  var colors = [[2,132,199], [15,118,110], [124,58,237], [37,99,235], [8,145,178]];
  var grandNewBars = 0, grandStockReused = 0;

  Object.keys(groups).forEach(function(pName) {
    var packed = pack1DBarsWithWorkshopStock(groups[pName], stockLenIn, kerfIn, pName, useStock);
    var groupedStock = groupIdenticalBars(packed.stockUsedBars);
    var groupedNew = groupIdenticalBars(packed.newBars);
    grandStockReused += packed.stockUsedBars.length;
    grandNewBars += packed.newBars.length;

    if (y > 174) { doc.addPage('a4', 'l'); y = 16; }
    doc.setFillColor(240, 253, 250);
    doc.setDrawColor(15, 118, 110);
    doc.roundedRect(14, y, 269, 7, 1.5, 1.5, 'FD');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.6);
    doc.setTextColor(15, 118, 110);
    var hdrTxt = pName.toUpperCase() + "  —  BUY " + packed.newBars.length + " NEW BAR(S) OF " + stockFt + " FT" + (packed.stockUsedBars.length > 0 ? ("  +  REUSE " + packed.stockUsedBars.length + " FROM WORKSHOP STOCK") : "");
    doc.text(hdrTxt, 17, y + 4.9);
    y += 9.5;

    groupedStock.forEach(function(gEntry) {
      var bar = gEntry.bar, qty = gEntry.qty;
      if (y > 186) { doc.addPage('a4', 'l'); y = 16; }
      doc.setFillColor(22, 163, 74);
      doc.roundedRect(14, y, 25.5, 9, 1.5, 1.5, 'F');
      doc.setFont("helvetica", "bold"); doc.setFontSize(7.1); doc.setTextColor(255, 255, 255);
      doc.text("STK x" + qty + " " + bar.remId, 26.75, y + 5.7, { align: "center" });

      var sc = barDrawW / bar.stockLen;
      doc.setFillColor(220, 252, 231); doc.setDrawColor(22, 101, 52); doc.setLineWidth(0.35);
      doc.rect(startX, y, barDrawW, 9, 'FD');
      bar.cuts.forEach(function(c) {
        var rx = startX + (c.offset * sc), rw = Math.max(2, Math.min(startX + barDrawW - rx, c.len * sc));
        doc.setFillColor(21, 128, 61); doc.setDrawColor(255, 255, 255);
        doc.rect(rx, y, rw, 9, 'FD');
        if (rw >= 13) { doc.setFontSize(7.1); doc.setTextColor(255, 255, 255); doc.text(disp(c.len), rx + rw / 2, y + 5.8, { align: "center" }); }
      });
      doc.setFont("helvetica", "bold"); doc.setFontSize(7.2); doc.setTextColor(22, 101, 52);
      doc.text((bar.remaining >= BC_MIN_USABLE_IN ? "Usable: " : "Scrap: ") + disp(bar.remaining), startX + barDrawW + 3, y + 5.8);
      y += 11.5;
    });

    var scale = barDrawW / 192;
    groupedNew.forEach(function(gEntry) {
      var bar = gEntry.bar, qty = gEntry.qty;
      if (y > 186) { doc.addPage('a4', 'l'); y = 16; }
      doc.setFillColor(qty > 1 ? 15 : 71, qty > 1 ? 118 : 85, qty > 1 ? 110 : 105);
      doc.roundedRect(14, y, 25.5, 9, 1.5, 1.5, 'F');
      doc.setFont("helvetica", "bold"); doc.setFontSize(7.6); doc.setTextColor(255, 255, 255);
      var bFt = bar.stockFt || 12; var bScale = barDrawW / (bar.stockLen || 144); scale = bScale; doc.text((qty > 1 ? ("x" + qty) : "1") + " (" + bFt + "')", 26.75, y + 5.8, { align: "center" });

      var isUsable = (bar.remaining >= BC_MIN_USABLE_IN);
      doc.setFillColor(isUsable ? 254 : 226, isUsable ? 243 : 232, isUsable ? 199 : 240);
      doc.setDrawColor(15, 23, 42); doc.setLineWidth(0.35);
      doc.rect(startX, y, barDrawW, 9, 'FD');
      bar.cuts.forEach(function(c, ci) {
        var rx = startX + (c.offset * scale), rw = Math.max(2, Math.min(startX + barDrawW - rx, c.len * scale));
        var col = colors[ci % colors.length];
        doc.setFillColor(col[0], col[1], col[2]); doc.setDrawColor(255, 255, 255);
        doc.rect(rx, y, rw, 9, 'FD');
        if (rw >= 13) { doc.setFontSize(7.2); doc.setTextColor(255, 255, 255); doc.text(disp(c.len), rx + rw / 2, y + 5.8, { align: "center" }); }
      });
      doc.setFont("helvetica", "bold"); doc.setFontSize(7.2); doc.setTextColor(isUsable ? 180 : 100, isUsable ? 83 : 116, isUsable ? 9 : 139);
      doc.text((isUsable ? "Usable: " : "Scrap: ") + disp(bar.remaining), startX + barDrawW + 3, y + 5.8);
      y += 11.5;
    });
    y += 3;
  });

  if (y > 188) { doc.addPage('a4', 'l'); y = 16; }
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(14, y, 269, 8.5, 1.5, 1.5, 'F');
  doc.setFont("helvetica", "bold"); doc.setFontSize(8.6); doc.setTextColor(254, 240, 138);
  doc.text("GRAND TOTAL TO BUY: " + grandNewBars + " NEW BAR(S) (" + stockFt + " FT)" + (grandStockReused > 0 ? ("  |  REUSED FROM WORKSHOP STOCK: " + grandStockReused + " PC(S)") : ""), 18, y + 5.7);

  doc.save("Alu_Bar_Cutting_" + stockFt + "ft_" + Date.now() + ".pdf");
}


// =========================================================================
// VISUAL PICTURE-PICK PARTITION + DOOR + WINDOW + HALF-WALL STUDIO (v82)
// =========================================================================
var pt_col_configs = [
  { type: 'PARTITION', w_in: 0 },
  { type: 'PARTITION', w_in: 0 },
  { type: 'PARTITION', w_in: 0 }
];

var PT_BAY_OPTIONS = [
  { val: 'PARTITION', label: 'Partition (Glass/ACP/Jali)' },
  { val: 'DOOR_1_GA', label: 'Single Door (Glass + ACP)' },
  { val: 'DOOR_1_JGA', label: 'Single Door (Jali + Glass + ACP)' },
  { val: 'DOOR_1_JALI', label: 'Single Door (Full Jali / Mesh)' },
  { val: 'DOOR_2_GA', label: 'Double Door (Glass + ACP)' },
  { val: 'DOOR_2_JGA', label: 'Double Door (Jali + Glass + ACP)' },
  { val: 'HW_GLASS', label: 'Half Wall + Top Glass' },
  { val: 'HW_SLIDE_2T', label: 'Half Wall + 2-Track Sliding' },
  { val: 'HW_SLIDE_3T', label: 'Half Wall + 3-Track Sliding + Jali' },
  { val: 'HW_HOPEN_2', label: 'Half Wall + H-Sec Openable Win' },
  { val: 'WIN_SLIDE_2T', label: '2-Track Sliding Window Bay' },
  { val: 'WIN_SLIDE_3T', label: '3-Track Sliding + Jali Bay' },
  { val: 'WIN_HOPEN_2', label: 'H-Section Openable Window Bay' }
];

var PT_VISUAL_TEMPLATES = [
  {
    id: 'office_3x3',
    name: 'Full Partition',
    cols: 3, rows: 3,
    bays: [{ type: 'PARTITION', w_in: 0 }, { type: 'PARTITION', w_in: 0 }, { type: 'PARTITION', w_in: 0 }],
    rowMats: ['ACP', 'GLASS', 'ACP']
  },
  {
    id: 'mid_door',
    name: 'Middle Door',
    cols: 3, rows: 3,
    bays: [{ type: 'PARTITION', w_in: 0 }, { type: 'DOOR_1_GA', w_in: 36 }, { type: 'PARTITION', w_in: 0 }],
    rowMats: ['ACP', 'GLASS', 'ACP']
  },
  {
    id: 'left_door_right_win',
    name: 'Door + Right Win',
    cols: 3, rows: 3,
    bays: [{ type: 'DOOR_1_JGA', w_in: 36 }, { type: 'PARTITION', w_in: 0 }, { type: 'WIN_SLIDE_3T', w_in: 48 }],
    rowMats: ['ACP', 'GLASS', 'ACP']
  },
  {
    id: 'half_wall_win',
    name: 'Half Wall + Win',
    cols: 3, rows: 2,
    bays: [{ type: 'HW_GLASS', w_in: 0 }, { type: 'HW_SLIDE_3T', w_in: 48 }, { type: 'HW_GLASS', w_in: 0 }],
    rowMats: ['GLASS', 'GLASS']
  },
  {
    id: 'door_hw_win',
    name: 'Door + Half Wall',
    cols: 3, rows: 3,
    bays: [{ type: 'DOOR_1_GA', w_in: 36 }, { type: 'HW_GLASS', w_in: 0 }, { type: 'HW_HOPEN_2', w_in: 42 }],
    rowMats: ['ACP', 'GLASS', 'GLASS']
  },
  {
    id: 'dbl_door_jali',
    name: 'Double Door+Jali',
    cols: 3, rows: 3,
    bays: [{ type: 'PARTITION', w_in: 0 }, { type: 'DOOR_2_JGA', w_in: 54 }, { type: 'PARTITION', w_in: 0 }],
    rowMats: ['ACP', 'GLASS', 'JALI']
  }
];

function ensurePtColConfigsCount(numCols) {
  numCols = Math.max(1, Math.min(10, parseInt(numCols) || 3));
  while (pt_col_configs.length < numCols) {
    pt_col_configs.push({ type: 'PARTITION', w_in: 0 });
  }
  if (pt_col_configs.length > numCols) {
    pt_col_configs = pt_col_configs.slice(0, numCols);
  }
}

function buildMiniTemplateThumbSvg(tpl) {
  var svg = '<svg viewBox="0 0 100 62" width="100%" style="height:46px; display:block; margin:0 auto;">';
  svg += '<rect x="2" y="2" width="96" height="58" rx="3" fill="#334155" stroke="#0f172a" stroke-width="1.5"/>';
  var n = tpl.bays.length;
  var bw = (90 - (n - 1) * 3) / n;
  for (var i = 0; i < n; i++) {
    var bx = 5 + i * (bw + 3);
    var bt = tpl.bays[i].type;
    if (bt.indexOf('DOOR_') === 0) {
      svg += '<rect x="' + bx + '" y="5" width="' + bw + '" height="10" fill="#bae6fd"/>';
      svg += '<rect x="' + bx + '" y="17" width="' + bw + '" height="40" fill="#78350f" stroke="#fbbf24" stroke-width="0.8"/>';
      if (bt.indexOf('JGA') !== -1) {
        svg += '<rect x="' + (bx + 2) + '" y="19" width="' + (bw - 4) + '" height="9" fill="#86efac"/>';
        svg += '<rect x="' + (bx + 2) + '" y="30" width="' + (bw - 4) + '" height="13" fill="#e0f2fe"/>';
        svg += '<rect x="' + (bx + 2) + '" y="45" width="' + (bw - 4) + '" height="10" fill="#94a3b8"/>';
      } else {
        svg += '<rect x="' + (bx + 2) + '" y="19" width="' + (bw - 4) + '" height="22" fill="#e0f2fe"/>';
        svg += '<rect x="' + (bx + 2) + '" y="43" width="' + (bw - 4) + '" height="12" fill="#94a3b8"/>';
      }
    } else if (bt.indexOf('HW_') === 0) {
      svg += '<rect x="' + bx + '" y="5" width="' + bw + '" height="31" fill="' + (bt === 'HW_GLASS' ? '#bae6fd' : '#c4b5fd') + '"/>';
      if (bt !== 'HW_GLASS') svg += '<line x1="' + (bx + bw / 2) + '" y1="5" x2="' + (bx + bw / 2) + '" y2="36" stroke="#4c1d95" stroke-width="1.2"/>';
      // Brick/concrete half wall at bottom
      svg += '<rect x="' + bx + '" y="38" width="' + bw + '" height="19" fill="#d6d3d1" stroke="#78716c" stroke-width="0.8"/>';
      svg += '<line x1="' + bx + '" y1="44" x2="' + (bx + bw) + '" y2="44" stroke="#a8a29e" stroke-width="0.6"/>';
      svg += '<line x1="' + bx + '" y1="50" x2="' + (bx + bw) + '" y2="50" stroke="#a8a29e" stroke-width="0.6"/>';
    } else if (bt.indexOf('WIN_') === 0) {
      svg += '<rect x="' + bx + '" y="5" width="' + bw + '" height="11" fill="#bae6fd"/>';
      svg += '<rect x="' + bx + '" y="18" width="' + bw + '" height="24" fill="#c4b5fd" stroke="#5b21b6" stroke-width="1"/>';
      svg += '<line x1="' + (bx + bw / 2) + '" y1="18" x2="' + (bx + bw / 2) + '" y2="42" stroke="#5b21b6" stroke-width="1.2"/>';
      svg += '<rect x="' + bx + '" y="44" width="' + bw + '" height="13" fill="#fed7aa"/>';
    } else {
      svg += '<rect x="' + bx + '" y="5" width="' + bw + '" height="11" fill="' + (tpl.rowMats[2] === 'JALI' ? '#86efac' : '#fed7aa') + '"/>';
      svg += '<rect x="' + bx + '" y="18" width="' + bw + '" height="24" fill="#bae6fd"/>';
      svg += '<rect x="' + bx + '" y="44" width="' + bw + '" height="13" fill="#fed7aa"/>';
    }
  }
  svg += '</svg>';
  return svg;
}

function renderPartitionVisualGallery() {
  var gal = document.getElementById('pt_visual_gallery');
  if (!gal) return;
  var html = '';
  PT_VISUAL_TEMPLATES.forEach(function(tpl) {
    html += '<button type="button" onclick="applyPartitionVisualTemplate(\'' + tpl.id + '\')" style="background:#ffffff; border:1.5px solid #cbd5e1; border-radius:9px; padding:5px 4px; cursor:pointer; text-align:center; display:flex; flex-direction:column; align-items:center; gap:3px;">';
    html += buildMiniTemplateThumbSvg(tpl);
    html += '<span style="font-size:0.65rem; font-weight:800; color:#0f172a; line-height:1.15;">' + tpl.name + '</span>';
    html += '</button>';
  });
  gal.innerHTML = html;
}

function applyPartitionVisualTemplate(tplId) {
  var tpl = PT_VISUAL_TEMPLATES.find(t => t.id === tplId);
  if (!tpl) return;
  if (document.getElementById('pt_cols')) document.getElementById('pt_cols').value = String(tpl.cols);
  if (document.getElementById('pt_rows')) document.getElementById('pt_rows').value = String(tpl.rows);
  pt_col_configs = tpl.bays.map(b => ({ type: b.type, w_in: b.w_in }));
  pt_row_configs = tpl.rowMats.map((m, idx) => ({
    mat: m,
    h_val: idx === 0 ? 30.0 : (idx === tpl.rowMats.length - 1 && tpl.rowMats.length >= 3 ? 15.0 : 0)
  }));
  pt_cell_overrides = {};
  renderPartitionStudioUI();
}

function setPtColType(cIdx, newType) {
  ensurePtColConfigsCount(document.getElementById('pt_cols')?.value || 3);
  if (pt_col_configs[cIdx]) {
    pt_col_configs[cIdx].type = newType;
    if (newType.indexOf('DOOR_2') === 0 && !pt_col_configs[cIdx].w_in) pt_col_configs[cIdx].w_in = 54;
    else if (newType.indexOf('DOOR_1') === 0 && !pt_col_configs[cIdx].w_in) pt_col_configs[cIdx].w_in = 36;
  }
  renderPartitionStudioUI();
}

function setPtColWidth(cIdx, valStr) {
  ensurePtColConfigsCount(document.getElementById('pt_cols')?.value || 3);
  if (pt_col_configs[cIdx]) {
    var v = parseFloat(valStr);
    pt_col_configs[cIdx].w_in = (isNaN(v) || v <= 0) ? 0 : v;
  }
  renderPartitionWallVisualOnly();
  if (typeof renderLiveColorGlassPreview === 'function') renderLiveColorGlassPreview('pt');
}

function resolvePartitionColWidths(total_open_w, numCols) {
  ensurePtColConfigsCount(numCols);
  var widths = new Array(numCols).fill(0);
  var autoIdx = [];
  var used = 0;
  for (var c = 0; c < numCols; c++) {
    var wv = Number(pt_col_configs[c].w_in) || 0;
    if (wv > 0 && numCols > 1) {
      widths[c] = wv;
      used += wv;
    } else {
      autoIdx.push(c);
    }
  }
  if (autoIdx.length > 0) {
    var each = Math.max(12, (total_open_w - used) / autoIdx.length);
    autoIdx.forEach(i => { widths[i] = each; });
  } else if (used > 0 && Math.abs(used - total_open_w) > 0.5) {
    var scale = total_open_w / used;
    widths = widths.map(w => Math.max(10, w * scale));
  }
  return widths;
}

function renderPartitionBaysBuilder() {
  var box = document.getElementById('pt_bays_builder_container');
  if (!box) return;
  var numCols = Math.max(1, Math.min(10, parseInt(document.getElementById('pt_cols')?.value) || 3));
  ensurePtColConfigsCount(numCols);
  var html = '';
  for (var c = 0; c < numCols; c++) {
    var cfg = pt_col_configs[c];
    var posName = (numCols === 1) ? 'Full Bay' : (c === 0 ? 'Left Bay 1' : (c === numCols - 1 ? 'Right Bay ' + (c + 1) : 'Middle Bay ' + (c + 1)));
    var wStr = (cfg.w_in && cfg.w_in > 0) ? String(cfg.w_in) : '';
    html += '<div style="display:grid; grid-template-columns: 0.9fr 1.6fr 0.75fr; gap:5px; align-items:center; background:#fff; border:1px solid #bfdbfe; border-radius:7px; padding:5px 6px;">';
    html += '<div style="font-size:0.71rem; font-weight:800; color:#1e3a8a;">' + posName + '</div>';
    html += '<select onchange="setPtColType(' + c + ', this.value)" style="padding:5px 4px; border:1px solid #93c5fd; border-radius:6px; font-size:0.72rem; font-weight:800; color:#0f172a; background:#f8fafc;">';
    PT_BAY_OPTIONS.forEach(function(opt) {
      html += '<option value="' + opt.val + '" ' + (cfg.type === opt.val ? 'selected' : '') + '>' + opt.label + '</option>';
    });
    html += '</select>';
    html += '<input type="number" step="0.5" value="' + wStr + '" placeholder="Auto" oninput="setPtColWidth(' + c + ', this.value)" style="width:100%; padding:5px 4px; border:1px solid #94a3b8; border-radius:6px; font-size:0.74rem; font-weight:700; text-align:center;">';
    html += '</div>';
  }
  box.innerHTML = html;
}

function renderPartitionStudioUI() {
  renderPartitionVisualGallery();
  renderPartitionBaysBuilder();
  if (typeof renderPartitionRowBuilder === 'function') renderPartitionRowBuilder();
  if (typeof renderLiveColorGlassPreview === 'function') renderLiveColorGlassPreview('pt');
}


// =========================================================================
// FREE DESIGN STUDIO — INTERACTIVE RECURSIVE SPLIT-BOX CAD ENGINE (v83)
// =========================================================================
var cad_next_id = 2;
var cad_tree = { id: 1, kind: 'LEAF', mat: 'GLASS' };
var cad_selected_id = 1;
var cad_history = [];
var cad_glass_dict = {};
var cad_acp_list = [];

function cadSaveUndo() {
  cad_history.push(JSON.stringify(cad_tree));
  if (cad_history.length > 25) cad_history.shift();
}

function cadUndoAction() {
  if (!cad_history.length) return;
  cad_tree = JSON.parse(cad_history.pop());
  cad_selected_id = cadFindFirstLeafId(cad_tree);
  renderCadStudio();
}

function cadResetCanvas() {
  cadSaveUndo();
  cad_next_id = 2;
  cad_tree = { id: 1, kind: 'LEAF', mat: 'GLASS' };
  cad_selected_id = 1;
  renderCadStudio();
  if (document.getElementById('cad_out')) document.getElementById('cad_out').textContent = '';
}

function cadFindFirstLeafId(node) {
  if (!node) return 1;
  if (node.kind === 'LEAF') return node.id;
  return cadFindFirstLeafId(node.a);
}

function cadFindNodeAndParent(node, targetId, parent, branch) {
  if (!node) return null;
  if (node.id === targetId) return { node: node, parent: parent, branch: branch };
  if (node.kind === 'SPLIT') {
    return cadFindNodeAndParent(node.a, targetId, node, 'a') || cadFindNodeAndParent(node.b, targetId, node, 'b');
  }
  return null;
}

function cadSelectBox(id) {
  cad_selected_id = id;
  renderCadStudio();
}

function cadSplitSelected(dir) {
  var found = cadFindNodeAndParent(cad_tree, cad_selected_id, null, null);
  if (!found || found.node.kind !== 'LEAF') return;
  cadSaveUndo();
  var oldMat = found.node.mat || 'GLASS';
  var idA = cad_next_id++;
  var idB = cad_next_id++;
  found.node.kind = 'SPLIT';
  found.node.dir = dir; // 'V' = Left/Right, 'H' = Top/Bottom
  found.node.ratio = 0.5;
  found.node.a = { id: idA, kind: 'LEAF', mat: oldMat };
  found.node.b = { id: idB, kind: 'LEAF', mat: oldMat };
  delete found.node.mat;
  cad_selected_id = idA;
  renderCadStudio();
}

function cadSetSelectedType(matType) {
  var found = cadFindNodeAndParent(cad_tree, cad_selected_id, null, null);
  if (!found || found.node.kind !== 'LEAF') return;
  cadSaveUndo();
  found.node.mat = matType;
  renderCadStudio();
}

function cadComputeLayout(node, x, y, w, h, outLeaves, outSplits) {
  if (node.kind === 'LEAF') {
    outLeaves.push({ id: node.id, mat: node.mat || 'GLASS', x: x, y: y, w: w, h: h });
    return;
  }
  var r = Math.min(0.88, Math.max(0.12, Number(node.ratio) || 0.5));
  if (node.dir === 'V') {
    var wA = w * r;
    var wB = w - wA;
    outSplits.push({ dir: 'V', x: x + wA, y: y, len: h });
    cadComputeLayout(node.a, x, y, wA, h, outLeaves, outSplits);
    cadComputeLayout(node.b, x + wA, y, wB, h, outLeaves, outSplits);
  } else {
    var hA = h * r;
    var hB = h - hA;
    outSplits.push({ dir: 'H', x: x, y: y + hA, len: w });
    cadComputeLayout(node.a, x, y, w, hA, outLeaves, outSplits);
    cadComputeLayout(node.b, x, y + hA, w, hB, outLeaves, outSplits);
  }
}

function cadResizeSelectedPrompt() {
  var totalH = Math.max(12, parseFloat(document.getElementById('cad_total_h')?.value) || 96);
  var totalW = Math.max(12, parseFloat(document.getElementById('cad_total_w')?.value) || 120);
  var leaves = [], splits = [];
  cadComputeLayout(cad_tree, 0, 0, totalW, totalH, leaves, splits);
  var curLeaf = leaves.find(l => l.id === cad_selected_id);
  var found = cadFindNodeAndParent(cad_tree, cad_selected_id, null, null);
  if (!curLeaf || !found || !found.parent) {
    alert("Split the box first, then you can set exact Width or Height (in inches) for each part!");
    return;
  }
  var par = found.parent;
  var isV = (par.dir === 'V');
  var parentSpan = isV ? (curLeaf.w / (found.branch === 'a' ? par.ratio : (1 - par.ratio))) : (curLeaf.h / (found.branch === 'a' ? par.ratio : (1 - par.ratio)));
  var dimName = isV ? 'Width (Inches)' : 'Height (Inches)';
  var curVal = isV ? curLeaf.w : curLeaf.h;
  var inp = prompt("Enter exact " + dimName + " for this box (Max " + Math.round(parentSpan - 4) + '"):', curVal.toFixed(1));
  if (!inp) return;
  var newVal = parseFloat(inp);
  if (isNaN(newVal) || newVal <= 2 || newVal >= parentSpan - 2) {
    alert("Please enter a valid number between 3 and " + Math.round(parentSpan - 3) + '".');
    return;
  }
  cadSaveUndo();
  var newRatio = newVal / parentSpan;
  par.ratio = (found.branch === 'a') ? newRatio : (1 - newRatio);
  renderCadStudio();
}

function buildCadStudioSvg(isFullScreen) {
  var totalH = Math.max(12, parseFloat(document.getElementById('cad_total_h')?.value) || 96);
  var totalW = Math.max(12, parseFloat(document.getElementById('cad_total_w')?.value) || 120);
  var aluColor = document.getElementById('cad_alu_color')?.value || 'Anodized Silver Glossy';
  var gSpec = document.getElementById('cad_g_type')?.value || '5 mm Clear';
  var aluPal = getAluVisualPalette(aluColor);
  var glsPal = getGlassVisualPalette(gSpec);

  var leaves = [], splits = [];
  cadComputeLayout(cad_tree, 0, 0, totalW, totalH, leaves, splits);

  var vbW = 360, vbH = 230;
  var pad = 16;
  var scale = Math.min((vbW - pad * 2) / totalW, (vbH - pad * 2) / totalH);
  var drawW = totalW * scale;
  var drawH = totalH * scale;
  var ox = (vbW - drawW) / 2;
  var oy = (vbH - drawH) / 2;
  var uid = 'cad_' + Math.floor(Math.random() * 10000);

  var svgStyle = isFullScreen
    ? 'width:100%; height:100%; max-height:100%; display:block; margin:0 auto;'
    : 'width:100%; max-height:245px; display:block; margin:0 auto;';

  var svg = '<svg viewBox="0 0 ' + vbW + ' ' + vbH + '" preserveAspectRatio="xMidYMid meet" style="' + svgStyle + '">';
  svg += '<defs>';
  svg += '<linearGradient id="alu_' + uid + '" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="' + aluPal.c1 + '"/><stop offset="50%" stop-color="' + aluPal.c2 + '"/><stop offset="100%" stop-color="' + aluPal.c3 + '"/></linearGradient>';
  svg += '<linearGradient id="gls_' + uid + '" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="' + glsPal.g1 + '" stop-opacity="' + glsPal.op + '"/><stop offset="55%" stop-color="' + glsPal.g2 + '" stop-opacity="' + glsPal.op + '"/><stop offset="100%" stop-color="' + glsPal.g1 + '" stop-opacity="' + glsPal.op + '"/></linearGradient>';
  svg += '<pattern id="jali_' + uid + '" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#ecfdf5"/><path d="M0 0 L7 7 M7 0 L0 7" stroke="#065f46" stroke-width="0.95" stroke-opacity="0.8"/></pattern>';
  svg += '</defs>';

  // Outer Wall Dimensions Text
  svg += '<text x="' + (vbW / 2) + '" y="' + (oy - 4) + '" font-size="9" font-weight="bold" fill="#0f172a" text-anchor="middle">Width: ' + toFractionInch(totalW) + '  ×  Height: ' + toFractionInch(totalH) + '</text>';

  // Outer Aluminium Frame
  svg += '<rect x="' + (ox - 4) + '" y="' + (oy - 4) + '" width="' + (drawW + 8) + '" height="' + (drawH + 8) + '" rx="3" fill="url(#alu_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="1.8"/>';

  leaves.forEach(function(lf) {
    var rx = ox + lf.x * scale + 1.5;
    var ry = oy + lf.y * scale + 1.5;
    var rw = Math.max(8, lf.w * scale - 3);
    var rh = Math.max(8, lf.h * scale - 3);
    var isSel = (!isFullScreen && lf.id === cad_selected_id);
    var clickA = isFullScreen ? '' : ('onclick="cadSelectBox(' + lf.id + ')" style="cursor:pointer;"');

    svg += '<g ' + clickA + '>';
    if (lf.mat === 'HALF_WALL') {
      svg += '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="' + rh + '" fill="#d6d3d1" stroke="#78716c" stroke-width="1.2"/>';
      for (var ly = ry + 8; ly < ry + rh - 2; ly += 8) {
        svg += '<line x1="' + rx + '" y1="' + ly + '" x2="' + (rx + rw) + '" y2="' + ly + '" stroke="#a8a29e" stroke-width="0.7"/>';
      }
      svg += '<text x="' + (rx + rw / 2) + '" y="' + (ry + rh / 2 + 2) + '" font-size="7.5" font-weight="bold" fill="#44403c" text-anchor="middle">HALF WALL</text>';
    } else if (lf.mat === 'ACP') {
      svg += '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="' + rh + '" fill="#94a3b8" stroke="' + aluPal.stroke + '" stroke-width="1"/>';
      svg += '<text x="' + (rx + rw / 2) + '" y="' + (ry + rh / 2 + 2) + '" font-size="8" font-weight="bold" fill="#0f172a" text-anchor="middle">ACP</text>';
    } else if (lf.mat === 'JALI') {
      svg += '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="' + rh + '" fill="url(#jali_' + uid + ')" stroke="#059669" stroke-width="1.2"/>';
      svg += '<text x="' + (rx + rw / 2) + '" y="' + (ry + rh / 2 + 2) + '" font-size="7.5" font-weight="bold" fill="#065f46" text-anchor="middle">JALI</text>';
    } else if (lf.mat === 'DOOR_1' || lf.mat === 'DOOR_2') {
      var nL = (lf.mat === 'DOOR_2') ? 2 : 1;
      svg += '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="' + rh + '" fill="url(#alu_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="1.2"/>';
      var lw = (rw - 4 - ((nL - 1) * 2)) / nL;
      for (var d = 0; d < nL; d++) {
        var dlx = rx + 2 + d * (lw + 2);
        svg += '<rect x="' + dlx + '" y="' + (ry + 2) + '" width="' + lw + '" height="' + (rh - 4) + '" fill="url(#alu_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="0.9"/>';
        var gh = (rh - 10) * 0.62, ah = (rh - 10) * 0.38;
        svg += '<rect x="' + (dlx + 3) + '" y="' + (ry + 4) + '" width="' + Math.max(4, lw - 6) + '" height="' + Math.max(4, gh) + '" fill="url(#gls_' + uid + ')"/>';
        svg += '<rect x="' + (dlx + 3) + '" y="' + (ry + 6 + gh) + '" width="' + Math.max(4, lw - 6) + '" height="' + Math.max(4, ah - 2) + '" fill="#94a3b8"/>';
        var hx = (d === 0 && nL === 2) ? (dlx + lw - 4) : (dlx + 2);
        svg += '<rect x="' + hx + '" y="' + (ry + rh * 0.45) + '" width="2.2" height="12" rx="1" fill="#fbbf24"/>';
      }
      svg += '<text x="' + (rx + rw / 2) + '" y="' + (ry + rh - 5) + '" font-size="6.8" font-weight="bold" fill="#0f172a" text-anchor="middle">DOOR</text>';
    } else if (lf.mat === 'SLIDE_2T' || lf.mat === 'SLIDE_3T') {
      var tr = (lf.mat === 'SLIDE_3T') ? 3 : 2;
      svg += '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="' + rh + '" fill="url(#alu_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="1.2"/>';
      var tw = (rw - 4 - ((tr - 1) * 2)) / tr;
      for (var t = 0; t < tr; t++) {
        var tx = rx + 2 + t * (tw + 2);
        var isJ = (tr === 3 && t === 2);
        svg += '<rect x="' + tx + '" y="' + (ry + 2) + '" width="' + tw + '" height="' + (rh - 4) + '" fill="' + (isJ ? 'url(#jali_' + uid + ')' : 'url(#gls_' + uid + ')') + '" stroke="' + aluPal.stroke + '" stroke-width="0.8"/>';
      }
      svg += '<text x="' + (rx + rw / 2) + '" y="' + (ry + rh / 2 + 2) + '" font-size="7" font-weight="bold" fill="#0f172a" text-anchor="middle">' + (tr === 3 ? '3T+JALI' : '2T SLIDE') + '</text>';
    } else if (lf.mat === 'H_OPEN') {
      svg += '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="' + rh + '" fill="url(#alu_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="1.2"/>';
      svg += '<rect x="' + (rx + 3) + '" y="' + (ry + 3) + '" width="' + Math.max(4, rw - 6) + '" height="' + Math.max(4, rh - 6) + '" fill="url(#gls_' + uid + ')"/>';
      svg += '<polyline points="' + (rx + 3) + ',' + (ry + 3) + ' ' + (rx + rw - 3) + ',' + (ry + rh / 2) + ' ' + (rx + 3) + ',' + (ry + rh - 3) + '" fill="none" stroke="#fff" stroke-width="1.1" stroke-dasharray="3,2"/>';
      svg += '<rect x="' + (rx + rw - 4.5) + '" y="' + (ry + rh / 2 - 5) + '" width="2" height="10" rx="1" fill="#fbbf24"/>';
      svg += '<text x="' + (rx + rw / 2) + '" y="' + (ry + rh - 5) + '" font-size="6.8" font-weight="bold" fill="#1e3a8a" text-anchor="middle">OPEN WIN</text>';
    } else {
      svg += '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="' + rh + '" fill="url(#gls_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="1"/>';
      svg += '<line x1="' + (rx + 4) + '" y1="' + (ry + rh - 4) + '" x2="' + (rx + rw - 4) + '" y2="' + (ry + 4) + '" stroke="' + glsPal.shine + '" stroke-width="1.5" stroke-opacity="0.6"/>';
    }

    // Show exact inch dimensions inside each box if big enough
    if (rw >= 34 && rh >= 24) {
      svg += '<text x="' + (rx + rw / 2) + '" y="' + (ry + 10) + '" font-size="6.2" font-weight="bold" fill="#0f172a" fill-opacity="0.85" text-anchor="middle">' + Math.round(lf.w) + '"×' + Math.round(lf.h) + '"</text>';
    }
    if (isSel) {
      svg += '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="' + rh + '" fill="none" stroke="#7c3aed" stroke-width="2.6" stroke-dasharray="4,2"/>';
    }
    svg += '</g>';
  });

  svg += '</svg>';
  return { svg: svg, leaves: leaves, splits: splits, aluColor: aluColor, gSpec: gSpec };
}

function renderCadStudio() {
  var stage = document.getElementById('cad_svg_stage');
  if (!stage) return;
  var res = buildCadStudioSvg(false);
  stage.innerHTML = res.svg;
  var cur = res.leaves.find(l => l.id === cad_selected_id);
  var infoEl = document.getElementById('cad_sel_info');
  if (infoEl && cur) {
    infoEl.innerHTML = 'Selected: <b>' + cur.mat + '</b> (' + toFractionInch(cur.w) + ' W × ' + toFractionInch(cur.h) + ' H)';
  }
}

function openCadFullScreenCustomerView() {
  var ccBar = document.getElementById('csm_cc_cad_bar'); if (ccBar) ccBar.style.display = 'none';
  var modal = document.getElementById('customerShowroomModal');
  var holder = document.getElementById('csm_svg_holder');
  var sub = document.getElementById('csm_subtitle');
  var badges = document.getElementById('csm_specs_badges');
  if (!modal || !holder) return;
  var res = buildCadStudioSvg(true);
  csmCurrentZoom = 1.0;
  holder.style.transform = 'scale(1)';
  holder.innerHTML = res.svg;
  if (sub) sub.textContent = 'Custom CAD Elevation  •  ' + res.aluColor + ' + ' + res.gSpec;
  if (badges) {
    badges.innerHTML =
      '<div style="background:#f5f3ff; border:1px solid #c4b5fd; border-radius:8px; padding:7px 9px;"><div style="font-size:0.65rem; color:#6d28d9; font-weight:700;">CUSTOM DESIGN</div><div style="font-size:0.8rem; color:#0f172a; font-weight:800;">' + res.leaves.length + ' Sections (' + res.aluColor + ')</div></div>' +
      '<div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:7px 9px;"><div style="font-size:0.65rem; color:#0369a1; font-weight:700;">GLASS SPEC</div><div style="font-size:0.8rem; color:#0f172a; font-weight:800;">' + res.gSpec + '</div></div>';
  }
  modal.style.display = 'flex';
}

function calculateCadStudioDesign() {
  var totalH = Math.max(12, parseFloat(document.getElementById('cad_total_h')?.value) || 96);
  var totalW = Math.max(12, parseFloat(document.getElementById('cad_total_w')?.value) || 120);
  var gSpec = document.getElementById('cad_g_type')?.value || '5 mm Clear';
  var leaves = [], splits = [];
  cadComputeLayout(cad_tree, 0, 0, totalW, totalH, leaves, splits);

  cad_glass_dict = {};
  cad_acp_list = [];

  var out = "========================================\n";
  out += "FREE DESIGN STUDIO — EXACT CUTTING LIST\n";
  out += "Total Elevation: " + toFractionInch(totalH) + " H × " + toFractionInch(totalW) + " W\n";
  out += "========================================\n";
  out += "1. FRAME & DIVIDER TUBES:\n";
  out += "> Outer Verticals: " + toFractionInch(totalH) + " (2 pc)\n";
  out += "> Outer Horizontals: " + toFractionInch(totalW - 3.0) + " (2 pc)\n";
  doorGroups.forEach(function(dg, idx) {
    const dv = Math.max(24, dg.h - 1.75), drw = Math.max(8, dg.w - 3.5);
    out += `> Custom Multi-Part Door #${idx + 1} (${disp(dg.h)} × ${disp(dg.w)}): Vertical Stiles ${disp(dv)} (2 pc) | Top/Bot Rails ${disp(drw)} (2 pc) | Hinges 3 pc + Lock 1 Set\n`;
    pt_buckets["Door Sash"].push(dv, dv, drw, drw);
  });
  splits.forEach(function(sp, idx) {
    out += "> Divider #" + (idx + 1) + " (" + (sp.dir === 'V' ? 'Vertical Post' : 'Horizontal Transom') + "): " + toFractionInch(Math.max(4, sp.len - 1.5)) + " (1 pc)\n";
  });

  out += "\n2. SECTION-BY-SECTION PANELS & DOORS/WINDOWS:\n";
  var totG = 0, totGSqFt = 0, totAcp = 0, totJali = 0;
  leaves.forEach(function(lf, idx) {
    var tag = "Box #" + (idx + 1);
    var cw = Math.max(3, lf.w - 1.75), ch = Math.max(3, lf.h - 1.75);
    if (lf.mat === 'HALF_WALL') {
      out += "• " + tag + " [HALF WALL (Brick/Civil)]: " + toFractionInch(lf.h) + " H × " + toFractionInch(lf.w) + " W (No Alu/Glass)\n";
    } else if (lf.mat === 'ACP') {
      out += "• " + tag + " [ACP BOARD]: " + toFractionInch(ch) + " × " + toFractionInch(cw) + " (1 pc)\n";
      totAcp++;
      cad_acp_list.push({ rowTag: tag, cutStr: toFractionInch(ch) + ' x ' + toFractionInch(cw), h_in: ch, w_in: cw, qty: 1, buyLabel: '', areaSqFt: (ch * cw) / 144 });
    } else if (lf.mat === 'JALI') {
      out += "• " + tag + " [JALI / MESH]: " + toFractionInch(ch) + " × " + toFractionInch(cw) + " (1 pc)\n";
      totJali++;
    } else if (lf.mat === 'DOOR_1' || lf.mat === 'DOOR_2') {
      var nL = (lf.mat === 'DOOR_2') ? 2 : 1;
      var lw = (lf.w - 1.5) / nL;
      var dgH = Math.max(6, (lf.h - 8) * 0.62), dgW = Math.max(4, lw - 3.25);
      out += "• " + tag + " [" + (nL === 2 ? 'DOUBLE DOOR' : 'SINGLE DOOR') + "]: Frame " + toFractionInch(lf.h) + " × " + toFractionInch(lf.w) + " | Top Glass: " + toFractionInch(dgH) + " × " + toFractionInch(dgW) + " (" + nL + " pc)\n";
      cad_glass_dict[toFractionInch(dgH) + " x " + toFractionInch(dgW) + " (" + tag + " Door) || " + gSpec] = (cad_glass_dict[toFractionInch(dgH) + " x " + toFractionInch(dgW) + " (" + tag + " Door) || " + gSpec] || 0) + nL;
      totG += nL; totGSqFt += (dgH * dgW * nL) / 144;
    } else if (lf.mat === 'SLIDE_2T' || lf.mat === 'SLIDE_3T') {
      var tr = (lf.mat === 'SLIDE_3T') ? 3 : 2;
      var wgH = Math.max(4, lf.h - 5.5), wgW = Math.max(4, (lf.w - 3.0) / tr);
      out += "• " + tag + " [" + tr + "-TRACK SLIDING]: Glass " + toFractionInch(wgH) + " × " + toFractionInch(wgW) + " (2 pc)" + (tr === 3 ? " + 1 Jali" : "") + "\n";
      cad_glass_dict[toFractionInch(wgH) + " x " + toFractionInch(wgW) + " (" + tag + " Slide) || " + gSpec] = (cad_glass_dict[toFractionInch(wgH) + " x " + toFractionInch(wgW) + " (" + tag + " Slide) || " + gSpec] || 0) + 2;
      totG += 2; totGSqFt += (wgH * wgW * 2) / 144;
      if (tr === 3) totJali++;
    } else if (lf.mat === 'H_OPEN') {
      var oh = Math.max(4, lf.h - 3.0), ow = Math.max(4, lf.w - 3.0);
      out += "• " + tag + " [OPENABLE WINDOW]: Glass " + toFractionInch(oh) + " × " + toFractionInch(ow) + " (1 pc)\n";
      cad_glass_dict[toFractionInch(oh) + " x " + toFractionInch(ow) + " (" + tag + " OpenWin) || " + gSpec] = (cad_glass_dict[toFractionInch(oh) + " x " + toFractionInch(ow) + " (" + tag + " OpenWin) || " + gSpec] || 0) + 1;
      totG += 1; totGSqFt += (oh * ow) / 144;
    } else {
      out += "• " + tag + " [FIXED GLASS]: " + toFractionInch(ch) + " × " + toFractionInch(cw) + " (1 pc)\n";
      cad_glass_dict[toFractionInch(ch) + " x " + toFractionInch(cw) + " (" + tag + " Glass) || " + gSpec] = (cad_glass_dict[toFractionInch(ch) + " x " + toFractionInch(cw) + " (" + tag + " Glass) || " + gSpec] || 0) + 1;
      totG += 1; totGSqFt += (ch * cw) / 144;
    }
  });

  out += "\n----------------------------------------\n";
  out += "• TOTAL GLASS: " + totG + " Pcs (" + totGSqFt.toFixed(2) + " Sq.Ft) -> Tap 'GLASS PDF + QR'\n";
  if (totAcp > 0) out += "• TOTAL ACP PANELS: " + totAcp + " Pcs\n";
  if (totJali > 0) out += "• TOTAL JALI / MESH PANELS: " + totJali + " Pcs\n";

  var outEl = document.getElementById('cad_out');
  if (outEl) {
    outEl.textContent = out;
    outEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}


// =========================================================================
// PARTITION MASTER — INTEGRATED TOUCH-DRAG CAD DESIGNER (v84)
// Supports: Finger-Drag ↔/↕ Handles, 2nd-Tap Cycle, Wall (Minus -), All 5 PDFs!
// =========================================================================
var pt_cad_next_id = 2;
var pt_cad_tree = { id: 1, kind: 'LEAF', mat: 'GLASS' };
var pt_cad_sel_id = 1;
var pt_cad_history = [];
var pt_cad_drag = null;
var PT_CAD_CYCLE = ['GLASS', 'ACP', 'JALI', 'DOOR_1', 'DOOR_2', 'WALL_MINUS', 'SLIDE_2T', 'SLIDE_3T', 'H_OPEN'];

function ptCadSaveUndo() {
  if (!pt_cad_history) pt_cad_history = [];
  pt_cad_history.push(JSON.stringify(pt_cad_tree));
  if (pt_cad_history.length > 30) pt_cad_history.shift();
}

function ptCadUndo() {
  if (!pt_cad_history.length) return;
  pt_cad_tree = JSON.parse(pt_cad_history.pop());
  pt_cad_sel_id = ptCadFirstLeaf(pt_cad_tree);
  renderPtCadDesigner();
}

function ptCadReset() {
  ptCadSaveUndo();
  pt_cad_next_id = 2;
  pt_cad_tree = { id: 1, kind: 'LEAF', mat: 'GLASS' };
  pt_cad_sel_id = 1;
  renderPtCadDesigner();
}

function ptCadFirstLeaf(node) {
  if (!node) return 1;
  return node.kind === 'LEAF' ? node.id : ptCadFirstLeaf(node.a);
}

function ptCadFind(node, targetId, parent, branch) {
  if (!node) return null;
  if (node.id === targetId) return { node: node, parent: parent, branch: branch };
  if (node.kind === 'SPLIT') {
    return ptCadFind(node.a, targetId, node, 'a') || ptCadFind(node.b, targetId, node, 'b');
  }
  return null;
}

function ptCadGetDims() {
  var isMm = document.getElementById('pt_unit') && document.getElementById('pt_unit').value.indexOf('Millimeter') !== -1;
  var rh = safeEval(document.getElementById('pt_h')?.value || '96') || 96;
  var rw = safeEval(document.getElementById('pt_w')?.value || '120') || 120;
  return { h: isMm ? rh / 25.4 : rh, w: isMm ? rw / 25.4 : rw, isMm: isMm };
}

function ptCadTapBox(id) {
  if (pt_cad_sel_id === id) {
    var found = ptCadFind(pt_cad_tree, id, null, null);
    if (found && found.node.kind === 'LEAF') {
      ptCadSaveUndo();
      var idx = PT_CAD_CYCLE.indexOf(found.node.mat || 'GLASS');
      found.node.mat = PT_CAD_CYCLE[(idx + 1) % PT_CAD_CYCLE.length];
    }
  } else {
    pt_cad_sel_id = id;
  }
  renderPtCadDesigner();
}

function ptCadSetType(matType) {
  var found = ptCadFind(pt_cad_tree, pt_cad_sel_id, null, null);
  if (!found || found.node.kind !== 'LEAF') return;
  ptCadSaveUndo();
  found.node.mat = matType;
  renderPtCadDesigner();
}

function ptCadSplit(dir) {
  var found = ptCadFind(pt_cad_tree, pt_cad_sel_id, null, null);
  if (!found || found.node.kind !== 'LEAF') return;
  ptCadSaveUndo();
  var oldMat = found.node.mat || 'GLASS';
  var idA = pt_cad_next_id++;
  var idB = pt_cad_next_id++;
  found.node.kind = 'SPLIT';
  found.node.dir = dir;
  if (oldMat === 'DOOR_1' || oldMat === 'DOOR_2') {
    // Pro CAD Behavior: Splitting a Door divides the INSIDE of the door while preserving the Door Frame!
    found.node.isDoor = true;
    found.node.doorLeaves = (oldMat === 'DOOR_2') ? 2 : 1;
    if (dir === 'H') {
      found.node.ratio = 0.62;
      found.node.a = { id: idA, kind: 'LEAF', mat: 'GLASS' };
      found.node.b = { id: idB, kind: 'LEAF', mat: 'ACP' };
    } else {
      found.node.ratio = 0.5;
      found.node.a = { id: idA, kind: 'LEAF', mat: 'GLASS' };
      found.node.b = { id: idB, kind: 'LEAF', mat: 'GLASS' };
    }
  } else {
    found.node.ratio = 0.5;
    found.node.a = { id: idA, kind: 'LEAF', mat: oldMat };
    found.node.b = { id: idB, kind: 'LEAF', mat: oldMat };
  }
  delete found.node.mat;
  pt_cad_sel_id = idA;
  renderPtCadDesigner();
}


function ptCadFindTopVerticalGroupForLeaf(root, targetId) {
  // Climb up consecutive Horizontal ('H') splits so a whole stacked column (e.g. Jali + Glass + ACP) wraps as 1 Door!
  var path = [];
  function walk(node) {
    if (!node) return false;
    path.push(node);
    if (node.id === targetId) return true;
    if (node.kind === 'SPLIT') {
      if (walk(node.a) || walk(node.b)) return true;
    }
    path.pop();
    return false;
  }
  if (!walk(root) || path.length < 2) return null;
  var targetNode = path[path.length - 1];
  for (var i = path.length - 2; i >= 0; i--) {
    var anc = path[i];
    if (anc.kind === 'SPLIT' && anc.dir === 'H') {
      targetNode = anc;
    } else {
      break;
    }
  }
  return targetNode;
}

function ptCadToggleGroupDoor() {
  var grp = ptCadFindTopVerticalGroupForLeaf(pt_cad_tree, pt_cad_sel_id);
  if (!grp || grp.kind !== 'SPLIT') {
    // If not in a stacked H-split group, just set the single box to DOOR_1
    ptCadSetType('DOOR_1');
    return;
  }
  ptCadSaveUndo();
  grp.isDoor = !grp.isDoor;
  renderPtCadDesigner();
}

function ptCadMergeSelected() {
  var found = ptCadFind(pt_cad_tree, pt_cad_sel_id, null, null);
  if (!found || !found.parent) return;
  ptCadSaveUndo();
  var par = found.parent;
  var keepMat = (found.node && found.node.mat) ? found.node.mat : 'GLASS';
  par.kind = 'LEAF';
  par.mat = keepMat;
  delete par.dir;
  delete par.ratio;
  delete par.a;
  delete par.b;
  delete par.isDoor;
  pt_cad_sel_id = par.id;
  renderPtCadDesigner();
}

function ptCadLayout(node, x, y, w, h, leaves, splits, doorGroups) {
  if (node.kind === 'LEAF') {
    leaves.push({ id: node.id, mat: node.mat || 'GLASS', doorParts: node.doorParts || null, x: x, y: y, w: w, h: h });
    return;
  }
  if (node.isDoor && doorGroups) {
    doorGroups.push({ id: node.id, x: x, y: y, w: w, h: h });
  }
  var r = Math.min(0.88, Math.max(0.12, Number(node.ratio) || 0.5));
  if (node.dir === 'V') {
    var wA = w * r;
    splits.push({ nodeId: node.id, dir: 'V', x: x + wA, y: y, len: h, parentX: x, parentW: w });
    ptCadLayout(node.a, x, y, wA, h, leaves, splits, doorGroups);
    ptCadLayout(node.b, x + wA, y, w - wA, h, leaves, splits, doorGroups);
  } else {
    var hA = h * r;
    splits.push({ nodeId: node.id, dir: 'H', x: x, y: y + hA, len: w, parentY: y, parentH: h });
    ptCadLayout(node.a, x, y, w, hA, leaves, splits, doorGroups);
    ptCadLayout(node.b, x, y + hA, w, h - hA, leaves, splits, doorGroups);
  }
}

function ptCadResizePrompt() {
  var d = ptCadGetDims();
  var leaves = [], splits = [], doorGroups = [];
  ptCadLayout(pt_cad_tree, 0, 0, d.w, d.h, leaves, splits, doorGroups);
  var cur = leaves.find(l => l.id === pt_cad_sel_id);
  var found = ptCadFind(pt_cad_tree, pt_cad_sel_id, null, null);
  if (!cur || !found || !found.parent) {
    alert("Tap 'Split Left/Right' or 'Split Top/Bot' first, then drag the ↔ / ↕ arrow or tap Exact Size!");
    return;
  }
  var par = found.parent;
  var isV = (par.dir === 'V');
  var parentSpan = isV ? (cur.w / (found.branch === 'a' ? par.ratio : (1 - par.ratio))) : (cur.h / (found.branch === 'a' ? par.ratio : (1 - par.ratio)));
  var curVal = isV ? cur.w : cur.h;
  var inp = prompt("Enter exact " + (isV ? "Width (Inches)" : "Height (Inches)") + " for this box:", curVal.toFixed(1));
  if (!inp) return;
  var nv = parseFloat(inp);
  if (isNaN(nv) || nv <= 2 || nv >= parentSpan - 2) return;
  ptCadSaveUndo();
  par.ratio = (found.branch === 'a') ? (nv / parentSpan) : (1 - (nv / parentSpan));
  renderPtCadDesigner();
}

function ptCadStartDrag(ev, splitNodeId, dir, pStart, pSpan, ox, oy, scale) {
  ev.stopPropagation();
  ev.preventDefault();
  var found = ptCadFind(pt_cad_tree, splitNodeId, null, null);
  if (!found) return;
  ptCadSaveUndo();
  pt_cad_drag = { node: found.node, dir: dir, pStart: pStart, pSpan: pSpan, ox: ox, oy: oy, scale: scale };
}

function ptCadMoveDrag(ev) {
  if (!pt_cad_drag) return;
  var svgEl = document.getElementById('pt_cad_svg_el');
  if (!svgEl) return;
  var rect = svgEl.getBoundingClientRect();
  var clientX = ev.touches ? ev.touches[0].clientX : ev.clientX;
  var clientY = ev.touches ? ev.touches[0].clientY : ev.clientY;
  var vbX = ((clientX - rect.left) / rect.width) * 360;
  var vbY = ((clientY - rect.top) / rect.height) * 235;
  var d = pt_cad_drag;
  var worldPos = (d.dir === 'V') ? ((vbX - d.ox) / d.scale) : ((vbY - d.oy) / d.scale);
  var newRatio = (worldPos - d.pStart) / d.pSpan;
  d.node.ratio = Math.min(0.88, Math.max(0.12, newRatio));
  renderPtCadDesigner();
}

function ptCadEndDrag() {
  pt_cad_drag = null;
}

window.addEventListener('pointermove', ptCadMoveDrag);
window.addEventListener('pointerup', ptCadEndDrag);
window.addEventListener('touchmove', function(e){ if (pt_cad_drag) { e.preventDefault(); ptCadMoveDrag(e); } }, { passive: false });
window.addEventListener('touchend', ptCadEndDrag);

var pt_outer_frame = { top: true, bot: true, left: true, right: true, win: true };

function togglePtOuterFrame(side) {
  pt_outer_frame[side] = !pt_outer_frame[side];
  var labels = { top: 'Top', bot: 'Bot', left: 'Left', right: 'Right', win: 'Win Frame' };
  var btn = document.getElementById('pt_of_btn_' + side);
  if (btn) {
    var on = pt_outer_frame[side];
    btn.textContent = labels[side] + (on ? ' ✓' : ' ✕');
    btn.style.background = on ? (side === 'win' ? '#0284c7' : '#059669') : '#e2e8f0';
    btn.style.color = on ? '#ffffff' : '#64748b';
  }
  renderPtCadDesigner();
}

function ptCadComputeTrueCell(lf, d, tubeFace) {
  var isWin = (lf.mat === 'SLIDE_2T' || lf.mat === 'SLIDE_3T' || lf.mat === 'H_OPEN');
  var isDoor = (lf.mat === 'DOOR_1' || lf.mat === 'DOOR_2');
  var isWall = (lf.mat === 'WALL_MINUS');
  var isWinNoOuter = isWin && !pt_outer_frame.win;

  var atL = (lf.x <= 0.15);
  var atR = (lf.x + lf.w >= d.w - 0.15);
  var atT = (lf.y <= 0.15);
  var atB = (lf.y + lf.h >= d.h - 0.15);

  var outerL = atL && pt_outer_frame.left && !isWall && !isWinNoOuter;
  var outerR = atR && pt_outer_frame.right && !isWall && !isWinNoOuter;
  var outerT = atT && pt_outer_frame.top && !isWall && !isWinNoOuter;
  var outerB = atB && pt_outer_frame.bot && !isWall && !isDoor && !isWinNoOuter;

  var dedL = atL ? (outerL ? tubeFace : 0) : (tubeFace / 2);
  var dedR = atR ? (outerR ? tubeFace : 0) : (tubeFace / 2);
  var dedT = atT ? (outerT ? tubeFace : 0) : (tubeFace / 2);
  var dedB = atB ? (outerB ? tubeFace : 0) : (tubeFace / 2);

  var innerW = Math.max(2, lf.w - dedL - dedR);
  var innerH = Math.max(2, lf.h - dedT - dedB);
  return {
    innerW: innerW, innerH: innerH,
    dedL: dedL, dedR: dedR, dedT: dedT, dedB: dedB,
    outerL: outerL, outerR: outerR, outerT: outerT, outerB: outerB,
    atL: atL, atR: atR, atT: atT, atB: atB,
    isWin: isWin, isDoor: isDoor, isWall: isWall
  };
}

function ptCadSvgPill(cx, cy, text, fontSize, bg, fg, strokeCol) {
  var fs = fontSize || 6.2;
  var estW = Math.max(22, text.length * fs * 0.62 + 8);
  var estH = fs + 4.4;
  return '<rect x="' + (cx - estW / 2) + '" y="' + (cy - estH / 2) + '" width="' + estW + '" height="' + estH + '" rx="2.5" fill="' + (bg || 'rgba(255,255,255,0.94)') + '" stroke="' + (strokeCol || 'rgba(15,23,42,0.22)') + '" stroke-width="0.6"/>' +
         '<text x="' + cx + '" y="' + (cy + fs * 0.34) + '" font-size="' + fs + '" font-weight="800" fill="' + (fg || '#0f172a') + '" text-anchor="middle">' + text + '</text>';
}

function ptCadGetDefaultDoorParts() {
  return [{ mat: 'GLASS', h: 0 }, { mat: 'ACP', h: 30 }];
}

function ptCadComputeDoorPartHeights(parts, availH) {
  var fixedSum = 0, autoCount = 0;
  parts.forEach(function(p) {
    var hv = parseFloat(p.h) || 0;
    if (hv > 2) fixedSum += hv; else autoCount++;
  });
  var rem = Math.max(4, availH - fixedSum);
  return parts.map(function(p) {
    var hv = parseFloat(p.h) || 0;
    if (hv > 2) return Math.min(availH - 2, hv);
    return rem / Math.max(1, autoCount);
  });
}

function ptCadGetSelectedDoorNode() {
  var found = ptCadFind(pt_cad_tree, pt_cad_sel_id, null, null);
  if (!found || !found.node || found.node.kind !== 'LEAF') return null;
  if (found.node.mat !== 'DOOR_1' && found.node.mat !== 'DOOR_2') return null;
  if (!Array.isArray(found.node.doorParts) || !found.node.doorParts.length) {
    found.node.doorParts = ptCadGetDefaultDoorParts();
  }
  return found.node;
}

function ptCadSetDoorPartCount(n) {
  var node = ptCadGetSelectedDoorNode();
  if (!node) return;
  ptCadSaveUndo();
  n = Math.max(1, Math.min(4, parseInt(n, 10) || 2));
  if (n === 1) node.doorParts = [{ mat: 'GLASS', h: 0 }];
  else if (n === 2) node.doorParts = [{ mat: 'GLASS', h: 0 }, { mat: 'ACP', h: 30 }];
  else if (n === 3) node.doorParts = [{ mat: 'JALI', h: 18 }, { mat: 'GLASS', h: 0 }, { mat: 'ACP', h: 30 }];
  else node.doorParts = [{ mat: 'JALI', h: 16 }, { mat: 'GLASS', h: 0 }, { mat: 'GLASS', h: 0 }, { mat: 'ACP', h: 28 }];
  renderPtCadDesigner();
}

function ptCadApplyDoorPreset(preset) {
  var node = ptCadGetSelectedDoorNode();
  if (!node) return;
  ptCadSaveUndo();
  if (preset === 'full_glass') node.doorParts = [{ mat: 'GLASS', h: 0 }];
  else if (preset === 'full_jali') node.doorParts = [{ mat: 'JALI', h: 0 }];
  else if (preset === 'full_acp') node.doorParts = [{ mat: 'ACP', h: 0 }];
  else if (preset === 'glass_acp') node.doorParts = [{ mat: 'GLASS', h: 0 }, { mat: 'ACP', h: 30 }];
  else if (preset === 'jali_acp') node.doorParts = [{ mat: 'JALI', h: 0 }, { mat: 'ACP', h: 30 }];
  else if (preset === 'jali_glass_acp') node.doorParts = [{ mat: 'JALI', h: 18 }, { mat: 'GLASS', h: 0 }, { mat: 'ACP', h: 30 }];
  else if (preset === 'glass_jali_acp') node.doorParts = [{ mat: 'GLASS', h: 0 }, { mat: 'JALI', h: 20 }, { mat: 'ACP', h: 30 }];
  renderPtCadDesigner();
}

function ptCadUpdateDoorPart(idx, field, val) {
  var node = ptCadGetSelectedDoorNode();
  if (!node || !node.doorParts[idx]) return;
  if (field === 'mat') node.doorParts[idx].mat = val;
  else if (field === 'h') node.doorParts[idx].h = parseFloat(val) || 0;
  renderPtCadDesigner();
}

function renderPtCadDoorCustomizerUI() {
  var box = document.getElementById('pt_cad_door_customizer');
  var rowsEl = document.getElementById('pt_cad_door_parts_rows');
  if (!box || !rowsEl) return;
  var node = ptCadGetSelectedDoorNode();
  if (!node) {
    box.style.display = 'none';
    return;
  }
  box.style.display = 'block';
  var parts = node.doorParts;
  var html = '';
  parts.forEach(function(p, idx) {
    var posLabel = (parts.length === 1) ? 'Full Door' : (idx === 0 ? 'Top Part ' + (idx + 1) : (idx === parts.length - 1 ? 'Bot Part ' + (idx + 1) : 'Mid Part ' + (idx + 1)));
    html += '<div style="display:grid; grid-template-columns: 78px 1fr 78px; gap:5px; align-items:center; background:#fff; padding:4px 6px; border-radius:6px; border:1px solid #fde68a;">';
    html += '<span style="font-size:0.66rem; font-weight:800; color:#78350f;">' + posLabel + '</span>';
    html += '<select onchange="ptCadUpdateDoorPart(' + idx + ',\'mat\',this.value)" style="padding:4px; border:1px solid #cbd5e1; border-radius:5px; font-size:0.69rem; font-weight:700; background:#f8fafc;">';
    html += '<option value="GLASS"' + (p.mat === 'GLASS' ? ' selected' : '') + '>Glass</option>';
    html += '<option value="ACP"' + (p.mat === 'ACP' ? ' selected' : '') + '>ACP Board</option>';
    html += '<option value="JALI"' + (p.mat === 'JALI' ? ' selected' : '') + '>Jali / Mesh</option>';
    html += '</select>';
    html += '<input type="number" step="0.5" placeholder="Auto" value="' + (p.h > 0 ? p.h : '') + '" onchange="ptCadUpdateDoorPart(' + idx + ',\'h\',this.value)" style="padding:4px; border:1px solid #cbd5e1; border-radius:5px; font-size:0.69rem; font-weight:700; text-align:center;" title="Height in Inches (blank = Auto)">';
    html += '</div>';
  });
  rowsEl.innerHTML = html;
}

function buildPtCadSvg(isFullScreen) {
  var d = ptCadGetDims();
  var aluColor = getModuleAluColor('pt');
  var gType = document.getElementById('pt_g_type')?.value || 'Clear';
  var aluPal = getAluVisualPalette(aluColor);
  var glsPal = getGlassVisualPalette(gType);
  var tubeFace = parseFloat(document.getElementById('pt_tube_face')?.value) || 1.5;

  var leaves = [], splits = [], doorGroups = [];
  ptCadLayout(pt_cad_tree, 0, 0, d.w, d.h, leaves, splits, doorGroups);

  var vbW = 388, vbH = 266;
  var padL = 42, padR = 14, padT = 28, padB = 14;
  var scale = Math.min((vbW - padL - padR) / d.w, (vbH - padT - padB) / d.h);
  var drawW = d.w * scale, drawH = d.h * scale;
  var ox = padL + ((vbW - padL - padR) - drawW) / 2;
  var oy = padT + ((vbH - padT - padB) - drawH) / 2;
  var uid = 'ptc_' + Math.floor(Math.random() * 10000);
  var tubePx = Math.max(3.2, Math.min(8, tubeFace * scale));

  var disp = function(v) { return d.isMm ? toMmStr(v) : toFractionInch(v); };
  var styleStr = isFullScreen ? 'width:100%; height:100%; max-height:100%; display:block; margin:0 auto;' : 'width:100%; max-height:275px; display:block; margin:0 auto;';
  var svg = '<svg id="' + (isFullScreen ? 'pt_cad_fs_svg' : 'pt_cad_svg_el') + '" viewBox="0 0 ' + vbW + ' ' + vbH + '" preserveAspectRatio="xMidYMid meet" style="' + styleStr + '">';
  svg += '<defs>';
  svg += '<linearGradient id="alu_' + uid + '" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="' + aluPal.c1 + '"/><stop offset="50%" stop-color="' + aluPal.c2 + '"/><stop offset="100%" stop-color="' + aluPal.c3 + '"/></linearGradient>';
  svg += '<linearGradient id="gls_' + uid + '" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="' + glsPal.g1 + '" stop-opacity="' + glsPal.op + '"/><stop offset="55%" stop-color="' + glsPal.g2 + '" stop-opacity="' + glsPal.op + '"/><stop offset="100%" stop-color="' + glsPal.g1 + '" stop-opacity="' + glsPal.op + '"/></linearGradient>';
  svg += '<pattern id="jali_' + uid + '" width="7" height="7" patternUnits="userSpaceOnUse"><rect width="7" height="7" fill="#ecfdf5"/><path d="M0 0 L7 7 M7 0 L0 7" stroke="#065f46" stroke-width="0.95" stroke-opacity="0.8"/></pattern>';
  svg += '</defs>';

  // Architectural CAD Exterior Dimension Line — TOP (Total Width)
  var dimY = oy - 13;
  svg += '<line x1="' + ox + '" y1="' + (oy - 4) + '" x2="' + ox + '" y2="' + (dimY - 3) + '" stroke="#475569" stroke-width="0.7"/>';
  svg += '<line x1="' + (ox + drawW) + '" y1="' + (oy - 4) + '" x2="' + (ox + drawW) + '" y2="' + (dimY - 3) + '" stroke="#475569" stroke-width="0.7"/>';
  svg += '<line x1="' + ox + '" y1="' + dimY + '" x2="' + (ox + drawW) + '" y2="' + dimY + '" stroke="#0369a1" stroke-width="1"/>';
  svg += '<polygon points="' + ox + ',' + dimY + ' ' + (ox + 5) + ',' + (dimY - 2.3) + ' ' + (ox + 5) + ',' + (dimY + 2.3) + '" fill="#0369a1"/>';
  svg += '<polygon points="' + (ox + drawW) + ',' + dimY + ' ' + (ox + drawW - 5) + ',' + (dimY - 2.3) + ' ' + (ox + drawW - 5) + ',' + (dimY + 2.3) + '" fill="#0369a1"/>';
  svg += ptCadSvgPill(ox + drawW / 2, dimY, 'Total W: ' + disp(d.w), 7.0, '#f0f9ff', '#0c4a6e', '#0284c7');

  // Architectural CAD Exterior Dimension Line — LEFT (Total Height)
  var dimX = ox - 15;
  svg += '<line x1="' + (ox - 4) + '" y1="' + oy + '" x2="' + (dimX - 3) + '" y2="' + oy + '" stroke="#475569" stroke-width="0.7"/>';
  svg += '<line x1="' + (ox - 4) + '" y1="' + (oy + drawH) + '" x2="' + (dimX - 3) + '" y2="' + (oy + drawH) + '" stroke="#475569" stroke-width="0.7"/>';
  svg += '<line x1="' + dimX + '" y1="' + oy + '" x2="' + dimX + '" y2="' + (oy + drawH) + '" stroke="#0369a1" stroke-width="1"/>';
  svg += '<polygon points="' + dimX + ',' + oy + ' ' + (dimX - 2.3) + ',' + (oy + 5) + ' ' + (dimX + 2.3) + ',' + (oy + 5) + '" fill="#0369a1"/>';
  svg += '<polygon points="' + dimX + ',' + (oy + drawH) + ' ' + (dimX - 2.3) + ',' + (oy + drawH - 5) + ' ' + (dimX + 2.3) + ',' + (oy + drawH - 5) + '" fill="#0369a1"/>';
  svg += '<g transform="translate(' + dimX + ',' + (oy + drawH / 2) + ') rotate(-90)">' + ptCadSvgPill(0, 0, 'H: ' + disp(d.h), 6.8, '#f0f9ff', '#0c4a6e', '#0284c7') + '</g>';

  // Subtle dashed outer boundary reference (shows exact wall opening even when an outer tube is OFF)
  svg += '<rect x="' + ox + '" y="' + oy + '" width="' + drawW + '" height="' + drawH + '" fill="#f8fafc" stroke="#cbd5e1" stroke-width="0.9" stroke-dasharray="3,2"/>';

  // Compute true inner cell dims & draw each cell + its active outer frame segments
  leaves.forEach(function(lf) {
    var tc = ptCadComputeTrueCell(lf, d, tubeFace);
    lf._tc = tc;

    var pL = tc.dedL * scale, pR = tc.dedR * scale, pT = tc.dedT * scale, pB = tc.dedB * scale;
    var bx = ox + lf.x * scale, by = oy + lf.y * scale, bw = lf.w * scale, bh = lf.h * scale;

    // Draw Partition Frame / Divider Tubes belonging to this cell's borders
    if (!tc.isWall) {
      if (tc.outerL) svg += '<rect x="' + bx + '" y="' + by + '" width="' + Math.max(2.5, pL) + '" height="' + bh + '" fill="url(#alu_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="0.8"/>';
      if (tc.outerR) svg += '<rect x="' + (bx + bw - Math.max(2.5, pR)) + '" y="' + by + '" width="' + Math.max(2.5, pR) + '" height="' + bh + '" fill="url(#alu_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="0.8"/>';
      if (tc.outerT) svg += '<rect x="' + bx + '" y="' + by + '" width="' + bw + '" height="' + Math.max(2.5, pT) + '" fill="url(#alu_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="0.8"/>';
      if (tc.outerB) svg += '<rect x="' + bx + '" y="' + (by + bh - Math.max(2.5, pB)) + '" width="' + bw + '" height="' + Math.max(2.5, pB) + '" fill="url(#alu_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="0.8"/>';
    }

    var rx = bx + pL, ry = by + pT;
    var rw = Math.max(8, bw - pL - pR), rh = Math.max(8, bh - pT - pB);
    var isSel = (!isFullScreen && lf.id === pt_cad_sel_id);
    var clickA = isFullScreen ? '' : ('onclick="ptCadTapBox(' + lf.id + ')" style="cursor:pointer;"');

    svg += '<g ' + clickA + '>';
    if (lf.mat === 'WALL_MINUS') {
      svg += '<rect x="' + bx + '" y="' + by + '" width="' + bw + '" height="' + bh + '" fill="#e7e5e4" stroke="#78716c" stroke-width="1.3" stroke-dasharray="4,2"/>';
      for (var ly = by + 8; ly < by + bh - 2; ly += 8) svg += '<line x1="' + bx + '" y1="' + ly + '" x2="' + (bx + bw) + '" y2="' + ly + '" stroke="#a8a29e" stroke-width="0.7"/>';
      if (bw >= 36 && bh >= 24) svg += ptCadSvgPill(bx + bw / 2, by + bh / 2, 'WALL (MINUS)', 6.0, 'rgba(254,242,242,0.95)', '#dc2626', '#fca5a5');
    } else if (lf.mat === 'ACP') {
      svg += '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="' + rh + '" fill="#94a3b8" stroke="' + aluPal.stroke + '" stroke-width="0.9"/>';
      if (rw >= 32 && rh >= 26) svg += ptCadSvgPill(rx + rw / 2, ry + rh / 2 + 5, 'ACP', 6.0, 'rgba(241,245,249,0.92)', '#0f172a', '#64748b');
    } else if (lf.mat === 'JALI') {
      svg += '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="' + rh + '" fill="url(#jali_' + uid + ')" stroke="#059669" stroke-width="1.1"/>';
      if (rw >= 32 && rh >= 26) svg += ptCadSvgPill(rx + rw / 2, ry + rh / 2 + 5, 'JALI', 6.0, 'rgba(236,253,245,0.95)', '#065f46', '#10b981');
    } else if (lf.mat === 'DOOR_1' || lf.mat === 'DOOR_2') {
      var nL = (lf.mat === 'DOOR_2') ? 2 : 1;
      var dParts = (Array.isArray(lf.doorParts) && lf.doorParts.length) ? lf.doorParts : ptCadGetDefaultDoorParts();
      var pHeights = ptCadComputeDoorPartHeights(dParts, Math.max(20, tc.innerH - 8));
      var sumPH = pHeights.reduce(function(a, b) { return a + b; }, 0) || 1;
      svg += '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="' + rh + '" fill="url(#alu_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="1.1"/>';
      var lw = (rw - 4 - ((nL - 1) * 2)) / nL;
      var innerLeafH = Math.max(8, rh - 8);
      var railGap = 2.2;
      var usableH = Math.max(6, innerLeafH - (dParts.length - 1) * railGap);
      for (var i = 0; i < nL; i++) {
        var dlx = rx + 2 + i * (lw + 2);
        svg += '<rect x="' + dlx + '" y="' + (ry + 2) + '" width="' + lw + '" height="' + (rh - 3) + '" fill="url(#alu_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="0.85"/>';
        var curPY = ry + 4;
        for (var pi = 0; pi < dParts.length; pi++) {
          var partH = Math.max(4, usableH * (pHeights[pi] / sumPH));
          var pMat = dParts[pi].mat;
          var pFill = (pMat === 'JALI') ? ('url(#jali_' + uid + ')') : (pMat === 'ACP' ? '#94a3b8' : ('url(#gls_' + uid + ')'));
          svg += '<rect x="' + (dlx + 3) + '" y="' + curPY + '" width="' + Math.max(4, lw - 6) + '" height="' + partH + '" fill="' + pFill + '" stroke="' + (pMat === 'JALI' ? '#059669' : aluPal.stroke) + '" stroke-width="0.5"/>';
          if (lw >= 28 && partH >= 15 && i === 0) {
            var pTag = pMat === 'JALI' ? 'JALI' : (pMat === 'ACP' ? 'ACP' : 'GLASS');
            svg += '<text x="' + (dlx + lw / 2) + '" y="' + (curPY + partH / 2 + 2) + '" font-size="5.2" font-weight="800" fill="' + (pMat === 'JALI' ? '#065f46' : '#1e293b') + '" text-anchor="middle">' + pTag + '</text>';
          }
          curPY += partH + railGap;
        }
        var hx = (i === 0 && nL === 2) ? (dlx + lw - 4) : (dlx + 2);
        svg += '<rect x="' + hx + '" y="' + (ry + rh * 0.45) + '" width="2.2" height="12" rx="1" fill="#fbbf24"/>';
      }
      var dBadge = (nL === 2 ? '2-LEAF ' : '') + 'DOOR (' + dParts.length + 'P)';
      if (rw >= 34 && rh >= 32) svg += ptCadSvgPill(rx + rw / 2, ry + rh - 9, dBadge, 5.6, '#fffbeb', '#92400e', '#f59e0b');
    } else if (lf.mat === 'SLIDE_2T' || lf.mat === 'SLIDE_3T') {
      var tr = (lf.mat === 'SLIDE_3T') ? 3 : 2;
      svg += '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="' + rh + '" fill="url(#alu_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="1.2"/>';
      var tw = (rw - 4 - ((tr - 1) * 2)) / tr;
      for (var t = 0; t < tr; t++) {
        var tx = rx + 2 + t * (tw + 2);
        var isJ = (tr === 3 && t === 2);
        svg += '<rect x="' + tx + '" y="' + (ry + 2) + '" width="' + tw + '" height="' + (rh - 4) + '" fill="' + (isJ ? 'url(#jali_' + uid + ')' : 'url(#gls_' + uid + ')') + '" stroke="' + aluPal.stroke + '" stroke-width="0.8"/>';
      }
      if (rw >= 40 && rh >= 28) svg += ptCadSvgPill(rx + rw / 2, ry + rh / 2 + 5, (tr === 3 ? '3T SLIDE + JALI' : '2T SLIDE'), 6.0, 'rgba(255,255,255,0.95)', '#1e3a8a', '#60a5fa');
    } else if (lf.mat === 'H_OPEN') {
      svg += '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="' + rh + '" fill="url(#alu_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="1.1"/>';
      svg += '<rect x="' + (rx + 3) + '" y="' + (ry + 3) + '" width="' + Math.max(4, rw - 6) + '" height="' + Math.max(4, rh - 6) + '" fill="url(#gls_' + uid + ')"/>';
      svg += '<polyline points="' + (rx + 3) + ',' + (ry + 3) + ' ' + (rx + rw - 3) + ',' + (ry + rh / 2) + ' ' + (rx + 3) + ',' + (ry + rh - 3) + '" fill="none" stroke="#fff" stroke-width="1.1" stroke-dasharray="3,2"/>';
      svg += '<rect x="' + (rx + rw - 4.5) + '" y="' + (ry + rh / 2 - 5) + '" width="2" height="10" rx="1" fill="#fbbf24"/>';
      if (rw >= 38 && rh >= 28) svg += ptCadSvgPill(rx + rw / 2, ry + rh - 9, 'OPEN WIN', 5.8, '#eff6ff', '#1e3a8a', '#3b82f6');
    } else {
      svg += '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="' + rh + '" fill="url(#gls_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="0.9"/>';
      svg += '<line x1="' + (rx + 4) + '" y1="' + (ry + rh - 4) + '" x2="' + (rx + rw - 4) + '" y2="' + (ry + 4) + '" stroke="' + glsPal.shine + '" stroke-width="1.4" stroke-opacity="0.6"/>';
    }

    // Crisp White Pill with TRUE INNER CLEAR OPENING SIZE (never overlapping lines!)
    if (rw >= 34 && rh >= 20) {
      var dimTxt = tc.isWall ? (disp(lf.w) + '×' + disp(lf.h)) : (disp(tc.innerW) + '×' + disp(tc.innerH));
      var pillY = (rh >= 36) ? (ry + 10) : (ry + rh / 2);
      svg += ptCadSvgPill(rx + rw / 2, pillY, dimTxt, 5.8, 'rgba(255,255,255,0.94)', '#0f172a', 'rgba(15,23,42,0.22)');
    }
    if (isSel) {
      svg += '<rect x="' + rx + '" y="' + ry + '" width="' + rw + '" height="' + rh + '" fill="none" stroke="#7c3aed" stroke-width="2.4" stroke-dasharray="4,2"/>';
    }
    svg += '</g>';
  });

  // Draw Real Interior Divider Mullions & Transoms along every split line
  splits.forEach(function(sp) {
    if (sp.dir === 'V') {
      var sx = ox + sp.x * scale - tubePx / 2;
      svg += '<rect x="' + sx + '" y="' + (oy + sp.y * scale) + '" width="' + tubePx + '" height="' + (sp.len * scale) + '" fill="url(#alu_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="0.7"/>';
    } else {
      var sy = oy + sp.y * scale - tubePx / 2;
      svg += '<rect x="' + (ox + sp.x * scale) + '" y="' + sy + '" width="' + (sp.len * scale) + '" height="' + tubePx + '" fill="url(#alu_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="0.7"/>';
    }
  });

  // Draw Door Frame, Hinges & Golden Handle around any Wrapped/Multi-Part Door Group
  doorGroups.forEach(function(dg) {
    var dx = ox + dg.x * scale + 2, dy = oy + dg.y * scale + 2;
    var dw = Math.max(12, dg.w * scale - 4), dh = Math.max(12, dg.h * scale - 4);
    svg += '<rect x="' + dx + '" y="' + dy + '" width="' + dw + '" height="' + dh + '" fill="none" stroke="#b45309" stroke-width="2.8" rx="1.5"/>';
    svg += '<rect x="' + (dx + 2) + '" y="' + (dy + dh * 0.14) + '" width="2.4" height="6" rx="0.8" fill="#475569"/>';
    svg += '<rect x="' + (dx + 2) + '" y="' + (dy + dh * 0.50) + '" width="2.4" height="6" rx="0.8" fill="#475569"/>';
    svg += '<rect x="' + (dx + 2) + '" y="' + (dy + dh * 0.84) + '" width="2.4" height="6" rx="0.8" fill="#475569"/>';
    svg += '<rect x="' + (dx + dw - 5.5) + '" y="' + (dy + dh * 0.48) + '" width="3.2" height="15" rx="1.2" fill="#f59e0b" stroke="#78350f" stroke-width="0.6"/>';
    svg += ptCadSvgPill(dx + dw / 2, dy + dh - 8, 'MULTI-PART DOOR', 5.8, '#b45309', '#ffffff', '#78350f');
  });

  if (!isFullScreen) {
    splits.forEach(function(sp) {
      var hx = ox + (sp.dir === 'V' ? sp.x : (sp.x + sp.len / 2)) * scale;
      var hy = oy + (sp.dir === 'H' ? sp.y : (sp.y + sp.len / 2)) * scale;
      var pStart = (sp.dir === 'V') ? sp.parentX : sp.parentY;
      var pSpan = (sp.dir === 'V') ? sp.parentW : sp.parentH;
      var dragAttr = 'onpointerdown="ptCadStartDrag(event,' + sp.nodeId + ',\'' + sp.dir + '\',' + pStart + ',' + pSpan + ',' + ox + ',' + oy + ',' + scale + ')" ontouchstart="ptCadStartDrag(event,' + sp.nodeId + ',\'' + sp.dir + '\',' + pStart + ',' + pSpan + ',' + ox + ',' + oy + ',' + scale + ')"';
      svg += '<g ' + dragAttr + ' style="cursor:' + (sp.dir === 'V' ? 'ew-resize' : 'ns-resize') + ';">';
      svg += '<circle cx="' + hx + '" cy="' + hy + '" r="8.5" fill="#0284c7" stroke="#ffffff" stroke-width="1.5"/>';
      svg += '<text x="' + hx + '" y="' + (hy + 3.2) + '" font-size="9.5" font-weight="bold" fill="#ffffff" text-anchor="middle">' + (sp.dir === 'V' ? '↔' : '↕') + '</text>';
      svg += '</g>';
    });
  }

  svg += '</svg>';
  return { svg: svg, leaves: leaves, splits: splits, aluColor: aluColor, gType: gType };
}

function renderPtCadDesigner() {
  if (!pt_cad_tree) pt_cad_tree = { id: 1, kind: 'LEAF', mat: 'GLASS' };
  var stage = document.getElementById('pt_cad_svg_stage');
  if (!stage) return;
  var res = buildPtCadSvg(false);
  stage.innerHTML = res.svg;
  var cur = res.leaves.find(l => l.id === pt_cad_sel_id);
  renderPtCadDoorCustomizerUI();
  var infoEl = document.getElementById('pt_cad_sel_info');
  if (infoEl && cur) {
    var mName = cur.mat === 'WALL_MINUS' ? 'Wall (Minus -)' : cur.mat;
    var tc = cur._tc;
    var disp = function(v) { return ptCadGetDims().isMm ? toMmStr(v) : toFractionInch(v); };
    if (tc && !tc.isWall) {
      infoEl.innerHTML = 'Selected: <b>' + mName + '</b> • Clear Inner: <b style="color:#0369a1;">' + disp(tc.innerW) + ' W × ' + disp(tc.innerH) + ' H</b> <span style="font-size:0.68rem; color:#64748b;">(Bay: ' + disp(cur.w) + ' × ' + disp(cur.h) + ')</span>';
    } else {
      infoEl.innerHTML = 'Selected: <b>' + mName + '</b> (' + disp(cur.w) + ' W × ' + disp(cur.h) + ' H)';
    }
  }
}

function openPtCadFullScreen() {
  var ccBar = document.getElementById('csm_cc_cad_bar'); if (ccBar) ccBar.style.display = 'none';
  var modal = document.getElementById('customerShowroomModal');
  var holder = document.getElementById('csm_svg_holder');
  var sub = document.getElementById('csm_subtitle');
  var badges = document.getElementById('csm_specs_badges');
  if (!modal || !holder) return;
  var res = buildPtCadSvg(true);
  csmCurrentZoom = 1.0;
  holder.style.transform = 'scale(1)';
  holder.innerHTML = res.svg;
  if (sub) sub.textContent = 'Partition Design  •  ' + res.aluColor + ' + ' + getModuleGlassLabel('pt');
  if (badges) {
    badges.innerHTML =
      '<div style="background:#f5f3ff; border:1px solid #c4b5fd; border-radius:8px; padding:7px 9px;"><div style="font-size:0.65rem; color:#6d28d9; font-weight:700;">ALUMINIUM</div><div style="font-size:0.8rem; color:#0f172a; font-weight:800;">' + getModuleAluLabel('pt') + '</div></div>' +
      '<div style="background:#f0f9ff; border:1px solid #bae6fd; border-radius:8px; padding:7px 9px;"><div style="font-size:0.65rem; color:#0369a1; font-weight:700;">GLASS / SPEC</div><div style="font-size:0.8rem; color:#0f172a; font-weight:800;">' + getModuleGlassLabel('pt') + '</div></div>';
  }
  modal.style.display = 'flex';
}


function ptCadLoadPreset(name) {
  ptCadSaveUndo();
  if (name === 'office') {
    pt_cad_next_id = 20;
    pt_cad_tree = {
      id: 1, kind: 'SPLIT', dir: 'V', ratio: 0.33,
      a: { id: 2, kind: 'SPLIT', dir: 'H', ratio: 0.2, a: { id: 3, kind: 'LEAF', mat: 'ACP' }, b: { id: 4, kind: 'SPLIT', dir: 'H', ratio: 0.62, a: { id: 5, kind: 'LEAF', mat: 'GLASS' }, b: { id: 6, kind: 'LEAF', mat: 'ACP' } } },
      b: { id: 7, kind: 'SPLIT', dir: 'V', ratio: 0.5,
        a: { id: 8, kind: 'SPLIT', dir: 'H', ratio: 0.2, a: { id: 9, kind: 'LEAF', mat: 'ACP' }, b: { id: 10, kind: 'SPLIT', dir: 'H', ratio: 0.62, a: { id: 11, kind: 'LEAF', mat: 'GLASS' }, b: { id: 12, kind: 'LEAF', mat: 'ACP' } } },
        b: { id: 13, kind: 'SPLIT', dir: 'H', ratio: 0.2, a: { id: 14, kind: 'LEAF', mat: 'ACP' }, b: { id: 15, kind: 'SPLIT', dir: 'H', ratio: 0.62, a: { id: 16, kind: 'LEAF', mat: 'GLASS' }, b: { id: 17, kind: 'LEAF', mat: 'ACP' } } }
      }
    };
  } else if (name === 'mid_door') {
    pt_cad_next_id = 20;
    pt_cad_tree = {
      id: 1, kind: 'SPLIT', dir: 'V', ratio: 0.33,
      a: { id: 2, kind: 'SPLIT', dir: 'H', ratio: 0.65, a: { id: 3, kind: 'LEAF', mat: 'GLASS' }, b: { id: 4, kind: 'LEAF', mat: 'ACP' } },
      b: { id: 5, kind: 'SPLIT', dir: 'V', ratio: 0.5,
        a: { id: 6, kind: 'SPLIT', dir: 'H', ratio: 0.16, a: { id: 7, kind: 'LEAF', mat: 'GLASS' }, b: { id: 8, kind: 'SPLIT', dir: 'H', ratio: 0.22, isDoor: true, a: { id: 9, kind: 'LEAF', mat: 'JALI' }, b: { id: 10, kind: 'SPLIT', dir: 'H', ratio: 0.6, a: { id: 11, kind: 'LEAF', mat: 'GLASS' }, b: { id: 12, kind: 'LEAF', mat: 'ACP' } } } },
        b: { id: 13, kind: 'SPLIT', dir: 'H', ratio: 0.65, a: { id: 14, kind: 'LEAF', mat: 'GLASS' }, b: { id: 15, kind: 'LEAF', mat: 'ACP' } }
      }
    };
  } else if (name === 'door_win') {
    pt_cad_next_id = 20;
    pt_cad_tree = {
      id: 1, kind: 'SPLIT', dir: 'V', ratio: 0.32,
      a: { id: 2, kind: 'SPLIT', dir: 'H', ratio: 0.18, isDoor: true, a: { id: 3, kind: 'LEAF', mat: 'JALI' }, b: { id: 4, kind: 'SPLIT', dir: 'H', ratio: 0.6, a: { id: 5, kind: 'LEAF', mat: 'GLASS' }, b: { id: 6, kind: 'LEAF', mat: 'ACP' } } },
      b: { id: 7, kind: 'SPLIT', dir: 'H', ratio: 0.28,
        a: { id: 8, kind: 'SPLIT', dir: 'V', ratio: 0.5, a: { id: 9, kind: 'LEAF', mat: 'GLASS' }, b: { id: 10, kind: 'LEAF', mat: 'GLASS' } },
        b: { id: 11, kind: 'SPLIT', dir: 'H', ratio: 0.52, a: { id: 12, kind: 'LEAF', mat: 'SLIDE_2T' }, b: { id: 13, kind: 'LEAF', mat: 'ACP' } }
      }
    };
  } else if (name === 'hw_win') {
    pt_cad_next_id = 20;
    pt_cad_tree = {
      id: 1, kind: 'SPLIT', dir: 'H', ratio: 0.62,
      a: { id: 2, kind: 'SPLIT', dir: 'V', ratio: 0.3, a: { id: 3, kind: 'LEAF', mat: 'GLASS' }, b: { id: 4, kind: 'SPLIT', dir: 'V', ratio: 0.6, a: { id: 5, kind: 'LEAF', mat: 'SLIDE_3T' }, b: { id: 6, kind: 'LEAF', mat: 'GLASS' } } },
      b: { id: 7, kind: 'LEAF', mat: 'WALL_MINUS' }
    };
  } else if (name === 'door_hw') {
    pt_cad_next_id = 20;
    pt_cad_tree = {
      id: 1, kind: 'SPLIT', dir: 'V', ratio: 0.32,
      a: { id: 2, kind: 'SPLIT', dir: 'H', ratio: 0.18, isDoor: true, a: { id: 3, kind: 'LEAF', mat: 'JALI' }, b: { id: 4, kind: 'SPLIT', dir: 'H', ratio: 0.6, a: { id: 5, kind: 'LEAF', mat: 'GLASS' }, b: { id: 6, kind: 'LEAF', mat: 'ACP' } } },
      b: { id: 7, kind: 'SPLIT', dir: 'H', ratio: 0.28,
        a: { id: 8, kind: 'SPLIT', dir: 'V', ratio: 0.5, a: { id: 9, kind: 'LEAF', mat: 'GLASS' }, b: { id: 10, kind: 'LEAF', mat: 'GLASS' } },
        b: { id: 11, kind: 'SPLIT', dir: 'H', ratio: 0.45, a: { id: 12, kind: 'LEAF', mat: 'SLIDE_2T' }, b: { id: 13, kind: 'LEAF', mat: 'WALL_MINUS' } }
      }
    };
  } else if (name === 'dbl_door') {
    pt_cad_next_id = 20;
    pt_cad_tree = {
      id: 1, kind: 'SPLIT', dir: 'V', ratio: 0.26,
      a: { id: 2, kind: 'SPLIT', dir: 'H', ratio: 0.65, a: { id: 3, kind: 'LEAF', mat: 'GLASS' }, b: { id: 4, kind: 'LEAF', mat: 'ACP' } },
      b: { id: 5, kind: 'SPLIT', dir: 'V', ratio: 0.65,
        a: { id: 6, kind: 'SPLIT', dir: 'H', ratio: 0.18, a: { id: 7, kind: 'LEAF', mat: 'JALI' }, b: { id: 8, kind: 'LEAF', mat: 'DOOR_2' } },
        b: { id: 9, kind: 'SPLIT', dir: 'H', ratio: 0.65, a: { id: 10, kind: 'LEAF', mat: 'GLASS' }, b: { id: 11, kind: 'LEAF', mat: 'ACP' } }
      }
    };
  } else {
    pt_cad_next_id = 2;
    pt_cad_tree = { id: 1, kind: 'LEAF', mat: 'GLASS' };
  }
  pt_cad_sel_id = ptCadFirstLeaf(pt_cad_tree);
  renderPtCadDesigner();
}


var pt_active_combo_mode = 'ONLY_PT';

function applyPtDoorSectionPreset(preset) {
  var vEl = document.getElementById('pt_sec_vert');
  var tEl = document.getElementById('pt_sec_top');
  var bEl = document.getElementById('pt_sec_bot');
  var mEl = document.getElementById('pt_sec_mid');
  if (preset === 'commercial') { if(vEl) vEl.value='1.75'; if(tEl) tEl.value='2.5'; if(bEl) bEl.value='4.0'; if(mEl) mEl.value='2.5'; }
  else if (preset === 'jumbo') { if(vEl) vEl.value='1.75'; if(tEl) tEl.value='2.5'; if(bEl) bEl.value='5.0'; if(mEl) mEl.value='3.0'; }
  else if (preset === 'economy') { if(vEl) vEl.value='1.75'; if(tEl) tEl.value='1.75'; if(bEl) bEl.value='2.5'; if(mEl) mEl.value='1.75'; }
  else if (preset === 'slim') { if(vEl) vEl.value='1.75'; if(tEl) tEl.value='2.0'; if(bEl) bEl.value='4.0'; if(mEl) mEl.value='2.0'; }
  renderPtCadDesigner();
}

function setPtComboMode(mode) {
  pt_active_combo_mode = mode;
  var btns = {
    ONLY_PT: document.getElementById('pt_mode_btn_only'),
    PT_DOOR: document.getElementById('pt_mode_btn_door'),
    PT_WIN: document.getElementById('pt_mode_btn_win'),
    ALL_3: document.getElementById('pt_mode_btn_all')
  };
  Object.keys(btns).forEach(function(k) {
    var b = btns[k];
    if (!b) return;
    if (k === mode) {
      b.style.background = '#0284c7';
      b.style.color = '#ffffff';
      b.style.border = 'none';
    } else {
      b.style.background = '#f1f5f9';
      b.style.color = '#0f172a';
      b.style.border = '1px solid #cbd5e1';
    }
  });

  var doorBox = document.getElementById('pt_integrated_door_specs');
  var winBox = document.getElementById('pt_integrated_win_specs');
  if (doorBox) doorBox.style.display = (mode === 'PT_DOOR' || mode === 'ALL_3') ? 'block' : 'none';
  if (winBox) winBox.style.display = (mode === 'PT_WIN' || mode === 'ALL_3') ? 'block' : 'none';

  if (mode === 'ONLY_PT') ptCadLoadPreset('office');
  else if (mode === 'PT_DOOR') ptCadLoadPreset('mid_door');
  else if (mode === 'PT_WIN') ptCadLoadPreset('hw_win');
  else if (mode === 'ALL_3') ptCadLoadPreset('door_hw');
}


// =========================================================================
// v104: CUSTOM GLASS TYPES (SETTINGS) + GLASS SHOP STOCK + #G101 REMNANTS
// =========================================================================
var SW_CUSTOM_GLASS_KEY = 'sw_custom_glass_types_v1';
var SW_GLASS_SHOP_STOCK_KEY = 'sw_glass_shop_stock_v1';
var SW_GLASS_REMNANT_KEY = 'sw_glass_remnants_v1';
var gc_last_plan_offcuts = [];

function loadCustomGlassTypes() {
  try {
    var raw = localStorage.getItem(SW_CUSTOM_GLASS_KEY);
    var arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (e) { return []; }
}

function syncCustomGlassDropdowns() {
  var customList = loadCustomGlassTypes();
  var selectIds = ['dm_g_type', 'sl_g_type', 'cc_g_type', 'dr_g_type', 'pt_g_type', 'gc_g_type', 'gc_shop_stock_type'];
  selectIds.forEach(function(sid) {
    var sel = document.getElementById(sid);
    if (!sel) return;
    // Remove previously injected custom options
    Array.from(sel.options).forEach(function(opt) {
      if (opt.getAttribute && opt.getAttribute('data-custom-glass') === '1') opt.remove();
    });
    customList.forEach(function(name) {
      var o = document.createElement('option');
      o.value = name;
      o.textContent = name + ' (Custom)';
      o.setAttribute('data-custom-glass', '1');
      sel.appendChild(o);
    });
  });
  renderCustomGlassSettingsList();
  if (typeof applyLanguageTranslations === 'function' && typeof currentAppLang !== 'undefined' && currentAppLang !== 'en') applyLanguageTranslations(currentAppLang);
}

function renderCustomGlassSettingsList() {
  var box = document.getElementById('custom_glass_types_list');
  if (!box) return;
  var list = loadCustomGlassTypes();
  if (!list.length) {
    box.innerHTML = '<span style="font-size:0.71rem; color:#94a3b8;">No custom glass added yet.</span>';
    return;
  }
  box.innerHTML = list.map(function(name, idx) {
    return '<span style="display:inline-flex; align-items:center; gap:5px; background:#e0f2fe; color:#0369a1; border:1px solid #7dd3fc; border-radius:99px; padding:3px 9px; font-size:0.72rem; font-weight:800;">' +
      escapeHtml(name) + ' <button type="button" onclick="deleteCustomGlassType(' + idx + ')" style="background:none; border:none; color:#dc2626; font-weight:900; cursor:pointer; padding:0;">✕</button></span>';
  }).join('');
}

function addCustomGlassType() {
  var inp = document.getElementById('custom_glass_name_inp');
  var name = (inp ? inp.value : '').trim();
  if (!name) { alert("Please enter a custom glass name (e.g. 5mm Fluted)."); return; }
  var list = loadCustomGlassTypes();
  if (list.some(function(x) { return x.toLowerCase() === name.toLowerCase(); })) {
    alert("This glass name already exists!");
    return;
  }
  list.push(name);
  try { localStorage.setItem(SW_CUSTOM_GLASS_KEY, JSON.stringify(list)); } catch (e) {}
  if (inp) inp.value = '';
  syncCustomGlassDropdowns();
  if (typeof syncToGoogleSheet === 'function') syncToGoogleSheet('CustomGlass', [new Date().toLocaleDateString('en-GB'), name]);
  if (typeof syncAllDataToCloud === 'function') syncAllDataToCloud(currentCloudUser ? currentCloudUser.uid : null);
}

function deleteCustomGlassType(idx) {
  var list = loadCustomGlassTypes();
  list.splice(idx, 1);
  try { localStorage.setItem(SW_CUSTOM_GLASS_KEY, JSON.stringify(list)); } catch (e) {}
  syncCustomGlassDropdowns();
}

// --- v104: COMPLETE GLASS STOCK MANAGEMENT (LOCAL NAMES + RATE + STOCK IN + AUTO-MINUS + BILL PDF) ---
var SW_GLASS_INWARD_LOG_KEY = 'sw_glass_inward_log_v1';
var gc_last_needed_sheets = {};

function loadGlassShopStock() {
  try {
    var raw = localStorage.getItem(SW_GLASS_SHOP_STOCK_KEY);
    var obj = raw ? JSON.parse(raw) : {};
    // Normalize legacy numeric entries into rich objects { qty, rate, sheetSqFt }
    Object.keys(obj).forEach(function(k) {
      if (typeof obj[k] === 'number') obj[k] = { qty: obj[k], rate: 55, sheetSqFt: 32 };
    });
    return obj;
  } catch (e) { return {}; }
}

function saveGlassShopStockObj(obj) {
  try { localStorage.setItem(SW_GLASS_SHOP_STOCK_KEY, JSON.stringify(obj || {})); } catch (e) {}
}

function addIncomingGlassStock() {
  var nameInp = document.getElementById('gc_stock_name_inp');
  var rateInp = document.getElementById('gc_stock_rate_inp');
  var qtyInp = document.getElementById('gc_stock_add_qty');
  var name = (nameInp ? nameInp.value : '').trim();
  var rate = parseFloat(rateInp ? rateInp.value : 55) || 0;
  var addQty = parseInt(qtyInp ? qtyInp.value : 0, 10) || 0;
  if (!name) { alert("Please enter Glass Name (e.g. 5mm Ghosa Kach, 5mm Clear)."); return; }
  if (addQty <= 0) { alert("Please enter valid incoming sheet quantity (+Sheets)."); return; }

  var stockDim = (typeof getSelectedGlassStockSheetDims === 'function') ? getSelectedGlassStockSheetDims() : { sL: 96, sW: 48 };
  var sheetSqFt = (stockDim.sL * stockDim.sW) / 144.0;
  var stock = loadGlassShopStock();

  // Case-insensitive match existing glass name
  var matchKey = Object.keys(stock).find(function(k) { return k.toLowerCase() === name.toLowerCase(); }) || name;
  if (!stock[matchKey]) stock[matchKey] = { qty: 0, rate: rate, sheetSqFt: sheetSqFt };
  stock[matchKey].qty += addQty;
  if (rate > 0) stock[matchKey].rate = rate;
  stock[matchKey].sheetSqFt = sheetSqFt;
  saveGlassShopStockObj(stock);

  // Also register this local glass name into Custom Glass Types so it appears in all calculators!
  var customList = loadCustomGlassTypes();
  if (!customList.some(function(x) { return x.toLowerCase() === matchKey.toLowerCase(); })) {
    customList.push(matchKey);
    try { localStorage.setItem(SW_CUSTOM_GLASS_KEY, JSON.stringify(customList)); } catch (e) {}
    syncCustomGlassDropdowns();
  }

  // Record Stock Inward entry for Purchase Bill
  try {
    var logs = JSON.parse(localStorage.getItem(SW_GLASS_INWARD_LOG_KEY) || '[]');
    logs.unshift({
      date: new Date().toLocaleDateString('en-GB'),
      name: matchKey,
      addedQty: addQty,
      sheetSqFt: sheetSqFt,
      rate: stock[matchKey].rate,
      amount: Math.round(addQty * sheetSqFt * stock[matchKey].rate)
    });
    localStorage.setItem(SW_GLASS_INWARD_LOG_KEY, JSON.stringify(logs.slice(0, 60)));
  } catch (e) {}

  if (nameInp) nameInp.value = '';
  renderGlassShopStockUI(gc_last_needed_sheets);
  if (typeof syncToGoogleSheet === 'function') syncToGoogleSheet('GlassStock', [new Date().toLocaleDateString('en-GB'), 'STOCK_IN', matchKey, addQty, stock[matchKey].qty, stock[matchKey].rate]);
  if (typeof syncAllDataToCloud === 'function') syncAllDataToCloud(currentCloudUser ? currentCloudUser.uid : null);
  alert("✅ Added +" + addQty + " Sheet(s) of '" + matchKey + "'! Total in Stock: " + stock[matchKey].qty + " Sheet(s).");
}

function adjustGlassStockQty(name, delta) {
  var stock = loadGlassShopStock();
  if (!stock[name]) return;
  stock[name].qty = Math.max(0, (stock[name].qty || 0) + delta);
  saveGlassShopStockObj(stock);
  renderGlassShopStockUI(gc_last_needed_sheets);
}

function deleteGlassStockEntry(name) {
  if (!confirm("Remove '" + name + "' from Glass Stock?")) return;
  var stock = loadGlassShopStock();
  delete stock[name];
  saveGlassShopStockObj(stock);
  renderGlassShopStockUI(gc_last_needed_sheets);
}

function confirmGlassCutAndDeductStock() {
  var keys = Object.keys(gc_last_needed_sheets || {});
  if (!keys.length && (!gc_items_list || !gc_items_list.length)) {
    alert("Please add glass cutting sizes first before confirming cut!");
    return;
  }
  var stock = loadGlassShopStock();
  var deductedSummary = [];
  keys.forEach(function(gName) {
    var need = gc_last_needed_sheets[gName] || 0;
    if (need <= 0) return;
    var matchKey = Object.keys(stock).find(function(k) {
      return k.toLowerCase() === gName.toLowerCase() || k.toLowerCase().includes(gName.toLowerCase()) || gName.toLowerCase().includes(k.toLowerCase());
    });
    if (matchKey) {
      var prev = stock[matchKey].qty || 0;
      stock[matchKey].qty = Math.max(0, prev - need);
      deductedSummary.push(matchKey + ": -" + need + " Sheet(s) (Left: " + stock[matchKey].qty + ")");
    }
  });
  saveGlassShopStockObj(stock);

  // Also auto-save usable offcuts (>= 12" x 12") if any
  var savedOff = 0;
  if (gc_last_plan_offcuts && gc_last_plan_offcuts.length) {
    savedOff = saveUsableGlassOffcuts(true);
  }
  renderGlassShopStockUI(gc_last_needed_sheets);
  if (typeof syncToGoogleSheet === 'function') syncToGoogleSheet('GlassStock', [new Date().toLocaleDateString('en-GB'), 'CUT_DEDUCT', deductedSummary.join('; '), 0, 0, 0]);
  if (typeof syncAllDataToCloud === 'function') syncAllDataToCloud(currentCloudUser ? currentCloudUser.uid : null);
  alert(
    "✂️ Cut Confirmed!\n" +
    (deductedSummary.length ? ("Auto-Deducted from Stock:\n• " + deductedSummary.join("\n• ")) : "No matching full-sheet stock entry found (add Glass Name in Stock Management to auto-deduct).") +
    (savedOff > 0 ? ("\n\n✅ Also saved " + savedOff + " usable offcut(s) (≥12\") with Number Tags!") : "")
  );
}

function renderGlassShopStockUI(neededSheetsByType) {
  var box = document.getElementById('gc_shop_stock_list');
  if (!box) return;
  var stock = loadGlassShopStock();
  var keys = Object.keys(stock);
  if (!keys.length) {
    box.innerHTML = 'No glass stock added yet. Enter Glass Name (e.g. <b>5mm Ghosa Kach</b>), Rate &amp; +Sheets above!';
    return;
  }
  var grandVal = 0;
  var html = '';
  keys.forEach(function(k) {
    var rec = stock[k];
    var have = rec.qty || 0;
    var rate = rec.rate || 0;
    var sq = have * (rec.sheetSqFt || 32);
    var val = Math.round(sq * rate);
    grandVal += val;

    // Match needed sheets case-insensitively
    var need = 0;
    if (neededSheetsByType) {
      Object.keys(neededSheetsByType).forEach(function(nk) {
        if (nk.toLowerCase() === k.toLowerCase() || k.toLowerCase().includes(nk.toLowerCase()) || nk.toLowerCase().includes(k.toLowerCase())) {
          need += neededSheetsByType[nk];
        }
      });
    }
    var buyMore = Math.max(0, need - have);
    var statusBadge = '';
    if (need > 0) {
      statusBadge = buyMore > 0
        ? ('<div style="margin-top:3px;"><span style="background:#fee2e2; color:#b91c1c; padding:2px 6px; border-radius:4px; font-weight:800; font-size:0.66rem;">Job Needs ' + need + ' → BUY ' + buyMore + ' MORE</span></div>')
        : ('<div style="margin-top:3px;"><span style="background:#dcfce7; color:#166534; padding:2px 6px; border-radius:4px; font-weight:800; font-size:0.66rem;">Job Needs ' + need + ' → IN STOCK (Left: ' + (have - need) + ')</span></div>');
    }
    var safeK = k.replace(/'/g, "\\'");
    html += '<div style="display:flex; justify-content:space-between; align-items:center; background:#fff; border:1px solid #bae6fd; border-radius:7px; padding:6px 8px; margin-bottom:5px; gap:6px;">';
    html += '<div><b style="color:#0f172a;">' + escapeHtml(k) + '</b> <span style="color:#0369a1; font-weight:800;">(' + have + ' Sh • ' + sq.toFixed(0) + ' Sq.Ft)</span><div style="font-size:0.66rem; color:#64748b;">Rate: ₹' + rate + '/Sq.Ft  •  Value: <b>₹' + val.toLocaleString('en-IN') + '</b></div>' + statusBadge + '</div>';
    html += '<div style="display:flex; gap:3px; align-items:center;">' +
      '<button type="button" onclick="adjustGlassStockQty(\'' + safeK + '\', -1)" style="background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1; border-radius:4px; width:24px; height:24px; font-weight:900; cursor:pointer;">-</button>' +
      '<button type="button" onclick="adjustGlassStockQty(\'' + safeK + '\', 1)" style="background:#e0f2fe; color:#0369a1; border:1px solid #7dd3fc; border-radius:4px; width:24px; height:24px; font-weight:900; cursor:pointer;">+</button>' +
      '<button type="button" onclick="deleteGlassStockEntry(\'' + safeK + '\')" style="background:#fee2e2; color:#dc2626; border:none; border-radius:4px; width:24px; height:24px; font-weight:800; cursor:pointer;">✕</button>' +
      '</div></div>';
  });
  html += '<div style="text-align:right; font-size:0.72rem; font-weight:900; color:#0369a1; padding-top:2px;">Total Stock Value: ₹' + grandVal.toLocaleString('en-IN') + '</div>';
  box.innerHTML = html;
}

function exportGlassStockBillPdf() {
  if (!isAppActivated()) { alert("PRO activation is required."); openScreen('activation', 'PRO UPGRADE & PLANS'); return; }
  var stock = loadGlassShopStock();
  var keys = Object.keys(stock);
  var rems = loadGlassRemnants().filter(function(r) { return r.qty > 0 && r.h_in >= 12 && r.w_in >= 12; });
  if (!keys.length && !rems.length) { alert("No glass stock or offcuts saved yet!"); return; }
  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) return;

  var doc = new jsPDF('p', 'mm', 'a4');
  var today = new Date().toLocaleDateString('en-GB');
  drawDocHeaderWithLogo(doc, "GLASS STOCK & PURCHASE INVENTORY BILL", "Date: " + today + " • Full Sheets + Usable Offcuts (No QR)", [3, 105, 161]);

  var y = 35;
  if (keys.length) {
    var rows = [];
    var grandAmt = 0;
    keys.forEach(function(k, idx) {
      var rec = stock[k];
      var sq = (rec.qty || 0) * (rec.sheetSqFt || 32);
      var amt = Math.round(sq * (rec.rate || 0));
      grandAmt += amt;
      rows.push([idx + 1, k, (rec.qty || 0) + " Sheets", sq.toFixed(1) + " Sq.Ft", "Rs." + (rec.rate || 0), "Rs." + amt.toLocaleString('en-IN')]);
    });
    rows.push(["", "GRAND TOTAL STOCK VALUE", "", "", "", "Rs." + grandAmt.toLocaleString('en-IN')]);

    doc.autoTable({
      startY: y,
      head: [["#", "Glass Name (Local / Type)", "In Stock", "Total Sq.Ft", "Rate/Sq.Ft", "Stock Value"]],
      body: rows,
      theme: 'grid',
      margin: { left: 14, right: 14 },
      headStyles: { fillColor: [3, 105, 161], textColor: 255, fontSize: 8, fontStyle: 'bold' },
      bodyStyles: { fontSize: 8 }
    });
    y = doc.lastAutoTable.finalY + 8;
  }

  if (rems.length) {
    doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(6, 95, 70);
    doc.text("USABLE GLASS OFFCUTS / CHHAT IN SHOP (≥12\" NUMBER TAGS):", 14, y);
    y += 3;
    doc.autoTable({
      startY: y,
      head: [["Tag #", "Glass Type", "Offcut Size (H x W)", "Qty"]],
      body: rems.map(function(r) { return [r.id, r.spec, toFractionInch(r.h_in) + " x " + toFractionInch(r.w_in), r.qty + " pc"]; }),
      theme: 'grid',
      margin: { left: 14, right: 14 },
      headStyles: { fillColor: [5, 150, 105], textColor: 255, fontSize: 8, fontStyle: 'bold' },
      bodyStyles: { fontSize: 8 }
    });
  }

  doc.save("Glass_Stock_Bill_" + Date.now() + ".pdf");
}

// --- GLASS OFFCUT / CHHAT STOCK (#G101 OR USER CUSTOM NUMBER — NO QR!) ---
function loadGlassRemnants() {
  try {
    var raw = localStorage.getItem(SW_GLASS_REMNANT_KEY);
    var arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch (e) { return []; }
}

function saveGlassRemnants(arr) {
  try { localStorage.setItem(SW_GLASS_REMNANT_KEY, JSON.stringify(arr || [])); } catch (e) {}
  renderGlassRemnantStockUI();
}

function nextGlassRemId(list) {
  var maxN = 100;
  (list || []).forEach(function(r) {
    var m = String(r.id || '').match(/#G(\d+)/);
    if (m) maxN = Math.max(maxN, parseInt(m[1], 10));
  });
  return '#G' + (maxN + 1);
}

function renderGlassRemnantStockUI(matchedIds) {
  var box = document.getElementById('gc_remnant_stock_list');
  if (!box) return;
  var q = (document.getElementById('gc_remnant_search')?.value || '').trim().toLowerCase();
  var list = loadGlassRemnants().filter(function(r) {
    if (!(r.qty > 0 && r.h_in >= 12 && r.w_in >= 12)) return false;
    if (!q) return true;
    return String(r.id).toLowerCase().includes(q) || String(r.spec).toLowerCase().includes(q);
  });
  if (!list.length) {
    box.innerHTML = 'No usable glass offcuts (≥12" × 12") saved yet. Pieces below 12" are treated as Scrap.';
    return;
  }
  var h = '';
  list.forEach(function(r, idx) {
    var isHit = matchedIds && matchedIds.indexOf(r.id) !== -1;
    h += '<div style="display:flex; justify-content:space-between; align-items:center; background:' + (isHit ? '#dcfce7' : '#fff') + '; border:1px solid ' + (isHit ? '#16a34a' : '#bbf7d0') + '; border-radius:6px; padding:5px 7px; margin-bottom:4px;">';
    h += '<div><span style="background:#059669; color:#fff; padding:1px 6px; border-radius:4px; font-size:0.66rem; font-weight:800; margin-right:5px;">' + r.id + '</span><b>' + toFractionInch(r.h_in) + ' × ' + toFractionInch(r.w_in) + '</b> (' + escapeHtml(r.spec) + ') • Qty: <b>' + r.qty + '</b>' + (isHit ? ' <b style="color:#15803d;">★ USE THIS CHHAT!</b>' : '') + '</div>';
    h += '<button type="button" onclick="deleteGlassRemnant(' + idx + ')" style="background:#fee2e2; color:#b91c1c; border:none; border-radius:4px; padding:3px 6px; font-size:0.65rem; font-weight:800; cursor:pointer;">✕</button>';
    h += '</div>';
  });
  box.innerHTML = h;
}

function deleteGlassRemnant(idx) {
  var list = loadGlassRemnants();
  list.splice(idx, 1);
  saveGlassRemnants(list);
}

function saveUsableGlassOffcuts(silent) {
  if (!gc_last_plan_offcuts.length) {
    if (!silent) alert("No usable glass offcuts (≥ 12\" × 12\") found in current sheet layout! Smaller pieces are treated as Scrap.");
    return 0;
  }
  var customTagInp = document.getElementById('gc_custom_tag_inp');
  var customTag = (customTagInp ? customTagInp.value : '').trim();
  if (customTag && !customTag.startsWith('#')) customTag = '#' + customTag;

  var list = loadGlassRemnants();
  var added = 0;
  gc_last_plan_offcuts.forEach(function(o, i) {
    if (o.h_in < 12 || o.w_in < 12) return;
    var tagId = customTag ? (i === 0 ? customTag : (customTag + '-' + (i + 1))) : nextGlassRemId(list);
    var ex = !customTag && list.find(function(r) { return r.spec === o.spec && Math.abs(r.h_in - o.h_in) < 0.5 && Math.abs(r.w_in - o.w_in) < 0.5; });
    if (ex) ex.qty += (o.qty || 1);
    else list.push({ id: tagId, spec: o.spec, h_in: o.h_in, w_in: o.w_in, qty: o.qty || 1 });
    added += (o.qty || 1);
  });
  if (customTagInp) customTagInp.value = '';
  saveGlassRemnants(list);
  if (typeof syncToGoogleSheet === 'function') syncToGoogleSheet('GlassOffcuts', [new Date().toLocaleDateString('en-GB'), added + ' pcs saved', list.slice(-3).map(function(x){return x.id+':'+x.spec;}).join(', ')]);
  if (typeof syncAllDataToCloud === 'function') syncAllDataToCloud(currentCloudUser ? currentCloudUser.uid : null);
  if (!silent) alert("Saved " + added + " usable glass offcut(s) (≥12\" × 12\") with Number Tags!");
  return added;
}

function exportGlassNumberStickersPdf() {
  if (!isAppActivated()) { alert("PRO activation is required."); openScreen('activation', 'PRO UPGRADE & PLANS'); return; }
  var list = loadGlassRemnants().filter(function(r) { return r.qty > 0 && r.h_in >= 12 && r.w_in >= 12; });
  if (!list.length) { alert("No saved usable glass offcuts (≥12\" × 12\") yet!"); return; }
  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) return;

  var doc = new jsPDF('p', 'mm', 'a4');
  drawDocHeaderWithLogo(doc, "GLASS OFFCUT NUMBER TAG STICKERS (≥12\" ONLY)", "Bold Custom / Auto Number Tags — No QR Code Needed", [2, 132, 199]);
  var cols = 3, cardW = 59, cardH = 22, gapX = 3.5, gapY = 3, startX = 14, startY = 34, col = 0, row = 0;

  list.forEach(function(item) {
    var x = startX + col * (cardW + gapX), y = startY + row * (cardH + gapY);
    if (y + cardH > 286) { doc.addPage('a4', 'p'); startY = 14; row = 0; col = 0; x = startX; y = startY; }
    doc.setFillColor(255, 255, 255); doc.setDrawColor(100, 116, 139); doc.setLineWidth(0.35);
    doc.roundedRect(x, y, cardW, cardH, 1.8, 1.8, 'FD');
    doc.setFillColor(2, 132, 199);
    doc.roundedRect(x, y, 19, cardH, 1.8, 1.8, 'F');
    doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.setTextColor(255, 255, 255);
    doc.text(String(item.id), x + 9.5, y + 11, { align: "center" });
    doc.setFontSize(6.5); doc.setTextColor(224, 242, 254);
    doc.text("QTY: " + item.qty, x + 9.5, y + 17.5, { align: "center" });

    doc.setTextColor(15, 23, 42); doc.setFontSize(10);
    doc.text(toFractionInch(item.h_in) + " x " + toFractionInch(item.w_in), x + 22, y + 9.5);
    doc.setFontSize(6.8); doc.setTextColor(51, 65, 85);
    doc.text(String(item.spec || 'Glass').slice(0, 26), x + 22, y + 15.5);
    col++; if (col >= cols) { col = 0; row++; }
  });
  doc.save("Glass_Number_Tag_Stickers_" + Date.now() + ".pdf");
}

// v104: MULTI-GLASS-TYPE PER-SPEC 4x8 SHEET PACKING + EXACT OFFCUT SPEC + PER-TYPE STOCK AUTO-MINUS
(function() {
  if (typeof recalculateGlassCuttingSheets === 'function') {
    var _origRecalcGlass = recalculateGlassCuttingSheets;
    recalculateGlassCuttingSheets = function() {
      _origRecalcGlass();
      gc_last_plan_offcuts = [];
      gc_last_needed_sheets = {};
      if (!gc_items_list || !gc_items_list.length) {
        renderGlassShopStockUI({});
        renderGlassRemnantStockUI([]);
        return;
      }

      var stockDim = getSelectedGlassStockSheetDims();
      // Group items strictly by Glass Spec so each glass type packs onto its OWN 4'x8' sheets!
      var itemsBySpec = {};
      gc_items_list.forEach(function(it) {
        var sp = (it.spec || '5 mm Clear').trim() || '5 mm Clear';
        if (!itemsBySpec[sp]) itemsBySpec[sp] = [];
        itemsBySpec[sp].push(it);
      });

      var matchedRemIds = [];
      var remList = loadGlassRemnants();
      var specNames = Object.keys(itemsBySpec);
      var breakdownLines = [];

      specNames.forEach(function(spName) {
        var spItems = itemsBySpec[spName];
        var spSheets = packGlassPanelsMinWaste(spItems, stockDim.sL, stockDim.sW);
        gc_last_needed_sheets[spName] = spSheets.length;
        breakdownLines.push("• " + spName + ": " + spSheets.length + " Full Sheet(s) (" + spItems.reduce(function(s,x){return s+(x.qty||1);}, 0) + " Pcs)");

        // Match usable remnants strictly for THIS glass spec!
        spItems.forEach(function(it) {
          remList.forEach(function(r) {
            var sameSpec = !r.spec || r.spec.toLowerCase() === spName.toLowerCase() || r.spec.toLowerCase().includes(spName.toLowerCase()) || spName.toLowerCase().includes(r.spec.toLowerCase());
            if (sameSpec && r.qty > 0 && ((r.h_in >= it.h_in && r.w_in >= it.w_in) || (r.h_in >= it.w_in && r.w_in >= it.h_in))) {
              if (matchedRemIds.indexOf(r.id) === -1) matchedRemIds.push(r.id);
            }
          });
        });

        // Compute exact usable offcuts (>= 12" x 12") tagged with THIS exact glass spec!
        spSheets.forEach(function(sh) {
          var usedL = 0, usedW = 0;
          (sh.rects || []).forEach(function(rc) {
            usedL = Math.max(usedL, (rc.x || 0) + (rc.w || 0));
            usedW = Math.max(usedW, (rc.y || 0) + (rc.h || 0));
          });
          var remL = stockDim.sL - usedL;
          var remW = stockDim.sW - usedW;
          if (remL >= 12 && stockDim.sW >= 12) gc_last_plan_offcuts.push({ spec: spName, h_in: stockDim.sW, w_in: remL, qty: 1 });
          if (remW >= 12 && usedL >= 12) gc_last_plan_offcuts.push({ spec: spName, h_in: remW, w_in: usedL, qty: 1 });
        });
      });

      renderGlassShopStockUI(gc_last_needed_sheets);
      renderGlassRemnantStockUI(matchedRemIds);

      var outEl = document.getElementById('gc_out');
      if (outEl) {
        var prefix = "";
        if (specNames.length > 1) {
          prefix += "=== PER-GLASS-TYPE 4'x8' SHEET BREAKDOWN ===\n" + breakdownLines.join("\n") + "\n\n";
        }
        if (matchedRemIds.length > 0) {
          prefix += "★ MATCHING CHHAT / OFFCUT TAGS IN SHOP: " + matchedRemIds.join(", ") + " (Check green list below!)\n\n";
        }
        if (prefix) outEl.textContent = prefix + outEl.textContent;
      }
    };
  }
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('DOMContentLoaded', function() {
      syncCustomGlassDropdowns();
      renderWorkshopRemnantStockUI();
      renderGlassShopStockUI();
      renderGlassRemnantStockUI();
      renderProfitAttendanceScreen();
    });
  }
})();

// =========================================================================
// v104: 1-CLICK CUT GLASS PIECE DELIVERY STICKERS PDF (NO QR — 1 PER PIECE)
// =========================================================================
function exportCutGlassPieceStickersPdf() {
  if (!isAppActivated()) {
    alert("PRO activation is required to generate PDF documents.");
    openScreen('activation', 'PRO UPGRADE & PLANS');
    return;
  }
  if (!gc_items_list || !gc_items_list.length) {
    alert("Please add glass cutting sizes first to generate stickers!");
    return;
  }
  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) { alert("PDF library is loading, please try again."); return; }

  var autoInfo = getActiveGlassOrderCustomerInfo();
  var partyName = prompt("Customer Name / Order Code for Stickers (Auto-Filled — Edit if needed):", autoInfo) || "";
  partyName = partyName.trim();
  var shopName = toEnglishPdfSafe((document.getElementById('homeShop')?.textContent || 'SMART WORKER ALUMINIUM').trim());
  var today = new Date().toLocaleDateString('en-GB');

  // Expand every glass item by its Qty so EVERY physical glass sheet gets its own sticker!
  var allPieces = [];
  gc_items_list.forEach(function(it, idx) {
    var q = Math.max(1, parseInt(it.qty, 10) || 1);
    for (var k = 1; k <= q; k++) {
      allPieces.push({
        tag: it.rowTag || ('Glass #' + (idx + 1)),
        cutStr: it.cutStr || (toFractionInch(it.h_in) + ' x ' + toFractionInch(it.w_in)),
        hStr: toFractionInch(it.h_in),
        wStr: toFractionInch(it.w_in),
        spec: it.spec || '5 mm Clear',
        copyNo: k,
        copyTotal: q
      });
    }
  });

  var totalPcs = allPieces.length;
  var doc = new jsPDF('p', 'mm', 'a4');
  drawDocHeaderWithLogo(
    doc,
    "CUT GLASS PIECE STICKERS (" + totalPcs + " LABELS)",
    (partyName ? ("Customer: " + partyName + "  •  ") : "") + "Stick 1 Label on Each Cut Glass Piece • Date: " + today,
    [124, 58, 237]
  );

  // 3 cols x 7 rows = 21 crisp stickers per A4 page (59mm x 32mm each)
  var cols = 3, cardW = 59, cardH = 32, gapX = 3.5, gapY = 3.5;
  var startX = 14, startY = 34;
  var col = 0, row = 0;

  allPieces.forEach(function(pc, pIdx) {
    var x = startX + col * (cardW + gapX);
    var y = startY + row * (cardH + gapY);
    if (y + cardH > 286) {
      doc.addPage('a4', 'p');
      startY = 14; row = 0; col = 0;
      x = startX; y = startY;
    }

    // Outer cut border
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(100, 116, 139);
    doc.setLineWidth(0.35);
    doc.roundedRect(x, y, cardW, cardH, 2, 2, 'FD');

    // Top Header Band: Piece # + Location/Tag
    doc.setFillColor(124, 58, 237);
    doc.roundedRect(x, y, cardW, 7, 2, 2, 'F');
    doc.rect(x, y + 4.5, cardW, 2.5, 'F');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(7.5);
    doc.setTextColor(255, 255, 255);
    doc.text("#" + (pIdx + 1) + "/" + totalPcs + "  •  " + String(pc.tag).slice(0, 16), x + 2.5, y + 4.8);

    // HUGE BOLD GLASS SIZE (H x W) — readable from 5 feet away!
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text(pc.hStr + " H x " + pc.wStr + " W", x + cardW / 2, y + 14.5, { align: "center" });

    // Glass Type / Local Name Pill
    doc.setFillColor(240, 249, 255);
    doc.setDrawColor(125, 211, 252);
    doc.roundedRect(x + 2.5, y + 17, cardW - 5, 6.2, 1.2, 1.2, 'FD');
    doc.setFontSize(7.6);
    doc.setTextColor(3, 105, 161);
    doc.text(String(pc.spec).slice(0, 26), x + cardW / 2, y + 21.3, { align: "center" });

    // Footer: Customer Name / Shop Name + Piece Copy Info
    doc.setFont("helvetica", "bold");
    doc.setFontSize(6.3);
    doc.setTextColor(71, 85, 105);
    var footL = partyName ? ("To: " + partyName.slice(0, 16)) : shopName.slice(0, 18);
    doc.text(footL, x + 2.5, y + 28.8);
    doc.text("Pc " + pc.copyNo + "/" + pc.copyTotal + " • " + today, x + cardW - 2.5, y + 28.8, { align: "right" });

    col++;
    if (col >= cols) { col = 0; row++; }
  });

  doc.save("Cut_Glass_Stickers_" + totalPcs + "pcs_" + Date.now() + ".pdf");
}


// =========================================================================
// v104: AUTO-FILL CUSTOMER/ORDER + 58MM THERMAL STICKERS + VOICE + PROFIT/ATTENDANCE
// =========================================================================
function getActiveGlassOrderCustomerInfo() {
  var cName = '';
  var orderCode = '';
  try {
    // 1. Check imported 4-digit glass order status banner
    var stEl = document.getElementById('gc_qr_import_status');
    if (stEl && stEl.textContent) {
      var mCode = stEl.textContent.match(/\b(\d{4})\b/);
      if (mCode) orderCode = '#' + mCode[1];
    }
    // 2. Check active Site Khata customer
    var skCust = document.getElementById('sk_cust_name') || document.getElementById('sk_client_name');
    if (skCust && skCust.value && skCust.value.trim()) cName = skCust.value.trim();
    if (!cName) {
      var khata = JSON.parse(localStorage.getItem('sw_site_khata') || '[]');
      if (Array.isArray(khata) && khata.length && khata[0].customer) cName = String(khata[0].customer).trim();
    }
    // 3. Check Quotation / Bill customer
    if (!cName) {
      var qEl = document.getElementById('q_cust_name') || document.getElementById('bill_cust_name');
      if (qEl && qEl.value && qEl.value.trim()) cName = qEl.value.trim();
    }
  } catch (e) {}
  if (cName && orderCode) return cName + ' (' + orderCode + ')';
  return cName || orderCode || '';
}

async function printCutGlassStickersThermal58mm() {
  if (!isAppActivated()) {
    alert("PRO activation is required to print stickers.");
    openScreen('activation', 'PRO UPGRADE & PLANS');
    return;
  }
  if (!gc_items_list || !gc_items_list.length) {
    alert("Please add glass cutting sizes first!");
    return;
  }
  var autoInfo = getActiveGlassOrderCustomerInfo();
  var partyName = toEnglishPdfSafe((prompt("Customer Name / Order Code for 58mm Thermal Stickers:", autoInfo) || "").trim());
  var shopName = toEnglishPdfSafe((document.getElementById('homeShop')?.textContent || 'SMART WORKER ALUMINIUM').trim());
  var today = new Date().toLocaleDateString('en-GB');

  var allPieces = [];
  gc_items_list.forEach(function(it, idx) {
    var q = Math.max(1, parseInt(it.qty, 10) || 1);
    for (var k = 1; k <= q; k++) {
      allPieces.push({
        tag: it.rowTag || ('Glass #' + (idx + 1)),
        hStr: toFractionInch(it.h_in),
        wStr: toFractionInch(it.w_in),
        spec: it.spec || '5 mm Clear',
        copyNo: k,
        copyTotal: q
      });
    }
  });

  // Try direct Bluetooth ESC/POS 58mm Thermal Printer if connected (or available)
  if (typeof btThermalChar !== 'undefined' && btThermalChar) {
    try {
      var enc = new TextEncoder();
      var esc = "";
      allPieces.forEach(function(pc, idx) {
        esc += "\x1B\x40\x1B\x61\x01"; // Init + Center
        esc += "================================\n";
        esc += "\x1B\x45\x01#" + (idx + 1) + "/" + allPieces.length + " | " + pc.tag + "\x1B\x45\x00\n";
        esc += "\x1D\x21\x11" + pc.hStr + " x " + pc.wStr + "\x1D\x21\x00\n";
        esc += pc.spec + "\n";
        if (partyName) esc += "To: " + partyName + "\n";
        esc += shopName.slice(0, 28) + " | " + today + "\n";
        esc += "--------------------------------\n\n\n";
      });
      var bytes = enc.encode(esc);
      for (var off = 0; off < bytes.length; off += 180) {
        await btThermalChar.writeValue(bytes.slice(off, off + 180));
      }
      alert("✅ Sent " + allPieces.length + " Cut Glass Sticker(s) directly to 58mm Bluetooth Printer!");
      return;
    } catch (btErr) {
      console.warn("BT Thermal write fallback:", btErr);
    }
  }

  // Universal 58mm Thermal Roll Print Preview (works with any Bluetooth/USB 58mm printer app on Android!)
  var html = '<!DOCTYPE html><html><head><meta charset="utf-8"><title>58mm Cut Glass Stickers</title>' +
    '<style>@page{size:58mm auto;margin:0;}body{width:54mm;margin:0 auto;font-family:Arial,sans-serif;color:#000;}' +
    '.st{border:1.5px dashed #000;border-radius:4px;padding:5px;margin:4px 0;text-align:center;page-break-inside:avoid;}' +
    '.hdr{font-size:10px;font-weight:800;border-bottom:1px solid #000;padding-bottom:2px;margin-bottom:3px;}' +
    '.sz{font-size:16px;font-weight:900;margin:3px 0;}' +
    '.sp{font-size:11px;font-weight:700;background:#eee;padding:2px;border-radius:3px;}' +
    '.ft{font-size:9px;margin-top:3px;}</style></head><body>';
  allPieces.forEach(function(pc, idx) {
    html += '<div class="st">' +
      '<div class="hdr">#' + (idx + 1) + '/' + allPieces.length + ' • ' + pc.tag + ' (Pc ' + pc.copyNo + '/' + pc.copyTotal + ')</div>' +
      '<div class="sz">' + pc.hStr + ' H × ' + pc.wStr + ' W</div>' +
      '<div class="sp">' + pc.spec + '</div>' +
      '<div class="ft">' + (partyName ? ('<b>' + partyName + '</b><br>') : '') + shopName + ' • ' + today + '</div>' +
      '</div>';
  });
  html += '<script>window.onload=function(){window.print();};</script></body></html>';
  var w = window.open('', '_blank', 'width=320,height=600');
  if (w) { w.document.write(html); w.document.close(); }
  else alert("Pop-up blocked! Please allow pop-ups to open 58mm Thermal Print view.");
}

// --- VOICE MEASUREMENT INPUT (SITE KHATA & GLASS CUTTING) ---
function startVoiceMeasurement(hInputId, wInputId) {
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) {
    alert("Voice input works in Chrome on Android. Please type measurements using the keypad.");
    return;
  }
  try {
    var rec = new SR();
    rec.lang = (currentAppLang === 'bn') ? 'bn-IN' : ((currentAppLang === 'hi') ? 'hi-IN' : 'en-IN');
    rec.interimResults = false;
    rec.maxAlternatives = 1;
    rec.onresult = function(ev) {
      var spoken = (ev.results && ev.results[0] && ev.results[0][0]) ? ev.results[0][0].transcript : '';
      var nums = spoken.match(/\d+(?:\.\d+)?/g);
      if (nums && nums.length >= 2) {
        var hEl = document.getElementById(hInputId);
        var wEl = document.getElementById(wInputId);
        if (hEl) hEl.value = nums[0];
        if (wEl) wEl.value = nums[1];
        alert("🎤 Voice Captured: Height = " + nums[0] + " , Width = " + nums[1] + "\n(Heard: \"" + spoken + "\")");
      } else if (nums && nums.length === 1) {
        var hEl1 = document.getElementById(hInputId);
        if (hEl1) hEl1.value = nums[0];
        alert("🎤 Captured Height = " + nums[0] + " (Say two numbers like '48 by 36' to fill both!)");
      } else {
        alert("Could not detect numbers in: \"" + spoken + "\". Try saying '48 by 36'.");
      }
    };
    rec.onerror = function() { alert("Mic permission needed or voice not detected. Please try again."); };
    rec.start();
  } catch (e) {
    alert("Voice measurement could not start on this device.");
  }
}

// --- WORKSHOP PROFIT & WORKER ATTENDANCE (HAZIRA) TRACKER ---
var SW_PROFIT_ATT_KEY = 'sw_profit_attendance_v1';

function loadProfitAttData() {
  try {
    var raw = localStorage.getItem(SW_PROFIT_ATT_KEY);
    var d = raw ? JSON.parse(raw) : {};
    if (!Array.isArray(d.workers)) d.workers = [];
    if (!Array.isArray(d.tx)) d.tx = [];
    return d;
  } catch (e) { return { workers: [], tx: [] }; }
}

function saveProfitAttData(d) {
  try { localStorage.setItem(SW_PROFIT_ATT_KEY, JSON.stringify(d)); } catch (e) {}
  if (typeof syncAllDataToCloud === 'function') syncAllDataToCloud(currentCloudUser ? currentCloudUser.uid : null);
  renderProfitAttendanceScreen();
}

function paAddWorker() {
  var name = (document.getElementById('pa_worker_name')?.value || '').trim();
  var wage = parseFloat(document.getElementById('pa_worker_wage')?.value) || 0;
  if (!name || wage <= 0) { alert("Enter Worker Name and Daily Wage (₹)."); return; }
  var d = loadProfitAttData();
  d.workers.push({ id: 'W' + Date.now(), name: name, wage: wage, logs: {} });
  if (document.getElementById('pa_worker_name')) document.getElementById('pa_worker_name').value = '';
  saveProfitAttData(d);
}

function paMarkAttendance(wIdx, status) {
  var d = loadProfitAttData();
  if (!d.workers[wIdx]) return;
  var todayKey = new Date().toISOString().slice(0, 10);
  if (!d.workers[wIdx].logs) d.workers[wIdx].logs = {};
  d.workers[wIdx].logs[todayKey] = status; // 'P' = 1, 'H' = 0.5, 'A' = 0
  if (typeof syncToGoogleSheet === 'function') syncToGoogleSheet('Attendance', [todayKey, d.workers[wIdx].name, status, d.workers[wIdx].wage]);
  saveProfitAttData(d);
}

function paDeleteWorker(wIdx) {
  if (!confirm("Remove this worker?")) return;
  var d = loadProfitAttData();
  d.workers.splice(wIdx, 1);
  saveProfitAttData(d);
}

function paAddTransaction() {
  var type = document.getElementById('pa_tx_type')?.value || 'INCOME';
  var note = (document.getElementById('pa_tx_note')?.value || '').trim() || (type === 'INCOME' ? 'Project Payment' : 'Material Expense');
  var amt = parseFloat(document.getElementById('pa_tx_amt')?.value) || 0;
  if (amt <= 0) { alert("Enter valid amount (₹)."); return; }
  var d = loadProfitAttData();
  var dateStr = new Date().toLocaleDateString('en-GB');
  d.tx.unshift({ date: dateStr, type: type, note: note, amt: amt });
  if (document.getElementById('pa_tx_note')) document.getElementById('pa_tx_note').value = '';
  if (document.getElementById('pa_tx_amt')) document.getElementById('pa_tx_amt').value = '';
  if (typeof syncToGoogleSheet === 'function') syncToGoogleSheet('WorkshopProfit', [dateStr, type, note, amt]);
  saveProfitAttData(d);
}

function paDeleteTx(idx) {
  var d = loadProfitAttData();
  d.tx.splice(idx, 1);
  saveProfitAttData(d);
}

function renderProfitAttendanceScreen() {
  var wBox = document.getElementById('pa_workers_list');
  var tBox = document.getElementById('pa_tx_list');
  if (!wBox && !tBox) return;
  var d = loadProfitAttData();
  var todayKey = new Date().toISOString().slice(0, 10);

  var totalWages = 0;
  if (wBox) {
    if (!d.workers.length) {
      wBox.innerHTML = 'No workers added yet. Add your mistri/helper above to track daily Hazira!';
    } else {
      wBox.innerHTML = d.workers.map(function(w, idx) {
        var logs = w.logs || {};
        var daysWorked = 0;
        Object.keys(logs).forEach(function(k) {
          if (logs[k] === 'P') daysWorked += 1;
          else if (logs[k] === 'H') daysWorked += 0.5;
        });
        var payable = Math.round(daysWorked * (w.wage || 0));
        totalWages += payable;
        var stToday = logs[todayKey] || '';
        return '<div style="background:#fff; border:1px solid #e2e8f0; border-radius:7px; padding:6px 8px; margin-bottom:5px;">' +
          '<div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">' +
            '<span><b>' + escapeHtml(w.name) + '</b> (₹' + w.wage + '/day) • <b>' + daysWorked + 'd = ₹' + payable.toLocaleString('en-IN') + '</b></span>' +
            '<button type="button" onclick="paDeleteWorker(' + idx + ')" style="background:#fee2e2; color:#dc2626; border:none; border-radius:4px; padding:2px 6px; font-size:0.65rem; font-weight:800; cursor:pointer;">✕</button>' +
          '</div>' +
          '<div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:4px;">' +
            '<button type="button" onclick="paMarkAttendance(' + idx + ',\'P\')" style="background:' + (stToday==='P'?'#16a34a':'#f1f5f9') + '; color:' + (stToday==='P'?'#fff':'#0f172a') + '; border:1px solid #cbd5e1; border-radius:5px; padding:4px; font-size:0.67rem; font-weight:800; cursor:pointer;">Present ✓</button>' +
            '<button type="button" onclick="paMarkAttendance(' + idx + ',\'H\')" style="background:' + (stToday==='H'?'#f59e0b':'#f1f5f9') + '; color:' + (stToday==='H'?'#fff':'#0f172a') + '; border:1px solid #cbd5e1; border-radius:5px; padding:4px; font-size:0.67rem; font-weight:800; cursor:pointer;">Half Day</button>' +
            '<button type="button" onclick="paMarkAttendance(' + idx + ',\'A\')" style="background:' + (stToday==='A'?'#dc2626':'#f1f5f9') + '; color:' + (stToday==='A'?'#fff':'#0f172a') + '; border:1px solid #cbd5e1; border-radius:5px; padding:4px; font-size:0.67rem; font-weight:800; cursor:pointer;">Absent ✕</button>' +
          '</div></div>';
      }).join('');
    }
  }

  var totInc = 0, totExp = 0;
  d.tx.forEach(function(t) {
    if (t.type === 'INCOME') totInc += (t.amt || 0);
    else totExp += (t.amt || 0);
  });
  var totalOut = totExp + totalWages;
  var netProfit = totInc - totalOut;

  if (document.getElementById('pa_tot_inc')) document.getElementById('pa_tot_inc').textContent = '₹' + Math.round(totInc).toLocaleString('en-IN');
  if (document.getElementById('pa_tot_exp')) document.getElementById('pa_tot_exp').textContent = '₹' + Math.round(totalOut).toLocaleString('en-IN');
  var netEl = document.getElementById('pa_net_profit');
  if (netEl) {
    netEl.textContent = (netProfit < 0 ? '-₹' : '₹') + Math.round(Math.abs(netProfit)).toLocaleString('en-IN');
    netEl.style.color = netProfit < 0 ? '#dc2626' : '#065f46';
  }

  if (tBox) {
    if (!d.tx.length) {
      tBox.innerHTML = 'No income/expense entries yet.';
    } else {
      tBox.innerHTML = d.tx.slice(0, 30).map(function(t, idx) {
        var isInc = (t.type === 'INCOME');
        return '<div style="display:flex; justify-content:space-between; align-items:center; background:#fff; border:1px solid ' + (isInc?'#bbf7d0':'#fecaca') + '; border-radius:6px; padding:5px 7px; margin-bottom:4px;">' +
          '<span><b style="color:' + (isInc?'#15803d':'#b91c1c') + ';">' + (isInc?'+₹':'-₹') + Math.round(t.amt).toLocaleString('en-IN') + '</b> • ' + escapeHtml(t.note) + ' <span style="color:#94a3b8; font-size:0.64rem;">(' + t.date + ')</span></span>' +
          '<button type="button" onclick="paDeleteTx(' + idx + ')" style="background:#fee2e2; color:#dc2626; border:none; border-radius:4px; padding:2px 6px; font-size:0.64rem; font-weight:800; cursor:pointer;">✕</button>' +
          '</div>';
      }).join('');
    }
  }
}


// =========================================================================
// v104: GLOBAL ENGLISH DIGITS + SELECT 3-LANG + toEnglishPdfSafe + QUICK ROOM CHIPS
// =========================================================================

// --- TASK 4: GLOBAL ENGLISH DIGITS LOCK (0-9 EVERYWHERE) ---
function normalizeDigitsToEnglish(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/[০-৯]/g, function(ch) { return String(ch.charCodeAt(0) - 0x09E6); })
    .replace(/[०-९]/g, function(ch) { return String(ch.charCodeAt(0) - 0x0966); });
}

if (typeof document !== 'undefined' && document.addEventListener) {
  document.addEventListener('input', function(ev) {
    var t = ev && ev.target;
    if (!t || (t.tagName !== 'INPUT' && t.tagName !== 'TEXTAREA')) return;
    if (typeof t.value === 'string' && /[০-৯०-९]/.test(t.value)) {
      var pos = t.selectionStart;
      t.value = normalizeDigitsToEnglish(t.value);
      try { if (pos !== null && t.setSelectionRange) t.setSelectionRange(pos, pos); } catch (e) {}
    }
    if (t.dataset && t.dataset.pdfPreviewId) updatePdfLivePreview(t);
  }, true);
}

// --- TASK 2: OFFLINE BENGALI & HINDI -> ENGLISH TRANSLITERATOR FOR PDF & THERMAL ---
var SW_PDF_WORD_DICT = {
  // Bengali common rooms, places & surnames
  'রান্নাঘর': 'Kitchen', 'কিচেন': 'Kitchen', 'বেডরুম': 'Bedroom', 'মাস্টার': 'Master',
  'বাথরুম': 'Bathroom', 'টয়লেট': 'Toilet', 'বারান্দা': 'Balcony', 'হল': 'Hall',
  'ডাইনিং': 'Dining', 'বসার': 'Drawing', 'ঘর': 'Room', 'সিঁড়ি': 'Staircase',
  'সিড়ি': 'Staircase', 'অফিস': 'Office', 'দোকান': 'Shop', 'ঠাকুরঘর': 'Puja Room',
  'পুজো': 'Puja', 'ফ্লোর': 'Floor', 'তলা': 'Floor', 'জানালা': 'Window', 'দরজা': 'Door',
  'পার্টিশন': 'Partition', 'গ্লাস': 'Glass', 'কাঁচ': 'Glass', 'ঘষা': 'Frosted',
  'হাওড়া': 'Howrah', 'হাওড়া': 'Howrah', 'কলকাতা': 'Kolkata', 'আমতা': 'Amta',
  'বাগনান': 'Bagnan', 'উলুবেড়িয়া': 'Uluberia', 'মেদিনীপুর': 'Midnapore', 'হুগলি': 'Hooghly',
  'সাহেব': 'Saheb', 'ঘাঁটি': 'Ghanti', 'অমিত': 'Amit', 'অমিতাভ': 'Amitava',
  'কুমার': 'Kumar', 'দাস': 'Das', 'মণ্ডল': 'Mandal', 'বিশ্বাস': 'Biswas',
  'ঘোষ': 'Ghosh', 'রায়': 'Roy', 'রায়': 'Roy', 'পাল': 'Pal', 'সেন': 'Sen',
  'বসু': 'Basu', 'মিত্র': 'Mitra', 'মুখার্জী': 'Mukherjee', 'ব্যানার্জী': 'Banerjee',
  'চ্যাটার্জী': 'Chatterjee', 'শর্মা': 'Sharma', 'বর্মা': 'Verma', 'সিং': 'Singh',
  'শেখ': 'Sheikh', 'মল্লিক': 'Mallick', 'রহমান': 'Rahman', 'আলী': 'Ali', 'বাবু': 'Babu',
  // Hindi common rooms, places & surnames
  'किचन': 'Kitchen', 'रसोई': 'Kitchen', 'बेडरूम': 'Bedroom', 'मास्टर': 'Master',
  'बाथरूम': 'Bathroom', 'टॉयलेट': 'Toilet', 'बालकनी': 'Balcony', 'हॉल': 'Hall',
  'डाइनिंग': 'Dining', 'ड्राइंग': 'Drawing', 'रूम': 'Room', 'सीढ़ी': 'Staircase',
  'ऑफिस': 'Office', 'दुकान': 'Shop', 'पूजा': 'Puja', 'फ्लोर': 'Floor',
  'खिड़की': 'Window', 'दरवाज़ा': 'Door', 'दरवाजा': 'Door', 'पार्टीशन': 'Partition',
  'ग्लास': 'Glass', 'कांच': 'Glass', 'हावड़ा': 'Howrah', 'कोलकाता': 'Kolkata',
  'दिल्ली': 'Delhi', 'मुंबई': 'Mumbai', 'पटना': 'Patna', 'रांची': 'Ranchi',
  'अमित': 'Amit', 'कुमार': 'Kumar', 'दास': 'Das', 'शर्मा': 'Sharma', 'वर्मा': 'Verma',
  'सिंह': 'Singh', 'पटेल': 'Patel', 'यादव': 'Yadav', 'गुप्ता': 'Gupta', 'राजेश': 'Rajesh',
  'रमेश': 'Ramesh', 'सुरेश': 'Suresh', 'राजू': 'Raju', 'साहब': 'Saheb'
};

var BN_VOW = { 'অ':'a','আ':'a','ই':'i','ঈ':'i','উ':'u','ঊ':'u','ঋ':'ri','এ':'e','ঐ':'oi','ও':'o','ঔ':'ou' };
var BN_MATRA = { 'া':'a','ি':'i','ী':'i','ু':'u','ূ':'u','ৃ':'ri','ে':'e','ৈ':'oi','ো':'o','ৌ':'ou','ং':'ng','ঃ':'h','ঁ':'n','্':'' };
var BN_CONS = {
  'ক':'k','খ':'kh','গ':'g','ঘ':'gh','ঙ':'ng','চ':'ch','ছ':'chh','জ':'j','ঝ':'jh','ঞ':'n',
  'ট':'t','ঠ':'th','ড':'d','ঢ':'dh','ণ':'n','ত':'t','থ':'th','দ':'d','ধ':'dh','ন':'n',
  'প':'p','ফ':'ph','ব':'b','ভ':'bh','ম':'m','য':'j','র':'r','ল':'l','শ':'sh','ষ':'sh',
  'স':'s','হ':'h','ড়':'r','ঢ়':'rh','য়':'y','ৎ':'t','ড়':'r','ঢ়':'rh','য়':'y'
};

var HI_VOW = { 'अ':'a','आ':'a','इ':'i','ई':'i','उ':'u','ऊ':'u','ऋ':'ri','ए':'e','ऐ':'ai','ओ':'o','औ':'au' };
var HI_MATRA = { 'ा':'a','ि':'i','ी':'i','ु':'u','ू':'u','ृ':'ri','े':'e','ै':'ai','ो':'o','ौ':'au','ं':'n','ः':'h','ँ':'n','्':'' };
var HI_CONS = {
  'क':'k','ख':'kh','ग':'g','घ':'gh','ङ':'ng','च':'ch','छ':'chh','ज':'j','झ':'jh','ञ':'n',
  'ट':'t','ठ':'th','ड':'d','ढ':'dh','ण':'n','त':'t','थ':'th','द':'d','ध':'dh','न':'n',
  'प':'p','फ':'ph','ब':'b','भ':'bh','म':'m','य':'y','र':'r','ल':'l','व':'v','श':'sh',
  'ष':'sh','स':'s','ह':'h','ड़':'r','ढ़':'rh','क़':'q','ख़':'kh','ग़':'g','ज़':'z','फ़':'f'
};

function transliterateIndicWord(word) {
  if (!word) return '';
  if (SW_PDF_WORD_DICT[word]) return SW_PDF_WORD_DICT[word];
  var isBn = /[\u0980-\u09FF]/.test(word);
  var isHi = /[\u0900-\u097F]/.test(word);
  if (!isBn && !isHi) return word;

  var V = isBn ? BN_VOW : HI_VOW;
  var M = isBn ? BN_MATRA : HI_MATRA;
  var C = isBn ? BN_CONS : HI_CONS;
  var halant = isBn ? '্' : '्';
  var out = '';

  for (var i = 0; i < word.length; i++) {
    var ch = word[i];
    var next = word[i + 1] || '';
    if (V[ch] !== undefined) {
      out += V[ch];
    } else if (C[ch] !== undefined) {
      out += C[ch];
      if (next === halant) {
        i++; // skip halant (conjunct)
      } else if (M[next] !== undefined) {
        out += M[next];
        i++;
      } else if (next && (C[next] !== undefined || V[next] !== undefined) && i < word.length - 1) {
        out += 'a'; // inherent schwa between consonants (dropped at word end)
      }
    } else if (M[ch] !== undefined) {
      out += M[ch];
    } else if (/[\x20-\x7E]/.test(ch)) {
      out += ch;
    }
  }
  if (!out) return '';
  return out.charAt(0).toUpperCase() + out.slice(1);
}

function toEnglishPdfSafe(text) {
  if (text === null || text === undefined) return '';
  var s = normalizeDigitsToEnglish(String(text));
  // Replace common symbols for jsPDF Helvetica compatibility
  s = s.replace(/₹/g, 'Rs.').replace(/×/g, 'x').replace(/—/g, '-').replace(/–/g, '-').replace(/•/g, '|').replace(/→/g, '->').replace(/≥/g, '>=').replace(/≤/g, '<=');
  if (/[\u0900-\u09FF]/.test(s)) {
    s = s.replace(/[\u0900-\u09FF]+/g, function(tok) { return transliterateIndicWord(tok); });
  }
  // Strip any leftover non-ASCII glyphs so jsPDF NEVER renders garbled boxes
  s = s.replace(/[^\x20-\x7E\n\r\t]/g, '');
  return s.replace(/[ \t]{2,}/g, ' ').trim();
}

// Global jsPDF safety patch: guarantees ALL PDFs stay 100% clean English even if user typed Bengali/Hindi!
function patchJsPdfSafeText() {
  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF || !jsPDF.API || jsPDF.API._swPdfSafePatched) return;
  jsPDF.API._swPdfSafePatched = true;
  var origText = jsPDF.API.text;
  jsPDF.API.text = function(txt, x, y, opts, transform) {
    if (typeof txt === 'string') txt = toEnglishPdfSafe(txt);
    else if (Array.isArray(txt)) txt = txt.map(function(line) { return typeof line === 'string' ? toEnglishPdfSafe(line) : line; });
    return origText.call(this, txt, x, y, opts, transform);
  };
  if (jsPDF.API.autoTable) {
    var origAT = jsPDF.API.autoTable;
    jsPDF.API.autoTable = function(opts) {
      if (opts && Array.isArray(opts.head)) {
        opts.head = opts.head.map(function(row) { return Array.isArray(row) ? row.map(function(c) { return typeof c === 'string' ? toEnglishPdfSafe(c) : c; }) : row; });
      }
      if (opts && Array.isArray(opts.body)) {
        opts.body = opts.body.map(function(row) { return Array.isArray(row) ? row.map(function(c) { return typeof c === 'string' ? toEnglishPdfSafe(c) : c; }) : row; });
      }
      return origAT.call(this, opts);
    };
  }
}

// Live "PDF Print: ..." preview under Customer Name & Room/Location inputs when Bengali/Hindi is typed
function updatePdfLivePreview(inp) {
  if (!inp || !inp.dataset || !inp.dataset.pdfPreviewId) return;
  var el = document.getElementById(inp.dataset.pdfPreviewId);
  if (!el) return;
  var v = (inp.value || '').trim();
  if (/[\u0900-\u09FF]/.test(v)) {
    el.style.display = 'block';
    el.textContent = 'PDF Print: ' + toEnglishPdfSafe(v);
  } else {
    el.style.display = 'none';
  }
}

function attachPdfLivePreviews() {
  var ids = ['q_name','sk_client_name','sk_site_loc','new_cust_name','new_cust_site','ot_client','set_name','dm_loc','sl_loc','cc_loc','dr_loc','q_loc','sk_room','gc_tag'];
  ids.forEach(function(id) {
    var inp = document.getElementById(id);
    if (!inp || !inp.parentElement || inp.dataset.pdfPreviewId) return;
    var pid = 'pdf_prev_' + id;
    inp.dataset.pdfPreviewId = pid;
    var div = document.createElement('div');
    div.id = pid;
    div.style.cssText = 'display:none; font-size:0.65rem; font-weight:800; color:#0369a1; background:#e0f2fe; border-radius:4px; padding:2px 6px; margin-top:3px;';
    inp.parentElement.appendChild(div);
  });
}

// --- TASK 1: ALL <select> <option> 3-LANGUAGE TRANSLATION (VALUE ALWAYS ENGLISH, DIGITS ALWAYS 0-9!) ---
var SW_OPT_EXACT_MAP = {
  // Units & Tracks
  'Inch': { bn: 'ইঞ্চি (Inch)', hi: 'इंच (Inch)' },
  'Millimeter': { bn: 'মিলিমিটার (mm)', hi: 'मिलीमीटर (mm)' },
  '2-Track': { bn: '2-ট্র্যাক', hi: '2-ट्रैक' },
  '3-Track': { bn: '3-ট্র্যাক', hi: '3-ट्रैक' },
  '4-Track': { bn: '4-ট্র্যাক', hi: '4-ट्रैक' },
  '2-Track Sliding': { bn: '2-ট্র্যাক স্লাইডিং', hi: '2-ट्रैक स्लाइडिंग' },
  '3-Track (2G + 1 Jali)': { bn: '3-ট্র্যাক (2 গ্লাস + 1 জালি)', hi: '3-ट्रैक (2 ग्लास + 1 जाली)' },
  '4-Track Sliding': { bn: '4-ট্র্যাক স্লাইডিং', hi: '4-ट्रैक स्लाइडिंग' },
  'Center Open': { bn: 'সেন্টার ওপেন', hi: 'सेंटर ओपन' },
  'Openable (H-Section)': { bn: 'ওপেনেবল (H-সেকশন)', hi: 'ओपनेबल (H-सेक्शन)' },
  // Glass Types
  'Clear': { bn: 'ক্লিয়ার গ্লাস (Clear)', hi: 'क्लियर ग्लास (Clear)' },
  'Clear Glass': { bn: 'ক্লিয়ার গ্লাস', hi: 'क्लियर ग्लास' },
  'Extra Clear': { bn: 'এক্সট্রা ক্লিয়ার গ্লাস', hi: 'एक्स्ट्रा क्लियर ग्लास' },
  'Frosted': { bn: 'ফ্রস্টেড / ঘষা কাঁচ', hi: 'फ्रॉस्टेड / घिसा कांच' },
  'Frosted Glass': { bn: 'ফ্রস্টেড / ঘষা কাঁচ', hi: 'फ्रॉस्टेड / घिसा कांच' },
  'Toughened': { bn: 'টাফেন্ড গ্লাস (Toughened)', hi: 'टफन्ड ग्लास (Toughened)' },
  'Toughened Glass': { bn: 'টাফেন্ড গ্লাস', hi: 'टफन्ड ग्लास' },
  'Reflective': { bn: 'রিফ্লেক্টিভ গ্লাস', hi: 'रिफ्लेक्टिव ग्लास' },
  'Reflective Glass': { bn: 'রিফ্লেক্টিভ গ্লাস', hi: 'रिफ्लेक्टिव ग्लास' },
  'Tinted / Brown': { bn: 'টিন্টেড / ব্রাউন গ্লাস', hi: 'टिंटेड / ब्राउन ग्लास' },
  'Pinhead': { bn: 'পিনহেড গ্লাস (Pinhead)', hi: 'पिनहेड ग्लास (Pinhead)' },
  'Fluted': { bn: 'ফ্লুটেড গ্লাস (Fluted)', hi: 'फ्लूटेड ग्लास (Fluted)' },
  'Mirror': { bn: 'আয়না (Mirror)', hi: 'शीशा (Mirror)' },
  'Mosquito Jali / Mesh': { bn: 'মশারি জালি / নেট', hi: 'मच्छर जाली / मेश' },
  'SS 304 Jali / Mesh': { bn: 'SS 304 স্টিল জালি', hi: 'SS 304 स्टील जाली' },
  'Glass + Jali / Mesh': { bn: 'গ্লাস + জালি / নেট', hi: 'ग्लास + जाली / मेश' },
  // Aluminium Colors & Finishes
  'Silver (Natural)': { bn: 'সিলভার (ন্যাচারাল)', hi: 'सिल्वर (नेचुरल)' },
  'Anodized Silver Glossy': { bn: 'অ্যানোডাইজড সিলভার গ্লসি', hi: 'एनोडाइज्ड सिल्वर ग्लॉसी' },
  'Anodized Silver Matte': { bn: 'অ্যানোডাইজড সিলভার ম্যাট', hi: 'एनोडाइज्ड सिल्वर मैट' },
  'Anodized Golden Glossy': { bn: 'অ্যানোডাইজড গোল্ডেন গ্লসি', hi: 'एनोडाइज्ड गोल्डन ग्लॉसी' },
  'Anodized Golden Matte': { bn: 'অ্যানোডাইজড গোল্ডেন ম্যাট', hi: 'एनोडाइज्ड गोल्डन मैट' },
  'Anodized Champagne Glossy': { bn: 'অ্যানোডাইজড শ্যাম্পেইন গ্লসি', hi: 'एनोडाइज्ड शैंपेन ग्लॉसी' },
  'Anodized Champagne Matte': { bn: 'অ্যানোডাইজড শ্যাম্পেইন ম্যাট', hi: 'एनोडाइज्ड शैंपेन मैट' },
  'Anodized Brown Glossy': { bn: 'অ্যানোডাইজড ব্রাউন গ্লসি', hi: 'एनोडाइज्ड ब्राउन ग्लॉसी' },
  'Anodized Brown Matte': { bn: 'অ্যানোডাইজড ব্রাউন ম্যাট', hi: 'एनोडाइज्ड ब्राउन मैट' },
  'Anodized Black Glossy': { bn: 'অ্যানোডাইজড ব্ল্যাক গ্লসি', hi: 'एनोडाइज्ड ब्लैक ग्लॉसी' },
  'Anodized Black Matte': { bn: 'অ্যানোডাইজড ব্ল্যাক ম্যাট', hi: 'एनोडाइज्ड ब्लैक मैट' },
  'Powder Coated Black': { bn: 'পাউডার কোটেড ব্ল্যাক', hi: 'पाउडर कोटेड ब्लैक' },
  'Powder Coated White': { bn: 'পাউডার কোটেড হোয়াইট', hi: 'पाउडर कोटेड व्हाइट' },
  'Powder Coated Brown': { bn: 'পাউডার কোটেড ব্রাউন', hi: 'पाउडर कोटेड ब्राउन' },
  'Powder Coated Grey': { bn: 'পাউডার কোটেড গ্রে', hi: 'पाउडर कोटेड ग्रे' },
  'Powder Coated Ivory': { bn: 'পাউডার কোটেড আইভরি', hi: 'पाउडर कोटेड आइवरी' },
  'Powder Coated Red': { bn: 'পাউডার কোটেড লাল', hi: 'पाउडर कोटेड लाल' },
  'Powder Coated Blue': { bn: 'পাউডার কোটেড নীল', hi: 'पाउडर कोटेड नीला' },
  'Powder Coated Green': { bn: 'পাউডার কোটেড সবুজ', hi: 'पाउडर कोटेड हरा' },
  'Wooden Finish Teak': { bn: 'উডেন ফিনিশ টিক (Teak)', hi: 'वुडन फिनिश टीक (Teak)' },
  'Wooden Finish Walnut': { bn: 'উডেন ফিনিশ ওয়ালনাট', hi: 'वुडन फिनिश वॉलनट' },
  'Custom Color...': { bn: 'অন্যান্য কালার লিখুন...', hi: 'कस्टम कलर लिखें...' },
  // Door & Transaction Types
  'Standard Door': { bn: 'স্ট্যান্ডার্ড দরজা', hi: 'स्टैंडर्ड डोर' },
  'Standard Hinge Door': { bn: 'স্ট্যান্ডার্ড হিঞ্জ দরজা', hi: 'स्टैंडर्ड हिंज डोर' },
  'Floor Spring Door': { bn: 'ফ্লোর স্প্রিং দরজা', hi: 'फ्लोर स्प्रिंग डोर' },
  'Top Hung Sliding Door': { bn: 'টপ হাং স্লাইডিং দরজা', hi: 'टॉप हंग स्लाइडिंग डोर' },
  'Single Door': { bn: 'সিঙ্গেল পাল্লা দরজা', hi: 'सिंगल पल्ला डोर' },
  'Double Door': { bn: 'ডাবল পাল্লা দরজা', hi: 'डबल पल्ला डोर' },
  '+ Income': { bn: '+ আয় (Income)', hi: '+ आय (Income)' },
  '- Expense': { bn: '- খরচ (Expense)', hi: '- खर्च (Expense)' }
};

var SW_OPT_TOKENS = [
  ['Anodized', 'অ্যানোডাইজড', 'एनोडाइज्ड'],
  ['Powder Coated', 'পাউডার কোটেড', 'पाउडर कोटेड'],
  ['Wooden Finish', 'উডেন ফিনিশ', 'वुडन फिनिश'],
  ['One Way', 'ওয়ান ওয়ে', 'वन वे'],
  ['Tinted', 'টিন্টেড', 'टिंटेड'],
  ['Reflective', 'রিফ্লেক্টিভ', 'रिफ्लेक्टिव'],
  ['Toughened', 'টাফেন্ড', 'टफन्ड'],
  ['Frosted', 'ফ্রস্টেড', 'फ्रॉस्टेड'],
  ['Extra Clear', 'এক্সট্রা ক্লিয়ার', 'एक्स्ट्रा क्लियर'],
  ['Clear', 'ক্লিয়ার', 'क्लियर'],
  ['Pinhead', 'পিনহেড', 'पिनहेड'],
  ['Fluted', 'ফ্লুটেড', 'फ्लूटेड'],
  ['Mirror', 'মিরর', 'मिरर'],
  ['Glossy', 'গ্লসি', 'ग्लॉसी'],
  ['Matte', 'ম্যাট', 'मैट'],
  ['Golden', 'গোল্ডেন', 'गोल्डन'],
  ['Champagne', 'শ্যাম্পেইন', 'शैंपेन'],
  ['Silver', 'সিলভার', 'सिल्वर'],
  ['Black', 'ব্ল্যাক', 'ब्लैक'],
  ['White', 'হোয়াইট', 'व्हाइट'],
  ['Brown', 'ব্রাউন', 'ब्राउन'],
  ['Blue', 'নীল', 'नीला'],
  ['Green', 'সবুজ', 'हरा'],
  ['Grey', 'গ্রে', 'ग्रे'],
  ['Ivory', 'আইভরি', 'आइवरी'],
  ['Gold', 'গোল্ড', 'गोल्ड'],
  ['Track', 'ট্র্যাক', 'ट्रैक'],
  ['Sliding', 'স্লাইডিং', 'स्लाइडिंग'],
  ['Tube', 'টিউব', 'ट्यूब'],
  ['Sheet', 'শিট', 'शीट'],
  ['Bar', 'বার', 'बार'],
  ['Glass', 'গ্লাস', 'ग्लास'],
  ['Jali', 'জালি', 'जाली']
];

function translateSelectOptionText(orig, lang) {
  if (!orig || lang === 'en') return orig;
  var t = orig.trim();
  if (SW_OPT_EXACT_MAP[t] && SW_OPT_EXACT_MAP[t][lang]) {
    return normalizeDigitsToEnglish(SW_OPT_EXACT_MAP[t][lang]);
  }
  var res = orig;
  var colIdx = (lang === 'bn') ? 1 : 2;
  SW_OPT_TOKENS.forEach(function(pair) {
    var re = new RegExp('\\b' + pair[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'gi');
    res = res.replace(re, pair[colIdx]);
  });
  return normalizeDigitsToEnglish(res);
}

function translateAllSelectOptions(lang) {
  if (typeof document === 'undefined' || !document.querySelectorAll) return;
  if (document.activeElement && document.activeElement.tagName === 'SELECT') return;
  document.querySelectorAll('select option').forEach(function(opt) {
    if (!opt.dataset) return;
    if (!opt.dataset.origEn) opt.dataset.origEn = opt.textContent || '';
    var orig = opt.dataset.origEn;
    var nextTxt = (lang === 'en') ? orig : translateSelectOptionText(orig, lang);
    // NEVER modify opt.value! Only update visible textContent if changed
    if (opt.textContent !== nextTxt) opt.textContent = nextTxt;
  });
}

// --- TASK 3: 1-TAP QUICK ROOM CHIPS + 1 / 2 / 3 SUFFIX BUTTONS ---
var SW_QUICK_ROOMS = [
  { en: 'Bedroom', bn: 'বেডরুম', hi: 'बेडरूम' },
  { en: 'Master Bed', bn: 'মাস্টার বেড', hi: 'मास्टर बेड' },
  { en: 'Kitchen', bn: 'রান্নাঘর', hi: 'किचन' },
  { en: 'Balcony', bn: 'বারান্দা', hi: 'बालकनी' },
  { en: 'Bathroom', bn: 'বাথরুম', hi: 'बाथरूम' },
  { en: 'Toilet', bn: 'টয়লেট', hi: 'टॉयलेट' },
  { en: 'Hall / Dining', bn: 'হল / ডাইনিং', hi: 'हॉल / डाइनिंग' },
  { en: 'Drawing Room', bn: 'বসার ঘর', hi: 'ड्राइंग रूम' },
  { en: 'Staircase', bn: 'সিঁড়ি', hi: 'सीढ़ी' },
  { en: 'Office', bn: 'অফিস', hi: 'ऑफिस' },
  { en: 'Shop', bn: 'দোকান', hi: 'दुकान' },
  { en: 'Puja Room', bn: 'ঠাকুরঘর', hi: 'पूजा रूम' },
  { en: '1st Floor', bn: '1st ফ্লোর', hi: '1st फ्लोर' },
  { en: '2nd Floor', bn: '2nd ফ্লোর', hi: '2nd फ्लोर' }
];

function pickQuickRoom(inputId, roomEn) {
  var inp = document.getElementById(inputId);
  if (!inp) return;
  inp.value = roomEn;
  inp.dispatchEvent(new Event('input', { bubbles: true }));
}

function appendRoomNumber(inputId, numStr) {
  var inp = document.getElementById(inputId);
  if (!inp) return;
  var cur = (inp.value || '').trim().replace(/\s+\d+$/, '');
  inp.value = (cur ? (cur + ' ') : 'Room ') + numStr;
  inp.dispatchEvent(new Event('input', { bubbles: true }));
}

function injectQuickRoomChipsAllScreens() {
  if (typeof document === 'undefined') return;
  var roomInputIds = ['dm_loc', 'sl_loc', 'cc_loc', 'dr_loc', 'pt_loc', 'cl_loc', 'q_loc', 'sk_room', 'gc_tag'];
  var lang = (typeof currentAppLang !== 'undefined') ? currentAppLang : 'en';

  roomInputIds.forEach(function(id) {
    var inp = document.getElementById(id);
    if (!inp || !inp.parentElement) return;
    var barId = 'qroom_bar_' + id;
    var bar = document.getElementById(barId);
    if (!bar) {
      bar = document.createElement('div');
      bar.id = barId;
      bar.className = 'sw-qroom-bar';
      bar.style.cssText = 'display:flex; flex-wrap:wrap; align-items:center; gap:5px; width:100%; max-width:100%; min-width:0; box-sizing:border-box; padding:5px 0 2px 0; margin-top:4px;';
      inp.parentElement.appendChild(bar);
    }
    var numBtns = ['1','2','3'].map(function(n) {
      return '<button type="button" onclick="appendRoomNumber(\'' + id + '\',\'' + n + '\')" style="flex-shrink:0; background:#0284c7; color:#fff; border:none; border-radius:99px; width:22px; height:22px; font-size:0.68rem; font-weight:900; cursor:pointer;">' + n + '</button>';
    }).join('');
    var chips = SW_QUICK_ROOMS.map(function(r) {
      var lbl = (lang === 'bn') ? r.bn : ((lang === 'hi') ? r.hi : r.en);
      return '<button type="button" onclick="pickQuickRoom(\'' + id + '\',\'' + r.en + '\')" style="flex-shrink:0; background:#f1f5f9; color:#0f172a; border:1px solid #cbd5e1; border-radius:99px; padding:3px 8px; font-size:0.66rem; font-weight:700; cursor:pointer;">' + lbl + '</button>';
    }).join('');
    if (bar.dataset && bar.dataset.renderedLang === lang && bar.children.length > 0) return;
    bar.innerHTML = numBtns + chips;
    if (bar.dataset) bar.dataset.renderedLang = lang;
  });
}

// Hook applyLanguageTranslations so <select> options & Quick Room Chips update automatically on language change!
(function() {
  if (typeof applyLanguageTranslations === 'function') {
    var _origApplyI18n = applyLanguageTranslations;
    applyLanguageTranslations = function(lang) {
      _origApplyI18n(lang);
      var activeL = (lang === 'bn' || lang === 'hi' || lang === 'en') ? lang : (currentAppLang || 'en');
      if (typeof _swI18nApplying !== 'undefined') _swI18nApplying = true;
      try {
        translateAllSelectOptions(activeL);
        injectQuickRoomChipsAllScreens();
      } finally {
        if (typeof _swI18nApplying !== 'undefined') _swI18nApplying = false;
      }
    };
  }
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('DOMContentLoaded', function() {
      patchJsPdfSafeText();
      attachPdfLivePreviews();
      injectQuickRoomChipsAllScreens();
      translateAllSelectOptions(typeof currentAppLang !== 'undefined' ? currentAppLang : 'en');
    });
  }
})();


// =========================================================================
// v104: 4-DIGIT PRIVACY PIN LOCK & DELETE MY ACCOUNT AND ALL DATA
// =========================================================================
var SW_PRIVACY_PIN_KEY = 'sw_privacy_pin_hash_v1';
var _swPinUnlockedSession = false;

function updatePrivacyPinBtnUI() {
  var lbl = document.getElementById('privacyPinBtnLabel');
  if (!lbl) return;
  var hasPin = !!localStorage.getItem(SW_PRIVACY_PIN_KEY);
  lbl.textContent = hasPin ? 'Change / Remove PIN' : 'Set 4-Digit PIN Lock';
}

function setupPrivacyPinLock() {
  var existingHash = localStorage.getItem(SW_PRIVACY_PIN_KEY);
  if (existingHash) {
    var cur = prompt("Enter current 4-digit Privacy PIN (or leave blank to cancel):");
    if (!cur) return;
    var curH = (typeof sha256 === 'function') ? sha256(cur.trim() + '_SW_PIN_2026') : cur.trim();
    if (curH !== existingHash) { alert("Incorrect current PIN!"); return; }
    if (confirm("Tap OK to REMOVE Privacy PIN Lock, or Cancel to set a new 4-digit PIN.")) {
      localStorage.removeItem(SW_PRIVACY_PIN_KEY);
      _swPinUnlockedSession = true;
      updatePrivacyPinBtnUI();
      alert("Privacy PIN Lock removed.");
      return;
    }
  }
  var p1 = prompt("Set a new 4-digit Privacy PIN (locks Customer Khata, Bills & Profit):");
  if (!p1) return;
  p1 = normalizeDigitsToEnglish(p1).trim();
  if (!/^\d{4}$/.test(p1)) { alert("Please enter exactly 4 digits (e.g. 2580)."); return; }
  var p2 = prompt("Re-enter the same 4-digit PIN to confirm:");
  if (!p2 || normalizeDigitsToEnglish(p2).trim() !== p1) { alert("PINs did not match!"); return; }
  var h = (typeof sha256 === 'function') ? sha256(p1 + '_SW_PIN_2026') : p1;
  localStorage.setItem(SW_PRIVACY_PIN_KEY, h);
  _swPinUnlockedSession = true;
  updatePrivacyPinBtnUI();
  alert("✅ 4-Digit Privacy PIN Lock enabled for Customer Khata, Bills & Profit!");
}

async function deleteMyAccountAndAllData() {
  if (!confirm("⚠️ WARNING: Permanently delete your Workshop Account and ALL local & cloud data? This cannot be undone!")) return;
  var typed = prompt("Type DELETE to permanently erase your account and all data:");
  if (!typed || typed.trim().toUpperCase() !== 'DELETE') {
    alert("Account deletion cancelled.");
    return;
  }
  var cloudUser = localStorage.getItem('sw_cloud_user') || '';
  var vaultId = localStorage.getItem('sw_user_vault_id') || '';
  var _db = window.fbDb || (typeof fbDb !== 'undefined' ? fbDb : null);
  var _rt = window.fbRtdb || (typeof fbRtdb !== 'undefined' ? fbRtdb : null);
  try {
    if (_db && cloudUser) await _db.collection('users').doc(cloudUser).delete().catch(() => {});
    if (_db && vaultId && vaultId !== cloudUser) await _db.collection('users').doc(vaultId).delete().catch(() => {});
    if (_rt && cloudUser) await _rt.ref('users/' + cloudUser).remove().catch(() => {});
    if (_rt && vaultId) await _rt.ref('nisha_creations/smart_worker/' + vaultId).remove().catch(() => {});
  } catch (e) {}
  try {
    Object.keys(localStorage).forEach(function(k) {
      if (k.indexOf('sw_') === 0) localStorage.removeItem(k);
    });
  } catch (e) {}
  alert("Your account and all workshop data have been permanently deleted.");
  if (typeof openScreen === 'function') openScreen('auth', 'SIGN IN');
  else if (typeof location !== 'undefined' && location.reload) location.reload();
}

// Enforce 4-Digit Privacy PIN before opening Customer Khata, Quotation/Bills, or Profit & Attendance!
(function() {
  if (typeof openScreen === 'function') {
    var _origOpenScreenPin = openScreen;
    var _lockedScreens = { customer_lookup: 1, quotation: 1, profit_attendance: 1 };
    openScreen = function(screenName, title) {
      var pinHash = localStorage.getItem(SW_PRIVACY_PIN_KEY);
      if (pinHash && !_swPinUnlockedSession && _lockedScreens[screenName]) {
        var entered = prompt("🔒 Enter 4-Digit Privacy PIN to open " + (title || screenName) + ":");
        if (!entered) return;
        var eHash = (typeof sha256 === 'function') ? sha256(normalizeDigitsToEnglish(entered).trim() + '_SW_PIN_2026') : entered.trim();
        if (eHash !== pinHash) {
          alert("Incorrect Privacy PIN!");
          return;
        }
        _swPinUnlockedSession = true;
      }
      return _origOpenScreenPin(screenName, title);
    };
  }
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('DOMContentLoaded', updatePrivacyPinBtnUI);
  }
})();


// =========================================================================
// v105: 0% FEE UPI EASY RECHARGE + 9 AM - 9 PM DESK TIMING + LIVE AUTO-UNLOCK
// =========================================================================
var _swSelectedUpiPlan = { code: 'Karigar_Annual', planKey: 'KARIGAR_1Y', amount: 1199, days: 365, label: '365 Days Golden VIP' };
var _swLiveUnlockUnsub = null;

function isActivationDeskOnline() {
  var hr = new Date().getHours();
  return hr >= 9 && hr < 21;
}

function updateActivationDeskTimingUI() {
  var el = document.getElementById('actDeskTimingBadge');
  if (!el) return;
  if (isActivationDeskOnline()) {
    el.style.background = 'linear-gradient(90deg,#ecfdf5,#d1fae5)';
    el.style.borderColor = '#10b981';
    el.style.color = '#065f46';
    el.textContent = '● Activation Desk ONLINE (9:00 AM – 9:00 PM) • Instant Auto-Unlock in 5–10 mins';
  } else {
    el.style.background = 'linear-gradient(90deg,#fffbeb,#fef3c7)';
    el.style.borderColor = '#f59e0b';
    el.style.color = '#92400e';
    el.textContent = '● Activation Desk: 9:00 AM – 9:00 PM • Requests sent now auto-unlock at 9:00 AM tomorrow';
  }
}

function openEasyUpiPlan(planCode, amount, days, label) {
  var pKey = (days >= 365) ? 'KARIGAR_1Y' : ((days >= 180) ? 'KARIGAR_6M' : ((days >= 90) ? 'KARIGAR_3M' : 'KARIGAR_1M'));
  _swSelectedUpiPlan = { code: planCode, planKey: pKey, amount: amount, days: days, label: label };
  var tag = document.getElementById('easyUpiPlanTag');
  if (tag) tag.textContent = days + ' Days • ₹' + Number(amount).toLocaleString('en-IN');
  var box = document.getElementById('easyUpiPayBox');
  if (box && typeof box.scrollIntoView === 'function') {
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
  // Auto-fill name/phone from profile if saved
  try {
    var prof = JSON.parse(localStorage.getItem('sw_profile') || '{}');
    var pEl = document.getElementById('easy_upi_payer');
    var phEl = document.getElementById('easy_upi_phone');
    if (pEl && !pEl.value && prof.name) pEl.value = prof.name;
    if (phEl && !phEl.value && prof.phone) phEl.value = prof.phone;
  } catch (e) {}
}

function submitEasyUpiRecharge() {
  var payer = (document.getElementById('easy_upi_payer')?.value || '').trim();
  var phone = (document.getElementById('easy_upi_phone')?.value || '').trim();
  var utr = (document.getElementById('easy_upi_utr')?.value || '').trim();
  if (!payer && !phone && !utr) {
    alert('Please enter your Name/PhonePe Name, Mobile Number, or 12-digit UTR number.');
    return;
  }
  if (utr && !/^\d{12}$/.test(utr) && utr.length < 4) {
    alert('Please enter a valid 12-digit UTR number, or leave it blank and enter your PhonePe/GPay Name.');
    return;
  }
  var devId = (typeof getDeviceId === 'function') ? getDeviceId() : 'DEV_UNKNOWN';
  var online = isActivationDeskOnline();
  var reqObj = {
    id: 'REQ_' + Date.now(),
    device_id: devId,
    name: payer || 'Fabricator',
    phone: phone || 'N/A',
    plan: _swSelectedUpiPlan.planKey,
    plan_label: _swSelectedUpiPlan.label,
    amount: _swSelectedUpiPlan.amount,
    days: _swSelectedUpiPlan.days,
    utr: utr || ('UPI Name: ' + (payer || phone)),
    status: 'Pending',
    submitted_at: new Date().toISOString(),
    date: new Date().toLocaleDateString('en-GB') + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  try {
    var list = JSON.parse(localStorage.getItem('sw_recharge_requests') || '[]');
    list.unshift(reqObj);
    localStorage.setItem('sw_recharge_requests', JSON.stringify(list));
  } catch (e) {}

  try {
    if (window.fbDb) {
      window.fbDb.collection('recharge_requests').doc(devId).set(reqObj, { merge: true }).catch(function(){});
      window.fbDb.collection('recharge_requests').doc(reqObj.id).set(reqObj).catch(function(){});
    }
  } catch (e) {}

  var statusBox = document.getElementById('easyUpiStatusMsg');
  if (statusBox) {
    statusBox.style.display = 'block';
    if (online) {
      statusBox.style.background = '#dcfce7';
      statusBox.style.color = '#166534';
      statusBox.textContent = '✅ Request Sent! Our team is online (9 AM – 9 PM). Your PRO plan will unlock automatically within 5–10 minutes.';
    } else {
      statusBox.style.background = '#fef3c7';
      statusBox.style.color = '#92400e';
      statusBox.textContent = '🌙 Payment Request Received! Activation desk runs 9:00 AM – 9:00 PM. Your PRO plan will auto-unlock at 9:00 AM tomorrow (no need to re-pay).';
    }
  }
  startLiveProAutoUnlockListener();
}

function sendUpiScreenshotWhatsApp() {
  var payer = (document.getElementById('easy_upi_payer')?.value || '').trim() || 'Partner';
  var phone = (document.getElementById('easy_upi_phone')?.value || '').trim();
  var utr = (document.getElementById('easy_upi_utr')?.value || '').trim();
  var devId = (typeof getDeviceId === 'function') ? getDeviceId() : 'N/A';
  // Also log pending request so admin can 1-click approve immediately
  if (payer || phone || utr) {
    try { submitEasyUpiRecharge(); } catch (e) {}
  }
  var msg = 'Hello Smart Worker Pro!\nI have paid for PRO Plan:\n• Plan: ' + _swSelectedUpiPlan.label + ' (Rs. ' + _swSelectedUpiPlan.amount + ')\n• Name: ' + payer + (phone ? ('\n• Mobile: ' + phone) : '') + (utr ? ('\n• UTR: ' + utr) : '') + '\n• Device ID: ' + devId + '\n(Attaching payment screenshot below)';
  window.open('https://wa.me/919239413517?text=' + encodeURIComponent(msg), '_blank');
}

function applyAutoUnlockedProLicense(plan, days, expTs, keyStr, expDateStr) {
  var dDays = parseInt(days, 10) || (String(plan || '').includes('1Y') ? 365 : (String(plan || '').includes('6M') ? 180 : (String(plan || '').includes('3M') ? 90 : 30)));
  var nowMs = Date.now();
  var finalExp = Number(expTs) || (nowMs + dDays * 24 * 60 * 60 * 1000);
  if (finalExp <= nowMs) return;
  var licObj = {
    key: String(keyStr || ('AUTO-PRO-' + dDays + 'D')).toUpperCase(),
    plan: plan || (dDays >= 365 ? 'KARIGAR_1Y' : (dDays >= 180 ? 'KARIGAR_6M' : (dDays >= 90 ? 'KARIGAR_3M' : 'KARIGAR_1M'))),
    plan_category: 'KARIGAR',
    validity_days: dDays,
    start_date: new Date(nowMs).toLocaleDateString('en-GB'),
    expiry_date: expDateStr || new Date(finalExp).toLocaleDateString('en-GB'),
    expiry_timestamp: finalExp,
    activated_at: new Date(nowMs).toISOString(),
    auto_unlocked: true
  };
  try {
    var existing = JSON.parse(localStorage.getItem('sw_license') || '{}');
    if (existing && Number(existing.expiry_timestamp) >= finalExp && existing.key === licObj.key) return;
    localStorage.setItem('sw_license', JSON.stringify(licObj));
  } catch (e) {}
  if (typeof updateActivationScreenUI === 'function') {
    try { updateActivationScreenUI(); } catch (e) {}
  }
  var statusBox = document.getElementById('easyUpiStatusMsg');
  if (statusBox) {
    statusBox.style.display = 'block';
    statusBox.style.background = '#dcfce7';
    statusBox.style.color = '#14532d';
    statusBox.textContent = '🎉 PRO Activated Automatically (' + dDays + ' Days • Till ' + licObj.expiry_date + ')! No key needed.';
  }
}

function startLiveProAutoUnlockListener() {
  try {
    if (!window.fbDb || typeof getDeviceId !== 'function') return;
    if (_swLiveUnlockUnsub) return;
    _swLiveUnlockUnsub = true;
    var devId = getDeviceId();

    // 1. Listen to recharge_requests/{devId}
    window.fbDb.collection('recharge_requests').doc(devId).onSnapshot(function(doc) {
      if (!doc || !doc.exists) return;
      var d = doc.data() || {};
      var st = String(d.status || '').toUpperCase();
      if (st === 'APPROVED' || st === 'ACTIVE') {
        applyAutoUnlockedProLicense(d.plan, d.days, d.expiry_ts || d.expiry_timestamp, d.generated_key || d.key, d.expiry_date);
      }
    }, function() {});

    // 2. Listen to subscribers/{devId}
    window.fbDb.collection('subscribers').doc(devId).onSnapshot(function(doc) {
      if (!doc || !doc.exists) return;
      var d = doc.data() || {};
      var st = String(d.status || '').toUpperCase();
      if (st === 'ACTIVE' || st === 'APPROVED') {
        applyAutoUnlockedProLicense(d.plan, d.validity_days || d.days, d.expiry_timestamp || d.expiry_ts, d.key, d.expiry_date);
      }
    }, function() {});

    // 3. Also listen to users/{phone} & subscribers/{phone} so Admin Direct Activate by Phone works with zero key!
    var prof = {};
    try { prof = JSON.parse(localStorage.getItem('sw_profile') || '{}'); } catch (e) {}
    var rawPhone = String(prof.phone || localStorage.getItem('sw_cloud_user') || '').replace(/\D/g, '').slice(-10);
    if (rawPhone.length === 10) {
      window.fbDb.collection('users').doc(rawPhone).onSnapshot(function(doc) {
        if (!doc || !doc.exists) return;
        var d = doc.data() || {};
        if (d.pro_active && d.pro_expiry_ts && Number(d.pro_expiry_ts) > Date.now()) {
          applyAutoUnlockedProLicense(d.pro_plan, null, d.pro_expiry_ts, d.pro_key, d.pro_expiry_date);
        }
      }, function() {});
    }
  } catch (e) {}
}

if (typeof window !== 'undefined' && window.addEventListener) {
  window.addEventListener('DOMContentLoaded', function() {
    updateActivationDeskTimingUI();
    setTimeout(startLiveProAutoUnlockListener, 1500);
  });
}


// =========================================================================
// v106: PROFILE PAGE & PRO ACTIVATION PAGE 3-LANGUAGE TRANSLATOR (ZERO LAG)
// =========================================================================
var SW_PROFILE_ACT_I18N = {
  'Your Name:': { bn: 'আপনার নাম:', hi: 'आपका नाम:' },
  'Shop / Company Name:': { bn: 'দোকান / কোম্পানির নাম:', hi: 'दुकान / कंपनी का नाम:' },
  'Phone Number:': { bn: 'ফোন নম্বর:', hi: 'फ़ोन नंबर:' },
  'Email / Gmail ID:': { bn: 'ইমেল / Gmail আইডি:', hi: 'ईमेल / Gmail आईडी:' },
  'GST Number (Optional):': { bn: 'GST নম্বর (ঐচ্ছিক):', hi: 'GST नंबर (वैकल्पिक):' },
  'Shop Address:': { bn: 'দোকানের ঠিকানা:', hi: 'दुकान का पता:' },
  'OPTIONAL: BANK & UPI DETAILS (PRINTED ON CUSTOMER BILLS IF FILLED)': { bn: 'ঐচ্ছিক: ব্যাঙ্ক ও UPI তথ্য (পূরণ করলে কাস্টমার বিলে প্রিন্ট হবে)', hi: 'वैकल्पिक: बैंक और UPI विवरण (भरने पर कस्टमर बिल पर प्रिंट होगा)' },
  'Bank Name:': { bn: 'ব্যাঙ্কের নাম:', hi: 'बैंक का नाम:' },
  'A/C Holder Name:': { bn: 'অ্যাকাউন্ট হোল্ডারের নাম:', hi: 'खाताधारक का नाम:' },
  'Account Number:': { bn: 'অ্যাকাউন্ট নম্বর:', hi: 'खाता संख्या:' },
  'IFSC Code:': { bn: 'IFSC কোড:', hi: 'IFSC कोड:' },
  'Branch Name:': { bn: 'ব্রাঞ্চের নাম:', hi: 'शाखा का नाम:' },
  'UPI ID (VPA):': { bn: 'UPI আইডি (VPA):', hi: 'UPI आईडी (VPA):' },
  'Upload Workshop Logo (For Bills):': { bn: 'ওয়ার্কশপের লোগো আপলোড (বিলের জন্য):', hi: 'वर्कशॉप लोगो अपलोड करें (बिल के लिए):' },
  'Upload UPI Payment QR Code (For Bills):': { bn: 'UPI পেমেন্ট QR কোড আপলোড (বিলের জন্য):', hi: 'UPI पेमेंट QR कोड अपलोड करें (बिल के लिए):' },
  'Device ID:': { bn: 'ডিভাইস আইডি:', hi: 'डिवाइस आईडी:' },
  '365 DAYS ANNUAL PRO': { bn: '365 দিনের বার্ষিক PRO', hi: '365 दिन वार्षिक PRO' },
  '180 DAYS (6 MONTHS) PRO': { bn: '180 দিন (6 মাস) PRO', hi: '180 दिन (6 महीने) PRO' },
  '90 DAYS (3 MONTHS) PRO': { bn: '90 দিন (3 মাস) PRO', hi: '90 दिन (3 महीने) PRO' },
  '30 DAYS (1 MONTH) PRO': { bn: '30 দিন (1 মাস) PRO', hi: '30 दिन (1 महीना) PRO' },
  'Only ₹100/Month • Full 1 Year Access': { bn: 'মাসে মাত্র ₹100 • পুরো 1 বছর আনলিমিটেড', hi: 'केवल ₹100/महीना • पूरे 1 साल का एक्सेस' },
  '₹125/Month • 1 User / 1 Device': { bn: 'মাসে ₹125 • 1 ইউজার / 1 ফোন', hi: '₹125/महीना • 1 यूज़र / 1 डिवाइस' },
  '₹133/Month • 1 User / 1 Device': { bn: 'মাসে ₹133 • 1 ইউজার / 1 ফোন', hi: '₹133/महीना • 1 यूज़र / 1 डिवाइस' },
  'Full PRO Features • 1 User / 1 Device': { bn: 'সব PRO ফিচার • 1 ইউজার / 1 ফোন', hi: 'सभी PRO फीचर • 1 यूज़र / 1 डिवाइस' }
};

function translateProfileAndActivationUI(lang) {
  if (typeof document === 'undefined') return;
  var roots = [document.getElementById('screen-profile'), document.getElementById('screen-activation')];
  roots.forEach(function(root) {
    if (!root) return;
    root.querySelectorAll('label, div, span, button').forEach(function(el) {
      if (el.children.length > 0) return;
      var cur = (el.textContent || '').trim();
      if (!cur) return;
      if (!el.dataset.origProfEn && SW_PROFILE_ACT_I18N[cur]) {
        el.dataset.origProfEn = cur;
      }
      var orig = el.dataset.origProfEn;
      if (!orig) return;
      var target = (lang === 'bn' && SW_PROFILE_ACT_I18N[orig].bn) ? SW_PROFILE_ACT_I18N[orig].bn
                 : ((lang === 'hi' && SW_PROFILE_ACT_I18N[orig].hi) ? SW_PROFILE_ACT_I18N[orig].hi : orig);
      if (el.textContent.trim() !== target) el.textContent = target;
    });
  });
}

(function() {
  if (typeof applyLanguageTranslations === 'function') {
    var _origV105Apply = applyLanguageTranslations;
    applyLanguageTranslations = function(lang) {
      _origV105Apply(lang);
      var activeL = (lang === 'bn' || lang === 'hi' || lang === 'en') ? lang : (typeof currentAppLang !== 'undefined' ? currentAppLang : 'en');
      if (typeof _swI18nApplying !== 'undefined') _swI18nApplying = true;
      try {
        translateProfileAndActivationUI(activeL);
      } finally {
        if (typeof _swI18nApplying !== 'undefined') _swI18nApplying = false;
      }
    };
  }
  if (typeof window !== 'undefined' && window.addEventListener) {
    window.addEventListener('DOMContentLoaded', function() {
      translateProfileAndActivationUI(typeof currentAppLang !== 'undefined' ? currentAppLang : 'en');
    });
  }
})();


// ========================================================
// CASEMENT INTERACTIVE CAD CONTROLLER (v111)
// ========================================================
var cc_cad_top_pct = 65;

function refreshCasementCadLive() {
  if (typeof renderLiveColorGlassPreview === 'function') renderLiveColorGlassPreview('cc');
  if (typeof renderCasementSectionGrid === 'function') renderCasementSectionGrid();
  var modal = document.getElementById('customerShowroomModal');
  if (modal && modal.style.display !== 'none' && csmCurrentPrefix === 'cc') {
    var holder = document.getElementById('csm_svg_holder');
    var info = buildWindowDoorSvgPreview('cc', 680, 560, true);
    if (holder) holder.innerHTML = info.svg;
    renderCasementCadToolbar('cc');
  }
}

function ccCadAdjustCols(rowName, delta) {
  var elId = (rowName === 'top') ? 'cc_top_cols' : 'cc_bot_cols';
  var el = document.getElementById(elId);
  if (!el) return;
  var cur = parseInt(el.value, 10) || 0;
  var minV = (rowName === 'top') ? 1 : 0;
  var next = Math.max(minV, Math.min(8, cur + delta));
  el.value = String(next);
  if (rowName === 'bot' && next > 0) {
    var bh = document.getElementById('cc_bot_h');
    var ch = (typeof safeEval === 'function' && document.getElementById('cc_h')) ? safeEval(document.getElementById('cc_h').value) : 0;
    if (bh && (!bh.value || parseFloat(bh.value) <= 0) && ch > 0) {
      bh.value = String(Math.round(ch * ((100 - cc_cad_top_pct) / 100)));
    }
  }
  if (typeof syncCasementSectionsFromInputs === 'function') syncCasementSectionsFromInputs();
  refreshCasementCadLive();
}

function ccCadSetTopSplit(pct) {
  cc_cad_top_pct = Math.max(30, Math.min(85, parseInt(pct, 10) || 65));
  var botColsEl = document.getElementById('cc_bot_cols');
  if (botColsEl && (parseInt(botColsEl.value, 10) || 0) === 0) {
    botColsEl.value = '1';
    if (typeof syncCasementSectionsFromInputs === 'function') syncCasementSectionsFromInputs();
  }
  var ch = (typeof safeEval === 'function' && document.getElementById('cc_h')) ? safeEval(document.getElementById('cc_h').value) : 0;
  var bhEl = document.getElementById('cc_bot_h');
  if (bhEl && ch > 0) {
    bhEl.value = String(Math.round(ch * ((100 - cc_cad_top_pct) / 100)));
  }
  refreshCasementCadLive();
}

function ccCadQuickPreset(mode) {
  ensureCasementSectionsCount();
  if (mode === 'all_open') {
    cc_top_sections = cc_top_sections.map(function() { return 'OPEN'; });
    var toEl = document.getElementById('cc_top_open');
    if (toEl) toEl.value = String(cc_top_sections.length);
  } else if (typeof applyCasementPreset === 'function') {
    applyCasementPreset(mode);
  }
  refreshCasementCadLive();
}

function renderCasementCadToolbar(prefix) {
  var bar = document.getElementById('csm_cc_cad_bar');
  if (!bar) return;
  if (prefix !== 'cc') {
    bar.style.display = 'none';
    return;
  }
  ensureCasementSectionsCount();
  var tCols = cc_top_sections.length;
  var bCols = cc_bot_sections.length;
  bar.style.display = 'block';
  bar.innerHTML =
    '<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:5px; margin-bottom:5px;">' +
      '<div style="display:flex; align-items:center; gap:4px; font-size:0.69rem; font-weight:800; color:#0f172a;">' +
        '<span>Top:</span>' +
        '<button type="button" onclick="ccCadAdjustCols(\'top\',-1)" style="background:#e2e8f0; border:none; border-radius:5px; width:22px; height:22px; font-weight:900; cursor:pointer;">-</button>' +
        '<span style="min-width:14px; text-align:center;">' + tCols + '</span>' +
        '<button type="button" onclick="ccCadAdjustCols(\'top\',1)" style="background:#0284c7; color:#fff; border:none; border-radius:5px; width:22px; height:22px; font-weight:900; cursor:pointer;">+</button>' +
      '</div>' +
      '<div style="display:flex; align-items:center; gap:4px; font-size:0.69rem; font-weight:800; color:#0f172a;">' +
        '<span>Bot:</span>' +
        '<button type="button" onclick="ccCadAdjustCols(\'bot\',-1)" style="background:#e2e8f0; border:none; border-radius:5px; width:22px; height:22px; font-weight:900; cursor:pointer;">-</button>' +
        '<span style="min-width:14px; text-align:center;">' + bCols + '</span>' +
        '<button type="button" onclick="ccCadAdjustCols(\'bot\',1)" style="background:#0f766e; color:#fff; border:none; border-radius:5px; width:22px; height:22px; font-weight:900; cursor:pointer;">+</button>' +
      '</div>' +
      '<div style="display:flex; align-items:center; gap:3px;">' +
        '<span style="font-size:0.65rem; font-weight:800; color:#475569;">H:</span>' +
        [50, 65, 75].map(function(p) {
          var act = (cc_cad_top_pct === p);
          return '<button type="button" onclick="ccCadSetTopSplit(' + p + ')" style="background:' + (act ? '#1d4ed8' : '#eff6ff') + '; color:' + (act ? '#fff' : '#1e40af') + '; border:1px solid #93c5fd; border-radius:5px; padding:2px 5px; font-size:0.64rem; font-weight:800; cursor:pointer;">' + p + '%</button>';
        }).join('') +
      '</div>' +
    '</div>' +
    '<div style="display:grid; grid-template-columns:repeat(4,1fr); gap:4px;">' +
      '<button type="button" onclick="ccCadQuickPreset(\'mid_open\')" style="background:#0284c7; color:#fff; border:none; border-radius:5px; padding:4px 2px; font-size:0.63rem; font-weight:800; cursor:pointer;">Mid Open</button>' +
      '<button type="button" onclick="ccCadQuickPreset(\'sides_open\')" style="background:#0f766e; color:#fff; border:none; border-radius:5px; padding:4px 2px; font-size:0.63rem; font-weight:800; cursor:pointer;">Sides Open</button>' +
      '<button type="button" onclick="ccCadQuickPreset(\'all_open\')" style="background:#7c3aed; color:#fff; border:none; border-radius:5px; padding:4px 2px; font-size:0.63rem; font-weight:800; cursor:pointer;">All Open</button>' +
      '<button type="button" onclick="ccCadQuickPreset(\'all_jali\')" style="background:#059669; color:#fff; border:none; border-radius:5px; padding:4px 2px; font-size:0.63rem; font-weight:800; cursor:pointer;">All Jali</button>' +
    '</div>';
}

// ==================== DUAL HOME SWITCHER (ALUMINIUM | uPVC) v114 ====================
function switchHomeMode(mode) {
  const aluSec = document.getElementById('home_alu_section');
  const upvcSec = document.getElementById('home_upvc_section');
  const btnAlu = document.getElementById('btnHomeModeAlu');
  const btnUpvc = document.getElementById('btnHomeModeUpvc');
  if (!aluSec || !upvcSec) return;
  if (mode === 'upvc') {
    aluSec.style.display = 'none';
    upvcSec.style.display = 'block';
    if (btnAlu) { btnAlu.style.background = 'transparent'; btnAlu.style.color = '#334155'; btnAlu.style.boxShadow = 'none'; }
    if (btnUpvc) { btnUpvc.style.background = 'linear-gradient(135deg,#065f46,#0d9488)'; btnUpvc.style.color = '#fff'; btnUpvc.style.boxShadow = '0 3px 10px rgba(13,148,136,0.3)'; }
  } else {
    aluSec.style.display = 'block';
    upvcSec.style.display = 'none';
    if (btnUpvc) { btnUpvc.style.background = 'transparent'; btnUpvc.style.color = '#334155'; btnUpvc.style.boxShadow = 'none'; }
    if (btnAlu) { btnAlu.style.background = 'linear-gradient(135deg,#1e3a8a,#2563eb)'; btnAlu.style.color = '#fff'; btnAlu.style.boxShadow = '0 3px 10px rgba(37,99,235,0.3)'; }
  }
  try { localStorage.setItem('sw_home_mode', mode); } catch (e) {}
  try { if (typeof applyLanguageTranslations === 'function') applyLanguageTranslations(currentAppLang || 'en'); } catch (e) {}
}

function openUpvcFixedPreset() {
  openScreen('upvc_casement', 'uPVC FIXED / VENTILATOR');
  if (document.getElementById('uc_top_cols')) document.getElementById('uc_top_cols').value = '1';
  if (document.getElementById('uc_top_open')) document.getElementById('uc_top_open').value = '0';
  if (document.getElementById('uc_french_mode')) document.getElementById('uc_french_mode').checked = false;
}

// ==================== uPVC CASEMENT & FRENCH CALCULATOR ====================
const UPVC_CASEMENT_PRESETS = {
  "60mm Standard (B=35)":  { outerB: 35, mullionB: 35, sashFace: 78, beadH: 18, gClear: 7, overlap: 16, weld: 6, zGlass: 127, fixGlass: 7, giMinus: 120 },
  "60mm Slim (B=30)":      { outerB: 30, mullionB: 30, sashFace: 70, beadH: 16, gClear: 7, overlap: 16, weld: 6, zGlass: 115, fixGlass: 7, giMinus: 120 },
  "65mm Heavy (B=38)":     { outerB: 38, mullionB: 38, sashFace: 78, beadH: 18, gClear: 7, overlap: 16, weld: 6, zGlass: 127, fixGlass: 7, giMinus: 120 },
  "70mm Premium (B=40)":   { outerB: 40, mullionB: 40, sashFace: 88, beadH: 20, gClear: 7, overlap: 16, weld: 6, zGlass: 143, fixGlass: 7, giMinus: 120 },
  "Custom uPVC Profile":   { outerB: 35, mullionB: 35, sashFace: 78, beadH: 18, gClear: 7, overlap: 16, weld: 6, zGlass: 127, fixGlass: 7, giMinus: 120 }
};

function syncUpvcBeadGlass(pfx) {
  if (pfx === 'uc') {
    const sf = parseFloat(document.getElementById('uc_sash_face')?.value);
    const bh = parseFloat(document.getElementById('uc_bead_h')?.value);
    const cl = parseFloat(document.getElementById('uc_g_clear')?.value);
    if (!isNaN(sf) && !isNaN(bh) && !isNaN(cl) && document.getElementById('uc_z_glass')) {
      document.getElementById('uc_z_glass').value = Math.max(0, Math.round((2 * (sf - bh) + cl) * 10) / 10);
    }
  } else if (pfx === 'us') {
    const sf = parseFloat(document.getElementById('us_sash_s')?.value);
    const bh = parseFloat(document.getElementById('us_bead_h')?.value);
    const cl = parseFloat(document.getElementById('us_g_clear')?.value);
    if (!isNaN(sf) && !isNaN(bh) && !isNaN(cl) && document.getElementById('us_g_minus')) {
      document.getElementById('us_g_minus').value = Math.max(0, Math.round((2 * (sf - bh) + cl) * 10) / 10);
    }
  } else if (pfx === 'ud') {
    const sf = parseFloat(document.getElementById('ud_sash_s')?.value);
    const bh = parseFloat(document.getElementById('ud_bead_h')?.value);
    const cl = parseFloat(document.getElementById('ud_g_clear')?.value);
    if (!isNaN(sf) && !isNaN(bh) && !isNaN(cl) && document.getElementById('ud_g_minus')) {
      document.getElementById('ud_g_minus').value = Math.max(0, Math.round((2 * (sf - bh) + cl) * 10) / 10);
    }
  }
}

var uc_win_count = 0;
var uc_glass_dict = {};
var uc_buckets = { "uPVC Outer Frame": [], "uPVC Z-Sash": [], "uPVC Mullion / T": [], "uPVC Glazing Bead": [], "GI Steel Reinforcement": [] };

function onUpvcCasementProfileChange() {
  const val = document.getElementById('uc_profile')?.value || "60mm Standard (B=35)";
  let p = UPVC_CASEMENT_PRESETS[val] || UPVC_CASEMENT_PRESETS["60mm Standard (B=35)"];
  if (val === "Custom uPVC Profile") {
    try {
      const saved = JSON.parse(localStorage.getItem('sw_upvc_casement_custom') || 'null');
      if (saved) p = saved;
    } catch (e) {}
  }
  if (document.getElementById('uc_outer_b')) document.getElementById('uc_outer_b').value = p.outerB;
  if (document.getElementById('uc_sash_face')) document.getElementById('uc_sash_face').value = p.sashFace || 78;
  if (document.getElementById('uc_bead_h')) document.getElementById('uc_bead_h').value = p.beadH || 18;
  if (document.getElementById('uc_g_clear')) document.getElementById('uc_g_clear').value = p.gClear ?? 7;
  if (document.getElementById('uc_mullion_b')) document.getElementById('uc_mullion_b').value = p.mullionB;
  if (document.getElementById('uc_overlap')) document.getElementById('uc_overlap').value = p.overlap;
  if (document.getElementById('uc_weld')) document.getElementById('uc_weld').value = p.weld;
  if (document.getElementById('uc_z_glass')) document.getElementById('uc_z_glass').value = p.zGlass;
  if (document.getElementById('uc_fix_glass')) document.getElementById('uc_fix_glass').value = p.fixGlass;
  if (document.getElementById('uc_gi_minus')) document.getElementById('uc_gi_minus').value = p.giMinus;
}

function saveUpvcCasementCustom() {
  const obj = {
    outerB: parseFloat(document.getElementById('uc_outer_b')?.value) || 35,
    sashFace: parseFloat(document.getElementById('uc_sash_face')?.value) || 78,
    beadH: parseFloat(document.getElementById('uc_bead_h')?.value) || 18,
    gClear: parseFloat(document.getElementById('uc_g_clear')?.value) ?? 7,
    mullionB: parseFloat(document.getElementById('uc_mullion_b')?.value) || 35,
    overlap: parseFloat(document.getElementById('uc_overlap')?.value) || 16,
    weld: parseFloat(document.getElementById('uc_weld')?.value) || 6,
    zGlass: parseFloat(document.getElementById('uc_z_glass')?.value) || 120,
    fixGlass: parseFloat(document.getElementById('uc_fix_glass')?.value) || 7,
    giMinus: parseFloat(document.getElementById('uc_gi_minus')?.value) || 120
  };
  try { localStorage.setItem('sw_upvc_casement_custom', JSON.stringify(obj)); } catch (e) {}
  alert("Saved your Custom uPVC Casement profile!");
}

function clearUpvcCasement() {
  uc_win_count = 0;
  uc_glass_dict = {};
  uc_buckets = { "uPVC Outer Frame": [], "uPVC Z-Sash": [], "uPVC Mullion / T": [], "uPVC Glazing Bead": [], "GI Steel Reinforcement": [] };
  if (document.getElementById('uc_h')) document.getElementById('uc_h').value = "";
  if (document.getElementById('uc_w')) document.getElementById('uc_w').value = "";
  if (document.getElementById('uc_out')) document.getElementById('uc_out').textContent = "Cleared. Enter uPVC Casement dimensions...";
  if (document.getElementById('uc_mat_out')) document.getElementById('uc_mat_out').textContent = "";
}

function calculateUpvcCasement() {
 if (typeof iCadIsActive === 'function' && iCadIsActive('uc')) { calculateFromICad('uc'); return; }
  const raw_h = safeEval(document.getElementById('uc_h')?.value);
  const raw_w = safeEval(document.getElementById('uc_w')?.value);
  if (!raw_h || !raw_w) { alert("Please enter Height and Width."); return; }

  const is_mm = (document.getElementById('uc_unit')?.value || 'Millimeter').includes('Millimeter');
  const h_mm = is_mm ? raw_h : raw_h * 25.4;
  const w_mm = is_mm ? raw_w : raw_w * 25.4;
  const bot_h_raw = safeEval(document.getElementById('uc_bot_h')?.value) || 0;
  const bot_h_mm = is_mm ? bot_h_raw : bot_h_raw * 25.4;

  const top_cols = Math.max(1, parseInt(document.getElementById('uc_top_cols')?.value) || 1);
  let top_open = Math.min(top_cols, Math.max(0, parseInt(document.getElementById('uc_top_open')?.value) || 0));
  const top_fixed = top_cols - top_open;

  const bot_cols = Math.max(0, parseInt(document.getElementById('uc_bot_cols')?.value) || 0);
  let bot_open = Math.min(bot_cols, Math.max(0, parseInt(document.getElementById('uc_bot_open')?.value) || 0));
  const bot_fixed = bot_cols - bot_open;

  const outerB = parseFloat(document.getElementById('uc_outer_b')?.value) || 35;
  const mullionB = parseFloat(document.getElementById('uc_mullion_b')?.value) || 35;
  const overlap = parseFloat(document.getElementById('uc_overlap')?.value);
  const ov = isNaN(overlap) ? 16 : overlap;
  const weld = parseFloat(document.getElementById('uc_weld')?.value);
  const weldAdd = isNaN(weld) ? 6 : weld;
  const zGlassMinus = parseFloat(document.getElementById('uc_z_glass')?.value) || 120;
  const fixGlassMinus = parseFloat(document.getElementById('uc_fix_glass')?.value);
  const fixMinus = isNaN(fixGlassMinus) ? 7 : fixGlassMinus;
  const giMinus = parseFloat(document.getElementById('uc_gi_minus')?.value) || 120;
  const isFrench = !!(document.getElementById('uc_french_mode')?.checked);
  const profileName = document.getElementById('uc_profile')?.value || "uPVC 60mm";
  const win_qty = Math.max(1, parseInt(document.getElementById('uc_qty')?.value) || 1);
  const loc = (document.getElementById('uc_loc')?.value || "").trim();

  const outer_2 = outerB * 2;
  const rows = bot_h_mm > 0 ? 2 : 1;
  const top_gap_h = rows === 2 ? (h_mm - outer_2 - mullionB - bot_h_mm) : (h_mm - outer_2);
  const bot_gap_h = rows === 2 ? bot_h_mm : 0;

  const topIsFrench = isFrench && top_cols === 2 && top_open === 2;
  const botIsFrench = isFrench && rows === 2 && bot_cols === 2 && bot_open === 2;
  const top_v_mul = topIsFrench ? 0 : (top_cols - 1);
  const bot_v_mul = botIsFrench ? 0 : Math.max(0, bot_cols - 1);

  const top_gap_w = (w_mm - outer_2 - (top_v_mul * mullionB)) / top_cols;
  const bot_gap_w = bot_cols > 0 ? ((w_mm - outer_2 - (bot_v_mul * mullionB)) / bot_cols) : 0;

  uc_win_count += 1;
  const disp = (mmVal) => is_mm ? (Math.round(mmVal * 10) / 10) + " mm" : toFractionInch(mmVal / 25.4);

  const frame_h_cut = h_mm + weldAdd;
  const frame_w_cut = w_mm + weldAdd;
  const gi_frame_h = Math.max(50, frame_h_cut - giMinus);
  const gi_frame_w = Math.max(50, frame_w_cut - giMinus);

  const ucSpec = getUpvcColorGlassSpec('uc');
  let out = `[uPVC ${profileName} Win #${uc_win_count}${loc ? ' [' + loc + ']' : ''} | Size: ${disp(h_mm)} x ${disp(w_mm)}${win_qty > 1 ? ' (Qty: ' + win_qty + ')' : ''}]\n`;
  out += `> uPVC Color: ${ucSpec.color} | Glass: ${ucSpec.glassLabel}\n`;
  out += `> Settings: B=${outerB}mm, Overlap=${ov}mm, Weld=+${weldAdd}mm, FixGlass=-${fixMinus}mm, GI=-${giMinus}mm\n`;
  out += `--- 1. OUTER FRAME (+${weldAdd}mm Welding) & GI STEEL ---\n`;
  out += `> Outer Height: ${disp(frame_h_cut)} (${2 * win_qty} pc) | GI Steel: ${disp(gi_frame_h)} (${2 * win_qty} pc)\n`;
  out += `> Outer Width:  ${disp(frame_w_cut)} (${2 * win_qty} pc) | GI Steel: ${disp(gi_frame_w)} (${2 * win_qty} pc)\n`;
  for (let q = 0; q < win_qty; q++) {
    uc_buckets["uPVC Outer Frame"].push(frame_h_cut / 25.4, frame_h_cut / 25.4, frame_w_cut / 25.4, frame_w_cut / 25.4);
    uc_buckets["GI Steel Reinforcement"].push(gi_frame_h / 25.4, gi_frame_h / 25.4, gi_frame_w / 25.4, gi_frame_w / 25.4);
  }

  if (rows === 2) {
    const h_mul_cut = w_mm - outer_2 + 12;
    out += `> Horiz. Transom (T): ${disp(h_mul_cut)} (${win_qty} pc)\n`;
    for (let q = 0; q < win_qty; q++) uc_buckets["uPVC Mullion / T"].push(h_mul_cut / 25.4);
  }
  if (top_v_mul > 0) {
    const v_mul_cut = top_gap_h + 12;
    out += `> Top Vert. Mullion (T): ${disp(v_mul_cut)} (${top_v_mul * win_qty} pc)\n`;
    for (let i = 0; i < top_v_mul * win_qty; i++) uc_buckets["uPVC Mullion / T"].push(v_mul_cut / 25.4);
  }
  if (bot_v_mul > 0) {
    const bv_mul_cut = bot_gap_h + 12;
    out += `> Bot Vert. Mullion (T): ${disp(bv_mul_cut)} (${bot_v_mul * win_qty} pc)\n`;
    for (let i = 0; i < bot_v_mul * win_qty; i++) uc_buckets["uPVC Mullion / T"].push(bv_mul_cut / 25.4);
  }

  out += `\n--- 2. TOP ROW (${top_cols} SECTIONS) ---\n`;
  if (top_open > 0) {
    const s_h_fin = top_gap_h + ov;
    const s_w_fin = topIsFrench ? ((w_mm - outer_2 + ov - 4) / 2) : (top_gap_w + ov);
    const s_h_cut = s_h_fin + weldAdd;
    const s_w_cut = s_w_fin + weldAdd;
    const g_h = s_h_fin - zGlassMinus;
    const g_w = s_w_fin - zGlassMinus;
    const gi_sh = Math.max(50, s_h_cut - giMinus);
    const gi_sw = Math.max(50, s_w_cut - giMinus);
    out += `[OPENABLE Z-SASH | Qty: ${top_open * win_qty}${topIsFrench ? ' | French 4mm Gap' : ''}]\n`;
    out += ` > Z-Sash Cut (+${weldAdd}mm): ${disp(s_h_cut)} x ${disp(s_w_cut)} (${top_open * win_qty} Sash)\n`;
    out += ` > GI Steel (Sash): ${disp(gi_sh)} x ${disp(gi_sw)}\n`;
    const ucSashFace = parseFloat(document.getElementById('uc_sash_face')?.value) || 78;
    const ucBeadH = parseFloat(document.getElementById('uc_bead_h')?.value) || 18;
    const ucBeadMinus = Math.max(0, 2 * (ucSashFace - ucBeadH));
    const b_h = Math.max(50, s_h_fin - ucBeadMinus);
    const b_w = Math.max(50, s_w_fin - ucBeadMinus);
    out += ` > 45° Glazing Bead (BH=${ucBeadH}mm): ${disp(b_h)} x ${disp(b_w)} (${top_open * 2 * win_qty} pc each)\n`;
    out += ` > Sash Glass (${ucSpec.glassLabel}): ${disp(g_h)} x ${disp(g_w)} (${top_open * win_qty} pc)\n`;
    if (topIsFrench) {
      out += ` > French / Flying Mullion: ${disp(s_h_fin)} (${win_qty} pc)\n`;
      for (let q = 0; q < win_qty; q++) uc_buckets["uPVC Mullion / T"].push(s_h_fin / 25.4);
    }
    const gKey = `${disp(g_h)} x ${disp(g_w)} (uPVC Sash) || ${ucSpec.glassLabel}`;
    uc_glass_dict[gKey] = (uc_glass_dict[gKey] || 0) + (top_open * win_qty);
    for (let i = 0; i < top_open * 2 * win_qty; i++) {
      uc_buckets["uPVC Z-Sash"].push(s_h_cut / 25.4, s_w_cut / 25.4);
      uc_buckets["GI Steel Reinforcement"].push(gi_sh / 25.4, gi_sw / 25.4);
      uc_buckets["uPVC Glazing Bead"].push(b_h / 25.4, b_w / 25.4);
    }
  }
  if (top_fixed > 0) {
    const fg_h = top_gap_h - fixMinus;
    const fg_w = top_gap_w - fixMinus;
    out += `[FIXED GLASS | Qty: ${top_fixed * win_qty} | Clear: ${disp(top_gap_h)} x ${disp(top_gap_w)}]\n`;
    out += ` > Fixed Glass (${ucSpec.glassLabel}): ${disp(fg_h)} x ${disp(fg_w)} (${top_fixed * win_qty} pc)\n`;
    const gKey = `${disp(fg_h)} x ${disp(fg_w)} (uPVC Fixed) || ${ucSpec.glassLabel}`;
    uc_glass_dict[gKey] = (uc_glass_dict[gKey] || 0) + (top_fixed * win_qty);
    for (let i = 0; i < top_fixed * 2 * win_qty; i++) uc_buckets["uPVC Glazing Bead"].push(top_gap_h / 25.4, top_gap_w / 25.4);
  }

  if (rows === 2 && bot_cols > 0) {
    out += `\n--- 3. BOTTOM ROW (${bot_cols} SECTIONS) ---\n`;
    if (bot_open > 0) {
      const s_h_fin = bot_gap_h + ov;
      const s_w_fin = botIsFrench ? ((w_mm - outer_2 + ov - 4) / 2) : (bot_gap_w + ov);
      const s_h_cut = s_h_fin + weldAdd;
      const s_w_cut = s_w_fin + weldAdd;
      const g_h = s_h_fin - zGlassMinus;
      const g_w = s_w_fin - zGlassMinus;
      out += `[BOT OPENABLE Z-SASH | Qty: ${bot_open * win_qty}]\n`;
      out += ` > Z-Sash Cut (+${weldAdd}mm): ${disp(s_h_cut)} x ${disp(s_w_cut)}\n`;
      out += ` > Sash Glass: ${disp(g_h)} x ${disp(g_w)} (${bot_open * win_qty} pc)\n`;
      const gKey = `${disp(g_h)} x ${disp(g_w)} (uPVC Bot Sash) || Clear`;
      uc_glass_dict[gKey] = (uc_glass_dict[gKey] || 0) + (bot_open * win_qty);
      for (let i = 0; i < bot_open * 2 * win_qty; i++) uc_buckets["uPVC Z-Sash"].push(s_h_cut / 25.4, s_w_cut / 25.4);
    }
    if (bot_fixed > 0) {
      const fg_h = bot_gap_h - fixMinus;
      const fg_w = bot_gap_w - fixMinus;
      out += `[BOT FIXED GLASS | Qty: ${bot_fixed * win_qty}]\n`;
      out += ` > Fixed Glass (-${fixMinus}mm): ${disp(fg_h)} x ${disp(fg_w)} (${bot_fixed * win_qty} pc)\n`;
      const gKey = `${disp(fg_h)} x ${disp(fg_w)} (uPVC Bot Fixed) || Clear`;
      uc_glass_dict[gKey] = (uc_glass_dict[gKey] || 0) + (bot_fixed * win_qty);
    }
  }

  const perimM_uc = ((h_mm + w_mm) * 2 / 1000) * win_qty;
  const totalSashUc = (top_open + bot_open) * win_qty;
  const gasketM_uc = Math.ceil(perimM_uc * 2.2 + totalSashUc * 3.5);
  const giScrewsUc = Math.ceil((perimM_uc + totalSashUc * 2.5) * 4);
  const fastenersUc = Math.max(6, Math.ceil(perimM_uc * 1.6)) * win_qty;
  const siliconeUc = Math.max(1, Math.ceil(perimM_uc / 10));
  out += `\n--- 4. uPVC HARDWARE & CONSUMABLES ---\n`;
  if (totalSashUc > 0) {
    out += `> Friction Stay / Hinges: ${totalSashUc * 2} pc\n`;
    out += `> Casement Handle + Espag Lock: ${totalSashUc} set\n`;
  }
  out += `> EPDM Rubber Gasket: ${gasketM_uc} m\n`;
  out += `> GI SDS Screws (3.9x16mm): ${giScrewsUc} pc\n`;
  out += `> Frame Fixing Fasteners (10x75mm): ${fastenersUc} pc\n`;
  out += `> Glazing Packers: ${(top_cols + bot_cols) * 8 * win_qty} pc | Silicone Tube: ${siliconeUc} pc\n`;

  const prev = document.getElementById('uc_out').textContent;
  document.getElementById('uc_out').textContent = out + "===================================\n\n" + (prev.includes("Enter uPVC") ? "" : prev);
  document.getElementById('uc_mat_out').textContent = generateUpvcMaterialSummary(uc_buckets);
  try { renderICad('uc'); } catch(e){}
}

// ==================== uPVC SLIDING (ALL TRACKS — UNIVERSAL FORMULA) ====================
const UPVC_SLIDING_PRESETS = {
  "60mm Standard (2T)":    { frameF: 45, sashS: 54, beadH: 16, gClear: 7, weld: 6, hEngage: 16, gMinus: 83, giMinus: 120 },
  "80mm Standard (2.5T)":  { frameF: 50, sashS: 66, beadH: 16, gClear: 7, weld: 6, hEngage: 16, gMinus: 107, giMinus: 120 },
  "88mm Heavy (2.5T/3T)":  { frameF: 52, sashS: 66, beadH: 16, gClear: 7, weld: 6, hEngage: 16, gMinus: 107, giMinus: 120 },
  "99mm Standard (3T)":    { frameF: 50, sashS: 66, beadH: 16, gClear: 7, weld: 6, hEngage: 16, gMinus: 107, giMinus: 120 },
  "112mm Heavy (3T)":      { frameF: 52, sashS: 86, beadH: 19, gClear: 7, weld: 6, hEngage: 16, gMinus: 141, giMinus: 120 },
  "Custom uPVC Sliding":   { frameF: 50, sashS: 66, beadH: 16, gClear: 7, weld: 6, hEngage: 16, gMinus: 107, giMinus: 120 }
};

var us_win_count = 0;
var us_glass_dict = {};
var us_buckets = { "uPVC Sliding Outer": [], "uPVC Glass Sash": [], "uPVC Mesh Sash": [], "uPVC Interlock": [], "uPVC Glazing Bead": [], "GI Steel Reinforcement": [] };

function setUpvcSashPreset(frameF, sashS, beadH) {
  if (document.getElementById('us_frame_f')) document.getElementById('us_frame_f').value = frameF;
  if (document.getElementById('us_sash_s')) document.getElementById('us_sash_s').value = sashS;
  if (beadH && document.getElementById('us_bead_h')) document.getElementById('us_bead_h').value = beadH;
  syncUpvcBeadGlass('us');
}

function onUpvcSlidingProfileChange() {
  const val = document.getElementById('us_profile')?.value || "80mm Standard (2.5T)";
  let p = UPVC_SLIDING_PRESETS[val] || UPVC_SLIDING_PRESETS["80mm Standard (2.5T)"];
  if (val === "Custom uPVC Sliding") {
    try {
      const saved = JSON.parse(localStorage.getItem('sw_upvc_sliding_custom') || 'null');
      if (saved && saved.frameF) p = saved;
    } catch (e) {}
  }
  if (document.getElementById('us_frame_f')) document.getElementById('us_frame_f').value = p.frameF;
  if (document.getElementById('us_sash_s')) document.getElementById('us_sash_s').value = p.sashS;
  if (document.getElementById('us_bead_h')) document.getElementById('us_bead_h').value = p.beadH || 16;
  if (document.getElementById('us_g_clear')) document.getElementById('us_g_clear').value = p.gClear ?? 7;
  if (document.getElementById('us_weld')) document.getElementById('us_weld').value = p.weld;
  if (document.getElementById('us_h_engage')) document.getElementById('us_h_engage').value = p.hEngage;
  if (document.getElementById('us_g_minus')) document.getElementById('us_g_minus').value = p.gMinus;
  if (document.getElementById('us_gi_minus')) document.getElementById('us_gi_minus').value = p.giMinus;
}

function saveUpvcSlidingCustom() {
  const obj = {
    frameF: parseFloat(document.getElementById('us_frame_f')?.value) || 50,
    sashS: parseFloat(document.getElementById('us_sash_s')?.value) || 66,
    beadH: parseFloat(document.getElementById('us_bead_h')?.value) || 16,
    gClear: parseFloat(document.getElementById('us_g_clear')?.value) ?? 7,
    weld: parseFloat(document.getElementById('us_weld')?.value) || 6,
    hEngage: parseFloat(document.getElementById('us_h_engage')?.value) || 16,
    gMinus: parseFloat(document.getElementById('us_g_minus')?.value) || 106,
    giMinus: parseFloat(document.getElementById('us_gi_minus')?.value) || 120
  };
  try { localStorage.setItem('sw_upvc_sliding_custom', JSON.stringify(obj)); } catch (e) {}
  alert("Saved your Custom uPVC Sliding profile!");
}

function clearUpvcSliding() {
  us_win_count = 0;
  us_glass_dict = {};
  us_buckets = { "uPVC Sliding Outer": [], "uPVC Glass Sash": [], "uPVC Mesh Sash": [], "uPVC Interlock": [], "uPVC Glazing Bead": [], "GI Steel Reinforcement": [] };
  if (document.getElementById('us_h')) document.getElementById('us_h').value = "";
  if (document.getElementById('us_w')) document.getElementById('us_w').value = "";
  if (document.getElementById('us_out')) document.getElementById('us_out').textContent = "Cleared. Enter uPVC Sliding dimensions...";
  if (document.getElementById('us_mat_out')) document.getElementById('us_mat_out').textContent = "";
}

function calculateUpvcSliding() {
  const raw_h = safeEval(document.getElementById('us_h')?.value);
  const raw_w = safeEval(document.getElementById('us_w')?.value);
  if (!raw_h || !raw_w) { alert("Please enter Height and Width."); return; }

  const is_mm = (document.getElementById('us_unit')?.value || 'Millimeter').includes('Millimeter');
  const h_mm = is_mm ? raw_h : raw_h * 25.4;
  const w_mm = is_mm ? raw_w : raw_w * 25.4;
  const track = document.getElementById('us_track')?.value || "2T_2S";
  const prof = document.getElementById('us_profile')?.value || "80mm Standard";
  const qty = Math.max(1, parseInt(document.getElementById('us_qty')?.value) || 1);
  const loc = (document.getElementById('us_loc')?.value || "").trim();

  const frameF = parseFloat(document.getElementById('us_frame_f')?.value) || 50;
  const sashS = parseFloat(document.getElementById('us_sash_s')?.value) || 66;
  const weldVal = parseFloat(document.getElementById('us_weld')?.value);
  const weldAdd = isNaN(weldVal) ? 6 : weldVal;
  const hEngVal = parseFloat(document.getElementById('us_h_engage')?.value);
  const hEngage = isNaN(hEngVal) ? 16 : hEngVal;
  const gMinus = parseFloat(document.getElementById('us_g_minus')?.value) || 106;
  const giMinus = parseFloat(document.getElementById('us_gi_minus')?.value) || 120;

  let div = 2, glassShutters = 2, meshShutters = 0, ilockCount = 2, trackLabel = "2-Track (2 Glass)";
  if (track === "2T_4S") { div = 4; glassShutters = 4; meshShutters = 0; ilockCount = 4; trackLabel = "2-Track (4 Glass)"; }
  else if (track === "2.5T_2G1M") { div = 2; glassShutters = 2; meshShutters = 1; ilockCount = 2; trackLabel = "2.5-Track (2 Glass + 1 Jali)"; }
  else if (track === "3T_2G1M") { div = 2; glassShutters = 2; meshShutters = 1; ilockCount = 2; trackLabel = "3-Track (2 Glass + 1 Jali)"; }
  else if (track === "3T_3S") { div = 3; glassShutters = 3; meshShutters = 0; ilockCount = 4; trackLabel = "3-Track (3 Glass)"; }
  else if (track === "3T_4G2M") { div = 4; glassShutters = 4; meshShutters = 2; ilockCount = 4; trackLabel = "3-Track (4 Glass + 2 Jali)"; }

  // Universal uPVC Sliding Formula (works for ANY frame F & ANY sash S: 66mm, 76mm, 86mm...)
  // Outer Frame Cut = Finished + Weld (+6mm)
  const frame_h_cut = Math.ceil(h_mm + weldAdd);
  const frame_w_cut = Math.ceil(w_mm + weldAdd);

  // Sash Height Cut = (H - 2*F) + hEngage(18) + weldAdd(6)  [= Frame_H_Cut - (2*F + 6) + 24]
  const sash_h_cut = Math.ceil((h_mm - (2 * frameF)) + hEngage + weldAdd);
  const sash_h_fin = sash_h_cut - weldAdd;

  // Sash Width Cut = ((W - 2*F) / div) + 8 (frame overlap) + ((div - 1) * S / div) + weldAdd(6)
  // Always round UP (.5 -> next whole mm) per workshop rule
  const sash_w_cut = Math.ceil(((w_mm - (2 * frameF)) / div) + 8 + (((div - 1) * sashS) / div) + weldAdd);
  const sash_w_fin = sash_w_cut - weldAdd;

  const usBeadH = parseFloat(document.getElementById('us_bead_h')?.value) || 16;
  const usBeadMinus = Math.max(0, 2 * (sashS - usBeadH));
  const bead_h_cut = Math.max(50, Math.ceil(sash_h_fin - usBeadMinus));
  const bead_w_cut = Math.max(50, Math.ceil(sash_w_fin - usBeadMinus));
  const glass_h = Math.max(50, sash_h_fin - gMinus);
  const glass_w = Math.max(50, sash_w_fin - gMinus);

  const gi_fh = Math.max(50, frame_h_cut - giMinus);
  const gi_fw = Math.max(50, frame_w_cut - giMinus);
  const gi_sh = Math.max(50, sash_h_cut - giMinus);
  const gi_sw = Math.max(50, sash_w_cut - giMinus);

  us_win_count += 1;
  const disp = (mmVal) => is_mm ? (Math.round(mmVal * 10) / 10) + " mm" : toFractionInch(mmVal / 25.4);

  const usSpec = getUpvcColorGlassSpec('us');
  let out = `[uPVC ${prof} | ${trackLabel} #${us_win_count}${loc ? ' [' + loc + ']' : ''} | Size: ${disp(h_mm)} x ${disp(w_mm)}${qty > 1 ? ' (Qty: ' + qty + ')' : ''}]\n`;
  out += `> uPVC Color: ${usSpec.color} | Glass: ${usSpec.glassLabel}\n`;
  out += `> Profile: Frame F=${frameF}mm, Sash S=${sashS}mm, Weld=+${weldAdd}mm\n`;
  out += `--- 1. OUTER TRACK FRAME (+${weldAdd}mm Weld) & GI STEEL ---\n`;
  out += `> Outer Height: ${disp(frame_h_cut)} (${2 * qty} pc) | GI Steel: ${disp(gi_fh)} (${2 * qty} pc)\n`;
  out += `> Outer Width:  ${disp(frame_w_cut)} (${2 * qty} pc) | GI Steel: ${disp(gi_fw)} (${2 * qty} pc)\n`;
  out += `\n--- 2. SLIDING SASHES (+${weldAdd}mm Weld, Round-Up) ---\n`;
  out += `> Glass Sash (${glassShutters * qty} Shutter / ${glassShutters * 2 * qty} pc each): H ${disp(sash_h_cut)} x W ${disp(sash_w_cut)}\n`;
  out += `> GI Steel (Glass Sash): H ${disp(gi_sh)} x W ${disp(gi_sw)}\n`;
  if (meshShutters > 0) {
    out += `> Mesh/Jali Sash (${meshShutters * qty} Shutter / ${meshShutters * 2 * qty} pc each): H ${disp(sash_h_cut)} x W ${disp(sash_w_cut)}\n`;
  }
  out += `> Interlock Profile: ${disp(sash_h_fin)} (${ilockCount * qty} pc)\n`;
  out += `> 45° Glazing Bead (BH=${usBeadH}mm): H ${disp(bead_h_cut)} x W ${disp(bead_w_cut)} (${glassShutters * 2 * qty} pc each)\n`;
  out += `\n--- 3. GLASS & MESH CUTTING ---\n`;
  out += `> Glass Size (${usSpec.glassLabel}): ${disp(glass_h)} x ${disp(glass_w)} (${glassShutters * qty} pc)\n`;
  if (meshShutters > 0) {
    out += `> Mosquito Mesh: ${disp(glass_h)} x ${disp(glass_w)} (${meshShutters * qty} pc)\n`;
  }
  const totalShutters = (glassShutters + meshShutters) * qty;
  const perimM_us = ((h_mm + w_mm) * 2 / 1000) * qty;
  const woolPileM = Math.ceil((sash_h_fin * 2 + sash_w_fin * 2) * totalShutters / 1000 * 1.15);
  const gasketM_us = Math.ceil((glass_h + glass_w) * 4 * (glassShutters * qty) / 1000);
  const giScrewsUs = Math.ceil((perimM_us + totalShutters * 3) * 4);
  const fastenersUs = Math.max(6, Math.ceil(perimM_us * 1.6));
  const siliconeUs = Math.max(1, Math.ceil(perimM_us / 10));
  out += `\n--- 4. uPVC HARDWARE & CONSUMABLES ---\n`;
  out += `> Heavy Sliding Rollers: ${totalShutters * 2} pc\n`;
  out += `> Touch / Multi-Point Lock: ${glassShutters * qty} pc\n`;
  out += `> Wool Pile Weather Strip: ${woolPileM} m\n`;
  out += `> EPDM Glazing Gasket: ${gasketM_us} m\n`;
  out += `> GI SDS Screws (3.9x16mm): ${giScrewsUs} pc\n`;
  out += `> Frame Fixing Fasteners (10x75mm): ${fastenersUs} pc\n`;
  out += `> Glazing Packers: ${glassShutters * 8 * qty} pc | Silicone Tube: ${siliconeUs} pc\n`;

  const gKey = `${disp(glass_h)} x ${disp(glass_w)} (uPVC Sliding Glass) || ${usSpec.glassLabel}`;
  us_glass_dict[gKey] = (us_glass_dict[gKey] || 0) + (glassShutters * qty);
  if (meshShutters > 0) {
    const mKey = `${disp(glass_h)} x ${disp(glass_w)} (uPVC Mesh) || SS Mesh`;
    us_glass_dict[mKey] = (us_glass_dict[mKey] || 0) + (meshShutters * qty);
  }

  for (let q = 0; q < qty; q++) {
    us_buckets["uPVC Sliding Outer"].push(frame_h_cut / 25.4, frame_h_cut / 25.4, frame_w_cut / 25.4, frame_w_cut / 25.4);
    us_buckets["GI Steel Reinforcement"].push(gi_fh / 25.4, gi_fh / 25.4, gi_fw / 25.4, gi_fw / 25.4);
    for (let s = 0; s < glassShutters * 2; s++) {
      us_buckets["uPVC Glass Sash"].push(sash_h_cut / 25.4, sash_w_cut / 25.4);
      us_buckets["uPVC Glazing Bead"].push(bead_h_cut / 25.4, bead_w_cut / 25.4);
      us_buckets["GI Steel Reinforcement"].push(gi_sh / 25.4, gi_sw / 25.4);
    }
    for (let m = 0; m < meshShutters * 2; m++) {
      us_buckets["uPVC Mesh Sash"].push(sash_h_cut / 25.4, sash_w_cut / 25.4);
    }
    for (let il = 0; il < ilockCount; il++) us_buckets["uPVC Interlock"].push(sash_h_fin / 25.4);
  }

  const prev = document.getElementById('us_out').textContent;
  document.getElementById('us_out').textContent = out + "===================================\n\n" + (prev.includes("Enter uPVC") ? "" : prev);
  document.getElementById('us_mat_out').textContent = generateUpvcMaterialSummary(us_buckets);
  try { renderUpvcCad('us'); } catch(e){}
}

// Restore saved home mode on load
document.addEventListener('DOMContentLoaded', function() {
  try {
    const savedMode = localStorage.getItem('sw_home_mode');
    if (savedMode === 'upvc') switchHomeMode('upvc');
  } catch (e) {}
});


function generateUpvcMaterialSummary(buckets) {
  let lines = ["=== uPVC BAR (5.95m / 19.5ft) & GI STEEL (6m) ==="];
  let hasAny = false;
  for (const [name, pcsIn] of Object.entries(buckets)) {
    if (!pcsIn || pcsIn.length === 0) continue;
    hasAny = true;
    const totalIn = pcsIn.reduce((a, b) => a + b, 0);
    const totalM = (totalIn * 25.4) / 1000;
    const totalFt = totalIn / 12;
    const isGI = name.includes("GI Steel");
    const barLenM = isGI ? 6.0 : 5.95;
    const barsNeeded = Math.ceil((totalM * 1.05) / barLenM);
    lines.push(`> ${name}: ${totalM.toFixed(2)} m (${totalFt.toFixed(1)} ft) | ~${barsNeeded} Bars (${barLenM}m)`);
  }
  return hasAny ? lines.join("\n") : "";
}


// ==================== uPVC DOOR (SINGLE & DOUBLE / FRENCH) CALCULATOR v127 ====================
var ud_count = 0;
var ud_glass_dict = {};
var ud_buckets = { "uPVC Door Frame": [], "uPVC Door Sash": [], "uPVC French Mullion": [], "uPVC Glazing Bead": [], "GI Steel Reinforcement": [] };

function saveUpvcDoorCustom() {
  const obj = {
    frameB: parseFloat(document.getElementById('ud_frame_b')?.value) || 38,
    overlap: parseFloat(document.getElementById('ud_overlap')?.value) || 16,
    weld: parseFloat(document.getElementById('ud_weld')?.value) || 6,
    gMinus: parseFloat(document.getElementById('ud_g_minus')?.value) || 165,
    giMinus: parseFloat(document.getElementById('ud_gi_minus')?.value) || 120
  };
  try { localStorage.setItem('sw_upvc_door_custom', JSON.stringify(obj)); } catch (e) {}
  alert("Saved your Custom uPVC Door profile!");
}

function clearUpvcDoor() {
  ud_count = 0;
  ud_glass_dict = {};
  ud_buckets = { "uPVC Door Frame": [], "uPVC Door Sash": [], "uPVC French Mullion": [], "uPVC Glazing Bead": [], "GI Steel Reinforcement": [] };
  if (document.getElementById('ud_h')) document.getElementById('ud_h').value = "";
  if (document.getElementById('ud_w')) document.getElementById('ud_w').value = "";
  if (document.getElementById('ud_out')) document.getElementById('ud_out').textContent = "";
  if (document.getElementById('ud_mat_out')) document.getElementById('ud_mat_out').textContent = "";
}

function calculateUpvcDoor() {
  const raw_h = safeEval(document.getElementById('ud_h')?.value);
  const raw_w = safeEval(document.getElementById('ud_w')?.value);
  if (!raw_h || !raw_w) { alert("Please enter Height and Width."); return; }

  const is_mm = (document.getElementById('ud_unit')?.value || 'Millimeter').includes('Millimeter');
  const h_mm = is_mm ? raw_h : raw_h * 25.4;
  const w_mm = is_mm ? raw_w : raw_w * 25.4;
  const dtype = document.getElementById('ud_type')?.value || "SINGLE_NO_BOT";
  const qty = Math.max(1, parseInt(document.getElementById('ud_qty')?.value) || 1);
  const loc = (document.getElementById('ud_loc')?.value || "").trim();

  const frameB = parseFloat(document.getElementById('ud_frame_b')?.value) || 38;
  const ovVal = parseFloat(document.getElementById('ud_overlap')?.value);
  const overlap = isNaN(ovVal) ? 16 : ovVal;
  const weldVal = parseFloat(document.getElementById('ud_weld')?.value);
  const weldAdd = isNaN(weldVal) ? 6 : weldVal;
  const halfWeld = weldAdd / 2; // +3mm for 1-side welded vertical frame (no bottom)
  const gMinus = parseFloat(document.getElementById('ud_g_minus')?.value) || 165;
  const giMinus = parseFloat(document.getElementById('ud_gi_minus')?.value) || 120;

  const hasBottom = dtype.includes("WITH_BOT");
  const isDouble = dtype.includes("DOUBLE");
  const typeLabel = (isDouble ? "Double / French Door" : "Single Door") + (hasBottom ? " (With Bottom)" : " (No Bottom)");

  // Outer Frame Cutting:
  // Width: always 45-45 both ends -> W + 6mm (1 pc if no bottom, 2 pc if with bottom)
  // Height: No Bottom -> 45 top / 90 bottom -> H + 3mm (2 pc); With Bottom -> H + 6mm (2 pc)
  const frame_w_cut = Math.ceil(w_mm + weldAdd);
  const frame_h_cut = Math.ceil(h_mm + (hasBottom ? weldAdd : halfWeld));
  const frame_w_pcs = hasBottom ? 2 : 1;

  // Sash Height Cutting:
  // No Bottom: frame_h_cut - (B - 3) = (H + 3) - (B - 3) = H - B + 6  [matches 2103 - 35 = 2068 for B=38!]
  // With Bottom: frame_h_cut - (2*B - overlap) = (H + 6) - (2*B - 16)
  const netDed2 = (2 * frameB) - overlap;
  const sash_h_cut = hasBottom ? Math.ceil(frame_h_cut - netDed2) : Math.ceil(frame_h_cut - (frameB - halfWeld));
  const sash_h_fin = sash_h_cut - weldAdd;

  // Sash Width Cutting:
  // Single Door: frame_w_cut - (2*B - overlap)  [matches 926 - 60 = 866 for W=920, B=38!]
  // Double / French Door: ((W - (2*B - overlap) - 4) / 2) + weldAdd
  const sash_w_cut = isDouble
    ? Math.ceil(((w_mm - netDed2 - 4) / 2) + weldAdd)
    : Math.ceil(frame_w_cut - netDed2);
  const sash_w_fin = sash_w_cut - weldAdd;

  const sashCount = isDouble ? 2 : 1;
  const udSashS = parseFloat(document.getElementById('ud_sash_s')?.value) || 98;
  const udBeadH = parseFloat(document.getElementById('ud_bead_h')?.value) || 19;
  const udBeadMinus = Math.max(0, 2 * (udSashS - udBeadH));
  const bead_h_cut = Math.max(50, Math.ceil(sash_h_fin - udBeadMinus));
  const bead_w_cut = Math.max(50, Math.ceil(sash_w_fin - udBeadMinus));
  const glass_h = Math.max(50, sash_h_fin - gMinus);
  const glass_w = Math.max(50, sash_w_fin - gMinus);

  const gi_fh = Math.max(50, frame_h_cut - giMinus);
  const gi_fw = Math.max(50, frame_w_cut - giMinus);
  const gi_sh = Math.max(50, sash_h_cut - giMinus);
  const gi_sw = Math.max(50, sash_w_cut - giMinus);

  ud_count += 1;
  const disp = (mmVal) => is_mm ? (Math.round(mmVal * 10) / 10) + " mm" : toFractionInch(mmVal / 25.4);

  const udSpec = getUpvcColorGlassSpec('ud');
  let out = `[uPVC ${typeLabel} #${ud_count}${loc ? ' [' + loc + ']' : ''} | Size: ${disp(h_mm)} x ${disp(w_mm)}${qty > 1 ? ' (Qty: ' + qty + ')' : ''}]\n`;
  out += `> uPVC Color: ${udSpec.color} | Glass/Panel: ${udSpec.glassLabel}\n`;
  out += `> Frame Box B=${frameB}mm, Overlap=${overlap}mm, Weld=+${weldAdd}mm${hasBottom ? '' : ' (Vert +'+halfWeld+'mm)'}\n`;
  out += `--- 1. DOOR OUTER FRAME & GI STEEL ---\n`;
  out += `> Frame Height (${hasBottom ? '45/45' : '45 Top / 90 Bot'}): ${disp(frame_h_cut)} (${2 * qty} pc) | GI: ${disp(gi_fh)}\n`;
  out += `> Frame Width (${hasBottom ? 'Top+Bot' : 'Top Only'}): ${disp(frame_w_cut)} (${frame_w_pcs * qty} pc) | GI: ${disp(gi_fw)}\n`;
  out += `\n--- 2. DOOR SASH (+${weldAdd}mm Weld) & GI STEEL ---\n`;
  out += `> Door Sash (${sashCount * qty} Leaf / ${sashCount * 2 * qty} pc each): H ${disp(sash_h_cut)} x W ${disp(sash_w_cut)}\n`;
  out += `> GI Steel (Sash): H ${disp(gi_sh)} x W ${disp(gi_sw)}\n`;
  if (isDouble) {
    out += `> French / Flying Mullion: ${disp(sash_h_fin)} (${qty} pc)\n`;
    for (let q = 0; q < qty; q++) ud_buckets["uPVC French Mullion"].push(sash_h_fin / 25.4);
  }
  out += `\n--- 3. GLASS / ACP PANEL & HARDWARE ---\n`;
  out += `> 45° Glazing Bead (BH=${udBeadH}mm): H ${disp(bead_h_cut)} x W ${disp(bead_w_cut)} (${sashCount * 2 * qty} pc each)\n`;
  out += `> Glass / Panel (${udSpec.glassLabel}): ${disp(glass_h)} x ${disp(glass_w)} (${sashCount * qty} pc)\n`;
  const perimM_ud = ((h_mm * 2 + w_mm * (hasBottom ? 2 : 1)) / 1000) * qty;
  const gasketM_ud = Math.ceil((perimM_ud * 2) + (sash_h_fin + sash_w_fin) * 4 * sashCount * qty / 1000);
  const giScrewsUd = Math.ceil((perimM_ud + sashCount * 5 * qty) * 4);
  const fastenersUd = Math.max(8, Math.ceil(perimM_ud * 1.8));
  const siliconeUd = Math.max(1, Math.ceil(perimM_ud / 9));
  out += `> 3D Heavy Door Hinges: ${sashCount * 3 * qty} pc\n`;
  out += `> Multi-Point Door Lock + Cylinder + Handle: ${qty} set\n`;
  out += `> EPDM Rubber Gasket: ${gasketM_ud} m\n`;
  out += `> GI SDS Screws (3.9x16mm): ${giScrewsUd} pc\n`;
  out += `> Frame Fixing Fasteners (10x75mm): ${fastenersUd} pc\n`;
  out += `> Silicone Sealant Tube: ${siliconeUd} pc\n`;

  const gKey = `${disp(glass_h)} x ${disp(glass_w)} (uPVC Door) || ${udSpec.glassLabel}`;
  ud_glass_dict[gKey] = (ud_glass_dict[gKey] || 0) + (sashCount * qty);

  for (let q = 0; q < qty; q++) {
    ud_buckets["uPVC Door Frame"].push(frame_h_cut / 25.4, frame_h_cut / 25.4);
    ud_buckets["GI Steel Reinforcement"].push(gi_fh / 25.4, gi_fh / 25.4);
    for (let fw = 0; fw < frame_w_pcs; fw++) {
      ud_buckets["uPVC Door Frame"].push(frame_w_cut / 25.4);
      ud_buckets["GI Steel Reinforcement"].push(gi_fw / 25.4);
    }
    for (let s = 0; s < sashCount * 2; s++) {
      ud_buckets["uPVC Door Sash"].push(sash_h_cut / 25.4, sash_w_cut / 25.4);
      ud_buckets["GI Steel Reinforcement"].push(gi_sh / 25.4, gi_sw / 25.4);
      ud_buckets["uPVC Glazing Bead"].push(bead_h_cut / 25.4, bead_w_cut / 25.4);
    }
  }

  const prev = document.getElementById('ud_out').textContent;
  document.getElementById('ud_out').textContent = out + "===================================\n\n" + prev;
  document.getElementById('ud_mat_out').textContent = generateUpvcMaterialSummary(ud_buckets);
  try { renderUpvcCad('ud'); } catch(e){}
}


function openUpvcQuotation() {
  openScreen('quotation', 'uPVC & ALU PRO QUOTATION');
  setTimeout(function() {
    const sel = document.getElementById('q_type');
    if (sel) {
      sel.value = 'uPVC 2.5-Track Sliding (2 Glass + 1 Jali)';
      if (typeof updateSuggestedRate === 'function') updateSuggestedRate();
    }
    const cSel = document.getElementById('q_color');
    if (cSel) cSel.value = 'uPVC Classic White';
  }, 50);
}


// ==================== VECTOR CAD SCHEMATIC RENDERER FOR QUOTATION PDF (v127) ====================
function drawPdfWindowSchematic(doc, itm, x, y, w, h) {
  try {
    const t = String(itm.type || '').toLowerCase();
    // Draw outer frame
    doc.setDrawColor(30, 41, 59);
    doc.setFillColor(241, 245, 249);
    doc.setLineWidth(0.5);
    doc.rect(x, y, w, h, 'FD');

    const pad = 1.4;
    const ix = x + pad, iy = y + pad, iw = w - pad * 2, ih = h - pad * 2;
    doc.setFillColor(224, 242, 254);
    doc.setDrawColor(51, 65, 85);
    doc.setLineWidth(0.3);

    const isSliding = t.includes('sliding') || t.includes('domal') || t.includes('track');
    const isDoor = t.includes('door') && !t.includes('sliding');
    const isCasement = t.includes('casement') || t.includes('french') || t.includes('euro');
    const isFixed = t.includes('fixed') || t.includes('ventilator') || t.includes('partition') || t.includes('ceiling');

    if (isSliding) {
      let cols = 2;
      let hasJali = t.includes('jali') || t.includes('mesh') || t.includes('2.5-track');
      if (t.includes('4 glass') || t.includes('4-track')) cols = 4;
      else if (t.includes('3 glass') || (t.includes('3-track') && !t.includes('2 glass'))) cols = 3;
      const pw = iw / cols;
      for (let c = 0; c < cols; c++) {
        const px = ix + c * pw;
        doc.setFillColor(224, 242, 254);
        doc.rect(px + 0.4, iy + 0.4, pw - 0.8, ih - 0.8, 'FD');
        // Sliding direction arrow
        const cy = iy + ih / 2;
        doc.setDrawColor(2, 132, 199);
        doc.line(px + pw * 0.25, cy, px + pw * 0.75, cy);
        doc.setDrawColor(51, 65, 85);
      }
      if (hasJali) {
        // Subtle Jali/Mesh crosshatch indicator on right half
        doc.setDrawColor(100, 116, 139);
        doc.setLineWidth(0.15);
        const mx = ix + iw * 0.52, mw = iw * 0.44;
        for (let d = 1.5; d < mw; d += 2.2) doc.line(mx + d, iy + 1, mx + d, iy + ih - 1);
      }
    } else if (isDoor) {
      const cols = t.includes('double') || t.includes('french') ? 2 : 1;
      const pw = iw / cols;
      for (let c = 0; c < cols; c++) {
        const px = ix + c * pw;
        doc.rect(px + 0.4, iy + 0.4, pw - 0.8, ih - 0.8, 'FD');
        // Door opening swing triangle
        doc.setDrawColor(225, 29, 72);
        doc.setLineWidth(0.2);
        const hingeX = (c === 0) ? (px + 0.6) : (px + pw - 0.6);
        const lockX = (c === 0) ? (px + pw - 0.6) : (px + 0.6);
        doc.line(hingeX, iy + 0.6, lockX, iy + ih / 2);
        doc.line(hingeX, iy + ih - 0.6, lockX, iy + ih / 2);
        // Handle bar
        doc.setLineWidth(0.5);
        doc.line(lockX + (c === 0 ? -1.2 : 1.2), iy + ih * 0.42, lockX + (c === 0 ? -1.2 : 1.2), iy + ih * 0.58);
        doc.setDrawColor(51, 65, 85);
        doc.setLineWidth(0.3);
      }
    } else if (isCasement) {
      const cols = (t.includes('french') || t.includes('double')) ? 2 : 2;
      const pw = iw / cols;
      for (let c = 0; c < cols; c++) {
        const px = ix + c * pw;
        doc.rect(px + 0.4, iy + 0.4, pw - 0.8, ih - 0.8, 'FD');
        doc.setDrawColor(15, 118, 110);
        doc.setLineWidth(0.2);
        const hingeX = (c === 0) ? (px + 0.6) : (px + pw - 0.6);
        const lockX = (c === 0) ? (px + pw - 0.6) : (px + 0.6);
        doc.line(hingeX, iy + 0.6, lockX, iy + ih / 2);
        doc.line(hingeX, iy + ih - 0.6, lockX, iy + ih / 2);
        doc.setDrawColor(51, 65, 85);
        doc.setLineWidth(0.3);
      }
    } else {
      // Fixed / Partition / Ceiling
      doc.rect(ix + 0.4, iy + 0.4, iw - 0.8, ih - 0.8, 'FD');
      doc.setDrawColor(148, 163, 184);
      doc.setLineWidth(0.2);
      doc.line(ix + 2, iy + ih - 2, ix + iw - 2, iy + 2);
      doc.setFontSize(5.5);
      doc.setTextColor(71, 85, 105);
      doc.text("FIX", ix + iw / 2 - 2.5, iy + ih / 2 + 1);
    }

    // Small dimension tag at bottom of schematic
    doc.setFontSize(5);
    doc.setTextColor(30, 41, 59);
    doc.text(`${itm.w}x${itm.h}`, x + 1, y + h - 0.3);
  } catch (e) {}
}


// ==================== uPVC PROFILE & GI STEEL PURCHASE ORDER PDF (5.95m / 6.0m BARS) ====================
function exportUpvcPurchasePdf(filename, title, buckets) {
  if (!isAppActivated()) {
    alert("PRO activation is required to generate PDF documents.");
    openScreen('activation', 'PRO UPGRADE & PLANS');
    return;
  }
  const keys = Object.keys(buckets || {}).filter(k => buckets[k] && buckets[k].length > 0);
  if (keys.length === 0) {
    alert("No uPVC material calculated yet! Please calculate first.");
    return;
  }
  var jsPDF = (window.jspdf && window.jspdf.jsPDF) ? window.jspdf.jsPDF : (window.jsPDF || null);
  if (!jsPDF) { alert("PDF library is loading, please try again."); return; }

  const doc = new jsPDF('l', 'mm', 'a4');
  const today = new Date().toLocaleDateString('en-GB');
  drawDocHeaderWithLogo(doc, "uPVC PROFILE & GI STEEL PURCHASE ORDER", `${title} | Standard Bar: 5.95m (19.5ft) uPVC & 6.0m GI Steel | Date: ${today}`, [6, 95, 70]);

  const rows = [];
  let totalUpvcBars = 0, totalGiBars = 0;
  keys.forEach((name, idx) => {
    const pcsIn = buckets[name];
    const totalIn = pcsIn.reduce((a, b) => a + b, 0);
    const totalM = (totalIn * 25.4) / 1000;
    const totalFt = totalIn / 12;
    const isGI = name.includes("GI Steel");
    const barLenM = isGI ? 6.0 : 5.95;
    const barsNeeded = Math.ceil((totalM * 1.05) / barLenM);
    if (isGI) totalGiBars += barsNeeded;
    else totalUpvcBars += barsNeeded;
    rows.push([
      idx + 1,
      name,
      `${pcsIn.length} pcs`,
      `${totalM.toFixed(2)} m`,
      `${totalFt.toFixed(1)} ft`,
      `${barLenM} m (${isGI ? '20 ft' : '19.5 ft'})`,
      `${barsNeeded} Bars`
    ]);
  });

  doc.autoTable({
    startY: 36,
    head: [['SN', 'uPVC Profile / GI Steel Section', 'Cut Pcs', 'Total Meters', 'Total Feet', 'Standard Bar Length', 'Order Qty (incl. 5% Margin)']],
    body: rows,
    theme: 'grid',
    headStyles: { fillColor: [6, 95, 70], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 9 },
    styles: { fontSize: 9, valign: 'middle' },
    columnStyles: {
      0: { cellWidth: 12, halign: 'center' },
      2: { halign: 'center' },
      3: { halign: 'right' },
      4: { halign: 'right' },
      6: { halign: 'center', fontStyle: 'bold', textColor: [6, 95, 70] }
    }
  });

  const fy = doc.lastAutoTable.finalY + 10;
  doc.setFillColor(240, 253, 250);
  doc.setDrawColor(13, 148, 136);
  doc.roundedRect(14, fy, 269, 14, 2, 2, 'FD');
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(6, 95, 70);
  doc.text(`TOTAL ORDER SUMMARY:   uPVC Profiles = ${totalUpvcBars} Bars (5.95m each)   |   GI Steel Reinforcement = ${totalGiBars} Bars (6.0m each)`, 20, fy + 9);

  doc.save(`${filename}_${today.replace(/\//g, '-')}.pdf`);
}


function openUpvcBarOptimizer() {
  openScreen('bar_cutting', 'uPVC PROFILE CUTTING (5.95m)');
  setTimeout(function() {
    var lenSel = document.getElementById('bc_stock_len');
    var unitSel = document.getElementById('bc_unit');
    var profInp = document.getElementById('bc_profile');
    if (lenSel) lenSel.value = '234.25';
    if (unitSel) unitSel.value = 'Millimeter';
    if (profInp) profInp.value = 'uPVC Outer / Sash';
    if (typeof recalculateBarCuttingPlan === 'function') recalculateBarCuttingPlan();
  }, 60);
}


function getUpvcColorGlassSpec(pfx) {
  const color = document.getElementById(pfx + '_color')?.value || 'uPVC Classic White';
  const gThick = document.getElementById(pfx + '_g_thick')?.value || '5 mm';
  const gType = document.getElementById(pfx + '_g_type')?.value || 'Clear';
  const gGrade = document.getElementById(pfx + '_g_grade')?.value || 'NORMAL / ANNEALED';
  const badge = gGrade.includes('TOUGHENED') ? `[★ ${gGrade}]` : `[${gGrade}]`;
  return { color, glassLabel: `${gThick} ${gType} ${badge}` };
}


// ==================== LIVE uPVC PROPORTIONAL CAD SVG RENDERER (v127) ====================
function getUpvcFrameHex(colorName) {
  const c = String(colorName || '').toLowerCase();
  if (c.includes('golden oak')) return { fill: '#9C6B3F', stroke: '#5C3A1E' };
  if (c.includes('walnut')) return { fill: '#6B4423', stroke: '#3B2310' };
  if (c.includes('dark oak')) return { fill: '#4A2E1B', stroke: '#26160C' };
  if (c.includes('mahogany')) return { fill: '#6E2C23', stroke: '#3D1510' };
  if (c.includes('rustic oak')) return { fill: '#8B5A2B', stroke: '#4E3014' };
  if (c.includes('anthracite')) return { fill: '#383E42', stroke: '#1E2326' };
  if (c.includes('smooth grey') || c.includes('grey')) return { fill: '#64748B', stroke: '#334155' };
  if (c.includes('black')) return { fill: '#1E293B', stroke: '#0F172A' };
  if (c.includes('ivory') || c.includes('cream')) return { fill: '#F5F0E1', stroke: '#B8AC8E' };
  return { fill: '#F8FAFC', stroke: '#64748B' }; // Classic White
}

function getUpvcGlassHex(glassType) {
  const g = String(glassType || '').toLowerCase();
  if (g.includes('black')) return '#475569';
  if (g.includes('blue') || g.includes('one-way')) return '#7DD3FC';
  if (g.includes('brown')) return '#A1887F';
  if (g.includes('grey')) return '#94A3B8';
  if (g.includes('frosted') || g.includes('pinhead')) return '#E2E8F0';
  if (g.includes('acp') || g.includes('panel')) return '#CBD5E1';
  return '#BAE6FD'; // Clear Sky Glass
}

function buildUpvcCadSvg(pfx, maxW, maxH) {
  const spec = getUpvcColorGlassSpec(pfx);
  const frameCol = getUpvcFrameHex(spec.color);
  const glassFill = getUpvcGlassHex(document.getElementById(pfx + '_g_type')?.value || 'Clear');
  const isTough = (document.getElementById(pfx + '_g_grade')?.value || '').includes('TOUGHENED');
  const isMm = (document.getElementById(pfx + '_unit')?.value || 'Millimeter').includes('Millimeter');
  const unitTag = isMm ? 'mm' : '"';

  let rawH = safeEval(document.getElementById(pfx + '_h')?.value) || (pfx === 'ud' ? 2100 : 1200);
  let rawW = safeEval(document.getElementById(pfx + '_w')?.value) || (pfx === 'ud' ? 920 : 1500);
  if (rawH <= 0) rawH = (pfx === 'ud' ? 2100 : 1200);
  if (rawW <= 0) rawW = (pfx === 'ud' ? 920 : 1500);

  const padL = 36, padT = 22, padR = 14, padB = 26;
  const availW = maxW - padL - padR;
  const availH = maxH - padT - padB;
  const aspect = rawW / rawH;
  let dw = availW, dh = availW / aspect;
  if (dh > availH) { dh = availH; dw = availH * aspect; }
  dw = Math.max(95, dw);
  dh = Math.max(85, dh);
  const ox = padL + (availW - dw) / 2;
  const oy = padT + (availH - dh) / 2;
  const fT = 9; // Outer frame thickness in px

  let svg = `<svg viewBox="0 0 ${maxW} ${maxH}" style="width:100%; max-width:${maxW}px; height:auto; font-family:sans-serif;">`;
  svg += `<defs>
    <pattern id="upvcMesh_${pfx}" width="6" height="6" patternUnits="userSpaceOnUse">
      <path d="M 6 0 L 0 0 0 6" fill="none" stroke="#475569" stroke-width="0.6" opacity="0.55"/>
    </pattern>
  </defs>`;

  // Outer Frame
  const isDoorNoBot = (pfx === 'ud') && !(document.getElementById('ud_type')?.value || '').includes('WITH_BOT');
  svg += `<rect x="${ox}" y="${oy}" width="${dw}" height="${dh}" fill="${frameCol.fill}" stroke="${frameCol.stroke}" stroke-width="1.8" rx="2"/>`;
  const ix = ox + fT, iy = oy + fT, iw = dw - fT * 2, ih = isDoorNoBot ? (dh - fT) : (dh - fT * 2);

  if (pfx === 'uc') {
    const topCols = Math.max(1, Math.min(6, parseInt(document.getElementById('uc_top_cols')?.value) || 2));
    const topOpen = Math.min(topCols, Math.max(0, parseInt(document.getElementById('uc_top_open')?.value) || 0));
    const botH = safeEval(document.getElementById('uc_bot_h')?.value) || 0;
    const botCols = botH > 0 ? Math.max(1, Math.min(6, parseInt(document.getElementById('uc_bot_cols')?.value) || topCols)) : 0;
    const botOpen = botH > 0 ? Math.min(botCols, Math.max(0, parseInt(document.getElementById('uc_bot_open')?.value) || 0)) : 0;
    const isFrench = !!(document.getElementById('uc_french_mode')?.checked) && topCols === 2 && topOpen === 2;

    const rows = botH > 0 ? 2 : 1;
    const botFrac = rows === 2 ? Math.max(0.2, Math.min(0.6, botH / rawH)) : 0;
    const topHpx = rows === 2 ? ih * (1 - botFrac) - 3 : ih;
    const botHpx = rows === 2 ? ih * botFrac - 3 : 0;

    function drawCasementRow(ry, rh, cols, openCnt, frenchFlag) {
      const pw = iw / cols;
      for (let c = 0; c < cols; c++) {
        const px = ix + c * pw;
        const isOpen = c < openCnt;
        // Sash frame if openable
        if (isOpen) {
          svg += `<rect x="${px + 1.5}" y="${ry + 1.5}" width="${pw - 3}" height="${rh - 3}" fill="${frameCol.fill}" stroke="${frameCol.stroke}" stroke-width="1.2"/>`;
          svg += `<rect x="${px + 6}" y="${ry + 6}" width="${pw - 12}" height="${rh - 12}" fill="${glassFill}" stroke="${frameCol.stroke}" stroke-width="0.9"/>`;
          const hingeLeft = (c % 2 === 0);
          const hx = hingeLeft ? (px + 6) : (px + pw - 6);
          const lx = hingeLeft ? (px + pw - 6) : (px + 6);
          svg += `<line x1="${hx}" y1="${ry + 6}" x2="${lx}" y2="${ry + rh / 2}" stroke="#0f766e" stroke-width="1.2" stroke-dasharray="3,2"/>`;
          svg += `<line x1="${hx}" y1="${ry + rh - 6}" x2="${lx}" y2="${ry + rh / 2}" stroke="#0f766e" stroke-width="1.2" stroke-dasharray="3,2"/>`;
          // Handle
          const hndX = hingeLeft ? (px + pw - 4.5) : (px + 2.5);
          svg += `<rect x="${hndX}" y="${ry + rh/2 - 7}" width="2.5" height="14" rx="1" fill="#0f172a"/>`;
          svg += `<text x="${px + pw/2}" y="${ry + rh - 10}" font-size="8" font-weight="800" fill="#0f766e" text-anchor="middle">${frenchFlag ? 'FRENCH' : 'OPEN'}</text>`;
        } else {
          svg += `<rect x="${px + 2}" y="${ry + 2}" width="${pw - 4}" height="${rh - 4}" fill="${glassFill}" stroke="${frameCol.stroke}" stroke-width="1"/>`;
          svg += `<line x1="${px + 8}" y1="${ry + rh - 8}" x2="${px + pw - 8}" y2="${ry + 8}" stroke="#ffffff" stroke-width="1.4" opacity="0.7"/>`;
          svg += `<text x="${px + pw/2}" y="${ry + rh/2 + 3}" font-size="8.5" font-weight="800" fill="#334155" text-anchor="middle">FIX</text>`;
        }
        // Center mullion bar between sections (skip if French flying mullion)
        if (c > 0 && !frenchFlag) {
          svg += `<rect x="${px - 2.5}" y="${ry}" width="5" height="${rh}" fill="${frameCol.fill}" stroke="${frameCol.stroke}" stroke-width="0.8"/>`;
        }
      }
    }
    drawCasementRow(iy, topHpx, topCols, topOpen, isFrench);
    if (rows === 2) {
      svg += `<rect x="${ix}" y="${iy + topHpx}" width="${iw}" height="6" fill="${frameCol.fill}" stroke="${frameCol.stroke}" stroke-width="1"/>`;
      drawCasementRow(iy + topHpx + 6, botHpx, botCols, botOpen, false);
    }
  } else if (pfx === 'us') {
    const trk = document.getElementById('us_track')?.value || '2T_2S';
    let cols = 2, hasJali = false;
    if (trk === '2T_4S') cols = 4;
    else if (trk === '3T_3S') cols = 3;
    else if (trk === '2.5T_2G1M' || trk === '3T_2G1M') { cols = 2; hasJali = true; }
    else if (trk === '3T_4G2M') { cols = 4; hasJali = true; }
    const pw = iw / cols;
    for (let c = 0; c < cols; c++) {
      const px = ix + c * pw;
      svg += `<rect x="${px + 1.5}" y="${iy + 2}" width="${pw - 3}" height="${ih - 4}" fill="${frameCol.fill}" stroke="${frameCol.stroke}" stroke-width="1.2"/>`;
      svg += `<rect x="${px + 6}" y="${iy + 7}" width="${pw - 12}" height="${ih - 14}" fill="${glassFill}" stroke="${frameCol.stroke}" stroke-width="0.9"/>`;
      // Sliding arrow
      const cy = iy + ih / 2;
      const dirRight = (c % 2 === 0);
      svg += `<line x1="${px + pw*0.28}" y1="${cy}" x2="${px + pw*0.72}" y2="${cy}" stroke="#0369a1" stroke-width="1.5"/>`;
      const ax = dirRight ? (px + pw*0.72) : (px + pw*0.28);
      const dx = dirRight ? -5 : 5;
      svg += `<polyline points="${ax+dx},${cy-4} ${ax},${cy} ${ax+dx},${cy+4}" fill="none" stroke="#0369a1" stroke-width="1.5"/>`;
      svg += `<text x="${px + pw/2}" y="${iy + ih - 11}" font-size="7.5" font-weight="800" fill="#0369a1" text-anchor="middle">SLIDE</text>`;
    }
    if (hasJali) {
      const jw = cols === 4 ? (iw * 0.5) : (iw * 0.48);
      const jx = ix + iw - jw - 2;
      svg += `<rect x="${jx}" y="${iy + 6}" width="${jw}" height="${ih - 12}" fill="url(#upvcMesh_${pfx})" stroke="#334155" stroke-width="1" stroke-dasharray="2,2"/>`;
      svg += `<text x="${jx + jw/2}" y="${iy + 18}" font-size="7.5" font-weight="800" fill="#0f172a" text-anchor="middle" style="background:#fff;">+ JALI MESH</text>`;
    }
  } else if (pfx === 'ud') {
    const dt = document.getElementById('ud_type')?.value || 'SINGLE_NO_BOT';
    const isDouble = dt.includes('DOUBLE');
    const cols = isDouble ? 2 : 1;
    const pw = iw / cols;
    for (let c = 0; c < cols; c++) {
      const px = ix + c * pw;
      svg += `<rect x="${px + 1.5}" y="${iy + 1.5}" width="${pw - 3}" height="${ih - 3}" fill="${frameCol.fill}" stroke="${frameCol.stroke}" stroke-width="1.4"/>`;
      svg += `<rect x="${px + 7}" y="${iy + 7}" width="${pw - 14}" height="${ih - 14}" fill="${glassFill}" stroke="${frameCol.stroke}" stroke-width="1"/>`;
      const hingeLeft = (c === 0);
      const hx = hingeLeft ? (px + 7) : (px + pw - 7);
      const lx = hingeLeft ? (px + pw - 7) : (px + 7);
      svg += `<line x1="${hx}" y1="${iy + 7}" x2="${lx}" y2="${iy + ih / 2}" stroke="#e11d48" stroke-width="1.2" stroke-dasharray="3,2"/>`;
      svg += `<line x1="${hx}" y1="${iy + ih - 7}" x2="${lx}" y2="${iy + ih / 2}" stroke="#e11d48" stroke-width="1.2" stroke-dasharray="3,2"/>`;
      // Lever door handle
      const hndX = hingeLeft ? (px + pw - 5.5) : (px + 3);
      svg += `<rect x="${hndX}" y="${iy + ih*0.46}" width="3" height="18" rx="1" fill="#0f172a"/>`;
      svg += `<text x="${px + pw/2}" y="${iy + ih - 12}" font-size="8" font-weight="800" fill="#9f1239" text-anchor="middle">${isDouble ? 'FRENCH DOOR' : 'DOOR'}</text>`;
    }
  }

  // Live Dimension Lines (Width on bottom, Height on left)
  svg += `<line x1="${ox}" y1="${oy + dh + 11}" x2="${ox + dw}" y2="${oy + dh + 11}" stroke="#0f172a" stroke-width="1"/>`;
  svg += `<text x="${ox + dw/2}" y="${oy + dh + 22}" font-size="9.5" font-weight="800" fill="#0f172a" text-anchor="middle">W: ${rawW} ${unitTag}</text>`;
  svg += `<line x1="${ox - 10}" y1="${oy}" x2="${ox - 10}" y2="${oy + dh}" stroke="#0f172a" stroke-width="1"/>`;
  svg += `<text x="${ox - 14}" y="${oy + dh/2}" font-size="9.5" font-weight="800" fill="#0f172a" text-anchor="middle" transform="rotate(-90 ${ox - 14} ${oy + dh/2})">H: ${rawH} ${unitTag}</text>`;

  // Top Spec Badge (Color + Toughened/Normal)
  const badgeText = `${spec.color.replace('uPVC ', '')} • ${isTough ? '★ TOUGHENED' : 'Normal Glass'}`;
  svg += `<text x="${maxW/2}" y="13" font-size="8.5" font-weight="800" fill="#1e3a8a" text-anchor="middle">${badgeText}</text>`;
  svg += `</svg>`;
  return svg;
}

function renderUpvcCad(pfx) {
  const box = document.getElementById(pfx + '_cad_box');
  if (!box) return;
  box.innerHTML = buildUpvcCadSvg(pfx, 310, 220);
}

function openUpvcCadFullscreen(pfx) {
  let modal = document.getElementById('upvcCadZoomModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'upvcCadZoomModal';
    modal.style.cssText = 'position:fixed; inset:0; background:rgba(15,23,42,0.85); z-index:99999; display:flex; align-items:center; justify-content:center; padding:16px;';
    modal.innerHTML = `<div style="background:#fff; border-radius:16px; width:100%; max-width:440px; padding:14px; text-align:center;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-weight:800; color:#0f172a; font-size:0.9rem;">FULL-SCREEN uPVC CAD (INSIDE VIEW)</span>
        <button type="button" onclick="document.getElementById('upvcCadZoomModal').style.display='none'" style="background:#ef4444; color:#fff; border:none; border-radius:8px; padding:5px 12px; font-weight:800; cursor:pointer;">✕</button>
      </div>
      <div id="upvcCadZoomBody"></div>
    </div>`;
    document.body.appendChild(modal);
  }
  document.getElementById('upvcCadZoomBody').innerHTML = buildUpvcCadSvg(pfx, 380, 320);
  modal.style.display = 'flex';
}


// ==================== INTERACTIVE PARTITION-STYLE CASEMENT CAD ENGINE (v127) ====================
var _icadUid = 100;
function _icadNextId() { return 'p_' + (++_icadUid); }

var ICAD_STATE = {
  cc: { tree: { id: 'p_1', type: 'OPEN' }, selected: 'p_1', history: [], dirty: false },
  uc: { tree: { id: 'p_2', split: 'V', ratio: 0.5, a: { id: 'p_3', type: 'OPEN' }, b: { id: 'p_4', type: 'OPEN' } }, selected: 'p_3', history: [], dirty: false }
};

function iCadIsActive(pfx) {
  return !!(ICAD_STATE[pfx] && ICAD_STATE[pfx].dirty);
}

function _icadClone(obj) { return JSON.parse(JSON.stringify(obj)); }

function _icadPushUndo(pfx) {
  const st = ICAD_STATE[pfx];
  st.history.push(_icadClone(st.tree));
  if (st.history.length > 20) st.history.shift();
  st.dirty = true;
}

function _icadFindNode(node, id, parent = null, side = null) {
  if (!node) return null;
  if (node.id === id) return { node, parent, side };
  if (node.split) {
    return _icadFindNode(node.a, id, node, 'a') || _icadFindNode(node.b, id, node, 'b');
  }
  return null;
}

function _icadFirstLeaf(node) {
  if (!node) return null;
  return node.split ? _icadFirstLeaf(node.a) : node;
}

function iCadSelect(pfx, id) {
  ICAD_STATE[pfx].selected = id;
  renderICad(pfx);
}

function iCadSplit(pfx, dir) {
  const st = ICAD_STATE[pfx];
  const found = _icadFindNode(st.tree, st.selected);
  if (!found || found.node.split) return;
  _icadPushUndo(pfx);
  const oldType = found.node.type || 'FIX';
  const aNode = { id: _icadNextId(), type: oldType };
  const bNode = { id: _icadNextId(), type: 'FIX' };
  const splitNode = { id: found.node.id, split: dir, ratio: 0.5, a: aNode, b: bNode };
  if (!found.parent) st.tree = splitNode;
  else found.parent[found.side] = splitNode;
  st.selected = aNode.id;
  renderICad(pfx);
}

function iCadSetType(pfx, newType) {
  const st = ICAD_STATE[pfx];
  const found = _icadFindNode(st.tree, st.selected);
  if (!found || found.node.split) return;
  _icadPushUndo(pfx);
  found.node.type = newType;
  renderICad(pfx);
}

function iCadMerge(pfx) {
  const st = ICAD_STATE[pfx];
  const found = _icadFindNode(st.tree, st.selected);
  if (!found || !found.parent) { alert("Root panel cannot be merged further."); return; }
  _icadPushUndo(pfx);
  const grand = _icadFindNode(st.tree, found.parent.id);
  const merged = { id: _icadNextId(), type: found.node.type || 'FIX' };
  if (!grand || !grand.parent) st.tree = merged;
  else grand.parent[grand.side] = merged;
  st.selected = merged.id;
  renderICad(pfx);
}

function iCadUndo(pfx) {
  const st = ICAD_STATE[pfx];
  if (!st.history.length) return;
  st.tree = st.history.pop();
  const leaf = _icadFirstLeaf(st.tree);
  st.selected = leaf ? leaf.id : null;
  renderICad(pfx);
}

function iCadReset(pfx) {
  const st = ICAD_STATE[pfx];
  _icadPushUndo(pfx);
  const root = { id: _icadNextId(), type: 'FIX' };
  st.tree = root;
  st.selected = root.id;
  renderICad(pfx);
}

function applyICadPreset(pfx, preset) {
  const st = ICAD_STATE[pfx];
  _icadPushUndo(pfx);
  if (preset === 'blank') {
    st.tree = { id: _icadNextId(), type: 'FIX' };
  } else if (preset === 'single_open') {
    st.tree = { id: _icadNextId(), type: 'OPEN' };
  } else if (preset === 'french_2') {
    st.tree = { id: _icadNextId(), type: 'FRENCH' };
  } else if (preset === 'top_fix_2open') {
    st.tree = {
      id: _icadNextId(), split: 'H', ratio: 0.3,
      a: { id: _icadNextId(), type: 'FIX' },
      b: { id: _icadNextId(), split: 'V', ratio: 0.5, a: { id: _icadNextId(), type: 'OPEN' }, b: { id: _icadNextId(), type: 'OPEN' } }
    };
  } else if (preset === 'sides_fix_mid_open') {
    st.tree = {
      id: _icadNextId(), split: 'V', ratio: 0.3,
      a: { id: _icadNextId(), type: 'FIX' },
      b: { id: _icadNextId(), split: 'V', ratio: 0.57, a: { id: _icadNextId(), type: 'OPEN' }, b: { id: _icadNextId(), type: 'FIX' } }
    };
  }
  const lf = _icadFirstLeaf(st.tree);
  st.selected = lf ? lf.id : null;
  renderICad(pfx);
}

function _icadGetParams(pfx) {
  const isMm = (document.getElementById(pfx + '_unit')?.value || 'Millimeter').includes('Millimeter');
  let rawH = safeEval(document.getElementById(pfx + '_h')?.value) || (isMm ? 1200 : 48);
  let rawW = safeEval(document.getElementById(pfx + '_w')?.value) || (isMm ? 1500 : 60);
  if (rawH <= 0) rawH = isMm ? 1200 : 48;
  if (rawW <= 0) rawW = isMm ? 1500 : 60;
  const h_mm = isMm ? rawH : rawH * 25.4;
  const w_mm = isMm ? rawW : rawW * 25.4;

  let outerB = 24.8, mullionB = 24.8, overlap = 16, weldAdd = 0, zGlass = 115, fixGlass = 7, giMinus = 120;
  if (pfx === 'uc') {
    outerB = parseFloat(document.getElementById('uc_outer_b')?.value) || 35;
    mullionB = parseFloat(document.getElementById('uc_mullion_b')?.value) || 35;
    overlap = parseFloat(document.getElementById('uc_overlap')?.value); if (isNaN(overlap)) overlap = 16;
    weldAdd = parseFloat(document.getElementById('uc_weld')?.value); if (isNaN(weldAdd)) weldAdd = 6;
    zGlass = parseFloat(document.getElementById('uc_z_glass')?.value) || 120;
    fixGlass = parseFloat(document.getElementById('uc_fix_glass')?.value); if (isNaN(fixGlass)) fixGlass = 7;
    giMinus = parseFloat(document.getElementById('uc_gi_minus')?.value) || 120;
  } else {
    const ser = document.getElementById('cc_series')?.value || '40 Series';
    if (ser.includes('Euro')) {
      const p = (typeof EURO_CASEMENT_PRESETS !== 'undefined' && EURO_CASEMENT_PRESETS[ser]) ? EURO_CASEMENT_PRESETS[ser] : { outerB: 24.8, mullionB: 24.8, overlap: 16, zGlass: 115, fixGlass: 7 };
      outerB = parseFloat(document.getElementById('cc_euro_outer_b')?.value) || p.outerB;
      mullionB = parseFloat(document.getElementById('cc_euro_mullion_b')?.value) || p.mullionB;
      overlap = parseFloat(document.getElementById('cc_euro_overlap')?.value); if (isNaN(overlap)) overlap = p.overlap;
      zGlass = parseFloat(document.getElementById('cc_euro_z_glass')?.value) || p.zGlass;
      fixGlass = parseFloat(document.getElementById('cc_euro_fix_glass')?.value); if (isNaN(fixGlass)) fixGlass = 7;
    } else {
      outerB = ser.includes('34') ? 28 : 23;
      mullionB = ser.includes('34') ? 25 : 27;
      overlap = 11; zGlass = 65; fixGlass = 7;
    }
  }
  return { isMm, rawH, rawW, h_mm, w_mm, outerB, mullionB, overlap, weldAdd, zGlass, fixGlass, giMinus };
}

function _icadComputeLayout(node, x, y, w, h, mullionB, leaves, mullions) {
  if (!node.split) {
    leaves.push({ node, x, y, w, h });
    return;
  }
  if (node.split === 'V') {
    const avail = Math.max(20, w - mullionB);
    const wA = avail * node.ratio;
    const wB = avail - wA;
    mullions.push({ dir: 'V', len: h, x: x + wA, y: y, w: mullionB, h: h });
    _icadComputeLayout(node.a, x, y, wA, h, mullionB, leaves, mullions);
    _icadComputeLayout(node.b, x + wA + mullionB, y, wB, h, mullionB, leaves, mullions);
  } else {
    const avail = Math.max(20, h - mullionB);
    const hA = avail * node.ratio;
    const hB = avail - hA;
    mullions.push({ dir: 'H', len: w, x: x, y: y + hA, w: w, h: mullionB });
    _icadComputeLayout(node.a, x, y, w, hA, mullionB, leaves, mullions);
    _icadComputeLayout(node.b, x, y + hA + mullionB, w, hB, mullionB, leaves, mullions);
  }
}

function iCadExactSize(pfx) {
  const st = ICAD_STATE[pfx];
  const found = _icadFindNode(st.tree, st.selected);
  if (!found || !found.parent) { alert("First split the window (Left/Right or Top/Bot), then set exact size for a panel."); return; }
  const pm = _icadGetParams(pfx);
  const leaves = [], mullions = [];
  _icadComputeLayout(st.tree, pm.outerB, pm.outerB, pm.w_mm - pm.outerB * 2, pm.h_mm - pm.outerB * 2, pm.mullionB, leaves, mullions);
  const lf = leaves.find(l => l.node.id === st.selected);
  if (!lf) return;
  const isV = found.parent.split === 'V';
  const currMm = isV ? lf.w : lf.h;
  const currDisp = pm.isMm ? Math.round(currMm) : +(currMm / 25.4).toFixed(2);
  const unitLabel = pm.isMm ? 'mm' : 'Inch';
  const valStr = prompt(`Enter Exact Clear ${isV ? 'Width' : 'Height'} for selected panel (${unitLabel}):`, String(currDisp));
  if (!valStr) return;
  const newVal = parseFloat(valStr);
  if (isNaN(newVal) || newVal <= 0) return;
  const newMm = pm.isMm ? newVal : newVal * 25.4;

  // Compute parent's total span along split axis
  const sib = found.side === 'a' ? found.parent.b : found.parent.a;
  const sibLeaves = [], dummyM = [];
  // Estimate parent available span from current ratio
  const parentAvail = currMm / (found.side === 'a' ? found.parent.ratio : (1 - found.parent.ratio));
  let newRatio = newMm / parentAvail;
  if (found.side === 'b') newRatio = 1 - newRatio;
  newRatio = Math.max(0.15, Math.min(0.85, newRatio));
  _icadPushUndo(pfx);
  found.parent.ratio = newRatio;
  renderICad(pfx);
}

function buildICadSvgString(pfx, maxW, maxH) {
  const st = ICAD_STATE[pfx];
  const pm = _icadGetParams(pfx);
  const colName = pfx === 'uc' ? (document.getElementById('uc_color')?.value || 'uPVC Classic White') : (document.getElementById('cc_alu_color')?.value || 'Powder Coated Black');
  const frameCol = (typeof getUpvcFrameHex === 'function') ? getUpvcFrameHex(colName) : { fill: '#334155', stroke: '#0f172a' };
  const gType = document.getElementById(pfx + '_g_type')?.value || 'Clear';
  const glassFill = (typeof getUpvcGlassHex === 'function') ? getUpvcGlassHex(gType) : '#BAE6FD';

  const padL = 34, padT = 22, padR = 12, padB = 22;
  const availW = maxW - padL - padR, availH = maxH - padT - padB;
  const scale = Math.min(availW / pm.w_mm, availH / pm.h_mm);
  const dw = pm.w_mm * scale, dh = pm.h_mm * scale;
  const ox = padL + (availW - dw) / 2, oy = padT + (availH - dh) / 2;

  const leaves = [], mullions = [];
  _icadComputeLayout(st.tree, pm.outerB, pm.outerB, pm.w_mm - pm.outerB * 2, pm.h_mm - pm.outerB * 2, pm.mullionB, leaves, mullions);

  const fmt = (mm) => pm.isMm ? Math.round(mm) + 'mm' : (mm / 25.4).toFixed(1) + '"';
  let svg = `<svg viewBox="0 0 ${maxW} ${maxH}" style="width:100%; max-width:${maxW}px; height:auto; font-family:sans-serif; user-select:none;">`;
  svg += `<defs><pattern id="icadMesh_${pfx}" width="5" height="5" patternUnits="userSpaceOnUse"><path d="M 5 0 L 0 0 0 5" fill="none" stroke="#334155" stroke-width="0.6" opacity="0.6"/></pattern></defs>`;

  // Outer Frame
  svg += `<rect x="${ox}" y="${oy}" width="${dw}" height="${dh}" fill="${frameCol.fill}" stroke="${frameCol.stroke}" stroke-width="1.6" rx="2"/>`;

  // Mullions / Transoms
  mullions.forEach(m => {
    svg += `<rect x="${ox + m.x * scale}" y="${oy + m.y * scale}" width="${Math.max(3, m.w * scale)}" height="${Math.max(3, m.h * scale)}" fill="${frameCol.fill}" stroke="${frameCol.stroke}" stroke-width="0.8"/>`;
  });

  // Panels (Clickable!)
  leaves.forEach(lf => {
    const px = ox + lf.x * scale, py = oy + lf.y * scale, pw = Math.max(10, lf.w * scale), ph = Math.max(10, lf.h * scale);
    const t = lf.node.type || 'FIX';
    const isSel = (lf.node.id === st.selected);
    const fill = (t === 'ACP') ? '#FED7AA' : (t === 'JALI' ? `url(#icadMesh_${pfx})` : glassFill);
    svg += `<g onclick="iCadSelect('${pfx}','${lf.node.id}')" style="cursor:pointer;">`;
    svg += `<rect x="${px}" y="${py}" width="${pw}" height="${ph}" fill="${fill}" stroke="${frameCol.stroke}" stroke-width="0.9"/>`;
    if (t === 'OPEN' || t === 'JALI') {
      svg += `<rect x="${px + 3}" y="${py + 3}" width="${Math.max(4, pw - 6)}" height="${Math.max(4, ph - 6)}" fill="none" stroke="${frameCol.stroke}" stroke-width="1.2"/>`;
      svg += `<line x1="${px + 3}" y1="${py + 3}" x2="${px + pw - 3}" y2="${py + ph / 2}" stroke="#0f766e" stroke-width="1.1" stroke-dasharray="3,2"/>`;
      svg += `<line x1="${px + 3}" y1="${py + ph - 3}" x2="${px + pw - 3}" y2="${py + ph / 2}" stroke="#0f766e" stroke-width="1.1" stroke-dasharray="3,2"/>`;
    } else if (t === 'FRENCH') {
      const hw = pw / 2;
      svg += `<line x1="${px + hw}" y1="${py}" x2="${px + hw}" y2="${py + ph}" stroke="${frameCol.stroke}" stroke-width="1.4"/>`;
      svg += `<line x1="${px + 2}" y1="${py + 2}" x2="${px + hw - 2}" y2="${py + ph / 2}" stroke="#7c3aed" stroke-width="1" stroke-dasharray="3,2"/>`;
      svg += `<line x1="${px + 2}" y1="${py + ph - 2}" x2="${px + hw - 2}" y2="${py + ph / 2}" stroke="#7c3aed" stroke-width="1" stroke-dasharray="3,2"/>`;
      svg += `<line x1="${px + pw - 2}" y1="${py + 2}" x2="${px + hw + 2}" y2="${py + ph / 2}" stroke="#7c3aed" stroke-width="1" stroke-dasharray="3,2"/>`;
      svg += `<line x1="${px + pw - 2}" y1="${py + ph - 2}" x2="${px + hw + 2}" y2="${py + ph / 2}" stroke="#7c3aed" stroke-width="1" stroke-dasharray="3,2"/>`;
    } else if (t === 'TOP_HUNG') {
      svg += `<line x1="${px + 2}" y1="${py + 2}" x2="${px + pw / 2}" y2="${py + ph - 2}" stroke="#b45309" stroke-width="1.1" stroke-dasharray="3,2"/>`;
      svg += `<line x1="${px + pw - 2}" y1="${py + 2}" x2="${px + pw / 2}" y2="${py + ph - 2}" stroke="#b45309" stroke-width="1.1" stroke-dasharray="3,2"/>`;
    } else if (t === 'FIX') {
      svg += `<line x1="${px + 6}" y1="${py + ph - 6}" x2="${px + pw - 6}" y2="${py + 6}" stroke="#ffffff" stroke-width="1.3" opacity="0.75"/>`;
    }
    if (isSel) {
      svg += `<rect x="${px + 1}" y="${py + 1}" width="${Math.max(4, pw - 2)}" height="${Math.max(4, ph - 2)}" fill="none" stroke="#7c3aed" stroke-width="2.2" stroke-dasharray="4,2"/>`;
    }
    svg += `<text x="${px + pw / 2}" y="${py + ph / 2 - 2}" font-size="8" font-weight="800" fill="#0f172a" text-anchor="middle">${t}</text>`;
    svg += `<text x="${px + pw / 2}" y="${py + ph / 2 + 9}" font-size="7" font-weight="700" fill="#334155" text-anchor="middle">${fmt(lf.w)}×${fmt(lf.h)}</text>`;
    svg += `</g>`;
  });

  // Outer Total Dimensions
  svg += `<text x="${ox + dw / 2}" y="${oy - 6}" font-size="9" font-weight="800" fill="#0369a1" text-anchor="middle">Total W: ${fmt(pm.w_mm)}</text>`;
  svg += `<text x="${ox - 10}" y="${oy + dh / 2}" font-size="9" font-weight="800" fill="#0369a1" text-anchor="middle" transform="rotate(-90 ${ox - 10} ${oy + dh / 2})">H: ${fmt(pm.h_mm)}</text>`;
  svg += `</svg>`;
  return { svg, leaves, mullions, pm };
}

function renderICad(pfx) {
  const box = document.getElementById(pfx + '_icad_svg');
  if (!box) return;
  const res = buildICadSvgString(pfx, 320, 220);
  box.innerHTML = res.svg;
  const info = document.getElementById(pfx + '_icad_info');
  if (info) {
    const sel = res.leaves.find(l => l.node.id === ICAD_STATE[pfx].selected) || res.leaves[0];
    if (sel) {
      const fmt = (mm) => res.pm.isMm ? (Math.round(mm * 10) / 10) + ' mm' : (mm / 25.4).toFixed(2) + '"';
      info.innerHTML = `Selected: <span style="color:#7c3aed;">${sel.node.type}</span> • Clear Inner: <span style="color:#0284c7;">${fmt(sel.w)} W × ${fmt(sel.h)} H</span>`;
    }
  }
}

function openInteractiveCasementZoom(pfx) {
  let modal = document.getElementById('upvcCadZoomModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'upvcCadZoomModal';
    modal.style.cssText = 'position:fixed; inset:0; background:rgba(15,23,42,0.85); z-index:99999; display:flex; align-items:center; justify-content:center; padding:16px;';
    modal.innerHTML = `<div style="background:#fff; border-radius:16px; width:100%; max-width:440px; padding:14px; text-align:center;">
      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
        <span style="font-weight:800; color:#0f172a; font-size:0.9rem;">FULL-SCREEN INTERACTIVE CAD</span>
        <button type="button" onclick="document.getElementById('upvcCadZoomModal').style.display='none'" style="background:#ef4444; color:#fff; border:none; border-radius:8px; padding:5px 12px; font-weight:800; cursor:pointer;">✕</button>
      </div>
      <div id="upvcCadZoomBody"></div>
    </div>`;
    document.body.appendChild(modal);
  }
  document.getElementById('upvcCadZoomBody').innerHTML = buildICadSvgString(pfx, 380, 320).svg;
  modal.style.display = 'flex';
}

function calculateFromICad(pfx) {
  const pm = _icadGetParams(pfx);
  const raw_h = safeEval(document.getElementById(pfx + '_h')?.value);
  const raw_w = safeEval(document.getElementById(pfx + '_w')?.value);
  if (!raw_h || !raw_w) { alert("Please enter Height and Width."); return; }

  const isUpvc = (pfx === 'uc');
  const qty = Math.max(1, parseInt(document.getElementById(pfx + '_qty')?.value) || 1);
  const loc = (document.getElementById(pfx + '_loc')?.value || '').trim();
  const disp = (mm) => pm.isMm ? (Math.round(mm * 10) / 10) + ' mm' : toFractionInch(mm / 25.4);
  const leaves = [], mullions = [];
  _icadComputeLayout(ICAD_STATE[pfx].tree, pm.outerB, pm.outerB, pm.w_mm - pm.outerB * 2, pm.h_mm - pm.outerB * 2, pm.mullionB, leaves, mullions);

  const buckets = isUpvc ? uc_buckets : cc_buckets;
  const gDict = isUpvc ? uc_glass_dict : cc_glass_dict;
  const gSpec = isUpvc ? getUpvcColorGlassSpec('uc') : { color: getModuleAluLabel('cc'), glassLabel: getModuleGlassLabel('cc') };
  const seriesName = isUpvc ? (document.getElementById('uc_profile')?.value || 'uPVC') : (document.getElementById('cc_series')?.value || 'Euro Casement');
  if (isUpvc) uc_win_count += 1; else cc_window_count += 1;
  const winNo = isUpvc ? uc_win_count : cc_window_count;

  const fH = pm.h_mm + pm.weldAdd, fW = pm.w_mm + pm.weldAdd;
  let out = `[${isUpvc ? 'uPVC ' : ''}${seriesName} CAD Win #${winNo}${loc ? ' [' + loc + ']' : ''} | ${disp(pm.h_mm)} x ${disp(pm.w_mm)}${qty > 1 ? ' (Qty: ' + qty + ')' : ''}]\n`;
  out += `> Spec: ${gSpec.color} | Glass: ${gSpec.glassLabel}\n`;
  out += `--- 1. OUTER FRAME${pm.weldAdd ? ' (+' + pm.weldAdd + 'mm Weld)' : ''} & MULLIONS ---\n`;
  out += `> Outer Height: ${disp(fH)} (${2 * qty} pc)${isUpvc ? ' | GI: ' + disp(Math.max(50, fH - pm.giMinus)) : ''}\n`;
  out += `> Outer Width:  ${disp(fW)} (${2 * qty} pc)${isUpvc ? ' | GI: ' + disp(Math.max(50, fW - pm.giMinus)) : ''}\n`;

  const outerKey = isUpvc ? "uPVC Outer Frame" : "Casement Outer";
  const mulKey = isUpvc ? "uPVC Mullion / T" : "Casement Mullion";
  const sashKey = isUpvc ? "uPVC Z-Sash" : "Casement Z Handle";
  const beadKey = isUpvc ? "uPVC Glazing Bead" : "Square Clip (Beading)";

  for (let q = 0; q < qty; q++) {
    buckets[outerKey].push(fH / 25.4, fH / 25.4, fW / 25.4, fW / 25.4);
    if (isUpvc) buckets["GI Steel Reinforcement"].push(Math.max(50, fH - pm.giMinus) / 25.4, Math.max(50, fH - pm.giMinus) / 25.4, Math.max(50, fW - pm.giMinus) / 25.4, Math.max(50, fW - pm.giMinus) / 25.4);
  }

  mullions.forEach((m, idx) => {
    const mCut = m.len + (isUpvc ? 12 : 0);
    out += `> ${m.dir === 'V' ? 'Vert. Mullion' : 'Horiz. Transom'} #${idx + 1}: ${disp(mCut)} (${qty} pc)\n`;
    for (let q = 0; q < qty; q++) buckets[mulKey].push(mCut / 25.4);
  });

  out += `\n--- 2. INTERACTIVE CAD PANELS (${leaves.length} BAYS) ---\n`;
  let totalSashes = 0;
  leaves.forEach((lf, idx) => {
    const t = lf.node.type || 'FIX';
    if (t === 'FIX' || t === 'ACP') {
      const gh = lf.h - pm.fixGlass, gw = lf.w - pm.fixGlass;
      const lbl = t === 'ACP' ? 'ACP / Panel' : `Fixed Glass (${gSpec.glassLabel})`;
      out += `[Panel #${idx + 1} ${t}] Clear: ${disp(lf.h)} x ${disp(lf.w)} -> ${lbl}: ${disp(gh)} x ${disp(gw)} (${qty} pc)\n`;
      const gk = `${disp(gh)} x ${disp(gw)} (${t}) || ${gSpec.glassLabel}`;
      gDict[gk] = (gDict[gk] || 0) + qty;
      for (let q = 0; q < qty; q++) buckets[beadKey].push((lf.h + lf.w) * 2 / 25.4);
    } else if (t === 'FRENCH') {
      totalSashes += 2 * qty;
      const shFin = lf.h + pm.overlap, swFin = (lf.w + pm.overlap - 4) / 2;
      const shCut = shFin + pm.weldAdd, swCut = swFin + pm.weldAdd;
      const gh = shFin - pm.zGlass, gw = swFin - pm.zGlass;
      out += `[Panel #${idx + 1} FRENCH 2-SASH] Clear: ${disp(lf.h)} x ${disp(lf.w)} (4mm Center Gap)\n`;
      out += ` > Z-Sash (${2 * qty} Leaf): ${disp(shCut)} x ${disp(swCut)} | French Mullion: ${disp(shFin)} (${qty} pc)\n`;
      if (isUpvc) {
        const bh = parseFloat(document.getElementById('uc_bead_h')?.value) || 18;
        const sf = parseFloat(document.getElementById('uc_sash_face')?.value) || 78;
        const bm = Math.max(0, 2 * (sf - bh));
        out += ` > 45° Glazing Bead: ${disp(Math.max(50, shFin - bm))} x ${disp(Math.max(50, swFin - bm))} (${4 * qty} pc each)\n`;
      }
      out += ` > Sash Glass (${gSpec.glassLabel}): ${disp(gh)} x ${disp(gw)} (${2 * qty} pc)\n`;
      const gk = `${disp(gh)} x ${disp(gw)} (French Sash) || ${gSpec.glassLabel}`;
      gDict[gk] = (gDict[gk] || 0) + (2 * qty);
      for (let i = 0; i < 4 * qty; i++) buckets[sashKey].push(shCut / 25.4, swCut / 25.4);
      for (let q = 0; q < qty; q++) buckets[mulKey].push(shFin / 25.4);
    } else {
      totalSashes += qty;
      const shFin = lf.h + pm.overlap, swFin = lf.w + pm.overlap;
      const shCut = shFin + pm.weldAdd, swCut = swFin + pm.weldAdd;
      const gh = shFin - pm.zGlass, gw = swFin - pm.zGlass;
      const fillLbl = t === 'JALI' ? 'SS Mosquito Jali' : gSpec.glassLabel;
      out += `[Panel #${idx + 1} ${t}] Clear: ${disp(lf.h)} x ${disp(lf.w)}\n`;
      out += ` > Z-Sash (${qty} Leaf): ${disp(shCut)} x ${disp(swCut)} | ${fillLbl}: ${disp(gh)} x ${disp(gw)} (${qty} pc)\n`;
      const gk = `${disp(gh)} x ${disp(gw)} (${t} Sash) || ${fillLbl}`;
      gDict[gk] = (gDict[gk] || 0) + qty;
      for (let i = 0; i < 2 * qty; i++) buckets[sashKey].push(shCut / 25.4, swCut / 25.4);
    }
  });

  const perimM = ((pm.h_mm + pm.w_mm) * 2 / 1000) * qty;
  out += `\n--- 3. HARDWARE & CONSUMABLES ---\n`;
  if (totalSashes > 0) {
    out += `> Friction Stay / Hinges: ${totalSashes * 2} pc\n> Handle + Espag Lock: ${totalSashes} set\n`;
  }
  out += `> EPDM Rubber Gasket: ${Math.ceil(perimM * 2.2 + totalSashes * 3.5)} m\n`;
  out += `> Frame Fasteners (10x75mm): ${Math.max(6, Math.ceil(perimM * 1.6))} pc | Silicone: ${Math.max(1, Math.ceil(perimM / 10))} pc\n`;

  const outEl = document.getElementById(pfx + '_out');
  const prev = outEl ? outEl.textContent : '';
  if (outEl) outEl.textContent = out + "===================================\n\n" + (prev.includes("Enter uPVC") ? "" : prev);
  const matEl = document.getElementById(pfx + '_mat_out');
  if (matEl) matEl.textContent = isUpvc ? generateUpvcMaterialSummary(buckets) : generateMaterialList(buckets);
  renderICad(pfx);
}
