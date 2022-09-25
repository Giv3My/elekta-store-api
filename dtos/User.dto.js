const UserDto = (model) => {
  return {
    id: model._id,
    email: model.email,
    username: model.username,
    phone: model.phone,
    contacts: model.contacts,
    role: model.role,
  };
};

module.exports = UserDto;
