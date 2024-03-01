import { Client, Account, ID } from "appwrite";
import config from "../config/config.js";

export class AuthService{
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl) //  API Endpoint
        .setProject(config.appwriteProjectId) // project ID

        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(),email, password, name);

            if(userAccount){
                this.login({email, password});
            }else{
                return userAccount;
            }
        } catch (error) {
            console.log("Error: Appwrite Service :: createAccount", error);
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            console.log("Error: Appwrite Service :: login", error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Error: Appwrite Service :: getCurrentUser", error);
        }

        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Error: Appwrite Service :: logout", error);
        }
    }
}

const authService = new AuthService();

export default authService;