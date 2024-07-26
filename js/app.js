console.log('Welcome to notes app. This is app.js');
//if user add a note add it to local storage
shownotes();
let addBtn=document.getElementById('addBtn');
addBtn.addEventListener("click", function(e){

    let addTxt=document.getElementById("addTxt");
    let addTitle=document.getElementById("addTitle");
    let addEmail=document.getElementById("addEmail");
    let notes=localStorage.getItem("notes");
    if(notes == null){
        notesObj= [];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let myObj={
        Email:addEmail.value,
        title:addTitle.value,
        text:addTxt.value
    };
    notesObj.push(myObj);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    addEmail.value="";
    addTxt.value="";
    addTitle.value="";

    // console.log(notesObj);
    shownotes();   
});

//function to show elements from local storage

function shownotes(){
    let notes=localStorage.getItem("notes");
    if(notes == null){
        notesObj= [];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    let html="";
    notesObj.forEach(function(element,index) {
        html+=`
        <div class="noteCard my-2 mx-4 " style="width: 25rem;">
                <div class="card-body">
                  <h5 class="card-email">${element.Email} </h5>
                  <h5 class="card-title">${element.title} </h5>
                  <p class="card-text">${element.text} </p>
                  <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary"> Delete Notes </button>
                </div>
            </div>
        `
    });
    let noteElm=document.getElementById("notes");
    if(notesObj.length!=0){
        noteElm.innerHTML=html;
    }
    else{
        noteElm.innerHTML=`Nothing to show! Use "Add your note" Section above to add notes`;
    }
}

//function to delete notes
function deleteNote(index){
    // console.log('delete', index);

    let notes=localStorage.getItem("notes");
    if(notes == null){
        notesObj= [];
    }
    else{
        notesObj=JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesObj));
    shownotes();
}

let search=document.getElementById('searchTxt');
search.addEventListener("input",function(){

    let inputVal= search.value.toLowerCase();
    // console.log('search',inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    // console.log(noteCards);
    Array.from(noteCards).forEach(function(element){
        let cardTxt=element.getElementsByTagName("p")[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display="block";
        }
        else{
            element.style.display="none";
        }
    });
});