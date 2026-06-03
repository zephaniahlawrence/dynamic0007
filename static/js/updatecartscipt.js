$(document).ready(function() {

    $('#serviceidform').on('submit', function(event) {

        $.ajax({
            data: {
                serviceid: $('#serviceidform').val()
            },
            type : 'POST',
            url : '/updatecart'
        })

        .done(async function(data) {
            console.log('Form submitted');
            document.getElementById('pricetotal').innerHTML = data["price"];
        })

        event.preventDefault();

    })

});
