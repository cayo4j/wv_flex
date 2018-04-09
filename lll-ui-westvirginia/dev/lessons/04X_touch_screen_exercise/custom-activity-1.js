function startGame(completedCallback) {

    console.log('\n\n\nstartGame Loaded\n\n\n');

    var i = 0;
	var p = 0;
	var mouseXElem = $('#mouseX');
	var mouseYElem = $('#mouseY');
	var vpw = $("#vpw");
	var currentLocation = { x: 0, y: 0 };
    var canvas = $("#interactionCanvas");
    var context = canvas.get(0).getContext("2d");
	var counter = 0;
	var topLeftX_pencils = 61;
	var topLeftY_pencils = 27;
	var bottomRightX_pencils = 131;
	var bottomRightY_pencils = 82;
	
	var topLeftX_pens = 167;
	var topLeftY_pens = 22;
	var bottomRightX_pens = 232;
	var bottomRightY_pens = 80;
	
	var topLeftX_nails = 125;
	var topLeftY_nails = 86;
	var bottomRightX_nails = 189;
	var bottomRightY_nails = 144;
	
	var pencilsClicked = false;
	var pensClicked = false;
	var nailsClicked = false;
	
	var finalScore = 0;
	var seconds = 0;
	var canvasY;
	var canvasX;

    var stamping = false;
    var step1 = true;
    var step2 = false;
    var step3 = false;
    var step4 = false;
    var step5 = false;
    var step6 = false;
    var step7 = false;
    var step8 = false;
    var step9 = false; 
    var step10 = false;
    var step11 = false;
    var step12 = false;
    var step13 = false;
    var step14 = false;
    var step15 = false;
    var step16 = false;
    var step17 = false;
	
    $(document).ready(function() {
        
		var partArray = [{"name":"_ts"},{"name":"_pb"},{"name":"_rdr"},{"name":"_stkr"},{"name":"_scnr"},{"name":"_rear"}];	

        
         function isDoubleClicked(element) {

                        console.log('\n\n\nPREVENTING DOUBLE CLICK! In CSS\n\n\n');

         };

		$('canvas').mousemove(function(e){

			var mouseX = e.pageX ;//- context.canvas.offsetLeft
			var mouseY = e.pageY ;//- context.canvas.offsetTop
			var viewportWidth = $("#cuepoint-workspace").width();
			// scale mouse coordinates to canvas coordinates
			canvasX = mouseX * context.canvas.width / context.canvas.clientWidth;
			canvasY = mouseY * context.canvas.height / context.canvas.clientHeight;
			//set viewportWidth to container div width to match scaling
			

			//mouseXElem.text(canvasX);
			//mouseYElem.text(canvasY);
			//vpw.text(viewportWidth);
			

		});
		
		function instructionation(p){

			switch(p){
				case 0:
                 document.getElementById("instructions").innerHTML = "<b>INSTRUCTIONS:</b><br/>Press the Power Button on the Touch Screen frame to power it on.";   
				//swal({title: "", text: "Look at the items and identify each one that should NOT be used on the Touch Screen. Touch or click those items to stamp them with a red X."});
				break;
                //case 3:

                   // break;  
				//case 2:
				//swal({title: "", text: "Find another item you should never use on the Touch Screen."});
				//break;
				//case 3:
				//swal({title: "", text: "There is one more item you should never use, can you find it?"});
				//break;

			};
		};
		instructionation(p);
		
		function crossout(){
			if(pencilsClicked == true){
				console.log ('\n\n\n****\nPENCILS\n****\n\n\n');
				$('#photo').css({'background': 'url(lessons/shared/images/touchscreen-pencils.jpg) no-repeat'});
				$('#photo').css({'background-size': '100%'});
			}
			if(pensClicked == true){
				console.log ('\n\n\n****\nPENS\n****\n\n\n');
				$('#photo').css({'background': 'url(lessons/shared/images/touchscreen-pens.jpg) no-repeat'});
				$('#photo').css({'background-size': '100%'});
			}
			if(nailsClicked == true){
				console.log ('\n\n\n****\nNAILS\n****\n\n\n');
				$('#photo').css({'background': 'url(lessons/shared/images/touchscreen-nails.jpg) no-repeat'});
				$('#photo').css({'background-size': '100%'});
			}
			if(pencilsClicked == true && pensClicked == true){
				console.log ('\n\n\n****\nPENCILS & PENS\n****\n\n\n');
				$('#photo').css({'background': 'url(lessons/shared/images/touchscreen-pencils-pens.jpg) no-repeat'});
				$('#photo').css({'background-size': '100%'});
			}
			if(pencilsClicked == true && nailsClicked == true){
				console.log ('\n\n\n****\nPENCILS & NAILS\n****\n\n\n');
				$('#photo').css({'background': 'url(lessons/shared/images/touchscreen-nails-pencils.jpg) no-repeat'});
				$('#photo').css({'background-size': '100%'});
			}
			if(pensClicked == true && nailsClicked == true){
				console.log ('\n\n\n****\nPENS & NAILS\n****\n\n\n');
				$('#photo').css({'background': 'url(lessons/shared/images/touchscreen-nails-pens.jpg) no-repeat'});
				$('#photo').css({'background-size': '100%'});
			}
			if(pensClicked == true && nailsClicked == true && pencilsClicked == true){
				console.log ('\n\n\n****\nPENCILS, PENS, NAILS!! EX COMPLETE!!\n****\n\n\n');
				$('#photo').css({'background': 'url(lessons/shared/images/touchscreen-final.jpg) no-repeat'});
				$('#photo').css({'background-size': '100%'});
			}
			
		}
		
$('canvas').css({'cursor': 'pointer'});
//$('canvas').click(function(e){
    $('canvas').on("click", function (e){
            
        if (isDoubleClicked($(this))) return;
			//for debug and dev:
			console.log('\n\n\n*****\nCanvas Touch\n*****\n\n\n' + counter);
			console.log(canvasX + "\n\n\n" + canvasY);
			console.log('Image index: ' + i);
			console.log('The Part to ID is: ' + p);
		
   //first action
            if(step1 == true){
                  if(canvasX > 144 && canvasY > 96 && canvasX < 168 && canvasY < 105){
                      step1 = false;
                      step2 = true;
                      swal({title:"", text:"Great job! That's exactly how you power up your terminal and sign on. I have another task for you."}, ()=>{
                          xmarksthespots();
                      });
                    
                  }else{
                      if(step1 != false){swal({title: "Incorrect.", text: "Press the Power Button on the Touch Screen frame."});};
                     
                  }; 
                
            };
    
            
                          
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
		
		if(stamping == true){
            

					if(pencilsClicked != true){
	
						if (canvasX > topLeftX_pencils && canvasY > topLeftY_pencils && canvasX < bottomRightX_pencils && canvasY < bottomRightY_pencils){
							//setup is: top left X && top left Y && bottom right X && bottom right Y 
								counter++;
								p++;
								pencilsClicked = true;
								crossout();
								//swal({
									//title: "Good job!",
									 // text: "Do Not Use Pencils on the Touch Screen!"
									//},
									//function(){
									 instructionation(p);
								//});
							
						}
					};
					
					if(pensClicked != true){

						if (canvasX > topLeftX_pens && canvasY > topLeftY_pens && canvasX < bottomRightX_pens && canvasY < bottomRightY_pens){
							counter++;
							p++;
							pensClicked = true;
							crossout();
								//swal({
									//title: "Good job!",
									 // text: "Do Not Use Pens on the Touch Screen!"
									//},
									//function(){
									 instructionation(p);
								//});							
						}
					};	
						
						
					if(nailsClicked != true){
						if (canvasX > topLeftX_nails && canvasY > topLeftY_nails && canvasX < bottomRightX_nails && canvasY < bottomRightY_nails){
							counter++;
							p++;
							nailsClicked = true;
							crossout();
								//swal({
									//title: "Good job!",
									  //text: "Do Not Use Fingernails on the Touch Screen!"
									//},
									//function(){
									 instructionation(p);
									 
								//});							
						}
					};
            
            //fingertip or knuckles feedback
            if(canvasX>17 && canvasY>90 && canvasX<93 && canvasY<149){
               swal({title:"This item IS safe to use on the Touch Screen."}); 
            };
            if(canvasX>223 && canvasY>90 && canvasX<295 && canvasY<149){
               swal({title:"This item IS safe to use on the Touch Screen."}); 
            };            


			
        };//IF STAMPING

		
		
			if (counter == 3) { 
				finalScore = 3;
				swal({title: "Nicely done! You identified all of the items that are NOT safe to use with the Touch Screen.", text: " "});
						// calling completion
								finalScore = getCalculatedScore();
								completedCallback(finalScore);//this ends the exercise.

			} 			
		
		});
		

        
	 
                  
        
       
        
        
        function xmarksthespots(){
            $('#photo').css({'background':'url(lessons/shared/images/touchscreen-01.jpg)no-repeat'});
                        $('#photo').css({'background-size': '100%'});
            document.getElementById("instructions").style.display = 'inline';
            $('#instructions').css({'left': '10px'});
          document.getElementById("instructions").innerHTML = "<b>INSTRUCTIONS:</b><br/>Look at the items below and identify each one that should NOT be used on the Touch Screen.<br/><br/>Click those items to stamp them with a red X.";  
            stamping = true;
        }
        
        
        
		
		function getCalculatedScore() {
			var successRatio = 1;
			
			console.log('\n\n\n\n\n\n\n****\nGET CALC SCORE FIRED\n' + successRatio + '****\n\n\n')
			return successRatio < 1 ? successRatio : 1;
			//return successRatio;

		}
										
		
    }); //document	
	
	
}; //startGame




//ES6 
export default startGame;