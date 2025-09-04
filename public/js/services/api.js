export async function fetchData(endpoint, options = {}) {
  try {
    const response = await fetch(endpoint, options);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();

    return data;
  } catch (err) {
    console.error("Error fetching data", err);
    throw err;
  }
}