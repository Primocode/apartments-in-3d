const closeOpenLeftMenu = () => {
    document.querySelector('#menu-left').classList.toggle("main-menu-left-close")

    if (document.querySelector('#menu-left-icon').className == "fas fa-times") {
        document.querySelector('#menu-left-icon').className = "fas fa-bars"
    }
    else {
        document.querySelector('#menu-left-icon').className = "fas fa-times"
    }
}
document.querySelector('.btn-for-switching-menu-on-off').addEventListener('click', closeOpenLeftMenu)

const closeOpenRightMenu = () => {
    document.querySelector('#menu-right').classList.toggle("right-menu-close")
}

document.querySelector('.right-menu-close-open').addEventListener('click', closeOpenRightMenu)

if (window.innerWidth < 900) {
    closeOpenLeftMenu();
    closeOpenRightMenu();
} 
