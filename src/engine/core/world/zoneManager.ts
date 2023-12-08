

namespace TSE {


    export class ZoneManager implements IMessageHandler {

        private static _globalZoneID: number = -1;
        private static _registeredZones: Dictionary<number,string> = {};
        private static _activeZone: Zone;
        private static _inst: ZoneManager


        private constructor() {
        }
        
        

        public static init(): void
        {
            ZoneManager._inst = new ZoneManager()

            // TMP
            ZoneManager._registeredZones[0] = "assets/zones/testZone.json"
        }

        public static changeZone( id: number ): void {
            if ( ZoneManager._activeZone !== undefined ) {
                ZoneManager._activeZone.onDeactivated();
                ZoneManager._activeZone.unload();
                ZoneManager._activeZone = undefined
            }

            if ( ZoneManager._registeredZones[id] !== undefined ) {
                if( AssetManager.getAsset(ZoneManager._registeredZones[id]))
                {
                    var asset = AssetManager.getAsset( ZoneManager._registeredZones[id])
                    ZoneManager.loadZone(asset)
                }else {
                    Message.subscribe(`${MESSAGE_ASSET_LOADER_ASSET_LOADED}${ZoneManager._registeredZones[id]}`,ZoneManager._inst)
                    AssetManager.loadAsset(ZoneManager._registeredZones[id])
                }
                
            }
            else
            {
                throw new Error(`Zone id: ${id.toString()} does not exist`)
            }
        }

        public static update( time: number ): void {
            if ( ZoneManager._activeZone !== undefined ) {
                ZoneManager._activeZone.update( time );
            }
        }

        public static render( shader: Shader ): void {
            if ( ZoneManager._activeZone !== undefined ) {
                ZoneManager._activeZone.render( shader );
            }
        }
        public onMessage(message: Message): void {
            console.log(message)
            if(true)
            {
                let asset = message.context as JsonAsset
                ZoneManager.loadZone(asset)
            }
        }

        private static loadZone(asset: JsonAsset)
        {
            var zoneData: ZoneFile = asset.data
            var zoneID: number
            if(zoneData.id === undefined)
            {
                throw new Error("Zone file format exception: Zone id not present.");
            }
            else
            {
                zoneID = zoneData.id
            }
            var zoneName: string
            if(zoneData.name === undefined)
            {
                throw new Error("Zone file format exception: Zone Name not present.");
            }
            else
            {
                zoneName = zoneData.name
            }

            var zoneDescription: string
            if(zoneData.name === undefined)
            {
                throw new Error("Zone file format exception: Zone Description not present.");
            }
            else
            {
                zoneDescription = zoneData.description
            }


            console.log("hi")
            ZoneManager._activeZone = new Zone(zoneID, zoneName, zoneDescription)
            ZoneManager._activeZone.init(zoneData)
            ZoneManager._activeZone.onActivated()
            ZoneManager._activeZone.load()
        }
        
    }
}