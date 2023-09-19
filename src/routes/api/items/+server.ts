import { json } from '@sveltejs/kit';
import { getDatabaseItems } from '$lib/notion';

export const GET = async () => {
    let database: any[];
    try {
        database = await getDatabaseItems();
        // filter to only get descriptif returnned by the database {﻿descriptif, I_projet}
        const filteredDatabase = database.map((item) => {
            return {
                id: item.id,
                id_code_barre: item.properties.id_code_barres?.rich_text[0]?.text.content,
                utilisation: item.properties.H_utilisation?.select?.name,
                descriptif: item.properties["descriptif"]?.title[0]?.text.content,
                projet: item.properties.I_projet?.rich_text[0]?.text.content,
                quantite_totale: item.properties.F_quantite_totale?.number,
                infos_utiles: item.properties.P_autres_infos_utiles?.rich_text[0]?.text.content,
            }
        })
        return json(filteredDatabase);
    } catch (error) {
        console.log(error);
        return json({error: error.message}, 500);
    }
}