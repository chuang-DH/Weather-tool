//step1  OpenWeather Geocoding API get-https://openweathermap.org/api

//step2 image get from https://github.com/AsmrProg-YT/100-days-of-javascript/tree/master/Day%20%2310%20-%20Weather%20App/images

//OpenWeather Geocoding API call- http://api.openweathermap.org/geo/1.0/direct?q={city name}&limit={limit}&appid={API key}




const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const notFound = document.querySelector(".Not-found");
const input = document.querySelector(".search-box input");
const suggestions = document.querySelector(".suggestions");
const APIKey = "your API";

let selectedIndex = -1;

search.addEventListener("click", () => {

    suggestions.style.display = "none"; 
    suggestions.innerHTML = "";

    const APIKey = "your API";
    const city = document.querySelector(".search-box input").value;//value 拿輸入框裡使用者打的文字

    if (city === "")//如果使用者沒有輸入任何東西
        return; //return = 不要再往下跑了

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`)//metric = 攝氏 °C, imperial = 華氏 °F
        .then(response => response.json())
        .then(json => {
            //這裡開始處理回傳回來的 json 資料

            
            if (json.cod === "404") {//找不到城市
                container.style.maxHeight = "800px";//把 container 拉高一點
                weatherBox.style.display = "none";//隱藏天氣資訊
                weatherDetails.style.display = "none";//隱藏天氣細節
                notFound.style.display = "block";//顯示找不到的圖片
                notFound.classList.add("fadeIn");//加上淡入效果
                return;
            }
            
            notFound.style.display = "none";//隱藏找不到的圖片
            notFound.classList.remove("fadeIn");//移除淡入效果

            const image = document.querySelector(".weather-box img");
            const temperature = document.querySelector(".weather-box .temperature");
            const description = document.querySelector(".weather-box .description");
            const humidity = document.querySelector(".weather-details .humidity span");
            const wind = document.querySelector(".weather-details .wind span");
            const pressure = document.querySelector(".weather-details .pressure span");
            const cloudiness = document.querySelector(".weather-details .cloudiness span"); 

            switch (json.weather[0].main.toLowerCase()) {//根據不同的天氣狀況，顯示不同的圖片
                case "clear"://晴天
                    image.src = "img/clear_2.png";//更改圖片路徑
                    break;//break 跳出 switch
                case "rain"://雨天
                    image.src = "img/rain_2.png";
                    break;
                case "snow"://下雪
                    image.src = "img/snow_2.png";
                    break;
                case "clouds"://多雲
                    image.src = "img/cloud_2.png";
                    break;  
                case "haze":
                case "mist"://霧霾
                    image.src = "img/mist_2.png";
                    break;  
                case "drizzle"://雨天
                    image.src = "img/rain_2.png";
                    break;

                    default :
                    image.src = "";


            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;//取整數
            description.innerHTML = `${json.weather[0].description}`;//天氣描述
            humidity.innerHTML = `${json.main.humidity}%`;//濕度
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;//風速
            pressure.innerHTML = `${json.main.pressure}hPa`;//氣壓
            cloudiness.innerHTML = `${json.clouds.all}%`;//雲量

            weatherBox.style.display = "";//顯示天氣資訊
            weatherDetails.style.display = "";//顯示天氣細節
            weatherBox.classList.add("fadeIn"); //加上淡入效果
            weatherDetails.classList.add("fadeIn"); //加上淡入效果
            container.style.height = "590px";//把 container 拉高一點


            //會根據current weather icon的不同切換白天或晚上
            //測試_document.body.classList.add("night-theme");
            //要塞在有fetch 的地方
            const iconCode = json.weather[0].icon; 
    
    //先清空所有主題
    document.body.classList.remove(  
        "morning-theme",
        "day-theme",
        "evening-theme",
        "night-theme"
    )
      
if(iconCode.includes("n")){
    // 午夜模式
    document.body.classList.add("night-theme");
} 
else if(iconCode.includes("d")){

    // 早晨圖示 01d 02d
    if(iconCode.startsWith("01") || iconCode.startsWith("02")){
        document.body.classList.add("morning-theme");
    }
    // 黃昏感覺 03d 04d 50d
    else if(iconCode.startsWith("03") || iconCode.startsWith("04") || iconCode.startsWith("50")){
        document.body.classList.add("evening-theme");
    }
    // 一般白天
    else{
        document.body.classList.add("day-theme");
    }
}




    

    })

})


/***********************************************************/

input.addEventListener("input", async () => {// input 事件：使用者每輸入一個字元就會觸發一次
    const query = input.value.trim();//trim() 去除前後空白

    // 1️⃣ 太短不查
    if (query.length < 2) {
        suggestions.innerHTML = "";
        suggestions.style.display = "none";
        return; //不要再往下跑了
    }

    // 2️⃣ 呼叫 Geocoding API
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${APIKey}`;
    const response = await fetch(url);
    const cities = await response.json();

    // 3️⃣ 清空舊建議
    suggestions.innerHTML = "";

    selectedIndex = -1;//重設選取索引

    // 4️⃣ 顯示新建議
    cities
  .filter(city =>
      city.name.toLowerCase().startsWith(query.toLowerCase())
  )
  .forEach(city => {

      const li = document.createElement("li");
      li.textContent = `${city.name}, ${city.country}`;

      li.addEventListener("click", () => {
          input.value = city.name;
          suggestions.style.display = "none";
          search.click();
      });

      suggestions.appendChild(li);
  });
    
    suggestions.style.display = "block";
});


