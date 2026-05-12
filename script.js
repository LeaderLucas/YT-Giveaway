let currentUser = null;

// SAFE LOAD USERS
let users = JSON.parse(
localStorage.getItem("users")
) || [];

// AUTO CREATE OWNERS
if(users.length === 0){

users = [

{
name:"Lucas_Arora",
password:"admin123",
role:"owner",
coins:0
},

{
name:"Robert",
password:"admin1234",
role:"owner",
coins:10
}

];

save();

}

// SAVE
function save(){

localStorage.setItem(
"users",
JSON.stringify(users)
);

}

// SIGNUP
function signup(){

let u =
document.getElementById("username").value;

let p =
document.getElementById("password").value;

if(users.find(x=>x.name===u)){

alert("User already exists");
return;

}

users.push({

name:u,
password:p,
role:"subscriber",
coins:0

});

save();

alert("Signup done");

}

// LOGIN
function login(){

let u =
document.getElementById("username").value;

let p =
document.getElementById("password").value;

let user = users.find(

x => x.name===u &&
x.password===p

);

if(!user){

alert("Wrong login");
return;

}

currentUser = user;

localStorage.setItem(
"currentUser",
u
);

showDashboard();

}

// SHOW DASHBOARD
function showDashboard(){

document.getElementById("loginPage")
.classList.add("hidden");

document.getElementById("dashboard")
.classList.remove("hidden");

document.getElementById("userInfo")
.innerText =
"User: " + currentUser.name;

document.getElementById("roleInfo")
.innerText =
"Role: " + currentUser.role;

updateUI();

}

// UPDATE UI
function updateUI(){

let user = users.find(
x => x.name===currentUser.name
);

document.getElementById("coins")
.innerText = user.coins;

// RESET
document.getElementById("adminPanel")
.classList.add("hidden");

// OWNER ONLY
if(user.role==="owner"){

document.getElementById("adminPanel")
.classList.remove("hidden");

}

}

// ADD COINS
function addCoins(){

if(currentUser.role!=="owner"){

alert("Only owner");
return;

}

let target =
prompt("Username?");

let amount =
parseInt(prompt("Coins?"));

let user = users.find(
x => x.name===target
);

if(user){

user.coins += amount;

save();

updateUI();

alert("Coins Added ✅");

}

}

// VIEW USERS
function viewUsers(){

if(currentUser.role!=="owner"){

alert("Only owner");
return;

}

let table =
document.getElementById("userTableBody");

table.innerHTML = "";

users.forEach((u,i)=>{

table.innerHTML += `

<tr>

<td>${i+1}</td>
<td>${u.name}</td>
<td>${u.role}</td>
<td>${u.coins}</td>

</tr>

`;

});

document.getElementById("userTableBox")
.classList.remove("hidden");

}

// CLOSE TABLE
function closeTable(){

document.getElementById("userTableBox")
.classList.add("hidden");

}

// MAKE ADMIN
function makeAdmin(){

if(currentUser.role!=="owner"){

alert("Only owner");
return;

}

let target =
prompt("Username?");

let user = users.find(
x => x.name===target
);

if(!user){

alert("User not found");
return;

}

user.role = "admin";

save();

alert(
target + " is now ADMIN 👑"
);

}

// DATABASE
function showDatabase(){

if(currentUser.role!=="owner"){

alert("Only owner");
return;

}

alert(
JSON.stringify(users,null,2)
);

}
// STATUS
function statusFeature(){

let history = JSON.parse(
localStorage.getItem(
"history_"+currentUser.name
)
) || [];

let text = "";

history.forEach(h=>{
text += "• " + h + "\n";
});

if(text===""){
text = "No history";
}

alert(

"📊 STATUS 📊\n\n" +

"User: " + currentUser.name + "\n\n" +

"Role: " + currentUser.role + "\n\n" +

"Coins: " + currentUser.coins + "\n\n" +

"━━━━━━━━━━\n\n" +

text

);

}

// EARN MONEY
function earnMoney(){

alert(
"Coming Soon 🚀"
);

}
// SUBSCRIBE REQUEST STORAGE
let subscribeRequests = JSON.parse(
localStorage.getItem("subscribeRequests")
) || [];

