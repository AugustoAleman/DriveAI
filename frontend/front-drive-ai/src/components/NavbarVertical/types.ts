export interface NavbarVerticalProp{
    color?:string;
    width?: string;
    rol?: 'SALESMAN' | 'MANAGER' | 'AGA' | 'SUPERADMIN' | 'CLIENT' | undefined;
    marginIconButt?: string;
    iconSize?: string;
    position?: 'fixed' | 'absolute' | 'relative' | 'static' | 'sticky';
}
