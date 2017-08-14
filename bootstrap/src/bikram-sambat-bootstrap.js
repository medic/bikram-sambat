var bs = require('bikram-sambat');
var eurodig = require('eurodigit');
var from_dev = eurodig.to_int;
var to_dev = eurodig.to_non_euro.devanagari;


//> JQUERY SETUP

function addChangeListener($parent, onChange) {
  if(arguments.length === 1) {
    onChange = $parent;
    $parent = $('body');
  }

  $parent.find('.devanagari-number-input')
    .on('input', onChange);

  $parent.find('.bikram-sambat-input-group .dropdown-menu li a')
    .on('click', onChange);
}

function initListeners($parent) {
  if(arguments.length === 0) {
    $parent = $('body');
  }

  $parent.find('.devanagari-number-input')
    // Because we change the content of the input field, we must be careful to
    // preserve the caret position from before the change.
    .on('input', function() {
      var $this = $(this);
      var selectionStart = this.selectionStart;
      $this.val(to_dev($this.val()));
      this.selectionStart = this.selectionEnd = selectionStart;
    })
    ;

  $parent.find('.bikram-sambat-input-group .dropdown-menu li a')
    .on('click', function() {
      var $this = $(this);
      $this.parents('.input-group').find('input[name=month]').val(1+$this.parent('li').index());
      $this.parents('.input-group-btn').find('.dropdown-toggle').html($this.text() + ' <span class="caret"></span>');
    });

  $parent.find('input[name=month]')
    .on('change', function() {
      var $this = $(this);
      $this.parents('.bikram-sambat-input-group')
        .find('.dropdown-menu li a')
        .eq(parseInt($this.val(), 10) - 1)
        .click();
    });
}


//> HELPER FUNCTIONS

function fieldValue($parent, name) {
  return from_dev($parent.find('[name='+name+']').val());
}
function setText($parent, name, val) {
  $parent.find('[name='+name+']').val(to_dev(val));
}
function setDropdown($parent, name, val) {
  $parent.find('[name='+name+']')
    .val(val)
    .trigger('change');
}


//> EXPORTED FUNCTIONS

module.exports = window.bikram_sambat_bootstrap = {
  addChangeListener: addChangeListener,
  getDate_greg: function($inputGroup) {
    var year = fieldValue($inputGroup, 'year');
    var month = fieldValue($inputGroup, 'month');
    var day = fieldValue($inputGroup, 'day');
    try {
      return bs.toGreg(year, month, day);
    } catch(e) {
      return null;
    }
  },
  getDate_greg_text: function($inputGroup) {
    var year = fieldValue($inputGroup, 'year');
    var month = fieldValue($inputGroup, 'month');
    var day = fieldValue($inputGroup, 'day');
    try {
      return bs.toGreg_text(year, month, day);
    } catch(e) {
      return null;
    }
  },
  setDate_greg_text: function($inputGroup, gregDateString) {
    var bik = bs.toBik(gregDateString);
    setText($inputGroup, 'year', bik.year);
    setDropdown($inputGroup, 'month', bik.month);
    setText($inputGroup, 'day', bik.day);
  },
  initListeners: initListeners,
};
