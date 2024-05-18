async function login(e) {
    // Forhindre at skjemaet sender data til serveren, gjør det med fetch istedenfor
    e.preventDefault()

    const response = await fetch('https://v2.api.noroff.dev/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: document.getElementById('email').value,
            password: document.getElementById('password').value
        })
    })

    const json = await response.json()

    // Få access token og lagre i local storage
    if (json.data.accessToken) {
        localStorage.setItem('token', json.data.accessToken)

        // Redirect til alle poster
        window.location.href = '/account/overview.html'
    }
}

// Om bruker er logget inn, redirect til oversikt med en gang
if (localStorage.getItem('token')) {
    window.location.href = '/account/overview.html'
}

// Lytt på submit event fra form og så kall login
document.getElementById('login').addEventListener('submit', login)