// OPEN SUBSCRIBE PAGE
function subscribeVerification(){

// already approved
let approvedUsers = JSON.parse(
localStorage.getItem("subApproved")
) || [];

if(
approvedUsers.includes(currentUser.name)
){

alert(
"You already received subscribe reward ✅"
);

document.getElementById("subscribeBox")
.classList.add("hidden");

return;

}

// create page if not exists
if(!document.getElementById("subscribePage")){

let html = `

<div id="subscribePage" class="container">

<div class="card">

<h2>Subscribe Verification ✅</h2>

<p>
Subscribe karo aur 50,000 coins pao 💰
</p>

<img
src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
style="
width:200px;
display:block;
margin:auto;
cursor:pointer;
"
onclick="openChannel()"
>

<p id="loadingText"></p>

<input
type="file"
id="subscribeProof"
accept="image/*">

<button onclick="submitSubscribeProof()">
Submit Verification
</button>

<button onclick="closeSubscribePage()">
Back
</button>

</div>

</div>

`;

document.body.insertAdjacentHTML(
"beforeend",
html
);

}

// open page
document.getElementById("dashboard")
.classList.add("hidden");

document.getElementById("subscribePage")
.classList.remove("hidden");

}

// OPEN CHANNEL
function openChannel(){

let loading =
document.getElementById("loadingText");

loading.innerText =
"Loading YouTube...";

setTimeout(()=>{

window.open(
"https://youtube.com/@playwithadmin?si=DkOEILCtPQgiMd_b",
"_blank"
);

loading.innerText = "";

},3000);

}

// SUBMIT PROOF
function submitSubscribeProof(){

let file =
document.getElementById("subscribeProof").files[0];

if(!file){

alert("Upload screenshot first ❌");
return;

}

// already pending check
let already = subscribeRequests.find(
x => x.name === currentUser.name
);

if(already){

alert(
"Application already submitted ⏳"
);

return;

}

let reader = new FileReader();

reader.onload = function(e){

subscribeRequests.push({

name: currentUser.name,

role: currentUser.role,

coins: currentUser.coins,

image: e.target.result,

status: "pending"

});

localStorage.setItem(

"subscribeRequests",

JSON.stringify(subscribeRequests)

);

alert(
"Your application submitted waiting for review ✅"
);

closeSubscribePage();

};

reader.readAsDataURL(file);

}

// CLOSE PAGE
function closeSubscribePage(){

document.getElementById("subscribePage")
.classList.add("hidden");

document.getElementById("dashboard")
.classList.remove("hidden");

}

// OPEN NEW SUBSCRIBERS PAGE
function openNewSubscriberPage(){

if(
currentUser.role !== "owner" &&
currentUser.role !== "admin"
){

alert("Access Denied ❌");
return;

}

let table =
document.getElementById(
"newSubscriberTable"
);

table.innerHTML = "";

if(subscribeRequests.length === 0){

table.innerHTML = `

<tr>

<td colspan="3"
style="
padding:20px;
text-align:center;
color:gray;
">

No Pending Requests 📭

</td>

</tr>

`;

}else{

subscribeRequests.forEach((s,i)=>{

table.innerHTML += `

<tr
style="
background:#1a1a1a;
">

<td
style="
padding:12px;
border-bottom:1px solid #333;
">
${i+1}
</td>

<td
style="
padding:12px;
border-bottom:1px solid #333;
">

<button
style="
background:#00bfff;
border:none;
padding:8px 14px;
border-radius:8px;
font-weight:bold;
"
onclick="viewSubscriber(${i})">

${s.name}

</button>

</td>

<td
style="
padding:12px;
border-bottom:1px solid #333;
color:orange;
font-weight:bold;
">

PENDING ⏳

</td>

</tr>

`;

});

}

document.getElementById("dashboard")
.classList.add("hidden");

document.getElementById("newSubscriberPage")
.classList.remove("hidden");

}


