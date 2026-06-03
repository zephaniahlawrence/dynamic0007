$(document).ready(function() {
        fetch('/fetchsession')
            .then(response => response.json())
            // .then(data => console.log(data["email"]));


            .then(async function(data) {
                if (data["status"]) {
                    document.querySelector('#accountbtn').style.display = "none";
                    document.querySelector('#dashboardbtn').style.display = "flex";
                    document.querySelector('#dashboardbtn2').style.display = "flex";

                    // document.querySelector('.account').classList.remove('expand');
                    // document.querySelector('.dashboard').classList.add('expand');
                    document.getElementById('accountname').innerHTML = data["fullname"];
                    document.getElementById('accountmessage').innerHTML = data["message"];
                    const profileimage = data["profileimage"];
                    document.getElementById('profile-picture-wrapper').innerHTML = `<img src="${profileimage}" height="100%" width="100%" class="profile-picture"></img>`;
                    document.getElementById('dashboardbtn').innerHTML = `<div class="profile-picture-wrapper2"><img src="${profileimage}" height="100%" width="100%" class="profile-picture"></img></div>`;
                    document.getElementById('dashboardbtn2').innerHTML = `<div class="profile-picture-wrapper3"><img src="${profileimage}" height="100%" width="100%" class="profile-picture"></img></div>`;
                    // document.getElementById('accountbtn2').innerHTML = `<div class="profile-picture-wrapper3"><img src="${profileimage}" height="100%" width="100%" class="profile-picture"></img></div>`;
                    if (data["profileimage"] === "static/images/defaultprofilepicture.png")
                    {
                        document.querySelector('.profile-picture-wrapper').style.padding = "9px";
                        document.querySelector('.profile-picture-wrapper2').style.padding = "2.4px";
                        document.querySelector('.profile-picture-wrapper3').style.padding = "2.4px";
                    }
                    document.getElementById('membershipstatus').innerHTML = data["membership"];
                    document.getElementById('membershipstatus2').innerHTML = data["membership"];
                    // document.getElementById('membershipstatus').innerHTML = data["notifications"][0];



                    document.getElementById('fullnameupdate').placeholder = data["fullname"];
                    document.getElementById('phonenumberupdate').placeholder = data["phonenumber"];
                    document.getElementById('emailupdate').placeholder = data["email"];
                    document.getElementById('addressupdate').placeholder = data["address"];
                    // document.getElementById('profilepictureupdate').placeholder = data["profileimage"];

                    if (data["admin"] === 1)
                    {
                        document.querySelector('#dashboardsection10').style.display = 'grid';
                        const userdata = data["userdata"];
                        const listContainer = document.getElementById('userselector');
                        userdata.forEach(user => {
                            const option = document.createElement('option');
                            option.textContent = user["fullname"];
                            option.value = user["fullname"];
                            listContainer.appendChild(option);
                        });

                        const listContainer2 = document.getElementById('userselector');

                        const userdisplay = document.getElementById('displayuser');
                        // console.log(selecteduser);
                        listContainer2.addEventListener('change', function(event) {
                            // const selecteduser = document.getElementById('userselector').value;
                            const selecteduser = event.target.value;
                            const dataindex = userdata.findIndex(user => user.fullname === selecteduser);
                            // console.log(dataindex);
                            if (selecteduser === 'Select User'){
                                userdisplay.innerHTML = '';
                            }
                            else{
                                userdisplay.innerHTML = `
                                    <br>
                                    id: ${data["userdata"][dataindex]["id"]}<br>
                                    full name: ${data["userdata"][dataindex]["fullname"]}<br>
                                    email: ${data["userdata"][dataindex]["email"]}<br>
                                    phone number: ${data["userdata"][dataindex]["phonenumber"]}<br>
                                    address: ${data["userdata"][dataindex]["address"]}<br>
                                    password: ${data["userdata"][dataindex]["password"]}`;
                            }
                        });

                    }
                }
            });


});








                            // if (selecteduser) {
                            // };
                    // if (data["admin"] === 1)
                    // {
                    //     const userdata = data["userdata"];
                    //     const listContainer = document.getElementById('userselector');
                    //     userdata.forEach(user => {
                    //         const option = document.createElement('option');
                    //         option.textContent = user[1];
                    //         option.value = user[1];
                    //         listContainer.appendChild(option);
                    //     });

                    //     const selecteduser = document.getElementById('userselector').value;
                    //     const userdisplay = document.getElementById('displayuser');
                    //     console.log(selecteduser);
                    //     if (selecteduser) {
                    //         // const displayuser = document.getElementById("displayuser");
                    //         console.log(data["userdata"]);
                    //         userdisplay.innerHTML = data["userdata"][1];
                    //     };

                    // }



                            // for (const user of users) {
                            //     console.log(item);
                            // }


                    // const items = data["userdata"];
                    // for (const item of items) {
                    //     document.getElementById('admindisplay').innerHTML = item;
                    //     console.log(item);
                    // }
                    // items.forEach((item, index) => {
                    //     document.getElementById('admindisplay').innerHTML = `Index ${index}: ${item}`;
                    //     // console.log(`Index ${index}: ${item[1]}`);
                    // });




                    // document.getElementById('admindisplay').innerHTML = data["userdata"][1];
                    // console.log(data["userdata"]);






// function toggleDiv() {
//   const selectedvalue = document.getElementById("userselector").value;
// //   const allDivs = document.querySelectorAll(".content");


//   // Show the div that matches the selected value
//   if (selectedvalue) {
//     const displayuser = document.getElementById("displayuser");
//     displayuser.innerHTML = data["userdata"];

//     // if (displayuser) {
//     //   selectedDiv.style.display = "block";
//     // }
//   }
// }

// function setProperties(element, props) {
//   for (let key in props) {
//     element[key] = props[key];
//   }
// }

// // Usage:
// setProperties(myElement, { innerHTML: "Hello", title: "Hover me" });
