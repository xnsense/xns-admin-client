export interface IComponentData {
    id: string;
    unitId: string;
    componentAddress: string;
    enqueued: Date;
    processed: Date;
    up: Number;
    data: any;
}
