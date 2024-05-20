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
    const specificContainer = document.getElementById("specific-container");

    const elements = [
        // {
        //     tag: "div", className: "img-wrapper-speci", children: [
        //         { tag: "img", src: post.media.url, alt: post.media.alt, className: "post-img" }
        //     ]
        // }, kommenter inn etter bytte av img
        
        { tag: "h1", text: post.title, className: "main-h1" },
        { tag: "p", text: post.body, className: "main-text" },
    ];

    let index = 0;
    while (index < elements.length) {
        const element = elements[index];
        const el = document.createElement(element.tag);

        if (element.children) {
            element.children.forEach(child => {
                const childElement = document.createElement(child.tag);
                childElement.src = child.src;
                childElement.alt = child.alt;
                if (child.className) {
                    childElement.className = child.className;
                }
                el.appendChild(childElement);
            });
        } else {
            el.textContent = element.text;
        }

        if (element.className) {
            el.className = element.className;
        }

        specificContainer.appendChild(el);
        index++;
    }
}
