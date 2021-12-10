<!-- 1. The <iframe> (and video player) will replace this <div> tag. -->
<div align="center">
<div id="player"> </div>
</div>
<script>
      // 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '360',
          width: '640',
          videoId: 'lBbt8vsJ_Wo',
          playerVars: {
            controls: 0,
          	disablekb: 1,
            autoplay: 1,
            fs: 0,
            modestbranding: 1
          }
          //events: {
          //  'onReady': onPlayerReady
          //  //'onStateChange': onPlayerStateChange
          //}
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = true;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          //setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      //function playVideo() {
      //  player.playVideo();
      //}
      function stopVideo() {
        player.stopVideo();
      }
      player.playVideo();
    </script>

<p>Посмотрите видео. Ставьте лайки, в тот момент, когда сказанное на видео понравилось и дислайки когда не понравилось.</p>
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
          	var resp = "{TOKEN:TOKEN}"; // идентификатор респондента
          	var now = new Date(); // текущее время нажатия на кнопку
          	var CurrentAnswer = "$(this)"; // выбранный вариант ответа
          	var VideoTime = player.getCurrentTime(); // время в секундах от начала интервью.
          	//alert( now );
          	//alert( VideoTime );
          	
			if(nextRow.length > 0) {
				 thisRow.fadeOut(300, function(e) {
				 	nextRow.fadeIn(300);
				 });
			}
          	//http://yalime.ddns.net/limesurvey/scripts/video_estimation/save_video_estimation.php?resp=111&date=11.11.2111&time=1756.1243235
          	var check_quota_url = "http://yalime.ddns.net/limesurvey/scripts/video_estimation/save_video_estimation.php?resp="+resp+"&date="+now+"&time="+VideoTime+"&ans="+CurrentAnswer;
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
  $("#ls-button-submit").hide();
   setTimeout(function () {
            $('#ls-button-submit').show();
        }, 5 400 000);
});

</script>