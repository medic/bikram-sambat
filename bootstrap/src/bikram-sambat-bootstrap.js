var bs = require('bikram-sambat');
var eurodig = require('eurodigit');
var from_dev = eurodig.to_int;
var to_dev = eurodig.to_non_euro.devanagari;


//> JQUERY SETUP

$('.devanagari-number-input')
  // event support:
  //   keypress: firefox
  //   input: chrome for android
  .on('input keypress', function() {
    var $this = $(this);
    $this.val(to_dev($this.val()));
  });

$('.bikram-sambat-input-group .dropdown-menu li a')
  .on('click', function() {
    var $this = $(this);
    $this.parents('.input-group').find('input[name=month]').val(1+$this.parent('li').index());
    $this.parents('.input-group-btn').find('.dropdown-toggle').html($this.text() + ' <span class="caret"></span>');
  });


//> HELPER FUNCTIONS

function fieldValue($parent, selecter) {
  return from_dev($parent.find(selecter).val());
}


//> EXPORTED FUNCTIONS

window.bikram_sambat_bootstrap = {
  getDate: function($inputGroup) {
    // TODO handle fields not set, out of bounds etc.
    var year = fieldValue($inputGroup, '[name=year]');
    var month = fieldValue($inputGroup, '[name=month]');
    var day = fieldValue($inputGroup, '[name=day]');
    return bs.toGreg(year, month, day);
  },
};
