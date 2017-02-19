import { IComponentData } from './component-data';

export interface IComponent {
    id: string;
    type: string;
    name: string;
    description: string;
    componentAddress: string;
    unitId: string;
    hardwareId: string;
    firmwareId: string;
    tag: string;
    data: IComponentData
}
