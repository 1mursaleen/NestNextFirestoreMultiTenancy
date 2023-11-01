export enum DomainTypeEnum {
    DOMAIN = "DOMAIN",
    SUBDOMAIN = "SUBDOMAIN",
}

export interface SiteInterface {
    id?: string;
    url?: string;
    subdomain?: string;
    title?: string;
    description?: string;
    created_at?: any;
}
