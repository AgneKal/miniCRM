import { Company } from "./company";

export class Contact {
    public id: string|null=null;
    public name: string|null = null;
    public surname: string|null = null;
    public position: string|null = null;
    public company: string|null = null;
    public company_name: Company|null = null;
    public phones: string[] = [];
}