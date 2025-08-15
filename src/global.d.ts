type Class = new (...args: any[]) => any;
type InstanceTypeOf<T extends Class> = T extends new (...args: any) => infer R ? R : never;
