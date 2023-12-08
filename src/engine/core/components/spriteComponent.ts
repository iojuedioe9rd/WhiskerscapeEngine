/// <reference path="componentManager.ts" />

namespace TSE {


    type SpriteComponentDataJSON =
    {
        name: string
        materialName: string
    }
    export class SpriteComponentData implements IComponentData
    {
        public name: string
        public materialName: string

        public setFromJson(json: SpriteComponentDataJSON): void {
            if(json.name !== undefined)
            {
                this.name = json.name
            }

            if(json.materialName !== undefined)
            {
                this.materialName = json.materialName
            }
        }
    }

    export class SpriteComponentBuilder implements IComponentBuilder
    {
        public get type(): string {
            return "sprite"
        }
        buildFromJSON(json: SpriteComponentDataJSON): IComponent {
            var data = new SpriteComponentData()
            data.setFromJson(json)
            return new SpriteComponent(data)
        }
        
    }

    export class SpriteComponent extends BaseComponent {

        private _sprite: Sprite;


        public constructor( data: SpriteComponentData) {
            super( data );

            this._sprite = new Sprite( data.name, data.materialName );
        }

        public load(): void {
            this._sprite.load();
        }


        public render( shader: Shader ): void {
            this._sprite.draw( shader, this.owner.worldMatrix );

            super.render( shader );
        }
    }

    ComponentManager.registerBuilder(new SpriteComponentBuilder())
}