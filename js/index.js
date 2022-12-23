function ready() {
  let currentScrY;
  let wWidth;
  const s1 = document.querySelector('#s1');
  const s2 = document.querySelector('#s2');
  const s3 = document.querySelector('#s3');
  const work = document.querySelector('.work');
  const eleHeader = document.querySelector('header');
  const eleNav = document.querySelector('nav');
  const navMemu = document.querySelectorAll('nav > a');
  const eleH1 = document.querySelector('h1');


  //화면 로딩

  //Nav dark color
  const changeBlackNav = () => {
    eleHeader.style.backgroundColor = '#0d1213';
    eleHeader.style.borderBottom = '#000000';
    eleNav.style.color = '#fff';
    eleH1.style.color = '#fff';
    navMemu.forEach((ele) => {
      ele.classList.remove("active");
    });
  }
  //Nav white color
  const changeWhiteNav = () => {
    eleHeader.style.backgroundColor = '#fafafa';
    eleHeader.style.borderBottom = '1px solid #efefef';
    eleNav.style.color = '#010506';
    eleH1.style.color = '#010506';

    navMemu.forEach((ele) => {
      ele.classList.remove("active");
    });
  }

  //Nav color changes by scroll
  const scrollNav = () => {
    currentScrY = document.documentElement.scrollTop;
    changeBlackNav();
    navMemu[0].classList.add("active");
    
    if (currentScrY >= s2.offsetTop - 20) {
      changeWhiteNav();
      navMemu[1].classList.add("active");
    }
    if (currentScrY >= work.offsetTop - 20) {
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

  //Nav click Event
  navMemu.forEach((ele) => {
    ele.classList.remove("active");
    ele.addEventListener('click', () => {
      ele.classList.add("active");
    });
  });

  //Main text-decoration changes by scroll
  const mainTxtShadow = new IntersectionObserver((entries) => {
    const mainTxtH2 = s1.querySelector('.home-txt h2');
    const mainTxtEm = s1.querySelector('.home-txt em');
    
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        mainTxtH2.style.textShadow = '-0.25em 0.25em 0 rgb(0 0 0 / 90%)';
        mainTxtEm.style.marginLeft = '-5rem';
        mainTxtEm.style.textShadow = '-0.25em 0.25em 0 rgb(0 0 0 / 90%)';
      }
      else {
        mainTxtH2.style.textShadow = 'none';
        mainTxtEm.style.marginLeft = '0px';
        mainTxtEm.style.textShadow = 'none';
      }
    });
  });
  const homeMain = s1.querySelector('.home-main')
  mainTxtShadow.observe(homeMain);

  //Intro text moves by scroll
  const scrollIntroTxt = () => {
    const intro = s1.querySelector('.home-introduce');
    const introScrollY = Math.round(intro.getBoundingClientRect().y / 10);
    const introLeftTxt = s1.querySelector('.__left');
    const introRightTxt = s1.querySelector('.__right');

    if (introScrollY <= intro.offsetHeight) {
      if (introScrollY > 0) {
        introLeftTxt.style.left = '-' + introScrollY + '%';
        introRightTxt.style.right = '-' + introScrollY + '%';
      }
      if (introScrollY < 0) {
        introLeftTxt.style.left = Math.abs(introScrollY) + '%';
        introRightTxt.style.right = Math.abs(introScrollY) + '%';
      }
    }

    document.removeEventListener('scroll', scrollIntroTxt);
  }

  //Strength text decoration move by scroll 
  const scrollStrengthTxt = () => {
    const strengthList = s1.querySelectorAll('.home-strength-list');
    strengthList.forEach((ele) => {
      ele.classList.remove('view');
    });

    if (strengthList[0].getBoundingClientRect().y <= strengthList[0].offsetHeight * 1.5) {
      strengthList[0].classList.add('view');
      if (strengthList[1].getBoundingClientRect().y <= strengthList[1].offsetHeight / 2) {
        strengthList[1].classList.add('view');
      }
    }
  }

  //Project List shows by scroll
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

  //Work video moves by scroll
  const scrollVideo = () => { 
    const workScrollY = work.getBoundingClientRect().y;
    const scaleValue = 1 - workScrollY / 1000

    if (workScrollY <= work.offsetHeight/2) { 
      work.querySelector('video').style.transform = 'translate(-50%, -50%) scale(' + scaleValue + ')';
    }

    document.removeEventListener('scroll', scrollVideo);
  }

  //Work text moves by scroll
  const scrollWorkTxt = () => {
    const workLeftTxt = work.querySelector('.__left');
    const workRightTxt = work.querySelector('.__right');
    const workTxtScollY = Math.round(s3.getBoundingClientRect().y / 10 - 80);
    const workDesc = work.querySelector('p');
    
    if (work.getBoundingClientRect().y <= 0) {
      work.querySelectorAll('span').forEach((ele) => {
        ele.style.opacity = '1';
      });
      workLeftTxt.style.left = '-' + workTxtScollY + '%';
      workRightTxt.style.right = '-' + workTxtScollY + '%';
      workDesc.style.opacity = '1';
    }
    else { 
      workDesc.style.opacity = '0';
      work.querySelectorAll('span').forEach((ele) => {
        ele.style.opacity = '0';
      });
    }

    document.removeEventListener('scroll', scrollWorkTxt);
  }

  //Scroll Event
  const scrollParallax = () => {
    currentScrY = document.documentElement.scrollTop;

    scrollNav();
    scrollIntroTxt();
    scrollStrengthTxt();
    scrollVideo();
    scrollWorkTxt();
  }

  //Twinkle Animation 
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

  const resetTying = () => { 
    typingTarget.textContent = "";
    inx++;

    if (inx == txtgArr.length) { 
      inx = 0;
    }
    dynamic(randomString());
  }

  //Move image Animation
  const imgMove = (e) => {
    wWidth = window.outerWidth;
    
    if (wWidth >= 768) {
      this.querySelectorAll('.space-img').forEach(ele => {
        const speed = ele.getAttribute('data-speed');
        const x = (window.innerWidth - e.clientX * speed) / 100;
        const y = (window.innerWidth - e.clientY * speed) / 100;
  
        ele.style.transform = `translate(${x}px, ${y}px)`;
      })
    }
    else { 
      this.querySelectorAll('.space-img').forEach(ele => {
        ele.style.transform = `translate(0px, 0px)`;
      })
    }
  }
  
  
  //Default
  history.scrollRestoration = "manual";
  scrollNav();
  scrollParallax();
  star();
  dynamic(randomString());
  
  document.addEventListener('scroll', scrollParallax);
  document.addEventListener('touchMove', scrollParallax);
  document.addEventListener('touchStart', scrollParallax);
  document.addEventListener('touchEnd', scrollParallax);
  document.addEventListener('mousemove', imgMove);
  document.addEventListener('resize', () => {
    star();
    scrollParallax();
    imgMove();
  });
};

document.addEventListener("DOMContentLoaded", ready); 