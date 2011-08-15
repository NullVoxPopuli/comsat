/*
	jQuery must be loaded into the page before comsat will work.
	
	Using jQuery's noConflict() method, this can be used with other 
		libraries that use the $j variable.
	
	
	Code Style / Guidelines:	
		• All global variables have the "cs_" prefix.
		• Global Constants are ALL_CAPS with underscores for spaces.
		• The open bracket does not start on the next line.
		• functions should be camelCased
*/

// Before Everything
$j = jQuery.noConflict();

$j(function() {
var INITIAL_WINDOW_HEIGHT = $j(document).height();
var INITIAL_WINDOW_WIDTH = $j(document).width();
/*
	Graphics Constants
*/
var HEX_NUM_WIDTH = 5; // number of tiled hexes across (odds only)
var HEX_NUM_HEIGHT = 6; // number of tiled hexes vertically
var HORZ_SCALE_FACTOR = 18;
var ZERT_SCALE_FACTOR = 18;
var HEX_SPACING = 10; // diagonal (sorta.. it's like… Pi/3 spacing) spacing
var INITIAL_HEX_RADIUS = 80;
var cs_hexRadius = INITIAL_HEX_RADIUS;
// End Graphics Constants

/*
	DOM Containers
*/
var cs_playerList = [];
var cs_players = $j("ul.players");
// End DOM Containers

/*
	Interface Elements
*/
var cs_characterSelectPlayerOne;
var cs_characterSelectPlayerTwo;
var cs_activeCharacterSelect;
var cs_lastUsedCharacterSelect;
var cs_characterSliderPlayerOne;
var cs_characterSliderPlayerTwo;
var cs_confirmSelection;
// End Interface Elements

/*
	Interface Flags
*/
var cs_bothPlayersSelected = false;
// End Interface Flags

/*
	Interface Colors
*/
var DEFAULT_HEX_COLOR = "rgba(0,0,0,0.9)";
var DEFAULT_STROKE_COLOR = "rgba(50,50,50,1)";
var HEX_HOVER_COLOR = "rgba(200,200,200,0.9)";
var CHARACTER_SELECT_FILL_COLOR = "rgba(0.1,0.1,0.1,0.1)";
var PLAYER_ONE_SELECT_FILL_COLOR = "#009";
var PLAYER_TWO_SELECT_FILL_COLOR = "#900";
var cs_activeColor = PLAYER_ONE_SELECT_FILL_COLOR;

// End Interface Colors


/*
	Functions
*/

/*
	Extend Raphael so that we can have an easier time drawing shapes
*/
Raphael.fn.characterSelector = function(xPos, yPos, outerRadius, separation, color) {
    var self = this.set();
    var outer = this.path().attr({
        hexagon: [xPos, yPos, outerRadius]
    });
    var inner = this.path().attr({
        hexagon: [xPos, yPos, outerRadius - separation]
    });
    self.push(outer, inner);
    self.attr({
        stroke: color,
        //fill: "rgba(0.1,0.1,0.1,0.1)",
        'stroke-width': 2,
        'stroke-opacity': 0.7
    });
    return self;
};

// The Canvas
var $jCanvas = Raphael(0, 0, $j(document).width(), $j(document).height());


/* 
	customAttributes so that we can animate.
	unfortunately, there will be a lot of duplicate code if we animate all the shapes
*/
$jCanvas.customAttributes.hexagon = function(cx, cy, r) {
    var coords = [];
    for (var i = 0; i < 6; i++) {
        coords.push(cx + r * Math.cos(i / 6.0 * 2 * Math.PI)); // x
        coords.push(cy + r * Math.sin(i / 6.0 * 2 * Math.PI)); // y
    }

    return {
        path: "M" + coords + "z"
    };
};

$jCanvas.customAttributes.characterSelector = function(cx, cy, r, separation, color) {
    var coords = [];
    for (var i = 0; i < 6; i++) {
        coords.push(cx + r * Math.cos(i / 6.0 * 2 * Math.PI)); // x
        coords.push(cy + r * Math.sin(i / 6.0 * 2 * Math.PI)); // y
    }

    var coordsInner = [];
    r = r - separation;
    for (var i = 0; i < 6; i++) {
        coordsInner.push(cx + r * Math.cos(i / 6.0 * 2 * Math.PI)); // x
        coordsInner.push(cy + r * Math.sin(i / 6.0 * 2 * Math.PI)); // y
    }


    return {
        path: "M" + coords + "z" + "M" + coordsInner + "z",
        stroke: color,
        fill: CHARACTER_SELECT_FILL_COLOR,
        'stroke-width': 2,
        'stroke-opacity': 0.7
    };
};


// End Raphael Extentions

// Load these off screen
cs_characterSelectPlayerOne = $jCanvas.characterSelector(-150, -150, cs_hexRadius, 6, PLAYER_ONE_SELECT_FILL_COLOR);
cs_characterSelectPlayerTwo = $jCanvas.characterSelector(-150, -150, cs_hexRadius, 6, PLAYER_TWO_SELECT_FILL_COLOR);

cs_activeCharacterSelect = cs_characterSelectPlayerOne;

cs_characterSelectPlayerOne.click(function(event) {
    cs_lastUsedCharacterSelect = cs_characterSelectPlayerOne;
    if (!cs_bothPlayersSelected) { 
    	swapActiveSelector(); 
    }
});

cs_characterSelectPlayerTwo.click(function(event) {
    cs_lastUsedCharacterSelect = cs_characterSelectPlayerTwo;
    
	if (!cs_bothPlayersSelected) { cs_bothPlayersSelected = true; }
    cs_activeCharacterSelect = "";
});

function swapActiveSelector() {
    if (cs_lastUsedCharacterSelect == cs_characterSelectPlayerOne) {
        cs_activeCharacterSelect = cs_characterSelectPlayerTwo;
        cs_activeColor = PLAYER_TWO_SELECT_FILL_COLOR;
    } else {
        cs_activeCharacterSelect = cs_characterSelectPlayerOne;
        cs_activeColor = PLAYER_ONE_SELECT_FILL_COLOR;
    }
    cs_lastUsedCharacterSelect = cs_activeCharacterSelect;
}

function renderLayout(){
//	$jCanvas.clear();
    var diagDist = cs_hexRadius * Math.cos(Math.PI / 6) * 2 + HEX_SPACING;
    var dX = diagDist * Math.cos(Math.PI / 6);
    var dY = diagDist * Math.sin(Math.PI / 6);
    
    var gridWidth = (HEX_NUM_WIDTH - 1) * dX;
    var windowWidth = $j(window).width();
    var windowHeight = $j(window).height();
    var offsetX = windowWidth / 2 - gridWidth / 2;
    var offsetY = 150;
    
    playersList = cs_players.children("li");
    numOfPlayersInLastRow = playersList.size() % HEX_NUM_WIDTH;
    playersList.each(function(j) {
    	var i = j; // because we mutate the index
        col = i % HEX_NUM_WIDTH;
        if (Math.floor(i / HEX_NUM_WIDTH) == HEX_NUM_HEIGHT - 2) {
        	col = (HEX_NUM_WIDTH - numOfPlayersInLastRow) + col - 1;
        }
        row = Math.floor(i / HEX_NUM_WIDTH);
		even = (col % 2 - 1);
		if (row % 2 - 1 == 0) { even = (i + 1) % 2 - 1;}

        rowOffset = (row % 2) * row * dX
        xPos = offsetX + dX * col;
        yPos = offsetY - (dY * even) + (2 * dY * row);

        cs_playerList[i] = $jCanvas.path().attr({
            hexagon: [xPos, yPos, cs_hexRadius],
            fill: DEFAULT_HEX_COLOR,
            stroke: DEFAULT_STROKE_COLOR,
            'stroke-width': 2
            
        });
        cs_playerList[i].x = xPos;
        cs_playerList[i].y = yPos; 
    });
    
	cs_confirmSelection = $j(".select_players");

     jQuery.each(cs_playerList, function(i) {    
            this.click(function(event) {
            	swapActiveSelector(); 
//              if (cs_bothPlayersSelected){
                	cs_activeCharacterSelect.toFront().stop().animate({
                    	characterSelector: [this.x, this.y, cs_hexRadius, 6, cs_activeColor]
                	}, 100);
//                
               		if (cs_activeCharacterSelect == cs_characterSelectPlayerOne){
                		showPlayerActionView(cs_characterSliderPlayerOne, playersList, i);
            		}else if (cs_activeCharacterSelect == cs_characterSelectPlayerTwo){
            			showPlayerActionView(cs_characterSliderPlayerTwo, playersList, i);
            		}
                	cs_activeCharacterSelect = "";
//            	}

			if ($j("#playerOne").is(":visible") && $j("#playerTwo").is(":visible")){
				cs_confirmSelection.removeClass("select_players");
				cs_confirmSelection.addClass("confirm_selection");
				cs_confirmSelection.text("[ Confirm Selection ]");
			}
                           
            });
            this.mouseover(function(event) {
                if (cs_activeCharacterSelect.length > 0){
                // animates the selector
//                cs_activeCharacterSelect.toFront().stop().animate({
//                    characterSelector: [this.x, this.y, cs_hexRadius, 6, cs_activeColor]
//                }, 100);
                }
            });
    
            this.hover(function(event) {
                cs_playerList[i].animate({
                    fill: HEX_HOVER_COLOR
                }, 500);
            }, function(event) {
                cs_playerList[i].animate({
                    fill: DEFAULT_HEX_COLOR
                }, 500)
            });
        });
    
}

function showPlayerActionView(container, playersList, index){
	// animate (hide)
	if (container == cs_characterSliderPlayerOne){
		if (container.is(":visible")){
			container.fadeOut(0);//.hide("slide", {direction: "left"}, 100);
		}
	} else if (container == cs_characterSliderPlayerTwo){
		if (container.is(":visible")){
			container.fadeOut(0);//.hide("slide", {direction: "right"}, 100);
		}
	}
	
	currentPlayerElement = playersList.eq(index)
	
	raceImageContainer = container.find(".race");
	raceImageContainer.removeClass("protoss");
	raceImageContainer.removeClass("zerg");
	raceImageContainer.removeClass("terran");
	raceImageContainer.removeClass("random");
	raceImageContainer.addClass(currentPlayerElement.find("span.race").text());
	
	countryImgURL = currentPlayerElement.find(".country").text();
	container.find(".nameSlider .countryFlag").css("background", "url(/images/"+countryImgURL+")");
	container.find(".nameSlider .name").text(currentPlayerElement.find(".player_name").text());
	
	// animate (show)
	if (container == cs_characterSliderPlayerOne){
		container.show("slide", {direction: "left"}, 100);
	} else if (container == cs_characterSliderPlayerTwo){
		container.show("slide", {direction: "right"}, 100);
	}
}

function initComsat() {
	$j("body").append("\
		<div id='playerOne' style='display: none;'>\
			<div class='race'></div>\
			<div class='actionShot'></div>\
			<div class='nameSlider'>\
				<div class='countryFlag'></div>\
				<span class='name'></span>\
				<span class='pText'>P1</span>\
			</div>\
		</div>");
	cs_characterSliderPlayerOne = $j("#playerOne");
	cs_characterSliderPlayerOne.css("height", INITIAL_WINDOW_HEIGHT + "px");
	
	$j("body").append("\
		<div id='playerTwo' style='display: none;'>\
			<div class='race'></div>\
			<div class='actionShot'></div>\
			<div class='nameSlider'>\
				<div class='countryFlag'></div>\
				<span class='name'></span>\
				<span class='pText'>P2</span>\
			</div>\
		</div>");
	cs_characterSliderPlayerTwo = $j("#playerTwo");
	cs_characterSliderPlayerTwo.css("height", INITIAL_WINDOW_HEIGHT + "px");
	
	
	renderLayout();

}


    initComsat();
//    $j(window).bind("resize", renderLayout);
});

