<script type="text/javascript" data-author="Tony Partner">	
	$(document).on('ready pjax:scriptcomplete',function(){
 
		// Identify this question
		var thisQuestion = $('#question{QID}');
		var thisTable = $('table.subquestion-list:eq(0)', thisQuestion);
 
		// Hide all but the first array rows
		$('tbody tr:not(:first)', thisQuestion).hide();
 
		// Remove repeat heading rows
		if($('tbody', thisTable).length > 0) {
			$('tbody:gt(0) tr[id^="javatbd"]', thisTable).appendTo($('tbody:eq(0)', thisTable));
			$('tbody:gt(0)', thisTable).remove();
		}
 
		// Listener on the radios
		$('.answer-item :radio', thisQuestion).on('click', function(event) { 
			var thisRow = $(this).closest($('tr[id^="javatbd"]'));
			var nextRow = thisRow.nextAll('tr[id^="javatbd"]:eq(0)');
			if(nextRow.length > 0) {
				 thisRow.fadeOut(300, function(e) {
				 	nextRow.fadeIn(300);
				 });
			}
		});
		
		$('.answer-item :radio', thisQuestion).on('click', function(event) { 
			
			var now = new Date();
			alert( now );
			
		});
		
    });
</script> 