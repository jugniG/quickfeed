;(function () {
  'use strict'

  var API_BASE = 'https://www.quickfeed.live'

  var scriptEl = document.currentScript
  var websiteId =
    (scriptEl && scriptEl.getAttribute('data-website-id')) ||
    (window.__quickfeed && window.__quickfeed.websiteId)

  if (!websiteId) {
    console.warn('[QuickFeed] Add data-website-id="YOUR_ID" to your script tag.')
    return
  }

  websiteId = String(websiteId)

  function attr(name, fallback) {
    return (scriptEl && scriptEl.getAttribute(name)) || fallback
  }

  var position       = attr('data-position', 'bottom-right')
  var bgColor        = attr('data-bg', '#ffffff')
  var blurEnabled    = attr('data-blur', 'true') !== 'false'
  var overlayColor   = attr('data-overlay', '#000000')
  var overlayOpacity = parseFloat(attr('data-overlay-opacity', '0.45'))
  var titleColor     = attr('data-title-color', '#0a0a0a')
  var descColor      = attr('data-desc-color', '#737373')
  var borderRadius   = parseInt(attr('data-radius', '20'), 10)
  var btnBorderRadius= parseInt(attr('data-btn-radius', '8'), 10)
  var btnBg          = attr('data-btn-bg', '#f97316')
  var btnText        = attr('data-btn-text', '#ffffff')
  var btn2Bg         = attr('data-btn2-bg', '#f5f5f5')
  var btn2Text       = attr('data-btn2-text', '#555555')

  // Parse overlay hex → rgba
  function hexToRgba(hex, opacity) {
    var c = hex.replace('#', '')
    if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2]
    var r = parseInt(c.substring(0,2),16)
    var g = parseInt(c.substring(2,4),16)
    var b = parseInt(c.substring(4,6),16)
    return 'rgba('+r+','+g+','+b+','+opacity+')'
  }

  var overlayBg = overlayColor.startsWith('rgba') || overlayColor.startsWith('rgb')
    ? overlayColor
    : hexToRgba(overlayColor, overlayOpacity)

  // --- Styles ---
  var style = document.createElement('style')
  style.textContent = [
    // overlay
    '#qf-overlay{',
    '  display:none;position:fixed;inset:0;z-index:99999;',
    '  align-items:center;justify-content:center;',
    '  transition:opacity .2s ease;opacity:0;',
    '}',
    '#qf-overlay.qf-visible{display:flex}',
    '#qf-overlay.qf-open{opacity:1}',
    // panel
    '#qf-panel{',
    '  position:relative;',
    '  width:100%;max-width:400px;',
    '  padding:24px;',
    '  font-family:inherit;',
    '  box-shadow:0 20px 60px rgba(0,0,0,.2);',
    '  transform:translateY(12px) scale(0.97);',
    '  transition:transform .25s cubic-bezier(.34,1.56,.64,1), opacity .2s ease;',
    '  opacity:0;',
    '}',
    '#qf-overlay.qf-open #qf-panel{transform:translateY(0) scale(1);opacity:1}',
    // textarea
    '#qf-msg{',
    '  width:100%;box-sizing:border-box;',
    '  border:1.5px solid #e5e5e5;',
    '  padding:12px;font-size:14px;font-family:inherit;',
    '  resize:vertical;min-height:100px;outline:none;',
    '  transition:border-color .15s;',
    '  background:transparent;',
    '}',
    '#qf-msg:focus{border-color:#f97316}',
    // inputs
    '#qf-name,#qf-email{',
    '  width:100%;box-sizing:border-box;',
    '  border:1.5px solid #e5e5e5;',
    '  padding:10px 12px;font-size:14px;font-family:inherit;',
    '  margin-top:8px;outline:none;',
    '  transition:border-color .15s;',
    '  background:transparent;',
    '}',
    '#qf-name:focus,#qf-email:focus{border-color:#f97316}',
    // row
    '#qf-row{display:flex;gap:8px;margin-top:12px}',
    '#qf-submit{',
    '  flex:2;padding:10px;border:none;',
    '  font-size:14px;font-weight:600;cursor:pointer;',
    '  transition:opacity .15s;',
    '}',
    '#qf-submit:hover{opacity:.88}',
    '#qf-submit:disabled{opacity:.5;cursor:not-allowed}',
    '#qf-cancel{',
    '  flex:1;padding:10px 14px;border:none;',
    '  font-size:14px;font-weight:600;cursor:pointer;',
    '  transition:opacity .15s;',
    '}',
    '#qf-cancel:hover{opacity:.8}',
    // title / desc
    '#qf-title{margin:0 0 4px;font-size:16px;font-weight:700}',
    '#qf-desc{margin:0 0 14px;font-size:13px}',
    // success
    '#qf-success{display:none;text-align:center;padding:16px 0}',
    '#qf-success p{margin:8px 0 0;font-size:14px}',
    '.qf-check{font-size:32px}',
  ].join('')
  document.head.appendChild(style)

  // --- Overlay ---
  var overlay = document.createElement('div')
  overlay.id = 'qf-overlay'
  overlay.style.background = overlayBg
  if (blurEnabled) overlay.style.backdropFilter = 'blur(4px)'

  // Panel markup
  overlay.innerHTML = [
    '<div id="qf-panel">',
    '  <p id="qf-title">Share your feedback</p>',
    '  <p id="qf-desc">We read every response.</p>',
    '  <div id="qf-form">',
    '    <textarea id="qf-msg" placeholder="Give us feedback or paste an image URL"></textarea>',
    '    <input id="qf-name" type="text" placeholder="Your name (optional)" />',
    '    <input id="qf-email" type="email" placeholder="Email (optional)" />',
    '    <div id="qf-row">',
    '      <button id="qf-cancel">Cancel</button>',
    '      <button id="qf-submit">Send feedback</button>',
    '    </div>',
    '  </div>',
    '  <div id="qf-success">',
    '    <div class="qf-check">🎉</div>',
    '    <p>Thanks for your feedback!</p>',
    '  </div>',
    '</div>',
  ].join('')
  document.body.appendChild(overlay)

  // Apply position to overlay
  var posMap = {
    'center':        { alignItems:'center',    justifyContent:'center',     padding:'24px' },
    'bottom-center': { alignItems:'flex-end',  justifyContent:'center',     padding:'0 24px 80px' },
    'bottom-right':  { alignItems:'flex-end',  justifyContent:'flex-end',   padding:'0 24px 80px' },
    'bottom-left':   { alignItems:'flex-end',  justifyContent:'flex-start', padding:'0 24px 80px' },
    'top-center':    { alignItems:'flex-start',justifyContent:'center',     padding:'80px 24px 0' },
    'top-right':     { alignItems:'flex-start',justifyContent:'flex-end',   padding:'24px 24px 0' },
    'top-left':      { alignItems:'flex-start',justifyContent:'flex-start', padding:'24px 24px 0' },
  }
  Object.assign(overlay.style, posMap[position] || posMap['center'])

  // Apply theme to panel
  var panel        = document.getElementById('qf-panel')
  var titleEl      = document.getElementById('qf-title')
  var descEl       = document.getElementById('qf-desc')
  var form         = document.getElementById('qf-form')
  var successEl    = document.getElementById('qf-success')
  var msgEl        = document.getElementById('qf-msg')
  var nameEl       = document.getElementById('qf-name')
  var emailEl      = document.getElementById('qf-email')
  var submitBtn    = document.getElementById('qf-submit')
  var cancelBtn    = document.getElementById('qf-cancel')

  panel.style.background    = bgColor
  panel.style.borderRadius  = borderRadius + 'px'
  titleEl.style.color       = titleColor
  descEl.style.color        = descColor
  submitBtn.style.background   = btnBg
  submitBtn.style.color        = btnText
  submitBtn.style.borderRadius = btnBorderRadius + 'px'
  cancelBtn.style.background   = btn2Bg
  cancelBtn.style.color        = btn2Text
  cancelBtn.style.borderRadius = btnBorderRadius + 'px'

  // Apply border radius to inputs/textarea using the same value
  var inputs = [msgEl, nameEl, emailEl]
  inputs.forEach(function(el) {
    el.style.borderRadius = Math.min(btnBorderRadius, 16) + 'px'
  })

  // --- Open / Close ---
  var isOpen = false

  function openWidget() {
    if (isOpen) return
    isOpen = true
    overlay.classList.add('qf-visible')
    // force reflow so transition fires
    overlay.getBoundingClientRect()
    overlay.classList.add('qf-open')
    setTimeout(function() { msgEl.focus() }, 50)
  }

  function closeWidget() {
    if (!isOpen) return
    isOpen = false
    overlay.classList.remove('qf-open')
    setTimeout(function () {
      overlay.classList.remove('qf-visible')
      form.style.display = ''
      successEl.style.display = 'none'
      msgEl.value = ''
      nameEl.value = ''
      emailEl.value = ''
      submitBtn.disabled = false
      submitBtn.textContent = 'Send feedback'
    }, 220)
  }

  // Ctrl+Shift+F (or Cmd+Shift+F on Mac)
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
      e.preventDefault()
      isOpen ? closeWidget() : openWidget()
    }
    if (e.key === 'Escape' && isOpen) {
      closeWidget()
    }
  })

  // Click outside panel to close
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeWidget()
  })

  cancelBtn.addEventListener('click', closeWidget)

  // Expose globally so host page can call window.QuickFeed.open() / .close()
  window.QuickFeed = { open: openWidget, close: closeWidget }

  // --- Submit ---
  submitBtn.addEventListener('click', function () {
    var message = msgEl.value.trim()
    if (!message) {
      msgEl.style.borderColor = '#ef4444'
      msgEl.focus()
      return
    }
    msgEl.style.borderColor = ''

    submitBtn.disabled = true
    submitBtn.textContent = 'Sending…'

    fetch(API_BASE + '/api/feedback/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        websiteId: websiteId,
        message: message,
        submitterName: nameEl.value.trim() || null,
        submitterEmail: emailEl.value.trim() || null,
        url: window.location.href,
        userAgent: navigator.userAgent,
      }),
    })
      .then(function (res) { return res.json() })
      .then(function (data) {
        if (data.ok) {
          form.style.display = 'none'
          successEl.style.display = 'block'
          setTimeout(closeWidget, 2200)
        } else {
          submitBtn.disabled = false
          submitBtn.textContent = 'Send feedback'
          alert('Failed: ' + (data.error || 'Unknown error'))
        }
      })
      .catch(function () {
        submitBtn.disabled = false
        submitBtn.textContent = 'Send feedback'
        alert('Network error. Please try again.')
      })
  })
})()
