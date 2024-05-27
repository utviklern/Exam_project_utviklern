import { readMoreBtn } from "./utils.js";

document.addEventListener("DOMContentLoaded", async function() {
    const api = "https://v2.api.noroff.dev/blog/posts/Teigstad";

    async function fetchPosts() {
        try {
            const response = await fetch(api);
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

    const homeContainer = document.getElementById("home-container");

    async function addPost() {
        const posts = await fetchPosts();

        let index = 0;
        while (index < posts.length) {
            const post = posts[index];

            // lager postcard container
            const postCard = document.createElement("div");
            postCard.className = "post-card";

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

            const buttonsPost = document.createElement("div"); //knapp read more
            buttonsPost.className = "buttons-post";
            const readMoreButton = readMoreBtn(post.id);
            buttonsPost.appendChild(readMoreButton);

            postCard.appendChild(postCardImgContainer);// legger alt inn
            postCard.appendChild(postTitle);
            postCard.appendChild(buttonsPost);

            homeContainer.appendChild(postCard); //legger inn i container

            index++;
        }
    }

    async function slider() {
        const posts = await fetchPosts();
        const slider = document.getElementById("slider");
        const treeLast = posts.slice(0, 3); //henter de 3 siste inleggene
        // console.log(treeLast)

        let index = 0;
        while (index < treeLast.length) {
            const post = treeLast[index];

            const sliderPost = document.createElement("div");
            sliderPost.className = "slider-post";

            const postCard = document.createElement("div");
            postCard.className = "post-card"; //bruker den generelle stylen til post card i slideren

            const sliderImgContainer = document.createElement("div");
            sliderImgContainer.className = "post-card-img";

            const sliderImg = document.createElement("img");
            sliderImg.src = post.media.url || "";
            sliderImg.alt = post.media.alt || "Post image";
            sliderImgContainer.appendChild(sliderImg);

            const postTitle = document.createElement("h2");
            postTitle.className = "main-h2";
            postTitle.textContent = post.title;

            const sliderBtn = document.createElement("div");
            sliderBtn.className = "slider-read-more-btn";

            const readMoreButton = readMoreBtn(post.id);
            sliderBtn.appendChild(readMoreButton);

            postCard.appendChild(sliderImgContainer);
            postCard.appendChild(postTitle);
            postCard.appendChild(sliderBtn);

            sliderPost.appendChild(postCard);
            slider.appendChild(sliderPost);

            index++;
        }

        const goLeftButton = document.querySelector(".slider-pointer.left");
        const goRightButton = document.querySelector(".slider-pointer.right");
        let currentIndex = 0;
        let autoRotate;

        function updateSlider() {
            const items = document.querySelectorAll(".slider-post");
            if (items.length > 0) {
                const itemWidth = items[0].clientWidth;
                slider.style.transform = 'translateX(' + (-currentIndex * itemWidth) + 'px)';
            }
        }

        function autoRotateStart() { //starter auto rotate med en interval på 4sek
            autoRotate = setInterval(function() {
                currentIndex = (currentIndex < treeLast.length - 1) ? currentIndex + 1 : 0;
                updateSlider();
            }, 4000);
        }

        function autoRotateStop() { //stopper auto rotate
            clearInterval(autoRotate);
        }

        goLeftButton.addEventListener("click", function() { //roterer til venstre
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : treeLast.length - 1;
            updateSlider();
        });

        goRightButton.addEventListener("click", function() { //roterer til høyre
            currentIndex = (currentIndex < treeLast.length - 1) ? currentIndex + 1 : 0;
            updateSlider();
        });

        slider.addEventListener("mouseenter", function() { //stopper slideren når man hoverer
            autoRotateStop();
        });
        
        slider.addEventListener("mouseleave", function() { //starter auto rotajsonen nr man flytter musen fra innlegg
            autoRotateStart();
        });

        window.addEventListener("resize", function() {
            updateSlider();
        });

        autoRotateStart();
        updateSlider(); 
    }

    await addPost();
    await slider();
});
