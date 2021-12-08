Q2. List software you need / currently use for teaching and learning 
<script>
$(document).ready(function() {

   // A function to add or remove rows of an Array (Multi Flexible)(Text) question
	function varLengthArray(qID) {
		
		if ($('#question'+qID+'').length > 0) {
		    
			// The HTML content of the Add/Remove elements - modify as you wish
			var addContent = '[+] add row';
			var removeContent = '[-] remove row';

			// Create the Add and Remove elements & insert them
			var el1 = document.createElement('div');
			el1.setAttribute('id','addButton'+qID);
			el1.setAttribute('class','btn btn-primary');
			document.body.appendChild(el1);
			var el2 = document.createElement('div');
			el2.setAttribute('id','removeButton'+qID);
			el2.setAttribute('class','btn btn-danger');
			document.body.appendChild(el2);

			// Move them to after the array
			$( 'div#addButton'+qID ).appendTo($( '#question' + qID + ' table.ls-answers' ).parent());
			$( 'div#removeButton'+qID ).appendTo($( '#question' + qID + ' table.ls-answers' ).parent());

			// Insert their HTML
			$( 'div#addButton'+qID ).html( addContent );
			$( 'div#removeButton'+qID ).html( removeContent );

			// Style the elements - you can modify here if you wish
			$( 'div#addButton'+qID ).css({
				'margin':'10px 0 10px 10px',
				'padding':'1px',
				'text-align':'center',
				'width':'auto',
				'cursor':'pointer',
				'float':'left'
			});

			$( 'div#removeButton'+qID ).css({
				'margin':'10px 0 0 10px',
				'padding':'1px',
				'text-align':'center',
				'width':'auto',
				'cursor':'pointer',
				'float':'left'
			});

			// Initially hide the Remove element
			$( 'div#removeButton'+qID ).hide();

			// Call the functions below when clicked
			$( 'div#addButton'+qID ).click(function (event) {
				addRow(qID);
			});
			$( 'div#removeButton'+qID ).click(function (event) {
				removeRow(qID);
			});

			// Function to add a row, also shows the Remove element and hides the
			//Add element if all rows are shown
			function addRow(qID) {
				var arrayRow = '#question' + qID + ' table.ls-answers tr.subquestion-list';
				var rowCount = $( arrayRow ).size() - 1;
				$( arrayRow + '[name="hidden"]:first' ).attr('name', 'visible').show();
				$( 'div#removeButton'+qID ).show();
				if ( $( arrayRow + ':eq(' + rowCount + ')' ).attr('name') == 'visible' )  {
					$( 'div#addButton'+qID ).hide();
				}
			}

			// Function to remove a row, also clears the contents of the removed row,
			// shows the Add element if the last row is hidden and hides the Remove
			// element if only the first row is shown
			function removeRow(qID) {
				var arrayRow = '#question' + qID + ' table.ls-answers tr.subquestion-list';
				var rowCount = $( arrayRow ).size() - 1;
				$( arrayRow + '[name="visible"]:last input[type="text"]' ).val('');
				$( arrayRow + '[name="visible"]:last' ).attr('name', 'hidden').hide();
				$( 'div#addButton'+qID ).show();
				if ( $( arrayRow + ':eq(1)' ).attr('name') == 'hidden' )  {
					$( 'div#removeButton'+qID ).hide();
				}
			}

			// Just some initialization stuff
			var arrayRow = '#question' + qID + ' table.ls-answers tr.subquestion-list';
			var rowCount = '';

			// Initially hide all except first row or any rows with populated inputs
			$( arrayRow ).each(function(i) {
				if ( i > 0 ) {
					// We also need to give the hidden rows a name cause IE doesn't
					// recognize jQuery :visible selector consistently
					$( this ).attr('name', 'hidden').hide();

					$('input[type=text]', this).each(function(i) {
						if ($(this).attr('value') != '') {
							$(this).parents('tbody:eq(0)').attr('name', 'visible').show();
							$( 'div#removeButton'+qID ).show();
						}
					});
					rowCount = i;
				}
			});
		}
	}

	// Call the function with a question ID
	varLengthArray({QID});

});

</script> 
<script type="text/javascript" charset="utf-8">
  $(document).on('ready pjax:scriptcomplete',function(){
    var thisQuestion = $('#question{QID}');
    // Add a question class
    thisQuestion.addClass('custom-array');

    // Column-specific classes
    $('table.subquestion-list tr', thisQuestion).each(function(i) {
      $('th, td', this).each(function(i) {
        $(this).addClass('column-'+i);
      });
    });


    // Insert selects
    $('.answer-item.answer_cell_X002', thisQuestion).addClass('with-select').append('<select class="inserted-select form-control list-question-select">\
  <option value="">...</option>\
  <option value="1">Yes</option>\
  <option value="2">No</option>\
  <option value="99">No answer</option>\
</select>');
    // Insert selects
    $('.answer-item.answer_cell_X004', thisQuestion).addClass('with-select').append('<select class="inserted-select form-control list-question-select">\
  <option value="">...</option>\
  <option value="1">Staff</option>\
  <option value="2">Department</option>\
  <option value="99">No answer</option>\
</select>');

		// Listeners on select elements
		$('.inserted-select', thisQuestion).on('change', function(i) {
			if($(this).val() != '') {
				$(this).closest('.answer-item').find('input:text').val($.trim($('option:selected', this).text())).trigger('change');
			}
			else {
				$(this).closest('.answer-item').find('input:text').val('').trigger('change');
			}
			
			// 4th column conditional on 2nd column
			if($(this).closest('.answer-item').hasClass('answer_cell_X002')) {
				 handleColumn4($(this));
			}
		});
		
		function handleColumn4(thisSelect) {
			var thisRow = $(thisSelect).closest('tr.subquestion-list');
			var item4 = $('.answer_cell_X004', thisRow);
var x=$(thisSelect).val();
			if(x==1)  {
				$('.inserted-select', item4).prop('disabled', false);
			}
			else {
				$('.inserted-select', item4).val('').prop('disabled', true);
				$('input:text', item4).val('').trigger('change');
			}			
		}
 
		// Returning to page
		$('.with-select input:text', thisQuestion).each(function(i) {
			var thisCell = $(this).closest('.answer-item');
			var inputText = $.trim($(this).val());
			var selectval = $('select.inserted-select option', thisCell).filter(function () { return $(this).html() == inputText; }).val();
			$('select.inserted-select', thisCell).val(selectval);
			
			// 4th column conditional on 2nd column
			if($(this).closest('.answer-item').hasClass('answer_cell_X002')) {
				 handleColumn4($('select.inserted-select', thisCell));
			}
		});

    // Clean-up styles
    $('select.inserted-select', thisQuestion).css({
      'max-width': '100%'
    });
    $('.with-select input:text', thisQuestion).css({
      'position': 'absolute',
      'left': '-9999em'
    });
  });
</script>
<style type="text/css">.custom-array table.subquestion-list col {
    width: auto !important;
  }

  .custom-array table.subquestion-list thead .column-0 {  width: 10%; }
  .custom-array table.subquestion-list thead .column-1 {  width: 55%; }
  .custom-array table.subquestion-list thead .column-2 {  width: 10%; }
  .custom-array table.subquestion-list thead .column-3 {  width: 10%; }
  .custom-array table.subquestion-list thead .column-4 {  width: 15%; }
</style>
