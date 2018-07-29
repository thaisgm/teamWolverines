$('.address').on("change keyup paste",
  function(){
    console.log("HERE")
    if($(this).val()){
      $('.icon-paper-plane').addClass("next");
    } else {
      $('.icon-paper-plane').removeClass("next");
    }
  }
);

$('.next-button').hover(
  function(){
    $(this).css('cursor', 'pointer');
  }
);

$('.next-button.address').click(
  function(){
    console.log("Something");
    $('.address-section').addClass("fold-up");
    $('.level-section').removeClass("folded");
  }
);

$('.level').on("change",//change keyup paste",
  function(){
    console.log("here");
    if($(this).val()){
      $('.icon-lock').addClass("next");
    } else {
      $('.icon-lock').removeClass("next");
    }
  }
);

$('.next-button.level').click(
  function(){
    console.log("Something");
    $('.level-section').addClass("fold-up");
    $('.distance-section').removeClass("folded");
  }
);

$('.distance').on("change keyup paste",
  function(){
    if($(this).val()){
      $('.icon-distance-lock').addClass("next");
    } else {
      $('.icon-distance-lock').removeClass("next");
    }
  }
);

$('.next-button.distance').click(
  function(){
    console.log("DIstance");
    $('.distance-section').addClass("fold-up");
    //$('.submit').css("marginTop", 0)
    //.$('.performance-section').removeClass("folded");
    $('.performance-section').removeClass("folded");
  }
);

$('.performance').on("change keyup paste",
  function(){
    if($(this).val()){
      $('.icon-performance-lock').addClass("next");
    } else {
      $('.icon-performance-lock').removeClass("next");
    }
  }
);

$('.next-button.performance').click(
  function(){
    console.log("DIstance");
    $('.performance-section').addClass("fold-up");
    //$('.submit').css("marginTop", 0)
    //.$('.performance-section').removeClass("folded");
    $('.programs-section').removeClass("folded");
  }
);

$('.programs').on("change keyup paste",
  function(){
    if($(this).val()){
      $('.icon-programs-lock').addClass("next");
    } else {
      $('.icon-programs-lock').removeClass("next");
    }
  }
);

$('.next-button.programs').click(
  function(){
    console.log("programs");
    $('.programs-section').addClass("fold-up");
    //$('.submit').css("marginTop", 0)
    //.$('.performance-section').removeClass("folded");
    $('.languages-section').removeClass("folded");
  }
);

$('.languages').on("change keyup paste",
  function(){
    if($(this).val()){
      $('.icon-languages-lock').addClass("next");
    } else {
      $('.icon-languages-lock').removeClass("next");
    }
  }
);

$('.next-button.languages').click(
  function(){
    console.log("programs");
    $('.languages-section').addClass("fold-up");

    $('.languageSelection-section').removeClass("folded");
  }
);


$('.icon-languageSelection-lock').click(
  function(){
    console.log("last");
    $('.languageSelection-section').addClass("fold-up");
    $('.submit').css("marginTop", 0)
  }
);
