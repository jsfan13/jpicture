// version 0.1.4
// License: The MIT License (MIT)
(function ($) {
    'use strict';
    
    // this obj is only used if the user element is not an img
    var  imgCSS = { 
        'background-repeat': 'no-repeat',
    	'background-size': 'cover',
         enableZoom : true,
         orientationChange : true
    },
    
    callback = undefined,
    
    checkType = function (elem, type) {
        if (Object.prototype.toString.call(elem) === '[object ' + type + ']') {
            return true;
        }
        return false;
    },
    
    findMatchingWidth = function (picList, width) {
        var minDiff = Infinity,
            retVal,
            retKey;
            
        for (var key in picList) {
            if (picList.hasOwnProperty(key)) {
                if (Math.abs(picList[key] - width) < minDiff) {
                    minDiff = Math.abs(picList[key] - width);
                    retVal = picList[key];
                    retKey = key;
                }
            }
        }
        
        return { 
            width: retVal, 
            key: retKey
        };
    },
    
    // this calucates the growing or shrink height of the elment 
    // otherwise it would take height of the picture
    calcResizingRatio = function (picWidth, containerWidth, height) { 
        return height * (1 + ((containerWidth - picWidth) / picWidth)); 
    },
        
    // This function fetches the image through ajax. In case of a non-img
    // element it also checks if the height is 0. If it is 0 it resizes the 
    // non-img element to the height of the picture
    fetchImg =  function (container, imgProp, containerWidth) {  
    	var pictureUrl = imgProp.key,
    	    pictureWidth = imgProp.width,
    	
        useImg = function (imgTag, url) {
            imgTag.attr('src', url);    
        }, 
        
        // container is the non-img tag
        useDiv = function (container, url) {
            var loadImg = new Image(); // We need this image obj to get the height 
            
            // this is a critical part, the div picture is not always the same size as the img tag 
            // picture TODO:fix
            // it is also very important to check dynamic heights, like navi pictures,
            // those get a predefined height of their inside elements example: oliverj.net 
            loadImg.onload = function() {
                imgCSS.backgroundImage = 'url(' + url + ')';
                imgCSS.width = '100%';
                imgCSS.height = calcResizingRatio(loadImg.width, $(container).width(), $(container).height);
                container.css(imgCSS);
            }  
            loadImg.src = url;     
        };
        
        $.ajax({
            url: window.location.href,
          	cache: true,
   	 		processData : false,
		}).always(function () {
            if (container.tagName === 'IMG') {
                useImg($(container), pictureUrl);
            } else {
                useDiv($(container), pictureUrl);    
            }
            
            // Pass the picture element to the callback function. 
            // Therefore the user can modify the picture through the callback.
            if(callback !== undefined){
                callback(container);
            }
		});
    }, 
    
    onZoom = function (container) {
        $(window).resize(function () {
            console.log($(container).width());
        });
    },
    
    onOrientationChange = function (container) {
        // TODO: reimplement orientationChange
    },
    
    main = function (container, picList) {
        var elemWidth = $(container).width(),
            picProperties = findMatchingWidth(picList, elemWidth);
        
        fetchImg(container, picProperties, elemWidth);
    }, 
    
    initParameters = function (container, p1, p2) {
        // First optional parameter is a callback
        if (checkType(p1, 'Function')) {
            callback = p1; 
        } 
        // First optional parameter is a object
        if (checkType(p1, 'Object')) {
            imgCSS = $.extend( {}, { // reset the obj because it is in jQuery scope
                'background-repeat': 'no-repeat',
                'background-size': 'cover'
            }, p1);
        }   
        // First optional parameter is object and the second one is a callback
        if (checkType(p2, 'Function')) {
            callback = p2; 
        }
        // optional parameter for enabling/disabling Zoom, default on
        if (imgCSS.enableZoom) {
            onZoom(container);
        }
        // optional parameter for orientationChange, default on
        if (imgCSS.orientationChange) {
            onOrientationChange(container);
        }
    };
    
    // Basic plugin structure starts to fetch all class elements or a single 
    // id element and passes them to main. Error gets throw if passed parameter is not an object.
    //
    // @param picList : object, key is url, val is width
    // @param p1 : is either a function or an object
    // @param p2 : function, if p2 is used it has to be a function
    $.fn.jp = function (picList, p1, p2) {
        initParameters(this, p1, p2);
        
        if (checkType(picList, 'Object')) {          
            this.each(function() { 
                main(this, picList); 
            });
        } else {
            console.log('Object of type [object Object] expected, object of type ' + Object.prototype.toString.call(picList) + ' given.'); 
        }
        
        return this;
    };
}(jQuery));