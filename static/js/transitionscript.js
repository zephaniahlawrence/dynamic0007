document.addEventListener('DOMContentLoaded', function(){

    document.querySelector('.more1').addEventListener('click', function() {
        // event.stopPropagation();
        event.stopImmediatePropagation();

        document.querySelector('.arrow').classList.toggle('rotate');
        document.querySelector('.more1').classList.toggle('expand');
        document.querySelector('.more2').classList.toggle('expand');

        document.querySelector('.sandwich1').classList.remove('expand');
        document.querySelector('.sandwich2').classList.remove('expand');
        document.querySelector('.svgrotate').classList.remove('rotate');

        document.querySelector('.account').classList.remove('expand');
        document.querySelector('.search').classList.remove('expand');
        document.querySelector('.alerticon').classList.remove('expand');
        document.querySelector('.messagewindow').classList.remove('expand');
        document.querySelector('.messagewindowclosebutton').classList.remove('visible');

    });
    document.querySelector('.sandwich1').addEventListener('click', function() {
        // event.stopPropagation();
        event.stopImmediatePropagation();

        document.querySelector('.sandwich1').classList.toggle('expand');
        document.querySelector('.sandwich2').classList.toggle('expand');
        document.querySelector('.svgrotate').classList.toggle('rotate');

        document.querySelector('.arrow').classList.remove('rotate');
        document.querySelector('.more1').classList.remove('expand');
        document.querySelector('.more2').classList.remove('expand');


        document.querySelector('.account').classList.remove('expand');
        document.querySelector('.search').classList.remove('expand');
        document.querySelector('.alerticon').classList.remove('expand');
        document.querySelector('.messagewindow').classList.remove('expand');
        document.querySelector('.messagewindowclosebutton').classList.remove('visible');
    });


    document.querySelector('.accountswitch').addEventListener('click', function() {
        // event.stopPropagation();
        event.stopImmediatePropagation();

        document.querySelector('.account').classList.toggle('expand');

        document.querySelector('.arrow').classList.remove('rotate');
        document.querySelector('.more1').classList.remove('expand');
        document.querySelector('.more2').classList.remove('expand');
        document.querySelector('.sandwich1').classList.remove('expand');
        document.querySelector('.sandwich2').classList.remove('expand');

        document.querySelector('.search').classList.remove('expand');
        document.querySelector('.alerticon').classList.remove('expand');
        document.querySelector('.messagewindow').classList.remove('expand');
        document.querySelector('.messagewindowclosebutton').classList.remove('visible');
    });
    document.querySelector('.accountswitch2').addEventListener('click', function() {
        // event.stopPropagation();
        event.stopImmediatePropagation();

        document.querySelector('.account').classList.toggle('expand');

        document.querySelector('.sandwich1').classList.remove('expand');
        document.querySelector('.sandwich2').classList.remove('expand');

        document.querySelector('.search').classList.remove('expand');
        document.querySelector('.alerticon').classList.remove('expand');
        document.querySelector('.messagewindow').classList.remove('expand');
        document.querySelector('.messagewindowclosebutton').classList.remove('visible');
    });


    document.querySelector('.dashboardbtn').addEventListener('click', function() {
        event.stopImmediatePropagation();

        document.querySelector('.dashboard').classList.toggle('expand');
    });


    document.querySelector('.searchswitch').addEventListener('click', function() {
        // event.stopPropagation();
        event.stopImmediatePropagation();

        document.querySelector('.search').classList.toggle('expand');
        document.querySelector('#searchinput').focus();

        document.querySelector('.account').classList.remove('expand');

        document.querySelector('.arrow').classList.remove('rotate');
        document.querySelector('.more1').classList.remove('expand');
        document.querySelector('.more2').classList.remove('expand');
        document.querySelector('.sandwich1').classList.remove('expand');
        document.querySelector('.sandwich2').classList.remove('expand');

        document.querySelector('.alerticon').classList.remove('expand');
        document.querySelector('.messagewindow').classList.remove('expand');
        document.querySelector('.messagewindowclosebutton').classList.remove('visible');
    });
    document.querySelector('.searchswitch2').addEventListener('click', function() {
        // event.stopPropagation();
        event.stopImmediatePropagation();

        document.querySelector('.search').classList.toggle('expand');
        document.querySelector('#searchinput').focus();

        document.querySelector('.account').classList.remove('expand');

        document.querySelector('.arrow').classList.remove('rotate');
        document.querySelector('.more1').classList.remove('expand');
        document.querySelector('.more2').classList.remove('expand');

        document.querySelector('.sandwich1').classList.remove('expand');
        document.querySelector('.sandwich2').classList.remove('expand');

        document.querySelector('.alerticon').classList.remove('expand');
        document.querySelector('.messagewindow').classList.remove('expand');
        document.querySelector('.messagewindowclosebutton').classList.remove('visible');
    });

    document.querySelector('.mlbtn').addEventListener('click', function() {
        // event.stopPropagation();
        event.stopImmediatePropagation();

        // document.querySelector('.confirmation').classList.toggle('success');

        document.querySelector('.account').classList.remove('expand');
        document.querySelector('.search').classList.remove('expand');

        document.querySelector('.alerticon').classList.remove('expand');
        document.querySelector('.messagewindow').classList.remove('expand');
        document.querySelector('.messagewindowclosebutton').classList.remove('visible');
    });
    document.querySelector('.mlcontinue').addEventListener('click', function() {
        // event.stopPropagation();
        event.stopImmediatePropagation();

        document.querySelector('.confirmation').classList.remove('success');
    });

    document.querySelector('.alerticon').addEventListener('click', function() {
        // event.stopPropagation();
        event.stopImmediatePropagation();

        document.querySelector('.alerticon').classList.toggle('expand');
        document.querySelector('.messagewindow').classList.toggle('expand');
        document.querySelector('.messagewindowclosebutton').classList.toggle('visible');

        document.querySelector('.arrow').classList.remove('rotate');
        document.querySelector('.more1').classList.remove('expand');
        document.querySelector('.more2').classList.remove('expand');
        document.querySelector('.account').classList.remove('expand');
        document.querySelector('.search').classList.remove('expand');
        document.querySelector('.sandwich1').classList.remove('expand');
        document.querySelector('.sandwich2').classList.remove('expand');
        document.querySelector('.confirmation').classList.remove('success');
    });

    document.querySelector('.messagewindowclosebutton').addEventListener('click', function() {
        // event.stopPropagation();
        event.stopImmediatePropagation();

        document.querySelector('.account').classList.remove('expand');
        document.querySelector('.search').classList.remove('expand');
        document.querySelector('.alerticon').classList.toggle('expand');
        document.querySelector('.messagewindow').classList.toggle('expand');
        document.querySelector('.messagewindowclosebutton').classList.remove('visible');
    });


});
