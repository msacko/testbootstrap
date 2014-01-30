var tabb=new Array();
var somme=0;
var trouve=document.getElementById("paires");
var tabb2=new Array();
var scores=new Array();
var clickCount = 0;
var clickLimit = 2;
var nf=18;
var nm=18;
var nd=27;
var nivDiff = 0;
var imagesChoisies = new Array();

var imagesFacile = new Array(
			 "img/1.png", "img/2.png","img/3.png","img/4.png","img/5.png","img/6.png","img/7.png","img/8.png","img/9.png",
			 "img/1.png", "img/2.png","img/3.png","img/4.png","img/5.png","img/6.png","img/7.png","img/8.png","img/9.png");
			 
var imagesHard = new Array(
		 "img/1.png", "img/2.png","img/3.png","img/4.png","img/5.png","img/6.png","img/7.png","img/8.png","img/9.png",
		 "img/1.png", "img/2.png","img/3.png","img/4.png","img/5.png","img/6.png","img/7.png","img/8.png","img/9.png",
		 "img/1.png", "img/2.png","img/3.png","img/4.png","img/5.png","img/6.png","img/7.png","img/8.png","img/9.png");			 
		 
$(document).ready(function(){
			
			easy=document.getElementById("niveau1");
			easy.addEventListener("click", levelEasy, false);
			medium=document.getElementById("niveau2");
			medium.addEventListener("click", levelMedium, false);
			hard=document.getElementById("niveau3");
			hard.addEventListener("click", levelHard, false);
		
			document.getElementById("button1").addEventListener("click", randomIndividuel, false);
			document.getElementById("button2").addEventListener("click", quitter, false);
			
			var best=localStorage.getItem("bestScore");
			if(best!=null){
			var record=document.getElementById("record");
			record.innerHTML=best;
			scores.push(parseInt(best));
			}
			
});

function levelEasy()
{
	replaceCards();
	easy.setAttribute("class","niveau, selected");
	medium.setAttribute("class","niveau");
	hard.setAttribute("class","niveau");
	
	clickLimit = 2;	 
	var divCartes=document.getElementById("cartes");
	
	for (var d=0;d<nf;d++)
		{
			var imgs=document.createElement("img");
			imgs.setAttribute("class","cartes");
			imgs.src="img/0.png";
			imgs.style.width="16%";
			divCartes.appendChild(imgs);
		}
		nivDiff = 0;
		clearTimeQuitter();
}
function levelMedium()
{
	replaceCards();
	easy.setAttribute("class","niveau");
	medium.setAttribute("class","niveau, selected");
	hard.setAttribute("class","niveau");
	
	var divCartes=document.getElementById("cartes");
	
	for (var d=0;d<nm;d++)
		{
			var imgs=document.createElement("img");
			imgs.setAttribute("class","cartes");
			imgs.src="img/0.png";
			imgs.style.width="16%";
			divCartes.appendChild(imgs);
		}
	nivDiff = 0;
    clearTimeQuitter();
}

function levelHard()
{
	replaceCards();
	easy.setAttribute("class","niveau");
	medium.setAttribute("class","niveau");
	hard.setAttribute("class","niveau, selected");
	var divCartes=document.getElementById("cartes");
	clickLimit = 3;

	
	
	for (var d=0;d<nd;d++)
		{
			var imgs=document.createElement("img");
			imgs.setAttribute("class","cartes");
			imgs.src="img/0.png";
			imgs.style.width="13%";
			divCartes.appendChild(imgs);
		}
		nivDiff = 1;
        clearTimeQuitter();		
	
}

function replaceCards()
{
	var divCartes=document.getElementById("cartes");
	var imgCartes=document.getElementsByClassName("cartes");
	
	for (var d=imgCartes.length-1;d>=0;d--)
		{
			divCartes.removeChild(imgCartes[d]);
		}
}

