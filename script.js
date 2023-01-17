
/*

We need to get breed options to populate in the dropdown

Once the user selects a breed and clicks the button, the dog images and info
should appear on the DOM.

The button is clicked and the user sees cards displaying the dog images in rows and 4 columns.
In each card there is a heart icon with the option of saving the dog to 'favorites' or local storage

When the user navigates to the favorites link they are shown all of their favorites with the option to unfavorite
which will delete the item from local storage

If there are no favorites stored in local storage we want to let the user know 'There are no favorites to display'.
If items exist, we want the dogs displayed in a table 

*/

let listOfAllBreed=[];
let api = "https://dog.ceo/api/"
var search = document.querySelector('#search')
// var api = "https://dog.ceo/api/breed/" + breeds + "/images/random";
let cards = $(".cards")[0];
let petsName= $(".pets-name")[0];
let  cards_container = $(".cards-container")[0];
const nameGenerator_box = $(".nameGenerator-Box")[0]
const nameGenerator = ()=>{
	const baseUrl = `https://api.fungenerators.com`; // using the name generator api
	const url = `${baseUrl}/name/generate?category=dog&limit=10`; // generating a list of 10 random names

search.addEventListener("click", function (event) {
	event.preventDefault();
    let breeds = $("#breed-input")[0].value;
	// when any h1 tag is present then remove it.
	if($(".breed-heading")[0])
	$(".breed-heading")[0].remove();

	// add heading 
	let html = `<h1 class="breed-heading">${breeds}</h1>`
	cards.insertAdjacentHTML("afterbegin", html); 

	let url = "https://dog.ceo/api/breed/" + breeds + "/images";
	fetch(url)
		.then(function (response) {
			return response.json()
		})	
		.then(function (data) {
		const breedImgData = data.message;
		cards_container.innerHTML="";
		let savedDogs = JSON.parse(localStorage.getItem("favDogs")) || [];
		for(let i=0;i< breedImgData.length;i++){ // for loop to retrieve dog images from breed search
			// giving the images attributes
			const testhtml = cards_container.innerHTML+`
			<div class="card-image">
				<img class="is-256x256" id="img-${i}" src="${breedImgData[i]}" alt="${breeds}"> 
					<button class=" button is-normal favorite button-${i}" id="favorite-img">
					 	<span class="icon is-medium">&#9825; </span>
					</button>
					<nav class="level box">
						<div class="level-left">
			 				 <div class="level-item">
								<p><strong>Breed:</strong>${breeds}</p>
							 </div>
						</div> 
					</nav>
			</div>`
			cards_container.innerHTML= testhtml;

			if(savedDogs.findIndex(obj=>obj.imageUrl===breedImgData[i])>=0){
	            $(`.button-${i}`)[0].classList.add("liked")
			}
		}
	}