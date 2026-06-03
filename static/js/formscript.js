document.addEventListener("DOMContentLoaded", (event) => {


    const form = document.getElementById('mlform');
    const result = document.getElementById('mlresult');
    const success = document.querySelector('.confirmation');


    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const formData = new FormData(form);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);
        document.querySelector('.confirmation').classList.toggle('success');
      result.innerHTML = "Please wait..."

        fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
            .then(async (response) => {
                let json = await response.json();
                if (response.status == 200) {
    //                 result.innerHTML = json.message;
                    result.innerHTML = "You're registration was successful!";
                    // success.style.display = 'flex';
                    // document.querySelector('.confirmation').classList.toggle('success');


                } else {
                    console.log(response);
                    result.innerHTML = json.message;
                    // document.querySelector('.confirmation').classList.toggle('success');
                }
            })
            .catch(error => {
                console.log(error);
                result.innerHTML = "Something went wrong!";
                // document.querySelector('.confirmation').classList.toggle('success');
            })
            .then(function() {
                form.reset();
                setTimeout(() => {
    //                 result.style.display = "none";
                }, 3000);
            });
    });


});
