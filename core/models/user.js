"use strict";
const {Model} = require("./model");

class User extends Model{
    first_name = '';
    last_name = '';
    username = '';
    last_login = null;
    is_superuser = false;
    is_active = false;
    is_staff = false;
    login_type = '';
    document = '';

    toString () {
        return `${this.first_name} ${this.last_name}`.trim();
    }

    isAdmin () {
        return this.is_superuser || this.is_staff;
    }

    toJson () {
        return {
            id: this.id,
            name: this.toString(),
            username: this.username,
            admin: this.isAdmin()
        }
    }
}

/** Metas **/
User.TABLE = 'pyctivex_user';
User.class = User;

module.exports = User;
