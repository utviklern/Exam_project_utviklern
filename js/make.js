// Sjekk om bruker er logget inn hvis ikke redirect til login
if (localStorage.getItem("token") === null) {
    window.location.href = "login.html";
}

async function makeBlogPost(e) {
    // Forhindre at skjemaet sender data til serveren
    e.preventDefault();

    // Henter data fra inputfeltene
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const image = document.getElementById("image").value;
    const alt = document.getElementById("alt").value;


    // Lager et objekt med dataen
    const data = {
        title: title,
        body: body,
        media: {
            url: image,
            alt: alt,
        },
    };

    // Post dataen til APi
    const response = await fetch("https://v2.api.noroff.dev/blog/posts/Teigstad", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
    });

    const json = await response.json();


    // Hvis responsen er ok, redirect til index.html (bytte til overview senere)
    if (response.ok) {
        window.location.href = "index.html";
    } else {
        console.log("error", json);
    }
}


// eventlistner submit event fra form og så kall login
document.getElementById('make-new-post').addEventListener('submit', makeBlogPost)