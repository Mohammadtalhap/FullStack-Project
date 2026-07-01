const BASE_URL = "http://localhost:5000";

// Helper function to get authorization header
const getAuthHeader = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
});

export async function getProducts() {
    const response = await fetch(`${BASE_URL}/products`, {
        headers: getAuthHeader(),
    });
    return response.json();
}

export async function addProduct(product) {
    const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: getAuthHeader(),
        body: product,
    });
    return response.json();
}

export async function updateProduct(id, product) {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: getAuthHeader(),
        body: product,
    });
    return response.json();
}

export async function deleteProduct(id) {
    const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "DELETE",
        headers: getAuthHeader(),
    });
    if (!response.ok) {
        throw new Error("Failed to delete product");
    }
    return response.json();
}