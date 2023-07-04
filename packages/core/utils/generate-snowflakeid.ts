import { SnowflakeId } from "hyperflake";

export const genNewSnowflakeId = () => {
    const uid = SnowflakeId();
    const id = uid.generate();
    return id;
}