// File: src/user.js
// Description:
// - User class to be implemented in server/main.js
// - Each user object takes a username, password, and if a pet exists, that will be linked to the user object. 

const User = class {
  /**
   * Private field to store the username of the user
   * @type {string}
   */
  #username;

  /**
   * Private field to store the password of the user
   * @type {string}
   */
  #password;

  /**
   * Private field to store the partner of the user
   * @type {User}
   */
  #partner;

  /**
   * Private field to store the access token of the user
   * @type {string}
   */
  #accessToken;

  /**
   * Constructor for the User class
   * @param {string} username
   * @param {string} password
   * @param {Pet} petData
   */
  constructor(username, password, petData) {
    this.#username = username;
    this.#password = password;
    this.pet = petData; 
  };

  /**
   * Links the user to a partner, given a valid access token
   * @param {string} token - Access token to validate the request
   * @param {User} partner - The partner to be linked to the user
   * @throws {Error} If the token is invalid
   * @throws {Error} If the user already has a partner
   */
  linkPartner(partner) { 
    if (this.#partner)
      throw new Error('Partner already exists');
    
    this.#partner = partner;
  }

  /**
   * Returns the username of the user
   * @returns {string} The username of the user
   */
  getUsername() {
    return this.#username;
  }

  /**
   * Returns the partner of the user, given a valid access token
   * @param {string} token - Access token to validate the request
   * @returns {User} The partner of the user, or throws an error if the token is invalid
   */
  getPartner(token) {
    console.log(this.#partner, this.#accessToken, token)
    if (token != this.#accessToken)
      return false;
    return this.#partner;
  }

  loginUser(password) {
    if (password != this.#password)
      return false;

    this.#accessToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    return this.#accessToken;
  }

  verifyToken(token) {
    if (token != this.#accessToken)
      return false;
    return true;
  }
};

module.exports = User;