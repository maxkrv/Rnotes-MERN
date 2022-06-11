class UserDto {
	email;
	id;

	constructor(model) {
		this.email = model.email;
		this.id = model._id;
	}
}

export default UserDto;
