export default class UserDTO {
  constructor(user) {
      this.Nombre = user.first_name;
      this.Apellido = user.last_name;
      this.Email = user.email;
      this.Carrito = user.cart;
      this.Rol = user.role;
  }
}

