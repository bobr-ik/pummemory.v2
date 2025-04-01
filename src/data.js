function addPerson( fio, location, photo, id ) {
	fio = fio.split(" ")
	return {
		name       : fio[0],
		surname    : fio[1],
		patronymic : fio[2],
		location   : ( location ) ? location.split(" ").map(Number) : false,
		img_url    : ( photo ) ? photo : './src/photo.jpg',
		visible    : ( Boolean(location) && Boolean(photo) ) ? true : false,
		id         : id,
	}
}