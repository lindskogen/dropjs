/*
 * drop.js v0.4
 * Copyright 2012, Johan Lindskogen
 *
 * Useage: drop( element, callBack(fileData) )
 * fileData.read will contain a string with the fileData
 * The element will get the "drop-zone"-class when hovering with a file.
 * 
 */

var drop = function(zone, callBack, fullCallBack) {
	var fileData = [];
	function cancel(event) {
		event.stopPropagation();
		event.preventDefault();
	}
	function toggleCancel(event) {
		cancel(event);
		zone.classList.toggle('drop-zone');
	}
	function readFile(file) {
		var reader = new FileReader();
		reader.onload = function(event) {
			fileData[fileData.length-1].read = event.target.result;
			callBack(fileData[fileData.length-1]);
		}
		if (file.type.indexOf('image') != -1)
			reader.readAsDataURL(file);
		else
			reader.readAsText(file);
	}

	zone.addEventListener('dragenter', toggleCancel, false);
	zone.addEventListener('dragover', cancel, false);
	zone.addEventListener('dragleave', toggleCancel, false);
	zone.addEventListener('drop', function(event) {
		toggleCancel(event);
		var files = event.dataTransfer.files;
		for (var i = 0, len = files.length; i < len; i++){
			fileData.push({
				name: files[i].name,
				size: files[i].size,
				date: files[i].lastModifiedDate,
				type: files[i].type,
				originalFile: files[i]
			});
			readFile(files[i]);
		}
		if (typeof fullCallBack == 'function')
			fullCallBack(fileData);

	}, false);
}
