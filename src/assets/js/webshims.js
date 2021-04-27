(function () {
  webshims.setOptions('forms', {
    lazyCustomMessages: true,
    iVal: {
      handleBubble: 'hide', // defaults: true. true (bubble and focus first invalid element) | false (no focus and no bubble) | 'hide' (no bubble, but focus first invalid element)
      fx: 'slide', // defaults 'slide' or 'fade'
      sel: '.ws-validate', // simple selector for the form element, setting this to false, will remove this feature
      fieldWrapper: ':not(span, label, em, strong, b, i, mark, p)'
    }
  })
  webshims.polyfill('forms')
})()
