function ready() {
  const s1 = document.querySelector('#s1');
  const s2 = document.querySelector('#s2');
  const s3 = document.querySelector('#s3');
  const eleWork = document.querySelector('.work');
  const eleIntroduce = document.querySelector('.home-introduce');
  const eleHeader = document.querySelector('header');
  const eleNav = document.querySelector('nav');
  const eleNavMemu = document.querySelectorAll('nav > a');
  const eleH1 = document.querySelector('h1');
  let value = 0.04;


  //네브 클릭시 액티브 이벤트
  eleNavMemu.forEach((ele) => {
    ele.addEventListener('click', function () {
      eleNavMemu.forEach((ele) => {
        ele.classList.remove("active");
      });
      ele.classList.add("active");
    });
  });
  

  //네브 스크롤 & 클릭 이벤트
  const scrollNav = () => {
    let currentScrY = window.scrollY;
    eleHeader.style.backgroundColor = '#0d1213';
    eleNav.style.color = '#fff';
    eleH1.style.color = '#fff';
    eleNavMemu.forEach((ele) => {
      ele.classList.remove("active");
    });
    eleNavMemu[0].classList.add("active");
    
    if (currentScrY >= s2.offsetTop - 20 && currentScrY < eleWork.offsetTop - 20) {
      eleHeader.style.backgroundColor = '#fafafa';
      eleNav.style.color = '#010506';
      eleH1.style.color = '#010506';

      eleNavMemu.forEach((ele) => {
        ele.classList.remove("active");
      });
      eleNavMemu[1].classList.add("active");
    }
    else if (currentScrY >= eleWork.offsetTop - 20 && currentScrY < s3.offsetTop - 20) {
      eleHeader.style.backgroundColor = '#0d1213';
      eleNavMemu.forEach((ele) => {
        ele.classList.remove("active");
      });
    }
    else if (currentScrY >= s3.offsetTop - 20) {
      eleHeader.style.backgroundColor = '#fafafa';
      eleNav.style.color = '#010506';
      eleH1.style.color = '#010506';
      eleNavMemu.forEach((ele) => {
        ele.classList.remove("active");
      });
      eleNavMemu[2].classList.add("active");
    }
  }


  //반짝이는 별 효과
  const starWrap = document.querySelector('#star-wrap');
  const star = () => { 
    let num = document.documentElement.clientWidth / 5;
    starWrap.innerHTML = "";

    for (var i = 0; i < num; i++) { 
      const w = starWrap.clientWidth;
      const h = s1.clientHeight;
      const randomL = Math.floor(Math.random() * w) ;
      const randomT = Math.floor(Math.random() * h) ;
      const randomW = Math.floor(Math.random() * 6) + 3;
      const opty = Math.round(Math.random() * 10) / 10 ;
      const anim = Math.floor(Math.random() * 5) + 1;
      const span = document.createElement("span");

      span.classList.add("star");
      span.style.left = randomL + 'px';
      span.style.top = randomT + 'px';
      span.style.width = randomW + 'px';
      span.style.height = randomW + 'px';
      span.style.opacity = opty;
      span.style.animationName = "twinkle";
      span.style.animationDuration = anim + "s";
      span.style.animationTimingFunction  = "ease-in-out";
      span.style.animationFillMode = "infinite";
      starWrap.appendChild(span);

    }
  }
  
  //intro txt 타이핑 효과
  const typingTarget = document.querySelector('#typing-txt');
  let txtgArr = [
    "변화를 즐기는",
    "배움의 욕심이 끝이 없는",
    "하고자하는 일은 기필코 해내는"
  ];
  let inx = 0;

  const randomString = () => { 
    let selectString = txtgArr[inx];
    let selectStringArr = selectString.split("");
    return selectStringArr;
  }

  const resetTying = () => { 
    typingTarget.textContent = "";
    inx++;

    if (inx == txtgArr.length) { 
      inx = 0;
    }
    dynamic(randomString());
  }

  const dynamic = (randomArr) => { 
    if (randomArr.length > 0) {
      typingTarget.textContent += randomArr.shift();
      setTimeout(function () {
        dynamic(randomArr);
      }, 80);
    }
    else { 
      setTimeout(resetTying, 800);
    }
  }


  //work txt 스크롤 이벤트
  const scrollParallax = () => { 
    let currentScrY = window.pageYOffset;
    let scaleValue;
    let leftTrsnfValue;
    let rightTrsnfValue;
    let opctTransValue;

    //intro txt
    if (currentScrY >= eleIntroduce.offsetTop - eleIntroduce.offsetHeight && currentScrY < s2.offsetTop) {
      document.querySelector('.home-introduce .__left').style.marginLeft = currentScrY * value + '%';
      document.querySelector('.home-introduce .__right').style.marginLeft = '-' + currentScrY * value + '%';
    }
    

    //work txt
    else if (currentScrY >= eleWork.offsetTop - (eleWork.offsetHeight / 5) && currentScrY < s3.offsetTop) {

      //여긴 수정하기!
      
      scaleValue = Number(currentScrY * value / 300);
      document.querySelector('.work-bg > video').style.transform = 'translate(-50%, -50%) scale(' + scaleValue + ')';
      
      document.querySelector('.work-txt .__left').style.transform = 'translateX(-800px)';
      document.querySelector('.work-txt .__right').style.transform = 'translateX(800px)'; 
      
    
      if (currentScrY >= eleWork.offsetTop && currentScrY < s3.offsetTop - (eleWork.offsetHeight / 5)) {
        opctTransValue = Number(currentScrY * 0.00009);
        leftTrsnfValue = Number(-800 + Math.round(currentScrY / 11));
        rightTrsnfValue = Number(800 - Math.round(currentScrY / 11));

        document.querySelector('.work-txt .__left').style.transform = 'translateX(' + leftTrsnfValue + 'px)';
        document.querySelector('.work-txt .__right').style.transform = 'translateX(' + rightTrsnfValue + 'px)';
        document.querySelectorAll('.work-txt span').forEach(ele => {
          ele.style.opacity = opctTransValue;
        })
      }
      
      
    }
    else { 
      
    }

  }



  //초기값
  scrollNav();
  scrollParallax();
  star();
  dynamic(randomString());
  

  
  
  
  
  window.addEventListener('scroll', () => {
    scrollNav();
    scrollParallax();
  });
  window.addEventListener('touchMove', () => {
    scrollNav();
    scrollParallax();
  });
  window.addEventListener('touchStart', () => {
    scrollNav();
    scrollParallax();
  });
  window.addEventListener('touchEnd', () => {
    scrollNav();
    scrollParallax();
  });
  window.addEventListener('resize', () => { 
    scrollNav();
    scrollParallax();
    star();
  })
  

  
  
  
  
  
  
  
  
  
  
  


  //움직이는 행성
  
  
  
};

document.addEventListener("DOMContentLoaded", ready); 