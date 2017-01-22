export interface IComponentMessage
{
    rowkey: Date,
    message: string,
    fw: string,
    up: number,
    enqueued: Date,
    processed: Date
}