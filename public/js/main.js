let step = 1,
    score = 0,
    items = 0,
    runGame,
    tickTimeout,
    customerId,
    gift = 0;
const URLAPI = 'https://d2.beetech.one',
      API = '/shbmoney/index.php/api-data/';
const vh = () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    $('html').css('--width', $('.vp-game').width() + 'px');
    window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    $('html').css('--width', $('.vp-game').width() + 'px');
    });
}



function random(min,max){
 	return Math.round(Math.random() * (max-min) + min);
}

const getImg = (number) => {
    let img = '';
    switch(number) {
      case 1:
          img = '/images/card.png';
          break;
      case 2:
          img = '/images/qrcode.png';
          break;
      case 3:
          img = '/images/tap-2-phone.png';
          break;
      case 4:
          img = '/images/vpBank.png';
          break;
      case 5:
          img = '/images/vpBankNeo.png';
          break;
      default:
          img = '/images/vpCard.png';
    }
  return img;

}
function getRandomNumber() {
  let random = Math.random();
  if (random < 0.5) {
      return 1;
  } else if (random < 0.6) {
      return 2;
  } else if (random < 0.7) {
      return 3;
  } else if (random < 0.8) {
      return 4;
  } else if (random < 0.9) {
      return 5;
  } else {
      return 6;
  }
}


function dropBox(){
  var length = random((240 * 100 / $(".game").width()), ($(".game").width() - (240 * 100 / $(".game").width())));
  var velocity = random(3000, 5000);
  var size = random(50, 150);
  $(window).on('resize', function(){
    length = random((240 * 100 / $(".game").width()), ($(".game").width() - (240 * 100 / $(".game").width())));
  });
  let numberRandom = getRandomNumber();

  var thisBox = $("<div/>", {
    class: `box box-${numberRandom}`,
    style:  `left: ${size + length > $('.game').width() ? length - ($('.game').width() - length) : length}px; transition: transform ${velocity}ms linear; background-image: url(${getImg(numberRandom)});`
  });
  $(".game").append(thisBox);
  setTimeout(function(){
    thisBox.addClass("move");
  }, random(0, 500) );
  thisBox.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
              function(event) {
    $(this).remove();
  });
  items++;
  console.log(items);
}


$(document).on('click', '.box', function(){
  let boxOffset = $(this).offset();
  let docWidth = $(document).width();
  let docHeight = $(document).height();

  let leftPercent = (boxOffset.left / docWidth) * 100;
  let topPercent = (boxOffset.top / docHeight) * 100;

  let point = $('<div class="point"><img src="/images/point.png" alt=""/></div>');
  point.css({
    'position': 'absolute',
    'left': `${leftPercent}%`,
    'top': `${topPercent}%`,
    'width': '23%',
  });

  $('#gameArea').append(point);
  setTimeout(function(){
    point.fadeOut(function() {
      $(this).remove();
    });
  }, 600);
 
  if($(this).hasClass('box-1')) {
    gameOver(false);
    return false; 
  }
  score += 1;
  $('.score').find('img').attr('src', `/images/${score}.png`);
  if (score === 20) {
    gameOver(true);
  }
  console.log('click', score)
  // $(".score").html(score);
  $(this).remove();
});


const loading = (status) => {
  if(status) {
    $('#loading').fadeIn();
  } else {
    $('#loading').fadeOut();
  }

}

function countdown() {
    	var seconds = 30;
	    function tick() {
	        var counter = document.getElementById("counter");
	        seconds--;
	        counter.innerHTML = '00:' + (seconds < 10 ? "0" : "")  + String(seconds);
	        if( seconds > 0 ) {
            tickTimeout = setTimeout(tick, 1000);
	            // draw();
	   			// update();
	        } else {
              gameOver(false);
	        }
	    }
    	tick();
}

const postApi = (type) => {
  loading(true);
  let data;
  if(type === 'register') {
    data = {
      c_name: $('#name').val(),
      phone: $('#telephone').val(),
      email: $('#email').val(),
    }
  } else {
    data = {
      customer_id: customerId,
    }
  }
  $.ajax({
    type: 'POST',
    url: `${URLAPI}${API}`,
    data: data,
    dataType: 'json',
    success: function(response) {
      console.log(response)
      loading(false);
      if(type === 'register') {
        customerId = response.customer_id;
        gift = response.qua;
        if(customerId === 0) {
          new Fancybox(
            [
              {
                src: `<p>${response.message}.</p>`,
                type: "html",
              },
            ],
          );
          return false;
        }
        $('.step-2').hide();
        $('.step-3').fadeIn();
        startGame();
      } else {
        $('#result').html(`
          <img src="/images/gift-${gift + 1}.png" alt="">
        `)
        $('.step-4 .winner').show();
      }
    }
  });
}

const gameOver = (winner) => {
  clearInterval(runGame);
  clearTimeout(tickTimeout);
  $('#gameArea .box').remove();
  $('.step').hide();
  $(`.step-4`).fadeIn();
  if(winner) {
    postApi('endgame');
  } else {
    $('.step-4 .loser').show();
  }
}

const startGame = () => {
  runGame = setInterval(function(){
    dropBox();
  }, 500);
  countdown();
}

const submitForm = () => {
  $("form").validate({
    rules: {
        name: {
            required: true
        },
        telephone: {
            required: true,
            digits: true,
            rangelength: [10, 11]
        },
        email: {
            required: true,
            email: true
        }
    },
    messages: {
        name: {
            required: "Vui lòng nhập tên"
        },
        telephone: {
            required: "Vui lòng nhập số điện thoại",
            digits: "Vui lòng nhập đúng số điện thoại",
        },
        email: {
            required: "Vui lòng nhập email",
            email: "Vui lòng nhập đúng định dạng email"
        }
    },
    submitHandler: function(form) {
        postApi('register');
    }
  });
}
const nextStep = () => {
  $('.next-step').click(function(e) {
      e.preventDefault();
      step++;
      $('.step').hide();
      $(`.step-${step}`).fadeIn();
      if(step == 3) {
        startGame();
      }
  });
}
$(document).ready(function() {
    vh();
    nextStep();
    submitForm();
});