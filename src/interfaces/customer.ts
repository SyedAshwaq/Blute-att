export interface Customer {
    contact_number1 : string;
    contact_number2: string;
    createdBy: string;
    createdDate: Date;
    customer_address: string;
    customer_id: string;
    customer_name: string;
    id:number;
    lastModifiedBy: string;
    lastModifiedDate: Date;
    latitude: number;
    location: string;
    longitude: number;
    routeinfo: RouteInfo[];
    }

export interface RouteInfo{
    id: number;
    routeDetails: string;
    routeName: string;
}