document.addEventListener("DOMContentLoaded", async function() {
    // Sjekk om bruker er logget inn hvis ikke redirect til login
    if (localStorage.getItem("token") === null) {
        window.location.href = "login.html";
    }

    const api = "https://v2.api.noroff.dev/blog/posts/Teigstad";

    async function fetchPosts() {
        try {
            const response = await fetch(api);
            if (!response.ok) {
                throw new Error(`Network error: ${response.statusText}`);
            }
            const data = await response.json();
            return data.data; //alle innlegg
        } catch (error) {
            console.error("Fetching error:", error);
            return [];
        }
    }

    const overviewContainer = document.getElementById("overview-container");

    async function addPosts() {
        const posts = await fetchPosts();

        let index = 0;
        while (index < posts.length) {
            const post = posts[index];

            
            const postCard = document.createElement("div");
            postCard.className = "post-card";//bruker samme post card

            // bilde element og container
            const postCardImgContainer = document.createElement("div");
            postCardImgContainer.className = "post-card-img";

            const postCardImg = document.createElement("img");
            postCardImg.src = post.media.url || "";
            postCardImg.alt = post.media.alt || "Post image";
            postCardImgContainer.appendChild(postCardImg);

            postCardImg.addEventListener("click", function() { //redirekter ved trykk på bildet
                window.location.href = `/post/index.html?id=${post.id}`;
            });

            const postTitle = document.createElement("h2");//tittel
            postTitle.className = "main-h2";
            postTitle.textContent = post.title;

            const buttonsPost = document.createElement("div"); //knapp edit
            buttonsPost.className = "buttons-post";
            const editButton = document.createElement("button");
            editButton.textContent = 'Edit';
            editButton.className = 'edit-btn sml-btn'; 
            editButton.onclick = function() {
                window.location.href = `/post/edit.html?id=${post.id}`;
            };
            buttonsPost.appendChild(editButton);

            postCard.appendChild(postCardImgContainer);// legger alt inn
            postCard.appendChild(postTitle);
            postCard.appendChild(buttonsPost);

            overviewContainer.appendChild(postCard); //legger inn i container

            index++;
        }
    }

    addPosts();
});
