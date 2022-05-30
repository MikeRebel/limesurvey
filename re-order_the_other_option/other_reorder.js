/* You can simply place the “other” option on top of the list by adjusting the code above as follows: 
Adjust these settings 
 var move_element="other";
 var place_before="1"; */

<script type='text/javascript'>
$(document).ready(function() {
/* Adjust these settings */
 var move_element="other";
 var place_before="6";
/* Please do NOT change the lines below */
var place_before="javatbd{SGQ}"+place_before;
var move_element="javatbd{SGQ}"+move_element;
$("#"+move_element).insertBefore("#"+place_before);
});
</script>

/* Выпадающий список. Другое должно быть включено*/

<script type='text/javascript'>
$(document).ready(function() {
/* Adjust these settings */
 var move_element="-oth-";
 var place_after="85";
/* Please do NOT change the lines below */
var place_after="answer{SGQ} option[value="+place_after+"]";
var move_element="answer{SGQ}  option[value="+move_element+"]";
$("#"+move_element).hide();
$("#"+place_after).after("<option value='-oth-'   class='other-item'  >Другой (укажите)</option>");
});
</script>