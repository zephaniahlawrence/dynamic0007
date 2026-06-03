$(document).ready(function() {
    const display = document.querySelector('#account');
    const dashboard = document.querySelector('#dashboard');
    const dashboardsection1 = document.getElementById('dashboardsection1');
    const dashboardsection2 = document.getElementById('dashboardsection2');
    $('#loginsubmit').on('click', function(event) {

        $.ajax({
            data: {
                usersignin: $('#usersignin').val(),
                passwordsignin: $('#passwordsignin').val()
            },
            type : 'POST',
            url : '/signin'
        })

        .done(async function(data) {
            if (data.error) {
                $('#error').text(data.error).show();
                // document.getElementById('dashboardsection1').innerHTML = "fvhojfdoij";
            }
            else if (!data["status"]) {
                document.getElementById('signinerror').innerHTML = data["message"];
            }
            else if (data["status"]) {
                document.querySelector('#accountbtn').style.display = "none";
                document.querySelector('#dashboardbtn').style.display = "flex";
                document.querySelector('#dashboardbtn2').style.display = "flex";

                document.querySelector('.account').classList.remove('expand');
                document.querySelector('.dashboard').classList.add('expand');
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
        })

        event.preventDefault();

    });


    // $('#dashboardbtn').on('click', function(event) {
    //     // document.querySelector('.dashboard').classList.add('expand');
    //     document.querySelector('.dashboard').classList.add('expand');
    //     // document.getElementById('dashboard').style.display = "grid";
    //     event.preventDefault();
    // });



    // $('#changepasswordbtn').on('click', function(event) {
    //     // document.querySelector('#changepasswordsection').style.display = "grid";
    //     document.querySelector('#changepasswordsection').style.height = "fit-content";
    //     // profiledisplay.style.display = 'grid';
    // });



    $('#dashboardsection2').on('click', function(event) {
        document.querySelector('#profiledisplay').classList.toggle('expand');
        document.querySelector('#membershipdisplay').classList.remove('expand');
        document.querySelector('#cartdisplay').classList.remove('expand');
        document.querySelector('#calendardisplay').classList.remove('expand');
        document.querySelector('#historydisplay').classList.remove('expand');
        document.querySelector('#settingsdisplay').classList.remove('expand');
        document.querySelector('#signoutdisplay').classList.remove('expand');
        document.querySelector('#admindisplay').classList.remove('expand');
        // profiledisplay.style.display = 'grid';
    });
    $('#dashboardsection3').on('click', function(event) {
        document.querySelector('#profiledisplay').classList.remove('expand');
        document.querySelector('#membershipdisplay').classList.toggle('expand');
        document.querySelector('#cartdisplay').classList.remove('expand');
        document.querySelector('#calendardisplay').classList.remove('expand');
        document.querySelector('#historydisplay').classList.remove('expand');
        document.querySelector('#settingsdisplay').classList.remove('expand');
        document.querySelector('#signoutdisplay').classList.remove('expand');
        document.querySelector('#admindisplay').classList.remove('expand');
        // profiledisplay.style.display = 'grid';
    });
    $('#dashboardsection4').on('click', function(event) {
        document.querySelector('#profiledisplay').classList.remove('expand');
        document.querySelector('#membershipdisplay').classList.remove('expand');
        document.querySelector('#cartdisplay').classList.toggle('expand');
        document.querySelector('#calendardisplay').classList.remove('expand');
        document.querySelector('#historydisplay').classList.remove('expand');
        document.querySelector('#settingsdisplay').classList.remove('expand');
        document.querySelector('#signoutdisplay').classList.remove('expand');
        document.querySelector('#admindisplay').classList.remove('expand');
        // profiledisplay.style.display = 'grid';
    });
    $('#dashboardsection5').on('click', function(event) {
        document.querySelector('#profiledisplay').classList.remove('expand');
        document.querySelector('#membershipdisplay').classList.remove('expand');
        document.querySelector('#cartdisplay').classList.remove('expand');
        document.querySelector('#calendardisplay').classList.toggle('expand');
        document.querySelector('#historydisplay').classList.remove('expand');
        document.querySelector('#settingsdisplay').classList.remove('expand');
        document.querySelector('#signoutdisplay').classList.remove('expand');
        document.querySelector('#admindisplay').classList.remove('expand');
        // profiledisplay.style.display = 'grid';
    });
    $('#dashboardsection6').on('click', function(event) {
        document.querySelector('#profiledisplay').classList.remove('expand');
        document.querySelector('#membershipdisplay').classList.remove('expand');
        document.querySelector('#cartdisplay').classList.remove('expand');
        document.querySelector('#calendardisplay').classList.remove('expand');
        document.querySelector('#historydisplay').classList.toggle('expand');
        document.querySelector('#settingsdisplay').classList.remove('expand');
        document.querySelector('#signoutdisplay').classList.remove('expand');
        document.querySelector('#admindisplay').classList.remove('expand');
        // profiledisplay.style.display = 'grid';
    });
    $('#dashboardsection7').on('click', function(event) {
        document.querySelector('#profiledisplay').classList.remove('expand');
        document.querySelector('#membershipdisplay').classList.remove('expand');
        document.querySelector('#cartdisplay').classList.remove('expand');
        document.querySelector('#calendardisplay').classList.remove('expand');
        document.querySelector('#historydisplay').classList.remove('expand');
        document.querySelector('#settingsdisplay').classList.toggle('expand');
        document.querySelector('#signoutdisplay').classList.remove('expand');
        document.querySelector('#admindisplay').classList.remove('expand');
        // profiledisplay.style.display = 'grid';
    });
    $('#dashboardsection8').on('click', function(event) {
        document.querySelector('#profiledisplay').classList.remove('expand');
        document.querySelector('#membershipdisplay').classList.remove('expand');
        document.querySelector('#cartdisplay').classList.remove('expand');
        document.querySelector('#calendardisplay').classList.remove('expand');
        document.querySelector('#historydisplay').classList.remove('expand');
        document.querySelector('#settingsdisplay').classList.remove('expand');
        document.querySelector('#signoutdisplay').classList.toggle('expand');
        document.querySelector('#admindisplay').classList.remove('expand');
        // profiledisplay.style.display = 'grid';
    });
    $('#dashboardsection10').on('click', function(event) {
        document.querySelector('#profiledisplay').classList.remove('expand');
        document.querySelector('#membershipdisplay').classList.remove('expand');
        document.querySelector('#cartdisplay').classList.remove('expand');
        document.querySelector('#calendardisplay').classList.remove('expand');
        document.querySelector('#historydisplay').classList.remove('expand');
        document.querySelector('#settingsdisplay').classList.remove('expand');
        document.querySelector('#signoutdisplay').classList.remove('expand');
        document.querySelector('#admindisplay').classList.toggle('expand');
        // profiledisplay.style.display = 'grid';
    });
//     $('#dashboardsection9').on('click', function(event) {
//         document.querySelector('#profiledisplay').classList.remove('expand');
//         document.querySelector('#membershipdisplay').classList.remove('expand');
//         document.querySelector('#cartdisplay').classList.remove('expand');
//         document.querySelector('#calendardisplay').classList.remove('expand');
//         document.querySelector('#historydisplay').classList.remove('expand');
//         document.querySelector('#settingsdisplay').classList.remove('expand');
//         document.querySelector('#signoutdisplay').classList.remove('expand');
//         document.querySelector('#admindisplay').classList.toggle('expand');
//         // profiledisplay.style.display = 'grid';
//     });
});
