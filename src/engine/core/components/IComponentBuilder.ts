namespace TSE
{
    export interface IComponentBuilder {
        readonly type: string

        buildFromJSON(json: any): IComponent
    }
}