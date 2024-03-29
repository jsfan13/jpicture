# jPicture 0.6.0
[![tag](https://img.shields.io/badge/tag-0.6.0-blue.svg)]() [![build](https://img.shields.io/badge/build-grunt-blue.svg)]() [![GitHub license](https://img.shields.io/badge/license-mit-blue.svg)]()

As many of you might have at least once experienced, is that on smaller devices with a slow connection pictures seem to load forever.

Mainly the problem there is that the high-res pictures are loaded anyway and just get scaled down for the low-res viewport.

To avoid that, might sometimes (or even most of the time) be a pain in the neck, and that is exactly what this jQuery plugin was built
for.

To break it down to the essence, jPicture loads only the most fitting picture out of the picture-versions for the viewport the page is
displayed on. This not only takes away the trouble of handling this yourself, but also reduces loading times for lower-res viewports. jPicture uses lazy loading for the initialisation of the pictures, so the pictures get loaded when needed.

And now you might just think that it would take forever to get to this jQuery Plugin, right? But don't you worry it is just 1.73 kB small, so you can quickly download it and try it out.

--------

tl;dr: jPicture is a kind of polyfill for the html 5.1 [picture](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/picture) tag, available as standalone JavaScript version or jQuery Plugin.

##Table of contents:
 - [Install](#install)
 - [Documentation](#documentation)
 - [Usage jQuery plugin](#usage-jquery-plugin)
 - [Usage Vanilla Javascript](#usage-vanilla-javascript)
 - [Known Issues](#known-issues)
 - [What is new in](#what-is-new-in)
 - [How to build your own version](#how-to-build-your-own-version)
 - [Authors](#authors)

## Install
### Bower
```html
bower install jpicture
```

### npm
```html
npm install jpicture
```

### The oldschool way
#### Vanilla
```html
<script src="dist/jpicture.min.js"></script>
```

#### jQuery
Reference the JavaScript file manually directly after [jQuery](http://jquery.com):
You can use the minifyed version of jPicture.
```html
<script src="dist/jpicture.jquery.min.js"></script>
```

## Documentation
For a beautiful version of the documentation visit the [documentation page](http://jpicture.net/documentation/).
If you're using, or looking for the documentation of an older version of jPicture (versions >= 0.4.0) then visit the [legacy documentation page](http://jpicture.net/documentation-legacy/).

## Usage jQuery plugin
### The easiest way to use jPicture is, with an ID on an IMG-tag. This works as follows:
```javascript
$('#my-fancy-pic').jp({
    'test_imgs/mySuperFancyPic_80.jpg' : 80,
    'test_imgs/mySuperFancyPic_200.jpg' : 200,
    'test_imgs/mySuperFancyPic_400.jpg' : 400,
    'test_imgs/mySuperFancyPic_500.jpg' : 500,
    'test_imgs/mySuperFancyPic_600.jpg' : 600
});
```
This is an object, which you give jPicture as parameter where the key is the path to the picture and the value is the width of that picture. (Of course the picture should have the corresponding width.) With that given jPicture can determine which picture it should use for the best visualisation on the resolution the site is being viewed on.

### You can use jPicture on classes too
If you are using the same picture more frequently on the same page, you might want to use a class for that. But what if you want to use jPicture too? Well, that is no problem after all, everything you need to change is instead of selecting an ID you now	need to select a class. This works as follows:

```javascript
$('.some-fancy-pics').jp({
    'test_imgs/mySuperFancyPic_80.jpg' : 80,
    'test_imgs/mySuperFancyPic_200.jpg' : 200,
    'test_imgs/mySuperFancyPic_400.jpg' : 400,
    'test_imgs/mySuperFancyPic_500.jpg' : 500,
    'test_imgs/mySuperFancyPic_600.jpg' : 600
});
```

#### What to do, if my users might have JS deactivated?
If you care about users without javascript enabled, you can include the original image inside a `<noscript>` tag:

```html
<noscript>
  <img src="test_imgs/mySuperFancyPic_600.jpg" />
</noscript>
```

### You need to use non-IMG-tags – no problem
Sometimes an IMG-tag just isn't enough, but even that is no problem for jPicture after all. You can simply use it just the way you already did. The only difference is that the tag with corresponding ID or class is not an IMG-tag but an whatever-you-want-tag (for example a DIV-tag in a header).

### Your picture just won't look good on lower resolutions?
No problem, you can simply tell jPicture to not show the picture at all if the solution is too small, for example if your banner would just waste space on a low-res device, you can simply do as follows:

```javascript
$('.some-fancy-pics').jp({
    'hidden' : 200,
    'test_imgs/mySuperFancyPic_400.jpg' : 400,
    'test_imgs/mySuperFancyPic_500.jpg' : 500,
    'test_imgs/mySuperFancyPic_600.jpg' : 600
});
```
Now if the best fitting version would be for the picture version of 200 pixels, then it will be hidden by setting the display property of CSS to none.

### Need callbacks?
If you need a callback-function, then you can also give a callback to jPicture as a parameter. For example you want to print to the console when picture was loaded, that would look like follows:

```javascript
$('.some-fancy-pics').jp({
    piclist : {
        'test_imgs/mySuperFancyPic_80.jpg' : 80,
        'test_imgs/mySuperFancyPic_200.jpg' : 200,
        'test_imgs/mySuperFancyPic_400.jpg' : 400,
        'test_imgs/mySuperFancyPic_500.jpg' : 500,
        'test_imgs/mySuperFancyPic_600.jpg' : 600
    },
    callback : function () {
	    console.log("Picture was loaded.");
    }
});
```
Now each time the picture finished loading, "Picture was loaded." will be printed in the console.

### Further modification
What if you need to do something with the picture after you loaded it? Well, just easily hand it over as parameter in the callback-function. In the following example the width of the picture will be logged in the console.

```javascript
$('.some-fancy-pics').jp(
    piclist : {
        'test_imgs/mySuperFancyPic_80.jpg' : 80,
        'test_imgs/mySuperFancyPic_200.jpg' : 200,
        'test_imgs/mySuperFancyPic_400.jpg' : 400,
        'test_imgs/mySuperFancyPic_500.jpg' : 500,
        'test_imgs/mySuperFancyPic_600.jpg' : 600
    },
    callback : function (pic) {
        var pWidth = $(pic).width();
        console.log("The width of the picture is " + pWidth + "pixels.");
    }
});
```

### Disable Zoom or Change OrientationChange
jPicture comes with an automatic Zoom and OrientationChange Event. If you want do disable those events just set enableZoom or orientationChange to false.

```javascript
$('.some-fancy-pics').jp({
    piclist : {
        'test_imgs/mySuperFancyPic_80.jpg' : 80,
        'test_imgs/mySuperFancyPic_200.jpg' : 200,
        'test_imgs/mySuperFancyPic_400.jpg' : 400,
        'test_imgs/mySuperFancyPic_500.jpg' : 500,
        'test_imgs/mySuperFancyPic_600.jpg' : 600
    },
    enableZoom : false,
    orientationChange : false
});
```

### Callback and Chaining
You can also chain every jQuery method after the end of the jPicture function.

```javascript
$('.some-fancy-pics').jp({
    piclist : {
        'test_imgs/mySuperFancyPic_80.jpg' : 80,
        'test_imgs/mySuperFancyPic_200.jpg' : 200,
        'test_imgs/mySuperFancyPic_400.jpg' : 400,
        'test_imgs/mySuperFancyPic_500.jpg' : 500,
        'test_imgs/mySuperFancyPic_600.jpg' : 600
    },
    callback : function (pic) {
        var pWidth = $(pic).width();
        console.log("The picture has a width of " + pWidth + " pixels.");
    }
}).mouseenter(function () {
    $(this).css({'opacity' : '0.5'});
}).mouseleave(function () {
    $(this).css({'opacity' : '1'});            
});
```

### Inject HTML instead of pictures
Sometimes it is a better idea or solution to display text instead of pictures.
In those cases jPicture can display a text instead of a picture for chosen sizes, but beware that jPicture only recognizes HTML tags or text with at least one whitespace as text elements, anything else will be handled like a picture element.

```javascript
$('#some-fancy-pic').jp({
    '<span>Too Small for a pic</span>;' : 80,
    'test_imgs/mySuperFancyPic_200.jpg' : 200,
    'test_imgs/mySuperFancyPic_400.jpg' : 400,
    'test_imgs/mySuperFancyPic_500.jpg' : 500,
    'test_imgs/mySuperFancyPic_600.jpg' : 600
});
```

Hence you are not forced to use pictures at all.

```javascript
$('#headline-section').jp({
    '<h5>About us</h5>' : 60,
    '<h4>About us</h4>' : 100,
    '<h3>About us</h3>' : 140,
    '<h2>About us</h2>' : 180,
    '<h1>About us</h1>' : 220
});
```

#### Literals and Variables
Just in case, you didnt know. Instead of Literals we could use variables.

```javascript
var param = {
    piclist: {
        'test_imgs/mySuperFancyPic_80.jpg' : 80,
        'test_imgs/mySuperFancyPic_200.jpg' : 200,
        'test_imgs/mySuperFancyPic_400.jpg' : 400,
        'test_imgs/mySuperFancyPic_500.jpg' : 500,
        'test_imgs/mySuperFancyPic_600.jpg' : 600
    },
    callback: function (pic) {
	    var pWidth = $(pic).width();
	    console.log("The picture has a width of " + pWidth + " pixels.");
    }
};

$('.some-fancy-pics').jp(param);
```
## Usage Vanilla Javascript
The vanilla version of jPicture has the same options like
the jQuery plugin. Different here is that you can only
use ids instead of ids and classes.

```javascript
var param = {
    enableZoom: true,
    orientationChange: true,
    callback: function (pic) {
	    console.log("The picture " + pic);
    }
    picList : {
        '<span>not enough space</span>' : 80,
        '../test_imgs/we_200.jpg' : 200,
        '../test_imgs/we_400.jpg' : 400,
        '../test_imgs/we_600.jpg' : 600,
        '../test_imgs/we_800.jpg' : 800,
        '../test_imgs/we_1280.jpg' : 1280
    }
};

var jp = new jPicture();
jp.setResponsive('col-sm-1-1', param);
```

## Known Issues

### A smaller picture is chosen
As far as we know this only appears on Firefox and only with a screen width of 1920 or more pixels, but only with IMG-elements. If all of that comes together in Firefox, then the IMG-element will be sized with a wrong width which causes jPicture to load a smaller version of the picture unregarding the actual resolution or element width. Of course this doesn't look quite good on higher resolutions, but as soon as a resize or an orientation change takes place the correct version will be loaded.

#### Things we tried
```javascript
document.getElementById('banner').offsetWidth;
document.getElementById('banner').innerWidth;
document.getElementById('banner').clientWidth;
$('#banner').width();
$('#banner').css('width');
$('#banner').outerWidth();
```

#### Workaround
The only way we know, to not have that issue is to use other elements than IMG for example a DIV-element should get the job done as expected. As we have already mentioned this is only needed for Firefox.


## What is new in

### Version 0.6.0
 - JavaScript standalone support
 - killed the jQuery dependency

### Version 0.5.0

- support for CSS properties was dropped
- now we follow the unofficial jQuery standard and have only one parameter left
- code base was reduced
- less memory gets allocated too
- removed the most hated js keyword in the world "delete"

## How to build your own version
If you would like to build your own version of jPicture, the only thing you need to do is to follow the steps below.

```html
$ cd jpicture
$ npm install
$ grunt
```

Have fun building your own version!

### Authors

Zoran Milanovic  [@HayterMiles](https://twitter.com/HayterMiles)

Oliver Jessner [@oliverj_net](https://twitter.com/oliverj_net), [Website](http://oliverj.net)

Send us an email at: help@jpicture.net

Copyright © 2015
