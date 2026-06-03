$(document).ready(function() {
    const scrollButton = document.querySelector('#changepasswordbtn');
    const scrollContainer = document.querySelector('#personalinfo');
    const passwordSection = window.getComputedStyle(document.querySelector('#changepasswordsection'));

    const updateprofileform = document.getElementById('updateprofileform');

    $('#updateprofileform').on('submit', function(event) {
        // console.log($('#oldpassword').val());
        $.ajax({
            data: {
                fullnameupdate: $('#fullnameupdate').val(),
                phonenumberupdate: $('#phonenumberupdate').val(),
                emailupdate: $('#emailupdate').val(),
                addressupdate: $('#addressupdate').val(),
                file: $('#file').val(),
                oldpassword: $('#oldpassword').val(),
                newpassword: $('#newpassword').val(),
                newpasswordconfirmation: $('#newpasswordconfirmation').val()
            },
            type : 'POST',
            url : '/updateprofile'
        })
        .done(async function(data) {
            if (data.error) {
                $('#error').text(data.error).show();
            }
            // else if (data) {
            //     document.getElementById('errorcode2').innerHTML = data;
            // }
            else if (data["code"] === 201) {
                document.querySelector('#processcode').classList.add('expand');
                document.getElementById('processcode').innerHTML = data["message"];
                document.querySelector('#profile').style.maxHeight = '504px';
                document.querySelector('#dashboardsection').style.maxHeight = '504px';
            }
            else if (data["code"] === 500 || 501) {
                document.querySelector('#errorcode').classList.add('expand');
                document.getElementById('errorcode').innerHTML = data["message"];
                // console.log(window.getComputedStyle(document.querySelector('#errorcode')).display);
                if (window.getComputedStyle(document.querySelector('#errorcode')).display  === 'grid'){
                    // console.log(window.getComputedStyle(document.querySelector('#errorcode')).display);
                    document.querySelector('#profile').style.maxHeight = '442px';
                    scrollContainer.scrollTo({
                        top: scrollContainer.scrollHeight,
                        behavior: 'smooth'
                    });
                }
            }
            // event.preventDefault();
            // else if (!data["status"]) {
            //     document.getElementById('signinerror').innerHTML = data["message"];
            // }
            // else if (data["errorcode"]) {
            //     document.getElementById('signinerror').innerHTML = data["errorcode"];
            // }
            // else if (data["status"]) {
            //     document.querySelector('#accountbtn').style.display = "none";
            //     document.querySelector('#dashboardbtn').style.display = "flex";
            //     document.querySelector('#dashboardbtn2').style.display = "flex";

            //     document.querySelector('.account').classList.remove('expand');
            //     document.querySelector('.dashboard').classList.add('expand');
            //     document.getElementById('accountname').innerHTML = data["fullname"];
            //     document.getElementById('accountmessage').innerHTML = data["message"];
            //     const profileimage = data["profileimage"];
            //     document.getElementById('profile-picture-wrapper').innerHTML = `<img src="${profileimage}" height="100%" width="100%" class="profile-picture"></img>`;
            //     document.getElementById('dashboardbtn').innerHTML = `<div class="profile-picture-wrapper2"><img src="${profileimage}" height="100%" width="100%" class="profile-picture"></img></div>`;
            //     document.getElementById('dashboardbtn2').innerHTML = `<div class="profile-picture-wrapper3"><img src="${profileimage}" height="100%" width="100%" class="profile-picture"></img></div>`;
            //     // document.getElementById('accountbtn2').innerHTML = `<div class="profile-picture-wrapper3"><img src="${profileimage}" height="100%" width="100%" class="profile-picture"></img></div>`;
            //     if (data["profileimage"] === "static/images/defaultprofilepicture.png")
            //     {
            //         document.querySelector('.profile-picture-wrapper').style.padding = "9px";
            //         document.querySelector('.profile-picture-wrapper2').style.padding = "2.4px";
            //         document.querySelector('.profile-picture-wrapper3').style.padding = "2.4px";
            //     }
            //     document.getElementById('membershipstatus').innerHTML = data["membership"];
            //     document.getElementById('membershipstatus2').innerHTML = data["membership"];
            //     // document.getElementById('membershipstatus').innerHTML = data["notifications"][0];




            //     document.getElementById('fullnameupdate').placeholder = data["fullname"];
            //     document.getElementById('phonenumberupdate').placeholder = data["phonenumber"];
            //     document.getElementById('emailupdate').placeholder = data["email"];
            //     document.getElementById('addressupdate').placeholder = data["address"];
            //     // document.getElementById('profilepictureupdate').placeholder = data["profileimage"];
            // }
        })
        event.preventDefault();

        // // Change action based on input
        // if (selectedRole === 'admin') {
        // form.action = '/admin-dashboard.php';
        // } else {
        // form.action = '/user-dashboard.php';
        // }
        // document.querySelector('#changepasswordsection').style.height = "fit-content";


        // event.preventDefault();
        // event.stopImmediatePropagation();
    });

    scrollButton.addEventListener('click', () => {
        document.getElementById("updateprofileform").reset();
        if (passwordSection.display === 'none'){
            // console.log("open");
            document.querySelector('#changepasswordsection').classList.add('expand');
            document.querySelector('#profile').style.maxHeight = '394px';
            scrollContainer.scrollTo({
                top: scrollContainer.scrollHeight,
                behavior: 'smooth'
            });
        }
        else {
            // console.log("close");
            document.querySelector('#changepasswordsection').classList.remove('expand');
            document.querySelector('#profile').style.maxHeight = '494px';
            scrollContainer.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });

});




            // if (window.getComputedStyle(document.querySelector('#errorcode')).display  === 'grid'){
            //     document.querySelector('#profile').style.maxHeight = '411px';
            //     scrollContainer.scrollTo({
            //         top: scrollContainer.scrollHeight,
            //         behavior: 'smooth'
            //     });
            // }
