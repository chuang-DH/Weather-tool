Weather tool – modified and extended from AsmrProg 100 Days of JavaScript Day #10


This project is based on: "AsmrProg – 100 Days of JavaScript (Day 10 – Weather App)" https://github.com/AsmrProg-YT/100-days-of-javascript/tree/master/Day%20%2310%20-%20Weather%20App/images


I modified and extended the original project by adding new UI design and features full use by individual.
new UI function


➕ Add automatic city autocomplete suggestions (dropdown list)


New features:


Input event detection
OpenWeather Geocoding API
Dropdown list using
Mouse click selection
Enter / ↑ / ↓ keyboard navigation
Active item highlighting
Auto-fill into input
Automatically trigger search


🎨 Add automatic theme color / background switching (morning / noon / evening / night)


Original version: ❌ Not present at all


Added features: ✅ Determined based on iconCode
Included:
morning-theme
day-theme
evening-theme
night-theme
Automatically clears classes
Mapped according to 01d / 02d / 03d / 04d / 50d / night




🌟 Added animated starry-sky background


Original version: ❌ Not included


New createStars() includes ✅:
100 stars
Random positions
Random sizes
Random twinkling
appendChild to container




🧭 Keyboard operation (navigate suggestions using arrow keys)


Original version: ❌ Not included


Added features: ✅ Use up/down keys to switch active item
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


modified by Chuang, Dong-Hua mail: benalu85853@gmail.com If you find this useful, please ⭐ If you like it, don’t hesitate to give it a star!

