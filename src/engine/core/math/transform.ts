namespace TSE {


    export class Transform {



        public position: Vector3 = Vector3.zero;


        public rotation: Vector3 = Vector3.zero;


        public scale: Vector3 = Vector3.one;


        public copyFrom( transform: Transform ): void {
            this.position.copyFrom( transform.position );
            this.rotation.copyFrom( transform.rotation );
            this.scale.copyFrom( transform.scale );
        }

        public getTransformationMatrix(): Matrix4x4 {
            let translation = Matrix4x4.translation( this.position );

            let rotation = Matrix4x4.rotationXYZ( this.rotation.x, this.rotation.y, this.rotation.z );
            let scale = Matrix4x4.scale( this.scale );

            // T * R * S
            return Matrix4x4.multiply( Matrix4x4.multiply( translation, rotation ), scale );
        }

        //position 

        public setFromJson(json: ZoneTransform, del = false)
        {
            if(json.position !== undefined)
            {
                this.position.setFromJson(json.position)
            }
            else if(del)
            {
                this.position.x = 0
                this.position.y = 0
                this.position.z = 0
            }
            
            if(json.rotation !== undefined)
            {
                this.rotation.setFromJson(json.rotation)
            }
            else if(del)
            {
                this.rotation.x = 0
                this.rotation.y = 0
                this.rotation.z = 0
            }
            if(json.scale !== undefined)
            {
                this.scale.setFromJson(json.scale)
            }
            else if(del)
            {
                this.scale.x = 1
                this.scale.y = 1
                this.scale.z = 1
            }

        }
    }
}