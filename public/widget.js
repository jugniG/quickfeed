;(function () {
  'use strict'

  var API_BASE = 'https://www.quickfeed.live'

  var scriptEl  = document.currentScript
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

  var position        = attr('data-position', 'bottom-right')
  var bgColor         = attr('data-bg', '#ffffff')
  var blurEnabled     = attr('data-blur', 'true') !== 'false'
  var overlayColor    = attr('data-overlay', '#000000')
  var overlayOpacity  = parseFloat(attr('data-overlay-opacity', '0.45'))
  var titleColor      = attr('data-title-color', '#0a0a0a')
  var descColor       = attr('data-desc-color', '#737373')
  var borderRadius    = parseInt(attr('data-radius', '20'), 10)
  var btnBorderRadius = parseInt(attr('data-btn-radius', '8'), 10)
  var btnBg           = attr('data-btn-bg', '#f97316')
  var btnText         = attr('data-btn-text', '#ffffff')
  var btn2Bg          = attr('data-btn2-bg', '#f5f5f5')
  var btn2Text        = attr('data-btn2-text', '#555555')

  function hexToRgba(hex, a) {
    var c = hex.replace('#', '')
    if (c.length === 3) c = c[0]+c[0]+c[1]+c[1]+c[2]+c[2]
    return 'rgba('+parseInt(c.slice(0,2),16)+','+parseInt(c.slice(2,4),16)+','+parseInt(c.slice(4,6),16)+','+a+')'
  }
  var overlayBg = (overlayColor.startsWith('rgb') ? overlayColor : hexToRgba(overlayColor, overlayOpacity))

  // ── Styles ──────────────────────────────────────────────────────────────────
  var style = document.createElement('style')
  style.textContent = `
#qf-overlay{
  display:none;position:fixed;inset:0;z-index:2147483640;
  transition:opacity .2s ease;opacity:0;
}
#qf-overlay.qf-visible{display:flex}
#qf-overlay.qf-open{opacity:1}
#qf-panel{
  position:relative;width:100%;max-width:420px;padding:24px;
  font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
  box-shadow:0 24px 64px rgba(0,0,0,.22);
  transform:translateY(14px) scale(0.96);opacity:0;
  transition:transform .28s cubic-bezier(.34,1.4,.64,1),opacity .2s ease;
}
#qf-overlay.qf-open #qf-panel{transform:translateY(0) scale(1);opacity:1}
#qf-title{margin:0 0 2px;font-size:16px;font-weight:700;line-height:1.3}
#qf-desc{margin:0 0 14px;font-size:13px;line-height:1.5}
#qf-images{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px}
.qf-img-thumb{
  position:relative;width:64px;height:64px;border-radius:8px;
  overflow:hidden;border:1.5px solid #e5e5e5;flex-shrink:0;
}
.qf-img-thumb img{width:100%;height:100%;object-fit:cover;display:block}
.qf-img-remove{
  position:absolute;top:2px;right:2px;width:18px;height:18px;border-radius:50%;
  background:rgba(0,0,0,.55);color:#fff;border:none;cursor:pointer;
  font-size:11px;line-height:18px;text-align:center;padding:0;
  display:flex;align-items:center;justify-content:center;
}
#qf-paste-hint{
  font-size:11px;color:#aaa;margin-bottom:6px;
  display:flex;align-items:center;gap:4px;
}
#qf-textarea-wrap{position:relative}
#qf-msg{
  width:100%;box-sizing:border-box;
  border:1.5px solid #e5e5e5;
  padding:12px;font-size:14px;
  font-family:inherit;resize:vertical;min-height:90px;
  outline:none;transition:border-color .15s;background:transparent;
  display:block;
}
#qf-msg:focus{border-color:#f97316}
#qf-email{
  width:100%;box-sizing:border-box;
  border:1.5px solid #e5e5e5;
  padding:10px 12px;font-size:14px;font-family:inherit;
  margin-top:8px;outline:none;transition:border-color .15s;background:transparent;
  display:block;
}
#qf-email:focus{border-color:#f97316}
#qf-row{display:flex;gap:8px;margin-top:12px}
#qf-submit{
  flex:2;padding:10px;border:none;
  font-size:14px;font-weight:600;font-family:inherit;
  cursor:pointer;transition:opacity .15s;
}
#qf-submit:hover{opacity:.88}
#qf-submit:disabled{opacity:.5;cursor:not-allowed}
#qf-cancel{
  flex:1;padding:10px 14px;border:none;
  font-size:14px;font-weight:600;font-family:inherit;
  cursor:pointer;transition:opacity .15s;
}
#qf-cancel:hover{opacity:.8}
#qf-success{display:none;text-align:center;padding:24px 0}
#qf-success .qf-check{font-size:36px;display:block;margin-bottom:8px}
#qf-success p{margin:0;color:#555;font-size:14px}
#qf-status{font-size:12px;color:#999;margin-top:4px;min-height:16px;}
`
  document.head.appendChild(style)

  // ── Markup ───────────────────────────────────────────────────────────────────
  var overlay = document.createElement('div')
  overlay.id = 'qf-overlay'
  overlay.style.background = overlayBg
  if (blurEnabled) overlay.style.backdropFilter = 'blur(5px)'

  overlay.innerHTML = `
<div id="qf-panel">
  <p id="qf-title">Share your feedback</p>
  <p id="qf-desc">We read every response.</p>
  <div id="qf-form">
    <div id="qf-images"></div>
    <div id="qf-paste-hint">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><rect x="1" y="3" width="7" height="8" rx="1" stroke="currentColor" stroke-width="1.2"/><path d="M3 3V2a1 1 0 011-1h5a1 1 0 011 1v7a1 1 0 01-1 1H9" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>
      Paste an image with Ctrl+V
    </div>
    <div id="qf-textarea-wrap">
      <textarea id="qf-msg" placeholder="Give us feedback…"></textarea>
    </div>
    <div id="qf-status"></div>
    <input id="qf-email" type="email" placeholder="Email (optional)" />
    <div id="qf-row">
      <button id="qf-cancel">Cancel</button>
      <button id="qf-submit">Send feedback</button>
    </div>
  </div>
  <div id="qf-success">
    <span class="qf-check">🎉</span>
    <p>Thanks for your feedback!</p>
  </div>
</div>`
  document.body.appendChild(overlay)

  // ── Position overlay ─────────────────────────────────────────────────────────
  var posMap = {
    'center':        { alignItems:'center',     justifyContent:'center',     padding:'24px' },
    'bottom-center': { alignItems:'flex-end',   justifyContent:'center',     padding:'0 24px 80px' },
    'bottom-right':  { alignItems:'flex-end',   justifyContent:'flex-end',   padding:'0 24px 80px' },
    'bottom-left':   { alignItems:'flex-end',   justifyContent:'flex-start', padding:'0 24px 80px' },
    'top-center':    { alignItems:'flex-start', justifyContent:'center',     padding:'80px 24px 0' },
    'top-right':     { alignItems:'flex-start', justifyContent:'flex-end',   padding:'24px 24px 0' },
    'top-left':      { alignItems:'flex-start', justifyContent:'flex-start', padding:'24px 24px 0' },
  }
  Object.assign(overlay.style, posMap[position] || posMap['center'])

  // ── Theme ────────────────────────────────────────────────────────────────────
  var panel     = document.getElementById('qf-panel')
  var titleEl   = document.getElementById('qf-title')
  var descEl    = document.getElementById('qf-desc')
  var form      = document.getElementById('qf-form')
  var successEl = document.getElementById('qf-success')
  var imagesEl  = document.getElementById('qf-images')
  var statusEl  = document.getElementById('qf-status')
  var msgEl     = document.getElementById('qf-msg')
  var emailEl   = document.getElementById('qf-email')
  var submitBtn = document.getElementById('qf-submit')
  var cancelBtn = document.getElementById('qf-cancel')

  panel.style.background   = bgColor
  panel.style.borderRadius = borderRadius + 'px'
  titleEl.style.color      = titleColor
  descEl.style.color       = descColor
  submitBtn.style.background   = btnBg
  submitBtn.style.color        = btnText
  submitBtn.style.borderRadius = btnBorderRadius + 'px'
  cancelBtn.style.background   = btn2Bg
  cancelBtn.style.color        = btn2Text
  cancelBtn.style.borderRadius = btnBorderRadius + 'px'
  ;[msgEl, emailEl].forEach(function(el) {
    el.style.borderRadius = Math.min(btnBorderRadius, 16) + 'px'
  })

  // ── Image state — local files only, no upload until submit ───────────────────
  var pendingFiles = [] // { file: File, blobUrl: string, thumbEl: Element }
  var MAX_IMAGES = 5
  var MAX_BYTES  = 5 * 1024 * 1024

  function setStatus(msg) {
    statusEl.textContent = msg || ''
  }

  function addThumb(blobUrl, index) {
    var wrap = document.createElement('div')
    wrap.className = 'qf-img-thumb'

    var img = document.createElement('img')
    img.src = blobUrl

    var rm = document.createElement('button')
    rm.className = 'qf-img-remove'
    rm.innerHTML = '&times;'
    rm.title = 'Remove'
    rm.addEventListener('click', function() {
      URL.revokeObjectURL(blobUrl)
      pendingFiles = pendingFiles.filter(function(pf) { return pf.blobUrl !== blobUrl })
      wrap.remove()
      setStatus('')
    })

    wrap.appendChild(img)
    wrap.appendChild(rm)
    imagesEl.appendChild(wrap)
    return wrap
  }

  function addImage(file) {
    if (!file || !file.type.startsWith('image/')) return
    if (pendingFiles.length >= MAX_IMAGES) {
      setStatus('Max ' + MAX_IMAGES + ' images.')
      return
    }
    if (file.size > MAX_BYTES) {
      setStatus('Max file size is 5 MB.')
      return
    }
    var blobUrl = URL.createObjectURL(file)
    var thumb = addThumb(blobUrl)
    pendingFiles.push({ file: file, blobUrl: blobUrl, thumb: thumb })
    setStatus('')
  }

  // ── Convert File → base64 ────────────────────────────────────────────────────
  function fileToBase64(file) {
    return new Promise(function(resolve, reject) {
      var reader = new FileReader()
      reader.onload  = function() { resolve(reader.result) } // "data:image/png;base64,..."
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // ── Paste handler ────────────────────────────────────────────────────────────
  function handlePaste(e) {
    if (!isOpen) return
    var items = (e.clipboardData || (e.originalEvent && e.originalEvent.clipboardData) || {}).items
    if (!items) return
    for (var i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        e.preventDefault()
        addImage(items[i].getAsFile())
        break
      }
    }
  }
  document.addEventListener('paste', handlePaste)

  // ── Open / Close ─────────────────────────────────────────────────────────────
  var isOpen = false

  function openWidget() {
    if (isOpen) return
    isOpen = true
    overlay.classList.add('qf-visible')
    overlay.getBoundingClientRect()
    overlay.classList.add('qf-open')
    setTimeout(function() { msgEl.focus() }, 60)
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
      emailEl.value = ''
      imagesEl.innerHTML = ''
      // revoke all blob URLs
      pendingFiles.forEach(function(pf) { URL.revokeObjectURL(pf.blobUrl) })
      pendingFiles = []
      setStatus('')
      submitBtn.disabled = false
      submitBtn.textContent = 'Send feedback'
    }, 230)
  }

  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'F' || e.key === 'f')) {
      e.preventDefault()
      isOpen ? closeWidget() : openWidget()
    }
    if (e.key === 'Escape' && isOpen) closeWidget()
  })

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeWidget()
  })
  cancelBtn.addEventListener('click', closeWidget)

  window.QuickFeed = { open: openWidget, close: closeWidget }

  // ── Submit ───────────────────────────────────────────────────────────────────
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
    setStatus('')

    // Convert all pending files to base64 then submit
    Promise.all(pendingFiles.map(function(pf) {
      return fileToBase64(pf.file).then(function(dataUrl) {
        return { data: dataUrl, type: pf.file.type }
      })
    })).then(function(imageFiles) {
      return fetch(API_BASE + '/api/feedback/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          websiteId: websiteId,
          message: message,
          imageFiles: imageFiles,   // [{ data: "data:image/png;base64,...", type: "image/png" }]
          submitterEmail: emailEl.value.trim() || null,
          url: window.location.href,
          userAgent: navigator.userAgent,
        }),
      })
    }).then(function(r) { return r.json() })
      .then(function(data) {
        if (data.ok) {
          form.style.display = 'none'
          successEl.style.display = 'block'
          setTimeout(closeWidget, 2400)
        } else {
          submitBtn.disabled = false
          submitBtn.textContent = 'Send feedback'
          setStatus('Error: ' + (data.error || 'Unknown'))
        }
      })
      .catch(function() {
        submitBtn.disabled = false
        submitBtn.textContent = 'Send feedback'
        setStatus('Network error. Try again.')
      })
  })
})()
