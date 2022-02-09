<!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
<div align="center">
<div id="player"> </div>
</div>
<script>
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');
      var ScreenWidth = $('#outerframeContainer').width();
      var VideoWidth = ScreenWidth - 20;
      var VideoHeight = VideoWidth / 1.78;
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: VideoHeight,
          width: VideoWidth,
          videoId: 'I4BInQVr1xc',
          playerVars: {
            controls: 0,
          	disablekb: 1,
            autoplay: 1,
            fs: 0,
            modestbranding: 1
          },
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      //var done = true;

      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.ENDED) {
          $('#ls-button-submit').show();
          //setTimeout(stopVideo, 6000);
          //done = true;
        }
      }
      //function playVideo() {
      //  player.playVideo();
      //}
      function stopVideo() {
        player.stopVideo();
      }

    </script>

<p>Если видео не проигрывается, запустите видео, нажав на кнопку "Старт"  с треугольником и посмотрите его до конца. Пожалуйста, первый ответ выберите мышкой или нажав на нем на экране. Далее, в процессе просмотра, вы можете в любой момент нажимать на клавиатуре на кнопку "+" в тот момент, когда происходящее на  видео вам нравится и кнопку "-" когда не нравится или продолжать выбирать ответы нажимая на них.</p>
<script type="text/javascript" data-author="Tony Partner">	
	$(document).on('ready pjax:scriptcomplete',function(){
 		
		// Identify this question
		var thisQuestion = $('#question{QID}');
		var thisTable = $('table.subquestion-list:eq(0)', thisQuestion);

		// Hide all but the first array rows
		$('tbody tr:not(:first)', thisQuestion).hide();
 		$("#ls-button-submit").hide();
   		setTimeout(function () {
        	$('#ls-button-submit').show();
        }, 5400000);
		// Remove repeat heading rows
		if($('tbody', thisTable).length > 0) {
			$('tbody:gt(0) tr[id^="javatbd"]', thisTable).appendTo($('tbody:eq(0)', thisTable));
			$('tbody:gt(0)', thisTable).remove();
		}

		// Listener on the radios
		$('.answer-item :radio', thisQuestion).on('click', function(event) {
			var thisRow = $(this).closest($('tr[id^="javatbd"]'));
			var nextRow = thisRow.nextAll('tr[id^="javatbd"]:eq(0)');
          	var resp = "{TOKEN:TOKEN}"; // идентификатор респондента
          	var now = new Date(); // текущее время нажатия на кнопку
          	var CurrentAnswer = this.value; // выбранный вариант ответа
          	var VideoTime = player.getCurrentTime(); // время в секундах от начала интервью.

          	//alert( now );
          	//alert( VideoTime );
          	//alert( ScreenWidth );
          	//alert( VideoWidth );
          	//alert( VideoHeight );
          	//alert( thisRow );
          	//alert( nextRow );

			if(nextRow.length > 0) {
				 thisRow.fadeOut(300, function(e) {
				 	nextRow.fadeIn(300);
				 });
			}
          	//http://yalime.ddns.net/limesurvey/scripts/video_estimation/save_video_estimation.php?resp=111&date=11.11.2111&time=1756.1243235
          	var check_quota_url = "http://yalime5.ddns.net/limesurvey/scripts/video_estimation/save_video_estimation_645263.php?resp="+resp+"&date="+now+"&time="+VideoTime+"&ans="+CurrentAnswer;
			//alert( CurrentAnswer );
          	$.ajax({
				url: check_quota_url,
				type: "GET",
				timeout: 600,
				dataType: 'json',
      			async: true
              	//success: function(quota){
              	//	alert( VideoTime );
              	//	if (quota==0){
              	//		$('#movenextbtn').show();
              	//		$('#movenextbtn, #movesubmitbtn').click(function(){
              	//			window.location="http://magram.info/Final.html";
              	//			return false;
              	//		});
              	//	} else {
              	//		$('#movenextbtn').show();
              	//      	$("#answer"+Question+quota+'').attr('checked',true);
				//		$('#movenextbtn, #movesubmitbtn').click(function(){
              	//			return true;
              	//		});
              	//	}
              	//}
			});
		});
    });
</script><script>

$(document).ready(function() {

});
  
  	$(document).contextmenu(function() {
    return false;
});


$(document).keypress(function (e)
	{
	var key = e.which;
  	//alert (key);
	if(key == 61 || key == 43 )  // the enter key code
		{
    	//alert ("+");
        // Вызываем событие клик на лайк и добавляем номер ID следующего ответа
        var LikeAdress = '#'+$('.answer-item :radio[id*="Like"]:visible').attr('id');
        //alert ( LikeAdress );
        $(LikeAdress).click();
    	return false;
  		}
	if(key == 95 || key == 45)  // the enter key code
		{
    	//alert ("-");
        // Вызываем событие клик на дизлайк и добавляем номер ID следующего ответа
        var DisAdress = '#'+$('.answer-item :radio[id*="Dis"]:visible').attr('id');
        //alert ( DisAdress );
        $(DisAdress).click();
    	return false;
  		}
	}
);

</script>