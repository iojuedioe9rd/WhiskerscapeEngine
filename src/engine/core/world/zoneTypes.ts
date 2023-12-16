namespace TSE {
  export type ZoneComponent = {
    name: string;
    type: string;
  };

  export type ZoneTransform = {
    position?: { x?: number; y?: number; z?: number };
    rotation?: { x?: number; y?: number; z?: number };
    scale?: { x?: number; y?: number; z?: number };
  };

  export type ZoneBehavior = {
    name: string;
    type: string;
  };

  export type ZoneObject = {
    name: string;
    transform: ZoneTransform;
    children?: ZoneObject[];
    components?: ZoneComponent[];
    behaviors?: ZoneBehavior[];
  };

  export type ZoneFile = {
    name: string;
    description: string;
    id: number;

    objects: ZoneObject[];
  };
}
