import { readMoreBtn } from "./utils.js";

document.addEventListener("DOMContentLoaded", async function() {
    const api = "https://v2.api.noroff.dev/blog/posts/Teigstad";

    async function fetchPosts() {
        try {
            const response = await fetch(api);
            // console.log(response); 
            if (!response.ok) {
                throw new Error(`Network error: ${response.statusText}`);
            }
            const data = await response.json();
            return data.data.slice(0, 12); // 12 siste 
        } catch (error) {
            console.error("Fetching error:", error);
            return [];
        }
    }

    const postsContainer = document.getElementById("posts-container");

    async function addPost() {
        const posts = await fetchPosts();

        let index = 0;
        while (index < posts.length) {
            const post = posts[index];

            // lager postcard container
            const postCard = document.createElement("div");
            postCard.className = "post-card";

            // bilde element og contianer
            const postCardImgContainer = document.createElement("div");
            postCardImgContainer.className = "post-card-img";

            const postCardImg = document.createElement("img");
            postCardImg.src = post.media.url || "";
            postCardImg.alt = post.media.alt || "Post image";
            postCardImgContainer.appendChild(postCardImg);

             postCardImg.addEventListener("click", function() { //redirekter ved trykk på bildet
                window.location.href = `/post/specific.html?id=${post.id}`;
            });

            const postTitle = document.createElement("h2");//tittel
            postTitle.className = "main-h2";
            postTitle.textContent = post.title;

            const buttonsPost = document.createElement("div"); //knapp read mor
            const readMoreButton = readMoreBtn(post.id);
            buttonsPost.appendChild(readMoreButton);

            postCard.appendChild(postCardImgContainer);// legger alt inn
            postCard.appendChild(postTitle);
            postCard.appendChild(buttonsPost);

            postsContainer.appendChild(postCard);//legger inn i conatiner

            index++;
        }
    }

    addPost();
});
