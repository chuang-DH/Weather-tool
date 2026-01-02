Weather tool – modified and extended from AsmrProg 100 Days of JavaScript Day #10


This project is based on: "AsmrProg – 100 Days of JavaScript (Day 10 – Weather App)" 

https://github.com/AsmrProg-YT/100-days-of-javascript/tree/master/Day%20%2310%20-%20Weather%20App


I modified and extended the original project by adding new UI design and features full use by individual.
new UI function(fellowing beyond)


➕ Add automatic city autocomplete suggestions (dropdown list)


✅New features:


Input event detection
OpenWeather Geocoding API
Dropdown list using
Mouse click selection
Enter / ↑ / ↓ keyboard navigation
Active item highlighting
Auto-fill into input
Automatically trigger search


🎨 Add automatic theme color / background switching (morning / noon / evening / night)


❌Original version:  Not present at all


✅Added features:  Determined based on iconCode
Included:
morning-theme
day-theme
evening-theme
night-theme
Automatically clears classes
Mapped according to 01d / 02d / 03d / 04d / 50d / night
based on the icon switch 

 CSS
 
 
	.morning-theme{background: linear-gradient(135deg, #eca241, #D1913C)}

	
	.day-theme{background: linear-gradient(135deg,#5b6cff,#00e4ff);}
	

	.evening-theme{background: linear-gradient(135deg,#ff7e5f,#feb47b);}
	

	.night-theme{background: linear-gradient(135deg,#0b0b2e,#000000);}
	

JS
	
	
	const iconCode = json.weather[0].icon;






🌟 Added animated starry-sky background


❌Original version:  Not included


✅New createStars() includes :


	function createStars(){
	const starsContainer = document.querySelector(".stars");



100 stars

	for(let i=0; i<100; i++){
	const star = document.createElement("div");
	star.classList.add("star");


Random positions

	star.style.left = Math.random() * 100 + "vw";
	star.style.top = Math.random() * 100 + "vh";


Random sizes

	const size = Math.random() * 2 + 1;
	star.style.width = size + "px";
	star.style.height = size + "px";


Random twinkling


	star.style.animationDuration = (Math.random()*5 + 3) + "s";
	star.style.animationDelay = Math.random()*5 + "s";


appendChild to container

	starsContainer.appendChild(star);



🧭 Keyboard operation (navigate suggestions using arrow keys)


❌Original version:  Not included


✅Added features:  Use up/down keys to switch active item
Enter to select directly
selectedIndex state management




💧Additional weather information displayed


Original version only had:


temp


description


humidity


wind


✅Newly added:
pressure
cloudiness

	pressure.innerHTML = `${json.main.pressure}hPa`;
	cloudiness.innerHTML = `${json.clouds.all}%`;

	

<img width="638" height="423" alt="image" src="https://github.com/user-attachments/assets/cb874ed5-29f2-4f23-9bf3-813cc2fea456" />



<img width="411" height="212" alt="image" src="https://github.com/user-attachments/assets/2bff4998-ec43-43f9-bc58-88b274fdd9b1" />




<img width="414" height="204" alt="image" src="https://github.com/user-attachments/assets/1905bd6d-a2ab-4017-b13c-1c294ab9cf39" />



<img width="545" height="616" alt="image" src="https://github.com/user-attachments/assets/1352bedb-a648-4611-9ec2-8db2a89800d2" />


<img width="455" height="614" alt="image" src="https://github.com/user-attachments/assets/8dee9fe6-3f66-4794-b80c-55a4e94ad856" />


	


modified by Chuang, Dong-Hua mail: benalu85853@gmail.com If you find this useful, please ⭐ If you like it, don’t hesitate to give it a star!

