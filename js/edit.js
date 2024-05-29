// Sjekk om bruker er logget inn hvis ikke redirect til login
if (localStorage.getItem("token") === null) {
    window.location.href = "login.html";
}


const params = new URLSearchParams(window.location.search);// henter id fra søkebar
const postId = params.get("id");
const apiUrl = `https://v2.api.noroff.dev/blog/posts/Teigstad/${postId}`;


async function fillForm() {//fyller skjema emd blog post content
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(`Network error: ${response.statusText}`);
        }
        const post = await response.json();

        document.getElementById("title").value = post.data.title || "";
        document.getElementById("body").value = post.data.body || "";
        document.getElementById("image").value = (post.data.media && post.data.media.url) || "";
        document.getElementById("alt").value = (post.data.media && post.data.media.alt) || "";
    } catch (error) {
        console.error("Fetching error:", error);
    }
}


async function updateBlogPost(e) {//funskjon for oppdateroing
    e.preventDefault();// Forhindre at skjemaet sender data til serveren

    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const image = document.getElementById("image").value;
    const alt = document.getElementById("alt").value;

    const data = {
        title: title,
        body: body,
        media: {
            url: image,
            alt: alt,
        },
    };

    const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
    });

    const json = await response.json();

    if (response.ok) {
        window.location.href = "index.html";
    } else {
        console.log("error", json);
    }
}


async function deletePost() {// funskjon for sletting
    const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    if (response.ok) {
        window.location.href = "../account/overview.html";
    } else {
        const json = await response.json();
        console.log("error", json);
    }
}

document.getElementById("edit-post").addEventListener("submit", updateBlogPost);
document.getElementById("delete-post-button").addEventListener("click", deletePost);

fillForm();
