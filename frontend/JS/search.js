function getNames( data ) {
    return data.map(function(e) {
    					return {
    						name : e.name+" "+e.surname+" "+e.patronymic,
    						c    : -1,
    					}
    				})
}

function style_name( obj, j ) {
	if( obj.c>-1 ) {
		name     = obj.name;
		obj.name = name.substr(0,obj.c)+"<b>"+j+"</b>"+name.substr(obj.c+j.length);
	}
	return obj
}

function searching( text, list ) {
	if( text ) {
		let names = list.map( function(x,y) { 
								return style_name({ 
										name:x.name,
										c:x.name.indexOf(text)
									}, text)
							})
		names.sort(function (a, b) {
	  		if (a.c ==-1 )  return  1;
	  		if (b.c ==-1 )  return -1;
	  		if (a.c > b.c)  return  1;
	  		if (a.c < b.c)  return -1;
	  		return 0;
		});
		return names;
	}
	return false;
}

let name_list = getNames(data);

$('.search-txt').on('input',function() {
	let local_name_list = name_list;
	let val             = $(this).val().trim();
	let val_list        = val.split(" ").map(function(x,y) { return x.charAt(0).toUpperCase() + x.substr(1).toLowerCase()});
	
	for( let i in val_list ) { local_name_list = searching( val_list[i],local_name_list ); }

	if( local_name_list ) {
		$('.hints')[0].style.display = 'block';
		let li_list = $('.hints ul li');
		for( let i in local_name_list ) {
			li_list[i].innerHTML = local_name_list[i].name;
			if( li_list[i].innerText  ) {
				li_list[i].mark = mark_list_2[li_list[i].innerText.replace(' ','_').replace(' ','_')];
			}
		}
	} else $('.hints')[0].style.display = 'none';
})