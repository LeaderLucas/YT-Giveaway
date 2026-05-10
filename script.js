let currentUser = null;

// SAFE LOAD USERS
let users = JSON.parse(localStorage.getItem("users")) || [];

// AUTO CREATE OWNER IF EMPTY
if(users.length === 0){
users = [
{name:"Lucas_Arora", password:"admin123", role:"owner", coins:1000000}
];
save();
}
localStorage.clear();
// SAVE FUNCTION
function save(){
localStorage.setItem("users", JSON.stringify(users));
}

// SIGNUP
function signup(){
let u=document.getElementById("username").value;
let p=document.getElementById("password").value;

if(users.find(x=>x.name===u)){
alert("User already exists");
return;
}

users.push({name:u,password:p,role:"subscriber",coins:0});
save();
alert("Signup done, now login");
}

// LOGIN
function login(){
let u=document.getElementById("username").value;
let p=document.getElementById("password").value;

let user = users.find(x => x.name === u && x.password === p);

if(!user){
alert("Wrong login");
return;
}

if(!user.role){
user.role = "subscriber";
save();
}

currentUser = user;
localStorage.setItem("currentUser", u);
showDashboard();
}

// DASHBOARD
function showDashboard(){
document.getElementById("loginPage").classList.add("hidden");
document.getElementById("dashboard").classList.remove("hidden");

document.getElementById("userInfo").innerText = "User: " + currentUser.name;
document.getElementById("roleInfo").innerText = "Role: " + currentUser.role;

updateUI();
}

// UPDATE UI
function updateUI(){
let user = users.find(x => x.name === currentUser.name);

document.getElementById("coins").innerText = user.coins;

// ✅ FIRST reset (IMPORTANT)
document.getElementById("adminPanel").classList.add("hidden");

// ONLY owner can see admin panel
if(user.role === "owner"){
document.getElementById("adminPanel").classList.remove("hidden");
}
}
// COIN BUTTON (placeholder)
function earnMoney(){
alert("Coming Soon 🚀");
}

// ADD COINS (ADMIN)
function addCoins(){
let target = prompt("Username?");
let amount = parseInt(prompt("Coins?"));

let user = users.find(x => x.name === target);

if(user){
user.coins += amount;
save();
updateUI();
}
}

// VIEW USERS
function viewUsers(){
let text = "";

users.forEach((u, i) => {
text += (i+1) + ". " + u.name + " | " + u.role + " | Coins: " + u.coins + "\n";
});

alert(text);
}


function makeAdmin(){

if(!currentUser || currentUser.role !== "owner"){
alert("Access Denied ❌ Only owner can give admin role");
return;
}

let target = prompt("Username ko admin banana hai?");

let user = users.find(x => x.name === target);

if(!user){
alert("User not found");
return;
}

user.role = "admin";
save();

alert(target + " is now ADMIN 👑");
}

function showDatabase(){

if(!currentUser || currentUser.role !== "owner"){
alert("Access Denied ❌ Only owner can view database");
return;
}

alert(JSON.stringify(users, null, 2));
}

function viewUsers(){

if(!currentUser || currentUser.role !== "owner"){
alert("Access Denied ❌ Only owner can view database");
return;
}

let table = document.getElementById("userTableBody");
table.innerHTML = "";

users.forEach((u, i) => {
table.innerHTML += `
<tr>
<td>${i+1}</td>
<td>${u.name}</td>
<td>${u.role}</td>
<td>${u.coins}</td>
</tr>
`;
});

document.getElementById("userTableBox").classList.remove("hidden");
}
function closeTable(){
document.getElementById("userTableBox").classList.add("hidden");
}
function logout(){

// clear current session
currentUser = null;
localStorage.removeItem("currentUser");

// UI reset
document.getElementById("dashboard").classList.add("hidden");
document.getElementById("loginPage").classList.remove("hidden");

// optional: clear inputs
document.getElementById("username").value = "";
document.getElementById("password").value = "";

alert("Logged out successfully 🚪");
}
// AUTO LOGIN
window.onload = function(){ 
let saved = localStorage.getItem("currentUser");

if(saved){
let user = users.find(x => x.name === saved);

if(user){
currentUser = user;
showDashboard();
}
}
}

