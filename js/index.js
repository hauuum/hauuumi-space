function ready() {
  let wWidth = document.documentElement.clientWidth;
  let currentScrY = document.documentElement.scrollTop;
  const s1 = document.querySelector('#s1');
  const intro = s1.querySelector('.home-introduce')
  const introLeftTxt = s1.querySelector('.__left');
  const introRightTxt = s1.querySelector('.__right');
  const strength = s1.querySelector('.home-strength');
  const s2 = document.querySelector('#s2');
  const s3 = document.querySelector('#s3');
  const eleWork = document.querySelector('.work');
  const eleHeader = document.querySelector('header');
  const eleNav = document.querySelector('nav');
  const navMemu = document.querySelectorAll('nav > a');
  const eleH1 = document.querySelector('h1');
  const value = 0.04;
  let onScroll = true;



  //Click
  //Nav Click Event
  navMemu.forEach((ele) => {
    ele.classList.remove("active");
    ele.addEventListener('click', () => {
      ele.classList.add("active");
    });
  });
  

  //Scroll
  //Nav Scroll Event
  const changeBlackNav = () => {
    eleHeader.style.backgroundColor = '#0d1213';
    eleNav.style.color = '#fff';
    eleH1.style.color = '#fff';
    navMemu.forEach((ele) => {
      ele.classList.remove("active");
    });
  }

  const changeWhiteNav = () => {
    eleHeader.style.backgroundColor = '#fafafa';
    eleNav.style.color = '#010506';
    eleH1.style.color = '#010506';

    navMemu.forEach((ele) => {
      ele.classList.remove("active");
    });
  }

  const scrollNav = () => {
    currentScrY = document.documentElement.scrollTop;
    changeBlackNav();
    navMemu[0].classList.add("active");
    
    if (currentScrY >= s2.offsetTop - 20) {
      changeWhiteNav();
      navMemu[1].classList.add("active");
    }
    if (currentScrY >= eleWork.offsetTop - 20) {
      changeBlackNav();
      navMemu.forEach((ele) => {
        ele.classList.remove("active");
      });
    }
    if (currentScrY >= s3.offsetTop - 60) {
      changeWhiteNav();
      navMemu[2].classList.add("active");
    }
  }



  //Scroll Event
  const scrollParallax = () => {
    scrollNav();
    currentScrY = document.documentElement.scrollTop;

    const introScrollY = Math.round(intro.getBoundingClientRect().y / 10);
    console.log(intro.getBoundingClientRect().y);


    // let scaleValue;
    // let leftTrsnfValue;
    // let rightTrsnfValue;


    if (currentScrY == 0 && currentScrY <= document.querySelector('.home-main').offsetHeight) {
      setTimeout(mainTxtShadow, 1000);
    }


    if (introScrollY <= intro.offsetHeight && currentScrY < strength.offsetTop) {
      console.log('currentScrY:', currentScrY , 'strength.offsetTop:', strength.offsetTop)

      introLeftTxt.style.left =  '-' + introScrollY + '%';

    }



    //intro txt
    // if (currentScrY >= eleIntroduce.offsetTop - eleIntroduce.offsetHeight && currentScrY < s2.offsetHeight) {
    //   document.querySelector('.home-introduce .__left').style.marginLeft = currentScrY * value + '%';
    //   document.querySelector('.home-introduce .__right').style.marginLeft = '-' + currentScrY * value + '%';
    // }


    //work txt
    // if (currentScrY >= eleWork.offsetTop - (eleWork.offsetHeight / 2) && currentScrY < s3.offsetTop - (eleWork.offsetHeight / 2)) {
    //   scaleValue = Number(currentScrY * 0.00012);
    //   document.querySelectorAll('.work-txt > span').forEach(ele => {
    //     ele.style.opacity = '0';
    //   });
    // }
    // if (currentScrY >= eleWork.offsetTop && currentScrY < s3.offsetTop - (eleWork.offsetHeight / 3)) { 
    //   const workScr = currentScrY - s1.clientHeight - s2.clientHeight;

    //   document.querySelectorAll('.work-txt > span').forEach(ele => {
    //     ele.style.opacity = '1';
    //   });

    //   if (wWidth > 960) {
    //     leftTrsnfValue = Number(-eleWork.clientHeight / 4 + workScr / 3);
    //     rightTrsnfValue = Number(eleWork.clientHeight / 4 - workScr / 3);
    //   }
    //   else { 
    //     leftTrsnfValue = Number(-eleWork.clientHeight / 4 + workScr / 2.5);
    //     rightTrsnfValue = Number(eleWork.clientHeight / 4 - workScr / 2.5);
    //   }

    //   document.querySelector('.work-txt .__left').style.transform = 'translateX(' + leftTrsnfValue + 'px)';
    //   document.querySelector('.work-txt .__right').style.transform = 'translateX(' + rightTrsnfValue + 'px)';
  }

    


    

    //Project List
    const parallaxPrjList = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("view");
        }
        else {
          entry.target.classList.remove("view");
        }
      });
    });

    const prjList = document.querySelectorAll(".prj-list");
    prjList.forEach((ele, inx) => {
      parallaxPrjList.observe(ele, inx);
    });

  


 



  //Animation
  //twinkle Animation
  const starWrap = document.querySelector('#star-wrap');
  const star = () => { 
    let num = document.documentElement.clientWidth / 4;
    starWrap.innerHTML = "";

    for (var i = 0; i < num; i++) { 
      const w = starWrap.clientWidth;
      const h = s1.clientHeight;
      const randomL = Math.floor(Math.random() * w) ;
      const randomT = Math.floor(Math.random() * h) ;
      const randomW = Math.floor(Math.random() * 6) + 3;
      const opty = Math.random() * 10 / 10 ;
      const anim = Math.random() * 5 + 0.8;
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

  //Main Text Animation
  const mainTxtShadow = () => { 
    const mainTxtH2 = s1.querySelector('.home-txt h2');
    const mainTxtEm = s1.querySelector('.home-txt em');

    mainTxtH2.style.textShadow = '-0.25em 0.25em 0 rgb(0 0 0 / 90%)';
    mainTxtEm.style.marginLeft = '-5rem';
    mainTxtEm.style.textShadow = '-0.25em 0.25em 0 rgb(0 0 0 / 90%)';
  }



  
  //Typing Text Animation
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

  
  

  //마지막 이미지 애니메이션







  //초기값
  history.scrollRestoration = "manual";
  setTimeout(mainTxtShadow, 1000);
  scrollParallax();
  star();
  dynamic(randomString());
  

  
  
  
  
  document.addEventListener('scroll', () => {

    scrollParallax();
  });
  document.addEventListener('touchMove', () => {

    scrollParallax();
  });
  document.addEventListener('touchStart', () => {
    scrollParallax();
  });
  document.addEventListener('touchEnd', () => {
    scrollParallax();
  });
  document.addEventListener('resize', () => { 
    star();
    scrollParallax();
  })
  

  
  
  
  
  
  
  
  
  
  
  


  
  
  
  
};

document.addEventListener("DOMContentLoaded", ready); 