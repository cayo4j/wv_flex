function startGame(completedCallback) {

    console.log("\n\n\nstartGame Loaded\n\n\n");

    var i = 0;
    var p = 0;
    var mouseXElem = $("#mouseX");
    var mouseYElem = $("#mouseY");
    var vpw = $("#vpw");
    var currentLocation = { x: 0, y: 0 };
    var canvas = $("#interactionCanvas");
    var context = canvas.get(0).getContext("2d");
    var counter = 0;
    var topLeftX = 0;
    var topLeftY = 0;
    var bottomRightX = 0;
    var bottomRightY = 0;
    var finalScore = 0;
    var seconds = 0;
    var canvasY;
    var canvasX;

    var terminalPics = new Array();
        terminalPics[0] = "lessons/shared/images/external-hardware-01.jpg";
        terminalPics[1] = "lessons/shared/images/external-hardware-02.jpg";
        terminalPics[2] = "lessons/shared/images/external-hardware-03.jpg";
        terminalPics[3] = "lessons/shared/images/external-hardware-04.jpg";
        terminalPics[4] = "lessons/shared/images/external-hardware-05.jpg";
        terminalPics[5] = "lessons/shared/images/external-hardware-06.jpg";
        terminalPics[6] = "lessons/shared/images/external-hardware-07.jpg";
        terminalPics[7] = "lessons/shared/images/external-hardware-08.jpg";
        terminalPics[8] = "lessons/shared/images/external-hardware-09.jpg";
        terminalPics[9] = "lessons/shared/images/external-hardware-10.jpg";
        terminalPics[10] = "lessons/shared/images/external-hardware-11.jpg";
        terminalPics[11] = "lessons/shared/images/external-hardware-12.jpg";
        terminalPics[12] = "lessons/shared/images/external-hardware-13.jpg";
        terminalPics[13] = "lessons/shared/images/external-hardware-14.jpg";
        terminalPics[14] = "lessons/shared/images/external-hardware-15.jpg";
        terminalPics[15] = "lessons/shared/images/external-hardware-16.jpg";
        terminalPics[16] = "lessons/shared/images/external-hardware-17.jpg";
        terminalPics[17] = "lessons/shared/images/external-hardware-18.jpg";
        terminalPics[18] = "lessons/shared/images/external-hardware-19.jpg";
        terminalPics[19] = "lessons/shared/images/external-hardware-20.jpg";
        terminalPics[20] = "lessons/shared/images/external-hardware-21.jpg";
        terminalPics[21] = "lessons/shared/images/external-hardware-22.jpg";
        terminalPics[22] = "lessons/shared/images/external-hardware-23.jpg";
        terminalPics[23] = "lessons/shared/images/external-hardware-24.jpg";
    
    $(document).ready(function() {
		var lastStr = "url(' " + terminalPics[0] + " ')";
		var firstStr = "url(' " + terminalPics[23] + " ')";
		var mouseIsDown = false;
        var int00;
		var int01;
		var int02;
        var partArray = [{"name":"_ts"},{"name":"_pb"},{"name":"_rdr"},{"name":"_stkr"},{"name":"_scnr"},{"name":"_rear"},{"name":"_2btn"}]; 
        //$('#coords').hide();
        //$('#coords').draggable();
		
//pseudo-code for update:
//for/each item in terminalPics, once loaded, display as bg for .photo until the end of the array.  Then display index 0
//this is to make each terminal pic appear while being loaded, giving the visual of the terminal spinning around once before the exercise starts.
timedImgLoad();
function timedImgLoad(){
	int00 = setInterval(function() {
           loadImages();
         }, 50);
};

function loadImages(){
	 if (i == 23){
		 $('.photo').css("background-image", firstStr);
		 clearInterval(int00);
	 }else{
		var imageStr = "url(' " + terminalPics[i] + " ')";				
                $('.photo').css("background-image", imageStr);
		i++;
	};
};




    
        // $('#rightArrowHolder').mousedown(function() {
            // if (i == 0) {
                // i = 23;
                // $('.photo').css("background-image", lastStr);
                
            // } else {
                // i--;  
				// var imageStr = "url(' " + terminalPics[i] + " ')";				
                // $('.photo').css("background-image", imageStr);
                // console.log(terminalPics[i]);

            // };
                // return i;
        // });

        // $('#leftArrowHolder').mousedown(function() {
            // if (i == 23) {
                // i = 0;               
                // $('.photo').css("background-image", firstStr);
            // } else {
                // i++;
				// var imageStr = "url(' " + terminalPics[i] + " ')";
                // $('.photo').css("background-image", imageStr);
                // console.log(terminalPics[i]);

            // };
                // return i;

        // });
		
//new left fn
       $('#leftArrowHolder').mousedown(function() {
         mouseIsDown = true;
         int01 = setInterval(function() {
           spinLeft();
         }, 50);
         return i;
       });
	   
       function spinLeft() {
		   console.info("\n\n\n"+i);

         if (i == 23) {
           i = 0;
           $('.photo').css("background-image", firstStr);
			
         }else{
			 i++;
			 var imageStr = "url(' " + terminalPics[i] + " ')";
			 $('.photo').css("background-image", imageStr);			 
		 };
       };

       $('#leftArrowHolder').mouseup(function(event) {
         mouseIsDown = false;
         var imageStr = "url(' " + terminalPics[i] + " ')";
         $('.photo').css("background-image", imageStr);
		 clearInterval(int01);
       });	   
//new right fn
       $('#rightArrowHolder').mousedown(function() {
         mouseIsDown = true;
         int02 = setInterval(function() {
           spinRight();
         }, 50);
         return i;
       });
	   
       function spinRight() {
		   console.info("\n\n\n"+i);

         if (i == 0) {
           i = 23;
           $('.photo').css("background-image", firstStr);
			
         }else{
			 i--;
			 var imageStr = "url(' " + terminalPics[i] + " ')";
			 $('.photo').css("background-image", imageStr);			 
		 };
       };

       $('#rightArrowHolder').mouseup(function(event) {
         mouseIsDown = false;
         var imageStr = "url(' " + terminalPics[i] + " ')";
         $('.photo').css("background-image", imageStr);
		 clearInterval(int02);
       });

        $('canvas').mousemove(function(e){

            var mouseX = e.pageX ;//- context.canvas.offsetLeft
            var mouseY = e.pageY ;//- context.canvas.offsetTop
            var viewportWidth = $("#custom-activity-1_playground").width();
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
				swal({title:"", text:"Find the Touch Screen."});
                break;
                case 1:
				swal({title:"", text:"Find the Power Button."});
                break;
                case 2:
				swal({title:"", text:"Find the Play Slip Reader."});
                break;
                case 3:
				swal({title:"", text:"Find the Play Slip Stacker."});
                break;
                case 4:
				swal({title:"", text:"Find the Barcode Scanner."});
                break;
                case 5:
				swal({title:"", text:"Find the Plugs and Connections."});
                break;
                case 6:
				swal({title:"", text:"Find the Terminal's Second Power Button."});
					 console.log ('\n\n\n****\nNEW SCREEN jQuery\n****\n\n\n');
				     $('.photo').css({'background': 'url(lessons/shared/images/back_of_terminal.jpg) no-repeat'});
				     $('.photo').css({'background-size': '100%'});
					 $('#leftArrowHolder').hide();
					 $('#rightArrowHolder').hide();
                break;
            };
        };
        instructionation(p);
        
        $('canvas').mousedown(function(e){
            //for debug and dev:
            console.log('\n\n\n*****\nCanvas Touch\n*****\n\n\n' + counter);
            console.log(canvasX + "\n\n\n" + canvasY);
            console.log('Image index: ' + i);
            console.log('The Part to ID is: ' + p);
            
            //_ts (touchscreen)
        if(p == 0){
            switch(i){
                case 0:
                    topLeftX = 100;
                    topLeftY = 37;
                    bottomRightX = 220;
                    bottomRightY = 100;
                break;
                case 1:
                    topLeftX = 92;
                    topLeftY = 40;
                    bottomRightX = 201;
                    bottomRightY = 100;
                break;
                case 2:
                    topLeftX = 86;
                    topLeftY = 36;
                    bottomRightX = 187;
                    bottomRightY = 100;
                break;
                case 3:
                    topLeftX = 83;
                    topLeftY = 35;
                    bottomRightX = 181;
                    bottomRightY = 110;
                break;
                case 4:
                    topLeftX = 88;
                    topLeftY = 32;
                    bottomRightX = 162;
                    bottomRightY = 110;
                break;
                case 5:
                    topLeftX = 95;
                    topLeftY = 33;
                    bottomRightX = 149;
                    bottomRightY = 110;
                break;
                case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 17: 
                    topLeftX = 0;
                    topLeftY = 0 ;
                    bottomRightX = 0;
                    bottomRightY = 0;
                break;
                case 18:
                    topLeftX = 157;
                    topLeftY = 34;
                    bottomRightX = 215;
                    bottomRightY = 100;
                break;
                case 19:
                    topLeftX = 141;
                    topLeftY = 33;
                    bottomRightX = 225;
                    bottomRightY = 105;
                break;
                case 20:
                    topLeftX = 126;
                    topLeftY = 34;
                    bottomRightX = 225;
                    bottomRightY = 100;
                break;
                case 21:
                    topLeftX = 112;
                    topLeftY = 33;
                    bottomRightX = 225;
                    bottomRightY = 100;
                break;
                case 22:
                    topLeftX = 105;
                    topLeftY = 35;
                    bottomRightX = 222;
                    bottomRightY = 100;
                break;
                case 23:
                    topLeftX = 105;
                    topLeftY = 37;
                    bottomRightX = 211;
                    bottomRightY = 100;
                break;              
            };//switch
        };
        if(p == 1){
            //power button
                switch(i){
                case 0:
                    topLeftX = 126;
                    topLeftY = 80;
                    bottomRightX = 174;
                    bottomRightY = 112;
                break;
                case 1:
                    topLeftX = 108;
                    topLeftY = 78;
                    bottomRightX = 158;
                    bottomRightY = 115;
                break;
                case 2:
                    topLeftX = 97;
                    topLeftY = 76;
                    bottomRightX = 146;
                    bottomRightY = 114;
                break;
                case 3:
                    topLeftX = 89;
                    topLeftY = 74;
                    bottomRightX = 133;
                    bottomRightY = 111;
                break;
                case 4:
                    topLeftX = 85;
                    topLeftY = 76;
                    bottomRightX = 128;
                    bottomRightY = 111;
                break;
                case 5:
                    topLeftX = 80;
                    topLeftY = 72;
                    bottomRightX = 121;
                    bottomRightY = 107;
                break;
                case 6: case 7: case 8: case 9: case 10: case 11: case 12: case 13: case 14: case 15: case 16: case 17: 
                    topLeftX = 0;
                    topLeftY = 0 ;
                    bottomRightX = 0;
                    bottomRightY = 0;
                break;
                case 18:
                    topLeftX = 175;
                    topLeftY = 71;
                    bottomRightX = 219;
                    bottomRightY = 104;
                break;
                case 19:
                    topLeftX = 170;
                    topLeftY = 75 ;
                    bottomRightX = 214;
                    bottomRightY = 107;
                break;
                case 20:
                    topLeftX = 163;
                    topLeftY = 78;
                    bottomRightX = 208;
                    bottomRightY = 108;
                break;
                case 21:
                    topLeftX = 149;
                    topLeftY = 78;
                    bottomRightX = 202;
                    bottomRightY = 112;
                break;
                case 22:
                    topLeftX = 137;
                    topLeftY = 81;
                    bottomRightX = 188;
                    bottomRightY = 112;
                break;
                case 23:
                    topLeftX = 126;
                    topLeftY = 80;
                    bottomRightX = 174;
                    bottomRightY = 112;
                break;
                };//switch
        };
        if(p == 2){
            //play slip reader
                switch(i){
                case 0:
                    topLeftX = 116;
                    topLeftY = 30;
                    bottomRightX = 193;
                    bottomRightY = 57;
                break;
                case 1:
                    topLeftX = 121;
                    topLeftY = 30;
                    bottomRightX = 190;
                    bottomRightY = 48;
                break;
                case 2:
                    topLeftX = 128;
                    topLeftY = 30;
                    bottomRightX = 188;
                    bottomRightY = 40;
                break;
                case 3:
                    topLeftX = 133;
                    topLeftY = 30;
                    bottomRightX = 185;
                    bottomRightY = 50;
                break;
                case 4:
                    topLeftX = 139;
                    topLeftY = 30;
                    bottomRightX = 178;
                    bottomRightY = 55;
                break;
                case 5:
                    topLeftX = 132;
                    topLeftY = 30;
                    bottomRightX = 171;
                    bottomRightY = 58;
                break;
                case 6: 
                    topLeftX = 134;
                    topLeftY = 30;
                    bottomRightX = 168;
                    bottomRightY = 59;
                break;
                case 7:
                    topLeftX = 131;
                    topLeftY = 30;
                    bottomRightX = 170;
                    bottomRightY = 58;
                break;
                case 8:
                    topLeftX = 124;
                    topLeftY = 30;
                    bottomRightX = 177;
                    bottomRightY = 56;
                break;
                case 9:
                    topLeftX = 119;
                    topLeftY = 30;
                    bottomRightX = 183;
                    bottomRightY = 57;
                break;
                case 10:
                    topLeftX = 116;
                    topLeftY = 30;
                    bottomRightX = 188;
                    bottomRightY = 57;
                break;
                case 11:
                    topLeftX = 115;
                    topLeftY = 30;
                    bottomRightX = 191;
                    bottomRightY = 56;
                break;
                case 12:
                    topLeftX = 116;
                    topLeftY = 30;
                    bottomRightX = 192;
                    bottomRightY = 56;
                break;
                case 13:
                    topLeftX = 118;
                    topLeftY = 30;
                    bottomRightX = 191;
                    bottomRightY = 57;
                break;
                case 14:
                    topLeftX = 120;
                    topLeftY = 30;
                    bottomRightX = 190;
                    bottomRightY = 58;
                break;
                case 15:
                    topLeftX = 128;
                    topLeftY = 30;
                    bottomRightX = 183;
                    bottomRightY = 61;
                break;
                case 16:
                    topLeftX = 135;
                    topLeftY = 30;
                    bottomRightX = 174;
                    bottomRightY = 61;
                break;
                case 17:
                    topLeftX = 139;
                    topLeftY = 30;
                    bottomRightX = 171;
                    bottomRightY = 59;
                break;
                case 18:
                    topLeftX = 133;
                    topLeftY = 30;
                    bottomRightX = 171;
                    bottomRightY = 56;
                break;
                case 19:
                    topLeftX = 126;
                    topLeftY = 30;
                    bottomRightX = 169;
                    bottomRightY = 54;
                break;
                case 20:
                    topLeftX = 120;
                    topLeftY = 30;
                    bottomRightX = 177;
                    bottomRightY = 45;
                break;
                case 21:
                    topLeftX = 117;
                    topLeftY = 30;
                    bottomRightX = 184;
                    bottomRightY = 39;
                break;
                case 22:
                    topLeftX = 117;
                    topLeftY = 30;
                    bottomRightX = 186;
                    bottomRightY = 40;
                break;
                case 23:
                    topLeftX = 109;
                    topLeftY = 30;
                    bottomRightX = 193;
                    bottomRightY = 47;
                break;
                };//switch
        };
        if(p == 3){
            //betslip stacker
                switch(i){
                case 0:
                    topLeftX = 118;
                    topLeftY = 99;
                    bottomRightX = 193;
                    bottomRightY = 140;
                break;
                case 1:
                    topLeftX = 104;
                    topLeftY = 98;
                    bottomRightX = 182;
                    bottomRightY = 142;
                break;
                case 2:
                    topLeftX = 95;
                    topLeftY = 96;
                    bottomRightX = 170;
                    bottomRightY = 143;
                break;
                case 3:
                    topLeftX = 90;
                    topLeftY = 92;
                    bottomRightX = 164;
                    bottomRightY = 141;
                break;
                case 4:
                    topLeftX = 90;
                    topLeftY = 91;
                    bottomRightX = 155;
                    bottomRightY = 140;
                break;
                case 5:
                    topLeftX = 93;
                    topLeftY = 99;
                    bottomRightX = 143;
                    bottomRightY = 140;
                break;
                case 6: 
                    topLeftX = 94;
                    topLeftY = 104;
                    bottomRightX = 134;
                    bottomRightY = 137;
                break;
                case 7:
                    topLeftX = 89;
                    topLeftY = 104;
                    bottomRightX = 128;
                    bottomRightY = 135;
                break;
                case 8:
                    topLeftX = 90;
                    topLeftY = 107;
                    bottomRightX = 124;
                    bottomRightY = 134;
                break;
                case 9:
                    topLeftX = 94;
                    topLeftY = 108;
                    bottomRightX = 120;
                    bottomRightY = 132;
                break;
                case 10:
                    topLeftX = 100;
                    topLeftY = 104;
                    bottomRightX = 118;
                    bottomRightY = 126;
                break;
                case 11:
                    topLeftX = 106;
                    topLeftY = 99;
                    bottomRightX = 119;
                    bottomRightY = 124;
                break;
                case 12:
                    topLeftX = 0;
                    topLeftY = 0;
                    bottomRightX = 0;
                    bottomRightY = 0;
                break;
                case 13:
                    topLeftX = 186;
                    topLeftY = 102;
                    bottomRightX = 198;
                    bottomRightY = 121;
                break;
                case 14:
                    topLeftX = 187;
                    topLeftY = 104;
                    bottomRightX = 208;
                    bottomRightY = 122;
                break;
                case 15:
                    topLeftX = 184;
                    topLeftY = 106;
                    bottomRightX = 216;
                    bottomRightY = 130;
                break;
                case 16:
                    topLeftX = 180;
                    topLeftY = 103;
                    bottomRightX = 215;
                    bottomRightY = 134;
                break;
                case 17:
                    topLeftX = 172;
                    topLeftY = 104;
                    bottomRightX = 212;
                    bottomRightY = 136;
                break;
                case 18:
                    topLeftX = 166;
                    topLeftY = 103;
                    bottomRightX = 213;
                    bottomRightY = 135;
                break;
                case 19:
                    topLeftX = 155;
                    topLeftY = 103;
                    bottomRightX = 216;
                    bottomRightY = 142;
                break;
                case 20:
                    topLeftX = 147;
                    topLeftY = 102;
                    bottomRightX = 215;
                    bottomRightY = 139;
                break;
                case 21:
                    topLeftX = 135;
                    topLeftY = 99;
                    bottomRightX = 214;
                    bottomRightY = 138;
                break;
                case 22:
                    topLeftX = 125;
                    topLeftY = 99;
                    bottomRightX = 203;
                    bottomRightY = 140;
                break;
                case 23:
                    topLeftX = 118;
                    topLeftY = 99;
                    bottomRightX = 193;
                    bottomRightY = 140;
                break;
                };//switch
        };
        if(p == 4){
            //betslip scanner
                switch(i){
                case 0:
                    topLeftX = 100;
                    topLeftY = 55;
                    bottomRightX = 250;
                    bottomRightY = 87;
                break;
                case 1:
                    topLeftX = 100;
                    topLeftY = 60;
                    bottomRightX = 250;
                    bottomRightY = 91;
                break;
                case 2:
                    topLeftX = 100;
                    topLeftY = 61;
                    bottomRightX = 240;
                    bottomRightY = 93;
                break;
                case 3:
                    topLeftX = 75;
                    topLeftY = 64;
                    bottomRightX = 225;
                    bottomRightY = 95;
                break;
                case 4:
                    topLeftX = 75;
                    topLeftY = 63;
                    bottomRightX = 215;
                    bottomRightY = 97;
                break;
                case 5:
                    topLeftX = 75;
                    topLeftY = 63;
                    bottomRightX = 200;
                    bottomRightY = 97;
                break;
                case 6: 
                    topLeftX = 75;
                    topLeftY = 63;
                    bottomRightX = 200;
                    bottomRightY = 97;
                break;
                case 7:
                    topLeftX = 50;
                    topLeftY = 61;
                    bottomRightX = 180;
                    bottomRightY = 95;
                break;
                case 8:
                    topLeftX = 50;
                    topLeftY = 59;
                    bottomRightX = 180;
                    bottomRightY = 98;
                break;
                case 9:
                    topLeftX = 50;
                    topLeftY = 57;
                    bottomRightX = 160;
                    bottomRightY = 95;
                break;
                case 10:
                    topLeftX = 50;
                    topLeftY = 53;
                    bottomRightX = 150;
                    bottomRightY = 93;
                break;
                case 11:
                    topLeftX = 50;
                    topLeftY = 51;
                    bottomRightX = 150;
                    bottomRightY = 90;
                break;
                case 12:
                    topLeftX = 50;
                    topLeftY = 49;
                    bottomRightX = 150;
                    bottomRightY = 84;
                break;
                case 13:
                    topLeftX = 50;
                    topLeftY = 49;
                    bottomRightX = 150;
                    bottomRightY = 82;
                break;
                case 14:
                    topLeftX = 60;
                    topLeftY = 52;
                    bottomRightX = 150;
                    bottomRightY = 80;
                break;
                case 15:
                    topLeftX = 0;
                    topLeftY = 0;
                    bottomRightX = 0;
                    bottomRightY = 0;
                break;
                case 16:
                    topLeftX = 0;
                    topLeftY = 0;
                    bottomRightX = 0;
                    bottomRightY = 0;
                break;
                case 17:
                    topLeftX = 175;
                    topLeftY = 43;
                    bottomRightX = 250;
                    bottomRightY = 71;
                break;
                case 18:
                    topLeftX = 175;
                    topLeftY = 45;
                    bottomRightX = 250;
                    bottomRightY = 72;
                break;
                case 19:
                    topLeftX = 175;
                    topLeftY = 47;
                    bottomRightX = 250;
                    bottomRightY = 74;
                break;
                case 20:
                    topLeftX = 175;
                    topLeftY = 50;
                    bottomRightX = 280;
                    bottomRightY = 77;
                break;
                case 21:
                    topLeftX = 175;
                    topLeftY = 51;
                    bottomRightX = 280;
                    bottomRightY = 81;
                break;
                case 22:
                    topLeftX = 175;
                    topLeftY = 54;
                    bottomRightX = 280;
                    bottomRightY = 83;
                break;
                case 23:
                    topLeftX = 175;
                    topLeftY = 55;
                    bottomRightX = 280;
                    bottomRightY = 87;
                break;
                };//switch
        };
        if(p == 5){
            //rear connections
                switch(i){
                case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8:
                    topLeftX = 0;
                    topLeftY = 0;
                    bottomRightX = 0;
                    bottomRightY = 0;
                break;
                case 9:
                    topLeftX = 172;
                    topLeftY = 113;
                    bottomRightX = 206;
                    bottomRightY = 136;
                break;
                case 10:
                    topLeftX = 157;
                    topLeftY = 117;
                    bottomRightX = 207;
                    bottomRightY = 137;
                break;
                case 11:
                    topLeftX = 143;
                    topLeftY = 119;
                    bottomRightX = 203;
                    bottomRightY = 137;
                break;
                case 12:
                    topLeftX = 129;
                    topLeftY = 118;
                    bottomRightX = 199;
                    bottomRightY = 139;
                break;
                case 13:
                    topLeftX = 117;
                    topLeftY = 115;
                    bottomRightX = 191;
                    bottomRightY = 139;
                break;
                case 14:
                    topLeftX = 108;
                    topLeftY = 115;
                    bottomRightX = 177;
                    bottomRightY = 141;
                break;
                case 15:
                    topLeftX = 99;
                    topLeftY = 112;
                    bottomRightX = 164;
                    bottomRightY = 142;
                break;
                case 16:
                    topLeftX = 97;
                    topLeftY = 108;
                    bottomRightX = 137;
                    bottomRightY = 141;
                break;
                case 17: case 18: case 19: case 20: case 21: case 22: case 23:
                    topLeftX = 0;
                    topLeftY = 0;
                    bottomRightX = 0;
                    bottomRightY = 0;
                break;

                };//switch
        };//if
		if(p == 6){
			//2nd power button

            topLeftX = 103;
			topLeftY = 90;
			bottomRightX = 125;
			bottomRightY = 109;	

		};
                
				switch(counter){
                    case 0: 
                        if (canvasX > topLeftX && canvasY > topLeftY && canvasX < bottomRightX && canvasY < bottomRightY){
                            //setup is: top left X && top left Y && bottom right X && bottom right Y
                            console.log(partArray[p].name);
                                  
                                //counter = 0;
                                counter++;
                                p++;
                                
                                swal({
                                    title: "Good job!",
                                      text: "That is the Touch Screen.",
                                      type: "success",
                                      showCancelButton: false,
                                      confirmButtonColor: "#8CD4F5",
                                      confirmButtonText: "Continue",
                                      closeOnConfirm: false
                                    },
                                    function(){
                                     instructionation(p);
                                });
                            
                        }else{
                            
                                swal("Incorrect.", "That is not the Touch Screen.", "error");
                        }
                    break;
                    case 1: 
                        if (canvasX > topLeftX && canvasY > topLeftY && canvasX < bottomRightX && canvasY < bottomRightY){

                            console.log(partArray[p].name);
                            counter++;
                            p++;
                                swal({
                                    title: "Good job!",
                                      text: "That is the Power Button.",
                                      type: "success",
                                      showCancelButton: false,
                                      confirmButtonColor: "#8CD4F5",
                                      confirmButtonText: "Continue",
                                      closeOnConfirm: false
                                    },
                                    function(){
                                     instructionation(p);
                                });                         
                        }else{
                            
                                swal("Incorrect.", "That is not the Power Button.", "error");
                        }
                        
                    break;
                    case 2:
                        if (canvasX > topLeftX && canvasY > topLeftY && canvasX < bottomRightX && canvasY < bottomRightY){

                            console.log(partArray[p].name);
                            counter++;
                            p++;
                                swal({
                                    title: "Good job!",
                                      text: "That is the Play Slip Reader.",
                                      type: "success",
                                      showCancelButton: false,
                                      confirmButtonColor: "#8CD4F5",
                                      confirmButtonText: "Continue",
                                      closeOnConfirm: false
                                    },
                                    function(){
                                     instructionation(p);
                                }); 
                        }else{
                            
                                swal("Incorrect.", "That is not the Play Slip Reader.", "error");
                        }
                        
                    break;
                    case 3:
                        if (canvasX > topLeftX && canvasY > topLeftY && canvasX < bottomRightX && canvasY < bottomRightY){

                            console.log(partArray[p].name);
                            counter++;
                            p++;
                                swal({
                                    title: "Good job!",
                                      text: "That is the Play Slip Stacker.",
                                      type: "success",
                                      showCancelButton: false,
                                      confirmButtonColor: "#8CD4F5",
                                      confirmButtonText: "Continue",
                                      closeOnConfirm: false
                                    },
                                    function(){
                                     instructionation(p);
                                });                             
                        }else{
                            
                                swal("Incorrect.", "That is not the Play Slip Stacker.", "error");
                        }
                        
                    break;  
                    case 4:
                        if (canvasX > topLeftX && canvasY > topLeftY && canvasX < bottomRightX && canvasY < bottomRightY){

                            console.log(partArray[p].name);
                            counter++;
                            p++;
                                swal({
                                    title: "Good job!",
                                      text: "That is the Barcode Scanner.",
                                      type: "success",
                                      showCancelButton: false,
                                      confirmButtonColor: "#8CD4F5",
                                      confirmButtonText: "Continue",
                                      closeOnConfirm: false
                                    },
                                    function(){
                                     instructionation(p);
                                });                         
                        }else{
                            
                                swal("Incorrect.", "That is not the Barcode Scanner.", "error");
                        }
                        
                    break;  
                    case 5:
                        if (canvasX > topLeftX && canvasY > topLeftY && canvasX < bottomRightX && canvasY < bottomRightY){

                            console.log(partArray[p].name);
                            counter++;
                            p++;
                                swal({
                                    title: "Good job!",
                                      text: "Those are the Terminal Connections.",
                                      type: "success",
                                      showCancelButton: false,
                                      confirmButtonColor: "#8CD4F5",
                                      confirmButtonText: "Continue",
                                      closeOnConfirm: false
                                    },
                                    function(){
                                     instructionation(p);
                                });                             
                        }else{
                            
                                swal("Incorrect.", "Those are not the Terminal Connections.", "error");
                        }
                        
                    break;
                    case 6:
                        if (canvasX > topLeftX && canvasY > topLeftY && canvasX < bottomRightX && canvasY < bottomRightY){

                            console.log(partArray[p].name);
                            counter++;
                            //p++;
                                swal({
                                    title: "Good job!",
                                      text: "That is the Second Power Button.",
                                      type: "success",
                                      showCancelButton: false,
                                      confirmButtonColor: "#8CD4F5",
                                      confirmButtonText: "Continue",
                                      closeOnConfirm: false
                                    },
                                    function(){
                                     //instructionation(p);
									 validateActivity();
                                });                             
                        }else{
                            
                                swal("Incorrect.", "That is not the Second Power Button.", "error");
								
                        }
                        
                    break;                  
                };//switch close

            


        
        
            if (counter == 7) { 
// calling completion
                finalScore = getCalculatedScore();
                completedCallback(finalScore);//this ends the exercise.

            }           
        
        });
        
        
        
        
        
        
        
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