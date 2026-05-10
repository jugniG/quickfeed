;(function () {
  'use strict'

  var API_BASE = 'https://www.quickfeed.live'

  // Accept websiteId via data-website-id on the <script> tag itself
  var scriptEl = document.currentScript
  var websiteId =
    (scriptEl && scriptEl.getAttribute('data-website-id'))
    || (window.__quickfeed && window.__quickfeed.websiteId)

  if (!websiteId) {
    console.warn('[QuickFeed] Add data-website-id="YOUR_ID" to your script tag.')
    return
  }

  websiteId = String(websiteId)

  // --- Read optional theme/position from data attrs ---
  function attr(name, fallback) {
    return (scriptEl && scriptEl.getAttribute(name)) || fallback
  }
  var position = attr('data-position', 'bottom-right')
  var bgColor = attr('data-bg', '#ffffff')
  var blurEnabled = attr('data-blur', 'true') !== 'false'
  var overlayColor = attr('data-overlay', 'rgba(0,0,0,0.45)')
  var titleColor = attr('data-title-color', '#0a0a0a')
  var borderRadius = attr('data-radius', '20') + 'px'
  var btnBg = attr('data-btn-bg', '#f97316')
  var btnText = attr('data-btn-text', '#ffffff')
  var btn2Bg = attr('data-btn2-bg', '#f5f5f5')
  var btn2Text = attr('data-btn2-text', '#555555')

  // --- Styles ---
  var style = document.createElement('style')
  style.textContent = [
    '#qf-btn{position:fixed;bottom:24px;right:24px;z-index:99998;display:flex;align-items:center;gap:8px;padding:10px 18px;background:#f97316;color:#fff;border:none;border-radius:9999px;font-size:14px;font-weight:600;font-family:inherit;cursor:pointer;box-shadow:0 4px 16px rgba(249,115,22,.35);transition:transform .15s,box-shadow .15s}',
    '#qf-btn:hover{transform:translateY(-2px);box-shadow:0 6px 20px rgba(249,115,22,.45)}',
    '#qf-overlay{display:none;position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.45);align-items:flex-end;justify-content:center;padding-bottom:80px}',
    '#qf-overlay.open{display:flex}',
    '#qf-panel{background:#fff;border-radius:20px;padding:24px;width:100%;max-width:400px;box-shadow:0 20px 60px rgba(0,0,0,.2);font-family:inherit}',
    '#qf-panel h3{margin:0 0 16px;font-size:16px;font-weight:700;color:#0a0a0a}',
    '#qf-panel textarea{width:100%;box-sizing:border-box;border:1.5px solid #e5e5e5;border-radius:12px;padding:12px;font-size:14px;font-family:inherit;resize:vertical;min-height:100px;outline:none;transition:border-color .15s}',
    '#qf-panel textarea:focus{border-color:#f97316}',
    '#qf-panel input{width:100%;box-sizing:border-box;border:1.5px solid #e5e5e5;border-radius:12px;padding:10px 12px;font-size:14px;font-family:inherit;margin-top:8px;outline:none;transition:border-color .15s}',
    '#qf-panel input:focus{border-color:#f97316}',
    '#qf-row{display:flex;gap:8px;margin-top:12px}',
    '#qf-submit{flex:1;padding:10px;background:#f97316;color:#fff;border:none;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer;transition:opacity .15s}',
    '#qf-submit:hover{opacity:.9}',
    '#qf-submit:disabled{opacity:.5;cursor:not-allowed}',
    '#qf-cancel{padding:10px 14px;background:#f5f5f5;color:#555;border:none;border-radius:12px;font-size:14px;font-weight:600;cursor:pointer}',
    '#qf-cancel:hover{background:#eee}',
    '#qf-success{display:none;text-align:center;padding:16px 0}',
    '#qf-success p{margin:8px 0 0;color:#555;font-size:14px}',
    '.qf-check{font-size:32px}',
  ].join('')
  document.head.appendChild(style)

  // --- Trigger button ---
  var btn = document.createElement('button')
  btn.id = 'qf-btn'
  btn.innerHTML = '<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> Feedback'
  document.body.appendChild(btn)

  // --- Overlay + panel ---
  var overlay = document.createElement('div')
  overlay.id = 'qf-overlay'
  overlay.style.background = overlayColor
  if (blurEnabled) overlay.style.backdropFilter = 'blur(4px)'
  overlay.innerHTML = [
    '<div id="qf-panel">',
    '  <h3>Share your feedback</h3>',
    '  <div id="qf-form">',
    '    <textarea id="qf-msg" placeholder="What\'s on your mind?"></textarea>',
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

  // Apply theme to panel
  var panel = document.getElementById('qf-panel')
  panel.style.background = bgColor
  panel.style.borderRadius = borderRadius
  panel.querySelector('h3').style.color = titleColor
  var submitBtnEl = document.getElementById('qf-submit')
  submitBtnEl.style.background = btnBg
  submitBtnEl.style.color = btnText
  var cancelBtnEl = document.getElementById('qf-cancel')
  cancelBtnEl.style.background = btn2Bg
  cancelBtnEl.style.color = btn2Text

  // Apply position
  var posMap = {
    'center':        { top:'50%', left:'50%', transform:'translate(-50%,-50%)', alignItems:'center', justifyContent:'center', paddingBottom:'0' },
    'bottom-center': { alignItems:'flex-end', justifyContent:'center', paddingBottom:'80px' },
    'bottom-right':  { alignItems:'flex-end', justifyContent:'flex-end', paddingBottom:'80px', paddingRight:'24px' },
    'bottom-left':   { alignItems:'flex-end', justifyContent:'flex-start', paddingBottom:'80px', paddingLeft:'24px' },
    'top-center':    { alignItems:'flex-start', justifyContent:'center', paddingTop:'80px' },
    'top-right':     { alignItems:'flex-start', justifyContent:'flex-end', paddingTop:'24px', paddingRight:'24px' },
    'top-left':      { alignItems:'flex-start', justifyContent:'flex-start', paddingTop:'24px', paddingLeft:'24px' },
  }
  var pos = posMap[position] || posMap['bottom-center']
  Object.assign(overlay.style, pos)

  var form = document.getElementById('qf-form')
  var successEl = document.getElementById('qf-success')
  var msgEl = document.getElementById('qf-msg')
  var nameEl = document.getElementById('qf-name')
  var emailEl = document.getElementById('qf-email')
  var submitBtn = submitBtnEl
  var cancelBtn = cancelBtnEl

  function openWidget() {
    overlay.classList.add('open')
    msgEl.focus()
  }

  function closeWidget() {
    overlay.classList.remove('open')
    setTimeout(function () {
      form.style.display = ''
      successEl.style.display = 'none'
      msgEl.value = ''
      nameEl.value = ''
      emailEl.value = ''
      submitBtn.disabled = false
      submitBtn.textContent = 'Send feedback'
    }, 300)
  }

  btn.addEventListener('click', openWidget)
  cancelBtn.addEventListener('click', closeWidget)
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeWidget()
  })

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

    var payload = {
      websiteId: websiteId,
      message: message,
      submitterName: nameEl.value.trim() || null,
      submitterEmail: emailEl.value.trim() || null,
      url: window.location.href,
      userAgent: navigator.userAgent,
    }

    fetch(API_BASE + '/api/feedback/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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
          alert('Failed to send feedback: ' + (data.error || 'Unknown error'))
        }
      })
      .catch(function () {
        submitBtn.disabled = false
        submitBtn.textContent = 'Send feedback'
        alert('Network error. Please try again.')
      })
  })
})()
