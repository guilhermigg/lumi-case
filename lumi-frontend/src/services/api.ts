
export async function api(endpoint: string) {
    let baseURL = "http://localhost:5000/api/v1/"

    const result = await fetch(`${baseURL}${endpoint}`)
    return result.json();
}