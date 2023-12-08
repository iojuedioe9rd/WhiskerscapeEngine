namespace TSE {

    /** Represents an Json asset */
    export class JsonAsset implements IAsset {

        /** The name of this asset. */
        public readonly name: string;

        /** The data of this asset. */
        public readonly data: any;

        /**
         * Creates a new Json asset.
         * @param name The name of this asset.
         * @param data The data of this asset.
         */
        public constructor( name: string, data: any ) {
            this.name = name;
            this.data = data;
        }

        
    }

    /** Represents an Json asset loader. */
    export class JsonAssetLoader implements IAssetLoader {

        /** The extensions supported by this asset loader. */
        public get supportedExtensions(): string[] {
            return ["json"];
        }

        /**
         * Loads an asset with the given name.
         * @param assetName The name of the asset to be loaded.
         */
        public loadAsset( assetName: string ): void {
            let req: XMLHttpRequest = new XMLHttpRequest()
            req.addEventListener("load", this.onJsonLoaded.bind(this, assetName, req))
            req.open("GET", assetName)
            req.send()
        }

        private onJsonLoaded( assetName: string, req: XMLHttpRequest ): void {
            console.log( "onJsonLoaded: assetName/req", assetName, req );
            
            if(req.readyState === req.DONE)
            {
                var json = JSON.parse( req.responseText)
                var asset = new JsonAsset(assetName, json)
                AssetManager.onAssetLoaded(asset)
            }
        }
    }
}