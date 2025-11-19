// ===== LOGIN CHECK & WELCOME =====
if(localStorage.getItem("loggedIn")!=="true"){window.location.href="login.html";}
const username = localStorage.getItem("username");
document.getElementById("welcomeText").innerHTML = `
  <span style="font-size:28px;color:#0078ff;font-weight:600;">👋 Welcome ${username}!</span><br>
  <span style="font-size:36px;color:#222;font-weight:700;">Upload Your Points</span>
`;

// ===== LOGOUT =====
function logout(){
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    window.location.href="login.html";
}

// ===== DATABASE STORAGE =====
let database = JSON.parse(localStorage.getItem("studentData")) || {};
const departments = ["CSE","IT","ECE","EEE","Mechanical","Civil","Biomedical","AI & DS","Chemical","Cyber Security","IoT","Agriculture"];
departments.forEach(d=>{
    database[d] ||= {};
    [1,2,3,4].forEach(y=>{ database[d][y] ||= []; });
});

// ===== ADD STUDENT =====
function addStudent(event, dept, year){
    event.preventDefault();
    const name = document.getElementById(`name_${dept}_${year}`).value.trim();
    const regNo = document.getElementById(`reg_${dept}_${year}`).value.trim();
    const points = parseInt(document.getElementById(`points_${dept}_${year}`).value);

    const existing = database[dept][year].find(s => s.RegNo === regNo);
    if(existing){
        existing.Points += points;
    } else {
        database[dept][year].push({ Name: name, RegNo: regNo, Points: points });
    }

    localStorage.setItem("studentData", JSON.stringify(database));
    showLeaderboard(dept, year);
}






function showLeaderboard(dept, year){
    const students = database[dept][year].slice().sort((a,b)=>b.Points - a.Points);
    let tableRows = students.map((s,i)=>`
        <tr>
            <td>${i+1}</td>
            <td>${s.Name}</td>
            <td>${s.RegNo}</td>
            <td>${s.Points}</td>
        </tr>`).join('');

    if(!tableRows) tableRows = `<tr><td colspan="4">No records yet</td></tr>`;

    document.getElementById("leaderboard").innerHTML = `
        <div class="leaderboard-section">
            <h2>${dept} - ${year} Year Leaderboard</h2>
            <table>
                <thead>
                    <tr><th>Rank</th><th>Name</th><th>Register No</th><th>Points</th></tr>
                </thead>
                <tbody>${tableRows}</tbody>
            </table>
            <div style="text-align:center; margin-top:10px;">
                <button onclick="exportToExcel('${dept}', ${year})" style="padding:8px 15px;background:#0077B6;color:#fff;border:none;border-radius:6px;cursor:pointer;">Export to Excel</button>
            </div>
        </div>
        <div class="add-student-box">
            <form onsubmit="addStudent(event,'${dept}',${year})">
                <input type="text" id="name_${dept}_${year}" placeholder="Full Name" required>
                <input type="text" id="reg_${dept}_${year}" placeholder="Register No" required>
                <select id="points_${dept}_${year}">
                    <option value="1">Participant (1 Point)</option>
                    <option value="2">Runner-Up (2 Points)</option>
                    <option value="3">Winner (3 Points)</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    `;

    // Scroll to leaderboard
    document.getElementById("leaderboard").scrollIntoView({behavior:"smooth"});
}





















// function showLeaderboard(dept, year){
//     const students = database[dept][year].slice().sort((a,b)=>b.Points - a.Points);
//     let tableRows = students.map((s,i)=>`
//         <tr>
//             <td>${i+1}</td>
//             <td>${s.Name}</td>
//             <td>${s.RegNo}</td>
//             <td>${s.Points}</td>
//         </tr>`).join('');

//     if(!tableRows) tableRows = `<tr><td colspan="4">No records yet</td></tr>`;

