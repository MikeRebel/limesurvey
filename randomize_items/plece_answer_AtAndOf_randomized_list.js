/*In order to place a certain answer item at the bottom of a randomized list, add the following JavaScript code at your question text, using the source code mode of the editor:*/

<script type='text/javascript'> 
/* Place option 5 at the end of the randomized list */
$(document).ready(function() {
var move_element="5";
/* Please do NOT change the lines below */
var move_element="javatbd{SGQ}"+move_element;
$("#"+move_element).insertAfter("#question{QID} .answers-list .answer-item:last-child");
}); 
</script>