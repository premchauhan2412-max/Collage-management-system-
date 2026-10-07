 let role="admin";
let faculty=JSON.parse(localStorage.getItem("faculty"))||[];
let student=JSON.parse(localStorage.getItem("student"))||[];
let classes=JSON.parse(localStorage.getItem("classes"))||[];
let notices=JSON.parse(localStorage.getItem("notices"))||[];

const $=id=>document.getElementById(id);

document.querySelectorAll(".role-btn").forEach(btn=>{
btn.onclick=()=>{
document.querySelectorAll(".role-btn").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
role=btn.dataset.role;
$("loginPassword").value="";
$("loginIdentity").value="";

if(role==="admin"){
$("loginLabel").textContent="Admin Email ID";
$("loginIdentity").placeholder="Enter Admin Email ID";
$("passwordContainer").style.display="block";
}else{
$("loginLabel").textContent=role==="faculty"?"Faculty ID":"Student ID";
$("loginIdentity").placeholder=role==="faculty"?"Enter Faculty ID":"Enter Student ID";
$("passwordContainer").style.display="none";
}
};
});

$("loginForm").onsubmit=e=>{
e.preventDefault();
let id=$("loginIdentity").value.trim();

if(role==="admin"){
if(id!=="admin@campuscore.com"){
alert("Please enter a valid Email ID");
return;
}
if($("loginPassword").value!=="admin#8240"){
alert("Invalid Password. Please re-enter password");
return;
}
openPage("adminPage");
loadAdmin("dashboard");
}

if(role==="faculty"){
let user=faculty.find(f=>f.id===id);
if(!user){alert("Invalid Faculty ID. Please re-enter Faculty ID");return}
openPage("facultyPage");loadFaculty(user);
}

if(role==="student"){
let user=student.find(s=>s.id===id);
if(!user){alert("Invalid Student ID. Please re-enter Student ID");return}
openPage("studentPage");loadStudent(user);
}
};

function openPage(id){
["loginPage","adminPage","facultyPage","studentPage"].forEach(x=>$(x).classList.add("hidden"));
$(id).classList.remove("hidden");
}

document.querySelectorAll("[data-admin-section]").forEach(btn=>{
btn.onclick=()=>{
document.querySelectorAll("[data-admin-section]").forEach(b=>b.classList.remove("active"));
btn.classList.add("active");
loadAdmin(btn.dataset.adminSection);
};
});

$("adminLogout").onclick=()=>openPage("loginPage");
$("facultyLogout").onclick=()=>openPage("loginPage");
$("studentLogout").onclick=()=>openPage("loginPage");

