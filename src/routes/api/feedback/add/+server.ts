import { json } from '@sveltejs/kit';
import { getDatabaseItems } from '$lib/notion';
import { addFeedback } from '$lib/notion';

export async function POST({ request }) {
	const feedback = await request.json();
	console.log(feedback);
    const response = await addFeedback(feedback);
    return json(response);
}