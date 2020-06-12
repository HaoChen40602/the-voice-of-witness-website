function myFunction(x){
  if(x.className == "far fa-heart"){
      x.className = "fas fa-heart";
  }else{
      x.className = "far fa-heart";
  }
}
            
const searchBar = document.getElementById('searchBar');

searchBar.addEventListener('keyup', (e) => {
    const searchString = e.target.value.toLowerCase();
    const filteredCharacters = hpCharacters.filter((character) => {
        return (
        character.name.toLowerCase().includes(searchString) ||
        character.house.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

//------------------------------------------------------------------------------------
const selectElement = document.getElementById("sorting");

selectElement.addEventListener('change', (event) => {
    let posts = document.querySelectorAll('.card');
    let container = document.getElementById('postContainer');
    let postArray = Array.prototype.slice.call(posts, 0);
    if(event.target.value == 'Title'){
        postArray.sort(function(a,b) {
            let aVal = a.getAttribute('data-title');
            let bVal = b.getAttribute('data-title');
            return aVal.localeCompare(bVal);
        });
    }else if(event.target.value == 'Random'){
        shuffle(postArray);
    }else if(event.target.value == 'Like'){
        postArray.sort(function(a,b) {
            let aVal = parseInt(a.getAttribute('data-like'));
            let bVal = parseInt(b.getAttribute('data-like'));
            if(aVal == bVal){
                return 0;
            }else if(aVal > bVal){
                return -1;
            }else{
                return 1;
            }
        });
    }
    console.log(postArray);
    container.innerHTML = '';
    for(let i = 0; i < postArray.length; i++){
        container.appendChild(postArray[i]);
    }
});

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }