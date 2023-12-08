namespace TSE
{
    export interface IComponent
    {
        name: string
        readonly owner: SimObject

        render(shader: Shader): void;
        update(time: number): void;
        load(): void;
        setOwner( owner: SimObject): void;
        
    }
}