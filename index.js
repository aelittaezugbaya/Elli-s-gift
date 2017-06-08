(function (canvas) {
  window.requestAnimFrame = (function(callback) {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame
      || window.mozRequestAnimationFrame || window.oRequestAnimationFrame
      || window.msRequestAnimationFrame || function(callback) {
        window.setTimeout(callback, 1000 / 30);
      };
  })();

  var context = canvas.getContext('2d');
    sizes = ['micro', 'mini', 'medium', 'big', 'max'],
    elements = [],
    max_bright = 1,
    min_bright = .2;

  /* LOGICS */
  function draw() {
    setCanvasSize();
    generate(15000, .5);
    spark(1000);
  }
  draw();

  /* FUNCTIONS */

  function setCanvasSize() {
    canvas = document.getElementById("star_field");
    if (canvas.width  < window.innerWidth)
    {
      canvas.width  = window.innerWidth;
    }

    if (canvas.height < window.innerHeight)
    {
      canvas.height = window.innerHeight;
    }
  }

  function generate(starsCount, opacity) {
    for(var i = 0; i < starsCount; i++) {
      var x = randomInt(2, canvas.offsetWidth-2),
        y = randomInt(2, canvas.offsetHeight-2),
        size = sizes[randomInt(0, sizes.length-1)];

      elements.push(star(x, y, size, opacity));
    }
  }

  function spark(numberOfStarsToAnimate) {
    for(var i = 0; i < numberOfStarsToAnimate; i++) {
      var id = randomInt(0, elements.length - 1),
        obj = elements[id],
        newAlpha = obj.alpha;
      do {
        newAlpha = randomFloatAround(obj.alpha);
      } while(newAlpha < min_bright || newAlpha > max_bright)

      elements[id] = star(obj.x, obj.y, obj.size, newAlpha);
    }

    requestAnimFrame(function() {
      spark(numberOfStarsToAnimate);
    });
  }

  function star(x, y, size, alpha) {
    var radius = 0;
    switch(size) {
      case 'micro':
        radius = 0.8;
        break;
      case 'mini':
        radius = 1.0;
        break;
      case 'medium':
        radius = 1.2;
        break;
      case 'big':
        radius = 1.6;
        break;
      case 'max':
        radius = 1.8;
        break;
    }

    gradient = context.createRadialGradient(x, y, 0, x + radius, y + radius, radius * 2);
    gradient.addColorStop(0, 'rgba(255, 255, 255, ' + alpha + ')');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

    /* clear background pixels */
    context.beginPath();
    context.clearRect(x - radius - 1, y - radius - 1, radius * 2 + 2, radius * 2 + 2);
    context.closePath();

    /* draw star */
    context.beginPath();
    context.arc(x,y,radius,0,2*Math.PI);
    context.fillStyle = gradient;
    context.fill();

    return {
      'x': x,
      'y': y,
      'size': size,
      'alpha': alpha
    };
  }

  function randomInt(a, b) {
    return Math.floor(Math.random()*(b-a+1)+a);
  }

  function randomFloatAround(num) {
    var plusminus = randomInt(0, 1000) % 2,
      val = num;
    if(plusminus)
      val += 0.1;
    else
      val -= 0.1;
    return parseFloat(val.toFixed(1));
  }

})(document.getElementById("star_field"));

var music = document.getElementById('music');

$('.mute').click(function(e){
  music.muted = !music.muted;
  if(music.muted===true){
    $(this).removeClass('fa-volume-up').addClass('fa-volume-off');
  }else{
    $(this).removeClass('fa-volume-off').addClass('fa-volume-up');
  }
});
