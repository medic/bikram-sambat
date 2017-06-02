var bs = require('bikram-sambat');
var eurodig = require('eurodigit');
var from_dev = eurodig.to_int;
var to_dev = eurodig.to_non_euro.devanagari;


//> JQUERY SETUP

$('.devanagari-number-input')
  .on('keypress', function(e) {
    var charCode = typeof e.which === 'number' ? e.which : e.keyCode;

    if(e.altKey || e.ctrlKey || e.metaKey ||
        charCode < 48 || charCode > 57) return;

    var $this = $(this);
    var oldVal = $this.val();

    var selectionStart = this.selectionStart;

    $this.val(oldVal.slice(0, selectionStart) +
        to_dev(String.fromCharCode(charCode)) +
        oldVal.slice(this.selectionEnd));

    this.selectionStart = this.selectionEnd = 1+selectionStart;

    e.preventDefault();
  })
  .on('change', function() {
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
    var year = fieldValue($inputGroup, '[name=year]');
    var month = fieldValue($inputGroup, '[name=month]');
    var day = fieldValue($inputGroup, '[name=day]');
    return bs.toGreg(year, month, day);
  },
};
