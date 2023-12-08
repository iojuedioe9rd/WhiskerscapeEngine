namespace TSE 
{
    export type Dictionary<TKey extends string | number | symbol, TV> ={ [key in TKey ]:TV };
}

