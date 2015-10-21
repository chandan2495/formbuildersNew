

var app=angular.module('firstModule',[]);

app.controller('maincontroller', function($scope){	
	$scope.items=[];
	var textbox={"textbox": "<div class='form-group after-drop'><label for='' class='col-lg-2 control-label'>Text</label><div class='col-lg-10'><input type='text' class='form-control' placeholder='Email'></div></div>"};
    $scope.items.push(textbox);

	$scope.count=2;
	$scope.dropCallback = function(event, ui){
		// ui.draggable.removeClass("highlight");
		$('.droparea').hide();
		// var dropped = ui.draggable;
		var droppedOn = $("#dropperStyle");
		// var copy=$(dropped).clone();
		// copy.find("input").removeAttr('readonly');				
		// copy.addClass('after-drop');
		// $(copy).appendTo(droppedOn); 
		$($scope.items[0].textbox).appendTo(droppedOn)
		.draggable({
			axis:"y",
			revert : "invalid"	,
			containment: '#dropperStyle',
			stop : $scope.stopCallback			
		}).attr("id","question"+$scope.count);
		$scope.count++;
	};
	$scope.startCallback = function(event,ui){
				var $draggable = $(event.target);
				ui.helper.width($draggable.width());
				ui.helper.height($draggable.height());
				ui.helper.addClass("highlight");
				$('.droparea').show();
				console.log(ui.offset);
				console.log("Question 2 "+ $("#question1").offset().left + ", " + $("#question1").offset().top);
				if($('#question1').offset().left<(ui.offset.left)){
				$(".after-drop").each(function(){
					if($(this).offset().top < ui.offset.top)
					{
						$(".droparea").remove();
						var newdroparea=$("<div class='form-group droparea'></div>").insertAfter(this).show();						
						newdroparea.droppable({
							accept : ".t1",
							drop : $scope.dropCallback
						});						
					}					
				});
			}
		}	

	$scope.stopCallback = function(){
		$('.droparea').hide();
	};			

				// $draggable.css('opacity', '0');
					
});

app.directive('builder',  function(){
	// Runs during compile
	return {
		compile: function(tElem, attrs){
			$.material.init();
			
			return function(scope,elem,attrs){
			$(".t1").draggable({
				revert: "invalid",
				drag : scope.startCallback,
				helper : 'clone',
				zIndex : 350,
				cursor : 'grab',
				stop : scope.stopCallback						
			});

			};
		},
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '<h1>Hello</h1>',
		templateUrl: 'builderTemplate.html',
		replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		// link: function(scope, elem, attrs) {
			
		// }
	};
});
app.directive('dropper', function(){
	// Runs during compile
	return {
		compile: function(tElem, attrs){
			$.material.init();

			return function(scope,elem,attrs){
			$("#question1").draggable({
				revert: "invalid",								
				zIndex : 350,
				axis : "y",
				containment: '#dropperStyle'
			});
			$(".droparea").droppable({
				accept : ".t1",
				drop : scope.dropCallback
			});
				
			};
		},
		// name: '',
		// priority: 1,
		// terminal: true,
		// scope: {}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		// restrict: 'A', // E = Element, A = Attribute, C = Class, M = Comment
		// template: '',
		templateUrl: 'dropperTemplate.html',
		replace: true
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		// link: function(scope, elem, attrs) {
		// 	scope.count=2;
		// 	scope.dropCallback = function(event, ui){
		// 		// ui.draggable.removeClass("highlight");
		// 		$('.droparea').hide();
		// 		// var dropped = ui.draggable;
		// 		var droppedOn = $("#dropperStyle");
		// 		// var copy=$(dropped).clone();
		// 		// copy.find("input").removeAttr('readonly');				
		// 		// copy.addClass('after-drop');
		// 		// $(copy).appendTo(droppedOn); 
		// 		$(scope.items[0].textbox).appendTo(droppedOn)
		// 		.draggable({
		// 			axis:"y",
		// 			revert : "invalid"
		// 		}).attr("id","question"+scope.count);
		// 		scope.count++;
		// 	};
		// 	scope.startCallback = function(event,ui){
		// 			var $draggable = $(event.target);
		// 			ui.helper.width($draggable.width());
		// 			ui.helper.height($draggable.height());
		// 			ui.helper.addClass("highlight");
		// 			$('.droparea').show();
		// 			console.log(ui.position);
		// 			// $draggable.css('opacity', '0');
		// 	};						
		// }
	};
});