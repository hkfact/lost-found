import { Item } from "@/types";

const API_URL = (
	process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000"
).replace(/\/+$/, "");

async function parseResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		const body = (await response.json().catch(() => null)) as
			| { error?: string }
			| null;
		throw new Error(body?.error ?? `Request failed (${response.status}).`);
	}

	return (await response.json()) as T;
}

export async function fetchItems(): Promise<Item[]> {
	const response = await fetch(`${API_URL}/api/items`);
	return parseResponse<Item[]>(response);
}

export async function uploadItem(item: Omit<Item, "id">): Promise<Item> {
	const response = await fetch(`${API_URL}/api/items`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(item),
	});

	return parseResponse<Item>(response);
}
