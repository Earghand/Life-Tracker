const {  BadRequestError, UnauthorizedError } = require("../utils/errors")
const db = require("../db")
const { BadRequest } = require("http-errors")

class User {
    static async login(credentials) {
        //user should submit their email and password
        //if any of these fields are missing, throw an error

        //lookup the user in the db by the email
        //if a user is found, compare the submitted password
        //with the password in the db
        //if there is a match, return the user

        //if any of this goes wrong, throw an error.
        throw new UnauthorizedError("Invalid email/password combo")
    }

    static async register(credentials) {
        const requiredFields = ["email", "password", "rsvp_status"]
        requiredFields.forEach(field=> {
            if(!credentials.hasOwnProperty(field)) {
                throw new BadRequestError(`Missing ${field} in request body.`)
            }
        })

        if(credentials.email.indexOf("@") <= 0) {
            throw new BadRequestError("Invalid email.")
        }
        //user should submit their email, pw, rsvp status, and # of guests
        //if any of these fields are missing, throw an error.
        
        const existingUser = await User.fetchUserByEmail(credentials.email);

        if(existingUser) {
            throw new BadRequestError(`Duplicate email: ${credentials.email}`)
        }

        const lowercasedEmail = credentials.email.toLowerCase();

        //make sure no user already exists in the system with that email
        //if one does, throw an error.
        

        //take the users password, and hash it 
        //take the users email, and lowercase it

        //create a new user in the db with all of their info
        const result = await db.query(`
        INSERT INTO users (
            email,
            password,
            rsvp_status
        )
        VALUES ($1, $2, $3)
        RETURNING id, email, rsvp_status, created_at;
        `,
        [lowercasedEmail, credentials.password, credentials.rsvp_status]
        )

        //return the user
        const user = result.rows[0]

        return user;
    } 

    static async fetchUserByEmail(email) {
        if(!email) {
            throw new BadRequest("No email provided")
        }

        const query = `SELECT * FROM users WHERE email = $1`

        const result = await db.query(query, [email.toLowerCase()])

        const user = result.rows[0]

        return user;
    }
}

module.exports = User