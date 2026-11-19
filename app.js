
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
  var svg = '<svg viewBox="0 0 360 220" preserveAspectRatio="xMidYMid meet" width="100%" style="' + svgStyle + '">';
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

    var wx = 18, wy = 10, ww = 324, wh = 200;
    svg += '<rect x="' + wx + '" y="' + wy + '" width="' + ww + '" height="' + wh + '" rx="4" fill="url(#aluGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="2.4"/>';

    var innerX = wx + 8, innerY = wy + 8, innerW = ww - 16, innerH = wh - 16;
    svg += '<rect x="' + innerX + '" y="' + innerY + '" width="' + innerW + '" height="' + innerH + '" fill="#0f172a"/>';

    var hasBottom = (botCols > 0);
    var transomH = hasBottom ? 6 : 0;
    var topH = hasBottom ? Math.round((innerH - transomH) * 0.62) : innerH;
    var botH = hasBottom ? (innerH - transomH - topH) : 0;

    var drawCasementRow = function(rowName, rowY, rowH, secArr) {
      var colsCount = secArr.length;
      var gap = 5;
      var secW = (innerW - ((colsCount - 1) * gap)) / colsCount;
      for (var c = 0; c < colsCount; c++) {
        var sx = innerX + c * (secW + gap);
        if (c > 0) {
          svg += '<rect x="' + (sx - gap) + '" y="' + rowY + '" width="' + gap + '" height="' + rowH + '" fill="url(#aluGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="0.7"/>';
        }
        var secType = secArr[c];
        var clickAttr = 'onclick="toggleCasementSection(\'' + rowName + '\',' + c + ')"';
        var isOpen = (secType === 'OPEN' || secType === 'JALI_OPEN');
        var matType = (secType === 'JALI_OPEN' || secType === 'JALI_FIX') ? 'JALI' : (secType === 'ACP' ? 'ACP' : 'GLASS');

        if (isOpen) {
          svg += '<g ' + clickAttr + ' style="cursor:pointer;">';
          svg += '<rect x="' + (sx + 1) + '" y="' + (rowY + 1) + '" width="' + (secW - 2) + '" height="' + (rowH - 2) + '" fill="url(#aluGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="1.4"/>';
          var gx = sx + 6, gy = rowY + 6, gw = Math.max(6, secW - 12), gh = Math.max(6, rowH - 12);
          svg += drawPanelFill(gx, gy, gw, gh, matType, matType === 'JALI' ? 'JALI (OPEN)' : 'OPEN', '');
          svg += '<polyline points="' + gx + ',' + gy + ' ' + (gx + gw) + ',' + (gy + gh / 2) + ' ' + gx + ',' + (gy + gh) + '" fill="none" stroke="#ffffff" stroke-width="1.2" stroke-dasharray="4,2.5" stroke-opacity="0.85"/>';
          svg += '<rect x="' + (sx + secW - 5) + '" y="' + (rowY + rowH / 2 - 7) + '" width="2.6" height="14" rx="1.2" fill="#fbbf24" stroke="#78350f" stroke-width="0.6"/>';
          svg += '</g>';
        } else {
          svg += drawPanelFill(sx + 1, rowY + 1, secW - 2, rowH - 2, matType, matType === 'JALI' ? 'JALI (FIX)' : (matType === 'ACP' ? 'ACP' : 'FIX'), clickAttr);
        }
      }
    };

    drawCasementRow('top', innerY, topH, cc_top_sections);
    if (hasBottom) {
      svg += '<rect x="' + innerX + '" y="' + (innerY + topH) + '" width="' + innerW + '" height="' + transomH + '" fill="url(#aluGrad_' + uid + ')" stroke="' + aluPal.stroke + '" stroke-width="0.9"/>';
      drawCasementRow('bot', innerY + topH + transomH, botH, cc_bot_sections);
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
  if (v.indexOf('2.5x1.5') === 0) return 'Jindal 2.5"x1.5"';
  if (v.indexOf('2x1') === 0) return 'Jindal 2"x1"';
  if (v === '1.75x1.75') return 'Jindal 1.75"x1.75"';
  if (v.indexOf('3x1.5') === 0) return 'Jindal 3"x1.5"';
  if (v.indexOf('4x1.75') === 0) return 'Jindal 4"x1.75"';
  if (v.indexOf('4x1.5') === 0) return 'Jindal 4"x1.5"';
  if (v === '2x2') return 'Jindal 2"x2"';
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
  apiKey: "AIzaSyBYBRTvmuf3mHuP1kveMv98idLAhJys2-M",
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
 const cleanPhone = phone.replace(/\D/g, '');
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
 password: pass,
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
 localStorage.setItem('sw_user_password', pass);
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

 function doEmailLogin() {
 const userInput = document.getElementById('auth_login_email') || document.getElementById('login_email');
 const passInput = document.getElementById('auth_login_pass') || document.getElementById('login_password');
 const userRaw = userInput ? userInput.value.trim() : '';
 const pass = passInput ? passInput.value : '';

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

 const cleanUser = userRaw.replace(/\D/g, '').length >= 10 ? userRaw.replace(/\D/g, '') : userRaw.toLowerCase();

 // 1. Check local registered users database
 const users = JSON.parse(localStorage.getItem('sw_registered_users') || '{}');
 const userAccount = users[cleanUser] || users[userRaw] || users[userRaw.toLowerCase()];

 const passHash = (typeof sha256 === 'function') ? sha256(pass + "_SW_AUTH_SALT_2026") : pass;
 if (userAccount) {
 if (userAccount.password === pass || (userAccount.password_hash && userAccount.password_hash === passHash)) {
 const targetUserKey = userAccount.phone || cleanUser;
 clearWorkingUserDataForAccountSwitch(targetUserKey);
 const restoredProf = JSON.parse(localStorage.getItem('sw_profile') || '{}');
 localStorage.setItem('sw_profile', JSON.stringify(Object.assign({}, restoredProf, {
 name: userAccount.name || restoredProf.name,
 shop_name: userAccount.shop_name || restoredProf.shop_name,
 phone: userAccount.phone || restoredProf.phone,
 email: userAccount.email || restoredProf.email,
 address: userAccount.address || restoredProf.address || "Fabrication Workshop"
 })));
 const vaultId = userAccount.vault_id || computeUserVaultId(targetUserKey, pass);
 localStorage.setItem('sw_cloud_user', targetUserKey);
 localStorage.setItem('sw_user_password', pass);
 localStorage.setItem('sw_user_vault_id', vaultId);
 localStorage.removeItem('sw_guest_mode');
 simulateLocalAuth(targetUserKey);
 syncAllDataFromCloud(vaultId);
 loadSavedProfile();
 alert("Sign-in successful! Welcome back, " + userAccount.name + " (" + userAccount.shop_name + ")");
 goHome();
 return;
 } else {
 alert("Incorrect password! Please re-check your password.");
 if (passInput) passInput.focus();
 return;
 }
 }

 // 2. Check local saved profile
 const savedUser = localStorage.getItem('sw_cloud_user');
 const savedPass = localStorage.getItem('sw_user_password');
 const savedProfile = JSON.parse(localStorage.getItem('sw_profile') || '{}');

 if (savedUser && (savedUser === cleanUser || savedProfile.phone === cleanUser || savedProfile.email === userRaw)) {
 if (!savedPass || savedPass !== pass) {
 alert("Incorrect password! Please re-check your password.");
 if (passInput) passInput.focus();
 return;
 }
 const vaultId = computeUserVaultId(savedUser, pass);
 localStorage.setItem('sw_user_vault_id', vaultId);
 simulateLocalAuth(savedUser);
 loadSavedProfile();
 alert("Sign-in successful! Welcome back.");
 goHome();
 return;
 }

 // 3. Check Google Cloud Firestore if registered from another device (Strict Password Verification Required!)
 if (window.fbDb) {
 fbDb.collection('users').doc(cleanUser).get().then(doc => {
 if (doc.exists) {
 const d = doc.data();
 const validPass = (d.password_hash && d.password_hash === passHash) || (d.password && d.password === pass);
 if (!validPass) {
 alert("Incorrect password! Access to this workshop account is strictly protected.");
 if (passInput) passInput.focus();
 } else {
 clearWorkingUserDataForAccountSwitch(cleanUser);
 if (d.profile) localStorage.setItem('sw_profile', JSON.stringify(d.profile));
 const vaultId = d.vault_id || computeUserVaultId(cleanUser, pass);
 localStorage.setItem('sw_cloud_user', cleanUser);
 localStorage.setItem('sw_user_password', pass);
 localStorage.setItem('sw_user_vault_id', vaultId);
 localStorage.removeItem('sw_guest_mode');
 simulateLocalAuth(cleanUser);
 syncAllDataFromCloud(vaultId);
 alert("Sign-in successful! Restored workshop data from your private Cloud Vault.");
 goHome();
 }
 } else {
 // Try Firebase Auth if user entered email
 if (window.firebase && fbAuth) {
 const fbMail = userRaw.includes('@') ? userRaw : (cleanUser + "@smartworker.app");
 fbAuth.signInWithEmailAndPassword(fbMail, pass).then(res => {
 currentCloudUser = res.user;
 localStorage.setItem('sw_cloud_user', cleanUser);
 localStorage.setItem('sw_user_password', pass);
 localStorage.removeItem('sw_guest_mode');
 updateCloudUserUI(res.user);
 syncAllDataFromCloud(res.user.uid);
 alert("Sign-in successful!");
 goHome();
 }).catch(err => {
 if (err.code === 'auth/wrong-password') {
 alert("Incorrect password! Please enter the correct password.");
 } else {
 alert("No account found for this Mobile Number / Email. Please click 'Register Workshop' to create your account.");
 }
 });
 } else {
 alert("No account found for this Mobile Number. Please click 'Register Workshop' to create your account.");
 }
 }
 }).catch(() => {
 alert("Account verification error. Please check your credentials or click 'Register Workshop'.");
 });
 return;
 }

 alert("No registered account found for this Mobile Number. Please click 'Register Workshop' to create your account.");
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
 const registeredPass = user ? user.password : (localStorage.getItem('sw_user_password') || "123456");

 const reqObj = {
 id: "RST_" + Date.now(),
 phone: cleanPhone,
 name: name,
 shop: shop,
 registered_password: registeredPass,
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
 const sash_tb_key = `Domal Sash Top/Bottom (${track_type})`;
 const sash_handle_key = `Domal Sash Handle (${track_type})`;
 const interlock_key = `Domal Interlock Clip (${track_type})`;

 [outer_key, sash_tb_key, sash_handle_key, interlock_key].forEach(k => {
 if (!dm_buckets[k]) dm_buckets[k] = [];
 });

 for (let q = 0; q < win_qty; q++) {
   dm_buckets[outer_key].push(w_in, w_in, h_in, h_in);
   for (let i = 0; i < s_c * 2; i++) dm_buckets[sash_tb_key].push(h_cut_in);
   for (let i = 0; i < han_qty; i++) dm_buckets[sash_handle_key].push(v_cut_in);
   for (let i = 0; i < int_qty; i++) dm_buckets[interlock_key].push(v_cut_in);
   if (has_mesh) {
     dm_buckets[sash_tb_key].push(mesh_w_in, mesh_w_in);
     dm_buckets[sash_handle_key].push(v_cut_in, v_cut_in);
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

 if (t_type.includes('2-Track')) { div = 2; g_c = 2; han_qty = 2; int_qty = 2; }
 else if (t_type.includes('3-Track')) { div = 3; g_c = 3; han_qty = 2; int_qty = 4; }
 else if (t_type.includes('4-Track')) { div = 4; g_c = 4; han_qty = 2; int_qty = 6; }
 else if (t_type.includes('Center Open')) { div = 4; g_c = 4; han_qty = 4; int_qty = 4; }

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
 hw_txt += `> Sliding Roller / Bearing: ${g_c * 2 * win_qty} pc\n`;
 hw_txt += `> Star Lock: ${(g_c >= 3 ? 2 : 1) * win_qty} pc\n> Rubber & Woolpile: Required\n`;

 const sl_aspec = getModuleAluLabel('sl');
 let alu_txt = `[Win #${sl_window_count}${loc_str} - H:${disp(h_in)} x W:${disp(w_in)} (${sys_type.split(' ')[0]})${qty_str}]\n`;
 alu_txt += `> Alu Spec: ${sl_aspec}\n`;
 alu_txt += `> Track Top: ${disp(w_in)} (${1 * win_qty} pc)\n`;
 alu_txt += `> Track Bottom: ${disp(w_in)} (${1 * win_qty} pc)\n`;
 alu_txt += `> Track Vertical: ${disp(h_in)} (${2 * win_qty} pc)\n`;
 alu_txt += `> Sash Top/Bottom: ${disp(tb_w)} (${g_c * 2 * win_qty} pc)\n`;
 alu_txt += `> Sash Handle: ${disp(handle_h)} (${han_qty * win_qty} pc)\n`;
 alu_txt += `> Sash Interlock: ${disp(handle_h)} (${int_qty * win_qty} pc)\n`;

 const sl_gspec = getModuleGlassLabel('sl');
 const glass_txt = `\n--- GLASS SIZES ---\n> Glass: ${sl_gspec}\n> Glass Size: ${disp(glass_h)} x ${disp(glass_w)} (${g_c * win_qty} pc)\n`;
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
 for (let q=0; q<win_qty; q++) { for (let i = 0; i < g_c * 2; i++) sl_buckets[sash_tb_key].push(tb_w); }
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

 function calculateCasement() {
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
 const overlap = 11;
 const glass_m_open = 65;
 const glass_m_fixed = 7;

 const outer_2 = series.includes("34") ? 56 : 46;
 const mullion = series.includes("34") ? 25 : 27;

 const rows = bot_gap_input_mm > 0 ? 2 : 1;
 const h_mullion_qty = rows === 2 ? 1 : 0;

 let bot_gap_h = 0, top_gap_h = 0;
 if (rows === 2) {
 bot_gap_h = bot_gap_input_mm;
 top_gap_h = h_mm - outer_2 - mullion - bot_gap_h;
 } else {
 top_gap_h = h_mm - outer_2;
 }

 const top_v_mullion_qty = top_cols - 1;
 const bot_v_mullion_qty = Math.max(0, bot_cols - 1);

 const top_gap_w = (w_mm - outer_2 - (top_v_mullion_qty * mullion)) / top_cols;
 let bot_gap_w = 0;
 if (bot_cols > 0) {
 bot_gap_w = (w_mm - outer_2 - (bot_v_mullion_qty * mullion)) / bot_cols;
 }

 cc_window_count += 1;
 const disp = (mmVal) => is_mm ? toMmStr(mmVal / 25.4) : toFractionInch(mmVal / 25.4);
 const unit_str = is_mm ? "mm" : "Inch";
 const win_loc = document.getElementById('cc_loc') ? document.getElementById('cc_loc').value.trim() : "";
 const win_qty = document.getElementById('cc_qty') ? Math.max(1, parseInt(document.getElementById('cc_qty').value) || 1) : 1;
 const loc_str = win_loc ? ` [${win_loc}]` : "";
 const qty_str = win_qty > 1 ? ` (Qty: ${win_qty} Windows)` : "";
 const total_sash_qty = (top_open + bot_open) * win_qty;

 const cc_aspec = getModuleAluLabel('cc');
 let out_txt = `[${series} Win #${cc_window_count}${loc_str} | Size: ${disp(h_mm)} x ${disp(w_mm)}${qty_str}]\n`;
 out_txt += `> Alu Spec: ${cc_aspec}\n`;
 out_txt += "--- 1. OUTER FRAME & MULLIONS ---\n";
 out_txt += `> Outer Vertical: ${disp(h_mm)} (${2 * win_qty} pc)\n> Outer Horizontal: ${disp(w_mm)} (${2 * win_qty} pc)\n`;
 for (let q = 0; q < win_qty; q++) {
   cc_buckets["Casement Outer"].push(h_mm / 25.4, h_mm / 25.4, w_mm / 25.4, w_mm / 25.4);
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
 out_txt += `[OPENABLE SASH | Qty: ${top_open * win_qty} | Clear Gap: ${disp(top_gap_h)} x ${disp(w_gap_open)}]\n`;
 const s1_h = top_gap_h + overlap, s1_w = w_gap_open + overlap;
 const g_h = s1_h - glass_m_open, g_w = s1_w - glass_m_open;
 out_txt += ` > Z-Handle Sash: ${disp(s1_h)} x ${disp(s1_w)} (${top_open * win_qty} Sash)\n > Glass (${cc_gspec}): ${disp(g_h)} x ${disp(g_w)} (${top_open * win_qty} pc)\n`;
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
 out_txt += `[OPENABLE SASH | Qty: ${bot_open * win_qty} | Clear Gap: ${disp(bot_gap_h)} x ${disp(bot_gap_w)}]\n`;
 const s1_h = bot_gap_h + overlap, s1_w = bot_gap_w + overlap;
 const g_h = s1_h - glass_m_open, g_w = s1_w - glass_m_open;
 out_txt += ` > Z-Handle Sash: ${disp(s1_h)} x ${disp(s1_w)} (${bot_open * win_qty} Sash)\n > Glass (${cc_gspec}): ${disp(g_h)} x ${disp(g_w)} (${bot_open * win_qty} pc)\n`;
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
 var pt_part_count = 0;
 var pt_buckets = { "Single Glazing": [], "Double Glazing": [], "Door Sash": [] };
 var pt_glass_dict = {};

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
  const raw_h = safeEval(document.getElementById('pt_h').value);
  const raw_w = safeEval(document.getElementById('pt_w').value);
  if (raw_h === 0 || raw_w === 0) {
    alert("Please enter Total Wall Height (H) and Width (W).");
    return;
  }

  const is_mm = document.getElementById('pt_unit').value.includes('Millimeter');
  const h = is_mm ? raw_h / 25.4 : raw_h;
  const w = is_mm ? raw_w / 25.4 : raw_w;
  const cols = Math.max(1, parseInt(safeEval(document.getElementById('pt_cols').value)) || 3);
  const rows = Math.max(1, parseInt(safeEval(document.getElementById('pt_rows').value)) || 3);
  const halfWallH = parseFloat(document.getElementById('pt_halfwall_h')?.value) || 36;
  const doorH = parseFloat(document.getElementById('pt_dh')?.value) || 84;

  const disp = (v) => is_mm ? toMmStr(v) : toFractionInch(v);
  pt_part_count += 1;

  const tube_face = parseFloat(document.getElementById('pt_tube_face')?.value) || 1.5;
  const bot_face = parseFloat(document.getElementById('pt_bot_face')?.value) || 1.5;
  const tube_label = getPartitionTubeLabel();
  const sg_key = `Single Glazing [${tube_label}]`;
  const dg_key = `Double Glazing [${tube_label}]`;
  if (!pt_buckets[sg_key]) pt_buckets[sg_key] = [];
  if (!pt_buckets[dg_key]) pt_buckets[dg_key] = [];

  ensurePtColConfigsCount(cols);
  ensurePtRowConfigsCount(rows);
  const total_open_w = Math.max(12, w - ((cols + 1) * tube_face));
  const colWidths = resolvePartitionColWidths(total_open_w, cols);
  const frame_deduct = bot_face + (rows * tube_face);
  const total_open_h = Math.max(10, h - frame_deduct);
  const rowHeights = resolvePartitionRowHeights(total_open_h, rows, colWidths[0] - 0.25);
  const pt_gspec = getModuleGlassLabel('pt');

  let out = `[Partition Studio #${pt_part_count} (${disp(h)} x ${disp(w)}) | ${cols} Bays]\n`;
  out += `> Jindal Tube: ${tube_label} | Alu Spec: ${getModuleAluLabel('pt')}\n`;
  out += `-----------------------------------\n`;
  out += `1. MAIN OUTER & VERTICAL FRAME CUTTING\n`;
  out += `-----------------------------------\n`;
  const outer_v = h, inter_v = h - (tube_face + bot_face), outer_h = w - (2 * tube_face);
  out += `> Outer Verticals (${tube_label}): ${disp(outer_v)} (2 pc)\n`;
  out += `> Top Full Horizontal (${tube_label}): ${disp(outer_h)} (1 pc)\n`;
  pt_buckets[sg_key].push(outer_v, outer_v, outer_h);
  if (cols > 1) {
    out += `> Bay Divider Verticals (${tube_label}): ${disp(inter_v)} (${cols - 1} pc)\n`;
    for (let i = 0; i < cols - 1; i++) pt_buckets[dg_key].push(inter_v);
  }

  let totalGlassPcs = 0, totalGlassSqFt = 0;
  let totalAcpPcs = 0, totalAcpSqFt = 0;
  let totalJaliPcs = 0, totalJaliSqFt = 0;

  out += `\n-----------------------------------\n`;
  out += `2. BAY-BY-BAY CUTTING (LEFT TO RIGHT)\n`;
  out += `-----------------------------------\n`;

  for (let c = 0; c < cols; c++) {
    const bayW = colWidths[c];
    const bType = pt_col_configs[c].type;
    const bLbl = `Bay #${c + 1}`;
    const bOpt = PT_BAY_OPTIONS.find(o => o.val === bType);
    out += `\n[${bLbl}: ${bOpt ? bOpt.label : bType} | Clear Width: ${disp(bayW)}]\n`;

    if (bType.indexOf('DOOR_') === 0) {
      const dPalla = bType.indexOf('DOOR_2') === 0 ? 2 : 1;
      const dV = Math.max(24, doorH - 1.75);
      const leafW = dPalla === 2 ? Math.max(12, (bayW - 0.5) / 2.0) : Math.max(14, bayW - 0.25);
      const railW = Math.max(6, leafW - 3.5);
      const pW = railW + 0.75;
      out += `  > Door Top Transom Tube: ${disp(bayW)} (1 pc)\n`;
      out += `  > Door Stiles: ${disp(dV)} (${2 * dPalla} pc) | Rails: ${disp(railW)} (${3 * dPalla} pc)\n`;
      pt_buckets[dg_key].push(bayW);
      pt_buckets["Door Sash"].push(dV, dV, railW, railW);

      // Door Top Transom Glass
      const tH = Math.max(4, h - doorH - (2 * tube_face) - 0.25);
      const tW = Math.max(4, bayW - 0.25);
      out += `  > [Door Top Glass]: ${disp(tH)} x ${disp(tW)} (1 pc)\n`;
      pt_glass_dict[`${disp(tH)} x ${disp(tW)} (${bLbl} Door Top) || ${pt_gspec}`] = (pt_glass_dict[`${disp(tH)} x ${disp(tW)} (${bLbl} Door Top) || ${pt_gspec}`] || 0) + 1;
      totalGlassPcs += 1; totalGlassSqFt += (tH * tW) / 144.0;

      if (bType.indexOf('JGA') !== -1) {
        const jH = 14.0, aH = 29.75, gH = Math.max(10, dV - 11.5 - jH - aH);
        out += `  > [Door Top Jali]: ${disp(jH)} x ${disp(pW)} (${dPalla} pc)\n`;
        out += `  > [Door Mid Glass]: ${disp(gH)} x ${disp(pW)} (${dPalla} pc)\n`;
        out += `  > [Door Bot ACP]: ${disp(aH)} x ${disp(pW)} (${dPalla} pc)\n`;
        totalJaliPcs += dPalla; totalJaliSqFt += (jH * pW * dPalla) / 144.0;
        pt_glass_dict[`${disp(gH)} x ${disp(pW)} (${bLbl} Door Glass) || ${pt_gspec}`] = (pt_glass_dict[`${disp(gH)} x ${disp(pW)} (${bLbl} Door Glass) || ${pt_gspec}`] || 0) + dPalla;
        totalGlassPcs += dPalla; totalGlassSqFt += (gH * pW * dPalla) / 144.0;
        pt_acp_list.push({ rowTag: bLbl + ' Door ACP', cutStr: `${disp(aH)} x ${disp(pW)}`, h_in: aH, w_in: pW, qty: dPalla, buyLabel: '', areaSqFt: (aH * pW * dPalla) / 144.0 });
        totalAcpPcs += dPalla; totalAcpSqFt += (aH * pW * dPalla) / 144.0;
      } else if (bType.indexOf('JALI') !== -1) {
        const fullJH = Math.max(12, dV - 6.5);
        out += `  > [Door Full Jali/Mesh]: ${disp(fullJH)} x ${disp(pW)} (${dPalla} pc)\n`;
        totalJaliPcs += dPalla; totalJaliSqFt += (fullJH * pW * dPalla) / 144.0;
      } else {
        const aH = 29.75, gH = Math.max(12, dV - 9.0 - aH);
        out += `  > [Door Top Glass]: ${disp(gH)} x ${disp(pW)} (${dPalla} pc)\n`;
        out += `  > [Door Bot ACP]: ${disp(aH)} x ${disp(pW)} (${dPalla} pc)\n`;
        pt_glass_dict[`${disp(gH)} x ${disp(pW)} (${bLbl} Door Glass) || ${pt_gspec}`] = (pt_glass_dict[`${disp(gH)} x ${disp(pW)} (${bLbl} Door Glass) || ${pt_gspec}`] || 0) + dPalla;
        totalGlassPcs += dPalla; totalGlassSqFt += (gH * pW * dPalla) / 144.0;
        pt_acp_list.push({ rowTag: bLbl + ' Door ACP', cutStr: `${disp(aH)} x ${disp(pW)}`, h_in: aH, w_in: pW, qty: dPalla, buyLabel: '', areaSqFt: (aH * pW * dPalla) / 144.0 });
        totalAcpPcs += dPalla; totalAcpSqFt += (aH * pW * dPalla) / 144.0;
      }
    } else if (bType.indexOf('HW_') === 0) {
      const topOpenH = Math.max(12, h - halfWallH - (2 * tube_face));
      out += `  > Half Wall Height: ${disp(halfWallH)} | Top Frame Opening: ${disp(topOpenH)} x ${disp(bayW)}\n`;
      pt_buckets[dg_key].push(bayW); // Base tube on half wall
      if (bType === 'HW_GLASS') {
        const gH = Math.max(4, topOpenH - 0.25), gW = Math.max(4, bayW - 0.25);
        out += `  > [Above Half-Wall Glass]: ${disp(gH)} x ${disp(gW)} (1 pc)\n`;
        pt_glass_dict[`${disp(gH)} x ${disp(gW)} (${bLbl} HalfWall Glass) || ${pt_gspec}`] = (pt_glass_dict[`${disp(gH)} x ${disp(gW)} (${bLbl} HalfWall Glass) || ${pt_gspec}`] || 0) + 1;
        totalGlassPcs += 1; totalGlassSqFt += (gH * gW) / 144.0;
      } else if (bType === 'HW_HOPEN_2') {
        const sH = Math.max(6, topOpenH - 0.25), sW = Math.max(6, (bayW - 0.375) / 2.0);
        const wgH = Math.max(4, sH - 2.5), wgW = Math.max(4, sW - 2.5);
        out += `  > H-Sec Openable Sash (2-Leaf): ${disp(sH)} x ${disp(sW)} (2 leaves)\n`;
        out += `  > [Window Glass]: ${disp(wgH)} x ${disp(wgW)} (2 pc)\n`;
        pt_glass_dict[`${disp(wgH)} x ${disp(wgW)} (${bLbl} H-Sec Win) || ${pt_gspec}`] = (pt_glass_dict[`${disp(wgH)} x ${disp(wgW)} (${bLbl} H-Sec Win) || ${pt_gspec}`] || 0) + 2;
        totalGlassPcs += 2; totalGlassSqFt += (wgH * wgW * 2) / 144.0;
      } else {
        const trk = (bType === 'HW_SLIDE_3T') ? 3 : 2;
        const gPcs = (trk === 3) ? 2 : 2;
        const slH = Math.max(6, topOpenH - 2.25);
        const slW = Math.max(6, ((bayW - 1.5) + (trk === 3 ? 2.5 : 1.5)) / trk);
        const wgH = Math.max(4, slH - 3.25), wgW = Math.max(4, slW - 2.0);
        out += `  > ${trk}-Track Sliding Window: ${disp(topOpenH)} x ${disp(bayW)}\n`;
        out += `  > [Sliding Glass]: ${disp(wgH)} x ${disp(wgW)} (${gPcs} pc)${trk === 3 ? ' + 1 Jali Shutter' : ''}\n`;
        pt_glass_dict[`${disp(wgH)} x ${disp(wgW)} (${bLbl} ${trk}T Win) || ${pt_gspec}`] = (pt_glass_dict[`${disp(wgH)} x ${disp(wgW)} (${bLbl} ${trk}T Win) || ${pt_gspec}`] || 0) + gPcs;
        totalGlassPcs += gPcs; totalGlassSqFt += (wgH * wgW * gPcs) / 144.0;
        if (trk === 3) { totalJaliPcs += 1; totalJaliSqFt += (wgH * wgW) / 144.0; }
      }
    } else if (bType.indexOf('WIN_') === 0) {
      const botAcpH = 29.75, topGH = 14.75;
      const winH = Math.max(16, h - botAcpH - topGH - (4 * tube_face));
      const bayCutW = Math.max(4, bayW - 0.25);
      out += `  > [Top Glass]: ${disp(topGH)} x ${disp(bayCutW)} (1 pc) | [Bot ACP]: ${disp(botAcpH)} x ${disp(bayCutW)} (1 pc)\n`;
      pt_glass_dict[`${disp(topGH)} x ${disp(bayCutW)} (${bLbl} Top Glass) || ${pt_gspec}`] = (pt_glass_dict[`${disp(topGH)} x ${disp(bayCutW)} (${bLbl} Top Glass) || ${pt_gspec}`] || 0) + 1;
      totalGlassPcs += 1; totalGlassSqFt += (topGH * bayCutW) / 144.0;
      pt_acp_list.push({ rowTag: bLbl + ' Bot ACP', cutStr: `${disp(botAcpH)} x ${disp(bayCutW)}`, h_in: botAcpH, w_in: bayCutW, qty: 1, buyLabel: '', areaSqFt: (botAcpH * bayCutW) / 144.0 });
      totalAcpPcs += 1; totalAcpSqFt += (botAcpH * bayCutW) / 144.0;

      if (bType === 'WIN_HOPEN_2') {
        const sH = Math.max(6, winH - 0.25), sW = Math.max(6, (bayW - 0.375) / 2.0);
        const wgH = Math.max(4, sH - 2.5), wgW = Math.max(4, sW - 2.5);
        out += `  > [Middle H-Sec Openable Window (2-Leaf)]: Glass ${disp(wgH)} x ${disp(wgW)} (2 pc)\n`;
        pt_glass_dict[`${disp(wgH)} x ${disp(wgW)} (${bLbl} H-Sec Win) || ${pt_gspec}`] = (pt_glass_dict[`${disp(wgH)} x ${disp(wgW)} (${bLbl} H-Sec Win) || ${pt_gspec}`] || 0) + 2;
        totalGlassPcs += 2; totalGlassSqFt += (wgH * wgW * 2) / 144.0;
      } else {
        const trk = (bType === 'WIN_SLIDE_3T') ? 3 : 2;
        const slH = Math.max(6, winH - 2.25);
        const slW = Math.max(6, ((bayW - 1.5) + (trk === 3 ? 2.5 : 1.5)) / trk);
        const wgH = Math.max(4, slH - 3.25), wgW = Math.max(4, slW - 2.0);
        out += `  > [Middle ${trk}-Track Sliding Window]: Glass ${disp(wgH)} x ${disp(wgW)} (2 pc)${trk === 3 ? ' + 1 Jali' : ''}\n`;
        pt_glass_dict[`${disp(wgH)} x ${disp(wgW)} (${bLbl} ${trk}T Win) || ${pt_gspec}`] = (pt_glass_dict[`${disp(wgH)} x ${disp(wgW)} (${bLbl} ${trk}T Win) || ${pt_gspec}`] || 0) + 2;
        totalGlassPcs += 2; totalGlassSqFt += (wgH * wgW * 2) / 144.0;
        if (trk === 3) { totalJaliPcs += 1; totalJaliSqFt += (wgH * wgW) / 144.0; }
      }
    } else {
      // Standard Partition Bay (rows from Top to Bottom)
      const cutW = Math.max(4, bayW - 0.25);
      for (let t = 0; t < rows - 1; t++) pt_buckets[dg_key].push(bayW);
      for (let r = rows - 1; r >= 0; r--) {
        const rName = getRowShortEnglishName(r, rows);
        const mat = pt_cell_overrides[r + '_' + c] || (pt_row_configs[r] ? pt_row_configs[r].mat : 'GLASS');
        const cutH = Math.max(2, rowHeights[r] - 0.25);
        if (mat === 'ACP') {
          out += `  > [${rName} - ACP]: ${disp(cutH)} x ${disp(cutW)} (1 pc)\n`;
          pt_acp_list.push({ rowTag: bLbl + ' ' + rName, cutStr: `${disp(cutH)} x ${disp(cutW)}`, h_in: cutH, w_in: cutW, qty: 1, buyLabel: '', areaSqFt: (cutH * cutW) / 144.0 });
          totalAcpPcs += 1; totalAcpSqFt += (cutH * cutW) / 144.0;
        } else if (mat === 'JALI') {
          out += `  > [${rName} - Jali/Mesh]: ${disp(cutH)} x ${disp(cutW)} (1 pc)\n`;
          totalJaliPcs += 1; totalJaliSqFt += (cutH * cutW) / 144.0;
        } else {
          out += `  > [${rName} - Glass]: ${disp(cutH)} x ${disp(cutW)} (1 pc)\n`;
          pt_glass_dict[`${disp(cutH)} x ${disp(cutW)} (${bLbl} ${rName}) || ${pt_gspec}`] = (pt_glass_dict[`${disp(cutH)} x ${disp(cutW)} (${bLbl} ${rName}) || ${pt_gspec}`] || 0) + 1;
          totalGlassPcs += 1; totalGlassSqFt += (cutH * cutW) / 144.0;
        }
      }
    }
  }

  out += `\n-----------------------------------\n`;
  out += `3. TOTAL PURCHASE SUMMARY\n`;
  out += `-----------------------------------\n`;
  out += `• TOTAL GLASS: ${totalGlassPcs} Pcs (${totalGlassSqFt.toFixed(2)} Sq.Ft) -> 2. GLASS PDF + QR\n`;
  if (totalAcpPcs > 0) {
    const packedSheets = packPanelsOn4x8Sheets(pt_acp_list);
    out += `• TOTAL ACP BOARD: ${packedSheets.length} Sheet(s) (${totalAcpPcs} Cut Pcs | ${totalAcpSqFt.toFixed(1)} Sq.Ft) -> 3. ALU PURCHASE & 5. DRAWING PDF\n`;
  }
  if (totalJaliPcs > 0) {
    out += `• TOTAL JALI / MESH: ${totalJaliPcs} Pcs (${totalJaliSqFt.toFixed(2)} Sq.Ft)\n`;
  }

  const prevOut = document.getElementById('pt_out').textContent;
  document.getElementById('pt_out').textContent = out + "===================================\n\n" + prevOut;
  document.getElementById('pt_mat_out').textContent = generateMaterialList(pt_buckets);
  renderSheetLayoutBoxUI('pt_sheet_layout_box', pt_acp_list, 'Partition');
  renderPartitionStudioUI();
}

 function clearPartition() {
 pt_part_count = 0;
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
 function exportCutPdf(filename, title, outId, matId) {
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
    const num = 1000 + (Math.abs(hash) % 9000);
    return String(num);
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
                payload: swgPayload,
                createdAt: Date.now()
            }).catch(() => {});
        }
    } catch (e) {}
    try {
        const rtdb = window.fbRtdb || (window.firebase && firebase.apps.length && firebase.database ? firebase.database() : null);
        if (rtdb) {
            rtdb.ref('glass_orders/' + shortId).set({
                code: shortId,
                payload: swgPayload,
                createdAt: Date.now()
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
        if (map[cleanId] && map[cleanId].payload) return map[cleanId].payload;
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
  if (/domal/i.test(title)) modPrefix = 'dm';
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

 billItems.push({
 type: w_type, location: loc, color: color, thickness: thick, glass_thick: g_thick,
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

  const tableData = effectiveItems.map((itm, i) => [
    i + 1,
    `${itm.location ? '['+itm.location+'] ' : ''}${itm.type}\nAlu Spec: ${itm.thickness} | ${itm.color}\nGlass / Panel: ${itm.glass_thick} ${itm.glass_type}${(itm.toughened && !String(itm.glass_type).includes('Toughened')) ? ' [TOUGHENED]' : ''}\nSize: ${itm.h} x ${itm.w} ${itm.unit} @ Rs.${itm.rate}/Sq.Ft`,
    itm.qty,
    itm.area.toFixed(1),
    `Rs ${itm.rate}`,
    `Rs ${itm.price.toFixed(2)}`
  ]);

  const grand_total = effectiveItems.reduce((a, b) => a + b.price, 0);
  const [discount, gst_pct] = getDiscountAndGst();
  const extra_charge = safeEval(document.getElementById('q_extra_charge') ? document.getElementById('q_extra_charge').value : "0");
  const net_total = Math.max(0, grand_total - discount);
  const gst_amount = net_total * (gst_pct / 100);
  const final_total = net_total + gst_amount + extra_charge;
  const advance_paid = safeEval(document.getElementById('q_advance') ? document.getElementById('q_advance').value : "0");
  const due_amount = Math.max(0, final_total - advance_paid);

  doc.autoTable({
    startY: 69,
    head: [['SN', 'Description & Specifications', 'Qty', 'Sq.Ft', 'Rate', 'Amount']],
    body: tableData,
    theme: 'grid',
    headStyles: { fillColor: [74, 20, 140], textColor: [255, 255, 255], fontStyle: 'bold' },
    styles: { fontSize: 8.5 }
  });

  const finalY = doc.lastAutoTable.finalY + 8;
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(9);
  doc.text(`Sub Total: Rs ${grand_total.toFixed(2)}`, 135, finalY);
  if (discount > 0) doc.text(`Discount: -Rs ${discount.toFixed(2)}`, 135, finalY + 5);
  if (gst_pct > 0) doc.text(`GST (${gst_pct}%): +Rs ${gst_amount.toFixed(2)}`, 135, finalY + 10);
  if (extra_charge > 0) doc.text(`Transport/Labor: +Rs ${extra_charge.toFixed(2)}`, 135, finalY + 15);

  doc.setFont("helvetica", "bold");
  doc.text(`GRAND TOTAL: Rs ${final_total.toFixed(2)}`, 135, finalY + 21);
  doc.setFont("helvetica", "normal");
  doc.text(`Advance Paid: -Rs ${advance_paid.toFixed(2)}`, 135, finalY + 26);
  const incPrev = document.getElementById('q_include_prev_due') ? document.getElementById('q_include_prev_due').checked : true;
  const pDue = incPrev ? (activeCustomerPreviousDue || 0) : 0;
  const netPayableDue = due_amount + pDue;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(200, 0, 0);
  doc.text(`CURRENT BILL DUE: Rs ${due_amount.toFixed(2)}`, 135, finalY + 32);

  if (pDue > 0) {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 0, 0);
    doc.text(`Previous Khata Due: +Rs ${pDue.toFixed(2)}`, 135, finalY + 37.5);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(200, 0, 0);
    doc.text(`TOTAL OUTSTANDING: Rs ${netPayableDue.toFixed(2)}`, 135, finalY + 43.5);
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
  const termsStr = (remarks_note ? "Note: " + remarks_note + " | " : "") + (pay_terms || "TERMS: 50% Advance with order. Balance on delivery.");
  doc.text(termsStr, 14, footerY);
  doc.text(`Customer Signature: ___________________ Authorized Signature (${shop_name}): ___________________`, 14, footerY + 8);


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
  if (screenName === 'partition') {
    setTimeout(function() { try { renderPartitionStudioUI(); } catch(e){} }, 20);
  } else if (screenName === 'door') {
    setTimeout(function() { try { renderDoorRowBuilder(); } catch(e){} }, 20);
  } else if (screenName === 'casement') {
    setTimeout(function() { try { renderCasementSectionDesigner(); } catch(e){} }, 20);
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
  let planStr = "Karigar Plan (Single User - Rs. 99 / 30 Days)";
  let amount = 99;

  if (plan === "Karigar_Monthly") {
    planKey = "KARIGAR_1M";
    planStr = "Karigar Plan (Single User - Rs. 99 / 30 Days)";
    amount = 99;
  } else if (plan === "Karigar_3M") {
    planKey = "KARIGAR_3M";
    planStr = "Karigar Plan (Single User - Rs. 280 / 90 Days)";
    amount = 280;
  } else if (plan === "Karigar_6M") {
    planKey = "KARIGAR_6M";
    planStr = "Karigar Plan (Single User - Rs. 550 / 180 Days)";
    amount = 550;
  } else if (plan === "Karigar_Annual") {
    planKey = "KARIGAR_1Y";
    planStr = "Karigar Plan (Single User - Rs. 799 / 365 Days)";
    amount = 799;
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
    planStr = "Smart Worker PRO Membership (Rs. 99 / 30 Days)";
    amount = 99;
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
    nav_home: "Home",
    nav_dashboard: "Dashboard",
    nav_records: "Records",
    nav_profile: "Profile",
    nav_login: "Login",
    welcome_prefix: "Welcome,",
    sec_fab_systems: "Window & Door Systems",
    sec_business_billing: "Business & Billing",
    mod_khata_title: "Site Measurement Khata",
    mod_khata_sub: "Digital Measurement Book: Room Tracking, Auto Labor & Billing",
    mod_domal: "Domal Window",
    mod_sliding: "Sliding Window",
    mod_casement: "Custom Casement",
    mod_partition: "Partition & Door",
    mod_door: "Simple Door Option",
    mod_quotation: "Pro Quotation",
    mod_ceiling: "Ceiling Estimator",
    btn_open: "OPEN", btn_edit: "EDIT",
    sub_domal: "27x65 / 45mm Section Cutting",
    sub_sliding: "2, 3, 4 Track & Interlock Cutting",
    sub_casement: "Z-Section & Openable Window",
    sub_partition: "Office Partition & Sheet Cutting",
    sub_door: "Hinge Door & Bathroom Shutter",
    sub_ceiling: "False Ceiling Grid & Perimeter",
    sub_quotation: "Client GST Invoice & PDF Bill",
    sub_customer_khata: "Client Balance & Ledger Records",
    mod_customer_khata: "Customer Ledger",
    mod_calculator: "Smart Calculator",
    sub_calculator: "Standard, Scientific, Unit Converter & Discount",
    mod_custom_series: "Custom & New Series",
    sub_custom_series: "Folding, Glass Door, Jasmine & Custom Profiles",
    lbl_select_series: "Select Product / Series:",
    lbl_panels: "Number of Shutters / Panels:",
    lbl_door_palla: "Door Shutter (Palla):",
    btn_clear: "Clear",
    btn_calculate: "+ Calculate",
    btn_save: "Save",
    btn_cut_pdf: "Cutting PDF",
    btn_glass_pdf: "Glass PDF",
    btn_order_slip: "Order Slip",
    lbl_cutting_sizes: "Cutting Sizes:",
    lbl_mat_purchase: "Material Purchase (Auto-Optimized):",
    lbl_height: "Height:",
    lbl_width: "Width:",
    lbl_qty: "Quantity (Pcs):",
    lbl_unit: "Measurement Unit:",
    lbl_room_tag: "Room / Location Tag:",
    btn_add_khata: "+ Add to Site Khata",
    btn_process_all: "⚡ Process All Cutting Together",
    btn_khata_master_pdf: "📄 Generate Master Site Khata PDF",
    btn_client_bill: "Client Billing",
    btn_generate_bill: "Generate Bill",
    btn_save_bill: "Save Bill",
    btn_pdf_bill: "Download PDF Bill",
    lbl_client_details: "Client & Invoice Details",
    lbl_add_item: "Add Bill Item",
    lbl_rate_sqft: "Rate (Rs / Sq.Ft):",
    lbl_advance: "Advance Paid (Rs):",
    lbl_due_balance: "Balance Due:",
    lbl_total_sales: "Total Sales",
    lbl_purchases: "Material Purchases",
    lbl_balance: "Net Balance",
    btn_add_purchase: "+ Add Material Purchase",
    btn_update_profile: "Update Profile",
    btn_save_settings: "Save All Settings",
    auth_heading: "Smart Worker Pro",
    auth_subheading: "Aluminium & uPVC Fabrication Management",
    tab_signin: "Sign In (Login)",
    tab_register: "Workshop Registration",
    btn_signin_acc: "Sign In to Account",
    btn_create_acc: "Create Account & Sync",
    btn_guest_demo: "Continue in Guest Mode →",
    lbl_panel_mode: "Panel Cutting & 4'x8' Optimization:",
    opt_panel_4x8: "✨ 4'x8' Sheet Optimized (Equal Bottom & Middle, Small Top Header - Zero Waste)",
    opt_panel_3ft: "Bottom 3 ft (36 in) ACP, Middle 3 ft (36 in) Glass, Top Header",
    opt_panel_2_5ft: "Bottom 2.5 ft (30 in) ACP, Middle 2.5 ft (30 in) Glass, Top Header",
    opt_panel_equal: "Standard Equal Divide",
    keypad_title: "Smart Measurement Keypad",
    keypad_ok: "Apply OK",
    keypad_numbers: "Numbers",
    keypad_fractions: "Fractions (16 Suta Steps)",
    suta_1: "(1 Suta)", suta_2: "(2 Suta)", suta_3: "(3 Suta)", suta_4: "(4 Suta)", suta_5: "(5 Suta)", suta_6: "(6 Suta)", suta_7: "(7 Suta)"
  }
};
I18N_DICT.bn = I18N_DICT.en;
I18N_DICT.hi = I18N_DICT.en;

let currentAppLang = 'en';
localStorage.setItem('sw_lang', 'en');

function changeLanguage(lang) {
  currentAppLang = 'en';
  localStorage.setItem('sw_lang', 'en');
  const selector = document.getElementById('langSelector');
  if (selector) selector.value = 'en';
  applyLanguageTranslations('en');
}

function applyLanguageTranslations(lang) {
  lang = 'en';
  currentAppLang = 'en';
  const sEn = document.getElementById('setLangEn');
  const badge = document.getElementById('currentLangBadge');
  if (sEn) sEn.classList.add('active');
  if (badge) badge.textContent = 'English';

  const d = I18N_DICT['en'];

  const titleElem = document.getElementById('titleText');
  if (titleElem) titleElem.textContent = d.title_app;

  const secHeaders = document.querySelectorAll('.menu-section-title');
  if (secHeaders.length >= 2) {
    secHeaders[0].textContent = d.sec_fab_systems;
    secHeaders[1].textContent = d.sec_business_billing;
  }

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

  // Translate all data-i18n elements
 document.querySelectorAll('[data-i18n]').forEach(el => {
 const key = el.getAttribute('data-i18n');
 if (d[key]) {
 el.textContent = d[key];
 }
 });

 // Update selector value cleanly
 const selector = document.getElementById('langSelector');
 if (selector) selector.value = lang;
 }


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
                if (k.indexOf('v83') === -1) caches.delete(k);
    try { renderDoorRowBuilder(); renderPartitionStudioUI(); renderCasementSectionDesigner(); } catch(e){}
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
    if (!groups[p]) groups[p] = [];
    groups[p].push(it);
  });
  return groups;
}

function recalculateBarCuttingPlan() {
  var box = document.getElementById('bc_visual_layout_box');
  var outEl = document.getElementById('bc_out');
  if (!bc_items_list.length) {
    if (box) { box.style.display = 'none'; box.innerHTML = ''; }
    if (outEl) outEl.textContent = '';
    return;
  }

  var stockLenIn = parseFloat(document.getElementById('bc_stock_len')?.value) || 144.0;
  var stockFt = Math.round(stockLenIn / 12);
  var kerfIn = parseFloat(document.getElementById('bc_kerf')?.value);
  if (isNaN(kerfIn)) kerfIn = 0.125;
  var isMm = document.getElementById('bc_unit') && document.getElementById('bc_unit').value.indexOf('Millimeter') !== -1;
  var disp = function(v) { return isMm ? toMmStr(v) : toFractionInch(v); };

  var groups = groupBarItemsByProfile(bc_items_list);
  var profNames = Object.keys(groups);
  var palette = ['#0284c7', '#0f766e', '#7c3aed', '#2563eb', '#0891b2', '#059669'];

  var grandTotalBars = 0;
  var grandUsedLen = 0;
  var grandStockLen = 0;
  var textOut = "========================================\n";
  textOut += stockFt + " FT (" + Math.round(stockLenIn) + '") ALUMINIUM BAR CUTTING PLAN\n';
  textOut += "Saw Kerf: " + (kerfIn > 0 ? (isMm ? toMmStr(kerfIn) : toFractionInch(kerfIn)) : "0") + "\n";
  textOut += "========================================\n";

  var html = '<div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1.5px solid #ccfbf1; padding-bottom:8px; margin-bottom:10px; flex-wrap:wrap; gap:6px;">';
  html += '<div style="font-size:0.84rem; font-weight:800; color:#0f766e;"><i class="fa-solid fa-ruler-horizontal"></i> ' + stockFt + ' FT BAR CUTTING VISUAL MAP</div>';
  html += '<span style="font-size:0.72rem; font-weight:800; background:#ccfbf1; color:#0f766e; padding:3px 9px; border-radius:99px;">Stock: ' + stockFt + ' Ft (' + Math.round(stockLenIn) + '")</span>';
  html += '</div>';

  profNames.forEach(function(pName, pIdx) {
    var bars = pack1DBarsBestFit(groups[pName], stockLenIn, kerfIn);
    var pStockTotal = bars.length * stockLenIn;
    var pUsedTotal = bars.reduce(function(s, b) { return s + b.used; }, 0);
    var pWastePct = pStockTotal > 0 ? (((pStockTotal - pUsedTotal) / pStockTotal) * 100).toFixed(1) : '0.0';
    var pUtilPct = (100 - parseFloat(pWastePct)).toFixed(1);

    grandTotalBars += bars.length;
    grandUsedLen += pUsedTotal;
    grandStockLen += pStockTotal;

    textOut += "\n[" + pName.toUpperCase() + "] -> BUY: " + bars.length + " Full Bar(s) of " + stockFt + " Ft | Used: " + pUtilPct + "% | Waste: " + pWastePct + "%\n";

    html += '<div style="margin-bottom:14px; background:#f8fafc; border:1px solid #cbd5e1; border-radius:10px; padding:9px;">';
    html += '<div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:4px; margin-bottom:8px;">';
    html += '<span style="font-size:0.78rem; font-weight:800; color:#0f172a;">' + (pIdx + 1) + '. ' + pName + '</span>';
    html += '<span style="font-size:0.72rem; font-weight:800; color:#0f766e; background:#dcfce7; padding:2px 8px; border-radius:8px;">Buy ' + bars.length + ' Bar' + (bars.length > 1 ? 's' : '') + ' (' + stockFt + ' Ft) • ' + pUtilPct + '% Used</span>';
    html += '</div>';

    bars.forEach(function(bar) {
      var cutListStr = bar.cuts.map(function(c) { return disp(c.len); }).join(' + ');
      textOut += "  Bar #" + bar.barNo + ": " + cutListStr + "  |  Offcut: " + disp(bar.remaining) + "\n";

      var svgW = 500, svgH = 38;
      var scale = (svgW - 12) / stockLenIn;
      html += '<div style="margin-bottom:8px;">';
      html += '<div style="display:flex; justify-content:space-between; font-size:0.69rem; font-weight:700; color:#334155; margin-bottom:2px;">';
      html += '<span><b>Bar #' + bar.barNo + '</b> (' + bar.cuts.length + ' cuts)</span>';
      html += '<span style="color:#b45309;">Leftover / Offcut: ' + disp(bar.remaining) + '</span>';
      html += '</div>';
      html += '<svg viewBox="0 0 ' + svgW + ' ' + svgH + '" style="width:100%; height:auto; background:#ffffff; border:1px solid #94a3b8; border-radius:6px; display:block;">';
      // Full bar amber background (represents offcut/waste)
      html += '<rect x="6" y="4" width="' + (svgW - 12) + '" height="30" rx="3" fill="#fef3c7" stroke="#0f172a" stroke-width="1.2"/>';

      bar.cuts.forEach(function(c, ci) {
        var rx = 6 + (c.offset * scale);
        var rw = Math.max(4, Math.min(svgW - 6 - rx, c.len * scale));
        var col = palette[ci % palette.length];
        html += '<rect x="' + rx + '" y="4" width="' + rw + '" height="30" fill="' + col + '" stroke="#ffffff" stroke-width="1.5"/>';
        if (rw >= 36) {
          html += '<text x="' + (rx + rw / 2) + '" y="22" font-size="10.5" font-weight="bold" fill="#ffffff" text-anchor="middle">' + disp(c.len) + '</text>';
        }
      });

      if (bar.remaining * scale >= 34) {
        var wx = 6 + (bar.used * scale) + ((bar.remaining * scale) / 2);
        html += '<text x="' + wx + '" y="22" font-size="9.5" font-weight="bold" fill="#92400e" text-anchor="middle">' + disp(bar.remaining) + '</text>';
      }
      html += '</svg>';
      html += '</div>';
    });
    html += '</div>';
  });

  var totalUtil = grandStockLen > 0 ? ((grandUsedLen / grandStockLen) * 100).toFixed(1) : '0.0';
  var totalWaste = (100 - parseFloat(totalUtil)).toFixed(1);
  html = '<div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:6px; margin-bottom:10px; text-align:center;">' +
         '<div style="background:#f0fdfa; border:1px solid #99f6e4; border-radius:8px; padding:6px;"><div style="font-size:0.65rem; color:#0f766e; font-weight:700;">TOTAL BARS</div><div style="font-size:0.95rem; font-weight:900; color:#0f172a;">' + grandTotalBars + ' (' + stockFt + ' Ft)</div></div>' +
         '<div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:8px; padding:6px;"><div style="font-size:0.65rem; color:#15803d; font-weight:700;">USED %</div><div style="font-size:0.95rem; font-weight:900; color:#166534;">' + totalUtil + '%</div></div>' +
         '<div style="background:#fffbeb; border:1px solid #fde68a; border-radius:8px; padding:6px;"><div style="font-size:0.65rem; color:#b45309; font-weight:700;">WASTE %</div><div style="font-size:0.95rem; font-weight:900; color:#b45309;">' + totalWaste + '%</div></div>' +
         '</div>' + html;

  textOut += "\n----------------------------------------\n";
  textOut += "• GRAND TOTAL BARS TO BUY: " + grandTotalBars + " Full Bars (" + stockFt + " Ft each)\n";
  textOut += "• OVERALL UTILIZATION: " + totalUtil + "%  |  WASTAGE: " + totalWaste + "%\n";

  if (box) {
    box.style.display = 'block';
    box.innerHTML = html;
  }
  if (outEl) outEl.textContent = textOut;
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

  var stockLenIn = parseFloat(document.getElementById('bc_stock_len')?.value) || 144.0;
  var stockFt = Math.round(stockLenIn / 12);
  var kerfIn = parseFloat(document.getElementById('bc_kerf')?.value);
  if (isNaN(kerfIn)) kerfIn = 0.125;
  var isMm = document.getElementById('bc_unit') && document.getElementById('bc_unit').value.indexOf('Millimeter') !== -1;
  var disp = function(v) { return isMm ? toMmStr(v) : toFractionInch(v); };

  var doc = new jsPDF('l', 'mm', 'a4');
  drawDocHeaderWithLogo(doc, stockFt + " FT ALUMINIUM BAR / PIPE CUTTING DRAWING", "Minimum-Waste 1D Cutting Plan", [15, 118, 110]);

  var groups = groupBarItemsByProfile(bc_items_list);
  var y = 36;
  var barDrawW = 240; // mm
  var startX = 24;
  var scale = barDrawW / stockLenIn;
  var colors = [[2,132,199], [15,118,110], [124,58,237], [37,99,235], [8,145,178]];

  Object.keys(groups).forEach(function(pName) {
    var bars = pack1DBarsBestFit(groups[pName], stockLenIn, kerfIn);
    if (y > 170) { doc.addPage('a4', 'l'); y = 18; }
    doc.setFillColor(240, 253, 250);
    doc.setDrawColor(15, 118, 110);
    doc.roundedRect(14, y, 269, 8, 1.5, 1.5, 'FD');
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9.5);
    doc.setTextColor(15, 118, 110);
    doc.text(pName.toUpperCase() + "  —  TOTAL " + bars.length + " BAR(S) OF " + stockFt + " FT (" + Math.round(stockLenIn) + '")', 18, y + 5.5);
    y += 12;

    bars.forEach(function(bar) {
      if (y > 184) { doc.addPage('a4', 'l'); y = 18; }
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(15, 23, 42);
      doc.text("Bar #" + bar.barNo, 14, y + 7);

      // Amber full stock bar
      doc.setFillColor(254, 243, 199);
      doc.setDrawColor(15, 23, 42);
      doc.setLineWidth(0.4);
      doc.rect(startX, y, barDrawW, 11, 'FD');

      bar.cuts.forEach(function(c, ci) {
        var rx = startX + (c.offset * scale);
        var rw = Math.max(2, Math.min(startX + barDrawW - rx, c.len * scale));
        var col = colors[ci % colors.length];
        doc.setFillColor(col[0], col[1], col[2]);
        doc.setDrawColor(255, 255, 255);
        doc.rect(rx, y, rw, 11, 'FD');
        if (rw >= 14) {
          doc.setFontSize(7.5);
          doc.setTextColor(255, 255, 255);
          doc.text(disp(c.len), rx + rw / 2, y + 6.8, { align: "center" });
        }
      });

      doc.setFontSize(7.5);
      doc.setTextColor(180, 83, 9);
      doc.text("Offcut: " + disp(bar.remaining), startX + barDrawW + 3, y + 7);
      y += 15;
    });
    y += 4;
  });

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