function loadAdmin(section){

let html="";

if(section==="dashboard"){
html=`
<div class="page">
<div class="page-header">
<h1>Good Morning, Admin</h1>
<p>Here's what's happening across the college today.</p>
<p><b>Academic Year:</b> 2026-27</p>
</div>

<div class="cards">
<div class="dashboard-card"><h3>Total Students</h3><strong>${student.length}</strong></div>
<div class="dashboard-card"><h3>Faculty Members</h3><strong>${faculty.length}</strong></div>
<div class="dashboard-card"><h3>Departments</h3><strong>7</strong></div>
</div>

<div class="content-card">
<h2>Department Overview</h2>
<div class="department-grid">
<div class="department-card">Computer Engineering</div>
<div class="department-card">Electrical Engineering</div>
<div class="department-card">Electronics & Telecom. Engg</div>
<div class="department-card">Mechanical Engineering</div>
<div class="department-card">CSE (AIML)</div>
<div class="department-card">CSE (DS)</div>
<div class="department-card">CSE (IoT & CSBT)</div>
</div>
</div>

<div class="content-card">
<h2>Recent Admissions</h2>
<p>${student.length} student record(s) currently registered in CampusCore.</p>
</div>
</div>`;
}

if(section==="faculty"){
html=`
<div class="page">
<div class="page-header"><h1>Manage Faculty</h1><p>Add and manage faculty members.</p></div>

<div class="content-card">
<h2>Add Faculty</h2>
<form id="facultyForm" class="form-grid">

<div class="form-group"><label>Faculty Name</label><input id="fName" required></div>
<div class="form-group"><label>Qualification</label><input id="fQual" required></div>
<div class="form-group"><label>Current Designation</label><input id="fDes" required></div>
<div class="form-group"><label>Department</label><input id="fDept" required></div>
<div class="form-group"><label>Email ID</label><input id="fEmail" type="email" required></div>
<div class="form-group"><label>Year of Joining</label><input id="fYear" required></div>

</form>
<button class="primary-btn" onclick="addFaculty()">Add Faculty</button>
</div>

<div class="content-card">
<h2>Faculty Records</h2>
<div class="table-container">
<table>
<thead><tr><th>Faculty ID</th><th>Name</th><th>Qualification</th><th>Designation</th><th>Department</th><th>Email ID</th><th>Year</th><th>Class</th><th>Action</th></tr></thead>
<tbody>
${faculty.map((f,i)=>`
<tr>
<td>${f.id}</td><td>${f.name}</td><td>${f.qualification}</td><td>${f.designation}</td>
<td>${f.department}</td><td>${f.email}</td><td>${f.year}</td>
<td><button class="edit-btn" onclick="showClasses('${f.id}')">Class</button></td>
<td><button class="danger-btn" onclick="removeFaculty(${i})">Remove</button></td>
</tr>`).join("")}
</tbody>
</table>
</div>
</div>
</div>`;
}

if(section==="student"){
html=`
<div class="page">
<div class="page-header"><h1>Manage Student</h1><p>Add and manage students.</p></div>

<div class="content-card">
<h2>Add Student</h2>
<div class="form-grid">
<div class="form-group"><label>Student Name</label><input id="sName"></div>
<div class="form-group"><label>Department</label><input id="sDept"></div>
<div class="form-group"><label>Email ID</label><input id="sEmail" type="email"></div>
<div class="form-group"><label>Admission Year</label><input id="sYear"></div>
</div>
<button class="primary-btn" onclick="addStudent()">Add Student</button>
</div>

<div class="content-card">
<h2>Student Records</h2>
<div class="table-container">
<table>
<thead><tr><th>Student ID</th><th>Student Name</th><th>Department</th><th>Email ID</th><th>Admission Year</th><th>Action</th></tr></thead>
<tbody>
${student.map((s,i)=>`
<tr>
<td>${s.id}</td><td>${s.name}</td><td>${s.department}</td><td>${s.email}</td><td>${s.year}</td>
<td><button class="danger-btn" onclick="removeStudent(${i})">Remove</button></td>
</tr>`).join("")}
</tbody>
</table>
</div>
</div>
</div>`;
}   
if(section==="notice"){
html=`
<div class="page">
<div class="page-header"><h1>Notice</h1><p>Create notices for faculty and students.</p></div>

<div class="content-card">
<h2>Add Notice</h2>
<div class="form-group">
<label>Notice Title</label><input id="nTitle">
</div>
<div class="form-group">
<label>Notice Details</label><textarea id="nText" rows="5"></textarea>
</div>
<button class="primary-btn" onclick="addNotice()">Publish Notice</button>
</div>

<div class="content-card">
<h2>Published Notices</h2>
${notices.map((n,i)=>`
<div class="notice-item">
<h3>${n.title}</h3><p>${n.text}</p>
<button class="danger-btn" onclick="removeNotice(${i})">Remove</button>
</div>`).join("")||"<p>No notices available.</p>"}
</div>
</div>`;
}

$("adminContent").innerHTML=html;
}

function addFaculty(){
let f={
id:"FT"+(201+faculty.length),
name:$("fName").value,
qualification:$("fQual").value,
designation:$("fDes").value,
department:$("fDept").value,
email:$("fEmail").value,
year:$("fYear").value
};
if(!f.name||!f.qualification||!f.designation||!f.department||!f.email||!f.year){
alert("Please fill all Faculty details");return;
}
faculty.push(f);
localStorage.setItem("faculty",JSON.stringify(faculty));
loadAdmin("faculty");
alert("Faculty added successfully. Faculty ID: "+f.id);
}

function removeFaculty(i){
if(confirm("Remove this faculty?")){
faculty.splice(i,1);
localStorage.setItem("faculty",JSON.stringify(faculty));
loadAdmin("faculty");
}
}

function addStudent(){
let s={
id:"ST"+(201+student.length),
name:$("sName").value,
department:$("sDept").value,
email:$("sEmail").value,
year:$("sYear").value
};
if(!s.name||!s.department||!s.email||!s.year){
alert("Please fill all Student details");return;
}
student.push(s);
localStorage.setItem("student",JSON.stringify(student));
loadAdmin("student");
alert("Student added successfully. Student ID: "+s.id);
}