//反白小工具
function updateActiveItem() {
    const items = suggestions.querySelectorAll("li");

    items.forEach((item, index) => {
        item.classList.toggle("active", index === selectedIndex);
    });
}

input.addEventListener("keydown", (e) => {
    const items = suggestions.querySelectorAll("li");

    if (items.length === 0) return;

    if (e.key === "ArrowDown") {
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % items.length;
        updateActiveItem();
    }

    if (e.key === "ArrowUp") {
        e.preventDefault();
        selectedIndex =
            (selectedIndex - 1 + items.length) % items.length;
        updateActiveItem();
    }

    if (e.key === "Enter") {
        if (selectedIndex >= 0) {
            e.preventDefault();
            items[selectedIndex].click();
        }else {
        suggestions.style.display = "none";
        suggestions.innerHTML = "";
        search.click();
        }
    }
});


//suggestions 位置調整: 最初是直接跟隨 input 元素，但如果 input 元素大小改變了，suggestions 位置不會更新
const rect = input.getBoundingClientRect();

suggestions.style.position = "fixed";//這個元素的位置，是「固定在螢幕上（viewport）」的
suggestions.style.top = rect.bottom + "px";
suggestions.style.left = rect.left + "px";
suggestions.style.width = rect.width + "px";

//監聽 input 和 container 的尺寸變化
const observer = new ResizeObserver(() => {
    positionSuggestions();
});

observer.observe(input);
observer.observe(container);
let rafId = null;//用來儲存 requestAnimationFrame 的 ID

//使用 requestAnimationFrame 來優化位置更新
function safePosition() {
    if (rafId) return;
    
    //只在下一個重繪週期執行一次
    rafId = requestAnimationFrame(() => {
        positionSuggestions();
        rafId = null;//重設 ID，允許下一次調用
    });
}

function positionSuggestions() {
    const rect = input.getBoundingClientRect();
    suggestions.style.top = rect.bottom + "px";
    suggestions.style.left = rect.left + "px";
    suggestions.style.width = rect.width + "px";
}








//******************製造星星動態效果********************* */
function createStars(){
  const starsContainer = document.querySelector(".stars");

  for(let i=0; i<100; i++){
    const star = document.createElement("div");
    star.classList.add("star");

    // 隨機位置
    star.style.left = Math.random() * 100 + "vw";
    star.style.top = Math.random() * 100 + "vh";

    // 隨機大小
    const size = Math.random() * 2 + 1;
    star.style.width = size + "px";
    star.style.height = size + "px";

    // 隨機閃爍與速度
    star.style.animationDuration = (Math.random()*5 + 3) + "s";
    star.style.animationDelay = Math.random()*5 + "s";

    starsContainer.appendChild(star);
  }
}

createStars();










