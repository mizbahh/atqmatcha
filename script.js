// this does store all the gallery image information in one array
const galleryData = [
    { title: "Need to add later", desc: "Need to add later", height: 320 },
    { title: "Need to add later", desc: "Need to add later", height: 250 },
    { title: "Need to add later", desc: "Need to add later", height: 380 },
    { title: "Need to add later", desc: "Need to add later", height: 290 },
    { title: "Need to add later", desc: "Need to add later", height: 250 },
    { title: "Need to add later", desc: "Need to add later", height: 320 },
    { title: "Need to add later", desc: "Need to add later", height: 290 },
    { title: "Need to add later", desc: "Need to add later", height: 230 },
    { title: "Need to add later", desc: "Need to add later", height: 340 },
    { title: "Need to add later", desc: "Need to add later", height: 270 },
    { title: "Need to add later", desc: "Need to add later", height: 310 },
    { title: "Need to add later", desc: "Need to add later", height: 360 }
];

// make a blank white image placeholder
const blankImage =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="800" viewBox="0 0 600 800">
            <rect width="100%" height="100%" fill="white"/>
        </svg>
    `);

// this grabs the main HTML elements I need to work with in JavaScript
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxDesc = document.getElementById("lightboxDesc");
const closeBtn = document.getElementById("closeBtn");

// build all the image cards and place them into the gallery section
function renderGallery() {
    let html = "";

    for (let i = 0; i < galleryData.length; i++) {
        const item = galleryData[i];
        html += `
            <article class="pin" data-index="${i}">
                <img src="${blankImage}" alt="Need to add later" style="height:${item.height}px;">
                <div class="pin-body">
                    <h3>${item.title}</h3>
                    <p>${item.desc}</p>
                </div>
            </article>
        `;
    }

    gallery.innerHTML = html;
}

// open the popup and fill it with the image that I clicked
function openLightbox(index) {
    const item = galleryData[index];
    lightboxImg.src = blankImage;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.desc;
    lightbox.classList.add("show");
}

// check which image card I clicked and opens the right popup
gallery.addEventListener("click", function (e) {
    const pin = e.target.closest(".pin");

    if (!pin) {
        return;
    }

    openLightbox(pin.dataset.index);
});

//close the popup when I click the x button
closeBtn.addEventListener("click", function () {
    lightbox.classList.remove("show");
});

lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
        lightbox.classList.remove("show");
    }
});

// run the gallery right away when the page loads
renderGallery();