function randomIndividuel() {
var images = new Array();
if (nivDiff == 0)
{
	for (xyz = 0 ; xyz < imagesFacile.length ; xyz++){
		images[xyz] = imagesFacile[xyz];
	}	
} else if (nivDiff == 1) {
	for (xyz = 0 ; xyz < imagesHard.length ; xyz++){
		images[xyz] = imagesHard[xyz];
	}
}

	imagesChoisies = [];
	var imgs = new Array();
	var imgs = document.getElementsByClassName("cartes");

	for(var k = 0; k < imgs.length ; k++)
		{
			var rand = Math.floor(Math.random()*images.length);
			imagesChoisies[k] = images[rand];
			images.splice(rand, 1); 	
		}
		
	afficherImage();
	
}

function afficherImage()
{	
	var imgstout = document.getElementsByClassName("cartes");
	
	for (j in imgstout)
	{
		imgstout[j].src = imagesChoisies[j];
	}
	
	
	setTimeout(cacherImage, 5000);
		
	$("#button2").click(quitter);
	$("#button1").css("background","none").css("background-color","#d7273c").text("Recommencer");
	$("#button1").click(repeat);
	
	cartes();

}


function cartes()
{
	$(".cartes").each(function(index)
	{
		$(this).click(function()
		{
			
			if ($(this).attr("src")=="img/0.png")
			{
				clickCount++;
				if (clickCount<=clickLimit)
				{		
					$(this).attr("src",imagesChoisies[index]);
					tabb.push($(this).attr("src"));
					tabb2.push($(this));
					var  validation = validationTable(tabb);
					if (validation)
					{
						if ((tabb[0] == tabb[1]) || (tabb[0] == tabb[1] == tabb[2]))
						{		
							somme++;
							trouve=document.getElementById("paires");
							trouve.innerHTML=somme;
							tabb = [];
							tabb2 = [];
							clickCount=0;
						
							if(somme==9)
							{	
								clearInterval(setTimer);
								var tempsFinal=tempsMaint;
								setTimeout(function()
								{
								alert("Felicitations, vous avez gagne! Votre temps: "+tempsFinal)
								}, 100);
								
								scores.push(parseInt(tempsFinal));
								var minTemps=Math.min.apply(null,scores);
								
								var record=document.getElementById("record");
								record.innerHTML=minTemps;
								localStorage.setItem("bestScore", minTemps);
								if(tempsFinal==minTemps)
								{setTimeout(function()
								{
								alert("New Record")
								}, 50);
								}
							}
						}
						else
						{			
							setTimeout(function(){
							cacherCartes(tabb2);
							}, 1000);							
						}				
						
					}
				}
			}		
		
		});
	});	
}
	
Array.prototype.min=function()
								{ 
									return Math.max.apply(null,this);
								}

function cacherImage()
{
	var imgs = document.getElementsByClassName("cartes");
			
	for(i in imgs)
	{
		imgs[i].src = "img/0.png";
	}
	timer();
}
		
function cacherCartes(r)
{
	
	for(s=0;s<r.length;s++)
	{
		r[s].attr("src", "img/0.png");
	}
	clickCount=0;
	tabb = [];
	tabb2 = [];
}


function timer ()
{
		
	temps = document.getElementById("temps");
	startTime = new Date();
	setTimer=setInterval(function ()
	{   
		tempsMaint=(Math.floor((new Date() - startTime)/1000));
		temps.innerHTML = tempsMaint;
	}, 1000);
		
}
		
function quitter()
{
	var imgs = document.getElementsByClassName("cartes");
	
	for(i in imgs)
	{
		imgs[i].src = "img/0.png";
	}
	
	clearTimeQuitter();
}

		
function repeat()
{	
	clearInterval(setTimer);
	temps.innerHTML ="0";
	somme=0;
	var trouve2=document.getElementById("paires");
	trouve2.innerHTML="0";
	clickCount=0;
	startTime=none;
	imagesChoisies = null;
	randomIndividuel();
	
		
}
		
function clearTimeQuitter()
{
   clearInterval(setTimer);
	temps.innerHTML ="0";
	somme=0;
	$("#button1").css("background","url('img/jouer.png') no-repeat scroll 9% 50%").css("background-color","#25a685").css("background-size","12%").text("Jouer");
	$("#button1").click(repeat);
}


 function validationTable(x)
 {

	if (x[1]!=null)
	{	
		return true;
	}
	
	else {return false;}
	
}


