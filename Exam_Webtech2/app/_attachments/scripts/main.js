var ALL_DOCS = '../../_all_docs?include_docs=true';
var BY_GRADE = '_view/byGrade';

function createDoc(){
	
	var actorname = $("#actorname").val().split(" ");
	
	doc.firstnme = actorname[0];
	doc.lastname = actorname[1];
	doc.type = 'actor';
	var json = JSON.stringify(doc);
	console.log(json);
	
	$.ajax({
		type:			'PUT',
		url:				'../../' + actorname,
		data:			json,
		contentType: 	'application/json',
		async:			true,
		success:		function(data){
			buildOutput(ALL_DOCS, 0, '');
		},
		error:		function(XMLHttpRequest, textStatus, errorThrown){
			console.log(errorThrown); 
		}
	});
}

function buildOutput(){
	$('#output').empty();
	//var viewString = view;
	var actorname = $("#actorname").val().split(" ");
	//if(param) {
	//	viewString += '?key=' + param;
	//}
	
	$.ajax({
		type:		'GET',
		url:			"http://theimdbapi.org/api/find/person?name=" + actorname[0] + "+" + actorname[1],
        async:  		true,
        contentType: 'application/json',
        success:		function(data){
        		var arr = JSON.parse(data).rows;
	        	var htmlString = '<table>';
	        	for(var i=0; i<arr.length; i++){
	        		if(tag === 0) {
	        			var doc = arr[i].doc;
	        		}
	        		else if(tag === 1){
	        			var doc = arr[i].value;
	        		}
	        		if(doc.type === 'actor'){
	        			htmlString += '<tr><td>' + doc.actorname + '</td></tr>' + doc.movies;
	        		}
	        	}
	        	htmlString += '</table>';
	        	console.log(htmlString);
	        	$('#output').html(htmlString);
        },
		error: 			function(XMLHttpRequest, textStatus, errorThrown){ 
			console.log(errorThrown); 
		}
	});
}

function search() {
	var grade_search = parseInt($("#grade_search").val());
	buildOutput(BY_GRADE, 1, grade_search);
}


