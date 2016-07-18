var fs = require('fs');

function done(output) {
	process.stdout.write(output);
	process.stdout.write('\nprompt > ');
}

function pwd () {
	done(process.cwd());
}
 
function date () {
	done(Date());
};

function ls () {
	output = "";
	fs.readdir('.', function(err, files) {
		if (err) throw err;
		files.forEach(function(file) {
			output += file.toString() + '\n';
  		});
  		done(output);
	});
}

function echo () {
	if (arguments[0][0] === "$")
		done(process.env[arguments[0].slice(1)]);
	else 
		done(Array.prototype.slice.call(arguments).join(' '));
}

function cat () {
	var args = Array.prototype.slice.call(arguments);
	var stringArray = [];
	args.forEach(function(arg) {
		fs.readFile(arg, function(err, data) {
			if (err) throw err;
			stringArray.push(data + '\n');
			if (stringArray.length === args.length) {
				done(stringArray.join('\n'));
			}
		});
	});
}

function head() {
	var args = Array.prototype.slice.call(arguments);
	var stringArray = [];
	args.forEach(function(arg) {
		fs.readFile(arg, function(err, data) {
			if (err) throw err;
			stringArray.push(data.toString().split('\n').slice(0,5).join('\n') + '\n');
			if (stringArray.length === args.length) {
				done(stringArray.join('\n'));
			}
		});
	});
}

function tail() {
	var args = Array.prototype.slice.call(arguments);
	var stringArray = [];
	args.forEach(function(arg) {
		fs.readFile(arg, function(err, data) {
			if (err) throw err;
			stringArray.push(data.toString().split('\n').slice(-5).join('\n') + '\n');
			if (stringArray.length === args.length) {
				done(stringArray.join('\n'));
			}
		});
	});
}

function sort() {
	var args = Array.prototype.slice.call(arguments);
	fs.readFile(args[0], function(err, data) {
		if (err) throw err;
		done(data.toString().split('\n').sort().join('\n'));
	});
}

// not working because reasons i guess
// function wc() {
// 	var args = Array.prototype.slice.call(arguments);
// 	fs.readFile(args[0], (err, data) => {
// 		if (err) throw err;
// 		var dataAr = data.toString().split('\n');
// 		done(dataAr.length);
// 	});
// }

function uniq () {
	var args = Array.prototype.slice.call(arguments);
	fs.readFile(args[0], function(err, data) {
		if (err) throw err;
		var lineArray = data.toString().split('\n');
		for (var i = 0; i < lineArray.length; i++) {
			if (lineArray[i] === lineArray[i+1]);
				lineArray.splice(i, 1);
		}
		done(lineArray.join('\n'));
	});
}

function curl() {
	var url = Array.prototype.slice.call(arguments)[0];
	var request = require('request');
	request(url, function (error, response, body) {
  		if (!error && response.statusCode == 200) {
    		done(body);
  		}
	});
}

module.exports = {
	pwd: pwd,
	date: date,
	ls: ls,
	echo: echo,
	cat: cat,
	head: head,
	tail: tail,
	sort: sort,
	//wc: wc,
	uniq: uniq,
	curl: curl,
}

