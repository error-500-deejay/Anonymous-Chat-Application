(() => {
  let TimeDisplayInterval,
    timeOnWebsite = 0,
    timeLimitForWebsite,
    datajson;

  function secondsToHms(sthD) {
    sthD = Number(sthD);
    var sthH = Math.floor(sthD / 3600);
    var sthM = Math.floor((sthD % 3600) / 60);
    var sthS = Math.floor((sthD % 3600) % 60);

    var hDisplay = sthH > 0 ? sthH + (sthH == 1 ? " hr, " : " hrs ") : "";
    var mDisplay = sthM > 0 ? sthM + (sthM == 1 ? " min, " : " mins ") : "";
    var sDisplay = sthS > 0 ? sthS + (sthS == 1 ? " sec" : " sec") : "";
    return hDisplay + mDisplay + sDisplay;
  }

  function displayTimeUsed() {
    timeOnWebsite = timeOnWebsite + datajson.displayclockInterval;
    //console.log(secondsToHms(timeOnWebsite));
    document.getElementsByClassName(
      "consumedTimerDisplayer"
    )[0].innerHTML = `You are here for
         <br>
         ${secondsToHms(timeOnWebsite)}`;
  }

  function startTimer(datajson) {
    if (datajson.displayclock) {
      //console.log(secondsToHms(timeOnWebsite));
      TimeDisplayInterval = setInterval(
        displayTimeUsed,
        datajson.displayclockInterval * 1000
      );

      let timeConsumedDiv = document.createElement("div");
      timeConsumedDiv.setAttribute(`class`, `consumedTimerDisplayer`);
      timeConsumedDiv.setAttribute(
        `style`,
        ` margin: 10px; padding: 15px 20px; position: fixed; right: 0px; z-index: 1000000; color: black; border: 1px solid black; border-radius: 5px; text-align: center; background: #00000026; `
      );

      timeConsumedDiv.innerHTML = `You are here for
         <br>
         0 sec`;
      document.body.appendChild(timeConsumedDiv);
    }

    if (datajson.message == "") {
      datajson.message = `You have reached the set Limit.<br> Focus and be Productive. <br><br> <div style="font-style: italic;">
            The only place where success comes before work is in dictionary. 
            </div><span> - Vidal Sassoon</span>`;
    }

    var styles = `
        .limiterModalMain {
        opacity: 1;
        transition: opacity 1s, display 1s; 
        }
    
        .limiterModalMain.fade {
        opacity: 0;
        }`;

    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    let timerModalLayoutDiv = document.createElement("div");
    timerModalLayoutDiv.setAttribute(
      `style`,
      `position: fixed;z-index:2000;top: 0px;right: 0px;left: 0px;bottom: 0px;background: #00000069;`
    );
    timerModalLayoutDiv.setAttribute(`class`, `limiterModalMain fade`);
    timerModalLayoutDiv.innerHTML = ` <div style="margin: 15% 25%;width: 40%;text-align: center;/* height: auto; */border: 1px solid;padding: 20px;border-radius: 5px;background: white;font-size: 20px;font-family: Segoe UI;" segoe="" class="limiterModalBody">
            <div style="padding: 10px;font-size: 20px;font-family: Segoe UI;" segoe="" class="limiterModalHeader">
                 Daily Limit Reached!
            </div>
            <hr style=" margin: 10px 10%; "> 
            <div style="font-size: 15px;margin: 20px auto;"> 
                ${datajson.message}
            </div>
            <hr style=" margin: 10px 10%; "> 
            <div>
            <button style="margin: 15px;padding: 11px 19px;font-family: Segoe UI;" segoe="" onclick='document.getElementsByClassName("limiterModalMain")[0].classList.toggle("fade");'> 
                Kill Timer and Continue Browsing... </button> 
            </div> 
        </div>`;
    document.body.appendChild(timerModalLayoutDiv);

    setTimeout(() => {
      ////console.log("Timeout");
      document
        .getElementsByClassName(`limiterModalMain`)[0]
        .classList.toggle("fade");
      //   document.getElementsByClassName(`limiterModalMain`)[0].style.display =
      //     "block";
    }, timeLimitForWebsite * 1000);
  }

  window.onload = (event) => {
    ////console.log("page is fully loaded--");
    ////console.log(window.location.hostname);
    datajson = {
      blockurlarr: [{ url: "localhost", time: 15 }],
      displayclock: true,
      message: "",
      displayclockInterval: 5,
    };

    if (typeof Storage !== "undefined") {
      // Store
      localStorage.setItem(
        "LIMIT_USER_USAGE_ON_WEBSITE",
        JSON.stringify(datajson)
      );
      datajson = JSON.parse(
        localStorage.getItem("LIMIT_USER_USAGE_ON_WEBSITE")
      );

      let urlarray = [];
      urlarray = datajson.blockurlarr.map((el) => el.url);

      if (urlarray.includes(window.location.hostname)) {
        //console.log("start timer", urlarray);

        timeLimitForWebsite = datajson.blockurlarr.find(
          (el) => el.url == window.location.hostname
        ).time;
        //console.log(timeLimitForWebsite);

        startTimer(datajson);
      }
    } else {
      alert(
        "Your browser doesnot support some of our services. Please temporary disabled or remove the extension. We are working on solving this issue. Appologies for inconvenience"
      );
    }
  };
})();
