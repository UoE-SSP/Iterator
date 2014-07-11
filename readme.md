# Iterator
This object submits a form repeatedly, iterating over a JavaScript array. Its intended purpose is that you can modify the form data between each submission.

** That's stupid, just submit multiple rows of data and do it all server-side **
Correct; do that if you can. This is for those awkward situations where you're stuck with software that can't handle multiple rows of data.

** Why does this really on jQuery? **
Because it was easier at the time and was built for a system that already has jQuery booted in. If you want to make a non-jQuery version, please do!

# How to use
There's an (albeit messy) example of how to use the Iterator in the examples folder. But here are the basics:
 * You initialise an Iterator with two parameters: The array over which to iterate and the button that submits the form you're iterating over.
 * You can alternatively provide these using the `setIterator` and `setButton` methods respectively.
 * You can subscribe to a variety of events using the `raiseEvent` method (details below).
 * Finally, the iterator can be started with the `start` method.
 * On errors, the `resume` method forces the iterator to continue.
 
## Events
| Event | Raised when | Parameters |
| --- | --- | --- |
| start | When the iterator is first initiated | _none_ |
| end | When the iterator finishes submitting all entries | _none_ |
| error | When an error occurs on submission (like the URL not being found) | errorThrown - The JavaScript error, if suitable<br>xhr - The XHR object used to make the request<br>textStatus - The status of the AJAX request |
| beforeSubmit | Just before a iteration is submitted | row - The array entry that the iterator is currently on<br>index - A 0-index of the current array row being operated on |
| afterSubmit | After an iteration has been submitted successfully | row - The array entry that the iterator is currently on<br>index - A 0-index of the current array row being operated on<br>response - The data returned by the AJAX request |

Returning `false` in both the `beforeSubmit` and `afterSubmit` events will pause the iterator. You can then use the `resume` method to resume iterations executing.