function removeStudent(i){
if(confirm("Remove this student?")){
student.splice(i,1);
localStorage.setItem("student",JSON.stringify(student));
loadAdmin("student");
}
}

function showClasses(fid){
let f=faculty.find(x=>x.id===fid);
let own=classes.filter(c=>c.facultyId===fid);

$("modalBody").innerHTML=`
<h2>Classes - ${f.name}</h2>

<div class="form-grid">
<div class="form-group">
<label>Day</label>
<select id="cDay">
<option value="">Select Day</option>
<option>Monday</option>
<option>Tuesday</option>
<option>Wednesday</option>
<option>Thursday</option>
<option>Friday</option>
<option>Saturday</option>
</select>
</div>

<div class="form-group">
<label>Time</label>
<input type="text" id="cTime" placeholder="10:00 AM - 11:00 AM">
</div>

<div class="form-group">
<label>Classroom</label>
<input type="text" id="cRoom" placeholder="Room 201 / Lab 1">
</div>
</div>

<button class="primary-btn" onclick="addClass('${fid}')">Add Class</button>

<div class="table-container">
<table>
<thead>
<tr><th>Day</th><th>Time</th><th>Classroom</th><th>Action</th></tr>
</thead>
<tbody>
${own.map((c,i)=>`
<tr>
<td>${c.day}</td>
<td>${c.time}</td>
<td>${c.room}</td>
<td><button class="danger-btn" onclick="removeClass('${fid}',${i})">Remove</button></td>
</tr>`).join("")||"<tr><td colspan='4'>No classes added.</td></tr>"}
</tbody>
</table>
</div>`;
$("modal").classList.remove("hidden");
}

function addClass(fid){
let c={
facultyId:fid,
day:$("cDay").value,
time:$("cTime").value,
room:$("cRoom").value
};
if(!c.day||!c.time||!c.room){
alert("Please enter Day, Time and Classroom");return;
}
classes.push(c);
localStorage.setItem("classes",JSON.stringify(classes));
showClasses(fid);
}

function removeClass(fid,index){
let own=classes.filter(c=>c.facultyId===fid);
let target=own[index];
let actual=classes.indexOf(target);
classes.splice(actual,1);
localStorage.setItem("classes",JSON.stringify(classes));
showClasses(fid);
}

function addNotice(){
let title=$("nTitle").value.trim();
let text=$("nText").value.trim();
if(!title||!text){alert("Please enter notice details");return}
notices.push({title,text});
localStorage.setItem("notices",JSON.stringify(notices));
loadAdmin("notice");
}

function removeNotice(i){
notices.splice(i,1);
localStorage.setItem("notices",JSON.stringify(notices));
loadAdmin("notice");
}

function loadFaculty(f){
$("facultyHeaderId").textContent=f.id;
$("facultyContent").innerHTML=`
<div class="profile-header">
<h1>Good Morning, ${f.name}</h1>
<p>Faculty Dashboard</p>
</div>

<div class="profile-card">
<div class="profile-grid">
<div class="profile-item"><small>Name</small><strong>${f.name}</strong></div>
<div class="profile-item"><small>Qualification</small><strong>${f.qualification}</strong></div>
<div class="profile-item"><small>Current Designation</small><strong>${f.designation}</strong></div>
<div class="profile-item"><small>Department</small><strong>${f.department}</strong></div>
<div class="profile-item"><small>Email ID</small><strong>${f.email}</strong></div>
<div class="profile-item"><small>Year of Joining</small><strong>${f.year}</strong></div>
</div>
</div>

<div class="action-section">
<h2>WHAT DO YOU WANT TO DO?</h2>
<div class="action-grid">
<button class="action-card" onclick="facultyAction('classes','${f.id}')"><div class="action-icon">📚</div><h3>My Classes</h3></button>
<button class="action-card" onclick="facultyAction('students')"><div class="action-icon">👨‍🎓</div><h3>My Students</h3></button>
<button class="action-card" onclick="facultyAction('attendance')"><div class="action-icon">✓</div><h3>Students Attendance</h3></button>
<button class="action-card" onclick="facultyAction('calendar')"><div class="action-icon">📅</div><h3>Academic Calendar</h3></button>
<button class="action-card" onclick="facultyAction('notices')"><div class="action-icon">🔔</div><h3>Notices</h3></button>
</div>
</div>`;
}

