import type { DataProvider, DemoControls } from './contracts';
import { jsonProvider, jsonDemoControls } from './mock/provider';
// Integration point: export your GraphQL provider here. No screen changes needed.
export const dataProvider: DataProvider = jsonProvider;
export const demoControls: DemoControls | null = jsonDemoControls;
export const isDemo = true;
