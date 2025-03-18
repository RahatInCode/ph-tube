// most important part of code . first er ta bujhle baki sob easy lagbe

function loadCategories() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}

function loadVideos() {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
    .then(res => res.json())
    .then(data => {
        displayVideos(data.videos);
        
    })
}


loadCategoryVideos = (id) => {

    const url =`https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    console.log(url);
    fetch(url)
    .then(res => res.json())
    .then(data => {
        const clickedButton = document.getElementById(`btn-${id}`)
        clickedButton.classList.add("active")
        console.log(clickedButton);
        
        displayVideos(data.category);
        
    })
    }

function  displayCategories (categories){
    const categorieContainer = document.getElementById('category-container')
    for (cat of categories){
        console.log(cat);
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `
        
<button class="btn btn-sm hover:bg-[#FF1F3D] hover:text-white" onclick="loadCategoryVideos('${cat.category_id}')"
)" id="btn-${cat.category_id}">${cat.category}</button>
        
        `
        categorieContainer.append(categoryDiv)
    }
}
// displaying the videos

// designing the cards according figma
const displayVideos = (videos) => {
const videoContainer = document.getElementById('video-container')
videoContainer.innerHTML = "";

if (videos.length == 0) {
    videoContainer.innerHTML = `
    <div class="col-span-full flex flex-col text-center items-center justify-center py-20">
    <img src="images/Icon.png" alt="" class="w-[120px]">
    <h2 class="text-2xl font-bold">Ayy hayy bhai content to nai!!!</h2>
</div> ;
    `
    return;
}
videos.forEach(video => {
    console.log(video);
    const videoCard = document.createElement('div')
    videoCard.innerHTML = `
    <div class="card bg-base-100">
        <figure class="relative">
          <img
          class = "w-full h-[150px] object-cover"
            src="${video.thumbnail}"
               />
            <span class="absolute bottom-2 right-2 bg-black text-white rounded">3 Hours 56min ago</span>
        </figure>
        <div class=" flex gap-3 px-0 py-5">
         <div class="profile">
            <div class="avatar">
                <div class="ring-primary ring-offset-base-100 w-8 rounded-full ring ring-offset-2">
                  <img src="${video.authors[0].profile_picture}" />
                </div>
              </div>
         </div>
         <div class="intro">
<h2 class="text-sm font-semibold">midnight serenade</h2>
<p class="text-sm text-gray-400 flex gap-1">${video.authors[0].profile_name} <img src="https://img.icons8.com/?size=48&id=bE5mRAhk65Br&format=gif" class="w-6"></p>
<p class="text-sm text-gray-400 flex gap-1">${video.others.views} Views</p>
         </div>
        </div>
      </div>
    `

    videoContainer.append(videoCard)
});
}


loadCategories()
// loadVideos()