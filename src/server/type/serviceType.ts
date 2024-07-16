type ConfigName = "global";
type ServiceName = "web" | "email" | "rcon";

type ConfigType = `${ConfigName}Config`;
type ServiceType = `${ServiceName}Service`;

export type { ConfigType, ServiceType };
