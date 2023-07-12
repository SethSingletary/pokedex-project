/*
let pokemonImg = document.createElement('img');
let pokemonName = document.createElement('p');
let pokemonHeight = document.createElement('p');
let closeButton = document.createElement('button')

let container = document.getElementById('exampleModal');

closeButton.innerText = 'Close';
closeButton.classList.add('btn');
closeButton.classList.add('btn-secondary');

//container.appendChild(closeButton);
container.appendChild(pokemonImg);
container.appendChild(pokemonName);
container.appendChild(pokemonHeight);

closeButton.addEventListener('click', function(){
    //container.classList.remove('is-visible');
});
*/

let pokemonRepository = (function(){
    let pokemonList = [];
    let apiURL = 'https://pokeapi.co/api/v2/pokemon/?limit=150'
    

    function add(pokemon){
        pokemonList.push(pokemon);
    }
    function getAll(){
        return pokemonList;
    }
    function addListItem(pokemon){
        let element = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');

        button.innerText = pokemon.name;
        button.classList.add('pokemon');
        button.classList.add('btn');
        button.classList.add('btn-primary');

        listItem.classList.add('group-list-item');

        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModal');




        $('[data-toggle="modal"]').on('click', function(){
            let targetSelector = $(this).attr('data-target');
            $(targetSelector).modal('show'); // Bootstrap’s own function to make the modal appear
          });




        button.addEventListener('click', function(){

            
            showDetails(pokemon);
        });
    
        listItem.appendChild(button);
        element.appendChild(listItem);
    }
    function showDetails(pokemon){
        loadDetails(pokemon).then(function(item){
            let modalBody = $('.modal-body');
            let modalTitle = $('.modal-title');

            modalTitle.empty();
            modalBody.empty();

            let imageElement = $("<img class='modal-img'>");
            imageElement.attr("src", item.imageURL);

            let heightElement = $("<p>" + "height: " + item.height + "</p>");

            modalTitle.text(pokemon.name);
            modalBody.append(imageElement);
            modalBody.append(heightElement);
        })

        //container.classList.add('is-visible');

/*
        loadDetails(pokemon).then(function(){
            console.log(pokemon);
            pokemonImg.src = pokemon.imageURL;
            pokemonName.innerText = pokemon.name;
            pokemonHeight.innerText = pokemon.height;
        }) */
    }

    function loadList(){
        return fetch(apiURL).then(function (response){
            return response.json();
        }).then(function (json){
            json.results.forEach(function (item){
                let pokemon = {
                    name: item.name,
                    detailsURL: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    function loadDetails(item){
        let url = item.detailsURL;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function(details){
            item.imageURL = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
            return item;
        }).catch(function(e){
            console.error(e);
        });
    }

    return{
        add,
        getAll,
        addListItem,
        showDetails,
        loadList,
        loadDetails
    }
})();

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    });
});

console.log(pokemonRepository.getAll());

pokemonRepository.getAll().forEach(function(pokemon){

    pokemonRepository.addListItem(pokemon);

})


/*
pokemonRepository.getAll.forEach(pokemon){
    document.write(pokemon.name + " (height: " + pokemon.height + ")\<br>")
}

pokemonList.forEach(function(pokemon){


});*/