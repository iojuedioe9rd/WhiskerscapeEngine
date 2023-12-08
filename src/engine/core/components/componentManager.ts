namespace TSE{
    export class ComponentManagerError extends Error
    {
        constructor(error?: any)
        {
            if(error === undefined)
            {
                super(`Component manager undefined error`)
            }
            else
            {
                super(`Component manager error - ${error.toString()}`)
            }
            
        }
    }

    export class ComponentManager {
        private static _registeredBuilders: Dictionary<string, IComponentBuilder> = {}

        public static registerBuilder(builder: IComponentBuilder)
        {
            try {
                ComponentManager._registeredBuilders[builder.type] = builder
            } catch (error) {
                new ComponentManagerError(error)
            }
        }

        public static extractComponent(json: ZoneComponent): IComponent
        {
            if(json.type !== undefined)
            {
                if( ComponentManager._registeredBuilders[String(json.type)])
                {
                    try {
                        return ComponentManager._registeredBuilders[String(json.type)].buildFromJSON(json)
                    } catch (error) {
                        throw new ComponentManagerError(error)
                    }
                }

                
            }
            throw new ComponentManagerError("type is missing or builder is not registered for this type.")

        }
    }
}