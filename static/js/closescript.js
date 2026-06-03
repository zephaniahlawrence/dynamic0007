document.addEventListener("DOMContentLoaded", function(){


    const more1 = document.querySelector('.more1');
    document.addEventListener('click', function(event) {
        // Check if the clicked element is not the popup itself and not a descendant of the popup
        if (!more1.contains(event.target) && event.target !== document.querySelector('button')) {
            document.querySelector('.more1').classList.remove('expand');
            document.querySelector('.more2').classList.remove('expand');
            document.querySelector('.arrow').classList.remove('rotate');
            // popup.style.display = 'none';
        }
    });


    const sandwich1 = document.querySelector('.sandwich1');
    document.addEventListener('click', function(event) {
        // Check if the clicked element is not the popup itself and not a descendant of the popup
        if (!sandwich1.contains(event.target) && event.target !== document.querySelector('button')) {
            document.querySelector('.sandwich1').classList.remove('expand');
            document.querySelector('.sandwich2').classList.remove('expand');

            document.querySelector('.svgrotate').classList.remove('rotate');
        }
    });


    const accountwindow = document.querySelector('.account');
    document.addEventListener('click', function(event) {
        // Check if the clicked element is not the popup itself and not a descendant of the popup
        if (!accountwindow.contains(event.target) && event.target !== document.querySelector('button')) {
            document.querySelector('.account').classList.remove('expand');
            // popup.style.display = 'none';
        }
    });


    const dashboardwindow = document.querySelector('.dashboard');
    document.addEventListener('click', function(event) {
        // Check if the clicked element is not the popup itself and not a descendant of the popup
        if (!dashboardwindow.contains(event.target) && event.target !== document.querySelector('button')) {
            document.querySelector('.dashboard').classList.remove('expand');
            // document.querySelector('.dashboard').style.display = 'none';
        }
    });


    const search = document.querySelector('.search');
    const listItem = document.querySelector('#results-list');
    document.addEventListener('click', function(event) {
        // Check if the clicked element is not the popup itself and not a descendant of the popup
        if (!search.contains(event.target) && event.target !== document.querySelector('button')) {
            listItem.innerHTML = "";
            const resultsList = document.getElementById('results-list');
            resultsList.style.display = 'none';
            document.querySelector('.search').classList.remove('expand');
            // popup.style.display = 'none';

        }
    });


    const messagewindow = document.querySelector('.messagewindow');
    document.addEventListener('click', function(event) {
        // Check if the clicked element is not the popup itself and not a descendant of the popup
        if (!messagewindow.contains(event.target) && event.target !== document.querySelector('button')) {
            document.querySelector('.alerticon').classList.remove('expand');
            document.querySelector('.messagewindow').classList.remove('expand');
            document.querySelector('.messagewindowclosebutton').classList.remove('visible');
            // popup.style.display = 'none';
        }
    });

    const confirmation = document.querySelector('.confirmation');
    document.addEventListener('click', function(event) {
        // Check if the clicked element is not the popup itself and not a descendant of the popup
        if (!confirmation.contains(event.target) && event.target !== document.querySelector('button')) {
            document.querySelector('.confirmation').classList.remove('success');

            // popup.style.display = 'none';
        }
    });


});
