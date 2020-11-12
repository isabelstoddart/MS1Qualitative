// "d3" is globally available
// because we have the d3 code
// in our index.html file

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

let sourceJson; //this is our source json file
let filteredJson; //this is a subset of our source json file

// load JSON using d3.json
d3.json('./dataFaces.json')
    .then(json => {
        sourceJson = json;        
    filterData('allFaces');
  }); 

// Here wefilter the source json file
function filterData(mode){
    if(mode=="withoutFaces"){
        filteredJson = sourceJson.filter(function (n){
        return (n.faceDetected == false)
    })
    }else if(mode=="withFaces"){
            filteredJson = sourceJson.filter(function (n){
            return (n.faceDetected == true)
    })
    }else if(mode=="allFaces"){
        filteredJson = sourceJson;
    }
    // Now that the data has been filtered we can display it
    displayImages()
}


// this function creates all
// of our DOM elements
function displayImages(){
    // select a <div> with an id of "app"
    // this is where we want all of our
    // images to be added
    let app  = d3.select('#app').text('');

    // define "cards" for each item
    let card = app.selectAll('div.smithsonian-card')
                .data(filteredJson)
                .join('div')
                .attr('class', 'smithsonian-card')

    // let modal = app.selectAll('modal')
    //                .data(filteredJson)
    //                .join('div')
    //                .attr('class', 'modal')
 

    // create a div with a class of "image"
    // and populate it with an <img/> tag
    // that contains our filepath
    card.append('div')
        .attr('class', 'image')
        .on("click", function(d){
          console.log("click")
          showImageModal('./Faces/' + d.fileName  );
        })
        .append('img')
        .attr('src', d => {
            // all our images are in the "images"
            // folder which we will need to 
            // add to our filename first
            return './croppedFaces/' + d.fileName
        })
}

function showImageModal(imageFileName){
  console.log(imageFileName);

  d3.select('.modal-image')
  .html('')
  .append('img')
  .attr('src', imageFileName)

  modal.style.display = "block";
}

