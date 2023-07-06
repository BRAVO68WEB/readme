import { SnowflakeId } from "hyperflake";

export const genNewSnowflakeId = () => {
    const uid = SnowflakeId();
    return uid.generate();
};