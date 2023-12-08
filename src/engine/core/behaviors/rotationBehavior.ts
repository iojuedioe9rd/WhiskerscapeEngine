/// <reference path="./baseBehavior.ts" />


namespace TSE {
    export class RotationBehaviorData implements IBehaviorData {
        public name: string;

        public rotation: Vector3 = Vector3.zero

        public setFromJSON(json: any): void {
            if (json.name !== undefined) {
                this.name = String(json.name);
            }else {
                throw new Error("Name must be defined in behavior data");
            }

            if (json.rotation !== undefined) {
                this.rotation.setFromJson(json.rotation);
            }else {
                console.warn("Rotation is not defined, using 0,0,0.");
            }
        }
        
    }

    export class RotationBehavior extends BaseBehavior {

        private _rotation: Vector3
        
        constructor(data: RotationBehaviorData) {
            super(data);

            this._rotation = data.rotation
        }

    }
    
}