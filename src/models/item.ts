export interface Item {
    id: string;
    id_code_barre: string;
    utilisation: string;
    descriptif: string;
    projet: string;
    quantite_totale: number;
    infos_utiles: string;
}
export interface Items {
    lastUpdate: string;
    data: Array<Item>;
}