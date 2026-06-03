// document.addEventListener('DOMContentLoaded', function(){


    document.querySelector('.serviceclick1').addEventListener('click', function() {
        event.stopPropagation();
        localStorage.setItem('serviceclick1', 'true');
        location.href = "services(finalized).html#lashsection";
    });
    document.querySelector('.serviceclick2').addEventListener('click', function() {
        event.stopPropagation();
        localStorage.setItem('serviceclick2', 'true');
        location.href = "services(finalized).html#browsection";
    });
    document.querySelector('.serviceclick3').addEventListener('click', function() {
        event.stopPropagation();
        localStorage.setItem('serviceclick3', 'true');
        location.href = "services(finalized).html#facialsection";
    });

    document.querySelector('.highlight1').addEventListener('click', function() {
        event.stopPropagation();
        localStorage.setItem('highlight1', 'true');
        location.href = "services(finalized).html#highlight1";
    });
    // document.querySelector('.highlight2').addEventListener('click', function() {
    //     event.stopPropagation();
    //     localStorage.setItem('highlight2', 'true');
    //     location.href = "services(finalized).html#highlight2";
    // });

    // document.querySelector('.highlight3').addEventListener('click', function() {
    //     event.stopPropagation();
    //     localStorage.setItem('highlight3', 'true');
    //     location.href = "services(finalized).html#highlight3";
    // });


// });




// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    // Check if the flag exists in localStorage
    if (localStorage.getItem('serviceclick1') === 'true') {
        // Find the target element
        const targetElement = document.getElementById('lashsection');

        if (targetElement) {
            // Simulate a click on the element using the .click() method
            targetElement.click();
        }

        // Clean up the flag in localStorage to prevent the click from happening again on subsequent visits/refreshes
        localStorage.removeItem('serviceclick1');
    }

    // Check if the flag exists in localStorage
    else if (localStorage.getItem('serviceclick2') === 'true') {
        // Find the target element
        const targetElement = document.getElementById('browsection');

        if (targetElement) {
            // Simulate a click on the element using the .click() method
            targetElement.click();
        }

        // Clean up the flag in localStorage to prevent the click from happening again on subsequent visits/refreshes
        localStorage.removeItem('serviceclick2');
    }

    // Check if the flag exists in localStorage
    else if (localStorage.getItem('serviceclick3') === 'true') {
        // Find the target element
        const targetElement = document.getElementById('facialsection');

        if (targetElement) {
            // Simulate a click on the element using the .click() method
            targetElement.click();
        }

        // Clean up the flag in localStorage to prevent the click from happening again on subsequent visits/refreshes
        localStorage.removeItem('serviceclick3');
    }


    else if (localStorage.getItem('highlight1') === 'true') {
        // Find the target element
        const targetElement = document.getElementById('lashsection');

        if (targetElement) {
            // Simulate a click on the element using the .click() method
            targetElement.click();
            }



                setTimeout(() => {
                    function scrollToElement() {
                                        const element = document.getElementById('highlight1');
                                            if (element) {
                                                element.scrollIntoView({
                                                behavior: 'smooth',
                                                block: 'start' // Aligns the top of the element to the top of the visible area
                                                });
                                            }
                                    }
            }, 3000);



        // Clean up the flag in localStorage to prevent the click from happening again on subsequent visits/refreshes
        localStorage.removeItem('highlight1');
    }
});
