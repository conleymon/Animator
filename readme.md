


# AnimatorJs

Object Animator animates any object - recursively. That is, it will animate entire object trees. It determines the current values of the target object and increments those values toward the destination values over a set duration. It features color animation, (At present, hex, rgb, rgba and CSS color-names), independent CSS transform animation, and a growing number of easings.

## Usage (webpack) 

    import {ObjectAnimator} from 'deep-animator'
    var animator = new ObjectAnimator()
    animator.loadAnimation(animationPayload).animate()
    //will start your animation. AnimationPayload described below.

## How it works:
The animationPayload package is simple:
	
	{
		src: {Object||Array} the object to be animated
		dest: {Object||Array} the object containing destination values. Must mirror the src
		duration: {number} time in milliseconds over which the animation should take place
		contour: {string} the easing desired
		preAnim: {function} callBack to execute before the animation takes place
		postAnim: {function} callBack to execute after the animation is finished
		preInc: {function} callback to execute before each animation frame render
		postInc: {function} callBack to execute after each animation frame render
		synchTransInc: {boolean} If truthy, animator will retrieve and synchronize the transform string before every frame (So that any other animations can also run on that transform). Otherwise it only synchs at the start of the animation.
	}


Strings are parsed for numbers and incremented in place to their destinations, taking their destinations from corresponding destination strings. 

Ex.

	An animation taking
	
	src: {str:'hello 12 world 24'}
	dest:{str:'32 goodbye 54'}
	
	would animate the src string to 'hello 32 world 54' 


Of course, numbers are animated as well.

CSS Colors are converted to rgba and incremented as above.

Nested objects/arrays can take any form. The dest object must mirror the src object, whether single or multi-level. Any dest value not having a corresponding src value will not be animated.

The animation is prepared by tracing out the dest object and looking for corresponding src objects. So the src object can be any size. The dest object determines the scope and depth of the animation.

Note: at present, style properties whose default is an empty string will not be animated without first initializing them. 
### CSS Transforms

Animate a transform property in this way:

	anim({
	  src:node.style,
	  dest:{transform:'rotateY(5deg) translateX(5px)'}
	})

If the transform property already contains the transforms you want to animate, the anim will synch up the values you animate with what's there, and the order does not matter.

	node.style.transform='translateY(90%) rotateY(5deg) translateX(5px)'
	anim({
		src:node.style,
		dest:{transform:'translateX(200px) translateY(50%)'}
	})

will  animate the transform property to 

	'translateY(50%) rotateY(5deg) translateX(200px)'

However, if the properties are not already there, they will be appended to the end of the transform string with default values, in the order they appear in the dest.transform string, and then animated to their destinations

If synchTransInc is set to true in the animation payload, anim will read the transform property before every frame. This is so that if there are other animations animating different transforms on the same node, they don't bump into one another. 


## Use

### Simplest Use

if available, the ObjectAnimator package will put an 'anim' variable on the window. calling

	var animName=anim(animationPayload)
will start and return the animation. 

You may also get a shorthand constructor and store where you like:

	var anim=new ObjectAnimator().getShorthand()
	var animName=anim(animationPayload)

Otherwise, 

	var animator=new ObjectAnimator().loadAnimation(animationPayload).animate()  
will start and return your animation.

### Synching Values From Separate Objects
You can synch objects together by creating a super object.

Say you wanted to animate node1.style.width together with node2.style.height. You would do it this way

	anim({
	  src:{
	    node1:node1.style,
	    node2:node2.style
	   }
	   dest:{
	     node1:{width:'100%'}
	     node2:{height:'50%'}
	   }
	)}

The src and dest must still be congruent.


### Methods
stop()
>  stops the animation
### Easings

* linear
* smooth-sine 
* smooth : speed weighted to the front of the animation
* root :abrupt start, smooth end
* para: smooth start abrupt end
* boomerang :extends beyond destination and returns to destination

### Advanced Behavior
ObjectAnimator is currently powering the animation method embedded in queueJS (npm i queue-conductor). The API of the animate function is identical (pass-through) to the API described above. Using the ObjectAnimator in the context of QueueJS opens a dynamic range of advanced behavior controls- stopping/starting, reversing, looping, alternating, delay, complex timelines and anything else one can think of.


### Testing
Tests are run with mocha in the browser.

* From the command line, navigate to the module folder.
* Run webpack --config webpack.mocha_config.js
* In your browser visit the subdirectory : dist/tests/run_tests.htm

### Future Features
* querySelector
* application of the same destination to multiple objects
* pre-packaged objects provided by queueJS for  advanced animation behavior and control API 

#### Easings
* unlimited-point bezier curve
* custom easing functions
* spring parameters






