tween.pause(); // pause

tween.resume(); // resume (honors direction - reversed or not)

tween.reverse(); // reverse (always goes back towards the beginning)

tween.seek(0.5); // jump to exactly 0.5 seconds into the tween

tween.timeScale(0.5); // make the tween go half-speed

tween.timeScale(2); // make the tween go double-speed

tween.kill(); // immediately kill the tween and make it eligible for garbage collection
