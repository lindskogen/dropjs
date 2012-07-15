#dropjs
JavaScript filedrop library.

###Useage:

    drop( element, callback(fileData) )
`fileData.read` will contain a string with the fileData.
The element will get the "drop-zone"-class when hovering with a file.

Apparently it doesn't work through the `file://`-protocol.