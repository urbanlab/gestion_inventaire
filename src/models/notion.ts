export interface Page {
    object: string;
    id: string;
    created_time: string;
    last_edited_time: string;
    parent: {
        type: string;
        database_id: string;
    };
    archived: boolean;
    properties: PageProperties;
    url: string;

}

export interface PageProperties {
    I_projet: {
        id: string;
        type: string;
        rich_text: [];
    };
    id_code_barre: {
        id: string;
        type: string;
        rich_text: [];
    };
    H_utilisation: {
        id: string;
        type: string;
        select: {
            id: string;
            name: string;
            color: string;
        };
    };
    descriptif: {
        id: string;
        type: string;
        title: [
            {
                type: string;
                text: {
                    content: string;
                    link: null;
                };
                plain_text: string;
            }
        ]
    };

}