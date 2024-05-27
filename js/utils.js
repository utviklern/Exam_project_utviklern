export function readMoreBtn(postId) { //funskjon for read more knapp, eksorteres for bruk andre steder 
    const readMoreButton = document.createElement('button');
    readMoreButton.textContent = 'Read more';
    readMoreButton.className = 'read-more-btn sml-btn'; 
    readMoreButton.onclick = function() {
        window.location.href = `/post/index.html?id=${postId}`;
    };
    return readMoreButton;
}
