document.addEventListener("DOMContentLoaded", function(){


    document.addEventListener("scroll", function() {
        const alerticon = document.querySelector('.alerticon');
        const scrollThreshold = 7;
        if (window.scrollY > scrollThreshold) {
            alerticon.classList.add('visible');
        }
        else if (window.scrollY < scrollThreshold) {
            alerticon.classList.remove('visible');
        }
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
