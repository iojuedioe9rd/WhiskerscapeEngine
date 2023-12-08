var PSD = require('psd');


namespace TSE {

    /** Represents an image asset */
    export class ImageAsset implements IAsset {

        /** The name of this asset. */
        public readonly name: string;

        /** The data of this asset. */
        public readonly data: HTMLImageElement;

        /**
         * Creates a new image asset.
         * @param name The name of this asset.
         * @param data The data of this asset.
         */
        public constructor( name: string, data: HTMLImageElement ) {
            this.name = name;
            this.data = data;
        }

        /** The width of this image asset. */
        public get width(): number {
            return this.data.width;
        }

        /** The height of this image asset. */
        public get height(): number {
            return this.data.height;
        }
    }

    /** Represents an image asset loader. */
    export class ImageAssetLoader implements IAssetLoader {

        /** The extensions supported by this asset loader. */
        public get supportedExtensions(): string[] {
            return ["png", "gif", "jpg", "svg", "apng", "avif", "jpeg", "jfif", "pjpeg", "pjp", "webp", "bmp", "ico", "cur"];
        }

/**
 * Loads an asset with the given name.
 * @param {string} assetName - The name of the asset to be loaded.
 */
    public loadAsset(assetName: string): void {
        // Log the asset name to the console
        console.log(assetName);

        // Create a new image element
        let image: HTMLImageElement = new Image();

        // Set the onload event handler for the image
        image.onload = ImageAssetLoader.onImageLoaded.bind(this, assetName, image);

        // Set the source of the image to the asset name
        image.src = assetName;
    }
    


        private static onImageLoaded( assetName: string, image: HTMLImageElement ): void {
            console.log( "onImageLoaded: assetName/image", assetName, image );
            let asset = new ImageAsset( assetName, image );
            AssetManager.onAssetLoaded( asset );
        }
    }
}