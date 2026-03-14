import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { ICommunicationServer, registerSearchTools, ToolRegistry } from "@cesium-mcp/shared";
import { registerAnimationCreate } from "./animation-create.js";
import { registerAnimationControl } from "./animation-control.js";
import { registerAnimationRemove } from "./animation-remove.js";
import { registerAnimationListActive } from "./animation-list-active.js";
import { registerAnimationUpdatePath } from "./animation-update-path.js";
import { registerAnimationCameraTracking } from "./animation-camera-tracking.js";
import { registerClockControl } from "./clock-control.js";
import { registerGlobeSetLighting } from "./globe-set-lighting.js";
import { UnifiedAnimationInputSchema } from "../schemas/unified-animation-schema.js";
import {
  AnimationControlInputSchema,
  AnimationRemoveInputSchema,
  AnimationListActiveInputSchema,
  AnimationCameraTrackingInputSchema,
  ClockControlInputSchema,
  GlobeSetLightingInputSchema,
  PathUpdateConfigSchema,
} from "../schemas/tool-schemas.js";

const ANIMATION_TOOL_REGISTRY: ToolRegistry = [
  {
    name: "animation_create",
    title: "Create Animation",
    description: "Create an animated entity with custom position samples",
    inputSchema: UnifiedAnimationInputSchema.shape,
  },
  {
    name: "animation_control",
    title: "Control Animation",
    description: "Play or pause an animation by ID",
    inputSchema: AnimationControlInputSchema.shape,
  },
  {
    name: "animation_remove",
    title: "Remove Animation",
    description: "Remove an animated entity by ID",
    inputSchema: AnimationRemoveInputSchema.shape,
  },
  {
    name: "animation_list_active",
    title: "List Active Animations",
    description: "List all currently active animations",
    inputSchema: AnimationListActiveInputSchema.shape,
  },
  {
    name: "animation_update_path",
    title: "Update Animation Path Visualization",
    description: "Update the visual appearance of an existing animation path trail (lead/trail time, width, color)",
    inputSchema: PathUpdateConfigSchema.shape,
  },
  {
    name: "animation_camera_tracking",
    title: "Animation Camera Tracking",
    description: "Track or stop tracking an animated entity with the camera",
    inputSchema: AnimationCameraTrackingInputSchema.shape,
  },
  {
    name: "clock_control",
    title: "Clock Control",
    description: "Configure the Cesium clock: set time, multiplier, or full configuration",
    inputSchema: ClockControlInputSchema.shape,
  },
  {
    name: "globe_set_lighting",
    title: "Set Globe Lighting",
    description: "Enable or configure globe lighting and atmosphere",
    inputSchema: GlobeSetLightingInputSchema.shape,
  },
];

/**
 * Register all animation tools with the MCP server
 * @param server - The MCP server instance
 * @param communicationServer - The communication server for browser interaction
 */
export function registerAllAnimationTools(
  server: McpServer,
  communicationServer: ICommunicationServer | undefined,
): void {
  if (!communicationServer) {
    throw new Error(
      "Animation tools require a communication server for browser visualization",
    );
  }

  // Register all animation tools
  registerAnimationCreate(server, communicationServer);
  registerAnimationControl(server, communicationServer);
  registerAnimationRemove(server, communicationServer);
  registerAnimationListActive(server, communicationServer);
  registerAnimationUpdatePath(server, communicationServer);
  registerAnimationCameraTracking(server, communicationServer);

  // Register clock and scene control tools
  registerClockControl(server, communicationServer);
  registerGlobeSetLighting(server, communicationServer);

  registerSearchTools(server, ANIMATION_TOOL_REGISTRY);
  console.error(
    "✅ Registered 8 animation and clock control tools (including unified animation_create) + search_tools",
  );
}
