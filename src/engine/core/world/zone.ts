namespace TSE {


    export enum ZoneState {
        UNINITIALIZED,
        LOADING,
        UPDATING
    }



    export class Zone {

        private _id: number;
        private _name: string;
        private _description: string;
        private _scene: Scene;
        private _state: ZoneState = ZoneState.UNINITIALIZED;
        private _globalID: number=-1

        public constructor( id: number, name: string, description: string ) {
            this._id = id;
            this._name = name;
            this._description = description;
            this._scene = new Scene();
        }


        public get id(): number {
            return this._id;
        }

        public get name(): string {
            return this._name;
        }

        public get description(): string {
            return this._description;
        }

        public get scene(): Scene {
            return this._scene;
        }

        public init( zoneData: ZoneFile ): void
        {
            if(zoneData.objects === undefined)
            {
                throw new Error("Zone initialization error: objects not present.")
            }

            zoneData.objects.forEach((obj) => {
                console.log(obj)
                this.loadSimObject(obj,this._scene.root)
            })
        }

        public load(): void {
            this._state = ZoneState.LOADING;

            this._scene.load();

            this._state = ZoneState.UPDATING;
        }

        public unload(): void {

        }

        public update( time: number ): void {
            if ( this._state === ZoneState.UPDATING ) {
                this._scene.update( time );
            }
        }

        public render( shader: Shader ): void {
            if ( this._state === ZoneState.UPDATING ) {
                this._scene.render( shader );
            }
        }

        public onActivated(): void {

        }

        public onDeactivated(): void {

        }

        public loadSimObject(dataSection: ZoneObject, parent: SimObject): void
        {
            var name: string
            if (dataSection.name !== undefined)
            {
                name = dataSection.name
            }

            

            this._globalID++;
            var simObject = new SimObject(this._globalID, name, this._scene)

            if(dataSection.transform !== undefined)
            {
                simObject.transform.setFromJson(dataSection.transform, true)
            }

            console.log(dataSection.components);
            if(dataSection.components !== undefined)
            {
                console.log(dataSection.components);
                
                dataSection.components.forEach((data) => {
                    console.log(data)
                    var com = ComponentManager.extractComponent(data)
                    simObject.addComponent(com)
                })
            }

            if(dataSection.children !== undefined) {
                dataSection.children.forEach((obj) => {
                    this.loadSimObject(obj, simObject)
                    
                })
            }

            if(parent !== undefined)
            {
                parent.addChild(simObject)
            }

            

        }
    }
}