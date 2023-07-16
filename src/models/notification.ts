export interface Notif {
    body: string;
    type: string | "variant-filled" | "variant-filled-success" | "variant-filled-warning" ;
    show: boolean;
}