function facultyAction(type,fid){
if(type==="classes"){
let data=classes.filter(c=>c.facultyId===fid);
showModal(`<h2>My Classes</h2><div class="table-container"><table><tr><th>Day</th><th>Time</th><th>Classroom</th></tr>${data.map(c=>`<tr><td>${c.day}</td><td>${c.time}</td><td>${c.room}</td></tr>`).join("")||"<tr><td colspan='3'>No classes assigned.</td></tr>"}</table></div>`);
}
if(type==="students"){
showModal(`<h2>My Students</h2><div class="table-container"><table><tr><th>Student ID</th><th>Name</th><th>Department</th></tr>${student.map(s=>`<tr><td>${s.id}</td><td>${s.name}</td><td>${s.department}</td></tr>`).join("")}</table></div>`);
}
if(type==="attendance"){
showModal(`<h2>Students Attendance</h2><div class="table-container"><table><tr><th>Student ID</th><th>Name</th><th>Department</th><th>Attendance</th></tr>${student.map(s=>`<tr><td>${s.id}</td><td>${s.name}</td><td>${s.department}</td><td><button class="edit-btn">Present</button> <button class="danger-btn">Absent</button></td></tr>`).join("")}</table></div>`);
}
if(type==="calendar")showModal(`<h2>Academic Calendar</h2><img src="academic-calendar.png" class="portal-image" alt="Academic Calendar">`);
if(type==="notices")showModal(`<h2>Notices</h2>${noticeHTML()}`);
}

function loadStudent(s){
$("studentHeaderId").textContent=s.id;
$("studentContent").innerHTML=`
<div class="profile-header">
<h1>Good Morning, ${s.name}</h1>
<p>Student Dashboard</p>
</div>

<div class="profile-card">
<div class="profile-grid">
<div class="profile-item"><small>Student Name</small><strong>${s.name}</strong></div>
<div class="profile-item"><small>Department</small><strong>${s.department}</strong></div>
<div class="profile-item"><small>Admission Year</small><strong>${s.year}</strong></div>
<div class="profile-item"><small>Email ID</small><strong>${s.email}</strong></div>
</div>
</div>

<div class="action-section">
<h2>WHAT DO YOU WANT TO DO?</h2>
<div class="action-grid">
<button class="action-card" onclick="studentAction('timetable')"><div class="action-icon">🗓️</div><h3>Timetable</h3></button>
<button class="action-card" onclick="studentAction('exam')"><div class="action-icon">📝</div><h3>Upcoming Exam</h3></button>
<button class="action-card" onclick="studentAction('fee')"><div class="action-icon">💳</div><h3>Fee Structure</h3></button>
<button class="action-card" onclick="studentAction('calendar')"><div class="action-icon">📅</div><h3>Academic Calendar</h3></button>
<button class="action-card" onclick="studentAction('notices')"><div class="action-icon">🔔</div><h3>Notices</h3></button>
</div>
</div>`;
}

function studentAction(type){
let images={
timetable:"timetable.png",
exam:"exam.png",
fee:"fee.jpeg",
calendar:"academic-calendar.png"
};
if(type==="notices")showModal(`<h2>Notices</h2>${noticeHTML()}`);
else showModal(`<h2>${type==="timetable"?"Timetable":type==="exam"?"Upcoming Exam":type==="fee"?"Fee Structure":"Academic Calendar"}</h2><img src="${images[type]}" class="portal-image" alt="">`);
}

function noticeHTML(){
return notices.map(n=>`<div class="notice-item"><h3>${n.title}</h3><p>${n.text}</p></div>`).join("")||"<p>No notices available.</p>";
}

function showModal(content){
$("modalBody").innerHTML=content;
$("modal").classList.remove("hidden");
}

$("modalClose").onclick=()=>$("modal").classList.add("hidden");

$("facultyNotification").onclick=()=>showModal(`<h2>Notices</h2>${noticeHTML()}`);
$("studentNotification").onclick=()=>showModal(`<h2>Notices</h2>${noticeHTML()}`);

window.addEventListener("click",e=>{
if(e.target===$("modal"))$("modal").classList.add("hidden");
}
);