//     document.getElementById("leaderboard").innerHTML = `
//         <div class="leaderboard-section">
//             <h2>${dept} - ${year} Year Leaderboard</h2>
//             <table>
//                 <thead>
//                     <tr><th>Rank</th><th>Name</th><th>Register No</th><th>Points</th></tr>
//                 </thead>
//                 <tbody>${tableRows}</tbody>
//             </table>
//             <div style="text-align:right; margin-top:10px;">
//                 <button onclick="exportToExcel('${dept}', ${year})" style="padding:8px 15px;background:#0077B6;color:#fff;border:none;border-radius:6px;cursor:pointer;">Export to Excel</button>
//             </div>
//         </div>
//         <div class="add-student-box">
//             <form onsubmit="addStudent(event,'${dept}',${year})">
//                 <input type="text" id="name_${dept}_${year}" placeholder="Full Name" required>
//                 <input type="text" id="reg_${dept}_${year}" placeholder="Register No" required>
//                 <select id="points_${dept}_${year}">
//                     <option value="1">Participant (1 Point)</option>
//                     <option value="2">Runner-Up (2 Points)</option>
//                     <option value="3">Winner (3 Points)</option>
//                 </select>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     `;

//     // Scroll to leaderboard
//     document.getElementById("leaderboard").scrollIntoView({behavior:"smooth"});
// }









// // ===== SHOW LEADERBOARD =====
// function showLeaderboard(dept, year){
//     const students = database[dept][year].slice().sort((a,b)=>b.Points - a.Points);
//     let tableRows = students.map((s,i)=>`
//         <tr>
//             <td>${i+1}</td>
//             <td>${s.Name}</td>
//             <td>${s.RegNo}</td>
//             <td>${s.Points}</td>
//         </tr>`).join('');

//     if(!tableRows) tableRows = `<tr><td colspan="4">No records yet</td></tr>`;

//     document.getElementById("leaderboard").innerHTML = `
//         <div class="leaderboard-section">
//             <div class="leaderboard-header">
//                 <h2>${dept} - ${year} Year Leaderboard</h2>
//                 <button onclick="exportToExcel('${dept}', ${year})" style="margin-top:10px;padding:8px 15px;background:#0077B6;color:#fff;border:none;border-radius:6px;cursor:pointer;">Export to Excel</button>
//             </div>
//             <table>
//                 <thead>
//                     <tr><th>Rank</th><th>Name</th><th>Register No</th><th>Points</th></tr>
//                 </thead>
//                 <tbody>${tableRows}</tbody>
//             </table>
//             <form onsubmit="addStudent(event,'${dept}',${year})" style="margin-top:15px;">
//                 <input type="text" id="name_${dept}_${year}" placeholder="Full Name" required>
//                 <input type="text" id="reg_${dept}_${year}" placeholder="Register No" required>
//                 <select id="points_${dept}_${year}">
//                     <option value="1">Participant (1 Point)</option>
//                     <option value="2">Runner-Up (2 Points)</option>
//                     <option value="3">Winner (3 Points)</option>
//                 </select>
//                 <button type="submit">Submit</button>
//             </form>
//         </div>
//     `;
// }

// ===== EXPORT TO EXCEL =====
function exportToExcel(dept=null, year=null){
    const wb = XLSX.utils.book_new();

    if(dept && year){ 
        // Export single dept-year
        const data = database[dept][year];
        if(data.length===0){ alert("No data to export"); return; }
        const ws = XLSX.utils.json_to_sheet(data);
        XLSX.utils.book_append_sheet(wb, ws, `${dept}_${year}`);
    } else {
        // Export all
        for(let d in database){
            for(let y in database[d]){
                const data = database[d][y];
                if(data.length===0) continue;
                const ws = XLSX.utils.json_to_sheet(data);
                XLSX.utils.book_append_sheet(wb, ws, `${d}_${y}`.substring(0,31));
            }
        }
    }

    XLSX.writeFile(wb, dept && year ? `Leaderboard_${dept}_${year}.xlsx` : "All_Departments.xlsx");
}
function selectDept(dept){
    const yearSection = document.getElementById("years");

    yearSection.innerHTML = `
        <h3>${dept} Department - Select Year</h3>
        <div class="year-buttons">
            <button onclick="showLeaderboard('${dept}',1)">1st Year</button>
            <button onclick="showLeaderboard('${dept}',2)">2nd Year</button>
            <button onclick="showLeaderboard('${dept}',3)">3rd Year</button>
            <button onclick="showLeaderboard('${dept}',4)">4th Year</button>
        </div>
    `;

    // Clear leaderboard
    document.getElementById("leaderboard").innerHTML = "";

    // ⭐ AUTO-SCROLL TO YEAR SECTION ⭐
    yearSection.scrollIntoView({ behavior: "smooth" });
}

