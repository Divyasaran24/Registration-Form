
const fields = document.querySelectorAll('.input-box');
        let currentFieldIndex = 0;

        fields.forEach((field, index) => {
          field.addEventListener('input', () => {
            if (index === currentFieldIndex && field.value.trim().length > 0) {
              fields[currentFieldIndex].style.borderBottomColor = '';
            }
          });

          field.addEventListener('keydown', (event) => {
            if (index === currentFieldIndex && event.key === 'Enter') {
              event.preventDefault();
              currentFieldIndex++;
              if (currentFieldIndex < fields.length) {
                fields[currentFieldIndex].removeAttribute('disabled');
                fields[currentFieldIndex].focus();
              }
            }
          });

          field.addEventListener('click', () => {
            if (index > currentFieldIndex) {
              for (let i = 0; i <= index; i++) {
                if (fields[i].value.trim().length === 0) {
                  fields[i].style.borderBottomColor = 'red';
                  fields[i].focus();
                  return;
                }
              }
            }
            currentFieldIndex = index;

            if (index === 1) {
              fields[index - 1].style.borderBottomColor = '';
            }
          });

          field.addEventListener('blur', () => {
            if (field.value.trim().length === 0) {
              field.style.borderBottomColor = 'red';
            }
          });
        });

        document.getElementById('registration-Form').addEventListener('submit', function(event) {
            event.preventDefault();
            let password = document.getElementById('password').value;
            let confirmPassword = document.getElementById('confirm-password').value;
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }
            if (!validatePassword(password)) {
                alert("Password must be 6-10 characters long and contain at least one symbol and one number.");
                return;
            }
           
            showPopup();
        });

        document.querySelector('.close').addEventListener('click', function() {
            hidePopup();
        });

        document.getElementById('okay-btn').addEventListener('click', function() {
            hidePopup();
            redirectToLoginPage();
        });

        document.getElementById('password').addEventListener('input', function() {
            let password = this.value;
            let strengthText = document.getElementById('password-strength');
            if (password.length >= 6 && password.length <= 10 && /[0-9]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password)) {
                strengthText.textContent = 'Password strength: Strong';
            } else if (password.length >= 6 && password.length <= 10 && /[0-9]/.test(password)) {
                strengthText.textContent = 'Password strength: Medium';
            } else {
                strengthText.textContent = 'Password strength: Weak';
            }
        });

        function validatePassword(password) {
            return password.length >= 6 && password.length <= 10 && /[0-9]/.test(password) && /[!@#$%^&*(),.?":{}|<>]/.test(password);
        }

        function showPopup() {
            document.getElementById('pop-up').style.display = 'block';
        }

        function hidePopup() {
            document.getElementById('pop-up').style.display = 'none';
        }

        function redirectToLoginPage() {
            window.location.href = 'login.html';
        }