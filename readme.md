# Iterator
This object submits a form repeatedly, iterating over a JavaScript array. Its intended purpose is that you can modify the form data between each submission.

## That's stupid, just submit multiple rows of data and do it all server-side
Correct; do that if you can. This is for those awkward situations where you're stuck with software that can't handle multiple rows of data.

## Why does this really on jQuery?
Because it was easier at the time and was built for a system that already has jQuery booted in. If you want to make a non-jQuery version, please do!