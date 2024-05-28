class apiService {
    public baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    async get(endpoint: string) {
        const result = await fetch(`${this.baseURL}${endpoint}`)
        return result.json();
    }
}

export default new apiService("http://localhost:5000/api/v1/");