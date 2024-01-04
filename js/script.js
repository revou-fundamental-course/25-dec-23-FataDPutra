document.addEventListener("DOMContentLoaded", function () {
    const luasSection = document.querySelector('.luas');
    const kelilingSection = document.querySelector('.keliling');
    const changeButtons = document.querySelectorAll('.change');
    const luasForm = luasSection.querySelector('form');
    const kelilingForm = kelilingSection.querySelector('form');
    const resultLuas = document.querySelector('.resultLuas');
    const resultKeliling = document.querySelector('.resultKeliling');

    function toggleSections() {
        luasSection.style.display = luasSection.style.display === 'none' ? 'block' : 'none';
        kelilingSection.style.display = kelilingSection.style.display === 'block' ? 'none' : 'block';
        resultLuas.innerHTML = ''; 
        resultKeliling.innerHTML = ''; 
        clearFormInputs(luasForm); 
        clearFormInputs(kelilingForm);
    }


    function clearFormInputs(form) {
        const inputs = form.querySelectorAll('input[type="text"]');
        inputs.forEach(input => {
            input.value = ''; 
        });
    }

    function isValidInput(value) {
        return /^\d*\.?\d*$/.test(value);
    }


    function preventNonNumericInput(event) {
        const charCode = event.which ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
            event.preventDefault();
        }
    }


    const luasInputs = luasForm.querySelectorAll('input[type="text"]');
    const kelilingInputs = kelilingForm.querySelectorAll('input[type="text"]');
    
    luasInputs.forEach(input => {
        input.addEventListener('keypress', preventNonNumericInput);
    });
    
    kelilingInputs.forEach(input => {
        input.addEventListener('keypress', preventNonNumericInput);
    });


    function hitungLuasSegitiga(alas, tinggi) {
        return `Luas = 1/2 x ${alas} x ${tinggi} = ${0.5 * alas * tinggi}`;
    }


    function hitungKelilingSegitiga(sisiA, sisiB, sisiC) {
        return `Keliling = ${sisiA} + ${sisiB} + ${sisiC} = ${parseFloat(sisiA) + parseFloat(sisiB) + parseFloat(sisiC)}`;
    }


    luasForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const alas = luasForm.querySelector('input[placeholder="Alas"]').value;
        const tinggi = luasForm.querySelector('input[placeholder="Tinggi"]').value;

        if (!alas || !tinggi) {
            resultLuas.innerHTML = `<p>Masukkan angka untuk semua input.</p>`;
        } else if (isValidInput(alas) && isValidInput(tinggi)) {
            const prosesLuas = hitungLuasSegitiga(parseFloat(alas), parseFloat(tinggi));
            resultLuas.innerHTML = `<p>Luas = 1/2 x Alas x Tinggi </p><p>${prosesLuas}</p>`;
        } else {
            resultLuas.innerHTML = `<p>Masukkan angka valid untuk alas dan tinggi.</p>`;
        }
    });


    kelilingForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const sisiA = kelilingForm.querySelector('input[placeholder="a"]').value;
        const sisiB = kelilingForm.querySelector('input[placeholder="b"]').value;
        const sisiC = kelilingForm.querySelector('input[placeholder="c"]').value;

        if (!sisiA || !sisiB || !sisiC) {
            resultKeliling.innerHTML = `<p>Masukkan angka untuk semua input.</p>`;
        } else if (isValidInput(sisiA) && isValidInput(sisiB) && isValidInput(sisiC)) {
            const prosesKeliling = hitungKelilingSegitiga(sisiA, sisiB, sisiC);
            resultKeliling.innerHTML = `<p>Keliling = a + b + c </p> <p>${prosesKeliling}</p>`;
        } else {
            resultKeliling.innerHTML = `<p>Masukkan angka valid untuk sisi-sisi segitiga.</p>`;
        }
    });

    changeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            toggleSections();
        });
    });


    const luasClearButton = luasForm.querySelector('button[type="reset"]');
    luasClearButton.addEventListener('click', function () {
        clearFormInputs(luasForm);
        resultLuas.innerHTML = ''; 
    });


    const kelilingClearButton = kelilingForm.querySelector('button[type="reset"]');
    kelilingClearButton.addEventListener('click', function () {
        clearFormInputs(kelilingForm);
        resultKeliling.innerHTML = ''; 
    });
});