// VIEW SUBSCRIBER
function viewSubscriber(index){

if(
currentUser.role !== "owner" &&
currentUser.role !== "admin"
){

alert("Security Error ❌");
return;

}

let s = subscribeRequests[index];

let win = window.open(
"",
"_blank",
"width=500,height=700"
);

win.document.write(`

<html>

<head>

<title>Subscriber Details</title>

<style>

body{
background:#111;
color:white;
font-family:Arial;
padding:20px;
}

.card{
background:#1c1c1c;
padding:20px;
border-radius:15px;
box-shadow:0 0 15px rgba(0,0,0,0.5);
}

h2{
text-align:center;
color:#00ffcc;
}

p{
font-size:18px;
margin:12px 0;
}

img{
width:100%;
border-radius:12px;
margin-top:15px;
border:2px solid #444;
}

button{
width:100%;
padding:14px;
margin-top:20px;
border:none;
border-radius:10px;
background:#00bfff;
color:white;
font-size:18px;
font-weight:bold;
cursor:pointer;
}

</style>

</head>

<body>

<div class="card">

<h2>Subscriber Details 📋</h2>

<p><b>Name:</b> ${s.name}</p>

<p><b>Role:</b> ${s.role}</p>

<p><b>Coins:</b> ${s.coins}</p>

<p><b>Status:</b> Pending ⏳</p>

<img src="${s.image}">

<button onclick="
window.opener.approveSubscriber(${index});
this.innerHTML='APPROVED ✅';
this.disabled=true;
">

Approve Subscriber ✅

</button>

</div>

</body>

</html>

`);

}


// CLOSE PAGE
function closeNewSubscriberPage(){

document.getElementById(
"newSubscriberPage"
).classList.add("hidden");

document.getElementById(
"dashboard"
).classList.remove("hidden");

}
// VIEW SUBSCRIBER
function viewSubscriber(index){

if(
currentUser.role !== "owner" &&
currentUser.role !== "admin"
){
alert("Access Denied ❌");
return;
}

let s = subscribeRequests[index];

let approve =
s.status || "Pending ⏳";

let win = window.open(
"",
"_blank",
"width=450,height=750"
);

win.document.write(`

<html>

<head>

<title>Subscriber Details</title>

<meta name="viewport"
content="width=device-width, initial-scale=1.0">

<style>

body{
margin:0;
padding:20px;
background:#0f0f0f;
font-family:Arial;
color:white;
display:flex;
justify-content:center;
align-items:flex-start;
min-height:100vh;
}

.card{
width:100%;
max-width:420px;
background:#1c1c1c;
padding:20px;
border-radius:18px;
box-shadow:0 0 20px rgba(0,0,0,0.6);
}

h2{
text-align:center;
margin-bottom:25px;
color:#00e5ff;
font-size:28px;
}

.info{
background:#2a2a2a;
padding:14px;
border-radius:10px;
margin-bottom:12px;
font-size:17px;
}

.label{
color:#00e5ff;
font-weight:bold;
}

.status{
color:orange;
font-weight:bold;
}

img{
width:100%;
border-radius:15px;
margin-top:20px;
border:2px solid #444;
}

button{
width:100%;
padding:15px;
margin-top:25px;
border:none;
border-radius:12px;
background:#00bfff;
color:white;
font-size:18px;
font-weight:bold;
cursor:pointer;
transition:0.3s;
}

button:hover{
opacity:0.8;
}

</style>

</head>

<body>

<div class="card">

<h2>Subscriber Details 📋</h2>

<div class="info">
<span class="label">Name:</span>
${s.name}
</div>

<div class="info">
<span class="label">Role:</span>
${s.role}
</div>

<div class="info">
<span class="label">Coins:</span>
${s.coins}
</div>

<div class="info">
<span class="label">Status:</span>
<span class="status">
${approve}
</span>
</div>

<img src="${s.image}">

<button onclick="
window.opener.approveSubscriber(${index});
this.innerHTML='APPROVED ✅';
this.disabled=true;
this.style.background='green';
">

Approve Subscriber ✅

</button>

</div>

</body>

</html>

`);

}

// APPROVE
function approveSubscriber(index){

let s = subscribeRequests[index];

let user = users.find(
x => x.name === s.name
);

if(!user){

alert("User not found ❌");
return;

}

// add reward
user.coins += 50000;

// save approved
let approvedUsers = JSON.parse(
localStorage.getItem("subApproved")
) || [];

if(
!approvedUsers.includes(user.name)
){

approvedUsers.push(user.name);

localStorage.setItem(
"subApproved",
JSON.stringify(approvedUsers)
);

}

// history
let history = JSON.parse(
localStorage.getItem(
"history_"+user.name
)
) || [];

history.push(
"You earned 50,000 coins by subscribe"
);

localStorage.setItem(
"history_"+user.name,
JSON.stringify(history)
);

// remove request
subscribeRequests.splice(index,1);

localStorage.setItem(
"subscribeRequests",
JSON.stringify(subscribeRequests)
);

// save users
save();

alert(
user.name +
" got 50,000 coins ✅"
);

}

