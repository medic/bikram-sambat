var bs = require('bikram-sambat');
var eurodig = require('eurodigit');
var from_dev = eurodig.to_int;
var to_dev = eurodig.to_non_euro.devanagari;


//> JQUERY SETUP

function initListeners($parent, selecters) {
  if(arguments.length === 0) {
    selecters = {};
    $parent = $('body');
  } else if(arguments.length === 1) {
    if($parent instanceof jQuery) {
      selecters = {};
    } else {
      selecters = $parent;
      $parent = $('body');
    }
  }

  $parent.find(selecters.numberInput || '.devanagari-number-input')
    // Because we change the content of the input field, we must be careful to
    // preserve the caret position from before the change.
    .on('input', function() {
      var $this = $(this);
      var selectionStart = this.selectionStart;
      $this.val(to_dev($this.val()));
      this.selectionStart = this.selectionEnd = selectionStart;
    })
    ;

  $parent.find(selecters.monthToggle || '.bikram-sambat-input-group .dropdown-menu li a')
    .on('click', function() {
      var $this = $(this);
      $this.parents('.input-group').find('input[name=month]').val(1+$this.parent('li').index());
      $this.parents('.input-group-btn').find('.dropdown-toggle').html($this.text() + ' <span class="caret"></span>');
    });
}


//> HELPER FUNCTIONS

function fieldValue($parent, selecter) {
  return from_dev($parent.find(selecter).val());
}


//> EXPORTED FUNCTIONS

module.exports = window.bikram_sambat_bootstrap = {
  getDate: function($inputGroup) {
    // TODO handle fields not set, out of bounds etc.
    var year = fieldValue($inputGroup, '[name=year]');
    var month = fieldValue($inputGroup, '[name=month]');
    var day = fieldValue($inputGroup, '[name=day]');
    return bs.toGreg(year, month, day);
  },
  initListeners: initListeners,
};
