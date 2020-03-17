const TypeWriter = function(txtElement, words, wait=3000)
{
  this.txtElement = txtElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
}

// Type Method
TypeWriter.prototype.type = function()
{
  //Current Index of words
  const current = this.wordIndex % this.words.length;
  //Get Full Text of current word
  const fulltxt = this.words[current];
  //Check if isDeleting
  if(this.isDeleting)
  {
    //Remove char
    this.txt = fulltxt.substring(0, this.txt.length - 1);
  }
  else
  {
    //Add char
    this.txt = fulltxt.substring(0, this.txt.length + 1);
  }
  //Insert txt nto element
  this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  //Type Speed
  let typeSpeed = 300;

  if(this.isDeleting)
  {
    typeSpeed /= 2;
  }
  //if word is complete
  if(!this.isDeleting && this.txt === fulltxt)
  {
    //Make pause at end
    typeSpeed = 3000;
    //Set deleteing mode
    this.isDeleting = true;
  }
  else if(this.isDeleting && this.txt === '')
  {
    this.isDeleting = false;
    //Move to next word
    this.wordIndex++;
    //Pause before start typing
    typeSpeed = 500;
  }

  setTimeout(()=>this.type(), typeSpeed);
}

//Init on DOM Load
document.addEventListener('DOMContentLoaded', init);

//INIT App
function init()
{
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  //INIT TypeWriter
  new TypeWriter(txtElement, words, wait);
}
