import { API_URL } from "./config";

export async function createDeck(title: string){
    const response = await fetch(`${API_URL}/decks`, {
      method: 'POST',
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }); //in-built browser method
    return response.json();
}