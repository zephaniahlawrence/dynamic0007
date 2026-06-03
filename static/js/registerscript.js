$(document).ready(function() {
    const display = document.querySelector('#account');
    const dashboard = document.querySelector('#dashboard');
    const dashboardsection1 = document.getElementById('dashboardsection1');
    $('#registersubmit').on('click', function(event) {

        // event.preventDefault();
        // document.querySelector('.account').classList.remove('expand');
        // document.querySelector('.dashboard').classList.add('expand');

        $.ajax({
            data: {
                userfullname: $('#userfullname').val(),
                userphone: $('#userphone').val(),
                useremail: $('#useremail').val(),
                userpassword: $('#userpassword').val()
            },
            type : 'POST',
            url : '/register'
        })

        .done(async function(data) {
            if (data.error) {
                $('#error').text(data.error).show();
            }
            else {
                document.getElementById('account').innerHTML = data;
                // document.getElementById('dashboardsection1').innerHTML = data;
            }
        })

        event.preventDefault();

    });
});
