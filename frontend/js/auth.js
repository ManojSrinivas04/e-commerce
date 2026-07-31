document.addEventListener('DOMContentLoaded', () => {

    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const authMessage = document.getElementById('auth-message');

    // --- REGISTER FORM LOGIC ---
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Stop the form from submitting normally
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // This URL is correct.
                const response = await fetch('http://localhost:3001/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    // If server sends a 400 or 500 error, it will be in data.message
                    throw new Error(data.message || 'Registration failed');
                }

                // Success!
                authMessage.textContent = 'Registration successful! You can now log in.';
                authMessage.style.color = 'green';
                registerForm.reset();

            } catch (error) {
                // This 'catch' block is being triggered because the fetch failed
                // or 'response.json()' failed.
                authMessage.textContent = error.message;
                authMessage.style.color = 'red';
            }
        });
    }

    // --- LOGIN FORM LOGIC ---
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                // This URL is correct.
                const response = await fetch('http://localhost:3001/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || 'Login failed');
                }

                // --- KEY STEP: SAVE THE TOKEN ---
                localStorage.setItem('token', data.token);

                // Send them to the home page
                authMessage.textContent = 'Login successful! Redirecting...';
                authMessage.style.color = 'green';
                
                // Redirect to home page after 2 seconds
                setTimeout(() => {
                    window.location.href = 'index.html'; 
                }, 2000);

            } catch (error) {
                authMessage.textContent = error.message;
                authMessage.style.color = 'red';
            }
        });
    }
});