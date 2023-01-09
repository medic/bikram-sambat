var bs = require('bikram-sambat');
var eurodig = require('eurodigit');
var from_dev = eurodig.to_int;
var to_dev = eurodig.to_non_euro.devanagari;


//> JQUERY SETUP

function initListeners($parent, dateInputSelecter) {
  if(arguments.length !== 2) throw new Error();

  $parent.find('.devanagari-number-input')
    // Because we change the content of the input field, we must be careful to
    // preserve the caret position from before the change.
    .on('input', function() {
      var $this = $(this);
      var selectionStart = this.selectionStart;
      $this.val(to_dev($this.val()));
      this.selectionStart = this.selectionEnd = selectionStart;
    })
    .on('change blur', function() {
      var $this = $(this);
      var $inputGroup = $this.parents('.bikram-sambat-input-group');
      updateConvertedDate($inputGroup, dateInputSelecter);
    })
    ;

  $parent.find('.bikram-sambat-input-group .dropdown-menu li a')
    .on('click', function() {
      var $this = $(this);
      var $inputGroup = $this.parents('.bikram-sambat-input-group');
      setVal($inputGroup, 'month', 1+$this.parent('li').index());
      $this.parents('.input-group-btn').find('.dropdown-toggle').html($this.text() + ' <span class="caret"></span>');

      updateConvertedDate($inputGroup, dateInputSelecter);
    });
}


//> HELPER FUNCTIONS

function fieldValue($parent, name) {
  return from_dev($parent.find('[name='+name+']').val());
}
function setVal($parent, name, val) {
  $parent.find('[name='+name+']').val(to_dev(val));
}
function setDropdown($parent, name, val) {
  var $input = $parent.find('[name='+name+']');
  $input.parents('.bikram-sambat-input-group')
    .find('.dropdown-menu li a')
    .eq(val - 1)
    .click();
}

function updateConvertedDate($inputGroup, dateInputSelecter) {
  var greg = getDate_greg_text($inputGroup);
  $(dateInputSelecter).val(greg).trigger('change');
}

//> EXPORTED FUNCTIONS

module.exports = window.bikram_sambat_bootstrap = {
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
  getDate_greg_text: getDate_greg_text,
  setDate_greg_text: function($inputGroup, dateInputSelecter, gregDateString) {
    var bik = bs.toBik(gregDateString);

    setVal($inputGroup, 'year', bik.year);
    setVal($inputGroup, 'day', bik.day);
    setDropdown($inputGroup, 'month', bik.month);
  },
  initListeners: initListeners,
};

function getDate_greg_text($inputGroup) {
  var year = fieldValue($inputGroup, 'year');
  var month = fieldValue($inputGroup, 'month');
  var day = fieldValue($inputGroup, 'day');
  try {
    return bs.toGreg_text(year, month, day);
  } catch(e) {
    return null;
  }
}
