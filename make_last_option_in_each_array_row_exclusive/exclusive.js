<script type="text/javascript" charset="utf-8">
    $(document).ready(function() {
        // Call the exclude function using question ID
        excludeOpt({QID});
    });
 
    // A function to make the last option in each array row exclusive
    function excludeOpt (qID) {
 
        var thisQuestion = $('#question'+qID)
 
        // Add some classes to the checkbox cells
        $('td.checkbox-item', thisQuestion).addClass('normal-item');
        $('tr.subquestion-list', thisQuestion).each(function(i) {
        $('.normal-item:last', this).removeClass('normal-item').addClass('exlusive-item')
        });
 
        // A listener on the checkboxes
        $('input[type="checkbox"]', thisQuestion).on('change', function (event) {
            handleExclusive($(this).closest('td'));
        });
 
        function handleExclusive(thisCell) {
 
            var thisRow = $(thisCell).closest('tr');
 
            // Uncheck the appropriate boxes in a row
            if ($(thisCell).hasClass('normal-item')) {
                $('.exlusive-item input[type="checkbox"]', thisRow).prop('checked', false);
            }
            else {
                $('.normal-item input[type="checkbox"]', thisRow).prop('checked', false);
            }
 
            // Check conditions (relevance)
            $('td.checkbox-item', thisRow).each(function(i) {
                var thisValue = '';
                if($('input[type="checkbox"]', this).is(':checked')) {
                    thisValue = 1;
                }
                var thisSGQA = $('input[type="checkbox"]', this).attr('id').replace(/cbox_/, '');
 
                $('input[type="hidden"]', this).attr('value', thisValue);
                fixnum_checkconditions(thisValue, thisSGQA, 'hidden');
            });
        }
    }
</script>