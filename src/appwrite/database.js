import { Client, ID, Databases, Storage, Query } from "appwrite";
import config from "../config";

export class DatabaseService{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl) //  API Endpoint
        .setProject(config.projectId) // project ID

        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createDocument({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            console.log("Error: Appwrite Service :: createDocument", error);
        }
    }

    async updateDocument(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Error: Appwrite Service :: updateDocument", error);
        }
    }

    async deleteDocument(slug){
        try {
            await this.databases.deleteDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
            
            return true;

        } catch (error) {
            console.log("Error: Appwrite Service :: deleteDocument", error);
            return false;
        }
    }

    async getDocument(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Error: Appwrite Service :: getDocument", error);
            return false;
        }
    }

    async getDocuments(queries=[Query.equal("status","active")]){
        try {
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Error: Appwrite Service :: getDocuments", error);
            return false;
        }
    }

    // File Upload Service

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                config.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Error: Appwrite Service :: uploadFile", error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                config.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Error: Appwrite Service :: deleteFile", error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.storage.getFilePreview(
            config.appwriteBucketId,
            fileId
        );
    }

}


const databaseService = new DatabaseService();

export default databaseService;