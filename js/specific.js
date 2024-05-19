document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const postId = params.get("id");
    const specificPost = `https://v2.api.noroff.dev/blog/posts/Teigstad/${postId}`;


    if (postId) {
        try {
            const response = await fetch(specificPost);
            // console.log(response); 
            if (!response.ok) {
                throw new Error(`error: ${response.statusText}`);
            }
            const post = await response.json();
            displayPost(post.data);
        } catch (error) {
            console.error("Fetching error:", error);
        }
    } else {
        console.error("No post found");
    }
});

function displayPost(post) {
    const postContainer = document.getElementById("post-container");


    const elements = [
        { tag: "img", src: post.media.url, alt: post.media.alt, className: "post-img" },
        { tag: "h1", text: post.title, className: "main-h1" },
        { tag: "p", text: post.body, className: "main-text" },
        
    ];

    for (let element of elements) {
        const el = document.createElement(element.tag);
        el.textContent = element.text;
        if (element.className) {
            el.className = element.className;
        }
        postContainer.appendChild(el);
    }
}
