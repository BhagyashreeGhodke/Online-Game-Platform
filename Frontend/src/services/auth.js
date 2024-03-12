//services/auth.js

import axios from 'axios';

export class AuthService {
    
    async createAccount({email, password, fullName, username, avatar }) {
        try {
            console.log("email: ", email);
            console.log("avatar: ", avatar);
            const userAccount = await axios.post('/api/v1/users/register', {email, password, fullName, username, avatar })
            console.log("userAccount: ",userAccount);
            if (userAccount) {
                
                await this.login({email, password});
                return userAccount.data
            } else {
               return  userAccount;
            }
        } catch (error) {
            console.log("Auth service :: createAccount :: error", error);
        }
    }

    async login({email, password}) {
        try {
            const response =  await axios.post('/api/v1/users/login',{email, password});
            const userData =  response.data
            localStorage.setItem('authData', JSON.stringify(userData));
            return userData
        } catch (error) {
            console.log("Auth service :: Login :: error", error);
            throw new Error(error.response.data.message)
        }
    }

    async getCurrentUser() {
        try {
            
            const authData = localStorage.getItem('authData');
            if (authData) {
                const userData = JSON.parse(authData);
                return userData;
            } else {
                return null;
            }
        } catch (error) {
            console.log("Auth service :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            localStorage.removeItem('authData');
            const response = await axios.get('http://localhost:3000/api/v1/users/logout')
            return response
           
        } catch (error) {
            console.log("Auth service :: logout :: error", error);
        }
    }

    isAuthenticated() {
        
        const authData = localStorage.getItem('authData');
        return !!authData;
    }
}

const authService = new AuthService();

export default authService

