/**
* @ngdoc controller
* @name lllLesson.controller:lllLesson
* @param {$scope} $scope class constructor argument
* @param {$state} $state class constructor argument
* @param {$window} $window class constructor argument
* @param {$q} $q class constructor argument
* @param {lllLesson.service:lllLesson} lllLesson class constructor argument
* @param {lllScorm.service:lllScorm} lllScorm class constructor argument
* @param {lllAlerts.service:lllAlerts} lllAlerts class constructor argument
* @param {lllConfig.service:lllConfig} lllConfig class constructor argument
* @description
* 
* Insert Description into JS file
**/
import _ from 'lodash';

class LllLessonController {
    constructor($scope, $state, $window, $q, $interval, lllLesson, lllScorm, lllAlerts, lllConfig) {
        this.$scope = $scope;
        this.$state = $state;
        this.$window = $window;
        this.$q = $q;
		this.$interval = $interval;
        this.lllLesson = lllLesson;
        this.lllScorm = lllScorm;
        this.lllAlerts = lllAlerts;
        this.lllConfig = lllConfig;
		
		this.workspaceReady;
			
        this.lessonModel; // via attribute
        this.lessonsList; // via attribute
		
        this.current = {};
        this.learner = null;
        this.startTime = null;
        this.scormSessionStarted = false;

        this.isInterruptConfirmed = false;
        this.stateChangeStartOff = null;


        this.scormSessionStarted = this.lllScorm.startSession();
        if(this.getToLastLesson()) return;
        
        this.$scope.$on('$destroy', this.destructor.bind(this));
        this.on = {
            submitActivity: this.handleSubmitActivity.bind(this)
        };
        
        this.validateLesson();
        this.startLesson();
        this.addInterruptHandlers();
		this.addResizeHandler();

    }
/**
* @ngdoc method
* @name destructor
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
    destructor() {
        this.endLesson();
        this.removeInterruptHandlers();
    }
/**
* @ngdoc method
* @name getToLastLesson
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
    getToLastLesson() {
        if(!this.scormSessionStarted) return;
        let lastAttemptedSco = this.lllScorm.getHighestAttemptedSco(this.lessonsList);
        if(lastAttemptedSco && lastAttemptedSco != this.lessonModel.id) {
            this.lllScorm.navigateToLesson(lastAttemptedSco);
            this.lllScorm.endSession(0);
            return true;
        }
    }
/**
* @ngdoc method
* @name startLesson
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
    startLesson() {
		
        if (this.scormSessionStarted) {
            this.lllScorm.startLesson(this.lessonModel);
            this.learner = this.lllScorm.getLearner();
            this.startTime = Date.now();
        }

        this.getLessonResumeLocation().then((location) => {
            this.setCurrentActivity(location);
            this.startActivity();
        });
    }
/**
* @ngdoc method
* @name getLessonResumeLocation
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
    getLessonResumeLocation() {
        let deferred = this.$q.defer();
        let storedLocation = this.lllScorm.getActivityIndex();

        if (this.lllLesson.isResumingProhibited(this.lessonModel) || storedLocation === 0) {
            deferred.resolve(0);
        } else {
            this.lllAlerts.confirm(this.lllConfig.messages.lessonResumeLocation).then((isConfirmed) => {
                deferred.resolve(isConfirmed ? storedLocation : 0);
            })
        }

        return deferred.promise;
    }
/**
* @ngdoc method
* @name endLesson
* @methodOf lllLesson.controller:lllLesson
* @param {boolean} hasSummary 
* @description
*  
* 
**/	
    endLesson(hasSummary) {
		console.log("lll-lesson-controller:: endLesson(" + hasSummary +")");
        console.log( "Is Scored:" + this.lllScorm.isLessonScored(this.lessonModel));	
		console.log("isResumingProhibited: "  + this.lllLesson.isResumingProhibited(this.lessonModel) );
		console.log("Points Earned Percentage:" + this.lessonModel.pointsRatio);
		console.log("Points Passing Needed Percentage:" +( this.lessonModel.passThreshold.pointsRatio));
		if (this.scormSessionStarted ) {
           
		    this.lllScorm.suspendLesson(hasSummary);
            var sessionTime = Date.now() - this.startTime;
		
			if(this.lllScorm.isLessonScored(this.lessonModel)){
			
					if(!this.lllLesson.isResumingProhibited(this.lessonModel)){
						this.saveLesson();
					}else{
						this.lllScorm.forceFail();
					}
			}
			
            this.lllScorm.setSessionTime(sessionTime);            
            this.lllScorm.endLesson(this.lessonModel, hasSummary); 
			
            if(!hasSummary){
				this.lllScorm.endSession();
			}
			
            this.learner = null;
            this.startTime = null;
            this.scormSessionStarted = false;
        }
    }
/**
* @ngdoc method
* @name saveLesson
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
    saveLesson() {
		console.log("lllLesson.controller:lllLesson::saveLesson()");
        if (!this.scormSessionStarted) return;
        this.lllScorm.saveLesson(this.lessonModel);
        this.lllScorm.saveSession();
    }
/**
* @ngdoc method
* @name validateLesson
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
    validateLesson() {
		console.log("lllLesson.controller:lllLesson::validateLesson()");
        this.lessonModel = this.lllLesson.validateLesson(this.lessonModel);
		
    }
/**
* @ngdoc method
* @name startActivity
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
    startActivity() {
		console.log("lllLesson.controller:lllLesson::Starting Activity" + this.current.activityIndex);
        this.lllScorm.startActivity(this.lessonModel, this.current.activityIndex);
    }
/**
* @ngdoc method
* @name setCurrentActivity
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
    setCurrentActivity(activityIndex) {
        let lastActivityIndex = this.lessonModel.activities.length - 1;

        this.current.activityModel = this.lessonModel.activities[activityIndex];
        this.current.activityIndex = activityIndex;
        this.current.hasPreviousActivity = activityIndex > 0;
        this.current.hasNextActivity = activityIndex < lastActivityIndex;
        this.current.hasNextFinish = activityIndex === lastActivityIndex;

        this.lllScorm.setActivityIndex(activityIndex);
		
		this.handleResize();
    }
/**
* @ngdoc method
* @name resetCurrentActivity
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
    resetCurrentActivity() {
        this.current.activityModel = null;
        this.current.activityIndex = null;
        this.current.hasPreviousActivity = null;
        this.current.hasNextActivity = null;
        this.current.hasNextFinish = null;
        this.lllScorm.setActivityIndex(null);
    }
/**
* @ngdoc method
* @name handleSubmitActivity
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
    handleSubmitActivity(activityModel) {
		console.log("lllLesson.controller:lllLesson::handleSubmitActivity()");
        this.lessonModel.activities[this.current.activityIndex] = activityModel;
        this.validateLesson();
        this.current.hasNextActivity ? this.goNextActivity() : this.goNextFinish();
    }
/**
* @ngdoc method
* @name goPreviousActivity
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
    goPreviousActivity() {
		console.log("lllLesson.controller:lllLesson::goPreviousActivity()");
        if (this.current.hasPreviousActivity) {
            this.setCurrentActivity(this.current.activityIndex - 1);
            this.startActivity();
        }
    }
/**
* @ngdoc method
* @name goNextActivity
* @methodOf lllLesson.controller:lllLesson
* @description
*   Auto saving lesson when this method is called caused completion and commit 
*	to the SCO, enabling the next sco on the TOC, when we want Nav Continue for them.
* --Insert Description--
**/	
    goNextActivity() {
	console.log("lllLesson.controller:lllLesson::goNextActivity()");
		
		let hasSummary = (this.current.activityModel && this.current.activityModel.type === 'summary');
	 
        if (this.current.hasNextActivity) {
            this.setCurrentActivity(this.current.activityIndex + 1);
            this.startActivity();
        }
		else 
		{
		 !hasSummary?this.saveLesson():false;
		}
    }
/**
* @ngdoc method
* @name goNextFinish
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
    goNextFinish() {
		console.log("lllLesson.controller:lllLesson::goNextFinish()");
        if (this.current.hasNextFinish) {
            let hasSummary = (this.current.activityModel && this.current.activityModel.type === 'summary');
            this.endLesson(hasSummary);
        }
    }
/**
* @ngdoc method
* @name addInterruptHandlers
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
    addInterruptHandlers() {
        this.$window.addEventListener('beforeunload', this.handleBeforeunload.bind(this));
        this.$window.addEventListener('unload', this.handleUnload.bind(this));
        this.stateChangeStartOff = this.$scope.$on('$stateChangeStart', (event, toState, toParams) => this.handleStateChangeStart(event, toState, toParams));
    }

/**
* @ngdoc method
* @name removeInterruptHandlers
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
    removeInterruptHandlers() {
        this.$window.removeEventListener('beforeunload', this.handleBeforeunload);
        this.$window.removeEventListener('unload', this.handleUnload);

        this.stateChangeStartOff && this.stateChangeStartOff();
        this.stateChangeStartOff = null;
    }
/**
* @ngdoc method
* @name handleBeforeunload
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
    handleBeforeunload(event) {
		console.log("lllLesson.controller:lllLesson::handleBeforeunload()");
        if (this.scormSessionStarted && !this.lessonModel.isCompleted) {
            event.returnValue = this.lllConfig.messages.lessonConfirmExit;
        }
    }
/**
* @ngdoc method
* @name handleUnload
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
    handleUnload(event) {
	
	    console.log("lllLesson.controller:lllLesson::handlingUnload()");
        this.destructor();
    }
/**
* @ngdoc method
* @name handleStateChangeStart
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
    handleStateChangeStart(event, toState, toParams) {
        if (!this.lessonModel.isCompleted && !this.isInterruptConfirmed) {
            event.preventDefault();

            this.lllAlerts.confirm(this.lllConfig.messages.lessonConfirmExit).then((isConfirmed) => {
                if (isConfirmed) {
                    this.isInterruptConfirmed = true;
                    this.endLesson();
                    this.$state.go(toState.name, toParams);
                }
            });
        }
    }
	

	/**
* @ngdoc method
* @name addResizeHandler
* @methodOf lllLesson.controller:lllLesson
* @description
* 
*  changed interval from 500 to 100 to reduce visual recognition of initial layout before resizing
**/	
    addResizeHandler() {
        this.$window.addEventListener('resize', this.handleResize.bind(this)); 
		this.workspaceReady = this.$interval(this.checkWorkspace.bind(this), 100);
    }	

/**
* @ngdoc method
* @name handleResize
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* Original development of framework restricted height and width of course to 800 x 600,
* and positioned images and overlays absolutely, which did not meet our responsive design requirements
* This is laboured attempt at controlling the layout and size with js, which unfortunately,
* will narrow the scope of scalability of the framework.. but it's consultant work, so we get what we get.
**/	
    handleResize() {
		console.log("trying resize:::" + this.getActivityType() );
	
		let workspace		= document.getElementsByClassName('cuepoint-workspace'); //Space between header and footer
		let lessonspace		= document.getElementsByClassName('lesson-ui');			 //Header Workspace Footer container
		let header			= document.getElementsByClassName('lll-activity-label'); //Header tag 
		let footer			= document.getElementsByClassName('cuepoint-footer');//Footer tag
		let windowHeight	= this.$window.innerHeight;
		let windowWidth		= this.$window.innerWidth;
		let portrait		= windowHeight > windowWidth;//This is a landscape type platform
		let landscape		= !portrait;
		let ratio			= windowWidth/windowHeight;
		let videoRatio		= 800/450;
		let overflow		= windowHeight < 650 || windowWidth < 800;
		let footerHeight 	= (footer.length>0 )?footer[0].clientHeight:0;
		
		if(header.length == 0)
			header = document.getElementsByClassName('cuepoint-label');//Alt Header Tag
		
		let contentOverflow = (workspace.length > 0) 
		? (workspace[0].offsetTop + workspace[0].clientHeight + footerHeight) > windowHeight
		:false;
	
		/*Only want to resize when the window has surpassed the standard dimensions,800x450
		  or in ratio to it , depending on the lessonspace height and workspace width
		*/
		
		if(landscape&&!overflow || !contentOverflow || !contentOverflow && !overflow ){
		
			console.log("lllLesson.controller:lllLesson::handleResize()");
			
			//Workspace and lessonspace are required 
			//tags to exist in the dom for resizing 
			
			if(workspace.length > 0  && lessonspace.length > 0){ 
	
				let headerHeight 			= (header.length>0)?header[0].clientHeight:80;		
				let workspaceHeight 		= workspace[0].clientHeight;				
				let newWorkspaceHeight 		= windowHeight -( footerHeight+ headerHeight);								
				let newWorkspaceWidth  		= newWorkspaceHeight * videoRatio;			
				let newFooterHeight    		= (footerHeight!=0)? windowHeight-(headerHeight + newWorkspaceHeight):0;	
					
				lessonspace[0].style.width	= ""  +newWorkspaceWidth+ "px";				
				lessonspace[0].style.height	= ""  + windowHeight + "px";

				//Adjust layout to fit newly calculated dimensions
				this.resizeSpaces( (""+newWorkspaceWidth+ "px"),("" + newWorkspaceHeight + "px"));
		
				//overlay images are absolute positioned, 
				//so location and size must be modified manually
				if(!overflow||!contentOverflow)
				this.redrawOverlays({widthRatio: (newWorkspaceWidth/800), heightRatio: ( newWorkspaceHeight/450)});		
	
			}
			else{
				console.log("no resize::: [tags unavailable or don't exist]");
			}			 
		}
		else if(contentOverflow )
		{
			console.log(":::[window dimensions not proportional to content...]");
			this.resizeDefault();
		}
		else
		{
			console.log("no resize::: [ vertical overflow?: " + overflow + " content overflow? " + contentOverflow +  "]" );	
		}
	}
	

/**
* @ngdoc method
* @name resizeDefault
* @methodOf lllLesson.controller:lllLesson
* @description
* 	
* When user enlarges window, each resize event will change dimensions to form fit window
* however when user down sizes, and content subsquently is overflowing the window,
* and for that event, content is resized to be the standard 800 x 450.
* This will result in a minor stuttering of content , because each resize event there after when
* fired, will see that the content is smaller than the current window size, and then form fit on next resize.
* Every other event at that rate will stutter the content.  If this is not desired, more accurate
* calculations must be coded to resize to form fit on a downsize event with content overflow.
**/		
	resizeDefault(){
		console.log("Resizing to default");		
		this.resizeSpaces("800px", "450px");
		this.redrawOverlays({widthRatio:1, heightRatio:1});
	}	
	
/**
* @ngdoc method
* @name resizeSpaces
* @methodOf lllLesson.controller:lllLesson
* @description
*  
* All layout tags I could find that control the overall size of the active content area.
* Lesson space is an exception, because it needs to include the footer if it exists,
* which can make it taller than the workspace , and must include the header height as well.
* This is why lesson space height == window inner height 
**/		

