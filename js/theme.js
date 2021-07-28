const dayNight = document.querySelector(".theme");


// WHEN YOU CLICK BUTTON CHANGE THE DARK MODE FUNCTION
dayNight.addEventListener("click", () => {
    document.body.classList.toggle('dark');

    if (document.body.classList.contains('dark')) {
        localStorage.setItem("theme", 'dark');
    }else{
        localStorage.setItem("theme", 'light');
    }

    updateIcon(); // when you click the button, update the icon
})


// REFRESH PAGE STAY THE DARK MODE
// LOCAL STORAGE
function themeMode() {
    
    if (localStorage.getItem('theme') !== null) {
        if (localStorage.getItem('theme') == 'light') {
            document.body.classList.remove('dark');
        }else{
            document.body.classList.add('dark');
        }
    }
    
}
themeMode();


// UPDATE ICON
function updateIcon() {

    if (document.body.classList.contains('dark')) {
        dayNight.querySelector("i").classList.add('fa-sun');
        dayNight.querySelector("i").classList.remove('fa-moon');
    }else{
        dayNight.querySelector("i").classList.add('fa-moon');
        dayNight.querySelector("i").classList.remove('fa-sun');
    }
}