// CLOSE PAGE
function closeNewSubscriberPage(){

document.getElementById("newSubscriberPage")
.classList.add("hidden");

document.getElementById("dashboard")
.classList.remove("hidden");

}
// VIDEO STORAGE
let videos = JSON.parse(
localStorage.getItem("videos")
) || [];

// EARN MONEY PAGE OPEN
function earnMoney(){

// create page if not exists
if(!document.getElementById("earnPage")){

let earnHTML = `

<div id="earnPage" class="container">

<div class="card">

<h2>Earn Money 💰</h2>

<div id="uploadBox" class="hidden">

<input
id="videoLink"
placeholder="YouTube Video Link">

<input
id="videoReward"
type="number"
placeholder="Coins Reward">

<button onclick="uploadVideo()">
Upload Video 📤
</button>

</div>

<div id="videoArea"></div>

<button onclick="closeEarnPage()">
Back
</button>

</div>

</div>

`;

document.body.insertAdjacentHTML(
"beforeend",
earnHTML
);

}

// show page
document.getElementById("dashboard")
.classList.add("hidden");

document.getElementById("earnPage")
.classList.remove("hidden");

// owner upload access
if(
currentUser.role === "owner"
){

document.getElementById("uploadBox")
.classList.remove("hidden");

}else{

document.getElementById("uploadBox")
.classList.add("hidden");

}

showVideos();

}

// CLOSE PAGE
function closeEarnPage(){

document.getElementById("earnPage")
.classList.add("hidden");

document.getElementById("dashboard")
.classList.remove("hidden");

}

// UPLOAD VIDEO
function uploadVideo(){

let link =
document.getElementById("videoLink").value;

let reward =
parseInt(
document.getElementById("videoReward").value
);

if(!link || !reward){

alert("Fill all fields");
return;

}

videos.push({

id: Date.now(),

link: link,

reward: reward

});

localStorage.setItem(
"videos",
JSON.stringify(videos)
);

alert("Video Uploaded ✅");

document.getElementById("videoLink").value = "";
document.getElementById("videoReward").value = "";

showVideos();

}

// SHOW VIDEOS
function showVideos(){

let area =
document.getElementById("videoArea");

area.innerHTML = "";

// no video
if(videos.length === 0){

area.innerHTML = `

<div class="card">

<h3>
Reward ke liye abhi new video nahi hai 📭
</h3>

</div>

`;

return;

}

// show all videos
videos.forEach(v=>{

area.innerHTML += `

<div class="card">

<h3>
Reward: ${v.reward} Coins
</h3>

<button
onclick="watchVideo(
'${v.link}',
${v.reward},
${v.id}
)">
Watch New Video ▶
</button>

</div>

`;

});

}

// WATCH VIDEO
function watchVideo(
link,
reward,
id
){

let claimed = JSON.parse(

localStorage.getItem(
"claimed_"+currentUser.name
)

) || [];

// already claimed
if(claimed.includes(id)){

alert(
"Reward already claimed ❌"
);

return;

}

// open youtube
window.open(
link,
"_blank"
);

// add coins
currentUser.coins += reward;

// update original users array
let user = users.find(
x => x.name === currentUser.name
);

if(user){

user.coins = currentUser.coins;

}

// save
save();

// claim save
claimed.push(id);

localStorage.setItem(

"claimed_"+currentUser.name,

JSON.stringify(claimed)

);

// history
let history = JSON.parse(

localStorage.getItem(
"history_"+currentUser.name
)

) || [];

history.push(

"You earned " +
reward +
" coins by video"

);

localStorage.setItem(

"history_"+currentUser.name,

JSON.stringify(history)

);

// remove watched video
videos = videos.filter(
x => x.id !== id
);

localStorage.setItem(
"videos",
JSON.stringify(videos)
);

// update UI
updateUI();

alert(
"You earned " +
reward +
" coins 💰"
);

showVideos();

}

// LOGOUT
function logout(){

currentUser = null;

localStorage.removeItem(
"currentUser"
);

document.getElementById("dashboard")
.classList.add("hidden");

document.getElementById("loginPage")
.classList.remove("hidden");

document.getElementById("userTableBox")
.classList.add("hidden");

document.getElementById("username").value = "";

document.getElementById("password").value = "";
alert("Logged out 🚪");

}

// AUTO LOGIN
window.onload = function(){

let saved =
localStorage.getItem("currentUser");

if(saved){

let user = users.find(
x => x.name===saved
);

if(user){

currentUser = user;

showDashboard();

}

}

  }
