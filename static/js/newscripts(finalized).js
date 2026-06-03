document.addEventListener('DOMContentLoaded', function(){

    // reveal on scroll
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var obs = new IntersectionObserver(function(entries){
            entries.forEach(function(entry){
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    obs.unobserve(entry.target);
                }
            });
        }, {threshold: 0.12});
        reveals.forEach(function(r){ obs.observe(r); });
    } else {
        // fallback
        reveals.forEach(function(r){ r.classList.add('in-view'); });
    };


    document.addEventListener('scroll', function() {
    const scrollPosition = window.scrollY;
    const revealElements = document.querySelectorAll('.grow-on-scroll');

        revealElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top + scrollPosition;
            const distance = Math.abs(scrollPosition - elementPosition);
            const scale = 1 + Math.min(distance / 500, 0.2); // Adjust the divisor for sensitivity

            element.style.transform = `scale(${scale})`;
            });
    });


});


// document.addEventListener('DOMContentLoaded', function(){

//     document.addEventListener("scroll", function() {
//         const alerticon = document.querySelector('.alerticon');
//         const scrollThreshold = 7;
//         if (window.scrollY > scrollThreshold) {
//             alerticon.classList.add('visible');
//         }
//         else if (window.scrollY < scrollThreshold) {
//             alerticon.classList.remove('visible');
//         }
//     });


// });
