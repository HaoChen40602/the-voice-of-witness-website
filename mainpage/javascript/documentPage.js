function myFunction(x){
    if(x.className == "far fa-thumbs-up"){
        x.className = "fas fa-thumbs-up";
    }else{
        x.className = "far fa-thumbs-up";
     }
}
function expandTextarea(id) {
    document.getElementById(id).addEventListener('keyup', function() {
        this.style.overflow = 'hidden';
        this.style.height = 0;
        this.style.height = this.scrollHeight + 'px';
    }, false);
}

expandTextarea('txtarea');

function pressLike(){
    let like = document.getElementById("like");
    if(like.className == "btn btn-outline-primary"){
        like.className = "btn btn-primary";
        const sign = document.getElementById("likeSign");
        sign.style.transform = "translateY(-5px)";
        setTimeout(function (){
            sign.style.transform = "translateY(0px)";
        }, 400);
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("like", "true");
        }
    }else{
        like.className = "btn btn-outline-primary";
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("like", "false");
        }
    }
}
function load(){
    if(localStorage.getItem("like") == "true"){
        like.className = "btn btn-primary";
    }
}