	resizeSpaces( spaceWidth, spaceHeight){
	
		let cuespace		= document.getElementsByClassName('cuepoint'); 
		let workspace		= document.getElementsByClassName('cuepoint-workspace'); 
		let lessonspace		= document.getElementsByClassName('lesson-ui');
		let activityspace	= document.getElementsByClassName('lll-activity');
		let header			= document.getElementsByClassName('lll-activity-label');	
		let footer			= document.getElementsByClassName('cuepoint-footer');
		let cuevid			= document.getElementsByClassName('cuepoint-video');
		let vid				= document.getElementsByTagName('video');
		
		if(workspace.length>0){
			workspace[0].style.width	= spaceWidth;
			workspace[0].style.height	= spaceHeight;
		}
		
		if(lessonspace.length>0){
			lessonspace[0].style.width	= spaceWidth;
			lessonspace[0].style.height	= "" + this.$window.innerHeight + "px";
		}
		
		if(activityspace.length){
			activityspace[0].style.width = spaceWidth;
			activityspace[0].style.height = spaceHeight;
		}
		
		if(cuevid.length>0){
			cuevid[0].style.width = spaceWidth;
			cuevid[0].style.height = spaceHeight;
		}
		
		if(vid.length>0){
			vid[0].style.width = spaceWidth;
			vid[0].style.height = spaceHeight;
		}
		
		if(header.length>0){
			header[0].style.width = spaceWidth;
		}
		
		if(footer.length>0){
			footer[0].style.width = spaceWidth;
		}
	}
	
/**
* @ngdoc method
* @name redrawOverlays
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* I added a property (overlay.transform) to each overlay when the framework 
* reads the json file to retain the original height, width, left, and top values,
* so that when the layout is resized , I can use those values to transform and translate
* overlays proportionally, while modifiying the properties of each to reflect the newly 
* calculated values for every cuepoint ahead of time.
* I also had to add unique id's to each overlay in the model so that I can match them to 
* the overlays actively in the DOM.
* This means that one resize event, accounts for changing all the stored overlay properties
* in all the cuepoints, and then applying the current modifications for the overlays that 
* are actively in the DOM. If they do not resize the window, the overlays will will be 
* pre-modified for the new window dimensions.
* This will lower performance, and increase burden on browser engine, ... but other than
* scrapping the frame work the consultants made to make it responsive using CSS instead of JS,
* isn't an option since js development is a part time effort for this project.
**/	
    redrawOverlays(ratio) {
		
		let imageResult = document.getElementsByClassName('cuepoint-overlay-image');
	
		console.log("Transforming images... @ratio " + ratio.heightRatio );
		
		let activityType = this.getActivityType();
		let overlays 	 = document.getElementsByClassName('cuepoint-overlay');
		let targetIds 	 = [];
		let i = 0;
		let j = 0;
		
		//Create an array of objects, each with an overlay, and an id for future sorting
		for(i =0; i < overlays.length; i++ ){			
			targetIds.push({'id':overlays[i].id, 'elem': overlays[i]});
		}

		let overlayData = this.current.activityModel.cuepoints;
		let targetOverlay;
		
		if(overlayData)
		{
			//Updating all overlay data with transformations
			//If overlay is on DOM, apply transformation to div(s)
			
			for(i =0; i < overlayData.length; i++ ){
			
				for(j =0; j < overlayData[i].overlays.length; j++ )
				{
					//Taking stored default value, and apply the product 
					//of the modified by ratio value to element
					
					targetOverlay = overlayData[i].overlays[j];		
					targetOverlay.left 	= (targetOverlay.transform.left * ratio.widthRatio);//modify left value	
					targetOverlay.top 	= (targetOverlay.transform.top * ratio.heightRatio);//modify top value
					
					if(targetOverlay.transform.width != null)
					{
						targetOverlay.image.width = targetOverlay.transform.width * ratio.widthRatio;// modify image width		
						targetOverlay.image.height = targetOverlay.transform.height * ratio.heightRatio;// modify image height
					}
				
					//get an array of elements by id , to match , and apply translation and scaling
					let result = (targetIds.filter( obj => obj.id == targetOverlay.id));
					
					if(result.length>0)
					{
							// left top is applied to container tag of image or is just an overlay
							let imageResult = result[0].elem.getElementsByClassName('cuepoint-overlay-image');
							
							result[0].elem.style.top 		= ""  + targetOverlay.top + "px";
							result[0].elem.style.left 		= ""  + targetOverlay.left + "px";
							
						if(imageResult.length>0)
						{	
							imageResult[0].style.width 		= ""  + targetOverlay.image.width + "px";
							imageResult[0].style.height 	= ""  + targetOverlay.image.height + "px";
						}
						console.log(imageResult[0]);
					}
				}
			}
		
		}

	}
	
/**
* @ngdoc method
* @name checkWorkspace
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
	checkWorkspace(){
		if(document.getElementsByClassName)
		{
			let workspace =  document.getElementsByClassName('cuepoint-workspace'); 
			
			if(workspace.length>0 && workspace[0].clientHeight > 0)
			{
				console.log("Initial timed resize has been called");
				this.handleResize();
				this.$interval.cancel(this.workspaceReady);
			}
		}
	}
/**
* @ngdoc method
* @name getActivityType
* @methodOf lllLesson.controller:lllLesson
* @description
* 
* --Insert Description--
**/	
	getActivityType() {
		if(document.getElementsByTagName("lll-activity-single-choice").length>0)
			return "lll-activity-single-choice";
		if(document.getElementsByTagName("lll-activity-multiple-choice").length>0)
			return "lll-activity-multiple-choice";
		if(document.getElementsByTagName("lll-activity-gui-simulation").length>0)
			return "lll-activity-gui-simulation";
		if(document.getElementsByTagName("lll-activity-video-guide").length>0)
			return "lll-activity-video-guide";
		if(document.getElementsByTagName("lll-activity-summary").length>0)
			return "lll-activity-summary";
		if(document.getElementsByTagName("lll-activity-custom").length>0)
			return "lll-activity-custom";
		if(document.getElementsByTagName("lll-activity-video").length>0)
			return "lll-activity-video";
	}
	
	
}

LllLessonController.$inject = ['$scope', '$state', '$window', '$q', '$interval','lllLesson', 'lllScorm', 'lllAlerts', 'lllConfig'];

export default LllLessonController;
